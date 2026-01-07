/**
 * IBA New Era Drinks: Tipperary
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const tipperary: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
  slug: 'tipperary',
  stable_key: 'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2',

  name: {
    en: 'Tipperary',
    it: 'Tipperary',
    vi: 'Tipperary',
    ko: '티퍼레리',
    ja: 'ティペラリー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'whiskey', 'herbal', 'classic', 'irish'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'An elegant Irish whiskey cocktail that combines the smoothness of Irish whiskey with the herbal complexity of sweet vermouth and the distinctive flavor of green Chartreuse.',
    it: 'Un elegante cocktail con whiskey irlandese che combina la morbidezza del whiskey irlandese con la complessità erbacea del vermouth dolce e il sapore distintivo della Chartreuse verde.',
    vi: 'Một cocktail whiskey Ireland thanh lịch kết hợp độ mượt của whiskey Ireland với độ phức tạp thảo mộc của vermouth ngọt và hương vị đặc trưng của Chartreuse xanh.',
  },

  history: {
    created_year: '1916',
    origin: {
      city: 'New York City',
      bar: 'Unknown',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Tipperary cocktail first appeared in Hugo Ensslin\'s 1916 "Recipes for Mixed Drinks." Named after the Irish county and the popular WWI song "It\'s a Long Way to Tipperary," this cocktail celebrates Irish whiskey with a sophisticated blend of vermouth and Chartreuse. It gained renewed popularity during the craft cocktail renaissance of the 2000s.',
      it: 'Il cocktail Tipperary apparve per la prima volta nel "Recipes for Mixed Drinks" di Hugo Ensslin del 1916. Prende il nome dalla contea irlandese e dalla popolare canzone della prima guerra mondiale "It\'s a Long Way to Tipperary", questo cocktail celebra il whiskey irlandese con una miscela sofisticata di vermouth e Chartreuse. Ha guadagnato rinnovata popolarità durante il rinascimento dei cocktail artigianali degli anni 2000.',
      vi: 'Cocktail Tipperary lần đầu xuất hiện trong "Recipes for Mixed Drinks" của Hugo Ensslin năm 1916. Được đặt theo tên hạt Ireland và bài hát WWI nổi tiếng "It\'s a Long Way to Tipperary", cocktail này tôn vinh whiskey Ireland với sự pha trộn tinh tế của vermouth và Chartreuse. Nó trở nên phổ biến trở lại trong thời kỳ phục hưng cocktail thủ công những năm 2000.',
    },
    named_after: {
      en: 'Named after County Tipperary in Ireland and the WWI song "It\'s a Long Way to Tipperary."',
      it: 'Prende il nome dalla Contea di Tipperary in Irlanda e dalla canzone della prima guerra mondiale "It\'s a Long Way to Tipperary."',
      vi: 'Được đặt theo tên của Hạt Tipperary ở Ireland và bài hát WWI "It\'s a Long Way to Tipperary."',
    },
  },

  taste: {
    profile: ['herbal', 'complex', 'smooth'],
    description: {
      en: 'Smooth Irish whiskey with herbal, honeyed notes from the Chartreuse and sweet vermouth. Complex and well-balanced with a warming finish.',
      it: 'Whiskey irlandese liscio con note erbacee e di miele dalla Chartreuse e dal vermouth dolce. Complesso e ben bilanciato con un finale caldo.',
      vi: 'Whiskey Ireland mượt mà với hương thảo mộc, mật ong từ Chartreuse và vermouth ngọt. Phức tạp và cân bằng tốt với kết thúc ấm áp.',
    },
    first_impression: {
      en: 'Herbal and honeyed with Irish whiskey warmth',
      it: 'Erbacea e di miele con il calore del whiskey irlandese',
      vi: 'Thảo mộc và mật ong với hương ấm của whiskey Ireland',
    },
    finish: {
      en: 'Long, warming finish with lingering herbal complexity',
      it: 'Finale lungo e caldo con complessità erbacea persistente',
      vi: 'Kết thúc dài, ấm áp với độ phức tạp thảo mộc kéo dài',
    },
    balance: {
      en: 'Well-balanced between whiskey smoothness, vermouth sweetness, and Chartreuse herbal notes',
      it: 'Ben bilanciato tra la morbidezza del whiskey, la dolcezza del vermouth e le note erbacee della Chartreuse',
      vi: 'Cân bằng tốt giữa độ mượt whiskey, vị ngọt vermouth và hương thảo mộc Chartreuse',
    },
  },

  recommendations: {
    best_time: ['evening', 'afternoon'],
    occasions: ['aperitivo', 'celebration', 'date_night', 'st_patricks_day'],
    seasons: ['autumn', 'winter', 'spring'],
    food_pairings: {
      en: "Excellent with Irish stew, shepherd's pie, aged cheddar, or as a pre-dinner aperitif.",
      it: "Eccellente con stufato irlandese, shepherd's pie, cheddar stagionato, o come aperitivo prima di cena.",
      vi: "Tuyệt vời với món hầm Ireland, bánh shepherd's pie, phô mai cheddar lâu năm, hoặc làm aperitif trước bữa tối.",
    },
    ideal_for: {
      en: "Perfect for Irish whiskey enthusiasts and those who appreciate herbal, complex cocktails. Ideal for St. Patrick's Day or anyone exploring classic cocktails.",
      it: 'Perfetto per gli appassionati di whiskey irlandese e per coloro che apprezzano i cocktail erbacei e complessi. Ideale per il giorno di San Patrizio o per chiunque esplori i cocktail classici.',
      vi: 'Hoàn hảo cho người đam mê whiskey Ireland và những ai đánh giá cao cocktail thảo mộc, phức tạp. Lý tưởng cho ngày St. Patrick hoặc bất kỳ ai khám phá cocktail cổ điển.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_WHISKEY_IRISH',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'Irish whiskey', it: 'Whiskey irlandese', vi: 'Whiskey Ireland' },
    },
    {
      ingredient_id: 'ING_VERMOUTH_SWEET',
      quantity: { amount: 25, unit: 'ml' },
      display_name: { en: 'Sweet vermouth', it: 'Vermouth dolce', vi: 'Vermouth ngọt' },
    },
    {
      ingredient_id: 'ING_CHARTREUSE_GREEN',
      quantity: { amount: 25, unit: 'ml' },
      display_name: { en: 'Green Chartreuse', it: 'Chartreuse verde', vi: 'Chartreuse xanh' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Pour all ingredients into a mixing glass filled with ice. Stir well until chilled. Strain into a chilled cocktail glass.',
    it: 'Versare tutti gli ingredienti in un mixing glass pieno di ghiaccio. Mescolare bene fino a raffreddare. Filtrare in una coppa da cocktail raffreddata.',
    vi: 'Đổ tất cả nguyên liệu vào ly trộn đầy đá. Kấy đều cho đến khi lạnh. Lọc vào ly cocktail đã được làm lạnh.',
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
  base_spirits: ['ING_WHISKEY_IRISH'],

  flavor_profile: ['herbal', 'complex', 'smooth'],

  abv_estimate: 30,

  calories_estimate: 180,

  difficulty: 'easy',

  prep_time_seconds: 45,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
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
  season_tags: ['autumn', 'winter', 'spring'],
  occasion_tags: ['aperitivo', 'celebration', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['tipperary-no-2'],

  notes_for_staff:
    "Stir, don't shake, to maintain clarity. The green Chartreuse provides a distinctive herbal character. Some variations use equal parts of all three ingredients.",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/tipperary/',
    notes: 'IBA Official Recipe',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
