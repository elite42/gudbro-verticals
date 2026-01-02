// Dutch Cuisine - Main Dishes
// GUDBRO Database Standards v1.7

import { DutchDish } from '../types';

export const mainsDishes: DutchDish[] = [
  {
    id: 'DUT_HACHEE',
    slug: 'hachee',
    name: 'Hachee',
    local_name: 'Hachee',
    description: 'Traditional Dutch beef and onion stew with cloves and vinegar',
    category: 'mains',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'beef',
    cooking_method: 'stewed',
    prep_time_min: 120,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: [],
    tags: ['stew', 'comfort-food', 'traditional'],
    popularity: 80,
    ingredients: ['ING_BEEF_CHUCK', 'ING_ONION', 'ING_BUTTER', 'ING_BEEF_BROTH', 'ING_BAY_LEAVES', 'ING_CLOVE', 'ING_APPLE_CIDER_VINEGAR', 'ING_BROWN_SUGAR', 'ING_FLOUR', 'ING_SALT']
  },
  {
    id: 'DUT_DRAADJESVLEES',
    slug: 'draadjesvlees',
    name: 'Draadjesvlees',
    local_name: 'Draadjesvlees',
    description: 'Slow-cooked stringy beef in rich gravy, fork-tender',
    category: 'mains',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'beef',
    cooking_method: 'braised',
    prep_time_min: 180,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: ['dairy'],
    tags: ['slow-cooked', 'sunday-dinner', 'comfort-food'],
    popularity: 75,
    ingredients: ['ING_BEEF_CHUCK', 'ING_ONION', 'ING_CARROT', 'ING_CELERY', 'ING_BEEF_BROTH', 'ING_BAY_LEAVES', 'ING_THYME', 'ING_BUTTER', 'ING_SALT', 'ING_BLACK_PEPPER']
  },
  {
    id: 'DUT_BALKENBRIJ',
    slug: 'balkenbrij',
    name: 'Balkenbrij',
    local_name: 'Balkenbrij',
    description: 'Traditional buckwheat and pork offal sausage, sliced and pan-fried',
    category: 'mains',
    region: 'limburg',
    status: 'traditional',
    protein_type: 'pork',
    cooking_method: 'pan-fried',
    prep_time_min: 30,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: ['gluten'],
    tags: ['regional', 'breakfast', 'rustic'],
    popularity: 55,
    ingredients: ['ING_PORK_LIVER', 'ING_BUCKWHEAT', 'ING_PORK_BROTH', 'ING_ONION', 'ING_CLOVE', 'ING_ALLSPICE', 'ING_SALT', 'ING_BLACK_PEPPER']
  },
  {
    id: 'DUT_SLAVINK',
    slug: 'slavink',
    name: 'Slavink',
    local_name: 'Slavink',
    description: 'Minced meat wrapped in bacon, pan-fried until crispy',
    category: 'mains',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'mixed',
    cooking_method: 'pan-fried',
    prep_time_min: 25,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: ['gluten'],
    tags: ['comfort-food', 'weeknight-dinner'],
    popularity: 70,
    ingredients: ['ING_GROUND_BEEF', 'ING_GROUND_PORK', 'ING_BACON', 'ING_BREADCRUMB', 'ING_EGG', 'ING_ONION', 'ING_NUTMEG', 'ING_SALT', 'ING_BLACK_PEPPER']
  },
  {
    id: 'DUT_GEHAKTBAL',
    slug: 'gehaktbal',
    name: 'Gehaktbal',
    local_name: 'Gehaktbal',
    description: 'Large Dutch meatball in rich gravy, comfort food classic',
    category: 'mains',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'mixed',
    cooking_method: 'braised',
    prep_time_min: 45,
    spice_level: 0,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: ['gluten', 'dairy', 'eggs'],
    tags: ['comfort-food', 'sunday-dinner', 'gravy'],
    popularity: 82,
    ingredients: ['ING_GROUND_BEEF', 'ING_GROUND_PORK', 'ING_BREADCRUMB', 'ING_EGG', 'ING_ONION', 'ING_MILK', 'ING_NUTMEG', 'ING_BEEF_BROTH', 'ING_BUTTER', 'ING_SALT']
  }
];
