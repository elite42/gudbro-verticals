/**
 * GUDBRO Cocktail Database - Type Definitions
 *
 * Types for the 222 cocktails database (102 IBA + 120 Famous)
 * Includes rich metadata for menu enrichment: history, origin, taste profile.
 *
 * @version 1.0
 * @lastUpdated 2025-12-13
 */

import type { MultiLangText, ProductIngredient, SpiceLevel } from './index';

// ============================================================================
// COCKTAIL ENUMS
// ============================================================================

/**
 * Preparation method
 */
export type CocktailMethod =
  | 'build' // Built directly in serving glass
  | 'stir' // Stirred in mixing glass with ice
  | 'shake' // Shaken in cocktail shaker
  | 'blend' // Blended with ice (frozen drinks)
  | 'swizzle' // Swizzled with bar spoon
  | 'roll' // Rolled between tins (Bloody Mary)
  | 'layer' // Layered (pousse-café style)
  | 'muddle' // Muddled ingredients
  | 'muddle_shake' // Muddled then shaken
  | 'pour'; // Simply poured (shots)

/**
 * Ice type
 */
export type CocktailIce =
  | 'none' // No ice (served up)
  | 'cubed' // Standard ice cubes
  | 'cubes' // Alias for cubed
  | 'large_cube' // Large format ice (Old Fashioned)
  | 'crushed' // Crushed ice (Mint Julep, Mojito)
  | 'pebble' // Pebble ice (Tiki drinks)
  | 'cracked' // Cracked ice
  | 'blended' // Blended with ice (frozen drinks)
  | 'block'; // Block ice (punch bowls)

/**
 * Serving style
 */
export type ServingStyle =
  | 'up' // Chilled, no ice in glass
  | 'on_the_rocks' // Over ice
  | 'on_rocks' // Alias for on_the_rocks
  | 'rocks' // Same as on_the_rocks (alias)
  | 'highball' // Tall, lots of mixer
  | 'collins' // Collins style
  | 'tiki' // Tiki presentation
  | 'shot' // Shot glass
  | 'straight' // Neat, room temperature
  | 'straight_up' // Alias for straight
  | 'built' // Built in glass (Mint Julep)
  | 'frozen' // Blended with ice (frozen margarita, etc.)
  | 'blended' // Blended drinks (Zombie, etc.)
  | 'hot' // Hot drinks (Irish Coffee, Hot Toddy)
  | 'swizzle' // Swizzled (Chartreuse Swizzle)
  | 'punch' // Punch bowl service
  | 'communal'; // Shared/communal (scorpion bowl)

/**
 * Difficulty level
 */
export type CocktailDifficulty = 'easy' | 'medium' | 'hard' | 'advanced' | 'intermediate' | string;

/**
 * Price tier
 */
export type PriceTier = 'budget' | 'low' | 'mid' | 'high' | 'premium';

/**
 * IBA Categories
 */
export type IBACategory =
  | 'Unforgettables' // The Unforgettables (classic cocktails)
  | 'Contemporary' // Contemporary Classics
  | 'Contemporary Classics' // Alias with space
  | 'NewEraDrinks'; // New Era Drinks

/**
 * Flavor profile descriptors
 */
export type FlavorProfile =
  | 'sweet'
  | 'sour'
  | 'bitter'
  | 'dry'
  | 'boozy'
  | 'refreshing'
  | 'creamy'
  | 'fruity'
  | 'herbal'
  | 'spicy'
  | 'smoky'
  | 'floral'
  | 'citrus'
  | 'tropical'
  | 'botanical' // gin-forward, juniper notes
  | 'crisp' // clean, sharp finish
  | 'complex' // multi-layered flavors
  | 'effervescent' // bubbly, sparkling
  | 'light' // delicate, not heavy
  | 'aromatic' // fragrant, perfumed
  | 'elegant' // refined, sophisticated
  | 'tart' // pleasantly acidic
  | 'minty' // mint-forward
  | 'balanced' // well-harmonized flavors
  | 'herbaceous' // herb-forward
  | 'spirit-forward' // strong spirit presence
  | 'smooth' // silky, easy to drink
  | 'rich' // full-bodied
  | 'slightly_sweet' // mildly sweet
  | 'warming' // warm sensation
  | 'nutty' // nut flavors
  | 'chocolatey' // chocolate notes
  | 'coffee' // coffee flavors
  | 'vanilla' // vanilla notes
  | 'caramel' // caramel notes
  | 'honey' // honey sweetness
  | 'ginger' // ginger spice
  | 'cinnamon' // cinnamon spice
  | 'anise' // anise/licorice
  | 'strong' // high alcohol
  | 'mild' // gentle
  | string; // Allow additional values

/**
 * Season tags
 */
export type SeasonTag =
  | 'spring'
  | 'summer'
  | 'autumn'
  | 'fall'
  | 'winter'
  | 'all_year'
  | 'year_round'
  | 'year-round';

/**
 * Occasion tags
 */
export type OccasionTag =
  | 'aperitivo'
  | 'digestivo'
  | 'digestif'
  | 'brunch'
  | 'dinner'
  | 'party'
  | 'date_night'
  | 'celebration'
  | 'nightcap'
  | 'casual'
  | 'formal'
  | 'garden_party'
  | 'summer'
  | 'sophisticated_gathering'
  | 'cocktail_party'
  | 'business'
  | 'beach'
  | 'summer_gathering'
  | 'special_occasion'
  | 'kentucky_derby'
  | 'sporting_event'
  | 'southern_gathering'
  | 'social_gathering'
  | 'casual_gathering'
  | 'business_dinner'
  | 'quiet_contemplation'
  | 'summer_celebration'
  | 'summer_drinks'
  | 'impressive'
  | 'conversation'
  | 'vintage_theme'
  | 'special_event'
  | 'spring_racing'
  | 'tropical_party'
  | 'poolside'
  | 'tiki_night'
  | 'dessert'
  | 'after_work'
  | 'happy_hour'
  | 'weekend'
  | 'holiday'
  | string; // Allow additional values

// ============================================================================
// COCKTAIL INGREDIENT - Specific to cocktails
// ============================================================================

export interface CocktailIngredient extends ProductIngredient {
  /** Display name override for menu (e.g., "Fresh lime juice" instead of just ingredient name) */
  display_name?: MultiLangText;
  /** Whether this ingredient can be substituted */
  substitutable?: boolean;
  /** Suggested substitutes (ingredient IDs) */
  substitutes?: string[];
}

// ============================================================================
// COCKTAIL HISTORY - Rich metadata for menu enrichment
// ============================================================================

export interface CocktailHistory {
  /** When the cocktail was created (year or circa) */
  created_year?: number | string; // Can be "1880s" or "circa 1920"

  /** Where the cocktail was created (city, bar, country) */
  origin?: {
    city?: string;
    state?: string;
    bar?: string;
    country?: string;
  };

  /** Who created it */
  creator?: {
    name?: string;
    profession?: string; // "bartender", "bar owner", etc.
  };

  /** Why/how it was created - the story */
  story?: MultiLangText;

  /** Named after (if applicable) */
  named_after?: MultiLangText;
}

// ============================================================================
// COCKTAIL TASTE - Detailed taste description
// ============================================================================

export interface CocktailTaste {
  /** Primary flavor profile */
  profile: FlavorProfile[];

  /** Detailed taste description */
  description?: MultiLangText;

  /** What flavors come through first */
  first_impression?: MultiLangText;

  /** What flavors linger */
  finish?: MultiLangText;

  /** Balance description (e.g., "perfectly balanced sweet and sour") */
  balance?: MultiLangText;
}

// ============================================================================
// COCKTAIL RECOMMENDATIONS
// ============================================================================

export interface CocktailRecommendations {
  /** Best time to enjoy */
  best_time?: (
    | 'afternoon'
    | 'evening'
    | 'late_night'
    | 'night'
    | 'daytime'
    | 'happy_hour'
    | 'pre-dinner'
    | 'late_afternoon'
    | 'after_dinner'
    | 'summer_day'
    | 'winter_evening'
    | 'aperitivo'
    | 'any'
    | 'early_evening'
    | 'brunch'
    | 'poolside'
    | 'dessert'
    | 'morning'
    | string
  )[];

  /** Best occasions */
  occasions?: OccasionTag[];

  /** Best seasons */
  seasons?: SeasonTag[];

  /** Food pairings */
  food_pairings?: MultiLangText;

  /** Who would enjoy this (e.g., "For gin lovers", "Perfect for whiskey beginners") */
  ideal_for?: MultiLangText;
}

// ============================================================================
// COCKTAIL - Main Type
// ============================================================================

export interface Cocktail {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────

  /** Unique ID (UUID from seed file) */
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

  /** IBA official or famous non-IBA */
  status: 'iba_official' | 'famous';

  /** IBA category (only for IBA cocktails) */
  iba_category?: IBACategory;

  /** Tags for filtering */
  tags: string[];

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────

  /** Short description of the cocktail */
  description: MultiLangText;

  /** Rich historical information */
  history?: CocktailHistory;

  /** Detailed taste description */
  taste?: CocktailTaste;

  /** Consumption recommendations */
  recommendations?: CocktailRecommendations;

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────

  /** Ingredients with quantities */
  ingredients: CocktailIngredient[];

  /** Preparation method */
  method: CocktailMethod;

  /** Step-by-step instructions */
  instructions: MultiLangText;

  /** Serving glass */
  glass: string;

  /** Garnish description */
  garnish: MultiLangText;

  /** Ice type */
  ice: CocktailIce;

  /** Serving style */
  serving_style: ServingStyle;

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────

  /** Base spirits used */
  base_spirits: string[]; // Ingredient IDs

  /** Flavor profile tags */
  flavor_profile: FlavorProfile[];

  /** Estimated ABV percentage */
  abv_estimate: number;

  /** Estimated calories per serving */
  calories_estimate: number;

  /** Difficulty to prepare */
  difficulty: CocktailDifficulty;

  /** Preparation time in seconds */
  prep_time_seconds: number;

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED (from ingredients)
  // ─────────────────────────────────────────────────────────────────────────

  computed: {
    /** Allergens from ingredients */
    allergens: string[];

    /** Intolerances triggered */
    intolerances: string[];

    /** Compatible diets (very few for cocktails due to alcohol) */
    suitable_for_diets: string[];

    /** Spice level (for spicy cocktails like Bloody Mary) */
    spice_level: SpiceLevel;
  };

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────

  /** Diet compatibility tags */
  diet_tags: string[];

  /** Season recommendations */
  season_tags: SeasonTag[];

  /** Occasion recommendations */
  occasion_tags: OccasionTag[];

  /** Is this a mocktail (non-alcoholic)? */
  is_mocktail: boolean;

  /** Is this a signature/house cocktail? */
  is_signature: boolean;

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────

  /** Related cocktail variants (slugs or objects with name/description) */
  variants: (string | { name: string; description: string })[];

  /** Internal notes for bar staff */
  notes_for_staff?: string;

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────

  /** Price tier */
  price_tier: PriceTier;

  /** Popularity score (1-100) */
  popularity?: number;

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────

  source: {
    /** Primary source URL */
    primary: string;
    /** Additional notes about sources */
    notes?: string;
  };

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────

  created_at: string;
  updated_at: string;
  version: number;
}

// Types are exported inline above with their definitions
