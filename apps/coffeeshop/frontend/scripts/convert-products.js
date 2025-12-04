const fs = require('fs');
const data = require('/Users/gianfrancodagostino/Desktop/Coffee_House_Recipes_Serving.json');

// Nutrition database per 100g/100ml (approximated)
const nutritionDB = {
  'espresso': { cal: 2, prot: 0.1, carbs: 0.3, fat: 0 },
  'milk': { cal: 42, prot: 3.4, carbs: 5, fat: 1 },
  'steamed milk': { cal: 42, prot: 3.4, carbs: 5, fat: 1 },
  'cream': { cal: 340, prot: 2, carbs: 3, fat: 36 },
  'whipped cream': { cal: 250, prot: 2.5, carbs: 12, fat: 22 },
  'ice cream': { cal: 207, prot: 3.5, carbs: 24, fat: 11 },
  'vanilla ice cream': { cal: 207, prot: 3.5, carbs: 24, fat: 11 },
  'chocolate ice cream': { cal: 216, prot: 3.8, carbs: 28, fat: 11 },
  'condensed milk': { cal: 321, prot: 8, carbs: 54, fat: 9 },
  'sugar': { cal: 387, prot: 0, carbs: 100, fat: 0 },
  'honey': { cal: 304, prot: 0.3, carbs: 82, fat: 0 },
  'chocolate syrup': { cal: 279, prot: 2, carbs: 65, fat: 1 },
  'caramel syrup': { cal: 260, prot: 0, carbs: 65, fat: 0 },
  'vanilla syrup': { cal: 260, prot: 0, carbs: 65, fat: 0 },
  'white chocolate': { cal: 539, prot: 6, carbs: 59, fat: 32 },
  'nutella': { cal: 539, prot: 6, carbs: 58, fat: 31 },
  'cocoa': { cal: 228, prot: 20, carbs: 58, fat: 14 },
  'matcha': { cal: 324, prot: 30, carbs: 39, fat: 5 },
  'banana': { cal: 89, prot: 1.1, carbs: 23, fat: 0.3 },
  'strawberry': { cal: 32, prot: 0.7, carbs: 8, fat: 0.3 },
  'strawberries': { cal: 32, prot: 0.7, carbs: 8, fat: 0.3 },
  'mango': { cal: 60, prot: 0.8, carbs: 15, fat: 0.4 },
  'yogurt': { cal: 59, prot: 10, carbs: 4, fat: 0.7 },
  'peanut butter': { cal: 588, prot: 25, carbs: 20, fat: 50 },
  'oreo': { cal: 480, prot: 4, carbs: 70, fat: 21 },
  'cookie': { cal: 480, prot: 5, carbs: 65, fat: 23 },
  'mascarpone': { cal: 429, prot: 5, carbs: 4, fat: 44 },
  'cream cheese': { cal: 342, prot: 6, carbs: 4, fat: 34 },
  'coconut': { cal: 354, prot: 3, carbs: 15, fat: 33 },
  'tea': { cal: 1, prot: 0, carbs: 0.3, fat: 0 },
  'tonic': { cal: 34, prot: 0, carbs: 9, fat: 0 },
  'juice': { cal: 45, prot: 0.5, carbs: 10, fat: 0.2 },
  'berries': { cal: 57, prot: 0.7, carbs: 14, fat: 0.3 },
  'avocado': { cal: 160, prot: 2, carbs: 9, fat: 15 },
  'kiwi': { cal: 61, prot: 1.1, carbs: 15, fat: 0.5 },
  'apple': { cal: 52, prot: 0.3, carbs: 14, fat: 0.2 },
  'lemon': { cal: 29, prot: 1.1, carbs: 9, fat: 0.3 },
  'lime': { cal: 30, prot: 0.7, carbs: 11, fat: 0.2 },
  'orange': { cal: 47, prot: 0.9, carbs: 12, fat: 0.1 },
  'grapefruit': { cal: 42, prot: 0.8, carbs: 11, fat: 0.1 },
  'water': { cal: 0, prot: 0, carbs: 0, fat: 0 },
  'ice': { cal: 0, prot: 0, carbs: 0, fat: 0 },
  'syrup': { cal: 260, prot: 0, carbs: 65, fat: 0 }
};

// Allergen mapping based on ingredients
const allergenMap = {
  'milk': ['milk'],
  'cream': ['milk'],
  'whipped cream': ['milk'],
  'ice cream': ['milk', 'eggs'],
  'condensed milk': ['milk'],
  'yogurt': ['milk'],
  'mascarpone': ['milk'],
  'cream cheese': ['milk'],
  'nutella': ['milk', 'nuts'],
  'peanut butter': ['peanuts'],
  'oreo': ['gluten', 'soy'],
  'cookie': ['gluten', 'eggs'],
  'chocolate': ['milk', 'soy'],
  'white chocolate': ['milk', 'soy'],
  'kinder': ['milk', 'gluten'],
  'coconut': ['coconut']
};

// Category mapping
const categoryMap = {
  'Espresso-Based': 'espresso',
  'Coffee Mix': 'signature-coffee',
  'Matcha': 'matcha',
  'Tea': 'tea',
  'Smoothie': 'smoothie',
  'Milkshake': 'milkshake'
};

// Parse quantity string to extract amounts
function parseQuantity(qtyStr) {
  const items = [];
  if (!qtyStr) return items;

  // Split by comma
  const parts = qtyStr.split(',').map(p => p.trim());

  for (const part of parts) {
    // Match patterns like "60 ml espresso", "25 g Nutella", "1 banana"
    const match = part.match(/(\d+(?:\.\d+)?)\s*(g|ml|scoop|bar|slices?|pieces?)?\s*(.+)/i);
    if (match) {
      let amount = parseFloat(match[1]);
      const unit = (match[2] || '').toLowerCase();
      const ingredient = match[3].toLowerCase().trim();

      // Convert to grams/ml for calculation
      if (unit === 'scoop') amount = amount * 80; // 80g per scoop
      else if (unit === 'bar') amount = amount * 21; // Kinder bar ~21g
      else if (unit.includes('slice')) amount = amount * 30;

      items.push({ amount, ingredient });
    }
  }
  return items;
}

// Estimate nutrition from ingredients
function estimateNutrition(qtyStr, ingredients) {
  let calories = 0, protein = 0, carbs = 0, fat = 0;

  const items = parseQuantity(qtyStr);

  for (const item of items) {
    // Find matching nutrition data
    let nutr = null;
    for (const [key, val] of Object.entries(nutritionDB)) {
      if (item.ingredient.includes(key)) {
        nutr = val;
        break;
      }
    }

    if (nutr) {
      const factor = item.amount / 100;
      calories += nutr.cal * factor;
      protein += nutr.prot * factor;
      carbs += nutr.carbs * factor;
      fat += nutr.fat * factor;
    }
  }

  // If nothing matched, estimate based on category and price
  if (calories === 0) {
    calories = 150; // Default
    protein = 3;
    carbs = 20;
    fat = 5;
  }

  return {
    calories: Math.round(calories),
    protein_g: Math.round(protein * 10) / 10,
    carbs_g: Math.round(carbs * 10) / 10,
    fat_g: Math.round(fat * 10) / 10
  };
}

// Extract allergens from ingredients
function extractAllergens(ingredients, qtyStr) {
  const allergens = new Set();
  const combined = (ingredients + ' ' + qtyStr).toLowerCase();

  for (const [ingredient, allergList] of Object.entries(allergenMap)) {
    if (combined.includes(ingredient)) {
      allergList.forEach(a => allergens.add(a));
    }
  }

  // Check for caffeine (intolerance)
  const hasCaffeine = combined.includes('espresso') ||
                      combined.includes('coffee') ||
                      combined.includes('matcha') ||
                      (combined.includes('tea') && !combined.includes('herbal'));

  return {
    allergens: Array.from(allergens),
    intolerances: hasCaffeine ? ['caffeine'] : [],
    dietary: combined.includes('vegan') ? ['vegan'] : []
  };
}

// Generate slug from name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Convert products
const products = data.Sheet1.map((item, index) => {
  const nutrition = estimateNutrition(item['Quantity (1 Serving)'], item['Main Ingredients']);
  const safety = extractAllergens(item['Main Ingredients'], item['Quantity (1 Serving)']);
  const slug = generateSlug(item['Product Name']);

  return {
    id: slug,
    name: {
      en: item['Product Name'],
      it: item['Product Name'], // TODO: translate
      vi: item['Product Name']  // TODO: translate
    },
    description: {
      en: item['Notes'] || item['Preparation Method'] || '',
      it: item['Notes'] || item['Preparation Method'] || '',
      vi: item['Notes'] || item['Preparation Method'] || ''
    },
    category: categoryMap[item.Category] || 'other',
    price: item['Selling Price (USD)'] || 3.50,
    image: '/products/' + slug + '.jpg',

    // Ingredients info
    mainIngredients: item['Main Ingredients'],
    quantity: item['Quantity (1 Serving)'],
    preparationMethod: item['Preparation Method'],

    // Nutrition
    calories: nutrition.calories,
    protein_g: nutrition.protein_g,
    carbs_g: nutrition.carbs_g,
    fat_g: nutrition.fat_g,

    // Safety
    allergens: safety.allergens,
    intolerances: safety.intolerances,
    dietary: safety.dietary,

    // Operations
    prepTime: item['Prep Time (sec)'] || 60,
    skillLevel: item['Skill Level (1-3)'] || 1,
    servingGlass: item['Serving Glass / Cup Type'] || '',

    // Decoration
    decoration: {
      chain: item['Chain Style Decoration'] || '',
      premium: item['Premium Style Decoration'] || ''
    },

    // Business
    ingredientCost: item['Ingredient Cost (USD)'] || 0.50,
    profitMargin: item['Profit Margin %'] || 80,

    // Tags
    tags: [
      item['Product Name'].toLowerCase().includes('iced') ? 'iced' : 'hot',
      item.Category.toLowerCase().replace(/[^a-z]/g, '-')
    ].filter(Boolean),

    // Metadata
    isNew: false,
    isVisible: true,
    sortOrder: index + 1
  };
});

// Write output
fs.writeFileSync(
  '/Users/gianfrancodagostino/Desktop/gudbro-verticals/apps/coffeeshop/frontend/data/coffee-house-products.json',
  JSON.stringify(products, null, 2)
);

// Summary
const byCategory = {};
products.forEach(p => {
  byCategory[p.category] = (byCategory[p.category] || 0) + 1;
});

console.log('Converted', products.length, 'products');
console.log('By category:', JSON.stringify(byCategory, null, 2));
console.log('\nSample product:');
console.log(JSON.stringify(products[0], null, 2));
