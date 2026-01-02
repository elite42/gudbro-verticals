// ============================================
// LEBANESE Database - Data Index
// ============================================
// Total: ~76 dishes across 10 categories
// ============================================

import { LebaneseItem } from '../types';

// Import all categories
import { mezzeDips } from './mezze-dips';
import { salads } from './salads';
import { kibbeh } from './kibbeh';
import { grilledMeats } from './grilled-meats';
import { stewsMains } from './stews-mains';
import { riceGrains } from './rice-grains';
import { stuffedDishes } from './stuffed-dishes';
import { breadsPastries } from './breads-pastries';
import { seafood } from './seafood';
import { desserts } from './desserts';

// Export individual categories
export {
  mezzeDips,
  salads,
  kibbeh,
  grilledMeats,
  stewsMains,
  riceGrains,
  stuffedDishes,
  breadsPastries,
  seafood,
  desserts
};

// Export combined array
export const allLebanese: LebaneseItem[] = [
  ...mezzeDips,        // 12 items
  ...salads,           // 8 items
  ...kibbeh,           // 8 items
  ...grilledMeats,     // 10 items
  ...stewsMains,       // 10 items
  ...riceGrains,       // 8 items
  ...stuffedDishes,    // 8 items
  ...breadsPastries,   // 10 items
  ...seafood,          // 8 items
  ...desserts          // 12 items
];

// Stats
export const lebaneseStats = {
  total: allLebanese.length,
  byCategory: {
    mezze_dips: mezzeDips.length,
    salads: salads.length,
    kibbeh: kibbeh.length,
    grilled_meats: grilledMeats.length,
    stews_mains: stewsMains.length,
    rice_grains: riceGrains.length,
    stuffed_dishes: stuffedDishes.length,
    breads_pastries: breadsPastries.length,
    seafood: seafood.length,
    desserts: desserts.length
  }
};

console.log(`Lebanese Database: ${lebaneseStats.total} dishes loaded`);
