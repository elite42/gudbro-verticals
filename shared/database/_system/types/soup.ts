/**
 * GUDBRO Soups Types
 *
 * Comprehensive type definitions for soups database
 * Supports Italian, Asian, European, and international soups
 *
 * Sistema 5 Dimensioni v3.0 integrated
 */

import type { MultiLangText } from './index';

// ============================================================================
// ENUMS & CONSTANTS
// ============================================================================

/** Soup style/origin category */
export type SoupStyle =
  | 'italian'             // Minestrone, Ribollita, Stracciatella
  | 'french'              // French Onion, Bouillabaisse, Vichyssoise
  | 'asian_chinese'       // Wonton soup, Hot and Sour
  | 'asian_japanese'      // Miso, Ramen broth
  | 'asian_korean'        // Kimchi jjigae, Samgyetang
  | 'asian_vietnamese'    // Pho broth (without noodles)
  | 'asian_thai'          // Tom Yum, Tom Kha
  | 'asian_other'         // Malaysian, Indonesian
  | 'mexican'             // Pozole, Tortilla soup
  | 'middle_eastern'      // Lentil, Harira
  | 'eastern_european'    // Borscht, Goulash
  | 'american'            // Clam chowder, Chicken noodle
  | 'spanish'             // Gazpacho, Caldo Gallego
  | 'fusion'              // Modern fusion
  | 'signature';          // House specialties

/** Soup base type */
export type SoupBase =
  | 'broth_clear'         // Clear broth (consommé)
  | 'broth_rich'          // Rich stock-based
  | 'cream'               // Cream-based
  | 'puree'               // Pureed vegetables
  | 'tomato'              // Tomato-based
  | 'bean'                // Bean/legume based
  | 'seafood'             // Seafood broth
  | 'miso'                // Miso-based
  | 'coconut'             // Coconut milk based
  | 'fermented'           // Kimchi, etc.
  | 'cold'                // Gazpacho, Vichyssoise
  | 'other';

/** Soup texture */
export type SoupTexture =
  | 'clear'               // Transparent broth
  | 'chunky'              // Pieces of vegetables/meat
  | 'smooth'              // Pureed smooth
  | 'creamy'              // Cream-based thick
  | 'hearty'              // Thick with lots of ingredients
  | 'light';              // Light and delicate

/** Temperature */
export type SoupTemperature =
  | 'hot'
  | 'warm'
  | 'room_temp'
  | 'cold'
  | 'chilled';

/** Portion sizes */
export type SoupPortionSize =
  | 'cup'                 // Small cup (starter)
  | 'bowl'                // Regular bowl
  | 'large'               // Main course bowl
  | 'sharing';            // Family style pot

/** Status */
export type SoupStatus =
  | 'active'
  | 'classic'
  | 'traditional'
  | 'modern'
  | 'signature'
  | 'seasonal'
  | 'inactive';

// ============================================================================
// MAIN SOUP TYPE
// ============================================================================

export interface Soup {
  // IDENTIFIERS
  id: string;
  slug: string;
  stable_key?: string;

  // BASIC INFO
  name: MultiLangText;
  description: MultiLangText;
  tagline?: MultiLangText;

  // CLASSIFICATION
  status: SoupStatus;
  style: SoupStyle;
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

  // SOUP CHARACTERISTICS
  soup_type: {
    base: SoupBase;
    texture: SoupTexture;
    temperature: SoupTemperature;
    is_clear?: boolean;
  };

  // BROTH/BASE
  broth?: {
    type: string;
    main_ingredients: string[];
    cooking_time_hours?: number;
    is_signature?: boolean;
  };

  // COOKING
  cooking: {
    method: string;
    time_minutes: number;
    difficulty: 'easy' | 'medium' | 'hard';
    requires_special_equipment?: boolean;
    equipment?: string[];
    technique_notes?: string;
  };

  // INGREDIENTS
  main_ingredients: string[];
  proteins?: string[];
  vegetables?: string[];
  aromatics?: string[];
  garnish?: string[];

  // SERVING
  serving: {
    portion_size?: SoupPortionSize;
    temperature: SoupTemperature;
    presentation?: 'bowl' | 'cup' | 'bread_bowl' | 'tureen' | 'pot';
    is_shareable?: boolean;
    recommended_pairing?: string[];
    accompaniments?: string[];    // Bread, crackers, etc.
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
    best_for?: string[];    // 'cold_weather', 'sick_day', etc.
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
