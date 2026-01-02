/**
 * ============================================
 * GUDBRO Steaks & Grills Database - Type Definitions
 * Aligned to DATABASE-STANDARDS v1.0
 * ============================================
 *
 * Sistema 5 Dimensioni integrated
 * Categories: Beef Steaks, Lamb & Game, Poultry Grills, Ribs & BBQ, International Grills
 */

// === CATEGORY & STYLE ENUMS ===

export type SteaksCategory =
  | 'beef_steak'           // Classic beef cuts
  | 'lamb_game'            // Lamb, venison, game meats
  | 'poultry_grill'        // Grilled chicken, duck, etc.
  | 'ribs_bbq'             // BBQ ribs and smoked meats
  | 'international_grill'; // Mixed grills, skewers, world cuisines

export type SteaksStyle =
  | 'american'
  | 'italian'
  | 'french'
  | 'argentinian'
  | 'brazilian'
  | 'japanese'
  | 'korean'
  | 'british'
  | 'australian'
  | 'spanish'
  | 'german'
  | 'middle_eastern'
  | 'turkish'
  | 'persian'
  | 'portuguese'
  | 'jamaican'
  | 'indian'
  | 'international';

export type SteaksStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'signature'
  | 'seasonal'
  | 'premium'
  | 'traditional';

// === COOKING ENUMS ===

export type CookingMethod =
  | 'grilled'
  | 'pan_seared'
  | 'broiled'
  | 'roasted'
  | 'smoked'
  | 'bbq'
  | 'sous_vide'
  | 'reverse_sear'
  | 'braised'
  | 'charcoal'
  | 'wood_fired'
  | 'rotisserie'
  | 'tandoor'
  | 'open_flame';

export type Doneness =
  | 'blue_rare'
  | 'rare'
  | 'medium_rare'
  | 'medium'
  | 'medium_well'
  | 'well_done'
  | 'varies';

export type GradeQuality =
  | 'wagyu_a5'
  | 'wagyu_a4'
  | 'usda_prime'
  | 'usda_choice'
  | 'usda_select'
  | 'grass_fed'
  | 'grain_fed'
  | 'organic'
  | 'dry_aged'
  | 'wet_aged'
  | 'standard';

// === CUT TYPES ===

export type BeefCut =
  | 'ribeye'
  | 'filet_mignon'
  | 'new_york_strip'
  | 'porterhouse'
  | 't_bone'
  | 'sirloin'
  | 'flank'
  | 'skirt'
  | 'hanger'
  | 'flat_iron'
  | 'tomahawk'
  | 'prime_rib'
  | 'chateaubriand'
  | 'bavette'
  | 'picanha'
  | 'tri_tip'
  | 'brisket'
  | 'short_ribs'
  | 'other';

export type LambCut =
  | 'rack'
  | 'chops'
  | 'leg'
  | 'shoulder'
  | 'shank'
  | 'loin'
  | 'saddle'
  | 'cutlets'
  | 'other';

export type PorkCut =
  | 'chops'
  | 'tenderloin'
  | 'ribs'
  | 'belly'
  | 'shoulder'
  | 'loin'
  | 'ham'
  | 'other';

// === MAIN INTERFACE - ALIGNED TO DATABASE-STANDARDS v1.0 ===

export interface SteakItem {
  // IDENTIFICATION (Standard v1.0)
  id: string;                          // STK_{NAME} format
  slug: string;                        // lowercase-hyphens

  // INFO BASE - SOLO INGLESE (Standard v1.0)
  name: string;
  description: string;

  // CLASSIFICATION (Standard v1.0)
  category: SteaksCategory;
  status: SteaksStatus;

  // STEAKS-SPECIFIC
  style: SteaksStyle;
  cut?: string;
  weight_g?: number;
  bone_in?: boolean;
  grade?: GradeQuality;
  aging_days?: number;
  cooking_method?: CookingMethod;
  recommended_doneness?: Doneness;
  internal_temp_c?: number;

  // ORIGIN
  origin_country?: string;
  origin_region?: string;

  // SERVING
  serves?: number;
  recommended_sides?: string[];
  wine_pairing?: string[];

  // INGREDIENTI (Standard v1.0)
  ingredient_ids: string[];            // ING_* references

  // SISTEMA 5 DIMENSIONI - ALLERGENI (Standard v1.0)
  allergens: string[];                 // lowercase array

  // SISTEMA 5 DIMENSIONI - DIETARY FLAGS (Standard v1.0)
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_nut_free: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
  is_halal: boolean;
  is_kosher: boolean;

  // SISTEMA 5 DIMENSIONI - NUTRITION (Standard v1.0)
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;

  // SISTEMA 5 DIMENSIONI - SPICE (Standard v1.0)
  spice_level: number;                 // 0-5 scale

  // METADATA (Standard v1.0)
  tags: string[];
  popularity: number;                  // 0-100 scale (NOT 1-5!)

  // TIMESTAMPS (auto-generated)
  created_at?: string;
  updated_at?: string;
}

// === LEGACY TYPE ALIAS ===
// Keep for backward compatibility during migration
export type Steak = SteakItem;

// === HELPER FUNCTIONS ===

/**
 * Convert old 1-5 popularity to new 0-100 scale
 */
export function convertPopularity(oldValue: number): number {
  if (oldValue <= 5) {
    // Old scale: 1=20, 2=40, 3=60, 4=80, 5=100
    return oldValue * 20;
  }
  return oldValue; // Already on 0-100 scale
}
