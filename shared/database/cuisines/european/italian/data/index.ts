// ============================================
// ITALIAN CUISINE - Data Export Index
// GUDBRO Database Standards v1.7
// ============================================

import { antipastiFreddi } from './antipasti-freddi';
import { antipastiCaldi } from './antipasti-caldi';
import { secondiCarne } from './secondi-carne';
import { secondiPesce } from './secondi-pesce';
import { zuppe } from './zuppe';
import { contorni } from './contorni';
import { dolci } from './dolci';

// Re-export individual arrays
export { antipastiFreddi } from './antipasti-freddi';
export { antipastiCaldi } from './antipasti-caldi';
export { secondiCarne } from './secondi-carne';
export { secondiPesce } from './secondi-pesce';
export { zuppe } from './zuppe';
export { contorni } from './contorni';
export { dolci } from './dolci';

// Combined exports by category
export const antipasti = [...antipastiFreddi, ...antipastiCaldi];
export const secondi = [...secondiCarne, ...secondiPesce];

// All Italian dishes combined
export const allItalianDishes = [
  ...antipastiFreddi,
  ...antipastiCaldi,
  ...secondiCarne,
  ...secondiPesce,
  ...zuppe,
  ...contorni,
  ...dolci
];

// Statistics
export const italianStats = {
  antipastiFreddi: antipastiFreddi.length,
  antipastiCaldi: antipastiCaldi.length,
  secondiCarne: secondiCarne.length,
  secondiPesce: secondiPesce.length,
  zuppe: zuppe.length,
  contorni: contorni.length,
  dolci: dolci.length,
  total: allItalianDishes.length
};

// Re-export types
export * from '../types';
