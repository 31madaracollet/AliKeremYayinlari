/* ============================================================
   ALİ KEREM YAYINLARI — LGS Dijital Soru Bankası
   İçerik verisi: dersler, kitaplar ve sorular
   Zorluk sırası: Kolay → Orta → Zor → LGS Tipi
   ============================================================ */

window.AKY = window.AKY || {};

AKY.SUBJECTS = [
  { id: "turkce",   name: "Türkçe",                          color: "#8e3b46", dark: "#6e2d37", ink: "#f7ecee" },
  { id: "matematik",name: "Matematik",                       color: "#1f3a68", dark: "#172c4f", ink: "#e9eef7" },
  { id: "fen",      name: "Fen Bilimleri",                   color: "#2c6e4f", dark: "#21553d", ink: "#e9f3ee" },
  { id: "inkilap",  name: "T.C. İnkılap Tarihi ve Atatürkçülük", color: "#9a5b2d", dark: "#7a4723", ink: "#f7efe8" },
  { id: "din",      name: "Din Kültürü ve Ahlak Bilgisi",   color: "#5b3a78", dark: "#482d5f", ink: "#f0ebf7" },
  { id: "ingilizce",name: "İngilizce",                       color: "#0f6a78", dark: "#0b525d", ink: "#e8f3f5" }
];

/* q: soru kökü, o: seçenekler, a: doğru seçeneğin indeksi (0=A) */
AKY.BOOKS = [

/* ===================== TÜRKÇE ===================== */
{
  id: "turkce-kademeli",
  subject: "turkce",
  kind: "kademeli",
  title: "Türkçe Kademeli Soru Bankası",
  subtitle: "Kolay → Orta → Zor → LGS Tipi",
  price: 3,
  sections: [
    { name: "1. Bölüm — Kolay Seviye", info: "Temel kazanımlarla ısınma soruları",
      questions: [
        { q: "Aşağıdakilerin hangisinde yapım eki almış bir sözcük vardır?",
          o: ["Bu masalı çok severim.", "Adam elindeki kitaplığı düzeltti.", "Kapı yavaşça kapandı.", "Çocuk hızla koştu."], a: 1 },
        { q: "\"Ali, bahçedeki çiçekleri suladı.\" Bu cümlenin öznesi aşağıdakilerden hangisidir?",
          o: ["Ali", "bahçedeki çiçekleri", "suladı", "çiçekleri"], a: 0 },
        { q: "Aşağıdaki cümlelerin hangisinde noktalama işareti doğru kullanılmıştır?",
          o: ["İstanbul, Türkiye'nin en kalabalık şehridir", "Ne zaman geleceksin?", "Bugün hava, çok güzel.", "Ankara,Türkiye'nin başkentidir."], a: 1 },
        { q: "\"sıcak\" sözcüğü aşağıdaki cümlelerin hangisinde mecaz anlamıyla kullanılmıştır?",
          o: ["Çorba sıcakmış, hemen içme.", "Güneş yüzünden hava çok sıcak.", "Yaşlı adam bize çok sıcak davrandı.", "Sıcak günlerde bol su içmeliyiz."], a: 2 }
      ]},
    { name: "2. Bölüm — Orta Seviye", info: "Kazanımları pekiştiren sorular",
      questions: [
        { q: "Aşağıdaki cümlelerin hangisinde anlatım bozukluğu vardır?",
          o: ["Çanta; kalemler, defterler ve kitaplarla doluydu.", "Her vatandaş vergisini eksiksiz ve tastamam ödemelidir.", "Kardeşim ödevlerini erken bitirdi.", "Yağmur başlayınca herkes içeri koştu."], a: 1 },
        { q: "\"yüz\" sözcüğü aşağıdaki cümlelerin hangisinde diğerlerinden farklı anlamda kullanılmıştır?",
          o: ["Bebeğin yüzü güneşte kızarmış.", "Onun yüzü hep güler.", "Yüzüne soğuk su çarptı.", "Bu yaz iyi yüz öğrendi."], a: 3 },
        { q: "\"Kitap okumak, insanın düşünce dünyasını zenginleştirir. Okuyan kişi olaylara farklı açılardan bakmayı öğrenir. Sözcük dağarcığı gelişir, kendini daha iyi ifade eder. Bu nedenle kitap okuma alışkanlığı küçük yaşta kazandırılmalıdır.\" Bu paragrafın ana düşüncesi hangisidir?",
          o: ["Kitap okumak çok zaman alır.", "Kitap okuma alışkanlığı erken yaşta edinilmelidir.", "Herkes roman okumayı sever.", "Sözcük dağarcığı yalnızca okulda gelişir."], a: 1 },
        { q: "Aşağıdaki cümlelerin hangisinde öznel bir yargı vardır?",
          o: ["Türkiye'nin başkenti Ankara'dır.", "Bu yıl okulumuza elli yeni öğrenci kaydoldu.", "Bence bu film, geçen yıl izlediğim en güzel filmdi.", "Su, deniz seviyesinde 100 °C'de kaynar."], a: 2 }
      ]},
    { name: "3. Bölüm — Zor Seviye", info: "Dikkat ve yorum gerektiren sorular",
      questions: [
        { q: "(I) Bir yazar için en değerli hazine, gözlemleridir. (II) İnsanları, olayları ve doğayı dikkatle izler. (III) Bu gözlemler, onun eserlerine canlılık katar. (IV) İyi bir yazar, çevresindeki hiçbir ayrıntıyı kaçırmaz.\nNumaralanmış cümlelerle anlamlı bir paragraf oluşturulmak istenirse sıralama nasıl olmalıdır?",
          o: ["I - II - III - IV", "I - IV - II - III", "IV - I - II - III", "I - III - IV - II"], a: 1 },
        { q: "(I) Yürüyüş yapmak sağlığımız için çok yararlıdır. (II) Düzenli yürüyüş, kalp ve damar sistemini güçlendirir. (III) Televizyon karşısında uzun saatler geçirmek ise oldukça zararlıdır. (IV) Ayrıca yürüyüş stresi azaltır, zihni dinlendirir.\nBu paragrafta anlam bütünlüğünü bozan cümle hangisidir?",
          o: ["I", "II", "III", "IV"], a: 2 },
        { q: "\"Bilim insanları, okyanusların derinliklerinde hâlâ keşfedilmemiş birçok canlı türü olduğunu söylüyor. ---- Bu nedenle derin deniz araştırmaları her geçen yıl daha da önem kazanıyor.\" Paragrafın akışına göre boşluğa aşağıdakilerden hangisi getirilmelidir?",
          o: ["Okyanuslar, Dünya'nın en geniş su alanlarıdır.", "Bu canlıların bazıları, ışığın hiç ulaşmadığı karanlık sularda yaşamını sürdürüyor.", "Balıklar, suda solunum yapan canlılardır.", "Denizde yüzmek insan sağlığına iyi gelir."], a: 1 },
        { q: "Aşağıdaki cümlelerin hangisinde güçlü bir neden-sonuç ilişkisi vardır?",
          o: ["Çok yağmur yağdığı için tarlalar su altında kaldı.", "Baharda ağaçlar çiçek açar.", "Kuşlar gökyüzünde süzülüyordu.", "Çocuk bahçede top oynuyordu."], a: 0 }
      ]},
    { name: "4. Bölüm — LGS Tipi", info: "Yeni nesil, beceri temelli sorular",
      questions: [
        { q: "Aylin, Burak, Cem ve Deniz adlı dört öğrenci bir sıraya yan yana oturmuştur.\n• Aylin, Deniz'in hemen solundadır.\n• Burak, sıranın en sağındadır.\n• Cem, Aylin'in yanında değildir.\nBuna göre sıranın en solunda kim oturmaktadır?",
          o: ["Aylin", "Cem", "Deniz", "Burak"], a: 0 },
        { q: "Bir okulda 300 öğrenciye en sevdikleri kitap türü sorulmuştur. Sonuçlar: Roman 120, bilim kurgu 80, tarih 60, şiir 40 kişi.\nBuna göre öğrencilerin yüzde kaçı roman türünü sevmektedir?",
          o: ["%20", "%30", "%40", "%50"], a: 2 },
        { q: "\"İnsanlarla sağlıklı ilişkiler kurmanın temelinde onları anlamak yatar. Empati, kendimizi karşımızdaki kişinin yerine koyarak onun duygu ve düşüncelerini anlamaya çalışmaktır. Empati kuran kişi önyargıdan uzaklaşır, çatışmaları daha kolay çözer. Toplumda hoşgörünün yaygınlaşması da bireylerin empati becerisine bağlıdır.\" Bu paragrafta asıl anlatılmak istenen hangisidir?",
          o: ["Empati kurmak, insan ilişkilerini güçlendirir ve toplumsal hoşgörüyü artırır.", "İnsanlar çatışmalardan kaçınmalıdır.", "Önyargılar doğuştan gelen özelliklerdir.", "Herkesin aynı biçimde düşünmesi gerekir."], a: 0 },
        { q: "Bir kütüphanede 1-10 arası raflarda Türkçe, 11-20 arasında matematik, 21-30 arasında fen, 31-40 arasında sosyal kitapları bulunmaktadır. Elif, raf numarası 3'ün katı olan bir kitap almıştır. Bu kitap ne fen ne de matematik kitabıdır.\nBuna göre Elif'in aldığı kitabın raf numarası aşağıdakilerden hangisi olabilir?",
          o: ["18", "24", "6", "27"], a: 2 }
      ]}
  ]
},
{
  id: "turkce-kompile",
  subject: "turkce",
  kind: "kompile",
  title: "Türkçe Kompile LGS Soru Bankası",
  subtitle: "Baştan sona LGS tarzı sorular",
  price: 2,
  sections: [
    { name: "LGS Tarzı Sorular", info: "Beceri temelli yeni nesil sorular",
      questions: [
        { q: "\"Yapılan bir araştırmada düzenli kitap okuyan çocukların, kendilerini karşısındakinin yerine koyma becerilerinin daha gelişmiş olduğu görülmüştür. Araştırmacılara göre bunun nedeni, okurken farklı karakterlerin duygu ve düşüncelerini tanımamızdır.\" Bu paragraftan çıkarılabilecek en doğru yargı hangisidir?",
          o: ["Kitap okumayan çocuklar okulda başarısız olur.", "Kitap okumak, çocukların başkalarının duygularını anlamasına katkı sağlar.", "Araştırmalar çoğu zaman yanıltıcıdır.", "Kitaplardaki karakterler gerçek hayattan alınmıştır."], a: 1 },
        { q: "Türkçe (T), Matematik (M), Fen (F), Sosyal (S) ve İngilizce (İ) kitapları bir rafa yan yana dizilecektir.\n• Fen kitabı en soldadır.\n• Türkçe, Matematik'in hemen sağındadır.\n• Sosyal, İngilizce'nin hemen sağındadır.\nBuna göre aşağıdakilerden hangisi kesinlikle doğrudur?",
          o: ["Sosyal kitabı çift numaralı bir raftadır.", "Türkçe kitabı en sağdadır.", "Sosyal kitabı tek numaralı bir raftadır.", "Matematik, Fen'in hemen sağındadır."], a: 2 },
        { q: "Bir öğrencinin beş günlük ders çalışma süreleri şöyledir: Pazartesi 40 dk, Salı 55 dk, Çarşamba 30 dk, Perşembe 60 dk, Cuma 45 dk.\nÖğrencinin günlük ortalama çalışma süresi kaç dakikadır?",
          o: ["40", "44", "46", "50"], a: 2 },
        { q: "\"Damlaya damlaya göl olur.\" atasözü aşağıdaki durumlardan hangisiyle açıklanabilir?",
          o: ["Her gün azar azar para biriktiren çocuğun yıl sonunda bisiklet alması", "Yağmur yağınca göllerin taşması", "Suyun tasarruflu kullanılması gereği", "Barajlardaki su seviyesinin yükselmesi"], a: 0 },
        { q: "\"Çalışmadan başarı elde edilemez.\" cümlesiyle anlamca en yakın cümle hangisidir?",
          o: ["Başarı için çalışmak gerekir.", "Çalışan herkes başarılı olur.", "Başarı tamamen şansa bağlıdır.", "Çalışmak her zaman başarıyı garantiler."], a: 0 },
        { q: "Aşağıdaki cümlelerin hangisinde \"yumuşak\" sözcüğü mecaz anlamıyla kullanılmıştır?",
          o: ["Tereyağı buzdolabından çıkar çıkmaz yumuşamış.", "Bebeğin üzerine yumuşak bir battaniye örttü.", "Annesinin yumuşak yüreği kimseye kıyamazdı.", "Yumuşak toprakta yürümek zordu."], a: 2 },
        { q: "Kompozisyon yazarken izlenecek adımlar karışık verilmiştir: (I) yazıyı yazma, (II) konuyu belirleme, (III) gözden geçirme, (IV) taslak hazırlama.\nDoğru sıralama hangisidir?",
          o: ["IV - II - I - III", "II - IV - I - III", "II - I - IV - III", "III - I - IV - II"], a: 1 },
        { q: "\"Küçük Kerem, mahalledeki yaşlı amcanın bahçesindeki kediyi her gün besliyordu. Bir gün kedi ortadan kayboldu. Kerem günlerce onu aradı; sonunda kediyi soğuktan titrer hâlde bir barakada bulup evine götürdü. O günden sonra kedi, Kerem'in en yakın arkadaşı oldu.\" Bu metne en uygun başlık hangisidir?",
          o: ["Soğuk Bir Gün", "Minik Dost", "Bahçe İşleri", "Yaşlılık Günleri"], a: 1 }
      ]}
  ]
},

/* ===================== MATEMATİK ===================== */
{
  id: "matematik-kademeli",
  subject: "matematik",
  kind: "kademeli",
  title: "Matematik Kademeli Soru Bankası",
  subtitle: "Kolay → Orta → Zor → LGS Tipi",
  price: 3,
  sections: [
    { name: "1. Bölüm — Kolay Seviye", info: "Temel işlem becerileri",
      questions: [
        { q: "2³ × 2⁴ işleminin sonucu kaçtır?",
          o: ["64", "128", "256", "32"], a: 1 },
        { q: "√49 + √16 işleminin sonucu kaçtır?",
          o: ["11", "9", "65", "13"], a: 0 },
        { q: "120 sayısının kaç tane farklı asal çarpanı vardır?",
          o: ["2", "3", "4", "5"], a: 1 },
        { q: "-3 + 7 - 5 işleminin sonucu kaçtır?",
          o: ["1", "-1", "9", "-15"], a: 1 }
      ]},
    { name: "2. Bölüm — Orta Seviye", info: "Kazanımları birleştiren sorular",
      questions: [
        { q: "Bir torbada 3 kırmızı, 5 mavi top vardır. Torbadan rastgele çekilen bir topun kırmızı olma olasılığı kaçtır?",
          o: ["3/8", "5/8", "1/3", "3/5"], a: 0 },
        { q: "x/3 + 2 = 6 denklemini sağlayan x değeri kaçtır?",
          o: ["9", "12", "15", "18"], a: 1 },
        { q: "y = 3x + 2 doğrusunun eğimi kaçtır?",
          o: ["0", "3", "2", "5"], a: 1 },
        { q: "Kenar uzunlukları 3√2 cm ve 4√2 cm olan dikdörtgenin alanı kaç cm²'dir?",
          o: ["12", "24", "7√2", "48"], a: 1 }
      ]},
    { name: "3. Bölüm — Zor Seviye", info: "Çok adımlı işlem soruları",
      questions: [
        { q: "48 şeftali ve 60 elma, her kasada tek tür meyve ve eşit sayıda meyve olacak şekilde kasalara yerleştirilecektir. Hiç meyve artmayacağına göre en az kaç kasa gerekir?",
          o: ["6", "8", "9", "12"], a: 2 },
        { q: "(4³ × 8²) ÷ 16² işleminin sonucu kaçtır?",
          o: ["8", "16", "32", "64"], a: 1 },
        { q: "√108 - √48 işleminin sonucu kaçtır?",
          o: ["2√3", "4√3", "2√6", "√60"], a: 0 },
        { q: "60 ve 84 sayılarının EBOB'u ile EKOK'unun toplamı kaçtır?",
          o: ["408", "420", "432", "444"], a: 2 }
      ]},
    { name: "4. Bölüm — LGS Tipi", info: "Yeni nesil problem çözme",
      questions: [
        { q: "Bir kırtasiyede defterin fiyatı kalemin fiyatının 3 katıdır. 2 defter ve 4 kalem alan Zeynep 130 TL ödemiştir.\nBuna göre bir kalemin fiyatı kaç TL'dir?",
          o: ["10", "12", "13", "15"], a: 2 },
        { q: "Ardışık üç çift sayının toplamı 72'dir.\nBuna göre bu sayıların en büyüğü kaçtır?",
          o: ["22", "24", "26", "28"], a: 2 },
        { q: "√200 sayısı hangi iki doğal sayı arasındadır?",
          o: ["13 ile 14", "14 ile 15", "15 ile 16", "19 ile 20"], a: 1 },
        { q: "20 kişilik bir sınıfta matematik sınavının ortalaması 80'dir. Bu sınıftaki 8 öğrencinin ortalaması 65 olduğuna göre kalan 12 öğrencinin ortalaması kaçtır?",
          o: ["85", "90", "95", "100"], a: 1 }
      ]}
  ]
},
{
  id: "matematik-kompile",
  subject: "matematik",
  kind: "kompile",
  title: "Matematik Kompile LGS Soru Bankası",
  subtitle: "Baştan sona LGS tarzı sorular",
  price: 2,
  sections: [
    { name: "LGS Tarzı Sorular", info: "Beceri temelli yeni nesil sorular",
      questions: [
        { q: "1, 2, 3, 4, 5 rakamları birer kez kullanılarak üç basamaklı kaç farklı doğal sayı yazılabilir?",
          o: ["45", "60", "75", "90"], a: 1 },
        { q: "1'den büyük, aralarında asal iki doğal sayının EKOK'u 84'tür.\nBu iki sayının toplamı en çok kaçtır?",
          o: ["19", "25", "31", "84"], a: 2 },
        { q: "Bir taksinin açılış ücreti 10 TL'dir ve her kilometre için 8 TL alınmaktadır. Yolculuk sonunda 130 TL ödeyen bir yolcu kaç kilometre yol gitmiştir?",
          o: ["12", "14", "15", "16"], a: 2 },
        { q: "Bir üçgenin iç açılarının ölçüleri 2x, 3x ve 4x'tir. Bu üçgenin en büyük açısı kaç derecedir?",
          o: ["60", "80", "90", "100"], a: 1 },
        { q: "Bir örüntünün n. adımındaki kibrit sayısı 2n + 1 ile bulunmaktadır. Bu örüntünün 10. adımında kaç kibrit vardır?",
          o: ["19", "20", "21", "23"], a: 2 },
        { q: "2ᵃ = 8 ve 3ᵇ = 27 olduğuna göre a + b kaçtır?",
          o: ["5", "6", "7", "8"], a: 1 },
        { q: "Bir deponun 3/5'i su ile doludur. Depoya 40 litre daha su eklenince depo tamamen doluyor.\nBuna göre deponun tamamı kaç litredir?",
          o: ["80", "90", "100", "120"], a: 2 },
        { q: "Alanı 48 cm² olan bir karenin bir kenar uzunluğu hangi iki doğal sayı arasındadır?",
          o: ["5 ile 6", "6 ile 7", "7 ile 8", "8 ile 9"], a: 1 }
      ]}
  ]
},

/* ===================== FEN BİLİMLERİ ===================== */
{
  id: "fen-kademeli",
  subject: "fen",
  kind: "kademeli",
  title: "Fen Bilimleri Kademeli Soru Bankası",
  subtitle: "Kolay → Orta → Zor → LGS Tipi",
  price: 3,
  sections: [
    { name: "1. Bölüm — Kolay Seviye", info: "Temel kavramlar",
      questions: [
        { q: "Hücrede enerji üreten organel aşağıdakilerden hangisidir?",
          o: ["Hücre zarı", "Mitokondri", "Sitoplazma", "Koful"], a: 1 },
        { q: "Su buharının sıvı hâle geçmesine ne ad verilir?",
          o: ["Buharlaşma", "Donma", "Yoğuşma", "Erime"], a: 2 },
        { q: "Aşağıdakilerden hangisi basit makine değildir?",
          o: ["Pense", "El arabası", "Eğik düzlem", "Pil"], a: 3 },
        { q: "Gölgenin oluşması ışığın hangi özelliğiyle açıklanır?",
          o: ["Renklere ayrılması", "Doğrusal yolla yayılması", "Kırılması", "Hızının azalması"], a: 1 }
      ]},
    { name: "2. Bölüm — Orta Seviye", info: "Kavramları ilişkilendirme",
      questions: [
        { q: "Eşit kütleli su ve zeytinyağına özdeş ısıtıcılarla eşit süre ısı verilirse hangisi gözlenir?",
          o: ["Suyun sıcaklığı daha çok artar.", "Zeytinyağının sıcaklığı daha çok artar.", "İkisinin sıcaklığı eşit artar.", "Sıcaklıkları değişmez."], a: 1 },
        { q: "Kar üzerinde batmadan yürümek için aşağıdakilerden hangisi yapılmalıdır?",
          o: ["Kalın bot giymek", "Kayak takmak", "Ağır yük taşımak", "Hızlı adımlarla koşmak"], a: 1 },
        { q: "İnsanda kalıtsal bilgiyi taşıyan ve hücrenin yönetim merkezi olan yapı hangisidir?",
          o: ["Ribozom", "Koful", "Çekirdek", "Hücre zarı"], a: 2 },
        { q: "Mevsimlerin oluşmasında aşağıdakilerden hangisi etkilidir?",
          o: ["Dünya'nın kendi ekseni etrafında dönmesi", "Ay'ın Dünya çevresinde dolanması", "Dünya'nın Güneş çevresinde dolanması ve eksen eğikliği", "Güneş'in kendi etrafında dönmesi"], a: 2 }
      ]},
    { name: "3. Bölüm — Zor Seviye", info: "Analiz gerektiren sorular",
      questions: [
        { q: "Aşağıdakilerden hangisi eşeysiz üremeye örnek değildir?",
          o: ["Bakterinin bölünerek çoğalması", "Amipin ikiye bölünmesi", "Çiçekli bitkilerin tohumla çoğalması", "Maya mantarının tomurcuklanması"], a: 2 },
        { q: "Aşağıdaki maddelerden hangisi baz özelliği gösterir?",
          o: ["Limon suyu", "Sirke", "Sabunlu su", "Gazoz"], a: 2 },
        { q: "Bir dalgıç derine daldıkça üzerine etki eden sıvı basıncının artmasının nedeni hangisidir?",
          o: ["Sıvının yoğunluğunun azalması", "Derinlik arttıkça sıvı basıncının artması", "Su sıcaklığının artması", "Yer çekiminin azalması"], a: 1 },
        { q: "Yüksekliği 1 m, uzunluğu 5 m olan eğik düzlemde 100 N'luk yükü çekmek için en az kaç N kuvvet uygulanmalıdır? (Sürtünmeler önemsizdir.)",
          o: ["10", "20", "50", "100"], a: 1 }
      ]},
    { name: "4. Bölüm — LGS Tipi", info: "Deney ve çıkarım soruları",
      questions: [
        { q: "Bir öğrenci özdeş kaplara eşit kütlede su ve zeytinyağı koyup aynı ısıtıcıyla 5 dakika ısıtıyor. Deney sonunda zeytinyağının sıcaklığının daha yüksek olduğunu ölçüyor.\nBu deneyle aşağıdaki sonuçlardan hangisine ulaşılabilir?",
          o: ["Isıtıcılar farklı güçtedir.", "Zeytinyağının öz ısısı sudan küçüktür.", "Kapların kütleleri farklıdır.", "Kaplar ısı yalıtkanıdır."], a: 1 },
        { q: "Katı hâldeki X maddesi ısıtılırken sıcaklığının bir süre 78 °C'de sabit kaldığı gözleniyor.\nBu gözlem hakkında hangisi söylenebilir?",
          o: ["X bir karışımdır.", "X saf bir maddedir çünkü hâl değişimi sırasında sıcaklık sabit kalmıştır.", "X oda sıcaklığında gazdır.", "X ısıyı iletmez."], a: 1 },
        { q: "Aynı sıvıyla dolu kabın yan yüzeyinde farklı derinliklerde üç delik açılıyor. En derindeki delikten çıkan suyun en uzağa fışkırdığı gözleniyor.\nBu deney hangi sonucu destekler?",
          o: ["Sıvı basıncı derinlikle artar.", "Sıvı basıncı kabın şekline bağlıdır.", "Sıvılar sıkıştırılamaz.", "Sıvı basıncı yalnızca yoğunluğa bağlıdır."], a: 0 },
        { q: "Mayalı hamurun bekletildikçe kabarması hangi olayla açıklanır?",
          o: ["Yoğuşma", "Mayaların fermantasyonu sonucu karbondioksit oluşması", "Fotosentez", "Donma"], a: 1 }
      ]}
  ]
},
{
  id: "fen-kompile",
  subject: "fen",
  kind: "kompile",
  title: "Fen Bilimleri Kompile LGS Soru Bankası",
  subtitle: "Baştan sona LGS tarzı sorular",
  price: 2,
  sections: [
    { name: "LGS Tarzı Sorular", info: "Beceri temelli yeni nesil sorular",
      questions: [
        { q: "Rüzgâr türbininde elektrik üretilirken enerji dönüşümü hangi sırayla gerçekleşir?",
          o: ["Rüzgâr enerjisi → hareket enerjisi → elektrik enerjisi", "Elektrik enerjisi → hareket enerjisi → rüzgâr enerjisi", "Isı enerjisi → ışık enerjisi → elektrik enerjisi", "Kimyasal enerji → hareket enerjisi → elektrik enerjisi"], a: 0 },
        { q: "Şubat ayında Kuzey Yarım Küre'de kış yaşanırken Güney Yarım Küre'de yaz yaşanmasının nedeni hangisidir?",
          o: ["Güneş'e uzaklık farkının çok büyük olması", "Dünya'nın kendi ekseni etrafında dönmesi", "Eksen eğikliği nedeniyle güneş ışınlarının gelme açısının değişmesi", "Ay'ın evreleri"], a: 2 },
        { q: "İnsanda üreme hücrelerinin birleşmesiyle oluşan ilk hücreye ne ad verilir?",
          o: ["Sperm", "Zigot", "Embriyo", "Yumurta"], a: 1 },
        { q: "Ucu kapatılan şırınganın pistonu itildiğinde içindeki havanın sıkışması gazların hangi özelliğiyle açıklanır?",
          o: ["Tanecikleri arasında büyük boşluk bulunması", "Taneciklerinin sabit durması", "Bir şekillerinin olmaması", "Renksiz olmaları"], a: 0 },
        { q: "Aşağıdakilerden hangisi elektrik akımını iletir?",
          o: ["Cam çubuk", "Plastik cetvel", "Bakır tel", "Kuru tahta"], a: 2 },
        { q: "Bir cismin Ay'daki ağırlığının Dünya'daki ağırlığından az olmasının nedeni hangisidir?",
          o: ["Ay'da atmosfer bulunmaması", "Ay'ın kütle çekiminin Dünya'nınkinden az olması", "Ay'ın Güneş'e daha uzak olması", "Cismin kütlesinin Ay'da azalması"], a: 1 },
        { q: "Sis oluşumu maddenin hangi hâl değişimine örnektir?",
          o: ["Donma", "Yoğuşma", "Kaynama", "Süblimleşme"], a: 1 },
        { q: "Ağırlıksız ve sürtünmesiz palanga düzeneğinde yükü iki ip taşıyorsa 200 N'luk yükü dengede tutmak için en az kaç N kuvvet gerekir?",
          o: ["50", "100", "200", "400"], a: 1 }
      ]}
  ]
},

/* ===================== İNKILAP ===================== */
{
  id: "inkilap-kademeli",
  subject: "inkilap",
  kind: "kademeli",
  title: "T.C. İnkılap Tarihi ve Atatürkçülük Kademeli Soru Bankası",
  subtitle: "Kolay → Orta → Zor → LGS Tipi",
  price: 3,
  sections: [
    { name: "1. Bölüm — Kolay Seviye", info: "Temel bilgiler",
      questions: [
        { q: "Millî Mücadele'nin lideri kimdir?",
          o: ["İsmet İnönü", "Mustafa Kemal Atatürk", "Kâzım Karabekir", "Fevzi Çakmak"], a: 1 },
        { q: "Türkiye Büyük Millet Meclisi hangi tarihte açılmıştır?",
          o: ["19 Mayıs 1919", "23 Nisan 1920", "30 Ağustos 1922", "29 Ekim 1923"], a: 1 },
        { q: "Aşağıdakilerden hangisi Atatürk ilkelerinden biri değildir?",
          o: ["Cumhuriyetçilik", "Halkçılık", "Saltanatçılık", "Laiklik"], a: 2 },
        { q: "Aşağıdakilerden hangisi Kurtuluş Savaşı'nda savaşılan cephelerden biri değildir?",
          o: ["Doğu Cephesi", "Güney Cephesi", "Batı Cephesi", "Kanal Cephesi"], a: 3 }
      ]},
    { name: "2. Bölüm — Orta Seviye", info: "Bilgiyi kullanma",
      questions: [
        { q: "Mondros Ateşkesi'nden sonra Anadolu'daki işgallere karşı halkın kurduğu millî direniş gücü hangisidir?",
          o: ["Yararlı cemiyetler", "Kuvayımilliye", "Zararlı cemiyetler", "Jandarma kuvvetleri"], a: 1 },
        { q: "Aşağıdakilerden hangisi ilk TBMM'nin özelliklerinden biri değildir?",
          o: ["Güçler birliği ilkesini benimsemiştir.", "1921 Anayasası'nı kabul etmiştir.", "Padişahlığı kaldırmıştır.", "Olağanüstü yetkilerle donatılmıştır."], a: 2 },
        { q: "Kurtuluş Savaşı'nda düzenli ordunun kazandığı ilk zafer hangisidir?",
          o: ["I. İnönü Savaşı", "II. İnönü Savaşı", "Sakarya Meydan Muharebesi", "Büyük Taarruz"], a: 0 },
        { q: "Şapka ve kıyafet inkılabı aşağıdaki alanlardan hangisinde yapılan bir yeniliktir?",
          o: ["Eğitim alanında", "Siyasal alanda", "Toplumsal hayat alanında", "Ekonomi alanında"], a: 2 }
      ]},
    { name: "3. Bölüm — Zor Seviye", info: "Neden-sonuç ilişkileri",
      questions: [
        { q: "Mustafa Kemal'in 19 Mayıs 1919'da Samsun'a çıkışındaki temel amacı hangisidir?",
          o: ["Padişaha bağlılığını bildirmek", "Millî bağımsızlık mücadelesini Anadolu'da başlatmak", "İtilaf Devletleri ile anlaşmak", "Mebuslar Meclisi'ni toplamak"], a: 1 },
        { q: "Aşağıdaki sorunlardan hangisi Lozan Barış Antlaşması'nda çözülememiştir?",
          o: ["Kapitülasyonların kaldırılması", "Musul sorunu", "Düyûn-u Umûmiye'nin kaldırılması", "Yabancı okulların durumu"], a: 1 },
        { q: "I. İnönü Savaşı - Sakarya Meydan Muharebesi - Büyük Taarruz gelişmelerinin kronolojik sıralaması hangisidir?",
          o: ["Büyük Taarruz - Sakarya - I. İnönü", "Sakarya - I. İnönü - Büyük Taarruz", "I. İnönü - Sakarya - Büyük Taarruz", "Büyük Taarruz - I. İnönü - Sakarya"], a: 2 },
        { q: "Kapitülasyonların kaldırılması doğrudan aşağıdaki ilkelerden hangisiyle ilişkilidir?",
          o: ["Laiklik", "Halkçılık", "Milliyetçilik ve tam bağımsızlık", "Devletçilik"], a: 2 }
      ]},
    { name: "4. Bölüm — LGS Tipi", info: "Belge ve metin yorumlama",
      questions: [
        { q: "Erzurum Kongresi'nde \"Millî sınırlar içinde vatan bölünmez bir bütündür; parçalanamaz.\" kararı alınmıştır.\nBu karar vurgusuyla aşağıdakilerden hangisine karşı çıkılmıştır?",
          o: ["Vatanın bütünlüğünün korunması", "Vatanın parçalanması düşüncesi", "Millî kongrelerin toplanması", "Kuvayımilliye'nin kurulması"], a: 1 },
        { q: "\"Hayatta en hakiki mürşit ilimdir, fendir.\" sözüyle Atatürk aşağıdakilerden hangisini önermemiştir?",
          o: ["Akılcılık ve bilimselliği", "Dogmatik ve önyargılı düşünceyi", "İnkılapçılığı", "Çağdaşlaşmayı"], a: 1 },
        { q: "Halifeliğin kaldırılması, Tevhid-i Tedrisat Kanunu ile eğitimin birleştirilmesi ve Şer'iye ve Evkaf Vekâleti'nin kaldırılması gelişmelerinin ortak amacı hangisidir?",
          o: ["Ekonomiyi güçlendirmek", "Eğitim, hukuk ve yönetimi laikleştirmek", "Ordunun sayısını artırmak", "Azınlık okullarını kapatmak"], a: 1 },
        { q: "\"Yurtta sulh, cihanda sulh.\" ilkesini en iyi açıklayan gelişme hangisidir?",
          o: ["Musul sorunu nedeniyle İngiltere'ye savaş açılması", "Komşu devletlerle dostluk antlaşmaları imzalanması (Balkan ve Sadabat Paktları)", "Boğazlarda askerî yığınak yapılması", "Yabancı devletlere ekonomik ayrıcalıklar tanınması"], a: 1 }
      ]}
  ]
},
{
  id: "inkilap-kompile",
  subject: "inkilap",
  kind: "kompile",
  title: "T.C. İnkılap Tarihi ve Atatürkçülük Kompile LGS Soru Bankası",
  subtitle: "Baştan sona LGS tarzı sorular",
  price: 2,
  sections: [
    { name: "LGS Tarzı Sorular", info: "Beceri temelli yeni nesil sorular",
      questions: [
        { q: "Günümüzdeki kuzeydoğu sınırımızı kesin olarak belirleyen antlaşma hangisidir?",
          o: ["Gümrü Antlaşması", "Kars Antlaşması", "Lozan Antlaşması", "Ankara Antlaşması"], a: 1 },
        { q: "TBMM'nin kendisine karşı çıkan ayaklanmaları bastırmasındaki temel amacı hangisidir?",
          o: ["İtilaf Devletleri'ni memnun etmek", "Otoriteyi sağlayarak millî birlik ve beraberliği korumak", "Cephe sayısını artırmak", "Yeni antlaşmalar imzalamak"], a: 1 },
        { q: "Takvim, saat ve ölçü birimlerinde yapılan değişikliklerin ortak amacı hangisidir?",
          o: ["Nüfusu artırmak", "Çağdaşlaşmak ve Avrupa ile uyum sağlamak", "Askerliği kolaylaştırmak", "Tarımsal üretimi artırmak"], a: 1 },
        { q: "Cumhuriyet Dönemi'nde demokrasi yolunda kurulan ilk muhalefet partisi hangisidir?",
          o: ["Terakkiperver Cumhuriyet Fırkası", "Serbest Cumhuriyet Fırkası", "Cumhuriyet Halk Fırkası", "Ahrar Fırkası"], a: 0 },
        { q: "\"Ordular! İlk hedefiniz Akdeniz'dir. İleri!\" emri hangi savaş sonunda verilmiştir?",
          o: ["I. İnönü Savaşı", "Sakarya Meydan Muharebesi", "Büyük Taarruz (Başkomutanlık Meydan Muharebesi)", "Kütahya-Eskişehir Savaşları"], a: 2 },
        { q: "İzmir İktisat Kongresi'nin (1923) temel hedefi hangisidir?",
          o: ["Yabancı sermayeyi ülkeye çekmek", "Millî ekonomi bilincini yerleştirmek", "Ticareti tamamen devletleştirmek", "Gümrük vergilerini kaldırmak"], a: 1 },
        { q: "Aşağıdakilerden hangisi Şeyh Sait İsyanı'nın nedenlerinden biri değildir?",
          o: ["Halifeliğin kaldırılmasına duyulan tepki", "Çıkar çevrelerinin ve dış güçlerin kışkırtması", "Takrir-i Sükûn Kanunu'nun çıkarılması", "Cumhuriyet rejimine duyulan karşıtlık"], a: 2 },
        { q: "Aşağıdaki şehirlerden hangisi Atatürk'ün fikir hayatının gelişmesinde etkili olan yerlerden biri değildir?",
          o: ["Selanik", "Manastır", "Sofya", "Erzurum"], a: 3 }
      ]}
  ]
},

/* ===================== DİN KÜLTÜRÜ ===================== */
{
  id: "din-kademeli",
  subject: "din",
  kind: "kademeli",
  title: "Din Kültürü ve Ahlak Bilgisi Kademeli Soru Bankası",
  subtitle: "Kolay → Orta → Zor → LGS Tipi",
  price: 3,
  sections: [
    { name: "1. Bölüm — Kolay Seviye", info: "Temel kavramlar",
      questions: [
        { q: "Kur'an-ı Kerim'in ilk inen ayetleri hangi surede yer alır?",
          o: ["Fatiha Suresi", "Bakara Suresi", "Alak Suresi", "Yasin Suresi"], a: 2 },
        { q: "Peygamberimiz Hz. Muhammed (s.a.v.) hangi şehirde doğmuştur?",
          o: ["Mekke", "Medine", "Taif", "Kudüs"], a: 0 },
        { q: "\"Zekât\" kelimesinin sözlük anlamlarından biri hangisidir?",
          o: ["Kaybolmak", "Artmak, arınmak ve bereketlenmek", "Borçlanmak", "Beklemek"], a: 1 },
        { q: "\"Kader\" kavramının anlamı hangisidir?",
          o: ["Rastlantı", "Allah'ın ezelî ilmiyle her şeye bir ölçü koyması", "Rüya", "Şans"], a: 1 }
      ]},
    { name: "2. Bölüm — Orta Seviye", info: "Kavramları ilişkilendirme",
      questions: [
        { q: "Peygamberimize peygamberlik kaç yaşında gelmiştir?",
          o: ["25", "33", "40", "63"], a: 2 },
        { q: "İslam'ı ilk kabul eden kişi kimdir?",
          o: ["Hz. Hatice", "Hz. Ebubekir", "Hz. Ali", "Hz. Ömer"], a: 0 },
        { q: "Kaza ve kader kavramlarıyla ilgili hangisi doğrudur?",
          o: ["Kader, sonradan değiştirilebilir.", "Kaza, kaderin zamanı gelince gerçekleşmesidir.", "Kader, tamamen rastlantıdır.", "Kaza ile kader aynı şeydir, farkları yoktur."], a: 1 },
        { q: "Peygamberimizin Medine'de farklı din ve topluluklarla birlikte yaşama ilkelerini belirleyen belge hangisidir?",
          o: ["Veda Hutbesi", "Medine Sözleşmesi (Medine Vesikası)", "Hudeybiye Antlaşması", "Cahiliye Adetleri"], a: 1 }
      ]},
    { name: "3. Bölüm — Zor Seviye", info: "Yorum ve analiz",
      questions: [
        { q: "\"(Allah) her şeyi yaratmış ve ona bir ölçü koymuştur.\" (Kamer suresi, 49. ayet)\nBu ayet doğrudan hangi konuyla ilgilidir?",
          o: ["Hac ibadeti", "Kaza ve kader inancı", "Ticaret kuralları", "Miras paylaşımı"], a: 1 },
        { q: "Aşağıdakilerden hangisi zekâtın toplumsal faydalarından biri değildir?",
          o: ["Yoksulluğun azalmasına katkı sağlaması", "Sosyal dayanışmayı güçlendirmesi", "Yalnızca bireysel olup toplumu ilgilendirmemesi", "Sınıf farklarından doğan gerginliği azaltması"], a: 2 },
        { q: "Sınavda kopya çekme fırsatı olmasına rağmen çekmeyen ve sonucunu kendi emeğiyle alan bir öğrenci öncelikle hangi değeri yaşatmış olur?",
          o: ["İsraf", "Emanet ve dürüstlük", "Sabırsızlık", "Gösteriş"], a: 1 },
        { q: "Kevser suresinde \"Rabbin için namaz kıl ve kurban kes.\" buyrulmaktadır.\nSurenin temel mesajı hangisidir?",
          o: ["Ticaret kurallarına uymak", "Allah'ın verdiği nimetlere şükür ve kullukla karşılık vermek", "Savaş hukukunu öğrenmek", "Mirası adil paylaştırmak"], a: 1 }
      ]},
    { name: "4. Bölüm — LGS Tipi", info: "Değerler ve yaşamla ilişkilendirme",
      questions: [
        { q: "Ahmet, sınava hazırlanmadan \"Kaderimde ne varsa o olur, çalışmama gerek yok.\" diyen arkadaşına şu cevabı veriyor: \"Kader anlayışı çalışmayı ortadan kaldırmaz; elimizden geleni yapıp sonucu Allah'a bırakmak gerekir.\"\nAhmet'in bu sözü hangi anlayışa örnektir?",
          o: ["Kaderi suçlamak", "Çalışma sorumluluğu ile tevekkül anlayışını birlikte yaşamak", "Kaderi tamamen reddetmek", "Hiçbir çabaya gerek olmadığını savunmak"], a: 1 },
        { q: "Bir iş insanı, kazancının bir bölümünü kimse görmeden düzenli olarak ihtiyaç sahiplerine ulaştırmaktadır.\nBu davranışı en iyi açıklayan yargı hangisidir?",
          o: ["Zekât ibadeti ve gösterişten uzak yapılan yardımın fazileti", "Gösteriş yapma isteği", "Vergi ödemekten kaçınma", "Borçlarından kurtulma"], a: 0 },
        { q: "Din Kültürü öğretmeni derste cami, kilise ve havra fotoğrafları gösterip öğrencilere \"Bu ibadethanelerin ortak noktası nedir?\" diye soruyor.\nVerilebilecek en doğru cevap hangisidir?",
          o: ["Mimarilerinin birebir aynı olması", "İnsanların inanç ve ibadet özgürlüğüne saygı gösterilmesi gerektiği", "Hepsinin aynı dine ait olması", "İbadet biçiminin her yerde tek tip olması"], a: 1 },
        { q: "Peygamberimiz, Mekke döneminde kendisine eziyet edenlere kötülükle karşılık vermemiş, hatta onların sıhhatlerine dua etmiştir.\nBu davranış öncelikle hangi erdemi öne çıkarır?",
          o: ["İntikam alma", "Affetme ve hoşgörü", "Korkaklık", "İnatçılık"], a: 1 }
      ]}
  ]
},
{
  id: "din-kompile",
  subject: "din",
  kind: "kompile",
  title: "Din Kültürü ve Ahlak Bilgisi Kompile LGS Soru Bankası",
  subtitle: "Baştan sona LGS tarzı sorular",
  price: 2,
  sections: [
    { name: "LGS Tarzı Sorular", info: "Beceri temelli yeni nesil sorular",
      questions: [
        { q: "Kadir suresinde \"bin aydan daha hayırlı\" olduğu bildirilen gece hangisidir?",
          o: ["Regaib Kandili", "Kadir Gecesi", "Miraç Kandili", "Mevlid Kandili"], a: 1 },
        { q: "Peygamberimiz, peygamberlik öncesinde güvenilirliğiyle tanınırdı. Kendisine hangi unvan verilmiştir?",
          o: ["El-Fatih", "El-Emin", "Es-Sıddık", "El-Faruk"], a: 1 },
        { q: "Aşağıdakilerden hangisi İslam'ın şartlarından biri değildir?",
          o: ["Kelime-i şehadet getirmek", "Namaz kılmak", "Zekât vermek", "Umre yapmak"], a: 3 },
        { q: "Notunun yanlışlıkla yüksek girildiğini fark eden bir öğrenci durumu öğretmenine bildiriyor.\nBu öğrencinin davranışı hangi değerle doğrudan ilişkilidir?",
          o: ["Korku", "Dürüstlük", "Kibir", "Acelecilik"], a: 1 },
        { q: "Aşağıdakilerden hangisi oruç ibadetinin bireysel kazanımlarından biri değildir?",
          o: ["Nefsi terbiye etmesi", "Sabır kazandırması", "İhtiyaç sahipleriyle empati kurmayı sağlaması", "Gösteriş ve övünme sağlaması"], a: 3 },
        { q: "\"Şüphesiz müminler kardeştir.\" ayetiyle kardeşlik vurgusu yapılan sure hangisidir?",
          o: ["Hucurat Suresi", "Kevser Suresi", "İhlas Suresi", "Felak Suresi"], a: 0 },
        { q: "\"Kolaylaştırınız, zorlaştırmayınız; sevdiriniz, nefret ettirmeyiniz.\" hadisi öncelikle hangi konuda yol gösterir?",
          o: ["Alışveriş kuralları", "İnsan ilişkilerinde ve dini anlatırken kolaylaştırıcı, yapıcı bir üslup kullanma", "Askerlik düzeni", "Miras paylaşımı"], a: 1 },
        { q: "\"İlim Çin'de de olsa alınız.\" sözünün işaret ettiği değer hangisidir?",
          o: ["Uzun yolculuklar yapmak", "Nereden gelirse gelsin ilim öğrenmeye değer verip öğrenmeyi teşvik etmek", "Yalnızca yakın çevreden bilgi edinmek", "Ticarette kazancı artırmak"], a: 1 }
      ]}
  ]
},

/* ===================== İNGİLİZCE ===================== */
{
  id: "ingilizce-kademeli",
  subject: "ingilizce",
  kind: "kademeli",
  title: "İngilizce Kademeli Soru Bankası",
  subtitle: "Kolay → Orta → Zor → LGS Tipi",
  price: 3,
  sections: [
    { name: "1. Bölüm — Kolay Seviye", info: "Temel dil bilgisi ve kelime",
      questions: [
        { q: "\"I ____ a student and I ____ fourteen years old.\" cümlesinde boşluklara sırasıyla hangisi gelmelidir?",
          o: ["am / is", "is / are", "am / am", "are / am"], a: 2 },
        { q: "Hangisi bir meyvedir (fruit)?",
          o: ["Carrot", "Apple", "Bread", "Milk"], a: 1 },
        { q: "A: \"____?\"\nB: \"It's half past seven.\"\nBoşluğa hangi soru gelmelidir?",
          o: ["How old are you", "What time is it", "Where do you live", "What is this"], a: 1 },
        { q: "\"There ____ some milk in the bottle.\" cümlesinde boşluğa hangisi gelmelidir?",
          o: ["is", "are", "am", "be"], a: 0 }
      ]},
    { name: "2. Bölüm — Orta Seviye", info: "Metin ve diyalog tamamlama",
      questions: [
        { q: "\"Tom gets up at 7.30. He has breakfast at 8.00 and goes to school at 8.30.\"\nWhen does Tom go to school?",
          o: ["At 7.30", "At 8.00", "At 8.30", "At 9.00"], a: 2 },
        { q: "\"My brother is ____ at maths ____ me.\" cümlesinde boşluklara sırasıyla hangisi gelmelidir?",
          o: ["good / than", "better / than", "best / then", "better / then"], a: 1 },
        { q: "A: \"Would you like some tea?\"\nB: \"____. I'm full.\"\nBoşluğa en uygun ifade hangisidir?",
          o: ["Yes, please", "No, thanks", "Sure", "Here you are"], a: 1 },
        { q: "\"She ____ TV every evening.\" cümlesinde boşluğa hangisi gelmelidir?",
          o: ["watch", "watches", "watching", "watched"], a: 1 }
      ]},
    { name: "3. Bölüm — Zor Seviye", info: "Anlam çıkarımı",
      questions: [
        { q: "Ali: \"I have a terrible toothache.\"\nAyşe: \"You ____ see a dentist.\"\nBoşluğa hangisi gelmelidir?",
          o: ["should", "shouldn't", "mustn't", "can't"], a: 0 },
        { q: "\"Sue loves animals very much. She has two cats and a dog. She wants to be a vet when she grows up.\"\nWhy does Sue want to be a vet?",
          o: ["Because she likes money", "Because she loves animals", "Because her mother wants it", "Because she wants to travel"], a: 1 },
        { q: "\"Saturday is the ____ day of the week for me because I play football with my friends.\" Boşluğa anlamca en uygun kelime hangisidir?",
          o: ["boring", "favourite", "worst", "sad"], a: 1 },
        { q: "Hangisi diğerlerinden farklıdır (odd one)?",
          o: ["Monday", "June", "Friday", "Sunday"], a: 1 }
      ]},
    { name: "4. Bölüm — LGS Tipi", info: "Okuma anlama ve diyalog",
      questions: [
        { q: "Sınıfta yapılan ankette 15 öğrenci futbolu, 10 öğrenci basketbolu, 5 öğrenci voleybolu sevmektedir.\nWhich sport is the most popular?",
          o: ["Football", "Basketball", "Volleyball", "Tennis"], a: 0 },
        { q: "A: \"Can I speak to Mary?\"\nB: \"____. She is not at home at the moment.\"\nBoşluğa en uygun ifade hangisidir?",
          o: ["Hold the line, please", "I'm afraid you can't", "Sure, hang on a minute", "Speaking"], a: 1 },
        { q: "\"Dear Lisa, I'm sorry I can't come to your birthday party because my grandmother is ill. I hope you have a great time! Love, Kate.\"\nWhy can't Kate come to the party?",
          o: ["Because she is ill", "Because her grandmother is ill", "Because she has an exam", "Because she is on holiday"], a: 1 },
        { q: "plays / chess / my father / on Sundays\nKelimelerle kurulan doğru cümle hangisidir?",
          o: ["My father plays chess on Sundays.", "On Sundays plays my father chess.", "Plays my father chess on Sundays.", "Chess plays my father on Sundays."], a: 0 }
      ]}
  ]
},
{
  id: "ingilizce-kompile",
  subject: "ingilizce",
  kind: "kompile",
  title: "İngilizce Kompile LGS Soru Bankası",
  subtitle: "Baştan sona LGS tarzı sorular",
  price: 2,
  sections: [
    { name: "LGS Tarzı Sorular", info: "Beceri temelli yeni nesil sorular",
      questions: [
        { q: "\"Look! The children ____ in the garden.\" cümlesinde boşluğa hangisi gelmelidir?",
          o: ["play", "plays", "are playing", "played"], a: 2 },
        { q: "\"I ____ my homework yesterday evening.\" cümlesinde boşluğa hangisi gelmelidir?",
          o: ["do", "did", "does", "doing"], a: 1 },
        { q: "\"We go to school ____ bus.\" cümlesinde boşluğa hangisi gelmelidir?",
          o: ["with", "by", "on", "in"], a: 1 },
        { q: "A: \"____ do you live?\"\nB: \"In Ankara.\"\nBoşluğa hangi soru kelimesi gelmelidir?",
          o: ["When", "Where", "Who", "Why"], a: 1 },
        { q: "\"There isn't ____ water in the glass.\" cümlesinde boşluğa hangisi gelmelidir?",
          o: ["many", "a", "any", "few"], a: 2 },
        { q: "A: \"I'm really hungry.\"\nB: \"____\"\nBoşluğa en uygun ifade hangisidir?",
          o: ["Why don't you eat a sandwich?", "Congratulations!", "See you later.", "Never mind."], a: 0 },
        { q: "\"My favourite season is winter because I can ski and make a snowman.\"\nWhy does the writer love winter?",
          o: ["Because he can swim", "Because he can ski and make a snowman", "Because it is very hot", "Because school starts"], a: 1 },
        { q: "\"If it rains tomorrow, we ____ at home.\" cümlesinde boşluğa hangisi gelmelidir?",
          o: ["will stay", "stay", "stayed", "staying"], a: 0 }
      ]}
  ]
},

/* ===================== GENEL DENEME ===================== */
{
  id: "lgs-deneme-2026",
  subject: "deneme",
  kind: "deneme",
  title: "LGS Genel Deneme 2026 — 1. Oturum",
  subtitle: "Tüm derslerden karma deneme",
  price: 2,
  sections: [
    { name: "Genel Deneme", info: "Sınav provası — süre tutarak çözün",
      questions: [
        { tag: "Türkçe", q: "Elif, Zeynep ve Mert bir yarışmada ilk üç dereceyi paylaşmıştır.\n• Elif birinci değildir.\n• Zeynep, Elif'ten daha başarılıdır.\n• Mert üçüncüdür.\nBuna göre yarışmanın birincisi kimdir?",
          o: ["Elif", "Zeynep", "Mert", "Belirlenemez"], a: 1 },
        { tag: "Türkçe", q: "\"Uzmanlar, uyku öncesi ekran ışığının melatonin salgısını azalttığını ve uykuya dalmayı zorlaştırdığını belirtiyor. Bu nedenle yatmadan önce telefon ya da tablet yerine kitap okunmasını öneriyorlar.\" Bu paragrafın ana düşüncesi hangisidir?",
          o: ["Teknolojik aletler tamamen zararlıdır.", "Uykudan önce ekran yerine kitap okunması tercih edilmelidir.", "Melatonin bir vitamin türüdür.", "Kitaplar gün geçtikçe pahalılaşmaktadır."], a: 1 },
        { tag: "Matematik", q: "1'den 20'ye kadar numaralandırılmış kartlardan rastgele biri çekiliyor. Çekilen kartın üzerindeki sayının asal sayı olma olasılığı kaçtır?",
          o: ["1/2", "2/5", "3/10", "7/20"], a: 1 },
        { tag: "Matematik", q: "Bir manav pazartesi 30 kg, salı 45 kg, çarşamba 25 kg elma satmıştır.\nEn çok satış yapılan gün ile en az satış yapılan gün arasındaki fark kaç kg'dır?",
          o: ["15", "20", "25", "30"], a: 1 },
        { tag: "Fen Bilimleri", q: "Saf su ile aynı şartlarda hazırlanan tuzlu su çözeltisi karşılaştırıldığında hangisi doğrudur?",
          o: ["Tuz eklenmesi suyun kaynama noktasını yükseltir.", "Tuz eklenmesi suyun kaynama noktasını düşürür.", "Tuz, suyun sıcaklığını değiştirmez.", "Tuzlu su her durumda daha erken kaynar."], a: 0 },
        { tag: "Fen Bilimleri", q: "Aşağıdaki mikroskobik canlılardan hangisi insan yaşamında faydalıdır?",
          o: ["Gıda zehirlenmesine yol açan bakteriler", "Yoğurt yapımında kullanılan bakteriler", "Grip virüsü", "Ekmekte küf oluşturan mantarlar"], a: 1 },
        { tag: "İnkılap Tarihi", q: "Aşağıdaki gelişmelerden hangisi millî bağımsızlığı doğrudan ilgilendirir?",
          o: ["Kabotaj Kanunu'nun kabul edilmesi", "Yeni halı desenlerinin tasarlanması", "Nüfus sayımı yapılması", "Şehirlerarası yolların genişletilmesi"], a: 0 },
        { tag: "İnkılap Tarihi", q: "Atatürk'ün \"Yurtta sulh, cihanda sulh.\" ilkesinin temel amacı hangisidir?",
          o: ["Komşu ülkeler topraklarını genişletmek", "Barışçıl bir dış politika izlemek", "Tüm antlaşmaları feshetmek", "Yalnızca iç politikaya odaklanmak"], a: 1 },
        { tag: "Din Kültürü", q: "Sınıftaki öğrenciler harçlıklarından biriktirdikleri parayı depremzedelere gönderiyor.\nBu davranış öncelikle hangi değeri yansıtır?",
          o: ["İsraf", "Yardımlaşma ve infak", "Kibir", "Bencillik"], a: 1 },
        { tag: "Din Kültürü", q: "\"Hiçbiriniz kendisi için istediğini kardeşi için de istemedikçe gerçek mümin olamaz.\" hadisi hangi değeri vurgular?",
          o: ["Empati ve kardeşlik", "Korku", "Yalnızlık", "Acelecilik"], a: 0 },
        { tag: "İngilizce", q: "A: \"Would you like to come to the cinema with us?\"\nB: \"____. I must finish my project.\"\nBoşluğa en uygun ifade hangisidir?",
          o: ["Sure, why not?", "I'd love to, but I can't", "Of course, let's go!", "That sounds great!"], a: 1 },
        { tag: "İngilizce", q: "\"In Turkey, children celebrate 23rd April. They sing songs, dance and have fun at school.\"\nWhat do children do on 23rd April according to the text?",
          o: ["They sleep all day.", "They sing, dance and have fun.", "They go to work.", "They visit hospitals."], a: 1 }
      ]}
  ]
}
];
