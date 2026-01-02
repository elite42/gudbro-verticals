// Russian Salads
// GUDBRO Database Standards v1.7

import { RussianDish } from '../types';

export const russianSalads: RussianDish[] = [
  {
    id: 'RUS_OLIVIER',
    slug: 'olivier-salad',
    name: 'Olivier Salad',
    local_name: 'Салат Оливье',
    description: 'Classic Russian salad with diced potatoes, carrots, peas, pickles, eggs, and mayonnaise, New Year essential',
    category: 'salads',
    region: 'moscow',
    status: 'classic',
    protein_type: 'mixed',
    cooking_method: 'mixed',
    prep_time_min: 60,
    spice_level: 0,
    price_default: 9.99,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: ['eggs'],
    intolerances: [],
    ingredient_ids: ['ING_POTATO', 'ING_CARROT', 'ING_PEA', 'ING_PICKLE', 'ING_EGG', 'ING_HAM', 'ING_MAYONNAISE', 'ING_SCALLION'],
    tags: ['new_year', 'iconic', 'festive'],
    popularity: 95
  },
  {
    id: 'RUS_VINEGRET',
    slug: 'vinegret',
    name: 'Vinegret',
    local_name: 'Винегрет',
    description: 'Colorful beet salad with potatoes, carrots, pickles, sauerkraut, and sunflower oil dressing',
    category: 'salads',
    region: 'nationwide',
    status: 'classic',
    protein_type: null,
    cooking_method: 'mixed',
    prep_time_min: 45,
    spice_level: 0,
    price_default: 7.99,
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
    intolerances: [],
    ingredient_ids: ['ING_BEET', 'ING_POTATO', 'ING_CARROT', 'ING_PICKLE', 'ING_SAUERKRAUT', 'ING_ONION', 'ING_SUNFLOWER_OIL'],
    tags: ['vegan', 'healthy', 'colorful'],
    popularity: 85
  },
  {
    id: 'RUS_MIMOSA',
    slug: 'mimosa-salad',
    name: 'Mimosa Salad',
    local_name: 'Салат Мимоза',
    description: 'Layered salad with canned fish, potatoes, carrots, eggs, and cheese, topped with grated egg yolk',
    category: 'salads',
    region: 'nationwide',
    status: 'traditional',
    protein_type: 'fish',
    cooking_method: 'layered',
    prep_time_min: 60,
    spice_level: 0,
    price_default: 9.99,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['fish', 'eggs', 'dairy'],
    intolerances: [],
    ingredient_ids: ['ING_CANNED_TUNA', 'ING_POTATO', 'ING_CARROT', 'ING_EGG', 'ING_CHEESE', 'ING_MAYONNAISE', 'ING_ONION'],
    tags: ['festive', 'layered_salad', 'elegant'],
    popularity: 78
  },
  {
    id: 'RUS_SUNFLOWER',
    slug: 'sunflower-salad',
    name: 'Sunflower Salad',
    local_name: 'Салат Подсолнух',
    description: 'Decorative layered salad shaped like a sunflower with chicken, mushrooms, and chips as petals',
    category: 'salads',
    region: 'nationwide',
    status: 'popular',
    protein_type: 'chicken',
    cooking_method: 'layered',
    prep_time_min: 60,
    spice_level: 0,
    price_default: 10.99,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['eggs', 'dairy', 'gluten'],
    intolerances: [],
    ingredient_ids: ['ING_CHICKEN', 'ING_MUSHROOM', 'ING_EGG', 'ING_CHEESE', 'ING_MAYONNAISE', 'ING_OLIVE', 'ING_POTATO_CHIP'],
    tags: ['decorative', 'festive', 'creative'],
    popularity: 72
  }
];
