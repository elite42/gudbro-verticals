/**
 * GUDBRO Dumplings Database - International Dumplings
 *
 * Eastern European, Middle Eastern, and other international dumplings
 * Sistema 5 Dimensioni v3.0 integrated
 */

import type { Dumpling } from '../../types/dumpling';

export const internationalDumplings: Dumpling[] = [
  // ============================================================================
  // EASTERN EUROPEAN
  // ============================================================================
  {
    id: 'dumpling-pierogi',
    slug: 'polish-pierogi',
    name: {
      en: 'Polish Pierogi',
      it: 'Pierogi Polacchi',
      vi: 'Pierogi Ba Lan',
    },
    description: {
      en: 'Traditional Polish dumplings with potato and cheese filling',
      it: 'Ravioli tradizionali polacchi con ripieno di patate e formaggio',
      vi: 'Bánh Ba Lan truyền thống với nhân khoai tây và phô mai',
    },
    style: 'eastern_european',
    status: 'active',
    tags: ['polish', 'potato', 'cheese', 'comfort_food'],
    origin: {
      country: 'Poland',
    },
    wrapper: {
      type: 'wheat',
      is_homemade: true,
      is_gluten_free: false,
    },
    filling: {
      style: 'cheese',
      ingredient_ids: ['ING_VEGETABLE_POTATO', 'ING_CHEESE_FARMERS', 'ING_VEGETABLE_ONION', 'ING_DAIRY_BUTTER'],
    },
    cooking: {
      method: 'boiled',
      time_minutes: 5,
      difficulty: 'medium',
    },
    sauce: {
      name: 'sour_cream_onion',
      ingredients: ['sour_cream', 'caramelized_onions', 'bacon_bits'],
    },
    serving: {
      portion_size: 'regular',
      pieces_per_serving: 8,
      temperature: 'hot',
      presentation: 'plated',
      garnish: ['sour_cream', 'chives'],
    },
    dietary: {
      is_vegetarian: false,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: false,
      allergens: ['gluten', 'dairy'],
      spice_level: 0,
      calories_estimate: 420,
      protein_g: 12,
      carbs_g: 58,
      fat_g: 16,
      fiber_g: 3,
    },
    pricing: {
      cost_level: 'low',
      suggested_price_usd: 12.0,
    },
    availability: {
      is_seasonal: false,
      seasons: ['all_year'],
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'dumpling-pelmeni',
    slug: 'russian-pelmeni',
    name: {
      en: 'Russian Pelmeni',
      it: 'Pelmeni Russi',
      vi: 'Pelmeni Nga',
    },
    description: {
      en: 'Small Siberian meat dumplings served in broth or with sour cream',
      it: 'Piccoli ravioli siberiani di carne serviti in brodo o con panna acida',
      vi: 'Bánh thịt nhỏ Siberia ăn với nước dùng hoặc kem chua',
    },
    style: 'eastern_european',
    status: 'active',
    tags: ['russian', 'siberian', 'meat', 'traditional'],
    origin: {
      country: 'Russia',
      region: 'Siberia',
    },
    wrapper: {
      type: 'wheat',
      is_homemade: true,
      is_gluten_free: false,
    },
    filling: {
      style: 'meat',
      ingredient_ids: ['ING_PROTEIN_BEEF', 'ING_PROTEIN_PORK', 'ING_VEGETABLE_ONION', 'ING_VEGETABLE_GARLIC'],
    },
    cooking: {
      method: 'boiled',
      time_minutes: 8,
      difficulty: 'medium',
    },
    sauce: {
      name: 'sour_cream',
      ingredients: ['sour_cream', 'dill'],
    },
    serving: {
      portion_size: 'large',
      pieces_per_serving: 15,
      temperature: 'hot',
      presentation: 'bowl',
      garnish: ['sour_cream', 'dill'],
    },
    dietary: {
      is_vegetarian: false,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: false,
      is_kosher: false,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: true,
      allergens: ['gluten', 'dairy'],
      spice_level: 0,
      calories_estimate: 480,
      protein_g: 24,
      carbs_g: 48,
      fat_g: 20,
      fiber_g: 2,
    },
    pricing: {
      cost_level: 'low',
      suggested_price_usd: 13.0,
    },
    availability: {
      is_seasonal: false,
      seasons: ['all_year'],
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'dumpling-vareniki',
    slug: 'ukrainian-vareniki',
    name: {
      en: 'Ukrainian Vareniki',
      it: 'Vareniki Ucraini',
      vi: 'Vareniki Ukraine',
    },
    description: {
      en: 'Ukrainian dumplings with sweet cherry or potato filling',
      it: 'Ravioli ucraini con ripieno dolce di ciliegie o patate',
      vi: 'Bánh Ukraine với nhân cherry ngọt hoặc khoai tây',
    },
    style: 'eastern_european',
    status: 'active',
    tags: ['ukrainian', 'cherry', 'sweet', 'potato'],
    origin: {
      country: 'Ukraine',
    },
    wrapper: {
      type: 'wheat',
      is_homemade: true,
      is_gluten_free: false,
    },
    filling: {
      style: 'sweet',
      ingredient_ids: ['ING_FRUIT_CHERRY_SOUR', 'ING_SWEETENER_SUGAR'],
    },
    cooking: {
      method: 'boiled',
      time_minutes: 5,
      difficulty: 'easy',
    },
    sauce: {
      name: 'sour_cream_sugar',
      ingredients: ['sour_cream', 'sugar'],
    },
    serving: {
      portion_size: 'regular',
      pieces_per_serving: 8,
      temperature: 'warm',
      presentation: 'bowl',
    },
    dietary: {
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: true,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: false,
      allergens: ['gluten', 'dairy', 'eggs'],
      spice_level: 0,
      calories_estimate: 360,
      protein_g: 8,
      carbs_g: 62,
      fat_g: 10,
      fiber_g: 2,
    },
    pricing: {
      cost_level: 'low',
      suggested_price_usd: 11.0,
    },
    availability: {
      is_seasonal: true,
      seasons: ['summer'],
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ============================================================================
  // MIDDLE EASTERN
  // ============================================================================
  {
    id: 'dumpling-manti',
    slug: 'turkish-manti',
    name: {
      en: 'Turkish Manti',
      it: 'Manti Turchi',
      vi: 'Manti Thổ Nhĩ Kỳ',
    },
    description: {
      en: 'Tiny Turkish dumplings with spiced lamb, topped with yogurt and garlic',
      it: 'Piccoli ravioli turchi con agnello speziato, conditi con yogurt e aglio',
      vi: 'Bánh Thổ Nhĩ Kỳ nhỏ với cừu gia vị, phủ sữa chua và tỏi',
    },
    style: 'middle_eastern',
    status: 'active',
    tags: ['turkish', 'lamb', 'yogurt', 'tiny'],
    origin: {
      country: 'Turkey',
      region: 'Kayseri',
    },
    wrapper: {
      type: 'wheat',
      is_homemade: true,
      is_gluten_free: false,
    },
    filling: {
      style: 'meat',
      ingredient_ids: ['ING_PROTEIN_LAMB', 'ING_VEGETABLE_ONION', 'ING_SPICE_CUMIN', 'ING_SPICE_PAPRIKA'],
    },
    cooking: {
      method: 'boiled',
      time_minutes: 12,
      difficulty: 'hard',
      technique_notes: 'Very small size requires patience',
    },
    sauce: {
      name: 'yogurt_garlic_sumac',
      ingredients: ['yogurt', 'garlic', 'sumac', 'chili_butter'],
    },
    serving: {
      portion_size: 'regular',
      pieces_per_serving: 25,
      temperature: 'hot',
      presentation: 'bowl',
      garnish: ['chili_flakes', 'dried_mint'],
    },
    dietary: {
      is_vegetarian: false,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: true,
      allergens: ['gluten', 'dairy'],
      spice_level: 2,
      calories_estimate: 420,
      protein_g: 22,
      carbs_g: 42,
      fat_g: 18,
      fiber_g: 2,
    },
    pricing: {
      cost_level: 'medium',
      suggested_price_usd: 16.0,
    },
    availability: {
      is_seasonal: false,
      seasons: ['all_year'],
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ============================================================================
  // SOUTH AMERICAN
  // ============================================================================
  {
    id: 'dumpling-empanada-argentina',
    slug: 'empanada-argentina',
    name: {
      en: 'Argentine Empanada',
      it: 'Empanada Argentina',
      vi: 'Empanada Argentina',
    },
    description: {
      en: 'Baked Argentine pastries filled with seasoned beef, olives, and egg',
      it: 'Sfogliatelle argentine al forno ripiene di manzo, olive e uovo',
      vi: 'Bánh nướng Argentina với nhân bò gia vị, ô liu và trứng',
    },
    style: 'south_american',
    status: 'active',
    tags: ['argentine', 'beef', 'baked', 'olives'],
    origin: {
      country: 'Argentina',
    },
    wrapper: {
      type: 'wheat',
      is_homemade: true,
      is_gluten_free: false,
      notes: 'Flaky pastry dough',
    },
    filling: {
      style: 'meat',
      ingredient_ids: ['ING_PROTEIN_BEEF', 'ING_VEGETABLE_ONION', 'ING_SPICE_CUMIN', 'ING_SPICE_PAPRIKA', 'ING_VEGETABLE_OLIVES', 'ING_EGG_HARD_BOILED'],
    },
    cooking: {
      method: 'baked',
      time_minutes: 25,
      difficulty: 'medium',
    },
    serving: {
      portion_size: 'small',
      pieces_per_serving: 2,
      temperature: 'warm',
      presentation: 'plated',
      recommended_pairing: ['chimichurri', 'malbec'],
    },
    dietary: {
      is_vegetarian: false,
      is_vegan: false,
      is_gluten_free: false,
      is_dairy_free: false,
      is_nut_free: true,
      is_halal: true,
      is_kosher: false,
      is_low_carb: false,
      is_keto_friendly: false,
      is_high_protein: true,
      allergens: ['gluten', 'eggs'],
      spice_level: 1,
      calories_estimate: 380,
      protein_g: 18,
      carbs_g: 32,
      fat_g: 20,
      fiber_g: 2,
    },
    pricing: {
      cost_level: 'low',
      suggested_price_usd: 8.0,
    },
    availability: {
      is_seasonal: false,
      seasons: ['all_year'],
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
