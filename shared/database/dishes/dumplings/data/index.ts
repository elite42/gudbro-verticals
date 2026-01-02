/**
 * GUDBRO Dumplings Database - Data Index
 *
 * Exports all dumplings and gnocchi organized by style
 * Sistema 5 Dimensioni v3.0 integrated
 */

// Italian Gnocchi & Filled Pasta
export * from './italian';

// Asian Dumplings
export * from './asian';

// International Dumplings
export * from './international';

// Aggregated exports
import { italianDumplings } from './italian';
import { asianDumplings } from './asian';
import { internationalDumplings } from './international';

import type { Dumpling } from '../../types/dumpling';

/** All dumplings combined */
export const allDumplings: Dumpling[] = [
  ...italianDumplings,
  ...asianDumplings,
  ...internationalDumplings,
];

/** Dumplings by style for easy filtering */
export const dumplingsByStyle = {
  italian_gnocchi: allDumplings.filter(d => d.style === 'italian_gnocchi'),
  italian_filled: allDumplings.filter(d => d.style === 'italian_filled'),
  asian_chinese: allDumplings.filter(d => d.style === 'asian_chinese'),
  asian_japanese: allDumplings.filter(d => d.style === 'asian_japanese'),
  asian_korean: allDumplings.filter(d => d.style === 'asian_korean'),
  asian_other: allDumplings.filter(d => d.style === 'asian_other'),
  eastern_european: allDumplings.filter(d => d.style === 'eastern_european'),
  middle_eastern: allDumplings.filter(d => d.style === 'middle_eastern'),
  south_american: allDumplings.filter(d => d.style === 'south_american'),
};

/** Quick stats */
export const dumplingsStats = {
  total: allDumplings.length,
  byStyle: Object.fromEntries(
    Object.entries(dumplingsByStyle).map(([style, dishes]) => [style, dishes.length])
  ),
};
