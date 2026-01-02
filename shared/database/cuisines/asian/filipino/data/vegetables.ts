/**
 * Filipino Vegetable Dishes
 * Plant-based dishes and vegetable preparations
 */

import { FilipinoDish } from '../types';

export const vegetableDishes: FilipinoDish[] = [
  {
    id: 'FIL_PINAKBET',
    slug: 'pinakbet',
    name: 'Pinakbet',
    local_name: 'Pinakbet',
    description: 'Ilocano mixed vegetable stew with bitter melon, eggplant, okra, and squash, flavored with fermented shrimp paste',
    category: 'vegetables',
    region: 'ilocos',
    status: 'iconic',
    protein_type: 'vegetable',
    cooking_method: 'sauteed',
    prep_time_min: 35,
    spice_level: 1,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['shellfish'],
    tags: ['ilocano', 'mixed_vegetables', 'shrimp_paste', 'healthy'],
    ingredient_ids: ['ING_EGGPLANT', 'ING_OKRA', 'ING_SWEET_POTATO', 'ING_TOMATO', 'ING_ONION', 'ING_GARLIC', 'ING_SHRIMP_PASTE', 'ING_PORK'],
    popularity: 85
  },
  {
    id: 'FIL_LAING',
    slug: 'laing',
    name: 'Laing',
    local_name: 'Laing',
    description: 'Bicolano dish of dried taro leaves cooked in coconut milk with chilies and shrimp paste, rich and spicy',
    category: 'vegetables',
    region: 'bicol',
    status: 'iconic',
    protein_type: 'vegetable',
    cooking_method: 'simmered',
    prep_time_min: 60,
    spice_level: 4,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['shellfish'],
    tags: ['bicol', 'spicy', 'coconut', 'taro_leaves'],
    ingredient_ids: ['ING_COCONUT_MILK', 'ING_CHILI', 'ING_GARLIC', 'ING_ONION', 'ING_GINGER', 'ING_SHRIMP_PASTE', 'ING_PORK'],
    popularity: 82
  },
  {
    id: 'FIL_GINISANG_MONGGO',
    slug: 'ginisang-monggo',
    name: 'Ginisang Monggo',
    local_name: 'Ginisang Monggo',
    description: 'Sauteed mung bean stew with pork, shrimp, and bitter melon leaves, a nutritious everyday dish',
    category: 'vegetables',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'pork',
    cooking_method: 'sauteed',
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
    allergens: ['shellfish'],
    tags: ['mung_beans', 'friday_dish', 'nutritious', 'everyday'],
    ingredient_ids: ['ING_PORK', 'ING_SHRIMP', 'ING_TOMATO', 'ING_ONION', 'ING_GARLIC', 'ING_SALT'],
    popularity: 78
  },
  {
    id: 'FIL_TORTANG_TALONG',
    slug: 'tortang-talong',
    name: 'Tortang Talong',
    local_name: 'Tortang Talong',
    description: 'Grilled eggplant omelette, a simple yet delicious vegetable dish often served with ground pork',
    category: 'vegetables',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'egg',
    cooking_method: 'pan_fried',
    prep_time_min: 25,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: true,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['eggs'],
    tags: ['eggplant', 'omelette', 'simple', 'everyday'],
    ingredient_ids: ['ING_EGGPLANT', 'ING_EGG', 'ING_GARLIC', 'ING_ONION', 'ING_SALT', 'ING_VEGETABLE_OIL'],
    popularity: 80
  },
  {
    id: 'FIL_ENSALADANG_TALONG',
    slug: 'ensaladang-talong',
    name: 'Ensaladang Talong',
    local_name: 'Ensaladang Talong',
    description: 'Grilled eggplant salad with tomatoes, onions, and a tangy vinegar dressing',
    category: 'vegetables',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'vegetable',
    cooking_method: 'grilled',
    prep_time_min: 20,
    spice_level: 0,
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
    tags: ['salad', 'grilled', 'healthy', 'side_dish'],
    ingredient_ids: ['ING_EGGPLANT', 'ING_TOMATO', 'ING_ONION', 'ING_VINEGAR', 'ING_SALT'],
    popularity: 75
  }
];
