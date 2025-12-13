/**
 * GUDBRO Product Database - Food Products (Bánh Mì & Desserts)
 *
 * Vietnamese café food items including:
 * - Bánh Mì (Vietnamese sandwiches)
 * - Desserts (Cheesecakes, Cakes)
 * - Specialty Beverages
 *
 * All products have:
 * - Multi-language support (EN/VI/IT)
 * - Ingredient-based allergen computation
 * - Vietnamese pricing (VND)
 */

import type { Product } from '../types';

// ============================================================================
// BÁNH MÌ (VIETNAMESE SANDWICHES)
// ============================================================================

/**
 * Bánh Mì Thịt Nướng - Grilled Pork Sandwich
 */
export const banhMiThitNuong: Product = {
  id: 'PROD_BANH_MI_THIT_NUONG',
  slug: 'banh-mi-thit-nuong',
  same_id: 'FOOD_BANH_MI_PORK',
  name: {
    en: 'Bánh Mì Thịt Nướng',
    it: 'Bánh Mì Maiale alla Griglia',
    vi: 'Bánh Mì Thịt Nướng',
  },
  description: {
    en: 'Crispy Vietnamese baguette with grilled marinated pork, pickled vegetables, cilantro, cucumber, and chili sauce',
    it: 'Baguette vietnamita croccante con maiale marinato alla griglia, verdure sottaceto, coriandolo, cetriolo e salsa al peperoncino',
    vi: 'Bánh mì giòn với thịt heo nướng ướp đậm đà, đồ chua, rau mùi, dưa leo và tương ớt',
  },
  category: { main: 'piatti-unici', sub: 'vietnamese', tertiary: 'sandwich' },

  ingredients: [
    { ingredient_id: 'ING_WHEAT_FLOUR', quantity: { amount: 80, unit: 'g' }, notes: { en: 'Baguette bread' } },
    { ingredient_id: 'ING_PORK', quantity: { amount: 100, unit: 'g' } },
    { ingredient_id: 'ING_FISH_SAUCE', quantity: { amount: 10, unit: 'ml' } },
    { ingredient_id: 'ING_SOY_SAUCE', quantity: { amount: 5, unit: 'ml' } },
    { ingredient_id: 'ING_GARLIC', quantity: { amount: 5, unit: 'g' } },
    { ingredient_id: 'ING_CARROT', quantity: { amount: 30, unit: 'g' } },
    { ingredient_id: 'ING_CUCUMBER', quantity: { amount: 20, unit: 'g' } },
    { ingredient_id: 'ING_CILANTRO', quantity: { amount: 5, unit: 'g' } },
    { ingredient_id: 'ING_CHILI', quantity: { amount: 3, unit: 'g' }, optional: true },
  ],

  computed: {
    allergens: ['gluten', 'fish', 'soy'],
    intolerances: ['gluten'],
    suitable_for_diets: [],
    spice_level: 2,
    allergen_compliance: { EU: true, USA: true, Korea: true, Japan: true },
  },

  pricing: {
    cost_usd: 1.2,
    selling_price_usd: 3.0,
    selling_price_local: { amount: 45000, currency: 'VND' },
    profit_margin_percent: 60,
  },

  preparation: {
    prep_time_sec: 300,
    skill_level: 2,
    temperature: 'hot',
  },

  media: {
    images: {
      thumbnail: '/images/products/banh-mi-thit-nuong.png',
      gallery: [],
    },
  },

  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  version: 1,
};

/**
 * Bánh Mì Đặc Biệt - Special Combo Sandwich
 */
export const banhMiDacBiet: Product = {
  id: 'PROD_BANH_MI_DAC_BIET',
  slug: 'banh-mi-dac-biet',
  same_id: 'FOOD_BANH_MI_SPECIAL',
  name: {
    en: 'Bánh Mì Đặc Biệt',
    it: 'Bánh Mì Speciale',
    vi: 'Bánh Mì Đặc Biệt',
  },
  description: {
    en: 'The ultimate Vietnamese sandwich with ham, pâté, fried egg, pickled vegetables, and all the classic toppings',
    it: 'Il panino vietnamita definitivo con prosciutto, paté, uovo fritto, verdure sottaceto e tutti i condimenti classici',
    vi: 'Bánh mì đầy đủ nhất với thịt nguội, pa-tê, trứng ốp la, đồ chua và đầy đủ topping',
  },
  category: { main: 'piatti-unici', sub: 'vietnamese', tertiary: 'sandwich' },

  ingredients: [
    { ingredient_id: 'ING_WHEAT_FLOUR', quantity: { amount: 80, unit: 'g' } },
    { ingredient_id: 'ING_PORK', quantity: { amount: 50, unit: 'g' }, notes: { en: 'Ham' } },
    { ingredient_id: 'ING_EGG', quantity: { amount: 1, unit: 'piece' } },
    { ingredient_id: 'ING_FISH_SAUCE', quantity: { amount: 5, unit: 'ml' } },
    { ingredient_id: 'ING_SOY_SAUCE', quantity: { amount: 5, unit: 'ml' } },
    { ingredient_id: 'ING_CARROT', quantity: { amount: 30, unit: 'g' } },
    { ingredient_id: 'ING_CUCUMBER', quantity: { amount: 20, unit: 'g' } },
    { ingredient_id: 'ING_CILANTRO', quantity: { amount: 5, unit: 'g' } },
    { ingredient_id: 'ING_CHILI', quantity: { amount: 3, unit: 'g' }, optional: true },
  ],

  computed: {
    allergens: ['gluten', 'egg', 'fish', 'soy'],
    intolerances: ['gluten', 'egg'],
    suitable_for_diets: [],
    spice_level: 2,
    allergen_compliance: { EU: true, USA: true, Korea: true, Japan: true },
  },

  pricing: {
    cost_usd: 1.5,
    selling_price_usd: 3.5,
    selling_price_local: { amount: 55000, currency: 'VND' },
    profit_margin_percent: 57,
  },

  preparation: {
    prep_time_sec: 360,
    skill_level: 2,
    temperature: 'hot',
  },

  media: {
    images: {
      thumbnail: '/images/products/banh-mi-dac-biet.png',
      gallery: [],
    },
  },

  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  version: 1,
};

/**
 * Bánh Mì Gà - Chicken Sandwich
 */
export const banhMiGa: Product = {
  id: 'PROD_BANH_MI_GA',
  slug: 'banh-mi-ga',
  same_id: 'FOOD_BANH_MI_CHICKEN',
  name: {
    en: 'Bánh Mì Gà',
    it: 'Bánh Mì Pollo',
    vi: 'Bánh Mì Gà',
  },
  description: {
    en: 'Crispy baguette filled with tender grilled chicken, fresh herbs, pickled daikon and carrots',
    it: 'Baguette croccante farcita con pollo alla griglia tenero, erbe fresche, daikon e carote sottaceto',
    vi: 'Bánh mì giòn với gà nướng mềm, rau thơm, củ cải và cà rốt ngâm chua',
  },
  category: { main: 'piatti-unici', sub: 'vietnamese', tertiary: 'sandwich' },

  ingredients: [
    { ingredient_id: 'ING_WHEAT_FLOUR', quantity: { amount: 80, unit: 'g' } },
    { ingredient_id: 'ING_CHICKEN', quantity: { amount: 100, unit: 'g' } },
    { ingredient_id: 'ING_FISH_SAUCE', quantity: { amount: 10, unit: 'ml' } },
    { ingredient_id: 'ING_GARLIC', quantity: { amount: 5, unit: 'g' } },
    { ingredient_id: 'ING_CARROT', quantity: { amount: 30, unit: 'g' } },
    { ingredient_id: 'ING_CUCUMBER', quantity: { amount: 20, unit: 'g' } },
    { ingredient_id: 'ING_CILANTRO', quantity: { amount: 5, unit: 'g' } },
  ],

  computed: {
    allergens: ['gluten', 'fish'],
    intolerances: ['gluten'],
    suitable_for_diets: [],
    spice_level: 1,
    allergen_compliance: { EU: true, USA: true, Korea: true, Japan: true },
  },

  pricing: {
    cost_usd: 1.3,
    selling_price_usd: 3.0,
    selling_price_local: { amount: 45000, currency: 'VND' },
    profit_margin_percent: 57,
  },

  preparation: {
    prep_time_sec: 300,
    skill_level: 2,
    temperature: 'hot',
  },

  media: {
    images: {
      thumbnail: '/images/products/banh-mi-ga.png',
      gallery: [],
    },
  },

  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  version: 1,
};

/**
 * Bánh Mì Tôm - Shrimp Sandwich
 */
export const banhMiTom: Product = {
  id: 'PROD_BANH_MI_TOM',
  slug: 'banh-mi-tom',
  same_id: 'FOOD_BANH_MI_SHRIMP',
  name: {
    en: 'Bánh Mì Tôm',
    it: 'Bánh Mì Gamberi',
    vi: 'Bánh Mì Tôm',
  },
  description: {
    en: 'Fresh baguette with succulent grilled shrimp, avocado, cucumber, and spicy mayo',
    it: 'Baguette fresca con gamberi alla griglia succulenti, avocado, cetriolo e maionese piccante',
    vi: 'Bánh mì tươi với tôm nướng ngọt thịt, bơ, dưa leo và sốt mayo cay',
  },
  category: { main: 'piatti-unici', sub: 'vietnamese', tertiary: 'sandwich' },

  ingredients: [
    { ingredient_id: 'ING_WHEAT_FLOUR', quantity: { amount: 80, unit: 'g' } },
    { ingredient_id: 'ING_SHRIMP', quantity: { amount: 80, unit: 'g' } },
    { ingredient_id: 'ING_AVOCADO', quantity: { amount: 30, unit: 'g' } },
    { ingredient_id: 'ING_CUCUMBER', quantity: { amount: 20, unit: 'g' } },
    { ingredient_id: 'ING_CILANTRO', quantity: { amount: 5, unit: 'g' } },
    { ingredient_id: 'ING_CHILI', quantity: { amount: 3, unit: 'g' }, optional: true },
  ],

  computed: {
    allergens: ['gluten', 'shellfish'],
    intolerances: ['gluten', 'shellfish'],
    suitable_for_diets: [],
    spice_level: 2,
    allergen_compliance: { EU: true, USA: true, Korea: true, Japan: true },
  },

  pricing: {
    cost_usd: 2.0,
    selling_price_usd: 4.5,
    selling_price_local: { amount: 65000, currency: 'VND' },
    profit_margin_percent: 56,
  },

  preparation: {
    prep_time_sec: 360,
    skill_level: 2,
    temperature: 'hot',
  },

  media: {
    images: {
      thumbnail: '/images/products/banh-mi-tom.png',
      gallery: [],
    },
  },

  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  version: 1,
};

/**
 * Bánh Mì Thịt Heo - Pork Belly Sandwich
 */
export const banhMiThitHeo: Product = {
  id: 'PROD_BANH_MI_THIT_HEO',
  slug: 'banh-mi-thit-heo',
  same_id: 'FOOD_BANH_MI_PORK_BELLY',
  name: {
    en: 'Bánh Mì Thịt Heo',
    it: 'Bánh Mì Pancetta di Maiale',
    vi: 'Bánh Mì Thịt Heo',
  },
  description: {
    en: 'Classic Vietnamese sandwich with slow-roasted pork belly, crispy skin, and traditional toppings',
    it: 'Panino vietnamita classico con pancetta di maiale arrostita lentamente, pelle croccante e condimenti tradizionali',
    vi: 'Bánh mì cổ điển với thịt ba chỉ quay chậm, da giòn và topping truyền thống',
  },
  category: { main: 'piatti-unici', sub: 'vietnamese', tertiary: 'sandwich' },

  ingredients: [
    { ingredient_id: 'ING_WHEAT_FLOUR', quantity: { amount: 80, unit: 'g' } },
    { ingredient_id: 'ING_PORK', quantity: { amount: 120, unit: 'g' }, notes: { en: 'Pork belly' } },
    { ingredient_id: 'ING_FISH_SAUCE', quantity: { amount: 10, unit: 'ml' } },
    { ingredient_id: 'ING_GARLIC', quantity: { amount: 5, unit: 'g' } },
    { ingredient_id: 'ING_CARROT', quantity: { amount: 30, unit: 'g' } },
    { ingredient_id: 'ING_CUCUMBER', quantity: { amount: 20, unit: 'g' } },
    { ingredient_id: 'ING_CILANTRO', quantity: { amount: 5, unit: 'g' } },
  ],

  computed: {
    allergens: ['gluten', 'fish'],
    intolerances: ['gluten'],
    suitable_for_diets: [],
    spice_level: 1,
    allergen_compliance: { EU: true, USA: true, Korea: true, Japan: true },
  },

  pricing: {
    cost_usd: 1.5,
    selling_price_usd: 3.5,
    selling_price_local: { amount: 50000, currency: 'VND' },
    profit_margin_percent: 57,
  },

  preparation: {
    prep_time_sec: 300,
    skill_level: 2,
    temperature: 'hot',
  },

  media: {
    images: {
      thumbnail: '/images/products/banh-mi-thit-heo.png',
      gallery: [],
    },
  },

  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  version: 1,
};

// ============================================================================
// DESSERTS
// ============================================================================

/**
 * Basque Burnt Cheesecake
 */
export const basqueCheesecake: Product = {
  id: 'PROD_BASQUE_CHEESECAKE',
  slug: 'basque-burnt-cheesecake',
  same_id: 'DESSERT_BASQUE_CHEESECAKE',
  name: {
    en: 'Basque Burnt Cheesecake',
    it: 'Cheesecake Basca Bruciata',
    vi: 'Bánh Phô Mai Cháy Basque',
  },
  description: {
    en: 'Creamy caramelized cheesecake with a distinctive burnt top, served with fresh strawberries',
    it: 'Cheesecake cremosa caramellata con una distintiva superficie bruciata, servita con fragole fresche',
    vi: 'Bánh phô mai kem mịn với mặt cháy đặc trưng, phục vụ kèm dâu tây tươi',
  },
  category: { main: 'dessert', sub: 'cake', tertiary: 'cheesecake' },

  ingredients: [
    { ingredient_id: 'ING_CREAM_CHEESE', quantity: { amount: 100, unit: 'g' } },
    { ingredient_id: 'ING_EGG', quantity: { amount: 2, unit: 'piece' } },
    { ingredient_id: 'ING_SUGAR', quantity: { amount: 40, unit: 'g' } },
    { ingredient_id: 'ING_HEAVY_CREAM', quantity: { amount: 50, unit: 'ml' } },
    { ingredient_id: 'ING_WHEAT_FLOUR', quantity: { amount: 10, unit: 'g' } },
    { ingredient_id: 'ING_STRAWBERRY', quantity: { amount: 30, unit: 'g' } },
  ],

  computed: {
    allergens: ['milk', 'egg', 'gluten'],
    intolerances: ['lactose', 'gluten'],
    suitable_for_diets: ['vegetarian'],
    spice_level: 0,
    allergen_compliance: { EU: true, USA: true, Korea: true, Japan: true },
  },

  pricing: {
    cost_usd: 1.5,
    selling_price_usd: 4.0,
    selling_price_local: { amount: 75000, currency: 'VND' },
    profit_margin_percent: 63,
  },

  preparation: {
    prep_time_sec: 120,
    skill_level: 1,
    temperature: 'cold',
  },

  media: {
    images: {
      thumbnail: '/images/products/basque-cheesecake.png',
      gallery: [],
    },
  },

  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  version: 1,
};

/**
 * Red Velvet Cake
 */
export const redVelvetCake: Product = {
  id: 'PROD_RED_VELVET_CAKE',
  slug: 'red-velvet-cake',
  same_id: 'DESSERT_RED_VELVET',
  name: {
    en: 'Red Velvet Cake',
    it: 'Torta Red Velvet',
    vi: 'Bánh Red Velvet',
  },
  description: {
    en: 'Moist red velvet layers with cream cheese frosting and chocolate drizzle',
    it: 'Strati di red velvet morbidi con glassa al formaggio cremoso e filo di cioccolato',
    vi: 'Những lớp bánh red velvet mềm ẩm với kem phô mai và sốt socola',
  },
  category: { main: 'dessert', sub: 'cake', tertiary: 'layer-cake' },

  ingredients: [
    { ingredient_id: 'ING_WHEAT_FLOUR', quantity: { amount: 80, unit: 'g' } },
    { ingredient_id: 'ING_COCOA', quantity: { amount: 10, unit: 'g' } },
    { ingredient_id: 'ING_EGG', quantity: { amount: 2, unit: 'piece' } },
    { ingredient_id: 'ING_SUGAR', quantity: { amount: 60, unit: 'g' } },
    { ingredient_id: 'ING_CREAM_CHEESE', quantity: { amount: 50, unit: 'g' } },
    { ingredient_id: 'ING_BUTTER', quantity: { amount: 30, unit: 'g' } },
  ],

  computed: {
    allergens: ['milk', 'egg', 'gluten'],
    intolerances: ['lactose', 'gluten'],
    suitable_for_diets: ['vegetarian'],
    spice_level: 0,
    allergen_compliance: { EU: true, USA: true, Korea: true, Japan: true },
  },

  pricing: {
    cost_usd: 1.2,
    selling_price_usd: 3.5,
    selling_price_local: { amount: 65000, currency: 'VND' },
    profit_margin_percent: 66,
  },

  preparation: {
    prep_time_sec: 120,
    skill_level: 1,
    temperature: 'cold',
  },

  media: {
    images: {
      thumbnail: '/images/products/red-velvet-cake.png',
      gallery: [],
    },
  },

  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  version: 1,
};

/**
 * Passion Fruit Cheesecake
 */
export const passionFruitCheesecake: Product = {
  id: 'PROD_PASSION_FRUIT_CHEESECAKE',
  slug: 'passion-fruit-cheesecake',
  same_id: 'DESSERT_PASSION_CHEESECAKE',
  name: {
    en: 'Passion Fruit Cheesecake',
    it: 'Cheesecake al Frutto della Passione',
    vi: 'Bánh Phô Mai Chanh Dây',
  },
  description: {
    en: 'Tropical cheesecake topped with tangy passion fruit glaze and fresh seeds',
    it: 'Cheesecake tropicale con glassa acidula al frutto della passione e semi freschi',
    vi: 'Bánh phô mai nhiệt đới phủ sốt chanh dây chua ngọt và hạt tươi',
  },
  category: { main: 'dessert', sub: 'cake', tertiary: 'cheesecake' },

  ingredients: [
    { ingredient_id: 'ING_CREAM_CHEESE', quantity: { amount: 100, unit: 'g' } },
    { ingredient_id: 'ING_EGG', quantity: { amount: 2, unit: 'piece' } },
    { ingredient_id: 'ING_SUGAR', quantity: { amount: 40, unit: 'g' } },
    { ingredient_id: 'ING_HEAVY_CREAM', quantity: { amount: 50, unit: 'ml' } },
    { ingredient_id: 'ING_PASSION_FRUIT', quantity: { amount: 50, unit: 'g' } },
  ],

  computed: {
    allergens: ['milk', 'egg'],
    intolerances: ['lactose'],
    suitable_for_diets: ['vegetarian', 'gluten-free'],
    spice_level: 0,
    allergen_compliance: { EU: true, USA: true, Korea: true, Japan: true },
  },

  pricing: {
    cost_usd: 1.8,
    selling_price_usd: 4.5,
    selling_price_local: { amount: 85000, currency: 'VND' },
    profit_margin_percent: 60,
  },

  preparation: {
    prep_time_sec: 120,
    skill_level: 1,
    temperature: 'cold',
  },

  media: {
    images: {
      thumbnail: '/images/products/passion-fruit-cheesecake.png',
      gallery: [],
    },
  },

  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  version: 1,
};

/**
 * Chocolate Mousse Cake
 */
export const chocolateMousse: Product = {
  id: 'PROD_CHOCOLATE_MOUSSE',
  slug: 'chocolate-mousse-cake',
  same_id: 'DESSERT_CHOCOLATE_MOUSSE',
  name: {
    en: 'Chocolate Mousse Cake',
    it: 'Torta Mousse al Cioccolato',
    vi: 'Bánh Mousse Socola',
  },
  description: {
    en: 'Rich and airy dark chocolate mousse, topped with fresh strawberry',
    it: 'Mousse al cioccolato fondente ricca e soffice, guarnita con fragola fresca',
    vi: 'Mousse socola đen đậm đà và nhẹ, phủ dâu tây tươi',
  },
  category: { main: 'dessert', sub: 'cake', tertiary: 'mousse' },

  ingredients: [
    { ingredient_id: 'ING_DARK_CHOCOLATE', quantity: { amount: 80, unit: 'g' } },
    { ingredient_id: 'ING_HEAVY_CREAM', quantity: { amount: 100, unit: 'ml' } },
    { ingredient_id: 'ING_EGG', quantity: { amount: 2, unit: 'piece' } },
    { ingredient_id: 'ING_SUGAR', quantity: { amount: 30, unit: 'g' } },
    { ingredient_id: 'ING_STRAWBERRY', quantity: { amount: 20, unit: 'g' } },
  ],

  computed: {
    allergens: ['milk', 'egg', 'soy'],
    intolerances: ['lactose'],
    suitable_for_diets: ['vegetarian', 'gluten-free'],
    spice_level: 0,
    allergen_compliance: { EU: true, USA: true, Korea: true, Japan: true },
  },

  pricing: {
    cost_usd: 1.5,
    selling_price_usd: 4.0,
    selling_price_local: { amount: 70000, currency: 'VND' },
    profit_margin_percent: 63,
  },

  preparation: {
    prep_time_sec: 120,
    skill_level: 1,
    temperature: 'cold',
  },

  media: {
    images: {
      thumbnail: '/images/products/chocolate-mousse.png',
      gallery: [],
    },
  },

  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  version: 1,
};

/**
 * Flan Caramel
 */
export const flanCaramel: Product = {
  id: 'PROD_FLAN_CARAMEL',
  slug: 'flan-caramel',
  same_id: 'DESSERT_FLAN_CARAMEL',
  name: {
    en: 'Flan Caramel',
    it: 'Crème Caramel',
    vi: 'Bánh Flan Caramel',
  },
  description: {
    en: 'Silky smooth Vietnamese-style egg custard with golden caramel sauce',
    it: 'Crema di uova vellutata in stile vietnamita con salsa al caramello dorato',
    vi: 'Bánh flan mịn như nhung kiểu Việt Nam với sốt caramel vàng óng',
  },
  category: { main: 'dessert', sub: 'custard', tertiary: 'flan' },

  ingredients: [
    { ingredient_id: 'ING_EGG', quantity: { amount: 3, unit: 'piece' } },
    { ingredient_id: 'ING_CONDENSED_MILK', quantity: { amount: 80, unit: 'ml' } },
    { ingredient_id: 'ING_MILK', quantity: { amount: 100, unit: 'ml' } },
    { ingredient_id: 'ING_SUGAR', quantity: { amount: 50, unit: 'g' } },
    { ingredient_id: 'ING_VANILLA', quantity: { amount: 2, unit: 'ml' } },
  ],

  computed: {
    allergens: ['milk', 'egg'],
    intolerances: ['lactose'],
    suitable_for_diets: ['vegetarian', 'gluten-free'],
    spice_level: 0,
    allergen_compliance: { EU: true, USA: true, Korea: true, Japan: true },
  },

  pricing: {
    cost_usd: 0.8,
    selling_price_usd: 2.5,
    selling_price_local: { amount: 45000, currency: 'VND' },
    profit_margin_percent: 68,
  },

  preparation: {
    prep_time_sec: 60,
    skill_level: 1,
    temperature: 'cold',
  },

  media: {
    images: {
      thumbnail: '/images/products/flan-caramel.png',
      gallery: [],
    },
  },

  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  version: 1,
};

/**
 * Matcha Burnt Cheesecake
 */
export const matchaCheesecake: Product = {
  id: 'PROD_MATCHA_CHEESECAKE',
  slug: 'matcha-burnt-cheesecake',
  same_id: 'DESSERT_MATCHA_CHEESECAKE',
  name: {
    en: 'Matcha Burnt Cheesecake',
    it: 'Cheesecake Bruciata al Matcha',
    vi: 'Bánh Phô Mai Cháy Matcha',
  },
  description: {
    en: 'Japanese-inspired burnt cheesecake infused with premium matcha green tea',
    it: 'Cheesecake bruciata ispirata al Giappone con tè verde matcha premium',
    vi: 'Bánh phô mai cháy kiểu Nhật với trà xanh matcha cao cấp',
  },
  category: { main: 'dessert', sub: 'cake', tertiary: 'cheesecake' },

  ingredients: [
    { ingredient_id: 'ING_CREAM_CHEESE', quantity: { amount: 100, unit: 'g' } },
    { ingredient_id: 'ING_EGG', quantity: { amount: 2, unit: 'piece' } },
    { ingredient_id: 'ING_SUGAR', quantity: { amount: 40, unit: 'g' } },
    { ingredient_id: 'ING_HEAVY_CREAM', quantity: { amount: 50, unit: 'ml' } },
    { ingredient_id: 'ING_MATCHA', quantity: { amount: 10, unit: 'g' } },
  ],

  computed: {
    allergens: ['milk', 'egg'],
    intolerances: ['lactose'],
    suitable_for_diets: ['vegetarian', 'gluten-free'],
    spice_level: 0,
    allergen_compliance: { EU: true, USA: true, Korea: true, Japan: true },
  },

  pricing: {
    cost_usd: 2.0,
    selling_price_usd: 5.0,
    selling_price_local: { amount: 85000, currency: 'VND' },
    profit_margin_percent: 60,
  },

  preparation: {
    prep_time_sec: 120,
    skill_level: 1,
    temperature: 'cold',
  },

  media: {
    images: {
      thumbnail: '/images/products/matcha-cheesecake.png',
      gallery: [],
    },
  },

  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  version: 1,
};

// ============================================================================
// SPECIALTY BEVERAGES
// ============================================================================

/**
 * Matcha Latte
 */
export const matchaLatte: Product = {
  id: 'PROD_MATCHA_LATTE',
  slug: 'matcha-latte',
  same_id: 'BEVERAGE_MATCHA_LATTE',
  name: {
    en: 'Matcha Latte',
    it: 'Latte al Matcha',
    vi: 'Trà Xanh Sữa',
  },
  description: {
    en: 'Premium Japanese matcha whisked with steamed milk, topped with beautiful latte art',
    it: 'Matcha giapponese premium sbattuto con latte caldo, decorato con latte art',
    vi: 'Matcha Nhật Bản cao cấp đánh với sữa nóng, trang trí latte art đẹp mắt',
  },
  category: { main: 'bevande', sub: 'hot-drinks', tertiary: 'latte' },

  ingredients: [
    { ingredient_id: 'ING_MATCHA', quantity: { amount: 5, unit: 'g' } },
    { ingredient_id: 'ING_MILK', quantity: { amount: 200, unit: 'ml' } },
    { ingredient_id: 'ING_SUGAR', quantity: { amount: 10, unit: 'g' }, optional: true },
  ],

  computed: {
    allergens: ['milk'],
    intolerances: ['lactose'],
    suitable_for_diets: ['vegetarian', 'gluten-free'],
    spice_level: 0,
    allergen_compliance: { EU: true, USA: true, Korea: true, Japan: true },
  },

  pricing: {
    cost_usd: 1.0,
    selling_price_usd: 3.5,
    selling_price_local: { amount: 55000, currency: 'VND' },
    profit_margin_percent: 71,
  },

  preparation: {
    prep_time_sec: 180,
    skill_level: 2,
    temperature: 'hot',
  },

  media: {
    images: {
      thumbnail: '/images/products/matcha-latte.png',
      gallery: [],
    },
  },

  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  version: 1,
};

/**
 * Strawberry Smoothie
 */
export const strawberrySmoothie: Product = {
  id: 'PROD_STRAWBERRY_SMOOTHIE',
  slug: 'strawberry-smoothie',
  same_id: 'BEVERAGE_STRAWBERRY_SMOOTHIE',
  name: {
    en: 'Strawberry Smoothie',
    it: 'Frullato alla Fragola',
    vi: 'Sinh Tố Dâu',
  },
  description: {
    en: 'Refreshing blend of fresh strawberries, yogurt, and a touch of honey',
    it: 'Rinfrescante mix di fragole fresche, yogurt e un tocco di miele',
    vi: 'Hỗn hợp tươi mát từ dâu tây tươi, sữa chua và một chút mật ong',
  },
  category: { main: 'bevande', sub: 'cold-drinks', tertiary: 'smoothie' },

  ingredients: [
    { ingredient_id: 'ING_STRAWBERRY', quantity: { amount: 150, unit: 'g' } },
    { ingredient_id: 'ING_YOGURT', quantity: { amount: 100, unit: 'ml' } },
    { ingredient_id: 'ING_HONEY', quantity: { amount: 15, unit: 'ml' } },
    { ingredient_id: 'ING_ICE', quantity: { amount: 50, unit: 'g' } },
  ],

  computed: {
    allergens: ['milk'],
    intolerances: ['lactose'],
    suitable_for_diets: ['vegetarian', 'gluten-free'],
    spice_level: 0,
    allergen_compliance: { EU: true, USA: true, Korea: true, Japan: true },
  },

  pricing: {
    cost_usd: 1.2,
    selling_price_usd: 3.5,
    selling_price_local: { amount: 55000, currency: 'VND' },
    profit_margin_percent: 66,
  },

  preparation: {
    prep_time_sec: 120,
    skill_level: 1,
    temperature: 'cold',
  },

  media: {
    images: {
      thumbnail: '/images/products/strawberry-smoothie.png',
      gallery: [],
    },
  },

  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  version: 1,
};

/**
 * Affogato
 */
export const affogato: Product = {
  id: 'PROD_AFFOGATO',
  slug: 'affogato',
  same_id: 'BEVERAGE_AFFOGATO',
  name: {
    en: 'Affogato',
    it: 'Affogato',
    vi: 'Affogato',
  },
  description: {
    en: 'Italian classic - vanilla gelato drowned in a shot of hot espresso with crunchy toppings',
    it: 'Classico italiano - gelato alla vaniglia affogato in un espresso caldo con topping croccanti',
    vi: 'Món Ý cổ điển - kem vani ngập trong espresso nóng với topping giòn',
  },
  category: { main: 'bevande', sub: 'coffee', tertiary: 'specialty' },

  ingredients: [
    { ingredient_id: 'ING_ESPRESSO', quantity: { amount: 30, unit: 'ml' } },
    { ingredient_id: 'ING_VANILLA_ICE_CREAM', quantity: { amount: 80, unit: 'g' } },
    { ingredient_id: 'ING_COOKIE', quantity: { amount: 20, unit: 'g' }, optional: true },
  ],

  computed: {
    allergens: ['milk', 'gluten'],
    intolerances: ['lactose', 'caffeine'],
    suitable_for_diets: ['vegetarian'],
    spice_level: 0,
    allergen_compliance: { EU: true, USA: true, Korea: true, Japan: true },
  },

  pricing: {
    cost_usd: 1.5,
    selling_price_usd: 4.0,
    selling_price_local: { amount: 65000, currency: 'VND' },
    profit_margin_percent: 63,
  },

  preparation: {
    prep_time_sec: 120,
    skill_level: 2,
    temperature: 'mixed',
  },

  media: {
    images: {
      thumbnail: '/images/products/affogato.png',
      gallery: [],
    },
  },

  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  version: 1,
};

/**
 * Vietnamese Egg Coffee (Cà Phê Trứng)
 */
export const eggCoffee: Product = {
  id: 'PROD_EGG_COFFEE',
  slug: 'egg-coffee',
  same_id: 'BEVERAGE_EGG_COFFEE',
  name: {
    en: 'Vietnamese Egg Coffee',
    it: 'Caffè all\'Uovo Vietnamita',
    vi: 'Cà Phê Trứng',
  },
  description: {
    en: 'Hanoi specialty - rich espresso topped with creamy whipped egg yolk and condensed milk',
    it: 'Specialità di Hanoi - espresso ricco con crema di tuorlo d\'uovo e latte condensato',
    vi: 'Đặc sản Hà Nội - espresso đậm đà phủ kem trứng béo ngậy và sữa đặc',
  },
  category: { main: 'bevande', sub: 'coffee', tertiary: 'vietnamese' },

  ingredients: [
    { ingredient_id: 'ING_ESPRESSO', quantity: { amount: 40, unit: 'ml' } },
    { ingredient_id: 'ING_EGG', quantity: { amount: 1, unit: 'piece' }, notes: { en: 'Egg yolk only' } },
    { ingredient_id: 'ING_CONDENSED_MILK', quantity: { amount: 30, unit: 'ml' } },
    { ingredient_id: 'ING_SUGAR', quantity: { amount: 10, unit: 'g' } },
  ],

  computed: {
    allergens: ['milk', 'egg'],
    intolerances: ['lactose', 'caffeine'],
    suitable_for_diets: ['vegetarian', 'gluten-free'],
    spice_level: 0,
    allergen_compliance: { EU: true, USA: true, Korea: true, Japan: true },
  },

  pricing: {
    cost_usd: 0.8,
    selling_price_usd: 3.0,
    selling_price_local: { amount: 45000, currency: 'VND' },
    profit_margin_percent: 73,
  },

  preparation: {
    prep_time_sec: 240,
    skill_level: 3,
    temperature: 'hot',
  },

  media: {
    images: {
      thumbnail: '/images/products/egg-coffee.png',
      gallery: [],
    },
  },

  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  version: 1,
};

/**
 * Lemon Iced Tea with Cinnamon
 */
export const lemonIcedTea: Product = {
  id: 'PROD_LEMON_ICED_TEA',
  slug: 'lemon-iced-tea',
  same_id: 'BEVERAGE_LEMON_ICED_TEA',
  name: {
    en: 'Lemon Cinnamon Iced Tea',
    it: 'Tè Freddo Limone e Cannella',
    vi: 'Trà Đá Chanh Quế',
  },
  description: {
    en: 'Refreshing iced tea layered with fresh lemon and a hint of warm cinnamon',
    it: 'Tè freddo rinfrescante stratificato con limone fresco e un tocco di cannella calda',
    vi: 'Trà đá sảng khoái kết hợp chanh tươi và hương quế ấm áp',
  },
  category: { main: 'bevande', sub: 'cold-drinks', tertiary: 'tea' },

  ingredients: [
    { ingredient_id: 'ING_BLACK_TEA', quantity: { amount: 200, unit: 'ml' } },
    { ingredient_id: 'ING_LEMON', quantity: { amount: 30, unit: 'g' } },
    { ingredient_id: 'ING_CINNAMON', quantity: { amount: 2, unit: 'g' } },
    { ingredient_id: 'ING_HONEY', quantity: { amount: 15, unit: 'ml' } },
    { ingredient_id: 'ING_ICE', quantity: { amount: 100, unit: 'g' } },
  ],

  computed: {
    allergens: [],
    intolerances: [],
    suitable_for_diets: ['vegan', 'vegetarian', 'gluten-free'],
    spice_level: 0,
    allergen_compliance: { EU: true, USA: true, Korea: true, Japan: true },
  },

  pricing: {
    cost_usd: 0.5,
    selling_price_usd: 2.5,
    selling_price_local: { amount: 40000, currency: 'VND' },
    profit_margin_percent: 80,
  },

  preparation: {
    prep_time_sec: 120,
    skill_level: 1,
    temperature: 'cold',
  },

  media: {
    images: {
      thumbnail: '/images/products/lemon-iced-tea.png',
      gallery: [],
    },
  },

  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  version: 1,
};

/**
 * Caramel Frappuccino
 */
export const caramelFrappuccino: Product = {
  id: 'PROD_CARAMEL_FRAPPUCCINO',
  slug: 'caramel-frappuccino',
  same_id: 'BEVERAGE_CARAMEL_FRAPPUCCINO',
  name: {
    en: 'Caramel Frappuccino',
    it: 'Frappuccino al Caramello',
    vi: 'Frappuccino Caramel',
  },
  description: {
    en: 'Blended coffee with caramel syrup, topped with whipped cream and caramel drizzle',
    it: 'Caffè frullato con sciroppo di caramello, panna montata e filo di caramello',
    vi: 'Cà phê xay với siro caramel, phủ kem tươi và sốt caramel',
  },
  category: { main: 'bevande', sub: 'coffee', tertiary: 'blended' },

  ingredients: [
    { ingredient_id: 'ING_ESPRESSO', quantity: { amount: 60, unit: 'ml' } },
    { ingredient_id: 'ING_MILK', quantity: { amount: 150, unit: 'ml' } },
    { ingredient_id: 'ING_CARAMEL_SYRUP', quantity: { amount: 30, unit: 'ml' } },
    { ingredient_id: 'ING_WHIPPED_CREAM', quantity: { amount: 30, unit: 'g' } },
    { ingredient_id: 'ING_ICE', quantity: { amount: 100, unit: 'g' } },
  ],

  computed: {
    allergens: ['milk'],
    intolerances: ['lactose', 'caffeine'],
    suitable_for_diets: ['vegetarian', 'gluten-free'],
    spice_level: 0,
    allergen_compliance: { EU: true, USA: true, Korea: true, Japan: true },
  },

  pricing: {
    cost_usd: 1.2,
    selling_price_usd: 4.0,
    selling_price_local: { amount: 65000, currency: 'VND' },
    profit_margin_percent: 70,
  },

  preparation: {
    prep_time_sec: 180,
    skill_level: 2,
    temperature: 'cold',
  },

  media: {
    images: {
      thumbnail: '/images/products/caramel-frappuccino.png',
      gallery: [],
    },
  },

  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  version: 1,
};

/**
 * Orange Coffee
 */
export const orangeCoffee: Product = {
  id: 'PROD_ORANGE_COFFEE',
  slug: 'orange-coffee',
  same_id: 'BEVERAGE_ORANGE_COFFEE',
  name: {
    en: 'Orange Coffee',
    it: 'Caffè all\'Arancia',
    vi: 'Cà Phê Cam',
  },
  description: {
    en: 'Unique fusion - cold brew coffee layered with fresh orange juice and mint',
    it: 'Fusione unica - cold brew stratificato con succo d\'arancia fresco e menta',
    vi: 'Sự kết hợp độc đáo - cà phê cold brew phân tầng với nước cam tươi và bạc hà',
  },
  category: { main: 'bevande', sub: 'coffee', tertiary: 'specialty' },

  ingredients: [
    { ingredient_id: 'ING_COLD_BREW', quantity: { amount: 100, unit: 'ml' } },
    { ingredient_id: 'ING_ORANGE', quantity: { amount: 100, unit: 'ml' } },
    { ingredient_id: 'ING_MINT', quantity: { amount: 3, unit: 'g' } },
    { ingredient_id: 'ING_ICE', quantity: { amount: 50, unit: 'g' } },
  ],

  computed: {
    allergens: [],
    intolerances: ['caffeine'],
    suitable_for_diets: ['vegan', 'vegetarian', 'gluten-free'],
    spice_level: 0,
    allergen_compliance: { EU: true, USA: true, Korea: true, Japan: true },
  },

  pricing: {
    cost_usd: 1.0,
    selling_price_usd: 3.5,
    selling_price_local: { amount: 55000, currency: 'VND' },
    profit_margin_percent: 71,
  },

  preparation: {
    prep_time_sec: 120,
    skill_level: 2,
    temperature: 'cold',
  },

  media: {
    images: {
      thumbnail: '/images/products/orange-coffee.png',
      gallery: [],
    },
  },

  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  version: 1,
};

// ============================================================================
// EXPORTS
// ============================================================================

export const foodProducts: Product[] = [
  // Bánh Mì
  banhMiThitNuong,
  banhMiDacBiet,
  banhMiGa,
  banhMiTom,
  banhMiThitHeo,
  // Desserts
  basqueCheesecake,
  redVelvetCake,
  passionFruitCheesecake,
  chocolateMousse,
  flanCaramel,
  matchaCheesecake,
  // Beverages
  matchaLatte,
  strawberrySmoothie,
  affogato,
  eggCoffee,
  lemonIcedTea,
  caramelFrappuccino,
  orangeCoffee,
];

export const FOOD_PRODUCT_COUNT = foodProducts.length;
