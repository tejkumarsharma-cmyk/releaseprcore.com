export type SiteFontConfig = {
  sansFamily: string
  displayFamily: string
  monoFamily?: string
  sansWeights?: number[]
  displayWeights?: number[]
  monoWeights?: number[]
}

export const SITE_FONT_CONFIG: SiteFontConfig = {
  sansFamily: 'Inter',
  displayFamily: 'Plus Jakarta Sans',
  monoFamily: 'IBM Plex Mono',
  sansWeights: [400, 500, 600, 700],
  displayWeights: [500, 600, 700, 800],
  monoWeights: [400, 500, 600],
}

const normalizeWeights = (weights?: number[]) => {
  if (!Array.isArray(weights) || !weights.length) return ''
  return Array.from(new Set(weights))
    .filter((w) => Number.isFinite(w) && w >= 100 && w <= 900)
    .sort((a, b) => a - b)
    .join(';')
}

const familyToQuery = (family: string, weights?: number[]) => {
  const cleaned = family.trim()
  if (!cleaned) return null
  const familyName = cleaned.replace(/\s+/g, '+')
  const weightQuery = normalizeWeights(weights)
  return weightQuery ? `family=${familyName}:wght@${weightQuery}` : `family=${familyName}`
}

export function getGoogleFontsHref(config: SiteFontConfig = SITE_FONT_CONFIG) {
  const families = [
    familyToQuery(config.sansFamily, config.sansWeights),
    familyToQuery(config.displayFamily, config.displayWeights),
    familyToQuery(config.monoFamily || '', config.monoWeights),
  ].filter((item): item is string => Boolean(item))

  if (!families.length) return null
  return `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`
}

export function getSiteFontVariables(config: SiteFontConfig = SITE_FONT_CONFIG) {
  const sans = config.sansFamily?.trim() || 'system-ui'
  const display = config.displayFamily?.trim() || sans
  const mono = config.monoFamily?.trim() || 'ui-monospace'
  return {
    '--site-font-sans': `'${sans}'`,
    '--site-font-display': `'${display}'`,
    '--site-font-mono': `'${mono}'`,
  } as Record<string, string>
}
