// Cajun/Creole Cuisine - Data Index
// Louisiana regional cuisine - both rural Cajun and urban Creole traditions

import { gumbo } from './gumbo';
import { riceDishes } from './rice-dishes';
import { seafood } from './seafood';
import { sandwiches } from './sandwiches';
import { meat } from './meat';
import { desserts } from './desserts';
import { beverages } from './beverages';
import { sides } from './sides';

export const allCajunDishes = [
  ...gumbo,           // 3 dishes
  ...riceDishes,      // 4 dishes
  ...seafood,         // 8 dishes
  ...sandwiches,      // 4 dishes
  ...meat,            // 6 dishes
  ...desserts,        // 6 dishes
  ...beverages,       // 5 dishes
  ...sides,           // 6 dishes
];

// Total: 42 dishes

export {
  gumbo,
  riceDishes,
  seafood,
  sandwiches,
  meat,
  desserts,
  beverages,
  sides,
};
