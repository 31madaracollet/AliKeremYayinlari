# Ali Kerem Yayınları

LGS'ye hazırlanan öğrenciler için **dijital kitap okuma ve soru bankası** platformu.
Kitaplar site içinde okunur; okurken altı çizilir, kenara not alınır, konu sonu testleri
çözülür ve tüm ilerleme hesaba kaydedilir.

---

## Hızlı başlangıç

```bash
npm install
npm run seed      # demo hesabı + örnek çalışma verisi
npm run dev       # API :8787 + arayüz :3000
```

Tarayıcıda **http://localhost:3000** → `demo` / `demo1234`

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | API ve arayüzü birlikte geliştirme modunda çalıştırır |
| `npm run build` | Tip kontrolü + üretim derlemesi (`dist/`) |
| `npm start` | Üretim: Express hem API'yi hem `dist/`i sunar |
| `npm run seed` | Demo hesabı oluşturur (veri varsa dokunmaz) |
| `npm run seed -- --reset` | Demo hesabının verisini silip örnek içeriği yeniden kurar |
| `npm run seed:data` | Örnek işaretlemeleri kitap metninden yeniden hesaplar |
| `npm run smoke` | Tüm sayfaları/soruları sunucu tarafında render edip doğrular |

---

## Okuyucu düzeni

```
┌──────────┬───────────────────────────┬──────────────┐
│ NOT      │                           │  ARAÇ        │
│ DEFTERİ  │        K İ T A P          │  PANELİ      │
│ (sol)    │        (orta)             │  (sağ)       │
│          │                           │              │
│          ├───────────────────────────┤  kalemler    │
│          │  ‹ önceki   4/14   sonraki ›              │
└──────────┴───────────────────────────┴──────────────┘
```

* **Orta** — gerçek kağıt dokusunda kitap sayfası, sayfa çevirme animasyonlu.
* **Alt** — sayfa ilerletme çubuğu, bölüm göstergesi, yer imi.
* **Sol** — not defteri. Yazdıkça (650 ms gecikmeli) sunucuya kaydedilir, kalıcıdır.
* **Sağ** — araç paneli: fosforlu kalemler, altı çizme, serbest kalem, silgi,
  yazı boyu / satır aralığı / sayfa genişliği, kağıt–sepya–gece teması.

### Araçlar

| Araç | Davranış |
| --- | --- |
| Fosforlu | Metni seçince 5 renkte üzerini boyar; üst üste gelen işaretler parçalanarak birleşir |
| Altı çizili | Aynı seçim modeli, ince alt çizgi |
| Kalem | Sayfanın üzerine serbest çizim (SVG, sayfa genişliğine göre normalize) |
| İşaretleyici | Kalın ve yarı saydam serbest çizim |
| Silgi | Çizgiye veya renkli metne dokununca siler |

Klavye: `← →` sayfa, `1-5` araç seçimi, `N` not defteri, `T` araç paneli, `Esc` kapat.

---

## Soru bankası

* **Kitap içi testler** — her ünitenin sonunda konu testi.
* **Ayrı bölüm** (`/soru-bankasi`) — 4 adımda deneme kur: ders → konular → zorluk → soru sayısı.
* **İstatistik** (`/istatistik`) — net ortalaması, ders bazlı başarı, okuma ilerlemesi,
  son denemeler, zayıf/güçlü konular.

Net hesabı: `doğru − yanlış / 3`

---

## İçerik

6 ders, 76 sayfa, 148 soru — hepsi `src/content/` altında düz TypeScript:

| Ders | Kitap id | Soru |
| --- | --- | --- |
| Türkçe | `turkce-8` | `tur-001…028` |
| Matematik | `matematik-8` | `mat-001…030` |
| Fen Bilimleri | `fen-8` | `fen-001…028` |
| T.C. İnkılap Tarihi | `inkilap-8` | `ink-001…024` |
| Din Kültürü | `din-8` | `din-001…018` |
| İngilizce | `ingilizce-8` | `eng-001…020` |

### Yeni kitap eklemek

1. `src/content/books/<ders>.ts` içinde `Book` nesnesini genişletin veya yenisini yazın.
2. `src/content/index.ts` içindeki `BOOKS` dizisine ekleyin.
3. `npm run smoke` ile doğrulayın (benzersiz id, 4 şık, geçerli cevap, çözüm zorunlu).

Soru şeması: 4 seçenek (A–D), `answer` 0–3, `difficulty` 1|2|3, opsiyonel `passage`,
zorunlu `explanation`. Matematik gösterimi Unicode ile yazılır (`²`, `√`, `≤`, `π` …).

Başka bir sınav/seviye eklemek için `subjects.ts` ve `Book` kayıtlarına yeni ders/kademe
tanımlamak yeterli — soru bankası ve istatistikler ders id'si üzerinden çalışır.

---

## Mimari

```
server/        Express 5 + better-sqlite3  (düz JS, ESM)
  db.js        şema: users sessions notes marks strokes progress bookmarks attempts settings
  auth.js      scrypt parola + oturum belirteci
  index.js     REST API
  seed.js      demo hesabı ve örnek veri
src/
  content/     kitaplar ve sorular (veri)
  components/  okuyucu parçaları (PenLayer, Notebook, ToolPanel, QuizRunner …)
  pages/       Reader Home Library Bank Stats Login
  lib/         api istemcisi, oturum, araç tercihleri, metin seçimi
scripts/       smoke.tsx (SSR doğrulama), make-seed.tsx (örnek veri üretici)
```

**Yığın:** Vite 5 · React 19 · TypeScript · Tailwind 3.4 / Express 5 · SQLite (WAL)

**Kimlik doğrulama:** scrypt ile parola, `Authorization: Bearer <token>`,
belirteç tarayıcıda `localStorage["aky.token"]`.

**İstemci → sunucu:** tarayıcı yalnızca göreli `/api/...` çağırır; geliştirmede Vite
bunu `127.0.0.1:8787`e proxy'ler, üretimde aynı Express süreci yanıtlar.

### İşaretleme modeli

```ts
{ bookId, pageId, anchorId, start, end, style, color, quote, note }
```

Ofsetler `data-anchor` taşıyan bloğun düz metnine göre tutulur; bu yüzden yazı boyu,
tema veya pencere genişliği değişse de işaretler yerinde kalır.

### Veritabanı

`data/akyayin.db` (SQLite, WAL). Depoya dahil değildir; ilk çalıştırmada oluşur.
`DB_PATH` ortam değişkeniyle taşınabilir.

### Ortam değişkenleri

| Değişken | Varsayılan | Açıklama |
| --- | --- | --- |
| `PORT` | `8787` | API portu |
| `API_HOST` | üretimde `0.0.0.0`, aksi `127.0.0.1` | API dinleme adresi |
| `DB_PATH` | `data/akyayin.db` | SQLite dosyası |

---

## Test

Sandbox'ta tarayıcı indirilemediği için uçtan uca test yerine **SSR duman testi**
kullanılıyor: `scripts/smoke.tsx` bütün rotaları, 76 sayfanın 290 bloğunu, 6 kapağı,
9 şekli ve 148 sorunun bütünlüğünü sunucu tarafında render edip doğrular.

```bash
npm run smoke
```
