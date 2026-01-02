// Nikkei Ceviches - Citrus-Marinated Seafood
// Peruvian ceviche with Japanese techniques and flavors

import { NikkeiDish } from '../types';

export const ceviches: NikkeiDish[] = [
  {
    id: 'NIK_CEVICHE_NIKKEI',
    slug: 'ceviche-nikkei',
    name: 'Ceviche Nikkei',
    description: 'Fresh fish cured in tiger milk with soy, ginger, sesame, and crispy wonton strips',
    category: 'ceviche',
    status: 'iconic',
    protein_type: 'fish',
    cooking_method: 'cured',
    prep_time_min: 20,
    spice_level: 2,
    dietary: { gluten_free: false },
    allergens: ['fish', 'soy', 'gluten'],
    tags: ['signature', 'fusion', 'fresh'],
    popularity: 95,
    ingredients: ['ING_WHITE_FISH', 'ING_LIME', 'ING_SOY_SAUCE', 'ING_GINGER', 'ING_SESAME_OIL', 'ING_ONION', 'ING_CILANTRO', 'ING_AJI_AMARILLO', 'ING_WONTON_WRAPPER']
  },
  {
    id: 'NIK_CEVICHE_MIXTO',
    slug: 'ceviche-mixto-nikkei',
    name: 'Ceviche Mixto Nikkei',
    description: 'Mixed seafood ceviche with shrimp, octopus, and squid in fusion tiger milk',
    category: 'ceviche',
    status: 'classic',
    protein_type: 'mixed_seafood',
    cooking_method: 'cured',
    prep_time_min: 25,
    spice_level: 2,
    dietary: { gluten_free: false },
    allergens: ['shellfish', 'fish', 'soy'],
    tags: ['mixed', 'seafood', 'traditional'],
    popularity: 88,
    ingredients: ['ING_SHRIMP', 'ING_OCTOPUS', 'ING_SQUID', 'ING_LIME', 'ING_SOY_SAUCE', 'ING_GINGER', 'ING_ONION', 'ING_CILANTRO', 'ING_AJI_AMARILLO', 'ING_CORN']
  },
  {
    id: 'NIK_CEVICHE_ATUN',
    slug: 'ceviche-atun',
    name: 'Ceviche de Atun',
    description: 'Sashimi-grade tuna ceviche with wasabi tiger milk and avocado',
    category: 'ceviche',
    status: 'modern',
    protein_type: 'fish',
    cooking_method: 'cured',
    prep_time_min: 15,
    spice_level: 2,
    dietary: { gluten_free: true },
    allergens: ['fish'],
    tags: ['tuna', 'wasabi', 'premium'],
    popularity: 85,
    ingredients: ['ING_TUNA', 'ING_LIME', 'ING_WASABI', 'ING_AVOCADO', 'ING_SOY_SAUCE', 'ING_SESAME', 'ING_SCALLION', 'ING_SALT']
  },
  {
    id: 'NIK_CEVICHE_VIEIRAS',
    slug: 'ceviche-vieiras',
    name: 'Ceviche de Vieiras',
    description: 'Scallop ceviche with yuzu tiger milk, miso, and crispy garlic',
    category: 'ceviche',
    status: 'modern',
    protein_type: 'shellfish',
    cooking_method: 'cured',
    prep_time_min: 15,
    spice_level: 1,
    dietary: { gluten_free: false },
    allergens: ['shellfish', 'soy'],
    tags: ['scallop', 'yuzu', 'elegant'],
    popularity: 82,
    ingredients: ['ING_SCALLOP', 'ING_YUZU', 'ING_LIME', 'ING_MISO', 'ING_GARLIC', 'ING_OLIVE_OIL', 'ING_CILANTRO', 'ING_SALT']
  },
  {
    id: 'NIK_CEVICHE_LANGOSTINO',
    slug: 'ceviche-langostino',
    name: 'Ceviche de Langostino',
    description: 'Langoustine ceviche with ponzu, aji limo, and tobiko',
    category: 'ceviche',
    status: 'classic',
    protein_type: 'shellfish',
    cooking_method: 'cured',
    prep_time_min: 20,
    spice_level: 2,
    dietary: { gluten_free: false },
    allergens: ['shellfish', 'soy', 'fish'],
    tags: ['langoustine', 'ponzu', 'tobiko'],
    popularity: 80,
    ingredients: ['ING_LANGOUSTINE', 'ING_PONZU', 'ING_LIME', 'ING_AJI_LIMO', 'ING_TOBIKO', 'ING_SCALLION', 'ING_CILANTRO', 'ING_SALT']
  }
];
