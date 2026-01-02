/**
 * GUDBRO Beer Database - Type Definitions
 *
 * Types for the comprehensive beer database
 * Includes rich metadata for menu enrichment: history, origin, taste profile, brewing details.
 *
 * @version 1.0
 * @lastUpdated 2025-12-14
 */

import type { MultiLangText, SpiceLevel } from './index';

// ============================================================================
// BEER ENUMS
// ============================================================================

/**
 * Beer style category (top-level)
 */
export type BeerStyleCategory =
  | 'lager'
  | 'ale'
  | 'wheat'
  | 'stout_porter'
  | 'belgian'
  | 'specialty'
  | 'hybrid';

/**
 * Specific beer style
 */
export type BeerStyle =
  // Lagers
  | 'pilsner'
  | 'helles'
  | 'vienna_lager'
  | 'marzen'
  | 'oktoberfest'
  | 'dunkel'
  | 'schwarzbier'
  | 'bock'
  | 'doppelbock'
  | 'maibock'
  | 'eisbock'
  | 'american_lager'
  | 'mexican_lager'
  | 'japanese_lager'
  // Ales
  | 'pale_ale'
  | 'ipa'
  | 'double_ipa'
  | 'triple_ipa'
  | 'session_ipa'
  | 'new_england_ipa'
  | 'west_coast_ipa'
  | 'english_ipa'
  | 'belgian_ipa'
  | 'black_ipa'
  | 'amber_ale'
  | 'brown_ale'
  | 'scottish_ale'
  | 'red_ale'
  | 'blonde_ale'
  | 'cream_ale'
  | 'kolsch'
  // Wheat Beers
  | 'hefeweizen'
  | 'witbier'
  | 'dunkelweizen'
  | 'american_wheat'
  | 'berliner_weisse'
  | 'gose'
  | 'kristallweizen'
  // Stouts & Porters
  | 'dry_stout'
  | 'irish_stout'
  | 'milk_stout'
  | 'oatmeal_stout'
  | 'imperial_stout'
  | 'russian_imperial_stout'
  | 'pastry_stout'
  | 'porter'
  | 'robust_porter'
  | 'baltic_porter'
  | 'coffee_stout'
  | 'chocolate_stout'
  // Belgian Styles
  | 'belgian_blonde'
  | 'belgian_dubbel'
  | 'belgian_tripel'
  | 'belgian_quadrupel'
  | 'saison'
  | 'farmhouse_ale'
  | 'trappist'
  | 'abbey'
  | 'belgian_strong_dark'
  | 'belgian_strong_golden'
  | 'lambic'
  | 'gueuze'
  | 'kriek'
  | 'framboise'
  // Specialty
  | 'sour'
  | 'fruit_beer'
  | 'spiced_beer'
  | 'smoked_beer'
  | 'rauchbier'
  | 'barrel_aged'
  | 'wild_ale'
  | 'brett_beer'
  | 'cider'
  | 'mead'
  | string;

/**
 * Fermentation type
 */
export type FermentationType =
  | 'top_fermented'      // Ales (warm fermentation)
  | 'bottom_fermented'   // Lagers (cold fermentation)
  | 'spontaneous'        // Wild/Lambic (ambient yeast)
  | 'mixed';             // Combination

/**
 * Beer serving temperature
 */
export type ServingTemperature =
  | 'very_cold'    // 2-4°C (American lagers)
  | 'cold'         // 4-7°C (Pilsners, wheat beers)
  | 'cool'         // 7-10°C (IPAs, pale ales)
  | 'cellar'       // 10-13°C (Stouts, porters, Belgian)
  | 'warm';        // 13-16°C (Strong ales, barleywines)

/**
 * Beer glass type
 */
export type BeerGlass =
  | 'pint'              // Standard pint glass
  | 'pilsner'           // Tall, slender pilsner glass
  | 'weizen'            // Wheat beer glass
  | 'tulip'             // Tulip glass (Belgian ales)
  | 'goblet'            // Goblet/chalice (Trappist beers)
  | 'snifter'           // Snifter (strong ales)
  | 'mug'               // Beer mug/stein
  | 'flute'             // Champagne-style (lambics)
  | 'stange'            // Kölsch glass
  | 'thistle'           // Scottish ales
  | 'nonic'             // British pint with bulge
  | 'can'               // Served in can
  | 'bottle'            // Served in bottle
  | string;

/**
 * Beer color (SRM scale categories)
 */
export type BeerColor =
  | 'straw'           // SRM 2-3 (very pale)
  | 'pale'            // SRM 3-4
  | 'gold'            // SRM 5-6
  | 'amber'           // SRM 7-10
  | 'deep_amber'      // SRM 11-14
  | 'copper'          // SRM 15-17
  | 'brown'           // SRM 18-24
  | 'dark_brown'      // SRM 25-33
  | 'black'           // SRM 34+
  | string;

/**
 * Beer clarity
 */
export type BeerClarity =
  | 'brilliant'       // Crystal clear
  | 'clear'           // Clear but not brilliant
  | 'slightly_hazy'   // Slight haze
  | 'hazy'            // Intentionally hazy (NEIPA)
  | 'opaque';         // Cannot see through (stouts)

/**
 * Beer carbonation level
 */
export type CarbonationLevel =
  | 'still'           // No carbonation
  | 'low'             // Gentle carbonation (cask ales)
  | 'medium'          // Standard carbonation
  | 'high'            // Highly carbonated (Belgian, wheat)
  | 'very_high';      // Very effervescent (gueuze)

/**
 * Beer body/mouthfeel
 */
export type BeerBody =
  | 'light'           // Thin, watery
  | 'medium_light'    // Light but some presence
  | 'medium'          // Balanced body
  | 'medium_full'     // Fuller, some weight
  | 'full';           // Heavy, chewy, viscous

/**
 * Flavor profile for beers
 */
export type BeerFlavorProfile =
  | 'malty'
  | 'hoppy'
  | 'bitter'
  | 'sweet'
  | 'dry'
  | 'crisp'
  | 'roasty'
  | 'toasty'
  | 'caramel'
  | 'chocolate'
  | 'coffee'
  | 'fruity'
  | 'citrus'
  | 'tropical'
  | 'piney'
  | 'resinous'
  | 'floral'
  | 'herbal'
  | 'spicy'
  | 'peppery'
  | 'clove'
  | 'banana'
  | 'bubblegum'
  | 'earthy'
  | 'grassy'
  | 'hay'
  | 'bready'
  | 'biscuity'
  | 'nutty'
  | 'toffee'
  | 'vanilla'
  | 'smoky'
  | 'peaty'
  | 'sour'
  | 'tart'
  | 'funky'
  | 'barnyard'
  | 'yeasty'
  | 'creamy'
  | 'silky'
  | 'refreshing'
  | 'warming'
  | 'boozy'
  | 'clean'
  | 'complex'
  | 'balanced'
  | string;

/**
 * Season tags for beers
 */
export type BeerSeasonTag =
  | 'spring'
  | 'summer'
  | 'autumn'
  | 'fall'
  | 'winter'
  | 'all_year'
  | 'oktoberfest'
  | 'christmas'
  | 'spring_bock';

/**
 * Occasion tags for beers
 */
export type BeerOccasionTag =
  | 'casual'
  | 'party'
  | 'dinner'
  | 'bbq'
  | 'sports'
  | 'celebration'
  | 'date_night'
  | 'business'
  | 'relaxing'
  | 'beach'
  | 'camping'
  | 'holiday'
  | 'oktoberfest'
  | 'brunch'
  | 'pub_night'
  | 'tasting'
  | 'pairing_dinner'
  | string;

/**
 * Price tier
 */
export type BeerPriceTier = 'budget' | 'value' | 'mid' | 'premium' | 'craft' | 'luxury';

/**
 * Beer status/classification
 */
export type BeerStatus =
  | 'international_classic'   // Major international brands (Heineken, Budweiser)
  | 'craft'                   // Craft/artisan beers
  | 'trappist'               // Authentic Trappist beers
  | 'regional_classic'        // Regional favorites
  | 'specialty'               // Limited edition or specialty
  | 'local';                  // Local/micro breweries

// ============================================================================
// BEER ORIGIN - Brewery and origin information
// ============================================================================

export interface BeerOrigin {
  /** Country of origin */
  country: string;

  /** Country code (ISO 3166-1 alpha-2) */
  country_code?: string;

  /** Region within country */
  region?: string;

  /** City */
  city?: string;

  /** Brewery name */
  brewery: MultiLangText;

  /** Year brewery was founded */
  brewery_founded?: number;

  /** Is it a Trappist monastery? */
  is_trappist?: boolean;

  /** Brewery type */
  brewery_type?: 'macro' | 'regional' | 'craft' | 'micro' | 'brewpub' | 'contract' | 'trappist' | 'abbey';
}

// ============================================================================
// BEER HISTORY - Historical information
// ============================================================================

export interface BeerHistory {
  /** Year the beer was first brewed */
  first_brewed?: number | string;

  /** Story/history of the beer */
  story?: MultiLangText;

  /** Awards and recognition */
  awards?: string[];

  /** Named after (if applicable) */
  named_after?: MultiLangText;

  /** Historical significance */
  significance?: MultiLangText;
}

// ============================================================================
// BEER CHARACTERISTICS - Technical specifications
// ============================================================================

export interface BeerCharacteristics {
  /** Alcohol by volume (percentage) */
  abv: number;

  /** ABV range for style variations */
  abv_range?: { min: number; max: number };

  /** International Bitterness Units */
  ibu?: number;

  /** IBU range */
  ibu_range?: { min: number; max: number };

  /** Standard Reference Method (color) */
  srm?: number;

  /** Original gravity */
  og?: number;

  /** Final gravity */
  fg?: number;

  /** Color description */
  color: BeerColor;

  /** Clarity */
  clarity?: BeerClarity;

  /** Carbonation level */
  carbonation?: CarbonationLevel;

  /** Body/mouthfeel */
  body?: BeerBody;

  /** Fermentation type */
  fermentation?: FermentationType;
}

// ============================================================================
// BEER TASTE - Detailed taste description
// ============================================================================

export interface BeerTaste {
  /** Primary flavor profile tags */
  profile: BeerFlavorProfile[];

  /** Detailed taste description */
  description?: MultiLangText;

  /** Aroma description */
  aroma?: MultiLangText;

  /** First impression / initial taste */
  first_impression?: MultiLangText;

  /** Finish / aftertaste */
  finish?: MultiLangText;

  /** Balance description */
  balance?: MultiLangText;

  /** Bitterness level (1-5 scale) */
  bitterness_level?: 1 | 2 | 3 | 4 | 5;

  /** Sweetness level (1-5 scale) */
  sweetness_level?: 1 | 2 | 3 | 4 | 5;
}

// ============================================================================
// BEER SERVING - How to serve
// ============================================================================

export interface BeerServing {
  /** Recommended glass type */
  glass: BeerGlass;

  /** Serving temperature */
  temperature: ServingTemperature;

  /** Temperature in Celsius */
  temperature_celsius?: { min: number; max: number };

  /** Pouring instructions */
  pouring_notes?: MultiLangText;

  /** Should head be preserved? */
  head_retention?: boolean;

  /** Ideal head size */
  ideal_head?: string;  // e.g., "2 fingers", "1 inch"
}

// ============================================================================
// BEER PAIRING - Food pairings
// ============================================================================

export interface BeerPairing {
  /** Food categories that pair well */
  food_categories?: string[];

  /** Specific food pairing suggestions */
  food_pairings?: MultiLangText;

  /** Cheese pairings */
  cheese_pairings?: string[];

  /** Cuisine pairings */
  cuisine_pairings?: string[];

  /** What to avoid */
  avoid_with?: MultiLangText;
}

// ============================================================================
// BEER INGREDIENTS - Main ingredients
// ============================================================================

export interface BeerIngredients {
  /** Malt types used */
  malts?: string[];

  /** Hop varieties used */
  hops?: string[];

  /** Yeast strain/type */
  yeast?: string;

  /** Special ingredients/adjuncts */
  adjuncts?: string[];

  /** Water source (if notable) */
  water?: string;

  /** Additional ingredients (fruit, spices, etc.) */
  special_ingredients?: string[];
}

// ============================================================================
// BEER - Main Type
// ============================================================================

export interface Beer {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────

  /** Unique ID (UUID) */
  id: string;

  /** URL-friendly slug */
  slug: string;

  /** Stable key for matching across versions */
  stable_key: string;

  /** Display name */
  name: MultiLangText;

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────

  /** Beer status/classification */
  status: BeerStatus;

  /** Style category (top-level) */
  style_category: BeerStyleCategory;

  /** Specific style */
  style: BeerStyle;

  /** Tags for filtering */
  tags: string[];

  // ─────────────────────────────────────────────────────────────────────────
  // ORIGIN & HISTORY
  // ─────────────────────────────────────────────────────────────────────────

  /** Brewery and origin information */
  origin: BeerOrigin;

  /** Historical information */
  history?: BeerHistory;

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION
  // ─────────────────────────────────────────────────────────────────────────

  /** Short description */
  description: MultiLangText;

  /** Marketing tagline */
  tagline?: MultiLangText;

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────

  /** Technical specifications */
  characteristics: BeerCharacteristics;

  /** Taste profile */
  taste: BeerTaste;

  /** Ingredients (if known) */
  ingredients?: BeerIngredients;

  // ─────────────────────────────────────────────────────────────────────────
  // SERVING
  // ─────────────────────────────────────────────────────────────────────────

  /** Serving recommendations */
  serving: BeerServing;

  /** Food pairings */
  pairing?: BeerPairing;

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────

  /** Season recommendations */
  season_tags: BeerSeasonTag[];

  /** Occasion recommendations */
  occasion_tags: BeerOccasionTag[];

  /** Is gluten-free? */
  is_gluten_free: boolean;

  /** Is non-alcoholic / alcohol-free? */
  is_non_alcoholic: boolean;

  /** Is organic? */
  is_organic?: boolean;

  /** Is vegan? */
  is_vegan?: boolean;

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & FORMATS
  // ─────────────────────────────────────────────────────────────────────────

  /** Available formats */
  available_formats?: ('draft' | 'bottle' | 'can' | 'keg' | 'cask')[];

  /** Available sizes (ml) */
  available_sizes?: number[];

  /** Related beers from same brewery */
  related_beers?: string[];

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────

  /** Price tier */
  price_tier: BeerPriceTier;

  /** Popularity score (1-100) */
  popularity?: number;

  /** Availability */
  availability?: 'year_round' | 'seasonal' | 'limited' | 'rare';

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────

  source?: {
    /** Primary source URL */
    primary?: string;
    /** Additional notes */
    note?: string;
  };

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────

  created_at?: string;
  updated_at?: string;
  version: number;
}

// Export all types
export type {
  BeerStyleCategory,
  BeerStyle,
  FermentationType,
  ServingTemperature,
  BeerGlass,
  BeerColor,
  BeerClarity,
  CarbonationLevel,
  BeerBody,
  BeerFlavorProfile,
  BeerSeasonTag,
  BeerOccasionTag,
  BeerPriceTier,
  BeerStatus,
  BeerOrigin,
  BeerHistory,
  BeerCharacteristics,
  BeerTaste,
  BeerServing,
  BeerPairing,
  BeerIngredients,
  Beer,
};
