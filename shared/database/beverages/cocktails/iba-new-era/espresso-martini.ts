/**
 * IBA New Era Drinks: Espresso Martini
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const espressoMartini: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
  slug: 'espresso-martini',
  stable_key: 'b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1',

  name: {
    en: 'Espresso Martini',
    it: 'Espresso Martini',
    vi: 'Espresso Martini',
    ko: '에스프레소 마티니',
    ja: 'エスプレッソマティーニ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'coffee', 'vodka', 'modern-classic', 'energizing'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A modern classic that perfectly combines rich espresso with smooth vodka and coffee liqueur. This energizing cocktail features a signature foam top created by the natural oils in coffee.',
    it: "Un classico moderno che combina perfettamente l'espresso ricco con vodka liscia e liquore al caffè. Questo cocktail energizzante presenta una caratteristica schiuma superiore creata dagli oli naturali del caffè.",
    vi: 'Một cocktail hiện đại kết hợp hoàn hảo espresso đậm đà với vodka mượt và rượu mùi cà phê. Cocktail tràn năng lượng này có lớp bọt đặc trưng được tạo ra từ dầu tự nhiên trong cà phê.',
  },

  history: {
    created_year: '1983',
    origin: {
      city: 'London',
      bar: 'Soho Brasserie',
      country: 'UK',
    },
    creator: {
      name: 'Dick Bradsell',
      profession: 'bartender',
    },
    story: {
      en: 'Created by legendary bartender Dick Bradsell at the Soho Brasserie in London in 1983. According to legend, a famous model asked Dick to make her a drink that would "wake me up and then f*** me up." The result was the Espresso Martini, originally called the Vodka Espresso. It became one of the most iconic cocktails of the modern era.',
      it: 'Creato dal leggendario barman Dick Bradsell al Soho Brasserie di Londra nel 1983. Secondo la leggenda, una famosa modella chiese a Dick di prepararle una bevanda che la "svegliasse e poi la sconvolgesse". Il risultato fu l\'Espresso Martini, originariamente chiamato Vodka Espresso. È diventato uno dei cocktail più iconici dell\'era moderna.',
      vi: 'Được tạo ra bởi bartender huyền thoại Dick Bradsell tại Soho Brasserie ở London năm 1983. Theo truyền thuyết, một người mẫu nổi tiếng yêu cầu Dick pha cho cô một thức uống có thể "đánh thức tôi và sau đó làm tôi say". Kết quả là Espresso Martini, ban đầu gọi là Vodka Espresso. Nó trở thành một trong những cocktail mang tính biểu tượng nhất của thời đại hiện đại.',
    },
    named_after: {
      en: 'Originally called "Vodka Espresso," later renamed "Espresso Martini" due to its martini glass presentation and coffee-forward profile.',
      it: 'Originariamente chiamato "Vodka Espresso", successivamente rinominato "Espresso Martini" per la sua presentazione in bicchiere da martini e il profilo incentrato sul caffè.',
      vi: 'Ban đầu gọi là "Vodka Espresso", sau đó đổi tên thành "Espresso Martini" do cách trình bày trong ly martini và hương vị cà phê nổi bật.',
    },
  },

  taste: {
    profile: ['bitter', 'sweet', 'rich'],
    description: {
      en: 'Rich coffee flavor balanced with vodka smoothness and coffee liqueur sweetness. Velvety texture with a pleasant bitterness and sweet finish.',
      it: "Ricco sapore di caffè bilanciato con la morbidezza della vodka e la dolcezza del liquore al caffè. Consistenza vellutata con un'amara piacevole e finale dolce.",
      vi: 'Hương vị cà phê đậm đà cân bằng với độ mượt của vodka và vị ngọt của rượu mùi cà phê. Kết cấu mượt mà với vị đắng dễ chịu và kết thúc ngọt ngào.',
    },
    first_impression: {
      en: 'Bold espresso aroma and rich coffee flavor with subtle sweetness',
      it: 'Aroma audace di espresso e ricco sapore di caffè con dolcezza sottile',
      vi: 'Hương espresso đậm và vị cà phê đậm đà với vị ngọt tinh tế',
    },
    finish: {
      en: 'Smooth, lingering coffee finish with a touch of sweetness',
      it: 'Finale di caffè liscio e persistente con un tocco di dolcezza',
      vi: 'Kết thúc cà phê mượt mà, kéo dài với chút ngọt ngào',
    },
    balance: {
      en: 'Perfect balance between coffee bitterness, liqueur sweetness, and vodka smoothness',
      it: 'Equilibrio perfetto tra amarezza del caffè, dolcezza del liquore e morbidezza della vodka',
      vi: 'Cân bằng hoàn hảo giữa vị đắng cà phê, vị ngọt rượu mùi và độ mượt vodka',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['party', 'nightcap', 'date_night', 'pre_dinner'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Pairs wonderfully with chocolate desserts, tiramisu, or as an after-dinner pick-me-up. Also excellent with chocolate truffles or biscotti.',
      it: 'Si abbina meravigliosamente con dessert al cioccolato, tiramisù, o come energizzante dopo cena. Eccellente anche con tartufi al cioccolato o biscotti.',
      vi: 'Kết hợp tuyệt vời với món tráng miệng chocolate, tiramisu, hoặc làm thức uống tăng lực sau bữa tối. Cũng tuyệt vời với truffle chocolate hoặc biscotti.',
    },
    ideal_for: {
      en: 'Perfect for coffee lovers who want an energizing cocktail. Ideal for those who enjoy rich, bold flavors and need a sophisticated pick-me-up.',
      it: 'Perfetto per gli amanti del caffè che vogliono un cocktail energizzante. Ideale per chi ama sapori ricchi e audaci e ha bisogno di un energizzante sofisticato.',
      vi: 'Hoàn hảo cho người yêu cà phê muốn một cocktail tăng lực. Lý tưởng cho những ai thích hương vị đậm đà, táo bạo và cần một thức uống tiếp thêm năng lượng tinh tế.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_COFFEE_LIQUEUR',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Coffee liqueur', it: 'Liquore al caffè', vi: 'Rượu mùi cà phê' },
    },
    {
      ingredient_id: 'ING_ESPRESSO',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Fresh espresso', it: 'Espresso fresco', vi: 'Espresso tươi' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đường' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake vigorously until well-chilled and a foam forms. Double strain into a chilled cocktail glass.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene e formare una schiuma. Filtrare due volte in una coppa da cocktail raffreddata.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh và tạo thành bọt. Lọc đôi vào ly cocktail đã được làm lạnh.',
  },

  glass: 'Cocktail glass (Martini)',

  garnish: {
    en: 'Three coffee beans',
    it: 'Tre chicchi di caffè',
    vi: 'Ba hạt cà phê',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['bitter', 'sweet', 'rich'],

  abv_estimate: 17,

  calories_estimate: 190,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: [],
    intolerances: ['alcohol', 'caffeine'],
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
  season_tags: ['all_year'],
  occasion_tags: ['party', 'nightcap', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['vodka-espresso', 'pharmaceutical-stimulant'],

  notes_for_staff:
    'Use freshly brewed espresso that has cooled slightly. Shake vigorously to create the signature foam. The three coffee beans traditionally represent health, wealth, and happiness.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 95,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/espresso-martini/',
    notes: 'IBA Official Recipe',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
