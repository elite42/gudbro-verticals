// Korean-Mexican Fusion Database
// Export all categories

export { tacos } from './tacos';
export { burritos } from './burritos';
export { bowls } from './bowls';
export { quesadillas } from './quesadillas';
export { appetizers } from './appetizers';
export { sides } from './sides';

import { tacos } from './tacos';
import { burritos } from './burritos';
import { bowls } from './bowls';
import { quesadillas } from './quesadillas';
import { appetizers } from './appetizers';
import { sides } from './sides';

export const allKoreanMexDishes = [
  ...tacos,
  ...burritos,
  ...bowls,
  ...quesadillas,
  ...appetizers,
  ...sides
];

// Total: 21 dishes
// - tacos: 5
// - burritos: 3
// - bowls: 4
// - quesadillas: 3
// - appetizers: 3
// - sides: 3
