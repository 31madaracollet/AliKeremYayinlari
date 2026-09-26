import type { Book, Question } from '../types'

export const questions: Question[] = [
  {
    id: 'din-001', subjectId: 'din', topic: 'Kader ve Kaza', difficulty: 1,
    stem: 'İslam inancına göre “kader” kavramının tanımı aşağıdakilerden hangisidir?',
    options: [
      'Allah’ın olmuş ve olacak her şeyi ezelde bilmesi ve takdir etmesi',
      'İnsanın hiçbir sorumluluğunun olmaması',
      'Olayların tesadüfen gerçekleşmesi',
      'Geleceğin insanlar tarafından bilinmesi',
    ],
    answer: 0,
    explanation: 'Kader, Allah’ın ezelî ilmiyle olmuş ve olacak her şeyi bilmesi ve bir ölçüye göre takdir etmesidir. Kaza ise bu takdirin zamanı geldiğinde gerçekleşmesidir.',
  },
  {
    id: 'din-002', subjectId: 'din', topic: 'Kader ve Kaza', difficulty: 2,
    stem: '“Her canlı ölümü tadacaktır.” ayeti evrendeki hangi yasa ile ilgilidir?',
    options: ['Fiziksel yasalar', 'Biyolojik yasalar', 'Toplumsal yasalar', 'Ekonomik yasalar'],
    answer: 1,
    explanation: 'Doğum, büyüme, gelişme, yaşlanma ve ölüm canlılar için geçerli biyolojik yasalardır. Bu yasalar Allah’ın evrene koyduğu düzenin parçasıdır.',
  },
  {
    id: 'din-003', subjectId: 'din', topic: 'Kader ve Kaza', difficulty: 2,
    stem: 'Aşağıdakilerden hangisi toplumsal yasalara örnektir?',
    options: [
      'Suyun 100 °C’de kaynaması',
      'Bitkilerin fotosentez yapması',
      'Adaletin olmadığı toplumların çökmesi',
      'Cisimlerin yere düşmesi',
    ],
    answer: 2,
    explanation: 'Toplumsal yasalar, insan topluluklarının işleyişiyle ilgilidir. Adaletsizliğin toplumları çöküşe götürmesi bu yasalara örnektir.',
  },
  {
    id: 'din-004', subjectId: 'din', topic: 'Kader ve Kaza', difficulty: 3,
    stem: 'İnsanın irade sahibi olması kader inancıyla nasıl bağdaşır?',
    options: [
      'İnsan iradesizdir, her şeyi Allah yaptırır.',
      'Allah insana cüzi irade vermiştir; insan seçimlerinden sorumludur.',
      'Kader yoktur, her şey insanın elindedir.',
      'İnsan yalnızca ibadetlerde özgürdür.',
    ],
    answer: 1,
    explanation: 'Allah’ın küllî iradesi yanında insana cüzi irade verilmiştir. İnsan seçimlerini özgürce yapar ve bu nedenle yaptıklarından sorumlu tutulur.',
  },
  {
    id: 'din-005', subjectId: 'din', topic: 'Kader ve Kaza', difficulty: 2,
    stem: '“Tevekkül” kavramının doğru tanımı hangisidir?',
    options: [
      'Hiçbir çaba göstermeden sonucu beklemek',
      'Üzerine düşeni yaptıktan sonra sonucu Allah’a bırakmak',
      'Başkalarından yardım istemek',
      'Gelecekten endişe duymak',
    ],
    answer: 1,
    explanation: 'Tevekkül, gerekli tedbirleri aldıktan ve çalıştıktan sonra sonucu Allah’a havale etmektir. Hz. Muhammed “Önce deveni bağla, sonra tevekkül et.” buyurmuştur.',
  },
  {
    id: 'din-006', subjectId: 'din', topic: 'Zekât ve Sadaka', difficulty: 1,
    stem: 'Zekât hangi durumdaki kişilere farzdır?',
    options: [
      'Bütün Müslümanlara',
      'Dinen zengin sayılan (nisap miktarına ulaşmış) Müslümanlara',
      'Yalnızca tüccarlara',
      'Yalnızca çiftçilere',
    ],
    answer: 1,
    explanation: 'Zekât, temel ihtiyaçlarından fazla olarak nisap miktarı mala sahip olan ve bu malın üzerinden bir yıl geçen Müslümanlara farzdır.',
  },
  {
    id: 'din-007', subjectId: 'din', topic: 'Zekât ve Sadaka', difficulty: 2,
    stem: 'Altın ve gümüş dışındaki ticaret mallarında zekât oranı kaçtır?',
    options: ['1/10', '1/20', '1/40', '1/50'],
    answer: 2,
    explanation: 'Ticaret malları ve nakit para için zekât oranı kırkta bir (1/40), yani %2,5’tir.',
  },
  {
    id: 'din-008', subjectId: 'din', topic: 'Zekât ve Sadaka', difficulty: 2,
    stem: 'Zekât ile sadaka arasındaki temel fark nedir?',
    options: [
      'Zekât farz, sadaka gönüllüdür.',
      'Zekât gönüllü, sadaka farzdır.',
      'İkisi de aynı anlamdadır.',
      'Zekât yalnızca Ramazan’da verilir.',
    ],
    answer: 0,
    explanation: 'Zekât belirli şartları taşıyan kişiler için farz olan bir ibadettir. Sadaka ise herkesin, her miktarda, gönüllü olarak verebileceği bir yardımdır.',
  },
  {
    id: 'din-009', subjectId: 'din', topic: 'Zekât ve Sadaka', difficulty: 3,
    stem: '“Sadaka-i câriye” kavramı aşağıdakilerden hangisini ifade eder?',
    options: [
      'Bir defaya mahsus verilen yardım',
      'Faydası sürekli devam eden hayır işi',
      'Ramazan ayında verilen fitre',
      'Yalnızca akrabalara verilen yardım',
    ],
    answer: 1,
    explanation: 'Sadaka-i câriye, çeşme yaptırmak, okul kurmak, kitap bağışlamak gibi faydası uzun süre devam eden hayır işleridir. Kişi vefat etse de sevabı devam eder.',
  },
  {
    id: 'din-010', subjectId: 'din', topic: 'Din ve Hayat', difficulty: 2,
    stem: 'İslam dininde “helal kazanç” ilkesinin amacı nedir?',
    options: [
      'Zenginliği engellemek',
      'Emeğin karşılığını meşru yollarla elde etmeyi sağlamak',
      'Ticareti yasaklamak',
      'Sadece tarımı teşvik etmek',
    ],
    answer: 1,
    explanation: 'Helal kazanç, hile, faiz, kumar ve haksızlık gibi yollardan uzak durarak alın teriyle kazanmayı ifade eder. Bu ilke toplumsal güveni korur.',
  },
  {
    id: 'din-011', subjectId: 'din', topic: 'Din ve Hayat', difficulty: 2,
    stem: 'Aşağıdakilerden hangisi İslam’ın aile kurumuna verdiği öneme örnek olarak gösterilemez?',
    options: [
      'Anne babaya iyi davranmanın emredilmesi',
      'Akraba ziyaretinin teşvik edilmesi',
      'Nikâhın önemsenmesi',
      'Bireyin toplumdan uzaklaşmasının istenmesi',
    ],
    answer: 3,
    explanation: 'İslam, bireyin toplumla ve aileyle bağını güçlendirmeyi öğütler. Toplumdan uzaklaşma, dinin öğretileriyle bağdaşmaz.',
  },
  {
    id: 'din-012', subjectId: 'din', topic: 'Hz. Muhammed’in Örnekliği', difficulty: 1,
    stem: 'Hz. Muhammed’e peygamberlik öncesinde verilen “el-Emin” lakabının anlamı nedir?',
    options: ['Cesur', 'Güvenilir', 'Cömert', 'Bilgili'],
    answer: 1,
    explanation: '“El-Emin” güvenilir demektir. Hz. Muhammed dürüstlüğü ve emanete sadakati nedeniyle daha peygamberlik gelmeden bu lakapla anılmıştır.',
  },
  {
    id: 'din-013', subjectId: 'din', topic: 'Hz. Muhammed’in Örnekliği', difficulty: 2,
    stem: 'Hz. Muhammed’in “istişare”ye verdiği önem aşağıdaki olaylardan hangisinde açıkça görülür?',
    options: [
      'Hendek Savaşı öncesi hendek kazılması kararı',
      'Namaz vakitlerinin belirlenmesi',
      'Kur’an ayetlerinin indirilmesi',
      'Oruç ibadetinin farz kılınması',
    ],
    answer: 0,
    explanation: 'Hendek Savaşı öncesinde Selman-ı Farisi’nin hendek kazma önerisi istişare ile kabul edilmiştir. Bu, Peygamberin danışmaya verdiği önemi gösterir.',
  },
  {
    id: 'din-014', subjectId: 'din', topic: 'Hz. Muhammed’in Örnekliği', difficulty: 2,
    stem: 'Veda Hutbesi’nde vurgulanan temel ilkeler arasında aşağıdakilerden hangisi yer almaz?',
    options: [
      'Can ve mal dokunulmazlığı',
      'Kadın haklarının korunması',
      'Irk üstünlüğünün reddi',
      'Ticaretin yasaklanması',
    ],
    answer: 3,
    explanation: 'Veda Hutbesi’nde can, mal ve namus dokunulmazlığı, kadın hakları, faizin kaldırılması ve insanların eşitliği vurgulanmıştır. Ticaret yasaklanmamıştır.',
  },
  {
    id: 'din-015', subjectId: 'din', topic: 'Kur’an-ı Kerim', difficulty: 1,
    stem: 'Kur’an-ı Kerim kaç sureden oluşur?',
    options: ['110', '114', '120', '124'],
    answer: 1,
    explanation: 'Kur’an-ı Kerim 114 sureden oluşur. İlk suresi Fatiha, son suresi Nas’tır.',
  },
  {
    id: 'din-016', subjectId: 'din', topic: 'Kur’an-ı Kerim', difficulty: 2,
    stem: 'Kur’an-ı Kerim’in kitap hâline getirilmesi (cem edilmesi) hangi halife döneminde olmuştur?',
    options: ['Hz. Ebu Bekir', 'Hz. Ömer', 'Hz. Osman', 'Hz. Ali'],
    answer: 0,
    explanation: 'Kur’an, Hz. Ebu Bekir döneminde Zeyd bin Sabit başkanlığındaki heyet tarafından bir araya getirilmiştir. Hz. Osman döneminde ise çoğaltılıp dağıtılmıştır.',
  },
  {
    id: 'din-017', subjectId: 'din', topic: 'Kur’an-ı Kerim', difficulty: 2,
    stem: 'Kur’an-ı Kerim’in ilk inen ayetleri hangi surededir?',
    options: ['Fatiha', 'Bakara', 'Alak', 'İhlas'],
    answer: 2,
    explanation: 'İlk inen ayetler Alak suresinin ilk beş ayetidir ve “Oku!” emriyle başlar. Bu, İslam’ın ilme verdiği önemi gösterir.',
  },
  {
    id: 'din-018', subjectId: 'din', topic: 'Din ve Hayat', difficulty: 3,
    stem: '“Komşusu açken tok yatan bizden değildir.” hadisi hangi değeri vurgular?',
    options: ['Sabır', 'Toplumsal dayanışma ve paylaşma', 'Temizlik', 'Cesaret'],
    answer: 1,
    explanation: 'Hadis, Müslümanların birbirinden sorumlu olduğunu, paylaşma ve dayanışmanın dinî bir gereklilik olduğunu vurgular.',
  },
]

export const book: Book = {
  id: 'din-8',
  subjectId: 'din',
  title: 'Din Kültürü ve Ahlak Bilgisi 8',
  subtitle: 'Kader, İbadet ve Ahlak Üzerine',
  author: 'Ali Kerem Yayınları Din Kültürü Kurulu',
  edition: '1. Baskı',
  year: 2026,
  blurb:
    'Kavramları tanımlarıyla, tanımları hayatla buluşturan bir anlatım. Her ünite ayet, hadis ve günlük hayattan örneklerle destekleniyor.',
  chapters: [
    {
      id: 'din-u1',
      title: '1. Ünite — Kader ve Kaza',
      pages: [
        {
          id: 'din-u1-p1', kind: 'content',
          title: 'Kader ve Kaza İnancı',
          subtitle: 'Evrendeki ölçü ve düzen',
          blocks: [
            {
              id: 'b1', type: 'terms',
              items: [
                { term: 'Kader', def: 'Allah’ın olmuş ve olacak her şeyi ezelî ilmiyle bilmesi ve bir ölçüye göre takdir etmesidir.' },
                { term: 'Kaza', def: 'Allah’ın ezelde takdir ettiği şeylerin zamanı gelince gerçekleşmesidir.' },
                { term: 'Ecel', def: 'Her canlı için belirlenmiş yaşam süresi.' },
                { term: 'Rızık', def: 'Allah’ın canlılara verdiği maddi ve manevi nimetler.' },
                { term: 'Tevekkül', def: 'Üzerine düşeni yaptıktan sonra sonucu Allah’a bırakmak.' },
                { term: 'Cüzi irade', def: 'İnsana verilen sınırlı seçme ve karar verme yetisi.' },
              ],
            },
            { id: 'b2', type: 'h3', text: 'Evrendeki Yasalar' },
            {
              id: 'b3', type: 'table',
              headers: ['Yasa türü', 'Konusu', 'Örnek'],
              rows: [
                ['Fiziksel yasalar', 'Madde ve enerji', 'Yer çekimi, suyun kaldırma kuvveti'],
                ['Biyolojik yasalar', 'Canlılar', 'Doğum, büyüme, üreme, ölüm'],
                ['Toplumsal yasalar', 'İnsan toplulukları', 'Adaletsizlik toplumları çökertir'],
              ],
            },
            {
              id: 'b4', type: 'callout', variant: 'bilgi', title: 'Sünnetullah',
              text: 'Allah’ın evrene koyduğu değişmez yasalara “sünnetullah” denir. Bu yasalar sayesinde evrende düzen ve öngörülebilirlik vardır. Bilim, bu yasaları keşfetme çabasıdır.',
            },
            {
              id: 'b5', type: 'quote',
              text: 'Şüphesiz biz her şeyi bir ölçüye göre yarattık.',
              source: 'Kamer suresi, 49. ayet',
            },
          ],
        },
        {
          id: 'din-u1-p2', kind: 'content',
          title: 'İnsan İradesi ve Sorumluluk',
          subtitle: 'Özgürlük ve hesap verebilirlik',
          blocks: [
            { id: 'b1', type: 'p', text: 'Kader inancı, insanın sorumsuz olduğu anlamına gelmez. Allah insana akıl ve irade vermiş, doğru ile yanlışı seçme gücü tanımıştır. Bu nedenle insan, yaptığı seçimlerden sorumludur.' },
            {
              id: 'b2', type: 'callout', variant: 'dikkat', title: 'Yaygın bir yanılgı',
              text: '“Nasıl olsa kaderimde varmış” diyerek sorumluluktan kaçmak İslam’ın kader anlayışıyla bağdaşmaz. Ders çalışmayan bir öğrencinin başarısızlığı kaderin değil, kendi tercihinin sonucudur.',
            },
            { id: 'b3', type: 'h3', text: 'Tevekkül ve Çalışma' },
            {
              id: 'b4', type: 'list',
              items: [
                'Önce sebeplere sarılmak gerekir: Hastalanınca doktora gitmek, sınav için çalışmak.',
                'Sonra sonucu Allah’a havale etmek: Elinden geleni yaptıktan sonra kaygıya kapılmamak.',
                'Tevekkül tembellik değil, huzurdur; çabanın ardından gelen teslimiyettir.',
              ],
            },
            {
              id: 'b5', type: 'quote',
              text: 'İnsan için ancak çalıştığının karşılığı vardır.',
              source: 'Necm suresi, 39. ayet',
            },
            {
              id: 'b6', type: 'callout', variant: 'ipucu', title: 'Sınav notu',
              text: 'LGS’de kader konusundaki sorular çoğunlukla “hangi yasa türüne örnektir?” ya da “tevekkülün doğru anlamı nedir?” biçiminde gelir. Kavram tanımlarını net bilmek yeterlidir.',
            },
          ],
        },
        {
          id: 'din-u1-q', kind: 'quiz',
          title: '1. Ünite Değerlendirme Testi',
          subtitle: 'Kader ve Kaza',
          questionIds: ['din-001', 'din-002', 'din-003', 'din-004', 'din-005'],
        },
      ],
    },
    {
      id: 'din-u2',
      title: '2. Ünite — Zekât, Sadaka ve Din ile Hayat',
      pages: [
        {
          id: 'din-u2-p1', kind: 'content',
          title: 'Zekât ve Sadaka',
          subtitle: 'Paylaşmanın ibadete dönüşmesi',
          blocks: [
            { id: 'b1', type: 'p', text: 'Zekât, İslam’ın beş şartından biridir ve malı arındırma anlamına gelir. Dinen zengin sayılan kişilerin, mallarının belirli bir oranını ihtiyaç sahiplerine vermesidir. Sadaka ise herkesin gönüllü olarak yapabileceği bir yardımdır.' },
            {
              id: 'b2', type: 'table',
              caption: 'Zekât ve sadakanın karşılaştırılması',
              headers: ['', 'Zekât', 'Sadaka'],
              rows: [
                ['Hüküm', 'Farz', 'Gönüllü (nafile)'],
                ['Kimler verir?', 'Nisap miktarına ulaşanlar', 'Herkes'],
                ['Miktar', 'Belirli (genellikle 1/40)', 'Serbest'],
                ['Zaman', 'Mal üzerinden bir yıl geçince', 'Her zaman'],
                ['Kime verilir?', 'Kur’an’da sayılan sekiz sınıf', 'İhtiyacı olan herkes'],
              ],
            },
            {
              id: 'b3', type: 'callout', variant: 'tanim', title: 'Nisap nedir?',
              text: 'Zekâtın farz olması için gereken asgari zenginlik ölçüsüdür. Temel ihtiyaçlar ve borçlar düşüldükten sonra 80,18 gram altın ya da bunun değerinde mala sahip olmak ve bu malın üzerinden bir kamerî yıl geçmiş olması gerekir.',
            },
            {
              id: 'b4', type: 'list',
              items: [
                'Fitre (sadaka-i fıtır): Ramazan Bayramı öncesi, aile bireyi başına verilen vacip bir sadakadır.',
                'Sadaka-i câriye: Faydası sürekli devam eden hayır işi (çeşme, okul, kitap bağışı).',
                'İnfak: Allah rızası için yapılan her türlü harcama.',
                'Güler yüz göstermek, yol tarif etmek, zararlı bir şeyi yoldan kaldırmak da sadaka sayılır.',
              ],
            },
            {
              id: 'b5', type: 'quote',
              text: 'Mallarını gece ve gündüz, gizli ve açık infak edenler var ya, onların Rableri katında ödülleri vardır.',
              source: 'Bakara suresi, 274. ayet',
            },
          ],
        },
        {
          id: 'din-u2-p2', kind: 'content',
          title: 'Din ve Hayat',
          subtitle: 'İnanç, aile ve çalışma hayatı',
          blocks: [
            { id: 'b1', type: 'h3', text: 'Din, Birey ve Toplum' },
            { id: 'b2', type: 'p', text: 'Din yalnızca ibadetlerden ibaret değildir; kişinin aile, komşuluk, ticaret ve çalışma hayatını da düzenleyen ilkeler sunar. İslam, bireyin huzurunu toplumun huzuruyla birlikte düşünür.' },
            {
              id: 'b3', type: 'terms',
              items: [
                { term: 'Helal kazanç', def: 'Emeğin karşılığı olan, meşru yollardan elde edilen kazanç. Hile, faiz, kumar ve haksızlık haramdır.' },
                { term: 'Emanet', def: 'Kendisine güvenilerek bırakılan şeyi korumak ve sahibine eksiksiz teslim etmek.' },
                { term: 'İstişare', def: 'Karar verirken danışmak, ortak akla başvurmak.' },
                { term: 'Sıla-i rahim', def: 'Akraba ziyareti ve akrabalarla ilişkiyi sürdürmek.' },
                { term: 'İnfak', def: 'Sahip olunan imkânları Allah rızası için başkalarıyla paylaşmak.' },
              ],
            },
            {
              id: 'b4', type: 'callout', variant: 'bilgi', title: 'Aile',
              text: 'İslam’da aile, toplumun temel yapı taşıdır. Anne babaya iyi davranmak (birr), eşler arasında sevgi ve saygı, çocukların eğitimi ve akrabalık bağlarının korunması özellikle vurgulanır.',
            },
            {
              id: 'b5', type: 'quote',
              text: 'Sizin en hayırlınız, ailesine karşı en hayırlı olanınızdır.',
              source: 'Hz. Muhammed (Tirmizî)',
            },
          ],
        },
        {
          id: 'din-u2-q', kind: 'quiz',
          title: '2. Ünite Değerlendirme Testi',
          subtitle: 'Zekât, Sadaka ve Din ile Hayat',
          questionIds: ['din-006', 'din-007', 'din-008', 'din-009', 'din-010', 'din-011', 'din-018'],
        },
      ],
    },
    {
      id: 'din-u3',
      title: '3. Ünite — Hz. Muhammed ve Kur’an-ı Kerim',
      pages: [
        {
          id: 'din-u3-p1', kind: 'content',
          title: 'Hz. Muhammed’in Örnekliği',
          subtitle: 'Bir hayatın ilkeleri',
          blocks: [
            { id: 'b1', type: 'p', text: 'Hz. Muhammed, Müslümanlar için yalnızca bir peygamber değil, aynı zamanda örnek alınacak bir insandır. Kur’an onun için “üsve-i hasene” yani “en güzel örnek” ifadesini kullanır.' },
            {
              id: 'b2', type: 'list',
              items: [
                'Güvenilirlik: Peygamberlikten önce bile “el-Emin” olarak anılıyordu.',
                'Merhamet: Çocuklara, kadınlara, yaşlılara ve hayvanlara şefkatle davrandı.',
                'Adalet: Kimseye ayrıcalık tanımadı; “Kızım Fatıma bile olsa” sözü bunun ifadesidir.',
                'İstişare: Önemli kararlarda arkadaşlarına danıştı (Hendek Savaşı’nda hendek kazma kararı).',
                'Sabır: Taif’te taşlandığında beddua etmedi.',
                'Hoşgörü: Mekke’nin fethinde kendisine düşmanlık edenleri affetti.',
              ],
            },
            {
              id: 'b3', type: 'callout', variant: 'bilgi', title: 'Veda Hutbesi’nin ilkeleri',
              text: 'Can, mal ve namus dokunulmazlığı; faizin kaldırılması; kadın haklarının korunması; ırk üstünlüğünün reddi; emanete sadakat; kan davalarının sona erdirilmesi. Bu hutbe, evrensel bir insan hakları metni olarak kabul edilir.',
            },
            {
              id: 'b4', type: 'quote',
              text: 'Ey insanlar! Rabbiniz birdir, babanız birdir. Arabın Arap olmayana, Arap olmayanın Araba üstünlüğü yoktur. Üstünlük ancak takva iledir.',
              source: 'Veda Hutbesi',
            },
          ],
        },
        {
          id: 'din-u3-p2', kind: 'content',
          title: 'Kur’an-ı Kerim ve Özellikleri',
          subtitle: 'İndirilişinden kitap hâline gelişine',
          blocks: [
            {
              id: 'b1', type: 'list', ordered: true,
              items: [
                'Kur’an, 610 yılında Hira Mağarası’nda Alak suresinin ilk beş ayetiyle inmeye başladı.',
                'Vahiy yaklaşık 23 yıl boyunca parça parça indirildi.',
                'Hz. Muhammed döneminde vahiy kâtipleri tarafından yazıldı ve ezberlendi.',
                'Hz. Ebu Bekir döneminde Zeyd bin Sabit başkanlığında bir araya getirildi (cem).',
                'Hz. Osman döneminde çoğaltılarak önemli merkezlere gönderildi (istinsah).',
              ],
            },
            {
              id: 'b2', type: 'terms',
              items: [
                { term: 'Sure', def: 'Kur’an’ın ayetlerden oluşan bölümleri. Toplam 114 suredir.' },
                { term: 'Ayet', def: 'Surelerin en küçük anlamlı birimleri.' },
                { term: 'Cüz', def: 'Kur’an’ın okumayı kolaylaştırmak için ayrıldığı 30 eşit bölümden her biri.' },
                { term: 'Mushaf', def: 'Kur’an ayetlerinin iki kapak arasında toplanmış hâli.' },
                { term: 'Tefsir', def: 'Kur’an ayetlerinin açıklanması ve yorumlanması.' },
                { term: 'Meal', def: 'Kur’an’ın yaklaşık anlamının başka bir dile çevrilmesi.' },
              ],
            },
            {
              id: 'b3', type: 'callout', variant: 'ipucu', title: 'Sık sorulan bilgiler',
              text: 'En uzun sure: Bakara. En kısa sure: Kevser. İlk sure: Fatiha. Son sure: Nas. İlk inen ayetler: Alak 1-5. Kur’an’ın kalbi olarak anılan sure: Yasin.',
            },
          ],
        },
        {
          id: 'din-u3-q', kind: 'quiz',
          title: '3. Ünite Değerlendirme Testi',
          subtitle: 'Hz. Muhammed ve Kur’an-ı Kerim',
          questionIds: ['din-012', 'din-013', 'din-014', 'din-015', 'din-016', 'din-017'],
        },
      ],
    },
  ],
}
