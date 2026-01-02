/**
 * Malaysian Rice Dishes
 * Famous rice-based dishes of Malaysia
 */

import { MalaysianDish } from '../types';

export const riceDishes: MalaysianDish[] = [
  {
    id: 'MAL_NASI_LEMAK',
    slug: 'nasi-lemak',
    name: 'Nasi Lemak',
    local_name: 'Nasi Lemak',
    description: 'Malaysia\'s national dish featuring fragrant coconut rice cooked with pandan leaves, served with sambal, fried anchovies, roasted peanuts, cucumber slices, and hard-boiled egg',
    category: 'rice',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'chicken',
    cooking_method: 'steamed',
    prep_time_min: 45,
    spice_level: 3,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: false,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['peanuts', 'fish'],
    tags: ['national_dish', 'breakfast', 'street_food', 'coconut'],
    ingredient_ids: ['ING_RICE', 'ING_COCONUT_MILK', 'ING_PANDAN_LEAVES', 'ING_ANCHOVY', 'ING_PEANUTS', 'ING_CUCUMBER', 'ING_EGG', 'ING_CHILI', 'ING_SHALLOT', 'ING_GARLIC'],
    popularity: 98
  },
  {
    id: 'MAL_NASI_GORENG',
    slug: 'nasi-goreng-malaysia',
    name: 'Nasi Goreng',
    local_name: 'Nasi Goreng',
    description: 'Malaysian-style fried rice stir-fried with sweet soy sauce, shrimp paste, chilies, egg, and choice of protein, garnished with crispy shallots',
    category: 'rice',
    region: 'nationwide',
    status: 'iconic',
    protein_type: 'mixed',
    cooking_method: 'stir_fried',
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
    allergens: ['shellfish', 'soy', 'eggs'],
    tags: ['fried_rice', 'street_food', 'wok'],
    ingredient_ids: ['ING_RICE', 'ING_SOY_SAUCE', 'ING_SHRIMP_PASTE', 'ING_CHILI', 'ING_EGG', 'ING_SHALLOT', 'ING_GARLIC', 'ING_CHICKEN', 'ING_SHRIMP'],
    popularity: 92
  },
  {
    id: 'MAL_NASI_KANDAR',
    slug: 'nasi-kandar',
    name: 'Nasi Kandar',
    local_name: 'Nasi Kandar',
    description: 'Penang specialty of steamed rice served with a variety of curries and side dishes, with the rice generously ladled with flavorful curry sauces',
    category: 'rice',
    region: 'penang',
    status: 'iconic',
    protein_type: 'mixed',
    cooking_method: 'steamed',
    prep_time_min: 60,
    spice_level: 3,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['dairy'],
    tags: ['penang', 'curry', 'mamak'],
    ingredient_ids: ['ING_RICE', 'ING_CHICKEN', 'ING_BEEF', 'ING_CURRY_POWDER', 'ING_COCONUT_MILK', 'ING_ONION', 'ING_GARLIC', 'ING_GINGER', 'ING_TURMERIC', 'ING_CHILI'],
    popularity: 88
  },
  {
    id: 'MAL_NASI_KERABU',
    slug: 'nasi-kerabu',
    name: 'Nasi Kerabu',
    local_name: 'Nasi Kerabu',
    description: 'Blue-colored rice dish from Kelantan, tinted with butterfly pea flowers, served with fish, crackers, pickled vegetables, and fresh herbs',
    category: 'rice',
    region: 'kelantan',
    status: 'traditional',
    protein_type: 'fish',
    cooking_method: 'steamed',
    prep_time_min: 50,
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
    allergens: ['fish'],
    tags: ['kelantan', 'colorful', 'herbal'],
    ingredient_ids: ['ING_RICE', 'ING_BUTTERFLY_PEA', 'ING_WHITE_FISH', 'ING_COCONUT', 'ING_LEMONGRASS', 'ING_KAFFIR_LIME_LEAVES', 'ING_BEAN_SPROUTS', 'ING_CUCUMBER'],
    popularity: 82
  },
  {
    id: 'MAL_NASI_DAGANG',
    slug: 'nasi-dagang',
    name: 'Nasi Dagang',
    local_name: 'Nasi Dagang',
    description: 'East coast specialty of glutinous rice mixed with regular rice, steamed in coconut milk, served with tuna curry, pickled vegetables, and hard-boiled eggs',
    category: 'rice',
    region: 'kelantan',
    status: 'traditional',
    protein_type: 'fish',
    cooking_method: 'steamed',
    prep_time_min: 60,
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
    allergens: ['fish', 'eggs'],
    tags: ['breakfast', 'east_coast', 'glutinous'],
    ingredient_ids: ['ING_GLUTINOUS_RICE', 'ING_RICE', 'ING_COCONUT_MILK', 'ING_TUNA', 'ING_FENUGREEK', 'ING_SHALLOT', 'ING_GINGER', 'ING_CURRY_POWDER'],
    popularity: 78
  },
  {
    id: 'MAL_NASI_ULAM',
    slug: 'nasi-ulam',
    name: 'Nasi Ulam',
    local_name: 'Nasi Ulam',
    description: 'Traditional herbed rice mixed with finely sliced fresh herbs, dried shrimp, coconut, and aromatic spices, a healthy and fragrant dish',
    category: 'rice',
    region: 'kelantan',
    status: 'traditional',
    protein_type: 'shrimp',
    cooking_method: 'mixed',
    prep_time_min: 40,
    spice_level: 1,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['shellfish'],
    tags: ['herbal', 'healthy', 'aromatic'],
    ingredient_ids: ['ING_RICE', 'ING_DRIED_SHRIMP', 'ING_COCONUT', 'ING_LEMONGRASS', 'ING_KAFFIR_LIME_LEAVES', 'ING_TORCH_GINGER', 'ING_TURMERIC_LEAF', 'ING_SHALLOT'],
    popularity: 72
  }
];
