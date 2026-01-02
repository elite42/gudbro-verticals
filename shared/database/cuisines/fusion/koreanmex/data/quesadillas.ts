// Korean-Mexican Fusion Quesadillas
// Cheesy fusion creations

import { KoreanMexDish } from '../types';

export const quesadillas: KoreanMexDish[] = [
  {
    id: 'KMX_KIMCHI_QUESADILLA',
    slug: 'kimchi-quesadilla',
    name: 'Kimchi Quesadilla',
    description: 'Crispy flour tortilla filled with melted cheese, kimchi, and gochujang aioli',
    category: 'quesadilla',
    status: 'iconic',
    protein_type: 'vegetable',
    cooking_method: 'griddled',
    prep_time_min: 15,
    spice_level: 3,
    dietary: { vegetarian: true, gluten_free: false },
    allergens: ['gluten', 'dairy', 'soy', 'egg'],
    tags: ['signature', 'cheesy', 'crispy'],
    popularity: 92,
    ingredients: ['ING_FLOUR_TORTILLA', 'ING_CHEESE', 'ING_KIMCHI', 'ING_GOCHUJANG', 'ING_MAYONNAISE', 'ING_SCALLION', 'ING_SESAME']
  },
  {
    id: 'KMX_BULGOGI_QUESADILLA',
    slug: 'bulgogi-quesadilla',
    name: 'Bulgogi Quesadilla',
    description: 'Flour tortilla stuffed with bulgogi beef, Oaxaca cheese, and caramelized onions',
    category: 'quesadilla',
    status: 'classic',
    protein_type: 'beef',
    cooking_method: 'griddled',
    prep_time_min: 20,
    spice_level: 2,
    dietary: { gluten_free: false },
    allergens: ['gluten', 'dairy', 'soy', 'sesame'],
    tags: ['cheesy', 'hearty', 'popular'],
    popularity: 90,
    ingredients: ['ING_BEEF', 'ING_FLOUR_TORTILLA', 'ING_OAXACA_CHEESE', 'ING_ONION', 'ING_SOY_SAUCE', 'ING_SESAME_OIL', 'ING_GARLIC', 'ING_SOUR_CREAM']
  },
  {
    id: 'KMX_SPICY_CHICKEN_QUESADILLA',
    slug: 'spicy-chicken-quesadilla',
    name: 'Spicy Korean Chicken Quesadilla',
    description: 'Gochujang chicken with pepper jack cheese, corn, and jalapeños',
    category: 'quesadilla',
    status: 'classic',
    protein_type: 'chicken',
    cooking_method: 'griddled',
    prep_time_min: 20,
    spice_level: 4,
    dietary: { gluten_free: false },
    allergens: ['gluten', 'dairy', 'soy'],
    tags: ['spicy', 'crispy', 'lunch'],
    popularity: 88,
    ingredients: ['ING_CHICKEN_BREAST', 'ING_FLOUR_TORTILLA', 'ING_CHEESE_PEPPER_JACK', 'ING_GOCHUJANG', 'ING_CORN', 'ING_JALAPENO', 'ING_CILANTRO', 'ING_LIME']
  }
];
