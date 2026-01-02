// Korean-Mexican Fusion Tacos
// The iconic dish that started the fusion movement

import { KoreanMexDish } from '../types';

export const tacos: KoreanMexDish[] = [
  {
    id: 'KMX_BULGOGI_TACO',
    slug: 'bulgogi-taco',
    name: 'Bulgogi Taco',
    description: 'Grilled marinated beef bulgogi in corn tortilla with kimchi, cilantro, and gochujang crema',
    category: 'taco',
    status: 'iconic',
    protein_type: 'beef',
    cooking_method: 'grilled',
    prep_time_min: 25,
    spice_level: 2,
    dietary: { gluten_free: false },
    allergens: ['soy', 'sesame', 'dairy'],
    tags: ['signature', 'kogi-style', 'street-food'],
    popularity: 98,
    ingredients: ['ING_BEEF', 'ING_CORN_TORTILLA', 'ING_KIMCHI', 'ING_CILANTRO', 'ING_GOCHUJANG', 'ING_SOUR_CREAM', 'ING_SOY_SAUCE', 'ING_SESAME_OIL', 'ING_GARLIC', 'ING_SCALLION']
  },
  {
    id: 'KMX_SPICY_PORK_TACO',
    slug: 'spicy-pork-taco',
    name: 'Spicy Pork Taco',
    description: 'Gochujang-marinated pork with pickled daikon, salsa verde, and sesame seeds',
    category: 'taco',
    status: 'iconic',
    protein_type: 'pork',
    cooking_method: 'grilled',
    prep_time_min: 30,
    spice_level: 4,
    dietary: { gluten_free: false },
    allergens: ['soy', 'sesame'],
    tags: ['spicy', 'popular', 'street-food'],
    popularity: 95,
    ingredients: ['ING_PORK', 'ING_CORN_TORTILLA', 'ING_GOCHUJANG', 'ING_DAIKON', 'ING_TOMATILLO', 'ING_SESAME', 'ING_LIME', 'ING_GARLIC', 'ING_GINGER']
  },
  {
    id: 'KMX_KOREAN_CHICKEN_TACO',
    slug: 'korean-chicken-taco',
    name: 'Korean Fried Chicken Taco',
    description: 'Crispy Korean fried chicken with spicy mayo, pickled vegetables, and sesame',
    category: 'taco',
    status: 'iconic',
    protein_type: 'chicken',
    cooking_method: 'deep_fried',
    prep_time_min: 35,
    spice_level: 3,
    dietary: { gluten_free: false },
    allergens: ['gluten', 'soy', 'egg', 'sesame'],
    tags: ['crispy', 'kfc-style', 'popular'],
    popularity: 94,
    ingredients: ['ING_CHICKEN_THIGH', 'ING_CORN_TORTILLA', 'ING_GOCHUGARU', 'ING_MAYONNAISE', 'ING_CABBAGE', 'ING_CARROT', 'ING_SESAME', 'ING_RICE_VINEGAR', 'ING_CORN_STARCH']
  },
  {
    id: 'KMX_SHORT_RIB_TACO',
    slug: 'short-rib-taco',
    name: 'Galbi Short Rib Taco',
    description: 'Tender Korean BBQ short ribs with ssam-style toppings and salsa roja',
    category: 'taco',
    status: 'classic',
    protein_type: 'beef',
    cooking_method: 'grilled',
    prep_time_min: 40,
    spice_level: 2,
    dietary: { gluten_free: false },
    allergens: ['soy', 'sesame'],
    tags: ['premium', 'galbi', 'bbq'],
    popularity: 92,
    ingredients: ['ING_BEEF_SHORT_RIBS', 'ING_CORN_TORTILLA', 'ING_SOY_SAUCE', 'ING_SESAME_OIL', 'ING_PEAR', 'ING_TOMATO', 'ING_ONION', 'ING_GARLIC', 'ING_LETTUCE']
  },
  {
    id: 'KMX_TOFU_TACO',
    slug: 'tofu-taco',
    name: 'Spicy Tofu Taco',
    description: 'Crispy gochujang-glazed tofu with kimchi slaw and avocado crema',
    category: 'taco',
    status: 'modern',
    protein_type: 'tofu',
    cooking_method: 'pan_fried',
    prep_time_min: 25,
    spice_level: 3,
    dietary: { vegetarian: true, vegan: true, gluten_free: false },
    allergens: ['soy', 'sesame'],
    tags: ['vegetarian', 'vegan', 'healthy'],
    popularity: 85,
    ingredients: ['ING_TOFU', 'ING_CORN_TORTILLA', 'ING_GOCHUJANG', 'ING_KIMCHI', 'ING_AVOCADO', 'ING_CABBAGE', 'ING_LIME', 'ING_SESAME', 'ING_SCALLION']
  }
];
