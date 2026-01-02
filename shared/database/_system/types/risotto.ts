/**
 * GUDBRO Risotto Types
 *
 * Comprehensive type definitions for risotto and rice-based dishes database
 * Supports Italian risotti, paella, biryani, and international rice dishes
 *
 * Sistema 5 Dimensioni v3.0 integrated
 */

import type { MultiLangText } from './index';

// ============================================================================
// ENUMS & CONSTANTS
// ============================================================================

/** Risotto/Rice dish style/origin category */
export type RisottoStyle =
  | 'italian_classic'     // Traditional Italian risotti
  | 'italian_regional'    // Regional specialties (Milanese, Venetian)
  | 'spanish_paella'      // Paella varieties
  | 'indian_biryani'      // Biryani styles
  | 'asian_fried'         // Fried rice (Chinese, Thai, Indonesian)
  | 'asian_other'         // Congee, donburi, etc.
  | 'middle_eastern'      // Pilaf, mujadara
  | 'latin_american'      // Arroz con pollo, gallo pinto
  | 'fusion'              // Modern fusion
  | 'signature';          // House specialties

/** Rice type */
export type RiceType =
  | 'arborio'             // Classic risotto rice
  | 'carnaroli'           // Premium risotto rice
  | 'vialone_nano'        // Venetian risotto rice
  | 'bomba'               // Spanish paella rice
  | 'calasparra'          // Spanish rice
  | 'basmati'             // Indian/Middle Eastern
  | 'jasmine'             // Thai rice
  | 'long_grain'          // Generic long grain
  | 'short_grain'         // Sushi-style
  | 'sticky'              // Glutinous rice
  | 'brown'               // Whole grain
  | 'wild'                // Wild rice blend
  | 'black'               // Black/forbidden rice
  | 'red'                 // Red rice
  | 'other';

/** Cooking method for rice dishes */
export type RiceCookingMethod =
  | 'risotto'             // Slow stirring with broth
  | 'pilaf'               // Toasted then simmered
  | 'paella'              // Wide pan, socarrat
  | 'biryani'             // Layered and steamed
  | 'fried'               // Wok-fried
  | 'steamed'             // Plain steamed
  | 'baked'               // Oven-baked
  | 'congee'              // Slow-cooked porridge
  | 'pressure_cooked';    // Modern pressure cooking

/** Portion sizes */
export type RisottoPortionSize =
  | 'starter'             // Primo piccolo
  | 'regular'             // Standard portion
  | 'large'               // Abbondante
  | 'sharing';            // Family style

/** Status */
export type RisottoStatus =
  | 'active'
  | 'classic'
  | 'traditional'
  | 'modern'
  | 'signature'
  | 'seasonal'
  | 'inactive';

// ============================================================================
// MAIN RISOTTO TYPE
// ============================================================================

export interface Risotto {
  // IDENTIFIERS
  id: string;
  slug: string;
  stable_key?: string;

  // BASIC INFO
  name: MultiLangText;
  description: MultiLangText;
  tagline?: MultiLangText;

  // CLASSIFICATION
  status: RisottoStatus;
  style: RisottoStyle;
  tags: string[];

  // ORIGIN
  origin: {
    country: string;
    country_code?: string;
    region?: string;
    city?: string;
    year_created?: string;
    notes?: string;
  };

  // HISTORY (optional)
  history?: {
    story?: MultiLangText;
    named_after?: MultiLangText;
    fun_fact?: MultiLangText;
  };

  // RICE TYPE
  rice_type: {
    type: RiceType;
    brand_recommendation?: string;
    is_gluten_free: boolean;
  };

  // BROTH/LIQUID
  broth?: {
    type: string;          // 'vegetable', 'chicken', 'beef', 'seafood', 'mushroom'
    is_key_flavor: boolean;
    notes?: string;
  };

  // COOKING
  cooking: {
    method: RiceCookingMethod;
    time_minutes: number;
    difficulty: 'easy' | 'medium' | 'hard';
    requires_special_equipment?: boolean;
    equipment?: string[];
    technique_notes?: string;
  };

  // MAIN INGREDIENTS
  main_ingredients: string[];
  proteins?: string[];
  vegetables?: string[];
  aromatics?: string[];     // Onion, garlic, saffron, etc.

  // FINISHING
  finishing?: {
    mantecatura?: boolean;  // Butter/cheese finish for risotto
    butter?: boolean;
    cheese?: string;        // 'parmesan', 'grana_padano', etc.
    cream?: boolean;
    herbs?: string[];
  };

  // SERVING
  serving: {
    portion_size?: RisottoPortionSize;
    temperature: 'hot' | 'warm' | 'room_temp';
    presentation?: 'plated' | 'bowl' | 'paella_pan' | 'family_style';
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
