// Dutch Cuisine - Pancakes (Pannenkoeken & Poffertjes)
// GUDBRO Database Standards v1.7

import { DutchDish } from '../types';

export const pancakesDishes: DutchDish[] = [
  {
    id: 'DUT_PANNENKOEK',
    slug: 'dutch-pannenkoek',
    name: 'Dutch Pannenkoek',
    local_name: 'Pannenkoek',
    description: 'Large thin Dutch pancake, larger than crepes, served sweet or savory',
    category: 'pancakes',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'vegetarian',
    cooking_method: 'pan-fried',
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
    allergens: ['gluten', 'dairy', 'eggs'],
    tags: ['breakfast', 'family', 'versatile'],
    popularity: 90,
    ingredients: ['ING_FLOUR', 'ING_EGG', 'ING_MILK', 'ING_BUTTER', 'ING_SALT', 'ING_POWDERED_SUGAR']
  },
  {
    id: 'DUT_PANNENKOEK_SPEK',
    slug: 'pannenkoek-met-spek',
    name: 'Pannenkoek met Spek',
    local_name: 'Spekpannenkoek',
    description: 'Dutch pancake with crispy bacon pieces baked in',
    category: 'pancakes',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'pork',
    cooking_method: 'pan-fried',
    prep_time_min: 25,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: ['gluten', 'dairy', 'eggs'],
    tags: ['savory', 'bacon', 'popular'],
    popularity: 85,
    ingredients: ['ING_FLOUR', 'ING_EGG', 'ING_MILK', 'ING_BACON', 'ING_BUTTER', 'ING_SALT', 'ING_STROOP']
  },
  {
    id: 'DUT_POFFERTJES',
    slug: 'poffertjes',
    name: 'Poffertjes',
    local_name: 'Poffertjes',
    description: 'Tiny fluffy Dutch pancakes made with yeast and buckwheat, served with butter and powdered sugar',
    category: 'pancakes',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'vegetarian',
    cooking_method: 'pan-fried',
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
    allergens: ['gluten', 'dairy', 'eggs'],
    tags: ['street-food', 'sweet', 'market'],
    popularity: 95,
    ingredients: ['ING_FLOUR', 'ING_BUCKWHEAT', 'ING_EGG', 'ING_MILK', 'ING_YEAST', 'ING_BUTTER', 'ING_POWDERED_SUGAR', 'ING_SALT']
  },
  {
    id: 'DUT_FLENSJES',
    slug: 'flensjes',
    name: 'Flensjes',
    local_name: 'Flensjes',
    description: 'Thin Dutch crepes, typically filled with whipped cream and fruit',
    category: 'pancakes',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'vegetarian',
    cooking_method: 'pan-fried',
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
    allergens: ['gluten', 'dairy', 'eggs'],
    tags: ['dessert', 'thin', 'sweet'],
    popularity: 70,
    ingredients: ['ING_FLOUR', 'ING_EGG', 'ING_MILK', 'ING_BUTTER', 'ING_SUGAR', 'ING_WHIPPED_CREAM', 'ING_STRAWBERRY']
  }
];
