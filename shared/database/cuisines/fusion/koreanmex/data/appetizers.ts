// Korean-Mexican Fusion Appetizers
// Shareable fusion starters

import { KoreanMexDish } from '../types';

export const appetizers: KoreanMexDish[] = [
  {
    id: 'KMX_KOREAN_NACHOS',
    slug: 'korean-nachos',
    name: 'Korean BBQ Nachos',
    description: 'Wonton chips topped with bulgogi, kimchi, gochujang queso, and pickled jalapeños',
    category: 'appetizer',
    status: 'iconic',
    protein_type: 'beef',
    cooking_method: 'baked',
    prep_time_min: 25,
    spice_level: 3,
    dietary: { gluten_free: false },
    allergens: ['gluten', 'dairy', 'soy', 'sesame'],
    tags: ['shareable', 'party', 'popular'],
    popularity: 94,
    ingredients: ['ING_WONTON_WRAPPER', 'ING_BEEF', 'ING_KIMCHI', 'ING_GOCHUJANG', 'ING_CHEESE', 'ING_JALAPENO', 'ING_SCALLION', 'ING_SESAME', 'ING_SOUR_CREAM']
  },
  {
    id: 'KMX_KIMCHI_FRIES',
    slug: 'kimchi-fries',
    name: 'Kimchi Fries',
    description: 'Crispy fries loaded with spicy pork, kimchi, cheese sauce, and gochujang mayo',
    category: 'appetizer',
    status: 'iconic',
    protein_type: 'pork',
    cooking_method: 'deep_fried',
    prep_time_min: 20,
    spice_level: 3,
    dietary: { gluten_free: false },
    allergens: ['dairy', 'soy', 'egg'],
    tags: ['loaded', 'indulgent', 'street-food'],
    popularity: 96,
    ingredients: ['ING_POTATO', 'ING_PORK', 'ING_KIMCHI', 'ING_CHEESE', 'ING_GOCHUJANG', 'ING_MAYONNAISE', 'ING_SCALLION', 'ING_SESAME']
  },
  {
    id: 'KMX_KOREAN_ELOTE',
    slug: 'korean-elote',
    name: 'Korean Street Corn',
    description: 'Grilled corn with gochujang butter, cotija cheese, and toasted sesame',
    category: 'appetizer',
    status: 'modern',
    protein_type: 'vegetable',
    cooking_method: 'grilled',
    prep_time_min: 15,
    spice_level: 2,
    dietary: { vegetarian: true, gluten_free: true },
    allergens: ['dairy', 'sesame'],
    tags: ['elote', 'street-food', 'summer'],
    popularity: 88,
    ingredients: ['ING_CORN', 'ING_BUTTER', 'ING_GOCHUJANG', 'ING_COTIJA_CHEESE', 'ING_MAYONNAISE', 'ING_LIME', 'ING_SESAME', 'ING_CILANTRO']
  }
];
