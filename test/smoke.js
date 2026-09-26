/* Basit duman testi: data.js + app.js çekirdek mantığını (DOM'suz) doğrular. */
const fs = require("fs");
const vm = require("vm");

const genericEl = () => new Proxy(function () {}, {
  get(t, p) {
    if (p === Symbol.toPrimitive || p === "toString") return () => "";
    if (p === "style" || p === "dataset" || p === "classList") return p === "classList"
      ? { add() {}, remove() {}, toggle() {}, contains: () => false } : {};
    if (p === "length") return 0;
    return genericElFn;
  },
  set() { return true; },
  apply() { return genericElFn; }
});
const genericElFn = genericEl();

const sandbox = {
  document: { getElementById: () => genericElFn, createElement: () => genericElFn, querySelector: () => genericElFn, body: genericElFn },
  localStorage: { _d: {}, getItem(k) { return this._d[k] ?? null; }, setItem(k, v) { this._d[k] = v; }, removeItem(k) { delete this._d[k]; } },
  btoa: (s) => Buffer.from(s, "binary").toString("base64"),
  console, setTimeout: () => {}, clearTimeout: () => {}
};
sandbox.window = sandbox;
vm.createContext(sandbox);

vm.runInContext(fs.readFileSync("assets/data.js", "utf8"), sandbox, { filename: "data.js" });
vm.runInContext(fs.readFileSync("assets/app.js", "utf8"), sandbox, { filename: "app.js" });

let fails = 0;
const assert = (cond, msg) => { if (!cond) { console.error("FAIL:", msg); fails++; } };

const subIds = vm.runInContext("AKY.SUBJECTS.map(s=>s.id)", sandbox);
assert(subIds.length === 6, "6 ders olmalı");

const books = vm.runInContext("AKY.BOOKS", sandbox);
assert(books.length === 13, "13 kitap olmalı (6 kademeli + 6 kompile + 1 deneme)");

for (const b of books) {
  const t = JSON.stringify({ id: b.id });
  assert(Array.isArray(b.sections) && b.sections.length > 0, t + " bölümler");
  const qCount = b.sections.reduce((n, s) => n + s.questions.length, 0);
  assert(qCount > 0, t + " sorular");
  for (const s of b.sections) for (const q of s.questions) {
    assert(q.o.length === 4, t + " seçenek sayısı 4 olmalı: " + q.q.slice(0, 40));
    assert(Number.isInteger(q.a) && q.a >= 0 && q.a < 4, t + " cevap indeksi geçerli: " + q.q.slice(0, 40));
  }
}

/* kademeli kitaplarda bölüm sırası Kolay→Orta→Zor→LGS Tipi */
for (const b of books.filter(x => x.kind === "kademeli")) {
  const names = b.sections.map(s => s.name).join("|");
  assert(/Kolay.*Orta.*Zor.*LGS Tipi/.test(names), b.id + " bölüm sırası yanlış: " + names);
}
/* her dersten 2 kitap + deneme */
for (const s of subIds) {
  const n = books.filter(b => b.subject === s).length;
  assert(n === 2, s + " için 2 kitap olmalı, bulunan: " + n);
}
assert(books.filter(b => b.kind === "deneme").length === 1, "1 deneme kitabı");

/* buildPages + numberedQuestions + patternSVG + bookCard + printable */
vm.runInContext(`state.user = { id:"test", name:"Test", tokens: 10, owned: [] };`, sandbox);
for (const b of books) {
  const pages = vm.runInContext(`buildPages(AKY.BOOKS.find(x=>x.id==="${b.id}"))`, sandbox);
  assert(pages[0].type === "cover" && pages[1].type === "toc", b.id + " kapak/içindekiler");
  assert(pages.some(p => p.type === "answers"), b.id + " cevap anahtarı sayfası");
  const contentQs = pages.filter(p => p.type === "content").reduce((n, p) => n + p.qs.length, 0);
  assert(contentQs === b.sections.reduce((n, s) => n + s.questions.length, 0), b.id + " sayfalanmış soru sayısı eksik");
  const nq = vm.runInContext(`numberedQuestions(AKY.BOOKS.find(x=>x.id==="${b.id}")).length`, sandbox);
  assert(nq === contentQs, b.id + " numaralandırma");
  const card = vm.runInContext(`bookCard(AKY.BOOKS.find(x=>x.id==="${b.id}"))`, sandbox);
  assert(card.includes(b.title) && card.includes("Satın Al"), b.id + " kart HTML");
  const pr = vm.runInContext(`buildPrintableHTML(AKY.BOOKS.find(x=>x.id==="${b.id}"), true)`, sandbox);
  assert(pr.includes("Cevap Anahtarı") && pr.includes(b.title), b.id + " yazdırılabilir HTML");
}
for (const s of [...subIds, "deneme"]) {
  const svg = vm.runInContext(`patternSVG("${s}")`, sandbox);
  assert(svg.startsWith("<svg"), s + " desen svg");
}

/* yetkili hesap tohumu */
const users = JSON.parse(sandbox.localStorage.getItem("aky_users_v1"));
assert(users["alikerem"] && users["alikerem"].tokens === "inf", "Ali Kerem sınırsız jetonlu tohum hesap");
assert(users["alikerem"].pass === Buffer.from("alikerem").toString("base64"), "Ali Kerem şifre: alikerem");

if (fails === 0) console.log("TÜM TESTLER GEÇTİ ✔  kitap:13 · soru:" + books.reduce((n, b) => n + b.sections.reduce((m, s) => m + s.questions.length, 0), 0));
else { console.error(fails + " test başarısız"); process.exit(1); }
