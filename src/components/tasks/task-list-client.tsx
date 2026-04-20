"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildPostUrl } from "@/lib/task-data";
import { normalizeCategory, isValidCategory } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { getLocalPostsForTask } from "@/lib/local-posts";

type Props = {
  task: TaskKey;
  initialPosts: SitePost[];
  category?: string;
};

type DatePreset = "all" | "7d" | "30d" | "365d";

export function TaskListClient({ task, initialPosts, category }: Props) {
  const [datePreset, setDatePreset] = useState<DatePreset>("all");
  const localPosts = getLocalPostsForTask(task);

  const merged = useMemo(() => {
    const bySlug = new Set<string>();
    const combined: Array<SitePost & { localOnly?: boolean; task?: TaskKey }> = [];

    localPosts.forEach((post) => {
      if (post.slug) {
        bySlug.add(post.slug);
      }
      combined.push(post);
    });

    initialPosts.forEach((post) => {
      if (post.slug && bySlug.has(post.slug)) return;
      combined.push(post);
    });

    const normalizedCategory = category ? normalizeCategory(category) : "all";
    if (normalizedCategory === "all") {
      return combined.filter((post) => {
        const content = post.content && typeof post.content === "object" ? post.content : {};
        const value = typeof (content as any).category === "string" ? (content as any).category : "";
        return !value || isValidCategory(value);
      });
    }

    return combined.filter((post) => {
      const content = post.content && typeof post.content === "object" ? post.content : {};
      const value =
        typeof (content as any).category === "string"
          ? normalizeCategory((content as any).category)
          : "";
      return value === normalizedCategory;
    });
  }, [category, initialPosts, localPosts]);

  const filtered = useMemo(() => {
    if (datePreset === "all") return merged;
    const now = Date.now();
    const ms =
      datePreset === "7d"
        ? 7 * 86400000
        : datePreset === "30d"
          ? 30 * 86400000
          : 365 * 86400000;
    return merged.filter((post) => {
      const t = post.publishedAt ? new Date(post.publishedAt).getTime() : 0;
      return t && now - t <= ms;
    });
  }, [merged, datePreset]);

  const isPress = task === "mediaDistribution";

  if (!filtered.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#c5cbd8] bg-white/80 p-10 text-center text-[#6B7291]">
        No releases match these filters yet.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {isPress ? (
        <div className="flex flex-col gap-4 rounded-2xl border border-[#d9dee8] bg-white p-4 shadow-[0_12px_40px_rgba(38,46,83,0.06)] sm:flex-row sm:items-center sm:justify-between">
          <form action="/search" method="GET" className="flex w-full max-w-md gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7291]" aria-hidden />
              <input
                name="q"
                type="search"
                placeholder="Search headlines and summaries"
                className="h-11 w-full rounded-xl border border-[#d9dee8] bg-[#f8f9fb] pl-10 pr-3 text-sm text-[#262E53] outline-none ring-[#3E85BD] focus:ring-2"
              />
            </div>
            <button
              type="submit"
              className="h-11 shrink-0 rounded-xl bg-[#3E85BD] px-4 text-sm font-semibold text-white transition hover:bg-[#3576a8]"
            >
              Search
            </button>
          </form>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7291]">Published</span>
            {(
              [
                ["all", "Any time"],
                ["7d", "7 days"],
                ["30d", "30 days"],
                ["365d", "12 months"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setDatePreset(value)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  datePreset === value
                    ? "bg-[#262E53] text-white"
                    : "bg-[#f1f3f7] text-[#4a5366] hover:bg-[#e8ebf2]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div
        className={
          isPress ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        }
      >
        {filtered.map((post) => {
          const localOnly = (post as any).localOnly;
          const href = localOnly ? `/local/${task}/${post.slug}` : buildPostUrl(task, post.slug);
          return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} />;
        })}
      </div>
    </div>
  );
}
