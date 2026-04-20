'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import dynamic from 'next/dynamic'

export const NAVBAR_OVERRIDE_ENABLED = true

const NavbarAuthControls = dynamic(
  () => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls),
  { ssr: false, loading: () => null }
)

const primaryLinks = [
  { label: 'Press releases', href: '/updates' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
]

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-[#1e2744] bg-[#262E53] text-white shadow-[0_8px_32px_rgba(15,18,32,0.35)]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sm font-extrabold tracking-tight text-white ring-1 ring-white/15">
            rC
          </span>
          <span className="min-w-0">
            <span className="block truncate font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.03em] text-white">
              {SITE_CONFIG.name}
            </span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-[#7BA3C3] sm:block">
              {siteContent.navbar.tagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {primaryLinks.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active ? 'bg-white/12 text-white' : 'text-[#c8d0e4] hover:bg-white/8 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/search"
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#c8d0e4] transition hover:bg-white/10 hover:text-white"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="rounded-full text-[#e8ecf7] hover:bg-white/10 hover:text-white">
                <Link href="/login">Log in</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="rounded-full border-0 bg-[#3E85BD] px-5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(62,133,189,0.35)] hover:bg-[#3576a8]"
              >
                <Link href="/register">Create account</Link>
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-[#1e2744] px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {primaryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-white/90"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/search"
              className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-[#c8d0e4]"
              onClick={() => setOpen(false)}
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
            {!isAuthenticated ? (
              <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
                <Link href="/login" className="rounded-xl px-3 py-2 text-sm font-semibold text-white/90" onClick={() => setOpen(false)}>
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-[#3E85BD] px-3 py-3 text-center text-sm font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Create account
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
