/**
 * GUDBRO Pizza SQL Batch Generator
 *
 * Generates SQL INSERT statements for all pizzas
 * Creates batches of 5 pizzas each for easier execution
 */

import { allPizzas } from '../data';
import * as fs from 'fs';
import * as path from 'path';

const BATCH_SIZE = 5;
const OUTPUT_DIR = path.join(__dirname, 'batches');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function escapeString(str: string): string {
  if (!str) return '';
  return str.replace(/'/g, "''");
}

function toJsonb(obj: any): string {
  if (obj === null || obj === undefined) return 'NULL';
  const jsonStr = JSON.stringify(obj);
  return `'${escapeString(jsonStr)}'::jsonb`;
}

function toTextArray(arr: string[] | undefined): string {
  if (!arr || arr.length === 0) return "'{}'";
  const escaped = arr.map((s) => `"${escapeString(s)}"`).join(',');
  return `'{${escaped}}'`;
}

function generatePizzaInsert(pizza: (typeof allPizzas)[0]): string {
  const id = crypto.randomUUID();

  return `INSERT INTO pizzas (
    id, slug, stable_key,
    name, description, tagline,
    status, style, tags,
    origin, history,
    base, primary_cheese, additional_cheeses, dough_type,
    ingredients, cooking, flavor, dietary, serving,
    variations, popularity, recommended_for, related_pizzas,
    media, source_url, source_note, version
) VALUES (
    '${id}',
    '${escapeString(pizza.slug)}',
    '${escapeString(pizza.stable_key)}',
    ${toJsonb(pizza.name)},
    ${toJsonb(pizza.description)},
    ${pizza.tagline ? toJsonb(pizza.tagline) : 'NULL'},
    '${pizza.status}',
    '${pizza.style}',
    ${toTextArray(pizza.tags)},
    ${toJsonb(pizza.origin)},
    ${pizza.history ? toJsonb(pizza.history) : 'NULL'},
    '${pizza.base}',
    '${pizza.primary_cheese}',
    ${toTextArray(pizza.additional_cheeses)},
    '${pizza.dough_type}',
    ${toJsonb(pizza.ingredients)},
    ${toJsonb(pizza.cooking)},
    ${toJsonb(pizza.flavor)},
    ${toJsonb(pizza.dietary)},
    ${toJsonb(pizza.serving)},
    ${pizza.variations ? toJsonb(pizza.variations) : 'NULL'},
    ${pizza.popularity},
    ${toTextArray(pizza.recommended_for)},
    ${toTextArray(pizza.related_pizzas)},
    ${pizza.media ? toJsonb(pizza.media) : 'NULL'},
    ${pizza.source_url ? `'${escapeString(pizza.source_url)}'` : 'NULL'},
    ${pizza.source_note ? `'${escapeString(pizza.source_note)}'` : 'NULL'},
    ${pizza.version}
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
    primary_cheese = EXCLUDED.primary_cheese,
    additional_cheeses = EXCLUDED.additional_cheeses,
    dough_type = EXCLUDED.dough_type,
    ingredients = EXCLUDED.ingredients,
    cooking = EXCLUDED.cooking,
    flavor = EXCLUDED.flavor,
    dietary = EXCLUDED.dietary,
    serving = EXCLUDED.serving,
    variations = EXCLUDED.variations,
    popularity = EXCLUDED.popularity,
    recommended_for = EXCLUDED.recommended_for,
    related_pizzas = EXCLUDED.related_pizzas,
    media = EXCLUDED.media,
    source_url = EXCLUDED.source_url,
    source_note = EXCLUDED.source_note,
    version = EXCLUDED.version,
    updated_at = NOW();`;
}

function generateBatches(): void {
  console.log(`\nGenerating SQL batches for ${allPizzas.length} pizzas...`);
  console.log(`Batch size: ${BATCH_SIZE}`);

  const totalBatches = Math.ceil(allPizzas.length / BATCH_SIZE);

  for (let i = 0; i < totalBatches; i++) {
    const start = i * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, allPizzas.length);
    const batch = allPizzas.slice(start, end);
    const batchNum = String(i + 1).padStart(2, '0');

    const header = `-- ============================================================================
-- GUDBRO Pizza Database - Batch ${batchNum}
-- Pizzas ${start + 1} to ${end} of ${allPizzas.length}
-- ============================================================================
-- Pizzas in this batch:
${batch.map((p) => `--   - ${p.name.en} (${p.slug})`).join('\n')}
-- ============================================================================

`;

    const statements = batch.map(generatePizzaInsert).join('\n\n');
    const content = header + statements;

    const filename = `batch-${batchNum}.sql`;
    fs.writeFileSync(path.join(OUTPUT_DIR, filename), content, 'utf-8');
    console.log(`  Created ${filename} (${batch.length} pizzas)`);
  }

  // Generate summary file
  const summary = `-- ============================================================================
-- GUDBRO Pizza Database - Execution Summary
-- ============================================================================
-- Total pizzas: ${allPizzas.length}
-- Total batches: ${totalBatches}
-- Batch size: ${BATCH_SIZE}
--
-- Collections:
${Object.entries(
  allPizzas.reduce(
    (acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  )
)
  .map(([status, count]) => `--   ${status}: ${count}`)
  .join('\n')}
--
-- Styles:
${Object.entries(
  allPizzas.reduce(
    (acc, p) => {
      acc[p.style] = (acc[p.style] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  )
)
  .map(([style, count]) => `--   ${style}: ${count}`)
  .join('\n')}
--
-- Execution order:
${Array.from({ length: totalBatches }, (_, i) => `--   ${i + 1}. batch-${String(i + 1).padStart(2, '0')}.sql`).join('\n')}
-- ============================================================================
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'README.sql'), summary, 'utf-8');
  console.log(`\nGenerated ${totalBatches} batches in ${OUTPUT_DIR}`);
}

// Run the generator
generateBatches();
