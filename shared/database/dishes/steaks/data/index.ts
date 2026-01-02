/**
 * GUDBRO Steaks & Grills Database - Main Export
 *
 * ~80 dishes covering global meat preparations
 */

export { beefSteaks } from './beef-steaks';
export { italianGrills } from './italian-grills';
export { southAmericanGrills } from './south-american-grills';
export { asianGrills } from './asian-grills';
export { lambAndGame } from './lamb-game';
export { ribsAndBBQ } from './ribs-bbq';
export { middleEasternGrills } from './middle-eastern-grills';
export { europeanGrills } from './european-grills';
export { poultryGrills } from './poultry-grills';

// Re-export types
export * from '../types';

// Import all for combined export
import { beefSteaks } from './beef-steaks';
import { italianGrills } from './italian-grills';
import { southAmericanGrills } from './south-american-grills';
import { asianGrills } from './asian-grills';
import { lambAndGame } from './lamb-game';
import { ribsAndBBQ } from './ribs-bbq';
import { middleEasternGrills } from './middle-eastern-grills';
import { europeanGrills } from './european-grills';
import { poultryGrills } from './poultry-grills';

/**
 * All steaks and grills combined
 */
export const allSteaks = [
  ...beefSteaks,           // 10 American beef steaks
  ...italianGrills,        // 8 Italian meat dishes
  ...southAmericanGrills,  // 10 Argentinian/Brazilian
  ...asianGrills,          // 11 Japanese/Korean/SE Asian
  ...lambAndGame,          // 9 Lamb and game
  ...ribsAndBBQ,           // 6 American BBQ
  ...middleEasternGrills,  // 8 Turkish/Lebanese/Persian
  ...europeanGrills,       // 9 German/British/French/Spanish
  ...poultryGrills,        // 7 Chicken and turkey
];

// Statistics
export const steaksStats = {
  total: allSteaks.length,
  byCollection: {
    beefSteaks: beefSteaks.length,
    italianGrills: italianGrills.length,
    southAmericanGrills: southAmericanGrills.length,
    asianGrills: asianGrills.length,
    lambAndGame: lambAndGame.length,
    ribsAndBBQ: ribsAndBBQ.length,
    middleEasternGrills: middleEasternGrills.length,
    europeanGrills: europeanGrills.length,
    poultryGrills: poultryGrills.length,
  },
  byCategory: allSteaks.reduce((acc, steak) => {
    acc[steak.category] = (acc[steak.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  byStyle: allSteaks.reduce((acc, steak) => {
    acc[steak.style] = (acc[steak.style] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
};
