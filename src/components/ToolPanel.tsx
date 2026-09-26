import { useState, type ReactNode } from 'react'
import type { Mark } from '@/lib/api'
import type { Book, FlatPage } from '@/content/types'
import {
  MARK_COLORS, PEN_COLORS, PEN_WIDTHS, markColor,
  type MarkColorId, type ReaderPrefs, type ToolId,
} from '@/lib/tools'
import {
  IcChevronDown, IcCursor, IcEraser, IcHighlighter, IcPen, IcStrike,
  IcTrash, IcUnderline, IcList, IcSparkle,
} from './Icons'

const TOOLS: { id: ToolId; label: string; hint: string; Icon: typeof IcPen; key: string }[] = [
  { id: 'cursor', label: 'İmleç', hint: 'Seçim ve okuma modu', Icon: IcCursor, key: '1' },
  { id: 'highlight', label: 'Fosforlu', hint: 'Metnin üstünü boya', Icon: IcHighlighter, key: '2' },
  { id: 'underline', label: 'Altı çizili', hint: 'Metnin altını çiz', Icon: IcUnderline, key: '3' },
  { id: 'strike', label: 'Üstü çizili', hint: 'Metnin üstünü çiz', Icon: IcStrike, key: '4' },
  { id: 'pen', label: 'Kalem', hint: 'Serbest el çizimi', Icon: IcPen, key: '5' },
  { id: 'eraser', label: 'Silgi', hint: 'İşaret ve çizim sil', Icon: IcEraser, key: '6' },
]

function Section({
  title, children, defaultOpen = true, right,
}: { title: string; children: ReactNode; defaultOpen?: boolean; right?: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <section className="border-b border-ink-800/8 last:border-b-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left transition hover:bg-ink-800/3"
      >
        <IcChevronDown
          size={14}
          className={`text-ink-400 transition-transform ${open ? '' : '-rotate-90'}`}
        />
        <span className="flex-1 font-sans text-[11.5px] font-bold uppercase tracking-[0.14em] text-ink-500">
          {title}
        </span>
        {right}
      </button>
      {open && <div className="px-3.5 pb-4">{children}</div>}
    </section>
  )
}

type Props = {
  prefs: ReaderPrefs
  setPrefs: (p: Partial<ReaderPrefs>) => void
  pageMarks: Mark[]
  onDeleteMark: (id: string) => void
  onClearPage: () => void
  strokeCount: number
  book: Book
  pages: FlatPage[]
  currentIndex: number
  onGoto: (i: number) => void
}

export function ToolPanel({
  prefs, setPrefs, pageMarks, onDeleteMark, onClearPage,
  strokeCount, book, pages, currentIndex, onGoto,
}: Props) {
  const isMark = prefs.tool === 'highlight' || prefs.tool === 'underline' || prefs.tool === 'strike'
  const isPen = prefs.tool === 'pen'

  return (
    <div className="scroll-thin h-full overflow-y-auto">
      <Section title="Kalemler">
        <div className="grid grid-cols-3 gap-1.5">
          {TOOLS.map((t) => {
            const on = prefs.tool === t.id
            return (
              <button
                key={t.id}
                onClick={() => setPrefs({ tool: t.id })}
                title={`${t.hint}  (${t.key})`}
                className={[
                  'group flex flex-col items-center gap-1.5 rounded-xl border px-1 py-2.5 transition-all',
                  on
                    ? 'border-brand-500/40 bg-brand-500/10 text-brand-700 shadow-sm'
                    : 'border-ink-800/10 bg-paper-50/50 text-ink-500 hover:border-ink-800/22 hover:text-ink-800',
                ].join(' ')}
              >
                <t.Icon size={19} strokeWidth={on ? 1.9 : 1.6} />
                <span className="font-sans text-[10.5px] font-semibold leading-none">{t.label}</span>
              </button>
            )
          })}
        </div>

        {isMark && (
          <div className="mt-3.5 animate-fade-up">
            <div className="label">Renk</div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(MARK_COLORS) as MarkColorId[]).map((id) => {
                const c = MARK_COLORS[id]
                const on = prefs.markColor === id
                return (
                  <button
                    key={id}
                    onClick={() => setPrefs({ markColor: id })}
                    title={c.label}
                    className={`h-7 w-7 rounded-lg border border-ink-800/12 transition-transform hover:scale-110 ${
                      on ? 'ring-2 ring-ink-800/35 ring-offset-2 ring-offset-paper-50' : ''
                    }`}
                    style={{ background: c.dot }}
                  />
                )
              })}
            </div>
            <p className="mt-2.5 rounded-lg bg-ink-800/4 px-2.5 py-2 font-sans text-[11.5px] leading-snug text-ink-400">
              Kitapta bir metni <b className="text-ink-600">seç</b> — işaret otomatik kaydedilir.
              İşarete tıklayıp not ekleyebilirsin.
            </p>
          </div>
        )}

        {isPen && (
          <div className="mt-3.5 animate-fade-up">
            <div className="label">Kalem rengi</div>
            <div className="flex flex-wrap gap-2">
              {PEN_COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setPrefs({ penColor: c.hex })}
                  title={c.label}
                  className={`h-7 w-7 rounded-lg border border-ink-800/12 transition-transform hover:scale-110 ${
                    prefs.penColor === c.hex ? 'ring-2 ring-ink-800/35 ring-offset-2 ring-offset-paper-50' : ''
                  }`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
            <div className="label mt-3">Kalınlık</div>
            <div className="flex gap-1.5">
              {PEN_WIDTHS.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setPrefs({ penWidth: w.value })}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-2 py-2 transition ${
                    prefs.penWidth === w.value
                      ? 'border-brand-500/40 bg-brand-500/10'
                      : 'border-ink-800/10 hover:border-ink-800/22'
                  }`}
                >
                  <span
                    className="rounded-full"
                    style={{ width: w.value * 2.4, height: w.value * 2.4, background: prefs.penColor }}
                  />
                  <span className="font-sans text-[11px] text-ink-500">{w.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {prefs.tool === 'eraser' && (
          <p className="mt-3.5 animate-fade-up rounded-lg bg-brand-500/8 px-2.5 py-2 font-sans text-[11.5px] leading-snug text-brand-700">
            Silmek istediğin işaretin ya da çizginin üzerine tıkla. Basılı tutup sürükleyerek de silebilirsin.
          </p>
        )}
      </Section>

      <Section title="Görünüm">
        <div className="space-y-3.5">
          <div>
            <div className="label flex items-center justify-between">
              <span>Yazı boyutu</span>
              <span className="tabular text-ink-500">{prefs.fontSize.toFixed(1)} px</span>
            </div>
            <input
              type="range" min={14} max={24} step={0.5} value={prefs.fontSize}
              onChange={(e) => setPrefs({ fontSize: Number(e.target.value) })}
              className="w-full accent-brand-600"
            />
          </div>
          <div>
            <div className="label flex items-center justify-between">
              <span>Satır aralığı</span>
              <span className="tabular text-ink-500">{prefs.lineHeight.toFixed(2)}</span>
            </div>
            <input
              type="range" min={1.5} max={2.3} step={0.05} value={prefs.lineHeight}
              onChange={(e) => setPrefs({ lineHeight: Number(e.target.value) })}
              className="w-full accent-brand-600"
            />
          </div>
          <div>
            <div className="label flex items-center justify-between">
              <span>Sayfa genişliği</span>
              <span className="tabular text-ink-500">{prefs.measure} ch</span>
            </div>
            <input
              type="range" min={48} max={86} step={1} value={prefs.measure}
              onChange={(e) => setPrefs({ measure: Number(e.target.value) })}
              className="w-full accent-brand-600"
            />
          </div>
          <div>
            <div className="label">Kağıt</div>
            <div className="flex gap-1.5">
              {([
                { id: 'kagit', label: 'Kağıt', bg: '#fdfbf6', fg: '#2a251d' },
                { id: 'sepya', label: 'Sepya', bg: '#f7ecd8', fg: '#3b2f1e' },
                { id: 'gece', label: 'Gece', bg: '#211f19', fg: '#e9e2d2' },
              ] as const).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setPrefs({ theme: t.id })}
                  className={`flex-1 rounded-lg border px-2 py-2 font-sans text-[11px] font-semibold transition ${
                    prefs.theme === t.id
                      ? 'border-brand-500/45 ring-2 ring-brand-500/15'
                      : 'border-ink-800/12 hover:border-ink-800/25'
                  }`}
                  style={{ background: t.bg, color: t.fg }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="İşaretlerim"
        right={
          <span className="chip tabular">{pageMarks.length + strokeCount}</span>
        }
      >
        {pageMarks.length === 0 && strokeCount === 0 ? (
          <p className="rounded-lg bg-ink-800/4 px-2.5 py-3 text-center font-sans text-[11.5px] leading-snug text-ink-400">
            Bu sayfada henüz işaret yok.
            <br />
            Fosforlu kalemi seçip bir cümleyi işaretle.
          </p>
        ) : (
          <div className="space-y-1.5">
            {pageMarks.map((m) => (
              <div
                key={m.id}
                className="group flex items-start gap-2 rounded-lg border border-ink-800/8 bg-paper-50/60 px-2.5 py-2"
              >
                <span
                  className="mt-1 h-3 w-3 shrink-0 rounded-sm"
                  style={{ background: markColor(m.color).dot }}
                />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 font-serif text-[12.5px] leading-snug text-ink-700">
                    “{m.quote}”
                  </p>
                  {m.note && (
                    <p className="mt-1 line-clamp-2 font-sans text-[11px] italic text-ink-400">{m.note}</p>
                  )}
                </div>
                <button
                  onClick={() => onDeleteMark(m.id)}
                  className="btn-icon h-6 w-6 shrink-0 opacity-0 transition group-hover:opacity-100"
                  title="Sil"
                >
                  <IcTrash size={13} />
                </button>
              </div>
            ))}
            {strokeCount > 0 && (
              <p className="px-1 pt-1 font-sans text-[11px] text-ink-400">
                + bu sayfada {strokeCount} kalem çizimi
              </p>
            )}
            <button
              onClick={onClearPage}
              className="btn-quiet mt-1 w-full justify-center py-1.5 text-[12px] text-brand-600 hover:bg-brand-500/10"
            >
              <IcTrash size={13} /> Sayfadakileri temizle
            </button>
          </div>
        )}
      </Section>

      <Section title="İçindekiler" defaultOpen={false}>
        <div className="space-y-3">
          {book.chapters.map((ch) => (
            <div key={ch.id}>
              <div className="mb-1 flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-brand-600">
                <IcList size={12} />
                <span className="truncate">{ch.title}</span>
              </div>
              <div className="space-y-0.5">
                {ch.pages.map((p) => {
                  const flat = pages.find((f) => f.page.id === p.id)!
                  const on = flat.index === currentIndex
                  return (
                    <button
                      key={p.id}
                      onClick={() => onGoto(flat.index)}
                      className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left font-sans text-[12px] transition ${
                        on ? 'bg-brand-500/12 font-semibold text-brand-700' : 'text-ink-500 hover:bg-ink-800/5'
                      }`}
                    >
                      {p.kind === 'quiz' ? (
                        <IcSparkle size={12} className="shrink-0 text-brand-400" />
                      ) : (
                        <span className="h-1 w-1 shrink-0 rounded-full bg-ink-400/50" />
                      )}
                      <span className="flex-1 truncate">{p.title}</span>
                      <span className="tabular shrink-0 text-[10.5px] text-ink-400">{flat.folio}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
