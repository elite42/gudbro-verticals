// ============================================
// FRIED FOODS Data Index - GUDBRO Database Standards v1.1
// ============================================

import { friedChickenItems } from './fried-chicken';
import { friedSeafoodItems } from './fried-seafood';
import { friedVegetablesItems } from './fried-vegetables';
import { friedAppetizersItems } from './fried-appetizers';
import { friedSnacksItems } from './fried-snacks';
import { friedInternationalItems } from './fried-international';
import { FriedItem, FriedCategory, FriedOrigin, FriedStatus } from '../types';

// Export individual collections
export {
  friedChickenItems,
  friedSeafoodItems,
  friedVegetablesItems,
  friedAppetizersItems,
  friedSnacksItems,
  friedInternationalItems,
};

// Export combined collection
export const allFriedFoods: FriedItem[] = [
  ...friedChickenItems,
  ...friedSeafoodItems,
  ...friedVegetablesItems,
  ...friedAppetizersItems,
  ...friedSnacksItems,
  ...friedInternationalItems,
];

// Statistics
export const friedStats = {
  total: allFriedFoods.length,

  byCategory: {
    fried_chicken: friedChickenItems.length,
    fried_seafood: friedSeafoodItems.length,
    fried_vegetables: friedVegetablesItems.length,
    fried_appetizers: friedAppetizersItems.length,
    fried_snacks: friedSnacksItems.length,
    fried_international: friedInternationalItems.length,
  } as Record<FriedCategory, number>,

  byOrigin: allFriedFoods.reduce((acc, item) => {
    acc[item.origin] = (acc[item.origin] || 0) + 1;
    return acc;
  }, {} as Record<FriedOrigin, number>),

  byStatus: allFriedFoods.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<FriedStatus, number>),

  dietary: {
    vegan: allFriedFoods.filter(i => i.is_vegan).length,
    vegetarian: allFriedFoods.filter(i => i.is_vegetarian).length,
    glutenFree: allFriedFoods.filter(i => i.is_gluten_free).length,
    dairyFree: allFriedFoods.filter(i => i.is_dairy_free).length,
  },

  avgPopularity: Math.round(
    allFriedFoods.reduce((sum, item) => sum + item.popularity, 0) / allFriedFoods.length
  ),
};

// Log stats on import
console.log(`Fried Foods Database: ${allFriedFoods.length} items loaded`);
console.log('By category:', friedStats.byCategory);
