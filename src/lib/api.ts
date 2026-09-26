/**
 * Sunucu ile konusan tek nokta. Tarayici her zaman goreli /api yolunu kullanir;
 * gelistirme sirasinda Vite bunu Express sunucusuna proxy'ler.
 */

const TOKEN_KEY = 'aky.token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (t: string | null) =>
  t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY)

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((init.headers as Record<string, string>) || {}),
  }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  let res: Response
  try {
    res = await fetch(`/api${path}`, { ...init, headers })
  } catch {
    throw new ApiError('Sunucuya ulaşılamıyor. Bağlantınızı kontrol edin.', 0)
  }

  if (res.status === 204) return undefined as T

  const text = await res.text()
  let data: any = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = null
  }

  if (!res.ok) {
    if (res.status === 401) setToken(null)
    throw new ApiError(data?.error || `İstek başarısız (${res.status})`, res.status)
  }
  return data as T
}

const get = <T,>(p: string) => request<T>(p)
const post = <T,>(p: string, body?: unknown) =>
  request<T>(p, { method: 'POST', body: JSON.stringify(body ?? {}) })
const put = <T,>(p: string, body?: unknown) =>
  request<T>(p, { method: 'PUT', body: JSON.stringify(body ?? {}) })
const del = <T,>(p: string) => request<T>(p, { method: 'DELETE' })

/* --------------------------------------------------------------- tipler */

export type User = { id: string; username: string; displayName: string; createdAt: number }

export type Note = {
  id: string
  bookId: string
  pageId: string | null
  pageLabel: string | null
  title: string
  body: string
  color: string
  pinned: boolean
  createdAt: number
  updatedAt: number
}

export type Mark = {
  id: string
  bookId: string
  pageId: string
  anchorId: string
  start: number
  end: number
  style: 'highlight' | 'underline' | 'strike'
  color: string
  quote: string
  note: string
  createdAt: number
}

export type Stroke = {
  id: string
  bookId: string
  pageId: string
  tool: 'pen' | 'marker'
  color: string
  width: number
  points: [number, number][]
  createdAt: number
}

export type Bookmark = {
  id: string
  book_id: string
  page_id: string
  label: string
  created_at: number
}

export type Progress = {
  bookId?: string
  pageIndex: number
  pageId: string | null
  seenPages: string[]
  seconds: number
  updatedAt: number
}

export type BookState = {
  notes: Note[]
  marks: Mark[]
  strokes: Stroke[]
  bookmarks: Bookmark[]
  progress: Progress | null
}

export type AttemptDetail = {
  questionId: string
  topic: string
  status: 'correct' | 'wrong' | 'blank'
  chosen: number | null
  answer: number
}

export type Attempt = {
  id: string
  source: string
  subjectId: string
  topics: string[]
  title: string
  total: number
  correct: number
  wrong: number
  blank: number
  durationS: number
  detail: AttemptDetail[]
  createdAt: number
}

export type Stats = {
  attempts: Attempt[]
  bySubject: Record<string, { correct: number; wrong: number; blank: number; total: number; attempts: number }>
  byTopic: Record<string, { subjectId: string; correct: number; wrong: number; blank: number; total: number }>
  counts: { notes: number; marks: number; strokes: number; bookmarks: number }
  progress: Progress[]
}

/* ----------------------------------------------------------------- api */

export const api = {
  register: (body: { username: string; password: string; displayName?: string }) =>
    post<{ token: string; user: User }>('/auth/register', body),
  login: (body: { username: string; password: string }) =>
    post<{ token: string; user: User }>('/auth/login', body),
  logout: () => post<{ ok: true }>('/auth/logout'),
  me: () => get<{ user: User }>('/auth/me'),

  bookState: (bookId: string) => get<BookState>(`/books/${bookId}/state`),

  saveNote: (body: Partial<Note> & { bookId: string }) => post<{ note: Note }>('/notes', body),
  deleteNote: (id: string) => del<{ ok: true }>(`/notes/${id}`),
  allNotes: () => get<{ notes: Note[] }>('/notes'),

  saveMark: (body: Omit<Mark, 'createdAt'> | Partial<Mark>) => post<{ mark: Mark }>('/marks', body),
  deleteMark: (id: string) => del<{ ok: true }>(`/marks/${id}`),
  clearMarks: (body: { bookId: string; pageId?: string }) => post<{ ok: true }>('/marks/clear', body),

  saveStroke: (body: Partial<Stroke>) => post<{ stroke: Stroke }>('/strokes', body),
  deleteStroke: (id: string) => del<{ ok: true }>(`/strokes/${id}`),

  saveProgress: (bookId: string, body: Partial<Progress>) =>
    put<{ ok: true }>(`/books/${bookId}/progress`, body),
  allProgress: () => get<{ progress: Progress[] }>('/progress'),

  toggleBookmark: (body: { bookId: string; pageId: string; label?: string }) =>
    post<{ bookmark?: Bookmark; removed?: string }>('/bookmarks', body),

  saveAttempt: (body: {
    source: string
    subjectId: string
    topics: string[]
    title: string
    total: number
    correct: number
    wrong: number
    blank: number
    durationS: number
    detail: AttemptDetail[]
  }) => post<{ id: string }>('/attempts', body),
  attempts: () => get<{ attempts: Attempt[] }>('/attempts'),
  stats: () => get<Stats>('/stats'),

  getSettings: () => get<{ settings: Record<string, unknown> }>('/settings'),
  putSettings: (s: Record<string, unknown>) => put<{ ok: true }>('/settings', s),
}
