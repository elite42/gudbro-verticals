/**
 * Generate SQL batch files for Tea & Infusions
 *
 * Usage: npx tsx shared/database/tea/scripts/generate-sql-batches.ts
 * Output: shared/database/tea/scripts/batches/batch-*.sql
 */

import * as fs from 'fs';
import * as path from 'path';
import { allTeas } from '../data';

const BATCH_SIZE = 15;
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

function toppingArrayToSQL(arr: string[] | null | undefined): string {
  if (!arr || arr.length === 0) return "ARRAY[]::boba_topping[]";
  const escaped = arr.map(s => `'${s}'`).join(", ");
  return `ARRAY[${escaped}]::boba_topping[]`;
}

function teaToSQL(tea: typeof allTeas[0]): string {
  return `INSERT INTO tea (
  id, slug, name, description,
  category, style, caffeine_level, sweetness,
  main_ingredients, quantity_description, ingredient_ids,
  bubble_tea_base, default_toppings,
  glass_type, volume_ml, chain_style_decoration, premium_style_decoration,
  preparation_method, prep_time_seconds, skill_level, steep_time_seconds, water_temperature_c, preparation_notes,
  ingredient_cost_usd, selling_price_usd, profit_margin_percent,
  calories_per_serving, caffeine_mg, sugar_g, protein_g, fat_g,
  is_vegan, is_dairy_free, is_gluten_free, is_sugar_free, is_caffeine_free, default_milk, allergens,
  available_milks, available_syrups, available_toppings, can_adjust_sweetness, can_adjust_ice,
  tags, origin_country, popularity, is_seasonal, is_signature
) VALUES (
  ${escapeSQL(tea.id)}, ${escapeSQL(tea.slug)}, ${escapeSQL(tea.name)}, ${escapeSQL(tea.description)},
  ${escapeSQL(tea.category)}, ${escapeSQL(tea.style)}, ${escapeSQL(tea.caffeine_level)}, ${escapeSQL(tea.sweetness)},
  ${arrayToSQL(tea.main_ingredients)}, ${escapeSQL(tea.quantity_description)}, ${arrayToSQL(tea.ingredient_ids)},
  ${tea.bubble_tea_base ? escapeSQL(tea.bubble_tea_base) : 'NULL'}, ${toppingArrayToSQL(tea.default_toppings)},
  ${escapeSQL(tea.serving.glass_type)}, ${tea.serving.volume_ml}, ${escapeSQL(tea.serving.chain_style_decoration)}, ${escapeSQL(tea.serving.premium_style_decoration)},
  ${escapeSQL(tea.preparation.method)}, ${tea.preparation.prep_time_seconds}, ${tea.preparation.skill_level}, ${tea.preparation.steep_time_seconds || 'NULL'}, ${tea.preparation.water_temperature_c || 'NULL'}, ${escapeSQL(tea.preparation.notes || null)},
  ${tea.cost.ingredient_cost_usd}, ${tea.cost.selling_price_usd}, ${tea.cost.profit_margin_percent},
  ${tea.nutrition.calories_per_serving}, ${tea.nutrition.caffeine_mg || 'NULL'}, ${tea.nutrition.sugar_g || 'NULL'}, ${tea.nutrition.protein_g || 'NULL'}, ${tea.nutrition.fat_g || 'NULL'},
  ${tea.dietary.is_vegan}, ${tea.dietary.is_dairy_free}, ${tea.dietary.is_gluten_free}, ${tea.dietary.is_sugar_free}, ${tea.dietary.is_caffeine_free}, ${escapeSQL(tea.dietary.default_milk)}, ${arrayToSQL(tea.dietary.allergens)},
  ${milkArrayToSQL(tea.customization.available_milks)}, ${arrayToSQL(tea.customization.available_syrups)}, ${toppingArrayToSQL(tea.customization.available_toppings)}, ${tea.customization.can_adjust_sweetness}, ${tea.customization.can_adjust_ice},
  ${arrayToSQL(tea.tags)}, ${escapeSQL(tea.origin_country || null)}, ${tea.popularity}, ${tea.is_seasonal}, ${tea.is_signature}
) ON CONFLICT (id) DO NOTHING;`;
}

// Generate batches
const totalBatches = Math.ceil(allTeas.length / BATCH_SIZE);
console.log(`Generating ${totalBatches} batch files for ${allTeas.length} teas...`);

for (let i = 0; i < allTeas.length; i += BATCH_SIZE) {
  const batchNum = Math.floor(i / BATCH_SIZE) + 1;
  const batch = allTeas.slice(i, i + BATCH_SIZE);

  const sql = `-- GUDBRO Tea & Infusions Batch ${batchNum}/${totalBatches}
-- Teas ${i + 1} to ${Math.min(i + BATCH_SIZE, allTeas.length)} of ${allTeas.length}
-- Run this in Supabase SQL Editor AFTER creating the schema

${batch.map(teaToSQL).join('\n\n')}

-- Batch ${batchNum} complete
`;

  const filename = `batch-${String(batchNum).padStart(2, '0')}.sql`;
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), sql);
  console.log(`Created ${filename} (${batch.length} teas)`);
}

console.log(`\nDone! Files created in: ${OUTPUT_DIR}`);
console.log(`\nTo import:`);
console.log(`1. First run: create-tea-table.sql`);
console.log(`2. Then run each batch file in order`);
