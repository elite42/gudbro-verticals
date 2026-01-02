/**
 * Filipino Rice Dishes
 * Rice-based dishes central to Filipino cuisine
 */

import { FilipinoDish } from '../types';

export const riceDishes: FilipinoDish[] = [
  {
    id: 'FIL_ARROZ_CALDO',
    slug: 'arroz-caldo',
    name: 'Arroz Caldo',
    local_name: 'Arroz Caldo',
    description: 'Filipino chicken rice porridge with ginger, garlic, and safflower, topped with fried garlic, scallions, and hard-boiled egg',
    category: 'rice',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'chicken',
    cooking_method: 'simmered',
    prep_time_min: 45,
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
    tags: ['porridge', 'comfort_food', 'rainy_day', 'healing'],
    ingredient_ids: ['ING_RICE', 'ING_CHICKEN', 'ING_GINGER', 'ING_GARLIC', 'ING_ONION', 'ING_SCALLION', 'ING_EGG', 'ING_BLACK_PEPPER', 'ING_SALT'],
    popularity: 88
  },
  {
    id: 'FIL_SINANGAG',
    slug: 'sinangag',
    name: 'Sinangag',
    local_name: 'Sinangag',
    description: 'Filipino garlic fried rice, the essential base for silog breakfast meals, made with day-old rice',
    category: 'rice',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'none',
    cooking_method: 'stir_fried',
    prep_time_min: 10,
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
    tags: ['breakfast', 'garlic', 'fried_rice', 'silog'],
    ingredient_ids: ['ING_RICE', 'ING_GARLIC', 'ING_VEGETABLE_OIL', 'ING_SALT'],
    popularity: 92
  },
  {
    id: 'FIL_BRINGHE',
    slug: 'bringhe',
    name: 'Bringhe',
    local_name: 'Bringhe',
    description: 'Filipino paella-style sticky rice with chicken, coconut milk, and turmeric, wrapped in banana leaves',
    category: 'rice',
    region: 'pampanga',
    status: 'traditional',
    protein_type: 'chicken',
    cooking_method: 'steamed',
    prep_time_min: 90,
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
    allergens: [],
    tags: ['pampanga', 'festive', 'coconut', 'turmeric'],
    ingredient_ids: ['ING_GLUTINOUS_RICE', 'ING_CHICKEN', 'ING_COCONUT_MILK', 'ING_TURMERIC', 'ING_GARLIC', 'ING_ONION', 'ING_BANANA_LEAF', 'ING_BELL_PEPPER'],
    popularity: 75
  },
  {
    id: 'FIL_CHAMPORADO',
    slug: 'champorado',
    name: 'Champorado',
    local_name: 'Champorado',
    description: 'Sweet chocolate rice porridge made with glutinous rice and cocoa, often served with dried salted fish',
    category: 'rice',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'none',
    cooking_method: 'simmered',
    prep_time_min: 30,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: true,
      is_gluten_free: true,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['dairy'],
    tags: ['chocolate', 'breakfast', 'sweet', 'porridge'],
    ingredient_ids: ['ING_GLUTINOUS_RICE', 'ING_SUGAR', 'ING_EVAPORATED_MILK', 'ING_WATER'],
    popularity: 82
  },
  {
    id: 'FIL_JAVA_RICE',
    slug: 'java-rice',
    name: 'Java Rice',
    local_name: 'Java Rice',
    description: 'Filipino-style fried rice tinted yellow with annatto and flavored with garlic, popular in fast-food chains',
    category: 'rice',
    region: 'nationwide',
    status: 'modern',
    protein_type: 'none',
    cooking_method: 'stir_fried',
    prep_time_min: 15,
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
    tags: ['yellow_rice', 'annatto', 'fast_food', 'modern'],
    ingredient_ids: ['ING_RICE', 'ING_GARLIC', 'ING_VEGETABLE_OIL', 'ING_SALT', 'ING_BLACK_PEPPER'],
    popularity: 78
  }
];
