/**
 * GUDBRO Cocktail Sync Script
 *
 * Syncs a single cocktail from TypeScript to Supabase.
 * Used by agents after creating each cocktail file.
 *
 * Usage:
 *   npx tsx sync-cocktail-to-supabase.ts <cocktail-slug>
 *
 * Example:
 *   npx tsx sync-cocktail-to-supabase.ts negroni
 *
 * Environment:
 *   SUPABASE_URL - Supabase project URL
 *   SERVICE_ROLE_KEY - Supabase service role key (for admin operations)
 */

import { createClient } from '@supabase/supabase-js';
import type { Cocktail } from '../../types/cocktail';

// Get cocktail slug from command line
const slug = process.argv[2];

if (!slug) {
  console.error('Usage: npx tsx sync-cocktail-to-supabase.ts <cocktail-slug>');
  process.exit(1);
}

// Environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vnaonebbueezrvjekqxs.supabase.co';
const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('Error: SERVICE_ROLE_KEY environment variable is required');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

/**
 * Convert TypeScript Cocktail to Supabase row format
 */
function cocktailToSupabaseRow(cocktail: Cocktail) {
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
    computed_allergens: cocktail.computed.allergens,
    computed_intolerances: cocktail.computed.intolerances,
    computed_diets: cocktail.computed.suitable_for_diets,
    computed_spice_level: cocktail.computed.spice_level,
    diet_tags: cocktail.diet_tags,
    season_tags: cocktail.season_tags,
    occasion_tags: cocktail.occasion_tags,
    is_mocktail: cocktail.is_mocktail,
    is_signature: cocktail.is_signature,
    variants: cocktail.variants,
    notes_for_staff: cocktail.notes_for_staff || null,
    price_tier: cocktail.price_tier,
    popularity: cocktail.popularity || null,
    source_url: cocktail.source.primary,
    source_note: cocktail.source.note || null,
    created_at: cocktail.created_at,
    updated_at: cocktail.updated_at,
    version: cocktail.version,
  };
}

async function syncCocktail() {
  console.log(`\nSyncing cocktail: ${slug}`);
  console.log('─'.repeat(50));

  try {
    // Dynamically import the cocktail
    const cocktailModule = await import(`../iba-unforgettables/${slug}.ts`);

    // Get the default export or find the cocktail variable
    const cocktail: Cocktail =
      cocktailModule.default ||
      Object.values(cocktailModule).find((v) => typeof v === 'object' && v !== null && 'id' in v);

    if (!cocktail) {
      console.error(`Error: Could not find cocktail export in ${slug}.ts`);
      process.exit(1);
    }

    console.log(`Found: ${cocktail.name.en} (${cocktail.id})`);

    // Convert to Supabase format
    const row = cocktailToSupabaseRow(cocktail);

    // Upsert to Supabase
    const { data, error } = await supabase
      .from('cocktails')
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      process.exit(1);
    }

    console.log(`✅ Synced to Supabase: ${data.name.en}`);
    console.log(`   ID: ${data.id}`);
    console.log(`   Slug: ${data.slug}`);
    console.log(`   Category: ${data.iba_category}`);

    return data;
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

// Run
syncCocktail().then(() => {
  console.log('\n✅ Sync complete!\n');
  process.exit(0);
});
