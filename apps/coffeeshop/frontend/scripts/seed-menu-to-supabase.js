#!/usr/bin/env node

/**
 * Seed Menu Items to Supabase
 *
 * This script reads the local coffee-house-products.json file
 * and uploads all products to the Supabase menu_items table.
 *
 * Prerequisites:
 *   - SUPABASE_URL and SERVICE_ROLE_KEY environment variables
 *   - menu_items table created in Supabase (see schema/001-menu-management.sql)
 *
 * To get the SERVICE_ROLE_KEY:
 *   1. Go to Supabase Dashboard: https://app.supabase.com
 *   2. Select your project
 *   3. Go to Settings > API
 *   4. Copy the "service_role" key (NOT the anon key!)
 *
 * Usage:
 *   SERVICE_ROLE_KEY=your-service-role-key node scripts/seed-menu-to-supabase.js
 *
 * Alternative: Run seed-menu-items.sql directly in Supabase SQL Editor
 */

const fs = require('fs');
const path = require('path');

// Load environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  console.error('Error: SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL not set');
  process.exit(1);
}

if (!SERVICE_ROLE_KEY) {
  console.error('Error: SERVICE_ROLE_KEY or SUPABASE_SERVICE_ROLE_KEY not set');
  console.error('Note: You need the service_role key (not anon key) to insert data');
  process.exit(1);
}

// Load products from JSON
const productsPath = path.join(__dirname, '../data/coffee-house-products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

console.log(`Loaded ${products.length} products from JSON`);

// Merchant slug (must exist in merchants table)
const MERCHANT_SLUG = 'roots-danang';

/**
 * Convert JSON product to Supabase menu_item format
 */
function transformProduct(product, merchantId, categoryId) {
  // Convert allergens array to JSONB flags object
  const allergensObj = {};
  if (product.allergens && Array.isArray(product.allergens)) {
    product.allergens.forEach(a => { allergensObj[a] = true; });
  }

  // Convert intolerances array to JSONB flags object
  const intolerancesObj = {};
  if (product.intolerances && Array.isArray(product.intolerances)) {
    product.intolerances.forEach(i => { intolerancesObj[i] = true; });
  }

  // Convert dietary array to JSONB flags object
  const dietaryObj = {};
  if (product.dietary && Array.isArray(product.dietary)) {
    product.dietary.forEach(d => { dietaryObj[d] = true; });
  }

  // Build nutrition info JSONB
  const nutritionInfo = {};
  if (product.calories) nutritionInfo.calories = product.calories;
  if (product.protein_g) nutritionInfo.protein = product.protein_g;
  if (product.carbs_g) nutritionInfo.carbohydrates = product.carbs_g;
  if (product.fat_g) nutritionInfo.fat = product.fat_g;

  return {
    merchant_id: merchantId,
    category_id: categoryId,
    slug: product.id,
    name_multilang: product.name, // Already in {en, vi, it} format
    description_multilang: product.description,
    price: product.price,
    currency: 'VND',
    image_url: product.image,
    allergens: allergensObj,
    intolerances: intolerancesObj,
    dietary_flags: dietaryObj,
    spice_level: 0,
    calories: product.calories || null,
    nutrition_info: Object.keys(nutritionInfo).length > 0 ? nutritionInfo : null,
    is_available: product.isVisible !== false,
    is_active: product.isVisible !== false,
    is_featured: product.isFeatured || false,
    is_new: product.isNew || false,
    display_order: product.sortOrder || 0,
    tags: product.tags || [],
    // Extended fields
    temperature: product.temperature,
    subcategory: product.subcategory,
  };
}

/**
 * Make authenticated API request to Supabase
 */
async function supabaseRequest(endpoint, method = 'GET', body = null) {
  const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
  const options = {
    method,
    headers: {
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': method === 'POST' ? 'return=representation' : 'return=minimal',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Supabase request failed: ${response.status} ${error}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

/**
 * Main seeding function
 */
async function seedMenu() {
  console.log('\n=== Starting Menu Seed ===\n');

  // Step 1: Get or create merchant
  console.log('1. Looking up merchant...');
  let merchants = await supabaseRequest(`merchants?slug=eq.${MERCHANT_SLUG}&select=id`);

  let merchantId;
  if (merchants && merchants.length > 0) {
    merchantId = merchants[0].id;
    console.log(`   Found existing merchant: ${merchantId}`);
  } else {
    console.log('   Creating new merchant...');
    const newMerchant = await supabaseRequest('merchants', 'POST', {
      slug: MERCHANT_SLUG,
      name: 'ROOTS Plant-Based Cafe',
      description: 'Clean food opportunity for everyone. Modern plant-based dining.',
      email: 'info@rootscafe.vn',
      city: 'Da Nang',
      country: 'VN',
      currency: 'VND',
      default_language: 'en',
      supported_languages: ['en', 'vi', 'it'],
      tier: 'pre_ordering',
      wifi_enabled: true,
      wifi_ssid: 'ROOTS_Guest',
      is_active: true,
    });
    merchantId = newMerchant[0].id;
    console.log(`   Created new merchant: ${merchantId}`);
  }

  // Step 2: Get unique categories from products
  const uniqueCategories = [...new Set(products.map(p => p.category))];
  console.log(`\n2. Processing ${uniqueCategories.length} categories...`);

  // Category display info
  const categoryInfo = {
    'hot-coffee': { name: { en: 'Hot Coffee', vi: 'Ca phe nong', it: 'Caffe Caldo' }, icon: '☕', order: 1 },
    'iced-coffee': { name: { en: 'Iced Coffee', vi: 'Ca phe da', it: 'Caffe Freddo' }, icon: '🧊', order: 2 },
    'matcha': { name: { en: 'Matcha', vi: 'Matcha', it: 'Matcha' }, icon: '🍵', order: 3 },
    'tea': { name: { en: 'Tea', vi: 'Tra', it: 'Te' }, icon: '🫖', order: 4 },
    'smoothie': { name: { en: 'Smoothies', vi: 'Sinh to', it: 'Frullati' }, icon: '🥤', order: 5 },
    'milkshake': { name: { en: 'Milkshakes', vi: 'Sua lac', it: 'Frullati' }, icon: '🥛', order: 6 },
  };

  // Create/get categories and build mapping
  const categoryMap = {};

  for (const catSlug of uniqueCategories) {
    const info = categoryInfo[catSlug] || {
      name: { en: catSlug, vi: catSlug, it: catSlug },
      icon: '📦',
      order: 99
    };

    // Check if category exists
    let existing = await supabaseRequest(
      `menu_categories?merchant_id=eq.${merchantId}&slug=eq.${catSlug}&select=id`
    );

    if (existing && existing.length > 0) {
      categoryMap[catSlug] = existing[0].id;
      console.log(`   Found category: ${catSlug} -> ${existing[0].id}`);
    } else {
      const newCat = await supabaseRequest('menu_categories', 'POST', {
        merchant_id: merchantId,
        slug: catSlug,
        name_multilang: info.name,
        icon: info.icon,
        display_order: info.order,
        is_active: true,
      });
      categoryMap[catSlug] = newCat[0].id;
      console.log(`   Created category: ${catSlug} -> ${newCat[0].id}`);
    }
  }

  // Step 3: Insert menu items
  console.log(`\n3. Inserting ${products.length} menu items...`);

  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  for (const product of products) {
    const categoryId = categoryMap[product.category];

    try {
      // Check if product already exists
      const existing = await supabaseRequest(
        `menu_items?merchant_id=eq.${merchantId}&slug=eq.${product.id}&select=id`
      );

      if (existing && existing.length > 0) {
        skipped++;
        continue;
      }

      // Transform and insert
      const menuItem = transformProduct(product, merchantId, categoryId);
      await supabaseRequest('menu_items', 'POST', menuItem);
      inserted++;

      if (inserted % 10 === 0) {
        console.log(`   Progress: ${inserted} inserted, ${skipped} skipped`);
      }
    } catch (err) {
      console.error(`   Error inserting ${product.id}: ${err.message}`);
      errors++;
    }
  }

  console.log('\n=== Seed Complete ===');
  console.log(`Inserted: ${inserted}`);
  console.log(`Skipped (already exist): ${skipped}`);
  console.log(`Errors: ${errors}`);
  console.log(`Total: ${products.length}`);
}

// Run
seedMenu().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
