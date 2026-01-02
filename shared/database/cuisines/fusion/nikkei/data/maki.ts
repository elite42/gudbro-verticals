// Nikkei Maki - Fusion Sushi Rolls
// Japanese sushi technique with Peruvian ingredients

import { NikkeiDish } from '../types';

export const makis: NikkeiDish[] = [
  {
    id: 'NIK_MAKI_ACEVICHADO',
    slug: 'maki-acevichado',
    name: 'Maki Acevichado',
    description: 'Sushi roll with ceviche-style fish, avocado, topped with tiger milk and aji amarillo',
    category: 'maki',
    status: 'iconic',
    protein_type: 'fish',
    cooking_method: 'raw',
    prep_time_min: 25,
    spice_level: 2,
    dietary: { gluten_free: false },
    allergens: ['fish', 'soy', 'gluten'],
    tags: ['signature', 'fusion', 'creative'],
    popularity: 93,
    ingredients: ['ING_SUSHI_RICE', 'ING_WHITE_FISH', 'ING_AVOCADO', 'ING_NORI', 'ING_LIME', 'ING_AJI_AMARILLO', 'ING_CILANTRO', 'ING_SESAME']
  },
  {
    id: 'NIK_MAKI_LOMO_SALTADO',
    slug: 'maki-lomo-saltado',
    name: 'Maki de Lomo Saltado',
    description: 'Roll filled with stir-fried beef tenderloin, tomato, onion, and soy reduction',
    category: 'maki',
    status: 'iconic',
    protein_type: 'beef',
    cooking_method: 'stir_fried',
    prep_time_min: 30,
    spice_level: 1,
    dietary: { gluten_free: false },
    allergens: ['soy', 'gluten'],
    tags: ['lomo-saltado', 'beef', 'peruvian-classic'],
    popularity: 90,
    ingredients: ['ING_SUSHI_RICE', 'ING_BEEF_TENDERLOIN', 'ING_TOMATO', 'ING_ONION', 'ING_SOY_SAUCE', 'ING_NORI', 'ING_FRENCH_FRIES', 'ING_SCALLION']
  },
  {
    id: 'NIK_MAKI_LANGOSTINO',
    slug: 'maki-langostino',
    name: 'Maki de Langostino',
    description: 'Tempura langoustine roll with avocado, cream cheese, and eel sauce',
    category: 'maki',
    status: 'classic',
    protein_type: 'shellfish',
    cooking_method: 'fried',
    prep_time_min: 25,
    spice_level: 0,
    dietary: { gluten_free: false },
    allergens: ['shellfish', 'soy', 'gluten', 'dairy'],
    tags: ['tempura', 'langoustine', 'creamy'],
    popularity: 85,
    ingredients: ['ING_SUSHI_RICE', 'ING_LANGOUSTINE', 'ING_AVOCADO', 'ING_CREAM_CHEESE', 'ING_NORI', 'ING_TEMPURA_BATTER', 'ING_EEL_SAUCE', 'ING_SESAME']
  },
  {
    id: 'NIK_MAKI_SALMON_PASSION',
    slug: 'maki-salmon-passion',
    name: 'Maki Salmon Maracuya',
    description: 'Salmon roll with passion fruit cream, avocado, and crispy quinoa topping',
    category: 'maki',
    status: 'modern',
    protein_type: 'fish',
    cooking_method: 'raw',
    prep_time_min: 25,
    spice_level: 0,
    dietary: { gluten_free: false },
    allergens: ['fish', 'soy', 'dairy'],
    tags: ['salmon', 'passion-fruit', 'quinoa'],
    popularity: 82,
    ingredients: ['ING_SUSHI_RICE', 'ING_SALMON', 'ING_PASSION_FRUIT', 'ING_AVOCADO', 'ING_CREAM_CHEESE', 'ING_NORI', 'ING_QUINOA', 'ING_SESAME']
  },
  {
    id: 'NIK_MAKI_PULPO',
    slug: 'maki-pulpo',
    name: 'Maki de Pulpo',
    description: 'Grilled octopus roll with olive tapenade, sun-dried tomato, and aji panca aioli',
    category: 'maki',
    status: 'classic',
    protein_type: 'octopus',
    cooking_method: 'grilled',
    prep_time_min: 30,
    spice_level: 1,
    dietary: { gluten_free: false },
    allergens: ['shellfish', 'soy', 'egg'],
    tags: ['octopus', 'mediterranean', 'grilled'],
    popularity: 78,
    ingredients: ['ING_SUSHI_RICE', 'ING_OCTOPUS', 'ING_OLIVE', 'ING_SUN_DRIED_TOMATO', 'ING_NORI', 'ING_AJI_PANCA', 'ING_MAYONNAISE', 'ING_SESAME']
  }
];
