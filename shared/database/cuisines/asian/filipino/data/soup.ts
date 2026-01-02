/**
 * Filipino Soup Dishes
 * Warming soups and stews from the Philippines
 */

import { FilipinoDish } from '../types';

export const soupDishes: FilipinoDish[] = [
  {
    id: 'FIL_SINIGANG_BABOY',
    slug: 'sinigang-na-baboy',
    name: 'Sinigang na Baboy',
    local_name: 'Sinigang na Baboy',
    description: 'Iconic sour pork soup with tamarind-based broth, tomatoes, and assorted vegetables, considered the quintessential Filipino comfort soup',
    category: 'soup',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'pork',
    cooking_method: 'boiled',
    prep_time_min: 60,
    spice_level: 1,
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
    tags: ['sour', 'tamarind', 'comfort_food', 'national_favorite'],
    ingredient_ids: ['ING_PORK_RIBS', 'ING_TAMARIND', 'ING_TOMATO', 'ING_WATER_SPINACH', 'ING_ONION', 'ING_GARLIC', 'ING_CHILI', 'ING_SALT'],
    popularity: 95
  },
  {
    id: 'FIL_BULALO',
    slug: 'bulalo',
    name: 'Bulalo',
    local_name: 'Bulalo',
    description: 'Rich beef bone marrow soup from Batangas, with tender beef shanks, corn on the cob, and vegetables simmered for hours',
    category: 'soup',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'beef',
    cooking_method: 'simmered',
    prep_time_min: 240,
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
    tags: ['bone_marrow', 'batangas', 'hearty', 'slow_cooked'],
    ingredient_ids: ['ING_BEEF_BONES', 'ING_BEEF', 'ING_CORN', 'ING_CABBAGE', 'ING_POTATO', 'ING_ONION', 'ING_BLACK_PEPPER', 'ING_SALT'],
    popularity: 90
  },
  {
    id: 'FIL_TINOLA',
    slug: 'tinola',
    name: 'Tinola',
    local_name: 'Tinolang Manok',
    description: 'Light and healthy chicken soup with ginger, green papaya, and chili leaves in a clear savory broth',
    category: 'soup',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'chicken',
    cooking_method: 'boiled',
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
    allergens: [],
    tags: ['ginger', 'healthy', 'light', 'comfort_food'],
    ingredient_ids: ['ING_CHICKEN', 'ING_GINGER', 'ING_GARLIC', 'ING_ONION', 'ING_CHILI', 'ING_SALT', 'ING_BLACK_PEPPER'],
    popularity: 88
  },
  {
    id: 'FIL_NILAGA',
    slug: 'nilaga',
    name: 'Nilaga',
    local_name: 'Nilagang Baka',
    description: 'Simple boiled beef soup with potatoes, cabbage, and corn, a nourishing everyday Filipino soup',
    category: 'soup',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'beef',
    cooking_method: 'boiled',
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
    tags: ['simple', 'everyday', 'nourishing', 'clear_broth'],
    ingredient_ids: ['ING_BEEF', 'ING_POTATO', 'ING_CABBAGE', 'ING_CORN', 'ING_ONION', 'ING_BLACK_PEPPER', 'ING_SALT'],
    popularity: 82
  },
  {
    id: 'FIL_MOLO_SOUP',
    slug: 'pancit-molo',
    name: 'Pancit Molo',
    local_name: 'Pancit Molo',
    description: 'Filipino wonton soup from Iloilo with pork and shrimp dumplings in a flavorful chicken broth',
    category: 'soup',
    region: 'visayas',
    status: 'regional',
    protein_type: 'pork',
    cooking_method: 'boiled',
    prep_time_min: 60,
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
    allergens: ['gluten', 'shellfish'],
    tags: ['iloilo', 'dumplings', 'chinese_influenced', 'festive'],
    ingredient_ids: ['ING_PORK', 'ING_SHRIMP', 'ING_FLOUR', 'ING_EGG', 'ING_CHICKEN', 'ING_GARLIC', 'ING_ONION', 'ING_SCALLION'],
    popularity: 78
  },
  {
    id: 'FIL_BATCHOY',
    slug: 'la-paz-batchoy',
    name: 'La Paz Batchoy',
    local_name: 'Batchoy',
    description: 'Iloilo noodle soup with pork organs, crushed chicharron, and fresh egg noodles in a rich broth',
    category: 'soup',
    region: 'visayas',
    status: 'iconic',
    protein_type: 'pork',
    cooking_method: 'boiled',
    prep_time_min: 45,
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
    allergens: ['gluten', 'eggs'],
    tags: ['iloilo', 'noodle_soup', 'pork_offal', 'chicharron'],
    ingredient_ids: ['ING_PORK', 'ING_EGG_NOODLE', 'ING_EGG', 'ING_GARLIC', 'ING_SCALLION', 'ING_BLACK_PEPPER', 'ING_SOY_SAUCE'],
    popularity: 85
  }
];
