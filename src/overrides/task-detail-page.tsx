import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Facebook, Linkedin, Twitter } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { fetchTaskPostBySlug, fetchTaskPosts, getPostImages } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import type { SitePost } from '@/lib/site-connector'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { CopyUrlButton } from '@/components/shared/copy-url-button'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

function getContentRecord(post: SitePost) {
  return post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
}

function getSummaryLine(post: SitePost) {
  const c = getContentRecord(post)
  const ex = typeof c.excerpt === 'string' ? c.excerpt : ''
  if (ex.trim()) return ex.trim()
  const s = post.summary?.trim()
  if (s) return s
  return ''
}

export async function TaskDetailPageOverride({ slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug('mediaDistribution', slug)
  if (!post) notFound()

  const related = (await fetchTaskPosts('mediaDistribution', 12, { fresh: true }))
    .filter((item) => item.slug !== slug)
    .slice(0, 4)

  const content = getContentRecord(post)
  const html = formatRichHtml((typeof content.body === 'string' ? content.body : '') || post.summary || '', '')
  const summary = getSummaryLine(post)
  const images = getPostImages(post)
  const featured = images[0] || '/placeholder.svg?height=900&width=1400'
  const category =
    (typeof content.category === 'string' && content.category.trim()) ||
    post.tags?.find((t) => typeof t === 'string' && t !== 'mediaDistribution') ||
    'Press release'

  const published = post.publishedAt
    ? new Date(post.publishedAt).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC',
        timeZoneName: 'short',
      })
    : ''

  const url = `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/updates/${post.slug}`
  const shareText = encodeURIComponent(post.title)
  const shareUrl = encodeURIComponent(url)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: summary || post.summary,
    image: featured.startsWith('http') ? [featured] : [`${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${featured}`],
    datePublished: post.publishedAt || undefined,
    author: {
      '@type': 'Person',
      name: post.authorName || SITE_CONFIG.name,
    },
    mainEntityOfPage: url,
  }

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-[#1a1f2e]">
      <NavbarShell />
      <SchemaJsonLd data={articleSchema} />

      <article>
        <header className="border-b border-[#e2e6ef] bg-white">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#6B7291]">
              {String(category)} {published ? `· ${published}` : ''}
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.15] tracking-[-0.03em] text-[#262E53] sm:text-4xl lg:text-[2.45rem]">
              {post.title}
            </h1>
            {summary ? (
              <p className="mt-6 border-l-4 border-[#3E85BD] bg-[#f8f9fb] py-3 pl-5 pr-4 text-lg font-medium italic leading-relaxed text-[#3d465c]">
                {summary}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[#6B7291]">
              <span>
                By <span className="font-semibold text-[#262E53]">{post.authorName || SITE_CONFIG.name}</span>
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d9dee8] bg-white text-[#262E53] transition hover:border-[#3E85BD]/50 hover:text-[#3E85BD]"
                aria-label="Share on X"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d9dee8] bg-white text-[#262E53] transition hover:border-[#3E85BD]/50 hover:text-[#3E85BD]"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d9dee8] bg-white text-[#262E53] transition hover:border-[#3E85BD]/50 hover:text-[#3E85BD]"
                aria-label="Share on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <CopyUrlButton url={url} />
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 lg:py-14">
          <div>
            <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#e2e6ef] bg-[#e8ebf2] shadow-[0_24px_70px_rgba(38,46,83,0.08)]">
              <ContentImage
                src={featured}
                alt={`Illustration for ${post.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 70vw"
                priority
              />
            </div>
            <div className="article-content prose prose-lg max-w-none text-[#2d3340] prose-headings:font-[family-name:var(--font-display)] prose-headings:text-[#262E53] prose-a:text-[#3E85BD]">
              <RichContent html={html} />
            </div>
          </div>

          <aside className="mt-12 space-y-6 lg:mt-0">
            <div className="rounded-2xl border border-[#d9dee8] bg-white p-6 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B7291]">{SITE_CONFIG.name}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#4a5366]">More from the wire—selected for proximity to this release.</p>
            </div>
            <div className="rounded-2xl border border-[#d9dee8] bg-white p-2 shadow-sm">
              <p className="px-4 pt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B7291]">Related</p>
              <ul className="divide-y divide-[#eef1f6]">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link href={`/updates/${item.slug}`} className="block px-4 py-4 transition hover:bg-[#f8f9fb]">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7291]">
                        {item.publishedAt
                          ? new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                          : 'Update'}
                      </span>
                      <span className="mt-1 block font-semibold leading-snug text-[#262E53] hover:text-[#3E85BD]">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/updates" className="block rounded-2xl border border-dashed border-[#c5cbd8] bg-[#EEEEEE]/50 px-4 py-4 text-center text-sm font-semibold text-[#3E85BD] hover:bg-[#e8ebf2]">
              Back to archive
            </Link>
          </aside>
        </div>
      </article>

      <Footer />
    </div>
  )
}
