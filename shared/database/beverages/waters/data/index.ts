// ============================================
// WATERS Database - Index
// GUDBRO Database Standards v1.3
// ============================================

import { stillNaturalItems } from './still-natural';
import { sparklingNaturalItems } from './sparkling-natural';
import { sparklingAddedItems } from './sparkling-added';
import { mineralRichItems } from './mineral-rich';
import { lowMineralItems } from './low-mineral';
import { alkalineItems } from './alkaline';
import { flavoredItems } from './flavored';

export {
  stillNaturalItems,
  sparklingNaturalItems,
  sparklingAddedItems,
  mineralRichItems,
  lowMineralItems,
  alkalineItems,
  flavoredItems
};

export const allWaters = [
  ...stillNaturalItems,
  ...sparklingNaturalItems,
  ...sparklingAddedItems,
  ...mineralRichItems,
  ...lowMineralItems,
  ...alkalineItems,
  ...flavoredItems
];

export const watersStats = {
  total: allWaters.length,
  byCategory: {
    still_natural: stillNaturalItems.length,
    sparkling_natural: sparklingNaturalItems.length,
    sparkling_added: sparklingAddedItems.length,
    mineral_rich: mineralRichItems.length,
    low_mineral: lowMineralItems.length,
    alkaline: alkalineItems.length,
    flavored: flavoredItems.length
  }
};

console.log(`Waters Database: ${allWaters.length} items loaded`);
console.log('By category:', watersStats.byCategory);
