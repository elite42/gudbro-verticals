/**
 * IBA Contemporary Classics: Mai Tai
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const maiTai: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e7f8a9b0-c1d2-4e3f-4a5b-6c7d8e9f0a1b',
  slug: 'mai-tai',
  stable_key: 'mai_tai_iba_contemporary_2025',

  name: {
    en: 'Mai Tai',
    it: 'Mai Tai',
    vi: 'Mai Tai',
    ko: '마이타이',
    ja: 'マイタイ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'tiki', 'tropical', 'classic', 'rum'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The quintessential tiki cocktail, combining rum, lime juice, orange curaçao, and orgeat syrup. Tropical, balanced, and complex, the Mai Tai is one of the world\'s most beloved rum cocktails and a symbol of tiki culture.',
    it: 'Il cocktail tiki per eccellenza, che combina rum, succo di lime, curaçao all\'arancia e sciroppo di orzata. Tropicale, bilanciato e complesso, il Mai Tai è uno dei cocktail a base di rum più amati al mondo e un simbolo della cultura tiki.',
    vi: 'Cocktail tiki tinh túy, kết hợp rum, nước chanh, curaçao cam và siro orgeat. Nhiệt đới, cân bằng và phức tạp, Mai Tai là một trong những cocktail rum được yêu thích nhất thế giới và là biểu tượng của văn hóa tiki.',
  },

  history: {
    created_year: '1944',
    origin: {
      city: 'Oakland',
      bar: 'Trader Vic\'s',
      country: 'USA',
    },
    creator: {
      name: 'Victor J. Bergeron (Trader Vic)',
      profession: 'bartender',
    },
    story: {
      en: 'Created in 1944 by Victor J. "Trader Vic" Bergeron at his restaurant in Oakland, California. When Vic served it to Tahitian friends, one exclaimed "Maita\'i roa ae!" meaning "Out of this world! The best!" in Tahitian. The name stuck. The drink became a symbol of tiki culture and tropical escapism. Note: Don the Beachcomber also claimed to have created it in 1933, but Trader Vic\'s version became the standard.',
      it: 'Creato nel 1944 da Victor J. "Trader Vic" Bergeron nel suo ristorante a Oakland, California. Quando Vic lo servì ad amici tahitiani, uno esclamò "Maita\'i roa ae!" che significa "Fuori da questo mondo! Il migliore!" in tahitiano. Il nome rimase. Il drink divenne un simbolo della cultura tiki e dell\'escapismo tropicale. Nota: Don the Beachcomber affermò anche di averlo creato nel 1933, ma la versione di Trader Vic divenne lo standard.',
      vi: 'Được tạo ra vào năm 1944 bởi Victor J. "Trader Vic" Bergeron tại nhà hàng của ông ở Oakland, California. Khi Vic phục vụ nó cho bạn bè Tahiti, một người kêu lên "Maita\'i roa ae!" có nghĩa là "Ngoài thế giới này! Tuyệt nhất!" trong tiếng Tahiti. Cái tên đã gắn bó. Thức uống trở thành biểu tượng của văn hóa tiki và sự trốn tránh nhiệt đới. Lưu ý: Don the Beachcomber cũng tuyên bố đã tạo ra nó vào năm 1933, nhưng phiên bản của Trader Vic trở thành tiêu chuẩn.',
    },
    named_after: {
      en: 'Tahitian phrase "Maita\'i roa ae" meaning "Out of this world!" or "The best!"',
      it: 'Frase tahitiana "Maita\'i roa ae" che significa "Fuori da questo mondo!" o "Il migliore!"',
      vi: 'Cụm từ Tahiti "Maita\'i roa ae" có nghĩa là "Ngoài thế giới này!" hoặc "Tuyệt nhất!"',
    },
  },

  taste: {
    profile: ['tropical', 'citrus', 'sweet', 'balanced'],
    description: {
      en: 'Complex, balanced, and tropical. Fresh lime provides tartness, orgeat adds almond sweetness and richness, orange curaçao brings citrus depth, and rum provides the boozy backbone. A perfect tropical balance.',
      it: 'Complesso, bilanciato e tropicale. Il lime fresco fornisce acidità, l\'orzata aggiunge dolcezza di mandorla e ricchezza, il curaçao all\'arancia porta profondità di agrumi e il rum fornisce la struttura alcolica. Un perfetto equilibrio tropicale.',
      vi: 'Phức tạp, cân bằng và nhiệt đới. Chanh tươi cung cấp vị chua, orgeat thêm vị ngọt hạnh nhân và sự phong phú, curaçao cam mang đến chiều sâu chanh và rum cung cấp xương sống rượu. Một sự cân bằng nhiệt đới hoàn hảo.',
    },
    first_impression: {
      en: 'Bright citrus with nutty almond sweetness',
      it: 'Agrumi brillanti con dolcezza di mandorla',
      vi: 'Chanh tươi sáng với vị ngọt hạnh nhân',
    },
    finish: {
      en: 'Smooth, tropical finish with lingering almond and rum',
      it: 'Finale tropicale morbido con mandorla e rum persistenti',
      vi: 'Kết thúc nhiệt đới mượt mà với hạnh nhân và rum kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between sweet, sour, and nutty elements',
      it: 'Perfettamente bilanciato tra elementi dolci, acidi e di nocciola',
      vi: 'Cân bằng hoàn hảo giữa các yếu tố ngọt, chua và hạt',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['beach', 'party', 'celebration', 'casual'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with Polynesian cuisine, grilled seafood, teriyaki, coconut shrimp, tropical fruits, or tiki bar snacks.',
      it: 'Perfetto con cucina polinesiana, frutti di mare alla griglia, teriyaki, gamberetti al cocco, frutti tropicali o snack da tiki bar.',
      vi: 'Hoàn hảo với ẩm thực Polynesia, hải sản nướng, teriyaki, tôm dừa, trái cây nhiệt đới hoặc đồ ăn nhẹ tiki bar.',
    },
    ideal_for: {
      en: 'Perfect for tiki enthusiasts, rum lovers, and anyone seeking tropical escapism. A must-have at beach bars and tiki establishments.',
      it: 'Perfetto per gli appassionati di tiki, gli amanti del rum e chiunque cerchi escapismo tropicale. Un must nei bar sulla spiaggia e negli stabilimenti tiki.',
      vi: 'Hoàn hảo cho những người đam mê tiki, người yêu rum và bất kỳ ai tìm kiếm sự trốn tránh nhiệt đới. Một món bắt buộc tại các quán bar bãi biển và các cơ sở tiki.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 40, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_RUM_DARK',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Dark rum', it: 'Rum scuro', vi: 'Rum đen' },
    },
    {
      ingredient_id: 'ING_ORANGE_CURACAO',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Orange curaçao', it: 'Curaçao all\'arancia', vi: 'Curaçao cam' },
    },
    {
      ingredient_id: 'ING_ORGEAT',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Orgeat syrup', it: 'Sciroppo di orzata', vi: 'Siro orgeat' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into shaker filled with ice. Shake vigorously. Strain into Old Fashioned glass filled with crushed ice. Garnish with mint sprig, pineapple wedge, and lime wheel.',
    it: 'Versare tutti gli ingredienti nello shaker pieno di ghiaccio. Shakerare vigorosamente. Filtrare in un bicchiere Old Fashioned pieno di ghiaccio tritato. Guarnire con rametto di menta, spicchio di ananas e rotella di lime.',
    vi: 'Đổ tất cả nguyên liệu vào shaker đầy đá. Lắc mạnh. Lọc vào ly Old Fashioned đầy đá nghiền. Trang trí với cành bạc hà, miếng dứa và vòng chanh.',
  },

  glass: 'Old Fashioned glass (or Tiki mug)',

  garnish: {
    en: 'Mint sprig, pineapple wedge, and lime wheel',
    it: 'Rametto di menta, spicchio di ananas e rotella di lime',
    vi: 'Cành bạc hà, miếng dứa và vòng chanh',
  },

  ice: 'crushed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_WHITE', 'ING_RUM_DARK'],

  flavor_profile: ['tropical', 'citrus', 'sweet', 'balanced'],

  abv_estimate: 20,

  calories_estimate: 240,

  difficulty: 'medium',

  prep_time_seconds: 120,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites', 'tree_nuts'],
    intolerances: ['alcohol', 'sulphites_intolerance', 'tree_nut_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['beach', 'party', 'celebration', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['royal-mai-tai', 'navy-grog'],

  notes_for_staff: 'Use quality orgeat (almond syrup) - it\'s essential. Original recipe used 17-year-old J. Wray & Nephew rum (no longer available). Crushed ice is traditional. Garnish lavishly for tiki presentation. Often served in special tiki mugs.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 92,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/mai-tai/',
    note: 'IBA Official Recipe. Original Trader Vic\'s recipe 1944.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
