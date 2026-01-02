/**
 * Famous Cocktails: Satan's Whiskers
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const satansWhiskers: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e7d3f8c2-4a1b-3e0c-8b5d-1a2b3c4d5e6f',
  slug: 'satans-whiskers',
  stable_key: 'b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3',

  name: {
    en: "Satan's Whiskers",
    it: "Baffi di Satana",
    vi: "Râu Ác Quỷ",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'gin', 'complex', 'citrus'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A complex cocktail featuring gin, sweet and dry vermouth, orange juice, Grand Marnier, and orange bitters. Satan\'s Whiskers is a sophisticated blend of citrus, botanicals, and dual vermouths creating a devilishly delicious drink.',
    it: 'Un cocktail complesso con gin, vermut dolce e secco, succo d\'arancia, Grand Marnier e bitter all\'arancia. I Baffi di Satana sono una miscela sofisticata di agrumi, botanici e doppio vermut creando un drink diabolicamente delizioso.',
    vi: 'Một loại cocktail phức tạp với gin, vermouth ngọt và khô, nước cam, Grand Marnier và orange bitters. Satan\'s Whiskers là sự pha trộn tinh tế của cam quýt, thực vật và vermouth kép tạo ra thức uống ngon tuyệt.',
  },

  history: {
    created_year: '1930',
    origin: {
      city: 'London',
      bar: 'Unknown',
      country: 'UK',
    },
    creator: {
      name: 'Harry Craddock',
      profession: 'bartender',
    },
    story: {
      en: 'Satan\'s Whiskers appeared in Harry Craddock\'s legendary "The Savoy Cocktail Book" (1930). The drink comes in two versions: "Straight" (using Grand Marnier) and "Curled" (using orange curaçao). The provocative name reflects the drink\'s devilishly complex character and potent nature. This cocktail represents the sophisticated complexity of 1930s London cocktail culture.',
      it: 'I Baffi di Satana apparvero nel leggendario "The Savoy Cocktail Book" (1930) di Harry Craddock. Il drink esiste in due versioni: "Straight" (usando Grand Marnier) e "Curled" (usando curaçao all\'arancia). Il nome provocatorio riflette il carattere diabolicamente complesso e la natura potente del drink. Questo cocktail rappresenta la complessità sofisticata della cultura dei cocktail londinese degli anni \'30.',
      vi: 'Satan\'s Whiskers xuất hiện trong "The Savoy Cocktail Book" (1930) huyền thoại của Harry Craddock. Thức uống có hai phiên bản: "Straight" (sử dụng Grand Marnier) và "Curled" (sử dụng orange curaçao). Cái tên khiêu khích phản ánh tính chất phức tạp và mạnh mẽ của thức uống. Cocktail này đại diện cho sự phức tạp tinh tế của văn hóa cocktail London những năm 1930.',
    },
    named_after: {
      en: 'The provocative name "Satan\'s Whiskers" refers to the drink\'s devilishly complex and potent character, suggesting something dangerously delicious.',
      it: 'Il nome provocatorio "Baffi di Satana" si riferisce al carattere diabolicamente complesso e potente del drink, suggerendo qualcosa di pericolosamente delizioso.',
      vi: 'Cái tên khiêu khích "Satan\'s Whiskers" ám chỉ tính chất phức tạp và mạnh mẽ của thức uống, gợi ý điều gì đó ngon nguy hiểm.',
    },
  },

  taste: {
    profile: ['complex', 'citrus', 'botanical'],
    description: {
      en: 'Intensely complex with fresh orange juice balanced by dual vermouths, Grand Marnier\'s cognac-orange richness, botanical gin, and aromatic orange bitters. Sophisticated and layered with every sip revealing new nuances.',
      it: 'Intensamente complesso con succo d\'arancia fresco bilanciato da doppio vermut, la ricchezza cognac-arancia del Grand Marnier, gin botanico e bitter all\'arancia aromatici. Sofisticato e stratificato con ogni sorso che rivela nuove sfumature.',
      vi: 'Cực kỳ phức tạp với nước cam tươi được cân bằng bởi vermouth kép, sự phong phú cognac-cam của Grand Marnier, gin thực vật và orange bitters thơm. Tinh tế và nhiều lớp với mỗi ngụm tiết lộ sắc thái mới.',
    },
    first_impression: {
      en: 'Fresh orange hits first with botanical gin and vermouth complexity following',
      it: 'Arancia fresca colpisce per prima con complessità di gin botanico e vermut che segue',
      vi: 'Cam tươi đập vào đầu tiên với độ phức tạp gin thực vật và vermouth theo sau',
    },
    finish: {
      en: 'Long, sophisticated finish with lingering orange, cognac warmth, and botanical notes',
      it: 'Finale lungo e sofisticato con arancia persistente, calore di cognac e note botaniche',
      vi: 'Kết thúc dài, tinh tế với cam kéo dài, hơi ấm cognac và nốt thực vật',
    },
    balance: {
      en: 'Masterfully balanced complexity - citrus-forward yet spirit-strong with perfect harmony',
      it: 'Complessità magistralmente bilanciata - orientato agli agrumi ma forte di spirito con armonia perfetta',
      vi: 'Độ phức tạp cân bằng điêu luyện - hướng cam quýt nhưng rượu mạnh với sự hài hòa hoàn hảo',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['brunch', 'aperitivo', 'date_night', 'special_occasion'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Excellent with brunch dishes, smoked salmon, citrus salads, or as a sophisticated aperitif. Pairs well with French and Mediterranean cuisines.',
      it: 'Eccellente con piatti da brunch, salmone affumicato, insalate agli agrumi, o come aperitivo sofisticato. Si abbina bene con cucine francesi e mediterranee.',
      vi: 'Tuyệt vời với các món brunch, cá hồi hun khói, salad cam quýt hoặc làm khai vị tinh tế. Kết hợp tốt với ẩm thực Pháp và Địa Trung Hải.',
    },
    ideal_for: {
      en: 'Perfect for gin lovers who appreciate complex, citrus-forward cocktails. Ideal for those seeking sophisticated alternatives to the Bronx or similar orange juice cocktails.',
      it: 'Perfetto per gli amanti del gin che apprezzano cocktail complessi e orientati agli agrumi. Ideale per chi cerca alternative sofisticate al Bronx o cocktail simili al succo d\'arancia.',
      vi: 'Hoàn hảo cho người yêu gin đánh giá cao các loại cocktail phức tạp, hướng cam quýt. Lý tưởng cho những ai tìm kiếm giải pháp thay thế tinh tế cho Bronx hoặc các loại cocktail nước cam tương tự.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (Straight version - with Grand Marnier)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_SWEET_VERMOUTH',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Sweet vermouth', it: 'Vermut dolce', vi: 'Vermouth ngọt' },
    },
    {
      ingredient_id: 'ING_DRY_VERMOUTH',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Dry vermouth', it: 'Vermut secco', vi: 'Vermouth khô' },
    },
    {
      ingredient_id: 'ING_GRAND_MARNIER',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Grand Marnier', it: 'Grand Marnier', vi: 'Grand Marnier' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: 'Succo d\'arancia fresco', vi: 'Nước cam tươi' },
    },
    {
      ingredient_id: 'ING_ORANGE_BITTERS',
      quantity: { amount: 1, unit: 'dash' },
      display_name: { en: 'Orange bitters', it: 'Bitter all\'arancia', vi: 'Orange bitters' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a chilled coupe or cocktail glass. Garnish with an orange twist, expressing the oils over the drink.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una coppa raffreddata o bicchiere da cocktail. Guarnire con una scorza d\'arancia, esprimendo gli oli sulla bevanda.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly coupe hoặc ly cocktail đã làm lạnh. Trang trí với vỏ cam xoắn, ép tinh dầu lên thức uống.',
  },

  glass: 'Coupe glass',

  garnish: {
    en: 'Orange twist',
    it: 'Scorza d\'arancia',
    vi: 'Vỏ cam xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['complex', 'citrus', 'botanical'],

  abv_estimate: 20,

  calories_estimate: 180,

  difficulty: 'medium',

  prep_time_seconds: 90,

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
  occasion_tags: ['brunch', 'aperitivo', 'date_night', 'special_occasion'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['satans-whiskers-curled'],

  notes_for_staff: 'This is the "Straight" version with Grand Marnier. "Curled" version uses orange curaçao instead. Use fresh orange juice only. Quality vermouths essential. Shake hard to properly integrate all ingredients. Complex but worth the effort.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 50,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1508/satans-whiskers-straight',
    note: 'Harry Craddock\'s "The Savoy Cocktail Book" (1930). Classic complex gin cocktail.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
