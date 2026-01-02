// ============================================
// PORTUGUESE CUISINE - Data Index
// GUDBRO Database Standards v1.7
// ============================================

import bacalhauDishes from './bacalhau';
import seafoodDishes from './seafood';
import meatDishes from './meat';
import soupDishes from './soups';
import sandwichDishes from './sandwiches';
import dessertDishes from './desserts';
import { PortugueseDish } from '../types';

// Combine all dishes
export const allPortugueseDishes: PortugueseDish[] = [
  ...bacalhauDishes,
  ...seafoodDishes,
  ...meatDishes,
  ...soupDishes,
  ...sandwichDishes,
  ...dessertDishes,
];

// Export by category
export {
  bacalhauDishes,
  seafoodDishes,
  meatDishes,
  soupDishes,
  sandwichDishes,
  dessertDishes,
};

// Summary
export const PORTUGUESE_SUMMARY = {
  total: allPortugueseDishes.length,
  byCategory: {
    bacalhau: bacalhauDishes.length,
    seafood: seafoodDishes.length,
    meat: meatDishes.length,
    soup: soupDishes.length,
    sandwich: sandwichDishes.length,
    dessert: dessertDishes.length,
  },
};

// Debug: Print summary
console.log('Portuguese Cuisine Database:');
console.log(`Total dishes: ${PORTUGUESE_SUMMARY.total}`);
console.log('By category:', PORTUGUESE_SUMMARY.byCategory);
