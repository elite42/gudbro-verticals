// Cuban Soups
// GUDBRO Database Standards v1.7

import { CubanDish } from '../types';

export const cubanSoups: CubanDish[] = [
  {
    id: 'CUB_AJIACO',
    slug: 'ajiaco-criollo',
    name: 'Ajiaco Criollo',
    description: 'Traditional Cuban stew with multiple root vegetables, corn and meats',
    category: 'soup',
    status: 'iconic',
    region: 'National',
    protein_type: 'mixed',
    cooking_method: 'simmered',
    prep_time_min: 180,
    spice_level: 0,
    dietary: { is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['stew', 'root-vegetables', 'hearty'],
    popularity: 92,
    ingredients: [
      { id: 'ING_BEEF', role: 'main', quantity_amount: 300, quantity_unit: 'g', is_optional: false },
      { id: 'ING_PORK', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_CASSAVA', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_SWEET_POTATO', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_CORN', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_GREEN_PLANTAIN', role: 'secondary', quantity_amount: 150, quantity_unit: 'g', is_optional: false },
      { id: 'ING_RIPE_PLANTAIN', role: 'secondary', quantity_amount: 150, quantity_unit: 'g', is_optional: false },
      { id: 'ING_PUMPKIN', role: 'secondary', quantity_amount: 150, quantity_unit: 'g', is_optional: false },
      { id: 'ING_LIME', role: 'seasoning', quantity_amount: 30, quantity_unit: 'ml', is_optional: false }
    ]
  },
  {
    id: 'CUB_POTAJE_GARBANZOS',
    slug: 'potaje-de-garbanzos',
    name: 'Potaje de Garbanzos',
    description: 'Hearty chickpea stew with chorizo and vegetables',
    category: 'soup',
    status: 'classic',
    region: 'National',
    protein_type: 'pork',
    cooking_method: 'simmered',
    prep_time_min: 90,
    spice_level: 1,
    dietary: { is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['chickpea', 'stew', 'spanish-influence'],
    popularity: 80,
    ingredients: [
      { id: 'ING_CHICKPEA', role: 'main', quantity_amount: 400, quantity_unit: 'g', is_optional: false },
      { id: 'ING_CHORIZO', role: 'main', quantity_amount: 150, quantity_unit: 'g', is_optional: false },
      { id: 'ING_POTATO', role: 'secondary', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_ONION', role: 'secondary', quantity_amount: 100, quantity_unit: 'g', is_optional: false },
      { id: 'ING_TOMATO', role: 'secondary', quantity_amount: 150, quantity_unit: 'g', is_optional: false },
      { id: 'ING_GARLIC', role: 'seasoning', quantity_amount: 15, quantity_unit: 'g', is_optional: false },
      { id: 'ING_CUMIN', role: 'seasoning', quantity_amount: 5, quantity_unit: 'g', is_optional: false },
      { id: 'ING_BAY_LEAF', role: 'seasoning', quantity_amount: 2, quantity_unit: 'unit', is_optional: false }
    ]
  },
  {
    id: 'CUB_CALDO_GALLEGO',
    slug: 'caldo-gallego',
    name: 'Caldo Gallego',
    description: 'Galician-style white bean soup with greens and pork',
    category: 'soup',
    status: 'classic',
    region: 'National',
    protein_type: 'pork',
    cooking_method: 'simmered',
    prep_time_min: 120,
    spice_level: 0,
    dietary: { is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['white-beans', 'greens', 'spanish-origin'],
    popularity: 78,
    ingredients: [
      { id: 'ING_WHITE_BEAN', role: 'main', quantity_amount: 350, quantity_unit: 'g', is_optional: false },
      { id: 'ING_HAM', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_CHORIZO', role: 'main', quantity_amount: 100, quantity_unit: 'g', is_optional: false },
      { id: 'ING_COLLARD_GREENS', role: 'secondary', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_POTATO', role: 'secondary', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_ONION', role: 'secondary', quantity_amount: 80, quantity_unit: 'g', is_optional: false },
      { id: 'ING_GARLIC', role: 'seasoning', quantity_amount: 10, quantity_unit: 'g', is_optional: false }
    ]
  },
  {
    id: 'CUB_SOPA_PLATANO',
    slug: 'sopa-de-platano',
    name: 'Sopa de Platano',
    description: 'Creamy plantain soup, comforting and traditional',
    category: 'soup',
    status: 'traditional',
    region: 'National',
    cooking_method: 'simmered',
    prep_time_min: 45,
    spice_level: 0,
    dietary: { is_gluten_free: true },
    allergens: ['dairy'],
    tags: ['plantain', 'creamy', 'comfort'],
    popularity: 70,
    ingredients: [
      { id: 'ING_GREEN_PLANTAIN', role: 'main', quantity_amount: 400, quantity_unit: 'g', is_optional: false },
      { id: 'ING_CHICKEN_BROTH', role: 'main', quantity_amount: 1000, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_ONION', role: 'secondary', quantity_amount: 80, quantity_unit: 'g', is_optional: false },
      { id: 'ING_GARLIC', role: 'seasoning', quantity_amount: 10, quantity_unit: 'g', is_optional: false },
      { id: 'ING_HEAVY_CREAM', role: 'secondary', quantity_amount: 100, quantity_unit: 'ml', is_optional: true },
      { id: 'ING_CILANTRO', role: 'garnish', quantity_amount: 10, quantity_unit: 'g', is_optional: true }
    ]
  }
];
