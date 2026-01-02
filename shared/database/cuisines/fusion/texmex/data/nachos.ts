/**
 * Tex-Mex Nachos
 * Loaded tortilla chip dishes
 */

import { TexMexDish } from '../types';

export const nachosDishes: TexMexDish[] = [
  {
    id: 'TEX_NACHOS_SUPREME',
    slug: 'nachos-supreme',
    name: 'Nachos Supreme',
    description: 'Crispy tortilla chips loaded with seasoned beef, cheese sauce, beans, sour cream, guacamole, and jalapenos',
    category: 'nachos',
    status: 'iconic',
    protein_type: 'beef',
    cooking_method: 'assembled',
    prep_time_min: 20,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['dairy'],
    tags: ['loaded', 'sharing', 'party_food'],
    ingredient_ids: ['ING_CORN_TORTILLA', 'ING_BEEF', 'ING_CHEDDAR', 'ING_BLACK_BEAN', 'ING_SOUR_CREAM', 'ING_AVOCADO', 'ING_JALAPENO', 'ING_TOMATO'],
    popularity: 95
  },
  {
    id: 'TEX_NACHOS_CHICKEN',
    slug: 'chicken-nachos',
    name: 'Chicken Nachos',
    description: 'Tortilla chips topped with grilled chicken, queso, pico de gallo, and fresh toppings',
    category: 'nachos',
    status: 'classic',
    protein_type: 'chicken',
    cooking_method: 'assembled',
    prep_time_min: 20,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['dairy'],
    tags: ['grilled', 'fresh', 'popular'],
    ingredient_ids: ['ING_CORN_TORTILLA', 'ING_CHICKEN', 'ING_CHEDDAR', 'ING_TOMATO', 'ING_ONION', 'ING_CILANTRO', 'ING_LIME', 'ING_JALAPENO'],
    popularity: 88
  },
  {
    id: 'TEX_NACHOS_FAJITA',
    slug: 'fajita-nachos',
    name: 'Fajita Nachos',
    description: 'Nachos topped with sizzling fajita steak and peppers, cheese, and all the fixings',
    category: 'nachos',
    status: 'classic',
    protein_type: 'beef',
    cooking_method: 'assembled',
    prep_time_min: 25,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['dairy'],
    tags: ['fajita_style', 'sizzling', 'premium'],
    ingredient_ids: ['ING_CORN_TORTILLA', 'ING_BEEF', 'ING_BELL_PEPPER', 'ING_ONION', 'ING_CHEDDAR', 'ING_SOUR_CREAM', 'ING_AVOCADO'],
    popularity: 84
  },
  {
    id: 'TEX_NACHOS_VEGGIE',
    slug: 'veggie-nachos',
    name: 'Veggie Nachos',
    description: 'Vegetarian nachos loaded with black beans, corn, peppers, cheese, and fresh vegetables',
    category: 'nachos',
    status: 'classic',
    protein_type: 'vegetable',
    cooking_method: 'assembled',
    prep_time_min: 15,
    spice_level: 1,
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
    tags: ['vegetarian', 'colorful', 'healthy'],
    ingredient_ids: ['ING_CORN_TORTILLA', 'ING_BLACK_BEAN', 'ING_CORN', 'ING_BELL_PEPPER', 'ING_CHEDDAR', 'ING_TOMATO', 'ING_AVOCADO', 'ING_CILANTRO'],
    popularity: 78
  }
];
