const fs = require('fs');
const products = require('../data/coffee-house-products.json');

// Mapping prodotti -> ricette
// Alcuni prodotti corrispondono esattamente, altri usano ricette base simili
const recipeMapping = {
  // Espresso-based (hot-coffee)
  'espresso-single': 'espresso-single',
  'espresso-double': 'espresso-double',
  'americano-hot': 'americano-hot',
  'macchiato': 'espresso-single', // Base espresso

  // Milk-based (hot-coffee)
  'latte-hot': 'latte-hot',
  'cappuccino': 'cappuccino',
  'flat-white': 'flat-white',
  'caf-mocha': 'mocha',
  'caramel-latte': 'latte-hot', // Variante del latte
  'spanish-latte-hot': 'latte-hot', // Variante del latte con condensed milk
  'tiramisu-cappuccino': 'cappuccino', // Variante cappuccino
  'cream-cheese-latte': 'latte-hot', // Variante latte
  'white-mocha': 'mocha', // Variante mocha

  // Signature hot
  'raf-coffee-classic': 'latte-hot', // Base latte
  'oreo-coffee': 'mocha', // Chocolate-based
  'bounty-coffee': 'mocha', // Chocolate coconut
  'snickers-coffee': 'mocha', // Chocolate peanut
  'fantasy-coffee': 'latte-hot', // Signature
  'dolce-gusto-coffee': 'latte-hot', // Signature
  'black-star': 'mocha', // Dark signature
  'cookie-coffee': 'latte-hot', // Cookie-based
  'kinder-white-cream': 'mocha', // Chocolate-based
  'marocchino': 'marocchino', // Italian specialty
  'bicerin': 'bicerin', // Turin specialty

  // Iced coffee
  'iced-latte': 'iced-latte',
  'espresso-tonic': 'espresso-tonic',
  'affogato': 'espresso-single', // Espresso over ice cream
  'nutella-coffee-iced': 'iced-latte', // Iced with nutella
  'kinder-coffee-iced': 'iced-latte', // Iced with kinder
  'white-mocha-glace': 'iced-latte', // White mocha iced
  'coffee-glace': 'caffe-shakerato', // Italian iced
  'iced-creamy-coffee': 'iced-latte', // Creamy iced
  'iced-nutella-coffee': 'iced-latte', // Nutella iced
  'dolce-glace': 'iced-latte', // Sweet iced
  'iced-white-mocha-coffee': 'iced-latte', // White mocha
  'iced-black-star-coffee': 'iced-latte', // Dark iced

  // Matcha
  'matcha-latte-hot': 'matcha-latte-hot',
  'iced-matcha-latte': 'matcha-latte-hot', // Variante iced
  'salted-caramel-matcha-latte': 'matcha-latte-hot',
  'cream-cheese-matcha-latte-aroma': 'matcha-latte-hot',
  'sky-matcha': 'matcha-latte-hot',
  'matcha-raspberry-iced': 'matcha-latte-hot',
  'matcha-strawberry-hot': 'matcha-latte-hot',
  'salted-caramel-matcha-iced': 'matcha-latte-hot',
  'matcha-latte-with-coconut-milk': 'matcha-latte-hot',
  'creamy-vanilla-matcha-iced': 'matcha-latte-hot',

  // Tea
  'blue-moon-tea': 'chai-latte', // Tea base
  'strawberry-carcade-tea': 'chai-latte',
  'raspberry-tea': 'chai-latte',
  'herbal-tea-house-blend': 'chai-latte',
  'green-tea-classic': 'chai-latte',
  'kiwi-lime-tea': 'chai-latte',
  'winter-punch-tea': 'chai-latte',
  'pomegranate-tea': 'chai-latte',
  'hibiscus-strawberry-tea': 'chai-latte',
  'immuno-tea': 'chai-latte',
  'ice-tea-mix': 'chai-latte',
  'ice-tea-raspberry': 'chai-latte',
  'ice-tea-peach': 'chai-latte',
  'herbal-lemon-mint-tea': 'chai-latte',
  'strawberry-hibiscus-cold-brew': 'cold-brew-classic',

  // Smoothie
  'banana-smoothie': 'strawberry-mango-smoothie',
  'strawberry-smoothie': 'strawberry-mango-smoothie',
  'banana-kiwi-smoothie': 'green-detox-smoothie',
  'orange-grapefruit-smoothie': 'strawberry-mango-smoothie',
  'lemon-smoothie': 'green-detox-smoothie',
  'lime-smoothie': 'green-detox-smoothie',
  'apple-smoothie': 'green-detox-smoothie',
  'mango-smoothie': 'strawberry-mango-smoothie',
  'avocado-smoothie': 'green-detox-smoothie',
  'berry-mix-smoothie': 'strawberry-mango-smoothie',

  // Milkshake
  'oreo-shake': 'nutella-milkshake', // Gourmet
  'cookies-shake': 'classic-vanilla-milkshake',
  'nutella-frappuccino': 'nutella-milkshake',
  'caramel-frappuccino': 'mocha-frappuccino',
  'berry-charge': 'classic-vanilla-milkshake',
  'coffee-frappuccino': 'mocha-frappuccino',
  'vanilla-shake': 'classic-vanilla-milkshake',
  'chocolate-shake': 'nutella-milkshake',
  'banana-shake': 'classic-vanilla-milkshake',
  'salted-caramel-shake': 'classic-vanilla-milkshake',
  'strawberry-shake': 'classic-vanilla-milkshake',
  'peanut-butter-shake': 'nutella-milkshake',
};

// Update products with recipeId
const updatedProducts = products.map(p => {
  const recipeId = recipeMapping[p.id];
  if (recipeId) {
    return {
      ...p,
      recipeId: recipeId
    };
  }
  return p;
});

// Write updated file
fs.writeFileSync(
  __dirname + '/../data/coffee-house-products.json',
  JSON.stringify(updatedProducts, null, 2)
);

// Summary
const withRecipe = updatedProducts.filter(p => p.recipeId).length;
const withoutRecipe = updatedProducts.filter(p => !p.recipeId).length;

console.log('Updated', updatedProducts.length, 'products');
console.log('With recipe:', withRecipe);
console.log('Without recipe:', withoutRecipe);

if (withoutRecipe > 0) {
  console.log('\nProducts without recipes:');
  updatedProducts.filter(p => !p.recipeId).forEach(p => {
    console.log('- ' + p.id);
  });
}
