/**
 * IBA Contemporary Classics: Margarita
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const margaritaContemporary: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  slug: 'margarita-contemporary',
  stable_key: 'margarita_iba_contemporary_2025',

  name: {
    en: 'Margarita',
    it: 'Margarita',
    vi: 'Margarita',
    ko: '마가리타',
    ja: 'マルガリータ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'classic', 'tequila', 'citrus', 'salty'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "The world's most popular tequila cocktail, combining tequila, lime juice, and orange liqueur, typically served with a salt rim. Perfectly balanced between sweet, sour, and salty, making it an endlessly refreshing classic.",
    it: "Il cocktail a base di tequila più popolare al mondo, che combina tequila, succo di lime e liquore all'arancia, tipicamente servito con un bordo di sale. Perfettamente bilanciato tra dolce, acido e salato, rendendolo un classico infinitamente rinfrescante.",
    vi: 'Cocktail tequila phổ biến nhất thế giới, kết hợp tequila, nước chanh và rượu cam, thường được phục vụ với viền muối. Cân bằng hoàn hảo giữa ngọt, chua và mặn, khiến nó trở thành một tác phẩm kinh điển sảng khoái vô tận.',
  },

  history: {
    created_year: '1938',
    origin: {
      city: 'Tijuana',
      bar: 'Rancho La Gloria',
      country: 'Mexico',
    },
    creator: {
      name: 'Carlos "Danny" Herrera',
      profession: 'bartender',
    },
    story: {
      en: 'The Margarita\'s origins are disputed, with several bartenders claiming its creation. The most accepted story credits Carlos "Danny" Herrera, who created it in 1938 at his Rancho La Gloria restaurant near Tijuana for customer Margarita Henkel, a showgirl who was allergic to all spirits except tequila. Other claims include bartender Francisco "Pancho" Morales in 1942. Regardless of its true origin, the Margarita became the most popular tequila cocktail worldwide.',
      it: 'Le origini del Margarita sono contestate, con diversi barman che ne rivendicano la creazione. La storia più accettata attribuisce il merito a Carlos "Danny" Herrera, che lo creò nel 1938 al suo ristorante Rancho La Gloria vicino a Tijuana per la cliente Margarita Henkel, una showgirl allergica a tutti gli spiriti tranne la tequila. Altre rivendicazioni includono il barman Francisco "Pancho" Morales nel 1942. Indipendentemente dalla sua vera origine, il Margarita divenne il cocktail a base di tequila più popolare al mondo.',
      vi: 'Nguồn gốc của Margarita còn tranh cãi, với nhiều bartender tuyên bố đã tạo ra nó. Câu chuyện được chấp nhận nhất ghi công cho Carlos "Danny" Herrera, người đã tạo ra nó vào năm 1938 tại nhà hàng Rancho La Gloria gần Tijuana cho khách hàng Margarita Henkel, một nghệ sĩ biểu diễn bị dị ứng với tất cả rượu mạnh trừ tequila. Các tuyên bố khác bao gồm bartender Francisco "Pancho" Morales vào năm 1942. Bất kể nguồn gốc thực sự, Margarita trở thành cocktail tequila phổ biến nhất trên toàn thế giới.',
    },
    named_after: {
      en: 'Most likely named after Margarita Henkel, though some say it\'s Spanish for "daisy" (the cocktail family it belongs to).',
      it: 'Molto probabilmente prende il nome da Margarita Henkel, anche se alcuni dicono che è spagnolo per "margherita" (la famiglia di cocktail a cui appartiene).',
      vi: 'Rất có thể được đặt theo tên Margarita Henkel, mặc dù một số người nói đó là tiếng Tây Ban Nha cho "hoa cúc" (gia đình cocktail mà nó thuộc về).',
    },
  },

  taste: {
    profile: ['citrus', 'sweet', 'salty', 'tart'],
    description: {
      en: 'Bright, tangy, and refreshing. The salt rim enhances the citrus flavors, tequila provides earthy agave notes, Cointreau adds orange sweetness, and fresh lime brings tartness. A perfect balance of all taste elements.',
      it: "Brillante, piccante e rinfrescante. Il bordo di sale esalta i sapori di agrumi, la tequila fornisce note terrose di agave, il Cointreau aggiunge dolcezza all'arancia e il lime fresco porta acidità. Un perfetto equilibrio di tutti gli elementi di gusto.",
      vi: 'Tươi sáng, chua và sảng khoái. Viền muối làm nổi bật hương vị chanh, tequila cung cấp hương agave đất, Cointreau thêm vị ngọt cam, và chanh tươi mang đến vị chua. Một sự cân bằng hoàn hảo của tất cả các yếu tố hương vị.',
    },
    first_impression: {
      en: 'Salty-citrus burst from the rim, followed by tart lime',
      it: 'Esplosione salata-agrumata dal bordo, seguita da lime aspro',
      vi: 'Bùng nổ mặn-chanh từ viền, theo sau là chanh chua',
    },
    finish: {
      en: 'Clean, crisp finish with lingering agave and citrus notes',
      it: 'Finale pulito e fresco con note persistenti di agave e agrumi',
      vi: 'Kết thúc sạch, sắc nét với hương agave và chanh kéo dài',
    },
    balance: {
      en: 'Perfectly balanced trinity of sweet, sour, and salty',
      it: 'Trinità perfettamente bilanciata di dolce, acido e salato',
      vi: 'Tam vị cân bằng hoàn hảo: ngọt, chua và mặn',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['casual', 'party', 'celebration', 'beach', 'bbq'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Excellent with Mexican cuisine, tacos, guacamole, ceviche, grilled fish, spicy foods, and chips with salsa. The acidity cuts through rich, fatty foods perfectly.',
      it: "Eccellente con cucina messicana, tacos, guacamole, ceviche, pesce alla griglia, cibi piccanti e patatine con salsa. L'acidità taglia perfettamente i cibi ricchi e grassi.",
      vi: 'Tuyệt vời với ẩm thực Mexico, tacos, guacamole, ceviche, cá nướng, đồ ăn cay và khoai tây chiên với salsa. Độ chua cắt qua các món ăn béo ngậy một cách hoàn hảo.',
    },
    ideal_for: {
      en: 'Perfect for tequila lovers and anyone who enjoys bright, citrus-forward cocktails. A crowd-pleasing favorite that works for any occasion.',
      it: 'Perfetto per gli amanti della tequila e chiunque ami cocktail brillanti e agrumati. Un favorito che piace alla folla e funziona per ogni occasione.',
      vi: 'Hoàn hảo cho người yêu tequila và bất kỳ ai thích cocktail chanh tươi sáng. Một món yêu thích được yêu thích phù hợp với mọi dịp.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_TEQUILA',
      quantity: { amount: 50, unit: 'ml' },
      display_name: {
        en: 'Tequila 100% agave',
        it: 'Tequila 100% agave',
        vi: 'Tequila 100% agave',
      },
    },
    {
      ingredient_id: 'ING_COINTREAU',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Cointreau', it: 'Cointreau', vi: 'Cointreau' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_SALT',
      quantity: { amount: 1, unit: 'pinch' },
      display_name: { en: 'Salt', it: 'Sale', vi: 'Muối' },
      notes: { en: 'for rim', it: 'per il bordo', vi: 'cho viền' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Rub the rim of a chilled cocktail glass with lime wedge and dip in salt. Pour all ingredients into shaker with ice cubes. Shake well. Strain into the prepared glass. Garnish with a lime wheel.',
    it: 'Strofinare il bordo di una coppa da cocktail raffreddata con uno spicchio di lime e immergere nel sale. Versare tutti gli ingredienti nello shaker con cubetti di ghiaccio. Shakerare bene. Filtrare nella coppa preparata. Guarnire con una rotella di lime.',
    vi: 'Chà viền ly cocktail đã làm lạnh với miếng chanh và nhúng vào muối. Đổ tất cả nguyên liệu vào shaker với đá viên. Lắc kỹ. Lọc vào ly đã chuẩn bị. Trang trí với vòng chanh.',
  },

  glass: 'Cocktail glass (Margarita)',

  garnish: {
    en: 'Salt rim and lime wheel',
    it: 'Bordo di sale e rotella di lime',
    vi: 'Viền muối và vòng chanh',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_TEQUILA'],

  flavor_profile: ['citrus', 'sweet', 'salty', 'tart'],

  abv_estimate: 27,

  calories_estimate: 170,

  difficulty: 'medium',

  prep_time_seconds: 90,

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
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['casual', 'party', 'celebration', 'beach', 'bbq'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['frozen-margarita', 'strawberry-margarita', 'spicy-margarita', 'cadillac-margarita'],

  notes_for_staff:
    'Use 100% agave tequila for best results. Cointreau is preferred over cheaper triple sec. Fresh lime juice is essential - never use bottled. Salt rim is optional - ask customer preference. Can serve on the rocks or frozen.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 100,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/margarita/',
    notes: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
