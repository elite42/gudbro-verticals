// Indonesian Cuisine - Salads (Gado-Gado, Urap, etc.)
// GUDBRO Database Standards v1.7

import { IndonesianDish } from '../types';

export const saladDishes: IndonesianDish[] = [
  {
    id: 'IDN_GADO_GADO',
    slug: 'gado-gado',
    name: 'Gado-Gado',
    local_name: 'Gado-Gado',
    description: 'Indonesian salad with vegetables, tofu, tempeh, and egg in peanut sauce dressing',
    category: 'salad',
    region: 'jakarta',
    status: 'iconic',
    protein_type: 'vegetarian',
    cooking_method: 'mixed',
    prep_time_min: 30,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: true,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: false,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['peanuts', 'eggs', 'soy'],
    tags: ['vegetarian', 'peanut-sauce', 'healthy'],
    popularity: 92,
    ingredients: ['ING_CABBAGE', 'ING_BEAN_SPROUTS', 'ING_LONG_BEANS', 'ING_POTATO', 'ING_TOFU', 'ING_TEMPEH', 'ING_EGG', 'ING_PEANUTS', 'ING_KECAP_MANIS', 'ING_GARLIC', 'ING_CHILI', 'ING_TAMARIND']
  },
  {
    id: 'IDN_PECEL',
    slug: 'pecel',
    name: 'Pecel',
    local_name: 'Pecel',
    description: 'Javanese vegetable salad with spicy peanut sauce, served with rice',
    category: 'salad',
    region: 'java',
    status: 'classic',
    protein_type: 'vegetarian',
    cooking_method: 'blanched',
    prep_time_min: 25,
    spice_level: 2,
    dietary: {
      is_vegan: true,
      is_vegetarian: true,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: false,
      is_halal: true,
      is_kosher: true
    },
    allergens: ['peanuts'],
    tags: ['javanese', 'vegan', 'healthy'],
    popularity: 82,
    ingredients: ['ING_SPINACH', 'ING_BEAN_SPROUTS', 'ING_LONG_BEANS', 'ING_CABBAGE', 'ING_PEANUTS', 'ING_KAFFIR_LIME_LEAVES', 'ING_TAMARIND', 'ING_PALM_SUGAR', 'ING_CHILI', 'ING_GARLIC']
  },
  {
    id: 'IDN_URAP',
    slug: 'urap',
    name: 'Urap',
    local_name: 'Urap Sayur',
    description: 'Javanese steamed vegetable salad with spiced grated coconut dressing',
    category: 'salad',
    region: 'java',
    status: 'traditional',
    protein_type: 'vegetarian',
    cooking_method: 'steamed',
    prep_time_min: 30,
    spice_level: 1,
    dietary: {
      is_vegan: true,
      is_vegetarian: true,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true
    },
    allergens: [],
    tags: ['javanese', 'coconut', 'traditional'],
    popularity: 75,
    ingredients: ['ING_SPINACH', 'ING_BEAN_SPROUTS', 'ING_LONG_BEANS', 'ING_COCONUT', 'ING_KAFFIR_LIME_LEAVES', 'ING_SHALLOT', 'ING_GARLIC', 'ING_CHILI', 'ING_PALM_SUGAR', 'ING_SALT']
  },
  {
    id: 'IDN_KAREDOK',
    slug: 'karedok',
    name: 'Karedok',
    local_name: 'Karedok',
    description: 'Sundanese raw vegetable salad with peanut sauce, similar to gado-gado but raw',
    category: 'salad',
    region: 'java',
    status: 'regional',
    protein_type: 'vegetarian',
    cooking_method: 'raw',
    prep_time_min: 20,
    spice_level: 2,
    dietary: {
      is_vegan: true,
      is_vegetarian: true,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: false,
      is_halal: true,
      is_kosher: true
    },
    allergens: ['peanuts'],
    tags: ['sundanese', 'raw', 'fresh'],
    popularity: 70,
    ingredients: ['ING_CUCUMBER', 'ING_BEAN_SPROUTS', 'ING_CABBAGE', 'ING_LONG_BEANS', 'ING_EGGPLANT', 'ING_PEANUTS', 'ING_SHRIMP_PASTE', 'ING_TAMARIND', 'ING_PALM_SUGAR', 'ING_CHILI']
  },
  {
    id: 'IDN_LAWAR',
    slug: 'lawar',
    name: 'Lawar',
    local_name: 'Lawar Bali',
    description: 'Balinese mixed vegetable and meat salad with grated coconut and spices',
    category: 'salad',
    region: 'bali',
    status: 'regional',
    protein_type: 'mixed',
    cooking_method: 'mixed',
    prep_time_min: 45,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: [],
    tags: ['balinese', 'ceremonial', 'traditional'],
    popularity: 72,
    ingredients: ['ING_LONG_BEANS', 'ING_COCONUT', 'ING_PORK', 'ING_SHALLOT', 'ING_GARLIC', 'ING_CHILI', 'ING_GALANGAL', 'ING_KAFFIR_LIME_LEAVES', 'ING_SHRIMP_PASTE']
  }
];
