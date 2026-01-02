/**
 * Malaysian Cuisine - Data Index
 * GUDBRO Database Standards v1.7
 *
 * Total dishes: 53
 * Categories: rice (6), noodles (8), satay (6), curry (6), soup (5), fried (6), bread (6), seafood (6), desserts (8)
 */

export { riceDishes } from './rice';
export { noodleDishes } from './noodles';
export { satayDishes } from './satay';
export { curryDishes } from './curry';
export { soupDishes } from './soup';
export { friedDishes } from './fried';
export { breadDishes } from './bread';
export { seafoodDishes } from './seafood';
export { dessertDishes } from './desserts';

// Combined export
import { riceDishes } from './rice';
import { noodleDishes } from './noodles';
import { satayDishes } from './satay';
import { curryDishes } from './curry';
import { soupDishes } from './soup';
import { friedDishes } from './fried';
import { breadDishes } from './bread';
import { seafoodDishes } from './seafood';
import { dessertDishes } from './desserts';

export const allMalaysianDishes = [
  ...riceDishes,
  ...noodleDishes,
  ...satayDishes,
  ...curryDishes,
  ...soupDishes,
  ...friedDishes,
  ...breadDishes,
  ...seafoodDishes,
  ...dessertDishes
];

// Statistics
export const malaysianStats = {
  total: allMalaysianDishes.length,
  byCategory: {
    rice: riceDishes.length,
    noodles: noodleDishes.length,
    satay: satayDishes.length,
    curry: curryDishes.length,
    soup: soupDishes.length,
    fried: friedDishes.length,
    bread: breadDishes.length,
    seafood: seafoodDishes.length,
    desserts: dessertDishes.length
  }
};
