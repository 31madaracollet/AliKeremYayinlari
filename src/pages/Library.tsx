import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BOOKS, QUESTIONS, SUBJECTS, bookStats, flatPages, subjectById } from '@/content'
import { api, type Progress } from '@/lib/api'
import { BookCover } from '@/components/BookCover'
import { IcBook, IcSearch, IcSparkle } from '@/components/Icons'

export default function Library() {
  const [filter, setFilter] = useState<string>('hepsi')
  const [query, setQuery] = useState('')
  const [progress, setProgress] = useState<Record<string, Progress>>({})

  useEffect(() => {
    api
      .allProgress()
      .then((r) => setProgress(Object.fromEntries(r.progress.map((p) => [p.bookId!, p]))))
      .catch(() => {})
  }, [])

  const books = useMemo(() => {
    let list = BOOKS
    if (filter !== 'hepsi') list = list.filter((b) => b.subjectId === filter)
    if (query.trim()) {
      const q = query.toLocaleLowerCase('tr')
      list = list.filter(
        (b) =>
          b.title.toLocaleLowerCase('tr').includes(q) ||
          b.blurb.toLocaleLowerCase('tr').includes(q) ||
          b.chapters.some((c) => c.title.toLocaleLowerCase('tr').includes(q))
      )
    }
    return list
  }, [filter, query])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8">
        <h1 className="font-serif text-[2rem] font-semibold leading-tight text-ink-900 sm:text-[2.4rem]">
          Kitaplık
        </h1>
        <p className="mt-1.5 max-w-2xl font-sans text-[14px] leading-relaxed text-ink-400">
          LGS müfredatının altı dersi, altı kitap. Kapağa dokun, kaldığın sayfadan devam et.
        </p>
      </header>

      <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative sm:w-72">
          <IcSearch size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            className="field pl-10"
            placeholder="Kitap ya da ünite ara…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="scroll-thin -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
          <FilterChip active={filter === 'hepsi'} onClick={() => setFilter('hepsi')} label="Hepsi" />
          {SUBJECTS.map((s) => (
            <FilterChip
              key={s.id}
              active={filter === s.id}
              onClick={() => setFilter(s.id)}
              label={s.name}
              color={s.color}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => {
          const subject = subjectById(book.subjectId)!
          const st = bookStats(book)
          const p = progress[book.id]
          const pages = flatPages(book)
          const pct = p ? Math.round((p.seenPages.length / pages.length) * 100) : 0
          const qCount = QUESTIONS.filter((q) => q.subjectId === book.subjectId).length

          return (
            <article key={book.id} className="panel group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-book">
              <Link to={`/oku/${book.id}${p ? `?s=${p.pageIndex + 1}` : ''}`} className="block">
                <div className="flex gap-4 p-4">
                  <div className="w-[88px] shrink-0 transition-transform duration-300 group-hover:-rotate-2">
                    <BookCover book={book} size="sm" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span
                      className="font-sans text-[10.5px] font-bold uppercase tracking-[0.15em]"
                      style={{ color: subject.color }}
                    >
                      {subject.name}
                    </span>
                    <h2 className="mt-1 font-serif text-[16.5px] font-semibold leading-snug text-ink-900">
                      {book.title}
                    </h2>
                    <p className="mt-1.5 line-clamp-3 font-sans text-[12.5px] leading-relaxed text-ink-400">
                      {book.blurb}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 px-4">
                  <span className="chip py-0.5 text-[10.5px]">{st.chapterCount} ünite</span>
                  <span className="chip py-0.5 text-[10.5px]">{st.pageCount} sayfa</span>
                  <span className="chip py-0.5 text-[10.5px]">
                    <IcSparkle size={10} /> {st.quizCount} test
                  </span>
                  <span className="chip py-0.5 text-[10.5px]">{qCount} soru</span>
                </div>

                <div className="mt-3.5 border-t border-ink-800/8 px-4 py-3">
                  {p ? (
                    <>
                      <div className="mb-1.5 flex items-center justify-between font-sans text-[11.5px]">
                        <span className="text-ink-400">
                          {p.seenPages.length}/{pages.length} sayfa okundu
                        </span>
                        <span className="tabular font-semibold text-ink-700">%{pct}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-ink-800/8">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, background: subject.color }}
                        />
                      </div>
                    </>
                  ) : (
                    <span className="flex items-center gap-2 font-sans text-[12.5px] font-medium text-brand-600">
                      <IcBook size={14} /> Okumaya başla
                    </span>
                  )}
                </div>
              </Link>
            </article>
          )
        })}
      </div>

      {books.length === 0 && (
        <div className="rounded-2xl border border-dashed border-ink-800/15 px-6 py-16 text-center">
          <p className="font-sans text-[14px] text-ink-400">Aramanla eşleşen kitap yok.</p>
        </div>
      )}
    </div>
  )
}

function FilterChip({
  active, onClick, label, color,
}: { active: boolean; onClick: () => void; label: string; color?: string }) {
  return (
    <button
      onClick={onClick}
      className={[
        'shrink-0 rounded-full border px-3.5 py-1.5 font-sans text-[12.5px] font-medium transition-all',
        active
          ? 'border-transparent text-paper-50 shadow-sm'
          : 'border-ink-800/12 bg-paper-50/60 text-ink-500 hover:border-ink-800/25 hover:text-ink-800',
      ].join(' ')}
      style={active ? { background: color || '#2a251d' } : undefined}
    >
      {label}
    </button>
  )
}
