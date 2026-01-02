// Scandinavian Cuisine - All Dishes
// GUDBRO Database Standards v1.7

export { mainDishes } from './mains';
export { fishDishes } from './fish';
export { openSandwichDishes } from './open_sandwich';
export { soupDishes } from './soups';
export { sideDishes } from './sides';
export { pastryDishes } from './pastries';
export { dessertDishes } from './desserts';

// Re-export all dishes as single array
import { mainDishes } from './mains';
import { fishDishes } from './fish';
import { openSandwichDishes } from './open_sandwich';
import { soupDishes } from './soups';
import { sideDishes } from './sides';
import { pastryDishes } from './pastries';
import { dessertDishes } from './desserts';

export const allScandinavianDishes = [
  ...mainDishes,      // 21 dishes
  ...fishDishes,      // 10 dishes
  ...openSandwichDishes, // 8 dishes
  ...soupDishes,      // 10 dishes
  ...sideDishes,      // 5 dishes
  ...pastryDishes,    // 10 dishes
  ...dessertDishes    // 14 dishes
];

// Total: 78 dishes
