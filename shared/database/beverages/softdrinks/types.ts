// ============================================
// SOFT DRINKS Types - GUDBRO Database Standards v1.3
// ============================================

export type SoftDrinkCategory =
  | 'cola'
  | 'lemon_lime'
  | 'orange'
  | 'ginger'
  | 'tonic_soda'
  | 'energy'
  | 'other';

export type SoftDrinkStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'signature'
  | 'seasonal'
  | 'premium';

export type ServingStyle =
  | 'can'
  | 'bottle'
  | 'glass'
  | 'fountain';

export interface SoftDrinkItem {
  // Identification
  id: string;                     // SDR_{NAME}
  slug: string;                   // lowercase-hyphens

  // Info (English only)
  name: string;
  description: string;

  // Classification
  category: SoftDrinkCategory;
  status: SoftDrinkStatus;
  brand: string;

  // Serving
  serving_size_ml: number;
  serving_style: ServingStyle;

  // Ingredients
  ingredient_ids: string[];       // ING_* references

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

  // Sistema 5 Dimensioni - Nutrition
  calories_per_serving: number;
  sugar_g: number;
  caffeine_mg: number;

  // Sistema 5 Dimensioni - Spice (always 0 for soft drinks)
  spice_level: number;

  // Characteristics
  is_sugar_free: boolean;
  is_diet: boolean;
  is_carbonated: boolean;

  // Metadata
  tags: string[];
  popularity: number;             // 0-100
  origin_country: string;

  // Timestamps (auto)
  created_at?: string;
  updated_at?: string;
}
