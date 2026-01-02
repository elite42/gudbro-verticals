/**
 * Malaysian Fried and Stir-Fried Dishes
 * Popular fried and wok-cooked dishes of Malaysia
 */

import { MalaysianDish } from '../types';

export const friedDishes: MalaysianDish[] = [
  {
    id: 'MAL_NASI_GORENG_KAMPUNG',
    slug: 'nasi-goreng-kampung',
    name: 'Kampung Fried Rice',
    local_name: 'Nasi Goreng Kampung',
    description: 'Village-style fried rice with ikan bilis (dried anchovies), local vegetables, and sambal belacan for authentic Malaysian flavor',
    category: 'fried',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'fish',
    cooking_method: 'stir_fried',
    prep_time_min: 20,
    spice_level: 3,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['fish', 'shellfish'],
    tags: ['village_style', 'street_food', 'authentic'],
    ingredient_ids: ['ING_RICE', 'ING_ANCHOVY', 'ING_SHRIMP_PASTE', 'ING_CHILI', 'ING_WATER_SPINACH', 'ING_EGG', 'ING_SHALLOT', 'ING_GARLIC'],
    popularity: 88
  },
  {
    id: 'MAL_MEE_GORENG_MAMAK',
    slug: 'mee-goreng-mamak',
    name: 'Mee Goreng Mamak',
    local_name: 'Mee Goreng Mamak',
    description: 'Indian-Muslim style fried noodles with a sweet and spicy tomato-based sauce, tofu, potato, and egg',
    category: 'fried',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'egg',
    cooking_method: 'stir_fried',
    prep_time_min: 15,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: true,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['gluten', 'soy', 'eggs'],
    tags: ['mamak', 'street_food', 'late_night'],
    ingredient_ids: ['ING_YELLOW_NOODLE', 'ING_TOFU', 'ING_POTATO', 'ING_EGG', 'ING_TOMATO_SAUCE', 'ING_SOY_SAUCE', 'ING_CHILI', 'ING_BEAN_SPROUTS', 'ING_CABBAGE', 'ING_SCALLION'],
    popularity: 90
  },
  {
    id: 'MAL_AYAM_GORENG',
    slug: 'ayam-goreng-berempah',
    name: 'Spiced Fried Chicken',
    local_name: 'Ayam Goreng Berempah',
    description: 'Malaysian-style fried chicken marinated with turmeric and spices, deep-fried until golden and crispy',
    category: 'fried',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'chicken',
    cooking_method: 'deep_fried',
    prep_time_min: 45,
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
    allergens: [],
    tags: ['fried_chicken', 'turmeric', 'crispy'],
    ingredient_ids: ['ING_CHICKEN', 'ING_TURMERIC', 'ING_GINGER', 'ING_GARLIC', 'ING_CORIANDER', 'ING_CUMIN', 'ING_SALT', 'ING_VEGETABLE_OIL'],
    popularity: 85
  },
  {
    id: 'MAL_KANGKONG_BELACAN',
    slug: 'kangkong-belacan',
    name: 'Water Spinach with Shrimp Paste',
    local_name: 'Kangkong Belacan',
    description: 'Stir-fried water spinach with sambal belacan (shrimp paste chili), a ubiquitous vegetable dish in Malaysia',
    category: 'fried',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'vegetable',
    cooking_method: 'stir_fried',
    prep_time_min: 10,
    spice_level: 3,
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
    tags: ['vegetable', 'side_dish', 'sambal'],
    ingredient_ids: ['ING_WATER_SPINACH', 'ING_SHRIMP_PASTE', 'ING_CHILI', 'ING_GARLIC', 'ING_SHALLOT', 'ING_TAMARIND'],
    popularity: 82
  },
  {
    id: 'MAL_SAMBAL_UDANG',
    slug: 'sambal-udang',
    name: 'Sambal Prawns',
    local_name: 'Sambal Udang',
    description: 'Prawns cooked in a rich, spicy sambal sauce with shrimp paste, chilies, and tamarind, a classic Malay dish',
    category: 'fried',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'shrimp',
    cooking_method: 'stir_fried',
    prep_time_min: 25,
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
    tags: ['sambal', 'seafood', 'spicy'],
    ingredient_ids: ['ING_SHRIMP', 'ING_CHILI', 'ING_SHRIMP_PASTE', 'ING_TAMARIND', 'ING_SHALLOT', 'ING_GARLIC', 'ING_SUGAR', 'ING_SALT'],
    popularity: 80
  },
  {
    id: 'MAL_SAMBAL_PETAI',
    slug: 'sambal-petai',
    name: 'Sambal Petai',
    local_name: 'Sambal Petai Udang',
    description: 'Stir-fried stink beans with prawns in a fiery sambal paste, an acquired taste loved by Malaysians',
    category: 'fried',
    region: 'nationwide',
    status: 'traditional',
    protein_type: 'shrimp',
    cooking_method: 'stir_fried',
    prep_time_min: 20,
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
    tags: ['petai', 'stink_beans', 'pungent', 'unique'],
    ingredient_ids: ['ING_PETAI', 'ING_SHRIMP', 'ING_CHILI', 'ING_SHRIMP_PASTE', 'ING_SHALLOT', 'ING_GARLIC', 'ING_TAMARIND'],
    popularity: 72
  }
];
