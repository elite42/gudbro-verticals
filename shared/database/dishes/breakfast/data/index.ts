import { BreakfastItem } from '../types';
import { eggsItems } from './eggs';
import { pancakesWafflesItems } from './pancakes-waffles';
import { pastriesItems } from './pastries';
import { cerealsBowlsItems } from './cereals-bowls';
import { savoryItems } from './savory';
import { internationalItems } from './international';

/**
 * All breakfast items combined
 * Total: 65 items
 *
 * Categories breakdown:
 * - Eggs: 10 items
 * - Pancakes & Waffles: 10 items
 * - Pastries: 10 items
 * - Cereals & Bowls: 10 items
 * - Savory: 10 items
 * - International: 15 items
 */
export const allBreakfastItems: BreakfastItem[] = [
  ...eggsItems,
  ...pancakesWafflesItems,
  ...pastriesItems,
  ...cerealsBowlsItems,
  ...savoryItems,
  ...internationalItems,
];

// Re-export individual categories
export { eggsItems } from './eggs';
export { pancakesWafflesItems } from './pancakes-waffles';
export { pastriesItems } from './pastries';
export { cerealsBowlsItems } from './cereals-bowls';
export { savoryItems } from './savory';
export { internationalItems } from './international';

// Export statistics
export const breakfastStats = {
  total: allBreakfastItems.length,
  byCategory: {
    eggs: eggsItems.length,
    pancakes_waffles: pancakesWafflesItems.length,
    pastries: pastriesItems.length,
    cereals_bowls: cerealsBowlsItems.length,
    savory: savoryItems.length,
    international: internationalItems.length,
  },
  byOrigin: allBreakfastItems.reduce((acc, item) => {
    acc[item.origin] = (acc[item.origin] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  avgPopularity: Math.round(
    allBreakfastItems.reduce((sum, item) => sum + item.popularity, 0) / allBreakfastItems.length
  ),
  uniqueIngredients: new Set(allBreakfastItems.flatMap(item => item.ingredient_ids)).size,
};

// Validation
console.log(`Breakfast database: ${allBreakfastItems.length} items loaded`);
console.log(`Categories: ${Object.entries(breakfastStats.byCategory).map(([k, v]) => `${k}(${v})`).join(', ')}`);
