// ============================================
// CARIBBEAN Database - Index
// GUDBRO Database Standards v1.3
// ============================================

import { jamaicaItems } from './jamaica';
import { cubaItems } from './cuba';
import { puertoRicoItems } from './puerto-rico';
import { trinidadItems } from './trinidad';
import { haitiItems } from './haiti';
import { dominicanItems } from './dominican-republic';
import { otherIslandsItems } from './other-islands';

// Combine all Caribbean items
export const allCaribbeanItems = [
  ...jamaicaItems,
  ...cubaItems,
  ...puertoRicoItems,
  ...trinidadItems,
  ...haitiItems,
  ...dominicanItems,
  ...otherIslandsItems
];

// Export by country for individual imports
export {
  jamaicaItems,
  cubaItems,
  puertoRicoItems,
  trinidadItems,
  haitiItems,
  dominicanItems,
  otherIslandsItems
};

// Statistics
export const caribbeanStats = {
  totalItems: allCaribbeanItems.length,
  byOrigin: {
    jamaica: jamaicaItems.length,
    cuba: cubaItems.length,
    puerto_rico: puertoRicoItems.length,
    trinidad_tobago: trinidadItems.length,
    haiti: haitiItems.length,
    dominican_republic: dominicanItems.length,
    other_islands: otherIslandsItems.length
  },
  byCategory: allCaribbeanItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
};

// Log stats when module is imported (for debugging)
if (process.env.NODE_ENV === 'development') {
  console.log('Caribbean Database Stats:', caribbeanStats);
}

export default allCaribbeanItems;
