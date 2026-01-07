/**
 * Famous Cocktails: Siesta
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const siesta: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
  slug: 'siesta',
  stable_key: 'b2c1d0e9f8a7b6c5948392817069584fbecdac05',

  name: {
    en: 'Siesta',
    it: 'Siesta',
    vi: 'Siesta',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'tequila', 'refreshing', 'citrus'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A tequila-based riff on the Hemingway Daiquiri, combining tequila, Campari, grapefruit juice, lime juice, and simple syrup. The Siesta is a refreshing, bitter-sweet cocktail perfect for warm afternoons.',
    it: 'Una variazione del Hemingway Daiquiri a base di tequila, che combina tequila, Campari, succo di pompelmo, succo di lime e sciroppo semplice. La Siesta è un cocktail rinfrescante e amaro-dolce perfetto per pomeriggi caldi.',
    vi: 'Biến thể tequila của Hemingway Daiquiri, kết hợp tequila, Campari, nước bưởi, nước chanh và xi-rô đường. Siesta là cocktail sảng khoái, đắng-ngọt hoàn hảo cho buổi chiều ấm áp.',
  },

  history: {
    created_year: '2006',
    origin: {
      city: 'New York City',
      bar: 'Flatiron Lounge',
      country: 'USA',
    },
    creator: {
      name: 'Katie Stipe',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Katie Stipe at the Flatiron Lounge in New York City in 2006, the Siesta is a tequila-based variation of the classic Hemingway Daiquiri. Stipe substituted tequila for rum and added Campari for bitter complexity, creating a sophisticated cocktail that captures the essence of a relaxing afternoon break. The drink quickly became popular and is now considered a modern classic.',
      it: "Creato da Katie Stipe al Flatiron Lounge di New York City nel 2006, la Siesta è una variazione del classico Hemingway Daiquiri a base di tequila. Stipe ha sostituito la tequila al rum e aggiunto Campari per la complessità amara, creando un cocktail sofisticato che cattura l'essenza di una pausa pomeridiana rilassante. La bevanda divenne rapidamente popolare ed è ora considerata un classico moderno.",
      vi: 'Được tạo ra bởi Katie Stipe tại Flatiron Lounge ở New York City năm 2006, Siesta là biến thể tequila của Hemingway Daiquiri cổ điển. Stipe thay tequila cho rum và thêm Campari cho độ phức tạp đắng, tạo ra cocktail tinh tế nắm bắt bản chất của giờ nghỉ chiều thư giãn. Đồ uống nhanh chóng trở nên phổ biến và hiện được coi là cocktail cổ điển hiện đại.',
    },
    named_after: {
      en: 'Named "Siesta" to evoke the Spanish/Mexican tradition of afternoon rest, reflecting the drink\'s refreshing, relaxing character.',
      it: 'Chiamato "Siesta" per evocare la tradizione spagnola/messicana del riposo pomeridiano, riflettendo il carattere rinfrescante e rilassante della bevanda.',
      vi: 'Được đặt tên "Siesta" để gợi lên truyền thống nghỉ chiều Tây Ban Nha/Mexico, phản ánh đặc tính sảng khoái, thư giãn của đồ uống.',
    },
  },

  taste: {
    profile: ['citrus', 'bitter', 'refreshing'],
    description: {
      en: 'Bright and refreshing with complex bitter-sweet balance. Tequila provides an agave backbone, grapefruit adds tart citrus notes, Campari contributes sophisticated bitterness, and lime and simple syrup round out the flavor profile.',
      it: 'Luminoso e rinfrescante con complesso equilibrio amaro-dolce. La tequila fornisce una struttura di agave, il pompelmo aggiunge note agrumate aspre, il Campari contribuisce con amarezza sofisticata e lime e sciroppo semplice completano il profilo aromatico.',
      vi: 'Sáng và sảng khoái với sự cân bằng đắng-ngọt phức tạp. Tequila mang đến xương sống agave, bưởi thêm hương cam chanh chua, Campari đóng góp vị đắng tinh tế, và chanh cùng xi-rô đường hoàn thiện hương vị.',
    },
    first_impression: {
      en: 'Tart grapefruit and tequila hit first, followed by Campari bitterness and citrus complexity',
      it: 'Pompelmo aspro e tequila colpiscono per primi, seguiti da amarezza del Campari e complessità agrumata',
      vi: 'Bưởi chua và tequila đập vào đầu tiên, tiếp theo là vị đắng Campari và độ phức tạp cam chanh',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering bitter citrus notes',
      it: 'Finale pulito e rinfrescante con note persistenti di agrumi amari',
      vi: 'Kết thúc sạch, sảng khoái với hương cam chanh đắng kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between tart, bitter, and sweet - refreshing but sophisticated',
      it: 'Perfettamente bilanciato tra aspro, amaro e dolce - rinfrescante ma sofisticato',
      vi: 'Cân bằng hoàn hảo giữa chua, đắng và ngọt - sảng khoái nhưng tinh tế',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'early_evening'],
    occasions: ['brunch', 'poolside', 'summer_party', 'aperitivo'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with ceviche, grilled seafood, Mexican cuisine, citrus salads, and light appetizers. The bitter-citrus profile complements fresh, bright flavors.',
      it: 'Eccellente con ceviche, frutti di mare alla griglia, cucina messicana, insalate agli agrumi e antipasti leggeri. Il profilo amaro-agrumato complementa sapori freschi e luminosi.',
      vi: 'Tuyệt vời với ceviche, hải sản nướng, ẩm thực Mexico, salad cam chanh và món khai vị nhẹ. Hương vị đắng-cam chanh bổ sung cho hương vị tươi, sáng.',
    },
    ideal_for: {
      en: 'Perfect for those who enjoy refreshing, citrus-forward cocktails with a sophisticated bitter edge. Ideal for tequila and Campari lovers.',
      it: 'Perfetto per chi ama cocktail rinfrescanti e agrumati con un tocco amaro sofisticato. Ideale per gli amanti della tequila e del Campari.',
      vi: 'Hoàn hảo cho những ai thích cocktail sảng khoái, hướng cam chanh với vị đắng tinh tế. Lý tưởng cho người yêu tequila và Campari.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_TEQUILA_BLANCO',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Tequila blanco', it: 'Tequila blanco', vi: 'Tequila blanco' },
    },
    {
      ingredient_id: 'ING_CAMPARI',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Campari',
        it: 'Campari',
        vi: 'Campari',
      },
    },
    {
      ingredient_id: 'ING_GRAPEFRUIT_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Fresh grapefruit juice',
        it: 'Succo di pompelmo fresco',
        vi: 'Nước bưởi tươi',
      },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Fresh lime juice',
        it: 'Succo di lime fresco',
        vi: 'Nước chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Simple syrup',
        it: 'Sciroppo semplice',
        vi: 'Xi-rô đường',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a chilled coupe glass. Garnish with a grapefruit twist.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una coppa raffreddata. Guarnire con una twist di pompelmo.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly coupe đã làm lạnh. Trang trí với vỏ bưởi xoắn.',
  },

  glass: 'Coupe',

  garnish: {
    en: 'Grapefruit twist',
    it: 'Twist di pompelmo',
    vi: 'Vỏ bưởi xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_TEQUILA_BLANCO'],

  flavor_profile: ['citrus', 'bitter', 'refreshing'],

  abv_estimate: 16,

  calories_estimate: 165,

  difficulty: 'easy',

  prep_time_seconds: 90,

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
  season_tags: ['spring', 'summer'],
  occasion_tags: ['brunch', 'poolside', 'summer_party', 'aperitivo'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['hemingway-daiquiri', 'paloma'],

  notes_for_staff:
    'Use fresh grapefruit juice for best results. The Campari adds complexity but can be reduced for guests who prefer less bitterness. Express grapefruit oils over drink before garnishing.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://flatironlounge.com',
    notes: 'Created by Katie Stipe at Flatiron Lounge, 2006. Modern classic cocktail.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
