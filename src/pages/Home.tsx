import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BOOKS, QUESTIONS, SUBJECTS, bookStats, flatPages, subjectById } from '@/content'
import { api, type Progress } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import { BookCover } from '@/components/BookCover'
import {
  IcBook, IcChart, IcChevronRight, IcHighlighter, IcNote, IcSparkle, IcTarget,
} from '@/components/Icons'

export default function Home() {
  const { user } = useAuth()
  const [progress, setProgress] = useState<Progress[]>([])

  useEffect(() => {
    api.allProgress().then((r) => setProgress(r.progress)).catch(() => {})
  }, [])

  const continueItem = useMemo(() => {
    const sorted = [...progress].sort((a, b) => b.updatedAt - a.updatedAt)
    for (const p of sorted) {
      const book = BOOKS.find((b) => b.id === p.bookId)
      if (book) return { book, progress: p }
    }
    return null
  }, [progress])

  const totalPages = BOOKS.reduce((n, b) => n + bookStats(b).pageCount, 0)
  const totalRead = progress.reduce((n, p) => n + p.seenPages.length, 0)

  const hour = new Date().getHours()
  const greeting = hour < 11 ? 'Günaydın' : hour < 18 ? 'İyi çalışmalar' : 'İyi akşamlar'

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {/* ------------------------------------------------------- hero */}
      <section className="relative overflow-hidden rounded-3xl border border-ink-800/10 bg-ink-900 px-6 py-10 text-paper-100 sm:px-10 sm:py-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-brand-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-forest-500/15 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <span className="chip border-paper-100/20 bg-paper-100/10 text-paper-200/80">
              <IcSparkle size={12} /> LGS 2026 · 8. Sınıf
            </span>
            <h1 className="mt-4 font-serif text-[2.2rem] font-semibold leading-[1.08] tracking-tight sm:text-[3rem]">
              {greeting}, {user?.displayName?.split(' ')[0]}.
              <br />
              <span className="text-brand-300">Kaldığın sayfa seni bekliyor.</span>
            </h1>
            <p className="mt-4 max-w-xl font-sans text-[15px] leading-relaxed text-paper-200/70">
              Altı dersin tamamı dijital kitap olarak burada. Okurken fosforlu kalemle işaretle,
              sol taraftaki deftere not al, ünite sonunda testi çöz. Her şey hesabında kalıcı.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {continueItem ? (
                <Link
                  to={`/oku/${continueItem.book.id}?s=${continueItem.progress.pageIndex + 1}`}
                  className="btn bg-brand-500 px-5 py-2.5 text-paper-50 hover:bg-brand-400"
                >
                  <IcBook size={16} /> Okumaya devam et
                  <span className="ml-1 rounded-md bg-black/20 px-1.5 py-0.5 text-[11px]">
                    s.{continueItem.progress.pageIndex + 1}
                  </span>
                </Link>
              ) : (
                <Link to="/kitaplik" className="btn bg-brand-500 px-5 py-2.5 text-paper-50 hover:bg-brand-400">
                  <IcBook size={16} /> Kitaplığa gir
                </Link>
              )}
              <Link
                to="/soru-bankasi"
                className="btn border border-paper-100/20 bg-paper-100/5 px-5 py-2.5 text-paper-100 hover:bg-paper-100/12"
              >
                <IcTarget size={16} /> Soru bankasını aç
              </Link>
            </div>

            <dl className="mt-9 grid max-w-lg grid-cols-3 gap-4 border-t border-paper-100/12 pt-6">
              {[
                { k: BOOKS.length, l: 'kitap' },
                { k: totalPages, l: 'sayfa' },
                { k: QUESTIONS.length, l: 'soru' },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="tabular font-serif text-[1.9rem] font-semibold leading-none text-paper-100">
                    {s.k}
                  </dt>
                  <dd className="mt-1 font-sans text-[11px] uppercase tracking-[0.15em] text-paper-200/50">
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* kitap yığını */}
          <div className="relative hidden h-[340px] lg:block">
            {BOOKS.slice(0, 4).map((b, i) => (
              <Link
                key={b.id}
                to={`/oku/${b.id}`}
                className="absolute w-[148px] transition-all duration-300 hover:-translate-y-3 hover:rotate-0"
                style={{
                  left: `${i * 78}px`,
                  top: `${20 + (i % 2) * 26}px`,
                  transform: `rotate(${-6 + i * 4}deg)`,
                  zIndex: 10 - i,
                }}
              >
                <BookCover book={b} size="sm" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ devam eden */}
      {continueItem && (
        <section className="mt-6">
          <ContinueCard book={continueItem.book} progress={continueItem.progress} />
        </section>
      )}

      {/* --------------------------------------------------- dersler */}
      <section className="mt-12">
        <header className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-[1.55rem] font-semibold text-ink-900">Dersler</h2>
            <p className="mt-0.5 font-sans text-[13.5px] text-ink-400">
              Her ders için bir kitap ve konularına ayrılmış soru havuzu.
            </p>
          </div>
          <Link to="/kitaplik" className="btn-quiet shrink-0 text-[13px]">
            Tümünü gör <IcChevronRight size={14} />
          </Link>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((s) => {
            const book = BOOKS.find((b) => b.subjectId === s.id)!
            const st = bookStats(book)
            const qCount = QUESTIONS.filter((q) => q.subjectId === s.id).length
            return (
              <Link
                key={s.id}
                to={`/oku/${book.id}`}
                className="group panel flex gap-4 p-4 transition-all hover:-translate-y-0.5 hover:shadow-book"
              >
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-xl text-white shadow-sm"
                  style={{ background: s.color }}
                >
                  {s.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-[16.5px] font-semibold leading-tight text-ink-900">
                    {s.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 font-sans text-[12.5px] leading-relaxed text-ink-400">
                    {s.description}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <span className="chip py-0.5 text-[10.5px]">{st.pageCount} sayfa</span>
                    <span className="chip py-0.5 text-[10.5px]">{qCount} soru</span>
                    <span className="chip py-0.5 text-[10.5px]">LGS’de {s.lgsQuestions} soru</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* --------------------------------------------- nasıl çalışır */}
      <section className="mt-14">
        <h2 className="mb-5 font-serif text-[1.55rem] font-semibold text-ink-900">Nasıl çalışır?</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              Icon: IcHighlighter,
              title: 'İşaretle',
              text: 'Sağ paneldeki fosforlu kalemi seç, kitapta bir cümleyi işaretle. Altı çizili, üstü çizili ve serbest el kalemi de var.',
              color: '#f6c945',
            },
            {
              Icon: IcNote,
              title: 'Not al',
              text: 'Soldaki not defterine yazdıkların otomatik kaydedilir. Notlar hangi sayfada yazıldıysa oraya etiketlenir.',
              color: '#6fc472',
            },
            {
              Icon: IcChart,
              title: 'Ölç',
              text: 'Ünite testleri ve soru bankası denemelerin netinle birlikte istatistiklerine işlenir, zayıf konuların listelenir.',
              color: '#6cabe8',
            },
          ].map((c) => (
            <article key={c.title} className="panel p-5">
              <span
                className="mb-3 grid h-10 w-10 place-items-center rounded-xl"
                style={{ background: `${c.color}28`, color: '#3b342a' }}
              >
                <c.Icon size={19} />
              </span>
              <h3 className="font-serif text-[17px] font-semibold text-ink-900">{c.title}</h3>
              <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-ink-500">{c.text}</p>
            </article>
          ))}
        </div>
      </section>

      {totalRead > 0 && (
        <p className="mt-10 text-center font-sans text-[13px] text-ink-400">
          Şimdiye kadar <b className="text-ink-700">{totalRead}</b> sayfa okudun. Devam! ✦
        </p>
      )}
    </div>
  )
}

function ContinueCard({ book, progress }: { book: (typeof BOOKS)[number]; progress: Progress }) {
  const pages = flatPages(book)
  const cur = pages[Math.min(progress.pageIndex, pages.length - 1)]
  const pct = Math.round((progress.seenPages.length / pages.length) * 100)
  const subject = subjectById(book.subjectId)!

  return (
    <Link
      to={`/oku/${book.id}?s=${progress.pageIndex + 1}`}
      className="panel group flex items-center gap-4 p-4 transition-all hover:-translate-y-0.5 hover:shadow-book sm:gap-5 sm:p-5"
    >
      <div className="w-[62px] shrink-0 sm:w-[76px]">
        <BookCover book={book} size="sm" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 font-sans text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink-400">
          Kaldığın yer
        </div>
        <h3 className="truncate font-serif text-[17px] font-semibold text-ink-900">{book.title}</h3>
        <p className="truncate font-sans text-[12.5px] text-ink-400">
          {cur.chapter.title} · {cur.page.title}
        </p>
        <div className="mt-2.5 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-800/8">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${pct}%`, background: subject.color }}
            />
          </div>
          <span className="tabular shrink-0 font-sans text-[11.5px] font-semibold text-ink-500">
            %{pct}
          </span>
        </div>
      </div>
      <IcChevronRight size={20} className="hidden shrink-0 text-ink-400 transition-transform group-hover:translate-x-1 sm:block" />
    </Link>
  )
}
