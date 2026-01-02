// ============================================
// VEGETARIAN DATABASE - Main Export
// ============================================

import { tofuDishes } from './tofu-dishes';
import { tempehSeitanDishes } from './tempeh-seitan';
import { legumeDishes } from './legume-dishes';
import { grainBowls } from './grain-bowls';
import { vegetableMains } from './vegetable-mains';
import { indianMains } from './indian-mains';
import { asianMains } from './asian-mains';
import { mediterraneanMains } from './mediterranean-mains';

// Re-export individual arrays
export { tofuDishes } from './tofu-dishes';
export { tempehSeitanDishes } from './tempeh-seitan';
export { legumeDishes } from './legume-dishes';
export { grainBowls } from './grain-bowls';
export { vegetableMains } from './vegetable-mains';
export { indianMains } from './indian-mains';
export { asianMains } from './asian-mains';
export { mediterraneanMains } from './mediterranean-mains';

// Combined array of all vegetarian items
export const allVegetarianItems = [
  ...tofuDishes,
  ...tempehSeitanDishes,
  ...legumeDishes,
  ...grainBowls,
  ...vegetableMains,
  ...indianMains,
  ...asianMains,
  ...mediterraneanMains,
];

// Summary stats
export const vegetarianStats = {
  total: allVegetarianItems.length,
  byCategory: {
    tofu_dishes: tofuDishes.length,
    tempeh_dishes: tempehSeitanDishes.filter(d => d.category === 'tempeh_dishes').length,
    seitan_dishes: tempehSeitanDishes.filter(d => d.category === 'seitan_dishes').length,
    legume_dishes: legumeDishes.length,
    grain_bowls: grainBowls.length,
    vegetable_mains: vegetableMains.length,
    indian_mains: indianMains.length,
    asian_mains: asianMains.length,
    mediterranean_mains: mediterraneanMains.length,
  },
  veganCount: allVegetarianItems.filter(d => d.is_vegan).length,
  highProteinCount: allVegetarianItems.filter(d => d.is_high_protein).length,
  glutenFreeCount: allVegetarianItems.filter(d => d.is_gluten_free).length,
};

export default allVegetarianItems;
