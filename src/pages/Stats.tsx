import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BOOKS, SUBJECTS, flatPages, subjectById } from '@/content'
import { api, type Stats as StatsData } from '@/lib/api'
import { IcChart, IcClock, IcFlame, IcNote, IcSparkle, IcTarget } from '@/components/Icons'

const fmtDate = (ts: number) =>
  new Date(ts).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })

const fmtDur = (s: number) => (s < 60 ? `${s} sn` : `${Math.floor(s / 60)} dk ${s % 60} sn`)

export default function Stats() {
  const [data, setData] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .stats()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const totals = useMemo(() => {
    if (!data) return { correct: 0, wrong: 0, blank: 0, total: 0, net: 0, attempts: 0 }
    let correct = 0, wrong = 0, blank = 0, total = 0, attempts = 0
    for (const s of Object.values(data.bySubject)) {
      correct += s.correct; wrong += s.wrong; blank += s.blank
      total += s.total; attempts += s.attempts
    }
    return { correct, wrong, blank, total, net: Math.max(0, correct - wrong / 3), attempts }
  }, [data])

  const weakTopics = useMemo(() => {
    if (!data) return []
    return Object.entries(data.byTopic)
      .filter(([, t]) => t.total >= 2)
      .map(([name, t]) => ({ name, ...t, rate: t.correct / t.total }))
      .sort((a, b) => a.rate - b.rate)
      .slice(0, 8)
  }, [data])

  const strongTopics = useMemo(() => {
    if (!data) return []
    return Object.entries(data.byTopic)
      .filter(([, t]) => t.total >= 2)
      .map(([name, t]) => ({ name, ...t, rate: t.correct / t.total }))
      .sort((a, b) => b.rate - a.rate)
      .slice(0, 5)
  }, [data])

  const readingTotals = useMemo(() => {
    if (!data) return { read: 0, all: 0 }
    const all = BOOKS.reduce((n, b) => n + flatPages(b).length, 0)
    const read = data.progress.reduce((n, p) => n + p.seenPages.length, 0)
    return { read, all }
  }, [data])

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <p className="font-sans text-[14px] text-ink-400">İstatistikler yükleniyor…</p>
      </div>
    )
  }

  const empty = !data || totals.total === 0

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8">
        <h1 className="font-serif text-[2rem] font-semibold leading-tight text-ink-900 sm:text-[2.4rem]">
          İstatistiklerim
        </h1>
        <p className="mt-1.5 max-w-2xl font-sans text-[14px] leading-relaxed text-ink-400">
          Çözdüğün her test ve okuduğun her sayfa buraya işlenir.
        </p>
      </header>

      {/* -------------------------------------------------- özet kartlar */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard Icon={IcTarget} label="Toplam net" value={totals.net.toFixed(2)} sub={`${totals.total} soruda`} />
        <StatCard Icon={IcSparkle} label="Doğru oranı" value={totals.total ? `%${Math.round((totals.correct / totals.total) * 100)}` : '—'} sub={`${totals.correct}D · ${totals.wrong}Y · ${totals.blank}B`} />
        <StatCard Icon={IcChart} label="Deneme sayısı" value={String(totals.attempts)} sub="çözülen test" />
        <StatCard
          Icon={IcNote}
          label="Defter"
          value={String(data?.counts.notes ?? 0)}
          sub={`${data?.counts.marks ?? 0} işaret · ${data?.counts.strokes ?? 0} çizim`}
        />
      </div>

      {empty && (
        <div className="panel mb-8 px-6 py-12 text-center">
          <div className="mb-3 text-3xl opacity-40">✦</div>
          <h2 className="font-serif text-[1.3rem] font-semibold text-ink-900">Henüz test çözmedin</h2>
          <p className="mx-auto mt-1.5 max-w-md font-sans text-[13.5px] leading-relaxed text-ink-400">
            Bir ünite testi ya da soru bankası denemesi çöz; netin, konu bazlı başarı oranın ve
            zayıf konuların burada listelensin.
          </p>
          <Link to="/soru-bankasi" className="btn-primary mt-5">
            <IcTarget size={15} /> Soru bankasına git
          </Link>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-5">
          {/* ---------------------------------------------- ders bazlı */}
          <section className="panel p-5">
            <h2 className="mb-4 font-serif text-[1.15rem] font-semibold text-ink-900">Derslere göre</h2>
            <div className="space-y-3">
              {SUBJECTS.map((s) => {
                const d = data?.bySubject[s.id]
                const rate = d && d.total ? d.correct / d.total : 0
                return (
                  <div key={s.id}>
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                      <span className="flex-1 truncate font-sans text-[13px] font-medium text-ink-700">
                        {s.name}
                      </span>
                      <span className="tabular shrink-0 font-sans text-[12px] text-ink-400">
                        {d ? `${d.correct}/${d.total}` : '—'}
                      </span>
                      <span className="tabular w-11 shrink-0 text-right font-sans text-[12.5px] font-semibold text-ink-800">
                        {d && d.total ? `%${Math.round(rate * 100)}` : '—'}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-ink-800/7">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${rate * 100}%`, background: s.color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ------------------------------------------------- okuma */}
          <section className="panel p-5">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="font-serif text-[1.15rem] font-semibold text-ink-900">Okuma ilerlemesi</h2>
              <span className="tabular font-sans text-[12.5px] text-ink-400">
                {readingTotals.read} / {readingTotals.all} sayfa
              </span>
            </div>
            <div className="space-y-3">
              {BOOKS.map((b) => {
                const pages = flatPages(b).length
                const p = data?.progress.find((x) => x.bookId === b.id)
                const pct = p ? Math.round((p.seenPages.length / pages) * 100) : 0
                const s = subjectById(b.subjectId)!
                return (
                  <Link key={b.id} to={`/oku/${b.id}`} className="group block">
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="flex-1 truncate font-sans text-[13px] text-ink-600 group-hover:text-ink-900">
                        {b.title}
                      </span>
                      <span className="tabular shrink-0 font-sans text-[12px] font-semibold text-ink-500">
                        %{pct}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-ink-800/7">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: s.color }}
                      />
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* --------------------------------------------- son denemeler */}
          {!!data?.attempts.length && (
            <section className="panel overflow-hidden">
              <h2 className="border-b border-ink-800/8 px-5 py-4 font-serif text-[1.15rem] font-semibold text-ink-900">
                Son denemeler
              </h2>
              <ul className="divide-y divide-ink-800/7">
                {data.attempts.slice(0, 10).map((a) => {
                  const s = subjectById(a.subjectId)
                  const net = Math.max(0, a.correct - a.wrong / 3)
                  return (
                    <li key={a.id} className="flex items-center gap-3 px-5 py-3">
                      <span
                        className="h-8 w-1 shrink-0 rounded-full"
                        style={{ background: s?.color ?? '#999' }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-sans text-[13px] font-medium text-ink-800">
                          {a.title}
                        </div>
                        <div className="flex items-center gap-2 font-sans text-[11.5px] text-ink-400">
                          <span>{fmtDate(a.createdAt)}</span>
                          <span className="inline-flex items-center gap-1">
                            <IcClock size={10} /> {fmtDur(a.durationS)}
                          </span>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="tabular font-serif text-[15px] font-semibold text-ink-900">
                          {net.toFixed(2)}
                        </div>
                        <div className="tabular font-sans text-[10.5px] text-ink-400">
                          {a.correct}D {a.wrong}Y {a.blank}B
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}
        </div>

        {/* ------------------------------------------------ konu analizi */}
        <div className="space-y-5">
          <section className="panel p-5">
            <div className="mb-3 flex items-center gap-2">
              <IcFlame size={17} className="text-brand-600" />
              <h2 className="font-serif text-[1.15rem] font-semibold text-ink-900">Çalışman gereken konular</h2>
            </div>
            {weakTopics.length === 0 ? (
              <p className="font-sans text-[13px] leading-relaxed text-ink-400">
                En az iki soru çözdüğün konular burada zayıftan güçlüye sıralanır.
              </p>
            ) : (
              <ul className="space-y-2.5">
                {weakTopics.map((t) => {
                  const s = subjectById(t.subjectId)
                  return (
                    <li key={t.name}>
                      <div className="mb-1 flex items-center gap-2">
                        <span className="flex-1 truncate font-sans text-[12.5px] text-ink-700">{t.name}</span>
                        <span className="tabular shrink-0 font-sans text-[11.5px] font-semibold text-ink-500">
                          {t.correct}/{t.total}
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-ink-800/7">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${t.rate * 100}%`,
                            background: t.rate < 0.5 ? '#b94f33' : t.rate < 0.8 ? '#d89b3c' : (s?.color ?? '#5b7f57'),
                          }}
                        />
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>

          {strongTopics.length > 0 && (
            <section className="panel p-5">
              <div className="mb-3 flex items-center gap-2">
                <IcSparkle size={17} className="text-forest-500" />
                <h2 className="font-serif text-[1.15rem] font-semibold text-ink-900">Güçlü olduğun konular</h2>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {strongTopics.map((t) => (
                  <li
                    key={t.name}
                    className="rounded-full border border-forest-300/60 bg-forest-100/50 px-3 py-1.5 font-sans text-[12px] font-medium text-forest-700"
                  >
                    {t.name}
                    <span className="tabular ml-1.5 opacity-60">%{Math.round(t.rate * 100)}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="panel p-5">
            <h2 className="mb-3 font-serif text-[1.15rem] font-semibold text-ink-900">Çalışma alışkanlığın</h2>
            <dl className="space-y-2.5">
              {[
                { k: 'Okunan sayfa', v: `${readingTotals.read}` },
                { k: 'Aldığın not', v: `${data?.counts.notes ?? 0}` },
                { k: 'İşaretleme', v: `${data?.counts.marks ?? 0}` },
                { k: 'Kalem çizimi', v: `${data?.counts.strokes ?? 0}` },
                { k: 'Yer imi', v: `${data?.counts.bookmarks ?? 0}` },
                {
                  k: 'Toplam süre',
                  v: fmtDur((data?.progress ?? []).reduce((n, p) => n + p.seconds, 0)),
                },
              ].map((r) => (
                <div key={r.k} className="flex items-center justify-between border-b border-ink-800/6 pb-2 last:border-0">
                  <dt className="font-sans text-[12.5px] text-ink-400">{r.k}</dt>
                  <dd className="tabular font-sans text-[13px] font-semibold text-ink-800">{r.v}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  Icon, label, value, sub,
}: { Icon: typeof IcChart; label: string; value: string; sub: string }) {
  return (
    <div className="panel p-4">
      <div className="mb-2 flex items-center gap-2 font-sans text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink-400">
        <Icon size={14} className="text-brand-500" />
        {label}
      </div>
      <div className="tabular font-serif text-[1.85rem] font-semibold leading-none text-ink-900">{value}</div>
      <div className="mt-1.5 font-sans text-[11.5px] text-ink-400">{sub}</div>
    </div>
  )
}
