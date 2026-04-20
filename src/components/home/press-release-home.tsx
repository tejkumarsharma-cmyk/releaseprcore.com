import Link from 'next/link'
import { ArrowRight, CheckCircle2, Radio, Shield, Sparkles } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import type { SitePost } from '@/lib/site-connector'

function getPostImage(post: SitePost) {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const images = Array.isArray(content.images) ? content.images.filter((u): u is string => typeof u === 'string') : []
  const logo = typeof content.logo === 'string' ? content.logo : null
  return mediaUrl || images[0] || logo || '/placeholder.svg?height=640&width=960'
}

function getCategory(post: SitePost) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const cat = content.category
  if (typeof cat === 'string' && cat.trim()) return cat.trim()
  const tag = post.tags?.find((t) => typeof t === 'string' && t !== 'mediaDistribution')
  if (typeof tag === 'string') return tag
  return 'Press release'
}

function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return ''
  return value.length > 160 ? `${value.slice(0, 157).trimEnd()}…` : value
}

type Props = {
  posts: SitePost[]
}

export function PressReleaseHome({ posts }: Props) {
  const lead = posts[0]
  const grid = posts.slice(1, 7)
  const heroTitle = siteContent.hero.title
  const heroLine = Array.isArray(heroTitle) ? heroTitle[0] : String(heroTitle)

  return (
    <main className="bg-[#f4f5f7] text-[#1a1f2e]">
      <section className="relative overflow-hidden bg-[#262E53] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%237BA3C3' d='M0 224L60 213.3C120 203 240 181 360 181.3C480 181 600 203 720 208C840 213 960 203 1080 186.7C1200 171 1320 149 1380 138.7L1440 128V320H1380C1320 320 1200 320 1080 320C960 320 840 320 720 320C600 320 480 320 360 320C240 320 120 320 60 320H0Z'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom',
            backgroundSize: 'cover',
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#3E85BD]/25 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[#BB3426]/20 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7BA3C3]">
            <span className="h-px w-8 bg-[#BB3426]" aria-hidden />
            {siteContent.hero.badge}
          </p>
          <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-5xl lg:text-[3.15rem]">
            {heroLine}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#c8d0e4] sm:text-lg">
            {siteContent.hero.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={siteContent.hero.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-[#3E85BD] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(62,133,189,0.35)] transition hover:bg-[#3576a8] hover:shadow-[0_16px_44px_rgba(62,133,189,0.42)]"
            >
              {siteContent.hero.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/16"
            >
              View pricing
            </Link>
            <Link
              href={siteContent.hero.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#e8ecf7] underline-offset-4 hover:text-white hover:underline"
            >
              {siteContent.hero.secondaryCta.label}
            </Link>
          </div>

          <dl className="mt-14 grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-3">
            {[
              { icon: Radio, t: 'Wire-ready formatting', d: 'Structured releases built for scans and syndication.' },
              { icon: Shield, t: 'Editorial safeguards', d: 'Clear attribution, categories, and review-friendly layouts.' },
              { icon: Sparkles, t: 'Measurable reach', d: 'Analytics-friendly surfaces without cluttering the story.' },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:bg-white/10">
                <dt className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Icon className="h-4 w-4 text-[#7BA3C3]" aria-hidden />
                  {t}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#b8c2db]">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-18">
        <div className="flex flex-col gap-4 border-b border-[#d9dee8] pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6B7291]">{siteContent.home.introBadge}</p>
            <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.02em] text-[#262E53] sm:text-3xl">
              {siteContent.home.introTitle}
            </h2>
          </div>
          <Link
            href={siteContent.home.primaryLink.href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#3E85BD] hover:text-[#2f6f9e]"
          >
            {siteContent.home.primaryLink.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {siteContent.home.sidePoints.map((line) => (
            <li
              key={line}
              className="flex gap-3 rounded-2xl border border-[#e2e6ef] bg-white p-4 text-sm leading-snug text-[#3d465c] shadow-[0_8px_30px_rgba(38,46,83,0.06)]"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#3E85BD]" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-[#e5e8f0] bg-[#EEEEEE]/80">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#6B7291]">{siteContent.taskSectionHeading}</p>
              <p className="mt-2 text-sm text-[#4a5366]">{siteContent.taskSectionDescriptionSuffix}</p>
            </div>
            <Link href="/search" className="text-sm font-semibold text-[#3E85BD] hover:underline">
              Open search
            </Link>
          </div>

          {lead ? (
            <Link
              href={`/updates/${lead.slug}`}
              className="mt-8 grid gap-0 overflow-hidden rounded-[1.35rem] border border-[#d9dee8] bg-white shadow-[0_24px_70px_rgba(38,46,83,0.08)] transition hover:border-[#3E85BD]/35 md:grid-cols-[1.15fr_0.85fr]"
            >
              <div className="relative aspect-[16/10] w-full md:aspect-auto md:min-h-[280px]">
                <ContentImage
                  src={getPostImage(lead)}
                  alt={lead.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
                <span className="absolute left-4 top-4 rounded-full bg-[#262E53]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                  {getCategory(lead)}
                </span>
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6B7291]">
                  {new Date(lead.publishedAt || Date.now()).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}{' '}
                  · {lead.authorName || SITE_CONFIG.name}
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug tracking-[-0.02em] text-[#262E53] sm:text-[1.65rem]">
                  {lead.title}
                </h3>
                {lead.summary ? <p className="mt-4 text-sm leading-relaxed text-[#4a5366]">{excerpt(lead.summary)}</p> : null}
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#3E85BD]">
                  Read release
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ) : (
            <div className="mt-8 rounded-[1.35rem] border border-dashed border-[#c5cbd8] bg-white p-12 text-center">
              <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#262E53]">No releases published yet</p>
              <p className="mt-2 text-sm text-[#6B7291]">When your first story goes live, it will appear here automatically.</p>
            </div>
          )}

          {grid.length ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {grid.map((post) => (
                <Link
                  key={post.id}
                  href={`/updates/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#e2e6ef] bg-white shadow-[0_12px_40px_rgba(38,46,83,0.06)] transition hover:-translate-y-0.5 hover:border-[#3E85BD]/30 hover:shadow-[0_18px_50px_rgba(38,46,83,0.1)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e8ebf2]">
                    <ContentImage
                      src={getPostImage(post)}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7291]">
                      {getCategory(post)} ·{' '}
                      {new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-[#262E53] group-hover:text-[#3E85BD]">
                      {post.title}
                    </h3>
                    {post.summary ? (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#5c6478]">{excerpt(post.summary)}</p>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="overflow-hidden rounded-[1.5rem] bg-[#262E53] px-8 py-12 text-center text-white sm:px-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7BA3C3]">{siteContent.cta.badge}</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{siteContent.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#c8d0e4] sm:text-base">{siteContent.cta.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={siteContent.cta.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-[#3E85BD] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#3E85BD]/25 transition hover:bg-[#3576a8]"
            >
              {siteContent.cta.primaryCta.label}
            </Link>
            <Link
              href={siteContent.cta.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {siteContent.cta.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
