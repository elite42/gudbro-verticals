import { ChineseItem } from '../types';
import { stirFries } from './stir-fries';
import { noodles } from './noodles';
import { dimSum } from './dim-sum';
import { riceDishes } from './rice-dishes';
import { roasted } from './roasted';
import { soups } from './soups';
import { braised } from './braised';
import { seafood } from './seafood';
import { appetizers } from './appetizers';
import { desserts } from './desserts';

export const allChineseItems: ChineseItem[] = [
  ...stirFries,
  ...noodles,
  ...dimSum,
  ...riceDishes,
  ...roasted,
  ...soups,
  ...braised,
  ...seafood,
  ...appetizers,
  ...desserts,
];

export {
  stirFries,
  noodles,
  dimSum,
  riceDishes,
  roasted,
  soups,
  braised,
  seafood,
  appetizers,
  desserts,
};

// Summary
console.log('Chinese Database Summary:');
console.log(`- Stir Fries: ${stirFries.length}`);
console.log(`- Noodles: ${noodles.length}`);
console.log(`- Dim Sum: ${dimSum.length}`);
console.log(`- Rice Dishes: ${riceDishes.length}`);
console.log(`- Roasted: ${roasted.length}`);
console.log(`- Soups: ${soups.length}`);
console.log(`- Braised: ${braised.length}`);
console.log(`- Seafood: ${seafood.length}`);
console.log(`- Appetizers: ${appetizers.length}`);
console.log(`- Desserts: ${desserts.length}`);
console.log(`- TOTAL: ${allChineseItems.length}`);
