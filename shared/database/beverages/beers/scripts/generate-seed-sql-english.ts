/**
 * Generate SQL File for Seeding Beers (ENGLISH ONLY)
 *
 * This script generates clean SQL with only English content.
 * Translations will be handled separately.
 *
 * Run with: npx tsx shared/database/beers/scripts/generate-seed-sql-english.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// Use require for beer imports to avoid ESM/CJS issues
const { internationalLagers } = require('../international-lagers/index');
const { belgianClassics } = require('../belgian-classics/index');
const { stoutsPorters } = require('../stouts-porters/index');
const { germanClassics } = require('../german-classics/index');
const { craftIpas } = require('../craft-ipas/index');
const { britishAles } = require('../british-ales/index');
const { wheatBeers } = require('../wheat-beers/index');

import type { Beer } from '../../types/beer';

// Combine all beers
const allBeers: Beer[] = [
  ...(internationalLagers || []),
  ...(belgianClassics || []),
  ...(stoutsPorters || []),
  ...(germanClassics || []),
  ...(craftIpas || []),
  ...(britishAles || []),
  ...(wheatBeers || []),
];

console.log('🍺 Beer counts:');
console.log(`   - International Lagers: ${internationalLagers?.length || 0}`);
console.log(`   - Belgian Classics: ${belgianClassics?.length || 0}`);
console.log(`   - Stouts & Porters: ${stoutsPorters?.length || 0}`);
console.log(`   - German Classics: ${germanClassics?.length || 0}`);
console.log(`   - Craft IPAs: ${craftIpas?.length || 0}`);
console.log(`   - British Ales: ${britishAles?.length || 0}`);
console.log(`   - Wheat Beers: ${wheatBeers?.length || 0}`);
console.log(`   - TOTAL: ${allBeers.length}`);

/**
 * Extract English text from a multilingual object.
 * For JSONB columns, keeps the {en: "value"} structure.
 */
function extractEnglish(value: any, keepJsonbStructure: boolean = false): any {
  if (value === null || value === undefined) {
    return null;
  }

  // If it's an object with 'en' key (multilingual field)
  if (typeof value === 'object' && !Array.isArray(value) && value.en !== undefined) {
    const keys = Object.keys(value);
    const langKeys = ['en', 'it', 'vi', 'ko', 'ja', 'es', 'fr', 'de', 'pt', 'zh'];
    const isMultilingual = keys.every(k => langKeys.includes(k));

    if (isMultilingual) {
      if (keepJsonbStructure) {
        return { en: value.en };
      }
      return value.en;
    }
  }

  // If it's a string, return as-is
  if (typeof value === 'string') {
    return value;
  }

  // If it's an array, process each item
  if (Array.isArray(value)) {
    return value.map(item => extractEnglish(item, keepJsonbStructure));
  }

  // If it's an object, recursively process all properties
  if (typeof value === 'object') {
    const result: any = {};
    for (const key of Object.keys(value)) {
      result[key] = extractEnglish(value[key], keepJsonbStructure);
    }
    return result;
  }

  return value;
}

/**
 * For JSONB columns that expect multilingual structure
 */
function toEnglishJsonb(value: any): any {
  return extractEnglish(value, true);
}

/**
 * Escape single quotes for SQL strings
 */
function escapeSql(str: string): string {
  if (typeof str !== 'string') return str;
  return str.replace(/'/g, "''");
}

/**
 * Convert a value to SQL format
 */
function toSqlValue(value: any): string {
  if (value === null || value === undefined) {
    return 'NULL';
  }

  if (typeof value === 'string') {
    return `'${escapeSql(value)}'`;
  }

  if (typeof value === 'number') {
    return value.toString();
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "'{}'";
    }
    // Check if array contains objects
    if (typeof value[0] === 'object') {
      // JSONB array
      const jsonStr = JSON.stringify(value);
      return `'${escapeSql(jsonStr)}'::jsonb`;
    }
    // Simple string array - PostgreSQL array syntax
    const items = value.map(v => `"${escapeSql(String(v))}"`);
    return `'{${items.join(',')}}'`;
  }

  if (typeof value === 'object') {
    // For JSONB columns
    const jsonStr = JSON.stringify(value);
    return `'${escapeSql(jsonStr)}'::jsonb`;
  }

  return 'NULL';
}

/**
 * Generate INSERT statement for a single beer (English only)
 */
function generateInsertStatement(beer: Beer): string {
  if (!beer || !beer.id) {
    console.error('Invalid beer:', beer);
    return '';
  }

  // For JSONB columns that store multilingual text, keep {en: "value"} structure
  const name = toEnglishJsonb(beer.name);
  const description = toEnglishJsonb(beer.description);
  const tagline = toEnglishJsonb(beer.tagline);
  const brewery = toEnglishJsonb(beer.origin.brewery);

  // For complex objects, recursively extract English
  const history = extractEnglish(beer.history, true);
  const taste = extractEnglish(beer.taste, true);
  const pairing = extractEnglish(beer.pairing, true);
  const serving = extractEnglish(beer.serving, true);

  const values = {
    id: toSqlValue(beer.id),
    slug: toSqlValue(beer.slug),
    stable_key: toSqlValue(beer.stable_key),
    name: toSqlValue(name),
    status: toSqlValue(beer.status),
    style_category: toSqlValue(beer.style_category),
    style: toSqlValue(beer.style),
    tags: toSqlValue(beer.tags || []),

    // Origin
    origin_country: toSqlValue(beer.origin.country),
    origin_country_code: toSqlValue(beer.origin.country_code || null),
    origin_region: toSqlValue(beer.origin.region || null),
    origin_city: toSqlValue(beer.origin.city || null),
    brewery: toSqlValue(brewery),
    brewery_founded: toSqlValue(beer.origin.brewery_founded || null),
    brewery_type: toSqlValue(beer.origin.brewery_type || null),
    is_trappist: toSqlValue(beer.origin.is_trappist || false),

    // History (English only)
    first_brewed: toSqlValue(history?.first_brewed || null),
    history_story: toSqlValue(history?.story || null),
    history_awards: toSqlValue(history?.awards || []),
    history_named_after: toSqlValue(history?.named_after || null),
    history_significance: toSqlValue(history?.significance || null),

    // Description (English only)
    description: toSqlValue(description),
    tagline: toSqlValue(tagline),

    // Characteristics
    abv: toSqlValue(beer.characteristics.abv),
    abv_min: toSqlValue(beer.characteristics.abv_range?.min || null),
    abv_max: toSqlValue(beer.characteristics.abv_range?.max || null),
    ibu: toSqlValue(beer.characteristics.ibu || null),
    ibu_min: toSqlValue(beer.characteristics.ibu_range?.min || null),
    ibu_max: toSqlValue(beer.characteristics.ibu_range?.max || null),
    srm: toSqlValue(beer.characteristics.srm || null),
    og: toSqlValue(beer.characteristics.og || null),
    fg: toSqlValue(beer.characteristics.fg || null),
    color: toSqlValue(beer.characteristics.color),
    clarity: toSqlValue(beer.characteristics.clarity || null),
    carbonation: toSqlValue(beer.characteristics.carbonation || null),
    body: toSqlValue(beer.characteristics.body || null),
    fermentation: toSqlValue(beer.characteristics.fermentation || null),

    // Taste (English only)
    flavor_profile: toSqlValue(taste?.profile || []),
    taste_description: toSqlValue(taste?.description || null),
    taste_aroma: toSqlValue(taste?.aroma || null),
    taste_first_impression: toSqlValue(taste?.first_impression || null),
    taste_finish: toSqlValue(taste?.finish || null),
    taste_balance: toSqlValue(taste?.balance || null),
    bitterness_level: toSqlValue(taste?.bitterness_level || null),
    sweetness_level: toSqlValue(taste?.sweetness_level || null),

    // Ingredients
    ingredients_malts: toSqlValue(beer.ingredients?.malts || []),
    ingredients_hops: toSqlValue(beer.ingredients?.hops || []),
    ingredients_yeast: toSqlValue(beer.ingredients?.yeast || null),
    ingredients_adjuncts: toSqlValue(beer.ingredients?.adjuncts || []),
    ingredients_water: toSqlValue(beer.ingredients?.water || null),
    ingredients_special: toSqlValue(beer.ingredients?.special_ingredients || []),

    // Serving (English only)
    serving_glass: toSqlValue(serving?.glass || null),
    serving_temperature: toSqlValue(serving?.temperature || null),
    serving_temp_min: toSqlValue(serving?.temperature_celsius?.min || null),
    serving_temp_max: toSqlValue(serving?.temperature_celsius?.max || null),
    serving_pouring_notes: toSqlValue(serving?.pouring_notes || null),
    serving_head_retention: toSqlValue(serving?.head_retention ?? true),
    serving_ideal_head: toSqlValue(serving?.ideal_head || null),

    // Pairing (English only)
    pairing_food_categories: toSqlValue(pairing?.food_categories || []),
    pairing_food: toSqlValue(pairing?.food_pairings || null),
    pairing_cheese: toSqlValue(pairing?.cheese_pairings || []),
    pairing_cuisine: toSqlValue(pairing?.cuisine_pairings || []),
    pairing_avoid: toSqlValue(pairing?.avoid_with || null),

    // Dietary & Tags
    season_tags: toSqlValue(beer.season_tags || []),
    occasion_tags: toSqlValue(beer.occasion_tags || []),
    is_gluten_free: toSqlValue(beer.is_gluten_free || false),
    is_non_alcoholic: toSqlValue(beer.is_non_alcoholic || false),
    is_organic: toSqlValue(beer.is_organic || false),
    is_vegan: toSqlValue(beer.is_vegan ?? true),

    // Formats & Availability
    available_formats: toSqlValue(beer.available_formats || ['bottle']),
    available_sizes: toSqlValue(beer.available_sizes || []),
    related_beers: toSqlValue(beer.related_beers || []),
    availability: toSqlValue(beer.availability || 'year_round'),

    // Business
    price_tier: toSqlValue(beer.price_tier || 'mid'),
    popularity: toSqlValue(beer.popularity || null),

    // Sources
    source_url: toSqlValue(beer.source?.primary || null),
    source_note: toSqlValue(beer.source?.note || null),

    // Metadata
    version: toSqlValue(beer.version || 1),
  };

  const columns = Object.keys(values).join(', ');
  const valuesList = Object.values(values).join(', ');

  return `INSERT INTO beers (${columns})
VALUES (${valuesList})
ON CONFLICT (slug) DO UPDATE SET
  stable_key = EXCLUDED.stable_key,
  name = EXCLUDED.name,
  status = EXCLUDED.status,
  style_category = EXCLUDED.style_category,
  style = EXCLUDED.style,
  tags = EXCLUDED.tags,
  origin_country = EXCLUDED.origin_country,
  origin_country_code = EXCLUDED.origin_country_code,
  origin_region = EXCLUDED.origin_region,
  origin_city = EXCLUDED.origin_city,
  brewery = EXCLUDED.brewery,
  brewery_founded = EXCLUDED.brewery_founded,
  brewery_type = EXCLUDED.brewery_type,
  is_trappist = EXCLUDED.is_trappist,
  first_brewed = EXCLUDED.first_brewed,
  history_story = EXCLUDED.history_story,
  history_awards = EXCLUDED.history_awards,
  history_named_after = EXCLUDED.history_named_after,
  history_significance = EXCLUDED.history_significance,
  description = EXCLUDED.description,
  tagline = EXCLUDED.tagline,
  abv = EXCLUDED.abv,
  ibu = EXCLUDED.ibu,
  srm = EXCLUDED.srm,
  color = EXCLUDED.color,
  clarity = EXCLUDED.clarity,
  carbonation = EXCLUDED.carbonation,
  body = EXCLUDED.body,
  fermentation = EXCLUDED.fermentation,
  flavor_profile = EXCLUDED.flavor_profile,
  taste_description = EXCLUDED.taste_description,
  taste_aroma = EXCLUDED.taste_aroma,
  taste_finish = EXCLUDED.taste_finish,
  bitterness_level = EXCLUDED.bitterness_level,
  sweetness_level = EXCLUDED.sweetness_level,
  serving_glass = EXCLUDED.serving_glass,
  serving_temperature = EXCLUDED.serving_temperature,
  serving_pouring_notes = EXCLUDED.serving_pouring_notes,
  pairing_food = EXCLUDED.pairing_food,
  pairing_cheese = EXCLUDED.pairing_cheese,
  pairing_cuisine = EXCLUDED.pairing_cuisine,
  season_tags = EXCLUDED.season_tags,
  occasion_tags = EXCLUDED.occasion_tags,
  is_gluten_free = EXCLUDED.is_gluten_free,
  is_non_alcoholic = EXCLUDED.is_non_alcoholic,
  is_vegan = EXCLUDED.is_vegan,
  available_formats = EXCLUDED.available_formats,
  available_sizes = EXCLUDED.available_sizes,
  availability = EXCLUDED.availability,
  price_tier = EXCLUDED.price_tier,
  popularity = EXCLUDED.popularity,
  source_url = EXCLUDED.source_url,
  source_note = EXCLUDED.source_note,
  version = EXCLUDED.version,
  updated_at = NOW();
`;
}

/**
 * Generate complete SQL file
 */
function generateSqlFile() {
  console.log('\n📝 Generating English-only SQL file...\n');

  const header = `-- ============================================================================
-- BEERS DATABASE SEED (ENGLISH ONLY)
-- ============================================================================
--
-- This file contains INSERT statements for seeding the beers table
-- with ENGLISH ONLY content. Translations will be added separately.
--
-- Total Beers: ${allBeers.length}
--
-- Generated: ${new Date().toISOString()}
-- ============================================================================

`;

  const footer = `
-- ============================================================================
-- Verify insertion
-- ============================================================================
SELECT
  status,
  style_category,
  COUNT(*) as count
FROM beers
GROUP BY status, style_category
ORDER BY status, style_category;

SELECT COUNT(*) as total_beers FROM beers;
`;

  let sqlContent = header;
  let successCount = 0;

  allBeers.forEach((beer, index) => {
    const statement = generateInsertStatement(beer);
    if (statement) {
      const beerName = typeof beer.name === 'object' ? beer.name.en : beer.name;
      sqlContent += `\n-- ${index + 1}. ${beerName || beer.slug}\n`;
      sqlContent += statement;
      sqlContent += '\n';
      successCount++;
      console.log(`  ✅ ${index + 1}. ${beerName || beer.slug}`);
    }
  });

  sqlContent += footer;

  // Write to file
  const outputPath = path.join(__dirname, 'seed-beers-english.sql');
  fs.writeFileSync(outputPath, sqlContent, 'utf8');

  console.log('\n' + '─'.repeat(50));
  console.log(`\n✨ SQL file generated successfully!`);
  console.log(`📊 Statistics:`);
  console.log(`  - Processed: ${successCount} beers`);
  console.log(`  - Output: ${outputPath}`);
  console.log(`  - File size: ${(sqlContent.length / 1024).toFixed(2)} KB`);
  console.log('\n💡 Next steps:');
  console.log('  1. Run create-beers-table.sql first (if not already done)');
  console.log('  2. Go to Supabase Dashboard > SQL Editor');
  console.log('  3. Copy and paste the SQL');
  console.log('  4. Click "Run" to seed the database');
  console.log('\n');
}

// Run the generator
generateSqlFile();
