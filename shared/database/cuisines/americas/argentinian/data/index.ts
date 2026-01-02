// Argentinian Cuisine Database
// Export all categories

export { asado } from './asado';
export { empanadas } from './empanadas';
export { mains } from './mains';
export { pasta } from './pasta';
export { soups } from './soups';
export { appetizers } from './appetizers';
export { desserts } from './desserts';
export { beverages } from './beverages';

import { asado } from './asado';
import { empanadas } from './empanadas';
import { mains } from './mains';
import { pasta } from './pasta';
import { soups } from './soups';
import { appetizers } from './appetizers';
import { desserts } from './desserts';
import { beverages } from './beverages';

export const allArgentinianDishes = [
  ...asado,
  ...empanadas,
  ...mains,
  ...pasta,
  ...soups,
  ...appetizers,
  ...desserts,
  ...beverages
];

// Total: 47 dishes
// - asado: 8
// - empanadas: 7
// - mains: 7
// - pasta: 6
// - soups: 5
// - appetizers: 5
// - desserts: 9
// - beverages: 5
