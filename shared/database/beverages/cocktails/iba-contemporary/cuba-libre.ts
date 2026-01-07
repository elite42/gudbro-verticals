/**
 * IBA Contemporary Classics: Cuba Libre
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const cubaLibre: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
  slug: 'cuba-libre',
  stable_key: 'cuba_libre_iba_contemporary_2025',

  name: {
    en: 'Cuba Libre',
    it: 'Cuba Libre',
    vi: 'Cuba Libre',
    ko: '쿠바 리브레',
    ja: 'キューバ・リブレ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'refreshing', 'highball', 'easy', 'summer'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A refreshing highball combining white rum, cola, and fresh lime juice. More than just a "rum and coke," the Cuba Libre\'s addition of lime transforms it into a balanced, citrus-forward cocktail with historical significance.',
    it: 'Un highball rinfrescante che combina rum bianco, cola e succo di lime fresco. Più di un semplice "rum e coca," l\'aggiunta di lime del Cuba Libre lo trasforma in un cocktail bilanciato, con note di agrumi e significato storico.',
    vi: 'Một loại highball sảng khoái kết hợp rum trắng, cola và nước chanh tươi. Hơn cả một "rum và cola" đơn giản, việc thêm chanh của Cuba Libre biến nó thành một cocktail cân bằng, hương chanh nổi bật với ý nghĩa lịch sử.',
  },

  history: {
    created_year: '1900',
    origin: {
      city: 'Havana',
      country: 'Cuba',
    },
    story: {
      en: 'The Cuba Libre was born during the Spanish-American War around 1900 in Havana. American soldiers mixed their Coca-Cola (newly arrived in Cuba) with local rum and lime, creating this iconic drink. The name means "Free Cuba" in Spanish, celebrating Cuba\'s independence from Spain. The drink became a symbol of the Cuban independence movement and American-Cuban friendship of that era.',
      it: "Il Cuba Libre nacque durante la Guerra Ispano-Americana intorno al 1900 all'Avana. I soldati americani mescolarono la loro Coca-Cola (appena arrivata a Cuba) con rum locale e lime, creando questa bevanda iconica. Il nome significa \"Cuba Libera\" in spagnolo, celebrando l'indipendenza di Cuba dalla Spagna. La bevanda divenne un simbolo del movimento indipendentista cubano e dell'amicizia americano-cubana di quell'epoca.",
      vi: 'Cuba Libre ra đời trong Chiến tranh Tây Ban Nha-Mỹ vào khoảng năm 1900 tại Havana. Những người lính Mỹ đã trộn Coca-Cola của họ (mới đến Cuba) với rum địa phương và chanh, tạo ra thức uống mang tính biểu tượng này. Cái tên có nghĩa là "Cuba Tự Do" trong tiếng Tây Ban Nha, kỷ niệm sự độc lập của Cuba khỏi Tây Ban Nha. Thức uống trở thành biểu tượng của phong trào độc lập Cuba và tình hữu nghị Mỹ-Cuba thời đó.',
    },
    named_after: {
      en: 'Named "Cuba Libre" (Free Cuba) to commemorate Cuba\'s independence from Spain and the end of Spanish colonial rule.',
      it: 'Chiamato "Cuba Libre" (Cuba Libera) per commemorare l\'indipendenza di Cuba dalla Spagna e la fine del dominio coloniale spagnolo.',
      vi: 'Được đặt tên "Cuba Libre" (Cuba Tự Do) để kỷ niệm độc lập của Cuba khỏi Tây Ban Nha và sự kết thúc của chế độ thuộc địa Tây Ban Nha.',
    },
  },

  taste: {
    profile: ['sweet', 'refreshing', 'citrus'],
    description: {
      en: 'Refreshing and balanced. The sweetness of cola is lifted by bright lime acidity, while rum provides a smooth alcoholic backbone. The lime makes all the difference, elevating this beyond a simple mixed drink.',
      it: 'Rinfrescante e bilanciato. La dolcezza della cola è sollevata dalla brillante acidità del lime, mentre il rum fornisce una struttura alcolica morbida. Il lime fa tutta la differenza, elevando questa bevanda oltre un semplice mixed drink.',
      vi: 'Sảng khoái và cân bằng. Vị ngọt của cola được nâng lên bởi vị chua tươi mát của chanh, trong khi rum cung cấp xương sống rượu mượt mà. Chanh tạo nên sự khác biệt, nâng tầm thức uống này vượt xa một loại pha chế đơn giản.',
    },
    first_impression: {
      en: 'Bright lime and cola sweetness hit immediately',
      it: 'Lime brillante e dolcezza di cola colpiscono immediatamente',
      vi: 'Chanh tươi sáng và vị ngọt cola đập vào ngay lập tức',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering citrus notes',
      it: 'Finale pulito e rinfrescante con note di agrumi persistenti',
      vi: 'Kết thúc sạch, sảng khoái với hương chanh kéo dài',
    },
    balance: {
      en: 'Well-balanced between sweet cola, tart lime, and smooth rum',
      it: 'Ben bilanciato tra cola dolce, lime aspro e rum morbido',
      vi: 'Cân bằng tốt giữa cola ngọt, chanh chua và rum mượt',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['casual', 'party', 'beach', 'bbq'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with Cuban sandwiches, grilled meats, BBQ ribs, burgers, tacos, and spicy foods. The sweetness and citrus cut through rich, fatty foods beautifully.',
      it: 'Perfetto con panini cubani, carni alla griglia, costine BBQ, hamburger, tacos e cibi piccanti. La dolcezza e gli agrumi tagliano magnificamente i cibi ricchi e grassi.',
      vi: 'Hoàn hảo với bánh mì Cuba, thịt nướng, sườn BBQ, burger, tacos và đồ ăn cay. Vị ngọt và chanh cắt qua các món ăn béo ngậy một cách tuyệt vời.',
    },
    ideal_for: {
      en: 'Perfect for casual gatherings, beach parties, and anyone who wants an easy-drinking, refreshing cocktail. Great for those new to rum cocktails.',
      it: 'Perfetto per riunioni informali, feste in spiaggia e chiunque voglia un cocktail rinfrescante e facile da bere. Ottimo per chi è nuovo ai cocktail a base di rum.',
      vi: 'Hoàn hảo cho các buổi tụ tập thân mật, tiệc bãi biển và bất kỳ ai muốn một cocktail dễ uống, sảng khoái. Tuyệt vời cho những người mới với cocktail rum.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 12, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_COLA',
      quantity: { amount: 120, unit: 'ml' },
      display_name: { en: 'Cola', it: 'Cola', vi: 'Cola' },
      notes: { en: 'to top', it: 'per riempire', vi: 'để đổ đầy' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Build all ingredients in a highball glass filled with ice. Pour the lime juice and rum directly over ice, top with cola. Stir gently. Garnish with a lime wedge.',
    it: 'Costruire tutti gli ingredienti in un bicchiere highball pieno di ghiaccio. Versare il succo di lime e il rum direttamente sul ghiaccio, completare con la cola. Mescolare delicatamente. Guarnire con uno spicchio di lime.',
    vi: 'Xây dựng tất cả nguyên liệu trong ly highball đầy đá. Đổ nước chanh và rum trực tiếp lên đá, đổ đầy cola. Khuấy nhẹ. Trang trí với một miếng chanh.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Lime wedge',
    it: 'Spicchio di lime',
    vi: 'Miếng chanh',
  },

  ice: 'cubes',

  serving_style: 'built',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_WHITE'],

  flavor_profile: ['sweet', 'refreshing', 'citrus'],

  abv_estimate: 12,

  calories_estimate: 180,

  difficulty: 'easy',

  prep_time_seconds: 30,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'caffeine', 'sulphites_intolerance'],
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
  occasion_tags: ['casual', 'party', 'beach', 'bbq'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['rum-and-coke', 'cuba-libre-premium'],

  notes_for_staff:
    'The lime is what differentiates a Cuba Libre from a simple rum and coke - never skip it. Use fresh lime juice, not bottled. Build in glass to preserve carbonation. Mexican Coke (made with cane sugar) is preferred by some bartenders.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 95,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/cuba-libre/',
    notes: 'IBA Official Recipe. Historical information from Cuban cocktail history sources.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
