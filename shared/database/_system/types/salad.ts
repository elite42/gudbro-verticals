/**
 * GUDBRO Salad Types
 *
 * Comprehensive type definitions for salad database
 * Supports classic salads, bowls, poke, and international varieties
 */

import type { MultiLangText } from './index';

// ============================================================================
// ENUMS & CONSTANTS
// ============================================================================

/** Salad style/category */
export type SaladStyle =
  | 'classic'           // Caesar, Greek, Niçoise, Waldorf, Cobb
  | 'italian'           // Caprese, Panzanella, Tricolore, Insalata di Mare
  | 'mediterranean'     // Fattoush, Tabbouleh, Israeli
  | 'asian'             // Thai, Vietnamese, Korean, Japanese
  | 'bowl'              // Buddha bowl, Grain bowl, Power bowl
  | 'poke'              // Hawaiian poke bowls
  | 'protein'           // High-protein salads
  | 'superfood'         // Kale, quinoa, acai based
  | 'seasonal'          // Seasonal specials
  | 'signature';        // House specialties

/** Base greens type */
export type SaladBase =
  | 'romaine'           // Caesar, Cobb
  | 'mixed_greens'      // Spring mix, mesclun
  | 'iceberg'           // Classic crispy
  | 'arugula'           // Peppery, Italian style
  | 'spinach'           // Baby spinach
  | 'kale'              // Superfood base
  | 'cabbage'           // Slaws, Asian salads
  | 'lettuce_butter'    // Butter/Boston lettuce
  | 'radicchio'         // Bitter, Italian
  | 'endive'            // Belgian endive
  | 'watercress'        // Peppery greens
  | 'grain'             // Quinoa, farro, bulgur based
  | 'rice'              // Poke bowls, Asian bowls
  | 'noodle'            // Glass noodles, soba
  | 'bread'             // Panzanella, Fattoush
  | 'no_base';          // Caprese, Tabbouleh (herb-heavy)

/** Protein options */
export type SaladProtein =
  | 'chicken_grilled'
  | 'chicken_crispy'
  | 'steak'
  | 'salmon'
  | 'tuna_seared'
  | 'tuna_raw'          // Poke
  | 'shrimp'
  | 'prawns'
  | 'calamari'
  | 'crab'
  | 'lobster'
  | 'tofu'
  | 'tempeh'
  | 'eggs'
  | 'bacon'
  | 'prosciutto'
  | 'feta'
  | 'goat_cheese'
  | 'mozzarella'
  | 'halloumi'
  | 'chickpeas'
  | 'edamame'
  | 'beans'
  | 'lentils'
  | 'none';

/** Dressing types */
export type DressingType =
  | 'vinaigrette'       // Oil + acid based
  | 'creamy'            // Mayo/yogurt based
  | 'asian'             // Soy/sesame based
  | 'citrus'            // Lemon/lime based
  | 'tahini'            // Middle Eastern
  | 'peanut'            // Thai style
  | 'ranch'             // American classic
  | 'caesar'            // Anchovy/parmesan
  | 'blue_cheese'       // Creamy blue cheese
  | 'balsamic'          // Balsamic reduction
  | 'olive_oil'         // Simple EVOO
  | 'none';             // No dressing

/** Salad temperature */
export type SaladTemperature =
  | 'cold'              // Most salads
  | 'warm'              // Warm salads, wilted greens
  | 'room_temp'         // Grain salads
  | 'mixed';            // Warm protein on cold greens

/** Portion sizes */
export type PortionSize =
  | 'side'              // Side salad (~150g)
  | 'regular'           // Main course (~300g)
  | 'large'             // Sharing/hungry (~450g)
  | 'bowl';             // Bowl format (~400g)

/** Salad status */
export type SaladStatus =
  | 'classic'           // Timeless classics
  | 'traditional'       // Regional traditional
  | 'modern'            // Contemporary interpretations
  | 'signature'         // House specialties
  | 'seasonal'          // Limited time
  | 'trending';         // Currently popular

// ============================================================================
// DRESSING TYPE
// ============================================================================

export interface Dressing {
  id: string;
  slug: string;
  name: MultiLangText;
  type: DressingType;
  ingredients: string[];    // Ingredient IDs
  is_vegan: boolean;
  is_gluten_free: boolean;
  calories_per_serving?: number;
  allergens: string[];
}

// ============================================================================
// MAIN SALAD TYPE
// ============================================================================

export interface Salad {
  // IDENTIFIERS
  id: string;
  slug: string;
  stable_key: string;

  // BASIC INFO
  name: MultiLangText;
  description: MultiLangText;
  tagline?: MultiLangText;

  // CLASSIFICATION
  status: SaladStatus;
  style: SaladStyle;
  tags: string[];

  // ORIGIN
  origin: {
    country: string;
    country_code: string;
    region?: string;
    city?: string;
    year_created?: string;
    creator?: string;
  };

  // HISTORY & STORY (optional)
  history?: {
    story: MultiLangText;
    named_after?: MultiLangText;
    fun_fact?: MultiLangText;
  };

  // COMPOSITION
  base: SaladBase;
  default_protein?: SaladProtein;
  protein_options?: SaladProtein[];  // Available add-ons

  // DRESSING
  default_dressing: string;          // Dressing slug
  dressing_options?: string[];       // Alternative dressings
  dressing_on_side?: boolean;        // Served separately

  // INGREDIENTS (references to ingredient IDs)
  ingredients: SaladIngredient[];

  // TOPPINGS & GARNISHES
  toppings?: {
    ingredient_id: string;
    is_signature?: boolean;          // Key topping for this salad
  }[];

  // SERVING
  serving: {
    default_portion: PortionSize;
    available_portions: PortionSize[];
    temperature: SaladTemperature;
    presentation?: 'tossed' | 'composed' | 'layered' | 'bowl';
    suggested_bread?: string;        // Bread pairing
  };

  // FLAVOR PROFILE
  flavor: {
    profile: string[];               // e.g., ['fresh', 'tangy', 'crunchy']
    description?: MultiLangText;
    spice_level: 0 | 1 | 2 | 3 | 4 | 5;
  };

  // DIETARY & ALLERGENS (computed from ingredients)
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
    calories_estimate?: number;      // Per regular portion
    protein_g?: number;
    fiber_g?: number;
  };

  // CUSTOMIZATION OPTIONS
  customization?: {
    add_protein?: boolean;           // Can add protein
    protein_upcharge?: boolean;
    substitute_base?: boolean;       // Can swap greens
    extra_dressing?: boolean;
    make_vegan?: boolean;            // Vegan option available
    make_gluten_free?: boolean;
  };

  // VARIATIONS
  variations?: {
    name: string;
    description: MultiLangText;
    changes?: string[];              // What's different
  }[];

  // POPULARITY & RECOMMENDATIONS
  popularity: number;                // 0-100 score
  recommended_for?: string[];        // e.g., ['health-conscious', 'lunch']

  // PAIRINGS
  pairings?: {
    soups?: string[];
    breads?: string[];
    proteins?: string[];
    drinks?: string[];
  };

  // RELATED
  related_salads?: string[];         // Slugs of similar salads

  // MEDIA
  media?: {
    thumbnail?: string;
    gallery?: string[];
  };

  // METADATA
  source_url?: string;
  source_note?: string;
  version: number;
  created_at?: string;
  updated_at?: string;
}

// ============================================================================
// INGREDIENT REFERENCE
// ============================================================================

export interface SaladIngredient {
  ingredient_id: string;
  quantity?: {
    amount: number;
    unit: 'g' | 'ml' | 'piece' | 'slice' | 'cup' | 'tbsp' | 'tsp' | 'handful' | 'leaves';
  };
  display_name?: string;
  is_optional?: boolean;
  is_garnish?: boolean;              // Added at the end
  is_signature?: boolean;            // Key ingredient
  notes?: MultiLangText;
}

// ============================================================================
// LOCATION MENU CONFIGURATION (for backoffice)
// ============================================================================

/** How a specific location configures a salad for their menu */
export interface LocationSaladConfig {
  location_id: string;
  salad_id: string;

  // Availability
  enabled: boolean;
  available_days?: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
  available_hours?: { from: string; to: string };

  // Portion pricing
  prices: {
    side?: number;
    regular?: number;
    large?: number;
    bowl?: number;
  };

  // Protein add-on pricing
  protein_prices?: {
    [key in SaladProtein]?: number;
  };

  // Local customizations
  custom_name?: MultiLangText;
  custom_description?: MultiLangText;
  local_ingredients_override?: SaladIngredient[];

  // Display
  display_order?: number;
  featured?: boolean;
  chef_recommended?: boolean;

  // Timestamps
  updated_at: string;
}

// ============================================================================
// EXPORTS
// ============================================================================

export type {
  SaladStyle,
  SaladBase,
  SaladProtein,
  DressingType,
  SaladTemperature,
  PortionSize,
  SaladStatus,
};
