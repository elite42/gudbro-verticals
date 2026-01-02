/**
 * Tex-Mex Fajitas
 * Sizzling grilled meat with peppers and onions
 */

import { TexMexDish } from '../types';

export const fajitasDishes: TexMexDish[] = [
  {
    id: 'TEX_FAJITA_BEEF',
    slug: 'beef-fajitas',
    name: 'Beef Fajitas',
    description: 'Sizzling strips of marinated skirt steak with grilled peppers and onions, served with warm tortillas',
    category: 'fajitas',
    status: 'iconic',
    protein_type: 'beef',
    cooking_method: 'grilled',
    prep_time_min: 30,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['gluten'],
    tags: ['sizzling', 'grilled', 'tableside'],
    ingredient_ids: ['ING_BEEF', 'ING_BELL_PEPPER', 'ING_ONION', 'ING_FLOUR_TORTILLA', 'ING_LIME', 'ING_GARLIC', 'ING_CUMIN', 'ING_VEGETABLE_OIL'],
    popularity: 95
  },
  {
    id: 'TEX_FAJITA_CHICKEN',
    slug: 'chicken-fajitas',
    name: 'Chicken Fajitas',
    description: 'Grilled chicken breast slices with caramelized peppers and onions, served sizzling hot',
    category: 'fajitas',
    status: 'iconic',
    protein_type: 'chicken',
    cooking_method: 'grilled',
    prep_time_min: 30,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['gluten'],
    tags: ['popular', 'lean', 'colorful'],
    ingredient_ids: ['ING_CHICKEN', 'ING_BELL_PEPPER', 'ING_ONION', 'ING_FLOUR_TORTILLA', 'ING_LIME', 'ING_GARLIC', 'ING_CUMIN', 'ING_VEGETABLE_OIL'],
    popularity: 94
  },
  {
    id: 'TEX_FAJITA_SHRIMP',
    slug: 'shrimp-fajitas',
    name: 'Shrimp Fajitas',
    description: 'Jumbo shrimp grilled with peppers and onions, seasoned with lime and spices',
    category: 'fajitas',
    status: 'classic',
    protein_type: 'seafood',
    cooking_method: 'grilled',
    prep_time_min: 25,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['shellfish', 'gluten'],
    tags: ['seafood', 'quick_cooking', 'festive'],
    ingredient_ids: ['ING_SHRIMP', 'ING_BELL_PEPPER', 'ING_ONION', 'ING_FLOUR_TORTILLA', 'ING_LIME', 'ING_GARLIC', 'ING_BUTTER'],
    popularity: 85
  },
  {
    id: 'TEX_FAJITA_MIXED',
    slug: 'mixed-fajitas',
    name: 'Mixed Fajitas',
    description: 'Combination of beef, chicken, and shrimp with grilled vegetables, the ultimate fajita platter',
    category: 'fajitas',
    status: 'classic',
    protein_type: 'mixed',
    cooking_method: 'grilled',
    prep_time_min: 35,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: ['shellfish', 'gluten'],
    tags: ['combination', 'sharing', 'premium'],
    ingredient_ids: ['ING_BEEF', 'ING_CHICKEN', 'ING_SHRIMP', 'ING_BELL_PEPPER', 'ING_ONION', 'ING_FLOUR_TORTILLA', 'ING_LIME', 'ING_GARLIC'],
    popularity: 88
  },
  {
    id: 'TEX_FAJITA_VEGGIE',
    slug: 'veggie-fajitas',
    name: 'Veggie Fajitas',
    description: 'Grilled portobello mushrooms, zucchini, and peppers with all the traditional fajita accompaniments',
    category: 'fajitas',
    status: 'classic',
    protein_type: 'vegetable',
    cooking_method: 'grilled',
    prep_time_min: 25,
    spice_level: 1,
    dietary: {
      is_vegan: true,
      is_vegetarian: true,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true
    },
    allergens: ['gluten'],
    tags: ['vegetarian', 'vegan', 'mushroom'],
    ingredient_ids: ['ING_MUSHROOM', 'ING_ZUCCHINI', 'ING_BELL_PEPPER', 'ING_ONION', 'ING_FLOUR_TORTILLA', 'ING_LIME', 'ING_GARLIC', 'ING_VEGETABLE_OIL'],
    popularity: 75
  }
];
