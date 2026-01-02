import { curryItems } from './curries';
import { biryaniRiceItems } from './biryani-rice';
import { tandooriItems } from './tandoori';
import { breadItems } from './breads';
import { appetizerItems } from './appetizers';
import { dalItems } from './dals';
import { vegetarianItems } from './vegetarian';
import { streetFoodItems } from './street-food';

// Re-export all category arrays
export {
  curryItems,
  biryaniRiceItems,
  tandooriItems,
  breadItems,
  appetizerItems,
  dalItems,
  vegetarianItems,
  streetFoodItems
};

// Combined array of all Indian dishes
export const allIndianItems = [
  ...curryItems,
  ...biryaniRiceItems,
  ...tandooriItems,
  ...breadItems,
  ...appetizerItems,
  ...dalItems,
  ...vegetarianItems,
  ...streetFoodItems
];

// Statistics
export const indianStats = {
  total: allIndianItems.length,
  byCategory: {
    curries: curryItems.length,
    biryani_rice: biryaniRiceItems.length,
    tandoori: tandooriItems.length,
    breads: breadItems.length,
    appetizers: appetizerItems.length,
    dals: dalItems.length,
    vegetarian: vegetarianItems.length,
    street_food: streetFoodItems.length
  }
};

// Log stats when imported
console.log(`Indian Database: ${allIndianItems.length} items loaded`);
console.log('By category:', indianStats.byCategory);
