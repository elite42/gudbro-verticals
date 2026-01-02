// ============================================
// SMOOTHIES Types - GUDBRO Database Standards v1.3
// ============================================

export type SmoothieCategory =
  | 'fruit'
  | 'green'
  | 'protein'
  | 'superfood'
  | 'tropical'
  | 'bowl';

export type SmoothieStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'premium'
  | 'seasonal';

export type SmoothieBaseType =
  | 'milk'
  | 'yogurt'
  | 'juice'
  | 'coconut_water'
  | 'almond_milk'
  | 'oat_milk'
  | 'water'
  | 'ice';

export type SmoothieFlavorProfile =
  | 'sweet'
  | 'tangy'
  | 'tropical'
  | 'earthy'
  | 'creamy'
  | 'refreshing';

export type SmoothieServingStyle =
  | 'cup'
  | 'glass'
  | 'bowl'
  | 'jar';

export interface SmoothieItem {
  // Identification
  id: string;                           // SMO_{NAME}
  slug: string;                         // lowercase-hyphens

  // Info (English only)
  name: string;
  description: string;

  // Classification
  category: SmoothieCategory;
  status: SmoothieStatus;

  // Smoothie-specific
  base_type: SmoothieBaseType;
  flavor_profile: SmoothieFlavorProfile;
  serving_size_ml: number;
  serving_style: SmoothieServingStyle;

  // Ingredients
  ingredient_ids: string[];             // ING_* references

  // Nutritional Info
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  fiber_g?: number;
  sugar_g?: number;

  // Product Flags
  has_protein_boost: boolean;
  is_meal_replacement: boolean;
  is_blended: boolean;

  // Sistema 5 Dimensioni - Allergens
  allergens: string[];

  // Sistema 5 Dimensioni - Dietary
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_nut_free: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
  is_halal: boolean;
  is_kosher: boolean;

  // Sistema 5 Dimensioni - Spice
  spice_level: number;                  // 0-5

  // Metadata
  tags: string[];
  popularity: number;                   // 0-100
  origin_country?: string;

  // Timestamps (auto)
  created_at?: string;
  updated_at?: string;
}
