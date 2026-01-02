// ============================================
// MOCKTAILS Data Index - GUDBRO Database
// ============================================

export * from './virgin-classics';
export * from './iconic-mocktails';
export * from './tropical-fruity';
export * from './specialty-mocktails';
export * from './creamy-frozen';

import { virginClassics } from './virgin-classics';
import { iconicMocktails } from './iconic-mocktails';
import { tropicalFruityMocktails } from './tropical-fruity';
import { specialtyMocktails } from './specialty-mocktails';
import { creamyFrozenMocktails } from './creamy-frozen';

// Combined export of all mocktails
export const allMocktails = [
  ...virginClassics,
  ...iconicMocktails,
  ...tropicalFruityMocktails,
  ...specialtyMocktails,
  ...creamyFrozenMocktails
];

// Summary stats
console.log(`Total Mocktails: ${allMocktails.length}`);
console.log(`- Virgin Classics: ${virginClassics.length}`);
console.log(`- Iconic Mocktails: ${iconicMocktails.length}`);
console.log(`- Tropical & Fruity: ${tropicalFruityMocktails.length}`);
console.log(`- Specialty: ${specialtyMocktails.length}`);
console.log(`- Creamy & Frozen: ${creamyFrozenMocktails.length}`);
