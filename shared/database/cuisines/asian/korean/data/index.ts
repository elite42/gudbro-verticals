// Korean Database - Data Index
// All Korean cuisine data exports

export { bbqItems } from './bbq';
export { riceItems } from './rice';
export { stewItems } from './stews';
export { noodleItems } from './noodles';
export { pancakeItems } from './pancakes';
export { chickenItems } from './chicken';
export { streetFoodItems } from './street-food';
export { banchanItems } from './banchan';
export { dessertItems } from './desserts';

// Re-export types
export * from '../types';

// Aggregate all items
import { bbqItems } from './bbq';
import { riceItems } from './rice';
import { stewItems } from './stews';
import { noodleItems } from './noodles';
import { pancakeItems } from './pancakes';
import { chickenItems } from './chicken';
import { streetFoodItems } from './street-food';
import { banchanItems } from './banchan';
import { dessertItems } from './desserts';
import { KoreanItem } from '../types';

export const allKoreanItems: KoreanItem[] = [
  ...bbqItems,           // 8 items
  ...riceItems,          // 8 items
  ...stewItems,          // 10 items
  ...noodleItems,        // 8 items
  ...pancakeItems,       // 7 items
  ...chickenItems,       // 8 items
  ...streetFoodItems,    // 10 items
  ...banchanItems,       // 10 items
  ...dessertItems,       // 8 items
];

// Total: 77 Korean dishes

// Summary by category
export const koreanSummary = {
  bbq: bbqItems.length,
  rice_dishes: riceItems.length,
  stews_soups: stewItems.length,
  noodles: noodleItems.length,
  pancakes: pancakeItems.length,
  fried_chicken: chickenItems.length,
  street_food: streetFoodItems.length,
  side_dishes_fermented: banchanItems.length,
  desserts: dessertItems.length,
  total: allKoreanItems.length,
};
