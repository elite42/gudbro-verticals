// ============================================
// VEGETARIAN Types - GUDBRO Database Standards v1.1
// ============================================

/**
 * Vegetarian dish categories
 */
export type VegetarianCategory =
  | 'tofu_dishes'        // Tofu-based mains
  | 'tempeh_dishes'      // Tempeh-based mains
  | 'seitan_dishes'      // Seitan (wheat gluten) mains
  | 'legume_dishes'      // Bean, lentil, chickpea mains
  | 'grain_bowls'        // Buddha bowls, grain bowls
  | 'vegetable_mains'    // Cauliflower steak, mushroom dishes
  | 'indian_mains'       // Paneer, dal, curries
  | 'asian_mains'        // Stir-fries, curries, noodles
  | 'mediterranean_mains'; // Falafel, stuffed vegetables

/**
 * Product status
 */
export type VegetarianStatus =
  | 'active'
  | 'popular'
  | 'signature'
  | 'classic'
  | 'premium'
  | 'seasonal';

/**
 * Protein source type
 */
export type ProteinSource =
  | 'tofu'
  | 'tempeh'
  | 'seitan'
  | 'legumes'        // beans, lentils, chickpeas
  | 'paneer'
  | 'eggs'
  | 'mushrooms'
  | 'jackfruit'
  | 'cauliflower'
  | 'nuts_seeds'
  | 'quinoa'
  | 'mixed';

/**
 * Cuisine origin
 */
export type VegetarianCuisine =
  | 'indian'
  | 'thai'
  | 'chinese'
  | 'japanese'
  | 'korean'
  | 'vietnamese'
  | 'mediterranean'
  | 'middle_eastern'
  | 'mexican'
  | 'american'
  | 'italian'
  | 'ethiopian'
  | 'international'
  | 'fusion';

/**
 * Vegetarian Item interface
 * Follows DATABASE-STANDARDS v1.1
 */
export interface VegetarianItem {
  // IDENTIFICATION
  id: string;                     // VEG_{NAME} format
  slug: string;                   // lowercase-hyphens

  // INFO BASE (English only)
  name: string;                   // Title Case
  description: string;            // Full description in English

  // CLASSIFICATION
  category: VegetarianCategory;
  status: VegetarianStatus;

  // VEGETARIAN-SPECIFIC FIELDS
  cuisine: VegetarianCuisine;
  protein_source: ProteinSource;
  is_vegan: boolean;              // true if no dairy/eggs
  is_high_protein: boolean;       // 15g+ protein per serving
  cooking_method?: string;        // grilled, stir-fried, baked, etc.

  // INGREDIENTS
  ingredient_ids: string[];       // ING_* format

  // SISTEMA 5 DIMENSIONI - ALLERGENS
  allergens: string[];            // gluten, soy, nuts, sesame, etc.

  // SISTEMA 5 DIMENSIONI - DIETARY FLAGS
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_nut_free: boolean;
  is_soy_free: boolean;
  is_vegetarian: boolean;         // always true for this database
  is_halal: boolean;
  is_kosher: boolean;

  // SISTEMA 5 DIMENSIONI - NUTRITION
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  fiber_g?: number;

  // SISTEMA 5 DIMENSIONI - SPICE
  spice_level: number;            // 0-5

  // METADATA
  tags: string[];                 // vegan, high-protein, gluten-free, etc.
  popularity: number;             // 0-100
}

// ============================================
// EXPORTS
// ============================================

export const vegetarianCategories: VegetarianCategory[] = [
  'tofu_dishes',
  'tempeh_dishes',
  'seitan_dishes',
  'legume_dishes',
  'grain_bowls',
  'vegetable_mains',
  'indian_mains',
  'asian_mains',
  'mediterranean_mains',
];

export const proteinSources: ProteinSource[] = [
  'tofu',
  'tempeh',
  'seitan',
  'legumes',
  'paneer',
  'eggs',
  'mushrooms',
  'jackfruit',
  'cauliflower',
  'nuts_seeds',
  'quinoa',
  'mixed',
];

export const vegetarianCuisines: VegetarianCuisine[] = [
  'indian',
  'thai',
  'chinese',
  'japanese',
  'korean',
  'vietnamese',
  'mediterranean',
  'middle_eastern',
  'mexican',
  'american',
  'italian',
  'ethiopian',
  'international',
  'fusion',
];
