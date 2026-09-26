/**
 * Metin secimi <-> karakter ofseti donusumleri.
 * Isaretlemeler (fosforlu, alti cizili) DOM'a degil, "anchor" basina
 * karakter araligi olarak kaydedilir; boylece yeniden render'da kaybolmaz.
 */

export const ANCHOR_ATTR = 'data-anchor'

export function findAnchor(node: Node | null): HTMLElement | null {
  let el: HTMLElement | null =
    node && node.nodeType === Node.ELEMENT_NODE
      ? (node as HTMLElement)
      : (node?.parentElement ?? null)
  while (el && !el.hasAttribute(ANCHOR_ATTR)) el = el.parentElement
  return el
}

/** Anchor kokune gore bir DOM konumunun duz metin ofsetini hesaplar. */
export function offsetInAnchor(root: HTMLElement, node: Node, offset: number): number {
  if (node.nodeType !== Node.TEXT_NODE) {
    // Eleman icindeki `offset`. cocuk indeksidir
    const children = Array.from(node.childNodes).slice(0, offset)
    const before = children.reduce((n, c) => n + (c.textContent?.length ?? 0), 0)
    const prefix = precedingLength(root, node)
    return prefix + before
  }
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let total = 0
  let cur: Node | null
  while ((cur = walker.nextNode())) {
    if (cur === node) return total + offset
    total += cur.textContent?.length ?? 0
  }
  return total
}

function precedingLength(root: HTMLElement, node: Node): number {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let total = 0
  let cur: Node | null
  while ((cur = walker.nextNode())) {
    if (node.contains(cur)) break
    total += cur.textContent?.length ?? 0
  }
  return total
}

export type SelectionRange = {
  anchorId: string
  start: number
  end: number
  quote: string
}

export function readSelection(container: HTMLElement): SelectionRange | null {
  const sel = window.getSelection()
  if (!sel || sel.isCollapsed || sel.rangeCount === 0) return null

  const range = sel.getRangeAt(0)
  if (!container.contains(range.commonAncestorContainer)) return null

  const startAnchor = findAnchor(range.startContainer)
  const endAnchor = findAnchor(range.endContainer)
  if (!startAnchor || startAnchor !== endAnchor) return null

  const anchorId = startAnchor.getAttribute(ANCHOR_ATTR)
  if (!anchorId) return null

  let start = offsetInAnchor(startAnchor, range.startContainer, range.startOffset)
  let end = offsetInAnchor(startAnchor, range.endContainer, range.endOffset)
  if (start > end) [start, end] = [end, start]

  const full = startAnchor.textContent ?? ''
  // bastaki/sondaki bosluklari kirp
  while (start < end && /\s/.test(full[start] ?? '')) start++
  while (end > start && /\s/.test(full[end - 1] ?? '')) end--
  if (end - start < 1) return null

  return { anchorId, start, end, quote: full.slice(start, end) }
}

export function clearSelection() {
  const sel = window.getSelection()
  if (sel) sel.removeAllRanges()
}

export type Segment = {
  text: string
  marks: { id: string; style: string; color: string; note: string }[]
}

/** Metni, uzerine denk gelen isaretlere gore parcalara boler. */
export function segmentText(
  text: string,
  marks: { id: string; start: number; end: number; style: string; color: string; note: string }[]
): Segment[] {
  if (!marks.length) return [{ text, marks: [] }]

  const points = new Set<number>([0, text.length])
  for (const m of marks) {
    const s = Math.max(0, Math.min(text.length, m.start))
    const e = Math.max(0, Math.min(text.length, m.end))
    if (e > s) {
      points.add(s)
      points.add(e)
    }
  }
  const sorted = [...points].sort((a, b) => a - b)
  const out: Segment[] = []
  for (let i = 0; i < sorted.length - 1; i++) {
    const a = sorted[i]
    const b = sorted[i + 1]
    if (b <= a) continue
    const covering = marks.filter((m) => m.start <= a && m.end >= b)
    out.push({
      text: text.slice(a, b),
      marks: covering.map((m) => ({ id: m.id, style: m.style, color: m.color, note: m.note })),
    })
  }
  return out
}
