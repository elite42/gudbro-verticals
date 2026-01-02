/**
 * Generate SQL batch files for wines
 *
 * Usage: npx tsx shared/database/wines/scripts/generate-sql-batches.ts
 * Output: shared/database/wines/scripts/batches/batch-*.sql
 */

import * as fs from 'fs';
import * as path from 'path';
import { allWines } from '../data';

const BATCH_SIZE = 20;
const OUTPUT_DIR = path.join(__dirname, 'batches');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function escapeSQL(str: string | null | undefined): string {
  if (str === null || str === undefined) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

function arrayToSQL(arr: string[] | null | undefined): string {
  if (!arr || arr.length === 0) return "ARRAY[]::TEXT[]";
  const escaped = arr.map(s => `'${s.replace(/'/g, "''")}'`).join(", ");
  return `ARRAY[${escaped}]`;
}

function wineToSQL(wine: typeof allWines[0]): string {
  return `INSERT INTO wines (
  id, slug, name, description,
  color, style, status, grape_varieties, is_blend, vintage_type,
  origin_country, origin_country_code, origin_region, origin_subregion, origin_appellation, origin_classification,
  abv_min, abv_max, acidity, tannins, sweetness, body, oak,
  primary_flavors, secondary_flavors, tertiary_flavors, aroma_profile, finish,
  serving_temp_min_celsius, serving_temp_max_celsius, glass_type, decanting_minutes, aging_potential_min_years, aging_potential_max_years,
  food_categories, specific_dishes, cheese_pairings, avoid_with,
  is_vegan, is_organic, is_biodynamic, is_natural, is_low_sulfite, contains_sulfites, allergens, calories_per_glass,
  ingredient_ids, tags, popularity, price_tier,
  production_method, aging_vessel, aging_months, annual_production_bottles
) VALUES (
  ${escapeSQL(wine.id)}, ${escapeSQL(wine.slug)}, ${escapeSQL(wine.name)}, ${escapeSQL(wine.description)},
  ${escapeSQL(wine.color)}, ${escapeSQL(wine.style)}, ${escapeSQL(wine.status)}, ${arrayToSQL(wine.grape_varieties)}, ${wine.is_blend}, ${escapeSQL(wine.vintage_type)},
  ${escapeSQL(wine.origin.country)}, ${escapeSQL(wine.origin.country_code)}, ${escapeSQL(wine.origin.region)}, ${escapeSQL(wine.origin.subregion)}, ${escapeSQL(wine.origin.appellation)}, ${escapeSQL(wine.origin.classification)},
  ${wine.characteristics.abv_min}, ${wine.characteristics.abv_max}, ${escapeSQL(wine.characteristics.acidity)}, ${escapeSQL(wine.characteristics.tannins)}, ${escapeSQL(wine.characteristics.sweetness)}, ${escapeSQL(wine.characteristics.body)}, ${escapeSQL(wine.characteristics.oak)},
  ${arrayToSQL(wine.taste.primary_flavors)}, ${arrayToSQL(wine.taste.secondary_flavors)}, ${arrayToSQL(wine.taste.tertiary_flavors)}, ${arrayToSQL(wine.taste.aroma_profile)}, ${escapeSQL(wine.taste.finish)},
  ${wine.serving.temperature_celsius.min}, ${wine.serving.temperature_celsius.max}, ${escapeSQL(wine.serving.glass_type)}, ${wine.serving.decanting_minutes || 'NULL'}, ${wine.serving.aging_potential_years?.min || 'NULL'}, ${wine.serving.aging_potential_years?.max || 'NULL'},
  ${arrayToSQL(wine.pairing.food_categories)}, ${arrayToSQL(wine.pairing.specific_dishes)}, ${arrayToSQL(wine.pairing.cheese_pairings)}, ${arrayToSQL(wine.pairing.avoid_with)},
  ${wine.dietary.is_vegan}, ${wine.dietary.is_organic}, ${wine.dietary.is_biodynamic}, ${wine.dietary.is_natural}, ${wine.dietary.is_low_sulfite}, ${wine.dietary.contains_sulfites}, ${arrayToSQL(wine.dietary.allergens)}, ${wine.dietary.calories_per_glass},
  ${arrayToSQL(wine.ingredient_ids)}, ${arrayToSQL(wine.tags)}, ${wine.popularity}, ${escapeSQL(wine.price_tier)},
  ${escapeSQL(wine.production?.method)}, ${escapeSQL(wine.production?.aging_vessel)}, ${wine.production?.aging_months || 'NULL'}, ${wine.production?.annual_production_bottles || 'NULL'}
) ON CONFLICT (id) DO NOTHING;`;
}

// Generate batches
const totalBatches = Math.ceil(allWines.length / BATCH_SIZE);
console.log(`Generating ${totalBatches} batch files for ${allWines.length} wines...`);

for (let i = 0; i < allWines.length; i += BATCH_SIZE) {
  const batchNum = Math.floor(i / BATCH_SIZE) + 1;
  const batch = allWines.slice(i, i + BATCH_SIZE);

  const sql = `-- GUDBRO Wines Batch ${batchNum}/${totalBatches}
-- Wines ${i + 1} to ${Math.min(i + BATCH_SIZE, allWines.length)} of ${allWines.length}
-- Run this in Supabase SQL Editor

${batch.map(wineToSQL).join('\n\n')}

-- Batch ${batchNum} complete
`;

  const filename = `batch-${String(batchNum).padStart(2, '0')}.sql`;
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), sql);
  console.log(`Created ${filename} (${batch.length} wines)`);
}

console.log(`\nDone! Files created in: ${OUTPUT_DIR}`);
console.log(`\nTo import, run each batch file in Supabase SQL Editor in order.`);
