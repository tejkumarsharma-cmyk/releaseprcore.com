import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Press distribution platform',
  },
  footer: {
    tagline: 'Structured releases, accountable publishing, distribution-ready output.',
  },
  hero: {
    badge: 'Press wire',
    title: ['Distribute your news with editorial-grade clarity.'],
    description:
      'Publish announcements that read well in feeds, inboxes, and syndicated surfaces—without losing the structure journalists expect.',
    primaryCta: {
      label: 'Browse press releases',
      href: '/updates',
    },
    secondaryCta: {
      label: 'Contact',
      href: '/contact',
    },
    searchPlaceholder: 'Search releases',
    focusLabel: 'Latest',
    featureCardBadge: 'Desk note',
    featureCardTitle: 'Releases stay readable from headline to body.',
    featureCardDescription:
      'Categories, timestamps, and summaries are surfaced consistently so scanners and long readers both get what they need.',
  },
  home: {
    metadata: {
      title: 'Press releases and official announcements',
      description:
        'Browse the latest press releases from releaseprCore—structured stories built for professional distribution.',
      openGraphTitle: 'Press releases and official announcements',
      openGraphDescription:
        'National-style press distribution with clean typography, accountable metadata, and archive-friendly layouts.',
      keywords: ['press release', 'media distribution', 'announcements', 'releaseprCore', 'newsroom'],
    },
    introBadge: 'Why teams use releaseprCore',
    introTitle: 'Built for disclosure, earnings, launches, and regulated updates.',
    introParagraphs: [
      'The interface favors clarity: strong headlines, disciplined summaries, and article pages that stay legible on every device.',
      'Archives are easy to filter so readers can move by topic or date without hunting through unrelated tasks.',
      'The system stays compatible with the full product surface—other routes remain available even when the homepage emphasizes press.',
    ],
    sideBadge: 'What you get',
    sidePoints: [
      'Syndication-friendly article layout with featured imagery support.',
      'Category filters and search that respect the same metadata as your CMS.',
      'Pricing and contact surfaces that match the rest of the brand system.',
      'Fast, accessible pages with lightweight motion—not heavy scripts.',
    ],
    primaryLink: {
      label: 'Open the archive',
      href: '/updates',
    },
    secondaryLink: {
      label: 'Talk to us',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Ready when you are',
    title: 'Need a walkthrough of plans, add-ons, or compliance-friendly workflows?',
    description:
      'Reach the team for distribution questions, media contacts, or enterprise options. We respond with clear next steps—no generic queues.',
    primaryCta: {
      label: 'Contact',
      href: '/contact',
    },
    secondaryCta: {
      label: 'View pricing',
      href: '/pricing',
    },
  },
  taskSectionHeading: 'Latest releases',
  taskSectionDescriptionSuffix: 'Newest published items from the wire.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Read the latest posts and long-form updates.',
  },
  listing: {
    title: 'Listings',
    description: 'Explore listings and directory-style entries.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Browse classifieds and short-form notices.',
  },
  image: {
    title: 'Images',
    description: 'Browse image-led updates and visual posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'View profile pages and public identities.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Browse curated resources and saved links.',
  },
  pdf: {
    title: 'Resources',
    description: 'Open PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Press releases',
    description: 'Search and filter official announcements and media-ready stories.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Listings', paragraphs: ['Directory entries and service pages.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Articles', paragraphs: ['General long-form article feed.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Profile pages and identity surfaces.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Press release archive',
    paragraphs: [
      'Scan headlines, filter by category, or jump into a full release page for complete context and media contacts.',
      'Every item keeps the same structured fields your team publishes from the dashboard—dates, authors, and categories stay aligned.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
    ],
  },
}
