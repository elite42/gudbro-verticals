/**
 * GUDBRO Pasta Database - Data Index
 *
 * Exports all pasta dishes organized by style
 * Sistema 5 Dimensioni v3.0 integrated
 */

// Italian Classic Pasta
export * from './italian-classic';

// Italian Regional Pasta
export * from './italian-regional';

// Italian Fresh Pasta
export * from './italian-fresh';

// Italian Baked Pasta
export * from './italian-baked';

// Italian Seafood Pasta
export * from './italian-seafood';

// Italian Cream-Based Pasta
export * from './italian-cream';

// Italian Meat-Based Pasta
export * from './italian-meat';

// Asian Noodles - Japanese
export * from './asian-japanese';

// Asian Noodles - Chinese
export * from './asian-chinese';

// Asian Noodles - Vietnamese
export * from './asian-vietnamese';

// Asian Noodles - Thai
export * from './asian-thai';

// Asian Noodles - Korean
export * from './asian-korean';

// Asian Noodles - Southeast Asia
export * from './asian-southeast';

// Fusion & Modern
export * from './fusion-modern';

// Aggregated exports
import { italianClassicPasta } from './italian-classic';
import { italianRegionalPasta } from './italian-regional';
import { italianFreshPasta } from './italian-fresh';
import { italianBakedPasta } from './italian-baked';
import { italianSeafoodPasta } from './italian-seafood';
import { italianCreamPasta } from './italian-cream';
import { italianMeatPasta } from './italian-meat';
import { asianJapanesePasta } from './asian-japanese';
import { asianChinesePasta } from './asian-chinese';
import { asianVietnamesePasta } from './asian-vietnamese';
import { asianThaiPasta } from './asian-thai';
import { asianKoreanPasta } from './asian-korean';
import { asianSoutheastPasta } from './asian-southeast';
import { fusionModernPasta } from './fusion-modern';

import type { Pasta } from '../../types/pasta';

/** All pasta dishes combined */
export const allPasta: Pasta[] = [
  ...italianClassicPasta,
  ...italianRegionalPasta,
  ...italianFreshPasta,
  ...italianBakedPasta,
  ...italianSeafoodPasta,
  ...italianCreamPasta,
  ...italianMeatPasta,
  ...asianJapanesePasta,
  ...asianChinesePasta,
  ...asianVietnamesePasta,
  ...asianThaiPasta,
  ...asianKoreanPasta,
  ...asianSoutheastPasta,
  ...fusionModernPasta,
];

/** Pasta by style for easy filtering */
export const pastaByStyle = {
  italian_classic: italianClassicPasta,
  italian_regional: italianRegionalPasta,
  italian_fresh: italianFreshPasta,
  italian_baked: italianBakedPasta,
  italian_seafood: italianSeafoodPasta,
  italian_cream: italianCreamPasta,
  italian_meat: italianMeatPasta,
  asian_japanese: asianJapanesePasta,
  asian_chinese: asianChinesePasta,
  asian_vietnamese: asianVietnamesePasta,
  asian_thai: asianThaiPasta,
  asian_korean: asianKoreanPasta,
  asian_southeast: asianSoutheastPasta,
  fusion_modern: fusionModernPasta,
};

/** Quick stats */
export const pastaStats = {
  total: allPasta.length,
  byStyle: Object.fromEntries(
    Object.entries(pastaByStyle).map(([style, dishes]) => [style, dishes.length])
  ),
};
