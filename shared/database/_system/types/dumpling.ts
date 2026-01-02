/**
 * GUDBRO Dumplings & Gnocchi Types
 *
 * Comprehensive type definitions for dumplings database
 * Supports Italian gnocchi/filled pasta, Asian dumplings, and international varieties
 *
 * Sistema 5 Dimensioni v3.0 integrated
 */

import type { MultiLangText } from './index';

// ============================================================================
// ENUMS & CONSTANTS
// ============================================================================

/** Dumpling style/origin category */
export type DumplingStyle =
  | 'italian_gnocchi'      // Potato gnocchi, gnudi
  | 'italian_filled'       // Ravioli, tortellini, agnolotti
  | 'asian_chinese'        // Jiaozi, baozi, wontons
  | 'asian_japanese'       // Gyoza
  | 'asian_korean'         // Mandu
  | 'asian_other'          // Dim sum, momos
  | 'eastern_european'     // Pierogi, pelmeni, vareniki
  | 'south_american'       // Empanadas
  | 'middle_eastern'       // Manti
  | 'fusion'               // Modern fusion
  | 'signature';           // House specialties

/** Dumpling wrapper/dough type */
export type DumplingDough =
  | 'potato'               // Gnocchi
  | 'ricotta'              // Gnudi
  | 'semolina'             // Pasta
  | 'egg_pasta'            // Fresh pasta
  | 'wheat'                // Asian wheat wrappers
  | 'rice'                 // Rice paper, har gow
  | 'glutinous_rice'       // Mochi-style
  | 'cornmeal'             // Empanadas
  | 'yeast'                // Baozi
  | 'other';

/** Cooking method */
export type DumplingCookingMethod =
  | 'boiled'               // Most gnocchi, pelmeni
  | 'pan_fried'            // Potstickers, gyoza
  | 'steamed'              // Dim sum, baozi
  | 'deep_fried'           // Spring rolls, samosas
  | 'baked'                // Empanadas
  | 'soup'                 // Wontons in soup
  | 'sauteed';             // Gnocchi with sauce

/** Filling style */
export type FillingStyle =
  | 'meat'                 // Pork, beef, chicken
  | 'seafood'              // Shrimp, fish
  | 'vegetable'            // Veggie filling
  | 'cheese'               // Ricotta, etc.
  | 'mixed'                // Combination
  | 'sweet'                // Dessert dumplings
  | 'none';                // Unfilled (gnocchi)

/** Portion sizes */
export type DumplingPortionSize =
  | 'small'                // Appetizer portion (4-6 pcs)
  | 'regular'              // Standard (8-10 pcs)
  | 'large'                // Main course (12-15 pcs)
  | 'sharing';             // Family style

/** Status */
export type DumplingStatus =
  | 'active'
  | 'classic'
  | 'traditional'
  | 'modern'
  | 'signature'
  | 'seasonal'
  | 'inactive';

// ============================================================================
// MAIN DUMPLING TYPE
// ============================================================================

export interface Dumpling {
  // IDENTIFIERS
  id: string;
  slug: string;
  stable_key?: string;

  // BASIC INFO
  name: MultiLangText;
  description: MultiLangText;
  tagline?: MultiLangText;

  // CLASSIFICATION
  status: DumplingStatus;
  style: DumplingStyle;
  tags: string[];

  // ORIGIN
  origin: {
    country: string;
    country_code?: string;
    region?: string;
    city?: string;
    notes?: string;
  };

  // HISTORY (optional)
  history?: {
    story?: MultiLangText;
    fun_fact?: MultiLangText;
  };

  // WRAPPER/DOUGH
  wrapper: {
    type: DumplingDough;
    is_homemade?: boolean;
    is_gluten_free?: boolean;
    notes?: string;
  };

  // FILLING
  filling?: {
    style: FillingStyle;
    main_ingredients: string[];
    seasoning?: string[];
    is_signature?: boolean;
  };

  // COOKING
  cooking: {
    method: DumplingCookingMethod;
    time_minutes: number;
    difficulty: 'easy' | 'medium' | 'hard';
    requires_special_equipment?: boolean;
    equipment?: string[];
    technique_notes?: string;
  };

  // SAUCE/ACCOMPANIMENT
  sauce?: {
    name: string;
    ingredients: string[];
    is_signature?: boolean;
    is_spicy?: boolean;
  };

  // SERVING
  serving: {
    portion_size?: DumplingPortionSize;
    pieces_per_serving?: number;
    temperature: 'hot' | 'warm' | 'cold';
    presentation?: 'plated' | 'steamer_basket' | 'bowl' | 'sharing_platter';
    is_shareable?: boolean;
    recommended_pairing?: string[];
    garnish?: string[];
  };

  // DIETARY & ALLERGENS (Sistema 5 Dimensioni)
  dietary: {
    is_vegetarian: boolean;
    is_vegan: boolean;
    is_gluten_free: boolean;
    is_dairy_free: boolean;
    is_nut_free: boolean;
    is_halal: boolean;
    is_kosher: boolean;
    is_low_carb: boolean;
    is_keto_friendly: boolean;
    is_high_protein: boolean;
    allergens: string[];
    spice_level?: 0 | 1 | 2 | 3 | 4 | 5;
    calories_estimate?: number;
    protein_g?: number;
    carbs_g?: number;
    fat_g?: number;
    fiber_g?: number;
  };

  // PRICING
  pricing?: {
    cost_level: 'low' | 'medium' | 'high' | 'premium';
    suggested_price_usd?: number;
  };

  // AVAILABILITY
  availability?: {
    is_seasonal: boolean;
    seasons?: ('spring' | 'summer' | 'fall' | 'winter' | 'all_year')[];
  };

  // CUSTOMIZATION
  customization?: {
    add_protein?: boolean;
    make_vegetarian?: boolean;
    make_vegan?: boolean;
    spice_adjustable?: boolean;
  };

  // METADATA
  source_url?: string;
  source_note?: string;
  version?: number;
  created_at?: string;
  updated_at?: string;
}
