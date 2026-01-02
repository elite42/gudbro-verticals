// Venezuelan Seafood
// Coastal specialties

import { VenezuelanDish } from '../types';

export const seafood: VenezuelanDish[] = [
  {
    id: 'VEN_PARGO_FRITO',
    slug: 'pargo-frito',
    name: 'Pargo Frito',
    description: 'Whole fried red snapper with tostones and rice',
    category: 'seafood',
    status: 'iconic',
    region: 'Costa',
    protein_type: 'fish',
    cooking_method: 'deep_fried',
    prep_time_min: 30,
    spice_level: 0,
    dietary: { gluten_free: true },
    allergens: ['fish'],
    tags: ['coastal', 'fried', 'whole-fish'],
    popularity: 92,
    ingredients: ['ING_RED_SNAPPER', 'ING_LIME', 'ING_GARLIC', 'ING_SALT', 'ING_VEGETABLE_OIL', 'ING_PLANTAIN']
  },
  {
    id: 'VEN_CEVICHE',
    slug: 'ceviche-venezolano',
    name: 'Ceviche Venezolano',
    description: 'Fresh fish cured in lime with onion and cilantro',
    category: 'seafood',
    status: 'classic',
    region: 'Costa',
    protein_type: 'fish',
    cooking_method: 'raw',
    prep_time_min: 30,
    spice_level: 1,
    dietary: { gluten_free: true },
    allergens: ['fish'],
    tags: ['fresh', 'coastal', 'appetizer'],
    popularity: 85,
    ingredients: ['ING_WHITE_FISH', 'ING_LIME', 'ING_ONION', 'ING_CILANTRO', 'ING_CHILI', 'ING_SALT']
  },
  {
    id: 'VEN_ARROZ_MARISCOS',
    slug: 'arroz-con-mariscos',
    name: 'Arroz con Mariscos',
    description: 'Rice with mixed seafood in tomato-based sauce',
    category: 'seafood',
    status: 'classic',
    region: 'Costa',
    protein_type: 'seafood',
    cooking_method: 'simmered',
    prep_time_min: 45,
    spice_level: 0,
    dietary: { gluten_free: true },
    allergens: ['shellfish', 'fish'],
    tags: ['rice', 'seafood', 'complete'],
    popularity: 88,
    ingredients: ['ING_RICE', 'ING_SHRIMP', 'ING_SQUID', 'ING_MUSSEL', 'ING_TOMATO', 'ING_ONION', 'ING_BELL_PEPPER', 'ING_GARLIC']
  },
  {
    id: 'VEN_PESCADO_COCO',
    slug: 'pescado-en-coco',
    name: 'Pescado en Coco',
    description: 'Fish in creamy coconut sauce, Caribbean-influenced',
    category: 'seafood',
    status: 'regional',
    region: 'Oriente',
    protein_type: 'fish',
    cooking_method: 'simmered',
    prep_time_min: 40,
    spice_level: 0,
    dietary: { gluten_free: true },
    allergens: ['fish'],
    tags: ['coconut', 'caribbean', 'creamy'],
    popularity: 80,
    ingredients: ['ING_WHITE_FISH', 'ING_COCONUT_MILK', 'ING_ONION', 'ING_GARLIC', 'ING_BELL_PEPPER', 'ING_CILANTRO']
  }
];
