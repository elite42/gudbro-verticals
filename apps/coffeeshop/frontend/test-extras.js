/**
 * Quick test script to verify beverage extras are being assigned
 */

// Import the menu function
const { getROOTSMenuItemsSync } = require('./lib/roots-menu.ts');

// Get all menu items
const menuItems = getROOTSMenuItemsSync();

// Find Fresh Lime Juice
const limeJuice = menuItems.find(item => item.name === 'Fresh Lime Juice');

console.log('\n=== Fresh Lime Juice Test ===\n');
console.log('Product found:', !!limeJuice);

if (limeJuice) {
  console.log('Category:', limeJuice.category);
  console.log('Has availableExtras:', !!limeJuice.availableExtras);
  console.log('Has customizations:', !!limeJuice.customizations);

  if (limeJuice.availableExtras) {
    console.log('\nAvailable Extras:');
    limeJuice.availableExtras.forEach(extra => {
      console.log(`  - ${extra.name} (${extra.type}): ${extra.price}đ`);
    });
  }

  if (limeJuice.customizations) {
    console.log('\nCustomizations:', limeJuice.customizations);
  }

  if (!limeJuice.availableExtras && !limeJuice.customizations) {
    console.log('\n❌ NO EXTRAS OR CUSTOMIZATIONS FOUND!');
  }
}

// Count beverage products with extras
const beverageProducts = menuItems.filter(item => item.category === 'bevande');
const beveragesWithExtras = beverageProducts.filter(item => item.availableExtras || item.customizations);

console.log('\n=== Beverage Stats ===');
console.log(`Total bevande products: ${beverageProducts.length}`);
console.log(`Beverages with extras: ${beveragesWithExtras.length}`);
console.log(`\nBeverage products:`, beverageProducts.map(p => p.name));
