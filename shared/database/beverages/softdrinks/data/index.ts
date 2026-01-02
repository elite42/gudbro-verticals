// ============================================
// SOFT DRINKS - Data Index
// GUDBRO Database Standards v1.3
// ============================================

export { colaItems } from './cola';
export { lemonLimeItems } from './lemon-lime';
export { orangeItems } from './orange';
export { gingerItems } from './ginger';
export { tonicSodaItems } from './tonic-soda';
export { energyItems } from './energy';
export { otherItems } from './other';

// Combined export
import { colaItems } from './cola';
import { lemonLimeItems } from './lemon-lime';
import { orangeItems } from './orange';
import { gingerItems } from './ginger';
import { tonicSodaItems } from './tonic-soda';
import { energyItems } from './energy';
import { otherItems } from './other';

export const allSoftDrinks = [
  ...colaItems,
  ...lemonLimeItems,
  ...orangeItems,
  ...gingerItems,
  ...tonicSodaItems,
  ...energyItems,
  ...otherItems
];

// Statistics
export const softDrinksStats = {
  total: allSoftDrinks.length,
  byCategory: {
    cola: colaItems.length,
    lemon_lime: lemonLimeItems.length,
    orange: orangeItems.length,
    ginger: gingerItems.length,
    tonic_soda: tonicSodaItems.length,
    energy: energyItems.length,
    other: otherItems.length
  }
};
