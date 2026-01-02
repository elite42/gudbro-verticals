/**
 * Famous Cocktails: Fitzgerald
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const fitzgerald: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  slug: 'fitzgerald',
  stable_key: 'c5d4e3f2a1b0918273645546372819202122232425',

  name: {
    en: 'Fitzgerald',
    it: 'Fitzgerald',
    vi: 'Fitzgerald',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'gin', 'sour', 'prohibition'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A refined gin sour with a touch of Angostura bitters, the Fitzgerald is essentially an elevated Tom Collins served straight up. Named after F. Scott Fitzgerald, this modern classic balances juniper-forward gin with fresh lemon and simple syrup, with bitters adding aromatic complexity.',
    it: 'Un raffinato gin sour con un tocco di Angostura bitters, il Fitzgerald è essenzialmente un Tom Collins elevato servito liscio. Prende il nome da F. Scott Fitzgerald, questo classico moderno bilancia il gin al ginepro con limone fresco e sciroppo semplice, con i bitters che aggiungono complessità aromatica.',
    vi: 'Một gin sour tinh tế với một chút Angostura bitters, Fitzgerald về cơ bản là một Tom Collins nâng cấp được phục vụ thẳng. Được đặt tên theo F. Scott Fitzgerald, tác phẩm cổ điển hiện đại này cân bằng gin hương juniper với chanh tươi và siro đường, với bitters thêm độ phức tạp thơm.',
  },

  history: {
    created_year: '2000s',
    origin: {
      city: 'San Francisco',
      bar: 'Bourbon & Branch',
      country: 'USA',
    },
    creator: {
      name: 'Dale DeGroff',
      profession: 'bartender',
    },
    story: {
      en: 'The Fitzgerald was created by legendary bartender Dale DeGroff during the cocktail renaissance of the early 2000s. DeGroff, known as "King Cocktail," designed it as a tribute to F. Scott Fitzgerald and the Jazz Age. The drink reimagines the Tom Collins by serving it up rather than tall, and adding Angostura bitters for depth. It represents the modern craft cocktail movement\'s approach to classic drinks: respecting tradition while refining and elevating the formula.',
      it: 'Il Fitzgerald fu creato dal leggendario barman Dale DeGroff durante la rinascita dei cocktail dei primi anni 2000. DeGroff, noto come "King Cocktail," lo progettò come tributo a F. Scott Fitzgerald e all\'Era del Jazz. La bevanda reinterpreta il Tom Collins servendolo liscio piuttosto che lungo, e aggiungendo Angostura bitters per profondità. Rappresenta l\'approccio del movimento moderno dei cocktail artigianali alle bevande classiche: rispettare la tradizione mentre si raffina e si eleva la formula.',
      vi: 'Fitzgerald được tạo ra bởi bartender huyền thoại Dale DeGroff trong thời kỳ phục hưng cocktail đầu những năm 2000. DeGroff, được biết đến như "Vua Cocktail," thiết kế nó như một lời tri ân đến F. Scott Fitzgerald và Thời đại Jazz. Thức uống tái tưởng tượng Tom Collins bằng cách phục vụ thẳng thay vì cao, và thêm Angostura bitters để tăng độ sâu. Nó đại diện cho cách tiếp cận của phong trào cocktail thủ công hiện đại đối với đồ uống cổ điển: tôn trọng truyền thống trong khi tinh chỉnh và nâng cao công thức.',
    },
    named_after: {
      en: 'Named after F. Scott Fitzgerald, the famous American novelist and author of "The Great Gatsby," representing the Jazz Age and Prohibition era.',
      it: 'Prende il nome da F. Scott Fitzgerald, il famoso romanziere americano e autore de "Il Grande Gatsby," che rappresenta l\'Era del Jazz e il periodo del Proibizionismo.',
      vi: 'Được đặt tên theo F. Scott Fitzgerald, tiểu thuyết gia nổi tiếng người Mỹ và tác giả của "The Great Gatsby," đại diện cho Thời đại Jazz và thời kỳ Cấm rượu.',
    },
  },

  taste: {
    profile: ['citrus', 'botanical', 'balanced', 'aromatic'],
    description: {
      en: 'Bright, refreshing, and beautifully balanced. London Dry gin provides juniper and botanical notes, fresh lemon adds tartness, simple syrup brings sweetness, and Angostura bitters contribute aromatic spice and complexity. Clean, crisp, and sophisticated.',
      it: 'Brillante, rinfrescante e magnificamente bilanciato. Il London Dry gin fornisce note di ginepro e botaniche, il limone fresco aggiunge acidità, lo sciroppo semplice porta dolcezza, e gli Angostura bitters contribuiscono con spezie aromatiche e complessità. Pulito, fresco e sofisticato.',
      vi: 'Tươi sáng, sảng khoái và cân bằng tuyệt đẹp. Gin London Dry mang đến hương juniper và thực vật, chanh tươi thêm vị chua, siro đường mang lại vị ngọt, và Angostura bitters đóng góp gia vị thơm và độ phức tạp. Sạch sẽ, sắc nét và tinh tế.',
    },
    first_impression: {
      en: 'Bright lemon and juniper hit first, aromatic bitters follow',
      it: 'Limone brillante e ginepro colpiscono per primi, seguono i bitters aromatici',
      vi: 'Chanh tươi sáng và juniper đập vào đầu tiên, bitters thơm theo sau',
    },
    finish: {
      en: 'Clean, crisp finish with lingering gin botanicals and bitter notes',
      it: 'Finale pulito e fresco con note botaniche di gin persistenti e amare',
      vi: 'Kết thúc sạch sẽ, sắc nét với hương thực vật gin và đắng kéo dài',
    },
    balance: {
      en: 'Perfectly balanced sour - sweet, tart, and botanical in harmony',
      it: 'Sour perfettamente bilanciato - dolce, aspro e botanico in armonia',
      vi: 'Sour cân bằng hoàn hảo - ngọt, chua và thực vật hòa quyện',
    },
  },

  recommendations: {
    best_time: ['evening', 'afternoon', 'cocktail_hour'],
    occasions: ['aperitivo', 'date_night', 'celebration', 'literary_event'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Excellent with seafood appetizers, oysters, ceviche, or light salads. Also pairs well with goat cheese, smoked salmon, and citrus-based dishes.',
      it: 'Eccellente con antipasti di pesce, ostriche, ceviche o insalate leggere. Si abbina bene anche con formaggio di capra, salmone affumicato e piatti a base di agrumi.',
      vi: 'Tuyệt vời với các món khai vị hải sản, hàu, ceviche, hoặc salad nhẹ. Cũng kết hợp tốt với phô mai dê, cá hồi hun khói và các món có cam quýt.',
    },
    ideal_for: {
      en: 'Perfect for gin lovers who appreciate classic sours. Ideal for those who enjoy Tom Collins but want something more refined and spirit-forward. Great for literary enthusiasts and fans of the Jazz Age.',
      it: 'Perfetto per gli amanti del gin che apprezzano i sour classici. Ideale per chi ama il Tom Collins ma vuole qualcosa di più raffinato e incentrato sullo spirito. Ottimo per gli appassionati di letteratura e i fan dell\'Era del Jazz.',
      vi: 'Hoàn hảo cho những người yêu gin đánh giá cao sour cổ điển. Lý tưởng cho những ai thích Tom Collins nhưng muốn thứ gì đó tinh tế hơn và tập trung vào rượu mạnh. Tuyệt vời cho những người đam mê văn học và người hâm mộ Thời đại Jazz.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'London Dry Gin', it: 'London Dry Gin', vi: 'Gin London Dry' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh lemon juice', it: 'Succo di limone fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đường' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 2, unit: 'dashes' },
      display_name: { en: 'Angostura bitters', it: 'Angostura bitters', vi: 'Angostura bitters' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well chilled. Strain into a chilled coupe or cocktail glass. Garnish with a lemon wheel.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una coppa o bicchiere da cocktail raffreddato. Guarnire con una fetta di limone.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly coupe hoặc cocktail đã được làm lạnh. Trang trí với lát chanh.',
  },

  glass: 'Coupe glass',

  garnish: {
    en: 'Lemon wheel',
    it: 'Fetta di limone',
    vi: 'Lát chanh',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['citrus', 'botanical', 'balanced', 'aromatic'],

  abv_estimate: 18,

  calories_estimate: 160,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'date_night', 'celebration', 'literary_event'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['elderflower-fitzgerald', 'pink-fitzgerald'],

  notes_for_staff: 'Use fresh lemon juice only. Some versions use 2:1:1 gin-lemon-syrup ratio for more spirit-forward profile. Bitters are essential - don\'t skip. Can serve in rocks glass over ice as alternative presentation.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/fitzgerald/',
    note: 'Created by Dale DeGroff in the early 2000s during the craft cocktail renaissance.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
