/**
 * Malaysian Satay and Grilled Dishes
 * Famous satay and grilled meat dishes of Malaysia
 */

import { MalaysianDish } from '../types';

export const satayDishes: MalaysianDish[] = [
  {
    id: 'MAL_SATAY_AYAM',
    slug: 'satay-ayam',
    name: 'Chicken Satay',
    local_name: 'Satay Ayam',
    description: 'Marinated chicken skewers grilled over charcoal, served with peanut sauce, ketupat (rice cakes), cucumber, and onions',
    category: 'satay',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'chicken',
    cooking_method: 'grilled',
    prep_time_min: 45,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: false,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['peanuts'],
    tags: ['street_food', 'skewers', 'charcoal_grilled', 'national_dish'],
    ingredient_ids: ['ING_CHICKEN', 'ING_PEANUTS', 'ING_COCONUT_MILK', 'ING_TURMERIC', 'ING_LEMONGRASS', 'ING_GALANGAL', 'ING_CUMIN', 'ING_CORIANDER', 'ING_SUGAR', 'ING_CUCUMBER', 'ING_ONION'],
    popularity: 96
  },
  {
    id: 'MAL_SATAY_DAGING',
    slug: 'satay-daging',
    name: 'Beef Satay',
    local_name: 'Satay Daging',
    description: 'Tender beef skewers marinated in a blend of spices and grilled, served with classic peanut dipping sauce',
    category: 'satay',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'beef',
    cooking_method: 'grilled',
    prep_time_min: 50,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: false,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['peanuts'],
    tags: ['street_food', 'skewers', 'charcoal_grilled'],
    ingredient_ids: ['ING_BEEF', 'ING_PEANUTS', 'ING_COCONUT_MILK', 'ING_TURMERIC', 'ING_LEMONGRASS', 'ING_GALANGAL', 'ING_CUMIN', 'ING_CORIANDER', 'ING_SUGAR'],
    popularity: 90
  },
  {
    id: 'MAL_SATAY_CELUP',
    slug: 'satay-celup',
    name: 'Satay Celup',
    local_name: 'Satay Celup',
    description: 'Malacca specialty where raw ingredients on skewers are dipped into a communal pot of simmering satay peanut sauce',
    category: 'satay',
    region: 'malacca',
    status: 'iconic',
    protein_type: 'mixed',
    cooking_method: 'simmered',
    prep_time_min: 20,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: false,
      is_halal: false,
      is_kosher: false
    },
    allergens: ['peanuts', 'shellfish', 'soy'],
    tags: ['malacca', 'hotpot_style', 'interactive', 'communal'],
    ingredient_ids: ['ING_PEANUTS', 'ING_CHILI', 'ING_SHRIMP_PASTE', 'ING_TAMARIND', 'ING_SHRIMP', 'ING_SQUID', 'ING_CHICKEN', 'ING_TOFU', 'ING_CABBAGE', 'ING_MUSHROOM'],
    popularity: 88
  },
  {
    id: 'MAL_SATAY_KAJANG',
    slug: 'satay-kajang',
    name: 'Satay Kajang',
    local_name: 'Satay Kajang',
    description: 'Famous satay from Kajang town known for its larger, juicier pieces and sweeter peanut sauce',
    category: 'satay',
    region: 'kuala_lumpur',
    status: 'regional',
    protein_type: 'mixed',
    cooking_method: 'grilled',
    prep_time_min: 50,
    spice_level: 1,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: false,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['peanuts'],
    tags: ['kajang', 'famous_street_food', 'larger_portions'],
    ingredient_ids: ['ING_CHICKEN', 'ING_BEEF', 'ING_PEANUTS', 'ING_COCONUT_MILK', 'ING_TURMERIC', 'ING_LEMONGRASS', 'ING_GALANGAL', 'ING_SUGAR', 'ING_PALM_SUGAR'],
    popularity: 84
  },
  {
    id: 'MAL_AYAM_PERCIK',
    slug: 'ayam-percik',
    name: 'Ayam Percik',
    local_name: 'Ayam Percik',
    description: 'Kelantan-style grilled chicken marinated in coconut milk and spices, slowly grilled while basted with the marinade',
    category: 'satay',
    region: 'kelantan',
    status: 'iconic',
    protein_type: 'chicken',
    cooking_method: 'grilled',
    prep_time_min: 90,
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
    tags: ['kelantan', 'charcoal_grilled', 'coconut', 'slow_cooked'],
    ingredient_ids: ['ING_CHICKEN', 'ING_COCONUT_MILK', 'ING_TURMERIC', 'ING_LEMONGRASS', 'ING_GALANGAL', 'ING_GINGER', 'ING_CUMIN', 'ING_CORIANDER', 'ING_CHILI'],
    popularity: 86
  },
  {
    id: 'MAL_IKAN_BAKAR',
    slug: 'ikan-bakar',
    name: 'Ikan Bakar',
    local_name: 'Ikan Bakar',
    description: 'Malaysian-style grilled fish marinated in a sambal paste, wrapped in banana leaves and grilled over charcoal',
    category: 'satay',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'fish',
    cooking_method: 'grilled',
    prep_time_min: 40,
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
    allergens: ['fish'],
    tags: ['seafood', 'charcoal_grilled', 'banana_leaf'],
    ingredient_ids: ['ING_WHITE_FISH', 'ING_CHILI', 'ING_SHALLOT', 'ING_GARLIC', 'ING_TURMERIC', 'ING_LEMONGRASS', 'ING_TAMARIND', 'ING_BANANA_LEAF'],
    popularity: 82
  }
];
