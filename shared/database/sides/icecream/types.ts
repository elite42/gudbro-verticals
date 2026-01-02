// ============================================
// ICE CREAM Types - GUDBRO Database Standards v1.3
// ============================================

export type IceCreamCategory =
  | 'gelato'
  | 'sorbet'
  | 'frozen_yogurt'
  | 'ice_cream'
  | 'sundae'
  | 'specialty';

export type IceCreamStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'premium'
  | 'seasonal';

export type IceCreamBaseType =
  | 'cream'
  | 'milk'
  | 'yogurt'
  | 'fruit'
  | 'coconut'
  | 'nut';

export type IceCreamFlavorProfile =
  | 'sweet'
  | 'fruity'
  | 'chocolatey'
  | 'nutty'
  | 'creamy'
  | 'tangy';

export type IceCreamServingStyle =
  | 'cone'
  | 'cup'
  | 'bowl'
  | 'stick'
  | 'sandwich';

export interface IceCreamItem {
  // Identification
  id: string;                           // ICE_{NAME}
  slug: string;                         // lowercase-hyphens

  // Info (English only)
  name: string;
  description: string;

  // Classification
  category: IceCreamCategory;
  status: IceCreamStatus;

  // Ice cream-specific
  base_type: IceCreamBaseType;
  flavor_profile: IceCreamFlavorProfile;
  serving_size_ml: number;
  serving_style: IceCreamServingStyle;

  // Ingredients
  ingredient_ids: string[];             // ING_* references

  // Nutritional Info
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  sugar_g?: number;

  // Product Flags
  has_topping: boolean;
  has_sauce: boolean;
  is_artisanal: boolean;

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
