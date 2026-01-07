/**
 * IBA New Era Drinks: Lemon Drop
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const lemonDrop: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e',
  slug: 'lemon-drop',
  stable_key: 'b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7',

  name: {
    en: 'Lemon Drop',
    it: 'Lemon Drop',
    vi: 'Lemon Drop',
    ko: '레몬 드롭',
    ja: 'レモンドロップ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'vodka', 'citrus', 'sweet', 'modern'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A sweet and tart vodka cocktail inspired by the classic lemon drop candy. This modern classic combines citrus vodka with fresh lemon juice and simple syrup, served with a sugared rim.',
    it: 'Un cocktail vodka dolce e aspro ispirato alla classica caramella lemon drop. Questo classico moderno combina vodka agli agrumi con succo di limone fresco e sciroppo semplice, servito con bordo zuccherato.',
    vi: 'Một cocktail vodka ngọt và chua lấy cảm hứng từ kẹo lemon drop cổ điển. Cocktail hiện đại này kết hợp vodka cam quýt với nước chanh tươi và siro đường, phục vụ với viền đường.',
  },

  history: {
    created_year: '1970',
    origin: {
      city: 'San Francisco',
      bar: "Henry Africa's",
      country: 'USA',
    },
    creator: {
      name: 'Norman Jay Hobday',
      profession: 'bartender',
    },
    story: {
      en: "The Lemon Drop was created in the 1970s by Norman Jay Hobday at Henry Africa's bar in San Francisco. Inspired by the popular lemon drop candy, Hobday created a cocktail version that captured the same sweet-tart flavor profile. The drink became hugely popular in the 1980s and 1990s, particularly among vodka cocktail enthusiasts. Its bright, accessible flavor made it a staple of modern cocktail culture.",
      it: "Il Lemon Drop fu creato negli anni '70 da Norman Jay Hobday al bar Henry Africa's a San Francisco. Ispirato dalla popolare caramella lemon drop, Hobday creò una versione cocktail che catturava lo stesso profilo di sapore dolce-aspro. La bevanda divenne estremamente popolare negli anni '80 e '90, particolarmente tra gli appassionati di cocktail vodka. Il suo sapore brillante e accessibile lo ha reso un punto fermo della cultura del cocktail moderna.",
      vi: "Lemon Drop được tạo ra vào những năm 1970 bởi Norman Jay Hobday tại quán bar Henry Africa's ở San Francisco. Lấy cảm hứng từ kẹo lemon drop phổ biến, Hobday đã tạo ra phiên bản cocktail nắm bắt cùng hương vị ngọt-chua. Thức uống trở nên cực kỳ phổ biến vào những năm 1980 và 1990, đặc biệt trong số những người đam mê cocktail vodka. Hương vị tươi sáng, dễ tiếp cận của nó đã làm cho nó trở thành món chủ lực của văn hóa cocktail hiện đại.",
    },
    named_after: {
      en: 'Named after the popular lemon drop candy, known for its sweet-tart flavor.',
      it: 'Prende il nome dalla popolare caramella lemon drop, nota per il suo sapore dolce-aspro.',
      vi: 'Được đặt theo tên kẹo lemon drop phổ biến, nổi tiếng với hương vị ngọt-chua.',
    },
  },

  taste: {
    profile: ['citrus', 'sweet', 'tart'],
    description: {
      en: 'Bright, zesty lemon flavor with vodka smoothness and balanced sweetness. The sugared rim adds extra sweetness and textural contrast. Refreshing and candy-like.',
      it: 'Sapore di limone brillante e vivace con la morbidezza della vodka e dolcezza bilanciata. Il bordo zuccherato aggiunge dolcezza extra e contrasto di consistenza. Rinfrescante e simile a una caramella.',
      vi: 'Hương vị chanh tươi mát, sảng khoái với độ mượt vodka và vị ngọt cân bằng. Viền đường thêm vị ngọt và tương phản kết cấu. Sảng khoái và giống kẹo.',
    },
    first_impression: {
      en: 'Bright lemon tartness with sugar sweetness',
      it: 'Acidità brillante del limone con dolcezza dello zucchero',
      vi: 'Vị chua chanh tươi mát với vị ngọt đường',
    },
    finish: {
      en: 'Clean, crisp finish with lingering citrus notes',
      it: 'Finale pulito e croccante con note persistenti di agrumi',
      vi: 'Kết thúc trong trẻo, sắc nét với hương cam quýt kéo dài',
    },
    balance: {
      en: 'Well-balanced between lemon tartness and sugar sweetness',
      it: "Ben bilanciato tra l'acidità del limone e la dolcezza dello zucchero",
      vi: 'Cân bằng tốt giữa vị chua chanh và vị ngọt đường',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['party', 'celebration', 'girls_night', 'brunch'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with light appetizers, seafood, salads, or lemon desserts. Perfect as a palate cleanser.',
      it: 'Eccellente con antipasti leggeri, pesce, insalate, o dessert al limone. Perfetto come pulitore del palato.',
      vi: 'Tuyệt vời với món khai vị nhẹ, hải sản, salad hoặc món tráng miệng chanh. Hoàn hảo làm món làm sạch vị giác.',
    },
    ideal_for: {
      en: 'Perfect for those who enjoy sweet, citrusy cocktails. Ideal for vodka lovers or anyone seeking a refreshing, candy-inspired drink.',
      it: 'Perfetto per chi ama i cocktail dolci e agrumati. Ideale per gli amanti della vodka o per chiunque cerchi una bevanda rinfrescante ispirata alle caramelle.',
      vi: 'Hoàn hảo cho những ai thích cocktail ngọt, có vị cam quýt. Lý tưởng cho người yêu vodka hoặc bất kỳ ai tìm kiếm thức uống sảng khoái lấy cảm hứng từ kẹo.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA_CITRUS',
      quantity: { amount: 25, unit: 'ml' },
      display_name: { en: 'Citrus vodka', it: 'Vodka agli agrumi', vi: 'Vodka cam quýt' },
    },
    {
      ingredient_id: 'ING_TRIPLE_SEC',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Triple sec', it: 'Triple sec', vi: 'Triple sec' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh tươi',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Rim a chilled cocktail glass with sugar. Shake all ingredients with ice. Strain into the prepared glass.',
    it: 'Bordare una coppa da cocktail raffreddata con zucchero. Shakerare tutti gli ingredienti con ghiaccio. Filtrare nel bicchiere preparato.',
    vi: 'Viền ly cocktail đã làm lạnh với đường. Lắc tất cả nguyên liệu với đá. Lọc vào ly đã chuẩn bị.',
  },

  glass: 'Cocktail glass (Martini)',

  garnish: {
    en: 'Sugar rim and lemon twist',
    it: 'Bordo di zucchero e twist di limone',
    vi: 'Viền đường và vỏ chanh xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA_CITRUS'],

  flavor_profile: ['citrus', 'sweet', 'tart'],

  abv_estimate: 20,

  calories_estimate: 160,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: [],
    intolerances: ['alcohol'],
    suitable_for_diets: [
      'vegetarian',
      'vegan',
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
  occasion_tags: ['party', 'celebration', 'brunch'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['lemon-drop-shot'],

  notes_for_staff:
    'Sugar rim is essential for authentic presentation. Can use regular vodka if citrus vodka unavailable. Shake vigorously for proper dilution.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/lemon-drop/',
    notes: 'IBA Official Recipe',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
