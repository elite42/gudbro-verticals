// Nikkei Anticuchos - Grilled Skewers
// Peruvian anticucho tradition meets Japanese yakitori

import { NikkeiDish } from '../types';

export const anticuchos: NikkeiDish[] = [
  {
    id: 'NIK_ANTICUCHO_PULPO',
    slug: 'anticucho-pulpo',
    name: 'Anticucho de Pulpo',
    description: 'Grilled octopus skewers with aji panca-miso glaze and chimichurri nikkei',
    category: 'anticucho',
    status: 'iconic',
    protein_type: 'octopus',
    cooking_method: 'grilled',
    prep_time_min: 35,
    spice_level: 2,
    dietary: { gluten_free: false },
    allergens: ['shellfish', 'soy'],
    tags: ['octopus', 'grilled', 'signature'],
    popularity: 90,
    ingredients: ['ING_OCTOPUS', 'ING_AJI_PANCA', 'ING_MISO', 'ING_SOY_SAUCE', 'ING_GARLIC', 'ING_CUMIN', 'ING_CILANTRO', 'ING_OLIVE_OIL']
  },
  {
    id: 'NIK_ANTICUCHO_SALMON',
    slug: 'anticucho-salmon',
    name: 'Anticucho de Salmon',
    description: 'Teriyaki-glazed salmon skewers with pickled vegetables and wasabi aioli',
    category: 'anticucho',
    status: 'classic',
    protein_type: 'fish',
    cooking_method: 'grilled',
    prep_time_min: 20,
    spice_level: 1,
    dietary: { gluten_free: false },
    allergens: ['fish', 'soy', 'egg'],
    tags: ['salmon', 'teriyaki', 'yakitori-style'],
    popularity: 85,
    ingredients: ['ING_SALMON', 'ING_SOY_SAUCE', 'ING_MIRIN', 'ING_SUGAR', 'ING_WASABI', 'ING_MAYONNAISE', 'ING_CUCUMBER', 'ING_GINGER']
  },
  {
    id: 'NIK_ANTICUCHO_CORAZON',
    slug: 'anticucho-corazon-nikkei',
    name: 'Anticucho de Corazon Nikkei',
    description: 'Traditional beef heart skewers with rocoto-teriyaki sauce and crispy shallots',
    category: 'anticucho',
    status: 'traditional',
    protein_type: 'offal',
    cooking_method: 'grilled',
    prep_time_min: 30,
    spice_level: 3,
    dietary: { gluten_free: false },
    allergens: ['soy'],
    tags: ['beef-heart', 'traditional', 'street-food'],
    popularity: 78,
    ingredients: ['ING_BEEF_HEART', 'ING_AJI_ROCOTO', 'ING_SOY_SAUCE', 'ING_MIRIN', 'ING_AJI_PANCA', 'ING_CUMIN', 'ING_GARLIC', 'ING_SHALLOT']
  },
  {
    id: 'NIK_ANTICUCHO_LANGOSTINO',
    slug: 'anticucho-langostino',
    name: 'Anticucho de Langostino',
    description: 'Grilled langoustine skewers with aji amarillo butter and yuzu kosho',
    category: 'anticucho',
    status: 'modern',
    protein_type: 'shellfish',
    cooking_method: 'grilled',
    prep_time_min: 15,
    spice_level: 2,
    dietary: { gluten_free: true },
    allergens: ['shellfish', 'dairy'],
    tags: ['langoustine', 'butter', 'yuzu'],
    popularity: 82,
    ingredients: ['ING_LANGOUSTINE', 'ING_AJI_AMARILLO', 'ING_BUTTER', 'ING_YUZU', 'ING_GARLIC', 'ING_CILANTRO', 'ING_SALT']
  }
];
