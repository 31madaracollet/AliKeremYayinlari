/* Tum ekranlari sunucu tarafinda render ederek calisma zamani hatalarini yakalar. */
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import type { ReactElement } from 'react'

import Home from '../src/pages/Home'
import Library from '../src/pages/Library'
import Bank from '../src/pages/Bank'
import StatsPage from '../src/pages/Stats'
import Reader from '../src/pages/Reader'
import Login from '../src/pages/Login'
import Shell from '../src/components/Shell'
import { BookCover } from '../src/components/BookCover'
import { BlockView } from '../src/components/BookBlocks'
import { QuizRunner } from '../src/components/QuizRunner'
import { Figure } from '../src/components/Figures'
import { AuthProvider } from '../src/lib/auth'
import { BOOKS, QUESTIONS, flatPages, questionById } from '../src/content'
import type { FigureKind } from '../src/content/types'

function wrap(el: ReactElement, path = '/') {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <AuthProvider>{el}</AuthProvider>
    </MemoryRouter>
  )
}

const checks: [string, () => string, string][] = [
  ['Login', () => wrap(<Login />), 'Ali Kerem'],
  ['Shell+Home', () => wrap(<Routes><Route element={<Shell />}><Route path="/" element={<Home />} /></Route></Routes>), 'Dersler'],
  ['Library', () => wrap(<Library />, '/kitaplik'), 'Kitaplık'],
  ['Bank', () => wrap(<Bank />, '/soru-bankasi'), 'Soru Bankası'],
  ['Stats', () => wrap(<StatsPage />, '/istatistik'), 'İstatistik'],
]

for (const b of BOOKS) {
  checks.push([
    `Reader:${b.id}`,
    () => wrap(<Routes><Route path="/oku/:bookId" element={<Reader />} /></Routes>, `/oku/${b.id}`),
    'Ali Kerem Yayınları',
  ])
}

let fail = 0
for (const [name, fn, expect] of checks) {
  try {
    const html = fn()
    const ok = html.includes(expect)
    console.log(`${ok ? '✓' : '✗'} ${name.padEnd(22)} ${String(html.length).padStart(7)} bayt`)
    if (!ok) fail++
  } catch (e) {
    console.log(`✗ ${name.padEnd(22)} HATA: ${(e as Error).message}`)
    fail++
  }
}

/* --- her kitabin her sayfasini blok blok render et --- */
let pageCount = 0
let blockCount = 0
for (const book of BOOKS) {
  for (const { page } of flatPages(book)) {
    pageCount++
    try {
      if (page.kind === 'content') {
        for (const block of page.blocks) {
          blockCount++
          renderToStaticMarkup(<BlockView block={block} ctx={{ marks: [] }} />)
        }
      } else {
        const qs = page.questionIds.map((id) => questionById(id))
        const missing = page.questionIds.filter((id) => !questionById(id))
        if (missing.length) throw new Error(`eksik soru: ${missing.join(', ')}`)
        renderToStaticMarkup(
          <QuizRunner questions={qs as never} title={page.title} source="book" subjectId={book.subjectId} />
        )
      }
    } catch (e) {
      console.log(`✗ ${book.id}/${page.id}: ${(e as Error).message}`)
      fail++
    }
  }
}
console.log(`✓ ${pageCount} sayfa, ${blockCount} blok render edildi`)

/* --- kapaklar ve sekiller --- */
for (const b of BOOKS) renderToStaticMarkup(<BookCover book={b} />)
const kinds: FigureKind[] = ['mevsim', 'kaldirac', 'dna', 'basinc', 'ucgen', 'pisagor', 'koordinat', 'elektrik', 'makara']
for (const k of kinds) renderToStaticMarkup(<Figure kind={k} caption="test" />)
console.log(`✓ ${BOOKS.length} kapak, ${kinds.length} şekil render edildi`)

/* --- icerik butunlugu --- */
const ids = new Set<string>()
for (const q of QUESTIONS) {
  if (ids.has(q.id)) { console.log(`✗ yinelenen soru id: ${q.id}`); fail++ }
  ids.add(q.id)
  if (q.options.length !== 4) { console.log(`✗ ${q.id}: ${q.options.length} seçenek`); fail++ }
  if (q.answer < 0 || q.answer > 3) { console.log(`✗ ${q.id}: geçersiz cevap`); fail++ }
  if (!q.explanation || q.explanation.length < 20) { console.log(`✗ ${q.id}: çözüm eksik`); fail++ }
}
const usedInBooks = new Set(
  BOOKS.flatMap((b) => flatPages(b).flatMap((f) => (f.page.kind === 'quiz' ? f.page.questionIds : [])))
)
console.log(`✓ ${QUESTIONS.length} soru doğrulandı (${usedInBooks.size} tanesi kitap içi testlerde)`)

/* --- anchor id benzersizligi (isaretlemeler icin kritik) --- */
for (const book of BOOKS) {
  for (const { page } of flatPages(book)) {
    if (page.kind !== 'content') continue
    const seen = new Set<string>()
    for (const b of page.blocks) {
      if (seen.has(b.id)) { console.log(`✗ ${book.id}/${page.id}: yinelenen blok id "${b.id}"`); fail++ }
      seen.add(b.id)
    }
  }
}
console.log(fail === 0 ? '\n✅ TÜM KONTROLLER GEÇTİ' : `\n❌ ${fail} HATA`)
process.exit(fail === 0 ? 0 : 1)
