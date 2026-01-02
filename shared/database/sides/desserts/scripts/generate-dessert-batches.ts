/**
 * GUDBRO Desserts Database - SQL Batch Generator
 * Generates INSERT statements for Supabase
 */

import * as fs from 'fs';
import * as path from 'path';
import { allDesserts, dessertCounts } from '../data';
import { Dessert } from '../types';

const BATCH_SIZE = 10;
const OUTPUT_DIR = path.join(__dirname, 'batches');

function escapeString(str: string): string {
  if (!str) return '';
  return str.replace(/'/g, "''");
}

function toJsonString(obj: any): string {
  if (!obj) return 'NULL';
  return `'${escapeString(JSON.stringify(obj))}'::jsonb`;
}

function toArrayString(arr: string[] | undefined): string {
  if (!arr || arr.length === 0) return "'{}'";
  const escaped = arr.map(s => `"${escapeString(s)}"`).join(',');
  return `'{${escaped}}'`;
}

function generateInsert(dessert: Dessert): string {
  return `INSERT INTO desserts (
  id, slug, name, description, tagline,
  style, status, category, serving_temp,
  main_ingredients, topping, is_chocolate, is_fruit_based, is_creamy, sweetness_level,
  origin, history, serving, dietary, preparation,
  variations, tags, popularity, related_desserts, media, pricing
) VALUES (
  '${escapeString(dessert.id)}',
  '${escapeString(dessert.slug)}',
  ${toJsonString(dessert.name)},
  ${toJsonString(dessert.description)},
  ${dessert.tagline ? toJsonString(dessert.tagline) : 'NULL'},
  '${dessert.style}',
  '${dessert.status}',
  '${dessert.category}',
  '${dessert.serving_temp}',
  ${toArrayString(dessert.main_ingredients)},
  ${dessert.topping ? `'${escapeString(dessert.topping)}'` : 'NULL'},
  ${dessert.is_chocolate},
  ${dessert.is_fruit_based},
  ${dessert.is_creamy},
  ${dessert.sweetness_level},
  ${toJsonString(dessert.origin)},
  ${dessert.history ? toJsonString(dessert.history) : 'NULL'},
  ${toJsonString(dessert.serving)},
  ${toJsonString(dessert.dietary)},
  ${dessert.preparation ? toJsonString(dessert.preparation) : 'NULL'},
  ${dessert.variations ? toJsonString(dessert.variations) : 'NULL'},
  ${toArrayString(dessert.tags)},
  ${dessert.popularity},
  ${dessert.related_desserts ? toArrayString(dessert.related_desserts) : 'NULL'},
  ${dessert.media ? toJsonString(dessert.media) : 'NULL'},
  ${dessert.pricing ? toJsonString(dessert.pricing) : 'NULL'}
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  tagline = EXCLUDED.tagline,
  style = EXCLUDED.style,
  status = EXCLUDED.status,
  category = EXCLUDED.category,
  serving_temp = EXCLUDED.serving_temp,
  main_ingredients = EXCLUDED.main_ingredients,
  topping = EXCLUDED.topping,
  is_chocolate = EXCLUDED.is_chocolate,
  is_fruit_based = EXCLUDED.is_fruit_based,
  is_creamy = EXCLUDED.is_creamy,
  sweetness_level = EXCLUDED.sweetness_level,
  origin = EXCLUDED.origin,
  history = EXCLUDED.history,
  serving = EXCLUDED.serving,
  dietary = EXCLUDED.dietary,
  preparation = EXCLUDED.preparation,
  variations = EXCLUDED.variations,
  tags = EXCLUDED.tags,
  popularity = EXCLUDED.popularity,
  related_desserts = EXCLUDED.related_desserts,
  media = EXCLUDED.media,
  pricing = EXCLUDED.pricing,
  updated_at = now();`;
}

function generateBatches(): void {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('Generating dessert SQL batches...');
  console.log(`Total desserts: ${allDesserts.length}`);
  console.log(`  - Italian: ${dessertCounts.italian}`);
  console.log(`  - French: ${dessertCounts.french}`);
  console.log(`  - International: ${dessertCounts.international}`);

  const totalBatches = Math.ceil(allDesserts.length / BATCH_SIZE);

  for (let i = 0; i < totalBatches; i++) {
    const start = i * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, allDesserts.length);
    const batch = allDesserts.slice(start, end);

    const batchNumber = String(i + 1).padStart(2, '0');
    const fileName = `batch-${batchNumber}-desserts.sql`;
    const filePath = path.join(OUTPUT_DIR, fileName);

    const header = `-- GUDBRO Desserts Batch ${batchNumber}
-- Records: ${start + 1} to ${end} of ${allDesserts.length}
-- Generated: ${new Date().toISOString()}

`;

    const content = header + batch.map(generateInsert).join('\n\n');

    fs.writeFileSync(filePath, content);
    console.log(`Generated: ${fileName} (${batch.length} desserts)`);
  }

  // Generate combined file
  const allFileName = 'all-desserts.sql';
  const allFilePath = path.join(OUTPUT_DIR, allFileName);
  const allHeader = `-- GUDBRO All Desserts
-- Total: ${allDesserts.length} desserts
-- Generated: ${new Date().toISOString()}

`;
  const allContent = allHeader + allDesserts.map(generateInsert).join('\n\n');
  fs.writeFileSync(allFilePath, allContent);
  console.log(`Generated: ${allFileName} (${allDesserts.length} desserts)`);

  console.log('\nDone! Generated files in:', OUTPUT_DIR);
}

// Run generator
generateBatches();
