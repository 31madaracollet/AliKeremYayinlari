# Ali Kerem Yayınları — Dijital LGS Soru Bankası

Sade ve şık, tamamen tarayıcıda çalışan bir dijital kitap / soru bankası sitesi.

## Özellikler
- **Hesap sistemi:** Kayıt / giriş. Her yeni üyeye **10 jeton**. `Ali Kerem` kullanıcısı **sınırsız** (test için).
- **Jeton ile satın alma:** Kitaplar site jetonuyla alınır; satın alınmış mı kontrol edilir. Tümü tarayıcı hafızasında kalıcı (localStorage).
- **Her dersten iki kitap:** biri **Kademeli** (Kolay → Orta → Zor → LGS Tipi), diğeri **Kompile** (tamamı LGS zorluğunda).
  - Dersler: Matematik, Türkçe, Fen Bilimleri, İnkılap Tarihi, Din Kültürü, İngilizce.
- **Dijital okuyucu:**
  - Ortada gerçek kitap görünümlü sayfa, altta **sayfa ilerletme**.
  - **Sağ panelde** fosforlu kalemler + normal kalemler + silgi + kalınlık ayarı (üzerini çizme).
  - **Sol panelde** kalıcı **not defteri**.
  - Üstte, dikkat dağıtmamak için **fareyle üstüne gelince** (veya dokununca) açılan **İndir** ve **Yazdır** butonları.
  - Çizimler, notlar ve kaldığın sayfa hafızada kalıcı olarak saklanır.
- Görsellerde yapay zeka resmi yok; her şey **geometrik semboller ve şekillerle** çizildi.

## Çalıştırma
```bash
python3 -m http.server 8080 --bind 0.0.0.0
```
Ardından tarayıcıdan siteyi aç.

## Yapı
- `index.html` — giriş noktası
- `assets/css/styles.css` — tasarım
- `assets/js/data.js` — kitaplar ve soru bankası içeriği
- `assets/js/app.js` — hesap, mağaza, okuyucu, kalemler, not defteri
