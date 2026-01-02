/**
 * IBA Contemporary Classics: Cosmopolitan
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const cosmopolitan: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c9d0e1f2-3a4b-5c6d-7e8f-9a0b1c2d3e4f',
  slug: 'cosmopolitan',
  stable_key: 'cosmopolitan_iba_contemporary_classic',

  name: {
    en: 'Cosmopolitan',
    it: 'Cosmopolitan',
    vi: 'Cosmopolitan',
    ko: '코스모폴리탄',
    ja: 'コスモポリタン',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'modern-classic', 'citrus', 'tart', 'elegant', 'iconic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The quintessential modern cocktail - vodka, Cointreau, cranberry, and lime in perfect harmony. Made famous by Sex and the City, the Cosmopolitan is sophisticated, pink, and utterly chic.',
    it: 'Il cocktail moderno per eccellenza - vodka, Cointreau, mirtillo rosso e lime in perfetta armonia. Reso famoso da Sex and the City, il Cosmopolitan è sofisticato, rosa e assolutamente chic.',
    vi: 'Cocktail hiện đại tinh túy - vodka, Cointreau, nam việt quất và chanh trong sự hài hòa hoàn hảo. Được làm nổi tiếng bởi Sex and the City, Cosmopolitan là tinh tế, màu hồng và cực kỳ sang trọng.',
  },

  history: {
    created_year: '1987',
    origin: {
      city: 'Miami / New York',
      bar: 'Multiple claims',
      country: 'USA',
    },
    creator: {
      name: 'Toby Cecchini (popularized)',
      profession: 'bartender',
    },
    story: {
      en: 'While several bartenders claim to have invented the Cosmopolitan in the 1970s-80s, it was Toby Cecchini at The Odeon in Manhattan who created the modern version in 1987-88 using Absolut Citron. The drink exploded in popularity after being featured regularly on HBO\'s Sex and the City (1998-2004), becoming synonymous with urban sophistication.',
      it: 'Mentre diversi barman sostengono di aver inventato il Cosmopolitan negli anni \'70-\'80, fu Toby Cecchini all\'Odeon di Manhattan che creò la versione moderna nel 1987-88 utilizzando Absolut Citron. La bevanda esplose in popolarità dopo essere stata presentata regolarmente in Sex and the City di HBO (1998-2004), diventando sinonimo di sofisticazione urbana.',
      vi: 'Trong khi nhiều bartender tuyên bố đã phát minh ra Cosmopolitan vào những năm 1970-80, chính Toby Cecchini tại The Odeon ở Manhattan đã tạo ra phiên bản hiện đại vào năm 1987-88 sử dụng Absolut Citron. Thức uống bùng nổ về độ phổ biến sau khi được giới thiệu thường xuyên trên Sex and the City của HBO (1998-2004), trở thành đồng nghĩa với sự tinh tế đô thị.',
    },
    named_after: {
      en: 'Named "Cosmopolitan" to evoke sophistication, worldliness, and urban elegance.',
      it: 'Chiamato "Cosmopolitan" per evocare sofisticazione, mondanità ed eleganza urbana.',
      vi: 'Được đặt tên "Cosmopolitan" để gợi lên sự tinh tế, tính thế giới và thanh lịch đô thị.',
    },
  },

  taste: {
    profile: ['citrus', 'tart', 'fruity'],
    description: {
      en: 'Bright, tart, and perfectly balanced. Cranberry provides tartness and color, lime adds citrus zing, Cointreau brings orange sweetness, and vodka keeps it clean and crisp. Sophisticated and refreshing.',
      it: 'Brillante, aspro e perfettamente bilanciato. Il mirtillo rosso fornisce acidità e colore, il lime aggiunge vivacità agrumata, il Cointreau porta dolcezza di arancia e la vodka lo mantiene pulito e croccante. Sofisticato e rinfrescante.',
      vi: 'Sáng, chua và cân bằng hoàn hảo. Nam việt quất cung cấp vị chua và màu sắc, chanh thêm vị cam quýt sảng khoái, Cointreau mang lại vị ngọt cam, và vodka giữ nó sạch và giòn. Tinh tế và sảng khoái.',
    },
    first_impression: {
      en: 'Tart cranberry and bright citrus with orange notes',
      it: 'Mirtillo rosso aspro e agrumi brillanti con note di arancia',
      vi: 'Nam việt quất chua và cam quýt sáng với hương cam',
    },
    finish: {
      en: 'Clean, crisp finish with lingering citrus',
      it: 'Finale pulito e croccante con agrumi persistenti',
      vi: 'Kết thúc sạch, giòn với cam quýt kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between tart, sweet, and citrus',
      it: 'Perfettamente bilanciato tra aspro, dolce e agrumi',
      vi: 'Cân bằng hoàn hảo giữa chua, ngọt và cam quýt',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['date_night', 'celebration', 'girls_night', 'cocktail_party'],
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    food_pairings: {
      en: 'Perfect with appetizers, sushi, seafood, light salads, and sophisticated finger foods.',
      it: 'Perfetto con antipasti, sushi, frutti di mare, insalate leggere e finger food sofisticati.',
      vi: 'Hoàn hảo với món khai vị, sushi, hải sản, salad nhẹ và đồ ăn ngón tay tinh tế.',
    },
    ideal_for: {
      en: 'Perfect for anyone seeking a sophisticated, stylish cocktail. The ultimate choice for cosmopolitan urbanites and cocktail connoisseurs.',
      it: 'Perfetto per chi cerca un cocktail sofisticato ed elegante. La scelta finale per gli urbaniti cosmopoliti e gli intenditori di cocktail.',
      vi: 'Hoàn hảo cho bất kỳ ai tìm kiếm cocktail tinh tế, phong cách. Lựa chọn tối thượng cho người đô thị cosmopolitan và người sành cocktail.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA_CITRON',
      quantity: { amount: 40, unit: 'ml' },
      display_name: { en: 'Vodka Citron', it: 'Vodka Citron', vi: 'Vodka Citron' },
    },
    {
      ingredient_id: 'ING_COINTREAU',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Cointreau', it: 'Cointreau', vi: 'Cointreau' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước cốt chanh tươi' },
    },
    {
      ingredient_id: 'ING_CRANBERRY_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Cranberry juice', it: 'Succo di mirtillo rosso', vi: 'Nước nam việt quất' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice cubes. Shake well. Strain into a chilled cocktail glass. Garnish with a flamed orange peel or lime wheel.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di cubetti di ghiaccio. Shakerare bene. Filtrare in una coppa da cocktail raffreddata. Guarnire con una scorza d\'arancia fiammeggiata o una fetta di lime.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá viên. Lắc kỹ. Lọc vào ly cocktail đã làm lạnh. Trang trí bằng vỏ cam cháy hoặc bánh xe chanh.',
  },

  glass: 'Cocktail glass (Martini)',

  garnish: {
    en: 'Flamed orange peel or lime wheel',
    it: 'Scorza d\'arancia fiammeggiata o fetta di lime',
    vi: 'Vỏ cam cháy hoặc bánh xe chanh',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA_CITRON'],

  flavor_profile: ['citrus', 'tart', 'fruity'],

  abv_estimate: 18,

  calories_estimate: 160,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn', 'winter'],
  occasion_tags: ['date_night', 'celebration', 'girls_night', 'cocktail_party'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['metropolitan', 'flirtini', 'white-cosmopolitan'],

  notes_for_staff: 'Use Absolut Citron or similar citrus vodka for authenticity. Fresh lime juice is essential. Shake hard for proper dilution. The drink should be a distinctive pink color. Flame the orange peel for added aromatics.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/cosmopolitan/',
    note: 'IBA Official Recipe. Made famous by Sex and the City.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
