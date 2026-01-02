/**
 * GUDBRO Vietnamese Database - Data Index
 *
 * DATABASE-STANDARDS v1.1 compliant
 * Sistema 5 Dimensioni integrated
 *
 * Total: 80 Vietnamese dishes
 * - Phở: 14 varieties
 * - Bún: 10 dishes
 * - Bánh: 15 dishes
 * - Cuốn: 12 dishes
 * - Cơm: 11 dishes
 * - Other: 18 dishes (Mì, Lẩu, Gỏi, Nướng, Kho, Chè, Đồ uống)
 */

import { phoItems } from './pho';
import { bunDishes } from './bun';
import { banhDishes } from './banh';
import { cuonDishes } from './cuon';
import { comDishes } from './com';
import { otherDishes } from './other';

// Re-export individual categories
export { phoItems } from './pho';
export { bunDishes } from './bun';
export { banhDishes } from './banh';
export { cuonDishes } from './cuon';
export { comDishes } from './com';
export { otherDishes } from './other';

// Combined export of all Vietnamese dishes
export const allVietnameseDishes = [
  ...phoItems,
  ...bunDishes,
  ...banhDishes,
  ...cuonDishes,
  ...comDishes,
  ...otherDishes,
];

// Export statistics
export const vietnameseStats = {
  total: allVietnameseDishes.length,
  byCategory: {
    pho: phoItems.length,
    bun: bunDishes.length,
    banh: banhDishes.length,
    cuon: cuonDishes.length,
    com: comDishes.length,
    other: otherDishes.length,
  },
  byRegion: {
    northern: allVietnameseDishes.filter(d => d.region === 'northern').length,
    central: allVietnameseDishes.filter(d => d.region === 'central').length,
    southern: allVietnameseDishes.filter(d => d.region === 'southern').length,
    national: allVietnameseDishes.filter(d => d.region === 'national').length,
    mekong_delta: allVietnameseDishes.filter(d => d.region === 'mekong_delta').length,
    coastal: allVietnameseDishes.filter(d => d.region === 'coastal').length,
    highlands: allVietnameseDishes.filter(d => d.region === 'highlands').length,
  },
  dietary: {
    vegetarian: allVietnameseDishes.filter(d => d.is_vegetarian).length,
    vegan: allVietnameseDishes.filter(d => d.is_vegan).length,
    halal: allVietnameseDishes.filter(d => d.is_halal).length,
    glutenFree: allVietnameseDishes.filter(d => d.is_gluten_free).length,
    dairyFree: allVietnameseDishes.filter(d => d.is_dairy_free).length,
  },
  fusion: allVietnameseDishes.filter(d => d.is_fusion).length,
  streetFood: allVietnameseDishes.filter(d => d.is_street_food).length,
};

export default allVietnameseDishes;
