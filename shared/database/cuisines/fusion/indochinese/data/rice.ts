// Indo-Chinese Fried Rice
// Hakka-style fried rice dishes

import { IndoChineseDish } from '../types';

export const rice: IndoChineseDish[] = [
  {
    id: 'IND_VEG_FRIED_RICE',
    slug: 'veg-fried-rice',
    name: 'Veg Fried Rice',
    description: 'Classic Indo-Chinese fried rice with mixed vegetables and soy sauce',
    category: 'rice',
    status: 'iconic',
    protein_type: 'vegetable',
    cooking_method: 'stir_fried',
    prep_time_min: 20,
    spice_level: 2,
    dietary: { vegetarian: true, vegan: true, gluten_free: false },
    allergens: ['soy'],
    tags: ['signature', 'popular', 'quick'],
    popularity: 95,
    ingredients: ['ING_RICE', 'ING_CABBAGE', 'ING_CARROT', 'ING_BELL_PEPPER', 'ING_ONION', 'ING_GARLIC', 'ING_SOY_SAUCE', 'ING_VINEGAR', 'ING_SCALLION', 'ING_VEGETABLE_OIL']
  },
  {
    id: 'IND_CHICKEN_FRIED_RICE',
    slug: 'chicken-fried-rice',
    name: 'Chicken Fried Rice',
    description: 'Fried rice with diced chicken and Indo-Chinese seasonings',
    category: 'rice',
    status: 'iconic',
    protein_type: 'chicken',
    cooking_method: 'stir_fried',
    prep_time_min: 25,
    spice_level: 2,
    dietary: { gluten_free: false },
    allergens: ['soy'],
    tags: ['chicken', 'popular', 'main-course'],
    popularity: 93,
    ingredients: ['ING_RICE', 'ING_CHICKEN_BREAST', 'ING_CABBAGE', 'ING_CARROT', 'ING_BELL_PEPPER', 'ING_ONION', 'ING_GARLIC', 'ING_SOY_SAUCE', 'ING_SCALLION', 'ING_VEGETABLE_OIL']
  },
  {
    id: 'IND_EGG_FRIED_RICE',
    slug: 'egg-fried-rice',
    name: 'Egg Fried Rice',
    description: 'Fried rice with scrambled eggs and vegetables',
    category: 'rice',
    status: 'classic',
    protein_type: 'egg',
    cooking_method: 'stir_fried',
    prep_time_min: 20,
    spice_level: 1,
    dietary: { vegetarian: true, gluten_free: false },
    allergens: ['soy', 'egg'],
    tags: ['egg', 'quick', 'classic'],
    popularity: 90,
    ingredients: ['ING_RICE', 'ING_EGG', 'ING_CABBAGE', 'ING_CARROT', 'ING_BELL_PEPPER', 'ING_ONION', 'ING_GARLIC', 'ING_SOY_SAUCE', 'ING_SCALLION', 'ING_VEGETABLE_OIL']
  },
  {
    id: 'IND_SCHEZWAN_FRIED_RICE',
    slug: 'schezwan-fried-rice',
    name: 'Schezwan Fried Rice',
    description: 'Spicy fried rice with fiery Schezwan sauce',
    category: 'rice',
    status: 'iconic',
    protein_type: 'vegetable',
    cooking_method: 'stir_fried',
    prep_time_min: 20,
    spice_level: 4,
    dietary: { vegetarian: true, vegan: true, gluten_free: false },
    allergens: ['soy'],
    tags: ['spicy', 'schezwan', 'popular'],
    popularity: 92,
    ingredients: ['ING_RICE', 'ING_SCHEZWAN_SAUCE', 'ING_CABBAGE', 'ING_CARROT', 'ING_BELL_PEPPER', 'ING_ONION', 'ING_GARLIC', 'ING_GREEN_CHILI', 'ING_SCALLION', 'ING_VEGETABLE_OIL']
  },
  {
    id: 'IND_MANCHURIAN_FRIED_RICE',
    slug: 'manchurian-fried-rice',
    name: 'Manchurian Fried Rice',
    description: 'Fried rice topped with vegetable Manchurian balls',
    category: 'rice',
    status: 'classic',
    protein_type: 'vegetable',
    cooking_method: 'stir_fried',
    prep_time_min: 35,
    spice_level: 3,
    dietary: { vegetarian: true, vegan: true, gluten_free: false },
    allergens: ['soy', 'gluten'],
    tags: ['combo', 'manchurian', 'popular'],
    popularity: 88,
    ingredients: ['ING_RICE', 'ING_CABBAGE', 'ING_CARROT', 'ING_BELL_PEPPER', 'ING_CORN_STARCH', 'ING_SOY_SAUCE', 'ING_CHILI_SAUCE', 'ING_GARLIC', 'ING_GINGER', 'ING_SCALLION', 'ING_VEGETABLE_OIL']
  }
];
