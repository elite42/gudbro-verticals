/**
 * Filipino Breakfast Dishes
 * Silog meals and morning favorites
 */

import { FilipinoDish } from '../types';

export const breakfastDishes: FilipinoDish[] = [
  {
    id: 'FIL_TAPSILOG',
    slug: 'tapsilog',
    name: 'Tapsilog',
    local_name: 'Tapsilog',
    description: 'Classic Filipino breakfast of cured beef tapa, garlic fried rice, and sunny-side-up egg',
    category: 'breakfast',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'beef',
    cooking_method: 'pan_fried',
    prep_time_min: 25,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['soy', 'eggs'],
    tags: ['silog', 'breakfast', 'tapa', 'cured_meat'],
    ingredient_ids: ['ING_BEEF', 'ING_SOY_SAUCE', 'ING_GARLIC', 'ING_SUGAR', 'ING_RICE', 'ING_EGG', 'ING_VEGETABLE_OIL'],
    popularity: 95
  },
  {
    id: 'FIL_LONGSILOG',
    slug: 'longsilog',
    name: 'Longsilog',
    local_name: 'Longsilog',
    description: 'Filipino breakfast combo of sweet pork longganisa sausage with garlic rice and fried egg',
    category: 'breakfast',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'pork',
    cooking_method: 'pan_fried',
    prep_time_min: 20,
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
    allergens: ['eggs'],
    tags: ['silog', 'breakfast', 'longganisa', 'sweet'],
    ingredient_ids: ['ING_PORK', 'ING_GARLIC', 'ING_SUGAR', 'ING_VINEGAR', 'ING_RICE', 'ING_EGG', 'ING_VEGETABLE_OIL'],
    popularity: 92
  },
  {
    id: 'FIL_TOCILOG',
    slug: 'tocilog',
    name: 'Tocilog',
    local_name: 'Tocilog',
    description: 'Sweet cured pork tocino with garlic rice and fried egg, a beloved morning meal',
    category: 'breakfast',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'pork',
    cooking_method: 'pan_fried',
    prep_time_min: 25,
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
    allergens: ['eggs'],
    tags: ['silog', 'breakfast', 'tocino', 'sweet'],
    ingredient_ids: ['ING_PORK', 'ING_SUGAR', 'ING_SALT', 'ING_GARLIC', 'ING_RICE', 'ING_EGG', 'ING_VEGETABLE_OIL'],
    popularity: 90
  },
  {
    id: 'FIL_BANGSILOG',
    slug: 'bangsilog',
    name: 'Bangsilog',
    local_name: 'Bangsilog',
    description: 'Fried milkfish (bangus) with garlic rice and egg, a protein-rich Filipino breakfast',
    category: 'breakfast',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'fish',
    cooking_method: 'pan_fried',
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
    allergens: ['fish', 'eggs'],
    tags: ['silog', 'breakfast', 'bangus', 'milkfish'],
    ingredient_ids: ['ING_WHITE_FISH', 'ING_GARLIC', 'ING_RICE', 'ING_EGG', 'ING_VEGETABLE_OIL', 'ING_SALT'],
    popularity: 82
  },
  {
    id: 'FIL_CORNSILOG',
    slug: 'cornsilog',
    name: 'Cornsilog',
    local_name: 'Cornsilog',
    description: 'Corned beef hash with garlic rice and fried egg, a quick and satisfying breakfast',
    category: 'breakfast',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'beef',
    cooking_method: 'pan_fried',
    prep_time_min: 15,
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
    allergens: ['eggs'],
    tags: ['silog', 'breakfast', 'corned_beef', 'quick'],
    ingredient_ids: ['ING_BEEF', 'ING_ONION', 'ING_GARLIC', 'ING_RICE', 'ING_EGG', 'ING_VEGETABLE_OIL'],
    popularity: 78
  },
  {
    id: 'FIL_DANGGIT',
    slug: 'danggit-silog',
    name: 'Danggit Silog',
    local_name: 'Danggit Silog',
    description: 'Crispy dried rabbitfish with garlic rice and egg, a Cebuano breakfast specialty',
    category: 'breakfast',
    region: 'cebu',
    status: 'regional',
    protein_type: 'fish',
    cooking_method: 'deep_fried',
    prep_time_min: 15,
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
    allergens: ['fish', 'eggs'],
    tags: ['silog', 'breakfast', 'cebu', 'dried_fish'],
    ingredient_ids: ['ING_WHITE_FISH', 'ING_GARLIC', 'ING_RICE', 'ING_EGG', 'ING_VEGETABLE_OIL', 'ING_VINEGAR'],
    popularity: 75
  }
];
