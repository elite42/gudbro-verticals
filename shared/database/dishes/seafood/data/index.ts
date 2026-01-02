// ============================================
// GUDBRO Seafood Database - Index
// 55 dishes across 5 categories
// ============================================

import { fishItems } from './fish';
import { crustaceanItems } from './crustaceans';
import { shellfishItems } from './shellfish';
import { rawBarItems } from './raw-bar';
import { mixedSeafoodItems } from './mixed-seafood';

// Re-export individual categories
export { fishItems, crustaceanItems, shellfishItems, rawBarItems, mixedSeafoodItems };

// Combined array of all seafood items
export const allSeafood = [
  ...fishItems,
  ...crustaceanItems,
  ...shellfishItems,
  ...rawBarItems,
  ...mixedSeafoodItems,
];

// Statistics
export const seafoodStats = {
  total: allSeafood.length,
  byCategory: {
    fish: fishItems.length,
    crustaceans: crustaceanItems.length,
    shellfish: shellfishItems.length,
    raw_bar: rawBarItems.length,
    mixed_seafood: mixedSeafoodItems.length,
  },
  byStyle: allSeafood.reduce((acc, item) => {
    acc[item.style] = (acc[item.style] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
};

// Log stats on import
console.log(`
========================================
GUDBRO Seafood Database Loaded
========================================
Total dishes: ${seafoodStats.total}

By Category:
- Fish: ${seafoodStats.byCategory.fish}
- Crustaceans: ${seafoodStats.byCategory.crustaceans}
- Shellfish: ${seafoodStats.byCategory.shellfish}
- Raw Bar: ${seafoodStats.byCategory.raw_bar}
- Mixed Seafood: ${seafoodStats.byCategory.mixed_seafood}

By Style: ${Object.entries(seafoodStats.byStyle)
  .sort((a, b) => b[1] - a[1])
  .map(([style, count]) => `${style}: ${count}`)
  .join(', ')}
========================================
`);
