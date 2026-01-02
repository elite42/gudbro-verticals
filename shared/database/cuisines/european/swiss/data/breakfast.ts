// Swiss Breakfast Dishes
// GUDBRO Database Standards v1.7

import { SwissDish } from '../types';

export const swissBreakfast: SwissDish[] = [
  {
    id: 'SUI_BIRCHERMUESLI',
    slug: 'birchermuesli',
    name: 'Birchermüesli',
    local_name: 'Birchermüesli',
    description: 'Original Swiss muesli invented by Dr. Bircher-Benner, oats soaked overnight with apple, lemon, nuts and cream',
    category: 'breakfast',
    region: 'zurich',
    status: 'classic',
    protein_type: null,
    cooking_method: 'raw',
    prep_time_min: 15,
    spice_level: 0,
    price_default: 8.99,
    dietary: {
      is_vegan: false,
      is_vegetarian: true,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: false,
      is_halal: true,
      is_kosher: true
    },
    allergens: ['gluten', 'dairy', 'nuts'],
    intolerances: [],
    ingredient_ids: ['ING_ROLLED_OAT', 'ING_APPLE', 'ING_LEMON', 'ING_HAZELNUTS', 'ING_HEAVY_CREAM', 'ING_HONEY', 'ING_YOGURT'],
    tags: ['iconic', 'healthy', 'original', 'zurich'],
    popularity: 95
  },
  {
    id: 'SUI_ROSTI_EGG',
    slug: 'rosti-with-egg',
    name: 'Rösti with Fried Egg',
    local_name: 'Rösti mit Spiegelei',
    description: 'Classic breakfast rösti topped with a perfectly fried egg, popular farmer breakfast',
    category: 'breakfast',
    region: 'bern',
    status: 'classic',
    protein_type: 'egg',
    cooking_method: 'pan_fried',
    prep_time_min: 25,
    spice_level: 0,
    price_default: 12.99,
    dietary: {
      is_vegan: false,
      is_vegetarian: true,
      is_gluten_free: true,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true
    },
    allergens: ['eggs', 'dairy'],
    intolerances: [],
    ingredient_ids: ['ING_POTATO', 'ING_BUTTER', 'ING_EGG', 'ING_SALT', 'ING_BLACK_PEPPER'],
    tags: ['breakfast', 'hearty', 'farm_style'],
    popularity: 85
  },
  {
    id: 'SUI_ROSTI_BACON',
    slug: 'rosti-with-bacon',
    name: 'Rösti with Bacon',
    local_name: 'Speckrösti',
    description: 'Rösti cooked with crispy bacon pieces mixed throughout, hearty Swiss breakfast',
    category: 'breakfast',
    region: 'bern',
    status: 'popular',
    protein_type: 'pork',
    cooking_method: 'pan_fried',
    prep_time_min: 30,
    spice_level: 0,
    price_default: 14.99,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: ['dairy'],
    intolerances: [],
    ingredient_ids: ['ING_POTATO', 'ING_BACON', 'ING_BUTTER', 'ING_ONION', 'ING_SALT'],
    tags: ['breakfast', 'bacon', 'hearty'],
    popularity: 82
  }
];
