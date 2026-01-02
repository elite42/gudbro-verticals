/**
 * GUDBRO Risotti Seeder to Supabase
 *
 * Seeds all risotti dishes to Supabase using the REST API
 * Run with: SERVICE_ROLE_KEY="your-key" npx tsx shared/database/risotti/scripts/seed-to-supabase.ts
 */

import { allRisotti } from '../data';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vnaonebbueezrvjekqxs.supabase.co';
const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('❌ SERVICE_ROLE_KEY environment variable is required');
  console.log('\nUsage: SERVICE_ROLE_KEY="your-key" npx tsx seed-to-supabase.ts');
  process.exit(1);
}

/**
 * Insert risotti to Supabase in batches
 */
async function seedRisotti() {
  console.log('\n🍚 GUDBRO Risotti Seeder');
  console.log('='.repeat(50));
  console.log(`Total risotti: ${allRisotti.length}`);
  console.log(`Supabase URL: ${SUPABASE_URL}\n`);

  const BATCH_SIZE = 5;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < allRisotti.length; i += BATCH_SIZE) {
    const batch = allRisotti.slice(i, i + BATCH_SIZE);
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;

    // Transform risotti for Supabase
    const risottiRecords = batch.map(risotto => ({
      id: risotto.id,
      slug: risotto.slug,
      name: risotto.name,
      description: risotto.description,
      style: risotto.style,
      status: risotto.status,
      tags: risotto.tags,
      origin: risotto.origin,
      history: risotto.history || null,
      rice_type: risotto.rice_type,
      broth: risotto.broth || null,
      cooking: risotto.cooking,
      main_ingredients: risotto.main_ingredients,
      proteins: risotto.proteins || [],
      vegetables: risotto.vegetables || [],
      aromatics: risotto.aromatics || [],
      finishing: risotto.finishing || null,
      serving: risotto.serving,
      dietary: risotto.dietary,
      pricing: risotto.pricing || null,
      availability: risotto.availability || null,
      customization: risotto.customization || null,
    }));

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/risotti`, {
        method: 'POST',
        headers: {
          'apikey': SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates',
        },
        body: JSON.stringify(risottiRecords),
      });

      if (response.ok) {
        console.log(`✅ Batch ${batchNumber}: Inserted ${batch.length} risotti`);
        batch.forEach(r => console.log(`   - ${r.name.en}`));
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
  console.log(`   Total: ${allRisotti.length}`);

  if (errorCount === 0) {
    console.log('\n🎉 All risotti seeded successfully!\n');
  } else {
    console.log('\n⚠️  Some risotti failed to seed. Check errors above.\n');
    process.exit(1);
  }
}

seedRisotti().catch(console.error);
