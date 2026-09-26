import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  bookById, flatPages, questionById, subjectById,
} from '@/content'
import type { Question } from '@/content/types'
import { api, type BookState, type Mark, type Note, type Stroke } from '@/lib/api'
import {
  DEFAULT_PREFS, isDrawTool, isMarkTool, loadPrefs, markColor, savePrefs,
  type ReaderPrefs,
} from '@/lib/tools'
import { clearSelection, readSelection } from '@/lib/selection'
import { BlockView } from '@/components/BookBlocks'
import { Notebook } from '@/components/Notebook'
import { PageNav } from '@/components/PageNav'
import { PenLayer } from '@/components/PenLayer'
import { QuizRunner } from '@/components/QuizRunner'
import { ToolPanel } from '@/components/ToolPanel'
import {
  IcBookmark, IcChevronLeft, IcNote, IcPanelLeft, IcPanelRight, IcTrash, IcX,
} from '@/components/Icons'

type MarkPopover = { mark: Mark; x: number; y: number } | null

export default function Reader() {
  const { bookId = '' } = useParams()
  const [sp, setSp] = useSearchParams()
  const navigate = useNavigate()
  const book = bookById(bookId)

  const pages = useMemo(() => (book ? flatPages(book) : []), [book])
  const [index, setIndex] = useState(0)
  const [state, setState] = useState<BookState>({
    notes: [], marks: [], strokes: [], bookmarks: [], progress: null,
  })
  const [loading, setLoading] = useState(true)
  const [prefs, setPrefsState] = useState<ReaderPrefs>(() => loadPrefs())
  const [seen, setSeen] = useState<Set<string>>(new Set())
  const [popover, setPopover] = useState<MarkPopover>(null)
  const [noteDraft, setNoteDraft] = useState('')
  const [flash, setFlash] = useState<string | null>(null)
  const [dir, setDir] = useState<1 | -1>(1)

  const contentRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const progressTimer = useRef<number | null>(null)
  const startedAt = useRef(Date.now())

  const setPrefs = useCallback((patch: Partial<ReaderPrefs>) => {
    setPrefsState((p) => {
      const next = { ...p, ...patch }
      savePrefs(next)
      return next
    })
  }, [])

  const current = pages[index]
  const pageId = current?.page.id ?? ''

  const quizQuestions = useMemo<Question[]>(() => {
    if (current?.page.kind !== 'quiz') return []
    return current.page.questionIds
      .map((id) => questionById(id))
      .filter(Boolean) as Question[]
  }, [current])

  /* --------------------------------------------------------- yükleme */
  useEffect(() => {
    if (!book) return
    let alive = true
    setLoading(true)
    api
      .bookState(book.id)
      .then((s) => {
        if (!alive) return
        setState(s)
        const seenSet = new Set(s.progress?.seenPages ?? [])
        setSeen(seenSet)
        const urlPage = Number(sp.get('s'))
        const start = Number.isFinite(urlPage) && urlPage > 0
          ? Math.min(pages.length - 1, urlPage - 1)
          : (s.progress?.pageIndex ?? 0)
        setIndex(Math.max(0, Math.min(pages.length - 1, start)))
      })
      .catch(() => {})
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [book?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  /* -------------------------------------------- görülen sayfa + kayıt */
  useEffect(() => {
    if (!book || !pageId || loading) return
    setSeen((prev) => {
      if (prev.has(pageId)) return prev
      const next = new Set(prev)
      next.add(pageId)
      return next
    })
    setSp(
      (p) => {
        const q = new URLSearchParams(p)
        q.set('s', String(index + 1))
        return q
      },
      { replace: true }
    )
    scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' })
  }, [index, pageId, loading]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!book || loading) return
    if (progressTimer.current) window.clearTimeout(progressTimer.current)
    progressTimer.current = window.setTimeout(() => {
      api
        .saveProgress(book.id, {
          pageIndex: index,
          pageId,
          seenPages: [...seen],
          seconds: Math.round((Date.now() - startedAt.current) / 1000),
        })
        .catch(() => {})
    }, 900)
  }, [index, pageId, seen, book, loading])

  /* ------------------------------------------------------- klavye */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      if (e.key === 'ArrowRight') { setDir(1); setIndex((i) => Math.min(pages.length - 1, i + 1)) }
      else if (e.key === 'ArrowLeft') { setDir(-1); setIndex((i) => Math.max(0, i - 1)) }
      else if (e.key === '1') setPrefs({ tool: 'cursor' })
      else if (e.key === '2') setPrefs({ tool: 'highlight' })
      else if (e.key === '3') setPrefs({ tool: 'underline' })
      else if (e.key === '4') setPrefs({ tool: 'strike' })
      else if (e.key === '5') setPrefs({ tool: 'pen' })
      else if (e.key === '6') setPrefs({ tool: 'eraser' })
      else if (e.key === 'Escape') setPopover(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pages.length, setPrefs])

  const goto = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(pages.length - 1, i))
      setDir(clamped >= index ? 1 : -1)
      setIndex(clamped)
      setPopover(null)
    },
    [index, pages.length]
  )

  /* -------------------------------------------------- işaretleme */
  const pageMarks = useMemo(
    () => state.marks.filter((m) => m.pageId === pageId),
    [state.marks, pageId]
  )
  const pageStrokes = useMemo(
    () => state.strokes.filter((s) => s.pageId === pageId),
    [state.strokes, pageId]
  )

  const handleSelectionEnd = useCallback(async () => {
    if (!book || !isMarkTool(prefs.tool)) return
    const el = contentRef.current
    if (!el) return
    const sel = readSelection(el)
    if (!sel) return
    clearSelection()

    const optimistic: Mark = {
      id: `tmp_${Math.random().toString(36).slice(2)}`,
      bookId: book.id, pageId, anchorId: sel.anchorId,
      start: sel.start, end: sel.end,
      style: prefs.tool, color: prefs.markColor,
      quote: sel.quote, note: '', createdAt: Date.now(),
    }
    setState((s) => ({ ...s, marks: [...s.marks, optimistic] }))
    try {
      const { mark } = await api.saveMark({
        bookId: book.id, pageId, anchorId: sel.anchorId,
        start: sel.start, end: sel.end,
        style: prefs.tool, color: prefs.markColor, quote: sel.quote,
      })
      setState((s) => ({ ...s, marks: s.marks.map((m) => (m.id === optimistic.id ? mark : m)) }))
    } catch {
      setState((s) => ({ ...s, marks: s.marks.filter((m) => m.id !== optimistic.id) }))
      setFlash('İşaret kaydedilemedi')
    }
  }, [book, pageId, prefs.tool, prefs.markColor])

  const deleteMark = useCallback(async (id: string) => {
    setState((s) => ({ ...s, marks: s.marks.filter((m) => m.id !== id) }))
    setPopover(null)
    api.deleteMark(id).catch(() => {})
  }, [])

  const onMarkClick = useCallback(
    (id: string, ev: React.MouseEvent) => {
      const mark = state.marks.find((m) => m.id === id)
      if (!mark) return
      if (prefs.tool === 'eraser') {
        deleteMark(id)
        return
      }
      const rect = contentRef.current?.getBoundingClientRect()
      setNoteDraft(mark.note)
      setPopover({
        mark,
        x: ev.clientX - (rect?.left ?? 0),
        y: ev.clientY - (rect?.top ?? 0),
      })
    },
    [state.marks, prefs.tool, deleteMark]
  )

  const saveMarkNote = useCallback(async () => {
    if (!popover) return
    const { mark } = popover
    setState((s) => ({
      ...s,
      marks: s.marks.map((m) => (m.id === mark.id ? { ...m, note: noteDraft } : m)),
    }))
    setPopover(null)
    try {
      await api.saveMark({ ...mark, note: noteDraft })
    } catch {
      /* yoksay */
    }
  }, [popover, noteDraft])

  /* ------------------------------------------------------- çizim */
  const commitStroke = useCallback(
    async (s: { tool: 'pen' | 'marker'; color: string; width: number; points: [number, number][] }) => {
      if (!book) return
      const optimistic: Stroke = {
        id: `tmp_${Math.random().toString(36).slice(2)}`,
        bookId: book.id, pageId, tool: s.tool, color: s.color,
        width: s.width, points: s.points, createdAt: Date.now(),
      }
      setState((st) => ({ ...st, strokes: [...st.strokes, optimistic] }))
      try {
        const { stroke } = await api.saveStroke({ ...optimistic, id: undefined })
        setState((st) => ({
          ...st,
          strokes: st.strokes.map((x) => (x.id === optimistic.id ? stroke : x)),
        }))
      } catch {
        /* yerelde kalsin */
      }
    },
    [book, pageId]
  )

  const eraseStroke = useCallback((id: string) => {
    setState((st) => ({ ...st, strokes: st.strokes.filter((x) => x.id !== id) }))
    api.deleteStroke(id).catch(() => {})
  }, [])

  const clearPage = useCallback(async () => {
    if (!book) return
    setState((s) => ({
      ...s,
      marks: s.marks.filter((m) => m.pageId !== pageId),
      strokes: s.strokes.filter((x) => x.pageId !== pageId),
    }))
    api.clearMarks({ bookId: book.id, pageId }).catch(() => {})
    setFlash('Sayfa temizlendi')
  }, [book, pageId])

  /* ------------------------------------------------------ notlar */
  const saveNote = useCallback(
    async (n: Partial<Note> & { bookId: string }) => {
      try {
        const { note } = await api.saveNote(n)
        setState((s) => {
          const exists = s.notes.some((x) => x.id === note.id)
          const notes = exists ? s.notes.map((x) => (x.id === note.id ? note : x)) : [note, ...s.notes]
          notes.sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt)
          return { ...s, notes }
        })
        return note
      } catch {
        setFlash('Not kaydedilemedi')
      }
    },
    []
  )

  const deleteNote = useCallback((id: string) => {
    setState((s) => ({ ...s, notes: s.notes.filter((n) => n.id !== id) }))
    api.deleteNote(id).catch(() => {})
  }, [])

  /* -------------------------------------------------- yer imleri */
  const bookmarked = state.bookmarks.some((b) => b.page_id === pageId)
  const toggleBookmark = useCallback(async () => {
    if (!book || !current) return
    const res = await api
      .toggleBookmark({ bookId: book.id, pageId, label: current.page.title })
      .catch(() => null)
    if (!res) return
    setState((s) =>
      res.removed
        ? { ...s, bookmarks: s.bookmarks.filter((b) => b.id !== res.removed) }
        : { ...s, bookmarks: [...s.bookmarks, res.bookmark!] }
    )
  }, [book, current, pageId])

  useEffect(() => {
    if (!flash) return
    const t = window.setTimeout(() => setFlash(null), 2200)
    return () => window.clearTimeout(t)
  }, [flash])

  if (!book) {
    return (
      <div className="grid min-h-screen place-items-center px-6 text-center">
        <div>
          <h1 className="mb-2 font-serif text-2xl">Kitap bulunamadı</h1>
          <button className="btn-primary" onClick={() => navigate('/kitaplik')}>
            Kitaplığa dön
          </button>
        </div>
      </div>
    )
  }

  const subject = subjectById(book.subjectId)!
  const drawMode: 'off' | 'pen' | 'marker' | 'eraser' = isDrawTool(prefs.tool)
    ? prefs.tool
    : prefs.tool === 'eraser'
      ? 'eraser'
      : 'off'


  return (
    <div
      className="paper-grain flex h-[100dvh] flex-col overflow-hidden"
      data-theme={prefs.theme}
      style={{ background: 'var(--paper-bg)' }}
    >
      {/* ------------------------------------------------------ üst bar */}
      <header className="z-30 flex shrink-0 items-center gap-1.5 border-b border-ink-800/10 bg-paper-50/80 px-2.5 py-2 backdrop-blur-md sm:gap-2 sm:px-4">
        <Link to="/kitaplik" className="btn-icon" title="Kitaplığa dön">
          <IcChevronLeft size={18} />
        </Link>
        <button
          className={`btn-icon ${prefs.leftOpen ? 'bg-ink-800/8 text-ink-900' : ''}`}
          onClick={() => setPrefs({ leftOpen: !prefs.leftOpen })}
          title="Not defteri"
        >
          <IcPanelLeft size={17} />
        </button>

        <div className="mx-1 min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className="hidden h-2 w-2 shrink-0 rounded-full sm:block"
              style={{ background: subject.color }}
            />
            <h1 className="truncate font-serif text-[14.5px] font-semibold text-ink-900 sm:text-[15.5px]">
              {book.title}
            </h1>
          </div>
          <p className="truncate font-sans text-[11px] text-ink-400">
            {current?.chapter.title} · {current?.page.title}
          </p>
        </div>

        {flash && (
          <span className="hidden animate-fade-up rounded-lg bg-ink-900/85 px-2.5 py-1 font-sans text-[11.5px] text-paper-50 sm:block">
            {flash}
          </span>
        )}

        <button
          className={`btn-icon ${bookmarked ? 'text-brand-600' : ''}`}
          onClick={toggleBookmark}
          title={bookmarked ? 'Yer imini kaldır' : 'Bu sayfaya yer imi koy'}
        >
          <IcBookmark size={17} filled={bookmarked} />
        </button>
        <button
          className={`btn-icon ${prefs.rightOpen ? 'bg-ink-800/8 text-ink-900' : ''}`}
          onClick={() => setPrefs({ rightOpen: !prefs.rightOpen })}
          title="Kalemler ve görünüm"
        >
          <IcPanelRight size={17} />
        </button>
      </header>

      <div className="relative flex min-h-0 flex-1">
        {/* -------------------------------------------- sol: not defteri */}
        {prefs.leftOpen && (
          <>
            <div
              className="fixed inset-0 z-30 bg-ink-900/25 backdrop-blur-[2px] lg:hidden"
              onClick={() => setPrefs({ leftOpen: false })}
            />
            <aside className="fixed inset-y-0 left-0 z-40 flex w-[86vw] max-w-[22rem] flex-col border-r border-ink-800/10 bg-paper-50/95 backdrop-blur-md lg:static lg:z-auto lg:w-[21rem] lg:bg-paper-50/55">
              <div className="flex items-center justify-end px-2 pt-2 lg:hidden">
                <button className="btn-icon" onClick={() => setPrefs({ leftOpen: false })}>
                  <IcX size={17} />
                </button>
              </div>
              <div className="min-h-0 flex-1">
                <Notebook
                  notes={state.notes}
                  bookId={book.id}
                  pageId={pageId}
                  pageLabel={`s.${current?.folio} · ${current?.page.title}`}
                  onSave={saveNote}
                  onDelete={deleteNote}
                />
              </div>
            </aside>
          </>
        )}

        {/* ----------------------------------------------- orta: kitap */}
        <main className="flex min-w-0 flex-1 flex-col">
          <div ref={scrollRef} className="scroll-thin min-h-0 flex-1 overflow-y-auto px-3 py-4 sm:px-6 sm:py-7">
            <div
              className="relative mx-auto"
              style={{ maxWidth: `min(100%, ${prefs.measure + 18}ch)` }}
            >
              <article
                key={pageId}
                ref={contentRef}
                onMouseUp={handleSelectionEnd}
                onTouchEnd={handleSelectionEnd}
                className={[
                  'book-sheet prose-book relative rounded-[14px] px-5 py-8 sm:px-12 sm:py-12',
                  dir === 1 ? 'animate-page-in' : 'animate-page-in-back',
                  prefs.tool === 'eraser' ? 'erasing' : '',
                  isMarkTool(prefs.tool) ? 'cursor-text' : '',
                ].join(' ')}
                style={{
                  fontSize: `${prefs.fontSize}px`,
                  lineHeight: prefs.lineHeight,
                  fontFamily: "'Lora', Georgia, serif",
                }}
              >
                {/* sayfa başlığı */}
                <div className="mb-7 border-b border-ink-800/10 pb-4">
                  <div className="mb-1.5 flex items-center gap-2 font-sans text-[0.66em] font-bold uppercase tracking-[0.16em] text-ink-400">
                    <span style={{ color: subject.color }}>{subject.short}</span>
                    <span className="h-3 w-px bg-ink-800/15" />
                    <span className="truncate">{current?.chapter.title}</span>
                  </div>
                  <h2 className="font-serif text-[1.85em] font-semibold leading-[1.15] text-ink-900">
                    {current?.page.title}
                  </h2>
                  {current?.page.subtitle && (
                    <p className="mt-1.5 font-serif text-[1.02em] italic text-ink-400">
                      {current.page.subtitle}
                    </p>
                  )}
                </div>

                {current?.page.kind === 'content' ? (
                  current.page.blocks.map((b) => (
                    <BlockView
                      key={b.id}
                      block={b}
                      ctx={{ marks: pageMarks, onMarkClick }}
                    />
                  ))
                ) : (
                  <QuizRunner
                    questions={quizQuestions}
                    title={current!.page.title}
                    subtitle={current!.page.subtitle}
                    intro={current!.page.kind === 'quiz' ? current!.page.intro : undefined}
                    source="book"
                    subjectId={book.subjectId}
                  />
                )}

                {/* sayfa altı folyo */}
                <div className="mt-10 flex items-center justify-between border-t border-ink-800/8 pt-4 font-sans text-[0.68em] uppercase tracking-[0.16em] text-ink-400">
                  <span>Ali Kerem Yayınları</span>
                  <span className="tabular">{current?.folio}</span>
                </div>

                {/* serbest çizim katmanı */}
                <PenLayer
                  strokes={pageStrokes}
                  mode={drawMode}
                  color={prefs.penColor}
                  width={prefs.penWidth}
                  onCommit={commitStroke}
                  onErase={eraseStroke}
                />
              </article>

              {/* işaret notu balonu */}
              {popover && (
                <div
                  className="panel absolute z-20 w-64 animate-fade-up p-3"
                  style={{
                    left: Math.max(8, Math.min(popover.x - 120, (contentRef.current?.clientWidth ?? 300) - 260)),
                    top: popover.y + 16,
                  }}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-sm"
                      style={{ background: markColor(popover.mark.color).dot }}
                    />
                    <span className="flex-1 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-ink-400">
                      İşarete not
                    </span>
                    <button className="btn-icon h-6 w-6" onClick={() => setPopover(null)}>
                      <IcX size={13} />
                    </button>
                  </div>
                  <p className="mb-2 line-clamp-2 font-serif text-[12.5px] italic leading-snug text-ink-500">
                    “{popover.mark.quote}”
                  </p>
                  <textarea
                    autoFocus
                    value={noteDraft}
                    onChange={(e) => setNoteDraft(e.target.value)}
                    rows={3}
                    placeholder="Kısa bir not…"
                    className="field resize-none py-2 text-[13px]"
                  />
                  <div className="mt-2 flex gap-1.5">
                    <button className="btn-primary flex-1 py-1.5 text-[12.5px]" onClick={saveMarkNote}>
                      Kaydet
                    </button>
                    <button
                      className="btn-ghost px-2.5 py-1.5 text-brand-600"
                      onClick={() => deleteMark(popover.mark.id)}
                      title="İşareti sil"
                    >
                      <IcTrash size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ------------------------------------------ alt: sayfa nav */}
          <div className="shrink-0 px-3 pb-3 sm:px-6 sm:pb-4">
            <div className="mx-auto" style={{ maxWidth: `min(100%, ${prefs.measure + 18}ch)` }}>
              <PageNav pages={pages} index={index} onGoto={goto} seen={seen} />
            </div>
          </div>
        </main>

        {/* -------------------------------------------- sağ: kalemler */}
        {prefs.rightOpen && (
          <>
            <div
              className="fixed inset-0 z-30 bg-ink-900/25 backdrop-blur-[2px] lg:hidden"
              onClick={() => setPrefs({ rightOpen: false })}
            />
            <aside className="fixed inset-y-0 right-0 z-40 flex w-[86vw] max-w-[20rem] flex-col border-l border-ink-800/10 bg-paper-50/95 backdrop-blur-md lg:static lg:z-auto lg:w-[19.5rem] lg:bg-paper-50/55">
              <div className="flex items-center px-2 pt-2 lg:hidden">
                <button className="btn-icon" onClick={() => setPrefs({ rightOpen: false })}>
                  <IcX size={17} />
                </button>
              </div>
              <div className="min-h-0 flex-1">
                <ToolPanel
                  prefs={prefs}
                  setPrefs={setPrefs}
                  pageMarks={pageMarks}
                  onDeleteMark={deleteMark}
                  onClearPage={clearPage}
                  strokeCount={pageStrokes.length}
                  book={book}
                  pages={pages}
                  currentIndex={index}
                  onGoto={goto}
                />
              </div>
            </aside>
          </>
        )}
      </div>

      {/* mobil hızlı erişim */}
      <div className="pointer-events-none fixed bottom-[5.6rem] left-3 z-20 flex flex-col gap-2 lg:hidden">
        {!prefs.leftOpen && (
          <button
            className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full bg-brand-600 text-paper-50 shadow-lg active:scale-95"
            onClick={() => setPrefs({ leftOpen: true })}
            title="Not defteri"
          >
            <IcNote size={18} />
          </button>
        )}
      </div>

      {loading && (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden">
          <div className="h-full w-1/3 animate-[page-in_1s_ease-in-out_infinite] bg-brand-500" />
        </div>
      )}
    </div>
  )
}

export { DEFAULT_PREFS }
