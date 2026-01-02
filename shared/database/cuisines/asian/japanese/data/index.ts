// ============================================
// JAPANESE DATABASE - Main Export Index
// ============================================

import { ramenDishes } from './ramen';
import { udonSobaDishes } from './udon-soba';
import { donburiDishes } from './donburi';
import { tempuraDishes } from './tempura';
import { yakitoriDishes } from './yakitori';
import { izakayaDishes } from './izakaya';
import { nabemonoDishes } from './nabemono';
import { yoshokuDishes } from './yoshoku';
import { JapaneseItem } from '../types';

// Re-export individual collections
export { ramenDishes } from './ramen';
export { udonSobaDishes } from './udon-soba';
export { donburiDishes } from './donburi';
export { tempuraDishes } from './tempura';
export { yakitoriDishes } from './yakitori';
export { izakayaDishes } from './izakaya';
export { nabemonoDishes } from './nabemono';
export { yoshokuDishes } from './yoshoku';

// Combined collection of all Japanese dishes
export const allJapaneseDishes: JapaneseItem[] = [
  ...ramenDishes,        // 8 dishes
  ...udonSobaDishes,     // 12 dishes
  ...donburiDishes,      // 8 dishes
  ...tempuraDishes,      // 9 dishes
  ...yakitoriDishes,     // 10 dishes
  ...izakayaDishes,      // 10 dishes
  ...nabemonoDishes,     // 8 dishes
  ...yoshokuDishes,      // 8 dishes
];

// Total: 73 Japanese dishes (non-sushi)

// Export types
export * from '../types';
