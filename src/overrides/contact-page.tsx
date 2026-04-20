import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import Link from 'next/link'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-[#f4f5f7] text-[#1a1f2e]">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden bg-[#262E53] text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(62,133,189,0.2),transparent_42%)]" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7BA3C3]">
              <span className="mr-3 inline-block h-px w-10 bg-[#BB3426] align-middle" aria-hidden />
              Contact
            </p>
            <h1 className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Let&apos;s talk distribution
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#c8d0e4] sm:text-lg">
              For media desk questions, enterprise plans, or compliance-friendly workflows, reach the releaseprCore team. We route requests to the right owner—no ticket black holes.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="rounded-2xl border border-[#d9dee8] bg-white p-8 shadow-[0_20px_60px_rgba(38,46,83,0.07)]">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#262E53]">Direct channels</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#6B7291]">
                Prefer email? Use addresses on your domain or the contact form inside the authenticated dashboard when available.
              </p>
              <ul className="mt-8 space-y-5 text-sm">
                <li>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B7291]">Desk</p>
                  <a className="mt-1 inline-block font-semibold text-[#3E85BD] hover:underline" href={`mailto:desk@${SITE_CONFIG.domain}`}>
                    desk@{SITE_CONFIG.domain}
                  </a>
                </li>
                <li>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B7291]">Partnerships</p>
                  <a className="mt-1 inline-block font-semibold text-[#3E85BD] hover:underline" href={`mailto:partners@${SITE_CONFIG.domain}`}>
                    partners@{SITE_CONFIG.domain}
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center rounded-2xl border border-dashed border-[#c5cbd8] bg-[#EEEEEE]/60 p-8">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#262E53]">Self-serve next steps</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#4a5366]">
                Review plans, explore the archive, or open search to see how releases render before you publish.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/pricing"
                  className="inline-flex rounded-full bg-[#3E85BD] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#3E85BD]/25 transition hover:bg-[#3576a8]"
                >
                  Pricing
                </Link>
                <Link href="/updates" className="inline-flex rounded-full border border-[#262E53]/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#262E53] transition hover:bg-white/90">
                  Browse releases
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
