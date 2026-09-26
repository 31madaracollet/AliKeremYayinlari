import { useEffect, useMemo, useRef, useState } from 'react'
import type { Note } from '@/lib/api'
import {
  IcCheck, IcNote, IcPin, IcPlus, IcSearch, IcTrash, IcX,
} from './Icons'

const NOTE_COLORS = [
  { id: 'sari', label: 'Sarı', bg: '#fdf3cf', edge: '#e9d191' },
  { id: 'yesil', label: 'Yeşil', bg: '#e3f2df', edge: '#a9cfa2' },
  { id: 'mavi', label: 'Mavi', bg: '#e1eefa', edge: '#a2c4e3' },
  { id: 'pembe', label: 'Pembe', bg: '#fbe6ec', edge: '#e7aebf' },
]
const colorOf = (id: string) => NOTE_COLORS.find((c) => c.id === id) ?? NOTE_COLORS[0]

const fmt = (ts: number) => {
  const d = new Date(ts)
  const today = new Date()
  const sameDay = d.toDateString() === today.toDateString()
  return sameDay
    ? `bugün ${d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`
    : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
}

type Props = {
  notes: Note[]
  bookId: string
  pageId: string
  pageLabel: string
  onSave: (n: Partial<Note> & { bookId: string }) => Promise<Note | void>
  onDelete: (id: string) => void
  busy?: boolean
}

export function Notebook({ notes, bookId, pageId, pageLabel, onSave, onDelete }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [color, setColor] = useState('sari')
  const [pinned, setPinned] = useState(false)
  const [filterPage, setFilterPage] = useState(false)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'idle' | 'typing' | 'saving' | 'saved'>('idle')
  const timer = useRef<number | null>(null)
  const areaRef = useRef<HTMLTextAreaElement>(null)

  const active = notes.find((n) => n.id === activeId) || null

  useEffect(() => {
    if (!active) return
    setDraft(active.body)
    setColor(active.color)
    setPinned(active.pinned)
    setStatus('idle')
  }, [activeId]) // eslint-disable-line react-hooks/exhaustive-deps

  const visible = useMemo(() => {
    let list = notes
    if (filterPage) list = list.filter((n) => n.pageId === pageId)
    if (query.trim()) {
      const q = query.toLocaleLowerCase('tr')
      list = list.filter(
        (n) =>
          n.body.toLocaleLowerCase('tr').includes(q) ||
          (n.pageLabel || '').toLocaleLowerCase('tr').includes(q)
      )
    }
    return list
  }, [notes, filterPage, pageId, query])

  const pageCount = notes.filter((n) => n.pageId === pageId).length

  const scheduleSave = (body: string, extra?: { color?: string; pinned?: boolean }) => {
    setStatus('typing')
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(async () => {
      setStatus('saving')
      const saved = await onSave({
        id: active?.id,
        bookId,
        pageId: active?.pageId ?? pageId,
        pageLabel: active?.pageLabel ?? pageLabel,
        title: body.split('\n')[0].slice(0, 80),
        body,
        color: extra?.color ?? color,
        pinned: extra?.pinned ?? pinned,
      })
      if (saved && !active) setActiveId((saved as Note).id)
      setStatus('saved')
      window.setTimeout(() => setStatus((s) => (s === 'saved' ? 'idle' : s)), 1600)
    }, 650)
  }

  const newNote = async () => {
    const created = await onSave({
      bookId,
      pageId,
      pageLabel,
      title: '',
      body: '',
      color,
      pinned: false,
    })
    if (created) {
      setActiveId((created as Note).id)
      setDraft('')
      window.setTimeout(() => areaRef.current?.focus(), 30)
    }
  }

  /* ------------------------------------------------------------ editör */
  if (active) {
    const c = colorOf(color)
    return (
      <div className="flex h-full flex-col">
        <header className="flex items-center gap-1.5 border-b border-ink-800/10 px-3 py-2">
          <button className="btn-icon" onClick={() => setActiveId(null)} title="Listeye dön">
            <IcX size={17} />
          </button>
          <div className="min-w-0 flex-1">
            <div className="truncate font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">
              {active.pageLabel || 'Defter notu'}
            </div>
          </div>
          <button
            className={`btn-icon ${pinned ? 'text-brand-600' : ''}`}
            title={pinned ? 'Sabitlemeyi kaldır' : 'Başa sabitle'}
            onClick={() => {
              const v = !pinned
              setPinned(v)
              scheduleSave(draft, { pinned: v })
            }}
          >
            <IcPin size={16} filled={pinned} />
          </button>
          <button
            className="btn-icon hover:text-brand-600"
            title="Notu sil"
            onClick={() => {
              onDelete(active.id)
              setActiveId(null)
            }}
          >
            <IcTrash size={16} />
          </button>
        </header>

        <div className="flex items-center gap-2 px-3 py-2">
          {NOTE_COLORS.map((nc) => (
            <button
              key={nc.id}
              onClick={() => {
                setColor(nc.id)
                scheduleSave(draft, { color: nc.id })
              }}
              className={`h-5 w-5 rounded-full border transition-transform hover:scale-110 ${
                color === nc.id ? 'ring-2 ring-ink-800/30 ring-offset-1 ring-offset-paper-50' : ''
              }`}
              style={{ background: nc.bg, borderColor: nc.edge }}
              title={nc.label}
            />
          ))}
          <span className="ml-auto font-sans text-[11px] text-ink-400">
            {status === 'typing' && 'yazılıyor…'}
            {status === 'saving' && 'kaydediliyor…'}
            {status === 'saved' && (
              <span className="inline-flex items-center gap-1 text-forest-500">
                <IcCheck size={12} /> kaydedildi
              </span>
            )}
            {status === 'idle' && fmt(active.updatedAt)}
          </span>
        </div>

        <div className="relative flex-1 overflow-hidden px-3 pb-3">
          <div
            className="notebook-lines h-full rounded-xl border p-3"
            style={{ background: c.bg, borderColor: c.edge }}
          >
            <textarea
              ref={areaRef}
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value)
                scheduleSave(e.target.value)
              }}
              spellCheck={false}
              placeholder="Buraya yaz… Kaydetmene gerek yok, kendi kendine hafızaya alınır."
              className="handwriting h-full w-full resize-none bg-transparent text-ink-900 outline-none placeholder:text-ink-400/60"
            />
          </div>
        </div>
      </div>
    )
  }

  /* -------------------------------------------------------------- liste */
  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-2 border-b border-ink-800/10 px-3 py-2.5">
        <IcNote size={16} className="text-brand-600" />
        <h2 className="flex-1 font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-ink-500">
          Not Defteri
        </h2>
        <button className="btn-icon" onClick={newNote} title="Yeni not (N)">
          <IcPlus size={17} />
        </button>
      </header>

      <div className="space-y-2 px-3 py-2.5">
        <div className="relative">
          <IcSearch size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Notlarda ara…"
            className="field py-2 pl-9 text-[13px]"
          />
        </div>
        <div className="flex gap-1 rounded-lg bg-ink-800/5 p-0.5">
          <button
            onClick={() => setFilterPage(false)}
            className={`flex-1 rounded-md px-2 py-1 font-sans text-[11.5px] font-medium transition ${
              !filterPage ? 'bg-paper-50 text-ink-800 shadow-sm' : 'text-ink-400 hover:text-ink-600'
            }`}
          >
            Tüm defter ({notes.length})
          </button>
          <button
            onClick={() => setFilterPage(true)}
            className={`flex-1 rounded-md px-2 py-1 font-sans text-[11.5px] font-medium transition ${
              filterPage ? 'bg-paper-50 text-ink-800 shadow-sm' : 'text-ink-400 hover:text-ink-600'
            }`}
          >
            Bu sayfa ({pageCount})
          </button>
        </div>
      </div>

      <div className="scroll-thin flex-1 space-y-2 overflow-y-auto px-3 pb-3">
        {visible.length === 0 && (
          <div className="mt-6 rounded-xl border border-dashed border-ink-800/15 px-4 py-8 text-center">
            <div className="mb-2 text-2xl opacity-40">✎</div>
            <p className="font-sans text-[12.5px] leading-relaxed text-ink-400">
              {query || filterPage
                ? 'Burada not yok.'
                : 'Henüz not almadın. Okurken aklına geleni buraya yaz; hesabına kaydedilir.'}
            </p>
            <button className="btn-ghost mt-3 py-1.5 text-[12.5px]" onClick={newNote}>
              <IcPlus size={14} /> İlk notunu ekle
            </button>
          </div>
        )}
        {visible.map((n) => {
          const c = colorOf(n.color)
          const preview = n.body.trim() || 'Boş not'
          return (
            <button
              key={n.id}
              onClick={() => setActiveId(n.id)}
              className="group block w-full rounded-xl border px-3 py-2.5 text-left transition hover:-translate-y-px hover:shadow-md"
              style={{ background: c.bg, borderColor: c.edge }}
            >
              <div className="mb-1 flex items-center gap-1.5">
                {n.pinned && <IcPin size={11} filled className="text-brand-600" />}
                <span className="truncate font-sans text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-500/80">
                  {n.pageLabel || 'Genel'}
                </span>
                <span className="ml-auto shrink-0 font-sans text-[10.5px] text-ink-400">{fmt(n.updatedAt)}</span>
              </div>
              <p className="handwriting line-clamp-3 text-[1.05rem] leading-[1.45] text-ink-800">{preview}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
