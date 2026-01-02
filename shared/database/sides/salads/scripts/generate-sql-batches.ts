/**
 * GUDBRO Salads SQL Batch Generator
 *
 * Generates SQL INSERT statements for all salads in batches of 5
 * Run with: npx tsx shared/database/salads/scripts/generate-sql-batches.ts
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { allSalads } from '../data';
import type { Salad } from '../../types/salad';

const BATCH_SIZE = 5;
const OUTPUT_DIR = join(__dirname, 'batches');

// Ensure output directory exists
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Escape single quotes for SQL
 */
function escapeSQL(str: string): string {
  return str.replace(/'/g, "''");
}

/**
 * Convert JS value to SQL-safe string
 */
function toSQLValue(value: unknown): string {
  if (value === null || value === undefined) {
    return 'NULL';
  }
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  if (typeof value === 'number') {
    return String(value);
  }
  if (typeof value === 'string') {
    return `'${escapeSQL(value)}'`;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "'{}'";
    }
    // Check if array of objects (JSONB) or strings
    if (typeof value[0] === 'object') {
      return `'${escapeSQL(JSON.stringify(value))}'::jsonb`;
    }
    // Array of strings
    return `'{"${value.map(v => escapeSQL(String(v))).join('","')}"}'`;
  }
  if (typeof value === 'object') {
    return `'${escapeSQL(JSON.stringify(value))}'::jsonb`;
  }
  return 'NULL';
}

/**
 * Generate INSERT statement for a single salad
 */
function generateInsert(salad: Salad): string {
  const uuid = crypto.randomUUID();

  return `INSERT INTO salads (
    id, slug, stable_key,
    name, description, tagline,
    status, style, tags,
    origin, history,
    base, default_protein, protein_options,
    default_dressing, dressing_options, dressing_on_side,
    ingredients, toppings,
    serving, flavor, dietary, customization,
    variations, popularity, recommended_for,
    pairings, related_salads,
    media, source_url, source_note, version
) VALUES (
    '${uuid}',
    ${toSQLValue(salad.slug)},
    ${toSQLValue(salad.stable_key)},
    ${toSQLValue(salad.name)},
    ${toSQLValue(salad.description)},
    ${toSQLValue(salad.tagline)},
    ${toSQLValue(salad.status)},
    ${toSQLValue(salad.style)},
    ${toSQLValue(salad.tags)},
    ${toSQLValue(salad.origin)},
    ${toSQLValue(salad.history)},
    ${toSQLValue(salad.base)},
    ${toSQLValue(salad.default_protein)},
    ${toSQLValue(salad.protein_options)},
    ${toSQLValue(salad.default_dressing)},
    ${toSQLValue(salad.dressing_options)},
    ${salad.dressing_on_side ?? false},
    ${toSQLValue(salad.ingredients)},
    ${toSQLValue(salad.toppings)},
    ${toSQLValue(salad.serving)},
    ${toSQLValue(salad.flavor)},
    ${toSQLValue(salad.dietary)},
    ${toSQLValue(salad.customization)},
    ${toSQLValue(salad.variations)},
    ${salad.popularity},
    ${toSQLValue(salad.recommended_for)},
    ${toSQLValue(salad.pairings)},
    ${toSQLValue(salad.related_salads)},
    ${toSQLValue(salad.media)},
    ${toSQLValue(salad.source_url)},
    ${toSQLValue(salad.source_note)},
    ${salad.version}
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    tagline = EXCLUDED.tagline,
    status = EXCLUDED.status,
    style = EXCLUDED.style,
    tags = EXCLUDED.tags,
    origin = EXCLUDED.origin,
    history = EXCLUDED.history,
    base = EXCLUDED.base,
    default_protein = EXCLUDED.default_protein,
    protein_options = EXCLUDED.protein_options,
    default_dressing = EXCLUDED.default_dressing,
    dressing_options = EXCLUDED.dressing_options,
    dressing_on_side = EXCLUDED.dressing_on_side,
    ingredients = EXCLUDED.ingredients,
    toppings = EXCLUDED.toppings,
    serving = EXCLUDED.serving,
    flavor = EXCLUDED.flavor,
    dietary = EXCLUDED.dietary,
    customization = EXCLUDED.customization,
    variations = EXCLUDED.variations,
    popularity = EXCLUDED.popularity,
    recommended_for = EXCLUDED.recommended_for,
    pairings = EXCLUDED.pairings,
    related_salads = EXCLUDED.related_salads,
    media = EXCLUDED.media,
    source_url = EXCLUDED.source_url,
    source_note = EXCLUDED.source_note,
    version = EXCLUDED.version,
    updated_at = NOW();`;
}

/**
 * Generate batch file
 */
function generateBatch(salads: Salad[], batchNumber: number, totalSalads: number): string {
  const startIndex = (batchNumber - 1) * BATCH_SIZE + 1;
  const endIndex = Math.min(batchNumber * BATCH_SIZE, totalSalads);

  const header = `-- ============================================================================
-- GUDBRO Salads Database - Batch ${String(batchNumber).padStart(2, '0')}
-- Salads ${startIndex} to ${endIndex} of ${totalSalads}
-- ============================================================================
-- Salads in this batch:
${salads.map(s => `--   - ${s.name.en} (${s.slug})`).join('\n')}
-- ============================================================================

`;

  const inserts = salads.map(s => generateInsert(s)).join('\n\n');

  return header + inserts;
}

/**
 * Main execution
 */
function main() {
  console.log(`\n🥗 GUDBRO Salads SQL Batch Generator`);
  console.log(`${'='.repeat(50)}`);
  console.log(`Total salads: ${allSalads.length}`);
  console.log(`Batch size: ${BATCH_SIZE}`);

  const totalBatches = Math.ceil(allSalads.length / BATCH_SIZE);
  console.log(`Total batches: ${totalBatches}`);
  console.log(`Output directory: ${OUTPUT_DIR}\n`);

  // Generate batches
  for (let i = 0; i < totalBatches; i++) {
    const batchSalads = allSalads.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
    const batchNumber = i + 1;
    const batchContent = generateBatch(batchSalads, batchNumber, allSalads.length);
    const filename = `batch-${String(batchNumber).padStart(2, '0')}.sql`;
    const filepath = join(OUTPUT_DIR, filename);

    writeFileSync(filepath, batchContent, 'utf-8');
    console.log(`✅ Generated ${filename} (${batchSalads.length} salads)`);
  }

  // Generate combined file
  const allInserts = allSalads.map(s => generateInsert(s)).join('\n\n');
  const combinedContent = `-- ============================================================================
-- GUDBRO Salads Database - All Salads Combined
-- Total: ${allSalads.length} salads
-- Generated: ${new Date().toISOString()}
-- ============================================================================
-- WARNING: This file is large! Consider using batch files for manual execution.
-- ============================================================================

${allInserts}
`;

  writeFileSync(join(OUTPUT_DIR, 'all-salads.sql'), combinedContent, 'utf-8');
  console.log(`\n✅ Generated all-salads.sql (combined file)`);

  // Summary by style
  console.log(`\n📊 Summary by Style:`);
  const byStyle = allSalads.reduce((acc, s) => {
    acc[s.style] = (acc[s.style] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  Object.entries(byStyle)
    .sort((a, b) => b[1] - a[1])
    .forEach(([style, count]) => {
      console.log(`   ${style}: ${count}`);
    });

  console.log(`\n🎉 Done! Run batches with Supabase SQL Editor or psql.\n`);
}

main();
