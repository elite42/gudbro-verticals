/**
 * GUDBRO Pizza Types
 *
 * Comprehensive type definitions for pizza database
 * Supports Italian classics, American styles, and international fusion
 */

import type { MultiLangText } from './index';

// ============================================================================
// ENUMS & CONSTANTS
// ============================================================================

/** Pizza style categories */
export type PizzaStyle =
  | 'napoletana'      // Traditional Neapolitan (DOC/STG)
  | 'romana'          // Roman thin crust
  | 'siciliana'       // Sicilian thick/pan style
  | 'al_taglio'       // Roman pizza by the slice/weight
  | 'new_york'        // NY style hand-tossed
  | 'chicago'         // Chicago deep-dish
  | 'detroit'         // Detroit square style
  | 'california'      // California gourmet
  | 'gourmet'         // Premium/artisan
  | 'fusion'          // International fusion
  | 'other';

/** Pizza base/sauce type */
export type PizzaBase =
  | 'tomato'          // Classic tomato sauce (San Marzano)
  | 'white'           // White sauce (cream/bechamel/ricotta)
  | 'pesto'           // Basil pesto base
  | 'bbq'             // BBQ sauce
  | 'buffalo'         // Buffalo/hot sauce
  | 'garlic_oil'      // Garlic and olive oil (bianca)
  | 'hummus'          // Middle Eastern style
  | 'none';           // No sauce

/** Cheese types commonly used */
export type PizzaCheese =
  | 'mozzarella_fior_di_latte'
  | 'mozzarella_bufala'
  | 'burrata'
  | 'ricotta'
  | 'gorgonzola'
  | 'parmesan'
  | 'pecorino'
  | 'provolone'
  | 'scamorza'
  | 'taleggio'
  | 'fontina'
  | 'goat_cheese'
  | 'feta'
  | 'vegan_cheese'
  | 'none';

/** Dough type */
export type DoughType =
  | 'neapolitan'      // 24-72hr fermentation, soft, charred
  | 'roman'           // Thin, crispy
  | 'sicilian'        // Thick, fluffy, pan-baked
  | 'american'        // Medium thickness
  | 'whole_wheat'     // Healthier option
  | 'gluten_free'     // GF alternative
  | 'cauliflower'     // Low-carb alternative
  | 'sourdough';      // Artisan sourdough base

/** Cooking method */
export type CookingMethod =
  | 'wood_fired'      // Traditional wood oven (485°C)
  | 'electric'        // Electric deck oven
  | 'gas'             // Gas oven
  | 'pan'             // Pan/deep dish
  | 'brick'           // Brick oven
  | 'conveyor';       // Commercial conveyor

/** Suggested selling modes for this pizza type */
export type SellingMode =
  | 'whole'           // Full pizza (with or without sizes)
  | 'slice'           // By the slice
  | 'weight';         // By weight (per 100g)

/** Pizza status/category */
export type PizzaStatus =
  | 'doc_certified'   // DOC/STG/DOP certified
  | 'classic'         // Traditional classic
  | 'regional'        // Regional Italian specialty
  | 'international'   // International famous
  | 'fusion'          // Modern fusion
  | 'gourmet'         // Premium/artisan
  | 'vegan'           // Fully vegan
  | 'seasonal';       // Seasonal special

// ============================================================================
// MAIN PIZZA TYPE
// ============================================================================

export interface Pizza {
  // IDENTIFIERS
  id: string;
  slug: string;
  stable_key: string;

  // BASIC INFO
  name: MultiLangText;
  description: MultiLangText;
  tagline?: MultiLangText;

  // CLASSIFICATION
  status: PizzaStatus;
  style: PizzaStyle;
  tags: string[];

  // ORIGIN
  origin: {
    country: string;
    country_code: string;
    region?: string;
    city?: string;
    year_created?: string;
    creator?: string;
    certification?: string;  // DOC, STG, DOP, etc.
  };

  // HISTORY & STORY
  history?: {
    story: MultiLangText;
    named_after?: MultiLangText;
    fun_fact?: MultiLangText;
  };

  // COMPOSITION
  base: PizzaBase;
  primary_cheese: PizzaCheese;
  additional_cheeses?: PizzaCheese[];
  dough_type: DoughType;

  // INGREDIENTS (references to ingredient IDs)
  ingredients: PizzaIngredient[];

  // COOKING
  cooking: {
    method: CookingMethod;
    temperature_celsius?: number;
    time_seconds?: number;
    notes?: MultiLangText;
  };

  // FLAVOR PROFILE
  flavor: {
    profile: string[];           // e.g., ['savory', 'spicy', 'umami']
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
    allergens: string[];         // Computed from ingredients
    calories_estimate?: number;  // Per serving/portion
  };

  // SERVING SUGGESTIONS
  serving: {
    suggested_modes: SellingMode[];  // What modes this pizza is typically sold
    portions_whole?: number;         // How many slices in whole pizza
    ideal_temperature: 'hot' | 'warm';
    reheating_notes?: MultiLangText;
    wine_pairing?: string[];
    beer_pairing?: string[];
  };

  // VARIATIONS
  variations?: {
    name: string;
    description: MultiLangText;
    additional_ingredients?: string[];
  }[];

  // POPULARITY & RECOMMENDATIONS
  popularity: number;           // 0-100 score
  recommended_for?: string[];   // e.g., ['families', 'vegetarians', 'spicy-lovers']

  // RELATED
  related_pizzas?: string[];    // Slugs of similar pizzas

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

export interface PizzaIngredient {
  ingredient_id: string;
  quantity?: {
    amount: number;
    unit: 'g' | 'ml' | 'piece' | 'slice' | 'tbsp' | 'tsp' | 'handful';
  };
  display_name?: string;
  is_optional?: boolean;
  is_topping?: boolean;       // Added after baking
  notes?: MultiLangText;
}

// ============================================================================
// LOCATION MENU CONFIGURATION (for backoffice)
// ============================================================================

/** How a specific location configures a pizza for their menu */
export interface LocationPizzaConfig {
  location_id: string;
  pizza_id: string;

  // Availability
  enabled: boolean;
  available_days?: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
  available_hours?: { from: string; to: string };

  // Selling configuration
  selling_modes: {
    whole?: {
      enabled: boolean;
      sizes_enabled: boolean;
      prices: {
        S?: number;      // Small (~25cm)
        M?: number;      // Medium (~30cm)
        L?: number;      // Large (~35cm)
        XL?: number;     // Extra Large (~40cm)
        XXL?: number;    // Family/Party (~50cm)
        default?: number;  // If sizes_enabled = false
      };
    };
    slice?: {
      enabled: boolean;
      price: number;
    };
    weight?: {
      enabled: boolean;
      price_per_100g: number;
    };
  };

  // Local customizations
  custom_name?: MultiLangText;      // Override name
  custom_description?: MultiLangText;
  local_ingredients_override?: PizzaIngredient[];  // Local recipe variation

  // Display
  display_order?: number;
  featured?: boolean;

  // Timestamps
  updated_at: string;
}

// ============================================================================
// EXPORTS
// ============================================================================

export type {
  PizzaStyle,
  PizzaBase,
  PizzaCheese,
  DoughType,
  CookingMethod,
  SellingMode,
  PizzaStatus,
};
