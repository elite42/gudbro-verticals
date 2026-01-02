/**
 * GUDBRO - Seed Appetizers & Desserts to Supabase
 *
 * Usage:
 * SERVICE_ROLE_KEY="your-key" npx tsx shared/database/scripts/seed-appetizers-desserts.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const SUPABASE_URL = 'https://vnaonebbueezrvjekqxs.supabase.co';
const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('ERROR: SERVICE_ROLE_KEY environment variable is required');
  process.exit(1);
}

async function execSQL(sql: string): Promise<any> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'apikey': SERVICE_ROLE_KEY!,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: sql })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`SQL Error: ${response.status} - ${text}`);
  }

  return response.json();
}

async function seedBatchFile(filePath: string): Promise<number> {
  const sql = fs.readFileSync(filePath, 'utf-8');

  // Split by INSERT statements and execute one at a time
  const statements = sql
    .split(/(?=INSERT INTO)/g)
    .filter(s => s.trim().startsWith('INSERT'));

  let count = 0;
  for (const stmt of statements) {
    try {
      await execSQL(stmt);
      count++;
    } catch (err: any) {
      console.error(`  Error in statement: ${err.message.substring(0, 100)}...`);
    }
  }

  return count;
}

async function main() {
  console.log('=== GUDBRO Appetizers & Desserts Seeding ===\n');

  // First, create the schemas
  console.log('Step 1: Creating appetizers table...');
  try {
    const appetizersSchema = fs.readFileSync(
      path.join(__dirname, '../appetizers/schema/create-appetizers-table.sql'),
      'utf-8'
    );
    await execSQL(appetizersSchema);
    console.log('  Appetizers table created/updated');
  } catch (err: any) {
    console.log('  Note:', err.message.substring(0, 100));
  }

  console.log('Step 2: Creating desserts table...');
  try {
    const dessertsSchema = fs.readFileSync(
      path.join(__dirname, '../desserts/schema/create-desserts-table.sql'),
      'utf-8'
    );
    await execSQL(dessertsSchema);
    console.log('  Desserts table created/updated');
  } catch (err: any) {
    console.log('  Note:', err.message.substring(0, 100));
  }

  // Seed appetizers
  console.log('\nStep 3: Seeding appetizers...');
  const appetizersBatchDir = path.join(__dirname, '../appetizers/scripts/batches');
  const appetizersFiles = fs.readdirSync(appetizersBatchDir)
    .filter(f => f.startsWith('batch-') && f.endsWith('.sql'))
    .sort();

  let totalAppetizers = 0;
  for (const file of appetizersFiles) {
    const count = await seedBatchFile(path.join(appetizersBatchDir, file));
    totalAppetizers += count;
    console.log(`  ${file}: ${count} records`);
  }

  // Seed desserts
  console.log('\nStep 4: Seeding desserts...');
  const dessertsBatchDir = path.join(__dirname, '../desserts/scripts/batches');
  const dessertsFiles = fs.readdirSync(dessertsBatchDir)
    .filter(f => f.startsWith('batch-') && f.endsWith('.sql'))
    .sort();

  let totalDesserts = 0;
  for (const file of dessertsFiles) {
    const count = await seedBatchFile(path.join(dessertsBatchDir, file));
    totalDesserts += count;
    console.log(`  ${file}: ${count} records`);
  }

  // Summary
  console.log('\n=== Summary ===');
  console.log(`Appetizers: ${totalAppetizers} records`);
  console.log(`Desserts: ${totalDesserts} records`);
  console.log(`Total: ${totalAppetizers + totalDesserts} records`);
}

main().catch(console.error);
