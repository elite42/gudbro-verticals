// ============================================
// SPIRITS Database - Main Export
// ============================================
// Exports all spirits data from individual category files
// Total: ~240 spirits (including Asian spirits)
// ============================================

import { SpiritItem } from '../types';
import { whiskyItems } from './whisky';
import { ginItems } from './gin';
import { rumSpirits } from './rum';
import { amariLiqueursSpirits } from './amari-liqueurs';
import { vodkaSpirits } from './vodka';
import { tequilaMezcalSpirits } from './tequila-mezcal';
import { brandyCognacSpirits } from './brandy-cognac';
import { rarePremiumSpirits } from './rare-premium';
import { asianSpirits } from './asian-spirits';

// Combined export of all spirits
export const allSpirits: SpiritItem[] = [
  ...whiskyItems,
  ...ginItems,
  ...rumSpirits,
  ...amariLiqueursSpirits,
  ...vodkaSpirits,
  ...tequilaMezcalSpirits,
  ...brandyCognacSpirits,
  ...rarePremiumSpirits,
  ...asianSpirits,
];

// Re-export individual categories with consistent naming
export { whiskyItems } from './whisky';
export { ginItems } from './gin';
export { rumSpirits } from './rum';
export { amariLiqueursSpirits } from './amari-liqueurs';
export { vodkaSpirits } from './vodka';
export { tequilaMezcalSpirits } from './tequila-mezcal';
export { brandyCognacSpirits } from './brandy-cognac';
export { rarePremiumSpirits } from './rare-premium';
export { asianSpirits } from './asian-spirits';

// Statistics
export const spiritsStats = {
  total: allSpirits.length,
  byCategory: {
    whisky: whiskyItems.length,
    gin: ginItems.length,
    rum: rumSpirits.length,
    amari_liqueurs: amariLiqueursSpirits.length,
    vodka: vodkaSpirits.length,
    tequila_mezcal: tequilaMezcalSpirits.length,
    brandy_cognac: brandyCognacSpirits.length,
    rare_premium: rarePremiumSpirits.length,
    asian_spirits: asianSpirits.length,
  },
  categories: ['whisky', 'gin', 'rum', 'amari_liqueurs', 'vodka', 'tequila_mezcal', 'brandy_cognac', 'rare_premium', 'asian_spirits'],
};
