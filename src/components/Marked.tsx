import { type ElementType, Fragment, useMemo } from 'react'
import { segmentText } from '@/lib/selection'
import { markColor } from '@/lib/tools'
import type { Mark } from '@/lib/api'

type Props = {
  anchorId: string
  text: string
  marks: Mark[]
  as?: ElementType
  className?: string
  onMarkClick?: (markId: string, ev: React.MouseEvent) => void
}

/**
 * Metni, uzerindeki isaretlemelerle birlikte render eder.
 * Isaretlemeler DOM'da degil veri katmaninda tutuldugu icin
 * sayfa degisip geri gelindiginde aynen korunur.
 */
export function Marked({ anchorId, text, marks, as: Tag = 'span', className, onMarkClick }: Props) {
  const mine = useMemo(
    () => marks.filter((m) => m.anchorId === anchorId),
    [marks, anchorId]
  )

  const segments = useMemo(
    () =>
      segmentText(
        text,
        mine.map((m) => ({
          id: m.id, start: m.start, end: m.end,
          style: m.style, color: m.color, note: m.note,
        }))
      ),
    [text, mine]
  )

  if (!mine.length) {
    return (
      <Tag data-anchor={anchorId} className={className}>
        {text}
      </Tag>
    )
  }

  return (
    <Tag data-anchor={anchorId} className={className}>
      {segments.map((seg, i) => {
        if (!seg.marks.length) return <Fragment key={i}>{seg.text}</Fragment>
        const top = seg.marks[seg.marks.length - 1]
        return (
          <mark
            key={i}
            className="hl"
            data-style={top.style}
            data-mark-id={top.id}
            data-has-note={top.note ? '1' : '0'}
            title={top.note || undefined}
            style={{ ['--hl' as string]: markColor(top.color).css }}
            onClick={(ev) => onMarkClick?.(top.id, ev)}
          >
            {seg.text}
          </mark>
        )
      })}
    </Tag>
  )
}
