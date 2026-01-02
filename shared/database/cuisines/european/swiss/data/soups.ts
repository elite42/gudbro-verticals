// Swiss Soups
// GUDBRO Database Standards v1.7

import { SwissDish } from '../types';

export const swissSoups: SwissDish[] = [
  {
    id: 'SUI_GERSTENSUPPE',
    slug: 'bundner-gerstensuppe',
    name: 'Bündner Gerstensuppe',
    local_name: 'Bündner Gerstensuppe',
    description: 'Hearty Graubünden barley soup with smoked meat, vegetables, and dried beef',
    category: 'soups',
    region: 'graubunden',
    status: 'classic',
    protein_type: 'mixed',
    cooking_method: 'simmered',
    prep_time_min: 90,
    spice_level: 0,
    price_default: 12.99,
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
    intolerances: [],
    ingredient_ids: ['ING_BARLEY', 'ING_BUNDNERFLEISCH', 'ING_BACON', 'ING_CARROT', 'ING_CELERY', 'ING_LEEK', 'ING_POTATO', 'ING_HEAVY_CREAM', 'ING_BAY_LEAF'],
    tags: ['graubunden', 'hearty', 'winter', 'mountain'],
    popularity: 82
  },
  {
    id: 'SUI_BASLER_MEHLSUPPE',
    slug: 'basler-mehlsuppe',
    name: 'Basler Mehlsuppe',
    local_name: 'Basler Mehlsuppe',
    description: 'Traditional Basel flour soup served at Fasnacht carnival, made with toasted flour and onions',
    category: 'soups',
    region: 'basel',
    status: 'traditional',
    protein_type: null,
    cooking_method: 'simmered',
    prep_time_min: 45,
    spice_level: 0,
    price_default: 9.99,
    dietary: {
      is_vegan: false,
      is_vegetarian: true,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true
    },
    allergens: ['gluten', 'dairy'],
    intolerances: [],
    ingredient_ids: ['ING_FLOUR', 'ING_BUTTER', 'ING_ONION', 'ING_BEEF_BROTH', 'ING_GRUYERE', 'ING_BLACK_PEPPER'],
    tags: ['basel', 'fasnacht', 'carnival', 'traditional'],
    popularity: 70
  },
  {
    id: 'SUI_ZWIEBELSUPPE',
    slug: 'swiss-onion-soup',
    name: 'Swiss Onion Soup',
    local_name: 'Zwiebelsuppe',
    description: 'Rich onion soup topped with crusty bread and melted cheese, Swiss Alpine version',
    category: 'soups',
    region: 'nationwide',
    status: 'traditional',
    protein_type: null,
    cooking_method: 'simmered',
    prep_time_min: 60,
    spice_level: 0,
    price_default: 11.99,
    dietary: {
      is_vegan: false,
      is_vegetarian: true,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true
    },
    allergens: ['gluten', 'dairy'],
    intolerances: [],
    ingredient_ids: ['ING_ONION', 'ING_BUTTER', 'ING_WHITE_WINE', 'ING_BEEF_BROTH', 'ING_BREAD', 'ING_GRUYERE', 'ING_THYME'],
    tags: ['onion', 'cheese', 'comfort_food', 'winter'],
    popularity: 75
  }
];
