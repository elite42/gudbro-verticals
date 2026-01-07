/**
 * IBA New Era Drinks: Paloma
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const paloma: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d',
  slug: 'paloma',
  stable_key: 'a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',

  name: {
    en: 'Paloma',
    it: 'Paloma',
    vi: 'Paloma',
    ko: '팔로마',
    ja: 'パロマ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'tequila', 'grapefruit', 'mexican', 'refreshing'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "Mexico's most popular tequila cocktail, the Paloma combines tequila with fresh grapefruit and lime, topped with soda. Simple, refreshing, and perfectly balanced between sweet, sour, and bitter.",
    it: 'Il cocktail tequila più popolare del Messico, la Paloma combina tequila con pompelmo e lime freschi, completato con soda. Semplice, rinfrescante e perfettamente bilanciato tra dolce, acido e amaro.',
    vi: 'Cocktail tequila phổ biến nhất của Mexico, Paloma kết hợp tequila với bưởi và chanh tươi, phủ soda. Đơn giản, sảng khoái và cân bằng hoàn hảo giữa ngọt, chua và đắng.',
  },

  history: {
    created_year: '1950',
    origin: {
      city: 'Unknown',
      bar: 'Unknown',
      country: 'Mexico',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Paloma\'s exact origins are unclear, though it likely emerged in Mexico in the 1950s. Some attribute it to Don Javier Delgado Corona, owner of La Capilla bar in Tequila, Mexico. The name "Paloma" means "dove" in Spanish. Despite being less known internationally than the Margarita, the Paloma is actually Mexico\'s most popular tequila cocktail. Its simple, refreshing nature made it a favorite throughout Mexico, particularly during hot weather.',
      it: 'Le origini esatte della Paloma non sono chiare, anche se probabilmente emerse in Messico negli anni \'50. Alcuni lo attribuiscono a Don Javier Delgado Corona, proprietario del bar La Capilla a Tequila, Messico. Il nome "Paloma" significa "colomba" in spagnolo. Nonostante sia meno conosciuta internazionalmente della Margarita, la Paloma è in realtà il cocktail tequila più popolare del Messico. La sua natura semplice e rinfrescante la rese una favorita in tutto il Messico, particolarmente durante il clima caldo.',
      vi: 'Nguồn gốc chính xác của Paloma không rõ ràng, mặc dù nó có thể xuất hiện ở Mexico vào những năm 1950. Một số cho rằng nó do Don Javier Delgado Corona, chủ quán bar La Capilla ở Tequila, Mexico tạo ra. Cái tên "Paloma" có nghĩa là "chim bồ câu" trong tiếng Tây Ban Nha. Mặc dù ít được biết đến hơn Margarita trên toàn cầu, Paloma thực sự là cocktail tequila phổ biến nhất của Mexico. Bản chất đơn giản, sảng khoái của nó đã làm cho nó trở thành món yêu thích khắp Mexico, đặc biệt trong thời tiết nóng.',
    },
    named_after: {
      en: 'Named "Paloma" (dove in Spanish), possibly after a popular Mexican folk song "La Paloma."',
      it: 'Chiamata "Paloma" (colomba in spagnolo), possibilmente dopo una popolare canzone popolare messicana "La Paloma."',
      vi: 'Được đặt tên "Paloma" (chim bồ câu trong tiếng Tây Ban Nha), có thể theo bài hát dân gian Mexico nổi tiếng "La Paloma."',
    },
  },

  taste: {
    profile: ['grapefruit', 'refreshing', 'balanced'],
    description: {
      en: 'Bright grapefruit with tequila warmth, lime tartness, and sparkling soda. The natural bitterness of grapefruit balances the sweetness perfectly. Refreshing and easy-drinking.',
      it: "Pompelmo brillante con calore di tequila, acidità del lime e soda frizzante. L'amarezza naturale del pompelmo bilancia perfettamente la dolcezza. Rinfrescante e facile da bere.",
      vi: 'Bưởi tươi mát với hương ấm tequila, vị chua chanh và soda có ga. Vị đắng tự nhiên của bưởi cân bằng hoàn hảo với vị ngọt. Sảng khoái và dễ uống.',
    },
    first_impression: {
      en: 'Bright grapefruit and lime with tequila backbone',
      it: 'Pompelmo e lime brillanti con struttura di tequila',
      vi: 'Bưởi và chanh tươi mát với nền tảng tequila',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering grapefruit bitterness',
      it: 'Finale pulito e rinfrescante con amarezza persistente di pompelmo',
      vi: 'Kết thúc trong trẻo, sảng khoái với vị đắng bưởi kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between grapefruit bitterness, citrus tartness, and gentle sweetness',
      it: 'Perfettamente bilanciato tra amarezza del pompelmo, acidità degli agrumi e dolcezza delicata',
      vi: 'Cân bằng hoàn hảo giữa vị đắng bưởi, vị chua cam quýt và vị ngọt nhẹ nhàng',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['casual', 'beach', 'party', 'mexican_dinner'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with Mexican food, tacos, ceviche, grilled fish, or spicy dishes.',
      it: 'Eccellente con cibo messicano, tacos, ceviche, pesce alla griglia, o piatti piccanti.',
      vi: 'Tuyệt vời với món ăn Mexico, tacos, ceviche, cá nướng hoặc món cay.',
    },
    ideal_for: {
      en: 'Perfect for those who find Margaritas too sweet or want a more refreshing tequila cocktail. Ideal for hot weather and casual gatherings.',
      it: 'Perfetto per chi trova le Margarita troppo dolci o vuole un cocktail tequila più rinfrescante. Ideale per il clima caldo e incontri casuali.',
      vi: 'Hoàn hảo cho những ai thấy Margarita quá ngọt hoặc muốn cocktail tequila sảng khoái hơn. Lý tưởng cho thời tiết nóng và các buổi tụ tập thông thường.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_TEQUILA_BLANCO',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'Blanco tequila', it: 'Tequila blanco', vi: 'Tequila blanco' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_GRAPEFRUIT_SODA',
      quantity: { amount: 100, unit: 'ml' },
      display_name: { en: 'Grapefruit soda', it: 'Soda al pompelmo', vi: 'Soda bưởi' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Pour tequila and lime juice into a highball glass filled with ice. Top with grapefruit soda. Stir gently. Optional: rim with salt.',
    it: 'Versare tequila e succo di lime in un bicchiere highball pieno di ghiaccio. Completare con soda al pompelmo. Mescolare delicatamente. Opzionale: bordare con sale.',
    vi: 'Đổ tequila và nước chanh vào ly highball đầy đá. Phủ soda bưởi lên trên. Khuấy nhẹ nhàng. Tùy chọn: viền muối.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Grapefruit wedge (optional salt rim)',
    it: 'Spicchio di pompelmo (bordo di sale opzionale)',
    vi: 'Miếng bưởi (viền muối tùy chọn)',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_TEQUILA_BLANCO'],

  flavor_profile: ['grapefruit', 'refreshing', 'balanced'],

  abv_estimate: 10,

  calories_estimate: 150,

  difficulty: 'easy',

  prep_time_seconds: 30,

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
  occasion_tags: ['casual', 'beach', 'party'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['paloma-with-fresh-grapefruit'],

  notes_for_staff:
    'Can use fresh grapefruit juice + soda water instead of grapefruit soda for a more refined version. Salt rim is traditional but optional.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/paloma/',
    notes: 'IBA Official Recipe',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
