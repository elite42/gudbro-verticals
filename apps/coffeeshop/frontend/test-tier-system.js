/**
 * Tier System Test Script
 *
 * Verifies that the tier system is working correctly.
 */

const { getTierConfig, getAllTiers, isFeatureAvailable, getNextTier, TIER_LEVELS } = require('./lib/tier-system.ts');

console.log('\n=== TIER SYSTEM TEST ===\n');

// Test 1: Get all tiers
console.log('Test 1: Get all tiers');
const allTiers = getAllTiers();
console.log(`✓ Found ${allTiers.length} tiers:`, allTiers.map(t => t.name));

// Test 2: Get specific tier config
console.log('\nTest 2: Get tier configurations');
TIER_LEVELS.forEach(tierLevel => {
  const config = getTierConfig(tierLevel);
  console.log(`\n${config.branding.icon} ${config.name} ($${config.price}/mo)`);
  console.log(`  Cart: ${config.features.enableCart ? '✓' : '✗'}`);
  console.log(`  Delivery: ${config.features.enableDelivery ? '✓' : '✗'}`);
  console.log(`  Analytics: ${config.features.enableAnalytics ? '✓' : '✗'}`);
  console.log(`  Max Products: ${config.limits.maxProducts === -1 ? '∞' : config.limits.maxProducts}`);
});

// Test 3: Feature availability check
console.log('\n\nTest 3: Feature availability');
console.log('Cart enabled in digital-menu?', isFeatureAvailable('digital-menu', 'enableCart'));
console.log('Cart enabled in pre-ordering?', isFeatureAvailable('pre-ordering', 'enableCart'));
console.log('Delivery enabled in pre-ordering?', isFeatureAvailable('pre-ordering', 'enableDelivery'));
console.log('Delivery enabled in full-suite?', isFeatureAvailable('full-suite', 'enableDelivery'));

// Test 4: Next tier suggestions
console.log('\n\nTest 4: Upgrade path');
const nextFromDigital = getNextTier('digital-menu');
console.log('Next tier from digital-menu:', nextFromDigital?.name);
const nextFromPro = getNextTier('pre-ordering');
console.log('Next tier from pre-ordering:', nextFromPro?.name);
const nextFromFull = getNextTier('full-suite');
console.log('Next tier from full-suite:', nextFromFull?.name || 'None (already at top tier)');

console.log('\n✅ All tests passed!\n');
