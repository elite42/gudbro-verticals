// Hawaiian Beverages
// Tropical drinks and refreshments

import { HawaiianDish } from '../types';

export const beverages: HawaiianDish[] = [
  {
    id: 'HI_POG',
    slug: 'pog-juice',
    name: 'POG Juice',
    description: 'Hawaii\'s beloved tropical juice blend: passion fruit, orange, and guava. Created in Maui in the 1970s, now a local staple.',
    category: 'beverage',
    status: 'iconic',
    region: 'Maui',
    protein_type: null,
    cooking_method: 'blended',
    prep_time_min: 5,
    spice_level: 0,
    dietary: {
      is_vegetarian: true,
      is_vegan: true,
      is_gluten_free: true,
      is_dairy_free: true,
    },
    allergens: [],
    tags: ['juice', 'tropical', 'refreshing', 'local_invention'],
    popularity: 90,
    ingredients: [
      { id: 'ING_PASSION_FRUIT', role: 'main', quantity_amount: 100, quantity_unit: 'g', is_optional: false },
      { id: 'ING_ORANGE_JUICE', role: 'main', quantity_amount: 150, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_GUAVA', role: 'main', quantity_amount: 100, quantity_unit: 'g', is_optional: false },
    ],
  },
  {
    id: 'HI_LILIKOIADE',
    slug: 'lilikoiade',
    name: 'Lilikoi-ade',
    description: 'Refreshing passion fruit lemonade. Tart, sweet, and perfectly tropical. A favorite at farmers markets and local eateries.',
    category: 'beverage',
    status: 'classic',
    region: 'Statewide',
    protein_type: null,
    cooking_method: 'mixed',
    prep_time_min: 10,
    spice_level: 0,
    dietary: {
      is_vegetarian: true,
      is_vegan: true,
      is_gluten_free: true,
      is_dairy_free: true,
    },
    allergens: [],
    tags: ['lemonade', 'lilikoi', 'refreshing', 'summer'],
    popularity: 82,
    ingredients: [
      { id: 'ING_PASSION_FRUIT', role: 'main', quantity_amount: 150, quantity_unit: 'g', is_optional: false },
      { id: 'ING_LEMON_JUICE', role: 'secondary', quantity_amount: 60, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_WATER', role: 'secondary', quantity_amount: 300, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_SUGAR', role: 'secondary', quantity_amount: 60, quantity_unit: 'g', is_optional: false },
    ],
  },
];
