/**
 * IBA Contemporary Classics: Mojito
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const mojito: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
  slug: 'mojito',
  stable_key: 'mojito_iba_contemporary_2025',

  name: {
    en: 'Mojito',
    it: 'Mojito',
    vi: 'Mojito',
    ko: '모히또',
    ja: 'モヒート',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'refreshing', 'mint', 'summer', 'classic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'Cuba\'s most famous cocktail, combining white rum, fresh mint, lime juice, sugar, and soda water. Refreshingly herbaceous and perfectly balanced between sweet, sour, and minty freshness. A timeless summer classic.',
    it: 'Il cocktail più famoso di Cuba, che combina rum bianco, menta fresca, succo di lime, zucchero e soda. Erbaceo e rinfrescante, perfettamente bilanciato tra dolce, acido e freschezza mentolata. Un classico estivo senza tempo.',
    vi: 'Cocktail nổi tiếng nhất của Cuba, kết hợp rum trắng, bạc hà tươi, nước chanh, đường và soda. Thảo mộc sảng khoái và cân bằng hoàn hảo giữa ngọt, chua và vị bạc hà tươi mát. Một tác phẩm kinh điển mùa hè vượt thời gian.',
  },

  history: {
    created_year: '1586',
    origin: {
      city: 'Havana',
      bar: 'La Bodeguita del Medio',
      country: 'Cuba',
    },
    story: {
      en: 'The Mojito has roots dating back to the 16th century with "El Draque," a medicinal drink made by pirates with aguardiente, sugar, lime, and mint. The modern Mojito evolved in the 1800s when rum replaced aguardiente. It gained international fame at La Bodeguita del Medio in Havana, frequented by Ernest Hemingway who famously said "My mojito in La Bodeguita, my daiquiri in El Floridita."',
      it: 'Il Mojito ha radici che risalgono al XVI secolo con "El Draque," una bevanda medicinale fatta dai pirati con aguardiente, zucchero, lime e menta. Il Mojito moderno si è evoluto nel 1800 quando il rum sostituì l\'aguardiente. Ha guadagnato fama internazionale a La Bodeguita del Medio all\'Avana, frequentato da Ernest Hemingway che disse "Il mio mojito a La Bodeguita, il mio daiquiri a El Floridita."',
      vi: 'Mojito có nguồn gốc từ thế kỷ 16 với "El Draque," một thức uống thuốc do cướp biển làm với aguardiente, đường, chanh và bạc hà. Mojito hiện đại phát triển vào những năm 1800 khi rum thay thế aguardiente. Nó nổi tiếng quốc tế tại La Bodeguita del Medio ở Havana, nơi Ernest Hemingway thường lui tới và nói "Mojito của tôi ở La Bodeguita, daiquiri của tôi ở El Floridita."',
    },
    named_after: {
      en: 'The name "mojito" likely comes from "mojo," a Cuban seasoning, or from "mojadito" meaning "a little wet" in Spanish.',
      it: 'Il nome "mojito" deriva probabilmente da "mojo," un condimento cubano, o da "mojadito" che significa "un po\' bagnato" in spagnolo.',
      vi: 'Cái tên "mojito" có thể bắt nguồn từ "mojo," một gia vị Cuba, hoặc từ "mojadito" có nghĩa là "hơi ướt" trong tiếng Tây Ban Nha.',
    },
  },

  taste: {
    profile: ['refreshing', 'minty', 'citrus', 'sweet'],
    description: {
      en: 'Bright, fresh, and incredibly refreshing. Fresh mint provides aromatic coolness, lime adds tartness, rum brings smoothness, and soda water creates effervescence. A perfectly balanced summer refresher.',
      it: 'Brillante, fresco e incredibilmente rinfrescante. La menta fresca fornisce freschezza aromatica, il lime aggiunge acidità, il rum porta morbidezza e la soda crea effervescenza. Un rinfrescante estivo perfettamente bilanciato.',
      vi: 'Tươi sáng, mới mẻ và vô cùng sảng khoái. Bạc hà tươi mang lại sự mát mẻ thơm ngát, chanh thêm vị chua, rum mang đến sự mượt mà và soda tạo ra sự sủi bọt. Một thức uống giải khát mùa hè cân bằng hoàn hảo.',
    },
    first_impression: {
      en: 'Burst of fresh mint and lime, cool and invigorating',
      it: 'Esplosione di menta fresca e lime, fresco e rinvigorente',
      vi: 'Bùng nổ bạc hà tươi và chanh, mát mẻ và tiếp thêm sinh lực',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering mint and citrus',
      it: 'Finale pulito e rinfrescante con menta e agrumi persistenti',
      vi: 'Kết thúc sạch, sảng khoái với bạc hà và chanh kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between sweet sugar, tart lime, and fresh mint',
      it: 'Perfettamente bilanciato tra zucchero dolce, lime aspro e menta fresca',
      vi: 'Cân bằng hoàn hảo giữa đường ngọt, chanh chua và bạc hà tươi',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['casual', 'beach', 'party', 'bbq', 'brunch'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with Cuban cuisine, grilled seafood, ceviche, light salads, tropical fruits, and spicy foods. The mint and lime cut through rich flavors beautifully.',
      it: 'Eccellente con cucina cubana, pesce alla griglia, ceviche, insalate leggere, frutti tropicali e cibi piccanti. La menta e il lime tagliano magnificamente i sapori ricchi.',
      vi: 'Tuyệt vời với ẩm thực Cuba, hải sản nướng, ceviche, salad nhẹ, trái cây nhiệt đới và đồ ăn cay. Bạc hà và chanh cắt qua hương vị đậm đà một cách tuyệt vời.',
    },
    ideal_for: {
      en: 'Perfect for anyone who loves fresh, herbaceous cocktails. Ideal for hot weather and outdoor gatherings. A universally loved crowd-pleaser.',
      it: 'Perfetto per chi ama cocktail freschi ed erbacei. Ideale per il clima caldo e le riunioni all\'aperto. Un piacere universalmente amato dalla folla.',
      vi: 'Hoàn hảo cho bất kỳ ai yêu thích cocktail tươi mát, thảo mộc. Lý tưởng cho thời tiết nóng và các buổi tụ tập ngoài trời. Một món được yêu thích phổ biến.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_MINT',
      quantity: { amount: 6, unit: 'leaves' },
      display_name: { en: 'Fresh mint leaves', it: 'Foglie di menta fresca', vi: 'Lá bạc hà tươi' },
    },
    {
      ingredient_id: 'ING_SUGAR',
      quantity: { amount: 2, unit: 'tsp' },
      display_name: { en: 'White sugar', it: 'Zucchero bianco', vi: 'Đường trắng' },
    },
    {
      ingredient_id: 'ING_SODA_WATER',
      quantity: { amount: 1, unit: 'splash' },
      display_name: { en: 'Soda water', it: 'Acqua di soda', vi: 'Nước soda' },
      note: { en: 'to top', it: 'per riempire', vi: 'để đổ đầy' },
    },
  ],

  method: 'muddle',

  instructions: {
    en: 'Muddle mint leaves with sugar and lime juice in a highball glass. Fill the glass with ice cubes. Add rum and top with soda water. Stir gently to combine. Garnish with mint sprig and lime wheel.',
    it: 'Pestare le foglie di menta con zucchero e succo di lime in un bicchiere highball. Riempire il bicchiere con cubetti di ghiaccio. Aggiungere il rum e completare con acqua di soda. Mescolare delicatamente per combinare. Guarnire con rametto di menta e rotella di lime.',
    vi: 'Nghiền lá bạc hà với đường và nước chanh trong ly highball. Đổ đầy ly bằng đá viên. Thêm rum và đổ đầy soda. Khuấy nhẹ để trộn. Trang trí với cành bạc hà và vòng chanh.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Mint sprig and lime wheel',
    it: 'Rametto di menta e rotella di lime',
    vi: 'Cành bạc hà và vòng chanh',
  },

  ice: 'cubes',

  serving_style: 'built',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_WHITE'],

  flavor_profile: ['refreshing', 'minty', 'citrus', 'sweet'],

  abv_estimate: 10,

  calories_estimate: 150,

  difficulty: 'medium',

  prep_time_seconds: 120,

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
  occasion_tags: ['casual', 'beach', 'party', 'bbq', 'brunch'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['virgin-mojito', 'strawberry-mojito', 'blackberry-mojito', 'coconut-mojito'],

  notes_for_staff: 'Gently muddle mint - don\'t over-muddle or it becomes bitter. Use fresh mint only, never dried. Build in serving glass to preserve carbonation. Can use simple syrup instead of sugar for easier dissolution.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 98,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/mojito/',
    note: 'IBA Official Recipe. Historical information from Cuban cocktail archives.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
