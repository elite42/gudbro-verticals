/**
 * Seed Cocktails to Supabase
 *
 * Inserts all IBA Unforgettables cocktails into the Supabase cocktails table.
 * Run with: npx tsx shared/database/cocktails/scripts/seed-cocktails-to-supabase.ts
 *
 * Required env vars:
 * - SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY or SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js';
import { ibaUnforgettables } from '../iba-unforgettables';
import type { Cocktail } from '../../types/cocktail';

// Load environment
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vnaonebbueezrvjekqxs.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('❌ Missing SERVICE_ROLE_KEY environment variable');
  console.log('Usage: SERVICE_ROLE_KEY=your_key npx tsx seed-cocktails-to-supabase.ts');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

/**
 * Transform cocktail object to database row
 */
function cocktailToRow(cocktail: Cocktail) {
  return {
    id: cocktail.id,
    slug: cocktail.slug,
    stable_key: cocktail.stable_key,
    name: cocktail.name,
    status: cocktail.status,
    iba_category: cocktail.iba_category || null,
    tags: cocktail.tags,
    description: cocktail.description,
    history: cocktail.history || null,
    taste: cocktail.taste || null,
    recommendations: cocktail.recommendations || null,
    ingredients: cocktail.ingredients,
    method: cocktail.method,
    instructions: cocktail.instructions,
    glass: cocktail.glass,
    garnish: cocktail.garnish,
    ice: cocktail.ice,
    serving_style: cocktail.serving_style,
    base_spirits: cocktail.base_spirits,
    flavor_profile: cocktail.flavor_profile,
    abv_estimate: cocktail.abv_estimate,
    calories_estimate: cocktail.calories_estimate,
    difficulty: cocktail.difficulty,
    prep_time_seconds: cocktail.prep_time_seconds,
    computed: cocktail.computed,
    diet_tags: cocktail.diet_tags,
    season_tags: cocktail.season_tags,
    occasion_tags: cocktail.occasion_tags,
    is_mocktail: cocktail.is_mocktail,
    is_signature: cocktail.is_signature,
    variants: cocktail.variants,
    notes_for_staff: cocktail.notes_for_staff || null,
    price_tier: cocktail.price_tier,
    popularity: cocktail.popularity || null,
    source: cocktail.source,
    version: cocktail.version,
  };
}

async function seedCocktails() {
  console.log('🍸 Seeding cocktails to Supabase...\n');
  console.log(`📦 Total cocktails to insert: ${ibaUnforgettables.length}\n`);

  let successCount = 0;
  let errorCount = 0;
  const errors: { slug: string; error: string }[] = [];

  // Process in batches of 5 for stability
  const batchSize = 5;
  for (let i = 0; i < ibaUnforgettables.length; i += batchSize) {
    const batch = ibaUnforgettables.slice(i, i + batchSize);
    const rows = batch.map(cocktailToRow);

    const { data, error } = await supabase
      .from('cocktails')
      .upsert(rows, {
        onConflict: 'slug',
        ignoreDuplicates: false,
      })
      .select('slug');

    if (error) {
      console.error(`❌ Batch error (${i + 1}-${i + batch.length}):`, error.message);
      batch.forEach((c) => {
        errors.push({ slug: c.slug, error: error.message });
        errorCount++;
      });
    } else {
      batch.forEach((c) => {
        console.log(`  ✅ ${c.name.en}`);
        successCount++;
      });
    }
  }

  console.log('\n' + '─'.repeat(50));
  console.log(`\n📊 Results:`);
  console.log(`  ✅ Success: ${successCount}`);
  console.log(`  ❌ Errors: ${errorCount}`);

  if (errors.length > 0) {
    console.log('\n❌ Failed cocktails:');
    errors.forEach((e) => console.log(`  - ${e.slug}: ${e.error}`));
  }

  // Verify count
  const { count } = await supabase
    .from('cocktails')
    .select('*', { count: 'exact', head: true });

  console.log(`\n🗃️ Total cocktails in database: ${count}`);
  console.log('\n✨ Done!');
}

seedCocktails().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
