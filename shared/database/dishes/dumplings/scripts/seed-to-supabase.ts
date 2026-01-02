/**
 * GUDBRO Dumplings Seeder to Supabase
 *
 * Seeds all dumplings to Supabase using the REST API
 * Run with: SERVICE_ROLE_KEY="your-key" npx tsx shared/database/dumplings/scripts/seed-to-supabase.ts
 */

import { allDumplings } from '../data';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vnaonebbueezrvjekqxs.supabase.co';
const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('❌ SERVICE_ROLE_KEY environment variable is required');
  console.log('\nUsage: SERVICE_ROLE_KEY="your-key" npx tsx seed-to-supabase.ts');
  process.exit(1);
}

/**
 * Insert dumplings to Supabase in batches
 */
async function seedDumplings() {
  console.log('\n🥟 GUDBRO Dumplings Seeder');
  console.log('='.repeat(50));
  console.log(`Total dumplings: ${allDumplings.length}`);
  console.log(`Supabase URL: ${SUPABASE_URL}\n`);

  const BATCH_SIZE = 5;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < allDumplings.length; i += BATCH_SIZE) {
    const batch = allDumplings.slice(i, i + BATCH_SIZE);
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;

    // Transform dumplings for Supabase
    const dumplingRecords = batch.map(dumpling => ({
      id: dumpling.id,
      slug: dumpling.slug,
      name: dumpling.name,
      description: dumpling.description,
      style: dumpling.style,
      status: dumpling.status,
      tags: dumpling.tags,
      origin: dumpling.origin,
      history: dumpling.history || null,
      wrapper: dumpling.wrapper,
      filling: dumpling.filling || null,
      cooking: dumpling.cooking,
      sauce: dumpling.sauce || null,
      serving: dumpling.serving,
      dietary: dumpling.dietary,
      pricing: dumpling.pricing || null,
      availability: dumpling.availability || null,
      customization: dumpling.customization || null,
    }));

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/dumplings`, {
        method: 'POST',
        headers: {
          'apikey': SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates',
        },
        body: JSON.stringify(dumplingRecords),
      });

      if (response.ok) {
        console.log(`✅ Batch ${batchNumber}: Inserted ${batch.length} dumplings`);
        batch.forEach(d => console.log(`   - ${d.name.en}`));
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

    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Seeding Summary:');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   Total: ${allDumplings.length}`);

  if (errorCount === 0) {
    console.log('\n🎉 All dumplings seeded successfully!\n');
  } else {
    console.log('\n⚠️  Some dumplings failed to seed. Check errors above.\n');
    process.exit(1);
  }
}

seedDumplings().catch(console.error);
