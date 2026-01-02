// Cuban Rice & Beans Dishes
// GUDBRO Database Standards v1.7

import { CubanDish } from '../types';

export const cubanRiceBeans: CubanDish[] = [
  {
    id: 'CUB_MOROS_CRISTIANOS',
    slug: 'moros-y-cristianos',
    name: 'Moros y Cristianos',
    description: 'Black beans and white rice cooked together, a staple of Cuban cuisine',
    category: 'rice_beans',
    status: 'iconic',
    region: 'National',
    cooking_method: 'simmered',
    prep_time_min: 60,
    spice_level: 0,
    dietary: { is_vegan: true, is_vegetarian: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['rice-beans', 'staple', 'vegan'],
    popularity: 95,
    ingredients: [
      { id: 'ING_BLACK_BEAN', role: 'main', quantity_amount: 300, quantity_unit: 'g', is_optional: false },
      { id: 'ING_RICE', role: 'main', quantity_amount: 400, quantity_unit: 'g', is_optional: false },
      { id: 'ING_ONION', role: 'secondary', quantity_amount: 100, quantity_unit: 'g', is_optional: false },
      { id: 'ING_BELL_PEPPER', role: 'secondary', quantity_amount: 80, quantity_unit: 'g', is_optional: false },
      { id: 'ING_GARLIC', role: 'seasoning', quantity_amount: 15, quantity_unit: 'g', is_optional: false },
      { id: 'ING_CUMIN', role: 'seasoning', quantity_amount: 5, quantity_unit: 'g', is_optional: false },
      { id: 'ING_BAY_LEAF', role: 'seasoning', quantity_amount: 2, quantity_unit: 'unit', is_optional: false },
      { id: 'ING_OLIVE_OIL', role: 'secondary', quantity_amount: 45, quantity_unit: 'ml', is_optional: false }
    ]
  },
  {
    id: 'CUB_CONGRI',
    slug: 'congri-oriental',
    name: 'Congri Oriental',
    description: 'Eastern Cuban style red beans and rice, heartier than Moros',
    category: 'rice_beans',
    status: 'iconic',
    region: 'Eastern Cuba',
    cooking_method: 'simmered',
    prep_time_min: 75,
    spice_level: 0,
    dietary: { is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['rice-beans', 'eastern-cuba', 'red-beans'],
    popularity: 88,
    ingredients: [
      { id: 'ING_RED_BEAN', role: 'main', quantity_amount: 300, quantity_unit: 'g', is_optional: false },
      { id: 'ING_RICE', role: 'main', quantity_amount: 400, quantity_unit: 'g', is_optional: false },
      { id: 'ING_BACON', role: 'secondary', quantity_amount: 100, quantity_unit: 'g', is_optional: false },
      { id: 'ING_ONION', role: 'secondary', quantity_amount: 100, quantity_unit: 'g', is_optional: false },
      { id: 'ING_BELL_PEPPER', role: 'secondary', quantity_amount: 80, quantity_unit: 'g', is_optional: false },
      { id: 'ING_GARLIC', role: 'seasoning', quantity_amount: 15, quantity_unit: 'g', is_optional: false },
      { id: 'ING_CUMIN', role: 'seasoning', quantity_amount: 5, quantity_unit: 'g', is_optional: false },
      { id: 'ING_OREGANO', role: 'seasoning', quantity_amount: 3, quantity_unit: 'g', is_optional: false }
    ]
  },
  {
    id: 'CUB_FRIJOLES_NEGROS',
    slug: 'frijoles-negros',
    name: 'Frijoles Negros',
    description: 'Cuban black bean soup, thick and flavorful, served over rice',
    category: 'rice_beans',
    status: 'iconic',
    region: 'National',
    cooking_method: 'simmered',
    prep_time_min: 120,
    spice_level: 0,
    dietary: { is_vegan: true, is_vegetarian: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['black-beans', 'soup', 'staple'],
    popularity: 93,
    ingredients: [
      { id: 'ING_BLACK_BEAN', role: 'main', quantity_amount: 450, quantity_unit: 'g', is_optional: false },
      { id: 'ING_ONION', role: 'secondary', quantity_amount: 150, quantity_unit: 'g', is_optional: false },
      { id: 'ING_BELL_PEPPER', role: 'secondary', quantity_amount: 100, quantity_unit: 'g', is_optional: false },
      { id: 'ING_GARLIC', role: 'seasoning', quantity_amount: 20, quantity_unit: 'g', is_optional: false },
      { id: 'ING_CUMIN', role: 'seasoning', quantity_amount: 8, quantity_unit: 'g', is_optional: false },
      { id: 'ING_OREGANO', role: 'seasoning', quantity_amount: 5, quantity_unit: 'g', is_optional: false },
      { id: 'ING_BAY_LEAF', role: 'seasoning', quantity_amount: 2, quantity_unit: 'unit', is_optional: false },
      { id: 'ING_OLIVE_OIL', role: 'secondary', quantity_amount: 60, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_VINEGAR', role: 'seasoning', quantity_amount: 15, quantity_unit: 'ml', is_optional: false }
    ]
  },
  {
    id: 'CUB_ARROZ_BLANCO',
    slug: 'arroz-blanco-cubano',
    name: 'Arroz Blanco Cubano',
    description: 'Cuban-style white rice, fluffy and dry, perfect accompaniment',
    category: 'rice_beans',
    status: 'classic',
    region: 'National',
    cooking_method: 'steamed',
    prep_time_min: 25,
    spice_level: 0,
    dietary: { is_vegan: true, is_vegetarian: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['rice', 'side', 'basic'],
    popularity: 90,
    ingredients: [
      { id: 'ING_RICE', role: 'main', quantity_amount: 400, quantity_unit: 'g', is_optional: false },
      { id: 'ING_VEGETABLE_OIL', role: 'secondary', quantity_amount: 30, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_SALT', role: 'seasoning', quantity_amount: 8, quantity_unit: 'g', is_optional: false },
      { id: 'ING_GARLIC', role: 'seasoning', quantity_amount: 5, quantity_unit: 'g', is_optional: true }
    ]
  },
  {
    id: 'CUB_ARROZ_AMARILLO',
    slug: 'arroz-amarillo',
    name: 'Arroz Amarillo',
    description: 'Yellow rice colored with bijol or saffron, often with vegetables',
    category: 'rice_beans',
    status: 'classic',
    region: 'National',
    cooking_method: 'steamed',
    prep_time_min: 30,
    spice_level: 0,
    dietary: { is_vegan: true, is_vegetarian: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['yellow-rice', 'saffron', 'side'],
    popularity: 85,
    ingredients: [
      { id: 'ING_RICE', role: 'main', quantity_amount: 400, quantity_unit: 'g', is_optional: false },
      { id: 'ING_SAFFRON', role: 'seasoning', quantity_amount: 1, quantity_unit: 'g', is_optional: false },
      { id: 'ING_ONION', role: 'secondary', quantity_amount: 50, quantity_unit: 'g', is_optional: false },
      { id: 'ING_GARLIC', role: 'seasoning', quantity_amount: 10, quantity_unit: 'g', is_optional: false },
      { id: 'ING_OLIVE_OIL', role: 'secondary', quantity_amount: 30, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_SALT', role: 'seasoning', quantity_amount: 8, quantity_unit: 'g', is_optional: false }
    ]
  }
];
