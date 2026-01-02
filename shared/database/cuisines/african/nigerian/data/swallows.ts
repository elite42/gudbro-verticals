// Nigerian Swallows - Traditional Staple Foods
// GUDBRO Database

import { NigerianDish } from '../types';

export const nigerianSwallows: NigerianDish[] = [
  {
    id: 'NIG_POUNDED_YAM',
    slug: 'pounded-yam',
    name: 'Pounded Yam',
    description: 'Smooth, stretchy dough made from boiled and pounded white yam. The king of Nigerian swallows, especially popular among the Yoruba.',
    category: 'swallow',
    status: 'iconic',
    region: 'southwest',
    cooking_method: 'boiled_pounded',
    prep_time_min: 45,
    spice_level: 0,
    dietary: { is_vegetarian: true, is_vegan: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['yoruba', 'yam', 'traditional', 'staple'],
    popularity: 95,
    ingredients: [
      { id: 'ING_YAM', role: 'main', quantity_amount: 500, quantity_unit: 'g', is_optional: false },
      { id: 'ING_WATER', role: 'secondary', quantity_amount: 500, quantity_unit: 'ml', is_optional: false }
    ]
  },
  {
    id: 'NIG_EBA',
    slug: 'eba',
    name: 'Eba (Garri)',
    description: 'Quick-to-prepare swallow made from cassava flour (garri) mixed with hot water. One of the most common Nigerian staples.',
    category: 'swallow',
    status: 'iconic',
    region: 'nationwide',
    cooking_method: 'mixed',
    prep_time_min: 10,
    spice_level: 0,
    dietary: { is_vegetarian: true, is_vegan: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['cassava', 'garri', 'quick', 'staple'],
    popularity: 92,
    ingredients: [
      { id: 'ING_GARRI', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_WATER', role: 'secondary', quantity_amount: 300, quantity_unit: 'ml', is_optional: false }
    ]
  },
  {
    id: 'NIG_AMALA',
    slug: 'amala',
    name: 'Amala',
    description: 'Dark-colored swallow made from yam flour (elubo). A beloved Yoruba staple traditionally served with gbegiri and ewedu soups.',
    category: 'swallow',
    status: 'iconic',
    region: 'southwest',
    cooking_method: 'mixed',
    prep_time_min: 15,
    spice_level: 0,
    dietary: { is_vegetarian: true, is_vegan: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['yoruba', 'yam-flour', 'traditional', 'staple'],
    popularity: 88,
    ingredients: [
      { id: 'ING_YAM_FLOUR', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_WATER', role: 'secondary', quantity_amount: 400, quantity_unit: 'ml', is_optional: false }
    ]
  },
  {
    id: 'NIG_FUFU',
    slug: 'nigerian-fufu',
    name: 'Fufu',
    description: 'Fermented cassava swallow with a distinctive sour taste. Made by soaking cassava and then cooking it into a smooth dough.',
    category: 'swallow',
    status: 'classic',
    region: 'southeast',
    cooking_method: 'fermented',
    prep_time_min: 20,
    spice_level: 0,
    dietary: { is_vegetarian: true, is_vegan: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['cassava', 'fermented', 'igbo', 'staple'],
    popularity: 85,
    ingredients: [
      { id: 'ING_CASSAVA', role: 'main', quantity_amount: 400, quantity_unit: 'g', is_optional: false },
      { id: 'ING_WATER', role: 'secondary', quantity_amount: 300, quantity_unit: 'ml', is_optional: false }
    ]
  },
  {
    id: 'NIG_SEMOVITA',
    slug: 'semovita',
    name: 'Semovita',
    description: 'Modern Nigerian swallow made from semolina wheat. Light in color and texture, popular in urban areas.',
    category: 'swallow',
    status: 'classic',
    region: 'nationwide',
    cooking_method: 'mixed',
    prep_time_min: 10,
    spice_level: 0,
    dietary: { is_vegetarian: true, is_vegan: true, is_dairy_free: true },
    allergens: ['gluten'],
    tags: ['semolina', 'modern', 'urban', 'staple'],
    popularity: 75,
    ingredients: [
      { id: 'ING_SEMOLINA', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_WATER', role: 'secondary', quantity_amount: 400, quantity_unit: 'ml', is_optional: false }
    ]
  },
  {
    id: 'NIG_TUWO_SHINKAFA',
    slug: 'tuwo-shinkafa',
    name: 'Tuwo Shinkafa',
    description: 'Northern Nigerian rice-based swallow with a smooth, sticky texture. Traditionally served with miyan kuka or other northern soups.',
    category: 'swallow',
    status: 'classic',
    region: 'north',
    cooking_method: 'boiled',
    prep_time_min: 30,
    spice_level: 0,
    dietary: { is_vegetarian: true, is_vegan: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['hausa', 'rice', 'northern', 'staple'],
    popularity: 78,
    ingredients: [
      { id: 'ING_RICE', role: 'main', quantity_amount: 300, quantity_unit: 'g', is_optional: false },
      { id: 'ING_WATER', role: 'secondary', quantity_amount: 600, quantity_unit: 'ml', is_optional: false }
    ]
  },
  {
    id: 'NIG_STARCH',
    slug: 'nigerian-starch',
    name: 'Starch',
    description: 'Cassava starch-based swallow popular in the Niger Delta region. Has a unique stretchy texture and is traditionally paired with banga soup.',
    category: 'swallow',
    status: 'regional',
    region: 'south-south',
    cooking_method: 'mixed',
    prep_time_min: 15,
    spice_level: 0,
    dietary: { is_vegetarian: true, is_vegan: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['delta', 'cassava-starch', 'urhobo', 'staple'],
    popularity: 70,
    ingredients: [
      { id: 'ING_CASSAVA_STARCH', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_WATER', role: 'secondary', quantity_amount: 400, quantity_unit: 'ml', is_optional: false }
    ]
  }
];
