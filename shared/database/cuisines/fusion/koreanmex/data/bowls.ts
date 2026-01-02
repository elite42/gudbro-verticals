// Korean-Mexican Fusion Bowls
// Rice and grain bowls with fusion flavors

import { KoreanMexDish } from '../types';

export const bowls: KoreanMexDish[] = [
  {
    id: 'KMX_BULGOGI_BOWL',
    slug: 'bulgogi-bowl',
    name: 'Bulgogi Bowl',
    description: 'Bulgogi beef over cilantro lime rice with black beans, pico de gallo, and gochujang drizzle',
    category: 'bowl',
    status: 'iconic',
    protein_type: 'beef',
    cooking_method: 'grilled',
    prep_time_min: 25,
    spice_level: 2,
    dietary: { gluten_free: true },
    allergens: ['soy', 'sesame'],
    tags: ['signature', 'healthy', 'popular'],
    popularity: 95,
    ingredients: ['ING_BEEF', 'ING_RICE', 'ING_BLACK_BEAN', 'ING_TOMATO', 'ING_ONION', 'ING_CILANTRO', 'ING_LIME', 'ING_GOCHUJANG', 'ING_SOY_SAUCE', 'ING_SESAME']
  },
  {
    id: 'KMX_BIBIMBAP_BOWL',
    slug: 'korean-mex-bibimbap',
    name: 'Korean-Mex Bibimbap',
    description: 'Traditional bibimbap with Mexican twist: chorizo, avocado, pico, and fried egg',
    category: 'bowl',
    status: 'modern',
    protein_type: 'mixed',
    cooking_method: 'mixed',
    prep_time_min: 30,
    spice_level: 3,
    dietary: { gluten_free: false },
    allergens: ['soy', 'sesame', 'egg'],
    tags: ['fusion', 'creative', 'instagram'],
    popularity: 88,
    ingredients: ['ING_RICE', 'ING_CHORIZO', 'ING_EGG', 'ING_AVOCADO', 'ING_SPINACH', 'ING_CARROT', 'ING_BEAN_SPROUTS', 'ING_GOCHUJANG', 'ING_SESAME_OIL', 'ING_TOMATO']
  },
  {
    id: 'KMX_CARNITAS_BOWL',
    slug: 'korean-carnitas-bowl',
    name: 'Korean Carnitas Bowl',
    description: 'Slow-cooked pork with kimchi, pickled jalapeños, and Korean BBQ sauce over rice',
    category: 'bowl',
    status: 'classic',
    protein_type: 'pork',
    cooking_method: 'braised',
    prep_time_min: 35,
    spice_level: 3,
    dietary: { gluten_free: false },
    allergens: ['soy', 'sesame'],
    tags: ['slow-cooked', 'tender', 'comfort'],
    popularity: 90,
    ingredients: ['ING_PORK_SHOULDER', 'ING_RICE', 'ING_KIMCHI', 'ING_JALAPENO', 'ING_SOY_SAUCE', 'ING_BROWN_SUGAR', 'ING_GARLIC', 'ING_GINGER', 'ING_SCALLION']
  },
  {
    id: 'KMX_VEGGIE_BOWL',
    slug: 'korean-mex-veggie-bowl',
    name: 'Korean-Mex Veggie Bowl',
    description: 'Grilled vegetables with tofu, black beans, kimchi, avocado, and gochujang dressing',
    category: 'bowl',
    status: 'modern',
    protein_type: 'vegetable',
    cooking_method: 'grilled',
    prep_time_min: 20,
    spice_level: 2,
    dietary: { vegetarian: true, vegan: true, gluten_free: true },
    allergens: ['soy', 'sesame'],
    tags: ['vegan', 'healthy', 'colorful'],
    popularity: 82,
    ingredients: ['ING_RICE', 'ING_TOFU', 'ING_BLACK_BEAN', 'ING_AVOCADO', 'ING_KIMCHI', 'ING_BELL_PEPPER', 'ING_ZUCCHINI', 'ING_CORN', 'ING_GOCHUJANG', 'ING_LIME']
  }
];
