/* ============================================================
   ALİ KEREM YAYINLARI — uygulama mantığı
   giriş · jeton · mağaza · okuyucu · kalem araçları · not defteri
   ============================================================ */
"use strict";

/* ---------------- ikonlar (semboller) ---------------- */
const IC = {
  logo: `<svg viewBox="0 0 48 48" fill="none"><rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" stroke-width="3"/><path d="M24 12v24" stroke="currentColor" stroke-width="3"/><path d="M9 16c4-2 8-2 12 0M9 23c4-2 8-2 12 0M27 16c4-2 8-2 12 0M27 23c4-2 8-2 12 0" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  coin: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7.5v9M9.2 9.6c0-1 1.2-1.8 2.8-1.8s2.8.7 2.8 1.7c0 2.5-5.6 1.6-5.6 4.1 0 1 1.2 1.7 2.8 1.7s2.8-.7 2.8-1.7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4.2" stroke="currentColor" stroke-width="2"/><path d="M4.5 19.5c1.4-3.4 4.2-5 7.5-5s6.1 1.6 7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  logout: `<svg viewBox="0 0 24 24" fill="none"><path d="M14 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7M16 8l4 4-4 4M20 12H10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  bookOpen: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 5.5C7 4 9.5 4 12 6c2.5-2 5-2 8-.5V18c-3-1.5-5.5-1.5-8 .5-2.5-2-5-2-8-.5V5.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 6v12.5" stroke="currentColor" stroke-width="1.8"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none"><path d="M4.5 12.5 10 18 19.5 6.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  pencil: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 20l.7-3.8L15.5 5.4a2 2 0 0 1 2.9 0l.2.2a2 2 0 0 1 0 2.9L7.8 19.3 4 20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M13.7 7.5l3.8 3.8" stroke="currentColor" stroke-width="1.8"/></svg>`,
  pen: `<svg viewBox="0 0 24 24" fill="none"><path d="M5 19c2.5-.5 4-1.5 7-4.5L18.5 8a2.1 2.1 0 0 0-3-3L9 11.5C6 14.5 5.3 16.2 5 19Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="17.4" cy="4.4" r=".4" fill="currentColor"/></svg>`,
  marker: `<svg viewBox="0 0 24 24" fill="none"><path d="M5 15.5 13 7.5l3.5 3.5-8 8H5v-3.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M4.5 20.5h15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  eraser: `<svg viewBox="0 0 24 24" fill="none"><path d="M7.5 19.5H20M4 15.5l7.5-7.5a2 2 0 0 1 2.8 0l4.2 4.2a2 2 0 0 1 0 2.8l-5.7 5.7a2 2 0 0 1-2.8 0L4 18.3a2 2 0 0 1 0-2.8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  select: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 3.5 19 12l-5.6 1.2L16.5 20l-3 1-3.2-6.6L6 17.5V3.5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
  undo: `<svg viewBox="0 0 24 24" fill="none"><path d="M8.5 6.5 4.5 10.5l4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 10.5h8a5.5 5.5 0 0 1 0 11h-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none"><path d="M5 7h14M10 7V5.5A1.5 1.5 0 0 1 11.5 4h1A1.5 1.5 0 0 1 14 5.5V7M6.5 7l.8 12a2 2 0 0 0 2 1.8h5.4a2 2 0 0 0 2-1.8l.8-12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  chevL: `<svg viewBox="0 0 24 24" fill="none"><path d="M14.5 5.5 8 12l6.5 6.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevR: `<svg viewBox="0 0 24 24" fill="none"><path d="M9.5 5.5 16 12l-6.5 6.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevD: `<svg viewBox="0 0 24 24" fill="none"><path d="M5.5 9.5 12 16l6.5-6.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 4v11m0 0 4.5-4.5M12 15 7.5 10.5M4.5 19.5h15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  print: `<svg viewBox="0 0 24 24" fill="none"><path d="M7 8V4h10v4M7 16H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 13.5h10v6.5H7v-6.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  notes: `<svg viewBox="0 0 24 24" fill="none"><rect x="4.5" y="3.5" width="15" height="17" rx="2.5" stroke="currentColor" stroke-width="1.8"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 4 21 9l-9 5-9-5 9-5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m4.5 13.5 7.5 4 7.5-4" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`
};

const LETTERS = ["A", "B", "C", "D"];

/* ---------------- kalıcı depo yardımcıları ---------------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* dolu */ } },
  del(k) { try { localStorage.removeItem(k); } catch {} }
};

/* ---------------- kullanıcı sistemi ---------------- */
const USERS_KEY = "aky_users_v1";
const SESS_KEY = "aky_session_v1";

function loadUsers() {
  const u = store.get(USERS_KEY, null);
  if (u && u["alikerem"]) return u;
  const users = u || {};
  /* test hesabı: Ali Kerem — sınırsız jeton */
  users["alikerem"] = {
    name: "Ali Kerem",
    pass: btoa("alikerem"),
    tokens: "inf",
    owned: [],
    created: Date.now()
  };
  store.set(USERS_KEY, users);
  return users;
}
function saveUsers(u) { store.set(USERS_KEY, u); }
function currentUser() {
  const id = store.get(SESS_KEY, null);
  if (!id) return null;
  const u = loadUsers();
  return u[id] ? { id, ...u[id] } : null;
}
function tokenLabel(u) { return u.tokens === "inf" ? "∞" : String(u.tokens); }

let state = {
  user: null,
  view: "store",        // store | shelf
  filter: "all",
  reader: null          // { book, pages, idx, strokes, tool, color, size }
};

/* ---------------- bildirim ---------------- */
let toastTimer = null;
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}

/* ---------------- yardımcı: ders bul ---------------- */
function subjectOf(book) { return AKY.SUBJECTS.find(s => s.id === book.subject); }
function kindLabel(k) {
  return k === "kademeli" ? "KADEMELİ SORU BANKASI"
    : k === "kompile" ? "KOMPILE LGS"
    : "GENEL DENEME";
}
function questionCount(book) { return book.sections.reduce((n, s) => n + s.questions.length, 0); }

/* ---------------- ders deseni (sembol SVG) ---------------- */
function patternSVG(subjectId) {
  const e = (inner) => `<svg class="pattern" viewBox="0 0 300 400" fill="none" stroke="#ffffff" stroke-width="2.2" preserveAspectRatio="xMidYMid slice">${inner}</svg>`;
  const grid = (fn) => { let s = ""; for (let y = 30; y < 400; y += 74) for (let x = 28; x < 300; x += 78) s += fn(x, y); return s; };
  switch (subjectId) {
    case "turkce":
      return e(grid((x, y) =>
        `<line x1="${x}" y1="${y}" x2="${x + 40}" y2="${y}"/><line x1="${x}" y1="${y + 12}" x2="${x + 30}" y2="${y + 12}"/><circle cx="${x + 47}" cy="${y + 12}" r="2.6" fill="#fff" stroke="none"/>`));
    case "matematik":
      return e(grid((x, y) =>
        `<circle cx="${x + 12}" cy="${y}" r="11"/><rect x="${x + 30}" y="${y - 10}" width="22" height="22"/><path d="M${x + 5} ${y + 26}l6-6 6 6-6 6z"/><path d="M${x + 46} ${y + 22}v12M${x + 40} ${y + 28}h12"/>`));
    case "fen":
      return e(grid((x, y) =>
        `<path d="M${x + 14} ${y - 10}h16l8 14-8 14h-16l-8-14z"/><circle cx="${x + 16}" cy="${y + 28}" r="4"/><circle cx="${x + 48}" cy="${y - 4}" r="6"/>`));
    case "inkilap":
      return e(grid((x, y) => {
        const cx = x + 20, cy = y, pts = [];
        for (let i = 0; i < 10; i++) {
          const r = i % 2 ? 6 : 14, a = -Math.PI / 2 + i * Math.PI / 5;
          pts.push((cx + r * Math.cos(a)).toFixed(1) + "," + (cy + r * Math.sin(a)).toFixed(1));
        }
        return `<polygon points="${pts.join(" ")}"/>`;
      }));
    case "din":
      return e(grid((x, y) =>
        `<rect x="${x}" y="${y - 14}" width="28" height="28"/><rect x="${x}" y="${y - 14}" width="28" height="28" transform="rotate(45 ${x + 14} ${y})"/>`));
    case "ingilizce":
      return e(grid((x, y) =>
        `<circle cx="${x + 14}" cy="${y}" r="13"/><circle cx="${x + 14}" cy="${y}" r="6"/><path d="M${x + 44} ${y + 16}q8-12 16 0" /><circle cx="${x + 52}" cy="${y - 12}" r="2.8" fill="#fff" stroke="none"/>`));
    default: /* deneme */
      return e(grid((x, y) =>
        `<circle cx="${x + 20}" cy="${y}" r="15"/><circle cx="${x + 20}" cy="${y}" r="9"/><circle cx="${x + 20}" cy="${y}" r="3.4" fill="#fff" stroke="none"/>`));
  }
}

/* ============================================================
   GİRİŞ / KAYIT EKRANI
   ============================================================ */
let authMode = "login";

function renderAuth() {
  const root = document.getElementById("auth-screen");
  root.innerHTML = `
    <div class="auth-card">
      <div class="auth-brand">
        <div class="auth-logo" style="color:var(--brand)">${IC.logo}</div>
        <h1>ALİ KEREM YAYINLARI</h1>
        <p>LGS Dijital Soru Bankası · gerçek kitap deneyimi</p>
      </div>
      <div class="auth-tabs">
        <button id="tab-login" class="${authMode === "login" ? "active" : ""}">Giriş Yap</button>
        <button id="tab-register" class="${authMode === "register" ? "active" : ""}">Kayıt Ol</button>
      </div>
      <div class="auth-error" id="auth-err"></div>
      <div class="field"><label>KULLANICI ADI</label><input id="auth-user" autocomplete="username" placeholder="kullanıcı adın"></div>
      <div class="field"><label>ŞİFRE</label><input id="auth-pass" type="password" autocomplete="${authMode === "login" ? "current-password" : "new-password"}" placeholder="••••••••"></div>
      <button class="btn-primary" id="auth-go">${authMode === "login" ? "Giriş Yap" : "Hesap Oluştur — 10 Jeton Hediye"}</button>
      ${authMode === "register" ? `<p class="auth-hint">Kayıt olan her öğrenciye <b>10 jeton</b> hediye edilir.<br>Jetonlarla dilediğin kitabı satın alıp okuyabilirsin.</p>` : ""}
      <p class="auth-foot">© 2026 ALİ KEREM YAYINLARI</p>
    </div>`;
  root.querySelector("#tab-login").onclick = () => { authMode = "login"; renderAuth(); };
  root.querySelector("#tab-register").onclick = () => { authMode = "register"; renderAuth(); };
  const go = () => {
    const name = root.querySelector("#auth-user").value.trim();
    const pass = root.querySelector("#auth-pass").value;
    const err = root.querySelector("#auth-err");
    const fail = (m) => { err.textContent = m; err.style.display = "block"; };
    if (name.length < 3) return fail("Kullanıcı adı en az 3 karakter olmalı.");
    if (pass.length < 4) return fail("Şifre en az 4 karakter olmalı.");
    const users = loadUsers();
    const id = name.toLocaleLowerCase("tr").replace(/\s+/g, "");
    if (authMode === "register") {
      if (users[id]) return fail("Bu kullanıcı adı zaten alınmış. Giriş yapmayı dene.");
      users[id] = { name, pass: btoa(pass), tokens: 10, owned: [], created: Date.now() };
      saveUsers(users);
      store.set(SESS_KEY, id);
      state.user = { id, ...users[id] };
      toast("Hoş geldin " + name + "! 10 jeton hesabına tanımlandı.");
      enterApp();
    } else {
      const u = users[id];
      if (!u || u.pass !== btoa(pass)) return fail("Kullanıcı adı veya şifre hatalı.");
      store.set(SESS_KEY, id);
      state.user = { id, ...u };
      toast("Tekrar hoş geldin, " + u.name + ".");
      enterApp();
    }
  };
  root.querySelector("#auth-go").onclick = go;
  root.querySelectorAll("input").forEach(i => i.addEventListener("keydown", e => { if (e.key === "Enter") go(); }));
}

function logout() {
  store.del(SESS_KEY);
  state.user = null; state.reader = null;
  closeReaderDom();
  document.getElementById("app").hidden = true;
  document.getElementById("auth-screen").hidden = false;
  renderAuth();
}

function enterApp() {
  document.getElementById("auth-screen").hidden = true;
  document.getElementById("app").hidden = false;
  renderAppChrome();
  renderBooks();
}

/* ============================================================
   ANA UYGULAMA
   ============================================================ */
function renderAppChrome() {
  const u = state.user;
  const top = document.getElementById("app-top");
  top.innerHTML = `
    <div class="app-logo" style="color:var(--brand)">${IC.logo}
      <div><b>ALİ KEREM YAYINLARI</b><span>DİJİTAL SORU BANKASI</span></div>
    </div>
    <nav class="app-nav">
      <button data-v="store" class="${state.view === "store" ? "active" : ""}">Kitap Mağazası</button>
      <button data-v="shelf" class="${state.view === "shelf" ? "active" : ""}">Kitaplığım</button>
    </nav>
    <div class="app-right">
      <div class="token-chip" title="Jeton bakiyen">${IC.coin}<span class="mono">${tokenLabel(u)}</span> jeton</div>
      <div class="user-chip" title="${u.name}"><div class="user-ava">${IC.user}</div><span>${u.name}</span></div>
      <button class="btn-ghost" id="btn-logout">${IC.logout}<span>Çıkış</span></button>
    </div>`;
  top.querySelectorAll(".app-nav button").forEach(b => b.onclick = () => {
    state.view = b.dataset.v; renderAppChrome(); renderBooks();
  });
  top.querySelector("#btn-logout").onclick = logout;
}

function renderBooks() {
  const main = document.getElementById("app-main");
  const u = state.user;
  const list = AKY.BOOKS.filter(b => {
    if (state.view === "shelf" && !u.owned.includes(b.id)) return false;
    if (state.filter !== "all" && b.subject !== state.filter) return false;
    return true;
  });
  const head = state.view === "store"
    ? `<h2>Kitap Mağazası</h2><p>LGS için hazırlanan dijital soru bankaları — satın al, hemen okumaya başla.</p>`
    : `<h2>Kitaplığım</h2><p>Satın aldığın kitaplar. Bir kitaba tıkla, gerçek kitap gibi oku, çiz, not al.</p>`;
  const filters = [{ id: "all", name: "Tümü" }, ...AKY.SUBJECTS, { id: "deneme", name: "Deneme" }];
  main.innerHTML = `
    <div class="section-head">${head}</div>
    <div class="subject-filters">
      ${filters.map(f => `<button data-f="${f.id}" class="${state.filter === f.id ? "active" : ""}">${f.name}</button>`).join("")}
    </div>
    ${list.length === 0
      ? `<div class="empty-state"><div style="width:54px;margin:0 auto 14px;color:#b8bfce">${IC.layers}</div>
         <h3>${state.view === "shelf" ? "Kitaplığın henüz boş" : "Bu filtrede kitap yok"}</h3>
         <p>${state.view === "shelf" ? "Mağazadan jetonlarınla kitap satın alabilirsin." : "Farklı bir ders seçmeyi dene."}</p></div>`
      : `<div class="book-grid">${list.map(bookCard).join("")}</div>`}`;
  main.querySelectorAll(".subject-filters button").forEach(b => b.onclick = () => {
    state.filter = b.dataset.f; renderBooks();
  });
  main.querySelectorAll(".book-card").forEach(c => c.onclick = () => onBookClick(c.dataset.id));
}

function bookCard(b) {
  const s = b.subject === "deneme" ? { id: "deneme", color: "#3d4457", dark: "#2d3342", ink: "#eceff5" } : subjectOf(b);
  const owned = state.user.owned.includes(b.id);
  const grad = `linear-gradient(155deg, ${s.color} 0%, ${s.dark} 100%)`;
  return `
  <button class="book-card" data-id="${b.id}">
    <div class="book-cover" style="background:${grad}; color:${s.ink}">
      ${patternSVG(s.id)}
      <span class="cover-badge">${kindLabel(b.kind)}</span>
      <div class="cover-mid">
        <h3>${b.title}</h3>
        <p>${b.subject === "deneme" ? "Karma Deneme" : subjectOf(b).name}</p>
      </div>
      <div class="cover-foot">ALİ KEREM YAYINLARI</div>
      <div class="cover-count">${questionCount(b)} soru · ${b.sections.length} bölüm</div>
    </div>
    <div class="book-info">
      <span class="kind-tag">${b.subtitle.toLocaleUpperCase("tr")}</span>
      <h4>${b.title}</h4>
      <div class="book-cta">
        ${owned
          ? `<span style="display:block;margin-bottom:7px" class="owned-mark">${IC.check} Kitaplığında</span>
             <span class="btn-read">${IC.bookOpen} Okumaya Başla</span>`
          : `<span class="btn-buy">${IC.coin} Satın Al — ${b.price} jeton</span>`}
      </div>
    </div>
  </button>`;
}

/* ---------------- satın alma ---------------- */
function onBookClick(id) {
  const book = AKY.BOOKS.find(b => b.id === id);
  if (!book) return;
  if (state.user.owned.includes(id)) return openReader(book);
  showPurchaseModal(book);
}

function showPurchaseModal(book) {
  const u = state.user;
  const back = document.createElement("div");
  back.className = "modal-back";
  const enough = u.tokens === "inf" || u.tokens >= book.price;
  back.innerHTML = `
    <div class="modal">
      <h3>Kitabı Satın Al</h3>
      <p>Bu kitabı kitaplığına eklemek için jeton kullanacaksın. Kitap, hesabında kalıcı olarak saklanır.</p>
      <div class="modal-book">${book.title}<br>
        <span style="font-size:12px;color:#8a6524;font-weight:700">${book.price} jeton</span>
        <span style="font-size:12px;color:var(--ink-soft);font-weight:500"> · bakiyen: ${tokenLabel(u)} jeton</span>
      </div>
      ${enough ? "" : `<p style="color:#a73333;font-weight:600">Yeterli jetonun yok. Bakiyeni artırmak için site yöneticisiyle görüş.</p>`}
      <div class="modal-actions">
        <button class="btn-cancel">Vazgeç</button>
        <button class="btn-confirm" ${enough ? "" : "disabled"}>${IC.coin} Satın Al</button>
      </div>
    </div>`;
  back.querySelector(".btn-cancel").onclick = () => back.remove();
  back.addEventListener("click", e => { if (e.target === back) back.remove(); });
  const ok = back.querySelector(".btn-confirm");
  if (enough) ok.onclick = () => {
    const users = loadUsers();
    const me = users[state.user.id];
    if (me.tokens !== "inf") me.tokens -= book.price;
    me.owned.push(book.id);
    saveUsers(users);
    state.user = { id: state.user.id, ...me };
    back.remove();
    renderAppChrome(); renderBooks();
    toast(`"${book.title}" kitaplığına eklendi. İyi çalışmalar!`);
  };
  document.body.appendChild(back);
}

/* ============================================================
   OKUYUCU — sayfa oluşturma
   ============================================================ */
function buildPages(book) {
  const pages = [{ type: "cover" }, { type: "toc" }];
  let qno = 0;
  book.sections.forEach((sec, si) => {
    const qs = sec.questions.map(q => ({ ...q, no: ++qno }));
    for (let i = 0; i < qs.length; i += 2) {
      pages.push({
        type: "content", secIdx: si,
        first: i === 0,
        qs: qs.slice(i, i + 2)
      });
    }
  });
  /* cevap anahtarı: bölümleri sayfalara grupla (sayfa başına ~24 hücre) */
  let cur = null;
  book.sections.forEach((sec, si) => {
    const n = sec.questions.length;
    if (!cur || cur.cells + n > 24) { cur = { type: "answers", secs: [], cells: 0 }; pages.push(cur); }
    cur.secs.push(si); cur.cells += n;
  });
  return pages;
}

/* numaralı soru listesi (cevap anahtarı için) */
function numberedQuestions(book) {
  const out = [];
  let qno = 0;
  book.sections.forEach((sec, si) => sec.questions.forEach(q => out.push({ sec: si, no: ++qno, a: q.a })));
  return out;
}

/* ============================================================
   OKUYUCU — arayüz
   ============================================================ */
const READER_HTML = `
  <div class="topbar-hotzone" id="tb-hot"></div>
  <button class="topbar-handle" id="tb-handle" title="Araç çubuğunu aç/kapa">${IC.chevD}</button>
  <div class="reader-topbar" id="rtb">
    <div class="rt-title"><span class="rt-dot" id="rt-dot"></span><div style="min-width:0"><b id="rt-name"></b><br><span id="rt-sub"></span></div></div>
    <div class="rt-actions">
      <button class="rt-btn" id="rt-download">${IC.download} İndir</button>
      <button class="rt-btn" id="rt-print">${IC.print} Yazdır</button>
      <button class="rt-btn rt-close" id="rt-close">${IC.close} Kitaplığa Dön</button>
    </div>
  </div>

  <aside class="notes-panel">
    <div class="notes-head">${IC.notes}<h3>Not Defterim</h3><span class="notes-saved" id="notes-saved">kaydedildi</span></div>
    <textarea id="notes-area" placeholder="Bu kitapla ilgili notlarını buraya yaz…
Örn: zorlandığın sorular, formüller, tekrar listesi."></textarea>
    <div class="notes-foot"><span>Bu kitabın notları</span><span id="notes-count" class="mono">0 karakter</span></div>
  </aside>

  <main class="book-stage" id="stage">
    <div class="book-wrap">
      <div class="page-frame" id="page-frame">
        <div class="page-inner" id="page-inner"></div>
        <canvas class="page-canvas" id="page-canvas"></canvas>
      </div>
    </div>
  </main>

  <nav class="page-nav">
    <button class="pn-btn" id="pg-prev">${IC.chevL}</button>
    <div class="pn-info">
      <span class="pn-label">Sayfa <b id="pg-cur" class="mono"></b> / <span id="pg-total" class="mono"></span></span>
      <div class="pn-bar"><i id="pg-fill"></i></div>
    </div>
    <div class="pn-chips">
      <button data-jump="cover">Kapak</button>
      <button data-jump="toc">İçindekiler</button>
      <button data-jump="questions">Sorular</button>
      <button data-jump="answers">Cevaplar</button>
    </div>
    <button class="pn-btn" id="pg-next">${IC.chevR}</button>
  </nav>

  <aside class="tools-panel">
    <h3>Kalem Araçları</h3>
    <div class="tool-list">
      <button class="tool-btn" data-tool="pencil">${IC.pencil}<span>Kurşun Kalem<small>ince ve silik iz</small></span></button>
      <button class="tool-btn" data-tool="pen">${IC.pen}<span>Tükenmez Kalem<small>altını çizmek / yazmak için</small></span></button>
      <button class="tool-btn" data-tool="marker">${IC.marker}<span>Fosforlu Kalem<small>önemli yerleri işaretle</small></span></button>
      <button class="tool-btn" data-tool="eraser">${IC.eraser}<span>Silgi<small>çizimi siler</small></span></button>
      <button class="tool-btn" data-tool="select">${IC.select}<span>İmleç<small>metni seçmek için</small></span></button>
    </div>
    <div class="tool-sep"></div>
    <h3>Renk</h3>
    <div class="color-row" id="pen-colors"></div>
    <div class="tool-sep"></div>
    <h3>Uç Kalınlığı</h3>
    <div class="size-row">
      <input type="range" id="pen-size" min="1" max="8" step="1" value="3">
      <div class="size-preview"><i id="size-dot"></i></div>
    </div>
    <div class="tool-sep"></div>
    <button class="tool-action" id="tool-undo">${IC.undo} Son çizimi geri al</button>
    <button class="tool-action" id="tool-clear">${IC.trash} Bu sayfadaki çizimleri temizle</button>
    <p class="tools-note">Çizimlerin bu sayfa için hafızada saklanır; sayfayı değiştirip geri döndüğünde aynen durur. Fosforlu kalemle önemli satırların üzerinden geçebilirsin.</p>
  </aside>`;

const PEN_COLORS = [
  { c: "#2b2f38", n: "Siyah" }, { c: "#2b4fa0", n: "Mavi" }, { c: "#c0392b", n: "Kırmızı" },
  { c: "#1e7a46", n: "Yeşil" }, { c: "#f2c500", n: "Sarı" }, { c: "#e66ba0", n: "Pembe" }
];

function openReader(book) {
  const r = {
    book,
    pages: buildPages(book),
    idx: 0,
    tool: "pen",
    color: "#2b2f38",
    size: 3,
    strokes: store.get(`aky_draw_${state.user.id}_${book.id}`, {}),
    topbarPinned: false,
    drawing: false, cur: null
  };
  state.reader = r;

  let el = document.getElementById("reader");
  if (!el) {
    el = document.createElement("div");
    el.id = "reader";
    el.innerHTML = READER_HTML;
    document.body.appendChild(el);
    wireReader(el);
  }
  const s = book.subject === "deneme" ? { color: "#3d4457", name: "Karma Deneme" } : subjectOf(book);
  el.querySelector("#rt-dot").style.background = s.color;
  el.querySelector("#rt-name").textContent = book.title;
  el.querySelector("#rt-sub").textContent = s.name + " · " + kindLabel(book.kind);

  /* not defterini yükle */
  const area = el.querySelector("#notes-area");
  area.value = store.get(`aky_notes_${state.user.id}_${book.id}`, "");
  updateNotesCount();

  el.hidden = false;
  document.body.style.overflow = "hidden";
  setTool("pen");
  setColor(state.reader.color);
  renderPage();
}

function closeReaderDom() {
  const el = document.getElementById("reader");
  if (el) { el.hidden = true; }
  document.body.style.overflow = "";
}
function closeReader() {
  saveStrokes();
  saveNotes(true);
  state.reader = null;
  closeReaderDom();
  renderAppChrome(); renderBooks();
}

function wireReader(el) {
  /* üst bar: üzerine gelince aç, tıklayınca sabitle */
  const rtb = el.querySelector("#rtb");
  const hot = el.querySelector("#tb-hot");
  const handle = el.querySelector("#tb-handle");
  const setTop = (v) => rtb.classList.toggle("visible", v);
  hot.addEventListener("mouseenter", () => setTop(true));
  rtb.addEventListener("mouseleave", () => { if (!state.reader || !state.reader.topbarPinned) setTimeout(() => { if (!rtb.matches(":hover")) setTop(false); }, 250); });
  rtb.addEventListener("mouseenter", () => setTop(true));
  handle.addEventListener("click", () => {
    if (!state.reader) return;
    state.reader.topbarPinned = !state.reader.topbarPinned;
    setTop(state.reader.topbarPinned);
  });

  el.querySelector("#rt-close").onclick = closeReader;
  el.querySelector("#rt-download").onclick = downloadBook;
  el.querySelector("#rt-print").onclick = printBook;

  el.querySelector("#pg-prev").onclick = () => gotoPage(state.reader.idx - 1);
  el.querySelector("#pg-next").onclick = () => gotoPage(state.reader.idx + 1);
  el.querySelectorAll(".pn-chips button").forEach(b => b.onclick = () => {
    const r = state.reader;
    const map = { cover: 0, toc: 1 };
    if (b.dataset.jump === "questions") map.questions = r.pages.findIndex(p => p.type === "content");
    if (b.dataset.jump === "answers") map.answers = r.pages.findIndex(p => p.type === "answers");
    gotoPage(map[b.dataset.jump] ?? 0);
  });

  /* araçlar */
  el.querySelectorAll(".tool-btn").forEach(b => b.onclick = () => setTool(b.dataset.tool));
  const palette = el.querySelector("#pen-colors");
  palette.innerHTML = PEN_COLORS.map(p => `<button class="color-dot" data-c="${p.c}" title="${p.n}" style="background:${p.c}"></button>`).join("");
  palette.querySelectorAll(".color-dot").forEach(b => b.onclick = () => setColor(b.dataset.c));
  el.querySelector("#pen-size").oninput = (e) => {
    if (!state.reader) return;
    state.reader.size = +e.target.value;
    updateSizePreview();
  };
  el.querySelector("#tool-undo").onclick = undoStroke;
  el.querySelector("#tool-clear").onclick = clearPage;

  /* not defteri */
  const area = el.querySelector("#notes-area");
  let nt = null;
  area.addEventListener("input", () => {
    updateNotesCount();
    clearTimeout(nt);
    nt = setTimeout(() => saveNotes(), 500);
  });

  /* çizim */
  const cv = el.querySelector("#page-canvas");
  cv.addEventListener("pointerdown", onDown);
  cv.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  cv.addEventListener("pointerleave", onUp);
  window.addEventListener("resize", () => { if (state.reader) fitCanvas(); });

  /* klavye */
  window.addEventListener("keydown", (e) => {
    if (!state.reader) return;
    if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT") return;
    if (e.key === "ArrowRight") gotoPage(state.reader.idx + 1);
    if (e.key === "ArrowLeft") gotoPage(state.reader.idx - 1);
    if (e.key === "Escape") closeReader();
  });
}

function setTool(t) {
  const r = state.reader; if (!r) return;
  r.tool = t;
  document.querySelectorAll(".tool-btn").forEach(b => b.classList.toggle("active", b.dataset.tool === t));
  const cv = document.getElementById("page-canvas");
  if (cv) cv.style.pointerEvents = t === "select" ? "none" : "auto";
  const pc = document.querySelector(".page-content");
  if (pc) pc.classList.toggle("selectable", t === "select");
}
function setColor(c) {
  const r = state.reader; if (!r) return;
  r.color = c;
  document.querySelectorAll(".color-dot").forEach(b => b.classList.toggle("active", b.dataset.c === c));
}
function updateSizePreview() {
  const r = state.reader; if (!r) return;
  const d = document.getElementById("size-dot");
  const px = 2 + r.size * 1.6;
  d.style.width = px + "px"; d.style.height = px + "px";
}

/* ---------------- not defteri ---------------- */
function updateNotesCount() {
  const area = document.getElementById("notes-area");
  const cnt = document.getElementById("notes-count");
  if (area && cnt) cnt.textContent = area.value.length + " karakter";
}
function saveNotes(silent) {
  const r = state.reader; if (!r) return;
  const area = document.getElementById("notes-area");
  store.set(`aky_notes_${state.user.id}_${r.book.id}`, area.value);
  if (!silent) {
    const s = document.getElementById("notes-saved");
    s.classList.add("show");
    setTimeout(() => s.classList.remove("show"), 1200);
  }
}

/* ---------------- sayfa çizimi (render) ---------------- */
function gotoPage(i) {
  const r = state.reader; if (!r) return;
  if (i < 0 || i >= r.pages.length) return;
  saveStrokes();
  r.idx = i;
  renderPage();
}

function renderPage() {
  const r = state.reader; if (!r) return;
  const inner = document.getElementById("page-inner");
  const page = r.pages[r.idx];
  const book = r.book;
  const s = book.subject === "deneme" ? { id: "deneme", color: "#3d4457", ink: "#eceff5", name: "Karma Deneme" } : subjectOf(book);
  inner.innerHTML = pageHTML(page, book, s, r);
  updateNav();
  fitCanvas();
}

function runHead(book, r, label) {
  return `<div class="run-head"><span>${book.title}</span><span>${label || ""}</span></div>`;
}
function runFoot(r) { return `<div class="run-foot">— ${r.idx + 1} —</div>`; }

function pageHTML(page, book, s, r) {
  if (page.type === "cover") {
    const grad = `linear-gradient(160deg, ${s.color} 0%, ${s.dark || "#2d3342"} 100%)`;
    return `<div class="page-content page-cover"><div class="cover-art" style="background:${grad}; color:${s.ink}">
      ${patternSVG(s.id)}
      <div class="c-pub"><span style="color:inherit">${IC.logo}</span><div><b>ALİ KEREM YAYINLARI</b><span>LGS HAZIRLIK SERİSİ</span></div></div>
      <span class="c-badge">${kindLabel(book.kind)}</span>
      <h1>${book.title}</h1>
      <div class="c-sub">${book.subtitle}</div>
      ${book.kind === "kademeli" ? `<div class="c-flow"><span>1 Kolay</span><span>2 Orta</span><span>3 Zor</span><span>4 LGS Tipi</span></div>` : ""}
      <div class="c-stats">
        <div><b>${questionCount(book)}</b>soru</div>
        <div><b>${book.sections.length}</b>bölüm</div>
        <div><b>${r.pages.length}</b>sayfa</div>
      </div>
      <div class="c-year">2026 · YENİ NESİL SORULAR</div>
    </div></div>${runFoot(r)}`;
  }
  if (page.type === "toc") {
    let html = pageContentStart(runHead(book, r, "İçindekiler"));
    html += `<div class="toc-h">İçindekiler</div><div class="toc-sub">Bölümler kolaydan LGS düzeyine doğru ilerler. Düzenli çözmeni öneririz.</div>`;
    r.pages.forEach((p, i) => {
      if (p.type === "content" && p.first) {
        const sec = book.sections[p.secIdx];
        html += `<div class="toc-row"><b>${sec.name}</b><em>${sec.questions.length} soru</em><span class="toc-page">sayfa ${i + 1}</span></div>`;
      }
      if (p.type === "answers" && p.secs && r.pages.findIndex(x => x.type === "answers") === i) {
        html += `<div class="toc-row"><b>Cevap Anahtarı</b><em>tüm bölümler</em><span class="toc-page">sayfa ${i + 1}</span></div>`;
      }
    });
    return html + "</div>" + runFoot(r);
  }
  if (page.type === "answers") {
    const nq = numberedQuestions(book);
    let html = pageContentStart(runHead(book, r, "Cevap Anahtarı"));
    html += `<div class="ans-h">Cevap Anahtarı</div>`;
    page.secs.forEach(si => {
      const sec = book.sections[si];
      html += `<div class="ans-sec"><b>${sec.name}</b><div class="ans-grid">`;
      nq.filter(q => q.sec === si).forEach(q => {
        html += `<div class="ans-cell"><b>${q.no}.</b> ${LETTERS[q.a]}</div>`;
      });
      html += `</div></div>`;
    });
    return html + "</div>" + runFoot(r);
  }
  /* içerik */
  const sec = book.sections[page.secIdx];
  let html = pageContentStart(runHead(book, r, sec.name));
  if (page.first) html += `<div class="sec-banner" style="border-color:${s.color}33;background:${s.color}12"><b style="color:${s.color}">${sec.name}</b><span>${sec.info || ""}</span></div>`;
  page.qs.forEach(q => {
    html += `<div class="q-block">
      ${q.tag ? `<span class="q-tag" style="background:${s.color}">${q.tag}</span>` : ""}
      <div class="q-head"><span class="q-num" style="background:${s.color}">${q.no}</span><div class="q-text">${esc(q.q)}</div></div>
      <div class="q-opts">${q.o.map((o, i) => `<div class="q-opt"><i>${LETTERS[i]}</i><span>${esc(o)}</span></div>`).join("")}</div>
    </div>`;
  });
  return html + "</div>" + runFoot(r);
}
function pageContentStart(headHtml) { return `<div class="page-content">${headHtml}`; }
function esc(t) { return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

function updateNav() {
  const r = state.reader;
  document.getElementById("pg-cur").textContent = r.idx + 1;
  document.getElementById("pg-total").textContent = r.pages.length;
  document.getElementById("pg-fill").style.width = ((r.idx + 1) / r.pages.length * 100) + "%";
  document.getElementById("pg-prev").disabled = r.idx === 0;
  document.getElementById("pg-next").disabled = r.idx === r.pages.length - 1;
  document.getElementById("stage").scrollTop = 0;
  updateSizePreview();
}

/* ---------------- çizim katmanı ---------------- */
function canvasCtx() {
  const cv = document.getElementById("page-canvas");
  return { cv, ctx: cv.getContext("2d") };
}
function fitCanvas() {
  const { cv } = canvasCtx();
  const rect = cv.getBoundingClientRect();
  if (cv.width !== Math.round(rect.width) || cv.height !== Math.round(rect.height)) {
    cv.width = Math.round(rect.width);
    cv.height = Math.round(rect.height);
  }
  redraw();
}
function pageStrokes() {
  const r = state.reader;
  const k = String(r.idx);
  if (!r.strokes[k]) r.strokes[k] = [];
  return r.strokes[k];
}
function redraw() {
  const r = state.reader; if (!r) return;
  const { cv, ctx } = canvasCtx();
  ctx.clearRect(0, 0, cv.width, cv.height);
  pageStrokes().forEach(st => paintStroke(ctx, st, cv));
}
function paintStroke(ctx, st, cv) {
  if (st.pts.length < 1) return;
  ctx.save();
  ctx.lineJoin = "round"; ctx.lineCap = "round";
  if (st.tool === "eraser") {
    ctx.globalCompositeOperation = "destination-out";
    ctx.globalAlpha = 1;
    ctx.lineWidth = st.size * 5;
  } else if (st.tool === "marker") {
    ctx.globalCompositeOperation = "multiply";
    ctx.globalAlpha = 0.38;
    ctx.strokeStyle = st.color;
    ctx.lineWidth = st.size * 4.6;
  } else if (st.tool === "pencil") {
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 0.65;
    ctx.strokeStyle = st.color === "#2b2f38" ? "#5c6270" : st.color;
    ctx.lineWidth = Math.max(1, st.size * 0.8);
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.strokeStyle = st.color;
    ctx.lineWidth = st.size * 1.1;
  }
  ctx.beginPath();
  const p0 = st.pts[0];
  ctx.moveTo(p0[0] * cv.width, p0[1] * cv.height);
  if (st.pts.length === 1) ctx.lineTo(p0[0] * cv.width + 0.01, p0[1] * cv.height + 0.01);
  for (let i = 1; i < st.pts.length; i++) ctx.lineTo(st.pts[i][0] * cv.width, st.pts[i][1] * cv.height);
  ctx.stroke();
  ctx.restore();
}
function strokeWidth(st) {
  return st.tool === "marker" ? st.size * 4.6 : st.tool === "eraser" ? st.size * 5 : st.tool === "pencil" ? Math.max(1, st.size * 0.8) : st.size * 1.1;
}
function evPoint(e) {
  const { cv } = canvasCtx();
  const rect = cv.getBoundingClientRect();
  return [Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)),
          Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height))];
}
function onDown(e) {
  const r = state.reader; if (!r || r.tool === "select") return;
  e.preventDefault();
  document.getElementById("page-canvas").setPointerCapture(e.pointerId);
  r.drawing = true;
  r.cur = { tool: r.tool, color: r.color, size: r.size, pts: [evPoint(e)] };
  const { ctx, cv } = canvasCtx();
  paintStroke(ctx, r.cur, cv);
}
function onMove(e) {
  const r = state.reader; if (!r || !r.drawing || !r.cur) return;
  e.preventDefault();
  const { ctx, cv } = canvasCtx();
  const pt = evPoint(e);
  ctx.save();
  ctx.lineJoin = "round"; ctx.lineCap = "round";
  if (r.cur.tool === "eraser") {
    ctx.globalCompositeOperation = "destination-out"; ctx.globalAlpha = 1;
    ctx.lineWidth = strokeWidth(r.cur);
  } else if (r.cur.tool === "marker") {
    ctx.globalCompositeOperation = "multiply"; ctx.globalAlpha = 0.38;
    ctx.strokeStyle = r.cur.color; ctx.lineWidth = strokeWidth(r.cur);
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = r.cur.tool === "pencil" ? 0.65 : 1;
    ctx.strokeStyle = r.cur.tool === "pencil" && r.cur.color === "#2b2f38" ? "#5c6270" : r.cur.color;
    ctx.lineWidth = strokeWidth(r.cur);
  }
  const prev = r.cur.pts[r.cur.pts.length - 1];
  ctx.beginPath();
  ctx.moveTo(prev[0] * cv.width, prev[1] * cv.height);
  ctx.lineTo(pt[0] * cv.width, pt[1] * cv.height);
  ctx.stroke();
  ctx.restore();
  r.cur.pts.push(pt);
}
function onUp() {
  const r = state.reader; if (!r || !r.drawing) return;
  r.drawing = false;
  if (r.cur && r.cur.pts.length) {
    pageStrokes().push(r.cur);
    saveStrokes();
  }
  r.cur = null;
}
function undoStroke() {
  const r = state.reader; if (!r) return;
  const arr = pageStrokes();
  if (!arr.length) return toast("Bu sayfada geri alınacak çizim yok.");
  arr.pop();
  saveStrokes(); redraw();
}
function clearPage() {
  const r = state.reader; if (!r) return;
  if (!pageStrokes().length) return toast("Sayfa zaten temiz.");
  r.strokes[String(r.idx)] = [];
  saveStrokes(); redraw();
  toast("Sayfadaki çizimler temizlendi.");
}
function saveStrokes() {
  const r = state.reader; if (!r) return;
  store.set(`aky_draw_${state.user.id}_${r.book.id}`, r.strokes);
}

/* ============================================================
   İNDİR & YAZDIR
   ============================================================ */
function buildPrintableHTML(book, forFile) {
  const s = book.subject === "deneme" ? { color: "#3d4457", name: "Karma Deneme" } : subjectOf(book);
  const nq = numberedQuestions(book);
  let body = `
    <div class="print-page">
      <div class="print-head"><span>ALİ KEREM YAYINLARI</span><span>LGS 2026</span></div>
      <h1>${book.title}</h1>
      <p class="p-info">${s.name} · ${book.subtitle} · ${questionCount(book)} soru</p>
      <p class="p-info">Zorluk sırası: ${book.kind === "kademeli" ? "Kolay → Orta → Zor → LGS Tipi" : "LGS tarzı"}</p>
    </div>`;
  let qno = 0;
  book.sections.forEach(sec => {
    const qs = sec.questions;
    for (let i = 0; i < qs.length; i += 3) {
      body += `<div class="print-page"><div class="print-head"><span>${book.title}</span><span>${sec.name}</span></div>`;
      if (i === 0) body += `<div class="p-sec">${sec.name}</div><div class="p-info">${sec.info || ""}</div>`;
      qs.slice(i, i + 3).forEach(q => {
        qno++;
        body += `<div class="print-q">
          <div class="pq"><b>${qno}.</b> ${q.tag ? "[" + q.tag + "] " : ""}${esc(q.q)}</div>
          ${q.o.map((o, k) => `<div class="print-o">${LETTERS[k]}) ${esc(o)}</div>`).join("")}
        </div>`;
      });
      body += `</div>`;
    }
  });
  body += `<div class="print-page"><div class="print-head"><span>${book.title}</span><span>Cevap Anahtarı</span></div>
    <div class="p-sec">Cevap Anahtarı</div><div class="print-ans">${
      nq.map(q => `<span><b>${q.no}.</b> ${LETTERS[q.a]}</span>`).join("")
    }</div></div>`;
  if (forFile) return `<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><title>${book.title}</title>
  <style>
    body{font-family:Georgia,serif;margin:24px auto;max-width:760px;color:#111;line-height:1.55}
    .print-page{border:1px solid #eee;border-radius:8px;padding:24px 28px;margin-bottom:18px;page-break-after:always}
    .print-head{font-size:10px;letter-spacing:.15em;color:#999;display:flex;justify-content:space-between;border-bottom:1px solid #ddd;padding-bottom:6px;margin-bottom:14px;text-transform:uppercase}
    h1{font-size:24px}.p-sec{font-weight:bold;margin:10px 0 4px}.p-info{font-size:12px;color:#555;margin-bottom:4px}
    .print-q{margin-bottom:16px}.pq{margin-bottom:5px;white-space:pre-line}.print-o{margin-left:18px;font-size:14px}
    .print-ans{column-count:4;font-size:13px}.print-ans span{display:inline-block;margin-right:12px}
  </style></head><body>${body}</body></html>`;
  return body;
}

function downloadBook() {
  const r = state.reader; if (!r) return;
  const html = buildPrintableHTML(r.book, true);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = r.book.title.replace(/[\\/:*?"<>|]/g, "").slice(0, 60) + ".html";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 400);
  toast("Kitap bilgisayarına indirildi (HTML).");
}

function printBook() {
  const r = state.reader; if (!r) return;
  let pr = document.getElementById("print-root");
  if (!pr) {
    pr = document.createElement("div");
    pr.id = "print-root";
    document.body.appendChild(pr);
  }
  pr.innerHTML = buildPrintableHTML(r.book, false);
  toast("Yazdırma penceresi açılıyor…");
  setTimeout(() => window.print(), 120);
}

/* ============================================================
   BAŞLAT
   ============================================================ */
(function init() {
  loadUsers();
  const u = currentUser();
  if (u) {
    state.user = u;
    document.getElementById("auth-screen").hidden = true;
    enterApp();
  } else {
    renderAuth();
  }
})();
