import type { FlatPage } from '@/content/types'
import { IcChevronLeft, IcChevronRight } from './Icons'

type Props = {
  pages: FlatPage[]
  index: number
  onGoto: (i: number) => void
  seen: Set<string>
}

export function PageNav({ pages, index, onGoto, seen }: Props) {
  const total = pages.length
  const current = pages[index]
  const pct = total > 1 ? (index / (total - 1)) * 100 : 100
  const readPct = Math.round((seen.size / total) * 100)

  return (
    <div className="panel flex items-center gap-2 px-2.5 py-2 sm:gap-3 sm:px-3.5">
      <button
        className="btn-ghost shrink-0 px-2.5 py-2 sm:px-3"
        onClick={() => onGoto(index - 1)}
        disabled={index === 0}
        title="Önceki sayfa (←)"
      >
        <IcChevronLeft size={17} />
        <span className="hidden font-sans text-[12.5px] sm:inline">Önceki</span>
      </button>

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex items-baseline gap-2">
          <span className="tabular shrink-0 font-sans text-[12.5px] font-bold text-ink-800">
            {current.folio}
            <span className="font-normal text-ink-400"> / {total}</span>
          </span>
          <span className="truncate font-sans text-[11.5px] text-ink-400">{current.page.title}</span>
          <span className="tabular ml-auto hidden shrink-0 font-sans text-[11px] text-ink-400 sm:inline">
            %{readPct} okundu
          </span>
        </div>

        <div className="group relative h-6">
          {/* okunan sayfa izleri */}
          <div className="pointer-events-none absolute inset-x-0 top-[9px] flex h-2 gap-[2px]">
            {pages.map((p, i) => (
              <span
                key={p.page.id}
                className={[
                  'h-full flex-1 rounded-[2px] transition-colors',
                  i === index
                    ? 'bg-brand-500'
                    : seen.has(p.page.id)
                      ? 'bg-brand-300/70'
                      : p.page.kind === 'quiz'
                        ? 'bg-ink-800/18'
                        : 'bg-ink-800/10',
                ].join(' ')}
              />
            ))}
          </div>
          <input
            type="range"
            min={0}
            max={total - 1}
            value={index}
            onChange={(e) => onGoto(Number(e.target.value))}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label="Sayfa seç"
          />
          <div
            className="pointer-events-none absolute top-[4px] h-4 w-1.5 -translate-x-1/2 rounded-full bg-brand-600 shadow-sm transition-all"
            style={{ left: `${pct}%` }}
          />
        </div>
      </div>

      <button
        className="btn-ghost shrink-0 px-2.5 py-2 sm:px-3"
        onClick={() => onGoto(index + 1)}
        disabled={index === total - 1}
        title="Sonraki sayfa (→)"
      >
        <span className="hidden font-sans text-[12.5px] sm:inline">Sonraki</span>
        <IcChevronRight size={17} />
      </button>
    </div>
  )
}
