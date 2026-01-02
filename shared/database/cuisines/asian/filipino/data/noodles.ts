/**
 * Filipino Noodle Dishes
 * Pancit and other noodle specialties
 */

import { FilipinoDish } from '../types';

export const noodleDishes: FilipinoDish[] = [
  {
    id: 'FIL_PANCIT_CANTON',
    slug: 'pancit-canton',
    name: 'Pancit Canton',
    local_name: 'Pancit Canton',
    description: 'Stir-fried egg noodles with meat, shrimp, and vegetables in soy sauce, a staple at Filipino celebrations',
    category: 'noodles',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'mixed',
    cooking_method: 'stir_fried',
    prep_time_min: 30,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: ['gluten', 'shellfish', 'soy'],
    tags: ['celebration', 'birthday', 'long_life', 'stir_fried'],
    ingredient_ids: ['ING_EGG_NOODLE', 'ING_PORK', 'ING_SHRIMP', 'ING_CABBAGE', 'ING_CARROT', 'ING_SOY_SAUCE', 'ING_GARLIC', 'ING_ONION'],
    popularity: 92
  },
  {
    id: 'FIL_PANCIT_BIHON',
    slug: 'pancit-bihon',
    name: 'Pancit Bihon',
    local_name: 'Pancit Bihon',
    description: 'Stir-fried rice vermicelli with chicken, pork, and vegetables, the most common pancit variety',
    category: 'noodles',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'mixed',
    cooking_method: 'stir_fried',
    prep_time_min: 30,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: ['soy'],
    tags: ['celebration', 'birthday', 'rice_noodles', 'everyday'],
    ingredient_ids: ['ING_RICE_NOODLES', 'ING_CHICKEN', 'ING_PORK', 'ING_CABBAGE', 'ING_CARROT', 'ING_SOY_SAUCE', 'ING_GARLIC', 'ING_ONION', 'ING_CELERY'],
    popularity: 90
  },
  {
    id: 'FIL_PANCIT_PALABOK',
    slug: 'pancit-palabok',
    name: 'Pancit Palabok',
    local_name: 'Pancit Palabok',
    description: 'Rice noodles topped with rich orange shrimp sauce, crushed chicharron, shrimp, and hard-boiled eggs',
    category: 'noodles',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'shrimp',
    cooking_method: 'boiled',
    prep_time_min: 45,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: ['shellfish', 'eggs'],
    tags: ['shrimp_sauce', 'celebration', 'colorful', 'festive'],
    ingredient_ids: ['ING_RICE_NOODLES', 'ING_SHRIMP', 'ING_EGG', 'ING_GARLIC', 'ING_ONION', 'ING_SCALLION', 'ING_CORNSTARCH', 'ING_VEGETABLE_OIL'],
    popularity: 88
  },
  {
    id: 'FIL_PANCIT_GUISADO',
    slug: 'pancit-guisado',
    name: 'Pancit Guisado',
    local_name: 'Pancit Guisado',
    description: 'Home-style sauteed noodles combining bihon and canton noodles with meat and vegetables',
    category: 'noodles',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'mixed',
    cooking_method: 'stir_fried',
    prep_time_min: 30,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: ['gluten', 'soy'],
    tags: ['home_style', 'mixed_noodles', 'everyday'],
    ingredient_ids: ['ING_RICE_NOODLES', 'ING_EGG_NOODLE', 'ING_PORK', 'ING_CHICKEN', 'ING_CABBAGE', 'ING_CARROT', 'ING_SOY_SAUCE', 'ING_GARLIC'],
    popularity: 82
  },
  {
    id: 'FIL_PANCIT_LUCBAN',
    slug: 'pancit-habhab',
    name: 'Pancit Habhab',
    local_name: 'Pancit Habhab',
    description: 'Lucban specialty of stir-fried noodles served on banana leaf, eaten without utensils by slurping',
    category: 'noodles',
    region: 'nationwide',
    status: 'regional',
    protein_type: 'pork',
    cooking_method: 'stir_fried',
    prep_time_min: 25,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: ['gluten', 'soy'],
    tags: ['lucban', 'street_food', 'banana_leaf', 'unique'],
    ingredient_ids: ['ING_EGG_NOODLE', 'ING_PORK', 'ING_CABBAGE', 'ING_CARROT', 'ING_SOY_SAUCE', 'ING_GARLIC', 'ING_BANANA_LEAF'],
    popularity: 75
  },
  {
    id: 'FIL_SOTANGHON_GUISADO',
    slug: 'sotanghon-guisado',
    name: 'Sotanghon Guisado',
    local_name: 'Sotanghon Guisado',
    description: 'Stir-fried glass noodles with chicken and vegetables, lighter than other pancit varieties',
    category: 'noodles',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'chicken',
    cooking_method: 'stir_fried',
    prep_time_min: 25,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['soy'],
    tags: ['glass_noodles', 'light', 'chinese_influenced'],
    ingredient_ids: ['ING_GLASS_NOODLES', 'ING_CHICKEN', 'ING_CABBAGE', 'ING_CARROT', 'ING_SOY_SAUCE', 'ING_GARLIC', 'ING_ONION', 'ING_SCALLION'],
    popularity: 78
  }
];
