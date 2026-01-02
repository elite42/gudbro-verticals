/**
 * GUDBRO Pasta Types
 *
 * Comprehensive type definitions for pasta database
 * Supports Italian pasta, Asian noodles, and international varieties
 *
 * Sistema 5 Dimensioni v3.0 integrated
 */

import type { MultiLangText } from './index';

// ============================================================================
// ENUMS & CONSTANTS
// ============================================================================

/** Pasta style/origin category */
export type PastaStyle =
  | 'italian_classic'     // Spaghetti, Penne, Rigatoni dishes
  | 'italian_regional'    // Regional specialties (Orecchiette, Trofie)
  | 'italian_fresh'       // Fresh egg pasta (Tagliatelle, Pappardelle)
  | 'italian_filled'      // Ravioli, Tortellini, Agnolotti
  | 'italian_baked'       // Lasagne, Cannelloni, Timballo
  | 'asian_chinese'       // Lo mein, Dan dan, Chow mein
  | 'asian_japanese'      // Ramen, Udon, Soba, Yakisoba
  | 'asian_korean'        // Japchae, Jajangmyeon, Naengmyeon
  | 'asian_vietnamese'    // Pho, Bun, Banh canh
  | 'asian_thai'          // Pad Thai, Pad See Ew, Khao Soi
  | 'asian_other'         // Malaysian, Indonesian, Singaporean
  | 'fusion'              // Modern fusion dishes
  | 'signature';          // House specialties

/** Pasta shape/type */
export type PastaShape =
  // Long pasta
  | 'spaghetti'
  | 'spaghettini'
  | 'linguine'
  | 'fettuccine'
  | 'tagliatelle'
  | 'pappardelle'
  | 'bucatini'
  | 'capellini'
  | 'vermicelli'
  | 'bigoli'
  // Short pasta
  | 'penne'
  | 'rigatoni'
  | 'fusilli'
  | 'farfalle'
  | 'orecchiette'
  | 'conchiglie'
  | 'cavatappi'
  | 'paccheri'
  | 'mezze_maniche'
  | 'trofie'
  | 'strozzapreti'
  | 'calamarata'
  // Filled pasta
  | 'ravioli'
  | 'tortellini'
  | 'tortelloni'
  | 'agnolotti'
  | 'cappelletti'
  | 'mezzelune'
  | 'culurgiones'
  // Layered/Sheet
  | 'lasagne'
  | 'cannelloni'
  | 'manicotti'
  // Asian noodles
  | 'ramen'
  | 'udon'
  | 'soba'
  | 'rice_noodles'
  | 'glass_noodles'
  | 'egg_noodles'
  | 'lo_mein'
  | 'rice_vermicelli'
  | 'pho_noodles'
  | 'pad_thai_noodles'
  | 'japchae_noodles'
  // Other
  | 'gnocchetti'
  | 'malloreddus'
  | 'other';

/** Pasta base/dough type */
export type PastaDough =
  | 'semolina'            // Classic durum wheat
  | 'egg'                 // Fresh egg pasta
  | 'whole_wheat'         // Integrale
  | 'spinach'             // Pasta verde
  | 'beetroot'            // Red pasta
  | 'squid_ink'           // Nero di seppia
  | 'gluten_free'         // GF alternatives
  | 'legume'              // Chickpea, lentil pasta
  | 'rice'                // Rice noodles
  | 'wheat'               // Asian wheat noodles
  | 'buckwheat'           // Soba, Pizzoccheri
  | 'sweet_potato'        // Glass noodles
  | 'other';

/** Sauce category */
export type SauceType =
  | 'tomato'              // Pomodoro, Marinara, Arrabbiata
  | 'cream'               // Alfredo, Carbonara base
  | 'oil_based'           // Aglio e olio, Puttanesca
  | 'butter'              // Burro e salvia
  | 'pesto'               // Genovese, Rosso, Trapanese
  | 'meat'                // Bolognese, Ragu
  | 'seafood'             // Frutti di mare, Vongole
  | 'cheese'              // Cacio e pepe, 4 formaggi
  | 'broth'               // Ramen, Pho broth
  | 'stir_fry'            // Asian sauce (soy, oyster)
  | 'curry'               // Laksa, Khao Soi
  | 'spicy'               // Arrabbiata, Dan dan
  | 'vegetable'           // Primavera
  | 'none';               // Dry/simple preparations

/** Cooking method */
export type CookingMethod =
  | 'boiled'              // Standard pasta cooking
  | 'baked'               // Al forno
  | 'stir_fried'          // Asian wok style
  | 'soup'                // In brodo, Pho
  | 'cold'                // Cold noodle dishes
  | 'fresh_raw';          // Freshly made, minimal cooking

/** Portion sizes */
export type PastaPortionSize =
  | 'starter'             // Primo piccolo (~80g pasta)
  | 'regular'             // Standard primo (~100g pasta)
  | 'large'               // Abbondante (~130g pasta)
  | 'sharing';            // Family style

/** Pasta status */
export type PastaStatus =
  | 'active'              // Currently available
  | 'classic'             // Timeless classics
  | 'traditional'         // Regional traditional
  | 'modern'              // Contemporary interpretations
  | 'signature'           // House specialties
  | 'seasonal'            // Limited time
  | 'trending'            // Currently popular
  | 'inactive';           // Disabled

// ============================================================================
// SAUCE TYPE
// ============================================================================

export interface PastaSauce {
  id: string;
  slug: string;
  name: MultiLangText;
  type: SauceType;
  ingredients: string[];    // Ingredient IDs
  base_ingredient?: string; // Main component (tomato, cream, etc.)
  is_vegan: boolean;
  is_vegetarian: boolean;
  is_gluten_free: boolean;
  spice_level: 0 | 1 | 2 | 3 | 4 | 5;
  allergens: string[];
}

// ============================================================================
// MAIN PASTA TYPE
// ============================================================================

export interface Pasta {
  // IDENTIFIERS
  id: string;
  slug: string;
  stable_key?: string;

  // BASIC INFO
  name: MultiLangText;
  description: MultiLangText;
  tagline?: MultiLangText;

  // CLASSIFICATION
  status: PastaStatus;
  style: PastaStyle;
  tags: string[];

  // ORIGIN (flexible structure)
  origin: {
    country: string;
    country_code?: string;
    region?: string;
    city?: string;
    year_created?: string;
    creator?: string;
    notes?: string;
  };

  // HISTORY & STORY (optional)
  history?: {
    story?: MultiLangText;
    named_after?: MultiLangText;
    fun_fact?: MultiLangText;
  };

  // PASTA TYPE (flexible structure for data files)
  pasta_type?: {
    shape: string;
    dough: string;
    is_fresh?: boolean;
    is_filled?: boolean;
    filling?: string[];
    is_gluten_free_option?: boolean;
    notes?: string;
  };

  // COMPOSITION (legacy - for backoffice)
  pasta_shape?: PastaShape;
  pasta_dough?: PastaDough;
  sauce_type?: SauceType;
  cooking_method?: CookingMethod;

  // SAUCE (flexible structure for data files)
  sauce?: {
    type: string;
    base_ingredients: string[];
    is_spicy?: boolean;
    spice_level: number;
  };

  // PROTEINS & VEGETABLES (simple arrays for data files)
  proteins?: string[];
  vegetables?: string[];

  // INGREDIENTS (references to ingredient IDs - for backoffice)
  ingredients?: PastaIngredient[];

  // PROTEIN (detailed - for backoffice)
  protein?: {
    type: string;             // e.g., 'guanciale', 'shrimp', 'chicken'
    ingredient_id: string;
    is_essential: boolean;    // Part of traditional recipe
  };

  // GARNISHES & TOPPINGS
  toppings?: {
    ingredient_id: string;
    is_signature?: boolean;
  }[];

  // COOKING (flexible structure for data files)
  cooking?: {
    method: string;
    time_minutes: number;
    difficulty: 'easy' | 'medium' | 'hard';
    requires_special_equipment?: boolean;
    equipment?: string[];
  };

  // SERVING (flexible structure)
  serving: {
    default_portion?: PastaPortionSize;
    available_portions?: PastaPortionSize[];
    portion_size?: PastaPortionSize;  // Alternative simple field
    temperature?: 'hot' | 'warm' | 'cold' | 'room_temp';
    presentation?: 'plated' | 'bowl' | 'family_style' | 'baked_dish';
    suggested_pairing?: string;
    is_shareable?: boolean;
    recommended_pairing?: string[];
    garnish?: string[];
  };

  // FLAVOR PROFILE (optional)
  flavor?: {
    profile: string[];            // e.g., ['rich', 'savory', 'umami']
    description?: MultiLangText;
    spice_level: 0 | 1 | 2 | 3 | 4 | 5;
  };

  // DIETARY & ALLERGENS (Sistema 5 Dimensioni)
  dietary: {
    // Dimensione 3: Diets
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
    // Dimensione 1: Allergens
    allergens: string[];
    // Dimensione 4: Nutrition (estimates per regular portion)
    calories_estimate?: number;
    protein_g?: number;
    carbs_g?: number;
    fat_g?: number;
    fiber_g?: number;
  };

  // PRICING (for data files)
  pricing?: {
    cost_level: 'low' | 'medium' | 'high' | 'premium';
    suggested_price_usd?: number;
  };

  // AVAILABILITY (for data files)
  availability?: {
    is_seasonal: boolean;
    seasons?: ('spring' | 'summer' | 'fall' | 'winter' | 'all_year')[];
  };

  // CUSTOMIZATION OPTIONS
  customization?: {
    change_pasta?: boolean;       // Can swap pasta type
    add_protein?: boolean;
    extra_sauce?: boolean;
    make_vegetarian?: boolean;
    make_vegan?: boolean;
    make_gluten_free?: boolean;   // GF pasta available
    spice_adjustable?: boolean;
  };

  // VARIATIONS
  variations?: {
    name: string;
    description: MultiLangText;
    changes?: string[];
  }[];

  // POPULARITY & RECOMMENDATIONS
  popularity?: number;             // 0-100 score
  recommended_for?: string[];     // e.g., ['comfort-food', 'date-night']

  // PAIRINGS
  pairings?: {
    wines?: string[];
    appetizers?: string[];
    salads?: string[];
    desserts?: string[];
  };

  // RELATED
  related_pasta?: string[];       // Slugs of similar dishes

  // MEDIA
  media?: {
    thumbnail?: string;
    gallery?: string[];
  };

  // METADATA
  source_url?: string;
  source_note?: string;
  version?: number;
  created_at?: string;
  updated_at?: string;
}

// ============================================================================
// INGREDIENT REFERENCE
// ============================================================================

export interface PastaIngredient {
  ingredient_id: string;
  quantity?: {
    amount: number;
    unit: 'g' | 'ml' | 'piece' | 'slice' | 'cup' | 'tbsp' | 'tsp' | 'clove' | 'sprig';
  };
  display_name?: string;
  is_optional?: boolean;
  is_garnish?: boolean;
  is_signature?: boolean;         // Key ingredient for this dish
  notes?: MultiLangText;
}

// ============================================================================
// LOCATION MENU CONFIGURATION (for backoffice)
// ============================================================================

export interface LocationPastaConfig {
  location_id: string;
  pasta_id: string;

  // Availability
  enabled: boolean;
  available_days?: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
  available_hours?: { from: string; to: string };

  // Portion pricing
  prices: {
    starter?: number;
    regular?: number;
    large?: number;
    sharing?: number;
  };

  // Add-on pricing
  protein_prices?: {
    [key: string]: number;
  };

  // Local customizations
  custom_name?: MultiLangText;
  custom_description?: MultiLangText;
  local_ingredients_override?: PastaIngredient[];

  // Display
  display_order?: number;
  featured?: boolean;
  chef_recommended?: boolean;

  // Timestamps
  updated_at: string;
}

