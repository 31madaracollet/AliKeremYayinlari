import type { Block } from '@/content/types'
import type { Mark } from '@/lib/api'
import { Marked } from './Marked'
import { Figure } from './Figures'

const CALLOUT_STYLE: Record<
  string,
  { label: string; ring: string; bg: string; accent: string; icon: string }
> = {
  bilgi: { label: 'Bilgi', ring: 'border-sky-800/15', bg: 'bg-sky-50/60', accent: 'text-sky-900/80', icon: 'ⓘ' },
  ipucu: { label: 'İpucu', ring: 'border-forest-500/25', bg: 'bg-forest-100/45', accent: 'text-forest-700', icon: '✦' },
  dikkat: { label: 'Dikkat', ring: 'border-brand-500/25', bg: 'bg-brand-50/70', accent: 'text-brand-700', icon: '!' },
  formul: { label: 'Formül', ring: 'border-ink-800/15', bg: 'bg-paper-200/45', accent: 'text-ink-800', icon: '∑' },
  tanim: { label: 'Tanım', ring: 'border-purple-800/15', bg: 'bg-purple-50/50', accent: 'text-purple-900/80', icon: '§' },
}

type Ctx = {
  marks: Mark[]
  onMarkClick?: (id: string, ev: React.MouseEvent) => void
}

export function BlockView({ block, ctx }: { block: Block; ctx: Ctx }) {
  const a = (suffix = '') => `${block.id}${suffix}`
  const m = ctx.marks
  const click = ctx.onMarkClick

  switch (block.type) {
    case 'h2':
      return (
        <Marked
          as="h2" anchorId={a()} text={block.text} marks={m} onMarkClick={click}
          className="mb-4 mt-9 font-serif text-[1.6em] font-semibold leading-tight text-ink-900 first:mt-0"
        />
      )

    case 'h3':
      return (
        <Marked
          as="h3" anchorId={a()} text={block.text} marks={m} onMarkClick={click}
          className="mb-2.5 mt-7 font-serif text-[1.22em] font-semibold leading-snug text-ink-800"
        />
      )

    case 'p':
      return (
        <Marked
          as="p" anchorId={a()} text={block.text} marks={m} onMarkClick={click}
          className="mb-4 text-justify hyphens-auto"
        />
      )

    case 'list':
      return (
        <ol
          className={[
            'mb-5 space-y-2 pl-1',
            block.ordered ? 'list-none counter-reset' : 'list-none',
          ].join(' ')}
        >
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span
                className={[
                  'mt-[0.42em] shrink-0 select-none font-sans text-[0.72em] font-bold',
                  block.ordered
                    ? 'flex h-[1.55em] w-[1.55em] items-center justify-center rounded-full bg-brand-500/12 text-brand-700'
                    : 'text-brand-400',
                ].join(' ')}
              >
                {block.ordered ? i + 1 : '◆'}
              </span>
              <Marked
                as="span" anchorId={a(`#${i}`)} text={item} marks={m} onMarkClick={click}
                className="flex-1 leading-[1.75]"
              />
            </li>
          ))}
        </ol>
      )

    case 'callout': {
      const s = CALLOUT_STYLE[block.variant] ?? CALLOUT_STYLE.bilgi
      return (
        <aside className={`my-6 rounded-2xl border ${s.ring} ${s.bg} px-5 py-4`}>
          <div className={`mb-1.5 flex items-center gap-2 font-sans text-[0.72em] font-bold uppercase tracking-[0.13em] ${s.accent}`}>
            <span className="grid h-5 w-5 place-items-center rounded-md bg-white/70 text-[0.9em] leading-none">
              {s.icon}
            </span>
            {block.title || s.label}
          </div>
          <Marked
            as="div" anchorId={a()} text={block.text} marks={m} onMarkClick={click}
            className={`whitespace-pre-line text-[0.97em] leading-[1.75] ${block.variant === 'formul' ? 'font-mono text-[0.92em]' : ''}`}
          />
        </aside>
      )
    }

    case 'example':
      return (
        <section className="my-7 overflow-hidden rounded-2xl border border-ink-800/12 bg-paper-100/40">
          <header className="flex items-center gap-2 border-b border-ink-800/10 bg-paper-200/40 px-5 py-2.5">
            <span className="grid h-5 w-5 place-items-center rounded-md bg-brand-500/15 font-sans text-[0.7em] font-bold text-brand-700">
              ✎
            </span>
            <span className="font-sans text-[0.72em] font-bold uppercase tracking-[0.13em] text-ink-500">
              {block.title || 'Örnek'}
            </span>
          </header>
          <div className="px-5 py-4">
            <Marked
              as="p" anchorId={a('#q')} text={block.question} marks={m} onMarkClick={click}
              className="mb-3.5 font-medium leading-[1.75]"
            />
            <div className="space-y-2 border-l-2 border-forest-300 pl-4">
              {block.solution.map((step, i) => (
                <div key={i} className="flex gap-2.5">
                  <span className="mt-[0.35em] shrink-0 font-sans text-[0.66em] font-bold text-forest-500">
                    {i + 1}
                  </span>
                  <Marked
                    as="span" anchorId={a(`#s${i}`)} text={step} marks={m} onMarkClick={click}
                    className="flex-1 text-[0.95em] leading-[1.7] text-ink-600"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )

    case 'table':
      return (
        <figure className="my-6">
          <div className="overflow-x-auto rounded-xl border border-ink-800/12">
            <table className="w-full border-collapse text-left text-[0.9em]">
              <thead>
                <tr className="bg-paper-200/50">
                  {block.headers.map((h, i) => (
                    <th
                      key={i}
                      className="border-b border-ink-800/12 px-3.5 py-2.5 font-sans text-[0.78em] font-bold uppercase tracking-wider text-ink-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r} className="odd:bg-paper-100/30">
                    {row.map((cell, c) => (
                      <td key={c} className="border-b border-ink-800/7 px-3.5 py-2.5 align-top leading-[1.6]">
                        <Marked
                          as="span" anchorId={a(`#r${r}c${c}`)} text={cell} marks={m} onMarkClick={click}
                          className={c === 0 ? 'font-medium text-ink-800' : 'text-ink-600'}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && (
            <figcaption className="mt-2 text-center font-sans text-[0.74em] italic text-ink-400">
              Tablo · {block.caption}
            </figcaption>
          )}
        </figure>
      )

    case 'quote':
      return (
        <blockquote className="my-7 border-l-[3px] border-brand-400/60 pl-5">
          <Marked
            as="p" anchorId={a()} text={block.text} marks={m} onMarkClick={click}
            className="whitespace-pre-line font-serif text-[1.08em] italic leading-[1.7] text-ink-700"
          />
          {block.source && (
            <footer className="mt-2 font-sans text-[0.78em] uppercase tracking-[0.1em] text-ink-400">
              — {block.source}
            </footer>
          )}
        </blockquote>
      )

    case 'terms':
      return (
        <dl className="my-6 space-y-3">
          {block.items.map((it, i) => (
            <div key={i} className="rounded-xl border border-ink-800/10 bg-paper-100/35 px-4 py-3">
              <Marked
                as="dt" anchorId={a(`#t${i}`)} text={it.term} marks={m} onMarkClick={click}
                className="mb-1 font-sans text-[0.83em] font-bold uppercase tracking-[0.07em] text-brand-700"
              />
              <Marked
                as="dd" anchorId={a(`#d${i}`)} text={it.def} marks={m} onMarkClick={click}
                className="text-[0.95em] leading-[1.7] text-ink-600"
              />
            </div>
          ))}
        </dl>
      )

    case 'timeline':
      return (
        <ol className="my-7 space-y-0 border-l-2 border-dashed border-brand-300/60 pl-6">
          {block.items.map((it, i) => (
            <li key={i} className="relative pb-5 last:pb-0">
              <span className="absolute -left-[31px] top-[0.3em] grid h-4 w-4 place-items-center rounded-full border-2 border-brand-400 bg-paper-50">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              </span>
              <Marked
                as="div" anchorId={a(`#d${i}`)} text={it.date} marks={m} onMarkClick={click}
                className="font-sans text-[0.76em] font-bold uppercase tracking-[0.1em] text-brand-600"
              />
              <Marked
                as="div" anchorId={a(`#x${i}`)} text={it.text} marks={m} onMarkClick={click}
                className="mt-0.5 leading-[1.7] text-ink-700"
              />
            </li>
          ))}
        </ol>
      )

    case 'dialog':
      return (
        <div className="my-6 space-y-2.5 rounded-2xl border border-ink-800/10 bg-paper-100/40 px-5 py-4">
          {block.lines.map((l, i) => (
            <div key={i} className="flex gap-3">
              <span className="w-[86px] shrink-0 pt-[0.15em] text-right font-sans text-[0.76em] font-bold uppercase tracking-wide text-brand-600">
                {l.who}
              </span>
              <Marked
                as="span" anchorId={a(`#l${i}`)} text={l.text} marks={m} onMarkClick={click}
                className="flex-1 leading-[1.7]"
              />
            </div>
          ))}
        </div>
      )

    case 'figure':
      return <Figure kind={block.kind} caption={block.caption} />

    default:
      return null
  }
}
