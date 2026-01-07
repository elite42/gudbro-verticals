/**
 * IBA Contemporary Classics: Rabo-de-Galo
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const raboDeGalo: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
  slug: 'rabo-de-galo',
  stable_key: 'rabo_de_galo_iba_contemporary_2025',

  name: {
    en: 'Rabo-de-Galo',
    it: 'Rabo-de-Galo',
    vi: 'Rabo-de-Galo',
    ko: '하보 지 갈로',
    ja: 'ラボ・デ・ガロ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'brazilian', 'simple', 'strong'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "Brazil's classic cachaça cocktail, combining cachaça with sweet vermouth and a touch of Cynar. Simple yet sophisticated, this drink showcases the grassy, vegetal notes of cachaça balanced with Italian bitters.",
    it: 'Il cocktail classico brasiliano a base di cachaça, che combina cachaça con vermut dolce e un tocco di Cynar. Semplice ma sofisticato, questo drink mette in mostra le note erbacee e vegetali della cachaça bilanciate con amari italiani.',
    vi: 'Cocktail cachaça kinh điển của Brazil, kết hợp cachaça với vermouth ngọt và một chút Cynar. Đơn giản nhưng tinh tế, thức uống này thể hiện hương vị cỏ, thực vật của cachaça cân bằng với rượu mùi Ý.',
  },

  history: {
    created_year: '1940',
    origin: {
      city: 'São Paulo',
      country: 'Brazil',
    },
    story: {
      en: 'The Rabo-de-Galo (meaning "rooster\'s tail" in Portuguese) is a traditional Brazilian cocktail that emerged in São Paulo bars in the 1940s. It represents Brazil\'s embrace of its national spirit cachaça mixed with European liqueurs. The drink gained official recognition when added to the IBA Contemporary Classics list, bringing Brazilian cocktail culture to international bartending.',
      it: 'Il Rabo-de-Galo (che significa "coda di gallo" in portoghese) è un cocktail brasiliano tradizionale emerso nei bar di San Paolo negli anni \'40. Rappresenta l\'abbraccio del Brasile del suo distillato nazionale cachaça mescolato con liquori europei. Il drink ha ottenuto riconoscimento ufficiale quando è stato aggiunto alla lista IBA Contemporary Classics, portando la cultura del cocktail brasiliano al bartending internazionale.',
      vi: 'Rabo-de-Galo (có nghĩa là "đuôi gà trống" trong tiếng Bồ Đào Nha) là một cocktail truyền thống của Brazil xuất hiện tại các quán bar São Paulo vào những năm 1940. Nó đại diện cho sự chấp nhận của Brazil đối với rượu mạnh quốc gia cachaça trộn với rượu mùi châu Âu. Thức uống nhận được sự công nhận chính thức khi được thêm vào danh sách IBA Contemporary Classics, mang văn hóa cocktail Brazil đến bartending quốc tế.',
    },
    named_after: {
      en: 'Named "Rabo-de-Galo" (rooster\'s tail) possibly referring to the drink\'s appearance or the colorful nature of Brazilian cocktail culture.',
      it: 'Chiamato "Rabo-de-Galo" (coda di gallo) probabilmente riferendosi all\'aspetto del drink o alla natura colorata della cultura del cocktail brasiliano.',
      vi: 'Được đặt tên "Rabo-de-Galo" (đuôi gà trống) có thể đề cập đến vẻ ngoài của thức uống hoặc bản chất đầy màu sắc của văn hóa cocktail Brazil.',
    },
  },

  taste: {
    profile: ['herbal', 'sweet', 'bitter'],
    description: {
      en: 'Complex and balanced. Cachaça brings grassy, vegetal notes, sweet vermouth adds richness and spice, while Cynar contributes artichoke bitterness. A sophisticated sip showcasing Brazilian spirit culture.',
      it: 'Complesso e bilanciato. La cachaça porta note erbacee e vegetali, il vermut dolce aggiunge ricchezza e spezie, mentre il Cynar contribuisce con amarezza di carciofo. Un sorso sofisticato che mette in mostra la cultura degli spiriti brasiliani.',
      vi: 'Phức tạp và cân bằng. Cachaça mang đến hương vị cỏ, thực vật, vermouth ngọt thêm sự phong phú và gia vị, trong khi Cynar đóng góp vị đắng atisô. Một ngụm tinh tế thể hiện văn hóa rượu mạnh Brazil.',
    },
    first_impression: {
      en: 'Sweet vermouth and herbal notes, followed by cachaça grassiness',
      it: 'Vermut dolce e note erbacee, seguiti dalla vegetalità della cachaça',
      vi: 'Vermouth ngọt và hương thảo mộc, theo sau là vị cỏ của cachaça',
    },
    finish: {
      en: 'Lingering bitter-sweet finish with artichoke and spice notes',
      it: 'Finale agrodolce persistente con note di carciofo e spezie',
      vi: 'Kết thúc đắng-ngọt kéo dài với hương atisô và gia vị',
    },
    balance: {
      en: 'Well-balanced between sweet vermouth and bitter Cynar',
      it: 'Ben bilanciato tra vermut dolce e Cynar amaro',
      vi: 'Cân bằng tốt giữa vermouth ngọt và Cynar đắng',
    },
  },

  recommendations: {
    best_time: ['aperitivo', 'evening'],
    occasions: ['aperitivo', 'digestivo', 'date_night'],
    seasons: ['autumn', 'winter', 'spring'],
    food_pairings: {
      en: 'Excellent as an aperitivo with Brazilian snacks, coxinha, pão de queijo, olives, or charcuterie. The bitter notes stimulate appetite.',
      it: "Eccellente come aperitivo con snack brasiliani, coxinha, pão de queijo, olive o salumi. Le note amare stimolano l'appetito.",
      vi: 'Tuyệt vời như một aperitivo với đồ ăn nhẹ Brazil, coxinha, pão de queijo, ô liu hoặc charcuterie. Hương vị đắng kích thích vị giác.',
    },
    ideal_for: {
      en: 'Perfect for those who appreciate bitter, complex cocktails and want to explore Brazilian spirits. Great for aperitivo hour.',
      it: "Perfetto per chi apprezza cocktail amari e complessi e vuole esplorare gli spiriti brasiliani. Ottimo per l'ora dell'aperitivo.",
      vi: 'Hoàn hảo cho những ai đánh giá cao cocktail đắng, phức tạp và muốn khám phá rượu mạnh Brazil. Tuyệt vời cho giờ aperitivo.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_CACHACA',
      quantity: { amount: 40, unit: 'ml' },
      display_name: { en: 'Cachaça', it: 'Cachaça', vi: 'Cachaça' },
    },
    {
      ingredient_id: 'ING_VERMOUTH_SWEET',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Sweet vermouth', it: 'Vermut dolce', vi: 'Vermouth ngọt' },
    },
    {
      ingredient_id: 'ING_CYNAR',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Cynar', it: 'Cynar', vi: 'Cynar' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Pour all ingredients into a mixing glass with ice. Stir well. Strain into a chilled cocktail glass. Garnish with an orange twist.',
    it: "Versare tutti gli ingredienti in un mixing glass con ghiaccio. Mescolare bene. Filtrare in una coppa da cocktail raffreddata. Guarnire con una scorza d'arancia.",
    vi: 'Đổ tất cả nguyên liệu vào ly trộn với đá. Khuấy kỹ. Lọc vào ly cocktail đã làm lạnh. Trang trí với vỏ cam xoắn.',
  },

  glass: 'Cocktail glass (Martini)',

  garnish: {
    en: 'Orange twist',
    it: "Scorza d'arancia",
    vi: 'Vỏ cam xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_CACHACA'],

  flavor_profile: ['herbal', 'sweet', 'bitter'],

  abv_estimate: 25,

  calories_estimate: 140,

  difficulty: 'medium',

  prep_time_seconds: 60,

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
  season_tags: ['autumn', 'winter', 'spring'],
  occasion_tags: ['aperitivo', 'digestivo', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['rabo-de-galo-aged'],

  notes_for_staff:
    "Stir, don't shake - maintains clarity. Use quality cachaça (aged is nice but not required). Cynar is essential - don't substitute. Express orange oils over drink before garnishing.",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 45,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/rabo-de-galo/',
    notes: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
