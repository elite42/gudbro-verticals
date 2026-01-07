/**
 * IBA New Era Drinks: Yellow Bird
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const yellowBird: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d',
  slug: 'yellow-bird',
  stable_key: 'a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6',

  name: {
    en: 'Yellow Bird',
    it: 'Yellow Bird',
    vi: 'Yellow Bird',
    ko: '옐로우 버드',
    ja: 'イエローバード',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'rum', 'tropical', 'caribbean', 'fruity'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A vibrant Caribbean cocktail combining rum with Galliano, triple sec, and fresh lime juice. This tropical drink features a beautiful golden color and a perfect balance of sweet and citrus flavors.',
    it: 'Un cocktail caraibico vibrante che combina rum con Galliano, triple sec e succo di lime fresco. Questa bevanda tropicale presenta un bellissimo colore dorato e un perfetto equilibrio di sapori dolci e agrumati.',
    vi: 'Một cocktail Caribbean sống động kết hợp rum với Galliano, triple sec và nước chanh tươi. Thức uống nhiệt đới này có màu vàng đẹp mắt và sự cân bằng hoàn hảo giữa hương vị ngọt và cam quýt.',
  },

  history: {
    created_year: '1960',
    origin: {
      city: 'Kingston',
      bar: 'Unknown',
      country: 'Jamaica',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Yellow Bird was created in Jamaica in the 1960s and became popular in Caribbean resorts. Named after the Haitian folk song "Yellow Bird" (Choucoune), which was popularized by various artists in the 1950s-60s. The drink\'s golden color comes from Galliano and represents the titular yellow bird. It became a staple at tiki bars and tropical destinations worldwide.',
      it: "Il Yellow Bird fu creato in Giamaica negli anni '60 e divenne popolare nei resort caraibici. Prende il nome dalla canzone popolare haitiana \"Yellow Bird\" (Choucoune), che fu resa popolare da vari artisti negli anni '50-'60. Il colore dorato della bevanda deriva dal Galliano e rappresenta l'uccello giallo del titolo. È diventato un punto fermo nei tiki bar e nelle destinazioni tropicali di tutto il mondo.",
      vi: 'Yellow Bird được tạo ra ở Jamaica vào những năm 1960 và trở nên phổ biến ở các khu nghỉ dưỡng Caribbean. Được đặt theo tên bài hát dân gian Haiti "Yellow Bird" (Choucoune), được nhiều nghệ sĩ phổ biến hóa vào những năm 1950-60. Màu vàng của thức uống đến từ Galliano và đại diện cho chú chim vàng trong tên. Nó trở thành món chủ lực tại các quán bar tiki và điểm đến nhiệt đới trên toàn thế giới.',
    },
    named_after: {
      en: 'Named after the Haitian folk song "Yellow Bird" (Choucoune), popular in the 1950s-60s.',
      it: 'Prende il nome dalla canzone popolare haitiana "Yellow Bird" (Choucoune), popolare negli anni \'50-\'60.',
      vi: 'Được đặt theo tên bài hát dân gian Haiti "Yellow Bird" (Choucoune), phổ biến vào những năm 1950-60.',
    },
  },

  taste: {
    profile: ['tropical', 'citrus', 'sweet'],
    description: {
      en: 'Bright tropical flavors with rum sweetness, herbal vanilla notes from Galliano, orange from triple sec, and fresh lime tartness. Smooth and refreshing with a complex finish.',
      it: 'Sapori tropicali brillanti con dolcezza del rum, note erbacee di vaniglia dal Galliano, arancia dal triple sec e acidità fresca del lime. Liscio e rinfrescante con un finale complesso.',
      vi: 'Hương vị nhiệt đới tươi sáng với vị ngọt rum, hương thảo mộc vani từ Galliano, cam từ triple sec và vị chua tươi mát của chanh. Mượt mà và sảng khoái với kết thúc phức tạp.',
    },
    first_impression: {
      en: 'Tropical sweetness with bright citrus and vanilla notes',
      it: 'Dolcezza tropicale con note brillanti di agrumi e vaniglia',
      vi: 'Vị ngọt nhiệt đới với hương cam quýt tươi mát và vani',
    },
    finish: {
      en: 'Smooth, lingering finish with herbal and citrus complexity',
      it: 'Finale liscio e persistente con complessità erbacea e agrumata',
      vi: 'Kết thúc mượt mà, kéo dài với độ phức tạp thảo mộc và cam quýt',
    },
    balance: {
      en: 'Well-balanced between rum richness, liqueur sweetness, and lime tartness',
      it: "Ben bilanciato tra la ricchezza del rum, la dolcezza del liquore e l'acidità del lime",
      vi: 'Cân bằng tốt giữa độ đậm đà rum, vị ngọt rượu mùi và vị chua chanh',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['beach', 'party', 'celebration', 'tiki_night'],
    seasons: ['summer', 'spring'],
    food_pairings: {
      en: 'Excellent with Caribbean cuisine, jerk chicken, tropical fruits, or coconut-based desserts.',
      it: 'Eccellente con cucina caraibica, pollo jerk, frutti tropicali, o dessert a base di cocco.',
      vi: 'Tuyệt vời với ẩm thực Caribbean, gà jerk, trái cây nhiệt đới hoặc món tráng miệng dừa.',
    },
    ideal_for: {
      en: 'Perfect for tiki enthusiasts and those who love tropical, fruity cocktails. Ideal for beach parties or anyone seeking a taste of the Caribbean.',
      it: 'Perfetto per gli appassionati di tiki e per chi ama i cocktail tropicali e fruttati. Ideale per feste in spiaggia o per chiunque cerchi un assaggio dei Caraibi.',
      vi: 'Hoàn hảo cho người đam mê tiki và những ai yêu cocktail nhiệt đới, trái cây. Lý tưởng cho tiệc bãi biển hoặc bất kỳ ai tìm kiếm hương vị Caribbean.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_GALLIANO',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Galliano', it: 'Galliano', vi: 'Galliano' },
    },
    {
      ingredient_id: 'ING_TRIPLE_SEC',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Triple sec', it: 'Triple sec', vi: 'Triple sec' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake well. Strain into a chilled cocktail glass.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene. Filtrare in una coppa da cocktail raffreddata.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc kỹ. Lọc vào ly cocktail đã được làm lạnh.',
  },

  glass: 'Cocktail glass (Martini)',

  garnish: {
    en: 'Orange twist',
    it: 'Twist di arancia',
    vi: 'Vỏ cam xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_WHITE'],

  flavor_profile: ['tropical', 'citrus', 'sweet'],

  abv_estimate: 22,

  calories_estimate: 170,

  difficulty: 'easy',

  prep_time_seconds: 45,

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
  season_tags: ['summer', 'spring'],
  occasion_tags: ['beach', 'party', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['yellow-bird-frozen'],

  notes_for_staff:
    'The golden color should be vibrant. Can be served frozen for a different texture. Some variations add pineapple juice.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 65,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/yellow-bird/',
    notes: 'IBA Official Recipe',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
