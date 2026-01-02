// ============================================
// SAUCES Types - GUDBRO Database Standards v1.3
// ============================================

export type SauceCategory =
  | 'classic'        // Ketchup, Mayo, Mustard
  | 'spicy'          // Hot sauce, Sriracha, Chipotle
  | 'creamy'         // Ranch, Aioli, Tartar
  | 'asian'          // Soy, Teriyaki, Hoisin
  | 'mediterranean'  // Tzatziki, Hummus, Tahini
  | 'meat'           // Gravy, Chimichurri, Peppercorn
  | 'sweet';         // Honey mustard, Sweet chili, Caramel

export type SauceStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'premium'
  | 'seasonal';

export type SauceServingStyle =
  | 'portion'        // Small cup/ramekin
  | 'bottle'         // Table bottle
  | 'packet'         // Individual packet
  | 'side';          // Side dish

export interface SauceItem {
  // Identification
  id: string;                           // SAU_{NAME}
  slug: string;                         // lowercase-hyphens

  // Info (English only)
  name: string;
  description: string;

  // Classification
  category: SauceCategory;
  status: SauceStatus;

  // Sauce-specific
  serving_size_ml: number;
  serving_style: SauceServingStyle;
  heat_level: number;                   // 0-5 (0=none, 5=extreme)

  // Ingredients
  ingredient_ids: string[];             // ING_* references

  // Nutritional Info (per serving)
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  sugar_g?: number;
  sodium_mg?: number;

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
