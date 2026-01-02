/**
 * Tex-Mex Enchiladas
 * Rolled tortillas with sauce
 */

import { TexMexDish } from '../types';

export const enchiladasDishes: TexMexDish[] = [
  {
    id: 'TEX_ENCHILADA_CHEESE',
    slug: 'cheese-enchiladas',
    name: 'Cheese Enchiladas',
    description: 'Corn tortillas rolled around melted cheese, smothered in chili con carne or red enchilada sauce',
    category: 'enchiladas',
    status: 'iconic',
    protein_type: 'vegetable',
    cooking_method: 'baked',
    prep_time_min: 30,
    spice_level: 2,
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
    tags: ['cheesy', 'comfort_food', 'classic'],
    ingredient_ids: ['ING_CORN_TORTILLA', 'ING_CHEDDAR', 'ING_ONION', 'ING_CHILI_POWDER', 'ING_CUMIN', 'ING_TOMATO_SAUCE', 'ING_GARLIC'],
    popularity: 90
  },
  {
    id: 'TEX_ENCHILADA_BEEF',
    slug: 'beef-enchiladas',
    name: 'Beef Enchiladas',
    description: 'Corn tortillas filled with seasoned ground beef, topped with red sauce and melted cheese',
    category: 'enchiladas',
    status: 'iconic',
    protein_type: 'beef',
    cooking_method: 'baked',
    prep_time_min: 40,
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
    tags: ['hearty', 'filling', 'traditional'],
    ingredient_ids: ['ING_BEEF', 'ING_CORN_TORTILLA', 'ING_CHEDDAR', 'ING_ONION', 'ING_TOMATO_SAUCE', 'ING_CHILI_POWDER', 'ING_CUMIN', 'ING_GARLIC'],
    popularity: 92
  },
  {
    id: 'TEX_ENCHILADA_CHICKEN',
    slug: 'chicken-enchiladas',
    name: 'Chicken Enchiladas',
    description: 'Shredded chicken rolled in tortillas with green or white cream sauce, topped with cheese',
    category: 'enchiladas',
    status: 'iconic',
    protein_type: 'chicken',
    cooking_method: 'baked',
    prep_time_min: 40,
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
    tags: ['creamy', 'popular', 'verde'],
    ingredient_ids: ['ING_CHICKEN', 'ING_CORN_TORTILLA', 'ING_SOUR_CREAM', 'ING_CHEDDAR', 'ING_TOMATILLO', 'ING_ONION', 'ING_GARLIC', 'ING_CILANTRO'],
    popularity: 94
  },
  {
    id: 'TEX_ENCHILADA_VERDE',
    slug: 'enchiladas-verdes',
    name: 'Enchiladas Verdes',
    description: 'Chicken enchiladas covered in tangy green tomatillo sauce with sour cream',
    category: 'enchiladas',
    status: 'classic',
    protein_type: 'chicken',
    cooking_method: 'baked',
    prep_time_min: 45,
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
    tags: ['green_sauce', 'tangy', 'fresh'],
    ingredient_ids: ['ING_CHICKEN', 'ING_CORN_TORTILLA', 'ING_TOMATILLO', 'ING_JALAPENO', 'ING_SOUR_CREAM', 'ING_CILANTRO', 'ING_ONION', 'ING_GARLIC'],
    popularity: 86
  },
  {
    id: 'TEX_ENCHILADA_SUIZA',
    slug: 'enchiladas-suizas',
    name: 'Enchiladas Suizas',
    description: 'Swiss-style chicken enchiladas with creamy green sauce and gratinated cheese topping',
    category: 'enchiladas',
    status: 'classic',
    protein_type: 'chicken',
    cooking_method: 'baked',
    prep_time_min: 45,
    spice_level: 1,
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
    tags: ['creamy', 'gratinated', 'mild'],
    ingredient_ids: ['ING_CHICKEN', 'ING_CORN_TORTILLA', 'ING_HEAVY_CREAM', 'ING_TOMATILLO', 'ING_CHEDDAR', 'ING_SOUR_CREAM', 'ING_ONION'],
    popularity: 82
  }
];
