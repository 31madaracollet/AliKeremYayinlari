import type { Book, Question } from '../types'

export const questions: Question[] = [
  {
    id: 'fen-001', subjectId: 'fen', topic: 'Mevsimler ve İklim', difficulty: 1,
    stem: 'Dünya’da mevsimlerin oluşmasının temel nedeni aşağıdakilerden hangisidir?',
    options: [
      'Dünya’nın Güneş’e olan uzaklığının değişmesi',
      'Dünya’nın kendi ekseni etrafında dönmesi',
      'Dünya’nın dönme ekseninin yörünge düzlemine 23°27′ eğik olması',
      'Ay’ın Dünya etrafında dolanması',
    ],
    answer: 2,
    explanation: 'Mevsimler, eksen eğikliği nedeniyle güneş ışınlarının yıl boyunca farklı açılarla gelmesinden kaynaklanır. Uzaklık değişimi mevsimleri açıklamaz.',
  },
  {
    id: 'fen-002', subjectId: 'fen', topic: 'Mevsimler ve İklim', difficulty: 2,
    stem: '21 Haziran tarihinde Kuzey Yarım Küre için aşağıdakilerden hangisi doğrudur?',
    options: [
      'En uzun gece yaşanır.',
      'Güneş ışınları Yengeç Dönencesi’ne dik gelir.',
      'Gündüz ve gece eşit uzunluktadır.',
      'Kış mevsimi başlar.',
    ],
    answer: 1,
    explanation: '21 Haziran’da güneş ışınları 23°27′ kuzey enlemine (Yengeç Dönencesi) dik gelir. Kuzey Yarım Küre’de en uzun gündüz yaşanır ve yaz başlar.',
  },
  {
    id: 'fen-003', subjectId: 'fen', topic: 'Mevsimler ve İklim', difficulty: 2,
    stem: 'İklim ile hava olayları arasındaki fark için aşağıdakilerden hangisi doğrudur?',
    options: [
      'İklim kısa süreli, hava olayları uzun sürelidir.',
      'İklim geniş bir bölgenin uzun yıllar ortalaması, hava olayları dar bir alanın kısa süreli durumudur.',
      'İkisi de aynı anlama gelir.',
      'Hava olaylarını iklim bilimciler, iklimi meteorologlar inceler.',
    ],
    answer: 1,
    explanation: 'İklim uzun yıllar boyunca gözlenen ortalama koşullardır ve geniş alanları kapsar. Hava olayları ise dar bir alanda kısa sürede gözlenen atmosfer durumudur.',
  },
  {
    id: 'fen-004', subjectId: 'fen', topic: 'DNA ve Genetik Kod', difficulty: 1,
    stem: 'DNA’nın yapı birimi olan nükleotidi oluşturan üç kısım hangisidir?',
    options: [
      'Fosfat, deoksiriboz şekeri, organik baz',
      'Fosfat, riboz şekeri, organik baz',
      'Protein, yağ, karbonhidrat',
      'Gen, kromozom, hücre',
    ],
    answer: 0,
    explanation: 'DNA nükleotidi fosfat grubu, deoksiriboz şekeri ve dört organik bazdan (A, T, G, C) birinden oluşur. Riboz şekeri RNA’da bulunur.',
  },
  {
    id: 'fen-005', subjectId: 'fen', topic: 'DNA ve Genetik Kod', difficulty: 2,
    stem: 'Bir DNA molekülünde 120 adenin nükleotidi ve 80 sitozin nükleotidi varsa toplam nükleotit sayısı kaçtır?',
    options: ['200', '300', '400', '500'],
    answer: 2,
    explanation: 'Adenin sayısı timine, guanin sayısı sitozine eşittir. A=T=120, C=G=80 → toplam 120+120+80+80 = 400 nükleotit.',
  },
  {
    id: 'fen-006', subjectId: 'fen', topic: 'Kalıtım', difficulty: 2,
    stem: 'Saf döl uzun boylu (UU) bir bezelye ile saf döl kısa boylu (uu) bir bezelye çaprazlanırsa oluşacak birinci kuşak (F₁) bireylerin genotipi nedir?',
    options: ['Tamamı UU', 'Tamamı uu', 'Tamamı Uu', '%50 UU, %50 uu'],
    answer: 2,
    explanation: 'UU bireyden yalnızca U, uu bireyden yalnızca u geni gelir. Tüm yavrular Uu (melez uzun boylu) olur.',
  },
  {
    id: 'fen-007', subjectId: 'fen', topic: 'Kalıtım', difficulty: 3,
    stem: 'İki melez uzun boylu (Uu) bezelye çaprazlanırsa yavruların kaçta kaçı kısa boylu olur?',
    options: ['1/4', '1/2', '3/4', '0'],
    answer: 0,
    explanation: 'Uu × Uu çaprazlamasında 1 UU, 2 Uu, 1 uu oluşur. Kısa boylu (uu) olma oranı 1/4’tür.',
  },
  {
    id: 'fen-008', subjectId: 'fen', topic: 'Kalıtım', difficulty: 2,
    stem: 'Aşağıdakilerden hangisi modifikasyona örnektir?',
    options: [
      'Arı sütüyle beslenen larvanın kraliçe arı olması',
      'Radyasyon nedeniyle kromozom sayısının değişmesi',
      'Kutup ayısının beyaz kürkü',
      'Yeni bir tür oluşması',
    ],
    answer: 0,
    explanation: 'Modifikasyon, çevre etkisiyle oluşan ve kalıtsal olmayan değişimdir. Beslenmeyle kraliçe arı olma buna örnektir; genetik yapı değişmez.',
  },
  {
    id: 'fen-009', subjectId: 'fen', topic: 'Basınç', difficulty: 1,
    stem: 'Katı basıncı ile ilgili aşağıdakilerden hangisi doğrudur?',
    options: [
      'Yüzey alanı arttıkça basınç artar.',
      'Ağırlık arttıkça basınç azalır.',
      'Yüzey alanı azaldıkça basınç artar.',
      'Basınç yalnızca maddenin cinsine bağlıdır.',
    ],
    answer: 2,
    explanation: 'P = F/A bağıntısına göre basınç, yüzey alanıyla ters orantılıdır. Aynı kuvvet daha küçük alana uygulanırsa basınç artar.',
  },
  {
    id: 'fen-010', subjectId: 'fen', topic: 'Basınç', difficulty: 2,
    stem: 'Ağırlığı 600 N olan bir cisim, 0,3 m² yüzey alanıyla zemine temas etmektedir. Cismin zemine uyguladığı basınç kaç Pa’dır?',
    options: ['180', '600', '1800', '2000'],
    answer: 3,
    explanation: 'P = F/A = 600 / 0,3 = 2000 Pa.',
  },
  {
    id: 'fen-011', subjectId: 'fen', topic: 'Basınç', difficulty: 2,
    stem: 'Sıvı basıncı aşağıdakilerden hangisine bağlı değildir?',
    options: ['Sıvının yoğunluğuna', 'Sıvının derinliğine', 'Yer çekimi ivmesine', 'Kabın şekline ve taban alanına'],
    answer: 3,
    explanation: 'Sıvı basıncı P = h · d · g bağıntısıyla hesaplanır. Kabın şekli ve taban alanı basıncı etkilemez.',
  },
  {
    id: 'fen-012', subjectId: 'fen', topic: 'Basınç', difficulty: 3,
    stem: 'Bir dalgıç denizde derine indikçe kulaklarında artan bir basınç hisseder. Bunun nedeni aşağıdakilerden hangisidir?',
    options: [
      'Su sıcaklığının azalması',
      'Üstündeki su sütununun yüksekliğinin artması',
      'Suyun yoğunluğunun sürekli artması',
      'Açık hava basıncının azalması',
    ],
    answer: 1,
    explanation: 'Sıvı basıncı derinlikle doğru orantılıdır. Dalgıç derine indikçe üzerindeki su sütunu yükselir ve basınç artar.',
  },
  {
    id: 'fen-013', subjectId: 'fen', topic: 'Madde ve Endüstri', difficulty: 1,
    stem: 'Periyodik tabloda aynı grupta bulunan elementler için aşağıdakilerden hangisi doğrudur?',
    options: [
      'Atom numaraları aynıdır.',
      'Kimyasal özellikleri benzerdir.',
      'Katman sayıları aynıdır.',
      'Hepsi metaldir.',
    ],
    answer: 1,
    explanation: 'Aynı gruptaki elementlerin son katmanlarındaki elektron sayıları aynıdır; bu yüzden kimyasal özellikleri benzerdir. Katman sayısı periyodu belirler.',
  },
  {
    id: 'fen-014', subjectId: 'fen', topic: 'Madde ve Endüstri', difficulty: 2,
    stem: 'pH değeri 3 olan bir çözelti için aşağıdakilerden hangisi söylenebilir?',
    options: ['Kuvvetli baziktir.', 'Nötrdür.', 'Kuvvetli asidiktir.', 'Zayıf baziktir.'],
    answer: 2,
    explanation: 'pH 7 nötr, 7’den küçük değerler asidiktir. pH ne kadar küçükse asitlik o kadar kuvvetlidir; pH 3 kuvvetli asidiktir.',
  },
  {
    id: 'fen-015', subjectId: 'fen', topic: 'Madde ve Endüstri', difficulty: 2,
    stem: 'Kimyasal tepkimelerde kütlenin korunumu yasasına göre aşağıdakilerden hangisi doğrudur?',
    options: [
      'Girenlerin kütlesi ürünlerin kütlesinden büyüktür.',
      'Girenlerin toplam kütlesi ürünlerin toplam kütlesine eşittir.',
      'Atom sayısı tepkime sonunda azalır.',
      'Kütle tepkime türüne göre değişir.',
    ],
    answer: 1,
    explanation: 'Kapalı bir sistemde kimyasal tepkimeye giren maddelerin toplam kütlesi, oluşan ürünlerin toplam kütlesine eşittir. Atomlar yalnızca yeniden düzenlenir.',
  },
  {
    id: 'fen-016', subjectId: 'fen', topic: 'Basit Makineler', difficulty: 1,
    stem: 'Basit makinelerle ilgili aşağıdakilerden hangisi kesinlikle doğrudur?',
    options: [
      'İşten kazanç sağlarlar.',
      'Kuvvetten kazanç sağlarken yoldan kayıp olur.',
      'Enerji üretirler.',
      'Sürtünmeyi tamamen ortadan kaldırırlar.',
    ],
    answer: 1,
    explanation: 'Basit makinelerde işten kazanç yoktur. Kuvvetten kazanç sağlandığında aynı oranda yoldan kayıp olur; yapılan iş değişmez.',
  },
  {
    id: 'fen-017', subjectId: 'fen', topic: 'Basit Makineler', difficulty: 2,
    stem: 'Destek noktası yük ile kuvvet arasında bulunan kaldıraca örnek aşağıdakilerden hangisidir?',
    options: ['El arabası', 'Cımbız', 'Tahterevalli', 'Maşa'],
    answer: 2,
    explanation: 'Tahterevallide destek, yük ile kuvvet arasındadır; bu birinci tür kaldıraçtır. El arabası ikinci tür, cımbız ve maşa üçüncü tür kaldıraçtır.',
  },
  {
    id: 'fen-018', subjectId: 'fen', topic: 'Basit Makineler', difficulty: 3,
    stem: 'Bir kaldıraçta yük kolu 20 cm, kuvvet kolu 80 cm’dir. 400 N’luk yükü kaldırmak için uygulanması gereken en küçük kuvvet kaç N’dur?',
    options: ['50', '100', '200', '1600'],
    answer: 1,
    explanation: 'Denge koşulu: Yük × Yük kolu = Kuvvet × Kuvvet kolu → 400 · 20 = F · 80 → F = 8000/80 = 100 N.',
  },
  {
    id: 'fen-019', subjectId: 'fen', topic: 'Basit Makineler', difficulty: 2,
    stem: 'Hareketli makara ile ilgili aşağıdakilerden hangisi doğrudur?',
    options: [
      'Yalnızca kuvvetin yönünü değiştirir.',
      'Kuvvetten yarı yarıya kazanç sağlar, yoldan iki kat kayıp olur.',
      'İşten kazanç sağlar.',
      'Kuvvetten 4 kat kazanç sağlar.',
    ],
    answer: 1,
    explanation: 'Tek hareketli makarada uygulanan kuvvet yükün yarısıdır; ancak ip iki kat uzunlukta çekilir. İşten kazanç yoktur.',
  },
  {
    id: 'fen-020', subjectId: 'fen', topic: 'Enerji Dönüşümleri', difficulty: 1,
    stem: 'Bir hidroelektrik santralinde gerçekleşen enerji dönüşümü sırası hangisidir?',
    options: [
      'Kimyasal → Isı → Elektrik',
      'Potansiyel → Kinetik → Elektrik',
      'Elektrik → Kinetik → Isı',
      'Işık → Kimyasal → Elektrik',
    ],
    answer: 1,
    explanation: 'Barajda biriken suyun potansiyel enerjisi, akarken kinetik enerjiye; türbini döndürerek elektrik enerjisine dönüşür.',
  },
  {
    id: 'fen-021', subjectId: 'fen', topic: 'Enerji Dönüşümleri', difficulty: 2,
    stem: 'Aşağıdakilerden hangisi yenilenebilir enerji kaynağı değildir?',
    options: ['Rüzgâr', 'Jeotermal', 'Doğal gaz', 'Güneş'],
    answer: 2,
    explanation: 'Doğal gaz bir fosil yakıttır ve tükenebilir. Rüzgâr, jeotermal ve güneş yenilenebilir kaynaklardır.',
  },
  {
    id: 'fen-022', subjectId: 'fen', topic: 'Elektrik Yükleri', difficulty: 1,
    stem: 'Aynı cins elektrik yükleriyle yüklü iki cisim birbirine yaklaştırılırsa ne olur?',
    options: ['Birbirini çeker.', 'Birbirini iter.', 'Etkileşmez.', 'Nötrleşir.'],
    answer: 1,
    explanation: 'Aynı cins yükler birbirini iter, zıt cins yükler birbirini çeker. Bu, elektrostatiğin temel kuralıdır.',
  },
  {
    id: 'fen-023', subjectId: 'fen', topic: 'Elektrik Yükleri', difficulty: 2,
    stem: 'Topraklama olayı ile ilgili aşağıdakilerden hangisi doğrudur?',
    options: [
      'Negatif yüklü cisim topraklanırsa toprağa elektron verir ve nötrleşir.',
      'Pozitif yüklü cisim topraklanırsa toprağa elektron verir.',
      'Nötr cisim topraklanırsa pozitif yüklenir.',
      'Topraklama yalnızca metallerde etkisizdir.',
    ],
    answer: 0,
    explanation: 'Negatif yüklü cisimde fazla elektron vardır; topraklandığında bu elektronlar toprağa akar ve cisim nötr hâle gelir.',
  },
  {
    id: 'fen-024', subjectId: 'fen', topic: 'Elektrik Enerjisi', difficulty: 2,
    stem: 'Bir elektrikli cihazın gücü 2000 W’tır. Bu cihaz 3 saat çalıştırılırsa kaç kWh enerji harcar?',
    options: ['2', '4', '6', '600'],
    answer: 2,
    explanation: 'Enerji = Güç × Süre = 2 kW × 3 saat = 6 kWh.',
  },
  {
    id: 'fen-025', subjectId: 'fen', topic: 'Elektrik Enerjisi', difficulty: 3,
    stem: 'Seri bağlı bir devrede ampullerden biri patlarsa ne olur?',
    options: [
      'Diğer ampuller daha parlak yanar.',
      'Diğer ampuller aynı parlaklıkta yanmaya devam eder.',
      'Devre kesilir, hiçbir ampul yanmaz.',
      'Yalnızca patlayan ampul söner.',
    ],
    answer: 2,
    explanation: 'Seri bağlamada tek bir akım yolu vardır. Bir eleman bozulduğunda devre açık devre olur ve akım geçmez.',
  },
  {
    id: 'fen-026', subjectId: 'fen', topic: 'Mevsimler ve İklim', difficulty: 3,
    stem: 'Küresel iklim değişikliğinin başlıca nedeni aşağıdakilerden hangisidir?',
    options: [
      'Dünya’nın eksen eğikliğinin değişmesi',
      'Atmosferdeki sera gazlarının insan etkisiyle artması',
      'Ay’ın Dünya’ya yaklaşması',
      'Güneş lekelerinin azalması',
    ],
    answer: 1,
    explanation: 'Fosil yakıt kullanımı ve ormansızlaşma nedeniyle atmosferdeki karbondioksit ve metan gibi sera gazları artmış, bu da küresel ısınmaya yol açmıştır.',
  },
  {
    id: 'fen-027', subjectId: 'fen', topic: 'Madde ve Endüstri', difficulty: 3,
    stem: 'Bir maddenin asidik mi bazik mi olduğunu anlamak için turnusol kâğıdı kullanılmıştır. Mavi turnusol kâğıdının kırmızıya dönmesi neyi gösterir?',
    options: ['Madde baziktir.', 'Madde nötrdür.', 'Madde asidiktir.', 'Madde tuzdur.'],
    answer: 2,
    explanation: 'Asitler mavi turnusolu kırmızıya çevirir. Bazlar ise kırmızı turnusolu maviye çevirir.',
  },
  {
    id: 'fen-028', subjectId: 'fen', topic: 'Basit Makineler', difficulty: 3,
    stem: 'Eğik düzlemle ilgili aşağıdakilerden hangisi doğrudur?',
    options: [
      'Eğim açısı arttıkça gereken kuvvet azalır.',
      'Eğik düzlem uzunluğu arttıkça gereken kuvvet azalır.',
      'Eğik düzlem işten kazanç sağlar.',
      'Eğik düzlemde yol kısalır.',
    ],
    answer: 1,
    explanation: 'Eğik düzlemde F · ℓ = G · h bağıntısı geçerlidir. Düzlem uzunluğu (ℓ) arttıkça aynı yükü kaldırmak için gereken kuvvet azalır, ancak alınan yol artar.',
  },
]

export const book: Book = {
  id: 'fen-8',
  subjectId: 'fen',
  title: 'Fen Bilimleri 8 — Gözlemden Yasaya',
  subtitle: 'LGS Konu Anlatımı ve Deney Defteri',
  author: 'Ali Kerem Yayınları Fen Kurulu',
  edition: '1. Baskı',
  year: 2026,
  blurb:
    'Her konu bir soruyla başlıyor: “Neden böyle oluyor?” Şekiller, deney kurguları ve günlük hayat bağlantılarıyla fen bilimlerinin sekiz ünitesi.',
  chapters: [
    {
      id: 'fen-u1',
      title: '1. Ünite — Mevsimler, İklim ve Kalıtım',
      pages: [
        {
          id: 'fen-u1-p1', kind: 'content',
          title: 'Mevsimlerin Oluşumu',
          subtitle: 'Eksen eğikliği her şeyi açıklar',
          blocks: [
            { id: 'b1', type: 'p', text: 'Yaygın bir yanılgı vardır: “Yazın Güneş’e yaklaşırız, kışın uzaklaşırız.” Bu doğru değildir. Dünya, Ocak ayında Güneş’e en yakın konumundadır; buna rağmen Kuzey Yarım Küre’de kıştır. Mevsimlerin tek sebebi, Dünya’nın dönme ekseninin yörünge düzlemine 23°27′ eğik olmasıdır.' },
            { id: 'b2', type: 'figure', kind: 'mevsim', caption: 'Dünya’nın Güneş çevresindeki dört özel konumu ve eksen eğikliği.' },
            {
              id: 'b3', type: 'callout', variant: 'tanim', title: 'Neden eğiklik önemli?',
              text: 'Eksen eğik olduğu için yıl boyunca güneş ışınlarının bir bölgeye düşme açısı değişir. Işınlar dike yakın geldiğinde enerji dar bir alana yayılır ve ısınma artar; eğik geldiğinde aynı enerji geniş bir alana dağılır ve ısınma azalır.',
            },
            {
              id: 'b4', type: 'table',
              caption: 'Dört özel tarih',
              headers: ['Tarih', 'Işınların dik geldiği yer', 'Kuzey Yarım Küre'],
              rows: [
                ['21 Mart', 'Ekvator', 'İlkbahar başlangıcı, gece = gündüz'],
                ['21 Haziran', 'Yengeç Dönencesi', 'Yaz başlangıcı, en uzun gündüz'],
                ['23 Eylül', 'Ekvator', 'Sonbahar başlangıcı, gece = gündüz'],
                ['21 Aralık', 'Oğlak Dönencesi', 'Kış başlangıcı, en uzun gece'],
              ],
            },
            {
              id: 'b5', type: 'callout', variant: 'dikkat', title: 'Ters yarım küre',
              text: 'Kuzey Yarım Küre’de yaz yaşanırken Güney Yarım Küre’de kış yaşanır. Bu nedenle Avustralya’da Noel yaz ortasına denk gelir. Sınavda “aynı anda” ifadesi geçen sorularda bu tersliği hatırlayın.',
            },
            { id: 'b6', type: 'h3', text: 'İklim ve Hava Olayları' },
            {
              id: 'b7', type: 'terms',
              items: [
                { term: 'Hava olayı', def: 'Dar bir bölgede, kısa süreli atmosfer olayları. Meteoroloji uzmanları inceler.' },
                { term: 'İklim', def: 'Geniş bir bölgede uzun yıllar (en az 30-35 yıl) gözlenen ortalama atmosfer koşulları. Klimatologlar inceler.' },
                { term: 'Küresel iklim değişikliği', def: 'Sera gazlarının artışıyla Dünya’nın ortalama sıcaklığının yükselmesi ve iklim kuşaklarının kayması.' },
              ],
            },
          ],
        },
        {
          id: 'fen-u1-p2', kind: 'content',
          title: 'DNA ve Genetik Kod',
          subtitle: 'Hücrenin şifreli kütüphanesi',
          blocks: [
            { id: 'b1', type: 'figure', kind: 'dna', caption: 'DNA’nın çift sarmal yapısı ve baz eşleşmeleri.' },
            {
              id: 'b2', type: 'list', ordered: true,
              items: [
                'Nükleotit: DNA’nın en küçük yapı birimi. Fosfat + deoksiriboz şekeri + organik baz.',
                'Gen: Belirli bir özelliğin şifresini taşıyan DNA parçası.',
                'DNA: Genlerin üzerinde bulunduğu çift sarmal molekül.',
                'Kromozom: DNA’nın proteinlerle paketlenmiş hâli.',
                'Hücre: Kromozomların çekirdekte bulunduğu canlı birimi.',
              ],
            },
            {
              id: 'b3', type: 'callout', variant: 'formul', title: 'Chargaff kuralı',
              text: 'DNA’da adenin daima timinle, guanin daima sitozinle eşleşir. Bu nedenle A = T ve G = C’dir. Toplam nükleotit = 2(A + G) biçiminde hesaplanır.',
            },
            {
              id: 'b4', type: 'example', title: 'Örnek',
              question: 'Bir DNA molekülünde 300 timin ve 200 guanin varsa toplam nükleotit sayısı kaçtır?',
              solution: [
                'A = T = 300 (adenin sayısı timine eşit)',
                'C = G = 200 (sitozin sayısı guanine eşit)',
                'Toplam = 300 + 300 + 200 + 200 = 1000 nükleotit',
              ],
            },
            { id: 'b5', type: 'h3', text: 'DNA Kendini Eşler' },
            { id: 'b6', type: 'p', text: 'Hücre bölünmesinden önce DNA sarmalı açılır, her zincir kendisine uygun nükleotitlerle eşleşerek yeni bir zincir oluşturur. Sonuçta biri eski biri yeni zincirden oluşan iki özdeş DNA meydana gelir. Buna yarı korunumlu eşlenme denir.' },
          ],
        },
        {
          id: 'fen-u1-p3', kind: 'content',
          title: 'Kalıtım ve Çeşitlilik',
          subtitle: 'Mendel’den mutasyona',
          blocks: [
            {
              id: 'b1', type: 'terms',
              items: [
                { term: 'Genotip', def: 'Bir bireyin sahip olduğu genlerin tamamı. Örn: Uu' },
                { term: 'Fenotip', def: 'Genotipin dış görünüşe yansımış hâli. Örn: uzun boylu' },
                { term: 'Baskın (dominant) gen', def: 'Tek başına özelliği ortaya çıkarabilen gen. Büyük harfle gösterilir.' },
                { term: 'Çekinik (resesif) gen', def: 'Yalnızca çift hâlde özelliği gösteren gen. Küçük harfle gösterilir.' },
                { term: 'Saf döl (homozigot)', def: 'Aynı genden iki tane taşıyan birey: UU veya uu' },
                { term: 'Melez (heterozigot)', def: 'Farklı iki gen taşıyan birey: Uu' },
              ],
            },
            {
              id: 'b2', type: 'example', title: 'Punnett karesiyle çözüm',
              question: 'Melez uzun boylu (Uu) iki bezelye çaprazlanıyor. Yavruların fenotip oranı nedir?',
              solution: [
                'Anne gametleri: U, u — Baba gametleri: U, u',
                'Olası birleşmeler: UU, Uu, Uu, uu',
                'Genotip oranı: 1 UU : 2 Uu : 1 uu',
                'Fenotip oranı: 3 uzun boylu : 1 kısa boylu (%75 – %25)',
              ],
            },
            {
              id: 'b3', type: 'table',
              caption: 'Değişim türleri',
              headers: ['Kavram', 'Kalıtsal mı?', 'Örnek'],
              rows: [
                ['Mutasyon', 'Evet', 'Radyasyonla DNA diziliminin değişmesi'],
                ['Modifikasyon', 'Hayır', 'Arı sütüyle beslenen larvanın kraliçe olması'],
                ['Adaptasyon', 'Evet (uzun sürede)', 'Kaktüsün yapraklarının dikene dönüşmesi'],
                ['Varyasyon', 'Evet', 'Aynı türün bireyleri arasındaki göz rengi farkı'],
              ],
            },
            {
              id: 'b4', type: 'callout', variant: 'ipucu', title: 'Ayırt etme kuralı',
              text: 'Değişim yavrulara aktarılıyorsa mutasyon veya adaptasyondur. Aktarılmıyorsa modifikasyondur. Modifikasyonda genler değişmez, yalnızca genin ifadesi çevreyle değişir.',
            },
          ],
        },
        {
          id: 'fen-u1-q', kind: 'quiz',
          title: '1. Ünite Değerlendirme Testi',
          subtitle: 'Mevsimler, İklim ve Kalıtım',
          questionIds: ['fen-001', 'fen-002', 'fen-003', 'fen-026', 'fen-004', 'fen-005', 'fen-006', 'fen-007', 'fen-008'],
        },
      ],
    },
    {
      id: 'fen-u2',
      title: '2. Ünite — Basınç ve Madde',
      pages: [
        {
          id: 'fen-u2-p1', kind: 'content',
          title: 'Basınç',
          subtitle: 'Katı, sıvı ve gaz basıncı',
          blocks: [
            { id: 'b1', type: 'figure', kind: 'basinc', caption: 'Aynı ağırlık, farklı temas yüzeyi: basınç neden değişir?' },
            {
              id: 'b2', type: 'callout', variant: 'formul', title: 'Katı basıncı',
              text: 'P = F / A   (P: basınç, birimi Pascal [Pa]; F: dik kuvvet [N]; A: temas yüzey alanı [m²])',
            },
            { id: 'b3', type: 'p', text: 'Katılar, ağırlıklarını temas ettikleri yüzeye dik olarak iletir. Kar ayakkabısının geniş olması, bıçağın ince olması, devenin tabanlarının yayvan olması hep bu bağıntının sonucudur.' },
            {
              id: 'b4', type: 'callout', variant: 'formul', title: 'Sıvı basıncı',
              text: 'P = h · d · g   (h: sıvı derinliği, d: sıvı yoğunluğu, g: yer çekimi ivmesi). Kabın şekli ve sıvının miktarı basıncı değiştirmez.',
            },
            {
              id: 'b5', type: 'list',
              items: [
                'Sıvı basıncı her yöne eşit iletilir (Pascal prensibi).',
                'Baraj duvarları aşağı doğru kalınlaşır çünkü derinlik arttıkça basınç artar.',
                'Bileşik kaplarda sıvı, kapların şekli ne olursa olsun aynı seviyede dengelenir.',
                'Gaz basıncı, gaz taneciklerinin kap çeperlerine çarpmasından doğar; sıcaklık ve tanecik sayısıyla artar.',
              ],
            },
            {
              id: 'b6', type: 'example', title: 'Örnek',
              question: 'Yoğunluğu 1000 kg/m³ olan suyun 4 m derinliğindeki basıncı kaç Pa’dır? (g = 10 N/kg)',
              solution: [
                'P = h · d · g',
                'P = 4 · 1000 · 10',
                'P = 40.000 Pa = 40 kPa',
              ],
            },
            {
              id: 'b7', type: 'callout', variant: 'bilgi', title: 'Açık hava basıncı',
              text: 'Deniz seviyesinde açık hava basıncı yaklaşık 101.325 Pa’dır (1 atm). Yükseklere çıkıldıkça hava tabakası inceldiği için açık hava basıncı azalır; bu yüzden yüksek rakımda su 100 °C’den daha düşük sıcaklıkta kaynar.',
            },
          ],
        },
        {
          id: 'fen-u2-p2', kind: 'content',
          title: 'Madde ve Endüstri',
          subtitle: 'Periyodik sistem, tepkimeler, asitler ve bazlar',
          blocks: [
            { id: 'b1', type: 'h3', text: 'Periyodik Sistem' },
            {
              id: 'b2', type: 'list',
              items: [
                'Yatay sıralara periyot denir; periyot numarası, atomun katman (yörünge) sayısını verir.',
                'Dikey sütunlara grup denir; aynı gruptaki elementlerin son katman elektron sayıları aynıdır.',
                'Soldan sağa gidildikçe metalik özellik azalır, ametalik özellik artar.',
                '8A grubu soy gazlardır: son katmanları dolu olduğu için tepkimeye girmezler.',
              ],
            },
            { id: 'b3', type: 'h3', text: 'Kimyasal Tepkimeler' },
            { id: 'b4', type: 'p', text: 'Kimyasal tepkimede atomlar yok olmaz, yalnızca yeniden düzenlenir. Bu nedenle tepkimeye giren atomların sayısı, oluşan ürünlerdeki atom sayısına eşittir. Buna kütlenin korunumu yasası denir.' },
            {
              id: 'b5', type: 'example', title: 'Denkleştirme',
              question: 'CH₄ + O₂ → CO₂ + H₂O tepkimesini denkleştirin.',
              solution: [
                'Karbon: Sol 1, sağ 1 — dengeli.',
                'Hidrojen: Sol 4, sağ 2. H₂O’nun önüne 2 yazalım: sağda 4 H olur.',
                'Oksijen: Sağda 2 + 2 = 4 O var. O₂’nin önüne 2 yazalım.',
                'Denkleşmiş hâli: CH₄ + 2O₂ → CO₂ + 2H₂O',
              ],
            },
            { id: 'b6', type: 'h3', text: 'Asitler ve Bazlar' },
            {
              id: 'b7', type: 'table',
              headers: ['Özellik', 'Asitler', 'Bazlar'],
              rows: [
                ['pH aralığı', '0 – 7 arası', '7 – 14 arası'],
                ['Tat', 'Ekşi', 'Acı'],
                ['Dokunma', '—', 'Kaygan'],
                ['Turnusol', 'Maviyi kırmızıya çevirir', 'Kırmızıyı maviye çevirir'],
                ['Örnek', 'HCl, H₂SO₄, sirke, limon', 'NaOH, sabun, çamaşır sodası'],
              ],
            },
            {
              id: 'b8', type: 'callout', variant: 'dikkat', title: 'Güvenlik uyarısı',
              text: 'Çamaşır suyu (baz) ile tuz ruhu (asit) kesinlikle karıştırılmamalıdır. Bu karışım zehirli klor gazı açığa çıkarır ve ölümcül olabilir.',
            },
          ],
        },
        {
          id: 'fen-u2-q', kind: 'quiz',
          title: '2. Ünite Değerlendirme Testi',
          subtitle: 'Basınç ve Madde',
          questionIds: ['fen-009', 'fen-010', 'fen-011', 'fen-012', 'fen-013', 'fen-014', 'fen-015', 'fen-027'],
        },
      ],
    },
    {
      id: 'fen-u3',
      title: '3. Ünite — Basit Makineler, Enerji ve Elektrik',
      pages: [
        {
          id: 'fen-u3-p1', kind: 'content',
          title: 'Basit Makineler',
          subtitle: 'Kuvvetten kazanç, yoldan kayıp',
          blocks: [
            { id: 'b1', type: 'p', text: 'Basit makineler iş yapmayı kolaylaştıran araçlardır. Ancak hiçbiri işten kazanç sağlamaz: Kuvvetten kazandığınız kadar yoldan kaybedersiniz. Sürtünmesiz ortamda yapılan iş her zaman aynıdır.' },
            { id: 'b2', type: 'figure', kind: 'kaldirac', caption: 'Kaldıraçta denge: Yük × Yük kolu = Kuvvet × Kuvvet kolu' },
            {
              id: 'b3', type: 'table',
              caption: 'Kaldıraç türleri',
              headers: ['Tür', 'Sıralama', 'Örnekler'],
              rows: [
                ['1. tür', 'Destek ortada', 'Tahterevalli, makas, pense, kerpeten'],
                ['2. tür', 'Yük ortada', 'El arabası, ceviz kıracağı, limon sıkacağı'],
                ['3. tür', 'Kuvvet ortada', 'Cımbız, maşa, olta, süpürge'],
              ],
            },
            {
              id: 'b4', type: 'callout', variant: 'formul', title: 'Kaldıraç denge koşulu',
              text: 'Yük (G) × Yük kolu (b) = Kuvvet (F) × Kuvvet kolu (a).  Kuvvet kolu uzadıkça gereken kuvvet azalır.',
            },
            { id: 'b5', type: 'figure', kind: 'makara', caption: 'Sabit makara yalnızca yön değiştirir; hareketli makara kuvvetten kazandırır.' },
            {
              id: 'b6', type: 'list',
              items: [
                'Sabit makara: Kuvvetten kazanç yoktur, yalnızca kuvvetin yönü değişir. F = G',
                'Hareketli makara: Kuvvetten 2 kat kazanç, yoldan 2 kat kayıp. F = G/2',
                'Palanga: n hareketli makara varsa F = G / (2n) olur.',
                'Eğik düzlem: F · ℓ = G · h. Rampalar, vidalar, kama bu prensiple çalışır.',
                'Çıkrık: Kol yarıçapı büyüdükçe gereken kuvvet azalır.',
              ],
            },
            {
              id: 'b7', type: 'example', title: 'Örnek',
              question: '1200 N ağırlığındaki bir yükü 2 m yükseğe çıkarmak için 8 m uzunluğunda eğik düzlem kullanılıyor. Gereken en küçük kuvvet kaç N’dur?',
              solution: [
                'F · ℓ = G · h bağıntısını kullanalım.',
                'F · 8 = 1200 · 2',
                'F = 2400 / 8 = 300 N',
                'Kuvvetten 4 kat kazanç sağlandı, yol da 4 kat uzadı.',
              ],
            },
          ],
        },
        {
          id: 'fen-u3-p2', kind: 'content',
          title: 'Enerji Dönüşümleri ve Çevre Bilimi',
          subtitle: 'Enerji yok olmaz, dönüşür',
          blocks: [
            { id: 'b1', type: 'p', text: 'Enerjinin korunumu yasasına göre enerji yoktan var edilemez, var olan enerji yok edilemez; yalnızca bir türden diğerine dönüşür. Ancak her dönüşümde bir miktar enerji ısıya dönüşerek kullanılamaz hâle gelir.' },
            {
              id: 'b2', type: 'table',
              caption: 'Enerji kaynakları',
              headers: ['Yenilenebilir', 'Yenilenemez'],
              rows: [
                ['Güneş', 'Taş kömürü'],
                ['Rüzgâr', 'Petrol'],
                ['Hidroelektrik (su)', 'Doğal gaz'],
                ['Jeotermal', 'Nükleer yakıt (uranyum)'],
                ['Biyokütle', 'Linyit'],
                ['Dalga ve gelgit', '—'],
              ],
            },
            {
              id: 'b3', type: 'callout', variant: 'bilgi', title: 'Enerji dönüşüm zincirleri',
              text: 'Rüzgâr santrali: Kinetik → Elektrik | Güneş paneli: Işık → Elektrik | Pil: Kimyasal → Elektrik | Elektrikli ısıtıcı: Elektrik → Isı | Fotosentez: Işık → Kimyasal',
            },
            { id: 'b4', type: 'h3', text: 'Madde Döngüleri' },
            {
              id: 'b5', type: 'list',
              items: [
                'Su döngüsü: Buharlaşma → Yoğunlaşma → Yağış → Yüzey akışı',
                'Karbon döngüsü: Fotosentez karbonu tutar, solunum ve yanma serbest bırakır.',
                'Azot döngüsü: Azot bağlayıcı bakteriler atmosferdeki azotu bitkilerin kullanabileceği hâle getirir.',
                'Oksijen döngüsü: Fotosentezle üretilir, solunumla tüketilir.',
              ],
            },
            {
              id: 'b6', type: 'callout', variant: 'dikkat', title: 'Sürdürülebilir yaşam',
              text: 'Geri dönüşüm, enerji tasarrufu ve yenilenebilir kaynaklara yönelim, kaynakların gelecek kuşaklara aktarılması için zorunludur. Bir ton kâğıdın geri dönüşümü yaklaşık 17 ağacı kurtarır.',
            },
          ],
        },
        {
          id: 'fen-u3-p3', kind: 'content',
          title: 'Elektrik Yükleri ve Elektrik Enerjisi',
          subtitle: 'Yükler, devreler ve tüketim',
          blocks: [
            { id: 'b1', type: 'h3', text: 'Elektriklenme' },
            {
              id: 'b2', type: 'list',
              items: [
                'Sürtünmeyle elektriklenme: İki cisim sürtündüğünde elektron aktarımı olur; zıt yüklerle yüklenirler.',
                'Dokunmayla elektriklenme: Yüklü cisim nötr cisme dokunur, yük paylaşılır; aynı cins yüklenirler.',
                'Etkiyle elektriklenme: Yüklü cisim yaklaştırılır, dokunma olmadan yükler ayrışır; cisim uzaklaşınca eski hâline döner.',
                'Topraklama: Fazla yükün toprağa aktarılmasıyla cisim nötr hâle gelir.',
              ],
            },
            { id: 'b3', type: 'figure', kind: 'elektrik', caption: 'Seri ve paralel bağlı devrelerde ampullerin parlaklığı.' },
            {
              id: 'b4', type: 'table',
              headers: ['Özellik', 'Seri bağlama', 'Paralel bağlama'],
              rows: [
                ['Akım yolu', 'Tek', 'Birden fazla'],
                ['Biri bozulursa', 'Devre kesilir', 'Diğerleri çalışmaya devam eder'],
                ['Ampul sayısı artınca', 'Parlaklık azalır', 'Parlaklık değişmez'],
                ['Örnek', 'Eski yılbaşı lambaları', 'Ev elektrik tesisatı'],
              ],
            },
            {
              id: 'b5', type: 'callout', variant: 'formul', title: 'Elektrik enerjisi ve tüketim',
              text: 'Enerji (kWh) = Güç (kW) × Süre (saat).  Fatura tutarı = Harcanan kWh × Birim fiyat.  1 kWh = 1000 Wh',
            },
            {
              id: 'b6', type: 'example', title: 'Örnek',
              question: '1500 W gücündeki bir su ısıtıcısı günde 2 saat çalışıyor. 30 günde kaç kWh enerji harcar?',
              solution: [
                'Güç: 1500 W = 1,5 kW',
                'Günlük tüketim: 1,5 × 2 = 3 kWh',
                'Aylık tüketim: 3 × 30 = 90 kWh',
              ],
            },
            {
              id: 'b7', type: 'callout', variant: 'ipucu', title: 'Enerji verimliliği',
              text: 'Beyaz eşyalardaki A+++ etiketleri, aynı işi daha az enerjiyle yapıldığını gösterir. LED ampuller, akkor ampullere göre yaklaşık %85 daha az enerji tüketir.',
            },
          ],
        },
        {
          id: 'fen-u3-q', kind: 'quiz',
          title: '3. Ünite Değerlendirme Testi',
          subtitle: 'Basit Makineler, Enerji ve Elektrik',
          questionIds: ['fen-016', 'fen-017', 'fen-018', 'fen-019', 'fen-028', 'fen-020', 'fen-021', 'fen-022', 'fen-023', 'fen-024', 'fen-025'],
        },
      ],
    },
  ],
}
