/**
 * Tex-Mex Tacos
 * Iconic taco varieties
 */

import { TexMexDish } from '../types';

export const tacosDishes: TexMexDish[] = [
  {
    id: 'TEX_TACO_BEEF',
    slug: 'ground-beef-taco',
    name: 'Ground Beef Taco',
    description: 'Classic Tex-Mex taco with seasoned ground beef, shredded lettuce, diced tomatoes, and cheddar cheese in a crispy corn shell',
    category: 'tacos',
    status: 'iconic',
    protein_type: 'beef',
    cooking_method: 'pan_fried',
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
    tags: ['classic', 'crispy_shell', 'family_favorite'],
    ingredient_ids: ['ING_BEEF', 'ING_CORN_TORTILLA', 'ING_LETTUCE', 'ING_TOMATO', 'ING_CHEDDAR', 'ING_ONION', 'ING_CUMIN', 'ING_CHILI_POWDER', 'ING_GARLIC'],
    popularity: 95
  },
  {
    id: 'TEX_TACO_CHICKEN',
    slug: 'chicken-taco',
    name: 'Chicken Taco',
    description: 'Seasoned shredded chicken in a crispy or soft tortilla with fresh toppings and sour cream',
    category: 'tacos',
    status: 'iconic',
    protein_type: 'chicken',
    cooking_method: 'pan_fried',
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
    tags: ['shredded', 'versatile', 'popular'],
    ingredient_ids: ['ING_CHICKEN', 'ING_CORN_TORTILLA', 'ING_LETTUCE', 'ING_TOMATO', 'ING_SOUR_CREAM', 'ING_CHEDDAR', 'ING_CUMIN', 'ING_LIME'],
    popularity: 92
  },
  {
    id: 'TEX_TACO_FISH',
    slug: 'fish-taco',
    name: 'Fish Taco',
    description: 'Beer-battered or grilled fish with cabbage slaw, chipotle mayo, and fresh lime in a soft flour tortilla',
    category: 'tacos',
    status: 'classic',
    protein_type: 'fish',
    cooking_method: 'deep_fried',
    prep_time_min: 25,
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
    allergens: ['fish', 'gluten', 'eggs'],
    tags: ['battered', 'fresh', 'coastal'],
    ingredient_ids: ['ING_WHITE_FISH', 'ING_FLOUR_TORTILLA', 'ING_CABBAGE', 'ING_MAYONNAISE', 'ING_LIME', 'ING_FLOUR', 'ING_BEER'],
    popularity: 85
  },
  {
    id: 'TEX_TACO_CARNITAS',
    slug: 'carnitas-taco',
    name: 'Carnitas Taco',
    description: 'Slow-cooked pulled pork with cilantro, onions, and salsa verde in a soft corn tortilla',
    category: 'tacos',
    status: 'classic',
    protein_type: 'pork',
    cooking_method: 'braised',
    prep_time_min: 180,
    spice_level: 1,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: [],
    tags: ['slow_cooked', 'pulled_pork', 'tender'],
    ingredient_ids: ['ING_PORK', 'ING_CORN_TORTILLA', 'ING_CILANTRO', 'ING_ONION', 'ING_LIME', 'ING_GARLIC', 'ING_ORANGE'],
    popularity: 88
  },
  {
    id: 'TEX_PUFFY_TACO',
    slug: 'puffy-taco',
    name: 'Puffy Taco',
    description: 'San Antonio specialty with a deep-fried puffy corn masa shell filled with picadillo or chicken',
    category: 'tacos',
    status: 'regional',
    protein_type: 'beef',
    cooking_method: 'deep_fried',
    prep_time_min: 30,
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
    tags: ['san_antonio', 'puffy', 'unique'],
    ingredient_ids: ['ING_BEEF', 'ING_CORN_FLOUR', 'ING_LETTUCE', 'ING_TOMATO', 'ING_CHEDDAR', 'ING_VEGETABLE_OIL', 'ING_CUMIN'],
    popularity: 75
  }
];
