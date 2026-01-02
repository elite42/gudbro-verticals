/**
 * GUDBRO Soups Seeder to Supabase
 *
 * Seeds all soups to Supabase using the REST API
 * Run with: SERVICE_ROLE_KEY="your-key" npx tsx shared/database/soups/scripts/seed-to-supabase.ts
 */

import { allSoups } from '../data';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vnaonebbueezrvjekqxs.supabase.co';
const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('❌ SERVICE_ROLE_KEY environment variable is required');
  console.log('\nUsage: SERVICE_ROLE_KEY="your-key" npx tsx seed-to-supabase.ts');
  process.exit(1);
}

/**
 * Insert soups to Supabase in batches
 */
async function seedSoups() {
  console.log('\n🍲 GUDBRO Soups Seeder');
  console.log('='.repeat(50));
  console.log(`Total soups: ${allSoups.length}`);
  console.log(`Supabase URL: ${SUPABASE_URL}\n`);

  const BATCH_SIZE = 5;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < allSoups.length; i += BATCH_SIZE) {
    const batch = allSoups.slice(i, i + BATCH_SIZE);
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;

    // Transform soups for Supabase
    const soupRecords = batch.map(soup => ({
      id: soup.id,
      slug: soup.slug,
      stable_key: soup.stable_key || null,
      name: soup.name,
      description: soup.description,
      tagline: soup.tagline || null,
      status: soup.status,
      style: soup.style,
      tags: soup.tags,
      origin: soup.origin,
      history: soup.history || null,
      soup_type: soup.soup_type,
      broth: soup.broth || null,
      cooking: soup.cooking,
      main_ingredients: soup.main_ingredients,
      proteins: soup.proteins || null,
      vegetables: soup.vegetables || null,
      aromatics: soup.aromatics || null,
      garnish: soup.garnish || null,
      serving: soup.serving,
      dietary: soup.dietary,
      pricing: soup.pricing || null,
      availability: soup.availability || null,
      customization: soup.customization || null,
    }));

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/soups`, {
        method: 'POST',
        headers: {
          'apikey': SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates',
        },
        body: JSON.stringify(soupRecords),
      });

      if (response.ok) {
        console.log(`✅ Batch ${batchNumber}: Inserted ${batch.length} soups`);
        batch.forEach(s => console.log(`   - ${s.name.en}`));
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
  console.log(`   Total: ${allSoups.length}`);

  if (errorCount === 0) {
    console.log('\n🎉 All soups seeded successfully!\n');
  } else {
    console.log('\n⚠️  Some soups failed to seed. Check errors above.\n');
    process.exit(1);
  }
}

seedSoups().catch(console.error);
