// ============================================
// BRITISH CUISINE - Data Index
// ============================================

export { breakfastDishes } from './breakfast';
export { mainDishes } from './main';
export { pubDishes } from './pub';
export { seafoodDishes } from './seafood';
export { regionalDishes } from './regional';
export { dessertDishes } from './dessert';

import { breakfastDishes } from './breakfast';
import { mainDishes } from './main';
import { pubDishes } from './pub';
import { seafoodDishes } from './seafood';
import { regionalDishes } from './regional';
import { dessertDishes } from './dessert';

export const allBritishDishes = [
  ...breakfastDishes,
  ...mainDishes,
  ...pubDishes,
  ...seafoodDishes,
  ...regionalDishes,
  ...dessertDishes
];

// Total: 44 dishes
// - breakfast: 6
// - main: 10
// - pub: 8
// - seafood: 5
// - regional: 7
// - dessert: 8
