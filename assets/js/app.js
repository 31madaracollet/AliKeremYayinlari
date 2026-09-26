/* =========================================================
   Ali Kerem Yayınları – Uygulama Mantığı
   Kalıcı hafıza: localStorage
   ========================================================= */
"use strict";

/* -------------------- Depolama -------------------- */
const DB = {
  usersKey: "akp_users",
  sessionKey: "akp_session",
  getUsers(){ try{ return JSON.parse(localStorage.getItem(this.usersKey)) || {}; }catch(e){ return {}; } },
  saveUsers(u){ localStorage.setItem(this.usersKey, JSON.stringify(u)); },
  getSession(){ return localStorage.getItem(this.sessionKey) || null; },
  setSession(u){ if(u) localStorage.setItem(this.sessionKey,u); else localStorage.removeItem(this.sessionKey); },
};

// Ali Kerem hesabını (sınırsız) tohumla
(function seed(){
  const users = DB.getUsers();
  if(!users["Ali Kerem"]){
    users["Ali Kerem"] = { password:"1234", tokens:Infinity, unlimited:true, purchases:[] };
    DB.saveUsers(users);
  }
})();

const State = { user:null };

function currentUser(){
  const name = DB.getSession();
  if(!name) return null;
  const users = DB.getUsers();
  const u = users[name];
  if(!u) return null;
  return { name, ...u };
}
function persistUser(u){
  const users = DB.getUsers();
  users[u.name] = { password:u.password, tokens:u.tokens, unlimited:u.unlimited, purchases:u.purchases };
  DB.saveUsers(users);
}

/* -------------------- Yardımcılar -------------------- */
const $ = (s,el=document)=>el.querySelector(s);
const $$ = (s,el=document)=>[...el.querySelectorAll(s)];
function el(tag, cls, html){ const e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; }
function tokenLabel(t){ return (t===Infinity || t===null) ? "∞" : t; }
function displayTokens(u){ return u.unlimited ? "∞" : u.tokens; }
function escapeHtml(s){ return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }

function toast(msg, type=""){
  let t = $("#toast");
  if(!t){ t = el("div","toast"); t.id="toast"; document.body.appendChild(t); }
  t.className = "toast "+type;
  t.textContent = msg;
  requestAnimationFrame(()=>t.classList.add("show"));
  clearTimeout(t._to);
  t._to = setTimeout(()=>t.classList.remove("show"), 2400);
}

/* -------------------- Uygulama başlangıcı -------------------- */
window.addEventListener("DOMContentLoaded", ()=>{
  State.user = currentUser();
  if(State.user) renderApp("store");
  else renderAuth("login");
});

/* ============================================================
   GİRİŞ / KAYIT EKRANI
   ============================================================ */
function renderAuth(mode){
  const app = $("#app");
  const login = mode==="login";
  app.innerHTML = `
  <div class="topbar">
    <div class="brand"><div class="logo">AK</div>
      <div><h1>Ali Kerem Yayınları</h1><small>Dijital Soru Bankası</small></div></div>
  </div>
  <div class="auth-wrap">
    <div class="auth-card">
      <h2>${login? "Tekrar hoş geldin" : "Hesap oluştur"}</h2>
      <div class="sub">${login? "LGS soru bankana giriş yap." : "Kayıt ol, hesabına 10 jeton yükleyelim."}</div>
      <div id="authMsg"></div>
      <div class="field"><label>Kullanıcı adı</label>
        <input id="au_user" autocomplete="off" placeholder="${login?'Kullanıcı adın':'Bir kullanıcı adı seç'}"></div>
      <div class="field"><label>Şifre</label>
        <input id="au_pass" type="password" autocomplete="off" placeholder="Şifren"></div>
      <button class="btn primary" id="au_go">${login? "Giriş yap" : "Kayıt ol"}</button>
      <div class="auth-switch">
        ${login? "Hesabın yok mu? <b id='au_switch'>Kayıt ol</b>" : "Zaten üye misin? <b id='au_switch'>Giriş yap</b>"}
      </div>
      <div class="info-line">Her yeni üyeye <b style="color:var(--accent2)">10 jeton</b> hediye.<br>Jetonlarla dilediğin kitabı aç, dijital olarak oku.</div>
    </div>
  </div>`;

  $("#au_switch").onclick = ()=>renderAuth(login?"register":"login");
  const go = ()=> login ? doLogin() : doRegister();
  $("#au_go").onclick = go;
  $("#au_pass").addEventListener("keydown",e=>{ if(e.key==="Enter") go(); });
  $("#au_user").focus();
}
function authMsg(txt, cls){ $("#authMsg").innerHTML = `<div class="msg ${cls}">${txt}</div>`; }

function doRegister(){
  const name = $("#au_user").value.trim();
  const pass = $("#au_pass").value;
  if(name.length<2) return authMsg("Kullanıcı adı en az 2 karakter olmalı.","err");
  if(pass.length<3) return authMsg("Şifre en az 3 karakter olmalı.","err");
  const users = DB.getUsers();
  if(users[name]) return authMsg("Bu kullanıcı adı zaten alınmış.","err");
  const unlimited = (name.toLowerCase()==="ali kerem");
  users[name] = { password:pass, tokens: unlimited?Infinity:10, unlimited, purchases:[] };
  DB.saveUsers(users);
  DB.setSession(name);
  State.user = currentUser();
  toast("Hoş geldin! 10 jeton hesabına yüklendi.","ok");
  renderApp("store");
}
function doLogin(){
  const name = $("#au_user").value.trim();
  const pass = $("#au_pass").value;
  const users = DB.getUsers();
  const u = users[name];
  if(!u) return authMsg("Böyle bir kullanıcı bulunamadı.","err");
  if(u.password!==pass) return authMsg("Şifre hatalı.","err");
  DB.setSession(name);
  State.user = currentUser();
  renderApp("store");
}
function logout(){
  DB.setSession(null);
  State.user = null;
  renderAuth("login");
}

/* ============================================================
   ANA UYGULAMA (mağaza + kitaplığım)
   ============================================================ */
function renderApp(view){
  const u = State.user;
  const app = $("#app");
  app.innerHTML = `
  <div class="topbar">
    <div class="brand" id="homeBtn"><div class="logo">AK</div>
      <div><h1>Ali Kerem Yayınları</h1><small>Dijital Soru Bankası</small></div></div>
    <div class="nav">
      <button data-v="store">Kitaplık</button>
      <button data-v="mine">Kitaplarım</button>
    </div>
    <div class="spacer"></div>
    <div class="wallet"><span class="coin">₺</span> <span id="tokenCount">${displayTokens(u)}</span> jeton</div>
    <div class="userchip">
      <div class="avatar">${escapeHtml(u.name[0].toUpperCase())}</div>
      <span style="font-size:14px;font-weight:600">${escapeHtml(u.name)}</span>
      <button class="btn sm danger" id="logoutBtn">Çıkış</button>
    </div>
  </div>
  <div id="viewRoot"></div>`;

  $("#homeBtn").onclick = ()=>switchView("store");
  $("#logoutBtn").onclick = logout;
  $$(".nav button").forEach(b=> b.onclick=()=>switchView(b.dataset.v));
  switchView(view||"store");
}
function switchView(v){
  $$(".nav button").forEach(b=> b.classList.toggle("active", b.dataset.v===v));
  if(v==="mine") renderMine();
  else renderStore();
}
function refreshTokens(){ const t=$("#tokenCount"); if(t) t.textContent = displayTokens(State.user); }

/* ---------- Kitap kapağı bileşeni ---------- */
function coverHTML(b){
  return `<div class="cover" style="background:linear-gradient(140deg,${b.c1},${b.c2})">
    <div class="pub">Ali Kerem Yayınları</div>
    <div class="glyph">${b.icon}</div>
    <div><div class="ct">${escapeHtml(b.title)}</div>
      <div class="cs">${escapeHtml(b.subject)} • ${b.type==="kademeli"?"Kademeli":"Kompile LGS"}</div></div>
  </div>`;
}
function bookCard(b){
  const owned = State.user.purchases.includes(b.id);
  const card = el("div","book-card");
  card.innerHTML = `
    <span class="type-tag type-${b.type}">${b.type==="kademeli"?"Kademeli":"Kompile"}</span>
    ${coverHTML(b)}
    <div class="subj">${escapeHtml(b.subject)}</div>
    <h4>${escapeHtml(b.title)}</h4>
    <div class="desc">${escapeHtml(b.desc)}</div>
    <div class="foot">
      ${owned
        ? `<span class="owned-badge">✓ Sahipsin</span><button class="btn primary sm openBtn">Oku</button>`
        : `<span class="price"><span class="coin" style="width:18px;height:18px;border-radius:50%;background:linear-gradient(135deg,var(--accent2),var(--accent));display:inline-grid;place-items:center;color:#3a2a00;font-size:11px;font-weight:900">₺</span> ${b.price} jeton</span>
           <button class="btn sm buyBtn">Satın Al</button>`}
    </div>`;
  if(owned) card.querySelector(".openBtn").onclick = ()=>openReader(b.id);
  else card.querySelector(".buyBtn").onclick = ()=>showBuyModal(b);
  return card;
}

/* ---------- MAĞAZA ---------- */
function renderStore(){
  const root = $("#viewRoot");
  root.className="view";
  const owned = State.user.purchases.length;
  root.innerHTML = `
  <div class="hero">
    <div class="txt">
      <h2>LGS'ye kolaydan zora, adım adım hazırlan.</h2>
      <p>Her ders için iki kitap: <b>Kademeli</b> soru bankası seni kolay testlerden LGS tipine taşır; <b>Kompile</b> ise tamamen LGS zorluğunda sınav provası sunar. Kitapları dijital olarak oku, sayfaların üzerini fosforlu kalemle çiz, yanına not al.</p>
      <div class="cta">
        <button class="btn primary" id="ctaMine">Kitaplarım (${owned})</button>
        <span class="wallet"><span class="coin">₺</span> ${displayTokens(State.user)} jeton hazır</span>
      </div>
    </div>
    <div class="hero-art">${heroArt()}</div>
  </div>`;

  $("#ctaMine").onclick = ()=>switchView("mine");

  SUBJECTS.forEach(subj=>{
    const t = el("div","sec-title");
    const count = BOOKS.filter(b=>b.subject===subj).length;
    t.innerHTML = `<h3>${escapeHtml(subj)}</h3><span class="subject-pill">${count} kitap</span><div class="rule"></div>`;
    root.appendChild(t);
    const grid = el("div","grid");
    BOOKS.filter(b=>b.subject===subj).forEach(b=> grid.appendChild(bookCard(b)));
    root.appendChild(grid);
  });

  const f = el("div","foot-note","© Ali Kerem Yayınları · Dijital LGS Soru Bankası · Şimdilik LGS, yakında tüm sınavlar.");
  root.appendChild(f);
}

/* ---------- KİTAPLARIM ---------- */
function renderMine(){
  const root = $("#viewRoot");
  root.className="view";
  const mine = BOOKS.filter(b=>State.user.purchases.includes(b.id));
  root.innerHTML = `<div class="sec-title"><h3>Kitaplarım</h3><span class="subject-pill">${mine.length} kitap</span><div class="rule"></div></div>`;
  if(mine.length===0){
    root.appendChild(el("div","empty",`<div class="big">📚</div><div>Henüz kitabın yok.</div>
      <p style="max-width:360px;margin:12px auto 18px">Kitaplık sekmesinden jetonlarınla ilk kitabını aç ve dijital okumaya başla.</p>
      <button class="btn primary" onclick="switchView('store')">Kitaplığa git</button>`));
    return;
  }
  const grid = el("div","grid");
  mine.forEach(b=> grid.appendChild(bookCard(b)));
  root.appendChild(grid);
}

/* ---------- SATIN ALMA ---------- */
function showBuyModal(b){
  const back = el("div","modal-back");
  const enough = State.user.unlimited || State.user.tokens >= b.price;
  back.innerHTML = `
  <div class="modal">
    <h3>Kitabı satın al</h3>
    <p>Bu kitap hesabına eklenecek ve dilediğin zaman dijital olarak okuyabileceksin.</p>
    <div class="mbook">
      <div style="width:70px;flex-shrink:0">${coverHTML(b)}</div>
      <div><div style="font-weight:700">${escapeHtml(b.title)}</div>
        <div style="color:var(--muted);font-size:13px">${escapeHtml(b.subject)}</div>
        <div style="margin-top:6px;font-weight:800">${b.price} jeton</div></div>
    </div>
    ${enough? "" : `<div class="msg err">Yeterli jetonun yok. (${displayTokens(State.user)} jetonun var)</div>`}
    <div class="actions">
      <button class="btn ghost" id="mCancel">Vazgeç</button>
      <button class="btn primary" id="mBuy" ${enough?"":"disabled"}>Satın al (${b.price} jeton)</button>
    </div>
  </div>`;
  document.body.appendChild(back);
  const close = ()=>back.remove();
  back.onclick = e=>{ if(e.target===back) close(); };
  $("#mCancel",back).onclick = close;
  if(enough) $("#mBuy",back).onclick = ()=>{ buyBook(b); close(); };
}
function buyBook(b){
  const u = State.user;
  if(u.purchases.includes(b.id)) return;
  if(!u.unlimited){
    if(u.tokens < b.price){ toast("Yeterli jetonun yok.","err"); return; }
    u.tokens -= b.price;
  }
  u.purchases.push(b.id);
  persistUser(u);
  State.user = currentUser();
  refreshTokens();
  toast("Kitap kitaplığına eklendi ✓","ok");
  // aktif görünümü tazele
  switchView($(".nav button.active")?.dataset.v || "store");
  openReader(b.id);
}

/* ============================================================
   DİJİTAL OKUYUCU
   ============================================================ */
const Reader = {
  book:null, pages:[], idx:0,
  tool:{ type:"hl", color:"rgba(250,204,21,0.42)", size:18 },
  drawing:false, last:null, canvas:null, ctx:null,
};

// pens tanımı
const HL_COLORS = [
  {name:"Sarı", c:"rgba(250,204,21,0.42)"},
  {name:"Yeşil", c:"rgba(34,197,94,0.38)"},
  {name:"Pembe", c:"rgba(236,72,153,0.36)"},
  {name:"Mavi", c:"rgba(59,130,246,0.34)"},
  {name:"Turuncu", c:"rgba(249,115,22,0.38)"},
];
const PEN_COLORS = [
  {name:"Siyah", c:"#1f2937"},
  {name:"Mavi", c:"#1d4ed8"},
  {name:"Kırmızı", c:"#dc2626"},
];
const TIER_COLORS = { "Kolay Test":"#22c55e","Orta Test":"#3b82f6","Zor Test":"#f97316","LGS Tipi":"#dc2626","LGS Zoru":"#dc2626" };

// sayfa modelini kur
function buildPages(book){
  const pages = [{ kind:"cover" }];
  book.sections.forEach((sec,si)=>{
    pages.push({ kind:"tier", sec, si });
    sec.questions.forEach((q,qi)=> pages.push({ kind:"q", sec, q, si, qi }));
  });
  pages.push({ kind:"end" });
  return pages;
}

function drawKey(idx){ return `akp_draw_${State.user.name}_${Reader.book.id}_${idx}`; }
function noteKey(){ return `akp_note_${State.user.name}_${Reader.book.id}`; }
function progKey(){ return `akp_prog_${State.user.name}_${Reader.book.id}`; }

function openReader(bookId){
  const b = BOOKS.find(x=>x.id===bookId);
  if(!b) return;
  if(!State.user.purchases.includes(bookId)){ toast("Önce kitabı satın almalısın.","err"); return; }
  Reader.book = b;
  Reader.pages = buildPages(b);
  Reader.idx = parseInt(localStorage.getItem(progKey())||"0",10) || 0;
  if(Reader.idx>=Reader.pages.length) Reader.idx=0;
  renderReaderShell();
  renderPage();
}

function closeReader(){
  saveDrawing();
  const rv = $("#reader-view");
  if(rv && rv._key) document.removeEventListener("keydown", rv._key);
  if(Reader._resize) window.removeEventListener("resize", Reader._resize);
  if(rv) rv.remove();
  document.body.style.overflow="";
}

function renderReaderShell(){
  const b = Reader.book;
  const rv = el("div"); rv.id="reader-view";
  rv.innerHTML = `
  <div class="reader-title"><span class="dot" style="background:${b.c2}"></span>${escapeHtml(b.title)}</div>
  <button class="reader-close" title="Kapat">✕</button>

  <div class="hover-zone"></div>
  <div class="hover-tools" id="hoverTools">
    <button class="tool-pill" id="dlBtn">⬇ İndir</button>
    <button class="tool-pill" id="prBtn">🖨 Yazdır</button>
  </div>

  <div class="reader-grid">
    <!-- SOL: Not defteri -->
    <aside class="notebook" id="notebook">
      <div class="nb-head"><h5>📝 Not Defterim</h5><span class="nb-saved" id="nbSaved">kaydedildi ✓</span></div>
      <textarea id="nbArea" placeholder="Buraya notlarını yaz... (otomatik ve kalıcı olarak kaydedilir)"></textarea>
      <div class="nb-hint">Notların bu kitaba özeldir ve cihazında kalıcı olarak saklanır.</div>
    </aside>

    <!-- ORTA: Kitap -->
    <section class="stage">
      <button class="mobile-toggle" id="nbToggle" title="Not defteri">📝</button>
      <button class="mobile-toggle" id="penToggle" title="Kalemler">✏️</button>
      <div class="book-scroll">
        <div class="paper" id="paper">
          <div class="p-inner" id="pInner"></div>
          <canvas class="draw-canvas" id="drawCanvas"></canvas>
          <div class="pg-num" id="pgNum"></div>
        </div>
      </div>
    </section>

    <!-- SAĞ: Kalemler -->
    <aside class="tools" id="tools"></aside>
  </div>

  <!-- ALT: Sayfa ilerlet -->
  <div class="pager">
    <button id="firstPg" title="Baş">«</button>
    <button id="prevPg" title="Önceki">‹</button>
    <span class="pg-info" id="pgInfo"></span>
    <input type="range" id="pgSlider" min="0" value="0">
    <button id="nextPg" title="Sonraki">›</button>
    <button id="lastPg" title="Son">»</button>
  </div>`;
  document.body.appendChild(rv);
  document.body.style.overflow="hidden";

  // olaylar
  $(".reader-close",rv).onclick = closeReader;
  $("#dlBtn",rv).onclick = downloadBook;
  $("#prBtn",rv).onclick = printBook;

  // hover-to-show (mouse üstüne gelince) + tıklayınca sabitle
  const ht = $("#hoverTools",rv), hz = $(".hover-zone",rv);
  const show=()=>ht.classList.add("show");
  const hide=()=>{ if(!ht._pinned) ht.classList.remove("show"); };
  hz.addEventListener("mouseenter",show);
  ht.addEventListener("mouseenter",show);
  hz.addEventListener("mouseleave",()=>setTimeout(hide,60));
  ht.addEventListener("mouseleave",()=>setTimeout(hide,400));
  // elle tıklayınca (dokunmatik) aç/kapat
  hz.addEventListener("click",()=>{ ht._pinned=!ht._pinned; ht.classList.toggle("show",ht._pinned); });

  // pager
  $("#firstPg",rv).onclick=()=>goto(0);
  $("#prevPg",rv).onclick=()=>goto(Reader.idx-1);
  $("#nextPg",rv).onclick=()=>goto(Reader.idx+1);
  $("#lastPg",rv).onclick=()=>goto(Reader.pages.length-1);
  $("#pgSlider",rv).max = Reader.pages.length-1;
  $("#pgSlider",rv).oninput = e=>goto(parseInt(e.target.value,10));

  // klavye okları
  rv._key = e=>{
    if(e.target.tagName==="TEXTAREA") return;
    if(e.key==="ArrowRight") goto(Reader.idx+1);
    if(e.key==="ArrowLeft") goto(Reader.idx-1);
    if(e.key==="Escape") closeReader();
  };
  document.addEventListener("keydown", rv._key);

  // mobil paneller
  $("#nbToggle",rv).onclick=()=>$("#notebook",rv).classList.toggle("open");
  $("#penToggle",rv).onclick=()=>$("#tools",rv).classList.toggle("open");

  // not defteri (kalıcı)
  const nb = $("#nbArea",rv);
  nb.value = localStorage.getItem(noteKey()) || "";
  let sv;
  nb.addEventListener("input",()=>{
    clearTimeout(sv);
    sv=setTimeout(()=>{
      localStorage.setItem(noteKey(), nb.value);
      const s=$("#nbSaved",rv); s.classList.add("show"); setTimeout(()=>s.classList.remove("show"),1200);
    },350);
  });

  buildTools();
  setupCanvas();
  window.addEventListener("resize", Reader._resize = ()=>{ fitCanvas(); restoreDrawing(); });
}

/* ---------- Kalem paneli ---------- */
function buildTools(){
  const t = $("#tools");
  t.innerHTML = `<div class="t-label">Fosforlu</div>`;
  HL_COLORS.forEach(h=>{
    const p = el("div","pen hl");
    p.innerHTML = `<div class="swatch" style="background:${h.c}"></div>`;
    p.title = h.name+" fosforlu kalem";
    p.onclick=()=>selectTool("hl",h.c,20,p);
    t.appendChild(p);
  });
  t.appendChild(el("div","tool-sep"));
  const lbl2 = el("div","t-label","Kalem"); t.appendChild(lbl2);
  PEN_COLORS.forEach(pn=>{
    const p = el("div","pen");
    p.innerHTML = `<div class="swatch" style="background:${pn.c}"></div>`;
    p.title = pn.name+" kalem";
    p.onclick=()=>selectTool("pen",pn.c,3,p);
    t.appendChild(p);
  });
  t.appendChild(el("div","tool-sep"));
  const eraser = el("div","pen");
  eraser.innerHTML=`<div class="ic">🧽</div>`; eraser.title="Silgi";
  eraser.onclick=()=>selectTool("eraser","#000",26,eraser);
  t.appendChild(eraser);

  const clear = el("div","pen");
  clear.innerHTML=`<div class="ic">🗑</div>`; clear.title="Sayfayı temizle";
  clear.onclick=()=>{
    if(Reader.ctx){ Reader.ctx.clearRect(0,0,Reader.canvas.width,Reader.canvas.height); saveDrawing(); toast("Sayfadaki çizimler silindi."); }
  };
  t.appendChild(clear);

  t.appendChild(el("div","tool-sep"));
  const sizeWrap = el("div","size-wrap");
  sizeWrap.innerHTML=`<div class="t-label">Kalınlık</div><input type="range" min="2" max="34" value="18" id="penSize">`;
  t.appendChild(sizeWrap);
  $("#penSize",t).oninput=e=>{ Reader.tool.size=parseInt(e.target.value,10); };

  // varsayılan seçim: ilk fosforlu
  selectTool("hl", HL_COLORS[0].c, 20, t.querySelector(".pen.hl"));
}
function selectTool(type,color,size,node){
  Reader.tool={type,color,size};
  const ps=$("#penSize"); if(ps) ps.value=size;
  $$(".pen").forEach(p=>p.classList.remove("active"));
  if(node) node.classList.add("active");
}

/* ---------- Sayfa gösterimi ---------- */
function renderPage(){
  const p = Reader.pages[Reader.idx];
  const inner = $("#pInner");
  const b = Reader.book;
  if(p.kind==="cover"){
    inner.innerHTML = `<div class="cover-page">
      <div class="big-glyph" style="color:${b.c2}">${b.icon}</div>
      <div class="cp-sub">Ali Kerem Yayınları</div>
      <h2>${escapeHtml(b.title)}</h2>
      <div class="cp-sub">${escapeHtml(b.subject)} • ${b.type==="kademeli"?"Kademeli Soru Bankası":"Kompile LGS"}</div>
      <div class="cp-meta">${escapeHtml(b.desc)}</div>
      <div class="cp-meta">Sayfayı ilerletmek için sağdaki oku ya da alttaki oku kullan →</div>
    </div>`;
  } else if(p.kind==="tier"){
    const col = TIER_COLORS[p.sec.tier]||"#b45309";
    inner.innerHTML = `<div class="tier-intro">
      <div class="ti-num">${p.si+1}</div>
      <span class="tier-badge" style="background:${col}">${escapeHtml(p.sec.tier)}</span>
      <div class="cp-sub">${p.sec.questions.length} soru</div>
      <div class="cp-meta" style="max-width:420px">${tierDesc(p.sec.tier)}</div>
    </div>`;
  } else if(p.kind==="q"){
    const col = TIER_COLORS[p.sec.tier]||"#b45309";
    const opts = p.q.options.map((o,i)=>`
      <li class="opt" data-i="${i}"><span class="lt">${String.fromCharCode(65+i)})</span><span>${escapeHtml(o)}</span></li>`).join("");
    inner.innerHTML = `
      <span class="tier-badge" style="background:${col}">${escapeHtml(p.sec.tier)}</span>
      <div class="q-no">Soru ${p.qi+1}</div>
      <div class="q-text">${escapeHtml(p.q.q)}</div>
      <ul class="opts">${opts}</ul>
      <button class="reveal-btn">Cevabı Göster</button>
      <div class="solbox"><b>Doğru cevap: ${String.fromCharCode(65+p.q.answer)}</b><br>${escapeHtml(p.q.sol)}</div>`;
    const optEls = $$(".opt",inner);
    let answered=false;
    optEls.forEach(o=>o.onclick=()=>{
      if(answered) return; answered=true;
      const i=parseInt(o.dataset.i,10);
      optEls.forEach(x=>{ const xi=parseInt(x.dataset.i,10);
        if(xi===p.q.answer) x.classList.add("correct");
        else if(xi===i) x.classList.add("wrong");
      });
      revealSol();
    });
    const revealSol=()=>$(".solbox",inner).classList.add("show");
    $(".reveal-btn",inner).onclick=()=>{
      optEls.forEach(x=>{ if(parseInt(x.dataset.i,10)===p.q.answer) x.classList.add("correct"); });
      revealSol(); answered=true;
    };
  } else if(p.kind==="end"){
    inner.innerHTML = `<div class="cover-page">
      <div class="big-glyph">✓</div>
      <h2>Kitabı bitirdin!</h2>
      <div class="cp-sub">${escapeHtml(b.title)}</div>
      <div class="cp-meta" style="max-width:420px">Tebrikler. Notlarını istediğin zaman soldaki defterden görebilir, çizimlerini tekrar açtığında bulabilirsin.</div>
      <button class="btn primary" onclick="Reader.idx=0;renderPage();fitCanvas();restoreDrawing();updatePager();">Başa dön</button>
    </div>`;
  }
  $("#pgNum").textContent = (Reader.idx>0 && Reader.idx<Reader.pages.length) ? Reader.idx : "";
  updatePager();
  // canvas'ı bu sayfaya göre hazırla
  fitCanvas();
  restoreDrawing();
}
function tierDesc(t){
  return ({
    "Kolay Test":"Temel kavramları pekiştiren giriş seviyesi sorular. Isınma turu!",
    "Orta Test":"Biraz daha düşündüren, konuyu ilişkilendiren sorular.",
    "Zor Test":"İşlem ve yorum gücünü zorlayan üst seviye sorular.",
    "LGS Tipi":"Gerçek sınav mantığında, beceri temelli LGS soruları.",
    "LGS Zoru":"Tamamı LGS zorluğunda, sınav provası niteliğinde derleme.",
  })[t] || "";
}
function updatePager(){
  $("#pgInfo").textContent = `Sayfa ${Reader.idx+1} / ${Reader.pages.length}`;
  $("#pgSlider").value = Reader.idx;
  $("#prevPg").disabled = Reader.idx===0;
  $("#firstPg").disabled = Reader.idx===0;
  $("#nextPg").disabled = Reader.idx===Reader.pages.length-1;
  $("#lastPg").disabled = Reader.idx===Reader.pages.length-1;
}
function goto(i){
  if(i<0||i>=Reader.pages.length) return;
  saveDrawing();
  Reader.idx=i;
  localStorage.setItem(progKey(), String(i));
  renderPage();
}

/* ---------- Çizim (canvas) ---------- */
function setupCanvas(){
  const c = $("#drawCanvas");
  Reader.canvas=c; Reader.ctx=c.getContext("2d");
  const pos = e=>{
    const r=c.getBoundingClientRect();
    const cx=(e.touches?e.touches[0].clientX:e.clientX)-r.left;
    const cy=(e.touches?e.touches[0].clientY:e.clientY)-r.top;
    return {x:cx*(c.width/r.width), y:cy*(c.height/r.height)};
  };
  const start=e=>{ Reader.drawing=true; Reader.last=pos(e); e.preventDefault(); };
  const move=e=>{ if(!Reader.drawing)return; const p=pos(e); stroke(Reader.last,p); Reader.last=p; e.preventDefault(); };
  const end=()=>{ if(Reader.drawing){ Reader.drawing=false; saveDrawing(); } };
  c.addEventListener("mousedown",start); c.addEventListener("mousemove",move);
  window.addEventListener("mouseup",end);
  c.addEventListener("touchstart",start,{passive:false});
  c.addEventListener("touchmove",move,{passive:false});
  c.addEventListener("touchend",end);
}
function fitCanvas(){
  const c=Reader.canvas, paper=$("#paper");
  if(!c||!paper) return;
  const w=paper.clientWidth, h=paper.clientHeight;
  // içerik korunması için mevcut çizimi geçici sakla
  c.width=w; c.height=h;
}
function stroke(a,b){
  const ctx=Reader.ctx, t=Reader.tool;
  ctx.lineJoin="round"; ctx.lineCap="round";
  if(t.type==="eraser"){
    ctx.globalCompositeOperation="destination-out";
    ctx.lineWidth=t.size; ctx.strokeStyle="rgba(0,0,0,1)";
  } else if(t.type==="hl"){
    ctx.globalCompositeOperation="source-over";
    ctx.lineWidth=t.size; ctx.strokeStyle=t.color; ctx.lineCap="round";
  } else {
    ctx.globalCompositeOperation="source-over";
    ctx.lineWidth=t.size; ctx.strokeStyle=t.color;
  }
  ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
  ctx.globalCompositeOperation="source-over";
}
function saveDrawing(){
  if(!Reader.canvas||!Reader.book) return;
  try{
    const blank = isCanvasBlank(Reader.canvas);
    const key = drawKey(Reader.idx);
    if(blank){ localStorage.removeItem(key); }
    else { localStorage.setItem(key, Reader.canvas.toDataURL("image/png")); }
  }catch(e){}
}
function restoreDrawing(){
  const c=Reader.canvas, ctx=Reader.ctx;
  if(!c) return;
  ctx.clearRect(0,0,c.width,c.height);
  const data = localStorage.getItem(drawKey(Reader.idx));
  if(!data) return;
  const img=new Image();
  img.onload=()=>ctx.drawImage(img,0,0,c.width,c.height);
  img.src=data;
}
function isCanvasBlank(c){
  const ctx=c.getContext("2d");
  const d=ctx.getImageData(0,0,c.width,c.height).data;
  for(let i=3;i<d.length;i+=4){ if(d[i]!==0) return false; }
  return true;
}

/* ---------- İndir / Yazdır ---------- */
function bookToPlainHTML(){
  const b=Reader.book;
  let html = `<h1>${escapeHtml(b.title)}</h1><p><i>Ali Kerem Yayınları — ${escapeHtml(b.subject)}</i></p>`;
  b.sections.forEach(sec=>{
    html += `<h2>${escapeHtml(sec.tier)}</h2>`;
    sec.questions.forEach((q,i)=>{
      html += `<div style="margin:14px 0"><b>${i+1}) ${escapeHtml(q.q)}</b><ol type="A">`;
      q.options.forEach(o=> html+=`<li>${escapeHtml(o)}</li>`);
      html += `</ol><div style="color:#b45309"><b>Cevap: ${String.fromCharCode(65+q.answer)}</b> — ${escapeHtml(q.sol)}</div></div>`;
    });
  });
  // not defteri
  const notes = localStorage.getItem(noteKey());
  if(notes && notes.trim()){
    html += `<h2>Notlarım</h2><pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(notes)}</pre>`;
  }
  return html;
}
function downloadBook(){
  const b=Reader.book;
  const doc = `<!doctype html><html lang="tr"><head><meta charset="utf-8">
<title>${escapeHtml(b.title)}</title>
<style>body{font-family:Segoe UI,Arial,sans-serif;max-width:760px;margin:32px auto;padding:0 20px;color:#1f2937;line-height:1.6}
h1{color:#b45309}h2{border-bottom:2px solid #f59e0b;padding-bottom:4px;margin-top:28px}ol{margin:6px 0}</style>
</head><body>${bookToPlainHTML()}</body></html>`;
  const blob=new Blob([doc],{type:"text/html;charset=utf-8"});
  const a=el("a");
  a.href=URL.createObjectURL(blob);
  a.download = b.title.replace(/[^\wğüşiöçĞÜŞİÖÇ ]/gi,"").trim()+".html";
  document.body.appendChild(a); a.click(); a.remove();
  toast("Kitap indiriliyor ⬇","ok");
}
function printBook(){
  const area = $("#print-area");
  area.innerHTML = bookToPlainHTML();
  area.style.display="block";
  window.print();
  setTimeout(()=>{ area.style.display="none"; area.innerHTML=""; }, 400);
}
