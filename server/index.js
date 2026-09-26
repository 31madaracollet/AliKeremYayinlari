import express from 'express'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { db, now } from './db.js'
import {
  createUser, login, startSession, endSession, requireAuth, publicUser, uid,
} from './auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = Number(process.env.API_PORT || 8787)

app.use(express.json({ limit: '4mb' }))
app.disable('x-powered-by')

const wrap = (fn) => (req, res) => {
  try {
    fn(req, res)
  } catch (err) {
    const status = err.status || 500
    if (status >= 500) console.error(err)
    res.status(status).json({ error: err.message || 'Sunucu hatası' })
  }
}

/* ------------------------------------------------------------------ auth */

app.post('/api/auth/register', wrap((req, res) => {
  const user = createUser(req.body || {})
  const token = startSession(user.id)
  res.json({ token, user: publicUser(user) })
}))

app.post('/api/auth/login', wrap((req, res) => {
  const { username, password } = req.body || {}
  const user = login(username, password)
  const token = startSession(user.id)
  res.json({ token, user: publicUser(user) })
}))

app.post('/api/auth/logout', requireAuth, wrap((req, res) => {
  endSession(req.token)
  res.json({ ok: true })
}))

app.get('/api/auth/me', requireAuth, wrap((req, res) => {
  res.json({ user: publicUser(req.user) })
}))

/* --------------------------------------------------------- reader state */

// Bir kitaba ait tum kullanici verisi tek istekte
app.get('/api/books/:bookId/state', requireAuth, wrap((req, res) => {
  const { bookId } = req.params
  const u = req.user.id
  const notes = db.prepare(
    'SELECT * FROM notes WHERE user_id=? AND book_id=? ORDER BY pinned DESC, updated_at DESC'
  ).all(u, bookId)
  const marks = db.prepare(
    'SELECT * FROM marks WHERE user_id=? AND book_id=? ORDER BY created_at ASC'
  ).all(u, bookId)
  const strokes = db.prepare(
    'SELECT * FROM strokes WHERE user_id=? AND book_id=? ORDER BY created_at ASC'
  ).all(u, bookId)
  const bookmarks = db.prepare(
    'SELECT * FROM bookmarks WHERE user_id=? AND book_id=? ORDER BY created_at ASC'
  ).all(u, bookId)
  const progress = db.prepare(
    'SELECT * FROM progress WHERE user_id=? AND book_id=?'
  ).get(u, bookId) || null

  res.json({
    notes: notes.map(mapNote),
    marks: marks.map(mapMark),
    strokes: strokes.map(mapStroke),
    bookmarks,
    progress: progress
      ? {
          pageIndex: progress.page_index,
          pageId: progress.page_id,
          seenPages: JSON.parse(progress.seen_pages || '[]'),
          seconds: progress.seconds,
          updatedAt: progress.updated_at,
        }
      : null,
  })
}))

const mapNote = (n) => ({
  id: n.id, bookId: n.book_id, pageId: n.page_id, pageLabel: n.page_label,
  title: n.title, body: n.body, color: n.color, pinned: !!n.pinned,
  createdAt: n.created_at, updatedAt: n.updated_at,
})
const mapMark = (m) => ({
  id: m.id, bookId: m.book_id, pageId: m.page_id, anchorId: m.anchor_id,
  start: m.start_off, end: m.end_off, style: m.style, color: m.color,
  quote: m.quote, note: m.note, createdAt: m.created_at,
})
const mapStroke = (s) => ({
  id: s.id, bookId: s.book_id, pageId: s.page_id, tool: s.tool,
  color: s.color, width: s.width, points: JSON.parse(s.points || '[]'),
  createdAt: s.created_at,
})

/* ----------------------------------------------------------------- notes */

app.get('/api/notes', requireAuth, wrap((req, res) => {
  const rows = db.prepare(
    'SELECT * FROM notes WHERE user_id=? ORDER BY pinned DESC, updated_at DESC'
  ).all(req.user.id)
  res.json({ notes: rows.map(mapNote) })
}))

app.post('/api/notes', requireAuth, wrap((req, res) => {
  const b = req.body || {}
  const t = now()
  const note = {
    id: b.id || uid('n_'),
    user_id: req.user.id,
    book_id: b.bookId || 'genel',
    page_id: b.pageId || null,
    page_label: b.pageLabel || null,
    title: String(b.title ?? '').slice(0, 200),
    body: String(b.body ?? '').slice(0, 20000),
    color: b.color || 'sari',
    pinned: b.pinned ? 1 : 0,
    created_at: t,
    updated_at: t,
  }
  db.prepare(`
    INSERT INTO notes (id,user_id,book_id,page_id,page_label,title,body,color,pinned,created_at,updated_at)
    VALUES (@id,@user_id,@book_id,@page_id,@page_label,@title,@body,@color,@pinned,@created_at,@updated_at)
    ON CONFLICT(id) DO UPDATE SET
      page_id=excluded.page_id, page_label=excluded.page_label, title=excluded.title,
      body=excluded.body, color=excluded.color, pinned=excluded.pinned,
      updated_at=excluded.updated_at
  `).run(note)
  const saved = db.prepare('SELECT * FROM notes WHERE id=? AND user_id=?').get(note.id, req.user.id)
  res.json({ note: mapNote(saved) })
}))

app.delete('/api/notes/:id', requireAuth, wrap((req, res) => {
  db.prepare('DELETE FROM notes WHERE id=? AND user_id=?').run(req.params.id, req.user.id)
  res.json({ ok: true })
}))

/* ----------------------------------------------------------------- marks */

app.post('/api/marks', requireAuth, wrap((req, res) => {
  const b = req.body || {}
  const mark = {
    id: b.id || uid('m_'),
    user_id: req.user.id,
    book_id: b.bookId,
    page_id: b.pageId,
    anchor_id: b.anchorId,
    start_off: Number(b.start) | 0,
    end_off: Number(b.end) | 0,
    style: b.style || 'highlight',
    color: b.color || 'sari',
    quote: String(b.quote ?? '').slice(0, 1000),
    note: String(b.note ?? '').slice(0, 2000),
    created_at: now(),
  }
  if (!mark.book_id || !mark.page_id || !mark.anchor_id) {
    throw Object.assign(new Error('Eksik işaretleme verisi.'), { status: 400 })
  }
  db.prepare(`
    INSERT INTO marks (id,user_id,book_id,page_id,anchor_id,start_off,end_off,style,color,quote,note,created_at)
    VALUES (@id,@user_id,@book_id,@page_id,@anchor_id,@start_off,@end_off,@style,@color,@quote,@note,@created_at)
    ON CONFLICT(id) DO UPDATE SET
      style=excluded.style, color=excluded.color, note=excluded.note
  `).run(mark)
  res.json({ mark: mapMark(db.prepare('SELECT * FROM marks WHERE id=?').get(mark.id)) })
}))

app.delete('/api/marks/:id', requireAuth, wrap((req, res) => {
  db.prepare('DELETE FROM marks WHERE id=? AND user_id=?').run(req.params.id, req.user.id)
  res.json({ ok: true })
}))

app.post('/api/marks/clear', requireAuth, wrap((req, res) => {
  const { bookId, pageId } = req.body || {}
  if (pageId) {
    db.prepare('DELETE FROM marks WHERE user_id=? AND book_id=? AND page_id=?').run(req.user.id, bookId, pageId)
    db.prepare('DELETE FROM strokes WHERE user_id=? AND book_id=? AND page_id=?').run(req.user.id, bookId, pageId)
  } else {
    db.prepare('DELETE FROM marks WHERE user_id=? AND book_id=?').run(req.user.id, bookId)
    db.prepare('DELETE FROM strokes WHERE user_id=? AND book_id=?').run(req.user.id, bookId)
  }
  res.json({ ok: true })
}))

/* --------------------------------------------------------------- strokes */

app.post('/api/strokes', requireAuth, wrap((req, res) => {
  const b = req.body || {}
  const stroke = {
    id: b.id || uid('s_'),
    user_id: req.user.id,
    book_id: b.bookId,
    page_id: b.pageId,
    tool: b.tool || 'pen',
    color: b.color || '#1f3b8a',
    width: Number(b.width) || 2,
    points: JSON.stringify((b.points || []).slice(0, 4000)),
    created_at: now(),
  }
  if (!stroke.book_id || !stroke.page_id) {
    throw Object.assign(new Error('Eksik çizim verisi.'), { status: 400 })
  }
  db.prepare(`
    INSERT INTO strokes (id,user_id,book_id,page_id,tool,color,width,points,created_at)
    VALUES (@id,@user_id,@book_id,@page_id,@tool,@color,@width,@points,@created_at)
    ON CONFLICT(id) DO NOTHING
  `).run(stroke)
  res.json({ stroke: mapStroke(db.prepare('SELECT * FROM strokes WHERE id=?').get(stroke.id)) })
}))

app.delete('/api/strokes/:id', requireAuth, wrap((req, res) => {
  db.prepare('DELETE FROM strokes WHERE id=? AND user_id=?').run(req.params.id, req.user.id)
  res.json({ ok: true })
}))

/* -------------------------------------------------------------- progress */

app.put('/api/books/:bookId/progress', requireAuth, wrap((req, res) => {
  const b = req.body || {}
  const row = {
    user_id: req.user.id,
    book_id: req.params.bookId,
    page_index: Number(b.pageIndex) | 0,
    page_id: b.pageId || null,
    seen_pages: JSON.stringify(b.seenPages || []),
    seconds: Number(b.seconds) | 0,
    updated_at: now(),
  }
  db.prepare(`
    INSERT INTO progress (user_id,book_id,page_index,page_id,seen_pages,seconds,updated_at)
    VALUES (@user_id,@book_id,@page_index,@page_id,@seen_pages,@seconds,@updated_at)
    ON CONFLICT(user_id,book_id) DO UPDATE SET
      page_index=excluded.page_index, page_id=excluded.page_id,
      seen_pages=excluded.seen_pages,
      seconds=MAX(progress.seconds, excluded.seconds),
      updated_at=excluded.updated_at
  `).run(row)
  res.json({ ok: true })
}))

app.get('/api/progress', requireAuth, wrap((req, res) => {
  const rows = db.prepare('SELECT * FROM progress WHERE user_id=?').all(req.user.id)
  res.json({
    progress: rows.map((p) => ({
      bookId: p.book_id,
      pageIndex: p.page_index,
      pageId: p.page_id,
      seenPages: JSON.parse(p.seen_pages || '[]'),
      seconds: p.seconds,
      updatedAt: p.updated_at,
    })),
  })
}))

/* ------------------------------------------------------------- bookmarks */

app.post('/api/bookmarks', requireAuth, wrap((req, res) => {
  const b = req.body || {}
  const existing = db.prepare(
    'SELECT * FROM bookmarks WHERE user_id=? AND book_id=? AND page_id=?'
  ).get(req.user.id, b.bookId, b.pageId)
  if (existing) {
    db.prepare('DELETE FROM bookmarks WHERE id=?').run(existing.id)
    return res.json({ removed: existing.id })
  }
  const row = {
    id: uid('b_'), user_id: req.user.id, book_id: b.bookId,
    page_id: b.pageId, label: String(b.label || '').slice(0, 200), created_at: now(),
  }
  db.prepare(`INSERT INTO bookmarks (id,user_id,book_id,page_id,label,created_at)
              VALUES (@id,@user_id,@book_id,@page_id,@label,@created_at)`).run(row)
  res.json({ bookmark: row })
}))

/* -------------------------------------------------------------- attempts */

app.post('/api/attempts', requireAuth, wrap((req, res) => {
  const b = req.body || {}
  const row = {
    id: uid('a_'),
    user_id: req.user.id,
    source: b.source || 'bank',
    subject_id: b.subjectId || 'genel',
    topics: JSON.stringify(b.topics || []),
    title: String(b.title || '').slice(0, 200),
    total: Number(b.total) | 0,
    correct: Number(b.correct) | 0,
    wrong: Number(b.wrong) | 0,
    blank: Number(b.blank) | 0,
    duration_s: Number(b.durationS) | 0,
    detail: JSON.stringify(b.detail || []),
    created_at: now(),
  }
  db.prepare(`
    INSERT INTO attempts (id,user_id,source,subject_id,topics,title,total,correct,wrong,blank,duration_s,detail,created_at)
    VALUES (@id,@user_id,@source,@subject_id,@topics,@title,@total,@correct,@wrong,@blank,@duration_s,@detail,@created_at)
  `).run(row)
  res.json({ id: row.id })
}))

const mapAttempt = (a) => ({
  id: a.id, source: a.source, subjectId: a.subject_id,
  topics: JSON.parse(a.topics || '[]'), title: a.title,
  total: a.total, correct: a.correct, wrong: a.wrong, blank: a.blank,
  durationS: a.duration_s, detail: JSON.parse(a.detail || '[]'),
  createdAt: a.created_at,
})

app.get('/api/attempts', requireAuth, wrap((req, res) => {
  const rows = db.prepare(
    'SELECT * FROM attempts WHERE user_id=? ORDER BY created_at DESC LIMIT 200'
  ).all(req.user.id)
  res.json({ attempts: rows.map(mapAttempt) })
}))

/* ----------------------------------------------------------------- stats */

app.get('/api/stats', requireAuth, wrap((req, res) => {
  const u = req.user.id
  const attempts = db.prepare('SELECT * FROM attempts WHERE user_id=? ORDER BY created_at DESC').all(u)
  const bySubject = {}
  const byTopic = {}
  for (const a of attempts) {
    const s = (bySubject[a.subject_id] ||= { correct: 0, wrong: 0, blank: 0, total: 0, attempts: 0 })
    s.correct += a.correct; s.wrong += a.wrong; s.blank += a.blank
    s.total += a.total; s.attempts += 1
    for (const d of JSON.parse(a.detail || '[]')) {
      if (!d.topic) continue
      const t = (byTopic[d.topic] ||= { subjectId: a.subject_id, correct: 0, wrong: 0, blank: 0, total: 0 })
      t.total += 1
      if (d.status === 'correct') t.correct += 1
      else if (d.status === 'wrong') t.wrong += 1
      else t.blank += 1
    }
  }
  const counts = {
    notes: db.prepare('SELECT COUNT(*) c FROM notes WHERE user_id=?').get(u).c,
    marks: db.prepare('SELECT COUNT(*) c FROM marks WHERE user_id=?').get(u).c,
    strokes: db.prepare('SELECT COUNT(*) c FROM strokes WHERE user_id=?').get(u).c,
    bookmarks: db.prepare('SELECT COUNT(*) c FROM bookmarks WHERE user_id=?').get(u).c,
  }
  const progress = db.prepare('SELECT * FROM progress WHERE user_id=?').all(u).map((p) => ({
    bookId: p.book_id, pageIndex: p.page_index,
    seenPages: JSON.parse(p.seen_pages || '[]'), seconds: p.seconds, updatedAt: p.updated_at,
  }))
  res.json({ attempts: attempts.slice(0, 40).map(mapAttempt), bySubject, byTopic, counts, progress })
}))

/* -------------------------------------------------------------- settings */

app.get('/api/settings', requireAuth, wrap((req, res) => {
  const row = db.prepare('SELECT json FROM settings WHERE user_id=?').get(req.user.id)
  res.json({ settings: row ? JSON.parse(row.json) : {} })
}))

app.put('/api/settings', requireAuth, wrap((req, res) => {
  const json = JSON.stringify(req.body || {})
  db.prepare(`INSERT INTO settings (user_id,json,updated_at) VALUES (?,?,?)
              ON CONFLICT(user_id) DO UPDATE SET json=excluded.json, updated_at=excluded.updated_at`)
    .run(req.user.id, json, now())
  res.json({ ok: true })
}))

/* ----------------------------------------------------------------- misc */

app.get('/api/health', (_req, res) => res.json({ ok: true, ts: now() }))

// Production: derlenmis arayuzu servis et
const dist = path.join(__dirname, '..', 'dist')
if (process.env.NODE_ENV === 'production' && fs.existsSync(dist)) {
  app.use(express.static(dist))
  app.get(/^\/(?!api).*/, (_req, res) => res.sendFile(path.join(dist, 'index.html')))
}

// Gelistirmede API yalnizca sandbox icinden (Vite proxy) erisilir;
// uretimde derlenmis arayuzu de servis ettigi icin disariya acilir.
const HOST =
  process.env.API_HOST || (process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1')

app.listen(PORT, HOST, () => {
  console.log(`[api] Ali Kerem Yayınları API  →  http://${HOST}:${PORT}`)
})
