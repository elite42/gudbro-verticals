// Nigerian Cuisine - Data Index
// GUDBRO Database

export * from './soups';
export * from './swallows';
export * from './rice';
export * from './street-food';
export * from './mains';
export * from './beverages';

import { nigerianSoups } from './soups';
import { nigerianSwallows } from './swallows';
import { nigerianRiceDishes } from './rice';
import { nigerianStreetFood } from './street-food';
import { nigerianMains } from './mains';
import { nigerianBeverages } from './beverages';

export const allNigerianDishes = [
  ...nigerianSoups,
  ...nigerianSwallows,
  ...nigerianRiceDishes,
  ...nigerianStreetFood,
  ...nigerianMains,
  ...nigerianBeverages
];

// Summary:
// - Soups: 10 dishes
// - Swallows: 7 dishes
// - Rice: 5 dishes
// - Street Food: 10 dishes
// - Mains: 9 dishes
// - Beverages: 8 dishes
// Total: 49 dishes
