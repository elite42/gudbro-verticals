// South African Cuisine - Data Exports
// GUDBRO Database Standards v1.7

export { braaiDishes } from './braai';
export { stews } from './stews';
export { curries } from './curries';
export { sides } from './sides';
export { snacks } from './snacks';
export { desserts } from './desserts';
export { breads } from './breads';
export { beverages } from './beverages';

// Re-export all dishes as a single array
import { braaiDishes } from './braai';
import { stews } from './stews';
import { curries } from './curries';
import { sides } from './sides';
import { snacks } from './snacks';
import { desserts } from './desserts';
import { breads } from './breads';
import { beverages } from './beverages';

export const allSouthAfricanDishes = [
  ...braaiDishes,    // 5
  ...stews,          // 4
  ...curries,        // 5
  ...sides,          // 6
  ...snacks,         // 6
  ...desserts,       // 6
  ...breads,         // 3
  ...beverages,      // 5
];
// Total: 40 dishes
