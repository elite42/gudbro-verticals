/**
 * Seed ALL Cocktails to Supabase
 *
 * Inserts all cocktails (IBA + Famous) into the Supabase cocktails table.
 * Run with: SERVICE_ROLE_KEY=your_key npx tsx shared/database/cocktails/scripts/seed-all-cocktails.ts
 *
 * Required env vars:
 * - SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY or SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js';

// Use require for cocktail imports to avoid ESM/CJS issues
const { ibaUnforgettables } = require('../iba-unforgettables/index');
const { ibaContemporary } = require('../iba-contemporary/index');
const { ibaNewEra } = require('../iba-new-era/index');
const { famousCocktails } = require('../famous/index');

import type { Cocktail } from '../../types/cocktail';

// Load environment
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vnaonebbueezrvjekqxs.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('❌ Missing SERVICE_ROLE_KEY environment variable');
  console.log('Usage: SERVICE_ROLE_KEY=your_key npx tsx seed-all-cocktails.ts');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Combine all cocktails
const allCocktails: Cocktail[] = [
  ...(ibaUnforgettables || []),
  ...(ibaContemporary || []),
  ...(ibaNewEra || []),
  ...(famousCocktails || []),
];

console.log('🍸 Cocktail counts:');
console.log(`   - IBA Unforgettables: ${ibaUnforgettables?.length || 0}`);
console.log(`   - IBA Contemporary: ${ibaContemporary?.length || 0}`);
console.log(`   - IBA New Era: ${ibaNewEra?.length || 0}`);
console.log(`   - Famous: ${famousCocktails?.length || 0}`);
console.log(`   - TOTAL: ${allCocktails.length}`);

/**
 * Transform cocktail object to database row
 * Maps TypeScript types to PostgreSQL columns
 */
function cocktailToRow(cocktail: Cocktail) {
  if (!cocktail || !cocktail.id) {
    console.error('Invalid cocktail:', cocktail);
    return null;
  }

  return {
    id: cocktail.id,
    slug: cocktail.slug,
    stable_key: cocktail.stable_key,
    name: cocktail.name,
    status: cocktail.status,
    iba_category: cocktail.iba_category || null,
    tags: cocktail.tags || [],
    description: cocktail.description,
    history: cocktail.history || null,
    taste: cocktail.taste || null,
    recommendations: cocktail.recommendations || null,
    ingredients: cocktail.ingredients || [],
    method: cocktail.method,
    instructions: cocktail.instructions,
    glass: cocktail.glass,
    garnish: cocktail.garnish,
    ice: cocktail.ice,
    serving_style: cocktail.serving_style,
    base_spirits: cocktail.base_spirits || [],
    flavor_profile: cocktail.flavor_profile || [],
    abv_estimate: cocktail.abv_estimate,
    calories_estimate: cocktail.calories_estimate,
    difficulty: cocktail.difficulty,
    prep_time_seconds: cocktail.prep_time_seconds,
    // Map computed object to individual columns
    computed_allergens: cocktail.computed?.allergens || [],
    computed_intolerances: cocktail.computed?.intolerances || [],
    computed_diets: cocktail.computed?.suitable_for_diets || [],
    computed_spice_level: cocktail.computed?.spice_level || 0,
    diet_tags: cocktail.diet_tags || [],
    season_tags: cocktail.season_tags || [],
    occasion_tags: cocktail.occasion_tags || [],
    is_mocktail: cocktail.is_mocktail || false,
    is_signature: cocktail.is_signature || false,
    variants: Array.isArray(cocktail.variants)
      ? cocktail.variants.map(v => typeof v === 'string' ? v : v.name)
      : [],
    notes_for_staff: cocktail.notes_for_staff || null,
    price_tier: cocktail.price_tier,
    popularity: cocktail.popularity || null,
    // Map source object to individual columns
    source_url: cocktail.source?.primary || null,
    source_note: cocktail.source?.note || null,
    version: cocktail.version || 1,
  };
}

async function seedCocktails() {
  console.log('\n🍸 Seeding ALL cocktails to Supabase...\n');

  let successCount = 0;
  let errorCount = 0;
  const errors: { slug: string; error: string }[] = [];

  // Process in batches of 10 for stability
  const batchSize = 10;
  for (let i = 0; i < allCocktails.length; i += batchSize) {
    const batch = allCocktails.slice(i, i + batchSize);
    const rows = batch.map(cocktailToRow).filter(r => r !== null);

    if (rows.length === 0) continue;

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
        if (c) {
          errors.push({ slug: c.slug, error: error.message });
          errorCount++;
        }
      });
    } else {
      batch.forEach((c) => {
        if (c) {
          console.log(`  ✅ ${c.name?.en || c.slug}`);
          successCount++;
        }
      });
    }

    // Progress indicator every 50 cocktails
    if ((i + batchSize) % 50 === 0) {
      console.log(`\n📊 Progress: ${Math.min(i + batchSize, allCocktails.length)}/${allCocktails.length}\n`);
    }
  }

  console.log('\n' + '─'.repeat(50));
  console.log(`\n📊 Results:`);
  console.log(`  ✅ Success: ${successCount}`);
  console.log(`  ❌ Errors: ${errorCount}`);

  if (errors.length > 0) {
    console.log('\n❌ Failed cocktails:');
    errors.slice(0, 20).forEach((e) => console.log(`  - ${e.slug}: ${e.error}`));
    if (errors.length > 20) {
      console.log(`  ... and ${errors.length - 20} more`);
    }
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
