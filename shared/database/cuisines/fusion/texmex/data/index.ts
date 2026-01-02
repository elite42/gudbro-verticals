/**
 * Tex-Mex Database - Data Index
 * Total: 40 dishes
 */

export { tacosDishes } from './tacos';
export { burritosDishes } from './burritos';
export { enchiladasDishes } from './enchiladas';
export { nachosDishes } from './nachos';
export { fajitasDishes } from './fajitas';
export { quesadillasDishes } from './quesadillas';
export { sidesDishes } from './sides';
export { dipsDishes } from './dips';
export { mainsDishes } from './mains';

// Re-export all dishes as single array
import { tacosDishes } from './tacos';
import { burritosDishes } from './burritos';
import { enchiladasDishes } from './enchiladas';
import { nachosDishes } from './nachos';
import { fajitasDishes } from './fajitas';
import { quesadillasDishes } from './quesadillas';
import { sidesDishes } from './sides';
import { dipsDishes } from './dips';
import { mainsDishes } from './mains';

export const allTexMexDishes = [
  ...tacosDishes,      // 5
  ...burritosDishes,   // 5
  ...enchiladasDishes, // 5
  ...nachosDishes,     // 4
  ...fajitasDishes,    // 5
  ...quesadillasDishes,// 5
  ...sidesDishes,      // 5
  ...dipsDishes,       // 6
  ...mainsDishes       // 6
];

// Category counts for reference:
// tacos: 5
// burritos: 5
// enchiladas: 5
// nachos: 4
// fajitas: 5
// quesadillas: 5
// sides: 5
// dips: 6
// mains: 6
// TOTAL: 46 dishes
