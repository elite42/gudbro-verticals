/**
 * GUDBRO Risotti Database - Data Index
 *
 * Exports all risotti and rice dishes organized by style
 * Sistema 5 Dimensioni v3.0 integrated
 */

// Italian Classic Risotti
export * from './italian-classic';

// Italian Specialty Risotti
export * from './italian-specialty';

// International Rice Dishes
export * from './international';

// Aggregated exports
import { italianClassicRisotti } from './italian-classic';
import { italianSpecialtyRisotti } from './italian-specialty';
import { internationalRisotti } from './international';

import type { Risotto } from '../../types/risotto';

// Combine all Italian risotti
const allItalianRisotti = [...italianClassicRisotti, ...italianSpecialtyRisotti];

/** All risotti dishes combined */
export const allRisotti: Risotto[] = [
  ...allItalianRisotti,
  ...internationalRisotti,
];

/** Risotti by style for easy filtering */
export const risottiByStyle = {
  italian_classic: allItalianRisotti.filter(r => r.style === 'italian_classic'),
  italian_regional: allItalianRisotti.filter(r => r.style === 'italian_regional'),
  spanish_paella: internationalRisotti.filter(r => r.style === 'spanish_paella'),
  indian_biryani: internationalRisotti.filter(r => r.style === 'indian_biryani'),
  asian_fried: internationalRisotti.filter(r => r.style === 'asian_fried'),
  middle_eastern: internationalRisotti.filter(r => r.style === 'middle_eastern'),
  latin_american: internationalRisotti.filter(r => r.style === 'latin_american'),
};

/** Quick stats */
export const risottiStats = {
  total: allRisotti.length,
  byStyle: Object.fromEntries(
    Object.entries(risottiByStyle).map(([style, dishes]) => [style, dishes.length])
  ),
};
