// Venezuelan Cuisine - Data Index
// GUDBRO Database Standards v1.7

export * from './arepas';
export * from './mains';
export * from './soups';
export * from './street-food';
export * from './seafood';
export * from './desserts';
export * from './beverages';

import { arepas } from './arepas';
import { mains } from './mains';
import { soups } from './soups';
import { streetFood } from './street-food';
import { seafood } from './seafood';
import { desserts } from './desserts';
import { beverages } from './beverages';

export const allVenezuelanDishes = [
  ...arepas,       // 7
  ...mains,        // 6
  ...soups,        // 4
  ...streetFood,   // 7
  ...seafood,      // 4
  ...desserts,     // 6
  ...beverages,    // 5
];

// Total: 39 dishes
