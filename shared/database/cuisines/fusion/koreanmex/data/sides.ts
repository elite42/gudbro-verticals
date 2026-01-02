// Korean-Mexican Fusion Sides
// Complementary fusion dishes

import { KoreanMexDish } from '../types';

export const sides: KoreanMexDish[] = [
  {
    id: 'KMX_KIMCHI_RICE',
    slug: 'kimchi-fried-rice-mex',
    name: 'Mexican Kimchi Fried Rice',
    description: 'Kimchi fried rice with chorizo, jalapeños, and a fried egg',
    category: 'side',
    status: 'classic',
    protein_type: 'pork',
    cooking_method: 'stir_fried',
    prep_time_min: 20,
    spice_level: 3,
    dietary: { gluten_free: true },
    allergens: ['soy', 'egg', 'sesame'],
    tags: ['rice', 'spicy', 'comfort'],
    popularity: 90,
    ingredients: ['ING_RICE', 'ING_KIMCHI', 'ING_CHORIZO', 'ING_EGG', 'ING_JALAPENO', 'ING_SCALLION', 'ING_SESAME_OIL', 'ING_SOY_SAUCE', 'ING_GARLIC']
  },
  {
    id: 'KMX_FUSION_SLAW',
    slug: 'korean-mex-slaw',
    name: 'Korean-Mex Slaw',
    description: 'Crunchy cabbage slaw with gochujang-lime dressing and cilantro',
    category: 'side',
    status: 'classic',
    protein_type: 'vegetable',
    cooking_method: 'raw',
    prep_time_min: 10,
    spice_level: 2,
    dietary: { vegetarian: true, vegan: true, gluten_free: true },
    allergens: ['sesame'],
    tags: ['fresh', 'crunchy', 'healthy'],
    popularity: 85,
    ingredients: ['ING_CABBAGE', 'ING_CARROT', 'ING_CILANTRO', 'ING_GOCHUJANG', 'ING_LIME', 'ING_RICE_VINEGAR', 'ING_SESAME_OIL', 'ING_SESAME']
  },
  {
    id: 'KMX_KOREAN_GUACAMOLE',
    slug: 'korean-guacamole',
    name: 'Korean Guacamole',
    description: 'Creamy guacamole with kimchi, gochugaru, and sesame seeds',
    category: 'side',
    status: 'modern',
    protein_type: 'vegetable',
    cooking_method: 'raw',
    prep_time_min: 10,
    spice_level: 3,
    dietary: { vegetarian: true, vegan: true, gluten_free: true },
    allergens: ['sesame'],
    tags: ['dip', 'avocado', 'creative'],
    popularity: 86,
    ingredients: ['ING_AVOCADO', 'ING_KIMCHI', 'ING_GOCHUGARU', 'ING_LIME', 'ING_CILANTRO', 'ING_ONION', 'ING_SESAME', 'ING_SALT']
  }
];
