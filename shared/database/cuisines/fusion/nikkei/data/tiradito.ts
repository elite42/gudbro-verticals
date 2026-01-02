// Nikkei Tiraditos - Raw Fish Dishes
// Japanese sashimi technique meets Peruvian flavors

import { NikkeiDish } from '../types';

export const tiraditos: NikkeiDish[] = [
  {
    id: 'NIK_TIRADITO_CLASICO',
    slug: 'tiradito-clasico',
    name: 'Tiradito Clasico',
    description: 'Thinly sliced white fish with aji amarillo tiger milk, crispy garlic, and cilantro',
    category: 'tiradito',
    status: 'iconic',
    protein_type: 'fish',
    cooking_method: 'raw',
    prep_time_min: 15,
    spice_level: 2,
    dietary: { gluten_free: true },
    allergens: ['fish'],
    tags: ['signature', 'raw', 'citrus'],
    popularity: 95,
    ingredients: ['ING_WHITE_FISH', 'ING_LIME', 'ING_AJI_AMARILLO', 'ING_GARLIC', 'ING_CILANTRO', 'ING_OLIVE_OIL', 'ING_SALT']
  },
  {
    id: 'NIK_TIRADITO_SALMON',
    slug: 'tiradito-salmon',
    name: 'Tiradito de Salmon',
    description: 'Sashimi-cut salmon with passion fruit tiger milk, rocoto cream, and microgreens',
    category: 'tiradito',
    status: 'classic',
    protein_type: 'fish',
    cooking_method: 'raw',
    prep_time_min: 15,
    spice_level: 2,
    dietary: { gluten_free: true },
    allergens: ['fish'],
    tags: ['salmon', 'passion-fruit', 'elegant'],
    popularity: 88,
    ingredients: ['ING_SALMON', 'ING_PASSION_FRUIT', 'ING_LIME', 'ING_AJI_ROCOTO', 'ING_CREAM', 'ING_CILANTRO', 'ING_SALT']
  },
  {
    id: 'NIK_TIRADITO_PULPO',
    slug: 'tiradito-pulpo',
    name: 'Tiradito de Pulpo',
    description: 'Tender octopus slices with olive tiger milk, kalamata olives, and aji panca',
    category: 'tiradito',
    status: 'classic',
    protein_type: 'octopus',
    cooking_method: 'poached',
    prep_time_min: 45,
    spice_level: 1,
    dietary: { gluten_free: true },
    allergens: ['shellfish'],
    tags: ['octopus', 'olive', 'mediterranean-influence'],
    popularity: 82,
    ingredients: ['ING_OCTOPUS', 'ING_OLIVE', 'ING_LIME', 'ING_AJI_PANCA', 'ING_OLIVE_OIL', 'ING_GARLIC', 'ING_SALT']
  },
  {
    id: 'NIK_TIRADITO_NIKKEI',
    slug: 'tiradito-nikkei',
    name: 'Tiradito Nikkei',
    description: 'White fish with soy-citrus tiger milk, sesame seeds, ginger, and nori strips',
    category: 'tiradito',
    status: 'iconic',
    protein_type: 'fish',
    cooking_method: 'raw',
    prep_time_min: 15,
    spice_level: 1,
    dietary: { gluten_free: false },
    allergens: ['fish', 'soy', 'sesame'],
    tags: ['fusion', 'soy', 'signature'],
    popularity: 92,
    ingredients: ['ING_WHITE_FISH', 'ING_SOY_SAUCE', 'ING_LIME', 'ING_SESAME_OIL', 'ING_GINGER', 'ING_NORI', 'ING_SESAME', 'ING_SCALLION']
  },
  {
    id: 'NIK_TIRADITO_ATUN',
    slug: 'tiradito-atun',
    name: 'Tiradito de Atun',
    description: 'Bluefin tuna with miso tiger milk, truffle oil, and crispy shallots',
    category: 'tiradito',
    status: 'modern',
    protein_type: 'fish',
    cooking_method: 'raw',
    prep_time_min: 15,
    spice_level: 1,
    dietary: { gluten_free: false },
    allergens: ['fish', 'soy'],
    tags: ['tuna', 'miso', 'premium'],
    popularity: 85,
    ingredients: ['ING_TUNA', 'ING_MISO', 'ING_LIME', 'ING_TRUFFLE_OIL', 'ING_SHALLOT', 'ING_SOY_SAUCE', 'ING_SALT']
  }
];
