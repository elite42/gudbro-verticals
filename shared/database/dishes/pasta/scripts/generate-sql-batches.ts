/**
 * GUDBRO Pasta SQL Batch Generator
 *
 * Generates SQL INSERT statements for pasta dishes
 * Run with: npx tsx shared/database/pasta/scripts/generate-sql-batches.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { allPasta } from '../data';

const OUTPUT_DIR = path.join(__dirname, 'batches');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Escape single quotes for SQL
 */
function escapeSQL(str: string): string {
  return str.replace(/'/g, "''");
}

/**
 * Convert object to PostgreSQL JSONB
 */
function toJSONB(obj: unknown): string {
  return `'${escapeSQL(JSON.stringify(obj))}'::jsonb`;
}

/**
 * Generate SQL INSERT for a pasta dish
 */
function generateInsert(pasta: typeof allPasta[0]): string {
  return `INSERT INTO pasta (
  id, slug, name, description, style, origin,
  pasta_type, sauce, proteins, vegetables,
  cooking, serving, dietary, pricing, availability,
  tags, status
) VALUES (
  '${escapeSQL(pasta.id)}',
  '${escapeSQL(pasta.slug)}',
  ${toJSONB(pasta.name)},
  ${toJSONB(pasta.description)},
  '${pasta.style}',
  ${toJSONB(pasta.origin)},
  ${toJSONB(pasta.pasta_type)},
  ${toJSONB(pasta.sauce)},
  ${toJSONB(pasta.proteins)},
  ${toJSONB(pasta.vegetables)},
  ${toJSONB(pasta.cooking)},
  ${toJSONB(pasta.serving)},
  ${toJSONB(pasta.dietary)},
  ${toJSONB(pasta.pricing)},
  ${toJSONB(pasta.availability)},
  ${toJSONB(pasta.tags)},
  '${pasta.status}'
) ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  style = EXCLUDED.style,
  origin = EXCLUDED.origin,
  pasta_type = EXCLUDED.pasta_type,
  sauce = EXCLUDED.sauce,
  proteins = EXCLUDED.proteins,
  vegetables = EXCLUDED.vegetables,
  cooking = EXCLUDED.cooking,
  serving = EXCLUDED.serving,
  dietary = EXCLUDED.dietary,
  pricing = EXCLUDED.pricing,
  availability = EXCLUDED.availability,
  tags = EXCLUDED.tags,
  status = EXCLUDED.status,
  updated_at = NOW();`;
}

/**
 * Generate SQL batches
 */
function generateBatches() {
  console.log('\n🍝 GUDBRO Pasta SQL Batch Generator');
  console.log('='.repeat(50));
  console.log(`Total pasta dishes: ${allPasta.length}`);
  console.log(`Output directory: ${OUTPUT_DIR}\n`);

  const BATCH_SIZE = 10;
  const batches: string[][] = [];

  // Split into batches
  for (let i = 0; i < allPasta.length; i += BATCH_SIZE) {
    const batch = allPasta.slice(i, i + BATCH_SIZE);
    const statements = batch.map(generateInsert);
    batches.push(statements);
  }

  // Write batch files
  batches.forEach((statements, index) => {
    const batchNumber = String(index + 1).padStart(2, '0');
    const filename = `batch-${batchNumber}.sql`;
    const filepath = path.join(OUTPUT_DIR, filename);

    const content = `-- GUDBRO Pasta Database - Batch ${batchNumber}
-- Generated: ${new Date().toISOString()}
-- Sistema 5 Dimensioni v3.0

BEGIN;

${statements.join('\n\n')}

COMMIT;
`;

    fs.writeFileSync(filepath, content);
    console.log(`✅ Generated ${filename} (${statements.length} dishes)`);
  });

  // Write combined file
  const combinedPath = path.join(OUTPUT_DIR, 'all-pasta.sql');
  const combinedContent = `-- GUDBRO Pasta Database - All Dishes
-- Generated: ${new Date().toISOString()}
-- Sistema 5 Dimensioni v3.0
-- Total: ${allPasta.length} pasta dishes

BEGIN;

${batches.flat().join('\n\n')}

COMMIT;
`;

  fs.writeFileSync(combinedPath, combinedContent);
  console.log(`\n✅ Generated all-pasta.sql (${allPasta.length} total dishes)`);

  console.log('\n' + '='.repeat(50));
  console.log('📊 Generation Summary:');
  console.log(`   Batches: ${batches.length}`);
  console.log(`   Total dishes: ${allPasta.length}`);
  console.log(`   Output: ${OUTPUT_DIR}`);
  console.log('\n🎉 SQL generation complete!\n');
}

// Run the generator
generateBatches();
