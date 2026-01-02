// Nikkei (Japanese-Peruvian Fusion) - Data Index
// GUDBRO Database Standards v1.7

export * from './tiradito';
export * from './ceviche';
export * from './maki';
export * from './mains';
export * from './anticuchos';
export * from './sides';

import { tiraditos } from './tiradito';
import { ceviches } from './ceviche';
import { makis } from './maki';
import { mains } from './mains';
import { anticuchos } from './anticuchos';
import { sides } from './sides';
import { NikkeiDish } from '../types';

export const allNikkeiDishes: NikkeiDish[] = [
  ...tiraditos,     // 5 dishes
  ...ceviches,      // 5 dishes
  ...makis,         // 5 dishes
  ...mains,         // 6 dishes
  ...anticuchos,    // 4 dishes
  ...sides          // 5 dishes
];

// Total: 30 dishes
