/**
 * Malaysian Seafood Dishes
 * Fresh seafood dishes of Malaysia
 */

import { MalaysianDish } from '../types';

export const seafoodDishes: MalaysianDish[] = [
  {
    id: 'MAL_UDANG_GALAH',
    slug: 'udang-galah',
    name: 'Giant River Prawn',
    local_name: 'Udang Galah Bakar',
    description: 'Grilled giant freshwater prawns basted with butter and garlic, a premium seafood dish',
    category: 'seafood',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'shrimp',
    cooking_method: 'grilled',
    prep_time_min: 30,
    spice_level: 1,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: true,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['shellfish', 'dairy'],
    tags: ['premium', 'grilled', 'river_prawn'],
    ingredient_ids: ['ING_SHRIMP', 'ING_BUTTER', 'ING_GARLIC', 'ING_LIME', 'ING_SALT', 'ING_BLACK_PEPPER'],
    popularity: 82
  },
  {
    id: 'MAL_CHILI_CRAB',
    slug: 'chili-crab-malaysian',
    name: 'Malaysian Chili Crab',
    local_name: 'Ketam Cili',
    description: 'Mud crab cooked in a sweet and spicy tomato-chili sauce, a Malaysian interpretation of the famous dish',
    category: 'seafood',
    region: 'kuala_lumpur',
    status: 'classic',
    protein_type: 'crab',
    cooking_method: 'stir_fried',
    prep_time_min: 40,
    spice_level: 3,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['shellfish', 'eggs'],
    tags: ['crab', 'spicy', 'premium'],
    ingredient_ids: ['ING_CRAB', 'ING_CHILI', 'ING_TOMATO_SAUCE', 'ING_EGG', 'ING_GARLIC', 'ING_GINGER', 'ING_SHALLOT', 'ING_SUGAR'],
    popularity: 85
  },
  {
    id: 'MAL_BUTTER_PRAWN',
    slug: 'butter-prawn',
    name: 'Butter Prawns',
    local_name: 'Udang Butter',
    description: 'Crispy fried prawns coated in a buttery sauce with curry leaves and chili padi for a sweet-savory taste',
    category: 'seafood',
    region: 'kuala_lumpur',
    status: 'classic',
    protein_type: 'shrimp',
    cooking_method: 'deep_fried',
    prep_time_min: 25,
    spice_level: 2,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false
    },
    allergens: ['shellfish', 'dairy', 'eggs'],
    tags: ['butter', 'crispy', 'curry_leaf'],
    ingredient_ids: ['ING_SHRIMP', 'ING_BUTTER', 'ING_CURRY_LEAF', 'ING_CHILI', 'ING_EGG', 'ING_EVAPORATED_MILK', 'ING_SUGAR'],
    popularity: 88
  },
  {
    id: 'MAL_SIAKAP_SWEET_SOUR',
    slug: 'siakap-sweet-sour',
    name: 'Sweet and Sour Sea Bass',
    local_name: 'Siakap Masam Manis',
    description: 'Whole fried sea bass topped with a tangy sweet and sour sauce, colorful vegetables, and pineapple',
    category: 'seafood',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'fish',
    cooking_method: 'deep_fried',
    prep_time_min: 35,
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
    allergens: ['fish', 'soy'],
    tags: ['sweet_sour', 'whole_fish', 'banquet'],
    ingredient_ids: ['ING_SEA_BASS', 'ING_PINEAPPLE', 'ING_TOMATO', 'ING_ONION', 'ING_BELL_PEPPER', 'ING_VINEGAR', 'ING_SUGAR', 'ING_CORNSTARCH'],
    popularity: 80
  },
  {
    id: 'MAL_STEAMED_FISH',
    slug: 'ikan-stim-limau',
    name: 'Lime Steamed Fish',
    local_name: 'Ikan Stim Limau',
    description: 'Whole fish steamed with lime juice, garlic, and ginger, finished with hot oil and soy sauce',
    category: 'seafood',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'fish',
    cooking_method: 'steamed',
    prep_time_min: 25,
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
    allergens: ['fish', 'soy'],
    tags: ['healthy', 'light', 'chinese_style'],
    ingredient_ids: ['ING_WHITE_FISH', 'ING_LIME', 'ING_GARLIC', 'ING_GINGER', 'ING_SOY_SAUCE', 'ING_SCALLION', 'ING_VEGETABLE_OIL'],
    popularity: 78
  },
  {
    id: 'MAL_SOTONG_GORENG',
    slug: 'sotong-goreng-tepung',
    name: 'Fried Squid',
    local_name: 'Sotong Goreng Tepung',
    description: 'Crispy battered squid rings deep-fried to golden perfection, served with chili sauce',
    category: 'seafood',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'squid',
    cooking_method: 'deep_fried',
    prep_time_min: 20,
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
    allergens: ['shellfish', 'gluten'],
    tags: ['crispy', 'appetizer', 'street_food'],
    ingredient_ids: ['ING_SQUID', 'ING_FLOUR', 'ING_CORNSTARCH', 'ING_EGG', 'ING_SALT', 'ING_BLACK_PEPPER'],
    popularity: 82
  }
];
