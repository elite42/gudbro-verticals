// Nigerian Beverages and Desserts
// GUDBRO Database

import { NigerianDish } from '../types';

export const nigerianBeverages: NigerianDish[] = [
  {
    id: 'NIG_ZOBO',
    slug: 'zobo',
    name: 'Zobo (Hibiscus Drink)',
    description: 'Refreshing deep red drink made from dried hibiscus flowers, flavored with ginger, cloves, and citrus. Nigeria\'s most popular traditional beverage.',
    category: 'beverage',
    status: 'iconic',
    region: 'nationwide',
    cooking_method: 'boiled',
    prep_time_min: 30,
    spice_level: 0,
    dietary: { is_vegetarian: true, is_vegan: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['hibiscus', 'refreshing', 'traditional', 'healthy'],
    popularity: 95,
    ingredients: [
      { id: 'ING_HIBISCUS', role: 'main', quantity_amount: 100, quantity_unit: 'g', is_optional: false },
      { id: 'ING_GINGER', role: 'secondary', quantity_amount: 50, quantity_unit: 'g', is_optional: false },
      { id: 'ING_CLOVE', role: 'seasoning', quantity_amount: 5, quantity_unit: 'g', is_optional: false },
      { id: 'ING_PINEAPPLE', role: 'secondary', quantity_amount: 100, quantity_unit: 'g', is_optional: true },
      { id: 'ING_ORANGE', role: 'secondary', quantity_amount: 100, quantity_unit: 'g', is_optional: true },
      { id: 'ING_SUGAR', role: 'secondary', quantity_amount: 100, quantity_unit: 'g', is_optional: false },
      { id: 'ING_WATER', role: 'main', quantity_amount: 2000, quantity_unit: 'ml', is_optional: false }
    ]
  },
  {
    id: 'NIG_KUNU',
    slug: 'kunu',
    name: 'Kunu',
    description: 'Traditional millet-based drink from Northern Nigeria, fermented and flavored with ginger, cloves, and sweet potato. Served cold and refreshing.',
    category: 'beverage',
    status: 'classic',
    region: 'north',
    cooking_method: 'fermented',
    prep_time_min: 720,
    spice_level: 0,
    dietary: { is_vegetarian: true, is_vegan: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['millet', 'fermented', 'hausa', 'probiotic'],
    popularity: 82,
    ingredients: [
      { id: 'ING_MILLET', role: 'main', quantity_amount: 300, quantity_unit: 'g', is_optional: false },
      { id: 'ING_GINGER', role: 'secondary', quantity_amount: 50, quantity_unit: 'g', is_optional: false },
      { id: 'ING_CLOVE', role: 'seasoning', quantity_amount: 5, quantity_unit: 'g', is_optional: false },
      { id: 'ING_SWEET_POTATO', role: 'secondary', quantity_amount: 100, quantity_unit: 'g', is_optional: false },
      { id: 'ING_SUGAR', role: 'secondary', quantity_amount: 80, quantity_unit: 'g', is_optional: false },
      { id: 'ING_WATER', role: 'main', quantity_amount: 2000, quantity_unit: 'ml', is_optional: false }
    ]
  },
  {
    id: 'NIG_FURA_DA_NONO',
    slug: 'fura-da-nono',
    name: 'Fura da Nono',
    description: 'Traditional Hausa drink combining fura (millet balls) with nono (fermented milk). A nutritious and filling beverage.',
    category: 'beverage',
    status: 'classic',
    region: 'north',
    cooking_method: 'fermented',
    prep_time_min: 60,
    spice_level: 0,
    dietary: { is_vegetarian: true, is_gluten_free: true },
    allergens: ['dairy'],
    tags: ['millet', 'fermented-milk', 'hausa', 'fulani'],
    popularity: 78,
    ingredients: [
      { id: 'ING_MILLET', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_YOGURT', role: 'main', quantity_amount: 500, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_GINGER', role: 'seasoning', quantity_amount: 20, quantity_unit: 'g', is_optional: false },
      { id: 'ING_CLOVE', role: 'seasoning', quantity_amount: 3, quantity_unit: 'g', is_optional: false },
      { id: 'ING_SUGAR', role: 'secondary', quantity_amount: 50, quantity_unit: 'g', is_optional: true }
    ]
  },
  {
    id: 'NIG_PALM_WINE',
    slug: 'palm-wine',
    name: 'Palm Wine',
    description: 'Traditional alcoholic beverage tapped from palm trees. Fresh palm wine is sweet and mildly alcoholic, becoming stronger as it ferments.',
    category: 'beverage',
    status: 'traditional',
    region: 'south',
    cooking_method: 'fermented',
    prep_time_min: 0,
    spice_level: 0,
    dietary: { is_vegetarian: true, is_vegan: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['palm-tree', 'alcoholic', 'traditional', 'ceremonial'],
    popularity: 75,
    ingredients: [
      { id: 'ING_PALM_SAP', role: 'main', quantity_amount: 1000, quantity_unit: 'ml', is_optional: false }
    ]
  },
  {
    id: 'NIG_TIGER_NUT_DRINK',
    slug: 'tiger-nut-drink',
    name: 'Tiger Nut Drink (Kunun Aya)',
    description: 'Creamy, sweet drink made from tiger nuts, dates, and coconut. A popular Nigerian health drink.',
    category: 'beverage',
    status: 'classic',
    region: 'north',
    cooking_method: 'blended',
    prep_time_min: 30,
    spice_level: 0,
    dietary: { is_vegetarian: true, is_vegan: true, is_gluten_free: true, is_dairy_free: true },
    allergens: [],
    tags: ['tiger-nut', 'healthy', 'creamy', 'hausa'],
    popularity: 80,
    ingredients: [
      { id: 'ING_TIGER_NUT', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_DATE', role: 'secondary', quantity_amount: 100, quantity_unit: 'g', is_optional: false },
      { id: 'ING_COCONUT', role: 'secondary', quantity_amount: 100, quantity_unit: 'g', is_optional: false },
      { id: 'ING_GINGER', role: 'seasoning', quantity_amount: 20, quantity_unit: 'g', is_optional: true },
      { id: 'ING_WATER', role: 'main', quantity_amount: 1000, quantity_unit: 'ml', is_optional: false }
    ]
  },
  {
    id: 'NIG_PAP',
    slug: 'pap',
    name: 'Pap (Ogi/Akamu)',
    description: 'Smooth fermented corn porridge, often served as breakfast with akara or moin moin. Can be made from corn, millet, or sorghum.',
    category: 'beverage',
    status: 'iconic',
    region: 'nationwide',
    cooking_method: 'fermented',
    prep_time_min: 15,
    spice_level: 0,
    dietary: { is_vegetarian: true, is_gluten_free: true },
    allergens: ['dairy'],
    tags: ['corn', 'fermented', 'breakfast', 'porridge'],
    popularity: 90,
    ingredients: [
      { id: 'ING_CORN_FLOUR', role: 'main', quantity_amount: 100, quantity_unit: 'g', is_optional: false },
      { id: 'ING_WATER', role: 'main', quantity_amount: 500, quantity_unit: 'ml', is_optional: false },
      { id: 'ING_SUGAR', role: 'secondary', quantity_amount: 30, quantity_unit: 'g', is_optional: false },
      { id: 'ING_MILK', role: 'secondary', quantity_amount: 100, quantity_unit: 'ml', is_optional: true }
    ]
  },
  {
    id: 'NIG_MEAT_PIE',
    slug: 'nigerian-meat-pie',
    name: 'Nigerian Meat Pie',
    description: 'Flaky pastry filled with seasoned minced meat, potatoes, and carrots. A beloved Nigerian snack with British colonial origins.',
    category: 'snack',
    status: 'iconic',
    region: 'nationwide',
    protein_type: 'beef',
    cooking_method: 'baked',
    prep_time_min: 60,
    spice_level: 1,
    dietary: {},
    allergens: ['gluten', 'dairy'],
    tags: ['pastry', 'meat', 'british-influence', 'snack'],
    popularity: 92,
    ingredients: [
      { id: 'ING_FLOUR', role: 'main', quantity_amount: 400, quantity_unit: 'g', is_optional: false },
      { id: 'ING_BUTTER', role: 'main', quantity_amount: 200, quantity_unit: 'g', is_optional: false },
      { id: 'ING_BEEF', role: 'main', quantity_amount: 300, quantity_unit: 'g', is_optional: false },
      { id: 'ING_POTATO', role: 'secondary', quantity_amount: 150, quantity_unit: 'g', is_optional: false },
      { id: 'ING_CARROT', role: 'secondary', quantity_amount: 80, quantity_unit: 'g', is_optional: false },
      { id: 'ING_ONION', role: 'secondary', quantity_amount: 80, quantity_unit: 'g', is_optional: false },
      { id: 'ING_EGG', role: 'secondary', quantity_amount: 1, quantity_unit: 'unit', is_optional: false },
      { id: 'ING_THYME', role: 'seasoning', quantity_amount: 5, quantity_unit: 'g', is_optional: false },
      { id: 'ING_CURRY_POWDER', role: 'seasoning', quantity_amount: 5, quantity_unit: 'g', is_optional: false },
      { id: 'ING_SALT', role: 'seasoning', quantity_amount: 5, quantity_unit: 'g', is_optional: false }
    ]
  },
  {
    id: 'NIG_SAUSAGE_ROLL',
    slug: 'nigerian-sausage-roll',
    name: 'Nigerian Sausage Roll',
    description: 'Flaky pastry wrapped around seasoned minced meat. A popular Nigerian party snack and breakfast item.',
    category: 'snack',
    status: 'classic',
    region: 'nationwide',
    protein_type: 'beef',
    cooking_method: 'baked',
    prep_time_min: 45,
    spice_level: 1,
    dietary: {},
    allergens: ['gluten', 'dairy'],
    tags: ['pastry', 'sausage', 'party', 'snack'],
    popularity: 88,
    ingredients: [
      { id: 'ING_FLOUR', role: 'main', quantity_amount: 300, quantity_unit: 'g', is_optional: false },
      { id: 'ING_BUTTER', role: 'main', quantity_amount: 150, quantity_unit: 'g', is_optional: false },
      { id: 'ING_BEEF', role: 'main', quantity_amount: 250, quantity_unit: 'g', is_optional: false },
      { id: 'ING_ONION', role: 'secondary', quantity_amount: 60, quantity_unit: 'g', is_optional: false },
      { id: 'ING_EGG', role: 'secondary', quantity_amount: 1, quantity_unit: 'unit', is_optional: false },
      { id: 'ING_THYME', role: 'seasoning', quantity_amount: 3, quantity_unit: 'g', is_optional: false },
      { id: 'ING_NUTMEG', role: 'seasoning', quantity_amount: 2, quantity_unit: 'g', is_optional: false },
      { id: 'ING_SALT', role: 'seasoning', quantity_amount: 3, quantity_unit: 'g', is_optional: false }
    ]
  }
];
