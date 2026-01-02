// Cuban Desserts
// GUDBRO Database Standards v1.7

import { CubanDish } from '../types';

export const cubanDesserts: CubanDish[] = [
  {
    id: 'CUB_FLAN_CUBANO',
    slug: 'flan-cubano',
    name: 'Flan Cubano',
    description: 'Cuban-style caramel custard, rich and creamy',
    category: 'dessert',
    status: 'iconic',
    region: 'National',
    cooking_method: 'baked',
    prep_time_min: 60,
    spice_level: 0,
    dietary: { is_gluten_free: true, is_vegetarian: true },
    allergens: ['dairy', 'egg'],
    tags: ['custard', 'caramel', 'classic'],
    popularity: 95,
    ingredients: [
      { id: 'ING_EGG', role: 'main', quantity_amount: 6, quantity_unit: 'unit', is_optional: false },
      { id: 'ING_CONDENSED_MILK', role: 'main', quantity_amount: 400, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_EVAPORATED_MILK', role: 'main', quantity_amount: 350, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_SUGAR', role: 'secondary', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_VANILLA_EXTRACT', role: 'seasoning', quantity_amount: 10, quantity_unit: 'ml', is_optional: false }
    ]
  },
  {
    id: 'CUB_TRES_LECHES',
    slug: 'tres-leches-cubano',
    name: 'Tres Leches Cubano',
    description: 'Sponge cake soaked in three kinds of milk, topped with meringue',
    category: 'dessert',
    status: 'iconic',
    region: 'National',
    cooking_method: 'baked',
    prep_time_min: 90,
    spice_level: 0,
    dietary: { is_vegetarian: true },
    allergens: ['dairy', 'egg', 'gluten'],
    tags: ['cake', 'milk', 'soaked'],
    popularity: 92,
    ingredients: [
      { id: 'ING_FLOUR', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_EGG', role: 'main', quantity_amount: 5, quantity_unit: 'unit', is_optional: false },
      { id: 'ING_CONDENSED_MILK', role: 'main', quantity_amount: 400, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_EVAPORATED_MILK', role: 'main', quantity_amount: 350, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_HEAVY_CREAM', role: 'main', quantity_amount: 250, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_SUGAR', role: 'secondary', quantity_amount: 150, quantity_unit: 'g', is_optional: false },
      { id: 'ING_VANILLA_EXTRACT', role: 'seasoning', quantity_amount: 10, quantity_unit: 'ml', is_optional: false }
    ]
  },
  {
    id: 'CUB_ARROZ_CON_LECHE',
    slug: 'arroz-con-leche-cubano',
    name: 'Arroz con Leche Cubano',
    description: 'Cuban rice pudding with cinnamon and lime zest',
    category: 'dessert',
    status: 'classic',
    region: 'National',
    cooking_method: 'simmered',
    prep_time_min: 45,
    spice_level: 0,
    dietary: { is_gluten_free: true, is_vegetarian: true },
    allergens: ['dairy'],
    tags: ['rice-pudding', 'cinnamon', 'comfort'],
    popularity: 88,
    ingredients: [
      { id: 'ING_RICE', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_MILK', role: 'main', quantity_amount: 1000, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_CONDENSED_MILK', role: 'secondary', quantity_amount: 200, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_SUGAR', role: 'secondary', quantity_amount: 100, quantity_unit: 'g', is_optional: false },
      { id: 'ING_CINNAMON', role: 'seasoning', quantity_amount: 5, quantity_unit: 'g', is_optional: false },
      { id: 'ING_LIME', role: 'seasoning', quantity_amount: 1, quantity_unit: 'unit', is_optional: false }
    ]
  },
  {
    id: 'CUB_NATILLA',
    slug: 'natilla-cubana',
    name: 'Natilla Cubana',
    description: 'Cuban vanilla custard with cinnamon, lighter than flan',
    category: 'dessert',
    status: 'classic',
    region: 'National',
    cooking_method: 'simmered',
    prep_time_min: 30,
    spice_level: 0,
    dietary: { is_gluten_free: true, is_vegetarian: true },
    allergens: ['dairy', 'egg'],
    tags: ['custard', 'vanilla', 'light'],
    popularity: 82,
    ingredients: [
      { id: 'ING_MILK', role: 'main', quantity_amount: 500, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_EGG', role: 'main', quantity_amount: 4, quantity_unit: 'unit', is_optional: false },
      { id: 'ING_SUGAR', role: 'secondary', quantity_amount: 120, quantity_unit: 'g', is_optional: false },
      { id: 'ING_CORNSTARCH', role: 'secondary', quantity_amount: 30, quantity_unit: 'g', is_optional: false },
      { id: 'ING_VANILLA_EXTRACT', role: 'seasoning', quantity_amount: 10, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_CINNAMON', role: 'garnish', quantity_amount: 3, quantity_unit: 'g', is_optional: false }
    ]
  },
  {
    id: 'CUB_DULCE_LECHE_CORTADA',
    slug: 'dulce-de-leche-cortada',
    name: 'Dulce de Leche Cortada',
    description: 'Sweet curdled milk dessert, traditional Cuban delicacy',
    category: 'dessert',
    status: 'traditional',
    region: 'National',
    cooking_method: 'simmered',
    prep_time_min: 60,
    spice_level: 0,
    dietary: { is_gluten_free: true, is_vegetarian: true },
    allergens: ['dairy'],
    tags: ['curdled-milk', 'sweet', 'traditional'],
    popularity: 75,
    ingredients: [
      { id: 'ING_MILK', role: 'main', quantity_amount: 1000, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_SUGAR', role: 'main', quantity_amount: 300, quantity_unit: 'g', is_optional: false },
      { id: 'ING_LIME', role: 'secondary', quantity_amount: 50, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_CINNAMON', role: 'seasoning', quantity_amount: 5, quantity_unit: 'g', is_optional: false },
      { id: 'ING_VANILLA_EXTRACT', role: 'seasoning', quantity_amount: 5, quantity_unit: 'ml', is_optional: false }
    ]
  },
  {
    id: 'CUB_COQUITOS',
    slug: 'coquitos-cubanos',
    name: 'Coquitos Cubanos',
    description: 'Coconut macaroons, sweet and chewy Cuban cookies',
    category: 'dessert',
    status: 'classic',
    region: 'National',
    cooking_method: 'baked',
    prep_time_min: 40,
    spice_level: 0,
    dietary: { is_gluten_free: true, is_vegetarian: true },
    allergens: ['egg'],
    tags: ['coconut', 'cookies', 'macaroon'],
    popularity: 80,
    ingredients: [
      { id: 'ING_COCONUT', role: 'main', quantity_amount: 300, quantity_unit: 'g', is_optional: false },
      { id: 'ING_SUGAR', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_EGG', role: 'secondary', quantity_amount: 2, quantity_unit: 'unit', is_optional: false },
      { id: 'ING_VANILLA_EXTRACT', role: 'seasoning', quantity_amount: 5, quantity_unit: 'ml', is_optional: false }
    ]
  }
];
