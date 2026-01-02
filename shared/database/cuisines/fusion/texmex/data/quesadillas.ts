/**
 * Tex-Mex Quesadillas
 * Grilled cheese-filled tortillas
 */

import { TexMexDish } from '../types';

export const quesadillasDishes: TexMexDish[] = [
  {
    id: 'TEX_QUESADILLA_CHEESE',
    slug: 'cheese-quesadilla',
    name: 'Cheese Quesadilla',
    description: 'Simple and classic flour tortilla grilled with melted cheese, served with salsa and sour cream',
    category: 'quesadillas',
    status: 'iconic',
    protein_type: 'vegetable',
    cooking_method: 'grilled',
    prep_time_min: 10,
    spice_level: 1,
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
    tags: ['simple', 'kids_favorite', 'quick'],
    ingredient_ids: ['ING_FLOUR_TORTILLA', 'ING_CHEDDAR', 'ING_BUTTER'],
    popularity: 88
  },
  {
    id: 'TEX_QUESADILLA_CHICKEN',
    slug: 'chicken-quesadilla',
    name: 'Chicken Quesadilla',
    description: 'Grilled flour tortilla stuffed with seasoned chicken, cheese, peppers, and onions',
    category: 'quesadillas',
    status: 'iconic',
    protein_type: 'chicken',
    cooking_method: 'grilled',
    prep_time_min: 15,
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
    allergens: ['gluten', 'dairy'],
    tags: ['popular', 'filling', 'versatile'],
    ingredient_ids: ['ING_FLOUR_TORTILLA', 'ING_CHICKEN', 'ING_CHEDDAR', 'ING_BELL_PEPPER', 'ING_ONION', 'ING_CUMIN'],
    popularity: 92
  },
  {
    id: 'TEX_QUESADILLA_BEEF',
    slug: 'beef-quesadilla',
    name: 'Beef Quesadilla',
    description: 'Seasoned ground beef with melted cheese in a crispy grilled tortilla',
    category: 'quesadillas',
    status: 'classic',
    protein_type: 'beef',
    cooking_method: 'grilled',
    prep_time_min: 15,
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
    allergens: ['gluten', 'dairy'],
    tags: ['hearty', 'savory', 'classic'],
    ingredient_ids: ['ING_FLOUR_TORTILLA', 'ING_BEEF', 'ING_CHEDDAR', 'ING_ONION', 'ING_CUMIN', 'ING_CHILI_POWDER'],
    popularity: 86
  },
  {
    id: 'TEX_QUESADILLA_FAJITA',
    slug: 'fajita-quesadilla',
    name: 'Fajita Quesadilla',
    description: 'Quesadilla filled with fajita-style steak, grilled peppers, onions, and melted cheese',
    category: 'quesadillas',
    status: 'classic',
    protein_type: 'beef',
    cooking_method: 'grilled',
    prep_time_min: 20,
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
    allergens: ['gluten', 'dairy'],
    tags: ['fajita_style', 'premium', 'loaded'],
    ingredient_ids: ['ING_FLOUR_TORTILLA', 'ING_BEEF', 'ING_BELL_PEPPER', 'ING_ONION', 'ING_CHEDDAR', 'ING_LIME', 'ING_GARLIC'],
    popularity: 84
  },
  {
    id: 'TEX_QUESADILLA_SPINACH',
    slug: 'spinach-mushroom-quesadilla',
    name: 'Spinach Mushroom Quesadilla',
    description: 'Vegetarian quesadilla with sauteed spinach, mushrooms, and a blend of cheeses',
    category: 'quesadillas',
    status: 'modern',
    protein_type: 'vegetable',
    cooking_method: 'grilled',
    prep_time_min: 15,
    spice_level: 1,
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
    tags: ['vegetarian', 'healthy', 'earthy'],
    ingredient_ids: ['ING_FLOUR_TORTILLA', 'ING_SPINACH', 'ING_MUSHROOM', 'ING_CHEDDAR', 'ING_GARLIC', 'ING_ONION'],
    popularity: 76
  }
];
