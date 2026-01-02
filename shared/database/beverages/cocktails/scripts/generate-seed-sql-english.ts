/**
 * Generate SQL File for Seeding Cocktails (ENGLISH ONLY)
 *
 * This script generates clean SQL with only English content.
 * Translations will be handled separately.
 *
 * Run with: npx tsx shared/database/cocktails/scripts/generate-seed-sql-english.ts
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
 * Extract English text from a multilingual object.
 * For JSONB columns, keeps the {en: "value"} structure.
 * For nested objects, recursively extracts English from multilingual fields.
 */
function extractEnglish(value: any, keepJsonbStructure: boolean = false): any {
  if (value === null || value === undefined) {
    return null;
  }

  // If it's an object with 'en' key (multilingual field)
  if (typeof value === 'object' && !Array.isArray(value) && value.en !== undefined) {
    // Check if this looks like a pure multilingual object (only language keys)
    const keys = Object.keys(value);
    const langKeys = ['en', 'it', 'vi', 'ko', 'ja', 'es', 'fr', 'de', 'pt', 'zh'];
    const isMultilingual = keys.every(k => langKeys.includes(k));

    if (isMultilingual) {
      // For JSONB columns, keep {en: "value"} structure
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
 * For JSONB columns that expect multilingual structure, extract only English but keep format
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
    // Check if array contains objects (like ingredients)
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
 * Process ingredient to extract only English
 */
function processIngredient(ingredient: any): any {
  return {
    ingredient_id: ingredient.ingredient_id,
    quantity: ingredient.quantity,
    display_name: extractEnglish(ingredient.display_name),
    optional: ingredient.optional,
    notes: extractEnglish(ingredient.notes),
  };
}

/**
 * Generate INSERT statement for a single cocktail (English only)
 */
function generateInsertStatement(cocktail: Cocktail): string {
  if (!cocktail || !cocktail.id) {
    console.error('Invalid cocktail:', cocktail);
    return '';
  }

  // For JSONB columns that store multilingual text, keep {en: "value"} structure
  const name = toEnglishJsonb(cocktail.name);
  const description = toEnglishJsonb(cocktail.description);
  const instructions = toEnglishJsonb(cocktail.instructions);
  const garnish = toEnglishJsonb(cocktail.garnish);

  // For complex JSONB objects, recursively extract English from nested multilingual fields
  const history = extractEnglish(cocktail.history, true);
  const taste = extractEnglish(cocktail.taste, true);
  const recommendations = extractEnglish(cocktail.recommendations, true);

  // Process ingredients to English only
  const ingredients = (cocktail.ingredients || []).map(processIngredient);

  const values = {
    id: toSqlValue(cocktail.id),
    slug: toSqlValue(cocktail.slug),
    stable_key: toSqlValue(cocktail.stable_key),
    name: toSqlValue(name),
    status: toSqlValue(cocktail.status),
    iba_category: toSqlValue(cocktail.iba_category || null),
    tags: toSqlValue(cocktail.tags || []),
    description: toSqlValue(description),
    history: toSqlValue(history),
    taste: toSqlValue(taste),
    recommendations: toSqlValue(recommendations),
    ingredients: toSqlValue(ingredients),
    method: toSqlValue(cocktail.method),
    instructions: toSqlValue(instructions),
    glass: toSqlValue(cocktail.glass),
    garnish: toSqlValue(garnish),
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
  console.log('\n📝 Generating English-only SQL file...\n');

  const header = `-- ============================================================================
-- COCKTAILS DATABASE SEED (ENGLISH ONLY)
-- ============================================================================
--
-- This file contains INSERT statements for seeding the cocktails table
-- with ENGLISH ONLY content. Translations will be added separately.
--
-- Total Cocktails: ${allCocktails.length}
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
  iba_category,
  COUNT(*) as count
FROM cocktails
GROUP BY status, iba_category
ORDER BY status, iba_category;

SELECT COUNT(*) as total_cocktails FROM cocktails;
`;

  let sqlContent = header;
  let successCount = 0;

  allCocktails.forEach((cocktail, index) => {
    const statement = generateInsertStatement(cocktail);
    if (statement) {
      const cocktailName = typeof cocktail.name === 'object' ? cocktail.name.en : cocktail.name;
      sqlContent += `\n-- ${index + 1}. ${cocktailName || cocktail.slug}\n`;
      sqlContent += statement;
      sqlContent += '\n';
      successCount++;
      console.log(`  ✅ ${index + 1}. ${cocktailName || cocktail.slug}`);
    }
  });

  sqlContent += footer;

  // Write to file
  const outputPath = path.join(__dirname, 'seed-cocktails-english.sql');
  fs.writeFileSync(outputPath, sqlContent, 'utf8');

  console.log('\n' + '─'.repeat(50));
  console.log(`\n✨ SQL file generated successfully!`);
  console.log(`📊 Statistics:`);
  console.log(`  - Processed: ${successCount} cocktails`);
  console.log(`  - Output: ${outputPath}`);
  console.log(`  - File size: ${(sqlContent.length / 1024).toFixed(2)} KB`);
  console.log('\n💡 Next steps:');
  console.log('  1. Go to Supabase Dashboard > SQL Editor');
  console.log('  2. Copy and paste the SQL (or split into batches if too large)');
  console.log('  3. Click "Run" to seed the database');
  console.log('\n');
}

// Run the generator
generateSqlFile();
