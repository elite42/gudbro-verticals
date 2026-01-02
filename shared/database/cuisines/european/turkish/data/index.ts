// Turkish Cuisine Database - Data Index
// Total: 86 dishes across 10 categories

export { kebabDishes } from './kebabs';
export { pideLahmacunDishes } from './pide-lahmacun';
export { mezeDishes } from './mezes';
export { borekDishes } from './borek';
export { soupDishes } from './soups';
export { ricePilavDishes } from './rice-pilav';
export { dolmaSarmaDishes } from './dolma-sarma';
export { stewDishes } from './stews';
export { seafoodDishes } from './seafood';
export { dessertDishes } from './desserts';

import { kebabDishes } from './kebabs';
import { pideLahmacunDishes } from './pide-lahmacun';
import { mezeDishes } from './mezes';
import { borekDishes } from './borek';
import { soupDishes } from './soups';
import { ricePilavDishes } from './rice-pilav';
import { dolmaSarmaDishes } from './dolma-sarma';
import { stewDishes } from './stews';
import { seafoodDishes } from './seafood';
import { dessertDishes } from './desserts';
import { TurkishItem } from '../types';

// All dishes combined
export const allTurkishDishes: TurkishItem[] = [
  ...kebabDishes,         // 10 dishes
  ...pideLahmacunDishes,  // 8 dishes
  ...mezeDishes,          // 12 dishes
  ...borekDishes,         // 8 dishes
  ...soupDishes,          // 10 dishes
  ...ricePilavDishes,     // 8 dishes
  ...dolmaSarmaDishes,    // 10 dishes
  ...stewDishes,          // 10 dishes
  ...seafoodDishes,       // 10 dishes
  ...dessertDishes,       // 12 dishes
];

// Category counts
export const turkishCategoryCounts = {
  kebabs: kebabDishes.length,
  pide_lahmacun: pideLahmacunDishes.length,
  mezes: mezeDishes.length,
  borek: borekDishes.length,
  soups: soupDishes.length,
  rice_pilav: ricePilavDishes.length,
  dolma_sarma: dolmaSarmaDishes.length,
  stews: stewDishes.length,
  seafood: seafoodDishes.length,
  desserts: dessertDishes.length,
  total: allTurkishDishes.length,
};

// Stats
console.log('Turkish Cuisine Database Stats:');
console.log('================================');
Object.entries(turkishCategoryCounts).forEach(([cat, count]) => {
  console.log(`${cat}: ${count}`);
});
