// Indonesian Cuisine - Noodle Dishes (Mie)
// GUDBRO Database Standards v1.7

import { IndonesianDish } from '../types';

export const noodlesDishes: IndonesianDish[] = [
  {
    id: 'IDN_MIE_GORENG',
    slug: 'mie-goreng',
    name: 'Mie Goreng',
    local_name: 'Mie Goreng',
    description: 'Indonesian stir-fried noodles with sweet soy sauce, vegetables, and choice of protein',
    category: 'noodles',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'mixed',
    cooking_method: 'stir-fried',
    prep_time_min: 20,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['gluten', 'eggs', 'soy'],
    tags: ['street-food', 'quick', 'popular'],
    popularity: 95,
    ingredients: ['ING_EGG_NOODLE', 'ING_EGG', 'ING_CHICKEN', 'ING_CABBAGE', 'ING_CARROT', 'ING_KECAP_MANIS', 'ING_SHALLOT', 'ING_GARLIC', 'ING_CHILI', 'ING_SCALLION']
  },
  {
    id: 'IDN_MIE_AYAM',
    slug: 'mie-ayam',
    name: 'Mie Ayam',
    local_name: 'Mie Ayam',
    description: 'Chicken noodles served with minced chicken, wontons, and clear broth on the side',
    category: 'noodles',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'chicken',
    cooking_method: 'boiled',
    prep_time_min: 30,
    spice_level: 1,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['gluten', 'soy'],
    tags: ['street-food', 'comfort-food', 'chinese-indonesian'],
    popularity: 90,
    ingredients: ['ING_EGG_NOODLE', 'ING_CHICKEN', 'ING_WONTONS', 'ING_BOK_CHOY', 'ING_SOY_SAUCE', 'ING_SESAME_OIL', 'ING_GARLIC', 'ING_SHALLOT', 'ING_SCALLION']
  },
  {
    id: 'IDN_BAKMI_JAWA',
    slug: 'bakmi-jawa',
    name: 'Bakmi Jawa',
    local_name: 'Bakmi Jawa',
    description: 'Javanese-style noodles stir-fried with sweet soy sauce and topped with fried egg',
    category: 'noodles',
    region: 'java',
    status: 'classic',
    protein_type: 'mixed',
    cooking_method: 'stir-fried',
    prep_time_min: 25,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['gluten', 'eggs', 'soy'],
    tags: ['javanese', 'street-food', 'sweet'],
    popularity: 82,
    ingredients: ['ING_EGG_NOODLE', 'ING_EGG', 'ING_CHICKEN', 'ING_CABBAGE', 'ING_KECAP_MANIS', 'ING_SHALLOT', 'ING_GARLIC', 'ING_CHILI', 'ING_TOMATO']
  },
  {
    id: 'IDN_KWETIAU_GORENG',
    slug: 'kwetiau-goreng',
    name: 'Kwetiau Goreng',
    local_name: 'Kwetiau Goreng',
    description: 'Stir-fried flat rice noodles with seafood, vegetables, and soy sauce',
    category: 'noodles',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'seafood',
    cooking_method: 'stir-fried',
    prep_time_min: 20,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['shellfish', 'soy'],
    tags: ['chinese-indonesian', 'wok', 'seafood'],
    popularity: 78,
    ingredients: ['ING_RICE_NOODLES', 'ING_SHRIMP', 'ING_SQUID', 'ING_EGG', 'ING_BEAN_SPROUTS', 'ING_CHIVES', 'ING_SOY_SAUCE', 'ING_GARLIC', 'ING_WHITE_PEPPER']
  },
  {
    id: 'IDN_MIE_ACEH',
    slug: 'mie-aceh',
    name: 'Mie Aceh',
    local_name: 'Mie Aceh',
    description: 'Spicy Acehnese noodles with thick yellow noodles, curry-like sauce, and seafood or beef',
    category: 'noodles',
    region: 'sumatra',
    status: 'regional',
    protein_type: 'mixed',
    cooking_method: 'stir-fried',
    prep_time_min: 30,
    spice_level: 4,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['gluten', 'shellfish'],
    tags: ['acehnese', 'spicy', 'curry'],
    popularity: 75,
    ingredients: ['ING_EGG_NOODLE', 'ING_BEEF', 'ING_SHRIMP', 'ING_TOMATO', 'ING_CABBAGE', 'ING_CURRY_POWDER', 'ING_CHILI', 'ING_SHALLOT', 'ING_GARLIC', 'ING_LEMONGRASS']
  }
];
