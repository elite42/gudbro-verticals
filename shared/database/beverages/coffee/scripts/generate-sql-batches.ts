/**
 * Generate SQL batch files for coffee
 *
 * Usage: npx tsx shared/database/coffee/scripts/generate-sql-batches.ts
 * Output: shared/database/coffee/scripts/batches/batch-*.sql
 */

import * as fs from 'fs';
import * as path from 'path';
import { allCoffees } from '../data';

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

function milkArrayToSQL(arr: string[] | null | undefined): string {
  if (!arr || arr.length === 0) return "ARRAY[]::milk_type[]";
  const escaped = arr.map(s => `'${s}'`).join(", ");
  return `ARRAY[${escaped}]::milk_type[]`;
}

function coffeeToSQL(coffee: typeof allCoffees[0]): string {
  return `INSERT INTO coffee (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, default_milk, allergens,
  available_milks, available_syrups, can_add_espresso_shot, can_adjust_sweetness, can_make_decaf,
  tags, popularity, is_seasonal, is_signature
) VALUES (
  ${escapeSQL(coffee.id)}, ${escapeSQL(coffee.slug)}, ${escapeSQL(coffee.name)}, ${escapeSQL(coffee.description)},
  ${escapeSQL(coffee.category)}, ${escapeSQL(coffee.style)}, ${escapeSQL(coffee.caffeine_level)}, ${escapeSQL(coffee.sweetness)},
  ${arrayToSQL(coffee.main_ingredients)}, ${escapeSQL(coffee.quantity_description)}, ${arrayToSQL(coffee.ingredient_ids)},
  ${escapeSQL(coffee.serving.glass_type)}, ${coffee.serving.volume_ml}, ${escapeSQL(coffee.serving.chain_style_decoration)}, ${escapeSQL(coffee.serving.premium_style_decoration)},
  ${escapeSQL(coffee.preparation.method)}, ${coffee.preparation.prep_time_seconds}, ${coffee.preparation.skill_level}, ${escapeSQL(coffee.preparation.notes || null)},
  ${coffee.cost.ingredient_cost_usd}, ${coffee.cost.selling_price_usd}, ${coffee.cost.profit_margin_percent},
  ${coffee.nutrition.calories_per_serving}, ${coffee.nutrition.caffeine_mg || 'NULL'}, ${coffee.nutrition.sugar_g || 'NULL'}, ${coffee.nutrition.protein_g || 'NULL'}, ${coffee.nutrition.fat_g || 'NULL'},
  ${coffee.dietary.is_vegan}, ${coffee.dietary.is_dairy_free}, ${coffee.dietary.is_gluten_free}, ${coffee.dietary.is_sugar_free}, ${escapeSQL(coffee.dietary.default_milk)}, ${arrayToSQL(coffee.dietary.allergens)},
  ${milkArrayToSQL(coffee.customization.available_milks)}, ${arrayToSQL(coffee.customization.available_syrups)}, ${coffee.customization.can_add_espresso_shot}, ${coffee.customization.can_adjust_sweetness}, ${coffee.customization.can_make_decaf},
  ${arrayToSQL(coffee.tags)}, ${coffee.popularity}, ${coffee.is_seasonal}, ${coffee.is_signature}
) ON CONFLICT (id) DO NOTHING;`;
}

// Generate batches
const totalBatches = Math.ceil(allCoffees.length / BATCH_SIZE);
console.log(`Generating ${totalBatches} batch files for ${allCoffees.length} coffees...`);

for (let i = 0; i < allCoffees.length; i += BATCH_SIZE) {
  const batchNum = Math.floor(i / BATCH_SIZE) + 1;
  const batch = allCoffees.slice(i, i + BATCH_SIZE);

  const sql = `-- GUDBRO Coffee Batch ${batchNum}/${totalBatches}
-- Coffees ${i + 1} to ${Math.min(i + BATCH_SIZE, allCoffees.length)} of ${allCoffees.length}
-- Run this in Supabase SQL Editor

${batch.map(coffeeToSQL).join('\n\n')}

-- Batch ${batchNum} complete
`;

  const filename = `batch-${String(batchNum).padStart(2, '0')}.sql`;
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), sql);
  console.log(`Created ${filename} (${batch.length} coffees)`);
}

console.log(`\nDone! Files created in: ${OUTPUT_DIR}`);
console.log(`\nTo import, run each batch file in Supabase SQL Editor in order.`);
