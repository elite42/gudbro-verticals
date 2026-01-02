// Hawaiian Noodle Dishes
// Saimin and other noodle favorites

import { HawaiianDish } from '../types';

export const noodles: HawaiianDish[] = [
  {
    id: 'HI_SAIMIN',
    slug: 'saimin',
    name: 'Saimin',
    description: 'Hawaii\'s unique noodle soup: thin wheat noodles in dashi broth with kamaboko, char siu, and green onions. A plantation-era creation now served everywhere, even McDonald\'s.',
    category: 'noodles',
    status: 'iconic',
    region: 'Statewide',
    protein_type: 'pork',
    cooking_method: 'boiled',
    prep_time_min: 20,
    spice_level: 0,
    dietary: {
      is_vegetarian: false,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: true,
    },
    allergens: ['gluten', 'fish', 'soy'],
    tags: ['soup', 'noodles', 'plantation_era', 'comfort_food'],
    popularity: 90,
    ingredients: [
      { id: 'ING_EGG_NOODLES', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_DASHI', role: 'secondary', quantity_amount: 500, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_CHAR_SIU', role: 'secondary', quantity_amount: 80, quantity_unit: 'g', is_optional: false },
      { id: 'ING_KAMABOKO', role: 'secondary', quantity_amount: 50, quantity_unit: 'g', is_optional: false },
      { id: 'ING_EGG', role: 'secondary', quantity_amount: 1, quantity_unit: 'unit', is_optional: true },
      { id: 'ING_SCALLION', role: 'garnish', quantity_amount: 30, quantity_unit: 'g', is_optional: false },
      { id: 'ING_NORI', role: 'garnish', quantity_amount: 5, quantity_unit: 'g', is_optional: true },
    ],
  },
  {
    id: 'HI_FRIED_SAIMIN',
    slug: 'fried-saimin',
    name: 'Fried Saimin',
    description: 'Dry-style saimin: noodles stir-fried with vegetables, egg, and char siu in a savory sauce. A popular variation of the classic soup.',
    category: 'noodles',
    status: 'classic',
    region: 'Statewide',
    protein_type: 'pork',
    cooking_method: 'stir_fried',
    prep_time_min: 20,
    spice_level: 0,
    dietary: {
      is_vegetarian: false,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: true,
    },
    allergens: ['gluten', 'soy', 'eggs'],
    tags: ['noodles', 'stir_fried', 'quick'],
    popularity: 78,
    ingredients: [
      { id: 'ING_EGG_NOODLES', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_CHAR_SIU', role: 'secondary', quantity_amount: 80, quantity_unit: 'g', is_optional: false },
      { id: 'ING_EGG', role: 'secondary', quantity_amount: 2, quantity_unit: 'unit', is_optional: false },
      { id: 'ING_CABBAGE', role: 'secondary', quantity_amount: 100, quantity_unit: 'g', is_optional: false },
      { id: 'ING_SCALLION', role: 'secondary', quantity_amount: 30, quantity_unit: 'g', is_optional: false },
      { id: 'ING_OYSTER_SAUCE', role: 'seasoning', quantity_amount: 30, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_SOY_SAUCE', role: 'seasoning', quantity_amount: 15, quantity_unit: 'ml', is_optional: false },
    ],
  },
];
