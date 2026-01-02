/**
 * GUDBRO Desserts Database - Index
 * Aggregates all dessert collections
 */

import { italianDesserts } from './italian-desserts';
import { frenchDesserts } from './french-desserts';
import { internationalDesserts } from './international-desserts';
import { Dessert } from '../types';

// Re-export individual collections
export { italianDesserts } from './italian-desserts';
export { frenchDesserts } from './french-desserts';
export { internationalDesserts } from './international-desserts';

// Combined collection
export const allDesserts: Dessert[] = [
  ...italianDesserts,
  ...frenchDesserts,
  ...internationalDesserts
];

// Export counts for documentation
export const dessertCounts = {
  italian: italianDesserts.length,
  french: frenchDesserts.length,
  international: internationalDesserts.length,
  total: allDesserts.length
};

export default allDesserts;
