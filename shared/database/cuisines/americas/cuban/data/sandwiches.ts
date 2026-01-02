// Cuban Sandwiches
// GUDBRO Database Standards v1.7

import { CubanDish } from '../types';

export const cubanSandwiches: CubanDish[] = [
  {
    id: 'CUB_CUBANO_SANDWICH',
    slug: 'cuban-sandwich',
    name: 'Cuban Sandwich',
    description: 'Iconic pressed sandwich with roast pork, ham, Swiss cheese, pickles and mustard on Cuban bread',
    category: 'sandwich',
    status: 'iconic',
    region: 'Tampa/Miami',
    protein_type: 'pork',
    cooking_method: 'pressed',
    prep_time_min: 20,
    spice_level: 0,
    dietary: {},
    allergens: ['gluten', 'dairy'],
    tags: ['iconic', 'pressed-sandwich', 'cuban-bread'],
    popularity: 98,
    ingredients: [
      { id: 'ING_CUBAN_BREAD', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_PORK_ROAST', role: 'main', quantity_amount: 150, quantity_unit: 'g', is_optional: false },
      { id: 'ING_HAM', role: 'main', quantity_amount: 100, quantity_unit: 'g', is_optional: false },
      { id: 'ING_SWISS_CHEESE', role: 'main', quantity_amount: 60, quantity_unit: 'g', is_optional: false },
      { id: 'ING_DILL_PICKLE', role: 'secondary', quantity_amount: 50, quantity_unit: 'g', is_optional: false },
      { id: 'ING_YELLOW_MUSTARD', role: 'secondary', quantity_amount: 20, quantity_unit: 'g', is_optional: false },
      { id: 'ING_BUTTER', role: 'secondary', quantity_amount: 20, quantity_unit: 'g', is_optional: false }
    ]
  },
  {
    id: 'CUB_MEDIANOCHE',
    slug: 'medianoche',
    name: 'Medianoche',
    description: 'Midnight sandwich on sweet egg bread, similar to Cuban but softer and sweeter',
    category: 'sandwich',
    status: 'iconic',
    region: 'Havana',
    protein_type: 'pork',
    cooking_method: 'pressed',
    prep_time_min: 20,
    spice_level: 0,
    dietary: {},
    allergens: ['gluten', 'dairy', 'egg'],
    tags: ['midnight-snack', 'sweet-bread', 'pressed'],
    popularity: 90,
    ingredients: [
      { id: 'ING_EGG_BREAD', role: 'main', quantity_amount: 180, quantity_unit: 'g', is_optional: false },
      { id: 'ING_PORK_ROAST', role: 'main', quantity_amount: 120, quantity_unit: 'g', is_optional: false },
      { id: 'ING_HAM', role: 'main', quantity_amount: 80, quantity_unit: 'g', is_optional: false },
      { id: 'ING_SWISS_CHEESE', role: 'main', quantity_amount: 50, quantity_unit: 'g', is_optional: false },
      { id: 'ING_DILL_PICKLE', role: 'secondary', quantity_amount: 40, quantity_unit: 'g', is_optional: false },
      { id: 'ING_YELLOW_MUSTARD', role: 'secondary', quantity_amount: 15, quantity_unit: 'g', is_optional: false },
      { id: 'ING_BUTTER', role: 'secondary', quantity_amount: 15, quantity_unit: 'g', is_optional: false }
    ]
  },
  {
    id: 'CUB_PAN_CON_LECHON',
    slug: 'pan-con-lechon',
    name: 'Pan con Lechon',
    description: 'Simple roast pork sandwich on Cuban bread with mojo sauce',
    category: 'sandwich',
    status: 'classic',
    region: 'National',
    protein_type: 'pork',
    cooking_method: 'assembled',
    prep_time_min: 10,
    spice_level: 1,
    dietary: { is_dairy_free: true },
    allergens: ['gluten'],
    tags: ['simple', 'pork', 'mojo'],
    popularity: 85,
    ingredients: [
      { id: 'ING_CUBAN_BREAD', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_PORK_ROAST', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_ONION', role: 'secondary', quantity_amount: 50, quantity_unit: 'g', is_optional: true },
      { id: 'ING_SOUR_ORANGE', role: 'seasoning', quantity_amount: 30, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_GARLIC', role: 'seasoning', quantity_amount: 10, quantity_unit: 'g', is_optional: false }
    ]
  },
  {
    id: 'CUB_ELENA_RUZ',
    slug: 'elena-ruz',
    name: 'Elena Ruz',
    description: 'Sweet and savory sandwich with turkey, cream cheese and strawberry jam',
    category: 'sandwich',
    status: 'traditional',
    region: 'Havana',
    protein_type: 'turkey',
    cooking_method: 'assembled',
    prep_time_min: 10,
    spice_level: 0,
    dietary: {},
    allergens: ['gluten', 'dairy'],
    tags: ['sweet-savory', 'turkey', 'unique'],
    popularity: 70,
    ingredients: [
      { id: 'ING_CUBAN_BREAD', role: 'main', quantity_amount: 150, quantity_unit: 'g', is_optional: false },
      { id: 'ING_TURKEY_BREAST', role: 'main', quantity_amount: 120, quantity_unit: 'g', is_optional: false },
      { id: 'ING_CREAM_CHEESE', role: 'main', quantity_amount: 50, quantity_unit: 'g', is_optional: false },
      { id: 'ING_STRAWBERRY_JAM', role: 'secondary', quantity_amount: 40, quantity_unit: 'g', is_optional: false }
    ]
  }
];
