export const siteTaskDefinitions = [
  {
    key: 'mediaDistribution',
    label: 'Press releases',
    route: '/updates',
    description: 'Official announcements, filings, and media-ready stories.',
    contentType: 'mediaDistribution',
    enabled: true,
  },
] as const

export const siteTaskViews = {
  mediaDistribution: '/updates',
} as const
