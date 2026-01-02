// Belgian Frites & Fritkot Snacks
// GUDBRO Database Standards v1.7

import { BelgianDish } from '../types';

export const belgianFrites: BelgianDish[] = [
  {
    id: 'BEL_FRITES',
    slug: 'belgian-frites',
    name: 'Belgian Frites',
    local_name: 'Frieten / Frites',
    description: 'Authentic Belgian fries double-fried in beef tallow for extra crispiness, served in a paper cone with sauce',
    category: 'frites',
    region: 'nationwide',
    status: 'iconic',
    protein_type: null,
    cooking_method: 'deep_fried',
    prep_time_min: 25,
    spice_level: 0,
    price_default: 4.99,
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
    intolerances: [],
    ingredient_ids: ['ING_POTATO', 'ING_BEEF_TALLOW', 'ING_SALT'],
    tags: ['iconic', 'national', 'street_food', 'crispy'],
    popularity: 99
  },
  {
    id: 'BEL_FRICADELLE',
    slug: 'fricadelle',
    name: 'Fricadelle',
    local_name: 'Frikandel / Fricadelle',
    description: 'Deep-fried minced meat sausage, a classic fritkot snack served with frites and sauce',
    category: 'frites',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'mixed',
    cooking_method: 'deep_fried',
    prep_time_min: 15,
    spice_level: 0,
    price_default: 3.99,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: ['gluten'],
    intolerances: [],
    ingredient_ids: ['ING_GROUND_BEEF', 'ING_GROUND_PORK', 'ING_BREADCRUMB', 'ING_ONION', 'ING_NUTMEG', 'ING_WHITE_PEPPER'],
    tags: ['classic', 'street_food', 'fritkot', 'snack'],
    popularity: 88
  },
  {
    id: 'BEL_MITRAILLETTE',
    slug: 'mitraillette',
    name: 'Mitraillette',
    local_name: 'Mitraillette',
    description: 'Belgian street food: a baguette stuffed with meat (fricadelle, burger), frites and generous amounts of sauce',
    category: 'frites',
    region: 'wallonia',
    status: 'classic',
    protein_type: 'mixed',
    cooking_method: 'assembled',
    prep_time_min: 15,
    spice_level: 0,
    price_default: 8.99,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: ['gluten', 'eggs'],
    intolerances: [],
    ingredient_ids: ['ING_BAGUETTE', 'ING_GROUND_BEEF', 'ING_POTATO', 'ING_MAYONNAISE', 'ING_ONION', 'ING_LETTUCE'],
    tags: ['classic', 'wallonia', 'street_food', 'hearty'],
    popularity: 82
  },
  {
    id: 'BEL_FRITES_STOOFVLEES',
    slug: 'frites-stoofvlees',
    name: 'Frites met Stoofvlees',
    local_name: 'Frieten met Stoofvlees',
    description: 'Belgian frites served with rich Flemish beef stew (stoofvlees) and mayonnaise',
    category: 'frites',
    region: 'flanders',
    status: 'classic',
    protein_type: 'beef',
    cooking_method: 'braised',
    prep_time_min: 180,
    spice_level: 0,
    price_default: 14.99,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: ['gluten', 'eggs'],
    intolerances: [],
    ingredient_ids: ['ING_POTATO', 'ING_BEEF_CHUCK', 'ING_BELGIAN_BEER', 'ING_ONION', 'ING_DIJON_MUSTARD', 'ING_BEEF_TALLOW', 'ING_MAYONNAISE'],
    tags: ['flemish', 'comfort_food', 'hearty', 'classic'],
    popularity: 90
  }
];
