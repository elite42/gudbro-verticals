/**
 * Generate SQL File for Seeding Cocktails
 *
 * This script reads all cocktail TypeScript files and generates INSERT statements
 * for seeding the Supabase cocktails table.
 *
 * Run with: npx tsx shared/database/cocktails/scripts/generate-seed-sql.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// Use require for cocktail imports to avoid ESM/CJS issues
const { ibaUnforgettables } = require('../iba-unforgettables/index');
const { ibaContemporary } = require('../iba-contemporary/index');
const { ibaNewEra } = require('../iba-new-era/index');
const { famousCocktails } = require('../famous/index');

import type { Cocktail } from '../../types/cocktail';

// Combine all cocktails
const allCocktails: Cocktail[] = [
  ...(ibaUnforgettables || []),
  ...(ibaContemporary || []),
  ...(ibaNewEra || []),
  ...(famousCocktails || []),
];

console.log('🍸 Cocktail counts:');
console.log(`   - IBA Unforgettables: ${ibaUnforgettables?.length || 0}`);
console.log(`   - IBA Contemporary: ${ibaContemporary?.length || 0}`);
console.log(`   - IBA New Era: ${ibaNewEra?.length || 0}`);
console.log(`   - Famous: ${famousCocktails?.length || 0}`);
console.log(`   - TOTAL: ${allCocktails.length}`);

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
 * Generate INSERT statement for a single cocktail
 */
function generateInsertStatement(cocktail: Cocktail): string {
  if (!cocktail || !cocktail.id) {
    console.error('Invalid cocktail:', cocktail);
    return '';
  }

  const values = {
    id: toSqlValue(cocktail.id),
    slug: toSqlValue(cocktail.slug),
    stable_key: toSqlValue(cocktail.stable_key),
    name: toSqlValue(cocktail.name),
    status: toSqlValue(cocktail.status),
    iba_category: toSqlValue(cocktail.iba_category || null),
    tags: toSqlValue(cocktail.tags || []),
    description: toSqlValue(cocktail.description),
    history: toSqlValue(cocktail.history || null),
    taste: toSqlValue(cocktail.taste || null),
    recommendations: toSqlValue(cocktail.recommendations || null),
    ingredients: toSqlValue(cocktail.ingredients || []),
    method: toSqlValue(cocktail.method),
    instructions: toSqlValue(cocktail.instructions),
    glass: toSqlValue(cocktail.glass),
    garnish: toSqlValue(cocktail.garnish),
    ice: toSqlValue(cocktail.ice),
    serving_style: toSqlValue(cocktail.serving_style),
    base_spirits: toSqlValue(cocktail.base_spirits || []),
    flavor_profile: toSqlValue(cocktail.flavor_profile || []),
    abv_estimate: toSqlValue(cocktail.abv_estimate),
    calories_estimate: toSqlValue(cocktail.calories_estimate),
    difficulty: toSqlValue(cocktail.difficulty),
    prep_time_seconds: toSqlValue(cocktail.prep_time_seconds),
    computed_allergens: toSqlValue(cocktail.computed?.allergens || []),
    computed_intolerances: toSqlValue(cocktail.computed?.intolerances || []),
    computed_diets: toSqlValue(cocktail.computed?.suitable_for_diets || []),
    computed_spice_level: toSqlValue(cocktail.computed?.spice_level || 0),
    diet_tags: toSqlValue(cocktail.diet_tags || []),
    season_tags: toSqlValue(cocktail.season_tags || []),
    occasion_tags: toSqlValue(cocktail.occasion_tags || []),
    is_mocktail: toSqlValue(cocktail.is_mocktail || false),
    is_signature: toSqlValue(cocktail.is_signature || false),
    variants: toSqlValue(
      Array.isArray(cocktail.variants)
        ? cocktail.variants.map(v => typeof v === 'string' ? v : v.name)
        : []
    ),
    notes_for_staff: toSqlValue(cocktail.notes_for_staff || null),
    price_tier: toSqlValue(cocktail.price_tier),
    popularity: toSqlValue(cocktail.popularity || null),
    source_url: toSqlValue(cocktail.source?.primary || null),
    source_note: toSqlValue(cocktail.source?.note || null),
    version: toSqlValue(cocktail.version || 1),
  };

  const columns = Object.keys(values).join(', ');
  const valuesList = Object.values(values).join(', ');

  return `INSERT INTO cocktails (${columns})
VALUES (${valuesList})
ON CONFLICT (slug) DO UPDATE SET
  id = EXCLUDED.id,
  stable_key = EXCLUDED.stable_key,
  name = EXCLUDED.name,
  status = EXCLUDED.status,
  iba_category = EXCLUDED.iba_category,
  tags = EXCLUDED.tags,
  description = EXCLUDED.description,
  history = EXCLUDED.history,
  taste = EXCLUDED.taste,
  recommendations = EXCLUDED.recommendations,
  ingredients = EXCLUDED.ingredients,
  method = EXCLUDED.method,
  instructions = EXCLUDED.instructions,
  glass = EXCLUDED.glass,
  garnish = EXCLUDED.garnish,
  ice = EXCLUDED.ice,
  serving_style = EXCLUDED.serving_style,
  base_spirits = EXCLUDED.base_spirits,
  flavor_profile = EXCLUDED.flavor_profile,
  abv_estimate = EXCLUDED.abv_estimate,
  calories_estimate = EXCLUDED.calories_estimate,
  difficulty = EXCLUDED.difficulty,
  prep_time_seconds = EXCLUDED.prep_time_seconds,
  computed_allergens = EXCLUDED.computed_allergens,
  computed_intolerances = EXCLUDED.computed_intolerances,
  computed_diets = EXCLUDED.computed_diets,
  computed_spice_level = EXCLUDED.computed_spice_level,
  diet_tags = EXCLUDED.diet_tags,
  season_tags = EXCLUDED.season_tags,
  occasion_tags = EXCLUDED.occasion_tags,
  is_mocktail = EXCLUDED.is_mocktail,
  is_signature = EXCLUDED.is_signature,
  variants = EXCLUDED.variants,
  notes_for_staff = EXCLUDED.notes_for_staff,
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
-- COCKTAILS DATABASE SEED
-- ============================================================================
--
-- This file contains INSERT statements for seeding the cocktails table
-- in Supabase with all IBA Official and Famous cocktails.
--
-- Total Cocktails: ${allCocktails.length}
--   - IBA Unforgettables: ${ibaUnforgettables?.length || 0}
--   - IBA Contemporary: ${ibaContemporary?.length || 0}
--   - IBA New Era: ${ibaNewEra?.length || 0}
--   - Famous: ${famousCocktails?.length || 0}
--
-- Usage:
--   1. Open Supabase Dashboard > SQL Editor
--   2. Copy and paste this entire file
--   3. Click "Run" to execute
--
-- Notes:
--   - Uses ON CONFLICT (slug) DO UPDATE for upserts
--   - All cocktails will be inserted or updated if they already exist
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
  iba_category,
  COUNT(*) as count
FROM cocktails
GROUP BY status, iba_category
ORDER BY status, iba_category;

SELECT COUNT(*) as total_cocktails FROM cocktails;
`;

  let sqlContent = header;
  let successCount = 0;

  // Process ALL cocktails
  const cocktailsToProcess = allCocktails;

  cocktailsToProcess.forEach((cocktail, index) => {
    const statement = generateInsertStatement(cocktail);
    if (statement) {
      sqlContent += `\n-- ${index + 1}. ${cocktail.name?.en || cocktail.slug}\n`;
      sqlContent += statement;
      sqlContent += '\n';
      successCount++;
      console.log(`  ✅ ${index + 1}. ${cocktail.name?.en || cocktail.slug}`);
    }
  });

  sqlContent += footer;

  // Write to file
  const outputPath = path.join(__dirname, 'seed-all-cocktails.sql');
  fs.writeFileSync(outputPath, sqlContent, 'utf8');

  console.log('\n' + '─'.repeat(50));
  console.log(`\n✨ SQL file generated successfully!`);
  console.log(`📊 Statistics:`);
  console.log(`  - Processed: ${successCount} cocktails`);
  console.log(`  - Output: ${outputPath}`);
  console.log(`  - File size: ${(sqlContent.length / 1024).toFixed(2)} KB`);
  console.log('\n💡 Next steps:');
  console.log('  1. Open the generated SQL file');
  console.log('  2. Go to Supabase Dashboard > SQL Editor');
  console.log('  3. Copy and paste the SQL');
  console.log('  4. Click "Run" to seed the database');
  console.log('\n');
}

// Run the generator
generateSqlFile();
