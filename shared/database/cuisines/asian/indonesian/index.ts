// Indonesian Cuisine Database
// GUDBRO Database Standards v1.7

export * from './types';

// Data imports
import { riceDishes } from './data/rice';
import { noodleDishes } from './data/noodles';
import { satayDishes } from './data/satay';
import { soupDishes } from './data/soup';
import { curryDishes } from './data/curry';
import { friedDishes } from './data/fried';
import { saladDishes } from './data/salad';
import { snacksDishes } from './data/snacks';
import { dessertDishes } from './data/desserts';

// Combined exports
export const allIndonesianDishes = [
  ...riceDishes,
  ...noodleDishes,
  ...satayDishes,
  ...soupDishes,
  ...curryDishes,
  ...friedDishes,
  ...saladDishes,
  ...snacksDishes,
  ...dessertDishes
];

// Category exports
export {
  riceDishes,
  noodleDishes,
  satayDishes,
  soupDishes,
  curryDishes,
  friedDishes,
  saladDishes,
  snacksDishes,
  dessertDishes
};

// Stats
export const indonesianStats = {
  totalDishes: allIndonesianDishes.length,
  byCategory: {
    rice: riceDishes.length,
    noodles: noodleDishes.length,
    satay: satayDishes.length,
    soup: soupDishes.length,
    curry: curryDishes.length,
    fried: friedDishes.length,
    salad: saladDishes.length,
    snacks: snacksDishes.length,
    desserts: dessertDishes.length
  }
};
