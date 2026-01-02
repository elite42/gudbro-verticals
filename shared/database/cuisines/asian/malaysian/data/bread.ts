/**
 * Malaysian Bread and Flatbread Dishes
 * Popular breads and roti of Malaysia
 */

import { MalaysianDish } from '../types';

export const breadDishes: MalaysianDish[] = [
  {
    id: 'MAL_ROTI_CANAI',
    slug: 'roti-canai',
    name: 'Roti Canai',
    local_name: 'Roti Canai',
    description: 'Malaysian flaky flatbread of Indian origin, made by stretching and folding dough, served with dhal curry and sambal',
    category: 'bread',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'none',
    cooking_method: 'pan_fried',
    prep_time_min: 30,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: true,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['gluten', 'dairy'],
    tags: ['breakfast', 'street_food', 'mamak', 'worlds_best_bread'],
    ingredient_ids: ['ING_FLOUR', 'ING_GHEE', 'ING_EGG', 'ING_SALT', 'ING_SUGAR', 'ING_WATER'],
    popularity: 98
  },
  {
    id: 'MAL_ROTI_TELUR',
    slug: 'roti-telur',
    name: 'Roti Telur',
    local_name: 'Roti Telur',
    description: 'Roti canai stuffed with beaten egg, folded and pan-fried until crispy with a soft egg center',
    category: 'bread',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'egg',
    cooking_method: 'pan_fried',
    prep_time_min: 20,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: true,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['gluten', 'eggs', 'dairy'],
    tags: ['breakfast', 'mamak', 'egg_stuffed'],
    ingredient_ids: ['ING_FLOUR', 'ING_GHEE', 'ING_EGG', 'ING_SALT', 'ING_ONION'],
    popularity: 92
  },
  {
    id: 'MAL_ROTI_PISANG',
    slug: 'roti-pisang',
    name: 'Roti Pisang',
    local_name: 'Roti Pisang',
    description: 'Sweet version of roti canai filled with sliced banana, sprinkled with sugar or condensed milk',
    category: 'bread',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'none',
    cooking_method: 'pan_fried',
    prep_time_min: 20,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: true,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['gluten', 'dairy'],
    tags: ['sweet', 'dessert', 'banana'],
    ingredient_ids: ['ING_FLOUR', 'ING_GHEE', 'ING_BANANA', 'ING_CONDENSED_MILK', 'ING_SUGAR'],
    popularity: 85
  },
  {
    id: 'MAL_ROTI_TISSUE',
    slug: 'roti-tissue',
    name: 'Roti Tissue',
    local_name: 'Roti Tisu',
    description: 'Paper-thin crispy roti formed into a tall cone, drizzled with condensed milk and sugar, more of a dessert',
    category: 'bread',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'none',
    cooking_method: 'pan_fried',
    prep_time_min: 20,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: true,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['gluten', 'dairy'],
    tags: ['crispy', 'sweet', 'show_piece'],
    ingredient_ids: ['ING_FLOUR', 'ING_GHEE', 'ING_CONDENSED_MILK', 'ING_SUGAR', 'ING_MARGARINE'],
    popularity: 82
  },
  {
    id: 'MAL_MURTABAK',
    slug: 'murtabak',
    name: 'Murtabak',
    local_name: 'Murtabak',
    description: 'Stuffed pan-fried bread with spiced minced meat, onions, and egg, served with curry sauce and pickled onions',
    category: 'bread',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'beef',
    cooking_method: 'pan_fried',
    prep_time_min: 35,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['gluten', 'eggs', 'dairy'],
    tags: ['stuffed', 'mamak', 'filling'],
    ingredient_ids: ['ING_FLOUR', 'ING_GHEE', 'ING_BEEF', 'ING_EGG', 'ING_ONION', 'ING_CURRY_POWDER', 'ING_GARLIC', 'ING_GINGER'],
    popularity: 88
  },
  {
    id: 'MAL_ROTI_JOHN',
    slug: 'roti-john',
    name: 'Roti John',
    local_name: 'Roti John',
    description: 'Malaysian-style sandwich with minced meat and egg mixture cooked on a split baguette, drizzled with chili and mayonnaise',
    category: 'bread',
    region: 'kuala_lumpur',
    status: 'classic',
    protein_type: 'beef',
    cooking_method: 'pan_fried',
    prep_time_min: 15,
    spice_level: 1,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['gluten', 'eggs', 'dairy'],
    tags: ['street_food', 'sandwich', 'unique'],
    ingredient_ids: ['ING_BAGUETTE', 'ING_BEEF', 'ING_EGG', 'ING_ONION', 'ING_MAYONNAISE', 'ING_CHILI_SAUCE', 'ING_BUTTER'],
    popularity: 78
  }
];
