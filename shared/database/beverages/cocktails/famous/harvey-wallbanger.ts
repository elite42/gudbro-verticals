/**
 * Famous Cocktails: Harvey Wallbanger
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const harveyWallbanger: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a7b8c9d0-1234-5678-a123-567890123456',
  slug: 'harvey-wallbanger',
  stable_key: 'e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3',

  name: {
    en: 'Harvey Wallbanger',
    it: 'Harvey Wallbanger',
    vi: 'Harvey Wallbanger',
    ko: '하비 월뱅어',
    ja: 'ハーヴェイ・ウォールバンガー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'classic', 'vodka', 'orange', 'galliano', '1970s'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A Screwdriver elevated with a float of Galliano liqueur. The Harvey Wallbanger was one of the most popular cocktails of the 1970s, combining vodka, orange juice, and the distinctive herbal-vanilla notes of Galliano in a tall, sunny drink.',
    it: "Uno Screwdriver elevato con un galleggiante di liquore Galliano. L'Harvey Wallbanger è stato uno dei cocktail più popolari degli anni '70, combinando vodka, succo d'arancia e le distintive note erbacee-vaniglia del Galliano in un drink alto e soleggiato.",
    vi: 'Một Screwdriver được nâng cấp với lớp liqueur Galliano nổi. Harvey Wallbanger là một trong những cocktail phổ biến nhất của những năm 1970, kết hợp vodka, nước cam và hương thảo mộc-vani đặc trưng của Galliano trong một thức uống cao, rực rỡ.',
  },

  history: {
    created_year: '1952',
    origin: {
      city: 'Los Angeles',
      state: 'California',
      country: 'USA',
    },
    creator: {
      name: 'Donato "Duke" Antone',
      profession: 'bartender',
    },
    story: {
      en: 'The Harvey Wallbanger was created by bartender Donato "Duke" Antone at his Blackwatch Bar in Los Angeles in 1952. The drink became a phenomenon in the 1970s thanks to an aggressive marketing campaign by the Galliano company. The name comes from a fictional surfer named Harvey who loved the drink so much that after drinking several, he would bang into walls while leaving the bar. The cocktail became synonymous with 1970s disco culture and was so popular that Galliano sales skyrocketed during this period.',
      it: "L'Harvey Wallbanger fu creato dal barman Donato \"Duke\" Antone al suo Blackwatch Bar a Los Angeles nel 1952. Il drink divenne un fenomeno negli anni '70 grazie a una campagna di marketing aggressiva dell'azienda Galliano. Il nome deriva da un surfista immaginario di nome Harvey che amava così tanto il drink che, dopo averne bevuti diversi, sbatteva contro i muri mentre lasciava il bar. Il cocktail divenne sinonimo della cultura disco degli anni '70 e fu così popolare che le vendite di Galliano salirono alle stelle durante questo periodo.",
      vi: 'Harvey Wallbanger được tạo ra bởi bartender Donato "Duke" Antone tại Blackwatch Bar của ông ở Los Angeles vào năm 1952. Thức uống trở thành hiện tượng vào những năm 1970 nhờ chiến dịch tiếp thị tích cực của công ty Galliano. Cái tên đến từ một vận động viên lướt sóng hư cấu tên Harvey yêu thích thức uống đến mức sau khi uống vài ly, anh ta sẽ đập vào tường khi rời khỏi quán bar. Cocktail trở thành đồng nghĩa với văn hóa disco những năm 1970 và phổ biến đến mức doanh số Galliano tăng vọt trong giai đoạn này.',
    },
    named_after: {
      en: 'Named after a fictional surfer named Harvey who allegedly loved the drink so much he would bang into walls while leaving the bar.',
      it: 'Prende il nome da un surfista immaginario di nome Harvey che presumibilmente amava così tanto il drink da sbattere contro i muri mentre lasciava il bar.',
      vi: 'Được đặt theo tên một vận động viên lướt sóng hư cấu tên Harvey được cho là yêu thích thức uống đến mức đập vào tường khi rời khỏi quán bar.',
    },
  },

  taste: {
    profile: ['sweet', 'citrus', 'herbal', 'vanilla'],
    description: {
      en: 'Starts like a classic Screwdriver with sweet orange and vodka, then finishes with the distinctive herbal, vanilla, and anise notes of Galliano. The liqueur adds complexity and a touch of elegance to the simple base.',
      it: 'Inizia come un classico Screwdriver con arancia dolce e vodka, poi finisce con le distintive note erbacee, di vaniglia e anice del Galliano. Il liquore aggiunge complessità e un tocco di eleganza alla base semplice.',
      vi: 'Bắt đầu như Screwdriver cổ điển với cam ngọt và vodka, sau đó kết thúc với hương thảo mộc, vani và hồi đặc trưng của Galliano. Liqueur thêm sự phức tạp và một chút thanh lịch cho cơ sở đơn giản.',
    },
    first_impression: {
      en: 'Fresh orange juice with subtle herbal notes floating on top',
      it: "Succo d'arancia fresco con sottili note erbacee che galleggiano in cima",
      vi: 'Nước cam tươi với hương thảo mộc tinh tế nổi lên trên',
    },
    finish: {
      en: 'Sweet vanilla and anise linger with orange citrus notes',
      it: "Vaniglia dolce e anice persistono con note di agrumi d'arancia",
      vi: 'Vani ngọt và hồi kéo dài với hương cam quýt',
    },
    balance: {
      en: 'The Galliano float provides aromatic complexity without overpowering the refreshing orange-vodka base',
      it: 'Il galleggiante di Galliano fornisce complessità aromatica senza sopraffare la base rinfrescante arancia-vodka',
      vi: 'Lớp Galliano nổi mang lại sự phức tạp thơm mà không át cơ sở vodka-cam tươi mát',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'brunch', 'evening'],
    occasions: ['casual', 'brunch', 'retro_party', 'celebration'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Pairs well with brunch dishes, eggs benedict, pancakes, and light appetizers. Also works with Italian antipasti given the Italian Galliano liqueur.',
      it: 'Si abbina bene con piatti da brunch, uova alla Benedict, pancakes e antipasti leggeri. Funziona anche con antipasti italiani dato il liquore italiano Galliano.',
      vi: 'Kết hợp tốt với các món brunch, trứng benedict, bánh pancake và món khai vị nhẹ. Cũng phù hợp với antipasti Ý do liqueur Galliano của Ý.',
    },
    ideal_for: {
      en: 'Perfect for those who love Screwdrivers but want more complexity. Great for retro-themed parties or anyone curious about classic 1970s cocktails. Ideal for Galliano enthusiasts.',
      it: "Perfetto per chi ama gli Screwdriver ma vuole più complessità. Ottimo per feste a tema retrò o per chiunque sia curioso dei cocktail classici degli anni '70. Ideale per gli appassionati di Galliano.",
      vi: 'Hoàn hảo cho những ai yêu Screwdriver nhưng muốn nhiều sự phức tạp hơn. Tuyệt vời cho các bữa tiệc theo chủ đề retro hoặc bất kỳ ai tò mò về cocktail cổ điển những năm 1970. Lý tưởng cho những người đam mê Galliano.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 90, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: "Succo d'arancia fresco", vi: 'Nước cam tươi' },
    },
    {
      ingredient_id: 'ING_GALLIANO',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: "Galliano L'Autentico",
        it: "Galliano L'Autentico",
        vi: "Galliano L'Autentico",
      },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball glass with ice. Pour vodka and orange juice over ice and stir gently. Float Galliano on top by pouring it slowly over the back of a bar spoon. Garnish with an orange slice and cherry.',
    it: "Riempire un bicchiere highball con ghiaccio. Versare vodka e succo d'arancia sul ghiaccio e mescolare delicatamente. Far galleggiare il Galliano sopra versandolo lentamente sul retro di un cucchiaio da bar. Guarnire con una fetta d'arancia e una ciliegia.",
    vi: 'Đổ đầy ly highball với đá. Rót vodka và nước cam lên đá và khuấy nhẹ nhàng. Để Galliano nổi lên trên bằng cách rót từ từ qua mặt sau của thìa bar. Trang trí với một lát cam và cherry.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Orange slice and maraschino cherry',
    it: "Fetta d'arancia e ciliegia maraschino",
    vi: 'Lát cam và cherry maraschino',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['sweet', 'citrus', 'herbal', 'vanilla'],

  abv_estimate: 11,

  calories_estimate: 185,

  difficulty: 'easy',

  prep_time_seconds: 45,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: [
      'vegan',
      'vegetarian',
      'pescatarian',
      'gluten_free',
      'dairy_free',
      'nut_free',
    ],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['all_year'],
  occasion_tags: ['casual', 'brunch', 'retro_party'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['screwdriver', 'freddy-fudpucker'],

  notes_for_staff:
    'The Galliano float is key - pour slowly over back of spoon to create visual layers. Use freshly squeezed orange juice. Garnish is important for presentation - this is a showpiece drink.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1240/harvey-wallbanger',
    notes: 'Created by Duke Antone in 1952, popularized in 1970s by Galliano marketing.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
