import { useEffect, useMemo, useRef, useState } from 'react'
import type { Question } from '@/content/types'
import { DIFFICULTY_LABEL } from '@/content'
import { api, type AttemptDetail } from '@/lib/api'
import { IcCheck, IcClock, IcSparkle, IcUndo, IcX } from './Icons'

const LETTERS = ['A', 'B', 'C', 'D', 'E']

const fmtTime = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

export type QuizResult = {
  correct: number
  wrong: number
  blank: number
  total: number
  durationS: number
  detail: AttemptDetail[]
}

type Props = {
  questions: Question[]
  title: string
  subtitle?: string
  intro?: string
  source: 'book' | 'bank'
  subjectId: string
  topics?: string[]
  compact?: boolean
  onFinished?: (r: QuizResult) => void
  onRestart?: () => void
}

export function QuizRunner({
  questions, title, subtitle, intro, source, subjectId, topics, onFinished, onRestart,
}: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [done, setDone] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [saving, setSaving] = useState(false)
  const startRef = useRef(Date.now())
  const rootRef = useRef<HTMLDivElement>(null)

  // Dizi kimligi her render'da degisebilir; icerige dayali kararli bir anahtar kullan.
  const quizKey = useMemo(() => questions.map((q) => q.id).join('|'), [questions])

  useEffect(() => {
    setAnswers({})
    setDone(false)
    setSeconds(0)
    startRef.current = Date.now()
  }, [quizKey])

  useEffect(() => {
    if (done) return
    const t = window.setInterval(() => setSeconds(Math.round((Date.now() - startRef.current) / 1000)), 1000)
    return () => window.clearInterval(t)
  }, [done, quizKey])

  const result = useMemo<QuizResult>(() => {
    let correct = 0
    let wrong = 0
    let blank = 0
    const detail: AttemptDetail[] = questions.map((q) => {
      const chosen = answers[q.id]
      const status: AttemptDetail['status'] =
        chosen === undefined ? 'blank' : chosen === q.answer ? 'correct' : 'wrong'
      if (status === 'correct') correct++
      else if (status === 'wrong') wrong++
      else blank++
      return { questionId: q.id, topic: q.topic, status, chosen: chosen ?? null, answer: q.answer }
    })
    return { correct, wrong, blank, total: questions.length, durationS: seconds, detail }
  }, [answers, questions, seconds])

  const answered = questions.length - result.blank
  const pct = questions.length ? Math.round((result.correct / questions.length) * 100) : 0
  const net = Math.max(0, result.correct - result.wrong / 3)

  async function finish() {
    setDone(true)
    setSaving(true)
    try {
      await api.saveAttempt({
        source,
        subjectId,
        topics: topics ?? [...new Set(questions.map((q) => q.topic))],
        title,
        total: result.total,
        correct: result.correct,
        wrong: result.wrong,
        blank: result.blank,
        durationS: seconds,
        detail: result.detail,
      })
    } catch {
      /* cevrimdisi olabilir; sonuc yine de gosterilir */
    } finally {
      setSaving(false)
      onFinished?.(result)
      rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  function restart() {
    setAnswers({})
    setDone(false)
    setSeconds(0)
    startRef.current = Date.now()
    onRestart?.()
    rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div ref={rootRef} className="scroll-mt-6">
      <header className="mb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="chip border-brand-500/25 bg-brand-500/10 text-brand-700">
            <IcSparkle size={12} /> {source === 'book' ? 'Ünite Testi' : 'Soru Bankası'}
          </span>
          <span className="chip tabular">
            <IcClock size={12} /> {fmtTime(seconds)}
          </span>
          <span className="chip tabular">{questions.length} soru</span>
        </div>
        <h1 className="font-serif text-[1.65em] font-semibold leading-tight text-ink-900">{title}</h1>
        {subtitle && <p className="mt-1 font-sans text-[0.86em] text-ink-400">{subtitle}</p>}
        {intro && !done && (
          <p className="mt-3 rounded-xl border border-ink-800/10 bg-paper-100/50 px-4 py-3 text-[0.94em] leading-relaxed text-ink-600">
            {intro}
          </p>
        )}
      </header>

      {done && (
        <div className="mb-7 animate-fade-up overflow-hidden rounded-2xl border border-ink-800/12 bg-paper-100/50">
          <div className="grid grid-cols-2 divide-x divide-ink-800/8 sm:grid-cols-4">
            {[
              { label: 'Doğru', value: result.correct, tone: 'text-forest-500' },
              { label: 'Yanlış', value: result.wrong, tone: 'text-brand-600' },
              { label: 'Boş', value: result.blank, tone: 'text-ink-400' },
              { label: 'Net', value: net.toFixed(2), tone: 'text-ink-800' },
            ].map((s) => (
              <div key={s.label} className="px-4 py-4 text-center">
                <div className={`tabular font-serif text-[1.7em] font-semibold leading-none ${s.tone}`}>
                  {s.value}
                </div>
                <div className="mt-1.5 font-sans text-[0.68em] font-bold uppercase tracking-[0.13em] text-ink-400">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-ink-800/8 px-5 py-3.5">
            <div className="mb-2 flex items-center justify-between font-sans text-[0.78em] text-ink-500">
              <span>Başarı oranı</span>
              <span className="tabular font-semibold text-ink-800">%{pct}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-ink-800/8">
              <div
                className="h-full rounded-full bg-gradient-to-r from-forest-300 to-forest-500 transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-3.5 flex flex-wrap items-center gap-2">
              <button className="btn-ghost py-1.5 text-[0.82em]" onClick={restart}>
                <IcUndo size={14} /> Tekrar çöz
              </button>
              <span className="font-sans text-[0.78em] text-ink-400">
                {saving ? 'sonuç kaydediliyor…' : 'Sonuç istatistiklerine işlendi.'}
              </span>
            </div>
          </div>
        </div>
      )}

      <ol className="space-y-6">
        {questions.map((q, qi) => {
          const chosen = answers[q.id]
          const isCorrect = chosen === q.answer
          return (
            <li
              key={q.id}
              className={[
                'rounded-2xl border px-5 py-4 transition-colors',
                done
                  ? chosen === undefined
                    ? 'border-ink-800/12 bg-paper-100/30'
                    : isCorrect
                      ? 'border-forest-300/60 bg-forest-100/25'
                      : 'border-brand-300/60 bg-brand-50/40'
                  : 'border-ink-800/12 bg-paper-50/40',
              ].join(' ')}
            >
              <div className="mb-3 flex items-start gap-3">
                <span
                  className={[
                    'tabular mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg font-sans text-[0.78em] font-bold',
                    done
                      ? chosen === undefined
                        ? 'bg-ink-800/10 text-ink-500'
                        : isCorrect
                          ? 'bg-forest-500 text-white'
                          : 'bg-brand-600 text-white'
                      : 'bg-ink-800/8 text-ink-600',
                  ].join(' ')}
                >
                  {qi + 1}
                </span>
                <div className="min-w-0 flex-1">
                  {q.passage && (
                    <p className="mb-3 rounded-xl border-l-2 border-ink-800/15 bg-paper-200/30 px-4 py-3 font-serif text-[0.95em] italic leading-[1.75] text-ink-600">
                      {q.passage}
                    </p>
                  )}
                  <p className="whitespace-pre-line font-serif text-[1.02em] leading-[1.7] text-ink-900">
                    {q.stem}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    <span className="chip py-0.5 text-[10px]">{q.topic}</span>
                    <span className="chip py-0.5 text-[10px]">{DIFFICULTY_LABEL[q.difficulty]}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pl-10">
                {q.options.map((opt, oi) => {
                  const picked = chosen === oi
                  const rightOne = done && oi === q.answer
                  const wrongPick = done && picked && oi !== q.answer
                  return (
                    <button
                      key={oi}
                      disabled={done}
                      onClick={() =>
                        setAnswers((a) => {
                          const next = { ...a }
                          if (next[q.id] === oi) delete next[q.id]
                          else next[q.id] = oi
                          return next
                        })
                      }
                      className={[
                        'flex w-full items-start gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-all',
                        rightOne
                          ? 'border-forest-500/50 bg-forest-100/60'
                          : wrongPick
                            ? 'border-brand-500/50 bg-brand-100/50'
                            : picked
                              ? 'border-brand-400/50 bg-brand-500/8'
                              : 'border-ink-800/10 hover:border-ink-800/25 hover:bg-ink-800/3',
                        done ? 'cursor-default' : 'cursor-pointer active:scale-[.995]',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'grid h-6 w-6 shrink-0 place-items-center rounded-full border font-sans text-[0.72em] font-bold',
                          rightOne
                            ? 'border-forest-500 bg-forest-500 text-white'
                            : wrongPick
                              ? 'border-brand-600 bg-brand-600 text-white'
                              : picked
                                ? 'border-brand-500 bg-brand-500 text-white'
                                : 'border-ink-800/22 text-ink-500',
                        ].join(' ')}
                      >
                        {rightOne ? <IcCheck size={13} /> : wrongPick ? <IcX size={13} /> : LETTERS[oi]}
                      </span>
                      <span
                        className="flex-1 text-[0.96em] leading-[1.6]"
                        dangerouslySetInnerHTML={{ __html: opt }}
                      />
                    </button>
                  )
                })}
              </div>

              {done && (
                <div className="mt-3.5 ml-10 animate-fade-up rounded-xl border border-ink-800/10 bg-paper-100/50 px-4 py-3">
                  <div className="mb-1 font-sans text-[0.68em] font-bold uppercase tracking-[0.13em] text-ink-400">
                    Çözüm · Doğru cevap {LETTERS[q.answer]}
                  </div>
                  <p className="text-[0.93em] leading-[1.7] text-ink-600">{q.explanation}</p>
                </div>
              )}
            </li>
          )
        })}
      </ol>

      {!done && (
        <div className="sticky bottom-3 z-10 mt-7">
          <div className="panel flex items-center gap-3 px-4 py-3">
            <div className="flex-1">
              <div className="mb-1.5 flex items-center justify-between font-sans text-[0.76em] text-ink-500">
                <span>
                  <b className="tabular text-ink-800">{answered}</b> / {questions.length} işaretlendi
                </span>
                <span className="tabular">{fmtTime(seconds)}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-ink-800/8">
                <div
                  className="h-full rounded-full bg-brand-500 transition-all"
                  style={{ width: `${(answered / Math.max(1, questions.length)) * 100}%` }}
                />
              </div>
            </div>
            <button className="btn-primary shrink-0" onClick={finish}>
              Testi bitir
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
