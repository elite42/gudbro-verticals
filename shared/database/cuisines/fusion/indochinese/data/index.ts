// Indo-Chinese (Hakka-Indian Fusion) - Data Index
// GUDBRO Database Standards v1.7

export * from './manchurian';
export * from './chilli';
export * from './noodles';
export * from './rice';
export * from './soup';
export * from './starters';

import { manchurian } from './manchurian';
import { chilli } from './chilli';
import { noodles } from './noodles';
import { rice } from './rice';
import { soup } from './soup';
import { starters } from './starters';
import { IndoChineseDish } from '../types';

export const allIndoChineseDishes: IndoChineseDish[] = [
  ...manchurian,   // 6 dishes
  ...chilli,       // 6 dishes
  ...noodles,      // 6 dishes
  ...rice,         // 5 dishes
  ...soup,         // 5 dishes
  ...starters      // 7 dishes
];

// Total: 35 dishes
