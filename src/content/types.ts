export type FigureKind =
  | 'mevsim'
  | 'kaldirac'
  | 'dna'
  | 'basinc'
  | 'ucgen'
  | 'pisagor'
  | 'koordinat'
  | 'elektrik'
  | 'makara'

export type Block =
  | { id: string; type: 'h2'; text: string }
  | { id: string; type: 'h3'; text: string }
  | { id: string; type: 'p'; text: string }
  | { id: string; type: 'list'; ordered?: boolean; items: string[] }
  | {
      id: string
      type: 'callout'
      variant: 'bilgi' | 'ipucu' | 'dikkat' | 'formul' | 'tanim'
      title?: string
      text: string
    }
  | { id: string; type: 'example'; title?: string; question: string; solution: string[] }
  | { id: string; type: 'table'; caption?: string; headers: string[]; rows: string[][] }
  | { id: string; type: 'quote'; text: string; source?: string }
  | { id: string; type: 'terms'; items: { term: string; def: string }[] }
  | { id: string; type: 'figure'; kind: FigureKind; caption: string }
  | { id: string; type: 'timeline'; items: { date: string; text: string }[] }
  | { id: string; type: 'dialog'; lines: { who: string; text: string }[] }

export type Question = {
  id: string
  subjectId: string
  topic: string
  /** 1 = kolay, 2 = orta, 3 = zor */
  difficulty: 1 | 2 | 3
  passage?: string
  stem: string
  options: string[]
  answer: number
  explanation: string
}

export type Page =
  | {
      id: string
      kind: 'content'
      title: string
      subtitle?: string
      blocks: Block[]
    }
  | {
      id: string
      kind: 'quiz'
      title: string
      subtitle?: string
      intro?: string
      questionIds: string[]
    }

export type Chapter = {
  id: string
  title: string
  pages: Page[]
}

export type Book = {
  id: string
  subjectId: string
  title: string
  subtitle: string
  author: string
  edition: string
  year: number
  blurb: string
  chapters: Chapter[]
}

export type Subject = {
  id: string
  name: string
  short: string
  /** LGS'de derse ait soru sayisi */
  lgsQuestions: number
  color: string
  accent: string
  icon: string
  description: string
}

export type FlatPage = {
  page: Page
  chapter: Chapter
  index: number
  /** kitaptaki yazili sayfa numarasi */
  folio: number
}
