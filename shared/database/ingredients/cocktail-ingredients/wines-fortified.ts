/**
 * GUDBRO Cocktail Ingredients - Wines & Fortified Wines
 *
 * Wines and fortified wines used in cocktails with complete 5 Dimensioni data.
 *
 * Categories:
 * - Sparkling Wines (Champagne, Prosecco, Cava)
 * - Fortified Wines (Port, Sherry, Madeira)
 * - Regular Wines (for cocktails)
 *
 * @version 1.0
 * @lastUpdated 2025-12-13
 */

import type { IngredientMaster } from '../../types';

const baseWineFlags = {
  vegan: true, // Most wines, though some use animal fining agents
  vegetarian: true,
  pescatarian: true,
  gluten_free: true,
  dairy_free: true,
  nut_free: true,
  low_carb: false,
  halal: false, // Contains alcohol
  kosher: false, // Requires special certification
};

export const winesFortifiedIngredients: IngredientMaster[] = [
  // ========================================================================
  // SPARKLING WINES
  // ========================================================================
  {
    id: 'ING_CHAMPAGNE',
    slug: 'champagne',
    name: {
      en: 'Champagne',
      it: 'Champagne',
      vi: 'Champagne',
      ko: '샴페인',
      ja: 'シャンパン',
    },
    description: {
      en: 'French sparkling wine, essential for French 75 and Bellini',
      it: 'Vino spumante francese, essenziale per French 75 e Bellini',
    },
    category: { main: 'wine', sub: 'sparkling' },
    allergens: { sulphites: true },
    intolerances: { alcohol: true },
    dietary_restrictions: baseWineFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 1,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 85, // per 120ml
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_PROSECCO',
    slug: 'prosecco',
    name: {
      en: 'Prosecco',
      it: 'Prosecco',
      vi: 'Prosecco',
      ko: '프로세코',
      ja: 'プロセッコ',
    },
    description: {
      en: 'Italian sparkling wine, essential for Aperol Spritz',
      it: 'Vino spumante italiano, essenziale per Aperol Spritz',
    },
    category: { main: 'wine', sub: 'sparkling' },
    allergens: { sulphites: true },
    intolerances: { alcohol: true },
    dietary_restrictions: baseWineFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 1,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 80,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_CAVA',
    slug: 'cava',
    name: {
      en: 'Cava',
      it: 'Cava',
      vi: 'Cava',
      ko: '카바',
      ja: 'カバ',
    },
    description: {
      en: 'Spanish sparkling wine',
      it: 'Vino spumante spagnolo',
    },
    category: { main: 'wine', sub: 'sparkling' },
    allergens: { sulphites: true },
    intolerances: { alcohol: true },
    dietary_restrictions: baseWineFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 1,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 77,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_SPARKLING_WINE',
    slug: 'sparkling-wine',
    name: {
      en: 'Sparkling Wine (Generic)',
      it: 'Spumante',
      vi: 'Rượu Vang Sủi',
      ko: '스파클링 와인',
      ja: 'スパークリングワイン',
    },
    description: {
      en: 'Generic sparkling wine for cocktails',
      it: 'Spumante generico per cocktail',
    },
    category: { main: 'wine', sub: 'sparkling' },
    allergens: { sulphites: true },
    intolerances: { alcohol: true },
    dietary_restrictions: baseWineFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 1,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 80,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },

  // ========================================================================
  // FORTIFIED WINES - SHERRY
  // ========================================================================
  {
    id: 'ING_SHERRY_DRY',
    slug: 'dry-sherry-fino',
    name: {
      en: 'Dry Sherry (Fino/Manzanilla)',
      it: 'Sherry Secco (Fino)',
      vi: 'Sherry Khô',
      ko: '드라이 셰리',
      ja: 'ドライシェリー',
    },
    description: {
      en: 'Light, dry Spanish fortified wine',
      it: 'Vino fortificato spagnolo leggero e secco',
    },
    category: { main: 'wine', sub: 'fortified' },
    allergens: { sulphites: true },
    intolerances: { alcohol: true },
    dietary_restrictions: baseWineFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 1,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 55,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_SHERRY_AMONTILLADO',
    slug: 'amontillado-sherry',
    name: {
      en: 'Amontillado Sherry',
      it: 'Sherry Amontillado',
      vi: 'Sherry Amontillado',
      ko: '아몬티야도 셰리',
      ja: 'アモンティリャードシェリー',
    },
    description: {
      en: 'Amber-colored medium sherry with nutty notes',
      it: 'Sherry ambrato medio con note di frutta secca',
    },
    category: { main: 'wine', sub: 'fortified' },
    allergens: { sulphites: true },
    intolerances: { alcohol: true },
    dietary_restrictions: baseWineFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 2,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 60,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_SHERRY_OLOROSO',
    slug: 'oloroso-sherry',
    name: {
      en: 'Oloroso Sherry',
      it: 'Sherry Oloroso',
      vi: 'Sherry Oloroso',
      ko: '올로로소 셰리',
      ja: 'オロロソシェリー',
    },
    description: {
      en: 'Full-bodied dry sherry with nutty, oxidized notes',
      it: 'Sherry secco corposo con note di frutta secca e ossidazione',
    },
    category: { main: 'wine', sub: 'fortified' },
    allergens: { sulphites: true },
    intolerances: { alcohol: true },
    dietary_restrictions: baseWineFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 1,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 65,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_SHERRY_PX',
    slug: 'pedro-ximenez-sherry',
    name: {
      en: 'Pedro Ximénez Sherry',
      it: 'Sherry Pedro Ximénez',
      vi: 'Sherry Pedro Ximénez',
      ko: '페드로 히메네스 셰리',
      ja: 'ペドロヒメネスシェリー',
    },
    description: {
      en: 'Sweet, syrupy sherry with raisin notes',
      it: 'Sherry dolce e sciropposo con note di uvetta',
    },
    category: { main: 'wine', sub: 'fortified' },
    allergens: { sulphites: true },
    intolerances: { alcohol: true },
    dietary_restrictions: baseWineFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 15,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 95,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },

  // ========================================================================
  // FORTIFIED WINES - PORT
  // ========================================================================
  {
    id: 'ING_PORT_RUBY',
    slug: 'ruby-port',
    name: {
      en: 'Ruby Port',
      it: 'Porto Ruby',
      vi: 'Port Ruby',
      ko: '루비 포트',
      ja: 'ルビーポート',
    },
    description: {
      en: 'Young, fruity Portuguese fortified wine',
      it: 'Vino fortificato portoghese giovane e fruttato',
    },
    category: { main: 'wine', sub: 'fortified' },
    allergens: { sulphites: true },
    intolerances: { alcohol: true },
    dietary_restrictions: baseWineFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 7,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 95,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_PORT_TAWNY',
    slug: 'tawny-port',
    name: {
      en: 'Tawny Port',
      it: 'Porto Tawny',
      vi: 'Port Tawny',
      ko: '토니 포트',
      ja: 'トゥニーポート',
    },
    description: {
      en: 'Aged port with nutty, caramel notes',
      it: 'Porto invecchiato con note di frutta secca e caramello',
    },
    category: { main: 'wine', sub: 'fortified' },
    allergens: { sulphites: true },
    intolerances: { alcohol: true },
    dietary_restrictions: baseWineFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 6,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 90,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_PORT_WHITE',
    slug: 'white-port',
    name: {
      en: 'White Port',
      it: 'Porto Bianco',
      vi: 'Port Trắng',
      ko: '화이트 포트',
      ja: 'ホワイトポート',
    },
    description: {
      en: 'White Portuguese fortified wine',
      it: 'Vino fortificato portoghese bianco',
    },
    category: { main: 'wine', sub: 'fortified' },
    allergens: { sulphites: true },
    intolerances: { alcohol: true },
    dietary_restrictions: baseWineFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 5,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 85,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },

  // ========================================================================
  // FORTIFIED WINES - OTHER
  // ========================================================================
  {
    id: 'ING_MADEIRA',
    slug: 'madeira',
    name: {
      en: 'Madeira',
      it: 'Madeira',
      vi: 'Madeira',
      ko: '마데이라',
      ja: 'マデイラ',
    },
    description: {
      en: 'Portuguese fortified wine from Madeira island',
      it: 'Vino fortificato portoghese dall\'isola di Madeira',
    },
    category: { main: 'wine', sub: 'fortified' },
    allergens: { sulphites: true },
    intolerances: { alcohol: true },
    dietary_restrictions: baseWineFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 8,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 90,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_MARSALA',
    slug: 'marsala',
    name: {
      en: 'Marsala',
      it: 'Marsala',
      vi: 'Marsala',
      ko: '마르살라',
      ja: 'マルサラ',
    },
    description: {
      en: 'Sicilian fortified wine',
      it: 'Vino fortificato siciliano',
    },
    category: { main: 'wine', sub: 'fortified' },
    allergens: { sulphites: true },
    intolerances: { alcohol: true },
    dietary_restrictions: baseWineFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 7,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 85,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },

  // ========================================================================
  // REGULAR WINES FOR COCKTAILS
  // ========================================================================
  {
    id: 'ING_RED_WINE',
    slug: 'red-wine',
    name: {
      en: 'Red Wine',
      it: 'Vino Rosso',
      vi: 'Rượu Vang Đỏ',
      ko: '레드 와인',
      ja: '赤ワイン',
    },
    description: {
      en: 'Dry red wine for Sangria and mulled wine',
      it: 'Vino rosso secco per Sangria e vin brulé',
    },
    category: { main: 'wine', sub: 'still' },
    allergens: { sulphites: true },
    intolerances: { alcohol: true, histamine: true },
    dietary_restrictions: baseWineFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 3,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 85,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_WHITE_WINE',
    slug: 'white-wine',
    name: {
      en: 'White Wine',
      it: 'Vino Bianco',
      vi: 'Rượu Vang Trắng',
      ko: '화이트 와인',
      ja: '白ワイン',
    },
    description: {
      en: 'Dry white wine for spritzers and Kir',
      it: 'Vino bianco secco per spritzer e Kir',
    },
    category: { main: 'wine', sub: 'still' },
    allergens: { sulphites: true },
    intolerances: { alcohol: true },
    dietary_restrictions: baseWineFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 2,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 82,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_ROSE_WINE',
    slug: 'rose-wine',
    name: {
      en: 'Rosé Wine',
      it: 'Vino Rosé',
      vi: 'Rượu Vang Hồng',
      ko: '로제 와인',
      ja: 'ロゼワイン',
    },
    description: {
      en: 'Dry rosé wine for frosé and spritzers',
      it: 'Vino rosé secco per frosé e spritzer',
    },
    category: { main: 'wine', sub: 'still' },
    allergens: { sulphites: true },
    intolerances: { alcohol: true },
    dietary_restrictions: baseWineFlags,
    spice: { level: 0 },
    nutrition: {
      protein_g: 0,
      carbs_g: 2,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 82,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },

  // ========================================================================
  // BEER FOR COCKTAILS
  // ========================================================================
  {
    id: 'ING_BEER_LAGER',
    slug: 'lager-beer',
    name: {
      en: 'Lager Beer',
      it: 'Birra Lager',
      vi: 'Bia Lager',
      ko: '라거 맥주',
      ja: 'ラガービール',
    },
    description: {
      en: 'Light lager for Michelada and Shandy',
      it: 'Lager leggera per Michelada e Shandy',
    },
    category: { main: 'beer', sub: 'lager' },
    allergens: { gluten: true },
    intolerances: { alcohol: true, gluten: true },
    dietary_restrictions: {
      ...baseWineFlags,
      gluten_free: false,
    },
    spice: { level: 0 },
    nutrition: {
      protein_g: 1,
      carbs_g: 4,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 43,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
  {
    id: 'ING_BEER_STOUT',
    slug: 'stout-beer',
    name: {
      en: 'Stout Beer',
      it: 'Birra Stout',
      vi: 'Bia Stout',
      ko: '스타우트 맥주',
      ja: 'スタウトビール',
    },
    description: {
      en: 'Dark stout for Black Velvet and beer cocktails',
      it: 'Stout scura per Black Velvet e cocktail alla birra',
    },
    category: { main: 'beer', sub: 'stout' },
    allergens: { gluten: true },
    intolerances: { alcohol: true, gluten: true },
    dietary_restrictions: {
      ...baseWineFlags,
      gluten_free: false,
    },
    spice: { level: 0 },
    nutrition: {
      protein_g: 1,
      carbs_g: 5,
      fat_g: 0,
      fiber_g: 0,
      calories_kcal: 50,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
  },
];

// ============================================================================
// EXPORTS
// ============================================================================

export const WINES_FORTIFIED_COUNT = winesFortifiedIngredients.length;
