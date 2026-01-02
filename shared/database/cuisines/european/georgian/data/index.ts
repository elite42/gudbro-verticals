// ============================================
// GEORGIAN DATABASE - Data Index
// ============================================
// Exports all Georgian dishes
// ============================================

export * from './khachapuri';
export * from './khinkali';
export * from './grilled-meats';
export * from './stews-mains';
export * from './soups';
export * from './appetizers';
export * from './breads-pastries';
export * from './sauces';
export * from './salads-sides';
export * from './desserts';

import { khachapuriDishes } from './khachapuri';
import { khinkaliDishes } from './khinkali';
import { grilledMeatsDishes } from './grilled-meats';
import { stewsMainsDishes } from './stews-mains';
import { soupDishes } from './soups';
import { appetizerDishes } from './appetizers';
import { breadsPastriesDishes } from './breads-pastries';
import { sauceDishes } from './sauces';
import { saladsSidesDishes } from './salads-sides';
import { dessertDishes } from './desserts';

export const allGeorgianDishes = [
  ...khachapuriDishes,      // 8 dishes
  ...khinkaliDishes,        // 6 dishes
  ...grilledMeatsDishes,    // 8 dishes
  ...stewsMainsDishes,      // 10 dishes
  ...soupDishes,            // 6 dishes
  ...appetizerDishes,       // 10 dishes
  ...breadsPastriesDishes,  // 6 dishes
  ...sauceDishes,           // 6 dishes
  ...saladsSidesDishes,     // 6 dishes
  ...dessertDishes,         // 8 dishes
];

// Total: 74 Georgian dishes

console.log(`Total Georgian dishes: ${allGeorgianDishes.length}`);
