/**
 * GUDBRO Wines Database - Supabase Seeding Script
 *
 * USAGE:
 * SERVICE_ROLE_KEY="your-key" npx tsx shared/database/wines/scripts/seed-wines-to-supabase.ts
 *
 * PREREQUISITE:
 * Run the schema first in Supabase SQL Editor:
 * shared/database/wines/schema/create-wines-table.sql
 */

import { createClient } from '@supabase/supabase-js';
import { allWines } from '../data';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vnaonebbueezrvjekqxs.supabase.co';
const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('ERROR: SERVICE_ROLE_KEY environment variable is required');
  console.log('Usage: SERVICE_ROLE_KEY="your-key" npx tsx seed-wines-to-supabase.ts');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

interface WineRow {
  id: string;
  slug: string;
  name: string;
  description: string;
  color: string;
  style: string;
  status: string;
  grape_varieties: string[];
  is_blend: boolean;
  vintage_type: string;
  origin_country: string;
  origin_country_code: string;
  origin_region: string;
  origin_subregion: string | null;
  origin_appellation: string | null;
  origin_classification: string | null;
  abv_min: number;
  abv_max: number;
  acidity: string;
  tannins: string | null;
  sweetness: string;
  body: string;
  oak: string | null;
  primary_flavors: string[];
  secondary_flavors: string[];
  tertiary_flavors: string[];
  aroma_profile: string[];
  finish: string;
  serving_temp_min_celsius: number;
  serving_temp_max_celsius: number;
  glass_type: string;
  decanting_minutes: number | null;
  aging_potential_min_years: number | null;
  aging_potential_max_years: number | null;
  food_categories: string[];
  specific_dishes: string[];
  cheese_pairings: string[];
  avoid_with: string[];
  is_vegan: boolean;
  is_organic: boolean;
  is_biodynamic: boolean;
  is_natural: boolean;
  is_low_sulfite: boolean;
  contains_sulfites: boolean;
  allergens: string[];
  calories_per_glass: number;
  ingredient_ids: string[];
  tags: string[];
  popularity: number;
  price_tier: string;
  production_method: string | null;
  aging_vessel: string | null;
  aging_months: number | null;
  annual_production_bottles: number | null;
}

function transformWineToRow(wine: typeof allWines[0]): WineRow {
  return {
    id: wine.id,
    slug: wine.slug,
    name: wine.name,
    description: wine.description,
    color: wine.color,
    style: wine.style,
    status: wine.status,
    grape_varieties: wine.grape_varieties,
    is_blend: wine.is_blend,
    vintage_type: wine.vintage_type,
    origin_country: wine.origin.country,
    origin_country_code: wine.origin.country_code,
    origin_region: wine.origin.region,
    origin_subregion: wine.origin.subregion || null,
    origin_appellation: wine.origin.appellation || null,
    origin_classification: wine.origin.classification || null,
    abv_min: wine.characteristics.abv_min,
    abv_max: wine.characteristics.abv_max,
    acidity: wine.characteristics.acidity,
    tannins: wine.characteristics.tannins || null,
    sweetness: wine.characteristics.sweetness,
    body: wine.characteristics.body,
    oak: wine.characteristics.oak || null,
    primary_flavors: wine.taste.primary_flavors,
    secondary_flavors: wine.taste.secondary_flavors || [],
    tertiary_flavors: wine.taste.tertiary_flavors || [],
    aroma_profile: wine.taste.aroma_profile,
    finish: wine.taste.finish,
    serving_temp_min_celsius: wine.serving.temperature_celsius.min,
    serving_temp_max_celsius: wine.serving.temperature_celsius.max,
    glass_type: wine.serving.glass_type,
    decanting_minutes: wine.serving.decanting_minutes || null,
    aging_potential_min_years: wine.serving.aging_potential_years?.min || null,
    aging_potential_max_years: wine.serving.aging_potential_years?.max || null,
    food_categories: wine.pairing.food_categories,
    specific_dishes: wine.pairing.specific_dishes,
    cheese_pairings: wine.pairing.cheese_pairings,
    avoid_with: wine.pairing.avoid_with || [],
    is_vegan: wine.dietary.is_vegan,
    is_organic: wine.dietary.is_organic,
    is_biodynamic: wine.dietary.is_biodynamic,
    is_natural: wine.dietary.is_natural,
    is_low_sulfite: wine.dietary.is_low_sulfite,
    contains_sulfites: wine.dietary.contains_sulfites,
    allergens: wine.dietary.allergens,
    calories_per_glass: wine.dietary.calories_per_glass,
    ingredient_ids: wine.ingredient_ids,
    tags: wine.tags,
    popularity: wine.popularity,
    price_tier: wine.price_tier,
    production_method: wine.production?.method || null,
    aging_vessel: wine.production?.aging_vessel || null,
    aging_months: wine.production?.aging_months || null,
    annual_production_bottles: wine.production?.annual_production_bottles || null,
  };
}

async function seedWines() {
  console.log(`\n🍷 GUDBRO Wines Seeding Script`);
  console.log(`================================`);
  console.log(`Total wines to seed: ${allWines.length}`);

  // Transform all wines
  const wineRows = allWines.map(transformWineToRow);

  // Insert in batches of 50
  const BATCH_SIZE = 50;
  let successCount = 0;
  let errorCount = 0;
  const errors: string[] = [];

  for (let i = 0; i < wineRows.length; i += BATCH_SIZE) {
    const batch = wineRows.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(wineRows.length / BATCH_SIZE);

    console.log(`\nBatch ${batchNum}/${totalBatches}: Inserting ${batch.length} wines...`);

    const { data, error } = await supabase
      .from('wines')
      .upsert(batch, { onConflict: 'id' });

    if (error) {
      console.error(`  ❌ Batch ${batchNum} failed: ${error.message}`);
      errors.push(`Batch ${batchNum}: ${error.message}`);
      errorCount += batch.length;
    } else {
      console.log(`  ✅ Batch ${batchNum} success`);
      successCount += batch.length;
    }
  }

  // Summary
  console.log(`\n================================`);
  console.log(`SEEDING COMPLETE`);
  console.log(`================================`);
  console.log(`✅ Success: ${successCount} wines`);
  console.log(`❌ Errors: ${errorCount} wines`);

  if (errors.length > 0) {
    console.log(`\nErrors:`);
    errors.forEach(e => console.log(`  - ${e}`));
  }

  // Verify count
  const { count } = await supabase
    .from('wines')
    .select('*', { count: 'exact', head: true });

  console.log(`\n📊 Total wines in database: ${count}`);
}

seedWines().catch(console.error);
