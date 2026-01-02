/**
 * GUDBRO Sandwiches Database - Generate SQL Batches
 *
 * Run with: npx tsx shared/database/sandwiches/scripts/generate-sandwich-batches.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { allSandwiches } from '../data';

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
 * Generate INSERT statement for sandwich
 */
function generateSandwichInsert(sandwich: any): string {
  const columns = [
    'id',
    'slug',
    'name',
    'description',
    'tagline',
    'status',
    'style',
    'tags',
    'bread_type',
    'bread_is_toasted',
    'bread_is_grilled',
    'proteins',
    'cheeses',
    'vegetables',
    'condiments',
    'is_hot',
    'is_pressed',
    'origin',
    'history',
    'serving',
    'dietary',
    'customization',
    'variations',
    'popularity',
    'related_sandwiches',
    'media',
    'pricing',
  ];

  const values = [
    toSqlValue(sandwich.id),
    toSqlValue(sandwich.slug),
    toSqlValue(sandwich.name),
    toSqlValue(sandwich.description),
    toSqlValue(sandwich.tagline),
    toSqlValue(sandwich.status || 'active'),
    toSqlValue(sandwich.style),
    toSqlValue(sandwich.tags || []),
    toSqlValue(sandwich.bread?.type || 'ciabatta'),
    toSqlValue(sandwich.bread?.is_toasted || false),
    toSqlValue(sandwich.bread?.is_grilled || false),
    toSqlValue(sandwich.proteins || []),
    toSqlValue(sandwich.cheeses || []),
    toSqlValue(sandwich.vegetables || []),
    toSqlValue(sandwich.condiments || []),
    toSqlValue(sandwich.is_hot || false),
    toSqlValue(sandwich.is_pressed || false),
    toSqlValue(sandwich.origin || {}),
    toSqlValue(sandwich.history),
    toSqlValue(sandwich.serving || {}),
    toSqlValue(sandwich.dietary || {}),
    toSqlValue(sandwich.customization),
    toSqlValue(sandwich.variations || []),
    toSqlValue(sandwich.popularity || 50),
    toSqlValue(sandwich.related_sandwiches || []),
    toSqlValue(sandwich.media),
    toSqlValue(sandwich.pricing),
  ];

  return `INSERT INTO sandwiches (${columns.join(', ')})
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

  for (let i = 0; i < allSandwiches.length; i += BATCH_SIZE) {
    const batch = allSandwiches.slice(i, i + BATCH_SIZE);
    const statements = batch.map((item) => generateSandwichInsert(item)).join('\n\n');

    const header = `-- SANDWICHES Batch ${batchNumber}
-- Items: ${i + 1} to ${Math.min(i + BATCH_SIZE, allSandwiches.length)} of ${allSandwiches.length}
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
console.log('\n🥪 GUDBRO Sandwiches Database - SQL Batch Generator');
console.log('='.repeat(55));
console.log(`Output: ${OUTPUT_DIR}\n`);

console.log(`📊 Data Summary:`);
console.log(`   Total Sandwiches: ${allSandwiches.length}`);
console.log(`   Batch Size: ${BATCH_SIZE}\n`);

console.log('Generating batches...');
writeBatches();

console.log('\n' + '='.repeat(55));
console.log('✅ All batches generated successfully!');
console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);
