// Australian Breads
// Damper, Fairy Bread, and traditional baked goods

import { AustralianDish } from '../types';

export const bread: AustralianDish[] = [
  {
    id: 'AU_DAMPER',
    slug: 'damper',
    name: 'Damper',
    description: 'Traditional Australian soda bread originally baked in the coals of a campfire by stockmen and swagmen. A simple, dense bread made with flour, water, and salt.',
    category: 'bread',
    status: 'traditional',
    region: 'Outback',
    cooking_method: 'baked',
    prep_time_min: 45,
    spice_level: 0,
    dietary: {
      is_vegetarian: true,
      is_vegan: true,
      is_gluten_free: false,
      is_dairy_free: true,
    },
    allergens: ['gluten'],
    tags: ['bush_cooking', 'campfire', 'simple'],
    popularity: 72,
    ingredients: [
      { id: 'ING_FLOUR', role: 'main', quantity_amount: 300, quantity_unit: 'g', is_optional: false },
      { id: 'ING_BAKING_POWDER', role: 'secondary', quantity_amount: 10, quantity_unit: 'g', is_optional: false },
      { id: 'ING_SALT', role: 'seasoning', quantity_amount: 5, quantity_unit: 'g', is_optional: false },
      { id: 'ING_WATER', role: 'secondary', quantity_amount: 180, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_BUTTER', role: 'secondary', quantity_amount: 30, quantity_unit: 'g', is_optional: true },
    ],
  },
  {
    id: 'AU_FAIRY_BREAD',
    slug: 'fairy-bread',
    name: 'Fairy Bread',
    description: 'The simplest and most beloved party food in Australia: triangles of white bread spread with butter and covered in colorful hundreds and thousands (sprinkles). A children\'s party staple.',
    category: 'bread',
    status: 'iconic',
    region: 'National',
    cooking_method: 'none',
    prep_time_min: 5,
    spice_level: 0,
    dietary: {
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: false,
    },
    allergens: ['gluten', 'dairy'],
    tags: ['party', 'kids', 'simple', 'colorful'],
    popularity: 88,
    ingredients: [
      { id: 'ING_WHITE_BREAD', role: 'main', quantity_amount: 4, quantity_unit: 'unit', is_optional: false },
      { id: 'ING_BUTTER', role: 'secondary', quantity_amount: 40, quantity_unit: 'g', is_optional: false },
      { id: 'ING_SPRINKLES', role: 'main', quantity_amount: 50, quantity_unit: 'g', is_optional: false },
    ],
  },
];
