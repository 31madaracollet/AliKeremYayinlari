import type { Book, Question } from '../types'

export const questions: Question[] = [
  {
    id: 'eng-001', subjectId: 'ingilizce', topic: 'Friendship', difficulty: 1,
    stem: 'Ali: “What do you think about studying together?”\nLeyla: “………… . Two heads are better than one.”',
    options: ['I disagree', 'That sounds great', 'I am afraid not', 'Never mind'],
    answer: 1,
    explanation: 'Leyla’nın ikinci cümlesi olumlu bir atasözüdür (“İki akıl bir akıldan iyidir”). Bu nedenle boşluğa katılma bildiren “That sounds great” gelmelidir.',
  },
  {
    id: 'eng-002', subjectId: 'ingilizce', topic: 'Friendship', difficulty: 2,
    stem: 'Choose the option that best describes a person who always tells the truth and keeps secrets.',
    options: ['selfish', 'trustworthy', 'jealous', 'lazy'],
    answer: 1,
    explanation: '“Trustworthy” güvenilir demektir; doğruyu söyleyen ve sır tutan kişiyi tanımlar. Selfish bencil, jealous kıskanç, lazy tembel anlamındadır.',
  },
  {
    id: 'eng-003', subjectId: 'ingilizce', topic: 'Teen Life', difficulty: 2,
    stem: 'I ………… go to bed late on weekdays because I have to get up early.',
    options: ['always', 'usually', 'hardly ever', 'often'],
    answer: 2,
    explanation: 'Cümlede erken kalkma zorunluluğu belirtildiği için geç yatmanın nadiren olduğu anlaşılır. “Hardly ever” neredeyse hiç anlamındadır.',
  },
  {
    id: 'eng-004', subjectId: 'ingilizce', topic: 'Teen Life', difficulty: 2,
    stem: 'How ………… do you go to the cinema? — About twice a month.',
    options: ['much', 'many', 'often', 'long'],
    answer: 2,
    explanation: 'Cevap sıklık bildirdiği için (“ayda iki kez”) soru “How often” ile sorulmalıdır.',
  },
  {
    id: 'eng-005', subjectId: 'ingilizce', topic: 'In the Kitchen', difficulty: 1,
    stem: 'First, ………… the onions into small pieces, then fry them in olive oil.',
    options: ['boil', 'chop', 'pour', 'bake'],
    answer: 1,
    explanation: '“Chop” doğramak demektir. Soğanı küçük parçalara ayırmak için kullanılır. Boil haşlamak, pour dökmek, bake fırında pişirmek anlamındadır.',
  },
  {
    id: 'eng-006', subjectId: 'ingilizce', topic: 'In the Kitchen', difficulty: 2,
    stem: 'We need two ………… of flour and a ………… of milk for this cake.',
    options: ['cups / glass', 'slices / bar', 'bars / loaf', 'bottles / bowl'],
    answer: 0,
    explanation: 'Un için “cup” (fincan/su bardağı ölçüsü), süt için “glass” kullanılır. Diğer seçeneklerdeki ölçü birimleri bu malzemelerle uyumsuzdur.',
  },
  {
    id: 'eng-007', subjectId: 'ingilizce', topic: 'On the Phone', difficulty: 1,
    stem: '“Hello, can I speak to Mr. Yılmaz, please?” — “………… , he is in a meeting right now.”',
    options: ['Of course', 'I’m sorry', 'Yes, speaking', 'Sure, hold on'],
    answer: 1,
    explanation: 'Devamında olumsuz bir durum (toplantıda olması) belirtildiği için özür bildiren “I’m sorry” uygundur.',
  },
  {
    id: 'eng-008', subjectId: 'ingilizce', topic: 'On the Phone', difficulty: 2,
    stem: 'Which one is NOT used to ask someone to wait on the phone?',
    options: ['Hold on, please.', 'Just a moment, please.', 'Hang on a second.', 'Wrong number.'],
    answer: 3,
    explanation: '“Wrong number” yanlış numara anlamındadır ve beklemeyi istemek için kullanılmaz. Diğer üçü bekletme kalıplarıdır.',
  },
  {
    id: 'eng-009', subjectId: 'ingilizce', topic: 'The Internet', difficulty: 2,
    stem: 'You shouldn’t ………… your personal information with strangers online.',
    options: ['download', 'share', 'delete', 'install'],
    answer: 1,
    explanation: '“Share” paylaşmak demektir. İnternet güvenliği konusunda kişisel bilgilerin paylaşılmaması uyarısı yapılmaktadır.',
  },
  {
    id: 'eng-010', subjectId: 'ingilizce', topic: 'The Internet', difficulty: 2,
    stem: 'I use the internet ………… doing research for my homework.',
    options: ['for', 'to', 'with', 'about'],
    answer: 0,
    explanation: 'Amaç bildirirken fiilin -ing hâli kullanılıyorsa “for” edatı gelir: “for doing research”. “to” kullanılsaydı yalın fiil gerekirdi: “to do research”.',
  },
  {
    id: 'eng-011', subjectId: 'ingilizce', topic: 'Adventures', difficulty: 2,
    stem: 'Rafting is more ………… than hiking, so you should be careful.',
    options: ['boring', 'dangerous', 'relaxing', 'cheap'],
    answer: 1,
    explanation: 'Cümlenin sonundaki “dikkatli olmalısın” uyarısı, raftingin daha tehlikeli olduğunu gösterir.',
  },
  {
    id: 'eng-012', subjectId: 'ingilizce', topic: 'Adventures', difficulty: 3,
    stem: 'If you want to try paragliding, you ………… wear a helmet.',
    options: ['mustn’t', 'must', 'don’t have to', 'can’t'],
    answer: 1,
    explanation: 'Kask takmak bir zorunluluktur; “must” güçlü zorunluluk bildirir. “mustn’t” yasak, “don’t have to” gereksizlik anlamı taşır.',
  },
  {
    id: 'eng-013', subjectId: 'ingilizce', topic: 'Tourism', difficulty: 1,
    stem: 'Cappadocia is famous ………… its fairy chimneys and hot air balloons.',
    options: ['of', 'for', 'with', 'in'],
    answer: 1,
    explanation: '“Be famous for” kalıbı bir yerin neyle ünlü olduğunu belirtir.',
  },
  {
    id: 'eng-014', subjectId: 'ingilizce', topic: 'Tourism', difficulty: 2,
    stem: 'A: “What was your holiday like?”  B: “It ………… wonderful! We visited three cities.”',
    options: ['is', 'was', 'were', 'will be'],
    answer: 1,
    explanation: 'Soru geçmiş zamanda (“was”) sorulmuştur ve özne “it” tekildir. Bu nedenle cevap “was” olmalıdır.',
  },
  {
    id: 'eng-015', subjectId: 'ingilizce', topic: 'Chores', difficulty: 1,
    stem: 'My brother never helps at home. He never ………… the rubbish out.',
    options: ['makes', 'does', 'takes', 'gets'],
    answer: 2,
    explanation: '“Take the rubbish out” çöpü dışarı çıkarmak anlamında kalıplaşmış bir ifadedir.',
  },
  {
    id: 'eng-016', subjectId: 'ingilizce', topic: 'Chores', difficulty: 2,
    stem: 'Which one does NOT go with the verb “do”?',
    options: ['the dishes', 'the laundry', 'the bed', 'the ironing'],
    answer: 2,
    explanation: 'Yatağı toplamak için “make the bed” kalıbı kullanılır. Diğerleri “do the dishes / laundry / ironing” biçiminde kullanılır.',
  },
  {
    id: 'eng-017', subjectId: 'ingilizce', topic: 'Science', difficulty: 2,
    stem: 'Thomas Edison ………… the light bulb in 1879.',
    options: ['invents', 'invented', 'is inventing', 'will invent'],
    answer: 1,
    explanation: 'Cümlede geçmiş bir tarih (1879) verildiği için Simple Past Tense kullanılmalıdır: “invented”.',
  },
  {
    id: 'eng-018', subjectId: 'ingilizce', topic: 'Science', difficulty: 3,
    stem: 'The telephone ………… by Alexander Graham Bell.',
    options: ['invented', 'was invented', 'is inventing', 'has invent'],
    answer: 1,
    explanation: 'Telefon icat edilen nesnedir; edilgen yapı gerekir. Geçmiş zaman edilgen: was/were + V3 → “was invented”.',
  },
  {
    id: 'eng-019', subjectId: 'ingilizce', topic: 'Natural Forces', difficulty: 2,
    stem: 'During an earthquake, you should ………… under a strong table.',
    options: ['run', 'jump', 'take shelter', 'shout'],
    answer: 2,
    explanation: '“Take shelter” sığınmak demektir. Deprem sırasında sağlam bir masanın altına sığınmak güvenlik önlemidir.',
  },
  {
    id: 'eng-020', subjectId: 'ingilizce', topic: 'Natural Forces', difficulty: 2,
    stem: 'A long period without rain is called a ………… .',
    options: ['flood', 'drought', 'avalanche', 'hurricane'],
    answer: 1,
    explanation: '“Drought” kuraklık demektir. Flood sel, avalanche çığ, hurricane kasırga anlamındadır.',
  },
]

export const book: Book = {
  id: 'ingilizce-8',
  subjectId: 'ingilizce',
  title: 'English 8 — Ten Units, One Book',
  subtitle: 'LGS İngilizce Kelime, Kalıp ve Diyalog Kitabı',
  author: 'Ali Kerem Yayınları İngilizce Kurulu',
  edition: '1. Baskı',
  year: 2026,
  blurb:
    'LGS İngilizce soruları gramerden çok kalıp ve kelime ölçer. Bu kitap on ünitenin tamamını diyaloglar, kalıp listeleri ve mini sözlüklerle veriyor.',
  chapters: [
    {
      id: 'eng-u1',
      title: 'Part 1 — Friendship, Teen Life & In the Kitchen',
      pages: [
        {
          id: 'eng-u1-p1', kind: 'content',
          title: 'Unit 1 — Friendship',
          subtitle: 'Accepting, refusing and making excuses',
          blocks: [
            { id: 'b1', type: 'p', text: 'Bu ünitede bir teklifi kabul etme, reddetme ve mazeret bildirme kalıplarını öğreneceksiniz. LGS’de bu ünite genellikle kısa bir diyalog ve boşluk doldurma biçiminde sorulur.' },
            {
              id: 'b2', type: 'table',
              caption: 'Key expressions',
              headers: ['Accepting (Kabul)', 'Refusing (Ret)', 'Making excuses (Mazeret)'],
              rows: [
                ['That sounds great!', 'I’m afraid I can’t.', 'I have to study for the exam.'],
                ['Sure, I’d love to.', 'Sorry, but I’m busy.', 'I’m not feeling well.'],
                ['Why not? Let’s go.', 'Maybe next time.', 'I have other plans.'],
                ['Good idea!', 'I don’t feel like it.', 'My parents won’t let me.'],
              ],
            },
            {
              id: 'b3', type: 'dialog',
              lines: [
                { who: 'Deniz', text: 'Would you like to go to the cinema this evening?' },
                { who: 'Kerem', text: 'I’d love to, but I’m afraid I can’t. I have to help my mum.' },
                { who: 'Deniz', text: 'No problem. What about tomorrow?' },
                { who: 'Kerem', text: 'That sounds great! See you at six.' },
              ],
            },
            {
              id: 'b4', type: 'terms',
              items: [
                { term: 'trustworthy', def: 'güvenilir' },
                { term: 'generous', def: 'cömert' },
                { term: 'selfish', def: 'bencil' },
                { term: 'supportive', def: 'destekleyici' },
                { term: 'jealous', def: 'kıskanç' },
                { term: 'get on well with', def: 'iyi geçinmek' },
              ],
            },
            {
              id: 'b5', type: 'callout', variant: 'ipucu', title: 'Exam tip',
              text: 'Boşluktan sonraki cümleye bakın. Olumlu bir devam varsa kabul kalıbı, olumsuz bir sebep varsa ret ya da mazeret kalıbı gelir. Bu tek ipucu, bu ünitedeki soruların çoğunu çözer.',
            },
          ],
        },
        {
          id: 'eng-u1-p2', kind: 'content',
          title: 'Unit 2 — Teen Life',
          subtitle: 'Frequency adverbs and routines',
          blocks: [
            {
              id: 'b1', type: 'table',
              caption: 'Frequency adverbs',
              headers: ['Adverb', 'Percentage', 'Türkçe'],
              rows: [
                ['always', '%100', 'her zaman'],
                ['usually', '%80', 'genellikle'],
                ['often', '%60', 'sık sık'],
                ['sometimes', '%40', 'bazen'],
                ['rarely / seldom', '%20', 'nadiren'],
                ['hardly ever', '%5', 'neredeyse hiç'],
                ['never', '%0', 'asla'],
              ],
            },
            {
              id: 'b2', type: 'callout', variant: 'bilgi', title: 'Word order',
              text: 'Sıklık zarfları “be” fiilinden sonra, diğer fiillerden önce gelir: “She is always late.” / “She always comes late.” Bu kural doğrudan soru olarak sorulabilir.',
            },
            {
              id: 'b3', type: 'list',
              items: [
                'How often…? → sıklık sorar. Cevap: “twice a week”, “every day”.',
                'How long…? → süre sorar. Cevap: “for two hours”.',
                'How much / many…? → miktar sorar.',
                '“I prefer … to …” → tercih belirtir: “I prefer reading to watching TV.”',
              ],
            },
            {
              id: 'b4', type: 'terms',
              items: [
                { term: 'hang out with friends', def: 'arkadaşlarla takılmak' },
                { term: 'do sports', def: 'spor yapmak' },
                { term: 'chat online', def: 'internette sohbet etmek' },
                { term: 'attend a course', def: 'kursa katılmak' },
                { term: 'be into something', def: 'bir şeye meraklı olmak' },
              ],
            },
          ],
        },
        {
          id: 'eng-u1-p3', kind: 'content',
          title: 'Unit 3 — In the Kitchen',
          subtitle: 'Recipes, quantities and sequencing',
          blocks: [
            {
              id: 'b1', type: 'table',
              caption: 'Cooking verbs',
              headers: ['Verb', 'Türkçe', 'Example'],
              rows: [
                ['chop', 'doğramak', 'Chop the tomatoes.'],
                ['slice', 'dilimlemek', 'Slice the bread.'],
                ['peel', 'soymak', 'Peel the potatoes.'],
                ['boil', 'haşlamak / kaynatmak', 'Boil the water.'],
                ['fry', 'kızartmak', 'Fry the onions.'],
                ['grate', 'rendelemek', 'Grate the cheese.'],
                ['stir', 'karıştırmak', 'Stir the soup.'],
                ['pour', 'dökmek', 'Pour the milk into the bowl.'],
                ['bake', 'fırında pişirmek', 'Bake for 30 minutes.'],
              ],
            },
            {
              id: 'b2', type: 'callout', variant: 'formul', title: 'Sequencing words',
              text: 'First → Then → After that → Next → Finally. Tarif sıralaması sorularında bu bağlaçların sırası cevabı verir.',
            },
            {
              id: 'b3', type: 'table',
              caption: 'Quantities',
              headers: ['Ölçü', 'Kullanım'],
              rows: [
                ['a cup of', 'flour, tea, rice'],
                ['a glass of', 'water, milk, juice'],
                ['a slice of', 'bread, cheese, cake'],
                ['a spoonful of', 'sugar, salt, oil'],
                ['a bar of', 'chocolate, soap'],
                ['a bowl of', 'soup, salad'],
              ],
            },
          ],
        },
        {
          id: 'eng-u1-q', kind: 'quiz',
          title: 'Part 1 — Review Test',
          subtitle: 'Friendship, Teen Life & In the Kitchen',
          questionIds: ['eng-001', 'eng-002', 'eng-003', 'eng-004', 'eng-005', 'eng-006'],
        },
      ],
    },
    {
      id: 'eng-u2',
      title: 'Part 2 — On the Phone, The Internet & Adventures',
      pages: [
        {
          id: 'eng-u2-p1', kind: 'content',
          title: 'Unit 4 — On the Phone',
          subtitle: 'Telephone language',
          blocks: [
            {
              id: 'b1', type: 'table',
              caption: 'Phone expressions',
              headers: ['Function', 'Expressions'],
              rows: [
                ['Starting', 'Hello, this is Ali speaking. / May I speak to…?'],
                ['Asking to wait', 'Hold on, please. / Just a moment. / Hang on a second.'],
                ['Taking a message', 'Can I take a message? / Would you like to leave a message?'],
                ['Bad connection', 'The line is busy. / I can’t hear you. / You’re breaking up.'],
                ['Wrong number', 'I’m afraid you have the wrong number.'],
                ['Ending', 'Thanks for calling. / I’ll call you back.'],
              ],
            },
            {
              id: 'b2', type: 'dialog',
              lines: [
                { who: 'Secretary', text: 'Good morning, Yıldız Company. How can I help you?' },
                { who: 'Caller', text: 'Hello, may I speak to Mrs. Demir, please?' },
                { who: 'Secretary', text: 'I’m sorry, she is in a meeting. Can I take a message?' },
                { who: 'Caller', text: 'Yes, please. Could you tell her Ali called?' },
                { who: 'Secretary', text: 'Certainly. Thanks for calling.' },
              ],
            },
          ],
        },
        {
          id: 'eng-u2-p2', kind: 'content',
          title: 'Unit 5 — The Internet',
          subtitle: 'Online habits and safety',
          blocks: [
            {
              id: 'b1', type: 'terms',
              items: [
                { term: 'download / upload', def: 'indirmek / yüklemek' },
                { term: 'browse the web', def: 'internette gezinmek' },
                { term: 'social media account', def: 'sosyal medya hesabı' },
                { term: 'password', def: 'şifre' },
                { term: 'cyberbullying', def: 'siber zorbalık' },
                { term: 'reliable source', def: 'güvenilir kaynak' },
              ],
            },
            {
              id: 'b2', type: 'callout', variant: 'dikkat', title: 'Internet safety rules',
              text: 'Never share your personal information. Don’t open e-mails from strangers. Use strong passwords. Tell an adult if someone bothers you online.',
            },
            {
              id: 'b3', type: 'list',
              items: [
                'I use the internet for chatting / for doing research. (for + V-ing)',
                'I use the internet to chat / to do research. (to + V1)',
                'I prefer online shopping to going to the mall.',
                'It is the fastest way to reach information.',
              ],
            },
          ],
        },
        {
          id: 'eng-u2-p3', kind: 'content',
          title: 'Unit 6 — Adventures',
          subtitle: 'Extreme sports and precautions',
          blocks: [
            {
              id: 'b1', type: 'terms',
              items: [
                { term: 'rafting', def: 'rafting' },
                { term: 'paragliding', def: 'yamaç paraşütü' },
                { term: 'scuba diving', def: 'tüplü dalış' },
                { term: 'bungee jumping', def: 'bancii atlayışı' },
                { term: 'rock climbing', def: 'kaya tırmanışı' },
                { term: 'safety equipment', def: 'güvenlik ekipmanı' },
              ],
            },
            {
              id: 'b2', type: 'table',
              caption: 'Modals for rules',
              headers: ['Modal', 'Meaning', 'Example'],
              rows: [
                ['must / have to', 'zorunluluk', 'You must wear a helmet.'],
                ['mustn’t', 'yasak', 'You mustn’t swim alone.'],
                ['don’t have to', 'gereksizlik', 'You don’t have to bring food.'],
                ['should', 'tavsiye', 'You should take a first aid kit.'],
                ['can', 'izin / yetenek', 'You can rent equipment there.'],
              ],
            },
            {
              id: 'b3', type: 'callout', variant: 'dikkat', title: 'Careful!',
              text: '“mustn’t” ile “don’t have to” çok farklıdır. “You mustn’t go” = Gitmen yasak. “You don’t have to go” = Gitmek zorunda değilsin. LGS’de bu ikisi bilinçli olarak karıştırılır.',
            },
          ],
        },
        {
          id: 'eng-u2-q', kind: 'quiz',
          title: 'Part 2 — Review Test',
          subtitle: 'On the Phone, The Internet & Adventures',
          questionIds: ['eng-007', 'eng-008', 'eng-009', 'eng-010', 'eng-011', 'eng-012'],
        },
      ],
    },
    {
      id: 'eng-u3',
      title: 'Part 3 — Tourism, Chores, Science & Natural Forces',
      pages: [
        {
          id: 'eng-u3-p1', kind: 'content',
          title: 'Unit 7 — Tourism',
          subtitle: 'Travel and past experiences',
          blocks: [
            {
              id: 'b1', type: 'table',
              caption: 'Useful travel language',
              headers: ['Question', 'Answer'],
              rows: [
                ['Where did you go last summer?', 'I went to Antalya.'],
                ['What was the weather like?', 'It was hot and sunny.'],
                ['How was your holiday?', 'It was fantastic!'],
                ['What did you do there?', 'We visited ancient ruins.'],
                ['Where did you stay?', 'We stayed at a small hotel.'],
              ],
            },
            {
              id: 'b2', type: 'terms',
              items: [
                { term: 'be famous for', def: '… ile ünlü olmak' },
                { term: 'sightseeing', def: 'gezip görme' },
                { term: 'accommodation', def: 'konaklama' },
                { term: 'souvenir', def: 'hediyelik eşya' },
                { term: 'guided tour', def: 'rehberli tur' },
                { term: 'breathtaking view', def: 'nefes kesici manzara' },
              ],
            },
          ],
        },
        {
          id: 'eng-u3-p2', kind: 'content',
          title: 'Unit 8 — Chores',
          subtitle: 'Household responsibilities',
          blocks: [
            {
              id: 'b1', type: 'table',
              caption: 'Collocations: do / make / take',
              headers: ['do', 'make', 'take'],
              rows: [
                ['do the dishes', 'make the bed', 'take the rubbish out'],
                ['do the laundry', 'make breakfast', 'take care of the pet'],
                ['do the ironing', 'make a mess', 'take out the recycling'],
                ['do the shopping', 'make a cake', '—'],
              ],
            },
            {
              id: 'b2', type: 'callout', variant: 'ipucu', title: 'Asking for help',
              text: 'Could you help me with…? / Would you mind doing…? / Can you give me a hand? — Cevaplar: Sure, no problem. / Of course. / Sorry, I’m busy right now.',
            },
          ],
        },
        {
          id: 'eng-u3-p3', kind: 'content',
          title: 'Unit 9 & 10 — Science and Natural Forces',
          subtitle: 'Inventions and disasters',
          blocks: [
            { id: 'b1', type: 'h3', text: 'Science: Simple Past and Passive' },
            {
              id: 'b2', type: 'list',
              items: [
                'Active: Alexander Graham Bell invented the telephone in 1876.',
                'Passive: The telephone was invented by Alexander Graham Bell in 1876.',
                'Passive formülü: be (was/were) + V3 (past participle)',
                'Nesne öne alınır, yapan kişi “by” ile belirtilir (gerekirse).',
              ],
            },
            { id: 'b3', type: 'h3', text: 'Natural Forces: Disasters and Precautions' },
            {
              id: 'b4', type: 'table',
              headers: ['Disaster', 'Türkçe', 'Precaution'],
              rows: [
                ['earthquake', 'deprem', 'Take shelter under a strong table.'],
                ['flood', 'sel', 'Move to higher ground.'],
                ['drought', 'kuraklık', 'Save water.'],
                ['avalanche', 'çığ', 'Avoid steep snowy slopes.'],
                ['hurricane / tornado', 'kasırga / hortum', 'Stay away from windows.'],
                ['wildfire', 'orman yangını', 'Never leave a fire unattended.'],
              ],
            },
            {
              id: 'b5', type: 'callout', variant: 'bilgi', title: 'Giving advice',
              text: 'You should… / You had better… / It is a good idea to… / Don’t forget to… kalıpları önlem ve tavsiye sorularında sıkça karşınıza çıkar.',
            },
          ],
        },
        {
          id: 'eng-u3-q', kind: 'quiz',
          title: 'Part 3 — Review Test',
          subtitle: 'Tourism, Chores, Science & Natural Forces',
          questionIds: ['eng-013', 'eng-014', 'eng-015', 'eng-016', 'eng-017', 'eng-018', 'eng-019', 'eng-020'],
        },
      ],
    },
  ],
}
