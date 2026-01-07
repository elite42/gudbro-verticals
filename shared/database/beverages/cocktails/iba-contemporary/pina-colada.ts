/**
 * IBA Contemporary Classics: Piña Colada
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const pinaColada: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d',
  slug: 'pina-colada',
  stable_key: 'pina_colada_iba_contemporary_classic',

  name: {
    en: 'Piña Colada',
    it: 'Piña Colada',
    vi: 'Piña Colada',
    ko: '피냐 콜라다',
    ja: 'ピニャコラーダ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'tropical', 'creamy', 'summer', 'beach', 'iconic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "The national drink of Puerto Rico - a luscious blend of rum, coconut cream, and pineapple juice. Creamy, tropical, and utterly refreshing, it's the quintessential beach cocktail that tastes like paradise.",
    it: "La bevanda nazionale di Porto Rico - una miscela lussuosa di rum, crema di cocco e succo d'ananas. Cremosa, tropicale e assolutamente rinfrescante, è il cocktail da spiaggia per eccellenza che sa di paradiso.",
    vi: 'Thức uống quốc gia của Puerto Rico - một hỗn hợp sang trọng của rum, kem dừa và nước dứa. Béo ngậy, nhiệt đới và cực kỳ sảng khoái, đây là cocktail bãi biển tinh túy có vị như thiên đường.',
  },

  history: {
    created_year: '1954',
    origin: {
      city: 'San Juan',
      bar: 'Caribe Hilton Hotel',
      country: 'Puerto Rico',
    },
    creator: {
      name: 'Ramón "Monchito" Marrero',
      profession: 'bartender',
    },
    story: {
      en: 'Created by bartender Ramón "Monchito" Marrero at the Caribe Hilton Hotel in San Juan, Puerto Rico in 1954. Marrero spent three months perfecting the recipe to capture the essence of Puerto Rico. The drink became the hotel\'s signature cocktail and later Puerto Rico\'s national drink. The name means "strained pineapple" in Spanish.',
      it: 'Creato dal barman Ramón "Monchito" Marrero al Caribe Hilton Hotel di San Juan, Porto Rico nel 1954. Marrero trascorse tre mesi perfezionando la ricetta per catturare l\'essenza di Porto Rico. La bevanda divenne il cocktail distintivo dell\'hotel e successivamente la bevanda nazionale di Porto Rico. Il nome significa "ananas filtrato" in spagnolo.',
      vi: 'Được tạo ra bởi bartender Ramón "Monchito" Marrero tại khách sạn Caribe Hilton ở San Juan, Puerto Rico vào năm 1954. Marrero đã dành ba tháng hoàn thiện công thức để nắm bắt bản chất của Puerto Rico. Thức uống trở thành cocktail đặc trưng của khách sạn và sau đó là thức uống quốc gia của Puerto Rico. Tên có nghĩa là "dứa lọc" trong tiếng Tây Ban Nha.',
    },
    named_after: {
      en: 'Spanish for "strained pineapple," referring to the fresh pineapple juice used in the cocktail.',
      it: 'Spagnolo per "ananas filtrato," riferendosi al succo d\'ananas fresco utilizzato nel cocktail.',
      vi: 'Tiếng Tây Ban Nha có nghĩa là "dứa lọc," đề cập đến nước dứa tươi được sử dụng trong cocktail.',
    },
  },

  taste: {
    profile: ['tropical', 'creamy', 'sweet'],
    description: {
      en: 'Rich, creamy, and intensely tropical. Coconut cream provides luxurious texture while pineapple adds bright, tangy sweetness. White rum ties it together with subtle warmth. Like a vacation in a glass.',
      it: "Ricco, cremoso e intensamente tropicale. La crema di cocco fornisce una texture lussuosa mentre l'ananas aggiunge una dolcezza brillante e piccante. Il rum bianco lo lega con un sottile calore. Come una vacanza in un bicchiere.",
      vi: 'Đậm đà, béo ngậy và cực kỳ nhiệt đới. Kem dừa cung cấp kết cấu sang trọng trong khi dứa thêm vị ngọt sáng, chua. Rum trắng gắn kết nó với hơi ấm tinh tế. Như một kỳ nghỉ trong ly.',
    },
    first_impression: {
      en: 'Sweet coconut and bright pineapple with creamy texture',
      it: 'Cocco dolce e ananas brillante con texture cremosa',
      vi: 'Dừa ngọt và dứa sáng với kết cấu béo ngậy',
    },
    finish: {
      en: 'Long, tropical finish with lingering coconut sweetness',
      it: 'Finale lungo e tropicale con dolcezza di cocco persistente',
      vi: 'Kết thúc dài, nhiệt đới với vị ngọt dừa kéo dài',
    },
    balance: {
      en: 'Well-balanced between creamy richness and fruity brightness',
      it: 'Ben bilanciato tra ricchezza cremosa e luminosità fruttata',
      vi: 'Cân bằng tốt giữa độ đậm đà béo ngậy và độ sáng trái cây',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['beach', 'pool_party', 'tropical_party', 'vacation'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with Caribbean cuisine, grilled seafood, jerk chicken, tropical fruits, and coconut-based desserts.',
      it: 'Perfetto con cucina caraibica, frutti di mare alla griglia, pollo jerk, frutti tropicali e dessert a base di cocco.',
      vi: 'Hoàn hảo với ẩm thực Caribbean, hải sản nướng, gà jerk, trái cây nhiệt đới và món tráng miệng dừa.',
    },
    ideal_for: {
      en: 'Ideal for anyone seeking a tropical escape. Perfect for beach vacations, poolside relaxation, or bringing summer vibes to any occasion.',
      it: 'Ideale per chi cerca una fuga tropicale. Perfetto per vacanze al mare, relax a bordo piscina o portare vibrazioni estive in qualsiasi occasione.',
      vi: 'Lý tưởng cho bất kỳ ai tìm kiếm sự thoát ly nhiệt đới. Hoàn hảo cho kỳ nghỉ biển, thư giãn bên bể bơi hoặc mang không khí mùa hè đến bất kỳ dịp nào.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_WHITE_RUM',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_COCONUT_CREAM',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Coconut cream', it: 'Crema di cocco', vi: 'Kem dừa' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 50, unit: 'ml' },
      display_name: {
        en: 'Fresh pineapple juice',
        it: "Succo d'ananas fresco",
        vi: 'Nước dứa tươi',
      },
    },
  ],

  method: 'blend',

  instructions: {
    en: 'Blend all ingredients with ice in an electric blender at high speed. Pour into a large goblet or Hurricane glass. Garnish with a pineapple wedge and maraschino cherry.',
    it: 'Frullare tutti gli ingredienti con ghiaccio in un frullatore elettrico ad alta velocità. Versare in un grande calice o bicchiere Hurricane. Guarnire con uno spicchio di ananas e una ciliegia maraschino.',
    vi: 'Xay nhuyễn tất cả nguyên liệu với đá trong máy xay điện ở tốc độ cao. Đổ vào ly goblet lớn hoặc ly Hurricane. Trang trí bằng miếng dứa và anh đào maraschino.',
  },

  glass: 'Hurricane glass',

  garnish: {
    en: 'Pineapple wedge and maraschino cherry',
    it: 'Spicchio di ananas e ciliegia maraschino',
    vi: 'Miếng dứa và anh đào maraschino',
  },

  ice: 'blended',

  serving_style: 'frozen',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_WHITE_RUM'],

  flavor_profile: ['tropical', 'creamy', 'sweet'],

  abv_estimate: 10,

  calories_estimate: 300,

  difficulty: 'easy',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites', 'tree_nuts'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['beach', 'pool_party', 'tropical_party', 'vacation'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['miami-vice', 'chi-chi', 'amaretto-colada'],

  notes_for_staff:
    'Blend with plenty of ice for proper frozen consistency. Use Coco López or similar coconut cream, not coconut milk. Fresh pineapple juice is essential. Can be made in batches for parties. The Miami Vice combines with frozen Strawberry Daiquiri.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 95,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/pina-colada/',
    notes: 'IBA Official Recipe. National drink of Puerto Rico since 1978.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
