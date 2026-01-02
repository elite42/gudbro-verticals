/**
 * IBA Unforgettables - Index
 *
 * Exports all IBA Unforgettables cocktails.
 * Each cocktail is in its own file for maintainability.
 *
 * Total: 40 cocktails in this category (as of 2025-12-14)
 *
 * @version 1.2
 * @lastUpdated 2025-12-14
 */

import type { Cocktail } from '../../types/cocktail';

// ============================================================================
// INDIVIDUAL COCKTAIL IMPORTS
// ============================================================================

// Batch 1: A-D (8 cocktails) - MIGRATED
export { alexander } from './alexander';
export { americano } from './americano';
export { angelFace } from './angel-face';
export { aviation } from './aviation';
export { betweenTheSheets } from './between-the-sheets';
export { boulevardier } from './boulevardier';
export { cloverClub } from './clover-club';
export { daiquiri } from './daiquiri';

// Batch 2: D-H (6 cocktails) - NEW
export { dryMartini } from './dry-martini';
export { ginFizz } from './gin-fizz';
export { hankyPanky } from './hanky-panky';
export { johnCollins } from './john-collins';
export { lastWord } from './last-word';
export { manhattan } from './manhattan';

// Batch 3: M-N (5 cocktails) - NEW
export { martinez } from './martinez';
export { margarita } from './margarita';
export { mintJulep } from './mint-julep';
export { negroni } from './negroni';
export { oldFashioned } from './old-fashioned';

// Batch 4: S-W (2 cocktails) - NEW
export { whiskeySour } from './whiskey-sour';
export { sidecar } from './sidecar';

// Batch 5: New additions (16 cocktails) - 2025-12-13
export { bacardi } from './bacardi';
export { brandyCrusta } from './brandy-crusta';
export { casino } from './casino';
export { derby } from './derby';
export { maryPickford } from './mary-pickford';
export { monkeyGland } from './monkey-gland';
export { paradise } from './paradise';
export { plantersPunch } from './planters-punch';
export { portoFlip } from './porto-flip';
export { ramosGinFizz } from './ramos-gin-fizz';
export { rememberTheMaine } from './remember-the-maine';
export { rustyNail } from './rusty-nail';
export { sazerac } from './sazerac';
export { screwdriver } from './screwdriver';
export { stinger } from './stinger';
export { tuxedo } from './tuxedo';
export { vieuxCarre } from './vieux-carre';
export { whiteLady } from './white-lady';

// ============================================================================
// COMBINED ARRAY
// ============================================================================

// Import for array (need to import again for array construction)
import { alexander } from './alexander';
import { americano } from './americano';
import { angelFace } from './angel-face';
import { aviation } from './aviation';
import { bacardi } from './bacardi';
import { betweenTheSheets } from './between-the-sheets';
import { boulevardier } from './boulevardier';
import { brandyCrusta } from './brandy-crusta';
import { casino } from './casino';
import { cloverClub } from './clover-club';
import { daiquiri } from './daiquiri';
import { derby } from './derby';
import { dryMartini } from './dry-martini';
import { ginFizz } from './gin-fizz';
import { hankyPanky } from './hanky-panky';
import { johnCollins } from './john-collins';
import { lastWord } from './last-word';
import { manhattan } from './manhattan';
import { margarita } from './margarita';
import { martinez } from './martinez';
import { maryPickford } from './mary-pickford';
import { mintJulep } from './mint-julep';
import { monkeyGland } from './monkey-gland';
import { negroni } from './negroni';
import { oldFashioned } from './old-fashioned';
import { paradise } from './paradise';
import { plantersPunch } from './planters-punch';
import { portoFlip } from './porto-flip';
import { ramosGinFizz } from './ramos-gin-fizz';
import { rememberTheMaine } from './remember-the-maine';
import { rustyNail } from './rusty-nail';
import { sazerac } from './sazerac';
import { screwdriver } from './screwdriver';
import { sidecar } from './sidecar';
import { stinger } from './stinger';
import { tuxedo } from './tuxedo';
import { vieuxCarre } from './vieux-carre';
import { whiskeySour } from './whiskey-sour';
import { whiteLady } from './white-lady';

/**
 * All IBA Unforgettables cocktails
 */
export const ibaUnforgettables: Cocktail[] = [
  // Batch 1: A-D (migrated from original file)
  alexander,
  americano,
  angelFace,
  aviation,
  bacardi,
  betweenTheSheets,
  boulevardier,
  brandyCrusta,
  casino,
  cloverClub,
  daiquiri,
  derby,
  // Batch 2: D-H (new)
  dryMartini,
  ginFizz,
  hankyPanky,
  johnCollins,
  lastWord,
  manhattan,
  // Batch 3: M-O (new)
  margarita,
  martinez,
  maryPickford,
  mintJulep,
  monkeyGland,
  negroni,
  oldFashioned,
  // Batch 4: P-S (new)
  paradise,
  plantersPunch,
  portoFlip,
  ramosGinFizz,
  rememberTheMaine,
  rustyNail,
  sazerac,
  screwdriver,
  sidecar,
  stinger,
  // Batch 5: T-W (new)
  tuxedo,
  vieuxCarre,
  whiskeySour,
  whiteLady,
];

export const IBA_UNFORGETTABLES_COUNT = ibaUnforgettables.length;
