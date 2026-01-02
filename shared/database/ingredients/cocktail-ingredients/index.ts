/**
 * GUDBRO Cocktail Ingredients - Unified Export
 *
 * Complete ingredient database for cocktails with 5 Dimensioni data.
 * Used for the 222 cocktails database (102 IBA + 120 Famous).
 *
 * Categories:
 * - Spirits: 38 ingredients (gin, vodka, rum, whiskey, tequila, brandy, etc.)
 * - Liqueurs: 42 ingredients (triple sec, amaretto, kahlua, etc.)
 * - Amari & Vermouth: 24 ingredients (Campari, Aperol, vermouth, etc.)
 * - Bitters: 12 ingredients (Angostura, Peychaud's, orange, etc.)
 * - Mixers: 40 ingredients (juices, sodas, syrups, eggs, cream)
 * - Garnish: 38 ingredients (citrus, olives, cherries, herbs)
 * - Wines & Fortified: 20 ingredients (champagne, prosecco, sherry, port)
 *
 * Total: ~214 cocktail-specific ingredients
 *
 * @version 1.0
 * @lastUpdated 2025-12-13
 */

// Individual exports
export { spiritsIngredients, SPIRITS_COUNT } from './spirits';
export { liqueursIngredients, LIQUEURS_COUNT } from './liqueurs';
export { amariVermouthIngredients, AMARI_VERMOUTH_COUNT } from './amari-vermouth';
export { bittersIngredients, BITTERS_COUNT } from './bitters';
export { mixersIngredients, MIXERS_COUNT } from './mixers';
export { garnishIngredients, GARNISH_COUNT } from './garnish';
export { winesFortifiedIngredients, WINES_FORTIFIED_COUNT } from './wines-fortified';

// Import for combined export
import { spiritsIngredients } from './spirits';
import { liqueursIngredients } from './liqueurs';
import { amariVermouthIngredients } from './amari-vermouth';
import { bittersIngredients } from './bitters';
import { mixersIngredients } from './mixers';
import { garnishIngredients } from './garnish';
import { winesFortifiedIngredients } from './wines-fortified';

/**
 * All cocktail ingredients combined
 * Use this for searching across all cocktail ingredient categories
 */
export const allCocktailIngredients = [
  ...spiritsIngredients,
  ...liqueursIngredients,
  ...amariVermouthIngredients,
  ...bittersIngredients,
  ...mixersIngredients,
  ...garnishIngredients,
  ...winesFortifiedIngredients,
];

/**
 * Total count of cocktail-specific ingredients
 */
export const COCKTAIL_INGREDIENTS_TOTAL = allCocktailIngredients.length;

/**
 * Ingredient counts by category
 */
export const COCKTAIL_INGREDIENT_COUNTS = {
  spirits: spiritsIngredients.length,
  liqueurs: liqueursIngredients.length,
  amariVermouth: amariVermouthIngredients.length,
  bitters: bittersIngredients.length,
  mixers: mixersIngredients.length,
  garnish: garnishIngredients.length,
  winesFortified: winesFortifiedIngredients.length,
  total: allCocktailIngredients.length,
};
