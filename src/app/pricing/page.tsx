import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/pricing',
    title: `Pricing | ${SITE_CONFIG.name}`,
    description: 'Simple plans for press distribution, analytics, and add-on coverage. Compare Basic, Pro, and Premium.',
    openGraphTitle: `Pricing | ${SITE_CONFIG.name}`,
    openGraphDescription: 'Transparent tiers for distribution depth, analytics, and media reach.',
    keywords: ['press release pricing', 'distribution plans', 'media analytics', 'releaseprCore'],
  })
}

const plans = [
  {
    name: 'Basic',
    price: '$199',
    cadence: '/mo',
    blurb: 'Essential national wire placement with baseline reporting.',
    features: ['Regional distribution tier', 'Standard disclosure formatting', 'Email confirmation receipts', 'Business-hours support'],
    cta: 'Select Basic',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$399',
    cadence: '/mo',
    blurb: 'Most teams start here—balanced reach with actionable analytics.',
    features: [
      'Everything in Basic',
      'National distribution lane',
      'Engagement + referral analytics',
      'Embargo scheduling windows',
      'Priority desk routing',
    ],
    cta: 'Select Pro',
    highlight: true,
  },
  {
    name: 'Premium',
    price: '$799',
    cadence: '/mo',
    blurb: 'Maximum reach with dedicated strategist coverage and API hooks.',
    features: [
      'Everything in Pro',
      'Premium syndication bundle',
      'Named account coordinator',
      'Custom landing modules',
      'Webhook + CRM export pack',
    ],
    cta: 'Select Premium',
    highlight: false,
  },
]

const comparison = [
  { label: 'Distribution depth', basic: 'Regional', pro: 'National', premium: 'National +' },
  { label: 'Analytics', basic: 'Delivery receipts', pro: 'Engagement + sources', premium: 'Full funnel + API' },
  { label: 'Media reach', basic: 'Core network', pro: 'Extended partners', premium: 'Premium partner pack' },
]

const addOns = [
  { title: 'Extra media circuit', copy: 'Add an industry vertical or metro focus for high-signal pickup.' },
  { title: 'Multimedia bundle', copy: 'Gallery, audio pull-quotes, and structured captions for rich cards.' },
  { title: 'Compliance review', copy: 'Optional legal/editorial pass for regulated announcements.' },
]

const faqs = [
  {
    q: 'Can we switch plans mid-cycle?',
    a: 'Yes. Upgrades apply immediately with prorated billing; downgrades take effect on the next renewal to avoid disrupting active distributions.',
  },
  {
    q: 'Do you offer annual contracts?',
    a: 'Annual billing is available on Pro and Premium with a modest discount. Talk to the desk for enterprise SLAs.',
  },
  {
    q: 'What analytics are included?',
    a: 'Pro adds engagement signals and referral sources. Premium layers in exports, webhooks, and CRM-ready summaries.',
  },
  {
    q: 'Are add-ons available on Basic?',
    a: 'Select add-ons can be attached to any tier; some bundles require Pro or Premium for technical dependencies.',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#f4f5f7] text-[#1a1f2e]">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden bg-[#262E53] text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(62,133,189,0.25),transparent_40%)]" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7BA3C3]">Pricing overview</p>
            <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Simple tiers. Predictable coverage.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#c8d0e4]">
              Pick the lane that matches your disclosure cadence. Every plan keeps the same structured release experience—only distribution depth and analytics change.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-18">
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-[1.25rem] border bg-white p-8 shadow-[0_20px_60px_rgba(38,46,83,0.08)] transition hover:-translate-y-0.5 ${
                  plan.highlight
                    ? 'border-[#3E85BD] ring-2 ring-[#3E85BD]/25'
                    : 'border-[#d9dee8]'
                }`}
              >
                {plan.highlight ? (
                  <span className="absolute -right-1 -top-3 inline-flex items-center gap-1 rounded-full bg-[#BB3426] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-md">
                    <Sparkles className="h-3 w-3" aria-hidden />
                    Popular
                  </span>
                ) : null}
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B7291]">{plan.name}</p>
                <p className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.03em] text-[#262E53]">
                  {plan.price}
                  <span className="text-lg font-medium text-[#6B7291]">{plan.cadence}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#4a5366]">{plan.blurb}</p>
                <ul className="mt-8 flex-1 space-y-3 text-sm text-[#3d465c]">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#3E85BD]" aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-10 inline-flex items-center justify-center rounded-full px-5 py-3 text-center text-sm font-semibold transition ${
                    plan.highlight
                      ? 'bg-[#3E85BD] text-white shadow-lg shadow-[#3E85BD]/30 hover:bg-[#3576a8]'
                      : 'border border-[#262E53]/12 bg-white text-[#262E53] hover:bg-[#f8f9fb]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-[#e5e8f0] bg-[#EEEEEE]/70">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#262E53] sm:text-3xl">Feature comparison</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#4a5366]">Distribution level, analytics depth, and partner reach at a glance.</p>
            <div className="mt-10 overflow-x-auto rounded-2xl border border-[#d9dee8] bg-white shadow-sm">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8ebf2] bg-[#f8f9fb] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B7291]">
                    <th className="px-6 py-4">Capability</th>
                    <th className="px-6 py-4">Basic</th>
                    <th className="px-6 py-4">Pro</th>
                    <th className="px-6 py-4">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.label} className="border-b border-[#eef1f6] last:border-0">
                      <td className="px-6 py-4 font-semibold text-[#262E53]">{row.label}</td>
                      <td className="px-6 py-4 text-[#4a5366]">{row.basic}</td>
                      <td className="px-6 py-4 text-[#4a5366]">{row.pro}</td>
                      <td className="px-6 py-4 text-[#4a5366]">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#262E53] sm:text-3xl">Add-ons</h2>
          <p className="mt-2 max-w-2xl text-sm text-[#4a5366]">Layer specialized coverage without changing your base tier.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {addOns.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#d9dee8] bg-white p-6 shadow-[0_12px_40px_rgba(38,46,83,0.06)]">
                <p className="font-semibold text-[#262E53]">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#4a5366]">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-[#e5e8f0] bg-white">
          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-18">
            <h2 className="text-center font-[family-name:var(--font-display)] text-2xl font-semibold text-[#262E53] sm:text-3xl">FAQ</h2>
            <Accordion type="single" collapsible className="mt-10 w-full">
              {faqs.map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`} className="border-[#e8ebf2]">
                  <AccordionTrigger className="text-left font-semibold text-[#262E53] hover:no-underline">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-[#4a5366]">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="bg-[#262E53] py-12 text-center text-white">
          <p className="text-sm text-[#c8d0e4]">Need a tailored bundle or regulated-industry workflow?</p>
          <Link href="/contact" className="mt-4 inline-flex rounded-full bg-[#3E85BD] px-6 py-3 text-sm font-semibold shadow-lg shadow-[#3E85BD]/25 hover:bg-[#3576a8]">
            Talk to the desk
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}
