// ============================================
// HOT BEVERAGES Types - GUDBRO Database Standards v1.3
// ============================================

export type HotBeverageCategory =
  | 'chocolate'
  | 'tea_latte'
  | 'spiced'
  | 'specialty'
  | 'traditional';

export type HotBeverageStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'premium'
  | 'seasonal';

export type HotBeverageBaseType =
  | 'milk'
  | 'water'
  | 'oat_milk'
  | 'almond_milk'
  | 'coconut_milk'
  | 'cream';

export type HotBeverageFlavorProfile =
  | 'sweet'
  | 'spiced'
  | 'earthy'
  | 'creamy'
  | 'rich'
  | 'herbal';

export type HotBeverageServingStyle =
  | 'mug'
  | 'cup'
  | 'glass'
  | 'bowl';

export interface HotBeverageItem {
  // Identification
  id: string;                           // HBV_{NAME}
  slug: string;                         // lowercase-hyphens

  // Info (English only)
  name: string;
  description: string;

  // Classification
  category: HotBeverageCategory;
  status: HotBeverageStatus;

  // Hot beverage-specific
  base_type: HotBeverageBaseType;
  flavor_profile: HotBeverageFlavorProfile;
  serving_size_ml: number;
  serving_style: HotBeverageServingStyle;
  optimal_temp_c?: number;

  // Ingredients
  ingredient_ids: string[];             // ING_* references

  // Nutritional Info
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  sugar_g?: number;
  caffeine_mg?: number;

  // Product Flags
  has_foam: boolean;
  has_whipped_cream: boolean;
  is_caffeinated: boolean;

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
