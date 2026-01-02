// Thai Database - Data Index
// Total: 55 dishes

export * from './curries';
export * from './stir-fries';
export * from './soups';
export * from './salads';
export * from './noodles';
export * from './rice-dishes';
export * from './appetizers';
export * from './grilled';
export * from './seafood';
export * from './desserts';

import { curryItems } from './curries';
import { stirFryItems } from './stir-fries';
import { soupItems } from './soups';
import { saladItems } from './salads';
import { noodleItems } from './noodles';
import { riceDishItems } from './rice-dishes';
import { appetizerItems } from './appetizers';
import { grilledItems } from './grilled';
import { seafoodItems } from './seafood';
import { dessertItems } from './desserts';

export const allThaiItems = [
  ...curryItems,      // 8 items
  ...stirFryItems,    // 9 items
  ...soupItems,       // 6 items
  ...saladItems,      // 7 items
  ...noodleItems,     // 6 items
  ...riceDishItems,   // 7 items
  ...appetizerItems,  // 7 items
  ...grilledItems,    // 6 items
  ...seafoodItems,    // 7 items
  ...dessertItems,    // 6 items
];

// Category counts for reference
export const thaiCategoryCounts = {
  curries: curryItems.length,
  stir_fries: stirFryItems.length,
  soups: soupItems.length,
  salads: saladItems.length,
  noodles: noodleItems.length,
  rice_dishes: riceDishItems.length,
  appetizers: appetizerItems.length,
  grilled: grilledItems.length,
  seafood: seafoodItems.length,
  desserts: dessertItems.length,
  total: allThaiItems.length,
};

console.log('Thai Database loaded:', thaiCategoryCounts);
