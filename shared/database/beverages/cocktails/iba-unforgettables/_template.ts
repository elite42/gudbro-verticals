/**
 * GUDBRO Cocktail Template
 *
 * Copy this file to create a new cocktail.
 * Replace all {PLACEHOLDER} values.
 *
 * File naming: {slug}.ts (e.g., dry-martini.ts, old-fashioned.ts)
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const {variableName}: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '{UUID}',
  slug: '{slug}',
  stable_key: '{stable_key}',

  name: {
    en: '{Name}',
    it: '{Name IT}',
    vi: '{Name VI}',
    ko: '{Name KO}',
    ja: '{Name JA}',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: '{Description EN}',
    it: '{Description IT}',
    vi: '{Description VI}',
  },

  history: {
    created_year: '{year}',
    origin: {
      city: '{City}',
      bar: '{Bar}',
      country: '{Country}',
    },
    creator: {
      name: '{Creator Name}',
      profession: 'bartender',
    },
    story: {
      en: '{Story EN}',
      it: '{Story IT}',
      vi: '{Story VI}',
    },
    named_after: {
      en: '{Named after EN}',
      it: '{Named after IT}',
      vi: '{Named after VI}',
    },
  },

  taste: {
    profile: ['sweet', 'sour'],
    description: {
      en: '{Taste description EN}',
      it: '{Taste description IT}',
      vi: '{Taste description VI}',
    },
    first_impression: {
      en: '{First impression EN}',
      it: '{First impression IT}',
      vi: '{First impression VI}',
    },
    finish: {
      en: '{Finish EN}',
      it: '{Finish IT}',
      vi: '{Finish VI}',
    },
    balance: {
      en: '{Balance EN}',
      it: '{Balance IT}',
      vi: '{Balance VI}',
    },
  },

  recommendations: {
    best_time: ['evening'],
    occasions: ['aperitivo', 'date_night'],
    seasons: ['all_year'],
    food_pairings: {
      en: '{Food pairings EN}',
      it: '{Food pairings IT}',
      vi: '{Food pairings VI}',
    },
    ideal_for: {
      en: '{Ideal for EN}',
      it: '{Ideal for IT}',
      vi: '{Ideal for VI}',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_{INGREDIENT}',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: '{Ingredient}', it: '{Ingredient IT}', vi: '{Ingredient VI}' },
    },
  ],

  method: 'stir',

  instructions: {
    en: '{Instructions EN}',
    it: '{Instructions IT}',
    vi: '{Instructions VI}',
  },

  glass: 'Cocktail glass',

  garnish: {
    en: '{Garnish EN}',
    it: '{Garnish IT}',
    vi: '{Garnish VI}',
  },

  ice: 'none',
  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_{BASE_SPIRIT}'],
  flavor_profile: ['boozy', 'dry'],
  abv_estimate: 25,
  calories_estimate: 150,
  difficulty: 'easy',
  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['all_year'],
  occasion_tags: ['aperitivo', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [],

  notes_for_staff: '{Staff notes}',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 80,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/{slug}/',
    note: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
