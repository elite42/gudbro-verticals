/**
 * GUDBRO Wines Database - All Wines
 *
 * Comprehensive GLOBAL wine database covering 50+ countries:
 * - Red Wines (~20): Italian DOCG, French, Spanish, New World
 * - White Wines (~23): French, German, Italian, Spanish, New World
 * - Sparkling Wines (~12): Champagne, Prosecco, Cava, Crémant
 * - Rosé Wines (~4): Provence, Tavel, Spanish, Italian
 * - Dessert Wines (~5): Sauternes, Tokaji, TBA, Vin Santo, Icewine
 * - Fortified Wines (~7): Port, Sherry, Madeira, Marsala
 * - Emerging Europe (~21): Georgia, Croatia, Slovenia, Romania, Bulgaria, Greece, Hungary, Moldova, Serbia, Armenia
 * - Extended World (~32): UK, Lebanon, Israel, Turkey, China, Japan, India, Uruguay, Brazil, South Africa, Morocco, Switzerland, Mexico, Canada, Austria
 * - Additional Regions (~22): Czech Republic, Slovakia, Ukraine, Cyprus, Tunisia, Algeria, Peru, Bolivia, Thailand, Vietnam, Belgium, Luxembourg, Malta
 *
 * Total: ~146 wines from 50+ wine-producing countries
 *
 * NOTE: Rare wines from unusual countries (Cyprus Commandaria, Bolivian high-altitude Tannat,
 * Thai monsoon wines) are valuable differentiators for restaurants seeking unique offerings.
 */

import { redWines } from './red-wines';
import { whiteWines } from './white-wines';
import { sparklingWines } from './sparkling-wines';
import { roseWines, dessertWines, fortifiedWines } from './rose-dessert-fortified';
import { emergingEuropeWines } from './emerging-europe-wines';
import { extendedWorldWines } from './extended-world-wines';
import { additionalRegionsWines } from './additional-regions-wines';

export { redWines } from './red-wines';
export { whiteWines } from './white-wines';
export { sparklingWines } from './sparkling-wines';
export { roseWines, dessertWines, fortifiedWines } from './rose-dessert-fortified';
export { emergingEuropeWines } from './emerging-europe-wines';
export { extendedWorldWines } from './extended-world-wines';
export { additionalRegionsWines } from './additional-regions-wines';

// All wines combined
export const allWines = [
  ...redWines,
  ...whiteWines,
  ...sparklingWines,
  ...roseWines,
  ...dessertWines,
  ...fortifiedWines,
  ...emergingEuropeWines,
  ...extendedWorldWines,
  ...additionalRegionsWines,
];

// Stats
export const wineStats = {
  red: redWines.length,
  white: whiteWines.length,
  sparkling: sparklingWines.length,
  rose: roseWines.length,
  dessert: dessertWines.length,
  fortified: fortifiedWines.length,
  emergingEurope: emergingEuropeWines.length,
  extendedWorld: extendedWorldWines.length,
  additionalRegions: additionalRegionsWines.length,
  total: allWines.length,
};
