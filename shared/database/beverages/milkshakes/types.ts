// ============================================
// MILKSHAKES Types - GUDBRO Database Standards v1.3
// ============================================

export type MilkshakeCategory =
  | 'classic'
  | 'premium'
  | 'specialty'
  | 'boozy'
  | 'healthy';

export type MilkshakeStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'premium'
  | 'seasonal';

export type MilkshakePrimaryFlavor =
  | 'chocolate'
  | 'vanilla'
  | 'strawberry'
  | 'caramel'
  | 'coffee'
  | 'peanut_butter'
  | 'fruit'
  | 'cookies'
  | 'other';

export type MilkshakeServingStyle =
  | 'glass'
  | 'cup'
  | 'mason_jar'
  | 'tall_glass';

export interface MilkshakeItem {
  // Identification
  id: string;                           // MKS_{NAME}
  slug: string;                         // lowercase-hyphens

  // Info (English only)
  name: string;
  description: string;

  // Classification
  category: MilkshakeCategory;
  status: MilkshakeStatus;

  // Milkshake-specific
  primary_flavor: MilkshakePrimaryFlavor;
  serving_size_ml: number;
  serving_style: MilkshakeServingStyle;

  // Ingredients
  ingredient_ids: string[];             // ING_* references

  // Nutritional Info
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  sugar_g?: number;

  // Topping & extras
  has_whipped_cream: boolean;
  has_toppings: boolean;
  is_thick: boolean;

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
