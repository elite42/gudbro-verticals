/**
 * IBA Contemporary Classics: Sex on the Beach
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const sexOnTheBeach: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a3b4c5d6-7e8f-9a0b-1c2d-3e4f5a6b7c8d',
  slug: 'sex-on-the-beach',
  stable_key: 'sex_on_the_beach_iba_contemporary_classic',

  name: {
    en: 'Sex on the Beach',
    it: 'Sex on the Beach',
    vi: 'Sex on the Beach',
    ko: '섹스 온 더 비치',
    ja: 'セックス・オン・ザ・ビーチ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'fruity', 'sweet', 'beach', 'party', 'fun'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A playfully named fruity cocktail combining vodka, peach schnapps, cranberry, and orange juice. Sweet, easy-drinking, and perfect for beach parties - this is the ultimate fun-in-the-sun cocktail.',
    it: "Un cocktail fruttato dal nome giocoso che combina vodka, peach schnapps, mirtillo rosso e succo d'arancia. Dolce, facile da bere e perfetto per le feste in spiaggia - questo è il cocktail definitivo per il divertimento al sole.",
    vi: 'Một cocktail trái cây có tên vui nhộn kết hợp vodka, peach schnapps, nam việt quất và nước cam. Ngọt, dễ uống và hoàn hảo cho bữa tiệc bãi biển - đây là cocktail vui vẻ dưới ánh mặt trời tối thượng.',
  },

  history: {
    created_year: '1987',
    origin: {
      city: 'Fort Lauderdale',
      bar: "Confetti's Bar",
      country: 'USA',
    },
    creator: {
      name: 'Ted Pizio',
      profession: 'bartender',
    },
    story: {
      en: "Created by bartender Ted Pizio at Confetti's Bar in Fort Lauderdale, Florida in 1987. The provocative name was designed to attract attention during spring break season. The drink became wildly popular at beach bars and spread internationally, becoming synonymous with beach party culture.",
      it: "Creato dal barman Ted Pizio al Confetti's Bar di Fort Lauderdale, Florida nel 1987. Il nome provocatorio fu progettato per attirare l'attenzione durante la stagione delle vacanze primaverili. La bevanda divenne estremamente popolare nei bar sulla spiaggia e si diffuse a livello internazionale, diventando sinonimo di cultura delle feste in spiaggia.",
      vi: "Được tạo ra bởi bartender Ted Pizio tại Confetti's Bar ở Fort Lauderdale, Florida vào năm 1987. Cái tên khiêu khích được thiết kế để thu hút sự chú ý trong mùa nghỉ xuân. Thức uống trở nên cực kỳ phổ biến tại các quán bar bãi biển và lan rộng quốc tế, trở thành đồng nghĩa với văn hóa tiệc bãi biển.",
    },
    named_after: {
      en: 'Provocatively named to attract spring break crowds in Fort Lauderdale beach bars.',
      it: 'Nome provocatorio per attirare le folle delle vacanze primaverili nei bar sulla spiaggia di Fort Lauderdale.',
      vi: 'Được đặt tên khiêu khích để thu hút đám đông nghỉ xuân tại các quán bar bãi biển Fort Lauderdale.',
    },
  },

  taste: {
    profile: ['fruity', 'sweet', 'refreshing'],
    description: {
      en: 'Sweet, fruity, and tropical. Peach schnapps provides peachy sweetness, cranberry adds tartness and color, orange juice brings citrus brightness, and vodka keeps it smooth. Easy-drinking and refreshing.',
      it: "Dolce, fruttato e tropicale. Il peach schnapps fornisce dolcezza di pesca, il mirtillo rosso aggiunge acidità e colore, il succo d'arancia porta luminosità agrumata e la vodka lo mantiene morbido. Facile da bere e rinfrescante.",
      vi: 'Ngọt, trái cây và nhiệt đới. Peach schnapps cung cấp vị ngọt đào, nam việt quất thêm vị chua và màu sắc, nước cam mang lại độ sáng cam quýt, và vodka giữ nó mượt mà. Dễ uống và sảng khoái.',
    },
    first_impression: {
      en: 'Sweet peach and orange with tart cranberry',
      it: 'Pesca dolce e arancia con mirtillo rosso aspro',
      vi: 'Đào ngọt và cam với nam việt quất chua',
    },
    finish: {
      en: 'Clean, fruity finish with lingering peach notes',
      it: 'Finale pulito e fruttato con note di pesca persistenti',
      vi: 'Kết thúc sạch, trái cây với hương đào kéo dài',
    },
    balance: {
      en: 'Well-balanced between sweet peach and tart cranberry',
      it: 'Ben bilanciato tra pesca dolce e mirtillo rosso aspro',
      vi: 'Cân bằng tốt giữa đào ngọt và nam việt quất chua',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['beach', 'pool_party', 'spring_break', 'casual_party'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with beach snacks, barbecue, grilled seafood, tropical fruits, and party appetizers.',
      it: 'Perfetto con snack da spiaggia, barbecue, frutti di mare alla griglia, frutti tropicali e antipasti per feste.',
      vi: 'Hoàn hảo với đồ ăn vặt bãi biển, thịt nướng, hải sản nướng, trái cây nhiệt đới và món khai vị tiệc.',
    },
    ideal_for: {
      en: 'Perfect for beach parties, pool gatherings, and anyone seeking a fun, easy-drinking cocktail. Great for crowds and party atmospheres.',
      it: 'Perfetto per feste in spiaggia, riunioni a bordo piscina e chiunque cerchi un cocktail divertente e facile da bere. Ottimo per folle e atmosfere da festa.',
      vi: 'Hoàn hảo cho bữa tiệc bãi biển, tụ tập bên bể bơi và bất kỳ ai tìm kiếm cocktail vui vẻ, dễ uống. Tuyệt vời cho đám đông và không khí tiệc tung.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 40, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_PEACH_SCHNAPPS',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Peach schnapps', it: 'Peach schnapps', vi: 'Peach schnapps' },
    },
    {
      ingredient_id: 'ING_CRANBERRY_JUICE',
      quantity: { amount: 40, unit: 'ml' },
      display_name: {
        en: 'Cranberry juice',
        it: 'Succo di mirtillo rosso',
        vi: 'Nước nam việt quất',
      },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 40, unit: 'ml' },
      display_name: { en: 'Orange juice', it: "Succo d'arancia", vi: 'Nước cam' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Build all ingredients in a highball glass filled with ice. Stir gently. Garnish with an orange slice and cherry.',
    it: "Costruire tutti gli ingredienti in un bicchiere highball pieno di ghiaccio. Mescolare delicatamente. Guarnire con una fetta d'arancia e una ciliegia.",
    vi: 'Xây dựng tất cả nguyên liệu trong ly highball đầy đá. Khuấy nhẹ. Trang trí bằng lát cam và anh đào.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Orange slice and maraschino cherry',
    it: "Fetta d'arancia e ciliegia maraschino",
    vi: 'Lát cam và anh đào maraschino',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['fruity', 'sweet', 'refreshing'],

  abv_estimate: 12,

  calories_estimate: 210,

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
  season_tags: ['spring', 'summer'],
  occasion_tags: ['beach', 'pool_party', 'spring_break', 'casual_party'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['woo-woo', 'fuzzy-navel', 'hairy-navel'],

  notes_for_staff:
    'Very popular party drink. Can be made in large batches. The Woo Woo is similar but without orange juice. Easy to customize ratios based on guest preferences. Some variations add pineapple juice.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/sex-on-the-beach/',
    notes: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
