// ============================================
// ARMENIAN DATABASE - Data Index
// ============================================
// Exports all Armenian cuisine data files
// Total: ~70 dishes across 10 categories
// ============================================

export { grilledMeats } from './grilled-meats';
export { dolmaSarma } from './dolma-sarma';
export { soups } from './soups';
export { dumplings } from './dumplings';
export { stewsMains } from './stews-mains';
export { appetizersMezze } from './appetizers-mezze';
export { saladsSides } from './salads-sides';
export { breads } from './breads';
export { riceGrains } from './rice-grains';
export { desserts } from './desserts';

// Combined export
import { grilledMeats } from './grilled-meats';
import { dolmaSarma } from './dolma-sarma';
import { soups } from './soups';
import { dumplings } from './dumplings';
import { stewsMains } from './stews-mains';
import { appetizersMezze } from './appetizers-mezze';
import { saladsSides } from './salads-sides';
import { breads } from './breads';
import { riceGrains } from './rice-grains';
import { desserts } from './desserts';

export const allArmenian = [
  ...grilledMeats,      // 10 items
  ...dolmaSarma,        // 8 items
  ...soups,             // 8 items
  ...dumplings,         // 6 items
  ...stewsMains,        // 10 items
  ...appetizersMezze,   // 8 items
  ...saladsSides,       // 6 items
  ...breads,            // 6 items
  ...riceGrains,        // 6 items
  ...desserts,          // 10 items
];

// Category counts
export const armenianCounts = {
  grilled_meats: grilledMeats.length,
  dolma_sarma: dolmaSarma.length,
  soups: soups.length,
  dumplings: dumplings.length,
  stews_mains: stewsMains.length,
  appetizers_mezze: appetizersMezze.length,
  salads_sides: saladsSides.length,
  breads: breads.length,
  rice_grains: riceGrains.length,
  desserts: desserts.length,
  total: allArmenian.length
};

// ============================================
// Expected totals:
// - Grilled Meats: 10
// - Dolma/Sarma: 8
// - Soups: 8
// - Dumplings: 6
// - Stews/Mains: 10
// - Appetizers: 8
// - Salads/Sides: 6
// - Breads: 6
// - Rice/Grains: 6
// - Desserts: 10
// TOTAL: 78 dishes
// ============================================
