// =====================================================
// Generate SQL INSERT statements from Japanese data
// Run with: npx ts-node generate-sql.ts
// =====================================================

import { allJapaneseDishes, japaneseDatabaseStats } from '../data';

function escapeSQL(value: string | undefined | null): string {
  if (value === undefined || value === null) return 'NULL';
  return `'${value.replace(/'/g, "''")}'`;
}

function toSQLArray(arr: string[] | undefined): string {
  if (!arr || arr.length === 0) return "'{}'";
  return `ARRAY[${arr.map(v => escapeSQL(v)).join(', ')}]`;
}

function toSQLValue(value: any): string {
  if (value === undefined || value === null) return 'NULL';
  if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE';
  if (typeof value === 'number') return value.toString();
  if (typeof value === 'string') return escapeSQL(value);
  if (Array.isArray(value)) return toSQLArray(value);
  return 'NULL';
}

console.log(`-- =====================================================`);
console.log(`-- GUDBRO Japanese Cuisine Database - Data Import`);
console.log(`-- Generated: ${new Date().toISOString()}`);
console.log(`-- Total dishes: ${japaneseDatabaseStats.total}`);
console.log(`-- =====================================================\n`);

// Print statistics
console.log(`-- Statistics:`);
console.log(`-- By Category:`);
Object.entries(japaneseDatabaseStats.byCategory).forEach(([cat, count]) => {
  if (count > 0) console.log(`--   ${cat}: ${count}`);
});
console.log(`-- By Dietary:`);
console.log(`--   Vegetarian: ${japaneseDatabaseStats.byDietary.vegetarian}`);
console.log(`--   Vegan: ${japaneseDatabaseStats.byDietary.vegan}`);
console.log(`--   Contains Raw Fish: ${japaneseDatabaseStats.byDietary.containsRawFish}`);
console.log(`--   Cooked Only: ${japaneseDatabaseStats.byDietary.cooked}`);
console.log(`\n`);

// Generate INSERT statements
allJapaneseDishes.forEach((dish, index) => {
  const sql = `INSERT INTO japanese (
  id, slug, name, name_japanese, name_kanji, description,
  category, protein_type, preparation, roll_style, origin, status,
  cut_style, pieces_per_serving, nori_position, rice_type,
  main_ingredients, filling_ingredients, topping_ingredients, sauce, garnish, ingredient_ids,
  serving_style, serving_temp, wasabi_included, ginger_included, soy_sauce_type,
  is_raw, is_vegetarian, is_vegan, is_gluten_free, is_cooked, contains_raw_fish,
  allergens, calories_per_serving, protein_g, carbs_g, fat_g, omega3_mg, spice_level,
  tags, popularity, difficulty, sake_pairing, beer_pairing, wine_pairing, history, fun_fact
) VALUES (
  ${toSQLValue(dish.id)}, ${toSQLValue(dish.slug)}, ${toSQLValue(dish.name)}, ${toSQLValue(dish.name_japanese)}, ${toSQLValue(dish.name_kanji)}, ${toSQLValue(dish.description)},
  ${toSQLValue(dish.category)}, ${toSQLValue(dish.protein_type)}, ${toSQLValue(dish.preparation)}, ${toSQLValue(dish.roll_style)}, ${toSQLValue(dish.origin)}, ${toSQLValue(dish.status)},
  ${toSQLValue(dish.cut_style)}, ${toSQLValue(dish.pieces_per_serving)}, ${toSQLValue(dish.nori_position)}, ${toSQLValue(dish.rice_type)},
  ${toSQLValue(dish.main_ingredients)}, ${toSQLValue(dish.filling_ingredients)}, ${toSQLValue(dish.topping_ingredients)}, ${toSQLValue(dish.sauce)}, ${toSQLValue(dish.garnish)}, ${toSQLValue(dish.ingredient_ids)},
  ${toSQLValue(dish.serving_style)}, ${toSQLValue(dish.serving_temp)}, ${toSQLValue(dish.wasabi_included)}, ${toSQLValue(dish.ginger_included)}, ${toSQLValue(dish.soy_sauce_type)},
  ${toSQLValue(dish.is_raw)}, ${toSQLValue(dish.is_vegetarian)}, ${toSQLValue(dish.is_vegan)}, ${toSQLValue(dish.is_gluten_free)}, ${toSQLValue(dish.is_cooked)}, ${toSQLValue(dish.contains_raw_fish)},
  ${toSQLValue(dish.allergens)}, ${toSQLValue(dish.calories_per_serving)}, ${toSQLValue(dish.protein_g)}, ${toSQLValue(dish.carbs_g)}, ${toSQLValue(dish.fat_g)}, ${toSQLValue(dish.omega3_mg)}, ${toSQLValue(dish.spice_level)},
  ${toSQLValue(dish.tags)}, ${toSQLValue(dish.popularity)}, ${toSQLValue(dish.difficulty)}, ${toSQLValue(dish.sake_pairing)}, ${toSQLValue(dish.beer_pairing)}, ${toSQLValue(dish.wine_pairing)}, ${toSQLValue(dish.history)}, ${toSQLValue(dish.fun_fact)}
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  ingredient_ids = EXCLUDED.ingredient_ids,
  updated_at = NOW();`;

  console.log(`-- [${index + 1}/${allJapaneseDishes.length}] ${dish.name}`);
  console.log(sql);
  console.log('');
});

console.log(`-- =====================================================`);
console.log(`-- Import complete: ${allJapaneseDishes.length} dishes`);
console.log(`-- =====================================================`);
