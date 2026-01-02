/**
 * IBA Unforgettables: Casino
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const casino: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e',
  slug: 'casino',
  stable_key: 'd2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3',

  name: {
    en: 'Casino',
    it: 'Casino',
    vi: 'Casino',
    ko: '카지노',
    ja: 'カジノ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'vintage', 'citrus', 'original-iba'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A classic gin cocktail from the original 1961 IBA list, featuring Old Tom Gin with maraschino liqueur, lemon juice, and orange bitters. The Casino is bright, slightly sweet, and aromatic - a forgotten gem from the golden age of cocktails.',
    it: 'Un classico cocktail al gin dalla lista IBA originale del 1961, con Old Tom Gin, liquore maraschino, succo di limone e orange bitters. Il Casino è brillante, leggermente dolce e aromatico - una gemma dimenticata dall\'età d\'oro dei cocktail.',
    vi: 'Một cocktail gin cổ điển từ danh sách IBA gốc năm 1961, có Old Tom Gin với liqueur maraschino, nước chanh và orange bitters. Casino tươi sáng, hơi ngọt và thơm - một viên ngọc bị lãng quên từ thời hoàng kim của cocktail.',
  },

  history: {
    created_year: '1900s',
    origin: {
      city: 'Unknown',
      bar: 'Unknown',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Casino was one of the original 50 cocktails on the first official IBA Cocktail List created in 1961. This first list was created and approved in 1961 in Norway at the Gausdal Mountain Hotel in Oslo. While its exact origin is unclear, it likely dates from the early 1900s and represents the style of pre-Prohibition gin cocktails. The use of Old Tom Gin, a slightly sweeter style popular in the 19th and early 20th centuries, distinguishes it from modern gin cocktails.',
      it: 'Il Casino fu uno dei 50 cocktail originali della prima lista ufficiale IBA creata nel 1961. Questa prima lista fu creata e approvata nel 1961 in Norvegia al Gausdal Mountain Hotel di Oslo. Anche se la sua origine esatta non è chiara, probabilmente risale ai primi anni del 1900 e rappresenta lo stile dei cocktail al gin pre-Proibizionismo. L\'uso dell\'Old Tom Gin, uno stile leggermente più dolce popolare nel 19° e inizio 20° secolo, lo distingue dai cocktail al gin moderni.',
      vi: 'Casino là một trong 50 cocktail gốc trong Danh sách Cocktail IBA chính thức đầu tiên được tạo ra vào năm 1961. Danh sách đầu tiên này được tạo ra và phê duyệt vào năm 1961 tại Na Uy tại Khách sạn Gausdal Mountain ở Oslo. Mặc dù nguồn gốc chính xác của nó không rõ ràng, nó có thể có từ đầu những năm 1900 và đại diện cho phong cách cocktail gin trước Cấm rượu. Việc sử dụng Old Tom Gin, một phong cách hơi ngọt hơn phổ biến trong thế kỷ 19 và đầu thế kỷ 20, phân biệt nó với cocktail gin hiện đại.',
    },
    named_after: {
      en: 'The name origin is unclear, possibly named after casinos or card games.',
      it: 'L\'origine del nome non è chiara, possibilmente prende il nome da casinò o giochi di carte.',
      vi: 'Nguồn gốc tên không rõ ràng, có thể được đặt tên theo sòng bạc hoặc trò chơi bài.',
    },
  },

  taste: {
    profile: ['citrus', 'herbal', 'slightly_sweet'],
    description: {
      en: 'Bright and citrusy with a touch of sweetness from the Old Tom Gin and maraschino. Orange bitters add aromatic complexity while lemon provides refreshing tartness. More approachable than a modern dry gin cocktail.',
      it: 'Brillante e agrumato con un tocco di dolcezza dall\'Old Tom Gin e dal maraschino. Gli orange bitters aggiungono complessità aromatica mentre il limone fornisce acidità rinfrescante. Più accessibile di un cocktail al gin secco moderno.',
      vi: 'Tươi sáng và cam quýt với một chút ngọt từ Old Tom Gin và maraschino. Orange bitters thêm độ phức tạp thơm trong khi chanh cung cấp vị chua sảng khoái. Dễ tiếp cận hơn cocktail gin khô hiện đại.',
    },
    first_impression: {
      en: 'Bright lemon with subtle cherry-almond notes from maraschino',
      it: 'Limone brillante con sottili note di ciliegia-mandorla dal maraschino',
      vi: 'Chanh tươi sáng với hương cherry-hạnh nhân tinh tế từ maraschino',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering citrus and herbal notes',
      it: 'Finale pulito e rinfrescante con note persistenti di agrumi ed erbacee',
      vi: 'Kết thúc sạch sẽ, sảng khoái với hương cam quýt và thảo mộc kéo dài',
    },
    balance: {
      en: 'Well-balanced between tart, sweet, and botanical elements',
      it: 'Ben bilanciato tra elementi aspri, dolci e botanici',
      vi: 'Cân bằng tốt giữa các yếu tố chua, ngọt và thực vật',
    },
  },

  recommendations: {
    best_time: ['aperitivo', 'afternoon', 'early_evening'],
    occasions: ['aperitivo', 'casual', 'garden_party', 'brunch'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Excellent with light appetizers, seafood, salads, or as an aperitif. Pairs well with oysters, smoked fish, or citrus-based dishes.',
      it: 'Eccellente con antipasti leggeri, frutti di mare, insalate o come aperitivo. Si abbina bene con ostriche, pesce affumicato o piatti a base di agrumi.',
      vi: 'Tuyệt vời với món khai vị nhẹ, hải sản, salad hoặc làm aperitif. Kết hợp tốt với hàu, cá hun khói hoặc các món dựa trên cam quýt.',
    },
    ideal_for: {
      en: 'Perfect for gin enthusiasts interested in historical cocktails and those who prefer slightly sweeter gin drinks than modern London Dry styles.',
      it: 'Perfetto per gli appassionati di gin interessati ai cocktail storici e per chi preferisce drink al gin leggermente più dolci rispetto agli stili London Dry moderni.',
      vi: 'Hoàn hảo cho những người đam mê gin quan tâm đến cocktail lịch sử và những ai thích đồ uống gin hơi ngọt hơn so với phong cách London Dry hiện đại.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_OLD_TOM_GIN',
      quantity: { amount: 40, unit: 'ml' },
      display_name: { en: 'Old Tom Gin', it: 'Old Tom Gin', vi: 'Old Tom Gin' },
    },
    {
      ingredient_id: 'ING_MARASCHINO',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Maraschino Luxardo', it: 'Maraschino Luxardo', vi: 'Maraschino Luxardo' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Fresh lemon juice', it: 'Succo di limone fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_ORANGE_BITTERS',
      quantity: { amount: 2, unit: 'dash' },
      display_name: { en: 'Orange bitters', it: 'Orange bitters', vi: 'Orange bitters' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker, shake well with ice, strain into a chilled rocks glass with ice. Garnish with a lemon zest and a maraschino cherry.',
    it: 'Versare tutti gli ingredienti in uno shaker, shakerare bene con ghiaccio, filtrare in un bicchiere rocks raffreddato con ghiaccio. Guarnire con scorza di limone e una ciliegia maraschino.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail, lắc kỹ với đá, lọc vào ly rocks đã làm lạnh có đá. Trang trí với vỏ chanh và cherry maraschino.',
  },

  glass: 'Rocks glass (Old Fashioned)',

  garnish: {
    en: 'Lemon zest and maraschino cherry',
    it: 'Scorza di limone e ciliegia maraschino',
    vi: 'Vỏ chanh và cherry maraschino',
  },

  ice: 'cubes',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_OLD_TOM_GIN'],

  flavor_profile: ['citrus', 'herbal', 'slightly_sweet'],

  abv_estimate: 20, // ~20% ABV after dilution

  calories_estimate: 140,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'casual', 'brunch'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['aviation', 'last-word', 'martinez'],

  notes_for_staff: 'Old Tom Gin is essential for authenticity - it\'s slightly sweeter than London Dry. Can substitute regular gin if Old Tom unavailable, but add a tiny dash of simple syrup. Use fresh lemon juice only.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 35,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/iba-cocktail/casino/',
    note: 'IBA Official Recipe. Part of the original 1961 IBA cocktail list.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
