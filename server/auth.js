import crypto from 'node:crypto'
import { db, now } from './db.js'

export const uid = (p = '') => p + crypto.randomBytes(9).toString('base64url')

export function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return { hash, salt }
}

export function verifyPassword(password, salt, expected) {
  const { hash } = hashPassword(password, salt)
  const a = Buffer.from(hash, 'hex')
  const b = Buffer.from(expected, 'hex')
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

export function createUser({ username, password, displayName }) {
  const clean = String(username || '').trim().toLowerCase()
  if (!/^[a-z0-9_.]{3,24}$/.test(clean)) {
    throw Object.assign(new Error('Kullanıcı adı 3-24 karakter olmalı (harf, rakam, _ ve . kullanılabilir).'), { status: 400 })
  }
  if (String(password || '').length < 4) {
    throw Object.assign(new Error('Şifre en az 4 karakter olmalı.'), { status: 400 })
  }
  const exists = db.prepare('SELECT 1 FROM users WHERE username = ?').get(clean)
  if (exists) throw Object.assign(new Error('Bu kullanıcı adı zaten alınmış.'), { status: 409 })

  const { hash, salt } = hashPassword(password)
  const user = {
    id: uid('u_'),
    username: clean,
    display_name: String(displayName || '').trim() || clean,
    pass_hash: hash,
    pass_salt: salt,
    created_at: now(),
  }
  db.prepare(
    `INSERT INTO users (id, username, display_name, pass_hash, pass_salt, created_at)
     VALUES (@id, @username, @display_name, @pass_hash, @pass_salt, @created_at)`
  ).run(user)
  return user
}

export function login(username, password) {
  const clean = String(username || '').trim().toLowerCase()
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(clean)
  if (!user || !verifyPassword(password, user.pass_salt, user.pass_hash)) {
    throw Object.assign(new Error('Kullanıcı adı veya şifre hatalı.'), { status: 401 })
  }
  return user
}

export function startSession(userId) {
  const token = crypto.randomBytes(24).toString('base64url')
  db.prepare('INSERT INTO sessions (token, user_id, created_at, last_seen) VALUES (?,?,?,?)').run(
    token, userId, now(), now()
  )
  return token
}

export function endSession(token) {
  db.prepare('DELETE FROM sessions WHERE token = ?').run(token)
}

export function userFromToken(token) {
  if (!token) return null
  const row = db
    .prepare(
      `SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ?`
    )
    .get(token)
  if (row) db.prepare('UPDATE sessions SET last_seen = ? WHERE token = ?').run(now(), token)
  return row || null
}

export function requireAuth(req, res, next) {
  const header = req.get('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  const user = userFromToken(token)
  if (!user) return res.status(401).json({ error: 'Oturum gerekli.' })
  req.user = user
  req.token = token
  next()
}

export const publicUser = (u) => ({
  id: u.id,
  username: u.username,
  displayName: u.display_name,
  createdAt: u.created_at,
})
