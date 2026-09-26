import { useMemo, useState } from 'react'
import {
  DIFFICULTY_LABEL, QUESTIONS, SUBJECTS, TOPICS_BY_SUBJECT, questionsFor, subjectById,
} from '@/content'
import type { Question } from '@/content/types'
import { QuizRunner } from '@/components/QuizRunner'
import { IcCheck, IcSparkle, IcTarget, IcUndo } from '@/components/Icons'

const SIZES = [5, 10, 15, 20]

export default function Bank() {
  const [subjectId, setSubjectId] = useState(SUBJECTS[0].id)
  const [topics, setTopics] = useState<string[]>([])
  const [difficulties, setDifficulties] = useState<number[]>([])
  const [size, setSize] = useState(10)
  const [session, setSession] = useState<{ questions: Question[]; title: string } | null>(null)

  const subject = subjectById(subjectId)!
  const allTopics = TOPICS_BY_SUBJECT[subjectId] ?? []

  const available = useMemo(
    () =>
      QUESTIONS.filter(
        (q) =>
          q.subjectId === subjectId &&
          (topics.length === 0 || topics.includes(q.topic)) &&
          (difficulties.length === 0 || difficulties.includes(q.difficulty))
      ),
    [subjectId, topics, difficulties]
  )

  const topicCount = (t: string) => QUESTIONS.filter((q) => q.subjectId === subjectId && q.topic === t).length

  function start() {
    const picked = questionsFor({
      subjectId,
      topics: topics.length ? topics : undefined,
      difficulties: difficulties.length ? difficulties : undefined,
      limit: Math.min(size, available.length),
      shuffle: true,
    })
    if (!picked.length) return
    setSession({
      questions: picked,
      title:
        topics.length === 1
          ? `${subject.name} · ${topics[0]}`
          : `${subject.name} · Karma Deneme`,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (session) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <button
          className="btn-quiet mb-5 text-[13px]"
          onClick={() => setSession(null)}
        >
          <IcUndo size={14} /> Test kurulumuna dön
        </button>
        <div
          className="book-sheet relative rounded-[14px] px-5 py-8 sm:px-10 sm:py-10"
          style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '17px', lineHeight: 1.8 }}
        >
          <QuizRunner
            questions={session.questions}
            title={session.title}
            subtitle={`${session.questions.length} soru · ${subject.name}`}
            source="bank"
            subjectId={subjectId}
            topics={topics.length ? topics : undefined}
            onRestart={() => {}}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8">
        <span className="chip border-brand-500/25 bg-brand-500/10 text-brand-700">
          <IcTarget size={12} /> {QUESTIONS.length} soruluk havuz
        </span>
        <h1 className="mt-3 font-serif text-[2rem] font-semibold leading-tight text-ink-900 sm:text-[2.4rem]">
          Soru Bankası
        </h1>
        <p className="mt-1.5 max-w-2xl font-sans text-[14px] leading-relaxed text-ink-400">
          Dersini ve konularını seç, soru sayısını belirle, testi başlat. Bitirince her sorunun
          çözümünü görürsün ve sonucun istatistiklerine işlenir.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-5">
          {/* ders */}
          <section className="panel p-5">
            <h2 className="label">1 · Ders</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {SUBJECTS.map((s) => {
                const on = subjectId === s.id
                const count = QUESTIONS.filter((q) => q.subjectId === s.id).length
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSubjectId(s.id)
                      setTopics([])
                    }}
                    className={[
                      'flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all',
                      on
                        ? 'border-transparent shadow-sm ring-2'
                        : 'border-ink-800/10 hover:border-ink-800/25 hover:bg-ink-800/3',
                    ].join(' ')}
                    style={
                      on
                        ? ({ background: `${s.color}14`, ['--tw-ring-color' as string]: `${s.color}55` })
                        : undefined
                    }
                  >
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[15px] text-white"
                      style={{ background: s.color }}
                    >
                      {s.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-sans text-[13.5px] font-semibold text-ink-900">
                        {s.name}
                      </span>
                      <span className="block font-sans text-[11.5px] text-ink-400">{count} soru</span>
                    </span>
                    {on && <IcCheck size={16} style={{ color: s.color }} />}
                  </button>
                )
              })}
            </div>
          </section>

          {/* konular */}
          <section className="panel p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="label mb-0">2 · Konular</h2>
              <button
                className="btn-quiet px-2 py-1 text-[12px]"
                onClick={() => setTopics([])}
                disabled={!topics.length}
              >
                Temizle
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {allTopics.map((t) => {
                const on = topics.includes(t)
                return (
                  <button
                    key={t}
                    onClick={() =>
                      setTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))
                    }
                    className={[
                      'rounded-full border px-3 py-1.5 font-sans text-[12.5px] font-medium transition-all',
                      on
                        ? 'border-transparent text-paper-50 shadow-sm'
                        : 'border-ink-800/12 bg-paper-50/60 text-ink-500 hover:border-ink-800/25 hover:text-ink-800',
                    ].join(' ')}
                    style={on ? { background: subject.color } : undefined}
                  >
                    {t}
                    <span className={`ml-1.5 text-[10.5px] ${on ? 'opacity-70' : 'opacity-50'}`}>
                      {topicCount(t)}
                    </span>
                  </button>
                )
              })}
            </div>
            <p className="mt-3 font-sans text-[12px] text-ink-400">
              Hiçbirini seçmezsen dersin tüm konularından karma bir deneme oluşturulur.
            </p>
          </section>

          {/* zorluk + adet */}
          <section className="panel p-5">
            <h2 className="label">3 · Zorluk ve soru sayısı</h2>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {[1, 2, 3].map((d) => {
                const on = difficulties.includes(d)
                return (
                  <button
                    key={d}
                    onClick={() =>
                      setDifficulties((p) => (p.includes(d) ? p.filter((x) => x !== d) : [...p, d]))
                    }
                    className={[
                      'rounded-full border px-3.5 py-1.5 font-sans text-[12.5px] font-medium transition',
                      on
                        ? 'border-transparent bg-ink-900 text-paper-50'
                        : 'border-ink-800/12 bg-paper-50/60 text-ink-500 hover:border-ink-800/25',
                    ].join(' ')}
                  >
                    {DIFFICULTY_LABEL[d]}
                  </button>
                )
              })}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SIZES.map((n) => (
                <button
                  key={n}
                  onClick={() => setSize(n)}
                  disabled={available.length === 0}
                  className={[
                    'tabular min-w-[54px] rounded-xl border px-3 py-2 font-sans text-[13px] font-semibold transition',
                    size === n
                      ? 'border-brand-500/45 bg-brand-500/12 text-brand-700'
                      : 'border-ink-800/12 text-ink-500 hover:border-ink-800/25',
                  ].join(' ')}
                >
                  {n}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* özet */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="panel overflow-hidden">
            <div
              className="px-5 py-4 text-paper-50"
              style={{ background: subject.color }}
            >
              <div className="font-sans text-[10.5px] font-bold uppercase tracking-[0.16em] opacity-75">
                Deneme özeti
              </div>
              <div className="mt-1 font-serif text-[1.3rem] font-semibold leading-tight">
                {subject.name}
              </div>
            </div>
            <dl className="divide-y divide-ink-800/8">
              {[
                { k: 'Konu', v: topics.length ? `${topics.length} seçili` : 'Tüm konular' },
                { k: 'Zorluk', v: difficulties.length ? difficulties.map((d) => DIFFICULTY_LABEL[d]).join(', ') : 'Karışık' },
                { k: 'Havuzda', v: `${available.length} soru` },
                { k: 'Çözülecek', v: `${Math.min(size, available.length)} soru` },
              ].map((r) => (
                <div key={r.k} className="flex items-center justify-between px-5 py-2.5">
                  <dt className="font-sans text-[12.5px] text-ink-400">{r.k}</dt>
                  <dd className="text-right font-sans text-[12.5px] font-semibold text-ink-800">{r.v}</dd>
                </div>
              ))}
            </dl>
            <div className="p-4">
              <button
                className="btn-primary w-full py-2.5"
                onClick={start}
                disabled={available.length === 0}
              >
                <IcSparkle size={15} /> Testi başlat
              </button>
              {available.length === 0 && (
                <p className="mt-2 text-center font-sans text-[12px] text-brand-600">
                  Bu filtrelerle soru bulunamadı.
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
