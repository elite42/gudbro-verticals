/**
 * IBA Contemporary Classics: Hemingway Special
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const hemingwaySpecial: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd6e7f8a9-b0c1-4d2e-3f4a-5b6c7d8e9f0a',
  slug: 'hemingway-special',
  stable_key: 'hemingway_special_iba_contemporary_2025',

  name: {
    en: 'Hemingway Special',
    it: 'Hemingway Special',
    vi: 'Hemingway Special',
    ko: '헤밍웨이 스페셜',
    ja: 'ヘミングウェイ・スペシャル',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'daiquiri', 'citrus', 'literary', 'classic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A sophisticated daiquiri variation created for Ernest Hemingway, combining white rum, lime juice, grapefruit juice, and maraschino liqueur. Dry, complex, and citrus-forward, this drink reflects Hemingway\'s preference for less-sweet cocktails.',
    it: 'Una sofisticata variazione del daiquiri creata per Ernest Hemingway, che combina rum bianco, succo di lime, succo di pompelmo e liquore maraschino. Secco, complesso e agrumato, questo drink riflette la preferenza di Hemingway per cocktail meno dolci.',
    vi: 'Một biến thể daiquiri tinh tế được tạo ra cho Ernest Hemingway, kết hợp rum trắng, nước chanh, nước bưởi và rượu mùi maraschino. Khô, phức tạp và hương chanh nổi bật, thức uống này phản ánh sở thích của Hemingway về cocktail ít ngọt hơn.',
  },

  history: {
    created_year: '1930',
    origin: {
      city: 'Havana',
      bar: 'El Floridita',
      country: 'Cuba',
    },
    creator: {
      name: 'Constantino Ribalaigua',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Constantino Ribalaigua at El Floridita in Havana for Ernest Hemingway in the 1930s. Hemingway, who was diabetic, requested a daiquiri without sugar. Ribalaigua compensated by doubling the rum and adding grapefruit juice and maraschino liqueur. Hemingway loved it and it became his signature drink. He reportedly drank up to 17 in a single sitting. Also known as "Papa Doble" (Papa was Hemingway\'s nickname, Doble for double rum).',
      it: 'Creato da Constantino Ribalaigua all\'El Floridita all\'Avana per Ernest Hemingway negli anni \'30. Hemingway, che era diabetico, chiese un daiquiri senza zucchero. Ribalaigua compensò raddoppiando il rum e aggiungendo succo di pompelmo e liquore maraschino. Hemingway lo adorò e divenne il suo drink signature. Pare che ne bevesse fino a 17 in una sola seduta. Conosciuto anche come "Papa Doble" (Papa era il soprannome di Hemingway, Doble per il doppio rum).',
      vi: 'Được tạo ra bởi Constantino Ribalaigua tại El Floridita ở Havana cho Ernest Hemingway vào những năm 1930. Hemingway, người bị tiểu đường, yêu cầu một daiquiri không đường. Ribalaigua đã bù đắp bằng cách tăng gấp đôi rum và thêm nước bưởi và rượu mùi maraschino. Hemingway yêu thích nó và nó trở thành thức uống đặc trưng của ông. Ông được cho là đã uống tới 17 ly trong một lần ngồi. Còn được gọi là "Papa Doble" (Papa là biệt danh của Hemingway, Doble cho rum đôi).',
    },
    named_after: {
      en: 'Named after Ernest Hemingway, the famous American novelist who frequented El Floridita.',
      it: 'Prende il nome da Ernest Hemingway, il famoso romanziere americano che frequentava El Floridita.',
      vi: 'Được đặt theo tên Ernest Hemingway, tiểu thuyết gia nổi tiếng người Mỹ thường lui tới El Floridita.',
    },
  },

  taste: {
    profile: ['citrus', 'dry', 'complex', 'refreshing'],
    description: {
      en: 'Dry, complex, and intensely citrus-forward. Fresh lime and grapefruit provide tart brightness, maraschino adds subtle almond sweetness, and rum brings smooth alcoholic backbone. A sophisticated, grown-up daiquiri.',
      it: 'Secco, complesso e intensamente agrumato. Lime e pompelmo freschi forniscono brillantezza aspra, il maraschino aggiunge dolcezza sottile di mandorla e il rum porta una struttura alcolica morbida. Un daiquiri sofisticato e maturo.',
      vi: 'Khô, phức tạp và hương chanh mãnh liệt. Chanh tươi và bưởi cung cấp vị chua tươi sáng, maraschino thêm vị ngọt hạnh nhân tinh tế và rum mang đến xương sống rượu mượt mà. Một daiquiri tinh tế, trưởng thành.',
    },
    first_impression: {
      en: 'Bright grapefruit and lime tartness with subtle almond notes',
      it: 'Pompelmo e lime brillanti con note sottili di mandorla',
      vi: 'Bưởi và chanh tươi sáng với hương hạnh nhân tinh tế',
    },
    finish: {
      en: 'Clean, dry finish with lingering citrus and rum',
      it: 'Finale pulito e secco con agrumi e rum persistenti',
      vi: 'Kết thúc sạch, khô với chanh và rum kéo dài',
    },
    balance: {
      en: 'Dry and balanced - less sweet than traditional daiquiri',
      it: 'Secco e bilanciato - meno dolce del daiquiri tradizionale',
      vi: 'Khô và cân bằng - ít ngọt hơn daiquiri truyền thống',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['casual', 'literary_event', 'beach'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with Cuban cuisine, seafood, ceviche, grilled fish, or oysters. The citrus cuts through rich flavors beautifully.',
      it: 'Eccellente con cucina cubana, frutti di mare, ceviche, pesce alla griglia o ostriche. Gli agrumi tagliano magnificamente i sapori ricchi.',
      vi: 'Tuyệt vời với ẩm thực Cuba, hải sản, ceviche, cá nướng hoặc hàu. Chanh cắt qua hương vị đậm đà một cách tuyệt vời.',
    },
    ideal_for: {
      en: 'Perfect for those who prefer dry, citrus-forward cocktails. Great for rum lovers and Hemingway fans. Not for those who like sweet drinks.',
      it: 'Perfetto per chi preferisce cocktail secchi e agrumati. Ottimo per gli amanti del rum e i fan di Hemingway. Non per chi ama drink dolci.',
      vi: 'Hoàn hảo cho những ai thích cocktail khô, hương chanh nổi bật. Tuyệt vời cho người yêu rum và fan của Hemingway. Không dành cho những người thích đồ uống ngọt.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_GRAPEFRUIT_JUICE',
      quantity: { amount: 40, unit: 'ml' },
      display_name: { en: 'Grapefruit juice', it: 'Succo di pompelmo', vi: 'Nước bưởi' },
    },
    {
      ingredient_id: 'ING_MARASCHINO',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Maraschino liqueur', it: 'Liquore maraschino', vi: 'Rượu mùi maraschino' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into shaker with ice. Shake vigorously. Strain into chilled cocktail glass. Garnish with lime wheel.',
    it: 'Versare tutti gli ingredienti nello shaker con ghiaccio. Shakerare vigorosamente. Filtrare in una coppa da cocktail raffreddata. Guarnire con rotella di lime.',
    vi: 'Đổ tất cả nguyên liệu vào shaker với đá. Lắc mạnh. Lọc vào ly cocktail đã làm lạnh. Trang trí với vòng chanh.',
  },

  glass: 'Cocktail glass (Coupe)',

  garnish: {
    en: 'Lime wheel',
    it: 'Rotella di lime',
    vi: 'Vòng chanh',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_WHITE'],

  flavor_profile: ['citrus', 'dry', 'complex', 'refreshing'],

  abv_estimate: 20,

  calories_estimate: 160,

  difficulty: 'medium',

  prep_time_seconds: 90,

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
  season_tags: ['spring', 'summer'],
  occasion_tags: ['casual', 'literary_event', 'beach'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['papa-doble', 'hemingway-daiquiri'],

  notes_for_staff: 'Also called "Papa Doble." Hemingway requested no sugar due to diabetes. Use fresh grapefruit juice for best results. Quality maraschino liqueur (like Luxardo) is essential. Can serve frozen/blended as Hemingway preferred.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/hemingway-special/',
    note: 'IBA Official Recipe. Created at El Floridita, Havana.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
