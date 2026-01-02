/**
 * GUDBRO Burgers Database - Generate SQL Batches
 *
 * Run with: npx tsx shared/database/burgers/scripts/generate-burger-batches.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { allBurgers } from '../data';

const BATCH_SIZE = 10;
const OUTPUT_DIR = path.join(__dirname, 'batches');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Escape single quotes for SQL
 */
function escapeSql(str: string): string {
  if (typeof str !== 'string') return str;
  return str.replace(/'/g, "''");
}

/**
 * Convert value to SQL format
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
    // Text array
    if (typeof value[0] === 'string') {
      const items = value.map((v) => `"${escapeSql(v)}"`);
      return `'{${items.join(',')}}'`;
    }
    // JSONB array
    return `'${escapeSql(JSON.stringify(value))}'::jsonb`;
  }
  if (typeof value === 'object') {
    return `'${escapeSql(JSON.stringify(value))}'::jsonb`;
  }
  return 'NULL';
}

/**
 * Generate INSERT statement for burger
 */
function generateBurgerInsert(burger: any): string {
  const columns = [
    'id',
    'slug',
    'name',
    'description',
    'tagline',
    'status',
    'style',
    'tags',
    'bun_type',
    'bun_is_toasted',
    'patty_type',
    'patty_weight_g',
    'patty_count',
    'patty_recommended_cook',
    'cheeses',
    'toppings',
    'sauces',
    'is_spicy',
    'spice_level',
    'origin',
    'history',
    'serving',
    'dietary',
    'customization',
    'variations',
    'popularity',
    'related_burgers',
    'media',
    'pricing',
  ];

  const values = [
    toSqlValue(burger.id),
    toSqlValue(burger.slug),
    toSqlValue(burger.name),
    toSqlValue(burger.description),
    toSqlValue(burger.tagline),
    toSqlValue(burger.status || 'active'),
    toSqlValue(burger.style),
    toSqlValue(burger.tags || []),
    toSqlValue(burger.bun?.type || 'brioche'),
    toSqlValue(burger.bun?.is_toasted ?? true),
    toSqlValue(burger.patty?.type || 'beef'),
    toSqlValue(burger.patty?.weight_g || 150),
    toSqlValue(burger.patty?.count || 1),
    toSqlValue(burger.patty?.recommended_cook || 'medium'),
    toSqlValue(burger.cheeses || []),
    toSqlValue(burger.toppings || []),
    toSqlValue(burger.sauces || []),
    toSqlValue(burger.is_spicy || false),
    toSqlValue(burger.spice_level || 0),
    toSqlValue(burger.origin || {}),
    toSqlValue(burger.history),
    toSqlValue(burger.serving || {}),
    toSqlValue(burger.dietary || {}),
    toSqlValue(burger.customization),
    toSqlValue(burger.variations || []),
    toSqlValue(burger.popularity || 50),
    toSqlValue(burger.related_burgers || []),
    toSqlValue(burger.media),
    toSqlValue(burger.pricing),
  ];

  return `INSERT INTO burgers (${columns.join(', ')})
VALUES (${values.join(', ')})
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();`;
}

/**
 * Write batches to files
 */
function writeBatches(): void {
  let batchNumber = 1;

  for (let i = 0; i < allBurgers.length; i += BATCH_SIZE) {
    const batch = allBurgers.slice(i, i + BATCH_SIZE);
    const statements = batch.map((item) => generateBurgerInsert(item)).join('\n\n');

    const header = `-- BURGERS Batch ${batchNumber}
-- Items: ${i + 1} to ${Math.min(i + BATCH_SIZE, allBurgers.length)} of ${allBurgers.length}
-- Generated: ${new Date().toISOString()}

`;

    const filePath = path.join(OUTPUT_DIR, `batch-${String(batchNumber).padStart(2, '0')}.sql`);
    fs.writeFileSync(filePath, header + statements);

    console.log(
      `  ✅ batch-${String(batchNumber).padStart(2, '0')}.sql (${batch.length} items)`
    );
    batchNumber++;
  }
}

// Main execution
console.log('\n🍔 GUDBRO Burgers Database - SQL Batch Generator');
console.log('='.repeat(55));
console.log(`Output: ${OUTPUT_DIR}\n`);

console.log(`📊 Data Summary:`);
console.log(`   Total Burgers: ${allBurgers.length}`);
console.log(`   Batch Size: ${BATCH_SIZE}\n`);

console.log('Generating batches...');
writeBatches();

console.log('\n' + '='.repeat(55));
console.log('✅ All batches generated successfully!');
console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);
