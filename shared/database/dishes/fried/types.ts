// ============================================
// FRIED FOODS Types - GUDBRO Database Standards v1.1
// ============================================

/**
 * Categories for fried foods
 * Organized by main ingredient/type
 */
export type FriedCategory =
  | 'fried_chicken'      // Wings, tenders, nuggets, fried chicken varieties
  | 'fried_seafood'      // Calamari, fish & chips, shrimp, crab cakes
  | 'fried_vegetables'   // Tempura, onion rings, zucchini sticks, fried pickles
  | 'fried_appetizers'   // Mozzarella sticks, jalapeno poppers, arancini
  | 'fried_snacks'       // Fries, churros, donuts, spring rolls
  | 'fried_international'; // Falafel, samosas, pakoras, empanadas, croquettes

/**
 * Origin cuisines for fried dishes
 */
export type FriedOrigin =
  | 'american'
  | 'italian'
  | 'japanese'
  | 'korean'
  | 'chinese'
  | 'thai'
  | 'indian'
  | 'british'
  | 'spanish'
  | 'french'
  | 'middle_eastern'
  | 'latin_american'
  | 'southern_us'
  | 'international';

/**
 * Frying methods
 */
export type FryingMethod =
  | 'deep_fried'
  | 'pan_fried'
  | 'shallow_fried'
  | 'air_fried'
  | 'double_fried';

/**
 * Status values following DATABASE-STANDARDS v1.1
 */
export type FriedStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'signature'
  | 'seasonal'
  | 'premium'
  | 'traditional';

/**
 * Main interface for fried food items
 * Follows DATABASE-STANDARDS v1.1 (Sistema 5 Dimensioni)
 */
export interface FriedItem {
  // IDENTIFICATION
  id: string;                     // FRD_{NAME} format
  slug: string;                   // lowercase-hyphens

  // INFO BASE (English only)
  name: string;                   // Title Case
  description: string;            // English, detailed

  // CLASSIFICATION
  category: FriedCategory;
  origin: FriedOrigin;
  frying_method: FryingMethod;
  status: FriedStatus;

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
  dipping_sauces?: string[];      // Suggested dipping sauces
  crispy_rating?: number;         // 1-5 crispiness level

  // TIMESTAMPS (auto-generated)
  created_at?: string;
  updated_at?: string;
}

/**
 * Statistics type for the collection
 */
export interface FriedStats {
  total: number;
  byCategory: Record<FriedCategory, number>;
  byOrigin: Record<FriedOrigin, number>;
  byStatus: Record<FriedStatus, number>;
}
