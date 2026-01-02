/**
 * GUDBRO Soups Database - Data Index
 *
 * Exports all soups organized by style
 * Sistema 5 Dimensioni v3.0 integrated
 */

// Italian Soups
export * from './italian';

// Asian Soups
export * from './asian';

// Vietnamese Phở (dedicated collection for Vietnam market)
export * from './vietnamese-pho';

// European & American Soups
export * from './european';

// Aggregated exports
import { italianSoups } from './italian';
import { asianSoups } from './asian';
import { vietnamesePhoSoups } from './vietnamese-pho';
import { europeanSoups } from './european';

import type { Soup } from '../../types/soup';

/** All soups combined */
export const allSoups: Soup[] = [
  ...italianSoups,
  ...asianSoups,
  ...vietnamesePhoSoups,
  ...europeanSoups,
];

/** Soups by style for easy filtering */
export const soupsByStyle = {
  italian: allSoups.filter(s => s.style === 'italian'),
  french: allSoups.filter(s => s.style === 'french'),
  spanish: allSoups.filter(s => s.style === 'spanish'),
  asian_chinese: allSoups.filter(s => s.style === 'asian_chinese'),
  asian_japanese: allSoups.filter(s => s.style === 'asian_japanese'),
  asian_korean: allSoups.filter(s => s.style === 'asian_korean'),
  asian_thai: allSoups.filter(s => s.style === 'asian_thai'),
  asian_vietnamese: allSoups.filter(s => s.style === 'asian_vietnamese'),
  eastern_european: allSoups.filter(s => s.style === 'eastern_european'),
  middle_eastern: allSoups.filter(s => s.style === 'middle_eastern'),
  american: allSoups.filter(s => s.style === 'american'),
  mexican: allSoups.filter(s => s.style === 'mexican'),
};

/** Quick stats */
export const soupsStats = {
  total: allSoups.length,
  byStyle: Object.fromEntries(
    Object.entries(soupsByStyle).map(([style, soups]) => [style, soups.length])
  ),
};
