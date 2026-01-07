/**
 * Famous Cocktails: Creamsicle
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const creamsicle: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f',
  slug: 'creamsicle',
  stable_key: 'creamsicle_vodka_orange_liqueur_cream_oj',

  name: {
    en: 'Creamsicle',
    it: 'Creamsicle',
    vi: 'Creamsicle',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['creamy', 'dessert', 'famous', 'sweet', 'fruity', 'vodka-based', 'orange'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A nostalgic cocktail inspired by the classic orange-vanilla ice cream bar. Combining vodka, orange liqueur, cream, and orange juice, this drink recreates the beloved childhood treat in liquid form with an adult twist.',
    it: "Un cocktail nostalgico ispirato al classico ghiacciolo all'arancia e vaniglia. Combinando vodka, liquore all'arancia, panna e succo d'arancia, questa bevanda ricrea l'amato dolcetto dell'infanzia in forma liquida con un tocco adulto.",
    vi: 'Một loại cocktail hoài niệm lấy cảm hứng từ thanh kem vani-cam cổ điển. Kết hợp vodka, rượu mùi cam, kem và nước cam, thức uống này tái tạo món ăn tuổi thơ yêu thích dưới dạng lỏng với twist dành cho người lớn.',
  },

  history: {
    created_year: '1990s',
    origin: {
      country: 'USA',
    },
    story: {
      en: 'The Creamsicle cocktail emerged in the 1990s as bartenders sought to recreate beloved childhood flavors in adult beverages. Inspired by the iconic Creamsicle ice cream bar (orange sherbet with vanilla ice cream center) that was popular from the 1920s onward, mixologists combined orange and cream with vodka to capture that nostalgic orange-vanilla flavor. The drink became especially popular in the 2000s during the dessert cocktail boom, offering a refreshing yet indulgent option that bridges the gap between fruity and creamy cocktails.',
      it: "Il cocktail Creamsicle emerse negli anni '90 quando i barman cercarono di ricreare i sapori amati dell'infanzia nelle bevande per adulti. Ispirato dall'iconico ghiacciolo Creamsicle (sorbetto all'arancia con centro di gelato alla vaniglia) popolare dagli anni '20 in poi, i mixologist combinarono arancia e panna con vodka per catturare quel sapore nostalgico arancia-vaniglia. La bevanda divenne particolarmente popolare negli anni 2000 durante il boom dei cocktail da dessert, offrendo un'opzione rinfrescante ma indulgente che colma il divario tra cocktail fruttati e cremosi.",
      vi: 'Cocktail Creamsicle xuất hiện vào những năm 1990 khi bartender tìm cách tái tạo hương vị tuổi thơ yêu thích trong đồ uống người lớn. Lấy cảm hứng từ thanh kem Creamsicle biểu tượng (kem chanh cam với lõi kem vani) phổ biến từ những năm 1920 trở đi, mixologist đã kết hợp cam và kem với vodka để nắm bắt hương vị cam-vani hoài niệm đó. Thức uống trở nên đặc biệt phổ biến vào những năm 2000 trong thời kỳ bùng nổ cocktail tráng miệng, cung cấp lựa chọn sảng khoái nhưng nuông chiều bắc cầu giữa cocktail trái cây và béo ngậy.',
    },
    named_after: {
      en: 'Named after the iconic Creamsicle ice cream bar, known for its orange and vanilla cream combination.',
      it: "Prende il nome dall'iconico ghiacciolo Creamsicle, noto per la sua combinazione di arancia e crema alla vaniglia.",
      vi: 'Được đặt tên theo thanh kem Creamsicle biểu tượng, nổi tiếng với sự kết hợp cam và kem vani.',
    },
  },

  taste: {
    profile: ['creamy', 'sweet', 'fruity', 'citrus'],
    description: {
      en: 'Sweet and refreshing with pronounced orange citrus notes balanced by smooth vanilla cream. Tastes remarkably like the ice cream bar with a pleasant vodka backbone. The combination of fresh orange juice and cream creates a luscious, dessert-like texture.',
      it: "Dolce e rinfrescante con pronunciate note di agrumi d'arancia bilanciate da crema liscia alla vaniglia. Ha un sapore straordinariamente simile al ghiacciolo con una piacevole base di vodka. La combinazione di succo d'arancia fresco e panna crea una consistenza lussuosa simile al dessert.",
      vi: 'Ngọt và sảng khoái với hương cam quýt rõ rệt được cân bằng bởi kem vani mượt mà. Có vị giống đáng kinh ngạc với thanh kem với xương sống vodka dễ chịu. Sự kết hợp của nước cam tươi và kem tạo ra kết cấu tươi tốt giống món tráng miệng.',
    },
    first_impression: {
      en: 'Sweet orange cream with immediate nostalgia for childhood ice cream bars',
      it: "Crema d'arancia dolce con immediata nostalgia per i ghiaccioli dell'infanzia",
      vi: 'Kem cam ngọt với nỗi nhớ ngay lập tức cho thanh kem tuổi thơ',
    },
    finish: {
      en: 'Lingering orange and vanilla sweetness with creamy texture',
      it: 'Dolcezza persistente di arancia e vaniglia con consistenza cremosa',
      vi: 'Vị ngọt cam và vani kéo dài với kết cấu béo ngậy',
    },
    balance: {
      en: 'Well-balanced between citrus brightness and creamy sweetness - refreshing yet indulgent',
      it: 'Ben bilanciato tra luminosità degli agrumi e dolcezza cremosa - rinfrescante ma indulgente',
      vi: 'Cân bằng tốt giữa độ tươi sáng của quýt và vị ngọt béo ngậy - sảng khoái nhưng nuông chiều',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['brunch', 'dessert', 'pool_party', 'casual', 'summer'],
    seasons: ['spring', 'summer', 'all_year'],
    food_pairings: {
      en: 'Perfect with citrus desserts, vanilla cake, cheesecake, or as a dessert replacement. Also pairs well with fresh fruit and light pastries.',
      it: 'Perfetto con dessert agli agrumi, torta alla vaniglia, cheesecake, o come sostituto del dessert. Si abbina bene anche con frutta fresca e dolci leggeri.',
      vi: 'Hoàn hảo với các món tráng miệng quýt, bánh vani, cheesecake, hoặc thay thế món tráng miệng. Cũng kết hợp tốt với trái cây tươi và bánh ngọt nhẹ.',
    },
    ideal_for: {
      en: 'Perfect for those seeking nostalgic flavors in cocktail form. Ideal for summer gatherings, brunch, poolside drinking, and anyone who loves orange-vanilla combinations. Popular with guests who want a fun, approachable dessert cocktail.',
      it: 'Perfetto per chi cerca sapori nostalgici in forma di cocktail. Ideale per riunioni estive, brunch, bevute a bordo piscina e chiunque ami le combinazioni arancia-vaniglia. Popolare con gli ospiti che vogliono un cocktail da dessert divertente e accessibile.',
      vi: 'Hoàn hảo cho những ai tìm kiếm hương vị hoài niệm dưới dạng cocktail. Lý tưởng cho các buổi họp mặt mùa hè, brunch, uống rượu bên bể bơi và bất kỳ ai yêu thích sự kết hợp cam-vani. Phổ biến với khách muốn cocktail tráng miệng vui nhộn, dễ tiếp cận.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 45, unit: 'ml' },
      display_name: {
        en: 'Vodka (vanilla vodka optional)',
        it: 'Vodka (vodka alla vaniglia opzionale)',
        vi: 'Vodka (vodka vani tùy chọn)',
      },
    },
    {
      ingredient_id: 'ING_TRIPLE_SEC',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Orange liqueur (Triple Sec)',
        it: "Liquore all'arancia (Triple Sec)",
        vi: 'Rượu mùi cam (Triple Sec)',
      },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: "Succo d'arancia fresco", vi: 'Nước cam tươi' },
    },
    {
      ingredient_id: 'ING_HEAVY_CREAM',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Heavy cream (or half-and-half)',
        it: 'Panna (o half-and-half)',
        vi: 'Kem tươi (hoặc half-and-half)',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously for 15 seconds until well-chilled and frothy. Strain into an ice-filled highball or rocks glass. Garnish with an orange wheel or wedge. Can also be served frozen by blending with ice for a slushy texture.',
    it: "Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente per 15 secondi fino a quando è ben freddo e schiumoso. Filtrare in un bicchiere highball o rocks pieno di ghiaccio. Guarnire con una ruota o spicchio d'arancia. Può anche essere servito frozen frullando con ghiaccio per una consistenza granita.",
    vi: 'Cho tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh trong 15 giây cho đến khi lạnh kỹ và có bọt. Lọc vào ly highball hoặc rocks đầy đá. Trang trí bằng vòng tròn hoặc miếng cam. Cũng có thể được phục vụ đông lạnh bằng cách xay với đá để có kết cấu slushy.',
  },

  glass: 'Highball (or Rocks glass)',

  garnish: {
    en: 'Orange wheel or wedge, whipped cream (optional)',
    it: "Ruota o spicchio d'arancia, panna montata (opzionale)",
    vi: 'Vòng tròn hoặc miếng cam, kem tươi (tùy chọn)',
  },

  ice: 'cubes',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['creamy', 'sweet', 'fruity', 'citrus'],

  abv_estimate: 12,

  calories_estimate: 240,

  difficulty: 'easy',

  prep_time_seconds: 45,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk'],
    intolerances: ['lactose', 'alcohol'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['spring', 'summer', 'all_year'],
  occasion_tags: ['brunch', 'dessert', 'casual', 'pool-party'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['frozen-creamsicle', 'creamsicle-martini', 'orange-dream-cocktail'],

  notes_for_staff:
    'Use vanilla vodka for more authentic Creamsicle flavor. Fresh orange juice is essential - never use concentrate. Can add a splash of vanilla extract if not using vanilla vodka. Popular served frozen/blended in summer. Very Instagram-friendly presentation.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'budget',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/creamsicle-cocktail/',
    notes: 'Nostalgic cocktail inspired by the classic orange-vanilla ice cream bar.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
