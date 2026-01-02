/**
 * Filipino Seafood Dishes
 * Fresh seafood dishes from the Philippine archipelago
 */

import { FilipinoDish } from '../types';

export const seafoodDishes: FilipinoDish[] = [
  {
    id: 'FIL_SINIGANG_HIPON',
    slug: 'sinigang-na-hipon',
    name: 'Sinigang na Hipon',
    local_name: 'Sinigang na Hipon',
    description: 'Sour shrimp soup with tamarind broth, tomatoes, and vegetables like kangkong, radish, and string beans',
    category: 'seafood',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'shrimp',
    cooking_method: 'boiled',
    prep_time_min: 40,
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
    tags: ['sour', 'tamarind', 'comfort_food', 'soup'],
    ingredient_ids: ['ING_SHRIMP', 'ING_TAMARIND', 'ING_TOMATO', 'ING_WATER_SPINACH', 'ING_ONION', 'ING_GARLIC', 'ING_CHILI', 'ING_SALT'],
    popularity: 88
  },
  {
    id: 'FIL_INIHAW_NA_BANGUS',
    slug: 'inihaw-na-bangus',
    name: 'Inihaw na Bangus',
    local_name: 'Inihaw na Bangus',
    description: 'Grilled milkfish stuffed with tomatoes, onions, and garlic, wrapped in banana leaves and charcoal-grilled',
    category: 'seafood',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'fish',
    cooking_method: 'grilled',
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
    allergens: ['fish'],
    tags: ['grilled', 'milkfish', 'stuffed', 'banana_leaf'],
    ingredient_ids: ['ING_WHITE_FISH', 'ING_TOMATO', 'ING_ONION', 'ING_GARLIC', 'ING_BANANA_LEAF', 'ING_SALT', 'ING_BLACK_PEPPER', 'ING_VEGETABLE_OIL'],
    popularity: 85
  },
  {
    id: 'FIL_KINILAW',
    slug: 'kinilaw',
    name: 'Kinilaw',
    local_name: 'Kinilaw na Tanigue',
    description: 'Filipino ceviche with fresh raw fish cured in vinegar and calamansi, mixed with ginger, onions, and chilies',
    category: 'seafood',
    region: 'visayas',
    status: 'iconic',
    protein_type: 'fish',
    cooking_method: 'raw',
    prep_time_min: 20,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['fish'],
    tags: ['raw', 'ceviche', 'fresh', 'appetizer'],
    ingredient_ids: ['ING_TUNA', 'ING_VINEGAR', 'ING_LIME', 'ING_GINGER', 'ING_ONION', 'ING_CHILI', 'ING_SALT'],
    popularity: 82
  },
  {
    id: 'FIL_GINATAANG_HIPON',
    slug: 'ginataang-hipon',
    name: 'Ginataang Hipon',
    local_name: 'Ginataang Hipon',
    description: 'Shrimp cooked in rich coconut milk with squash, string beans, and chilies',
    category: 'seafood',
    region: 'bicol',
    status: 'classic',
    protein_type: 'shrimp',
    cooking_method: 'simmered',
    prep_time_min: 35,
    spice_level: 2,
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
    tags: ['coconut', 'bicol', 'creamy', 'spicy'],
    ingredient_ids: ['ING_SHRIMP', 'ING_COCONUT_MILK', 'ING_SWEET_POTATO', 'ING_CHILI', 'ING_GARLIC', 'ING_ONION', 'ING_GINGER', 'ING_SHRIMP_PASTE'],
    popularity: 78
  },
  {
    id: 'FIL_PAKSIW_NA_ISDA',
    slug: 'paksiw-na-isda',
    name: 'Paksiw na Isda',
    local_name: 'Paksiw na Isda',
    description: 'Fish stewed in vinegar with ginger, garlic, and bitter melon, a simple yet flavorful everyday dish',
    category: 'seafood',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'fish',
    cooking_method: 'braised',
    prep_time_min: 30,
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
    allergens: ['fish'],
    tags: ['vinegar', 'everyday', 'simple', 'sour'],
    ingredient_ids: ['ING_WHITE_FISH', 'ING_VINEGAR', 'ING_GINGER', 'ING_GARLIC', 'ING_ONION', 'ING_BLACK_PEPPER', 'ING_SALT'],
    popularity: 75
  },
  {
    id: 'FIL_ADOBONG_PUSIT',
    slug: 'adobong-pusit',
    name: 'Adobong Pusit',
    local_name: 'Adobong Pusit',
    description: 'Squid cooked adobo-style in its own ink with vinegar and soy sauce, creating a rich dark sauce',
    category: 'seafood',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'squid',
    cooking_method: 'braised',
    prep_time_min: 35,
    spice_level: 1,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['shellfish', 'soy'],
    tags: ['squid_ink', 'adobo', 'rich', 'savory'],
    ingredient_ids: ['ING_SQUID', 'ING_SOY_SAUCE', 'ING_VINEGAR', 'ING_GARLIC', 'ING_ONION', 'ING_TOMATO', 'ING_BAY_LEAF', 'ING_BLACK_PEPPER'],
    popularity: 72
  }
];
