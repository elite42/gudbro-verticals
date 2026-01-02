import { GermanItem } from '../types';
import { sausagesItems } from './sausages';
import { mainsItems } from './mains';
import { sidesItems } from './sides';
import { soupsItems } from './soups';
import { bakedItems } from './baked';
import { dessertsItems } from './desserts';

export const allGermanItems: GermanItem[] = [
  ...sausagesItems,
  ...mainsItems,
  ...sidesItems,
  ...soupsItems,
  ...bakedItems,
  ...dessertsItems,
];

export {
  sausagesItems,
  mainsItems,
  sidesItems,
  soupsItems,
  bakedItems,
  dessertsItems,
};

// Stats
export const germanStats = {
  total: allGermanItems.length,
  byCategory: {
    sausages: sausagesItems.length,
    mains: mainsItems.length,
    sides: sidesItems.length,
    soups: soupsItems.length,
    baked: bakedItems.length,
    desserts: dessertsItems.length,
  },
};
