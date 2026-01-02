// Senegalese Cuisine - Data Index
// Total: 25 dishes

export { riceDishes } from './rice';
export { stews } from './stews';
export { soups } from './soups';
export { grilledDishes } from './grilled';
export { streetFood } from './street-food';
export { desserts } from './desserts';
export { beverages } from './beverages';

import { riceDishes } from './rice';
import { stews } from './stews';
import { soups } from './soups';
import { grilledDishes } from './grilled';
import { streetFood } from './street-food';
import { desserts } from './desserts';
import { beverages } from './beverages';

export const allSenegaleseDishes = [
  ...riceDishes,        // 5 dishes
  ...stews,             // 4 dishes
  ...soups,             // 3 dishes
  ...grilledDishes,     // 3 dishes
  ...streetFood,        // 4 dishes
  ...desserts,          // 4 dishes
  ...beverages,         // 5 dishes
];

// Summary: 28 dishes total
