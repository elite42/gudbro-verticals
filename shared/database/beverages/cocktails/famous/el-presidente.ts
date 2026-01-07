/**
 * Famous Cocktails: El Presidente
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const elPresidente: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f2e8a3d7-9b6c-8f5d-3c0e-6b7c8d9e0f1a',
  slug: 'el-presidente',
  stable_key: 'c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8',

  name: {
    en: 'El Presidente',
    it: 'El Presidente',
    vi: 'El Presidente',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'rum', 'cuban', 'elegant'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'An elegant Cuban cocktail featuring aged rum, dry vermouth, orange curaçao, and grenadine. El Presidente is a sophisticated blend of sweet and dry elements with a beautiful coral color and complex flavor.',
    it: "Un elegante cocktail cubano con rum invecchiato, vermut secco, curaçao all'arancia e granatina. El Presidente è una miscela sofisticata di elementi dolci e secchi con un bellissimo colore corallo e sapore complesso.",
    vi: 'Một loại cocktail Cuba thanh lịch với rum già, vermouth khô, curaçao cam và grenadine. El Presidente là sự pha trộn tinh tế của các yếu tố ngọt và khô với màu san hô đẹp mắt và hương vị phức tạp.',
  },

  history: {
    created_year: '1920',
    origin: {
      city: 'Havana',
      bar: 'Jockey Club',
      country: 'Cuba',
    },
    creator: {
      name: 'Eddie Woelke',
      profession: 'bartender',
    },
    story: {
      en: "Created at Havana's Jockey Club in the 1920s by American bartender Eddie Woelke, El Presidente was named after Cuban President Gerardo Machado. This cocktail became the signature drink of Havana's elite social scene during the 1920s-30s. It represents the golden age of Cuban cocktail culture before the revolution.",
      it: "Creato al Jockey Club di L'Avana negli anni '20 dal barman americano Eddie Woelke, El Presidente prende il nome dal presidente cubano Gerardo Machado. Questo cocktail divenne il drink distintivo della scena sociale d'élite dell'Avana durante gli anni '20-'30. Rappresenta l'età d'oro della cultura cubana dei cocktail prima della rivoluzione.",
      vi: 'Được tạo ra tại Jockey Club của Havana những năm 1920 bởi bartender Mỹ Eddie Woelke, El Presidente được đặt theo tên Tổng thống Cuba Gerardo Machado. Cocktail này trở thành thức uống đặc trưng của giới thượng lưu Havana trong những năm 1920-30. Nó đại diện cho thời kỳ hoàng kim của văn hóa cocktail Cuba trước cách mạng.',
    },
    named_after: {
      en: "Named after Cuban President Gerardo Machado, who served from 1925 to 1933, during the height of Havana's cocktail culture.",
      it: "Prende il nome dal presidente cubano Gerardo Machado, che servì dal 1925 al 1933, durante l'apice della cultura cubana dei cocktail dell'Avana.",
      vi: 'Được đặt theo tên Tổng thống Cuba Gerardo Machado, người phục vụ từ 1925 đến 1933, trong thời kỳ đỉnh cao của văn hóa cocktail Havana.',
    },
  },

  taste: {
    profile: ['balanced', 'elegant', 'complex'],
    description: {
      en: "Sophisticated and balanced with aged rum's warmth, dry vermouth's botanical notes, orange curaçao's citrus sweetness, and grenadine's subtle fruity depth. Elegant and refined without being too sweet.",
      it: "Sofisticato e bilanciato con il calore del rum invecchiato, le note botaniche del vermut secco, la dolcezza agli agrumi del curaçao all'arancia e la profondità fruttata sottile della granatina. Elegante e raffinato senza essere troppo dolce.",
      vi: 'Tinh tế và cân bằng với hơi ấm của rum già, nốt thực vật của vermouth khô, vị ngọt cam quýt của curaçao cam và chiều sâu trái cây tinh tế của grenadine. Thanh lịch và tinh tế mà không quá ngọt.',
    },
    first_impression: {
      en: 'Aged rum and orange notes upfront with dry vermouth complexity',
      it: "Rum invecchiato e note d'arancia in primo piano con complessità di vermut secco",
      vi: 'Rum già và nốt cam trước với độ phức tạp vermouth khô',
    },
    finish: {
      en: 'Smooth, elegant finish with lingering orange and subtle spice',
      it: 'Finale liscio ed elegante con arancia persistente e spezie sottili',
      vi: 'Kết thúc mượt mà, thanh lịch với cam kéo dài và gia vị tinh tế',
    },
    balance: {
      en: 'Perfectly balanced between sweet and dry - sophisticated and nuanced',
      it: 'Perfettamente bilanciato tra dolce e secco - sofisticato e sfumato',
      vi: 'Cân bằng hoàn hảo giữa ngọt và khô - tinh tế và sắc thái',
    },
  },

  recommendations: {
    best_time: ['evening', 'afternoon'],
    occasions: ['aperitivo', 'date_night', 'celebration', 'special_occasion'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Excellent with Cuban cuisine, grilled seafood, citrus-based dishes, or light appetizers. Perfect as a sophisticated aperitif before dinner.',
      it: 'Eccellente con cucina cubana, frutti di mare alla griglia, piatti a base di agrumi o antipasti leggeri. Perfetto come aperitivo sofisticato prima di cena.',
      vi: 'Tuyệt vời với ẩm thực Cuba, hải sản nướng, các món cam quýt hoặc món khai vị nhẹ. Hoàn hảo như khai vị tinh tế trước bữa tối.',
    },
    ideal_for: {
      en: 'Perfect for rum connoisseurs who appreciate elegant, balanced cocktails. Ideal for those seeking a sophisticated alternative to the daiquiri with more complexity.',
      it: "Perfetto per intenditori di rum che apprezzano cocktail eleganti e bilanciati. Ideale per chi cerca un'alternativa sofisticata al daiquiri con più complessità.",
      vi: 'Hoàn hảo cho người sành rum đánh giá cao các loại cocktail thanh lịch, cân bằng. Lý tưởng cho những ai tìm kiếm giải pháp thay thế tinh tế cho daiquiri với nhiều độ phức tạp hơn.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_AGED_RUM',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Aged rum', it: 'Rum invecchiato', vi: 'Rum già' },
    },
    {
      ingredient_id: 'ING_DRY_VERMOUTH',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Dry vermouth', it: 'Vermut secco', vi: 'Vermouth khô' },
    },
    {
      ingredient_id: 'ING_ORANGE_CURACAO',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Orange curaçao', it: "Curaçao all'arancia", vi: 'Curaçao cam' },
    },
    {
      ingredient_id: 'ING_GRENADINE',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Grenadine', it: 'Granatina', vi: 'Grenadine' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Add all ingredients to a mixing glass filled with ice. Stir gently for 20-30 seconds until well-chilled. Strain into a chilled coupe or cocktail glass. Garnish with an orange twist, expressing the oils over the drink.',
    it: "Aggiungere tutti gli ingredienti in un mixing glass pieno di ghiaccio. Mescolare delicatamente per 20-30 secondi fino a raffreddare bene. Filtrare in una coppa raffreddata o bicchiere da cocktail. Guarnire con una scorza d'arancia, esprimendo gli oli sulla bevanda.",
    vi: 'Thêm tất cả nguyên liệu vào ly trộn đầy đá. Khuấy nhẹ nhàng trong 20-30 giây cho đến khi lạnh kỹ. Lọc vào ly coupe hoặc ly cocktail đã làm lạnh. Trang trí với vỏ cam xoắn, ép tinh dầu lên thức uống.',
  },

  glass: 'Coupe glass',

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
  base_spirits: ['ING_AGED_RUM'],

  flavor_profile: ['balanced', 'elegant', 'complex'],

  abv_estimate: 26,

  calories_estimate: 170,

  difficulty: 'easy',

  prep_time_seconds: 90,

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
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'date_night', 'celebration', 'special_occasion'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['el-presidente-moderne', 'presidente-especial'],

  notes_for_staff:
    'Use quality aged Cuban-style rum (Havana Club 7 or similar). Real grenadine (pomegranate) is essential - not red syrup. The drink should be coral-colored, not red. Stir gently to maintain clarity.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 65,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1131/el-presidente-cocktail',
    notes:
      "Created at Havana's Jockey Club, 1920s. Classic Cuban cocktail from the golden age of Havana.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
