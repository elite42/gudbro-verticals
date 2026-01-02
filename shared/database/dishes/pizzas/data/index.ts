/**
 * GUDBRO Pizza Database - Main Index
 *
 * Exports all pizza collections
 * Total: 65+ pizza varieties across all categories
 */

import { italianClassicPizzas } from './italian-classic-pizzas';
import { americanPizzas } from './american-pizzas';
import { gourmetPizzas } from './gourmet-pizzas';
import { regionalItalianPizzas } from './regional-italian-pizzas';
import { internationalFusionPizzas } from './international-fusion-pizzas';

// Re-export individual collections
export { italianClassicPizzas } from './italian-classic-pizzas';
export { americanPizzas } from './american-pizzas';
export { gourmetPizzas } from './gourmet-pizzas';
export { regionalItalianPizzas } from './regional-italian-pizzas';
export { internationalFusionPizzas } from './international-fusion-pizzas';

// Combined collection of all pizzas
export const allPizzas = [
  ...italianClassicPizzas,
  ...americanPizzas,
  ...gourmetPizzas,
  ...regionalItalianPizzas,
  ...internationalFusionPizzas,
];

// Summary statistics
export const pizzaStats = {
  total: allPizzas.length,
  byCollection: {
    italianClassic: italianClassicPizzas.length,
    american: americanPizzas.length,
    gourmet: gourmetPizzas.length,
    regionalItalian: regionalItalianPizzas.length,
    internationalFusion: internationalFusionPizzas.length,
  },
  byStyle: allPizzas.reduce(
    (acc, pizza) => {
      acc[pizza.style] = (acc[pizza.style] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  ),
  byStatus: allPizzas.reduce(
    (acc, pizza) => {
      acc[pizza.status] = (acc[pizza.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  ),
};

export default allPizzas;
