/**
 * GUDBRO Food Database - Generate SQL Batches
 *
 * Generates SQL INSERT statements for all food databases:
 * - Pasta (100 recipes)
 * - Risotti (27 recipes)
 * - Dumplings (20 recipes)
 * - Soups (39 recipes)
 *
 * Run with: npx tsx shared/database/scripts/generate-all-food-batches.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// Import all data
import { allPasta } from '../pasta/data';
import { allRisotti } from '../risotti/data';
import { allDumplings } from '../dumplings/data';
import { allSoups } from '../soups/data';

const BATCH_SIZE = 10;
const OUTPUT_DIR = path.join(__dirname, '../migrations/food-batches');

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
      const items = value.map(v => `"${escapeSql(v)}"`);
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
 * Map pasta shape to valid enum value
 */
function mapPastaShape(shape: string | undefined): string {
  if (!shape) return 'spaghetti';
  // Map common shapes to enum values
  const shapeMap: Record<string, string> = {
    'paccheri': 'paccheri',
    'spaghetti': 'spaghetti',
    'linguine': 'linguine',
    'fettuccine': 'fettuccine',
    'tagliatelle': 'tagliatelle',
    'penne': 'penne',
    'rigatoni': 'rigatoni',
    'fusilli': 'fusilli',
    'farfalle': 'farfalle',
    'orecchiette': 'orecchiette',
    'bucatini': 'bucatini',
    'capellini': 'capellini',
    'vermicelli': 'vermicelli',
    'pappardelle': 'pappardelle',
    'lasagne': 'lasagne',
    'cannelloni': 'cannelloni',
    'ravioli': 'ravioli',
    'tortellini': 'tortellini',
    'gnocchi': 'gnocchetti',
    'ramen': 'ramen',
    'udon': 'udon',
    'soba': 'soba',
  };
  return shapeMap[shape.toLowerCase()] || 'other';
}

/**
 * Map sauce type to valid enum value
 */
function mapSauceType(sauceType: string | undefined): string {
  if (!sauceType) return 'tomato';
  const sauceMap: Record<string, string> = {
    'tomato_based': 'tomato',
    'tomato': 'tomato',
    'cream_based': 'cream',
    'cream': 'cream',
    'oil_based': 'oil_based',
    'oil': 'oil_based',
    'butter_based': 'butter',
    'butter': 'butter',
    'pesto': 'pesto',
    'meat_based': 'meat',
    'meat': 'meat',
    'seafood_based': 'seafood',
    'seafood': 'seafood',
    'cheese_based': 'cheese',
    'cheese': 'cheese',
    'broth_based': 'broth',
    'broth': 'broth',
    'wine_based': 'oil_based', // Map wine-based to oil_based
    'stir_fry': 'stir_fry',
    'curry': 'curry',
    'spicy': 'spicy',
    'vegetable': 'vegetable',
    'none': 'none',
  };
  return sauceMap[sauceType.toLowerCase()] || 'tomato';
}

/**
 * Map cooking method to valid enum value
 */
function mapCookingMethod(method: string | undefined): string {
  if (!method) return 'boiled';
  const methodMap: Record<string, string> = {
    'boiled': 'boiled',
    'baked': 'baked',
    'stir_fried': 'stir_fried',
    'sauteed': 'boiled', // Sauteed pasta is still boiled first
    'tossed': 'boiled',  // Tossed pasta is still boiled first
    'simmered': 'boiled', // Simmered in sauce after boiling
    'soup': 'soup',
    'cold': 'cold',
    'fresh_raw': 'fresh_raw',
  };
  return methodMap[method.toLowerCase()] || 'boiled';
}

/**
 * Generate INSERT statement for pasta
 */
function generatePastaInsert(pasta: any): string {
  const columns = [
    'id', 'slug', 'stable_key', 'name', 'description', 'tagline',
    'status', 'style', 'tags', 'origin', 'history',
    'pasta_shape', 'pasta_dough', 'sauce_type', 'cooking_method',
    'ingredients', 'protein', 'toppings', 'serving', 'flavor',
    'dietary', 'customization', 'variations', 'popularity',
    'recommended_for', 'pairings', 'related_pasta'
  ];

  // Handle nested pasta_type structure vs flat structure
  const pastaShape = pasta.pasta_shape || pasta.pasta_type?.shape;
  const pastaDough = pasta.pasta_dough || pasta.pasta_type?.dough || 'semolina';
  const sauceType = pasta.sauce_type || pasta.sauce?.type;
  const cookingMethod = pasta.cooking_method || pasta.cooking?.method;

  const values = [
    toSqlValue(pasta.id),
    toSqlValue(pasta.slug),
    toSqlValue(pasta.stable_key),
    toSqlValue(pasta.name),
    toSqlValue(pasta.description),
    toSqlValue(pasta.tagline),
    toSqlValue(pasta.status || 'active'),
    toSqlValue(pasta.style),
    toSqlValue(pasta.tags || []),
    toSqlValue(pasta.origin),
    toSqlValue(pasta.history),
    toSqlValue(mapPastaShape(pastaShape)),
    toSqlValue(pastaDough),
    toSqlValue(mapSauceType(sauceType)),
    toSqlValue(mapCookingMethod(cookingMethod)),
    toSqlValue(pasta.ingredients || []),
    toSqlValue(pasta.protein),
    toSqlValue(pasta.toppings || []),
    toSqlValue(pasta.serving || {}),
    toSqlValue(pasta.flavor || { profile: [], spice_level: 0 }),
    toSqlValue(pasta.dietary || {}),
    toSqlValue(pasta.customization),
    toSqlValue(pasta.variations || []),
    toSqlValue(pasta.popularity || 50),
    toSqlValue(pasta.recommended_for || []),
    toSqlValue(pasta.pairings),
    toSqlValue(pasta.related_pasta || []),
  ];

  return `INSERT INTO pasta (${columns.join(', ')})
VALUES (${values.join(', ')})
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();`;
}

/**
 * Generate INSERT statement for risotti
 */
function generateRisottoInsert(risotto: any): string {
  const columns = [
    'id', 'slug', 'stable_key', 'name', 'description', 'tagline',
    'status', 'style', 'tags', 'origin', 'history',
    'rice_type', 'broth', 'cooking',
    'main_ingredients', 'proteins', 'vegetables', 'aromatics',
    'finishing', 'serving', 'dietary', 'pricing', 'availability'
  ];

  const values = [
    toSqlValue(risotto.id),
    toSqlValue(risotto.slug),
    toSqlValue(risotto.stable_key),
    toSqlValue(risotto.name),
    toSqlValue(risotto.description),
    toSqlValue(risotto.tagline),
    toSqlValue(risotto.status),
    toSqlValue(risotto.style),
    toSqlValue(risotto.tags || []),
    toSqlValue(risotto.origin),
    toSqlValue(risotto.history),
    toSqlValue(risotto.rice_type),
    toSqlValue(risotto.broth),
    toSqlValue(risotto.cooking),
    toSqlValue(risotto.main_ingredients || []),
    toSqlValue(risotto.proteins || []),
    toSqlValue(risotto.vegetables || []),
    toSqlValue(risotto.aromatics || []),
    toSqlValue(risotto.finishing),
    toSqlValue(risotto.serving),
    toSqlValue(risotto.dietary),
    toSqlValue(risotto.pricing),
    toSqlValue(risotto.availability),
  ];

  return `INSERT INTO risotti (${columns.join(', ')})
VALUES (${values.join(', ')})
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();`;
}

/**
 * Generate INSERT statement for dumplings
 */
function generateDumplingInsert(dumpling: any): string {
  const columns = [
    'id', 'slug', 'name', 'description', 'tagline',
    'status', 'style', 'tags', 'origin', 'history',
    'wrapper', 'filling', 'cooking', 'sauce',
    'serving', 'dietary', 'pricing', 'availability', 'customization'
  ];

  const values = [
    toSqlValue(dumpling.id),
    toSqlValue(dumpling.slug),
    toSqlValue(dumpling.name),
    toSqlValue(dumpling.description),
    toSqlValue(dumpling.tagline),
    toSqlValue(dumpling.status),
    toSqlValue(dumpling.style),
    toSqlValue(dumpling.tags || []),
    toSqlValue(dumpling.origin),
    toSqlValue(dumpling.history),
    toSqlValue(dumpling.wrapper),
    toSqlValue(dumpling.filling),
    toSqlValue(dumpling.cooking),
    toSqlValue(dumpling.sauce),
    toSqlValue(dumpling.serving),
    toSqlValue(dumpling.dietary),
    toSqlValue(dumpling.pricing),
    toSqlValue(dumpling.availability),
    toSqlValue(dumpling.customization),
  ];

  return `INSERT INTO dumplings (${columns.join(', ')})
VALUES (${values.join(', ')})
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  dietary = EXCLUDED.dietary,
  updated_at = NOW();`;
}

/**
 * Generate INSERT statement for soups
 */
function generateSoupInsert(soup: any): string {
  const columns = [
    'id', 'slug', 'name', 'description', 'tagline',
    'status', 'style', 'tags', 'origin', 'history',
    'soup_type', 'broth', 'cooking',
    'main_ingredients', 'proteins', 'vegetables', 'aromatics', 'garnish',
    'serving', 'dietary', 'pricing', 'availability', 'customization'
  ];

  const values = [
    toSqlValue(soup.id),
    toSqlValue(soup.slug),
    toSqlValue(soup.name),
    toSqlValue(soup.description),
    toSqlValue(soup.tagline),
    toSqlValue(soup.status),
    toSqlValue(soup.style),
    toSqlValue(soup.tags || []),
    toSqlValue(soup.origin),
    toSqlValue(soup.history),
    toSqlValue(soup.soup_type),
    toSqlValue(soup.broth),
    toSqlValue(soup.cooking),
    toSqlValue(soup.main_ingredients || []),
    toSqlValue(soup.proteins || []),
    toSqlValue(soup.vegetables || []),
    toSqlValue(soup.aromatics || []),
    toSqlValue(soup.garnish || []),
    toSqlValue(soup.serving),
    toSqlValue(soup.dietary),
    toSqlValue(soup.pricing),
    toSqlValue(soup.availability),
    toSqlValue(soup.customization),
  ];

  return `INSERT INTO soups (${columns.join(', ')})
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
function writeBatches(
  items: any[],
  generateInsert: (item: any) => string,
  tableName: string
): void {
  const batchDir = path.join(OUTPUT_DIR, tableName);
  if (!fs.existsSync(batchDir)) {
    fs.mkdirSync(batchDir, { recursive: true });
  }

  let batchNumber = 1;
  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);
    const statements = batch.map(item => generateInsert(item)).join('\n\n');

    const header = `-- ${tableName.toUpperCase()} Batch ${batchNumber}
-- Items: ${i + 1} to ${Math.min(i + BATCH_SIZE, items.length)} of ${items.length}
-- Generated: ${new Date().toISOString()}

`;

    const filePath = path.join(batchDir, `batch-${String(batchNumber).padStart(2, '0')}.sql`);
    fs.writeFileSync(filePath, header + statements);

    console.log(`  ✅ ${tableName}/batch-${String(batchNumber).padStart(2, '0')}.sql (${batch.length} items)`);
    batchNumber++;
  }
}

// Main execution
console.log('\n🍽️  GUDBRO Food Database - SQL Batch Generator');
console.log('='.repeat(55));
console.log(`Output: ${OUTPUT_DIR}\n`);

console.log(`📊 Data Summary:`);
console.log(`   Pasta:     ${allPasta.length} recipes`);
console.log(`   Risotti:   ${allRisotti.length} recipes`);
console.log(`   Dumplings: ${allDumplings.length} recipes`);
console.log(`   Soups:     ${allSoups.length} recipes`);
console.log(`   TOTAL:     ${allPasta.length + allRisotti.length + allDumplings.length + allSoups.length} recipes\n`);

console.log('🍝 Generating Pasta batches...');
writeBatches(allPasta, generatePastaInsert, 'pasta');

console.log('\n🍚 Generating Risotti batches...');
writeBatches(allRisotti, generateRisottoInsert, 'risotti');

console.log('\n🥟 Generating Dumplings batches...');
writeBatches(allDumplings, generateDumplingInsert, 'dumplings');

console.log('\n🍲 Generating Soups batches...');
writeBatches(allSoups, generateSoupInsert, 'soups');

console.log('\n' + '='.repeat(55));
console.log('✅ All batches generated successfully!');
console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);
