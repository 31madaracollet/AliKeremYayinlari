export type ToolId = 'cursor' | 'highlight' | 'underline' | 'strike' | 'pen' | 'marker' | 'eraser'

export type MarkColorId = 'sari' | 'yesil' | 'pembe' | 'mavi' | 'turuncu' | 'mor'

export const MARK_COLORS: Record<MarkColorId, { label: string; css: string; dot: string }> = {
  sari: { label: 'Sarı', css: 'rgba(255, 214, 64, .55)', dot: '#f6c945' },
  yesil: { label: 'Yeşil', css: 'rgba(126, 217, 128, .5)', dot: '#6fc472' },
  pembe: { label: 'Pembe', css: 'rgba(255, 145, 175, .5)', dot: '#f37fa2' },
  mavi: { label: 'Mavi', css: 'rgba(123, 189, 255, .5)', dot: '#6cabe8' },
  turuncu: { label: 'Turuncu', css: 'rgba(255, 164, 94, .52)', dot: '#f39250' },
  mor: { label: 'Mor', css: 'rgba(191, 154, 255, .5)', dot: '#a887e6' },
}

export const PEN_COLORS = [
  { id: 'lacivert', label: 'Lacivert', hex: '#1f3b8a' },
  { id: 'kirmizi', label: 'Kırmızı', hex: '#c0392b' },
  { id: 'siyah', label: 'Siyah', hex: '#20201c' },
  { id: 'yesil', label: 'Yeşil', hex: '#2e7d4f' },
  { id: 'mor', label: 'Mor', hex: '#6d3fa0' },
] as const

export const PEN_WIDTHS = [
  { id: 'ince', label: 'İnce', value: 1.6 },
  { id: 'orta', label: 'Orta', value: 2.8 },
  { id: 'kalin', label: 'Kalın', value: 4.5 },
] as const

export const markColor = (id: string) => MARK_COLORS[(id as MarkColorId) in MARK_COLORS ? (id as MarkColorId) : 'sari']

export const isMarkTool = (t: ToolId): t is 'highlight' | 'underline' | 'strike' =>
  t === 'highlight' || t === 'underline' || t === 'strike'

export const isDrawTool = (t: ToolId): t is 'pen' | 'marker' => t === 'pen' || t === 'marker'

export type ReaderPrefs = {
  tool: ToolId
  markColor: MarkColorId
  penColor: string
  penWidth: number
  fontSize: number
  lineHeight: number
  measure: number
  theme: 'kagit' | 'sepya' | 'gece'
  leftOpen: boolean
  rightOpen: boolean
}

export const DEFAULT_PREFS: ReaderPrefs = {
  tool: 'cursor',
  markColor: 'sari',
  penColor: '#1f3b8a',
  penWidth: 2.8,
  fontSize: 17.5,
  lineHeight: 1.85,
  measure: 66,
  theme: 'kagit',
  leftOpen: true,
  rightOpen: true,
}

const PREFS_KEY = 'aky.prefs'

export function loadPrefs(): ReaderPrefs {
  try {
    const raw = localStorage.getItem(PREFS_KEY)
    if (!raw) return { ...DEFAULT_PREFS }
    return { ...DEFAULT_PREFS, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT_PREFS }
  }
}

export function savePrefs(p: ReaderPrefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(p))
  } catch {
    /* kota dolu olabilir */
  }
}
