// Belgian Waffles
// GUDBRO Database Standards v1.7

import { BelgianDish } from '../types';

export const belgianWaffles: BelgianDish[] = [
  {
    id: 'BEL_WAFFLE_LIEGE',
    slug: 'liege-waffle',
    name: 'Liège Waffle',
    local_name: 'Gaufre de Liège',
    description: 'Dense, chewy waffle with pearl sugar that caramelizes on the outside, eaten plain or with toppings',
    category: 'waffles',
    region: 'liege',
    status: 'iconic',
    protein_type: null,
    cooking_method: 'grilled',
    prep_time_min: 120,
    spice_level: 0,
    price_default: 5.99,
    dietary: {
      is_vegan: false,
      is_vegetarian: true,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true
    },
    allergens: ['gluten', 'dairy', 'eggs'],
    intolerances: [],
    ingredient_ids: ['ING_FLOUR', 'ING_BUTTER', 'ING_EGG', 'ING_PEARL_SUGAR', 'ING_YEAST', 'ING_MILK', 'ING_VANILLA'],
    tags: ['iconic', 'liege', 'sweet', 'street_food', 'breakfast'],
    popularity: 96
  },
  {
    id: 'BEL_WAFFLE_BRUSSELS',
    slug: 'brussels-waffle',
    name: 'Brussels Waffle',
    local_name: 'Gaufre de Bruxelles',
    description: 'Light, crispy rectangular waffle with deep pockets, traditionally served with powdered sugar or whipped cream',
    category: 'waffles',
    region: 'brussels',
    status: 'iconic',
    protein_type: null,
    cooking_method: 'grilled',
    prep_time_min: 30,
    spice_level: 0,
    price_default: 6.99,
    dietary: {
      is_vegan: false,
      is_vegetarian: true,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true
    },
    allergens: ['gluten', 'dairy', 'eggs'],
    intolerances: [],
    ingredient_ids: ['ING_FLOUR', 'ING_BUTTER', 'ING_EGG', 'ING_MILK', 'ING_SUGAR', 'ING_BAKING_POWDER', 'ING_VANILLA', 'ING_POWDERED_SUGAR'],
    tags: ['iconic', 'brussels', 'light', 'crispy', 'breakfast'],
    popularity: 94
  },
  {
    id: 'BEL_WAFFLE_CHOCOLATE',
    slug: 'chocolate-waffle',
    name: 'Chocolate Belgian Waffle',
    local_name: 'Gaufre au Chocolat',
    description: 'Belgian waffle generously topped with warm Belgian chocolate sauce and whipped cream',
    category: 'waffles',
    region: 'nationwide',
    status: 'classic',
    protein_type: null,
    cooking_method: 'grilled',
    prep_time_min: 30,
    spice_level: 0,
    price_default: 8.99,
    dietary: {
      is_vegan: false,
      is_vegetarian: true,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true
    },
    allergens: ['gluten', 'dairy', 'eggs'],
    intolerances: [],
    ingredient_ids: ['ING_FLOUR', 'ING_BUTTER', 'ING_EGG', 'ING_MILK', 'ING_BELGIAN_CHOCOLATE', 'ING_HEAVY_CREAM', 'ING_VANILLA'],
    tags: ['classic', 'chocolate', 'indulgent', 'dessert'],
    popularity: 92
  },
  {
    id: 'BEL_WAFFLE_STRAWBERRY',
    slug: 'strawberry-waffle',
    name: 'Strawberry Belgian Waffle',
    local_name: 'Gaufre aux Fraises',
    description: 'Brussels waffle topped with fresh strawberries, whipped cream and chocolate drizzle',
    category: 'waffles',
    region: 'nationwide',
    status: 'classic',
    protein_type: null,
    cooking_method: 'grilled',
    prep_time_min: 30,
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
    allergens: ['gluten', 'dairy', 'eggs'],
    intolerances: [],
    ingredient_ids: ['ING_FLOUR', 'ING_BUTTER', 'ING_EGG', 'ING_MILK', 'ING_STRAWBERRY', 'ING_HEAVY_CREAM', 'ING_BELGIAN_CHOCOLATE'],
    tags: ['classic', 'fruit', 'fresh', 'popular'],
    popularity: 88
  }
];
