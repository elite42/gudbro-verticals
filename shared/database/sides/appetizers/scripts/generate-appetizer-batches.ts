/**
 * GUDBRO Appetizers Database - SQL Batch Generator
 * Generates INSERT statements for Supabase
 */

import * as fs from 'fs';
import * as path from 'path';
import { allAppetizers, appetizerCounts } from '../data';
import { Appetizer } from '../types';

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

function generateInsert(appetizer: Appetizer): string {
  return `INSERT INTO appetizers (
  id, slug, name, description, tagline,
  style, status, category, serving_temp,
  main_ingredients, sauce_or_dip, is_fried, is_baked, is_raw, spice_level,
  origin, history, serving, dietary, preparation,
  variations, tags, popularity, related_appetizers, media, pricing
) VALUES (
  '${escapeString(appetizer.id)}',
  '${escapeString(appetizer.slug)}',
  ${toJsonString(appetizer.name)},
  ${toJsonString(appetizer.description)},
  ${appetizer.tagline ? toJsonString(appetizer.tagline) : 'NULL'},
  '${appetizer.style}',
  '${appetizer.status}',
  '${appetizer.category}',
  '${appetizer.serving_temp}',
  ${toArrayString(appetizer.main_ingredients)},
  ${appetizer.sauce_or_dip ? `'${escapeString(appetizer.sauce_or_dip)}'` : 'NULL'},
  ${appetizer.is_fried},
  ${appetizer.is_baked},
  ${appetizer.is_raw},
  ${appetizer.spice_level},
  ${toJsonString(appetizer.origin)},
  ${appetizer.history ? toJsonString(appetizer.history) : 'NULL'},
  ${toJsonString(appetizer.serving)},
  ${toJsonString(appetizer.dietary)},
  ${appetizer.preparation ? toJsonString(appetizer.preparation) : 'NULL'},
  ${appetizer.variations ? toJsonString(appetizer.variations) : 'NULL'},
  ${toArrayString(appetizer.tags)},
  ${appetizer.popularity},
  ${appetizer.related_appetizers ? toArrayString(appetizer.related_appetizers) : 'NULL'},
  ${appetizer.media ? toJsonString(appetizer.media) : 'NULL'},
  ${appetizer.pricing ? toJsonString(appetizer.pricing) : 'NULL'}
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  tagline = EXCLUDED.tagline,
  style = EXCLUDED.style,
  status = EXCLUDED.status,
  category = EXCLUDED.category,
  serving_temp = EXCLUDED.serving_temp,
  main_ingredients = EXCLUDED.main_ingredients,
  sauce_or_dip = EXCLUDED.sauce_or_dip,
  is_fried = EXCLUDED.is_fried,
  is_baked = EXCLUDED.is_baked,
  is_raw = EXCLUDED.is_raw,
  spice_level = EXCLUDED.spice_level,
  origin = EXCLUDED.origin,
  history = EXCLUDED.history,
  serving = EXCLUDED.serving,
  dietary = EXCLUDED.dietary,
  preparation = EXCLUDED.preparation,
  variations = EXCLUDED.variations,
  tags = EXCLUDED.tags,
  popularity = EXCLUDED.popularity,
  related_appetizers = EXCLUDED.related_appetizers,
  media = EXCLUDED.media,
  pricing = EXCLUDED.pricing,
  updated_at = now();`;
}

function generateBatches(): void {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('Generating appetizer SQL batches...');
  console.log(`Total appetizers: ${allAppetizers.length}`);
  console.log(`  - Italian: ${appetizerCounts.italian}`);
  console.log(`  - Spanish: ${appetizerCounts.spanish}`);
  console.log(`  - International: ${appetizerCounts.international}`);

  const totalBatches = Math.ceil(allAppetizers.length / BATCH_SIZE);

  for (let i = 0; i < totalBatches; i++) {
    const start = i * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, allAppetizers.length);
    const batch = allAppetizers.slice(start, end);

    const batchNumber = String(i + 1).padStart(2, '0');
    const fileName = `batch-${batchNumber}-appetizers.sql`;
    const filePath = path.join(OUTPUT_DIR, fileName);

    const header = `-- GUDBRO Appetizers Batch ${batchNumber}
-- Records: ${start + 1} to ${end} of ${allAppetizers.length}
-- Generated: ${new Date().toISOString()}

`;

    const content = header + batch.map(generateInsert).join('\n\n');

    fs.writeFileSync(filePath, content);
    console.log(`Generated: ${fileName} (${batch.length} appetizers)`);
  }

  // Generate combined file
  const allFileName = 'all-appetizers.sql';
  const allFilePath = path.join(OUTPUT_DIR, allFileName);
  const allHeader = `-- GUDBRO All Appetizers
-- Total: ${allAppetizers.length} appetizers
-- Generated: ${new Date().toISOString()}

`;
  const allContent = allHeader + allAppetizers.map(generateInsert).join('\n\n');
  fs.writeFileSync(allFilePath, allContent);
  console.log(`Generated: ${allFileName} (${allAppetizers.length} appetizers)`);

  console.log('\nDone! Generated files in:', OUTPUT_DIR);
}

// Run generator
generateBatches();
