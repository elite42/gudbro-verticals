/**
 * GUDBRO Appetizers Database - Index
 * Aggregates all appetizer collections
 */

import { italianAppetizers } from './italian-appetizers';
import { spanishAppetizers } from './spanish-appetizers';
import { internationalAppetizers } from './international-appetizers';
import { Appetizer } from '../types';

// Re-export individual collections
export { italianAppetizers } from './italian-appetizers';
export { spanishAppetizers } from './spanish-appetizers';
export { internationalAppetizers } from './international-appetizers';

// Combined collection
export const allAppetizers: Appetizer[] = [
  ...italianAppetizers,
  ...spanishAppetizers,
  ...internationalAppetizers
];

// Export counts for documentation
export const appetizerCounts = {
  italian: italianAppetizers.length,
  spanish: spanishAppetizers.length,
  international: internationalAppetizers.length,
  total: allAppetizers.length
};

export default allAppetizers;
