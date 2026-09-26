import { useCallback, useEffect, useRef, useState } from 'react'
import type { Stroke } from '@/lib/api'

type Pt = [number, number]

type Props = {
  strokes: Stroke[]
  mode: 'off' | 'pen' | 'marker' | 'eraser'
  color: string
  width: number
  onCommit: (s: { tool: 'pen' | 'marker'; color: string; width: number; points: Pt[] }) => void
  onErase: (strokeId: string) => void
}

/** Noktalari yumusak bir SVG path'ine cevirir (orta nokta quadratic). */
function toPath(points: Pt[], scale: number): string {
  if (points.length === 0) return ''
  const p = points.map(([x, y]) => [x * scale, y * scale] as Pt)
  if (p.length === 1) return `M${p[0][0]} ${p[0][1]} l0.1 0.1`
  if (p.length === 2) return `M${p[0][0]} ${p[0][1]} L${p[1][0]} ${p[1][1]}`
  let d = `M${p[0][0]} ${p[0][1]}`
  for (let i = 1; i < p.length - 1; i++) {
    const mx = (p[i][0] + p[i + 1][0]) / 2
    const my = (p[i][1] + p[i + 1][1]) / 2
    d += ` Q${p[i][0]} ${p[i][1]} ${mx} ${my}`
  }
  const last = p[p.length - 1]
  d += ` L${last[0]} ${last[1]}`
  return d
}

export function PenLayer({ strokes, mode, color, width, onCommit, onErase }: Props) {
  const ref = useRef<SVGSVGElement>(null)
  const [size, setSize] = useState({ w: 1 })
  const [live, setLive] = useState<Pt[] | null>(null)
  const drawing = useRef(false)

  const drawingMode = mode === 'pen' || mode === 'marker'
  const erasing = mode === 'eraser'

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      setSize({ w: r.width || 1 })
    }
    const ro = new ResizeObserver(measure)
    ro.observe(el.parentElement ?? el)
    measure()
    return () => ro.disconnect()
  }, [])

  const toLocal = useCallback((ev: React.PointerEvent): Pt => {
    const r = ref.current!.getBoundingClientRect()
    const w = r.width || 1
    return [(ev.clientX - r.left) / w, (ev.clientY - r.top) / w]
  }, [])

  const onDown = (ev: React.PointerEvent) => {
    if (!drawingMode) return
    ev.preventDefault()
    ;(ev.currentTarget as Element).setPointerCapture?.(ev.pointerId)
    drawing.current = true
    setLive([toLocal(ev)])
  }

  const onMove = (ev: React.PointerEvent) => {
    if (!drawing.current || !drawingMode) return
    const pt = toLocal(ev)
    setLive((prev) => {
      if (!prev) return [pt]
      const last = prev[prev.length - 1]
      const dx = pt[0] - last[0]
      const dy = pt[1] - last[1]
      if (dx * dx + dy * dy < 0.0000035) return prev
      return [...prev, pt]
    })
  }

  const onUp = () => {
    if (!drawing.current) return
    drawing.current = false
    if (!drawingMode) return
    setLive((prev) => {
      if (prev && prev.length > 1) {
        onCommit({ tool: mode as 'pen' | 'marker', color, width, points: prev })
      }
      return null
    })
  }

  return (
    <svg
      ref={ref}
      className="absolute inset-0 h-full w-full"
      style={{
        // Silgi modunda katman tiklamalari gecirir; yalnizca cizgilerin
        // kendisi tiklanabilir olur, boylece metin isaretleri de silinebilir.
        pointerEvents: drawingMode ? 'auto' : 'none',
        cursor: drawingMode ? 'crosshair' : 'auto',
        touchAction: drawingMode ? 'none' : 'auto',
      }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      onPointerCancel={onUp}
    >
      {strokes.map((s) => (
        <g key={s.id}>
          <path
            d={toPath(s.points as Pt[], size.w)}
            fill="none"
            stroke={s.color}
            strokeWidth={s.width * (s.tool === 'marker' ? 5 : 1)}
            strokeOpacity={s.tool === 'marker' ? 0.32 : 0.92}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {erasing && (
            <path
              d={toPath(s.points as Pt[], size.w)}
              fill="none"
              stroke="transparent"
              strokeWidth={Math.max(16, s.width * 6)}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pointerEvents: 'stroke', cursor: 'cell' }}
              onPointerDown={() => onErase(s.id)}
              onPointerEnter={(e) => {
                if (e.buttons === 1) onErase(s.id)
              }}
            />
          )}
        </g>
      ))}
      {live && (
        <path
          d={toPath(live, size.w)}
          fill="none"
          stroke={color}
          strokeWidth={width * (mode === 'marker' ? 5 : 1)}
          strokeOpacity={mode === 'marker' ? 0.32 : 0.92}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}
