// ============================================
// Brazilian Database - Data Index
// GUDBRO Database Standards v1.2
// ============================================

export { churrascoItems } from './churrasco';
export { feijoadaItems } from './feijoada';
export { streetFoodItems } from './street-food';
export { seafoodItems } from './seafood';
export { riceBeansItems } from './rice-beans';
export { northeasternItems } from './northeastern';
export { soupsStewsItems } from './soups-stews';
export { dessertsItems } from './desserts';
export { snacksItems } from './snacks';
export { drinksItems } from './drinks';

import { churrascoItems } from './churrasco';
import { feijoadaItems } from './feijoada';
import { streetFoodItems } from './street-food';
import { seafoodItems } from './seafood';
import { riceBeansItems } from './rice-beans';
import { northeasternItems } from './northeastern';
import { soupsStewsItems } from './soups-stews';
import { dessertsItems } from './desserts';
import { snacksItems } from './snacks';
import { drinksItems } from './drinks';

// All Brazilian items combined
export const allBrazilianItems = [
  ...churrascoItems,      // 10 items
  ...feijoadaItems,       // 7 items
  ...streetFoodItems,     // 10 items
  ...seafoodItems,        // 10 items
  ...riceBeansItems,      // 8 items
  ...northeasternItems,   // 10 items
  ...soupsStewsItems,     // 8 items
  ...dessertsItems,       // 10 items
  ...snacksItems,         // 8 items
  ...drinksItems,         // 10 items
];

// Category counts
export const brazilianCategoryCounts = {
  churrasco: churrascoItems.length,
  feijoada: feijoadaItems.length,
  street_food: streetFoodItems.length,
  seafood: seafoodItems.length,
  rice_beans: riceBeansItems.length,
  northeastern: northeasternItems.length,
  soups_stews: soupsStewsItems.length,
  desserts: dessertsItems.length,
  snacks: snacksItems.length,
  drinks: drinksItems.length,
  total: allBrazilianItems.length,
};

// Debug: Print counts
console.log('Brazilian Database Counts:', brazilianCategoryCounts);
