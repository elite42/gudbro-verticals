/**
 * GUDBRO Salads Database - Index
 *
 * Complete collection of 55 salads across categories:
 * - Classic International (11)
 * - Italian (9)
 * - Mediterranean (8)
 * - Asian (8)
 * - Bowl & Poke (10)
 * - Healthy & Signature (9)
 */

import { classicSalads } from './classic-salads';
import { italianSalads } from './italian-salads';
import { mediterraneanSalads } from './mediterranean-salads';
import { asianSalads } from './asian-salads';
import { bowlSalads } from './bowl-salads';
import { healthySalads } from './healthy-salads';

import type { Salad } from '../../../types/salad';

// Export individual category arrays
export {
  classicSalads,
  italianSalads,
  mediterraneanSalads,
  asianSalads,
  bowlSalads,
  healthySalads,
};

// Combined array of all salads
export const allSalads: Salad[] = [
  ...classicSalads,
  ...italianSalads,
  ...mediterraneanSalads,
  ...asianSalads,
  ...bowlSalads,
  ...healthySalads,
];

// Export by style for easier filtering
export const saladsByStyle = {
  classic: allSalads.filter(s => s.style === 'classic'),
  italian: allSalads.filter(s => s.style === 'italian'),
  mediterranean: allSalads.filter(s => s.style === 'mediterranean'),
  asian: allSalads.filter(s => s.style === 'asian'),
  bowl: allSalads.filter(s => s.style === 'bowl'),
  poke: allSalads.filter(s => s.style === 'poke'),
  protein: allSalads.filter(s => s.style === 'protein'),
  superfood: allSalads.filter(s => s.style === 'superfood'),
  signature: allSalads.filter(s => s.style === 'signature'),
};

// Export by dietary preference
export const saladsByDiet = {
  vegan: allSalads.filter(s => s.dietary.is_vegan),
  vegetarian: allSalads.filter(s => s.dietary.is_vegetarian),
  glutenFree: allSalads.filter(s => s.dietary.is_gluten_free),
  dairyFree: allSalads.filter(s => s.dietary.is_dairy_free),
  keto: allSalads.filter(s => s.dietary.is_keto_friendly),
  highProtein: allSalads.filter(s => s.dietary.is_high_protein),
};

// Statistics
export const saladStats = {
  total: allSalads.length,
  byStyle: {
    classic: saladsByStyle.classic.length,
    italian: saladsByStyle.italian.length,
    mediterranean: saladsByStyle.mediterranean.length,
    asian: saladsByStyle.asian.length,
    bowl: saladsByStyle.bowl.length,
    poke: saladsByStyle.poke.length,
    protein: saladsByStyle.protein.length,
    superfood: saladsByStyle.superfood.length,
    signature: saladsByStyle.signature.length,
  },
  byDiet: {
    vegan: saladsByDiet.vegan.length,
    vegetarian: saladsByDiet.vegetarian.length,
    glutenFree: saladsByDiet.glutenFree.length,
    dairyFree: saladsByDiet.dairyFree.length,
    keto: saladsByDiet.keto.length,
    highProtein: saladsByDiet.highProtein.length,
  },
};

// Helper functions
export const getSaladBySlug = (slug: string): Salad | undefined =>
  allSalads.find(s => s.slug === slug);

export const getSaladById = (id: string): Salad | undefined =>
  allSalads.find(s => s.id === id);

export const getSaladsByOrigin = (countryCode: string): Salad[] =>
  allSalads.filter(s => s.origin.country_code === countryCode);

export const getSaladsByPopularity = (minScore: number = 80): Salad[] =>
  allSalads.filter(s => s.popularity >= minScore).sort((a, b) => b.popularity - a.popularity);

export const getVeganSalads = (): Salad[] =>
  allSalads.filter(s => s.dietary.is_vegan);

export const getGlutenFreeSalads = (): Salad[] =>
  allSalads.filter(s => s.dietary.is_gluten_free);

export const getHighProteinSalads = (): Salad[] =>
  allSalads.filter(s => s.dietary.is_high_protein);

export default allSalads;
