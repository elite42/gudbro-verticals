// Colombian Cuisine - Data Index
// GUDBRO Database Standards v1.7

export * from './soups';
export * from './mains';
export * from './breakfast';
export * from './street-food';
export * from './seafood';
export * from './desserts';
export * from './beverages';

import { soups } from './soups';
import { mains } from './mains';
import { breakfast } from './breakfast';
import { streetFood } from './street-food';
import { seafood } from './seafood';
import { desserts } from './desserts';
import { beverages } from './beverages';

export const allColombianDishes = [
  ...soups,        // 6
  ...mains,        // 8
  ...breakfast,    // 5
  ...streetFood,   // 8
  ...seafood,      // 5
  ...desserts,     // 7
  ...beverages,    // 6
];

// Total: 45 dishes
