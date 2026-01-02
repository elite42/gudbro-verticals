/**
 * GUDBRO Beer Database - Main Index
 *
 * Comprehensive beer database with 46 beers across categories:
 * - International Lagers (10)
 * - Belgian Classics (7)
 * - Stouts & Porters (6)
 * - German Classics (7)
 * - Craft IPAs (5)
 * - British Ales (6)
 * - Wheat Beers (5)
 *
 * @version 2.0
 * @lastUpdated 2025-12-14
 */

// Category exports
export { internationalLagers } from './international-lagers';
export { belgianClassics } from './belgian-classics';
export { stoutsPorters } from './stouts-porters';
export { germanClassics } from './german-classics';
export { craftIpas } from './craft-ipas';
export { britishAles } from './british-ales';
export { wheatBeers } from './wheat-beers';

// Individual beer exports for convenience
export * from './international-lagers';
export * from './belgian-classics';
export * from './stouts-porters';
export * from './german-classics';
export * from './craft-ipas';
export * from './british-ales';
export * from './wheat-beers';

// Combined array of all beers
import { internationalLagers } from './international-lagers';
import { belgianClassics } from './belgian-classics';
import { stoutsPorters } from './stouts-porters';
import { germanClassics } from './german-classics';
import { craftIpas } from './craft-ipas';
import { britishAles } from './british-ales';
import { wheatBeers } from './wheat-beers';

export const allBeers = [
  ...internationalLagers,
  ...belgianClassics,
  ...stoutsPorters,
  ...germanClassics,
  ...craftIpas,
  ...britishAles,
  ...wheatBeers,
];
