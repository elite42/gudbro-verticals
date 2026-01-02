/**
 * Tex-Mex Burritos
 * Wrapped flour tortilla dishes
 */

import { TexMexDish } from '../types';

export const burritosDishes: TexMexDish[] = [
  {
    id: 'TEX_BURRITO_BEEF',
    slug: 'beef-burrito',
    name: 'Beef Burrito',
    description: 'Large flour tortilla stuffed with seasoned ground beef, rice, beans, cheese, and fresh toppings',
    category: 'burritos',
    status: 'iconic',
    protein_type: 'beef',
    cooking_method: 'assembled',
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
    tags: ['wrapped', 'filling', 'complete_meal'],
    ingredient_ids: ['ING_BEEF', 'ING_FLOUR_TORTILLA', 'ING_RICE', 'ING_BLACK_BEAN', 'ING_CHEDDAR', 'ING_SOUR_CREAM', 'ING_LETTUCE', 'ING_TOMATO'],
    popularity: 94
  },
  {
    id: 'TEX_BURRITO_CHICKEN',
    slug: 'chicken-burrito',
    name: 'Chicken Burrito',
    description: 'Grilled or shredded chicken wrapped with rice, beans, cheese, guacamole, and salsa in a flour tortilla',
    category: 'burritos',
    status: 'iconic',
    protein_type: 'chicken',
    cooking_method: 'assembled',
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
    tags: ['grilled', 'popular', 'hearty'],
    ingredient_ids: ['ING_CHICKEN', 'ING_FLOUR_TORTILLA', 'ING_RICE', 'ING_PINTO_BEANS', 'ING_CHEDDAR', 'ING_AVOCADO', 'ING_TOMATO', 'ING_ONION'],
    popularity: 92
  },
  {
    id: 'TEX_BURRITO_BEAN_CHEESE',
    slug: 'bean-and-cheese-burrito',
    name: 'Bean and Cheese Burrito',
    description: 'Simple and satisfying burrito with refried beans and melted cheese, a Tex-Mex staple',
    category: 'burritos',
    status: 'classic',
    protein_type: 'vegetable',
    cooking_method: 'assembled',
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
    tags: ['vegetarian', 'simple', 'comfort_food'],
    ingredient_ids: ['ING_PINTO_BEANS', 'ING_FLOUR_TORTILLA', 'ING_CHEDDAR', 'ING_ONION', 'ING_CUMIN'],
    popularity: 82
  },
  {
    id: 'TEX_BURRITO_BREAKFAST',
    slug: 'breakfast-burrito',
    name: 'Breakfast Burrito',
    description: 'Scrambled eggs with bacon or chorizo, potatoes, cheese, and salsa wrapped in a warm flour tortilla',
    category: 'burritos',
    status: 'iconic',
    protein_type: 'egg',
    cooking_method: 'assembled',
    prep_time_min: 20,
    spice_level: 2,
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
    tags: ['breakfast', 'eggs', 'morning'],
    ingredient_ids: ['ING_EGG', 'ING_FLOUR_TORTILLA', 'ING_BACON', 'ING_POTATO', 'ING_CHEDDAR', 'ING_ONION', 'ING_BELL_PEPPER', 'ING_SALSA'],
    popularity: 90
  },
  {
    id: 'TEX_CHIMICHANGA',
    slug: 'chimichanga',
    name: 'Chimichanga',
    description: 'Deep-fried burrito filled with meat and cheese, topped with salsa, sour cream, and guacamole',
    category: 'burritos',
    status: 'iconic',
    protein_type: 'beef',
    cooking_method: 'deep_fried',
    prep_time_min: 30,
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
    tags: ['deep_fried', 'crispy', 'indulgent'],
    ingredient_ids: ['ING_BEEF', 'ING_FLOUR_TORTILLA', 'ING_CHEDDAR', 'ING_SOUR_CREAM', 'ING_AVOCADO', 'ING_VEGETABLE_OIL', 'ING_ONION'],
    popularity: 85
  }
];
