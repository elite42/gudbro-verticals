// Dutch Cuisine - Data Index
// GUDBRO Database Standards v1.7

export { stamppotDishes } from './stamppot';
export { snacksDishes } from './snacks';
export { mainsDishes } from './mains';
export { soupsDishes } from './soups';
export { seafoodDishes } from './seafood';
export { pancakesDishes } from './pancakes';
export { dessertsDishes } from './desserts';

import { stamppotDishes } from './stamppot';
import { snacksDishes } from './snacks';
import { mainsDishes } from './mains';
import { soupsDishes } from './soups';
import { seafoodDishes } from './seafood';
import { pancakesDishes } from './pancakes';
import { dessertsDishes } from './desserts';

export const allDutchDishes = [
  ...stamppotDishes,
  ...snacksDishes,
  ...mainsDishes,
  ...soupsDishes,
  ...seafoodDishes,
  ...pancakesDishes,
  ...dessertsDishes
];

// Summary:
// - Stamppot: 5 dishes (boerenkool, hutspot, andijvie, zuurkool, hete bliksem)
// - Snacks: 8 dishes (bitterballen, kroket, frikandel, kaassouffle, kipcorn, etc.)
// - Mains: 5 dishes (hachee, draadjesvlees, balkenbrij, slavink, gehaktbal)
// - Soups: 3 dishes (erwtensoep, bruine bonensoep, koninginnesoep)
// - Seafood: 5 dishes (haring, kibbeling, lekkerbekje, paling, mosselen)
// - Pancakes: 4 dishes (pannenkoek, spekpannenkoek, poffertjes, flensjes)
// - Desserts: 8 dishes (stroopwafel, oliebollen, tompouce, speculaas, etc.)
// Total: 38 dishes
