// Cuban Side Dishes & Appetizers
// GUDBRO Database Standards v1.7

import { CubanDish } from '../types';

export const cubanSides: CubanDish[] = [
  {
    id: 'CUB_TOSTONES',
    slug: 'tostones',
    name: 'Tostones',
    description: 'Twice-fried green plantain slices, crispy and savory',
    category: 'side',
    status: 'iconic',
    region: 'National',
    cooking_method: 'fried',
    prep_time_min: 20,
    spice_level: 0,
    dietary: { is_vegan: true, is_vegetarian: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['plantain', 'fried', 'crispy'],
    popularity: 95,
    ingredients: [
      { id: 'ING_GREEN_PLANTAIN', role: 'main', quantity_amount: 400, quantity_unit: 'g', is_optional: false },
      { id: 'ING_VEGETABLE_OIL', role: 'secondary', quantity_amount: 300, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_SALT', role: 'seasoning', quantity_amount: 5, quantity_unit: 'g', is_optional: false },
      { id: 'ING_GARLIC', role: 'seasoning', quantity_amount: 10, quantity_unit: 'g', is_optional: true }
    ]
  },
  {
    id: 'CUB_MADUROS',
    slug: 'maduros',
    name: 'Maduros',
    description: 'Fried sweet ripe plantains, caramelized and tender',
    category: 'side',
    status: 'iconic',
    region: 'National',
    cooking_method: 'fried',
    prep_time_min: 15,
    spice_level: 0,
    dietary: { is_vegan: true, is_vegetarian: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['plantain', 'sweet', 'caramelized'],
    popularity: 93,
    ingredients: [
      { id: 'ING_RIPE_PLANTAIN', role: 'main', quantity_amount: 400, quantity_unit: 'g', is_optional: false },
      { id: 'ING_VEGETABLE_OIL', role: 'secondary', quantity_amount: 150, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_SALT', role: 'seasoning', quantity_amount: 2, quantity_unit: 'g', is_optional: true }
    ]
  },
  {
    id: 'CUB_YUCA_CON_MOJO',
    slug: 'yuca-con-mojo',
    name: 'Yuca con Mojo',
    description: 'Boiled cassava topped with garlicky citrus mojo sauce',
    category: 'side',
    status: 'iconic',
    region: 'National',
    cooking_method: 'boiled',
    prep_time_min: 40,
    spice_level: 0,
    dietary: { is_vegan: true, is_vegetarian: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['yuca', 'mojo', 'garlic'],
    popularity: 90,
    ingredients: [
      { id: 'ING_CASSAVA', role: 'main', quantity_amount: 600, quantity_unit: 'g', is_optional: false },
      { id: 'ING_GARLIC', role: 'main', quantity_amount: 40, quantity_unit: 'g', is_optional: false },
      { id: 'ING_SOUR_ORANGE', role: 'main', quantity_amount: 100, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_OLIVE_OIL', role: 'secondary', quantity_amount: 80, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_ONION', role: 'secondary', quantity_amount: 50, quantity_unit: 'g', is_optional: true },
      { id: 'ING_SALT', role: 'seasoning', quantity_amount: 8, quantity_unit: 'g', is_optional: false }
    ]
  },
  {
    id: 'CUB_MARIQUITAS',
    slug: 'mariquitas',
    name: 'Mariquitas',
    description: 'Thin crispy plantain chips, Cuban-style potato chips',
    category: 'side',
    status: 'classic',
    region: 'National',
    cooking_method: 'fried',
    prep_time_min: 20,
    spice_level: 0,
    dietary: { is_vegan: true, is_vegetarian: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['chips', 'plantain', 'snack'],
    popularity: 85,
    ingredients: [
      { id: 'ING_GREEN_PLANTAIN', role: 'main', quantity_amount: 400, quantity_unit: 'g', is_optional: false },
      { id: 'ING_VEGETABLE_OIL', role: 'secondary', quantity_amount: 400, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_SALT', role: 'seasoning', quantity_amount: 5, quantity_unit: 'g', is_optional: false }
    ]
  },
  {
    id: 'CUB_PLATANO_MADURO_HORNO',
    slug: 'platano-maduro-al-horno',
    name: 'Platano Maduro al Horno',
    description: 'Baked ripe plantains with butter and cinnamon, sweet side dish',
    category: 'side',
    status: 'classic',
    region: 'National',
    cooking_method: 'baked',
    prep_time_min: 35,
    spice_level: 0,
    dietary: { is_vegetarian: true, is_gluten_free: true },
    allergens: ['dairy'],
    tags: ['baked', 'sweet', 'cinnamon'],
    popularity: 75,
    ingredients: [
      { id: 'ING_RIPE_PLANTAIN', role: 'main', quantity_amount: 400, quantity_unit: 'g', is_optional: false },
      { id: 'ING_BUTTER', role: 'secondary', quantity_amount: 40, quantity_unit: 'g', is_optional: false },
      { id: 'ING_CINNAMON', role: 'seasoning', quantity_amount: 3, quantity_unit: 'g', is_optional: false },
      { id: 'ING_BROWN_SUGAR', role: 'seasoning', quantity_amount: 30, quantity_unit: 'g', is_optional: true }
    ]
  },
  {
    id: 'CUB_BONIATO_FRITO',
    slug: 'boniato-frito',
    name: 'Boniato Frito',
    description: 'Fried Cuban sweet potato, crispy outside and creamy inside',
    category: 'side',
    status: 'traditional',
    region: 'National',
    cooking_method: 'fried',
    prep_time_min: 25,
    spice_level: 0,
    dietary: { is_vegan: true, is_vegetarian: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['sweet-potato', 'fried', 'cuban'],
    popularity: 70,
    ingredients: [
      { id: 'ING_SWEET_POTATO', role: 'main', quantity_amount: 500, quantity_unit: 'g', is_optional: false },
      { id: 'ING_VEGETABLE_OIL', role: 'secondary', quantity_amount: 250, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_SALT', role: 'seasoning', quantity_amount: 5, quantity_unit: 'g', is_optional: false }
    ]
  },
  {
    id: 'CUB_ENSALADA_MIXTA',
    slug: 'ensalada-mixta-cubana',
    name: 'Ensalada Mixta Cubana',
    description: 'Cuban mixed salad with tomatoes, lettuce, avocado and onion',
    category: 'side',
    status: 'classic',
    region: 'National',
    cooking_method: 'raw',
    prep_time_min: 15,
    spice_level: 0,
    dietary: { is_vegan: true, is_vegetarian: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['salad', 'fresh', 'healthy'],
    popularity: 75,
    ingredients: [
      { id: 'ING_LETTUCE', role: 'main', quantity_amount: 150, quantity_unit: 'g', is_optional: false },
      { id: 'ING_TOMATO', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_AVOCADO', role: 'main', quantity_amount: 150, quantity_unit: 'g', is_optional: false },
      { id: 'ING_ONION', role: 'secondary', quantity_amount: 50, quantity_unit: 'g', is_optional: false },
      { id: 'ING_OLIVE_OIL', role: 'secondary', quantity_amount: 30, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_LIME', role: 'seasoning', quantity_amount: 30, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_SALT', role: 'seasoning', quantity_amount: 3, quantity_unit: 'g', is_optional: false }
    ]
  }
];
