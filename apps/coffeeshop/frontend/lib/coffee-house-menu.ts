/**
 * Coffee House Menu Integration
 *
 * Loads the 81 Coffee House products and converts them to DishItem format.
 * Supports both the Chat-style and Classic menu interfaces.
 */

import coffeeHouseProducts from '@/data/coffee-house-products.json';
import { categories, getCategoryById } from '@/data/categories';
import type { DishItem, Extra } from '@/types/dish';

/**
 * Coffee House Product from JSON
 */
interface CoffeeHouseProduct {
  id: string;
  name: { en: string; it: string; vi: string };
  description: { en: string; it: string; vi: string };
  category: string;
  price: number;
  image: string;
  mainIngredients: string;
  quantity: string;
  preparationMethod: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  allergens: string[];
  intolerances: string[];
  dietary: string[];
  prepTime: number;
  skillLevel: number;
  servingGlass: string;
  decoration: { chain: string; premium: string };
  ingredientCost: number;
  profitMargin: number;
  tags: string[];
  isNew: boolean;
  isVisible: boolean;
  sortOrder: number;
}

/**
 * Get extras based on product category
 */
function getExtrasForCategory(category: string, productName: string): Extra[] {
  const extras: Extra[] = [];

  // Espresso and Signature Coffee - Size, Milk, Extra Shot
  if (category === 'espresso' || category === 'signature-coffee') {
    extras.push(
      { id: 'size-small', name: 'Small', price: 0, type: 'size' },
      { id: 'size-medium', name: 'Medium', price: 0.5, type: 'size' },
      { id: 'size-large', name: 'Large', price: 1, type: 'size' },
    );

    // Milk options for lattes
    if (productName.toLowerCase().includes('latte') ||
        productName.toLowerCase().includes('cappuccino') ||
        productName.toLowerCase().includes('milk')) {
      extras.push(
        { id: 'oat-milk', name: 'Oat Milk', price: 0.5, type: 'milk' },
        { id: 'soy-milk', name: 'Soy Milk', price: 0.5, type: 'milk' },
        { id: 'almond-milk', name: 'Almond Milk', price: 0.7, type: 'milk' },
      );
    }

    // Extra shot for espresso drinks
    if (!productName.toLowerCase().includes('decaf')) {
      extras.push(
        { id: 'extra-shot', name: 'Extra Shot', price: 0.8, type: 'shot' }
      );
    }
  }

  // Matcha - Size and Milk
  if (category === 'matcha') {
    extras.push(
      { id: 'size-small', name: 'Small', price: 0, type: 'size' },
      { id: 'size-medium', name: 'Medium', price: 0.5, type: 'size' },
      { id: 'size-large', name: 'Large', price: 1, type: 'size' },
      { id: 'oat-milk', name: 'Oat Milk', price: 0.5, type: 'milk' },
      { id: 'coconut-milk', name: 'Coconut Milk', price: 0.7, type: 'milk' },
    );
  }

  // Tea - Size and Sweetener
  if (category === 'tea') {
    extras.push(
      { id: 'size-small', name: 'Small', price: 0, type: 'size' },
      { id: 'size-large', name: 'Large', price: 0.8, type: 'size' },
      { id: 'honey', name: 'Honey', price: 0.3, type: 'sweetener' },
      { id: 'no-sugar', name: 'No Sugar', price: 0, type: 'sweetener' },
    );
  }

  // Smoothie - Protein and Extras
  if (category === 'smoothie') {
    extras.push(
      { id: 'size-regular', name: 'Regular', price: 0, type: 'size' },
      { id: 'size-large', name: 'Large', price: 1, type: 'size' },
      { id: 'protein-powder', name: 'Protein Powder', price: 1.5, type: 'addon' },
      { id: 'chia-seeds', name: 'Chia Seeds', price: 0.8, type: 'addon' },
      { id: 'extra-fruit', name: 'Extra Fruit', price: 1, type: 'addon' },
    );
  }

  // Milkshake - Size and Toppings
  if (category === 'milkshake') {
    extras.push(
      { id: 'size-regular', name: 'Regular', price: 0, type: 'size' },
      { id: 'size-large', name: 'Large', price: 1.2, type: 'size' },
      { id: 'extra-cream', name: 'Extra Whipped Cream', price: 0.5, type: 'addon' },
      { id: 'chocolate-drizzle', name: 'Chocolate Drizzle', price: 0.3, type: 'addon' },
      { id: 'caramel-drizzle', name: 'Caramel Drizzle', price: 0.3, type: 'addon' },
    );
  }

  return extras;
}

/**
 * Convert Coffee House products to frontend DishItem format
 */
export function getCoffeeHouseMenuItems(lang: 'en' | 'it' | 'vi' = 'en'): DishItem[] {
  const products = coffeeHouseProducts as CoffeeHouseProduct[];

  return products
    .filter(p => p.isVisible)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(product => {
      const extras = getExtrasForCategory(product.category, product.name.en);

      const dishItem: DishItem = {
        id: product.id,
        name: product.name[lang] || product.name.en,
        description: product.description[lang] || product.description.en,
        image: product.image,
        price: product.price,
        category: product.category,

        // Nutritional info
        calories: product.calories,
        protein_g: product.protein_g,
        carbs_g: product.carbs_g,
        fat_g: product.fat_g,

        // Safety info
        allergens: product.allergens,
        intolerances: product.intolerances,
        dietary: product.dietary,

        // Extras
        availableExtras: extras.length > 0 ? extras : undefined,

        // Metadata
        isNew: product.isNew,
      };

      return dishItem;
    });
}

/**
 * Get products by category
 */
export function getCoffeeHouseProductsByCategory(
  categoryId: string,
  lang: 'en' | 'it' | 'vi' = 'en'
): DishItem[] {
  return getCoffeeHouseMenuItems(lang).filter(p => p.category === categoryId);
}

/**
 * Get a single product by ID
 */
export function getCoffeeHouseProductById(
  productId: string,
  lang: 'en' | 'it' | 'vi' = 'en'
): DishItem | undefined {
  return getCoffeeHouseMenuItems(lang).find(p => p.id === productId);
}

/**
 * Search products by name or description
 */
export function searchCoffeeHouseProducts(
  query: string,
  lang: 'en' | 'it' | 'vi' = 'en'
): DishItem[] {
  const lowerQuery = query.toLowerCase();
  return getCoffeeHouseMenuItems(lang).filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get products filtered by dietary restrictions
 */
export function getCoffeeHouseProductsByDiet(
  dietId: string,
  lang: 'en' | 'it' | 'vi' = 'en'
): DishItem[] {
  return getCoffeeHouseMenuItems(lang).filter(p =>
    p.dietary?.includes(dietId)
  );
}

/**
 * Get products excluding allergens
 */
export function getCoffeeHouseProductsExcludingAllergens(
  allergenIds: string[],
  lang: 'en' | 'it' | 'vi' = 'en'
): DishItem[] {
  return getCoffeeHouseMenuItems(lang).filter(p =>
    !p.allergens?.some(a => allergenIds.includes(a))
  );
}

/**
 * Get menu statistics
 */
export function getCoffeeHouseMenuStats() {
  const products = coffeeHouseProducts as CoffeeHouseProduct[];

  const byCategory: Record<string, number> = {};
  products.forEach(p => {
    byCategory[p.category] = (byCategory[p.category] || 0) + 1;
  });

  const avgCalories = Math.round(
    products.reduce((sum, p) => sum + p.calories, 0) / products.length
  );

  const priceRange = {
    min: Math.min(...products.map(p => p.price)),
    max: Math.max(...products.map(p => p.price)),
    avg: Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length * 100) / 100
  };

  return {
    totalProducts: products.length,
    byCategory,
    avgCalories,
    priceRange,
    categories: categories.map(c => ({
      id: c.id,
      name: c.name,
      icon: c.icon,
      count: byCategory[c.id] || 0
    }))
  };
}

/**
 * Get featured products for homepage
 */
export function getFeaturedProducts(
  count: number = 6,
  lang: 'en' | 'it' | 'vi' = 'en'
): DishItem[] {
  const allProducts = getCoffeeHouseMenuItems(lang);

  // Get one from each category for variety
  const featured: DishItem[] = [];
  const usedCategories = new Set<string>();

  for (const product of allProducts) {
    if (!usedCategories.has(product.category) && featured.length < count) {
      featured.push(product);
      usedCategories.add(product.category);
    }
  }

  // Fill remaining slots with popular items
  if (featured.length < count) {
    const remaining = allProducts
      .filter(p => !featured.find(f => f.id === p.id))
      .slice(0, count - featured.length);
    featured.push(...remaining);
  }

  return featured;
}

// Export categories
export { categories, getCategoryById, getCategoryBySlug, getVisibleCategories } from '@/data/categories';
