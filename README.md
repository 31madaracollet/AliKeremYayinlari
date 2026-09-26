# Ali Kerem Yayınları — LGS Dijital Soru Bankası

Gerçek kitap deneyimi sunan, tarayıcıda çalışan dijital soru bankası sitesi.

## Özellikler

- **Hesap sistemi:** Kayıt ol / giriş yap (kalıcı, localStorage). Kayıt olanlara **10 jeton** hediye. Test hesabı **AliKerem / alikerem** → sınırsız jeton.
- **Jetonla satın alma:** Kitaplar jetonla alınır; satın alınan kitaplar hesapta kalıcı saklanır.
- **13 kitap, 156 soru:** Türkçe, Matematik, Fen Bilimleri, T.C. İnkılap Tarihi ve Atatürkçülük, Din Kültürü ve Ahlak Bilgisi, İngilizce — her dersten **2 kitap** (Kademeli + Kompile LGS) ve 1 adet **Genel Deneme**.
- **Zorluk sırası:** Kolay → Orta → Zor → LGS Tipi (etkinlik yok, tamamı test).
- **Okuyucu:**
  - Ortada gerçek kitap görünümlü sayfalar (kapak, içindekiler, sorular, cevap anahtarı)
  - Altta sayfa ilerletme (oklar, ilerleme çubuğu, Kapak/İçindekiler/Sorular/Cevaplar kısayolları)
  - Sağda kalem paneli: kurşun kalem, tükenmez kalem, fosforlu kalem, silgi + renk ve uç kalınlığı — çizimler sayfa bazında **kalıcı**
  - Solda not defteri: otomatik kayıt, kalıcı
- **İndir / Yazdır:** Dikkat dağıtmaması için gizli — fareyle ekranın üst kenarına gelince (veya üstteki tutamağa tıklayınca) açılır.

## Çalıştırma

Statik bir sitedir; herhangi bir sunucuyla açın:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Dosyalar

| Dosya | Açıklama |
|---|---|
| `index.html` | Giriş ve uygulama iskeleti |
| `assets/data.js` | Dersler, kitaplar ve sorular |
| `assets/app.js` | Giriş, jeton, mağaza, okuyucu, çizim, not, yazdırma |
| `assets/style.css` | Arayüz ve yazdırma stilleri |
| `test/smoke.js` | İçerik/mantık duman testi (`node test/smoke.js`) |
