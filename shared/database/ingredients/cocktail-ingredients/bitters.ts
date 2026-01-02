/**
 * GUDBRO Cocktail Ingredients - Bitters
 *
 * Concentrated aromatic preparations with complete 5 Dimensioni data.
 * Used in dashes/drops, not sipped alone.
 *
 * Categories:
 * - Aromatic Bitters (Angostura, Peychaud's)
 * - Citrus Bitters (Orange, Grapefruit, Lemon)
 * - Specialty Bitters (Chocolate, Coffee, Celery, etc.)
 *
 * @version 1.0
 * @lastUpdated 2025-12-13
 */

import type { IngredientMaster } from '../../types';

const baseBittersFlags = {
  vegan: true,
  vegetarian: true,
  pescatarian: true,
  gluten_free: true,
  dairy_free: true,
  nut_free: true,
  low_carb: true, // Used in tiny amounts
  halal: false, // Contains alcohol
  kosher: true,
};

export const bittersIngredients: IngredientMaster[] = [
  // ========================================================================
  // AROMATIC BITTERS
  // ========================================================================
  {
    id: 'ING_ANGOSTURA_BITTERS',
    slug: 'angostura-bitters',
    name: {
      en: 'Angostura Bitters',
      it: 'Angostura Bitters',
      vi: 'Angostura Bitters',
      ko: '앙고스투라 비터스',
      ja: 'アンゴスチュラビターズ',
    },
    description: {
      en: 'Iconic aromatic bitters from Trinidad, essential for Old Fashioned',
      it: 'Iconici bitter aromatici da Trinidad, essenziali per Old Fashioned',
    },
    category: { main: 'bitters', sub: 'aromatic' },
    allergens: {},
    intolerances: { alcohol: true },
    dietary_restrictions: baseBittersFlags,
    spice: { level: 1 },
    nutrition: {
      protein_g: 0,
      carbs_g: 0,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 2, // Per dash
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_PEYCHAUDS_BITTERS',
    slug: 'peychauds-bitters',
    name: {
      en: "Peychaud's Bitters",
      it: "Peychaud's Bitters",
      vi: "Peychaud's Bitters",
      ko: '페이쇼 비터스',
      ja: 'ペイショーズビターズ',
    },
    description: {
      en: 'New Orleans aromatic bitters, essential for Sazerac',
      it: 'Bitter aromatici di New Orleans, essenziali per Sazerac',
    },
    category: { main: 'bitters', sub: 'aromatic' },
    allergens: {},
    intolerances: { alcohol: true },
    dietary_restrictions: baseBittersFlags,
    spice: { level: 1 },
    nutrition: {
      protein_g: 0,
      carbs_g: 0,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 2,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },

  // ========================================================================
  // CITRUS BITTERS
  // ========================================================================
  {
    id: 'ING_ORANGE_BITTERS',
    slug: 'orange-bitters',
    name: {
      en: 'Orange Bitters',
      it: 'Orange Bitters',
      vi: 'Orange Bitters',
      ko: '오렌지 비터스',
      ja: 'オレンジビターズ',
    },
    description: {
      en: 'Citrus bitters made with orange peel, enhances many classic cocktails',
      it: 'Bitter agli agrumi fatto con scorza d\'arancia',
    },
    category: { main: 'bitters', sub: 'citrus' },
    allergens: {},
    intolerances: { alcohol: true },
    dietary_restrictions: baseBittersFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 0,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 2,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_GRAPEFRUIT_BITTERS',
    slug: 'grapefruit-bitters',
    name: {
      en: 'Grapefruit Bitters',
      it: 'Grapefruit Bitters',
      vi: 'Grapefruit Bitters',
      ko: '자몽 비터스',
      ja: 'グレープフルーツビターズ',
    },
    description: {
      en: 'Citrus bitters with pink grapefruit notes',
      it: 'Bitter agli agrumi con note di pompelmo rosa',
    },
    category: { main: 'bitters', sub: 'citrus' },
    allergens: {},
    intolerances: { alcohol: true },
    dietary_restrictions: baseBittersFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 0,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 2,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_LEMON_BITTERS',
    slug: 'lemon-bitters',
    name: {
      en: 'Lemon Bitters',
      it: 'Lemon Bitters',
      vi: 'Lemon Bitters',
      ko: '레몬 비터스',
      ja: 'レモンビターズ',
    },
    description: {
      en: 'Bright citrus bitters with lemon peel',
      it: 'Bitter agrumati brillanti con scorza di limone',
    },
    category: { main: 'bitters', sub: 'citrus' },
    allergens: {},
    intolerances: { alcohol: true },
    dietary_restrictions: baseBittersFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 0,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 2,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },

  // ========================================================================
  // SPECIALTY BITTERS
  // ========================================================================
  {
    id: 'ING_CHOCOLATE_BITTERS',
    slug: 'chocolate-bitters',
    name: {
      en: 'Chocolate Bitters',
      it: 'Chocolate Bitters',
      vi: 'Chocolate Bitters',
      ko: '초콜릿 비터스',
      ja: 'チョコレートビターズ',
    },
    description: {
      en: 'Rich bitters with cacao and spice notes',
      it: 'Bitter ricchi con note di cacao e spezie',
    },
    category: { main: 'bitters', sub: 'specialty' },
    allergens: {},
    intolerances: { alcohol: true },
    dietary_restrictions: baseBittersFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 0,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 2,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_COFFEE_BITTERS',
    slug: 'coffee-bitters',
    name: {
      en: 'Coffee Bitters',
      it: 'Coffee Bitters',
      vi: 'Coffee Bitters',
      ko: '커피 비터스',
      ja: 'コーヒービターズ',
    },
    description: {
      en: 'Rich bitters with roasted coffee notes',
      it: 'Bitter ricchi con note di caffè tostato',
    },
    category: { main: 'bitters', sub: 'specialty' },
    allergens: {},
    intolerances: { alcohol: true, caffeine: true },
    dietary_restrictions: baseBittersFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 0,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 2,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_CELERY_BITTERS',
    slug: 'celery-bitters',
    name: {
      en: 'Celery Bitters',
      it: 'Celery Bitters',
      vi: 'Celery Bitters',
      ko: '셀러리 비터스',
      ja: 'セロリビターズ',
    },
    description: {
      en: 'Savory bitters perfect for Bloody Marys',
      it: 'Bitter salati perfetti per Bloody Mary',
    },
    category: { main: 'bitters', sub: 'specialty' },
    allergens: { celery: true },
    intolerances: { alcohol: true },
    dietary_restrictions: baseBittersFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 0,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 2,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_LAVENDER_BITTERS',
    slug: 'lavender-bitters',
    name: {
      en: 'Lavender Bitters',
      it: 'Lavender Bitters',
      vi: 'Lavender Bitters',
      ko: '라벤더 비터스',
      ja: 'ラベンダービターズ',
    },
    description: {
      en: 'Floral bitters with lavender essence',
      it: 'Bitter floreali con essenza di lavanda',
    },
    category: { main: 'bitters', sub: 'floral' },
    allergens: {},
    intolerances: { alcohol: true },
    dietary_restrictions: baseBittersFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 0,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 2,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_MOLE_BITTERS',
    slug: 'mole-bitters',
    name: {
      en: 'Mole Bitters',
      it: 'Mole Bitters',
      vi: 'Mole Bitters',
      ko: '몰레 비터스',
      ja: 'モーレビターズ',
    },
    description: {
      en: 'Complex bitters with chocolate, chili, and spices',
      it: 'Bitter complessi con cioccolato, peperoncino e spezie',
    },
    category: { main: 'bitters', sub: 'specialty' },
    allergens: {},
    intolerances: { alcohol: true },
    dietary_restrictions: baseBittersFlags,
    spice: { level: 2 },
    nutrition: {
      protein_g: 0,
      carbs_g: 0,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 2,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_AROMATIC_BITTERS',
    slug: 'aromatic-bitters',
    name: {
      en: 'Aromatic Bitters (Generic)',
      it: 'Bitter Aromatici',
      vi: 'Bitter Thơm',
      ko: '아로마틱 비터스',
      ja: 'アロマティックビターズ',
    },
    description: {
      en: 'General aromatic bitters for classic cocktails',
      it: 'Bitter aromatici generici per cocktail classici',
    },
    category: { main: 'bitters', sub: 'aromatic' },
    allergens: {},
    intolerances: { alcohol: true },
    dietary_restrictions: baseBittersFlags,
    spice: { level: 1 },
    nutrition: {
      protein_g: 0,
      carbs_g: 0,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 2,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_CREOLE_BITTERS',
    slug: 'creole-bitters',
    name: {
      en: 'Creole Bitters',
      it: 'Creole Bitters',
      vi: 'Creole Bitters',
      ko: '크리올 비터스',
      ja: 'クレオールビターズ',
    },
    description: {
      en: 'Spicy bitters with cayenne and anise',
      it: 'Bitter speziati con cayenna e anice',
    },
    category: { main: 'bitters', sub: 'spicy' },
    allergens: {},
    intolerances: { alcohol: true },
    dietary_restrictions: baseBittersFlags,
    spice: { level: 2 },
    nutrition: {
      protein_g: 0,
      carbs_g: 0,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 2,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
];

// ============================================================================
// EXPORTS
// ============================================================================

export const BITTERS_COUNT = bittersIngredients.length;
