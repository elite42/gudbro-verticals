// ============================================
// BREAKFAST Types - GUDBRO Database Standards v1.1
// ============================================

/**
 * Categories for breakfast dishes
 * Organized by type/style
 */
export type BreakfastCategory =
  | 'eggs'              // Eggs Benedict, Omelettes, Scrambled, Fried, Poached
  | 'pancakes_waffles'  // Pancakes, Waffles, French Toast, Crepes
  | 'pastries'          // Croissants, Danish, Muffins, Scones
  | 'cereals_bowls'     // Granola, Acai, Smoothie bowls, Oatmeal, Porridge
  | 'savory'            // Full English, Continental, Breakfast Burrito, Hash
  | 'international';    // Japanese, Middle Eastern, Latin American breakfasts

/**
 * Origin cuisines for breakfast dishes
 */
export type BreakfastOrigin =
  | 'american'
  | 'british'
  | 'french'
  | 'italian'
  | 'spanish'
  | 'german'
  | 'japanese'
  | 'korean'
  | 'chinese'
  | 'mexican'
  | 'middle_eastern'
  | 'israeli'
  | 'turkish'
  | 'brazilian'
  | 'australian'
  | 'scandinavian'
  | 'indian'
  | 'international';

/**
 * Meal timing
 */
export type MealTime =
  | 'early_breakfast'   // 6-8am
  | 'breakfast'         // 8-10am
  | 'brunch'            // 10am-12pm
  | 'all_day';          // Available all day

/**
 * Status values following DATABASE-STANDARDS v1.1
 */
export type BreakfastStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'signature'
  | 'seasonal'
  | 'premium'
  | 'traditional';

/**
 * Main interface for breakfast items
 * Follows DATABASE-STANDARDS v1.1 (Sistema 5 Dimensioni)
 */
export interface BreakfastItem {
  // IDENTIFICATION
  id: string;                     // BRK_{NAME} format
  slug: string;                   // lowercase-hyphens

  // INFO BASE (English only)
  name: string;                   // Title Case
  description: string;            // English, detailed

  // CLASSIFICATION
  category: BreakfastCategory;
  origin: BreakfastOrigin;
  meal_time: MealTime;
  status: BreakfastStatus;

  // INGREDIENTS
  ingredient_ids: string[];       // ING_* references

  // SISTEMA 5 DIMENSIONI - Allergens
  allergens: string[];            // lowercase array

  // SISTEMA 5 DIMENSIONI - Dietary
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_nut_free: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
  is_halal: boolean;
  is_kosher: boolean;

  // SISTEMA 5 DIMENSIONI - Nutrition
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;

  // SISTEMA 5 DIMENSIONI - Spice
  spice_level: number;            // 0-5

  // METADATA
  tags: string[];
  popularity: number;             // 0-100 (NOT 1-5!)

  // OPTIONAL FIELDS
  serving_size_g?: number;        // Portion size in grams
  prep_time_minutes?: number;     // Preparation time
  is_sweet: boolean;              // Sweet vs savory classification

  // TIMESTAMPS (auto-generated)
  created_at?: string;
  updated_at?: string;
}

/**
 * Statistics type for the collection
 */
export interface BreakfastStats {
  total: number;
  byCategory: Record<BreakfastCategory, number>;
  byOrigin: Record<BreakfastOrigin, number>;
  byStatus: Record<BreakfastStatus, number>;
}
