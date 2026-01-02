/**
 * Generate SQL File for Seeding Beers
 *
 * This script reads all beer TypeScript files and generates INSERT statements
 * for seeding the Supabase beers table.
 *
 * Run with: npx tsx shared/database/beers/scripts/generate-seed-sql.ts
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
 * Escape single quotes in strings for SQL
 */
function escapeSql(str: string): string {
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
    const items = value.map(v =>
      typeof v === 'string' ? `"${escapeSql(v)}"` : JSON.stringify(v).replace(/"/g, '\\"')
    );
    return `'{${items.join(',')}}'`;
  }

  if (typeof value === 'object') {
    // For JSONB columns
    return `'${escapeSql(JSON.stringify(value))}'::jsonb`;
  }

  return 'NULL';
}

/**
 * Generate INSERT statement for a single beer
 */
function generateInsertStatement(beer: Beer): string {
  if (!beer || !beer.id) {
    console.error('Invalid beer:', beer);
    return '';
  }

  const values = {
    id: toSqlValue(beer.id),
    slug: toSqlValue(beer.slug),
    stable_key: toSqlValue(beer.stable_key),
    name: toSqlValue(beer.name),
    status: toSqlValue(beer.status),
    style_category: toSqlValue(beer.style_category),
    style: toSqlValue(beer.style),
    tags: toSqlValue(beer.tags || []),

    // Origin
    origin_country: toSqlValue(beer.origin.country),
    origin_country_code: toSqlValue(beer.origin.country_code || null),
    origin_region: toSqlValue(beer.origin.region || null),
    origin_city: toSqlValue(beer.origin.city || null),
    brewery: toSqlValue(beer.origin.brewery),
    brewery_founded: toSqlValue(beer.origin.brewery_founded || null),
    brewery_type: toSqlValue(beer.origin.brewery_type || null),
    is_trappist: toSqlValue(beer.origin.is_trappist || false),

    // History
    first_brewed: toSqlValue(beer.history?.first_brewed || null),
    history_story: toSqlValue(beer.history?.story || null),
    history_awards: toSqlValue(beer.history?.awards || []),
    history_named_after: toSqlValue(beer.history?.named_after || null),
    history_significance: toSqlValue(beer.history?.significance || null),

    // Description
    description: toSqlValue(beer.description),
    tagline: toSqlValue(beer.tagline || null),

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

    // Taste
    flavor_profile: toSqlValue(beer.taste.profile || []),
    taste_description: toSqlValue(beer.taste.description || null),
    taste_aroma: toSqlValue(beer.taste.aroma || null),
    taste_first_impression: toSqlValue(beer.taste.first_impression || null),
    taste_finish: toSqlValue(beer.taste.finish || null),
    taste_balance: toSqlValue(beer.taste.balance || null),
    bitterness_level: toSqlValue(beer.taste.bitterness_level || null),
    sweetness_level: toSqlValue(beer.taste.sweetness_level || null),

    // Ingredients
    ingredients_malts: toSqlValue(beer.ingredients?.malts || []),
    ingredients_hops: toSqlValue(beer.ingredients?.hops || []),
    ingredients_yeast: toSqlValue(beer.ingredients?.yeast || null),
    ingredients_adjuncts: toSqlValue(beer.ingredients?.adjuncts || []),
    ingredients_water: toSqlValue(beer.ingredients?.water || null),
    ingredients_special: toSqlValue(beer.ingredients?.special_ingredients || []),

    // Serving
    serving_glass: toSqlValue(beer.serving.glass),
    serving_temperature: toSqlValue(beer.serving.temperature),
    serving_temp_min: toSqlValue(beer.serving.temperature_celsius?.min || null),
    serving_temp_max: toSqlValue(beer.serving.temperature_celsius?.max || null),
    serving_pouring_notes: toSqlValue(beer.serving.pouring_notes || null),
    serving_head_retention: toSqlValue(beer.serving.head_retention ?? true),
    serving_ideal_head: toSqlValue(beer.serving.ideal_head || null),

    // Pairing
    pairing_food_categories: toSqlValue(beer.pairing?.food_categories || []),
    pairing_food: toSqlValue(beer.pairing?.food_pairings || null),
    pairing_cheese: toSqlValue(beer.pairing?.cheese_pairings || []),
    pairing_cuisine: toSqlValue(beer.pairing?.cuisine_pairings || []),
    pairing_avoid: toSqlValue(beer.pairing?.avoid_with || null),

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
  console.log('\n📝 Generating SQL file...\n');

  const header = `-- ============================================================================
-- BEERS DATABASE SEED
-- ============================================================================
--
-- This file contains INSERT statements for seeding the beers table
-- in Supabase with international and craft beers.
--
-- Total Beers: ${allBeers.length}
--   - International Lagers: ${internationalLagers?.length || 0}
--   - Belgian Classics: ${belgianClassics?.length || 0}
--   - Stouts & Porters: ${stoutsPorters?.length || 0}
--   - German Classics: ${germanClassics?.length || 0}
--   - Craft IPAs: ${craftIpas?.length || 0}
--   - British Ales: ${britishAles?.length || 0}
--   - Wheat Beers: ${wheatBeers?.length || 0}
--
-- Usage:
--   1. First run create-beers-table.sql to create the table
--   2. Open Supabase Dashboard > SQL Editor
--   3. Copy and paste this file
--   4. Click "Run" to execute
--
-- Notes:
--   - Uses ON CONFLICT (slug) DO UPDATE for upserts
--   - All beers will be inserted or updated if they already exist
--   - JSONB columns are properly formatted
--   - Arrays are PostgreSQL array syntax
--
-- Generated: ${new Date().toISOString()}
-- ============================================================================

-- Begin transaction
BEGIN;

`;

  const footer = `
-- Commit transaction
COMMIT;

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
      sqlContent += `\n-- ${index + 1}. ${beer.name?.en || beer.slug}\n`;
      sqlContent += statement;
      sqlContent += '\n';
      successCount++;
      console.log(`  ✅ ${index + 1}. ${beer.name?.en || beer.slug}`);
    }
  });

  sqlContent += footer;

  // Write to file
  const outputPath = path.join(__dirname, 'seed-all-beers.sql');
  fs.writeFileSync(outputPath, sqlContent, 'utf8');

  console.log('\n' + '─'.repeat(50));
  console.log(`\n✨ SQL file generated successfully!`);
  console.log(`📊 Statistics:`);
  console.log(`  - Processed: ${successCount} beers`);
  console.log(`  - Output: ${outputPath}`);
  console.log(`  - File size: ${(sqlContent.length / 1024).toFixed(2)} KB`);
  console.log('\n💡 Next steps:');
  console.log('  1. Run create-beers-table.sql first (if not already done)');
  console.log('  2. Open the generated SQL file');
  console.log('  3. Go to Supabase Dashboard > SQL Editor');
  console.log('  4. Copy and paste the SQL');
  console.log('  5. Click "Run" to seed the database');
  console.log('\n');
}

// Run the generator
generateSqlFile();
