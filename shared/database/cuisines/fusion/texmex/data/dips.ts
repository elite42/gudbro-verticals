/**
 * Tex-Mex Dips
 * Classic dips and salsas
 */

import { TexMexDish } from '../types';

export const dipsDishes: TexMexDish[] = [
  {
    id: 'TEX_GUACAMOLE',
    slug: 'guacamole',
    name: 'Guacamole',
    description: 'Fresh mashed avocados with lime, cilantro, onions, tomatoes, and jalapenos',
    category: 'dips',
    status: 'iconic',
    protein_type: 'vegetable',
    cooking_method: 'raw',
    prep_time_min: 10,
    spice_level: 2,
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
    tags: ['fresh', 'essential', 'healthy'],
    ingredient_ids: ['ING_AVOCADO', 'ING_LIME', 'ING_CILANTRO', 'ING_ONION', 'ING_TOMATO', 'ING_JALAPENO', 'ING_SALT', 'ING_GARLIC'],
    popularity: 98
  },
  {
    id: 'TEX_QUESO',
    slug: 'queso-dip',
    name: 'Queso Dip',
    description: 'Creamy melted cheese dip with peppers, often made with Velveeta and Ro-Tel',
    category: 'dips',
    status: 'iconic',
    protein_type: 'vegetable',
    cooking_method: 'melted',
    prep_time_min: 10,
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
    tags: ['cheesy', 'creamy', 'addictive'],
    ingredient_ids: ['ING_CHEDDAR', 'ING_MILK', 'ING_JALAPENO', 'ING_TOMATO', 'ING_ONION', 'ING_CUMIN'],
    popularity: 95
  },
  {
    id: 'TEX_SALSA_ROJA',
    slug: 'salsa-roja',
    name: 'Salsa Roja',
    description: 'Classic red tomato salsa with chiles, onion, garlic, and cilantro',
    category: 'dips',
    status: 'iconic',
    protein_type: 'vegetable',
    cooking_method: 'raw',
    prep_time_min: 15,
    spice_level: 3,
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
    tags: ['essential', 'spicy', 'fresh'],
    ingredient_ids: ['ING_TOMATO', 'ING_JALAPENO', 'ING_ONION', 'ING_GARLIC', 'ING_CILANTRO', 'ING_LIME', 'ING_SALT'],
    popularity: 94
  },
  {
    id: 'TEX_PICO_GALLO',
    slug: 'pico-de-gallo',
    name: 'Pico de Gallo',
    description: 'Fresh chunky salsa with diced tomatoes, onions, jalapenos, cilantro, and lime',
    category: 'dips',
    status: 'iconic',
    protein_type: 'vegetable',
    cooking_method: 'raw',
    prep_time_min: 10,
    spice_level: 2,
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
    tags: ['fresh', 'chunky', 'bright'],
    ingredient_ids: ['ING_TOMATO', 'ING_ONION', 'ING_JALAPENO', 'ING_CILANTRO', 'ING_LIME', 'ING_SALT'],
    popularity: 92
  },
  {
    id: 'TEX_SALSA_VERDE',
    slug: 'salsa-verde',
    name: 'Salsa Verde',
    description: 'Tangy green salsa made from tomatillos, green chiles, and cilantro',
    category: 'dips',
    status: 'classic',
    protein_type: 'vegetable',
    cooking_method: 'raw',
    prep_time_min: 15,
    spice_level: 2,
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
    tags: ['tangy', 'green', 'versatile'],
    ingredient_ids: ['ING_TOMATILLO', 'ING_JALAPENO', 'ING_CILANTRO', 'ING_ONION', 'ING_GARLIC', 'ING_LIME'],
    popularity: 88
  },
  {
    id: 'TEX_QUESO_FUNDIDO',
    slug: 'queso-fundido',
    name: 'Queso Fundido',
    description: 'Melted cheese with chorizo, served bubbling hot with warm tortillas',
    category: 'dips',
    status: 'classic',
    protein_type: 'pork',
    cooking_method: 'baked',
    prep_time_min: 20,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: ['dairy'],
    tags: ['melted', 'chorizo', 'sharing'],
    ingredient_ids: ['ING_CHEDDAR', 'ING_CHORIZO', 'ING_ONION', 'ING_JALAPENO', 'ING_FLOUR_TORTILLA'],
    popularity: 85
  }
];
