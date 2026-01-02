// ============================================
// BAKERY Types - GUDBRO Database Standards v1.3
// ============================================

export type BakeryCategory =
  | 'pastry'
  | 'bread'
  | 'cookie'
  | 'cake'
  | 'donut'
  | 'savory';

export type BakeryStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'premium'
  | 'seasonal';

export type BakeryBaseType =
  | 'yeast'
  | 'puff'
  | 'shortcrust'
  | 'choux'
  | 'brioche'
  | 'sourdough';

export type BakeryFlavorProfile =
  | 'sweet'
  | 'buttery'
  | 'fruity'
  | 'chocolatey'
  | 'nutty'
  | 'savory';

export type BakeryServingStyle =
  | 'individual'
  | 'slice'
  | 'whole'
  | 'box';

export interface BakeryItem {
  // Identification
  id: string;                           // BAK_{NAME}
  slug: string;                         // lowercase-hyphens

  // Info (English only)
  name: string;
  description: string;

  // Classification
  category: BakeryCategory;
  status: BakeryStatus;

  // Bakery-specific
  base_type: BakeryBaseType;
  flavor_profile: BakeryFlavorProfile;
  serving_size_g: number;
  serving_style: BakeryServingStyle;

  // Ingredients
  ingredient_ids: string[];             // ING_* references

  // Nutritional Info
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  sugar_g?: number;
  fiber_g?: number;

  // Product Flags
  has_filling: boolean;
  has_frosting: boolean;
  is_freshly_baked: boolean;

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
