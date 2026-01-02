/**
 * GUDBRO Salads Seeder to Supabase
 *
 * Seeds all salads to Supabase using the REST API
 * Run with: SERVICE_ROLE_KEY="your-key" npx tsx shared/database/salads/scripts/seed-to-supabase.ts
 */

import { allSalads } from '../data';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vnaonebbueezrvjekqxs.supabase.co';
const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('❌ SERVICE_ROLE_KEY environment variable is required');
  console.log('\nUsage: SERVICE_ROLE_KEY="your-key" npx tsx seed-to-supabase.ts');
  process.exit(1);
}

/**
 * Insert salads to Supabase in batches
 */
async function seedSalads() {
  console.log('\n🥗 GUDBRO Salads Seeder');
  console.log('='.repeat(50));
  console.log(`Total salads: ${allSalads.length}`);
  console.log(`Supabase URL: ${SUPABASE_URL}\n`);

  const BATCH_SIZE = 5;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < allSalads.length; i += BATCH_SIZE) {
    const batch = allSalads.slice(i, i + BATCH_SIZE);
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;

    // Transform salads for Supabase
    const saladRecords = batch.map(salad => ({
      slug: salad.slug,
      stable_key: salad.stable_key,
      name: salad.name,
      description: salad.description,
      tagline: salad.tagline || null,
      status: salad.status,
      style: salad.style,
      tags: salad.tags,
      origin: salad.origin,
      history: salad.history || null,
      base: salad.base,
      default_protein: salad.default_protein || null,
      protein_options: salad.protein_options || [],
      default_dressing: salad.default_dressing || null,
      dressing_options: salad.dressing_options || [],
      dressing_on_side: salad.dressing_on_side ?? false,
      ingredients: salad.ingredients,
      toppings: salad.toppings || [],
      serving: salad.serving,
      flavor: salad.flavor,
      dietary: salad.dietary,
      customization: salad.customization || {},
      variations: salad.variations || [],
      popularity: salad.popularity,
      recommended_for: salad.recommended_for || [],
      pairings: salad.pairings || {},
      related_salads: salad.related_salads || [],
      media: salad.media || null,
      source_url: salad.source_url || null,
      source_note: salad.source_note || null,
      version: salad.version,
    }));

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/salads`, {
        method: 'POST',
        headers: {
          'apikey': SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates', // Upsert on conflict
        },
        body: JSON.stringify(saladRecords),
      });

      if (response.ok) {
        console.log(`✅ Batch ${batchNumber}: Inserted ${batch.length} salads`);
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

    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Seeding Summary:');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   Total: ${allSalads.length}`);

  if (errorCount === 0) {
    console.log('\n🎉 All salads seeded successfully!\n');
  } else {
    console.log('\n⚠️  Some salads failed to seed. Check errors above.\n');
    process.exit(1);
  }
}

// Run the seeder
seedSalads().catch(console.error);
