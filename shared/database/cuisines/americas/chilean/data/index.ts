// Chilean Cuisine - Data Index
// GUDBRO Database Standards v1.7

export * from './empanadas';
export * from './mains';
export * from './soups';
export * from './seafood';
export * from './street-food';
export * from './appetizers';
export * from './desserts';

import { empanadas } from './empanadas';
import { mains } from './mains';
import { soups } from './soups';
import { seafood } from './seafood';
import { streetFood } from './street-food';
import { appetizers } from './appetizers';
import { desserts } from './desserts';

export const allChileanDishes = [
  ...empanadas,      // 5 dishes
  ...mains,          // 8 dishes
  ...soups,          // 5 dishes
  ...seafood,        // 6 dishes
  ...streetFood,     // 6 dishes
  ...appetizers,     // 5 dishes
  ...desserts,       // 8 dishes (includes 2 beverages)
];

// Total: 43 dishes
