/**
 * Tex-Mex Main Dishes
 * Hearty entrees and combination plates
 */

import { TexMexDish } from '../types';

export const mainsDishes: TexMexDish[] = [
  {
    id: 'TEX_CHILI_CON_CARNE',
    slug: 'chili-con-carne',
    name: 'Chili con Carne',
    description: 'Hearty Texas-style beef chili with no beans, seasoned with chili peppers and spices',
    category: 'mains',
    status: 'iconic',
    protein_type: 'beef',
    cooking_method: 'simmered',
    prep_time_min: 120,
    spice_level: 3,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: [],
    tags: ['texas_style', 'no_beans', 'spicy'],
    ingredient_ids: ['ING_BEEF', 'ING_CHILI_POWDER', 'ING_CUMIN', 'ING_GARLIC', 'ING_ONION', 'ING_TOMATO_SAUCE', 'ING_JALAPENO', 'ING_OREGANO'],
    popularity: 92
  },
  {
    id: 'TEX_TAMALES',
    slug: 'beef-tamales',
    name: 'Beef Tamales',
    description: 'Corn masa filled with seasoned beef, wrapped in corn husks and steamed',
    category: 'mains',
    status: 'iconic',
    protein_type: 'beef',
    cooking_method: 'steamed',
    prep_time_min: 180,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: [],
    tags: ['traditional', 'labor_intensive', 'festive'],
    ingredient_ids: ['ING_BEEF', 'ING_CORN_FLOUR', 'ING_LARD', 'ING_CHILI_POWDER', 'ING_CUMIN', 'ING_GARLIC', 'ING_CHICKEN_BROTH'],
    popularity: 88
  },
  {
    id: 'TEX_TACO_SALAD',
    slug: 'taco-salad',
    name: 'Taco Salad',
    description: 'Crispy flour tortilla bowl filled with seasoned beef, lettuce, cheese, tomatoes, and sour cream',
    category: 'mains',
    status: 'classic',
    protein_type: 'beef',
    cooking_method: 'assembled',
    prep_time_min: 25,
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
    tags: ['bowl', 'crispy', 'fresh'],
    ingredient_ids: ['ING_BEEF', 'ING_FLOUR_TORTILLA', 'ING_LETTUCE', 'ING_TOMATO', 'ING_CHEDDAR', 'ING_SOUR_CREAM', 'ING_BLACK_BEAN', 'ING_AVOCADO'],
    popularity: 82
  },
  {
    id: 'TEX_FLAUTAS',
    slug: 'flautas',
    name: 'Flautas',
    description: 'Rolled and deep-fried tortillas filled with chicken or beef, served with guacamole and sour cream',
    category: 'mains',
    status: 'classic',
    protein_type: 'chicken',
    cooking_method: 'deep_fried',
    prep_time_min: 30,
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
    tags: ['crispy', 'rolled', 'fried'],
    ingredient_ids: ['ING_CHICKEN', 'ING_CORN_TORTILLA', 'ING_VEGETABLE_OIL', 'ING_SOUR_CREAM', 'ING_AVOCADO', 'ING_LETTUCE'],
    popularity: 80
  },
  {
    id: 'TEX_CHALUPA',
    slug: 'chalupa',
    name: 'Chalupa',
    description: 'Fried flat or boat-shaped masa topped with beans, meat, cheese, and fresh vegetables',
    category: 'mains',
    status: 'classic',
    protein_type: 'beef',
    cooking_method: 'deep_fried',
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
    tags: ['crispy_base', 'loaded', 'traditional'],
    ingredient_ids: ['ING_CORN_FLOUR', 'ING_BEEF', 'ING_PINTO_BEANS', 'ING_CHEDDAR', 'ING_LETTUCE', 'ING_TOMATO', 'ING_SOUR_CREAM', 'ING_VEGETABLE_OIL'],
    popularity: 76
  },
  {
    id: 'TEX_COMBO_PLATE',
    slug: 'combo-plate',
    name: 'Tex-Mex Combo Plate',
    description: 'Classic combination with taco, enchilada, tamale, rice, and refried beans',
    category: 'mains',
    status: 'iconic',
    protein_type: 'mixed',
    cooking_method: 'assembled',
    prep_time_min: 30,
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
    allergens: ['gluten', 'dairy'],
    tags: ['combination', 'value', 'complete_meal'],
    ingredient_ids: ['ING_BEEF', 'ING_CORN_TORTILLA', 'ING_FLOUR_TORTILLA', 'ING_CHEDDAR', 'ING_RICE', 'ING_PINTO_BEANS', 'ING_TOMATO_SAUCE'],
    popularity: 90
  }
];
