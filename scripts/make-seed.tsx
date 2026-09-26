/**
 * Demo hesabi icin baslangic verisi uretir.
 * Isaretleme ofsetleri gercek kitap metninden hesaplanir; elle yazilmaz.
 */
import fs from 'node:fs'
import path from 'node:path'
import { BOOKS, flatPages } from '../src/content'
import type { Block } from '../src/content/types'

function blockText(b: Block): string {
  switch (b.type) {
    case 'h2': case 'h3': case 'p': return b.text
    case 'callout': return b.text
    default: return ''
  }
}

function findOffsets(bookId: string, pageId: string, anchorId: string, quote: string) {
  const book = BOOKS.find((b) => b.id === bookId)!
  const page = flatPages(book).find((f) => f.page.id === pageId)!.page
  if (page.kind !== 'content') throw new Error('içerik sayfası değil: ' + pageId)
  const block = page.blocks.find((b) => b.id === anchorId)
  if (!block) throw new Error(`blok yok: ${pageId}/${anchorId}`)
  const text = blockText(block)
  const start = text.indexOf(quote)
  if (start < 0) throw new Error(`alıntı bulunamadı: "${quote}" → ${pageId}/${anchorId}`)
  return { bookId, pageId, anchorId, start, end: start + quote.length, quote }
}

const marks = [
  { ...findOffsets('turkce-8', 'tur-u1-p1', 'b1', 'Aynı kelime, içinde bulunduğu cümleye göre bambaşka bir anlam kazanabilir'), style: 'highlight', color: 'sari', note: '' },
  { ...findOffsets('turkce-8', 'tur-u1-p1', 'b7', 'gerçek anlamından tamamen uzaklaşarak'), style: 'highlight', color: 'yesil', note: 'Mecazın tanımı bu cümlede.' },
  { ...findOffsets('turkce-8', 'tur-u1-p1', 'b5', 'biçim ya da işlev benzerliğiyle'), style: 'underline', color: 'mavi', note: '' },
  { ...findOffsets('turkce-8', 'tur-u1-p1', 'b11', 'Kurulabiliyorsa yan anlam, kurulamıyorsa mecaz anlamdır.'), style: 'highlight', color: 'pembe', note: 'Sınavda bunu sor kendine!' },
  { ...findOffsets('matematik-8', 'mat-u1-p1', 'b2', '(x+1)·(y+1)·(z+1)'), style: 'highlight', color: 'turuncu', note: 'Bölen sayısı formülü' },
  { ...findOffsets('fen-8', 'fen-u1-p1', 'b1', 'Dünya’nın dönme ekseninin yörünge düzlemine 23°27′ eğik olması'), style: 'highlight', color: 'sari', note: 'Mevsimlerin TEK sebebi.' },
]

const notes = [
  {
    bookId: 'turkce-8', pageId: 'tur-u1-p1', pageLabel: 's.1 · Sözcükte Anlam', color: 'sari', pinned: 1,
    body: 'Yan anlam mı mecaz mı?\n→ Benzerlik kurabiliyorsam YAN ANLAM\n→ Kuramıyorsam MECAZ\n\nÖrnek: şişenin ağzı = yan (biçim benzerliği)\n“ağzı laf yapıyor” = mecaz',
  },
  {
    bookId: 'turkce-8', pageId: 'tur-u1-p3', pageLabel: 's.3 · Cümlede Anlam', color: 'yesil', pinned: 0,
    body: 'Neden–sonuç: iş OLMUŞ\nAmaç–sonuç: niyet var, olmamış olabilir\n\n“Yorulduğu için oturdu” → neden\n“Dinlenmek için oturdu” → amaç',
  },
  {
    bookId: 'matematik-8', pageId: 'mat-u1-p1', pageLabel: 's.1 · Çarpanlar ve Katlar', color: 'mavi', pinned: 0,
    body: 'a · b = EBOB · EKOK\nBu formülü unutma, çok soru çıkıyor.\n\nEBOB → parçalara ayırma\nEKOK → birlikte buluşma',
  },
  {
    bookId: 'fen-8', pageId: 'fen-u1-p1', pageLabel: 's.1 · Mevsimlerin Oluşumu', color: 'pembe', pinned: 0,
    body: 'DİKKAT: Mevsimler uzaklıktan DEĞİL, eksen eğikliğinden!\nOcak’ta Güneş’e en yakınız ama kış.',
  },
]

const out = { marks, notes }
const target = path.join(process.cwd(), 'server', 'seed-data.json')
fs.writeFileSync(target, JSON.stringify(out, null, 2), 'utf8')
console.log(`✓ ${marks.length} işaret, ${notes.length} not → server/seed-data.json`)
