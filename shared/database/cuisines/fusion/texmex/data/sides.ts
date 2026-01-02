/**
 * Tex-Mex Sides
 * Accompaniments and side dishes
 */

import { TexMexDish } from '../types';

export const sidesDishes: TexMexDish[] = [
  {
    id: 'TEX_RICE_SPANISH',
    slug: 'spanish-rice',
    name: 'Spanish Rice',
    description: 'Tomato-flavored rice cooked with onions, garlic, and spices, a Tex-Mex staple',
    category: 'sides',
    status: 'iconic',
    protein_type: 'vegetable',
    cooking_method: 'simmered',
    prep_time_min: 25,
    spice_level: 1,
    dietary: {
      is_vegan: true,
      is_vegetarian: true,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true
    },
    allergens: [],
    tags: ['rice', 'essential', 'traditional'],
    ingredient_ids: ['ING_RICE', 'ING_TOMATO_SAUCE', 'ING_ONION', 'ING_GARLIC', 'ING_CUMIN', 'ING_CHICKEN_BROTH'],
    popularity: 92
  },
  {
    id: 'TEX_BEANS_REFRIED',
    slug: 'refried-beans',
    name: 'Refried Beans',
    description: 'Creamy mashed pinto beans cooked with lard or oil and seasoned with spices',
    category: 'sides',
    status: 'iconic',
    protein_type: 'vegetable',
    cooking_method: 'pan_fried',
    prep_time_min: 30,
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
    tags: ['beans', 'essential', 'comfort_food'],
    ingredient_ids: ['ING_PINTO_BEANS', 'ING_LARD', 'ING_ONION', 'ING_GARLIC', 'ING_CUMIN', 'ING_SALT'],
    popularity: 90
  },
  {
    id: 'TEX_BEANS_CHARRO',
    slug: 'charro-beans',
    name: 'Charro Beans',
    description: 'Pinto beans simmered with bacon, tomatoes, jalapenos, and cilantro',
    category: 'sides',
    status: 'classic',
    protein_type: 'vegetable',
    cooking_method: 'simmered',
    prep_time_min: 60,
    spice_level: 2,
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
    tags: ['soupy', 'bacon', 'flavorful'],
    ingredient_ids: ['ING_PINTO_BEANS', 'ING_BACON', 'ING_TOMATO', 'ING_JALAPENO', 'ING_CILANTRO', 'ING_ONION', 'ING_GARLIC'],
    popularity: 82
  },
  {
    id: 'TEX_CORN_STREET',
    slug: 'street-corn',
    name: 'Elote (Street Corn)',
    description: 'Grilled corn on the cob slathered with mayo, cotija cheese, chili powder, and lime',
    category: 'sides',
    status: 'classic',
    protein_type: 'vegetable',
    cooking_method: 'grilled',
    prep_time_min: 15,
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
    allergens: ['dairy', 'eggs'],
    tags: ['grilled', 'street_food', 'messy'],
    ingredient_ids: ['ING_CORN', 'ING_MAYONNAISE', 'ING_COTIJA_CHEESE', 'ING_CHILI_POWDER', 'ING_LIME', 'ING_CILANTRO'],
    popularity: 88
  },
  {
    id: 'TEX_CORN_ESQUITES',
    slug: 'esquites',
    name: 'Esquites',
    description: 'Mexican corn salad with mayo, cheese, lime, and chili served in a cup',
    category: 'sides',
    status: 'classic',
    protein_type: 'vegetable',
    cooking_method: 'pan_fried',
    prep_time_min: 15,
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
    allergens: ['dairy', 'eggs'],
    tags: ['corn_salad', 'creamy', 'tangy'],
    ingredient_ids: ['ING_CORN', 'ING_MAYONNAISE', 'ING_COTIJA_CHEESE', 'ING_LIME', 'ING_CHILI_POWDER', 'ING_BUTTER'],
    popularity: 80
  }
];
