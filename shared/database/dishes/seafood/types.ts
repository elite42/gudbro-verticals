// ============================================
// GUDBRO Seafood Types - DATABASE-STANDARDS v1.1
// ============================================

/**
 * Seafood Categories (5)
 * - fish: Whole fish and fish dishes (grilled, baked, fried)
 * - shellfish: Mollusks - clams, mussels, oysters, scallops
 * - crustaceans: Shrimp, lobster, crab, crawfish
 * - raw_bar: Raw preparations - ceviche, crudo, tartare
 * - mixed_seafood: Paella, bouillabaisse, seafood platters
 */
export type SeafoodCategory =
  | 'fish'
  | 'shellfish'
  | 'crustaceans'
  | 'raw_bar'
  | 'mixed_seafood';

/**
 * Seafood Status
 */
export type SeafoodStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'signature'
  | 'seasonal'
  | 'premium'
  | 'traditional';

/**
 * Culinary Styles (15+)
 */
export type SeafoodStyle =
  | 'mediterranean'
  | 'italian'
  | 'french'
  | 'spanish'
  | 'portuguese'
  | 'greek'
  | 'american'
  | 'cajun'
  | 'japanese'
  | 'thai'
  | 'vietnamese'
  | 'korean'
  | 'chinese'
  | 'mexican'
  | 'peruvian'
  | 'caribbean'
  | 'british'
  | 'scandinavian'
  | 'indian'
  | 'international';

/**
 * Cooking Methods
 */
export type SeafoodCookingMethod =
  | 'grilled'
  | 'pan_seared'
  | 'baked'
  | 'fried'
  | 'deep_fried'
  | 'steamed'
  | 'poached'
  | 'roasted'
  | 'smoked'
  | 'raw'
  | 'cured'
  | 'braised'
  | 'stewed'
  | 'blackened';

/**
 * Fish/Seafood Types
 */
export type SeafoodType =
  // Fish
  | 'salmon'
  | 'tuna'
  | 'cod'
  | 'sea_bass'
  | 'branzino'
  | 'halibut'
  | 'swordfish'
  | 'mahi_mahi'
  | 'snapper'
  | 'trout'
  | 'sole'
  | 'flounder'
  | 'sardines'
  | 'mackerel'
  | 'anchovy'
  | 'monkfish'
  // Shellfish
  | 'clams'
  | 'mussels'
  | 'oysters'
  | 'scallops'
  | 'squid'
  | 'octopus'
  // Crustaceans
  | 'shrimp'
  | 'lobster'
  | 'crab'
  | 'crawfish'
  | 'langoustine'
  // Mixed
  | 'mixed_seafood';

/**
 * Seafood Item Interface
 */
export interface SeafoodItem {
  // IDENTIFICATION
  id: string;                       // SFD_{NAME}
  slug: string;                     // lowercase-hyphens

  // INFO BASE (English only)
  name: string;                     // Title Case
  description: string;              // English description

  // CLASSIFICATION
  category: SeafoodCategory;
  status: SeafoodStatus;
  style: SeafoodStyle;

  // SEAFOOD SPECIFIC
  seafood_type: SeafoodType;
  cooking_method: SeafoodCookingMethod;
  is_sustainable?: boolean;         // MSC certified or sustainable sourcing
  is_wild_caught?: boolean;         // vs farm-raised

  // ORIGIN
  origin_country?: string;
  origin_region?: string;

  // SERVING
  serves?: number;
  recommended_sides?: string[];
  wine_pairing?: string[];

  // INGREDIENTS
  ingredient_ids: string[];         // ING_* references

  // SISTEMA 5 DIMENSIONI
  allergens: string[];
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_nut_free: boolean;
  is_vegan: boolean;                // Always false for seafood
  is_vegetarian: boolean;           // Always false for seafood
  is_halal: boolean;
  is_kosher: boolean;

  // NUTRITION
  calories_per_serving?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  omega3_mg?: number;               // Seafood-specific

  // METADATA
  spice_level: number;              // 0-5
  tags: string[];
  popularity: number;               // 0-100
}

// ============================================
// STATS
// ============================================
// Target: 50-60 dishes across 5 categories
// Categories distribution:
//   - fish: ~20 dishes
//   - crustaceans: ~12 dishes
//   - shellfish: ~8 dishes
//   - raw_bar: ~8 dishes
//   - mixed_seafood: ~7 dishes
