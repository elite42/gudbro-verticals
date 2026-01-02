/**
 * GUDBRO Burgers Database - Index
 *
 * Complete collection of burgers:
 * - Classic American (15)
 * - Gourmet & Premium (15)
 * - Alternative (15: plant-based, chicken, fish, turkey)
 *
 * Total: 45 burgers
 */

import { classicBurgers } from './classic-burgers';
import { gourmetBurgers } from './gourmet-burgers';
import { alternativeBurgers } from './alternative-burgers';

import type { Burger } from '../types';

// Export individual category arrays
export { classicBurgers, gourmetBurgers, alternativeBurgers };

// Combined array of all burgers
export const allBurgers: Burger[] = [
  ...classicBurgers,
  ...gourmetBurgers,
  ...alternativeBurgers,
];

// Export by style for easier filtering
export const burgersByStyle = {
  american_classic: allBurgers.filter((b) => b.style === 'american_classic'),
  american_regional: allBurgers.filter((b) => b.style === 'american_regional'),
  gourmet: allBurgers.filter((b) => b.style === 'gourmet'),
  international: allBurgers.filter((b) => b.style === 'international'),
  plant_based: allBurgers.filter((b) => b.style === 'plant_based'),
  chicken: allBurgers.filter((b) => b.style === 'chicken'),
  fish: allBurgers.filter((b) => b.style === 'fish'),
};

// Export by dietary preference
export const burgersByDiet = {
  vegetarian: allBurgers.filter((b) => b.dietary.is_vegetarian),
  vegan: allBurgers.filter((b) => b.dietary.is_vegan),
  glutenFree: allBurgers.filter((b) => b.dietary.is_gluten_free),
  dairyFree: allBurgers.filter((b) => b.dietary.is_dairy_free),
  halal: allBurgers.filter((b) => b.dietary.is_halal),
  highProtein: allBurgers.filter((b) => b.dietary.is_high_protein),
};

// Export by patty type
export const burgersByPatty = {
  beef: allBurgers.filter((b) => b.patty.type === 'beef'),
  wagyu: allBurgers.filter((b) => b.patty.type === 'wagyu'),
  angus: allBurgers.filter((b) => b.patty.type === 'angus'),
  chicken: allBurgers.filter((b) => b.patty.type === 'chicken'),
  turkey: allBurgers.filter((b) => b.patty.type === 'turkey'),
  lamb: allBurgers.filter((b) => b.patty.type === 'lamb'),
  fish: allBurgers.filter((b) => b.patty.type === 'fish'),
  shrimp: allBurgers.filter((b) => b.patty.type === 'shrimp'),
  plant_based: allBurgers.filter((b) => b.patty.type === 'plant_based'),
  black_bean: allBurgers.filter((b) => b.patty.type === 'black_bean'),
  portobello: allBurgers.filter((b) => b.patty.type === 'portobello'),
};

// Export by spice level
export const burgersBySpice = {
  notSpicy: allBurgers.filter((b) => b.spice_level === 0),
  mild: allBurgers.filter((b) => b.spice_level === 1),
  medium: allBurgers.filter((b) => b.spice_level === 2),
  hot: allBurgers.filter((b) => b.spice_level === 3),
  veryHot: allBurgers.filter((b) => b.spice_level >= 4),
};

// Statistics
export const burgerStats = {
  total: allBurgers.length,
  byCollection: {
    classic: classicBurgers.length,
    gourmet: gourmetBurgers.length,
    alternative: alternativeBurgers.length,
  },
  byStyle: Object.fromEntries(
    Object.entries(burgersByStyle).map(([k, v]) => [k, v.length])
  ),
  byDiet: Object.fromEntries(
    Object.entries(burgersByDiet).map(([k, v]) => [k, v.length])
  ),
  byPatty: Object.fromEntries(
    Object.entries(burgersByPatty).map(([k, v]) => [k, v.length])
  ),
};

// Helper functions
export const getBurgerBySlug = (slug: string): Burger | undefined =>
  allBurgers.find((b) => b.slug === slug);

export const getBurgerById = (id: string): Burger | undefined =>
  allBurgers.find((b) => b.id === id);

export const getBurgersByOrigin = (countryCode: string): Burger[] =>
  allBurgers.filter((b) => b.origin.country_code === countryCode);

export const getSpicyBurgers = (): Burger[] =>
  allBurgers.filter((b) => b.is_spicy);

export const getVegetarianBurgers = (): Burger[] =>
  allBurgers.filter((b) => b.dietary.is_vegetarian);

export const getVeganBurgers = (): Burger[] =>
  allBurgers.filter((b) => b.dietary.is_vegan);

export const getHalalBurgers = (): Burger[] =>
  allBurgers.filter((b) => b.dietary.is_halal);

export const getPremiumBurgers = (): Burger[] =>
  allBurgers.filter((b) => b.pricing?.cost_level === 'premium');

export default allBurgers;
