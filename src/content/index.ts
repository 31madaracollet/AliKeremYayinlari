import type { Book, FlatPage, Question } from './types'
import { SUBJECTS, subjectById } from './subjects'

import * as turkce from './books/turkce'
import * as matematik from './books/matematik'
import * as fen from './books/fen'
import * as inkilap from './books/inkilap'
import * as din from './books/din'
import * as ingilizce from './books/ingilizce'

const modules = [turkce, matematik, fen, inkilap, din, ingilizce]

export const BOOKS: Book[] = modules.map((m) => m.book)
export const QUESTIONS: Question[] = modules.flatMap((m) => m.questions)

export { SUBJECTS, subjectById }
export * from './types'

const questionIndex = new Map(QUESTIONS.map((q) => [q.id, q]))
export const questionById = (id: string) => questionIndex.get(id)

const bookIndex = new Map(BOOKS.map((b) => [b.id, b]))
export const bookById = (id: string) => bookIndex.get(id)
export const booksBySubject = (subjectId: string) => BOOKS.filter((b) => b.subjectId === subjectId)

/** Kitabin tum sayfalarini duz bir diziye cevirir. */
export function flattenBook(book: Book): FlatPage[] {
  const out: FlatPage[] = []
  let i = 0
  for (const chapter of book.chapters) {
    for (const page of chapter.pages) {
      out.push({ page, chapter, index: i, folio: i + 1 })
      i++
    }
  }
  return out
}

const flatCache = new Map<string, FlatPage[]>()
export function flatPages(book: Book): FlatPage[] {
  let cached = flatCache.get(book.id)
  if (!cached) {
    cached = flattenBook(book)
    flatCache.set(book.id, cached)
  }
  return cached
}

export function bookStats(book: Book) {
  const pages = flatPages(book)
  const quizPages = pages.filter((p) => p.page.kind === 'quiz')
  const questionCount = quizPages.reduce(
    (sum, p) => sum + (p.page.kind === 'quiz' ? p.page.questionIds.length : 0),
    0
  )
  return {
    pageCount: pages.length,
    chapterCount: book.chapters.length,
    quizCount: quizPages.length,
    questionCount,
    /** ortalama okuma suresi (dakika) */
    readingMinutes: Math.max(8, Math.round(pages.length * 2.4)),
  }
}

export const TOPICS_BY_SUBJECT: Record<string, string[]> = (() => {
  const map: Record<string, Set<string>> = {}
  for (const q of QUESTIONS) {
    ;(map[q.subjectId] ||= new Set()).add(q.topic)
  }
  return Object.fromEntries(Object.entries(map).map(([k, v]) => [k, [...v].sort((a, b) => a.localeCompare(b, 'tr'))]))
})()

export function questionsFor(opts: {
  subjectId?: string
  topics?: string[]
  difficulties?: number[]
  limit?: number
  shuffle?: boolean
  seed?: number
}) {
  let pool = QUESTIONS.slice()
  if (opts.subjectId) pool = pool.filter((q) => q.subjectId === opts.subjectId)
  if (opts.topics?.length) pool = pool.filter((q) => opts.topics!.includes(q.topic))
  if (opts.difficulties?.length) pool = pool.filter((q) => opts.difficulties!.includes(q.difficulty))
  if (opts.shuffle !== false) pool = shuffle(pool, opts.seed ?? Date.now())
  if (opts.limit) pool = pool.slice(0, opts.limit)
  return pool
}

export function shuffle<T>(arr: T[], seed = 1): T[] {
  const out = arr.slice()
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  const next = () => (s = (s * 16807) % 2147483647) / 2147483647
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export const DIFFICULTY_LABEL: Record<number, string> = { 1: 'Kolay', 2: 'Orta', 3: 'Zor' }
