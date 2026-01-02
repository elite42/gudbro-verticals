// Dutch Cuisine - Stamppot (Mashed Potato Dishes)
// GUDBRO Database Standards v1.7

import { DutchDish } from '../types';

export const stamppotDishes: DutchDish[] = [
  {
    id: 'DUT_BOERENKOOL',
    slug: 'boerenkool-stamppot',
    name: 'Boerenkool Stamppot',
    local_name: 'Boerenkool met Worst',
    description: 'Traditional Dutch mashed potatoes with kale and smoked sausage, served with gravy',
    category: 'stamppot',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'pork',
    cooking_method: 'boiled',
    prep_time_min: 45,
    spice_level: 0,
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
    tags: ['comfort-food', 'winter', 'traditional'],
    popularity: 95,
    ingredients: ['ING_POTATO', 'ING_KALE', 'ING_ROOKWORST', 'ING_BUTTER', 'ING_MILK', 'ING_BEEF_BROTH', 'ING_ONION', 'ING_SALT', 'ING_BLACK_PEPPER']
  },
  {
    id: 'DUT_HUTSPOT',
    slug: 'hutspot',
    name: 'Hutspot',
    local_name: 'Hutspot met Klapstuk',
    description: 'Mashed potatoes with carrots and onions, traditionally served with braised beef',
    category: 'stamppot',
    region: 'holland',
    status: 'iconic',
    protein_type: 'beef',
    cooking_method: 'boiled',
    prep_time_min: 60,
    spice_level: 0,
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
    tags: ['comfort-food', 'historical', 'leiden'],
    popularity: 90,
    ingredients: ['ING_POTATO', 'ING_CARROT', 'ING_ONION', 'ING_BEEF_CHUCK', 'ING_BUTTER', 'ING_MILK', 'ING_BAY_LEAVES', 'ING_CLOVE', 'ING_SALT']
  },
  {
    id: 'DUT_ANDIJVIE',
    slug: 'andijvie-stamppot',
    name: 'Andijvie Stamppot',
    local_name: 'Andijviestamppot',
    description: 'Creamy mashed potatoes with endive and bacon bits',
    category: 'stamppot',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'pork',
    cooking_method: 'boiled',
    prep_time_min: 35,
    spice_level: 0,
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
    tags: ['comfort-food', 'quick'],
    popularity: 80,
    ingredients: ['ING_POTATO', 'ING_ENDIVE', 'ING_BACON', 'ING_BUTTER', 'ING_MILK', 'ING_NUTMEG', 'ING_SALT', 'ING_BLACK_PEPPER']
  },
  {
    id: 'DUT_ZUURKOOL',
    slug: 'zuurkool-stamppot',
    name: 'Zuurkool Stamppot',
    local_name: 'Zuurkoolstamppot',
    description: 'Mashed potatoes with sauerkraut and smoked sausage',
    category: 'stamppot',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'pork',
    cooking_method: 'boiled',
    prep_time_min: 40,
    spice_level: 0,
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
    tags: ['comfort-food', 'winter', 'german-influence'],
    popularity: 75,
    ingredients: ['ING_POTATO', 'ING_SAUERKRAUT', 'ING_ROOKWORST', 'ING_BUTTER', 'ING_BACON', 'ING_ONION', 'ING_JUNIPER_BERRIES', 'ING_SALT']
  },
  {
    id: 'DUT_HETE_BLIKSEM',
    slug: 'hete-bliksem',
    name: 'Hete Bliksem',
    local_name: 'Hete Bliksem',
    description: 'Hot Lightning - mashed potatoes with apples and bacon, sweet and savory',
    category: 'stamppot',
    region: 'limburg',
    status: 'traditional',
    protein_type: 'pork',
    cooking_method: 'boiled',
    prep_time_min: 40,
    spice_level: 0,
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
    tags: ['sweet-savory', 'regional', 'autumn'],
    popularity: 65,
    ingredients: ['ING_POTATO', 'ING_APPLE', 'ING_BACON', 'ING_BUTTER', 'ING_BROWN_SUGAR', 'ING_ONION', 'ING_SALT', 'ING_BLACK_PEPPER']
  }
];
