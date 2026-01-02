// Cuban Beverages
// GUDBRO Database Standards v1.7

import { CubanDish } from '../types';

export const cubanBeverages: CubanDish[] = [
  {
    id: 'CUB_MOJITO',
    slug: 'mojito',
    name: 'Mojito',
    description: 'Iconic Cuban cocktail with rum, mint, lime, sugar and soda water',
    category: 'beverage',
    status: 'iconic',
    region: 'Havana',
    cooking_method: 'mixed',
    prep_time_min: 5,
    spice_level: 0,
    dietary: { is_vegan: true, is_vegetarian: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['cocktail', 'rum', 'refreshing'],
    popularity: 98,
    ingredients: [
      { id: 'ING_WHITE_RUM', role: 'main', quantity_amount: 60, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_MINT', role: 'main', quantity_amount: 10, quantity_unit: 'g', is_optional: false },
      { id: 'ING_LIME', role: 'main', quantity_amount: 30, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_SUGAR', role: 'secondary', quantity_amount: 15, quantity_unit: 'g', is_optional: false },
      { id: 'ING_SODA_WATER', role: 'secondary', quantity_amount: 100, quantity_unit: 'ml', is_optional: false }
    ]
  },
  {
    id: 'CUB_CUBA_LIBRE',
    slug: 'cuba-libre',
    name: 'Cuba Libre',
    description: 'Rum and cola with lime, the freedom cocktail',
    category: 'beverage',
    status: 'iconic',
    region: 'National',
    cooking_method: 'mixed',
    prep_time_min: 3,
    spice_level: 0,
    dietary: { is_vegan: true, is_vegetarian: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['cocktail', 'rum', 'cola'],
    popularity: 95,
    ingredients: [
      { id: 'ING_WHITE_RUM', role: 'main', quantity_amount: 60, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_COLA', role: 'main', quantity_amount: 150, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_LIME', role: 'secondary', quantity_amount: 15, quantity_unit: 'ml', is_optional: false }
    ]
  },
  {
    id: 'CUB_DAIQUIRI',
    slug: 'daiquiri',
    name: 'Daiquiri',
    description: 'Classic Cuban cocktail with rum, lime juice and sugar',
    category: 'beverage',
    status: 'iconic',
    region: 'Santiago',
    cooking_method: 'shaken',
    prep_time_min: 5,
    spice_level: 0,
    dietary: { is_vegan: true, is_vegetarian: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['cocktail', 'rum', 'citrus'],
    popularity: 90,
    ingredients: [
      { id: 'ING_WHITE_RUM', role: 'main', quantity_amount: 60, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_LIME', role: 'main', quantity_amount: 30, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_SUGAR', role: 'secondary', quantity_amount: 15, quantity_unit: 'g', is_optional: false }
    ]
  },
  {
    id: 'CUB_CAFE_CUBANO',
    slug: 'cafe-cubano',
    name: 'Cafe Cubano',
    description: 'Strong Cuban espresso with demerara sugar whipped into espuma',
    category: 'beverage',
    status: 'iconic',
    region: 'National',
    cooking_method: 'brewed',
    prep_time_min: 5,
    spice_level: 0,
    dietary: { is_vegan: true, is_vegetarian: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['coffee', 'espresso', 'sweet'],
    popularity: 95,
    ingredients: [
      { id: 'ING_COFFEE', role: 'main', quantity_amount: 20, quantity_unit: 'g', is_optional: false },
      { id: 'ING_BROWN_SUGAR', role: 'main', quantity_amount: 20, quantity_unit: 'g', is_optional: false }
    ]
  },
  {
    id: 'CUB_CORTADITO',
    slug: 'cortadito',
    name: 'Cortadito',
    description: 'Cuban espresso cut with steamed milk, smaller than cafe con leche',
    category: 'beverage',
    status: 'classic',
    region: 'National',
    cooking_method: 'brewed',
    prep_time_min: 5,
    spice_level: 0,
    dietary: { is_vegetarian: true, is_gluten_free: true },
    allergens: ['dairy'],
    tags: ['coffee', 'milk', 'espresso'],
    popularity: 88,
    ingredients: [
      { id: 'ING_COFFEE', role: 'main', quantity_amount: 20, quantity_unit: 'g', is_optional: false },
      { id: 'ING_BROWN_SUGAR', role: 'secondary', quantity_amount: 15, quantity_unit: 'g', is_optional: false },
      { id: 'ING_MILK', role: 'secondary', quantity_amount: 60, quantity_unit: 'ml', is_optional: false }
    ]
  },
  {
    id: 'CUB_CAFE_CON_LECHE',
    slug: 'cafe-con-leche-cubano',
    name: 'Cafe con Leche Cubano',
    description: 'Cuban coffee with hot milk, breakfast staple',
    category: 'beverage',
    status: 'iconic',
    region: 'National',
    cooking_method: 'brewed',
    prep_time_min: 5,
    spice_level: 0,
    dietary: { is_vegetarian: true, is_gluten_free: true },
    allergens: ['dairy'],
    tags: ['coffee', 'milk', 'breakfast'],
    popularity: 92,
    ingredients: [
      { id: 'ING_COFFEE', role: 'main', quantity_amount: 20, quantity_unit: 'g', is_optional: false },
      { id: 'ING_MILK', role: 'main', quantity_amount: 200, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_SUGAR', role: 'seasoning', quantity_amount: 20, quantity_unit: 'g', is_optional: true }
    ]
  },
  {
    id: 'CUB_GUARAPO',
    slug: 'guarapo',
    name: 'Guarapo',
    description: 'Fresh pressed sugarcane juice, refreshing and sweet',
    category: 'beverage',
    status: 'classic',
    region: 'National',
    cooking_method: 'pressed',
    prep_time_min: 5,
    spice_level: 0,
    dietary: { is_vegan: true, is_vegetarian: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['sugarcane', 'fresh', 'natural'],
    popularity: 80,
    ingredients: [
      { id: 'ING_SUGARCANE', role: 'main', quantity_amount: 500, quantity_unit: 'g', is_optional: false },
      { id: 'ING_LIME', role: 'secondary', quantity_amount: 15, quantity_unit: 'ml', is_optional: true }
    ]
  },
  {
    id: 'CUB_BATIDO_MAMEY',
    slug: 'batido-de-mamey',
    name: 'Batido de Mamey',
    description: 'Creamy mamey sapote milkshake, tropical Cuban favorite',
    category: 'beverage',
    status: 'classic',
    region: 'National',
    cooking_method: 'blended',
    prep_time_min: 5,
    spice_level: 0,
    dietary: { is_vegetarian: true, is_gluten_free: true },
    allergens: ['dairy'],
    tags: ['milkshake', 'tropical', 'mamey'],
    popularity: 85,
    ingredients: [
      { id: 'ING_MAMEY', role: 'main', quantity_amount: 300, quantity_unit: 'g', is_optional: false },
      { id: 'ING_MILK', role: 'main', quantity_amount: 250, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_SUGAR', role: 'secondary', quantity_amount: 30, quantity_unit: 'g', is_optional: false },
      { id: 'ING_VANILLA_EXTRACT', role: 'seasoning', quantity_amount: 5, quantity_unit: 'ml', is_optional: true }
    ]
  }
];
