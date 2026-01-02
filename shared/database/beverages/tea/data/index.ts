/**
 * GUDBRO Tea & Infusions Database
 *
 * Complete collection of teas, including:
 * - Matcha drinks (10)
 * - Bubble Tea / Boba (15)
 * - Traditional Teas (18) - British, Japanese, Chinese, Indian
 * - Chai varieties (8)
 * - Herbal Infusions (14) - Caffeine-free tisanes
 *
 * Total: ~65 recipes
 * Architecture: English only in DB, translations separate
 */

import type { Tea, TeaStats } from '../types';
import { matchaDrinks } from './matcha';
import { bubbleTeaDrinks } from './bubble-tea';
import { traditionalTeas } from './traditional-teas';
import { chaiDrinks } from './chai';
import { herbalInfusions } from './herbal-infusions';

// Combine all teas
export const allTeas: Tea[] = [
  ...matchaDrinks,
  ...bubbleTeaDrinks,
  ...traditionalTeas,
  ...chaiDrinks,
  ...herbalInfusions
];

// Calculate stats
export const teaStats: TeaStats = {
  total: allTeas.length,
  by_category: {
    black_tea: allTeas.filter(t => t.category === 'black_tea').length,
    green_tea: allTeas.filter(t => t.category === 'green_tea').length,
    oolong_tea: allTeas.filter(t => t.category === 'oolong_tea').length,
    white_tea: allTeas.filter(t => t.category === 'white_tea').length,
    pu_erh: allTeas.filter(t => t.category === 'pu_erh').length,
    matcha: allTeas.filter(t => t.category === 'matcha').length,
    bubble_tea: allTeas.filter(t => t.category === 'bubble_tea').length,
    chai: allTeas.filter(t => t.category === 'chai').length,
    herbal_infusion: allTeas.filter(t => t.category === 'herbal_infusion').length,
    fruit_tea: allTeas.filter(t => t.category === 'fruit_tea').length,
    specialty: allTeas.filter(t => t.category === 'specialty').length
  },
  by_style: {
    hot: allTeas.filter(t => t.style === 'hot').length,
    iced: allTeas.filter(t => t.style === 'iced').length,
    blended: allTeas.filter(t => t.style === 'blended').length,
    layered: allTeas.filter(t => t.style === 'layered').length
  },
  by_caffeine: {
    none: allTeas.filter(t => t.caffeine_level === 'none').length,
    very_low: allTeas.filter(t => t.caffeine_level === 'very_low').length,
    low: allTeas.filter(t => t.caffeine_level === 'low').length,
    medium: allTeas.filter(t => t.caffeine_level === 'medium').length,
    high: allTeas.filter(t => t.caffeine_level === 'high').length
  }
};

// Named exports
export { matchaDrinks } from './matcha';
export { bubbleTeaDrinks } from './bubble-tea';
export { traditionalTeas } from './traditional-teas';
export { chaiDrinks } from './chai';
export { herbalInfusions } from './herbal-infusions';

export default allTeas;
