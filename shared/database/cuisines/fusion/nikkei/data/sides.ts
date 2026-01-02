// Nikkei Sides - Accompaniments
// Fusion side dishes and accompaniments

import { NikkeiDish } from '../types';

export const sides: NikkeiDish[] = [
  {
    id: 'NIK_EDAMAME_AJI',
    slug: 'edamame-aji',
    name: 'Edamame con Aji',
    description: 'Steamed edamame with aji amarillo salt and lime zest',
    category: 'side',
    status: 'classic',
    protein_type: 'vegetable',
    cooking_method: 'steamed',
    prep_time_min: 10,
    spice_level: 2,
    dietary: { vegetarian: true, vegan: true, gluten_free: true },
    allergens: ['soy'],
    tags: ['edamame', 'snack', 'vegan'],
    popularity: 80,
    ingredients: ['ING_EDAMAME', 'ING_AJI_AMARILLO', 'ING_LIME', 'ING_SALT', 'ING_OLIVE_OIL']
  },
  {
    id: 'NIK_PAPA_WASABI',
    slug: 'papa-wasabi',
    name: 'Papas con Wasabi',
    description: 'Crispy potatoes with wasabi cream and nori flakes',
    category: 'side',
    status: 'modern',
    protein_type: 'vegetable',
    cooking_method: 'fried',
    prep_time_min: 20,
    spice_level: 2,
    dietary: { vegetarian: true, gluten_free: true },
    allergens: ['dairy'],
    tags: ['potato', 'wasabi', 'crispy'],
    popularity: 75,
    ingredients: ['ING_POTATO', 'ING_WASABI', 'ING_SOUR_CREAM', 'ING_NORI', 'ING_SALT', 'ING_VEGETABLE_OIL']
  },
  {
    id: 'NIK_CHOCLO_NIKKEI',
    slug: 'choclo-nikkei',
    name: 'Choclo Nikkei',
    description: 'Grilled Peruvian corn with miso butter and shichimi togarashi',
    category: 'side',
    status: 'classic',
    protein_type: 'vegetable',
    cooking_method: 'grilled',
    prep_time_min: 15,
    spice_level: 1,
    dietary: { vegetarian: true, gluten_free: false },
    allergens: ['soy', 'dairy'],
    tags: ['corn', 'miso-butter', 'grilled'],
    popularity: 78,
    ingredients: ['ING_CORN', 'ING_MISO', 'ING_BUTTER', 'ING_SHICHIMI', 'ING_LIME', 'ING_SALT']
  },
  {
    id: 'NIK_ENSALADA_NIKKEI',
    slug: 'ensalada-nikkei',
    name: 'Ensalada Nikkei',
    description: 'Mixed greens with ponzu dressing, avocado, and crispy wonton strips',
    category: 'side',
    status: 'classic',
    protein_type: 'vegetable',
    cooking_method: 'raw',
    prep_time_min: 10,
    spice_level: 0,
    dietary: { vegetarian: true, vegan: false, gluten_free: false },
    allergens: ['soy', 'gluten'],
    tags: ['salad', 'ponzu', 'fresh'],
    popularity: 72,
    ingredients: ['ING_MIXED_GREENS', 'ING_PONZU', 'ING_AVOCADO', 'ING_WONTON_WRAPPER', 'ING_SESAME', 'ING_SCALLION']
  },
  {
    id: 'NIK_ARROZ_GOHAN',
    slug: 'arroz-gohan',
    name: 'Arroz Gohan Peruano',
    description: 'Japanese rice seasoned with aji amarillo and crispy garlic',
    category: 'side',
    status: 'traditional',
    protein_type: 'grain',
    cooking_method: 'steamed',
    prep_time_min: 25,
    spice_level: 1,
    dietary: { vegetarian: true, vegan: true, gluten_free: true },
    allergens: [],
    tags: ['rice', 'staple', 'aji'],
    popularity: 70,
    ingredients: ['ING_SUSHI_RICE', 'ING_AJI_AMARILLO', 'ING_GARLIC', 'ING_VEGETABLE_OIL', 'ING_SALT']
  }
];
