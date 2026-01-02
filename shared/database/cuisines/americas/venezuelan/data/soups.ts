// Venezuelan Soups
// Hearty Venezuelan soups and stews

import { VenezuelanDish } from '../types';

export const soups: VenezuelanDish[] = [
  {
    id: 'VEN_HERVIDO',
    slug: 'hervido',
    name: 'Hervido',
    description: 'Traditional soup with meat, vegetables, and root vegetables',
    category: 'soup',
    status: 'iconic',
    region: 'Nacional',
    protein_type: 'mixed',
    cooking_method: 'simmered',
    prep_time_min: 120,
    spice_level: 0,
    dietary: { gluten_free: true },
    allergens: [],
    tags: ['comfort', 'sunday', 'family'],
    popularity: 92,
    ingredients: ['ING_BEEF', 'ING_CHICKEN', 'ING_YUCA', 'ING_PLANTAIN', 'ING_CORN', 'ING_POTATO', 'ING_CARROT', 'ING_CABBAGE', 'ING_CILANTRO']
  },
  {
    id: 'VEN_MONDONGO',
    slug: 'mondongo-venezolano',
    name: 'Mondongo',
    description: 'Tripe soup with vegetables, a hearty weekend staple',
    category: 'soup',
    status: 'traditional',
    region: 'Nacional',
    protein_type: 'beef',
    cooking_method: 'simmered',
    prep_time_min: 180,
    spice_level: 0,
    dietary: { gluten_free: true },
    allergens: [],
    tags: ['tripe', 'traditional', 'hearty'],
    popularity: 75,
    ingredients: ['ING_TRIPE', 'ING_POTATO', 'ING_CARROT', 'ING_CHICKPEA', 'ING_YUCA', 'ING_ONION', 'ING_GARLIC', 'ING_CILANTRO']
  },
  {
    id: 'VEN_SANCOCHO',
    slug: 'sancocho-venezolano',
    name: 'Sancocho Venezolano',
    description: 'Rich meat and vegetable soup with yuca, corn, and plantain',
    category: 'soup',
    status: 'iconic',
    region: 'Llanos',
    protein_type: 'mixed',
    cooking_method: 'simmered',
    prep_time_min: 150,
    spice_level: 0,
    dietary: { gluten_free: true },
    allergens: [],
    tags: ['llanero', 'hearty', 'traditional'],
    popularity: 90,
    ingredients: ['ING_BEEF', 'ING_CHICKEN', 'ING_YUCA', 'ING_PLANTAIN', 'ING_CORN', 'ING_POTATO', 'ING_ONION', 'ING_GARLIC', 'ING_CILANTRO']
  },
  {
    id: 'VEN_SOPA_CARAOTAS',
    slug: 'sopa-de-caraotas',
    name: 'Sopa de Caraotas Negras',
    description: 'Black bean soup with sofrito and cumin',
    category: 'soup',
    status: 'classic',
    region: 'Nacional',
    protein_type: 'legume',
    cooking_method: 'simmered',
    prep_time_min: 90,
    spice_level: 0,
    dietary: { vegetarian: true, vegan: true, gluten_free: true },
    allergens: [],
    tags: ['beans', 'comfort', 'everyday'],
    popularity: 85,
    ingredients: ['ING_BLACK_BEAN', 'ING_ONION', 'ING_GARLIC', 'ING_BELL_PEPPER', 'ING_CUMIN', 'ING_CILANTRO']
  }
];
