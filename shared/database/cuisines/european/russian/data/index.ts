// Russian Cuisine - Data Index
// GUDBRO Database Standards v1.7

import { russianSoups } from './soups';
import { russianDumplings } from './dumplings';
import { russianMains } from './mains';
import { russianZakuski } from './zakuski';
import { russianPies } from './pies';
import { russianPancakes } from './pancakes';
import { russianSalads } from './salads';
import { russianDesserts } from './desserts';
import { russianPorridge } from './porridge';

export const allRussianDishes = [
  ...russianSoups,
  ...russianDumplings,
  ...russianMains,
  ...russianZakuski,
  ...russianPies,
  ...russianPancakes,
  ...russianSalads,
  ...russianDesserts,
  ...russianPorridge
];

export {
  russianSoups,
  russianDumplings,
  russianMains,
  russianZakuski,
  russianPies,
  russianPancakes,
  russianSalads,
  russianDesserts,
  russianPorridge
};

// Statistics
// Soups: 8
// Dumplings: 5
// Mains: 8
// Zakuski: 6
// Pies: 6
// Pancakes: 5
// Salads: 4
// Desserts: 8
// Porridge: 5
// -----------------
// Total: 55 dishes
