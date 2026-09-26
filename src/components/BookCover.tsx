import type { Book } from '@/content/types'
import { subjectById } from '@/content'

function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.max(0, Math.min(255, (n >> 16) + amt))
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + amt))
  const b = Math.max(0, Math.min(255, (n & 0xff) + amt))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

type Props = {
  book: Book
  className?: string
  /** 'sm' liste, 'md' izgara, 'lg' detay */
  size?: 'sm' | 'md' | 'lg'
}

export function BookCover({ book, className = '', size = 'md' }: Props) {
  const subject = subjectById(book.subjectId)!
  const dark = shade(subject.color, -34)
  const light = shade(subject.color, 26)

  const scale = size === 'sm' ? 0.62 : size === 'lg' ? 1.22 : 1

  return (
    <div
      className={`relative aspect-[2/2.85] w-full overflow-hidden rounded-r-lg rounded-l-[4px] ${className}`}
      style={{
        background: `linear-gradient(145deg, ${light} 0%, ${subject.color} 38%, ${dark} 100%)`,
        boxShadow:
          '0 1px 2px rgba(25,21,16,.2), 0 14px 26px -14px rgba(25,21,16,.55), inset 0 1px 0 rgba(255,255,255,.16)',
      }}
    >
      {/* sırt */}
      <div
        className="absolute inset-y-0 left-0 w-[9%]"
        style={{
          background: `linear-gradient(to right, rgba(0,0,0,.42), rgba(0,0,0,.14) 55%, rgba(255,255,255,.1))`,
        }}
      />
      <div className="absolute inset-y-0 left-[9%] w-px bg-white/18" />

      {/* doku */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* parlama */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(118deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,0) 34%, rgba(255,255,255,0) 70%, rgba(255,255,255,.08) 100%)',
        }}
      />

      <div
        className="relative flex h-full flex-col px-[11%] pb-[7%] pl-[15%] pt-[9%]"
        style={{ fontSize: `${scale}rem` }}
      >
        <div
          className="mb-[6%] font-sans font-bold uppercase tracking-[0.2em] text-white/70"
          style={{ fontSize: '0.44em' }}
        >
          Ali Kerem Yayınları
        </div>

        <div
          className="mb-[5%] h-px w-[38%]"
          style={{ background: 'rgba(255,255,255,.35)' }}
        />

        <div
          className="font-sans font-bold uppercase tracking-[0.13em] text-white/85"
          style={{ fontSize: '0.5em' }}
        >
          {subject.name}
        </div>

        <h3
          className="mt-[3%] font-serif font-semibold leading-[1.12] text-white"
          style={{ fontSize: '1.02em', textShadow: '0 1px 2px rgba(0,0,0,.28)' }}
        >
          {book.title.split('—')[1]?.trim() || book.title}
        </h3>

        <div className="mt-auto">
          <div
            className="mb-[4%] flex items-center gap-[4%]"
            style={{ fontSize: '0.46em' }}
          >
            <span className="rounded-full bg-white/18 px-[0.7em] py-[0.32em] font-sans font-bold uppercase tracking-[0.12em] text-white/90">
              8. Sınıf
            </span>
            <span className="rounded-full bg-white/18 px-[0.7em] py-[0.32em] font-sans font-bold uppercase tracking-[0.12em] text-white/90">
              LGS
            </span>
          </div>
          <div
            className="font-serif italic text-white/60"
            style={{ fontSize: '0.46em' }}
          >
            {book.edition} · {book.year}
          </div>
        </div>

        <div
          className="pointer-events-none absolute grid place-items-center rounded-full border text-white/35"
          style={{
            right: '9%',
            top: '8%',
            width: '2.3em',
            height: '2.3em',
            fontSize: '0.9em',
            borderColor: 'rgba(255,255,255,.3)',
          }}
        >
          {subject.icon}
        </div>
      </div>
    </div>
  )
}
