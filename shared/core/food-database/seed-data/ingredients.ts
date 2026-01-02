/**
 * GUDBRO Master Ingredients Seed Data
 *
 * Comprehensive ingredient database for F&B businesses.
 * Uses Sistema 5 Dimensioni for complete allergen, intolerance, and dietary data.
 *
 * SISTEMA 5 DIMENSIONI v3.0:
 * - Dimensione 1: 30 Allergens (EU 14 + Korea 7 + Japan 7 + GUDBRO 2)
 * - Dimensione 2: 10 Intolerances
 * - Dimensione 3: 11 Dietary Restrictions
 * - Dimensione 4: 9 Nutrition factors
 * - Dimensione 5: 6 Spice Levels
 */

import type {
  MasterIngredient,
  AllergenFlags,
  IntoleranceFlags,
  DietaryFlags,
  SpiceInfo,
} from '../types';

// ============================================================================
// HELPER DEFAULTS
// ============================================================================

const noAllergens: AllergenFlags = {};
const noIntolerances: IntoleranceFlags = {};

const defaultSpice: SpiceInfo = { level: 0 };

// Common dietary flag combinations
const veganFlags: DietaryFlags = {
  vegan: true,
  vegetarian: true,
  pescatarian: true,
  halal: true,
  kosher: true,
  dairy_free: true,
};

const vegetarianFlags: DietaryFlags = {
  vegetarian: true,
  pescatarian: true,
  halal: true,
  dairy_free: true,
};

const dairyFlags: DietaryFlags = {
  vegetarian: true,
  pescatarian: true,
  vegan: false,
  dairy_free: false,
};

// ============================================================================
// COFFEE & TEA INGREDIENTS
// ============================================================================

export const coffeeTeaIngredients: Partial<MasterIngredient>[] = [
  {
    slug: 'espresso',
    name: { en: 'Espresso', vi: 'Cà phê espresso', ko: '에스프레소', it: 'Espresso' },
    category: 'coffee_tea',
    subcategory: 'coffee',
    allergens: noAllergens,
    intolerances: {
      caffeine: true,
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 9, protein: 0.1, carbohydrates: 1.7, sugar: 0, fiber: 0,
      fat: 0.2, saturatedFat: 0, sodium: 14
    },
    iconEmoji: '☕',
    color: '#4A2C2A'
  },
  {
    slug: 'robusta-coffee-beans',
    name: { en: 'Vietnamese Robusta Coffee', vi: 'Cà phê Robusta Việt Nam', ko: '베트남 로부스타 커피' },
    category: 'coffee_tea',
    subcategory: 'coffee_beans',
    allergens: noAllergens,
    intolerances: {
      caffeine: true,
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 0, protein: 0, carbohydrates: 0, sugar: 0, fiber: 0,
      fat: 0, saturatedFat: 0, sodium: 0
    },
    iconEmoji: '🫘',
    color: '#3E2723'
  },
  {
    slug: 'arabica-coffee-beans',
    name: { en: 'Arabica Coffee Beans', vi: 'Cà phê Arabica', ko: '아라비카 커피 원두' },
    category: 'coffee_tea',
    subcategory: 'coffee_beans',
    allergens: noAllergens,
    intolerances: {
      caffeine: true,
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 0, protein: 0, carbohydrates: 0, sugar: 0, fiber: 0,
      fat: 0, saturatedFat: 0, sodium: 0
    },
    iconEmoji: '🫘',
    color: '#5D4037'
  },
  {
    slug: 'matcha-powder',
    name: { en: 'Matcha Powder', vi: 'Bột trà xanh Matcha', ko: '말차 가루', ja: '抹茶' },
    category: 'coffee_tea',
    subcategory: 'tea',
    allergens: noAllergens,
    intolerances: {
      caffeine: true, // Contains caffeine, less than coffee
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 324, protein: 30.6, carbohydrates: 38.9, sugar: 0, fiber: 38.5,
      fat: 5.3, saturatedFat: 1, sodium: 32
    },
    iconEmoji: '🍵',
    color: '#7CB342'
  },
  {
    slug: 'black-tea',
    name: { en: 'Black Tea', vi: 'Trà đen', ko: '홍차' },
    category: 'coffee_tea',
    subcategory: 'tea',
    allergens: noAllergens,
    intolerances: {
      caffeine: true,
      histamine: true, // Fermented tea can contain histamine
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 1, protein: 0, carbohydrates: 0.3, sugar: 0, fiber: 0,
      fat: 0, saturatedFat: 0, sodium: 3
    },
    iconEmoji: '🫖',
    color: '#8B4513'
  },
  {
    slug: 'green-tea',
    name: { en: 'Green Tea', vi: 'Trà xanh', ko: '녹차' },
    category: 'coffee_tea',
    subcategory: 'tea',
    allergens: noAllergens,
    intolerances: {
      caffeine: true,
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 1, protein: 0, carbohydrates: 0, sugar: 0, fiber: 0,
      fat: 0, saturatedFat: 0, sodium: 1
    },
    iconEmoji: '🍃',
    color: '#81C784'
  },
  {
    slug: 'oolong-tea',
    name: { en: 'Oolong Tea', vi: 'Trà Ô Long', ko: '우롱차', zh: '烏龍茶' },
    category: 'coffee_tea',
    subcategory: 'tea',
    allergens: noAllergens,
    intolerances: {
      caffeine: true,
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 1, protein: 0, carbohydrates: 0, sugar: 0, fiber: 0,
      fat: 0, saturatedFat: 0, sodium: 3
    },
    iconEmoji: '🫖',
    color: '#A1887F'
  }
];

// ============================================================================
// DAIRY & ALTERNATIVES
// ============================================================================

export const dairyIngredients: Partial<MasterIngredient>[] = [
  {
    slug: 'whole-milk',
    name: { en: 'Whole Milk', vi: 'Sữa tươi nguyên kem', ko: '전유' },
    category: 'dairy',
    subcategory: 'milk',
    allergens: {
      milk: true,
    },
    intolerances: {
      lactose: true,
    },
    dietaryFlags: {
      ...dairyFlags,
      gluten_free: true,
      nut_free: true,
      kosher: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 61, protein: 3.2, carbohydrates: 4.8, sugar: 5, fiber: 0,
      fat: 3.3, saturatedFat: 1.9, sodium: 43
    },
    iconEmoji: '🥛',
    color: '#FAFAFA'
  },
  {
    slug: 'condensed-milk',
    name: { en: 'Condensed Milk', vi: 'Sữa đặc', ko: '연유' },
    category: 'dairy',
    subcategory: 'milk',
    allergens: {
      milk: true,
    },
    intolerances: {
      lactose: true,
    },
    dietaryFlags: {
      ...dairyFlags,
      gluten_free: true,
      nut_free: true,
      kosher: true,
      low_carb: false, // High sugar
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 321, protein: 7.9, carbohydrates: 54.4, sugar: 54.4, fiber: 0,
      fat: 8.7, saturatedFat: 5.5, sodium: 127
    },
    iconEmoji: '🥛',
    color: '#FFF8E1'
  },
  {
    slug: 'oat-milk',
    name: { en: 'Oat Milk', vi: 'Sữa yến mạch', ko: '귀리 우유' },
    category: 'dairy',
    subcategory: 'plant_milk',
    allergens: {
      gluten: true, // Oats may contain gluten or cross-contamination
    },
    intolerances: {
      gluten_sensitivity: true,
      fodmap: true, // Oats are moderate FODMAP
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: false, // Contains gluten
      nut_free: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 43, protein: 1, carbohydrates: 6.7, sugar: 4, fiber: 0.8,
      fat: 1.5, saturatedFat: 0.2, sodium: 36
    },
    iconEmoji: '🌾',
    color: '#F5F5DC'
  },
  {
    slug: 'almond-milk',
    name: { en: 'Almond Milk', vi: 'Sữa hạnh nhân', ko: '아몬드 우유' },
    category: 'dairy',
    subcategory: 'plant_milk',
    allergens: {
      tree_nuts: true,
    },
    intolerances: noIntolerances,
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: false, // Contains almonds
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 15, protein: 0.6, carbohydrates: 0.3, sugar: 0, fiber: 0.2,
      fat: 1.2, saturatedFat: 0.1, sodium: 67
    },
    iconEmoji: '🌰',
    color: '#F5DEB3'
  },
  {
    slug: 'coconut-milk',
    name: { en: 'Coconut Milk', vi: 'Nước cốt dừa', ko: '코코넛 밀크', th: 'กะทิ' },
    category: 'dairy',
    subcategory: 'plant_milk',
    allergens: noAllergens, // Coconut is NOT a tree nut (FDA classifies separately)
    intolerances: noIntolerances,
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true, // Coconut is not a tree nut
      low_carb: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 197, protein: 2.2, carbohydrates: 2.8, sugar: 2.8, fiber: 0,
      fat: 21.3, saturatedFat: 18.9, sodium: 13
    },
    iconEmoji: '🥥',
    color: '#FFFEF0'
  },
  {
    slug: 'soy-milk',
    name: { en: 'Soy Milk', vi: 'Sữa đậu nành', ko: '두유' },
    category: 'dairy',
    subcategory: 'plant_milk',
    allergens: {
      soybeans: true,
    },
    intolerances: noIntolerances,
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 33, protein: 2.9, carbohydrates: 1.2, sugar: 1, fiber: 0.4,
      fat: 1.6, saturatedFat: 0.2, sodium: 25
    },
    iconEmoji: '🫘',
    color: '#FFF8DC'
  },
  {
    slug: 'heavy-cream',
    name: { en: 'Heavy Cream', vi: 'Kem béo', ko: '생크림' },
    category: 'dairy',
    subcategory: 'cream',
    allergens: {
      milk: true,
    },
    intolerances: {
      lactose: true,
    },
    dietaryFlags: {
      ...dairyFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 340, protein: 2.1, carbohydrates: 2.8, sugar: 2.9, fiber: 0,
      fat: 36.1, saturatedFat: 23, sodium: 27
    },
    iconEmoji: '🍶',
    color: '#FFFDE7'
  },
  {
    slug: 'egg-yolk',
    name: { en: 'Egg Yolk', vi: 'Lòng đỏ trứng', ko: '달걀 노른자' },
    category: 'dairy',
    subcategory: 'eggs',
    allergens: {
      eggs: true,
    },
    intolerances: noIntolerances,
    dietaryFlags: {
      vegetarian: true,
      pescatarian: true,
      vegan: false,
      gluten_free: true,
      dairy_free: true,
      nut_free: true,
      low_carb: true,
      halal: true,
      kosher: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 322, protein: 15.9, carbohydrates: 3.6, sugar: 0.6, fiber: 0,
      fat: 26.5, saturatedFat: 9.6, sodium: 48
    },
    iconEmoji: '🥚',
    color: '#FFD54F'
  }
];

// ============================================================================
// FRUITS
// ============================================================================

export const fruitIngredients: Partial<MasterIngredient>[] = [
  {
    slug: 'banana',
    name: { en: 'Banana', vi: 'Chuối', ko: '바나나', th: 'กล้วย' },
    category: 'fruits',
    allergens: {
      banana: true, // Japan allergen
    },
    intolerances: {
      fructose: true,
      fodmap: true, // Ripe bananas are high FODMAP
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 89, protein: 1.1, carbohydrates: 22.8, sugar: 12.2, fiber: 2.6,
      fat: 0.3, saturatedFat: 0.1, sodium: 1
    },
    iconEmoji: '🍌',
    color: '#FFE135',
    seasonalAvailability: [{ season: 'all_year', regions: ['vietnam', 'southeast_asia'] }]
  },
  {
    slug: 'mango',
    name: { en: 'Mango', vi: 'Xoài', ko: '망고', th: 'มะม่วง' },
    category: 'fruits',
    allergens: {
      mango: true, // Japan allergen
    },
    intolerances: {
      fructose: true,
      fodmap: true, // High FODMAP
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 60, protein: 0.8, carbohydrates: 15, sugar: 13.7, fiber: 1.6,
      fat: 0.4, saturatedFat: 0.1, sodium: 1
    },
    iconEmoji: '🥭',
    color: '#FF9800',
    seasonalAvailability: [
      { season: 'summer', regions: ['vietnam', 'southeast_asia'], peakMonths: [4, 5, 6, 7] }
    ]
  },
  {
    slug: 'strawberry',
    name: { en: 'Strawberry', vi: 'Dâu tây', ko: '딸기' },
    category: 'fruits',
    allergens: noAllergens,
    intolerances: {
      salicylates: true, // High in salicylates
      fructose: true,
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      low_fodmap: true, // Low FODMAP in small amounts
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 32, protein: 0.7, carbohydrates: 7.7, sugar: 4.9, fiber: 2,
      fat: 0.3, saturatedFat: 0, sodium: 1
    },
    iconEmoji: '🍓',
    color: '#E53935',
    seasonalAvailability: [
      { season: 'winter', regions: ['vietnam'], peakMonths: [12, 1, 2, 3] }
    ]
  },
  {
    slug: 'passion-fruit',
    name: { en: 'Passion Fruit', vi: 'Chanh dây', ko: '패션프루트', th: 'เสาวรส' },
    category: 'fruits',
    allergens: noAllergens,
    intolerances: {
      fructose: true,
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_fodmap: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 97, protein: 2.2, carbohydrates: 23.4, sugar: 11.2, fiber: 10.4,
      fat: 0.7, saturatedFat: 0.1, sodium: 28
    },
    iconEmoji: '🫐',
    color: '#9C27B0',
    seasonalAvailability: [{ season: 'all_year', regions: ['vietnam', 'southeast_asia'] }]
  },
  {
    slug: 'dragon-fruit',
    name: { en: 'Dragon Fruit', vi: 'Thanh long', ko: '용과', th: 'แก้วมังกร' },
    category: 'fruits',
    allergens: noAllergens,
    intolerances: noIntolerances,
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      low_fodmap: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 50, protein: 1.1, carbohydrates: 11, sugar: 8, fiber: 3,
      fat: 0.4, saturatedFat: 0, sodium: 39
    },
    iconEmoji: '🐉',
    color: '#E91E63',
    seasonalAvailability: [{ season: 'all_year', regions: ['vietnam', 'southeast_asia'] }]
  },
  {
    slug: 'pineapple',
    name: { en: 'Pineapple', vi: 'Dứa', ko: '파인애플', th: 'สับปะรด' },
    category: 'fruits',
    allergens: noAllergens,
    intolerances: {
      fructose: true,
      fodmap: true, // High FODMAP in large amounts
      histamine: true, // Can trigger histamine release
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 50, protein: 0.5, carbohydrates: 13.1, sugar: 9.9, fiber: 1.4,
      fat: 0.1, saturatedFat: 0, sodium: 1
    },
    iconEmoji: '🍍',
    color: '#FFC107'
  },
  {
    slug: 'avocado',
    name: { en: 'Avocado', vi: 'Bơ', ko: '아보카도' },
    category: 'fruits',
    allergens: noAllergens,
    intolerances: {
      histamine: true, // Contains histamine
      salicylates: true,
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      low_fodmap: true, // Low FODMAP in small amounts
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 160, protein: 2, carbohydrates: 8.5, sugar: 0.7, fiber: 6.7,
      fat: 14.7, saturatedFat: 2.1, sodium: 7
    },
    iconEmoji: '🥑',
    color: '#689F38'
  },
  {
    slug: 'lemon',
    name: { en: 'Lemon', vi: 'Chanh vàng', ko: '레몬' },
    category: 'fruits',
    allergens: noAllergens,
    intolerances: {
      salicylates: true, // Contains salicylates
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      low_fodmap: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 29, protein: 1.1, carbohydrates: 9.3, sugar: 2.5, fiber: 2.8,
      fat: 0.3, saturatedFat: 0, sodium: 2
    },
    iconEmoji: '🍋',
    color: '#FDD835'
  },
  {
    slug: 'lime',
    name: { en: 'Lime', vi: 'Chanh', ko: '라임' },
    category: 'fruits',
    allergens: noAllergens,
    intolerances: {
      salicylates: true,
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      low_fodmap: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 30, protein: 0.7, carbohydrates: 10.5, sugar: 1.7, fiber: 2.8,
      fat: 0.2, saturatedFat: 0, sodium: 2
    },
    iconEmoji: '🍋',
    color: '#7CB342'
  },
  {
    slug: 'apple',
    name: { en: 'Apple', vi: 'Táo', ko: '사과', ja: 'りんご' },
    category: 'fruits',
    allergens: {
      apple: true, // Japan allergen
    },
    intolerances: {
      fructose: true,
      fodmap: true, // High FODMAP
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 52, protein: 0.3, carbohydrates: 13.8, sugar: 10.4, fiber: 2.4,
      fat: 0.2, saturatedFat: 0, sodium: 1
    },
    iconEmoji: '🍎',
    color: '#E53935'
  },
  {
    slug: 'orange',
    name: { en: 'Orange', vi: 'Cam', ko: '오렌지', ja: 'オレンジ' },
    category: 'fruits',
    allergens: {
      orange: true, // Japan allergen
    },
    intolerances: {
      fructose: true,
      salicylates: true,
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 47, protein: 0.9, carbohydrates: 11.8, sugar: 9.4, fiber: 2.4,
      fat: 0.1, saturatedFat: 0, sodium: 0
    },
    iconEmoji: '🍊',
    color: '#FF9800'
  },
  {
    slug: 'kiwi',
    name: { en: 'Kiwi', vi: 'Kiwi', ko: '키위', ja: 'キウイ' },
    category: 'fruits',
    allergens: {
      kiwi: true, // Japan allergen
    },
    intolerances: {
      fodmap: true, // High FODMAP
      salicylates: true,
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 61, protein: 1.1, carbohydrates: 14.7, sugar: 9, fiber: 3,
      fat: 0.5, saturatedFat: 0, sodium: 3
    },
    iconEmoji: '🥝',
    color: '#8BC34A'
  },
  {
    slug: 'peach',
    name: { en: 'Peach', vi: 'Đào', ko: '복숭아' },
    category: 'fruits',
    allergens: {
      peach: true, // Korea allergen
    },
    intolerances: {
      fructose: true,
      fodmap: true, // High FODMAP
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 39, protein: 0.9, carbohydrates: 9.5, sugar: 8.4, fiber: 1.5,
      fat: 0.3, saturatedFat: 0, sodium: 0
    },
    iconEmoji: '🍑',
    color: '#FFAB91'
  }
];

// ============================================================================
// SWEETENERS
// ============================================================================

export const sweetenerIngredients: Partial<MasterIngredient>[] = [
  {
    slug: 'white-sugar',
    name: { en: 'White Sugar', vi: 'Đường trắng', ko: '백설탕' },
    category: 'sweeteners',
    allergens: noAllergens,
    intolerances: {
      fructose: true, // 50% fructose
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: false,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 387, protein: 0, carbohydrates: 100, sugar: 100, fiber: 0,
      fat: 0, saturatedFat: 0, sodium: 1
    },
    iconEmoji: '🧂',
    color: '#FFFFFF'
  },
  {
    slug: 'brown-sugar',
    name: { en: 'Brown Sugar', vi: 'Đường nâu', ko: '흑설탕' },
    category: 'sweeteners',
    allergens: noAllergens,
    intolerances: {
      fructose: true,
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: false,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 380, protein: 0, carbohydrates: 98, sugar: 97, fiber: 0,
      fat: 0, saturatedFat: 0, sodium: 28
    },
    iconEmoji: '🟤',
    color: '#8D6E63'
  },
  {
    slug: 'honey',
    name: { en: 'Honey', vi: 'Mật ong', ko: '꿀' },
    category: 'sweeteners',
    allergens: noAllergens,
    intolerances: {
      fructose: true, // High fructose
      fodmap: true, // High FODMAP
    },
    dietaryFlags: {
      vegetarian: true,
      pescatarian: true,
      vegan: false, // Not vegan (bee product)
      gluten_free: true,
      dairy_free: true,
      nut_free: true,
      halal: true,
      kosher: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 304, protein: 0.3, carbohydrates: 82.4, sugar: 82.1, fiber: 0.2,
      fat: 0, saturatedFat: 0, sodium: 4
    },
    iconEmoji: '🍯',
    color: '#FFA000'
  },
  {
    slug: 'maple-syrup',
    name: { en: 'Maple Syrup', vi: 'Siro cây phong', ko: '메이플 시럽' },
    category: 'sweeteners',
    allergens: noAllergens,
    intolerances: {
      fructose: true,
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 260, protein: 0, carbohydrates: 67, sugar: 60, fiber: 0,
      fat: 0.1, saturatedFat: 0, sodium: 12
    },
    iconEmoji: '🍁',
    color: '#D4A574'
  },
  {
    slug: 'stevia',
    name: { en: 'Stevia', vi: 'Cỏ ngọt Stevia', ko: '스테비아' },
    category: 'sweeteners',
    allergens: noAllergens,
    intolerances: noIntolerances,
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      low_fodmap: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 0, protein: 0, carbohydrates: 0, sugar: 0, fiber: 0,
      fat: 0, saturatedFat: 0, sodium: 0
    },
    iconEmoji: '🌿',
    color: '#4CAF50'
  }
];

// ============================================================================
// TOPPINGS & EXTRAS
// ============================================================================

export const toppingIngredients: Partial<MasterIngredient>[] = [
  {
    slug: 'tapioca-pearls',
    name: { en: 'Tapioca Pearls (Boba)', vi: 'Trân châu', ko: '타피오카 펄', zh: '珍珠' },
    category: 'grains',
    subcategory: 'toppings',
    allergens: noAllergens,
    intolerances: noIntolerances,
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 358, protein: 0, carbohydrates: 88.7, sugar: 3.3, fiber: 0.9,
      fat: 0, saturatedFat: 0, sodium: 1
    },
    iconEmoji: '⚫',
    color: '#212121'
  },
  {
    slug: 'grass-jelly',
    name: { en: 'Grass Jelly', vi: 'Sương sáo', ko: '선초 젤리', zh: '仙草' },
    category: 'other',
    subcategory: 'toppings',
    allergens: noAllergens,
    intolerances: noIntolerances,
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      low_fodmap: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 16, protein: 0.1, carbohydrates: 4.3, sugar: 0, fiber: 0.9,
      fat: 0, saturatedFat: 0, sodium: 11
    },
    iconEmoji: '🟫',
    color: '#3E2723'
  },
  {
    slug: 'coconut-jelly',
    name: { en: 'Coconut Jelly (Nata de Coco)', vi: 'Thạch dừa', ko: '코코넛 젤리' },
    category: 'other',
    subcategory: 'toppings',
    allergens: noAllergens,
    intolerances: noIntolerances,
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 73, protein: 0, carbohydrates: 18, sugar: 12, fiber: 2,
      fat: 0, saturatedFat: 0, sodium: 3
    },
    iconEmoji: '🔲',
    color: '#ECEFF1'
  },
  {
    slug: 'whipped-cream',
    name: { en: 'Whipped Cream', vi: 'Kem tươi', ko: '휘핑크림' },
    category: 'dairy',
    subcategory: 'toppings',
    allergens: {
      milk: true,
    },
    intolerances: {
      lactose: true,
    },
    dietaryFlags: {
      ...dairyFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 257, protein: 3, carbohydrates: 12.5, sugar: 12.5, fiber: 0,
      fat: 22, saturatedFat: 14, sodium: 65
    },
    iconEmoji: '🍨',
    color: '#FAFAFA'
  },
  {
    slug: 'chocolate-sauce',
    name: { en: 'Chocolate Sauce', vi: 'Sốt chocolate', ko: '초콜릿 소스' },
    category: 'condiments',
    subcategory: 'sauces',
    allergens: {
      milk: true, // Most chocolate sauces contain dairy
    },
    intolerances: {
      lactose: true,
      caffeine: true, // Chocolate contains caffeine
    },
    dietaryFlags: {
      ...dairyFlags,
      gluten_free: true,
      nut_free: true, // Check specific brand
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 330, protein: 2.3, carbohydrates: 64, sugar: 58, fiber: 3.4,
      fat: 8.4, saturatedFat: 5, sodium: 62
    },
    iconEmoji: '🍫',
    color: '#5D4037'
  },
  {
    slug: 'caramel-sauce',
    name: { en: 'Caramel Sauce', vi: 'Sốt caramel', ko: '카라멜 소스' },
    category: 'condiments',
    subcategory: 'sauces',
    allergens: {
      milk: true, // Contains butter/cream
    },
    intolerances: {
      lactose: true,
    },
    dietaryFlags: {
      ...dairyFlags,
      gluten_free: true,
      nut_free: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 270, protein: 1, carbohydrates: 60, sugar: 55, fiber: 0,
      fat: 4, saturatedFat: 2.5, sodium: 180
    },
    iconEmoji: '🥃',
    color: '#D4A574'
  }
];

// ============================================================================
// PROTEINS
// ============================================================================

export const proteinIngredients: Partial<MasterIngredient>[] = [
  {
    slug: 'chicken-breast',
    name: { en: 'Chicken Breast', vi: 'Ức gà', ko: '닭가슴살' },
    category: 'proteins',
    subcategory: 'poultry',
    allergens: {
      chicken: true, // Korea allergen
    },
    intolerances: noIntolerances,
    dietaryFlags: {
      vegan: false,
      vegetarian: false,
      pescatarian: false,
      gluten_free: true,
      dairy_free: true,
      nut_free: true,
      low_carb: true,
      halal: true, // If halal-slaughtered
      kosher: true, // If kosher-slaughtered
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 165, protein: 31, carbohydrates: 0, sugar: 0, fiber: 0,
      fat: 3.6, saturatedFat: 1, sodium: 74
    },
    iconEmoji: '🍗',
    color: '#FFCC80'
  },
  {
    slug: 'beef-steak',
    name: { en: 'Beef Steak', vi: 'Bò bít tết', ko: '소고기 스테이크' },
    category: 'proteins',
    subcategory: 'beef',
    allergens: {
      beef: true, // Korea allergen
    },
    intolerances: noIntolerances,
    dietaryFlags: {
      vegan: false,
      vegetarian: false,
      pescatarian: false,
      gluten_free: true,
      dairy_free: true,
      nut_free: true,
      low_carb: true,
      halal: true, // If halal-slaughtered
      kosher: true, // If kosher-slaughtered
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 271, protein: 26, carbohydrates: 0, sugar: 0, fiber: 0,
      fat: 18, saturatedFat: 7, sodium: 66
    },
    iconEmoji: '🥩',
    color: '#A1887F'
  },
  {
    slug: 'pork-tenderloin',
    name: { en: 'Pork Tenderloin', vi: 'Thịt heo thăn', ko: '돼지 안심' },
    category: 'proteins',
    subcategory: 'pork',
    allergens: {
      pork: true, // Korea allergen
    },
    intolerances: noIntolerances,
    dietaryFlags: {
      vegan: false,
      vegetarian: false,
      pescatarian: false,
      gluten_free: true,
      dairy_free: true,
      nut_free: true,
      low_carb: true,
      halal: false, // Pork is never halal
      kosher: false, // Pork is never kosher
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 143, protein: 26, carbohydrates: 0, sugar: 0, fiber: 0,
      fat: 3.5, saturatedFat: 1.2, sodium: 57
    },
    iconEmoji: '🥓',
    color: '#FFAB91'
  },
  {
    slug: 'tofu',
    name: { en: 'Tofu', vi: 'Đậu phụ', ko: '두부', ja: '豆腐' },
    category: 'proteins',
    subcategory: 'plant_protein',
    allergens: {
      soybeans: true,
    },
    intolerances: noIntolerances,
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      buddhist: true, // Suitable for Buddhist
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 76, protein: 8, carbohydrates: 1.9, sugar: 0.6, fiber: 0.3,
      fat: 4.8, saturatedFat: 0.7, sodium: 7
    },
    iconEmoji: '🧈',
    color: '#FFF9C4'
  },
  {
    slug: 'salmon',
    name: { en: 'Salmon', vi: 'Cá hồi', ko: '연어', ja: 'サーモン' },
    category: 'proteins',
    subcategory: 'seafood',
    allergens: {
      fish: true,
    },
    intolerances: {
      histamine: true, // Fish can be high in histamine
    },
    dietaryFlags: {
      vegan: false,
      vegetarian: false,
      pescatarian: true,
      gluten_free: true,
      dairy_free: true,
      nut_free: true,
      low_carb: true,
      kosher: true, // Salmon has fins and scales
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 208, protein: 20, carbohydrates: 0, sugar: 0, fiber: 0,
      fat: 13, saturatedFat: 3, sodium: 59
    },
    iconEmoji: '🐟',
    color: '#FF8A65'
  },
  {
    slug: 'shrimp',
    name: { en: 'Shrimp', vi: 'Tôm', ko: '새우', th: 'กุ้ง' },
    category: 'proteins',
    subcategory: 'seafood',
    allergens: {
      crustaceans: true,
    },
    intolerances: noIntolerances,
    dietaryFlags: {
      vegan: false,
      vegetarian: false,
      pescatarian: true,
      gluten_free: true,
      dairy_free: true,
      nut_free: true,
      low_carb: true,
      halal: true,
      kosher: false, // Shellfish not kosher
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 99, protein: 24, carbohydrates: 0.2, sugar: 0, fiber: 0,
      fat: 0.3, saturatedFat: 0.1, sodium: 111
    },
    iconEmoji: '🦐',
    color: '#FF7043'
  },
  {
    slug: 'squid',
    name: { en: 'Squid', vi: 'Mực', ko: '오징어', ja: 'イカ' },
    category: 'proteins',
    subcategory: 'seafood',
    allergens: {
      molluscs: true,
      squid: true, // Korea allergen
    },
    intolerances: noIntolerances,
    dietaryFlags: {
      vegan: false,
      vegetarian: false,
      pescatarian: true,
      gluten_free: true,
      dairy_free: true,
      nut_free: true,
      low_carb: true,
      halal: true,
      kosher: false, // Shellfish/molluscs not kosher
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 92, protein: 15.6, carbohydrates: 3.1, sugar: 0, fiber: 0,
      fat: 1.4, saturatedFat: 0.4, sodium: 44
    },
    iconEmoji: '🦑',
    color: '#E1BEE7'
  }
];

// ============================================================================
// VEGETABLES
// ============================================================================

export const vegetableIngredients: Partial<MasterIngredient>[] = [
  {
    slug: 'spinach',
    name: { en: 'Spinach', vi: 'Rau bina', ko: '시금치' },
    category: 'vegetables',
    subcategory: 'leafy_greens',
    allergens: noAllergens,
    intolerances: {
      histamine: true, // Can trigger histamine
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      low_fodmap: true,
      buddhist: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 23, protein: 2.9, carbohydrates: 3.6, sugar: 0.4, fiber: 2.2,
      fat: 0.4, saturatedFat: 0.1, sodium: 79
    },
    iconEmoji: '🥬',
    color: '#4CAF50'
  },
  {
    slug: 'kale',
    name: { en: 'Kale', vi: 'Cải xoăn', ko: '케일' },
    category: 'vegetables',
    subcategory: 'leafy_greens',
    allergens: noAllergens,
    intolerances: {
      fodmap: true, // Moderate FODMAP
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      buddhist: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 49, protein: 4.3, carbohydrates: 8.8, sugar: 2.3, fiber: 3.6,
      fat: 0.9, saturatedFat: 0.1, sodium: 38
    },
    iconEmoji: '🥗',
    color: '#2E7D32'
  },
  {
    slug: 'cucumber',
    name: { en: 'Cucumber', vi: 'Dưa chuột', ko: '오이' },
    category: 'vegetables',
    allergens: noAllergens,
    intolerances: noIntolerances,
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      low_fodmap: true,
      buddhist: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 16, protein: 0.7, carbohydrates: 3.6, sugar: 1.7, fiber: 0.5,
      fat: 0.1, saturatedFat: 0, sodium: 2
    },
    iconEmoji: '🥒',
    color: '#8BC34A'
  },
  {
    slug: 'carrot',
    name: { en: 'Carrot', vi: 'Cà rốt', ko: '당근' },
    category: 'vegetables',
    allergens: noAllergens,
    intolerances: noIntolerances,
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_fodmap: true,
      buddhist: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 41, protein: 0.9, carbohydrates: 9.6, sugar: 4.7, fiber: 2.8,
      fat: 0.2, saturatedFat: 0, sodium: 69
    },
    iconEmoji: '🥕',
    color: '#FF9800'
  },
  {
    slug: 'tomato',
    name: { en: 'Tomato', vi: 'Cà chua', ko: '토마토' },
    category: 'vegetables',
    allergens: {
      tomato: true, // Korea allergen
    },
    intolerances: {
      histamine: true, // High histamine
      salicylates: true,
      fodmap: true, // High FODMAP in large amounts
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      buddhist: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 18, protein: 0.9, carbohydrates: 3.9, sugar: 2.6, fiber: 1.2,
      fat: 0.2, saturatedFat: 0, sodium: 5
    },
    iconEmoji: '🍅',
    color: '#F44336'
  },
  {
    slug: 'celery',
    name: { en: 'Celery', vi: 'Cần tây', ko: '셀러리' },
    category: 'vegetables',
    allergens: {
      celery: true, // EU allergen
    },
    intolerances: {
      fodmap: true, // High FODMAP
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      buddhist: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 14, protein: 0.7, carbohydrates: 3, sugar: 1.3, fiber: 1.6,
      fat: 0.2, saturatedFat: 0, sodium: 80
    },
    iconEmoji: '🥬',
    color: '#8BC34A'
  }
];

// ============================================================================
// ALLIUMS (Buddhist Restricted)
// ============================================================================

export const alliumIngredients: Partial<MasterIngredient>[] = [
  {
    slug: 'garlic',
    name: { en: 'Garlic', vi: 'Tỏi', ko: '마늘' },
    category: 'alliums',
    allergens: noAllergens,
    intolerances: {
      fodmap: true, // High FODMAP
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      buddhist: false, // ⚠️ NOT suitable for Buddhist (5 pungent roots)
    },
    spice: { level: 1 },
    nutritionPer100g: {
      calories: 149, protein: 6.4, carbohydrates: 33.1, sugar: 1, fiber: 2.1,
      fat: 0.5, saturatedFat: 0.1, sodium: 17
    },
    iconEmoji: '🧄',
    color: '#F5F5DC'
  },
  {
    slug: 'onion',
    name: { en: 'Onion', vi: 'Hành tây', ko: '양파' },
    category: 'alliums',
    allergens: noAllergens,
    intolerances: {
      fodmap: true, // High FODMAP
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      buddhist: false, // ⚠️ NOT suitable for Buddhist (5 pungent roots)
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 40, protein: 1.1, carbohydrates: 9.3, sugar: 4.2, fiber: 1.7,
      fat: 0.1, saturatedFat: 0, sodium: 4
    },
    iconEmoji: '🧅',
    color: '#FFE082'
  },
  {
    slug: 'shallot',
    name: { en: 'Shallot', vi: 'Hành tím', ko: '샬롯' },
    category: 'alliums',
    allergens: noAllergens,
    intolerances: {
      fodmap: true, // High FODMAP
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      buddhist: false, // ⚠️ NOT suitable for Buddhist (5 pungent roots)
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 72, protein: 2.5, carbohydrates: 16.8, sugar: 7.9, fiber: 3.2,
      fat: 0.1, saturatedFat: 0, sodium: 12
    },
    iconEmoji: '🧅',
    color: '#9C27B0'
  },
  {
    slug: 'green-onion',
    name: { en: 'Green Onion / Scallion', vi: 'Hành lá', ko: '파' },
    category: 'alliums',
    allergens: noAllergens,
    intolerances: {
      fodmap: true, // White part is high FODMAP, green part is low
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      buddhist: false, // ⚠️ NOT suitable for Buddhist (5 pungent roots)
      low_fodmap: true, // Green part only
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 32, protein: 1.8, carbohydrates: 7.3, sugar: 2.3, fiber: 2.6,
      fat: 0.2, saturatedFat: 0, sodium: 16
    },
    iconEmoji: '🧅',
    color: '#4CAF50'
  },
  {
    slug: 'leek',
    name: { en: 'Leek', vi: 'Tỏi tây', ko: '리크' },
    category: 'alliums',
    allergens: noAllergens,
    intolerances: {
      fodmap: true, // High FODMAP (white part)
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      buddhist: false, // ⚠️ NOT suitable for Buddhist (5 pungent roots)
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 61, protein: 1.5, carbohydrates: 14.2, sugar: 3.9, fiber: 1.8,
      fat: 0.3, saturatedFat: 0, sodium: 20
    },
    iconEmoji: '🧅',
    color: '#C5E1A5'
  }
];

// ============================================================================
// HERBS & SPICES (Including GUDBRO Custom Allergens)
// ============================================================================

export const herbSpiceIngredients: Partial<MasterIngredient>[] = [
  {
    slug: 'coriander',
    name: { en: 'Coriander / Cilantro', vi: 'Rau mùi', ko: '고수', th: 'ผักชี' },
    category: 'herbs_spices',
    allergens: {
      coriander: true, // GUDBRO custom allergen (14% perceive as soap)
    },
    intolerances: noIntolerances,
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      low_fodmap: true,
      buddhist: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 23, protein: 2.1, carbohydrates: 3.7, sugar: 0.9, fiber: 2.8,
      fat: 0.5, saturatedFat: 0, sodium: 46
    },
    iconEmoji: '🌿',
    color: '#66BB6A'
  },
  {
    slug: 'chili-pepper',
    name: { en: 'Chili Pepper', vi: 'Ớt', ko: '고추', th: 'พริก' },
    category: 'herbs_spices',
    allergens: {
      chili_pepper: true, // GUDBRO custom allergen
    },
    intolerances: noIntolerances,
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      low_fodmap: true,
      buddhist: true,
    },
    spice: {
      level: 4,
      scoville: 30000, // Average for Thai chili
      description: { en: 'Hot/Spicy', vi: 'Cay', ko: '매운' },
    },
    nutritionPer100g: {
      calories: 40, protein: 2, carbohydrates: 8.8, sugar: 5.3, fiber: 1.5,
      fat: 0.4, saturatedFat: 0, sodium: 9
    },
    iconEmoji: '🌶️',
    color: '#F44336'
  },
  {
    slug: 'ginger',
    name: { en: 'Ginger', vi: 'Gừng', ko: '생강' },
    category: 'herbs_spices',
    allergens: noAllergens,
    intolerances: noIntolerances,
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      low_fodmap: true,
      buddhist: true,
    },
    spice: {
      level: 2,
      description: { en: 'Warm/Spicy', vi: 'Ấm/Cay nhẹ', ko: '따뜻한/매운' },
    },
    nutritionPer100g: {
      calories: 80, protein: 1.8, carbohydrates: 17.8, sugar: 1.7, fiber: 2,
      fat: 0.8, saturatedFat: 0.2, sodium: 13
    },
    iconEmoji: '🫚',
    color: '#FFE0B2'
  },
  {
    slug: 'turmeric',
    name: { en: 'Turmeric', vi: 'Nghệ', ko: '강황' },
    category: 'herbs_spices',
    allergens: noAllergens,
    intolerances: {
      salicylates: true,
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      low_fodmap: true,
      buddhist: true,
    },
    spice: {
      level: 1,
      description: { en: 'Mild/Earthy', vi: 'Nhẹ/Đất', ko: '순한/흙내' },
    },
    nutritionPer100g: {
      calories: 312, protein: 9.7, carbohydrates: 67.1, sugar: 3.2, fiber: 22.7,
      fat: 3.3, saturatedFat: 1.8, sodium: 27
    },
    iconEmoji: '🟡',
    color: '#FF8F00'
  },
  {
    slug: 'mustard-seeds',
    name: { en: 'Mustard Seeds', vi: 'Hạt mù tạt', ko: '겨자씨' },
    category: 'herbs_spices',
    allergens: {
      mustard: true, // EU allergen
    },
    intolerances: noIntolerances,
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      low_fodmap: true,
      buddhist: true,
    },
    spice: {
      level: 2,
      description: { en: 'Pungent', vi: 'Hăng', ko: '톡 쏘는' },
    },
    nutritionPer100g: {
      calories: 508, protein: 26.1, carbohydrates: 28.1, sugar: 6.8, fiber: 12.2,
      fat: 36.2, saturatedFat: 2.2, sodium: 13
    },
    iconEmoji: '🟡',
    color: '#FDD835'
  },
  {
    slug: 'sesame-seeds',
    name: { en: 'Sesame Seeds', vi: 'Hạt mè', ko: '참깨' },
    category: 'herbs_spices',
    allergens: {
      sesame: true, // EU allergen
    },
    intolerances: noIntolerances,
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: true,
      low_carb: true,
      low_fodmap: true,
      buddhist: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 573, protein: 17.7, carbohydrates: 23.4, sugar: 0.3, fiber: 11.8,
      fat: 49.7, saturatedFat: 7, sodium: 11
    },
    iconEmoji: '🟤',
    color: '#D7CCC8'
  }
];

// ============================================================================
// NUTS & SEEDS
// ============================================================================

export const nutSeedIngredients: Partial<MasterIngredient>[] = [
  {
    slug: 'peanuts',
    name: { en: 'Peanuts', vi: 'Đậu phộng', ko: '땅콩' },
    category: 'nuts_seeds',
    allergens: {
      peanuts: true, // Major allergen worldwide
    },
    intolerances: noIntolerances,
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: false, // Contains peanuts (technically a legume but treated as nut)
      low_carb: true,
      buddhist: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 567, protein: 25.8, carbohydrates: 16.1, sugar: 4, fiber: 8.5,
      fat: 49.2, saturatedFat: 6.3, sodium: 18
    },
    iconEmoji: '🥜',
    color: '#D4A574'
  },
  {
    slug: 'almonds',
    name: { en: 'Almonds', vi: 'Hạnh nhân', ko: '아몬드' },
    category: 'nuts_seeds',
    allergens: {
      tree_nuts: true,
    },
    intolerances: noIntolerances,
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: false,
      low_carb: true,
      low_fodmap: true, // Low FODMAP in small amounts (10 nuts)
      buddhist: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 579, protein: 21.2, carbohydrates: 21.7, sugar: 4.4, fiber: 12.5,
      fat: 49.9, saturatedFat: 3.8, sodium: 1
    },
    iconEmoji: '🌰',
    color: '#D7B899'
  },
  {
    slug: 'cashews',
    name: { en: 'Cashews', vi: 'Hạt điều', ko: '캐슈넛' },
    category: 'nuts_seeds',
    allergens: {
      tree_nuts: true,
    },
    intolerances: {
      fodmap: true, // High FODMAP
    },
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: false,
      low_carb: true,
      low_fodmap: false,
      buddhist: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 553, protein: 18.2, carbohydrates: 30.2, sugar: 5.9, fiber: 3.3,
      fat: 43.9, saturatedFat: 7.8, sodium: 12
    },
    iconEmoji: '🌰',
    color: '#FFE4B5'
  },
  {
    slug: 'pine-nuts',
    name: { en: 'Pine Nuts', vi: 'Hạt thông', ko: '잣' },
    category: 'nuts_seeds',
    allergens: {
      tree_nuts: true,
      pine_nuts: true, // Korea allergen
    },
    intolerances: noIntolerances,
    dietaryFlags: {
      ...veganFlags,
      gluten_free: true,
      nut_free: false,
      low_carb: true,
      low_fodmap: true,
      buddhist: true,
    },
    spice: defaultSpice,
    nutritionPer100g: {
      calories: 673, protein: 13.7, carbohydrates: 13.1, sugar: 3.6, fiber: 3.7,
      fat: 68.4, saturatedFat: 4.9, sodium: 2
    },
    iconEmoji: '🌰',
    color: '#F5DEB3'
  }
];

// ============================================================================
// EXPORT ALL INGREDIENTS
// ============================================================================

export const allIngredients: Partial<MasterIngredient>[] = [
  ...coffeeTeaIngredients,
  ...dairyIngredients,
  ...fruitIngredients,
  ...sweetenerIngredients,
  ...toppingIngredients,
  ...proteinIngredients,
  ...vegetableIngredients,
  ...alliumIngredients,
  ...herbSpiceIngredients,
  ...nutSeedIngredients,
];

export default allIngredients;
