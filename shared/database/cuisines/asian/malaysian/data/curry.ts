/**
 * Malaysian Curry Dishes
 * Rich and aromatic curry dishes of Malaysia
 */

import { MalaysianDish } from '../types';

export const curryDishes: MalaysianDish[] = [
  {
    id: 'MAL_KARI_AYAM',
    slug: 'kari-ayam',
    name: 'Malaysian Chicken Curry',
    local_name: 'Kari Ayam',
    description: 'Rich chicken curry cooked with Malaysian curry powder, coconut milk, potatoes, and aromatic spices, often served with roti canai',
    category: 'curry',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'chicken',
    cooking_method: 'braised',
    prep_time_min: 60,
    spice_level: 3,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: [],
    tags: ['curry', 'coconut', 'comfort_food', 'mamak'],
    ingredient_ids: ['ING_CHICKEN', 'ING_COCONUT_MILK', 'ING_CURRY_POWDER', 'ING_POTATO', 'ING_ONION', 'ING_GARLIC', 'ING_GINGER', 'ING_LEMONGRASS', 'ING_CINNAMON', 'ING_STAR_ANISE', 'ING_CURRY_LEAF'],
    popularity: 92
  },
  {
    id: 'MAL_KARI_IKAN',
    slug: 'kari-ikan',
    name: 'Fish Head Curry',
    local_name: 'Kari Kepala Ikan',
    description: 'Famous Malaysian-Indian curry with a large fish head cooked in tangy tamarind and coconut curry sauce with vegetables',
    category: 'curry',
    region: 'kuala_lumpur',
    status: 'iconic',
    protein_type: 'fish',
    cooking_method: 'braised',
    prep_time_min: 50,
    spice_level: 4,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['fish'],
    tags: ['fish_head', 'tamarind', 'sour', 'indian_influence'],
    ingredient_ids: ['ING_WHITE_FISH', 'ING_COCONUT_MILK', 'ING_CURRY_POWDER', 'ING_TAMARIND', 'ING_TOMATO', 'ING_OKRA', 'ING_EGGPLANT', 'ING_ONION', 'ING_GARLIC', 'ING_CHILI', 'ING_CURRY_LEAF'],
    popularity: 85
  },
  {
    id: 'MAL_RENDANG_DAGING',
    slug: 'rendang-daging',
    name: 'Beef Rendang',
    local_name: 'Rendang Daging',
    description: 'Slow-cooked dry beef curry with rich coconut milk, lemongrass, galangal, and a complex spice paste until the meat is tender and caramelized',
    category: 'curry',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'beef',
    cooking_method: 'braised',
    prep_time_min: 180,
    spice_level: 3,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: [],
    tags: ['dry_curry', 'slow_cooked', 'festive', 'world_famous'],
    ingredient_ids: ['ING_BEEF', 'ING_COCONUT_MILK', 'ING_LEMONGRASS', 'ING_GALANGAL', 'ING_GINGER', 'ING_GARLIC', 'ING_SHALLOT', 'ING_CHILI', 'ING_TURMERIC', 'ING_CINNAMON', 'ING_STAR_ANISE', 'ING_KERISIK'],
    popularity: 96
  },
  {
    id: 'MAL_RENDANG_AYAM',
    slug: 'rendang-ayam',
    name: 'Chicken Rendang',
    local_name: 'Rendang Ayam',
    description: 'Classic dry chicken curry cooked in coconut milk until the sauce is absorbed and the chicken is coated in aromatic spices',
    category: 'curry',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'chicken',
    cooking_method: 'braised',
    prep_time_min: 90,
    spice_level: 3,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: [],
    tags: ['dry_curry', 'festive', 'comfort_food'],
    ingredient_ids: ['ING_CHICKEN', 'ING_COCONUT_MILK', 'ING_LEMONGRASS', 'ING_GALANGAL', 'ING_GINGER', 'ING_GARLIC', 'ING_SHALLOT', 'ING_CHILI', 'ING_TURMERIC', 'ING_KERISIK'],
    popularity: 88
  },
  {
    id: 'MAL_GULAI_KAWAH',
    slug: 'gulai-kawah',
    name: 'Gulai Kawah',
    local_name: 'Gulai Kawah',
    description: 'Northern Malaysian curry cooked in a large wok (kawah) with mutton, beef, or offal in a rich coconut curry base',
    category: 'curry',
    region: 'kelantan',
    status: 'traditional',
    protein_type: 'beef',
    cooking_method: 'braised',
    prep_time_min: 120,
    spice_level: 3,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: [],
    tags: ['kelantan', 'festive', 'large_pot', 'communal'],
    ingredient_ids: ['ING_BEEF', 'ING_COCONUT_MILK', 'ING_CURRY_POWDER', 'ING_TURMERIC', 'ING_LEMONGRASS', 'ING_GALANGAL', 'ING_GINGER', 'ING_CHILI', 'ING_SHALLOT'],
    popularity: 75
  },
  {
    id: 'MAL_CURRY_KAPITAN',
    slug: 'curry-kapitan',
    name: 'Curry Kapitan',
    local_name: 'Kari Kapitan',
    description: 'Penang Nyonya-style dry chicken curry with a tangy tamarind undertone and candlenuts for richness',
    category: 'curry',
    region: 'penang',
    status: 'classic',
    protein_type: 'chicken',
    cooking_method: 'braised',
    prep_time_min: 60,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: false,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['tree_nuts'],
    tags: ['nyonya', 'penang', 'tamarind', 'peranakan'],
    ingredient_ids: ['ING_CHICKEN', 'ING_COCONUT_MILK', 'ING_CANDLENUT', 'ING_TAMARIND', 'ING_LEMONGRASS', 'ING_GALANGAL', 'ING_TURMERIC', 'ING_CHILI', 'ING_SHALLOT', 'ING_GARLIC'],
    popularity: 80
  }
];
