// Swiss Database - Data Index
// GUDBRO Database Standards v1.7

export * from './cheese-dishes';
export * from './mains';
export * from './sides';
export * from './sausages';
export * from './soups';
export * from './desserts';
export * from './pastries';
export * from './breakfast';

// Re-export all dishes as single array
import { swissCheeseDishes } from './cheese-dishes';
import { swissMains } from './mains';
import { swissSides } from './sides';
import { swissSausages } from './sausages';
import { swissSoups } from './soups';
import { swissDesserts } from './desserts';
import { swissPastries } from './pastries';
import { swissBreakfast } from './breakfast';

export const allSwissDishes = [
  ...swissCheeseDishes,
  ...swissMains,
  ...swissSides,
  ...swissSausages,
  ...swissSoups,
  ...swissDesserts,
  ...swissPastries,
  ...swissBreakfast
];

// Summary by category
export const swissSummary = {
  cheese_dishes: swissCheeseDishes.length,
  mains: swissMains.length,
  sides: swissSides.length,
  sausages: swissSausages.length,
  soups: swissSoups.length,
  desserts: swissDesserts.length,
  pastries: swissPastries.length,
  breakfast: swissBreakfast.length,
  total: allSwissDishes.length
};
