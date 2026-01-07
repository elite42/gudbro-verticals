/**
 * IBA Unforgettables: Paradise
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const paradise: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  slug: 'paradise',
  stable_key: 'f7e6d5c4b3a29281706958473625140abcdef123',

  name: {
    en: 'Paradise',
    it: 'Paradise',
    vi: 'Paradise',
    ko: '파라다이스',
    ja: 'パラダイス',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'fruity', 'citrus', 'vintage'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "A delightful Prohibition-era cocktail that combines gin's botanical character with the stone-fruit sweetness of apricot brandy and bright citrus. One of the original IBA cocktails, the Paradise offers a perfect balance of fruity and herbal notes.",
    it: "Un delizioso cocktail dell'era del Proibizionismo che combina il carattere botanico del gin con la dolcezza di frutta a nocciolo del brandy di albicocca e agrumi brillanti. Uno dei cocktail IBA originali, il Paradise offre un perfetto equilibrio di note fruttate ed erbacee.",
    vi: 'Một cocktail thú vị từ thời Cấm rượu kết hợp đặc tính thực vật của gin với vị ngọt trái cây có hạt của brandy mơ và cam quýt tươi sáng. Một trong những cocktail IBA gốc, Paradise mang đến sự cân bằng hoàn hảo giữa hương vị trái cây và thảo mộc.',
  },

  history: {
    created_year: '1930',
    origin: {
      city: 'London',
      bar: 'Savoy Hotel',
      country: 'UK',
    },
    creator: {
      name: 'Harry Craddock',
      profession: 'bartender',
    },
    story: {
      en: 'The Paradise cocktail was created by legendary bartender Harry Craddock and appeared in his famous 1930 "Savoy Cocktail Book." It has been part of the IBA cocktail list since its inception—included in the first official IBA Cocktail List of 50 cocktails created and approved in 1961 in Norway. The drink uses the classic 2:1:1 ratio of gin to apricot brandy to orange juice, making it easy to remember and scale.',
      it: 'Il cocktail Paradise fu creato dal leggendario barman Harry Craddock e apparve nel suo famoso "Savoy Cocktail Book" del 1930. È stato parte della lista dei cocktail IBA sin dalla sua nascita—incluso nella prima lista ufficiale IBA di 50 cocktail creata e approvata nel 1961 in Norvegia. La bevanda utilizza il classico rapporto 2:1:1 di gin, brandy di albicocca e succo d\'arancia, rendendola facile da ricordare e scalare.',
      vi: 'Cocktail Paradise được tạo ra bởi bartender huyền thoại Harry Craddock và xuất hiện trong cuốn sách nổi tiếng "Savoy Cocktail Book" năm 1930 của ông. Nó là một phần của danh sách cocktail IBA từ khi thành lập—được bao gồm trong Danh sách Cocktail IBA chính thức đầu tiên gồm 50 cocktail được tạo ra và phê duyệt vào năm 1961 tại Na Uy. Thức uống sử dụng tỷ lệ cổ điển 2:1:1 của gin, brandy mơ và nước cam, giúp dễ nhớ và mở rộng.',
    },
    named_after: {
      en: 'Named to evoke the blissful, heavenly combination of flavors.',
      it: 'Prende il nome per evocare la combinazione di sapori beata e celestiale.',
      vi: 'Được đặt tên để gợi lên sự kết hợp hương vị hạnh phúc, thiên đường.',
    },
  },

  taste: {
    profile: ['fruity', 'citrus', 'botanical'],
    description: {
      en: "Bright and fruity with apricot sweetness balanced by citrus acidity and gin's botanical backbone. The orange juice provides body while lemon adds zing, creating a harmonious and refreshing cocktail.",
      it: "Luminoso e fruttato con dolcezza di albicocca bilanciata dall'acidità degli agrumi e dalla struttura botanica del gin. Il succo d'arancia fornisce corpo mentre il limone aggiunge vivacità, creando un cocktail armonioso e rinfrescante.",
      vi: 'Tươi sáng và trái cây với vị ngọt mơ cân bằng bởi độ chua cam quýt và xương sống thực vật của gin. Nước cam cung cấp thân thể trong khi chanh thêm sức sống, tạo ra một cocktail hài hòa và sảng khoái.',
    },
    first_impression: {
      en: 'Sweet apricot and orange greet you first, followed by botanical gin',
      it: 'Albicocca dolce e arancia ti accolgono per prime, seguite dal gin botanico',
      vi: 'Mơ ngọt và cam chào đón bạn đầu tiên, tiếp theo là gin thực vật',
    },
    finish: {
      en: 'Clean, citrusy finish with lingering apricot sweetness',
      it: 'Finale pulito e agrumato con dolcezza persistente di albicocca',
      vi: 'Kết thúc sạch sẽ, cam quýt với vị ngọt mơ kéo dài',
    },
    balance: {
      en: 'Well-balanced between sweet fruit and tart citrus',
      it: 'Ben bilanciato tra frutta dolce e agrumi aspri',
      vi: 'Cân bằng tốt giữa trái cây ngọt và cam quýt chua',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'early_evening', 'aperitivo'],
    occasions: ['aperitivo', 'brunch', 'garden_party', 'summer_gathering'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with light appetizers, fruit salads, grilled chicken, or seafood. Pairs well with Mediterranean cuisine and fresh salads.',
      it: 'Eccellente con antipasti leggeri, insalate di frutta, pollo alla griglia o frutti di mare. Si abbina bene con cucina mediterranea e insalate fresche.',
      vi: 'Tuyệt vời với món khai vị nhẹ, salad trái cây, gà nướng hoặc hải sản. Kết hợp tốt với ẩm thực Địa Trung Hải và salad tươi.',
    },
    ideal_for: {
      en: 'Perfect for gin lovers who enjoy fruity cocktails. Ideal for those seeking a refreshing, not-too-sweet drink with classic pedigree.',
      it: 'Perfetto per gli amanti del gin che amano i cocktail fruttati. Ideale per chi cerca una bevanda rinfrescante, non troppo dolce con pedigree classico.',
      vi: 'Hoàn hảo cho người yêu gin thích cocktail trái cây. Lý tưởng cho những ai tìm kiếm thức uống sảng khoái, không quá ngọt với dòng dõi cổ điển.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 40, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_APRICOT_BRANDY',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Apricot brandy', it: 'Brandy di albicocca', vi: 'Brandy mơ' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: "Succo d'arancia fresco", vi: 'Nước cam tươi' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 10, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh tươi',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into cocktail shaker, shake well with ice, strain into chilled cocktail glass.',
    it: 'Versare tutti gli ingredienti nello shaker, shakerare bene con ghiaccio, filtrare in una coppa da cocktail raffreddata.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail, lắc kỹ với đá, lọc vào ly cocktail đã làm lạnh.',
  },

  glass: 'Cocktail glass (Martini)',

  garnish: {
    en: 'Orange twist or lemon twist',
    it: "Scorza d'arancia o scorza di limone",
    vi: 'Vỏ cam hoặc vỏ chanh',
  },

  ice: 'none', // Served "up" - no ice in glass

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['fruity', 'citrus', 'botanical'],

  abv_estimate: 18, // ~18% ABV after dilution

  calories_estimate: 160,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
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
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['aperitivo', 'brunch', 'garden_party'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['aviation', 'clover-club', 'white-lady'],

  notes_for_staff:
    'Use fresh citrus juices only - bottled will not do. The 2:1:1 ratio is easy to remember. Quality apricot brandy makes a big difference. Shake well for proper dilution and to integrate fruit juices.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 50,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/iba-cocktail/paradise/',
    notes:
      'IBA Official Recipe. Historical information from Harry Craddock\'s "Savoy Cocktail Book" (1930).',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
