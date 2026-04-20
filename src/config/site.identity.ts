export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'qwtpd5gupi',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'releaseprCore',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'National-grade press distribution',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'releaseprCore helps teams publish press releases with clear structure, professional presentation, and distribution-ready formatting.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'releaseprcore.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://releaseprcore.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
