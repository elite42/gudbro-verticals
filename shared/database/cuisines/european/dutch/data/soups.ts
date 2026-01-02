// Dutch Cuisine - Soups
// GUDBRO Database Standards v1.7

import { DutchDish } from '../types';

export const soupsDishes: DutchDish[] = [
  {
    id: 'DUT_ERWTENSOEP',
    slug: 'erwtensoep',
    name: 'Erwtensoep',
    local_name: 'Snert',
    description: 'Thick Dutch split pea soup with smoked sausage, so thick the spoon stands up',
    category: 'soups',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'pork',
    cooking_method: 'simmered',
    prep_time_min: 120,
    spice_level: 0,
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
    tags: ['winter', 'hearty', 'traditional'],
    popularity: 95,
    ingredients: ['ING_SPLIT_PEA', 'ING_ROOKWORST', 'ING_PORK_BELLY', 'ING_LEEK', 'ING_CELERY', 'ING_CARROT', 'ING_POTATO', 'ING_ONION', 'ING_BAY_LEAVES', 'ING_SALT']
  },
  {
    id: 'DUT_BRUINE_BONENSOEP',
    slug: 'bruine-bonensoep',
    name: 'Bruine Bonensoep',
    local_name: 'Bruine Bonensoep',
    description: 'Hearty brown bean soup with bacon and vegetables',
    category: 'soups',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'pork',
    cooking_method: 'simmered',
    prep_time_min: 90,
    spice_level: 0,
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
    tags: ['winter', 'hearty', 'beans'],
    popularity: 70,
    ingredients: ['ING_BROWN_BEAN', 'ING_BACON', 'ING_ONION', 'ING_CARROT', 'ING_CELERY', 'ING_POTATO', 'ING_BAY_LEAVES', 'ING_APPLE_CIDER_VINEGAR', 'ING_SALT', 'ING_BLACK_PEPPER']
  },
  {
    id: 'DUT_KONINGINNESOEP',
    slug: 'koninginnesoep',
    name: 'Koninginnesoep',
    local_name: 'Koninginnesoep',
    description: 'Queen soup - creamy chicken soup with meatballs and asparagus',
    category: 'soups',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'chicken',
    cooking_method: 'simmered',
    prep_time_min: 60,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['dairy', 'gluten', 'eggs'],
    tags: ['elegant', 'creamy', 'special-occasion'],
    popularity: 65,
    ingredients: ['ING_CHICKEN_BROTH', 'ING_CHICKEN', 'ING_HEAVY_CREAM', 'ING_WHITE_ASPARAGUS', 'ING_EGG_YOLK', 'ING_BUTTER', 'ING_FLOUR', 'ING_NUTMEG', 'ING_PARSLEY', 'ING_SALT']
  }
];
