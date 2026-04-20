import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'

export const FOOTER_OVERRIDE_ENABLED = true

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Press releases', href: '/updates' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Search', href: '/search' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help', href: '/help' },
      { label: 'Status', href: '/status' },
      { label: 'Developers', href: '/developers' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
]

export function FooterOverride() {
  return (
    <footer className="border-t border-[#1e2744] bg-[#262E53] text-[#c8d0e4]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.1fr_2fr]">
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">{SITE_CONFIG.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#9aa3bd]">{siteContent.footer.tagline}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7BA3C3]">{col.title}</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[#d5dbe9] transition hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-[#8b93ab] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-[#6B7291]">{SITE_CONFIG.domain}</p>
        </div>
      </div>
    </footer>
  )
}
