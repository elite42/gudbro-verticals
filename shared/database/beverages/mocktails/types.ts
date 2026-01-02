// ============================================
// MOCKTAILS Types - GUDBRO Database Standards v1.3
// ============================================

export type MocktailCategory =
  | 'virgin_classics'      // Virgin versions of classic cocktails
  | 'fruit_based'          // Fresh fruit-forward mocktails
  | 'sparkling'            // Carbonated and effervescent
  | 'creamy'               // Cream or coconut based
  | 'tea_based'            // Tea infusions (Arnold Palmer, etc.)
  | 'herbal'               // Herb-focused (mint, basil, etc.)
  | 'tropical'             // Tropical fruit combinations
  | 'citrus';              // Citrus-forward drinks

export type MocktailStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'signature'
  | 'seasonal'
  | 'premium';

export type MocktailBase =
  | 'soda'
  | 'juice'
  | 'tea'
  | 'coconut'
  | 'cream'
  | 'tonic'
  | 'ginger_ale'
  | 'sparkling_water';

export type GlassType =
  | 'highball'
  | 'collins'
  | 'hurricane'
  | 'martini'
  | 'margarita'
  | 'wine'
  | 'champagne'
  | 'rocks'
  | 'copper_mug'
  | 'mason_jar';

export interface MocktailItem {
  // Identification
  id: string;                     // MCK_{NAME}
  slug: string;                   // lowercase-hyphens

  // Info (English only)
  name: string;
  description: string;

  // Classification
  category: MocktailCategory;
  status: MocktailStatus;
  base: MocktailBase;
  glass_type: GlassType;

  // Serving
  serving_size_ml: number;

  // Ingredients
  ingredient_ids: string[];       // ING_* references

  // Garnish
  garnish: string;

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

  // Sistema 5 Dimensioni - Spice (usually 0 for mocktails)
  spice_level: number;

  // Characteristics
  is_carbonated: boolean;
  is_frozen: boolean;
  is_kid_friendly: boolean;

  // Flavor profile
  flavor_profile: string[];       // e.g., ['sweet', 'citrus', 'refreshing']

  // Metadata
  tags: string[];
  popularity: number;             // 0-100
  origin_country: string;

  // Inspiration (original cocktail if virgin version)
  inspired_by?: string;

  // Timestamps (auto)
  created_at?: string;
  updated_at?: string;
}
