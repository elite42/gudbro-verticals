// Dutch Cuisine - Seafood
// GUDBRO Database Standards v1.7

import { DutchDish } from '../types';

export const seafoodDishes: DutchDish[] = [
  {
    id: 'DUT_HOLLANDSE_HARING',
    slug: 'hollandse-nieuwe',
    name: 'Hollandse Nieuwe',
    local_name: 'Hollandse Nieuwe Haring',
    description: 'Fresh raw herring served with onions and pickles, eaten by holding the tail',
    category: 'seafood',
    region: 'holland',
    status: 'iconic',
    protein_type: 'fish',
    cooking_method: 'raw',
    prep_time_min: 5,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['fish'],
    tags: ['raw', 'street-food', 'traditional'],
    popularity: 90,
    ingredients: ['ING_HERRING', 'ING_ONION', 'ING_PICKLED_CUCUMBER']
  },
  {
    id: 'DUT_KIBBELING',
    slug: 'kibbeling',
    name: 'Kibbeling',
    local_name: 'Kibbeling',
    description: 'Deep-fried battered cod chunks served with garlic sauce or ravigote',
    category: 'seafood',
    region: 'zeeland',
    status: 'iconic',
    protein_type: 'fish',
    cooking_method: 'deep-fried',
    prep_time_min: 20,
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
    allergens: ['fish', 'gluten', 'eggs'],
    tags: ['street-food', 'fried', 'fish'],
    popularity: 92,
    ingredients: ['ING_COD', 'ING_FLOUR', 'ING_BAKING_POWDER', 'ING_EGG', 'ING_MILK', 'ING_GARLIC_SAUCE', 'ING_SALT', 'ING_WHITE_PEPPER']
  },
  {
    id: 'DUT_LEKKERBEKJE',
    slug: 'lekkerbekje',
    name: 'Lekkerbekje',
    local_name: 'Lekkerbekje',
    description: 'Battered and deep-fried whiting fillet, a Dutch fish shop classic',
    category: 'seafood',
    region: 'zeeland',
    status: 'classic',
    protein_type: 'fish',
    cooking_method: 'deep-fried',
    prep_time_min: 20,
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
    allergens: ['fish', 'gluten', 'eggs'],
    tags: ['fried', 'fish', 'street-food'],
    popularity: 75,
    ingredients: ['ING_WHITING', 'ING_FLOUR', 'ING_BAKING_POWDER', 'ING_EGG', 'ING_MILK', 'ING_SALT']
  },
  {
    id: 'DUT_GEROOKTE_PALING',
    slug: 'gerookte-paling',
    name: 'Gerookte Paling',
    local_name: 'Gerookte Paling',
    description: 'Traditional Dutch smoked eel, a delicacy from the Zuiderzee region',
    category: 'seafood',
    region: 'holland',
    status: 'traditional',
    protein_type: 'fish',
    cooking_method: 'smoked',
    prep_time_min: 10,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['fish'],
    tags: ['smoked', 'delicacy', 'traditional'],
    popularity: 60,
    ingredients: ['ING_EEL', 'ING_SALT', 'ING_BLACK_PEPPER']
  },
  {
    id: 'DUT_MOSSELEN',
    slug: 'zeeuwse-mosselen',
    name: 'Zeeuwse Mosselen',
    local_name: 'Zeeuwse Mosselen',
    description: 'Zeeland mussels steamed with celery, leeks, and white wine',
    category: 'seafood',
    region: 'zeeland',
    status: 'iconic',
    protein_type: 'shellfish',
    cooking_method: 'steamed',
    prep_time_min: 30,
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
    allergens: ['shellfish', 'dairy'],
    tags: ['shellfish', 'zeeland', 'seasonal'],
    popularity: 85,
    ingredients: ['ING_MUSSELS', 'ING_CELERY', 'ING_LEEK', 'ING_ONION', 'ING_WHITE_WINE', 'ING_BUTTER', 'ING_PARSLEY', 'ING_BAY_LEAVES', 'ING_BLACK_PEPPER']
  }
];
