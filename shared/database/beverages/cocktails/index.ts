/**
 * GUDBRO Cocktail Database - Unified Export
 *
 * Complete cocktail database: 118 IBA Official + 120 Famous Non-IBA = 238 Total
 *
 * Structure:
 * - IBA Official Cocktails (118 total)
 *   - Unforgettables (40 classics)
 *   - Contemporary Classics (36 modern classics)
 *   - New Era Drinks (38 modern cocktails)
 *
 * - Famous Non-IBA Cocktails (120 total)
 *   - Tiki & Tropical
 *   - Classic & Vintage
 *   - Modern Classics
 *   - Highballs & Long Drinks
 *   - Creamy & Dessert
 *   - Shots & Shooters
 *
 * @version 2.0
 * @lastUpdated 2025-12-14
 */

import type { Cocktail } from '../types/cocktail';

// ============================================================================
// IBA OFFICIAL COCKTAILS
// ============================================================================

export {
  ibaUnforgettables,
  IBA_UNFORGETTABLES_COUNT,
} from './iba-unforgettables';

export {
  ibaContemporary,
  IBA_CONTEMPORARY_COUNT,
} from './iba-contemporary';

export {
  ibaNewEra,
  IBA_NEW_ERA_COUNT,
} from './iba-new-era';

// ============================================================================
// FAMOUS NON-IBA COCKTAILS
// ============================================================================

export {
  famousCocktails,
  FAMOUS_COCKTAILS_COUNT,
} from './famous';

// ============================================================================
// COMBINED DATABASE
// ============================================================================

import { ibaUnforgettables, IBA_UNFORGETTABLES_COUNT } from './iba-unforgettables';
import { ibaContemporary, IBA_CONTEMPORARY_COUNT } from './iba-contemporary';
import { ibaNewEra, IBA_NEW_ERA_COUNT } from './iba-new-era';
import { famousCocktails, FAMOUS_COCKTAILS_COUNT } from './famous';

/**
 * All IBA Official Cocktails
 */
export const allIBACocktails: Cocktail[] = [
  ...ibaUnforgettables,
  ...ibaContemporary,
  ...ibaNewEra,
];

/**
 * All Famous Non-IBA Cocktails
 */
export const allFamousCocktails: Cocktail[] = [
  ...famousCocktails,
];

/**
 * Complete Cocktail Database (IBA + Famous)
 */
export const allCocktails: Cocktail[] = [
  ...allIBACocktails,
  ...allFamousCocktails,
];

/**
 * Cocktail counts
 */
export const COCKTAIL_COUNTS = {
  iba: {
    unforgettables: IBA_UNFORGETTABLES_COUNT,
    contemporary: IBA_CONTEMPORARY_COUNT,
    newEra: IBA_NEW_ERA_COUNT,
    total: allIBACocktails.length,
  },
  famous: FAMOUS_COCKTAILS_COUNT,
  total: allCocktails.length,
};

export const TOTAL_COCKTAILS = allCocktails.length;

// Re-export types
export type { Cocktail } from '../types/cocktail';
