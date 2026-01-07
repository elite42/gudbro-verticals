/**
 * Famous Cocktails: Washington Apple
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const washingtonApple: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd4e5f6g7-8901-2345-de45-fg67hi890123',
  slug: 'washington-apple',
  stable_key: 'washington_apple_shot_famous_whiskey_apple',

  name: {
    en: 'Washington Apple',
    it: 'Washington Apple',
    vi: 'Washington Apple',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['shot', 'shooter', 'famous', 'whiskey', 'apple', 'fruity', 'sweet'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A sweet and fruity shooter combining Canadian whisky, sour apple schnapps, and cranberry juice. Named after Washington State, famous for its apple production, this shot delivers a perfect blend of whiskey warmth and tart apple flavor.',
    it: 'Uno shooter dolce e fruttato che combina whisky canadese, schnapps di mela acida e succo di mirtillo rosso. Prende il nome dallo Stato di Washington, famoso per la sua produzione di mele, questo shot offre una miscela perfetta di calore del whisky e sapore di mela aspra.',
    vi: 'Một loại shooter ngọt và trái cây kết hợp whisky Canada, schnapps táo chua và nước ép nam việt quất. Được đặt theo tên Tiểu bang Washington, nổi tiếng với việc sản xuất táo, shot này mang đến sự pha trộn hoàn hảo giữa hơi ấm whisky và hương vị táo chua.',
  },

  history: {
    created_year: '1990s',
    origin: {
      city: 'Unknown',
      bar: 'Unknown',
      country: 'USA',
    },
    story: {
      en: "The Washington Apple shot gained popularity in the 1990s, likely created as a tribute to Washington State's famous apple orchards. The combination of Crown Royal whisky with apple schnapps created a uniquely smooth and approachable shooter that became a bar staple across North America.",
      it: "Lo shot Washington Apple ha guadagnato popolarità negli anni '90, probabilmente creato come tributo ai famosi frutteti di mele dello Stato di Washington. La combinazione di whisky Crown Royal con schnapps di mela ha creato uno shooter unico, morbido e accessibile che è diventato un elemento base nei bar del Nord America.",
      vi: 'Shot Washington Apple trở nên phổ biến vào những năm 1990, có thể được tạo ra như một lời tri ân đến những vườn táo nổi tiếng của Tiểu bang Washington. Sự kết hợp của whisky Crown Royal với schnapps táo tạo ra một loại shooter mượt mà và dễ tiếp cận độc đáo đã trở thành món chính tại các quầy bar khắp Bắc Mỹ.',
    },
    named_after: {
      en: 'Named after Washington State, one of the largest apple-producing regions in the United States.',
      it: 'Prende il nome dallo Stato di Washington, una delle più grandi regioni produttrici di mele negli Stati Uniti.',
      vi: 'Được đặt theo tên Tiểu bang Washington, một trong những vùng sản xuất táo lớn nhất ở Hoa Kỳ.',
    },
  },

  taste: {
    profile: ['sweet', 'fruity', 'smooth'],
    description: {
      en: 'Smooth whiskey base with bright green apple tartness and a hint of cranberry. Sweet and approachable with just enough tartness to keep it interesting. The Crown Royal adds warmth and depth.',
      it: 'Base di whisky morbida con acidità brillante di mela verde e un tocco di mirtillo rosso. Dolce e accessibile con acidità sufficiente per mantenerlo interessante. Il Crown Royal aggiunge calore e profondità.',
      vi: 'Nền whisky mượt với vị chua táo xanh tươi sáng và chút nam việt quất. Ngọt và dễ tiếp cận với đủ vị chua để giữ sự thú vị. Crown Royal thêm hơi ấm và chiều sâu.',
    },
    first_impression: {
      en: 'Tart green apple with sweet whiskey undertones',
      it: 'Mela verde aspra con sottotoni di whisky dolce',
      vi: 'Táo xanh chua với hương vị whisky ngọt bên dưới',
    },
    finish: {
      en: 'Smooth, warming finish with lingering apple and cranberry notes',
      it: 'Finale morbido e caldo con note persistenti di mela e mirtillo rosso',
      vi: 'Kết thúc mượt mà, ấm áp với hương táo và nam việt quất kéo dài',
    },
    balance: {
      en: 'Well-balanced between sweet and tart with smooth whiskey warmth',
      it: 'Ben bilanciato tra dolce e aspro con calore morbido del whisky',
      vi: 'Cân bằng tốt giữa ngọt và chua với hơi ấm whisky mượt mà',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['party', 'celebration', 'nightlife', 'casual'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Pairs well with cheese platters, caramel desserts, or autumn-themed appetizers. Complements pork dishes and roasted nuts.',
      it: 'Si abbina bene con taglieri di formaggi, dessert al caramello o antipasti a tema autunnale. Completa piatti di maiale e noci tostate.',
      vi: 'Kết hợp tốt với đĩa phô mai, món tráng miệng caramel hoặc món khai vị theo chủ đề mùa thu. Bổ sung cho món thit lợn và hạt rang.',
    },
    ideal_for: {
      en: 'Perfect for whiskey drinkers who enjoy fruity, approachable shots. A great introduction to whiskey-based shooters for those who prefer sweeter drinks.',
      it: "Perfetto per i bevitori di whisky che amano gli shot fruttati e accessibili. Un'ottima introduzione agli shooter a base di whisky per chi preferisce le bevande più dolci.",
      vi: 'Hoàn hảo cho người uống whisky thích shot trái cây, dễ tiếp cận. Giới thiệu tuyệt vời cho shooter whisky cho những ai thích đồ uống ngọt hơn.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_CANADIAN_WHISKY',
      quantity: { amount: 20, unit: 'ml' },
      display_name: {
        en: 'Canadian Whisky (Crown Royal)',
        it: 'Whisky Canadese (Crown Royal)',
        vi: 'Whisky Canada (Crown Royal)',
      },
    },
    {
      ingredient_id: 'ING_SOUR_APPLE_SCHNAPPS',
      quantity: { amount: 20, unit: 'ml' },
      display_name: {
        en: 'Sour Apple Schnapps',
        it: 'Schnapps di Mela Acida',
        vi: 'Schnapps Táo Chua',
      },
    },
    {
      ingredient_id: 'ING_CRANBERRY_JUICE',
      quantity: { amount: 20, unit: 'ml' },
      display_name: {
        en: 'Cranberry Juice',
        it: 'Succo di Mirtillo Rosso',
        vi: 'Nước Ép Nam Việt Quất',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake well until chilled. Strain into a shot glass and serve immediately.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene fino a raffreddare. Filtrare in un bicchierino da shot e servire immediatamente.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc kỹ cho đến khi lạnh. Lọc vào ly shot và phục vụ ngay lập tức.',
  },

  glass: 'Shot glass',

  garnish: {
    en: 'Apple slice (optional)',
    it: 'Fetta di mela (opzionale)',
    vi: 'Lát táo (tùy chọn)',
  },

  ice: 'none',

  serving_style: 'shot',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_CANADIAN_WHISKY'],

  flavor_profile: ['sweet', 'fruity', 'smooth'],

  abv_estimate: 22,

  calories_estimate: 95,

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
  diet_tags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['party', 'celebration', 'nightlife', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['washington-apple-martini', 'canadian-apple', 'crown-apple-shot'],

  notes_for_staff:
    'Crown Royal is the traditional choice for this shot, but any Canadian whisky works. DeKuyper Sour Apple Pucker is the most common schnapps used. Can be served as a cocktail over ice in a rocks glass.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/washington-apple-shot/',
    notes: 'Popular 1990s shooter featuring Crown Royal and apple schnapps.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
