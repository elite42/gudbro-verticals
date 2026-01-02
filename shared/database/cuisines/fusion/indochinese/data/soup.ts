// Indo-Chinese Soups
// Hot and sour soups, corn soups, and more

import { IndoChineseDish } from '../types';

export const soup: IndoChineseDish[] = [
  {
    id: 'IND_VEG_HOT_SOUR_SOUP',
    slug: 'veg-hot-sour-soup',
    name: 'Veg Hot and Sour Soup',
    description: 'Tangy soup with vegetables, tofu, and a spicy kick',
    category: 'soup',
    status: 'iconic',
    protein_type: 'vegetable',
    cooking_method: 'simmered',
    prep_time_min: 20,
    spice_level: 3,
    dietary: { vegetarian: true, vegan: true, gluten_free: false },
    allergens: ['soy', 'gluten'],
    tags: ['signature', 'tangy', 'popular'],
    popularity: 92,
    ingredients: ['ING_CABBAGE', 'ING_CARROT', 'ING_MUSHROOM', 'ING_TOFU', 'ING_SOY_SAUCE', 'ING_VINEGAR', 'ING_CHILI_SAUCE', 'ING_CORN_STARCH', 'ING_SCALLION', 'ING_WHITE_PEPPER']
  },
  {
    id: 'IND_CHICKEN_HOT_SOUR_SOUP',
    slug: 'chicken-hot-sour-soup',
    name: 'Chicken Hot and Sour Soup',
    description: 'Classic hot and sour soup with shredded chicken',
    category: 'soup',
    status: 'iconic',
    protein_type: 'chicken',
    cooking_method: 'simmered',
    prep_time_min: 25,
    spice_level: 3,
    dietary: { gluten_free: false },
    allergens: ['soy', 'gluten'],
    tags: ['chicken', 'tangy', 'warming'],
    popularity: 90,
    ingredients: ['ING_CHICKEN_BREAST', 'ING_CABBAGE', 'ING_CARROT', 'ING_MUSHROOM', 'ING_SOY_SAUCE', 'ING_VINEGAR', 'ING_CHILI_SAUCE', 'ING_CORN_STARCH', 'ING_EGG', 'ING_WHITE_PEPPER']
  },
  {
    id: 'IND_SWEET_CORN_SOUP_VEG',
    slug: 'sweet-corn-soup-veg',
    name: 'Sweet Corn Soup (Veg)',
    description: 'Creamy corn soup with vegetables, Indo-Chinese style',
    category: 'soup',
    status: 'classic',
    protein_type: 'vegetable',
    cooking_method: 'simmered',
    prep_time_min: 15,
    spice_level: 1,
    dietary: { vegetarian: true, gluten_free: false },
    allergens: ['gluten'],
    tags: ['sweet', 'corn', 'mild'],
    popularity: 85,
    ingredients: ['ING_CORN', 'ING_CARROT', 'ING_CABBAGE', 'ING_CORN_STARCH', 'ING_SOY_SAUCE', 'ING_WHITE_PEPPER', 'ING_SCALLION', 'ING_VEGETABLE_OIL']
  },
  {
    id: 'IND_SWEET_CORN_CHICKEN_SOUP',
    slug: 'sweet-corn-chicken-soup',
    name: 'Sweet Corn Chicken Soup',
    description: 'Creamy corn soup with shredded chicken',
    category: 'soup',
    status: 'classic',
    protein_type: 'chicken',
    cooking_method: 'simmered',
    prep_time_min: 20,
    spice_level: 1,
    dietary: { gluten_free: false },
    allergens: ['gluten'],
    tags: ['chicken', 'corn', 'creamy'],
    popularity: 88,
    ingredients: ['ING_CORN', 'ING_CHICKEN_BREAST', 'ING_CARROT', 'ING_CORN_STARCH', 'ING_SOY_SAUCE', 'ING_WHITE_PEPPER', 'ING_EGG', 'ING_SCALLION']
  },
  {
    id: 'IND_MANCHOW_SOUP',
    slug: 'manchow-soup',
    name: 'Manchow Soup',
    description: 'Spicy vegetable soup topped with crispy fried noodles',
    category: 'soup',
    status: 'iconic',
    protein_type: 'vegetable',
    cooking_method: 'simmered',
    prep_time_min: 25,
    spice_level: 3,
    dietary: { vegetarian: true, vegan: true, gluten_free: false },
    allergens: ['soy', 'gluten'],
    tags: ['spicy', 'crispy-noodles', 'signature'],
    popularity: 90,
    ingredients: ['ING_CABBAGE', 'ING_CARROT', 'ING_BELL_PEPPER', 'ING_MUSHROOM', 'ING_CHOW_MEIN_NOODLES', 'ING_SOY_SAUCE', 'ING_CHILI_SAUCE', 'ING_VINEGAR', 'ING_CORN_STARCH', 'ING_GARLIC', 'ING_SCALLION']
  }
];
