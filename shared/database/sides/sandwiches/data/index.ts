/**
 * GUDBRO Sandwiches Database - Index
 *
 * Complete collection of sandwiches:
 * - Italian (10)
 * - International (12)
 * - Wraps & Rolls (8)
 * - Piadine Romagnole (20)
 *
 * Total: 50 sandwiches
 */

import { italianSandwiches } from './italian-sandwiches';
import { internationalSandwiches } from './international-sandwiches';
import { wrapsAndRolls } from './wraps-and-rolls';
import { piadine } from './piadine';

import type { Sandwich } from '../types';

// Export individual category arrays
export { italianSandwiches, internationalSandwiches, wrapsAndRolls, piadine };

// Combined array of all sandwiches
export const allSandwiches: Sandwich[] = [
  ...italianSandwiches,
  ...internationalSandwiches,
  ...wrapsAndRolls,
  ...piadine,
];

// Export by style for easier filtering
export const sandwichesByStyle = {
  italian: allSandwiches.filter((s) => s.style === 'italian'),
  french: allSandwiches.filter((s) => s.style === 'french'),
  american: allSandwiches.filter((s) => s.style === 'american'),
  cuban: allSandwiches.filter((s) => s.style === 'cuban'),
  vietnamese: allSandwiches.filter((s) => s.style === 'vietnamese'),
  middle_eastern: allSandwiches.filter((s) => s.style === 'middle_eastern'),
  mexican: allSandwiches.filter((s) => s.style === 'mexican'),
  greek: allSandwiches.filter((s) => s.style === 'greek'),
  turkish: allSandwiches.filter((s) => s.style === 'turkish'),
  healthy: allSandwiches.filter((s) => s.style === 'healthy'),
};

// Export by dietary preference
export const sandwichesByDiet = {
  vegetarian: allSandwiches.filter((s) => s.dietary.is_vegetarian),
  vegan: allSandwiches.filter((s) => s.dietary.is_vegan),
  glutenFree: allSandwiches.filter((s) => s.dietary.is_gluten_free),
  dairyFree: allSandwiches.filter((s) => s.dietary.is_dairy_free),
  halal: allSandwiches.filter((s) => s.dietary.is_halal),
  highProtein: allSandwiches.filter((s) => s.dietary.is_high_protein),
};

// Export by temperature
export const sandwichesByTemp = {
  hot: allSandwiches.filter((s) => s.is_hot),
  cold: allSandwiches.filter((s) => !s.is_hot),
  pressed: allSandwiches.filter((s) => s.is_pressed),
};

// Statistics
export const sandwichStats = {
  total: allSandwiches.length,
  byCollection: {
    italian: italianSandwiches.length,
    international: internationalSandwiches.length,
    wrapsAndRolls: wrapsAndRolls.length,
    piadine: piadine.length,
  },
  byStyle: Object.fromEntries(
    Object.entries(sandwichesByStyle).map(([k, v]) => [k, v.length])
  ),
  byDiet: Object.fromEntries(
    Object.entries(sandwichesByDiet).map(([k, v]) => [k, v.length])
  ),
  byTemp: {
    hot: sandwichesByTemp.hot.length,
    cold: sandwichesByTemp.cold.length,
    pressed: sandwichesByTemp.pressed.length,
  },
};

// Helper functions
export const getSandwichBySlug = (slug: string): Sandwich | undefined =>
  allSandwiches.find((s) => s.slug === slug);

export const getSandwichById = (id: string): Sandwich | undefined =>
  allSandwiches.find((s) => s.id === id);

export const getSandwichesByOrigin = (countryCode: string): Sandwich[] =>
  allSandwiches.filter((s) => s.origin.country_code === countryCode);

export const getHotSandwiches = (): Sandwich[] =>
  allSandwiches.filter((s) => s.is_hot);

export const getColdSandwiches = (): Sandwich[] =>
  allSandwiches.filter((s) => !s.is_hot);

export const getVegetarianSandwiches = (): Sandwich[] =>
  allSandwiches.filter((s) => s.dietary.is_vegetarian);

export const getHalalSandwiches = (): Sandwich[] =>
  allSandwiches.filter((s) => s.dietary.is_halal);

export default allSandwiches;
