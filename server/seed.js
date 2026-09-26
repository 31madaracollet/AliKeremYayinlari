/**
 * Demo hesabini olusturur ve ornek calisma verisiyle doldurur.
 *   kullanici: demo   sifre: demo1234
 *
 *   npm run seed            → varsa dokunmaz, yoksa olusturur
 *   npm run seed -- --reset → demo hesabinin tum verisini silip yeniden kurar
 *
 * Isaretleme ofsetleri "npm run seed:data" ile kitap metninden uretilir
 * (server/seed-data.json), elle yazilmaz.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { db } from './db.js'
import { createUser, uid } from './auth.js'

const here = path.dirname(fileURLToPath(import.meta.url))
const reset = process.argv.includes('--reset')

/* ------------------------------------------------------------ kullanici */
let user = db.prepare('SELECT * FROM users WHERE username = ?').get('demo')

if (user && reset) {
  for (const t of ['notes', 'marks', 'strokes', 'progress', 'bookmarks', 'attempts', 'settings']) {
    db.prepare(`DELETE FROM ${t} WHERE user_id = ?`).run(user.id)
  }
  console.log('[seed] demo verisi temizlendi.')
}

if (!user) {
  createUser({ username: 'demo', password: 'demo1234', displayName: 'Demo Öğrenci' })
  user = db.prepare('SELECT * FROM users WHERE username = ?').get('demo')
  console.log('[seed] demo / demo1234 oluşturuldu.')
} else {
  console.log('[seed] demo kullanıcısı mevcut.')
}

const has = (table) =>
  db.prepare(`SELECT COUNT(*) AS n FROM ${table} WHERE user_id = ?`).get(user.id).n > 0

if (has('notes') || has('marks') || has('attempts')) {
  console.log('[seed] demo hesabında veri var, örnek içerik atlandı. (--reset ile sıfırlayın)')
  process.exit(0)
}

/* ----------------------------------------------------------- ornek veri */
const dataPath = path.join(here, 'seed-data.json')
if (!fs.existsSync(dataPath)) {
  console.log('[seed] server/seed-data.json yok — "npm run seed:data" çalıştırın.')
  process.exit(0)
}
const { marks = [], notes = [] } = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

const DAY = 86_400_000
const now = Date.now()

const insNote = db.prepare(`
  INSERT INTO notes (id, user_id, book_id, page_id, page_label, title, body, color, pinned, created_at, updated_at)
  VALUES (@id, @user_id, @book_id, @page_id, @page_label, '', @body, @color, @pinned, @created_at, @updated_at)`)

const insMark = db.prepare(`
  INSERT INTO marks (id, user_id, book_id, page_id, anchor_id, start_off, end_off, style, color, quote, note, created_at)
  VALUES (@id, @user_id, @book_id, @page_id, @anchor_id, @start_off, @end_off, @style, @color, @quote, @note, @created_at)`)

const insProgress = db.prepare(`
  INSERT INTO progress (user_id, book_id, page_index, page_id, seen_pages, seconds, updated_at)
  VALUES (@user_id, @book_id, @page_index, @page_id, @seen_pages, @seconds, @updated_at)`)

const insAttempt = db.prepare(`
  INSERT INTO attempts (id, user_id, source, subject_id, topics, title, total, correct, wrong, blank, duration_s, detail, created_at)
  VALUES (@id, @user_id, @source, @subject_id, @topics, @title, @total, @correct, @wrong, @blank, @duration_s, @detail, @created_at)`)

const attempts = [
  { d: 9, subject: 'turkce',    title: 'Sözcükte Anlam denemesi', topics: ['Sözcükte Anlam'],            t: 10, c: 6,  w: 3, s: 640 },
  { d: 8, subject: 'matematik', title: 'Çarpanlar ve Katlar',      topics: ['Çarpanlar ve Katlar'],       t: 10, c: 5,  w: 4, s: 720 },
  { d: 6, subject: 'fen',       title: 'Mevsimler ve İklim',       topics: ['Mevsimler ve İklim'],        t: 8,  c: 6,  w: 2, s: 480 },
  { d: 5, subject: 'turkce',    title: 'Cümlede Anlam',            topics: ['Cümlede Anlam'],             t: 10, c: 8,  w: 2, s: 560 },
  { d: 4, subject: 'inkilap',   title: 'Bir Kahraman Doğuyor',     topics: ['Bir Kahraman Doğuyor'],      t: 8,  c: 5,  w: 3, s: 430 },
  { d: 3, subject: 'matematik', title: 'Üslü İfadeler',            topics: ['Üslü İfadeler'],             t: 10, c: 7,  w: 2, s: 650 },
  { d: 2, subject: 'ingilizce', title: 'Friendship',               topics: ['Friendship'],                t: 8,  c: 7,  w: 1, s: 300 },
  { d: 1, subject: 'matematik', title: 'Kareköklü İfadeler',       topics: ['Kareköklü İfadeler'],        t: 10, c: 8,  w: 1, s: 600 },
  { d: 1, subject: 'din',       title: 'Kader ve Kaza',            topics: ['Kader ve Kaza'],      t: 8,  c: 7,  w: 1, s: 320 },
  { d: 0, subject: 'fen',       title: 'DNA ve Genetik Kod',       topics: ['DNA ve Genetik Kod'],        t: 10, c: 9,  w: 1, s: 540 },
]

const progress = [
  { book: 'turkce-8',    page: 4, seen: 7, secs: 3_120 },
  { book: 'matematik-8', page: 3, seen: 5, secs: 2_460 },
  { book: 'fen-8',       page: 2, seen: 4, secs: 1_580 },
  { book: 'inkilap-8',   page: 1, seen: 2, secs: 640 },
]

db.transaction(() => {
  notes.forEach((n, i) => {
    const at = now - (notes.length - i) * DAY
    insNote.run({
      id: uid(), user_id: user.id, book_id: n.bookId, page_id: n.pageId,
      page_label: n.pageLabel, body: n.body, color: n.color, pinned: n.pinned ?? 0,
      created_at: at, updated_at: at,
    })
  })

  marks.forEach((m, i) => {
    insMark.run({
      id: uid(), user_id: user.id, book_id: m.bookId, page_id: m.pageId,
      anchor_id: m.anchorId, start_off: m.start, end_off: m.end,
      style: m.style, color: m.color, quote: m.quote, note: m.note ?? '',
      created_at: now - (marks.length - i) * 3_600_000,
    })
  })

  progress.forEach((p) => {
    insProgress.run({
      user_id: user.id, book_id: p.book, page_index: p.page, page_id: null,
      seen_pages: JSON.stringify(Array.from({ length: p.seen }, (_, i) => i)),
      seconds: p.secs, updated_at: now - DAY,
    })
  })

  attempts.forEach((a) => {
    insAttempt.run({
      id: uid(), user_id: user.id, source: 'bank', subject_id: a.subject,
      topics: JSON.stringify(a.topics), title: a.title,
      total: a.t, correct: a.c, wrong: a.w, blank: a.t - a.c - a.w,
      duration_s: a.s, detail: '[]',
      created_at: now - a.d * DAY - 3 * 3_600_000,
    })
  })
})()

console.log(
  `[seed] ${notes.length} not, ${marks.length} işaretleme, ${progress.length} okuma kaydı, ${attempts.length} deneme eklendi.`,
)
