// Polish Cuisine - Data Index
// GUDBRO Database Standards v1.7
// Total: 42 dishes

export { pierogiDishes } from './pierogi';
export { soupDishes } from './soups';
export { mainDishes } from './mains';
export { sideDishes } from './sides';
export { dessertDishes } from './desserts';

import { pierogiDishes } from './pierogi';
import { soupDishes } from './soups';
import { mainDishes } from './mains';
import { sideDishes } from './sides';
import { dessertDishes } from './desserts';

export const allPolishDishes = [
  ...pierogiDishes,    // 8 dishes
  ...soupDishes,       // 8 dishes
  ...mainDishes,       // 10 dishes
  ...sideDishes,       // 8 dishes
  ...dessertDishes,    // 8 dishes
];

// Summary:
// - Pierogi: 8 (ruskie, meat, cabbage, blueberry, strawberry, cheese, spinach, uszka)
// - Soups: 8 (zurek, barszcz czerwony, barszcz bialy, rosol, kapusniak, grochowka, pomidorowa, ogorkowa)
// - Mains: 10 (bigos, golabki, kotlet schabowy, kotlet mielony, zrazy, gulasz, kluski slaskie, kaczka, schab, flaki)
// - Sides/Street: 8 (placki, kopytka, mizeria, surowka, zapiekanka, oscypek, kielbasa, obwarzanek)
// - Desserts: 8 (paczki, sernik, makowiec, szarlotka, kremowka, racuchy, nalesniki, piernik)
// Total: 42 dishes
