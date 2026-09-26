import type { Book, Question } from '../types'

export const questions: Question[] = [
  {
    id: 'mat-001', subjectId: 'matematik', topic: 'Çarpanlar ve Katlar', difficulty: 1,
    stem: '360 sayısının pozitif tam sayı bölen sayısı kaçtır?',
    options: ['18', '20', '24', '26'],
    answer: 2,
    explanation: '360 = 2³ · 3² · 5¹ olarak asal çarpanlarına ayrılır. Bölen sayısı (3+1)·(2+1)·(1+1) = 4·3·2 = 24’tür.',
  },
  {
    id: 'mat-002', subjectId: 'matematik', topic: 'Çarpanlar ve Katlar', difficulty: 2,
    stem: '12 ve 18 sayılarının EBOB’u ile EKOK’unun toplamı kaçtır?',
    options: ['36', '42', '48', '30'],
    answer: 1,
    explanation: '12 = 2²·3, 18 = 2·3². EBOB = 2·3 = 6, EKOK = 2²·3² = 36. Toplam 6 + 36 = 42’dir.',
  },
  {
    id: 'mat-003', subjectId: 'matematik', topic: 'Çarpanlar ve Katlar', difficulty: 3,
    stem: 'Boyutları 48 cm ve 60 cm olan dikdörtgen bir kartondan, hiç artık kalmayacak biçimde en büyük eş kareler kesilecektir. Kaç kare elde edilir?',
    options: ['15', '20', '24', '30'],
    answer: 1,
    explanation: 'Kare kenarı EBOB(48, 60) = 12 cm olmalıdır. Kısa kenarda 48/12 = 4, uzun kenarda 60/12 = 5 kare vardır: 4 · 5 = 20 kare.',
  },
  {
    id: 'mat-004', subjectId: 'matematik', topic: 'Üslü İfadeler', difficulty: 1,
    stem: '(2³ · 2⁴) ÷ 2⁵ işleminin sonucu kaçtır?',
    options: ['2', '4', '8', '16'],
    answer: 1,
    explanation: 'Tabanlar eşit olduğu için üsler toplanır ve çıkarılır: 2^(3+4−5) = 2² = 4.',
  },
  {
    id: 'mat-005', subjectId: 'matematik', topic: 'Üslü İfadeler', difficulty: 2,
    stem: '(−3)⁻² işleminin sonucu kaçtır?',
    options: ['−9', '−1/9', '1/9', '9'],
    answer: 2,
    explanation: 'Negatif üs, sayının çarpmaya göre tersini alır: (−3)⁻² = 1/(−3)² = 1/9. Üs çift olduğu için sonuç pozitiftir.',
  },
  {
    id: 'mat-006', subjectId: 'matematik', topic: 'Üslü İfadeler', difficulty: 2,
    stem: '0,00042 sayısının bilimsel gösterimi aşağıdakilerden hangisidir?',
    options: ['42 × 10⁻⁵', '4,2 × 10⁻⁴', '4,2 × 10⁴', '0,42 × 10⁻³'],
    answer: 1,
    explanation: 'Bilimsel gösterimde katsayı 1 ile 10 arasında olmalıdır. Virgül 4 basamak sağa kaydırıldığından 4,2 × 10⁻⁴ yazılır.',
  },
  {
    id: 'mat-007', subjectId: 'matematik', topic: 'Kareköklü İfadeler', difficulty: 1,
    stem: '√48 ifadesinin en sade biçimi hangisidir?',
    options: ['2√12', '4√3', '3√4', '6√2'],
    answer: 1,
    explanation: '48 = 16 · 3 olduğundan √48 = √16 · √3 = 4√3 bulunur.',
  },
  {
    id: 'mat-008', subjectId: 'matematik', topic: 'Kareköklü İfadeler', difficulty: 2,
    stem: '√12 + √27 − √3 işleminin sonucu kaçtır?',
    options: ['4√3', '5√3', '6√3', '2√3'],
    answer: 0,
    explanation: '√12 = 2√3, √27 = 3√3 olur. 2√3 + 3√3 − √3 = 4√3 bulunur.',
  },
  {
    id: 'mat-009', subjectId: 'matematik', topic: 'Kareköklü İfadeler', difficulty: 3,
    stem: '√5 sayısı hangi iki ardışık tam sayı arasındadır?',
    options: ['1 ile 2', '2 ile 3', '3 ile 4', '4 ile 5'],
    answer: 1,
    explanation: '2² = 4 ve 3² = 9’dur. 4 < 5 < 9 olduğundan 2 < √5 < 3’tür.',
  },
  {
    id: 'mat-010', subjectId: 'matematik', topic: 'Cebirsel İfadeler', difficulty: 1,
    stem: '(x + 5)² açılımı aşağıdakilerden hangisidir?',
    options: ['x² + 25', 'x² + 5x + 25', 'x² + 10x + 25', 'x² + 10x + 10'],
    answer: 2,
    explanation: 'Tam kare özdeşliği: (a + b)² = a² + 2ab + b². Burada a = x, b = 5 → x² + 10x + 25.',
  },
  {
    id: 'mat-011', subjectId: 'matematik', topic: 'Cebirsel İfadeler', difficulty: 2,
    stem: 'x² − 49 ifadesinin çarpanlara ayrılmış biçimi hangisidir?',
    options: ['(x − 7)²', '(x + 7)²', '(x − 7)(x + 7)', 'x(x − 49)'],
    answer: 2,
    explanation: 'İki kare farkı özdeşliği: a² − b² = (a − b)(a + b). Burada a = x, b = 7’dir.',
  },
  {
    id: 'mat-012', subjectId: 'matematik', topic: 'Cebirsel İfadeler', difficulty: 3,
    stem: 'a + b = 7 ve a · b = 10 ise a² + b² kaçtır?',
    options: ['29', '39', '49', '19'],
    answer: 0,
    explanation: '(a + b)² = a² + 2ab + b² olduğundan 49 = a² + b² + 2·10 → a² + b² = 49 − 20 = 29.',
  },
  {
    id: 'mat-013', subjectId: 'matematik', topic: 'Doğrusal Denklemler', difficulty: 1,
    stem: '3x − 7 = 14 denkleminin çözümü kaçtır?',
    options: ['5', '6', '7', '8'],
    answer: 2,
    explanation: 'Her iki tarafa 7 eklenir: 3x = 21. İki taraf 3’e bölünür: x = 7.',
  },
  {
    id: 'mat-014', subjectId: 'matematik', topic: 'Doğrusal Denklemler', difficulty: 2,
    stem: 'A(0, 3) ve B(2, 7) noktalarından geçen doğrunun eğimi kaçtır?',
    options: ['1', '2', '3', '4'],
    answer: 1,
    explanation: 'Eğim m = (y₂ − y₁)/(x₂ − x₁) = (7 − 3)/(2 − 0) = 4/2 = 2’dir.',
  },
  {
    id: 'mat-015', subjectId: 'matematik', topic: 'Doğrusal Denklemler', difficulty: 3,
    stem: 'Bir taksi 5 TL açılış ücreti ve kilometre başına 3 TL almaktadır. Ödenen ücret 41 TL ise kaç kilometre yol alınmıştır?',
    options: ['10', '11', '12', '14'],
    answer: 2,
    explanation: 'Ücret modeli y = 3x + 5’tir. 41 = 3x + 5 → 3x = 36 → x = 12 km.',
  },
  {
    id: 'mat-016', subjectId: 'matematik', topic: 'Eşitsizlikler', difficulty: 2,
    stem: '−2x + 5 ≤ 11 eşitsizliğinin çözüm kümesi hangisidir?',
    options: ['x ≤ −3', 'x ≥ −3', 'x ≤ 3', 'x ≥ 3'],
    answer: 1,
    explanation: '−2x ≤ 6 elde edilir. Negatif sayıya bölerken eşitsizlik yön değiştirir: x ≥ −3.',
  },
  {
    id: 'mat-017', subjectId: 'matematik', topic: 'Eşitsizlikler', difficulty: 3,
    stem: 'Bir asansöre en fazla 480 kg yüklenebilmektedir. 60 kg’lık bir görevliyle birlikte, her biri 35 kg olan kutulardan en fazla kaç tanesi taşınabilir?',
    options: ['11', '12', '13', '14'],
    answer: 1,
    explanation: '35x + 60 ≤ 480 → 35x ≤ 420 → x ≤ 12. En fazla 12 kutu taşınabilir.',
  },
  {
    id: 'mat-018', subjectId: 'matematik', topic: 'Üçgenler', difficulty: 1,
    stem: 'Bir dik üçgende dik kenarlar 6 cm ve 8 cm ise hipotenüs kaç cm’dir?',
    options: ['9', '10', '12', '14'],
    answer: 1,
    explanation: 'Pisagor bağıntısı: 6² + 8² = 36 + 64 = 100. Hipotenüs √100 = 10 cm’dir.',
  },
  {
    id: 'mat-019', subjectId: 'matematik', topic: 'Üçgenler', difficulty: 2,
    stem: 'Bir üçgenin iki kenarı 7 cm ve 10 cm ise üçüncü kenar kaç farklı tam sayı değeri alabilir?',
    options: ['11', '12', '13', '14'],
    answer: 2,
    explanation: 'Üçgen eşitsizliği: 10 − 7 < x < 10 + 7 yani 3 < x < 17. x, 4’ten 16’ya kadar 13 farklı tam sayı olabilir.',
  },
  {
    id: 'mat-020', subjectId: 'matematik', topic: 'Üçgenler', difficulty: 3,
    stem: 'Bir üçgenin açıları 3, 4 ve 5 sayılarıyla doğru orantılıdır. En büyük açı kaç derecedir?',
    options: ['60°', '65°', '70°', '75°'],
    answer: 3,
    explanation: 'Açılar toplamı 180°’dir. 3k + 4k + 5k = 12k = 180 → k = 15. En büyük açı 5k = 75°’dir.',
  },
  {
    id: 'mat-021', subjectId: 'matematik', topic: 'Eşlik ve Benzerlik', difficulty: 2,
    stem: 'Benzerlik oranı 2/3 olan iki üçgenin alanları oranı kaçtır?',
    options: ['2/3', '4/9', '8/27', '3/2'],
    answer: 1,
    explanation: 'Benzer şekillerde alanlar oranı, benzerlik oranının karesidir: (2/3)² = 4/9.',
  },
  {
    id: 'mat-022', subjectId: 'matematik', topic: 'Dönüşüm Geometrisi', difficulty: 2,
    stem: 'A(3, −2) noktasının y eksenine göre simetriği hangisidir?',
    options: ['(−3, −2)', '(3, 2)', '(−3, 2)', '(2, −3)'],
    answer: 0,
    explanation: 'y eksenine göre simetride x işaret değiştirir, y aynı kalır: (3, −2) → (−3, −2).',
  },
  {
    id: 'mat-023', subjectId: 'matematik', topic: 'Dönüşüm Geometrisi', difficulty: 3,
    stem: 'B(1, 4) noktası orijin etrafında saat yönünün tersine 90° döndürülürse görüntüsü hangisi olur?',
    options: ['(4, 1)', '(−4, 1)', '(4, −1)', '(−1, −4)'],
    answer: 1,
    explanation: 'Orijin etrafında pozitif yönde 90° dönmede (x, y) → (−y, x) olur: (1, 4) → (−4, 1).',
  },
  {
    id: 'mat-024', subjectId: 'matematik', topic: 'Geometrik Cisimler', difficulty: 2,
    stem: 'Taban yarıçapı 3 cm, yüksekliği 10 cm olan silindirin hacmi kaç π cm³’tür?',
    options: ['30π', '60π', '90π', '120π'],
    answer: 2,
    explanation: 'Silindirin hacmi V = π·r²·h = π·9·10 = 90π cm³’tür.',
  },
  {
    id: 'mat-025', subjectId: 'matematik', topic: 'Geometrik Cisimler', difficulty: 3,
    stem: 'Taban yarıçapı 4 cm, yüksekliği 5 cm olan silindirin yanal alanı kaç π cm²’dir?',
    options: ['20π', '30π', '40π', '80π'],
    answer: 2,
    explanation: 'Yanal alan = 2·π·r·h = 2·π·4·5 = 40π cm²’dir.',
  },
  {
    id: 'mat-026', subjectId: 'matematik', topic: 'Veri Analizi', difficulty: 1,
    stem: '4, 7, 9, 10, 15 veri grubunun aritmetik ortalaması kaçtır?',
    options: ['8', '9', '10', '11'],
    answer: 1,
    explanation: 'Toplam 4+7+9+10+15 = 45, veri sayısı 5’tir. Ortalama 45/5 = 9’dur.',
  },
  {
    id: 'mat-027', subjectId: 'matematik', topic: 'Veri Analizi', difficulty: 2,
    stem: '3, 8, 8, 12, 14, 20 veri grubunun ortancası (medyan) kaçtır?',
    options: ['8', '10', '11', '12'],
    answer: 1,
    explanation: 'Veri sayısı çift olduğu için ortadaki iki değerin ortalaması alınır: (8 + 12)/2 = 10.',
  },
  {
    id: 'mat-028', subjectId: 'matematik', topic: 'Olasılık', difficulty: 1,
    stem: 'Bir torbada 4 kırmızı, 6 mavi bilye vardır. Rastgele çekilen bir bilyenin mavi olma olasılığı kaçtır?',
    options: ['2/5', '3/5', '1/2', '4/10'],
    answer: 1,
    explanation: 'Toplam 10 bilye vardır. İstenen durum 6 mavi olduğundan olasılık 6/10 = 3/5’tir.',
  },
  {
    id: 'mat-029', subjectId: 'matematik', topic: 'Olasılık', difficulty: 3,
    stem: 'Bir zar iki kez atılıyor. Üste gelen sayıların toplamının 7 olma olasılığı kaçtır?',
    options: ['1/6', '1/9', '5/36', '7/36'],
    answer: 0,
    explanation: 'Toplam 36 durum vardır. Toplamı 7 yapan çiftler: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) → 6 durum. Olasılık 6/36 = 1/6’dır.',
  },
  {
    id: 'mat-030', subjectId: 'matematik', topic: 'Çarpanlar ve Katlar', difficulty: 2,
    stem: 'İki sayının EBOB’u 8, EKOK’u 96’dır. Sayılardan biri 24 ise diğeri kaçtır?',
    options: ['16', '32', '48', '12'],
    answer: 1,
    explanation: 'İki sayı için a · b = EBOB · EKOK bağıntısı geçerlidir: 24 · b = 8 · 96 = 768 → b = 32.',
  },
]

export const book: Book = {
  id: 'matematik-8',
  subjectId: 'matematik',
  title: 'Matematik 8 — Kurgu ve Çözüm',
  subtitle: 'LGS Yeni Nesil Konu Anlatımı',
  author: 'Ali Kerem Yayınları Matematik Kurulu',
  edition: '1. Baskı',
  year: 2026,
  blurb:
    'Ezber değil kurgu. Her konu; tanım, görsel model, çözümlü örnek ve yeni nesil soru mantığıyla birlikte veriliyor.',
  chapters: [
    {
      id: 'mat-u1',
      title: '1. Ünite — Sayılar ve İşlemler',
      pages: [
        {
          id: 'mat-u1-p1', kind: 'content',
          title: 'Çarpanlar ve Katlar',
          subtitle: 'Asal çarpanlar, EBOB ve EKOK',
          blocks: [
            { id: 'b1', type: 'p', text: 'Her doğal sayı, asal sayıların çarpımı biçiminde tek bir şekilde yazılabilir. Buna aritmetiğin temel teoremi denir ve bu ünitedeki her şey bu fikirden doğar.' },
            {
              id: 'b2', type: 'callout', variant: 'formul', title: 'Bölen sayısı',
              text: 'Bir sayı a = p₁^x · p₂^y · p₃^z biçiminde asal çarpanlarına ayrılmışsa, pozitif tam sayı bölen sayısı (x+1)·(y+1)·(z+1) formülüyle bulunur.',
            },
            {
              id: 'b3', type: 'example', title: 'Örnek 1',
              question: '180 sayısının kaç pozitif tam sayı böleni vardır?',
              solution: [
                '180’i asal çarpanlarına ayıralım: 180 = 2² · 3² · 5¹',
                'Üsleri birer artırıp çarpalım: (2+1) · (2+1) · (1+1)',
                '3 · 3 · 2 = 18. Cevap: 18 bölen.',
              ],
            },
            { id: 'b4', type: 'h3', text: 'EBOB ve EKOK' },
            {
              id: 'b5', type: 'table',
              headers: ['', 'EBOB', 'EKOK'],
              rows: [
                ['Ne demek?', 'En büyük ortak bölen', 'En küçük ortak kat'],
                ['Nasıl bulunur?', 'Ortak asal çarpanların en küçük üslüsü', 'Tüm asal çarpanların en büyük üslüsü'],
                ['Problem ipucu', 'Bölme, parçalama, en büyük eş parça', 'Birleşme, tekrar buluşma, en az sayıda'],
              ],
            },
            {
              id: 'b6', type: 'callout', variant: 'formul', title: 'Altın bağıntı',
              text: 'İki pozitif tam sayı için: a · b = EBOB(a, b) · EKOK(a, b). Bu bağıntı, LGS’de bir sayı verilip diğerinin sorulduğu sorularda saniyeler kazandırır.',
            },
            {
              id: 'b7', type: 'example', title: 'Örnek 2 — Problem kurgusu',
              question: 'Bir koşu pistinde Ali 4 dakikada, Kerem 6 dakikada bir tur atıyor. Aynı anda başladıklarına göre başlangıç noktasında ilk kez kaç dakika sonra buluşurlar?',
              solution: [
                '“İlk kez birlikte” ifadesi EKOK’u işaret eder.',
                '4 = 2², 6 = 2 · 3 → EKOK = 2² · 3 = 12',
                'İlk buluşma 12. dakikada olur. Ali 3, Kerem 2 tur atmış olur.',
              ],
            },
            {
              id: 'b8', type: 'callout', variant: 'dikkat', title: 'Aralarında asal',
              text: 'EBOB’u 1 olan sayılara aralarında asal denir. Ardışık iki tam sayı her zaman aralarında asaldır: EBOB(n, n+1) = 1.',
            },
          ],
        },
        {
          id: 'mat-u1-p2', kind: 'content',
          title: 'Üslü İfadeler',
          subtitle: 'Kuralları anlamak, ezberlemekten kolaydır',
          blocks: [
            {
              id: 'b1', type: 'table',
              caption: 'Üs kuralları',
              headers: ['Kural', 'Formül', 'Örnek'],
              rows: [
                ['Çarpma', 'aᵐ · aⁿ = aᵐ⁺ⁿ', '2³ · 2² = 2⁵ = 32'],
                ['Bölme', 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ', '5⁶ ÷ 5⁴ = 5² = 25'],
                ['Üssün üssü', '(aᵐ)ⁿ = aᵐ·ⁿ', '(3²)³ = 3⁶'],
                ['Negatif üs', 'a⁻ⁿ = 1/aⁿ', '2⁻³ = 1/8'],
                ['Sıfır üs', 'a⁰ = 1 (a ≠ 0)', '7⁰ = 1'],
                ['Çarpımın üssü', '(a·b)ⁿ = aⁿ · bⁿ', '(2·5)³ = 8 · 125'],
              ],
            },
            {
              id: 'b2', type: 'callout', variant: 'dikkat', title: 'İşaret tuzağı',
              text: '(−2)⁴ = 16 ama −2⁴ = −16’dır. Parantez varsa işaret de üsse dâhildir; yoksa üs yalnızca sayıya aittir. LGS’de en sık yapılan hata budur.',
            },
            { id: 'b3', type: 'h3', text: 'Bilimsel Gösterim' },
            { id: 'b4', type: 'p', text: 'Çok büyük ya da çok küçük sayıları a × 10ⁿ biçiminde yazmaya bilimsel gösterim denir. Burada 1 ≤ a < 10 olmalıdır. Güneş’in kütlesi 1,989 × 10³⁰ kg, bir virüsün çapı 1,2 × 10⁻⁷ m gibi.' },
            {
              id: 'b5', type: 'example', title: 'Örnek',
              question: '(3 × 10⁵) · (2 × 10⁻³) işleminin sonucunu bilimsel gösterimle yazın.',
              solution: [
                'Katsayıları çarpalım: 3 · 2 = 6',
                '10’un kuvvetlerini çarpalım: 10⁵ · 10⁻³ = 10²',
                'Sonuç: 6 × 10² = 600',
              ],
            },
          ],
        },
        {
          id: 'mat-u1-p3', kind: 'content',
          title: 'Kareköklü İfadeler',
          subtitle: 'Kökün içini sadeleştirme sanatı',
          blocks: [
            { id: 'b1', type: 'p', text: 'Karesi a olan pozitif sayıya a’nın karekökü denir ve √a ile gösterilir. Karekök içindeki sayıyı tam kare çarpanlarına ayırarak kökten çıkarmak, bu ünitenin temel becerisidir.' },
            {
              id: 'b2', type: 'callout', variant: 'formul', title: 'Temel kurallar',
              text: '√a · √b = √(a·b)   |   √a ÷ √b = √(a/b)   |   a√b + c√b = (a+c)√b   |   (√a)² = a',
            },
            {
              id: 'b3', type: 'example', title: 'Örnek 1',
              question: '√72 ifadesini sadeleştirin.',
              solution: [
                '72’nin en büyük tam kare çarpanını bulalım: 72 = 36 · 2',
                '√72 = √36 · √2',
                '= 6√2',
              ],
            },
            {
              id: 'b4', type: 'example', title: 'Örnek 2',
              question: '√8 + √18 − √32 işleminin sonucu nedir?',
              solution: [
                '√8 = 2√2, √18 = 3√2, √32 = 4√2',
                'Hepsi √2 cinsinden: 2√2 + 3√2 − 4√2',
                '= (2 + 3 − 4)√2 = √2',
              ],
            },
            {
              id: 'b5', type: 'callout', variant: 'ipucu', title: 'Sıralama soruları',
              text: 'Kareköklü sayıları sıralarken hepsini kök içine alın. Örneğin 3√2 = √18 ve 2√5 = √20 olduğundan 3√2 < 2√5’tir. Kök dışındaki sayıyı içeri alırken karesini almayı unutmayın.',
            },
            { id: 'b6', type: 'h3', text: 'Gerçek Sayılar' },
            { id: 'b7', type: 'p', text: 'Tam kare olmayan sayıların karekökleri irrasyoneldir; ondalık açılımları sonsuz ve devirsizdir. Rasyonel sayılarla irrasyonel sayıların birleşimi gerçek (reel) sayılar kümesini oluşturur.' },
          ],
        },
        {
          id: 'mat-u1-q', kind: 'quiz',
          title: '1. Ünite Değerlendirme Testi',
          subtitle: 'Sayılar ve İşlemler',
          intro: 'Asal çarpan, EBOB–EKOK, üs ve karekök konularından 9 soru.',
          questionIds: ['mat-001', 'mat-002', 'mat-003', 'mat-030', 'mat-004', 'mat-005', 'mat-006', 'mat-007', 'mat-008'],
        },
      ],
    },
    {
      id: 'mat-u2',
      title: '2. Ünite — Cebir',
      pages: [
        {
          id: 'mat-u2-p1', kind: 'content',
          title: 'Cebirsel İfadeler ve Özdeşlikler',
          subtitle: 'Üç özdeşlik, sayısız soru',
          blocks: [
            {
              id: 'b1', type: 'callout', variant: 'formul', title: 'Bilmeniz gereken üç özdeşlik',
              text: '(a + b)² = a² + 2ab + b²\n(a − b)² = a² − 2ab + b²\na² − b² = (a − b)(a + b)',
            },
            { id: 'b2', type: 'p', text: 'Bu üç özdeşlik, LGS matematik sorularının önemli bir bölümünün temelidir. Bunları yalnızca formül olarak değil, alan modeliyle görsel olarak da anlamak gerekir: (a+b)² bir karenin alanıdır; kenarı a+b olan kare, a², b² ve iki tane ab dikdörtgeninden oluşur.' },
            {
              id: 'b3', type: 'example', title: 'Örnek 1',
              question: 'a − b = 5 ve a · b = 6 ise a² + b² kaçtır?',
              solution: [
                '(a − b)² = a² − 2ab + b² özdeşliğini kullanalım.',
                '5² = a² + b² − 2·6',
                '25 = a² + b² − 12 → a² + b² = 37',
              ],
            },
            {
              id: 'b4', type: 'example', title: 'Örnek 2 — İşlem kolaylığı',
              question: '103 · 97 çarpımını özdeşlik kullanarak hesaplayın.',
              solution: [
                '103 = 100 + 3 ve 97 = 100 − 3 biçiminde yazalım.',
                '(100 + 3)(100 − 3) = 100² − 3²',
                '= 10000 − 9 = 9991',
              ],
            },
            { id: 'b5', type: 'h3', text: 'Çarpanlara Ayırma Yolları' },
            {
              id: 'b6', type: 'list', ordered: true,
              items: [
                'Ortak çarpan parantezine alma: 6x² + 9x = 3x(2x + 3)',
                'İki kare farkı: 4x² − 25 = (2x − 5)(2x + 5)',
                'Tam kare tanıma: x² + 8x + 16 = (x + 4)²',
                'Gruplandırma: ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y)',
              ],
            },
          ],
        },
        {
          id: 'mat-u2-p2', kind: 'content',
          title: 'Doğrusal Denklemler ve Eğim',
          subtitle: 'Grafiği okumak, denklemi yazmak',
          blocks: [
            { id: 'b1', type: 'p', text: 'Bir doğrunun denklemi y = mx + n biçimindedir. Burada m eğim, n ise doğrunun y eksenini kestiği noktanın ordinatıdır. LGS’de doğrusal ilişkiler çoğunlukla gerçek hayat modelleriyle (taksi ücreti, su deposu, abonelik) sorulur.' },
            { id: 'b2', type: 'figure', kind: 'koordinat', caption: 'y = 2x + 1 doğrusu: y eksenini 1’de keser, 1 birim sağa gidince 2 birim yukarı çıkar.' },
            {
              id: 'b3', type: 'callout', variant: 'formul', title: 'Eğim',
              text: 'İki noktadan geçen doğrunun eğimi: m = (y₂ − y₁) / (x₂ − x₁) = Δy / Δx = dikey değişim / yatay değişim',
            },
            {
              id: 'b4', type: 'list',
              items: [
                'm > 0 ise doğru soldan sağa yükselir (artan).',
                'm < 0 ise doğru soldan sağa alçalır (azalan).',
                'm = 0 ise doğru x eksenine paraleldir (y = sabit).',
                'x = sabit biçimindeki doğruların eğimi tanımsızdır (dikey doğru).',
                'Paralel doğruların eğimleri eşittir.',
              ],
            },
            {
              id: 'b5', type: 'example', title: 'Örnek — Gerçek hayat modeli',
              question: 'Bir su deposunda 200 litre su vardır ve dakikada 15 litre su boşalmaktadır. t dakika sonra depodaki su miktarını veren denklemi yazın ve depo ne zaman boşalır?',
              solution: [
                'Başlangıç değeri 200, dakikalık değişim −15’tir.',
                'Model: V = −15t + 200',
                'Depo boşaldığında V = 0 olur: 0 = −15t + 200 → t = 200/15 ≈ 13,3 dakika.',
              ],
            },
          ],
        },
        {
          id: 'mat-u2-p3', kind: 'content',
          title: 'Eşitsizlikler',
          subtitle: 'En fazla, en az, yeterli olur mu?',
          blocks: [
            { id: 'b1', type: 'p', text: 'Eşitsizlikler, denklemlerle aynı kurallarla çözülür; tek bir farkla: Her iki tarafı negatif bir sayıyla çarparken ya da bölerken eşitsizliğin yönü değişir.' },
            {
              id: 'b2', type: 'callout', variant: 'dikkat', title: 'Yön değiştirme kuralı',
              text: '−3x < 12 eşitsizliğinde her iki tarafı −3’e bölelim: x > −4. Dikkat, “<” işareti “>” oldu. Bu kuralı unutmak, doğru işlemle yanlış cevaba ulaşmanın en yaygın nedenidir.',
            },
            {
              id: 'b3', type: 'table',
              caption: 'Günlük dilden matematiksel dile',
              headers: ['İfade', 'Sembol'],
              rows: [
                ['en az, en azından', '≥'],
                ['en fazla, en çok, geçemez', '≤'],
                ['den büyük, aşar', '>'],
                ['den küçük, altında', '<'],
              ],
            },
            {
              id: 'b4', type: 'example', title: 'Örnek',
              question: 'Bir öğrenci üç sınavdan 70 ve 85 almıştır. Ortalamasının en az 80 olması için üçüncü sınavdan en az kaç almalıdır?',
              solution: [
                'Ortalama koşulu: (70 + 85 + x) / 3 ≥ 80',
                '155 + x ≥ 240',
                'x ≥ 85. Öğrenci en az 85 almalıdır.',
              ],
            },
            { id: 'b5', type: 'h3', text: 'Sayı Doğrusunda Gösterim' },
            {
              id: 'b6', type: 'list',
              items: [
                '“<” ve “>” için içi boş yuvarlak (○) kullanılır; sınır değer kümeye dâhil değildir.',
                '“≤” ve “≥” için içi dolu yuvarlak (●) kullanılır; sınır değer kümeye dâhildir.',
                'Ok yönü, çözüm kümesinin uzandığı yönü gösterir.',
              ],
            },
          ],
        },
        {
          id: 'mat-u2-q', kind: 'quiz',
          title: '2. Ünite Değerlendirme Testi',
          subtitle: 'Cebir',
          questionIds: ['mat-010', 'mat-011', 'mat-012', 'mat-013', 'mat-014', 'mat-015', 'mat-016', 'mat-017'],
        },
      ],
    },
    {
      id: 'mat-u3',
      title: '3. Ünite — Geometri',
      pages: [
        {
          id: 'mat-u3-p1', kind: 'content',
          title: 'Üçgenler',
          subtitle: 'Eşitsizlik, yardımcı elemanlar, Pisagor',
          blocks: [
            { id: 'b1', type: 'figure', kind: 'ucgen', caption: 'ABC üçgeninde kenarlar, açılar ve yükseklik.' },
            {
              id: 'b2', type: 'callout', variant: 'formul', title: 'Üçgen eşitsizliği',
              text: 'Bir üçgenin herhangi iki kenarının uzunlukları toplamı, üçüncü kenardan büyüktür: |b − c| < a < b + c',
            },
            { id: 'b3', type: 'h3', text: 'Yardımcı Elemanlar' },
            {
              id: 'b4', type: 'terms',
              items: [
                { term: 'Yükseklik', def: 'Bir köşeden karşı kenara indirilen dikme. Üç yüksekliğin kesiştiği nokta diklik merkezidir.' },
                { term: 'Kenarortay', def: 'Bir köşeyi karşı kenarın orta noktasına birleştiren doğru parçası. Kesişim noktası ağırlık merkezidir ve kenarortayı 2:1 oranında böler.' },
                { term: 'Açıortay', def: 'Bir açıyı iki eş açıya bölen ışın. İç açıortayların kesişimi iç teğet çemberin merkezidir.' },
                { term: 'Kenar orta dikme', def: 'Bir kenarın orta noktasından çıkılan dikme. Kesişim noktası çevrel çemberin merkezidir.' },
              ],
            },
            {
              id: 'b5', type: 'callout', variant: 'bilgi', title: 'Kenar–açı ilişkisi',
              text: 'Bir üçgende büyük kenarın karşısında büyük açı, küçük kenarın karşısında küçük açı bulunur. Bu ilişki, sıralama sorularının anahtarıdır.',
            },
            { id: 'b6', type: 'figure', kind: 'pisagor', caption: 'Dik üçgende a² + b² = c² — kenarlar üzerine kurulan karelerin alanları.' },
            {
              id: 'b7', type: 'example', title: 'Örnek',
              question: 'Bir merdiven duvara dayanmıştır. Merdivenin boyu 13 m, duvarla ayağı arasındaki uzaklık 5 m ise merdiven duvarda kaç metre yüksekliğe ulaşır?',
              solution: [
                'Merdiven hipotenüs, duvar ve yer dik kenarlardır.',
                '5² + h² = 13² → 25 + h² = 169',
                'h² = 144 → h = 12 m',
              ],
            },
            {
              id: 'b8', type: 'callout', variant: 'ipucu', title: 'Ezberlenecek üçlüler',
              text: '(3, 4, 5) — (5, 12, 13) — (8, 15, 17) — (7, 24, 25). Bunların katları da Pisagor üçlüsüdür: (6, 8, 10), (9, 12, 15) gibi. Sınavda tanıdığınız anda işlem yapmadan cevabı görürsünüz.',
            },
          ],
        },
        {
          id: 'mat-u3-p2', kind: 'content',
          title: 'Eşlik, Benzerlik ve Dönüşüm Geometrisi',
          subtitle: 'Şekilleri hareket ettirmek',
          blocks: [
            { id: 'b1', type: 'h3', text: 'Eşlik ve Benzerlik' },
            {
              id: 'b2', type: 'list',
              items: [
                'Eş şekiller: Karşılıklı açıları ve kenarları aynı olan şekiller. Benzerlik oranı 1’dir.',
                'Benzer şekiller: Karşılıklı açıları eşit, kenarları orantılı şekiller. Sembol: ~',
                'Benzerlik oranı k ise: Çevreler oranı k, Alanlar oranı k², Hacimler oranı k³’tür.',
                'Üçgenlerde benzerlik kriterleri: AA (açı–açı), KKK (kenar–kenar–kenar), KAK (kenar–açı–kenar).',
              ],
            },
            {
              id: 'b3', type: 'example', title: 'Örnek',
              question: 'Benzerlik oranı 3/4 olan iki benzer üçgenden küçüğünün alanı 27 cm² ise büyüğünün alanı kaç cm²’dir?',
              solution: [
                'Alanlar oranı = (3/4)² = 9/16',
                '27 / A = 9/16 → 9A = 27 · 16 = 432',
                'A = 48 cm²',
              ],
            },
            { id: 'b4', type: 'h3', text: 'Dönüşüm Geometrisi' },
            { id: 'b5', type: 'figure', kind: 'koordinat', caption: 'Koordinat düzleminde öteleme, yansıma ve dönme.' },
            {
              id: 'b6', type: 'table',
              caption: 'Dönüşüm kuralları',
              headers: ['Dönüşüm', 'Kural', 'Örnek: A(3, 2)'],
              rows: [
                ['x eksenine göre yansıma', '(x, y) → (x, −y)', '(3, −2)'],
                ['y eksenine göre yansıma', '(x, y) → (−x, y)', '(−3, 2)'],
                ['Orijine göre simetri', '(x, y) → (−x, −y)', '(−3, −2)'],
                ['Orijin etrafında 90° (pozitif yön)', '(x, y) → (−y, x)', '(−2, 3)'],
                ['Orijin etrafında 180°', '(x, y) → (−x, −y)', '(−3, −2)'],
                ['Öteleme (a, b)', '(x, y) → (x+a, y+b)', '(3+a, 2+b)'],
              ],
            },
            {
              id: 'b7', type: 'callout', variant: 'dikkat', title: 'Dönme yönü',
              text: 'Saat yönünün tersi pozitif yöndür. Saat yönünde 90° dönme, pozitif yönde 270° dönmeyle aynıdır: (x, y) → (y, −x).',
            },
          ],
        },
        {
          id: 'mat-u3-p3', kind: 'content',
          title: 'Geometrik Cisimler',
          subtitle: 'Dik prizma, silindir, piramit ve koni',
          blocks: [
            {
              id: 'b1', type: 'table',
              caption: 'Alan ve hacim formülleri',
              headers: ['Cisim', 'Yanal alan', 'Hacim'],
              rows: [
                ['Dik prizma', 'Taban çevresi × yükseklik', 'Taban alanı × yükseklik'],
                ['Silindir', '2πrh', 'πr²h'],
                ['Kare piramit', '4 × (a·h_yan / 2)', '(Taban alanı × h) / 3'],
                ['Koni', 'πr·ℓ (ℓ = yan yüz uzunluğu)', '(πr²h) / 3'],
              ],
            },
            {
              id: 'b2', type: 'callout', variant: 'formul', title: 'Silindirin tüm alanı',
              text: 'Tüm alan = Yanal alan + 2 × Taban alanı = 2πrh + 2πr² = 2πr(h + r)',
            },
            {
              id: 'b3', type: 'example', title: 'Örnek',
              question: 'Yarıçapı 5 cm, yüksekliği 7 cm olan silindir şeklindeki bir kutunun tüm yüzeyi kaplanacaktır. Kaç π cm² kâğıt gerekir?',
              solution: [
                'Yanal alan: 2πrh = 2 · π · 5 · 7 = 70π',
                'İki taban: 2πr² = 2 · π · 25 = 50π',
                'Toplam: 70π + 50π = 120π cm²',
              ],
            },
            {
              id: 'b4', type: 'callout', variant: 'ipucu', title: 'Açınım mantığı',
              text: 'Silindirin yanal yüzeyini kesip açarsanız bir dikdörtgen elde edersiniz. Bu dikdörtgenin bir kenarı silindirin yüksekliği, diğer kenarı taban çevresi (2πr) olur. Formülü ezberlemek yerine bu resmi hatırlayın.',
            },
          ],
        },
        {
          id: 'mat-u3-q', kind: 'quiz',
          title: '3. Ünite Değerlendirme Testi',
          subtitle: 'Geometri',
          questionIds: ['mat-018', 'mat-019', 'mat-020', 'mat-021', 'mat-022', 'mat-023', 'mat-024', 'mat-025'],
        },
      ],
    },
    {
      id: 'mat-u4',
      title: '4. Ünite — Veri Analizi ve Olasılık',
      pages: [
        {
          id: 'mat-u4-p1', kind: 'content',
          title: 'Veri Analizi',
          subtitle: 'Merkezî eğilim ve grafik okuma',
          blocks: [
            {
              id: 'b1', type: 'terms',
              items: [
                { term: 'Aritmetik ortalama', def: 'Verilerin toplamının veri sayısına bölümü. Uç değerlerden çok etkilenir.' },
                { term: 'Ortanca (medyan)', def: 'Küçükten büyüğe sıralanmış verinin tam ortasındaki değer. Veri sayısı çiftse ortadaki iki değerin ortalaması alınır.' },
                { term: 'Tepe değer (mod)', def: 'En çok tekrar eden veri. Birden fazla olabilir ya da hiç olmayabilir.' },
                { term: 'Açıklık', def: 'En büyük değer ile en küçük değer arasındaki fark. Verinin yayılımını gösterir.' },
              ],
            },
            {
              id: 'b2', type: 'callout', variant: 'dikkat', title: 'Hangisini kullanmalı?',
              text: 'Veride çok uç bir değer varsa (örneğin bir sınıfta bir öğrencinin 100, diğerlerinin 40 civarı alması) ortalama yanıltıcı olur; ortanca daha iyi temsil eder. LGS’de bu yorum sorusu sıkça sorulur.',
            },
            { id: 'b3', type: 'h3', text: 'Grafik Türleri' },
            {
              id: 'b4', type: 'table',
              headers: ['Grafik', 'Ne zaman kullanılır?'],
              rows: [
                ['Sütun grafiği', 'Kategorileri karşılaştırmak için'],
                ['Çizgi grafiği', 'Zamana bağlı değişimi göstermek için'],
                ['Daire grafiği', 'Bütün içindeki payları göstermek için'],
                ['Histogram', 'Gruplandırılmış sürekli veriyi göstermek için'],
              ],
            },
            {
              id: 'b5', type: 'example', title: 'Örnek',
              question: 'Bir daire grafiğinde 360°’lik dilimin 90°’si futbolu seçenlere aittir. Toplam 240 öğrenci varsa kaç öğrenci futbolu seçmiştir?',
              solution: [
                'Futbolun payı: 90/360 = 1/4',
                '240 · 1/4 = 60',
                'Cevap: 60 öğrenci.',
              ],
            },
          ],
        },
        {
          id: 'mat-u4-p2', kind: 'content',
          title: 'Olasılık',
          subtitle: 'Basit olayların olma olasılığı',
          blocks: [
            {
              id: 'b1', type: 'callout', variant: 'formul', title: 'Temel olasılık',
              text: 'P(A) = İstenen durum sayısı / Tüm olası durum sayısı.  Her olasılık 0 ≤ P(A) ≤ 1 aralığındadır. P(A) = 0 imkânsız, P(A) = 1 kesin olayı gösterir.',
            },
            {
              id: 'b2', type: 'list',
              items: [
                'Bir madenî para atışında örnek uzay: {Yazı, Tura} → 2 durum.',
                'Bir zar atışında örnek uzay: {1, 2, 3, 4, 5, 6} → 6 durum.',
                'İki zar atışında: 6 × 6 = 36 durum.',
                'İki para atışında: 2 × 2 = 4 durum → {YY, YT, TY, TT}.',
              ],
            },
            {
              id: 'b3', type: 'callout', variant: 'bilgi', title: 'Tümleyen olay',
              text: 'Bir olayın olmama olasılığı: P(A′) = 1 − P(A). “En az bir tane” ifadesi geçen sorularda önce “hiçbiri” durumunu hesaplayıp 1’den çıkarmak çok daha hızlıdır.',
            },
            {
              id: 'b4', type: 'example', title: 'Örnek 1',
              question: 'İki madenî para birlikte atılıyor. En az bir tura gelme olasılığı kaçtır?',
              solution: [
                'Tüm durumlar: YY, YT, TY, TT → 4 durum',
                '“En az bir tura” = “hiç tura gelmeme”nin tümleyeni',
                'Hiç tura gelmeme: YY → 1 durum → 1/4',
                'Cevap: 1 − 1/4 = 3/4',
              ],
            },
            {
              id: 'b5', type: 'example', title: 'Örnek 2 — İadesiz çekiliş',
              question: 'Bir torbada 3 kırmızı ve 5 mavi bilye vardır. Arka arkaya, geri koymadan iki bilye çekiliyor. İkisinin de kırmızı olma olasılığı kaçtır?',
              solution: [
                'İlk çekilişte kırmızı gelme olasılığı: 3/8',
                'İkinci çekilişte torbada 7 bilye, 2 kırmızı kalır: 2/7',
                'Bağımlı olaylar çarpılır: 3/8 · 2/7 = 6/56 = 3/28',
              ],
            },
          ],
        },
        {
          id: 'mat-u4-q', kind: 'quiz',
          title: '4. Ünite Değerlendirme Testi',
          subtitle: 'Veri Analizi ve Olasılık',
          questionIds: ['mat-026', 'mat-027', 'mat-028', 'mat-029', 'mat-009'],
        },
      ],
    },
  ],
}
