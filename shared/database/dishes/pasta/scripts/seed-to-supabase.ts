/**
 * GUDBRO Pasta Seeder to Supabase
 *
 * Seeds all pasta dishes to Supabase using the REST API
 * Run with: SERVICE_ROLE_KEY="your-key" npx tsx shared/database/pasta/scripts/seed-to-supabase.ts
 */

import { allPasta } from '../data';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vnaonebbueezrvjekqxs.supabase.co';
const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('❌ SERVICE_ROLE_KEY environment variable is required');
  console.log('\nUsage: SERVICE_ROLE_KEY="your-key" npx tsx seed-to-supabase.ts');
  process.exit(1);
}

/**
 * Insert pasta dishes to Supabase in batches
 */
async function seedPasta() {
  console.log('\n🍝 GUDBRO Pasta Seeder');
  console.log('='.repeat(50));
  console.log(`Total pasta dishes: ${allPasta.length}`);
  console.log(`Supabase URL: ${SUPABASE_URL}\n`);

  const BATCH_SIZE = 5;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < allPasta.length; i += BATCH_SIZE) {
    const batch = allPasta.slice(i, i + BATCH_SIZE);
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;

    // Transform pasta for Supabase
    const pastaRecords = batch.map(pasta => ({
      id: pasta.id,
      slug: pasta.slug,
      name: pasta.name,
      description: pasta.description,
      style: pasta.style,
      origin: pasta.origin,
      pasta_type: pasta.pasta_type,
      sauce: pasta.sauce,
      proteins: pasta.proteins,
      vegetables: pasta.vegetables,
      cooking: pasta.cooking,
      serving: pasta.serving,
      dietary: pasta.dietary,
      pricing: pasta.pricing,
      availability: pasta.availability,
      tags: pasta.tags,
      status: pasta.status,
    }));

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/pasta`, {
        method: 'POST',
        headers: {
          'apikey': SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates', // Upsert on conflict
        },
        body: JSON.stringify(pastaRecords),
      });

      if (response.ok) {
        console.log(`✅ Batch ${batchNumber}: Inserted ${batch.length} pasta dishes`);
        batch.forEach(p => console.log(`   - ${p.name.en}`));
        successCount += batch.length;
      } else {
        const errorText = await response.text();
        console.error(`❌ Batch ${batchNumber} failed: ${response.status}`);
        console.error(`   Error: ${errorText}`);
        errorCount += batch.length;
      }
    } catch (error) {
      console.error(`❌ Batch ${batchNumber} error:`, error);
      errorCount += batch.length;
    }

    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Seeding Summary:');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   Total: ${allPasta.length}`);

  if (errorCount === 0) {
    console.log('\n🎉 All pasta dishes seeded successfully!\n');
  } else {
    console.log('\n⚠️  Some pasta dishes failed to seed. Check errors above.\n');
    process.exit(1);
  }
}

// Run the seeder
seedPasta().catch(console.error);
