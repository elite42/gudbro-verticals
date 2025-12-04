const fs = require('fs');
const products = require('../data/coffee-house-products.json');

// Mapping delle categorie
const categoryMapping = {
  'espresso': (p) => {
    // Determina se è hot o iced basandosi sul nome/tag
    const isIced = p.name.en.toLowerCase().includes('iced') ||
                   p.tags.includes('iced') ||
                   p.name.en.toLowerCase().includes('tonic') ||
                   p.name.en.toLowerCase().includes('affogato');
    return isIced ? 'iced-coffee' : 'hot-coffee';
  },
  'signature-coffee': (p) => {
    const isIced = p.name.en.toLowerCase().includes('iced') ||
                   p.tags.includes('iced') ||
                   p.name.en.toLowerCase().includes('glace');
    return isIced ? 'iced-coffee' : 'hot-coffee';
  },
  'matcha': () => 'matcha',
  'tea': () => 'tea',
  'smoothie': () => 'smoothie',
  'milkshake': () => 'milkshake'
};

// Subcategory mapping
const subcategoryMapping = {
  'espresso': (p) => {
    const name = p.name.en.toLowerCase();
    const isEspressoBased = ['espresso', 'americano', 'macchiato', 'ristretto', 'lungo'].some(k => name.includes(k));
    const isMilkBased = ['latte', 'cappuccino', 'flat white', 'mocha', 'cortado'].some(k => name.includes(k));

    if (isEspressoBased && !isMilkBased) {
      return 'espresso-based';
    }
    if (isMilkBased) {
      return 'milk-based';
    }
    return 'signature';
  },
  'signature-coffee': () => 'signature',
  'matcha': (p) => {
    const name = p.name.en.toLowerCase();
    if (name.includes('latte')) return 'latte-grade';
    if (name.includes('ceremonial') || name.includes('pure')) return 'ceremonial';
    return 'matcha-signature';
  },
  'tea': (p) => {
    const name = p.name.en.toLowerCase();
    if (name.includes('chai')) return 'chai';
    if (name.includes('green')) return 'green-tea';
    if (name.includes('herbal') || name.includes('chamomile') || name.includes('mint')) return 'herbal-tisane';
    return 'black-tea';
  },
  'smoothie': (p) => {
    const name = p.name.en.toLowerCase();
    if (name.includes('green') || name.includes('detox')) return 'green-detox';
    if (name.includes('protein')) return 'protein';
    return 'fruit';
  },
  'milkshake': (p) => {
    const name = p.name.en.toLowerCase();
    if (['nutella', 'oreo', 'kinder', 'snickers', 'bounty'].some(k => name.includes(k))) return 'gourmet';
    return 'classic';
  }
};

// Temperature mapping
const getTemperature = (p, newCategory) => {
  const name = p.name.en.toLowerCase();
  const isIced = name.includes('iced') ||
                 p.tags.includes('iced') ||
                 name.includes('cold') ||
                 name.includes('tonic') ||
                 name.includes('glace') ||
                 name.includes('frozen');

  if (newCategory === 'smoothie' || newCategory === 'milkshake') return 'iced';
  if (newCategory === 'iced-coffee') return 'iced';
  if (newCategory === 'hot-coffee') return 'hot';
  if (isIced) return 'iced';
  return 'hot';
};

// Update products
const updatedProducts = products.map(p => {
  const oldCategory = p.category;
  const mappingFn = categoryMapping[oldCategory];
  const newCategory = mappingFn ? mappingFn(p) : oldCategory;

  const subcatFn = subcategoryMapping[oldCategory];
  const subcategory = subcatFn ? subcatFn(p) : null;

  const temperature = getTemperature(p, newCategory);

  return {
    ...p,
    category: newCategory,
    subcategory: subcategory,
    temperature: temperature,
    legacyCategory: oldCategory // Keep original for reference
  };
});

// Write updated file
fs.writeFileSync(
  __dirname + '/../data/coffee-house-products.json',
  JSON.stringify(updatedProducts, null, 2)
);

// Summary
const byCategory = {};
const bySubcategory = {};
const byTemperature = { hot: 0, iced: 0 };

updatedProducts.forEach(p => {
  byCategory[p.category] = (byCategory[p.category] || 0) + 1;
  if (p.subcategory) {
    bySubcategory[p.subcategory] = (bySubcategory[p.subcategory] || 0) + 1;
  }
  byTemperature[p.temperature]++;
});

console.log('Updated', updatedProducts.length, 'products');
console.log('\nBy category:', JSON.stringify(byCategory, null, 2));
console.log('\nBy subcategory:', JSON.stringify(bySubcategory, null, 2));
console.log('\nBy temperature:', JSON.stringify(byTemperature, null, 2));
