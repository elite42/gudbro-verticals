// Swiss Side Dishes
// GUDBRO Database Standards v1.7

import { SwissDish } from '../types';

export const swissSides: SwissDish[] = [
  {
    id: 'SUI_ROSTI',
    slug: 'rosti',
    name: 'Rösti',
    local_name: 'Rösti',
    description: 'Iconic Swiss potato pancake, crispy on outside, soft inside, originally a Bernese farmer breakfast',
    category: 'sides',
    region: 'bern',
    status: 'classic',
    protein_type: null,
    cooking_method: 'pan_fried',
    prep_time_min: 30,
    spice_level: 0,
    price_default: 8.99,
    dietary: {
      is_vegan: false,
      is_vegetarian: true,
      is_gluten_free: true,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true
    },
    allergens: ['dairy'],
    intolerances: [],
    ingredient_ids: ['ING_POTATO', 'ING_BUTTER', 'ING_SALT', 'ING_BLACK_PEPPER'],
    tags: ['iconic', 'potato', 'crispy', 'comfort_food'],
    popularity: 95
  },
  {
    id: 'SUI_ROSTI_CHEESE',
    slug: 'rosti-with-cheese',
    name: 'Rösti with Cheese',
    local_name: 'Käserösti',
    description: 'Classic rösti topped with melted Raclette or Gruyère cheese',
    category: 'sides',
    region: 'bern',
    status: 'popular',
    protein_type: null,
    cooking_method: 'pan_fried',
    prep_time_min: 35,
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
    allergens: ['dairy'],
    intolerances: [],
    ingredient_ids: ['ING_POTATO', 'ING_BUTTER', 'ING_GRUYERE', 'ING_SALT'],
    tags: ['cheese', 'potato', 'comfort_food'],
    popularity: 88
  },
  {
    id: 'SUI_SPATZLE',
    slug: 'spatzle',
    name: 'Spätzle',
    local_name: 'Spätzle',
    description: 'Soft egg noodles popular in German-speaking Switzerland, often served with cheese or as a side',
    category: 'sides',
    region: 'zurich',
    status: 'traditional',
    protein_type: null,
    cooking_method: 'boiled',
    prep_time_min: 25,
    spice_level: 0,
    price_default: 7.99,
    dietary: {
      is_vegan: false,
      is_vegetarian: true,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true
    },
    allergens: ['gluten', 'eggs', 'dairy'],
    intolerances: [],
    ingredient_ids: ['ING_FLOUR', 'ING_EGG', 'ING_MILK', 'ING_SALT', 'ING_NUTMEG', 'ING_BUTTER'],
    tags: ['noodles', 'comfort_food', 'german_swiss'],
    popularity: 80
  },
  {
    id: 'SUI_KASESPATZLE',
    slug: 'kasespatzle',
    name: 'Käsespätzle',
    local_name: 'Käsespätzle',
    description: 'Spätzle layered with melted cheese and topped with crispy fried onions',
    category: 'sides',
    region: 'zurich',
    status: 'popular',
    protein_type: null,
    cooking_method: 'baked',
    prep_time_min: 35,
    spice_level: 0,
    price_default: 14.99,
    dietary: {
      is_vegan: false,
      is_vegetarian: true,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true
    },
    allergens: ['gluten', 'eggs', 'dairy'],
    intolerances: [],
    ingredient_ids: ['ING_FLOUR', 'ING_EGG', 'ING_MILK', 'ING_EMMENTAL', 'ING_ONION', 'ING_BUTTER'],
    tags: ['cheese', 'noodles', 'comfort_food'],
    popularity: 82
  }
];
