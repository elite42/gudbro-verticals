/**
 * Malaysian Soup Dishes
 * Hearty soups and broths of Malaysia
 */

import { MalaysianDish } from '../types';

export const soupDishes: MalaysianDish[] = [
  {
    id: 'MAL_BAK_KUT_TEH',
    slug: 'bak-kut-teh',
    name: 'Bak Kut Teh',
    local_name: 'Bak Kut Teh',
    description: 'Hokkien-style pork ribs soup simmered with Chinese herbs, garlic, and spices, served with rice and you tiao',
    category: 'soup',
    region: 'kuala_lumpur',
    status: 'iconic',
    protein_type: 'pork',
    cooking_method: 'simmered',
    prep_time_min: 120,
    spice_level: 1,
    dietary: {
      is_vegan: false,
      is_vegetarian: false,
      is_gluten_free: false,
      is_dairy_free: true,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false
    },
    allergens: ['soy', 'gluten'],
    tags: ['herbal', 'chinese', 'breakfast', 'comfort_food'],
    ingredient_ids: ['ING_PORK_RIBS', 'ING_GARLIC', 'ING_STAR_ANISE', 'ING_CINNAMON', 'ING_CLOVE', 'ING_DANG_GUI', 'ING_GOJI_BERRY', 'ING_SOY_SAUCE', 'ING_WHITE_PEPPER'],
    popularity: 90
  },
  {
    id: 'MAL_SUP_KAMBING',
    slug: 'sup-kambing',
    name: 'Mutton Soup',
    local_name: 'Sup Kambing',
    description: 'Aromatic mutton soup with bone-in mutton, celery, carrots, and Indian spices, served with bread for dipping',
    category: 'soup',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'lamb',
    cooking_method: 'simmered',
    prep_time_min: 90,
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
    allergens: [],
    tags: ['mamak', 'warming', 'late_night'],
    ingredient_ids: ['ING_LAMB', 'ING_CELERY', 'ING_CARROT', 'ING_STAR_ANISE', 'ING_CINNAMON', 'ING_CARDAMOM', 'ING_GINGER', 'ING_GARLIC', 'ING_ONION', 'ING_CORIANDER'],
    popularity: 82
  },
  {
    id: 'MAL_SUP_TULANG',
    slug: 'sup-tulang',
    name: 'Sup Tulang',
    local_name: 'Sup Tulang',
    description: 'Spicy bone marrow soup where beef or mutton bones are simmered and the marrow is sucked out, popular late-night street food',
    category: 'soup',
    region: 'kuala_lumpur',
    status: 'classic',
    protein_type: 'beef',
    cooking_method: 'simmered',
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
    tags: ['bone_marrow', 'late_night', 'street_food'],
    ingredient_ids: ['ING_BEEF_BONES', 'ING_TOMATO', 'ING_CHILI', 'ING_ONION', 'ING_GARLIC', 'ING_GINGER', 'ING_STAR_ANISE', 'ING_CINNAMON'],
    popularity: 78
  },
  {
    id: 'MAL_TOM_YAM_SEAFOOD',
    slug: 'tom-yam-seafood-malaysian',
    name: 'Malaysian Tom Yam',
    local_name: 'Tom Yam',
    description: 'Malaysian version of tom yam soup with a creamier, spicier broth loaded with seafood, mushrooms, and aromatic herbs',
    category: 'soup',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'seafood',
    cooking_method: 'boiled',
    prep_time_min: 30,
    spice_level: 4,
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
    tags: ['thai_influenced', 'spicy', 'sour', 'seafood'],
    ingredient_ids: ['ING_SHRIMP', 'ING_SQUID', 'ING_MUSHROOM', 'ING_LEMONGRASS', 'ING_GALANGAL', 'ING_KAFFIR_LIME_LEAVES', 'ING_CHILI', 'ING_LIME', 'ING_EVAPORATED_MILK', 'ING_TOMATO'],
    popularity: 85
  },
  {
    id: 'MAL_SOTO_AYAM',
    slug: 'soto-ayam-malaysia',
    name: 'Soto Ayam',
    local_name: 'Soto Ayam',
    description: 'Indonesian-influenced yellow turmeric chicken soup with glass noodles, boiled egg, potato, and fried shallots',
    category: 'soup',
    region: 'nationwide',
    status: 'classic',
    protein_type: 'chicken',
    cooking_method: 'simmered',
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
    allergens: ['eggs'],
    tags: ['javanese', 'turmeric', 'comfort_food'],
    ingredient_ids: ['ING_CHICKEN', 'ING_TURMERIC', 'ING_GINGER', 'ING_GALANGAL', 'ING_LEMONGRASS', 'ING_GLASS_NOODLES', 'ING_EGG', 'ING_POTATO', 'ING_SHALLOT', 'ING_CELERY'],
    popularity: 80
  }
];
