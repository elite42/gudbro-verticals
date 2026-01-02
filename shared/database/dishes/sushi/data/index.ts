// =====================================================
// GUDBRO Japanese Cuisine Database - Main Index
// Created: 2025-12-17
// =====================================================

import { JapaneseDish } from './types';
import { nigiriSushi } from './nigiri';
import { sashimiDishes } from './sashimi';
import { makiRolls } from './maki';
import { specialtyRolls } from './specialty-rolls';
import { temakiGunkan } from './temaki-gunkan';
import { donburiChirashi } from './donburi-chirashi';
import { otherStyles } from './other-styles';

// Export individual collections
export { nigiriSushi } from './nigiri';
export { sashimiDishes } from './sashimi';
export { makiRolls } from './maki';
export { specialtyRolls } from './specialty-rolls';
export { temakiGunkan } from './temaki-gunkan';
export { donburiChirashi } from './donburi-chirashi';
export { otherStyles } from './other-styles';

// Export types
export * from './types';

// Combined collection of all Japanese dishes
export const allJapaneseDishes: JapaneseDish[] = [
  ...nigiriSushi,
  ...sashimiDishes,
  ...makiRolls,
  ...specialtyRolls,
  ...temakiGunkan,
  ...donburiChirashi,
  ...otherStyles,
];

// Statistics
export const japaneseDatabaseStats = {
  total: allJapaneseDishes.length,
  byCategory: {
    nigiri: nigiriSushi.length,
    sashimi: sashimiDishes.length,
    maki: makiRolls.filter(d => d.category === 'maki').length,
    uramaki: [...makiRolls, ...specialtyRolls].filter(d => d.category === 'uramaki').length,
    specialty_roll: specialtyRolls.filter(d => d.category === 'specialty_roll').length,
    temaki: temakiGunkan.filter(d => d.category === 'temaki').length,
    gunkan: temakiGunkan.filter(d => d.category === 'gunkan').length,
    chirashi: donburiChirashi.filter(d => d.category === 'chirashi').length,
    donburi: donburiChirashi.filter(d => d.category === 'donburi').length,
    inari: otherStyles.filter(d => d.category === 'inari').length,
    temari: otherStyles.filter(d => d.category === 'temari').length,
    oshizushi: otherStyles.filter(d => d.category === 'oshizushi').length,
  },
  byDietary: {
    vegetarian: allJapaneseDishes.filter(d => d.is_vegetarian).length,
    vegan: allJapaneseDishes.filter(d => d.is_vegan).length,
    containsRawFish: allJapaneseDishes.filter(d => d.contains_raw_fish).length,
    cooked: allJapaneseDishes.filter(d => d.is_cooked).length,
  },
  byStatus: {
    classic: allJapaneseDishes.filter(d => d.status === 'classic').length,
    popular: allJapaneseDishes.filter(d => d.status === 'popular').length,
    premium: allJapaneseDishes.filter(d => d.status === 'premium').length,
    omakase: allJapaneseDishes.filter(d => d.status === 'omakase').length,
    signature: allJapaneseDishes.filter(d => d.status === 'signature').length,
    seasonal: allJapaneseDishes.filter(d => d.status === 'seasonal').length,
  },
  byOrigin: {
    traditional_edo: allJapaneseDishes.filter(d => d.origin === 'traditional_edo').length,
    traditional_osaka: allJapaneseDishes.filter(d => d.origin === 'traditional_osaka').length,
    modern_japanese: allJapaneseDishes.filter(d => d.origin === 'modern_japanese').length,
    american_fusion: allJapaneseDishes.filter(d => d.origin === 'american_fusion').length,
    international: allJapaneseDishes.filter(d => d.origin === 'international').length,
  },
};

export default allJapaneseDishes;
