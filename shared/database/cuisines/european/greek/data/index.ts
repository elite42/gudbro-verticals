// Greek Cuisine Data Exports
// 9 categories, 72 total dishes

export * from './grilled-meats';      // 8 items
export * from './baked-casseroles';   // 8 items
export * from './stews-braises';      // 7 items
export * from './seafood';            // 8 items
export * from './meze-appetizers';    // 12 items
export * from './pies-pastries';      // 8 items
export * from './salads';             // 6 items
export * from './soups';              // 7 items
export * from './desserts';           // 10 items

// Re-export all items as a single array
import { grilledMeatsItems } from './grilled-meats';
import { bakedCasserolesItems } from './baked-casseroles';
import { stewsBraisesItems } from './stews-braises';
import { seafoodItems } from './seafood';
import { mezeAppetizersItems } from './meze-appetizers';
import { piesPastriesItems } from './pies-pastries';
import { saladsItems } from './salads';
import { soupsItems } from './soups';
import { dessertsItems } from './desserts';

export const allGreekItems = [
  ...grilledMeatsItems,
  ...bakedCasserolesItems,
  ...stewsBraisesItems,
  ...seafoodItems,
  ...mezeAppetizersItems,
  ...piesPastriesItems,
  ...saladsItems,
  ...soupsItems,
  ...dessertsItems
];

// Stats
export const greekStats = {
  total: allGreekItems.length,
  byCategory: {
    grilled_meats: grilledMeatsItems.length,
    baked_casseroles: bakedCasserolesItems.length,
    stews_braises: stewsBraisesItems.length,
    seafood: seafoodItems.length,
    meze_appetizers: mezeAppetizersItems.length,
    pies_pastries: piesPastriesItems.length,
    salads: saladsItems.length,
    soups: soupsItems.length,
    desserts: dessertsItems.length
  }
};
