// Hawaiian Cuisine Data Index
// Total: 25 dishes across 8 categories

export * from './poke';
export * from './plate-lunch';
export * from './luau';
export * from './snacks';
export * from './noodles';
export * from './grill';
export * from './desserts';
export * from './beverages';

import { poke } from './poke';
import { plateLunch } from './plate-lunch';
import { luau } from './luau';
import { snacks } from './snacks';
import { noodles } from './noodles';
import { grill } from './grill';
import { desserts } from './desserts';
import { beverages } from './beverages';

export const allHawaiianDishes = [
  ...poke,           // 4 dishes
  ...plateLunch,     // 5 dishes
  ...luau,           // 5 dishes
  ...snacks,         // 4 dishes
  ...noodles,        // 2 dishes
  ...grill,          // 3 dishes
  ...desserts,       // 4 dishes
  ...beverages,      // 2 dishes
];

// Summary:
// poke: 4 (Ahi Poke, Spicy Ahi, Salmon Poke, Poke Bowl)
// plate_lunch: 5 (Loco Moco, Chicken Katsu, Kalbi, Teriyaki Beef, Mahimahi)
// luau: 5 (Kalua Pig, Laulau, Poi, Chicken Long Rice, Squid Luau)
// snacks: 4 (Spam Musubi, Manapua, Malasada, Hurricane Popcorn)
// noodles: 2 (Saimin, Fried Saimin)
// grill: 3 (Huli Huli Chicken, Portuguese Sausage, Shoyu Chicken)
// desserts: 4 (Haupia, Shave Ice, Butter Mochi, Lilikoi Pie)
// beverages: 2 (POG, Lilikoiade)
// Total: 29 dishes
