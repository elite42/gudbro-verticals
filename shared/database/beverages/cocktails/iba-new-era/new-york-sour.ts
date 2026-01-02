/**
 * IBA New Era Drinks: New York Sour
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const newYorkSour: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
  slug: 'new-york-sour',
  stable_key: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0',

  name: {
    en: 'New York Sour',
    it: 'New York Sour',
    vi: 'New York Sour',
    ko: '뉴욕 사워',
    ja: 'ニューヨークサワー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'whiskey', 'sour', 'wine', 'citrus'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A sophisticated twist on the classic Whiskey Sour, the New York Sour features a red wine float that creates a beautiful gradient effect. This elegant cocktail combines the bright citrus notes of a sour with the rich depth of red wine.',
    it: 'Una sofisticata variazione del classico Whiskey Sour, il New York Sour presenta un galleggiante di vino rosso che crea un bellissimo effetto gradiente. Questo cocktail elegante combina le note di agrumi brillanti di un sour con la profondità ricca del vino rosso.',
    vi: 'Một biến tấu tinh tế của Whiskey Sour cổ điển, New York Sour có lớp rượu vang đỏ nổi tạo hiệu ứng chuyển màu đẹp mắt. Cocktail thanh lịch này kết hợp hương vị cam quýt tươi mát của sour với độ sâu đậm đà của rượu vang đỏ.',
  },

  history: {
    created_year: '1880',
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
      en: 'The New York Sour originated in the 1880s, originally known as the Continental Sour or Southern Whiskey Sour. The addition of a red wine float transformed the classic whiskey sour into an elegant layered cocktail. The drink became popular in New York establishments and eventually took on the name New York Sour.',
      it: 'Il New York Sour ebbe origine negli anni 1880, originariamente conosciuto come Continental Sour o Southern Whiskey Sour. L\'aggiunta di un galleggiante di vino rosso trasformò il classico whiskey sour in un elegante cocktail stratificato. Il drink divenne popolare negli stabilimenti di New York e alla fine prese il nome di New York Sour.',
      vi: 'New York Sour có nguồn gốc từ những năm 1880, ban đầu được gọi là Continental Sour hoặc Southern Whiskey Sour. Việc thêm lớp rượu vang đỏ nổi đã biến whiskey sour cổ điển thành một cocktail phân lớp thanh lịch. Thức uống trở nên phổ biến ở các cơ sở New York và cuối cùng lấy tên là New York Sour.',
    },
    named_after: {
      en: 'Named after New York City, where the cocktail gained popularity and became synonymous with sophisticated drinking culture.',
      it: 'Prende il nome da New York City, dove il cocktail ha guadagnato popolarità ed è diventato sinonimo di cultura del bere sofisticata.',
      vi: 'Được đặt theo tên của thành phố New York, nơi cocktail trở nên phổ biến và đồng nghĩa với văn hóa uống tinh tế.',
    },
  },

  taste: {
    profile: ['sour', 'fruity', 'complex'],
    description: {
      en: 'Bright and citrusy upfront from the lemon juice, balanced by whiskey warmth and sweetness, with a sophisticated tannic finish from the red wine float.',
      it: 'Brillante e agrumato in apertura dal succo di limone, bilanciato dal calore e dalla dolcezza del whisky, con un finale tannico sofisticato dal galleggiante di vino rosso.',
      vi: 'Tươi mát và có vị cam quýt từ nước chanh, cân bằng với hương ấm và vị ngọt của whiskey, kết thúc tinh tế với vị chát từ lớp rượu vang đỏ.',
    },
    first_impression: {
      en: 'Tart lemon and whiskey warmth, followed by fruity wine notes',
      it: 'Limone aspro e calore di whisky, seguito da note fruttate di vino',
      vi: 'Chanh chua và hương ấm whiskey, theo sau là hương trái cây từ rượu vang',
    },
    finish: {
      en: 'Long finish with tannic red wine notes and lingering whiskey warmth',
      it: 'Finale lungo con note tanniche di vino rosso e calore persistente di whisky',
      vi: 'Kết thúc dài với hương chát của rượu vang đỏ và hương ấm whiskey kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between sour, sweet, and the wine\'s complexity',
      it: 'Perfettamente bilanciato tra acido, dolce e la complessità del vino',
      vi: 'Cân bằng hoàn hảo giữa chua, ngọt và độ phức tạp của rượu vang',
    },
  },

  recommendations: {
    best_time: ['evening', 'afternoon'],
    occasions: ['date_night', 'celebration', 'aperitivo', 'dinner_party'],
    seasons: ['autumn', 'winter', 'spring'],
    food_pairings: {
      en: 'Excellent with charcuterie boards, grilled meats, aged cheeses, or as an aperitif before a fine dining experience.',
      it: 'Eccellente con taglieri di salumi, carni alla griglia, formaggi stagionati, o come aperitivo prima di un\'esperienza di alta cucina.',
      vi: 'Tuyệt vời với đĩa thịt nguội, thịt nướng, phô mai lâu năm, hoặc làm aperitif trước bữa ăn cao cấp.',
    },
    ideal_for: {
      en: 'Perfect for whiskey lovers looking for something more sophisticated than a standard sour, or wine enthusiasts who want to explore cocktails.',
      it: 'Perfetto per gli amanti del whisky che cercano qualcosa di più sofisticato di un sour standard, o per gli appassionati di vino che vogliono esplorare i cocktail.',
      vi: 'Hoàn hảo cho người yêu whiskey tìm kiếm thứ gì đó tinh tế hơn sour thông thường, hoặc người đam mê rượu vang muốn khám phá cocktail.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_WHISKEY_RYE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Rye whiskey', it: 'Whisky di segale', vi: 'Rượu whiskey lúa mạch đen' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Fresh lemon juice', it: 'Succo di limone fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đường' },
    },
    {
      ingredient_id: 'ING_EGG_WHITE',
      quantity: { amount: 1, unit: 'whole' },
      display_name: { en: 'Egg white', it: 'Albume', vi: 'Lòng trắng trứng' },
      optional: true,
    },
    {
      ingredient_id: 'ING_RED_WINE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Red wine', it: 'Vino rosso', vi: 'Rượu vang đỏ' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Shake whiskey, lemon juice, simple syrup, and egg white (optional) with ice. Strain into an ice-filled rocks glass. Carefully pour red wine over the back of a spoon to create a float on top.',
    it: 'Shakerare whisky, succo di limone, sciroppo semplice e albume (opzionale) con ghiaccio. Filtrare in un bicchiere rocks pieno di ghiaccio. Versare con cura il vino rosso sul dorso di un cucchiaio per creare un galleggiante in cima.',
    vi: 'Lắc whiskey, nước chanh, siro đường và lòng trắng trứng (tùy chọn) với đá. Lọc vào ly rocks đầy đá. Rót cẩn thận rượu vang đỏ qua mặt sau của thìa để tạo lớp nổi trên cùng.',
  },

  glass: 'Rocks glass',

  garnish: {
    en: 'Lemon peel or cherry',
    it: 'Scorza di limone o ciliegia',
    vi: 'Vỏ chanh hoặc cherry',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_WHISKEY_RYE'],

  flavor_profile: ['sour', 'fruity', 'complex'],

  abv_estimate: 15,

  calories_estimate: 220,

  difficulty: 'medium',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['egg', 'sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter', 'spring'],
  occasion_tags: ['date_night', 'celebration', 'aperitivo'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['boston-sour', 'continental-sour', 'claret-snap'],

  notes_for_staff: 'Pour the red wine float slowly over the back of a spoon to create the signature layered effect. Use a dry, fruity red wine like Shiraz or Malbec. Egg white is optional but adds a nice foam.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/new-york-sour/',
    note: 'IBA Official Recipe',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
