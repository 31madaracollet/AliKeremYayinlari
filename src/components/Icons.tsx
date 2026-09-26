import type { CSSProperties } from 'react'

type P = { className?: string; size?: number; strokeWidth?: number; style?: CSSProperties }

const base = (size = 18, strokeWidth = 1.7) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

export const IcBook = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
    <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H19v3H6.5A2.5 2.5 0 0 1 4 20.5z" />
  </svg>
)

export const IcLibrary = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="M4 4h3v16H4zM9 4h3v16H9z" />
    <path d="m14.5 5.2 2.9-.8 3 11.6-2.9.8z" />
    <path d="M4 20h16" />
  </svg>
)

export const IcTarget = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
)

export const IcChart = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>
)

export const IcHighlighter = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="m9 14 6.5-6.5a2.1 2.1 0 0 1 3 0l1.5 1.5a2.1 2.1 0 0 1 0 3L13.5 18.5" />
    <path d="M9 14 6 17l1.5 3h5l1-1.5" />
    <path d="M4 21h6" />
  </svg>
)

export const IcPen = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4z" />
    <path d="m14.5 5.5 4 4" />
  </svg>
)

export const IcUnderline = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="M7 4v6a5 5 0 0 0 10 0V4" />
    <path d="M5 20h14" />
  </svg>
)

export const IcStrike = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="M4 12h16" />
    <path d="M7.5 7.5A4 4 0 0 1 11.5 5h2a4 4 0 0 1 3.6 2.2" />
    <path d="M6.6 16a4 4 0 0 0 3.9 3h3a4 4 0 0 0 3.5-2.1" />
  </svg>
)

export const IcEraser = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="m4.5 14.5 6-6a2 2 0 0 1 2.8 0l4.2 4.2a2 2 0 0 1 0 2.8l-4 4H8l-3.5-3.5a2 2 0 0 1 0-1.5z" />
    <path d="M13 20h7" />
  </svg>
)

export const IcCursor = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="m5 3 6.5 17 2.3-6.6 6.7-2.4z" />
  </svg>
)

export const IcNote = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="M5 4h11l4 4v12H5z" />
    <path d="M16 4v4h4" />
    <path d="M9 12h6M9 16h4" />
  </svg>
)

export const IcBookmark = ({ className, size, strokeWidth, style, filled }: P & { filled?: boolean }) => (
  <svg {...base(size, strokeWidth)} className={className} style={style} fill={filled ? 'currentColor' : 'none'}>
    <path d="M6 3h12v18l-6-4.5L6 21z" />
  </svg>
)

export const IcChevronLeft = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="m15 5-7 7 7 7" />
  </svg>
)

export const IcChevronRight = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="m9 5 7 7-7 7" />
  </svg>
)

export const IcChevronDown = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="m5 9 7 7 7-7" />
  </svg>
)

export const IcList = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
  </svg>
)

export const IcPlus = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const IcTrash = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="M4 7h16M10 11v6M14 11v6" />
    <path d="M6 7l1 13h10l1-13M9 7V4h6v3" />
  </svg>
)

export const IcSearch = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </svg>
)

export const IcPin = ({ className, size, strokeWidth, style, filled }: P & { filled?: boolean }) => (
  <svg {...base(size, strokeWidth)} className={className} style={style} fill={filled ? 'currentColor' : 'none'}>
    <path d="M9 3h6l-1 6 3.5 3.5V15H6.5v-2.5L10 9z" />
    <path d="M12 15v6" />
  </svg>
)

export const IcCheck = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
)

export const IcX = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const IcClock = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5.2l3 1.8" />
  </svg>
)

export const IcSettings = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 14a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 4 14a2 2 0 1 1 0-4 1.7 1.7 0 0 0 1.4-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 11 4a2 2 0 1 1 4 0 1.7 1.7 0 0 0 2.9 1.4l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 20 12" />
  </svg>
)

export const IcLogout = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
    <path d="M10 8 6 12l4 4M6 12h10" />
  </svg>
)

export const IcPanelLeft = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M10 4v16" />
  </svg>
)

export const IcPanelRight = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M14 4v16" />
  </svg>
)

export const IcSparkle = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.2 10.2 12.6 4.5 10.8 10.2 9z" />
  </svg>
)

export const IcFlame = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="M12 3s5 4.2 5 9a5 5 0 0 1-10 0c0-1.6.7-3 1.6-4.2.3 1.2 1 2 1.9 2 .9 0 .6-2.6 1.5-6.8z" />
  </svg>
)

export const IcUndo = ({ className, size, strokeWidth, style }: P) => (
  <svg {...base(size, strokeWidth)} className={className} style={style}>
    <path d="M4 9h11a5 5 0 0 1 0 10h-6" />
    <path d="m7.5 5.5-3.5 3.5 3.5 3.5" />
  </svg>
)
