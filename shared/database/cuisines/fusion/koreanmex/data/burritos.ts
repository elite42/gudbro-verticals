// Korean-Mexican Fusion Burritos
// Hearty fusion wraps

import { KoreanMexDish } from '../types';

export const burritos: KoreanMexDish[] = [
  {
    id: 'KMX_BULGOGI_BURRITO',
    slug: 'bulgogi-burrito',
    name: 'Bulgogi Burrito',
    description: 'Flour tortilla stuffed with bulgogi beef, kimchi fried rice, beans, and gochujang sauce',
    category: 'burrito',
    status: 'iconic',
    protein_type: 'beef',
    cooking_method: 'grilled',
    prep_time_min: 30,
    spice_level: 2,
    dietary: { gluten_free: false },
    allergens: ['gluten', 'soy', 'sesame'],
    tags: ['hearty', 'popular', 'filling'],
    popularity: 94,
    ingredients: ['ING_BEEF', 'ING_FLOUR_TORTILLA', 'ING_RICE', 'ING_KIMCHI', 'ING_BLACK_BEAN', 'ING_GOCHUJANG', 'ING_SOY_SAUCE', 'ING_CHEESE', 'ING_SOUR_CREAM', 'ING_SCALLION']
  },
  {
    id: 'KMX_SPICY_PORK_BURRITO',
    slug: 'spicy-pork-burrito',
    name: 'Spicy Pork Burrito',
    description: 'Gochujang pork with japchae noodles, pickled vegetables, and queso',
    category: 'burrito',
    status: 'classic',
    protein_type: 'pork',
    cooking_method: 'grilled',
    prep_time_min: 35,
    spice_level: 4,
    dietary: { gluten_free: false },
    allergens: ['gluten', 'soy', 'sesame', 'dairy'],
    tags: ['spicy', 'noodles', 'fusion'],
    popularity: 88,
    ingredients: ['ING_PORK', 'ING_FLOUR_TORTILLA', 'ING_GLASS_NOODLES', 'ING_GOCHUJANG', 'ING_DAIKON', 'ING_CARROT', 'ING_CHEESE', 'ING_SESAME_OIL', 'ING_GARLIC']
  },
  {
    id: 'KMX_CHICKEN_BURRITO',
    slug: 'korean-chicken-burrito',
    name: 'Korean Chicken Burrito',
    description: 'Grilled chicken with gochujang mayo, cilantro lime rice, and Korean pickles',
    category: 'burrito',
    status: 'classic',
    protein_type: 'chicken',
    cooking_method: 'grilled',
    prep_time_min: 25,
    spice_level: 2,
    dietary: { gluten_free: false },
    allergens: ['gluten', 'soy', 'egg'],
    tags: ['balanced', 'popular', 'lunch'],
    popularity: 90,
    ingredients: ['ING_CHICKEN_BREAST', 'ING_FLOUR_TORTILLA', 'ING_RICE', 'ING_GOCHUJANG', 'ING_MAYONNAISE', 'ING_CILANTRO', 'ING_LIME', 'ING_CUCUMBER', 'ING_LETTUCE']
  }
];
