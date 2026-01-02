// ============================================
// MOROCCAN Types - GUDBRO Database Standards v1.3
// ============================================

export type MoroccanCategory =
  | 'tagine'        // Slow-cooked stews
  | 'couscous'      // Couscous dishes
  | 'soup'          // Harira and other soups
  | 'pastry'        // B'stilla, briouats, msemmen
  | 'grill'         // Mechoui, kefta, brochettes
  | 'salad'         // Zaalouk, taktouka, moroccan salads
  | 'bread';        // Moroccan breads

export type MoroccanStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'signature'
  | 'traditional';

export interface MoroccanItem {
  // Identification
  id: string;                     // MOR_{NAME}
  slug: string;                   // lowercase-hyphens

  // Info (English only)
  name: string;
  description: string;

  // Classification
  category: MoroccanCategory;
  status: MoroccanStatus;

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
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;

  // Sistema 5 Dimensioni - Spice
  spice_level: number;            // 0-5

  // Metadata
  tags: string[];
  popularity: number;             // 0-100
  origin_region?: string;         // Fes, Marrakech, Casablanca, etc.

  // Timestamps (auto)
  created_at?: string;
  updated_at?: string;
}
