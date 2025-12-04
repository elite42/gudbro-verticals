'use server';

// Using Coffee House products (81 products with nutrition data)
import coffeeHouseProducts from '@/data/coffee-house-products.json';
import { categories } from '@/data/categories';

// Helper to convert multilingual objects to strings
// This prevents React Error #31 (object as child)
function normalizeMultilingualField(field: any, defaultLang = 'en'): string {
  if (typeof field === 'string') {
    return field;
  }
  if (typeof field === 'object' && field !== null) {
    return field[defaultLang] || field.en || field.it || field.vi || '';
  }
  return '';
}

export async function getMenuProducts(lang: string = 'en') {
  // Transform multilingual fields to strings to prevent hydration errors
  const products = coffeeHouseProducts.map((product: any) => ({
    ...product,
    name: normalizeMultilingualField(product.name, lang),
    description: normalizeMultilingualField(product.description, lang),
  }));

  return products as any[];
}

export async function getMenuCategories() {
  return categories.map(cat => ({
    ...cat,
    name: normalizeMultilingualField(cat.name),
    description: normalizeMultilingualField(cat.description),
  }));
}

export async function getProductsByCategory(categoryId: string, lang: string = 'en') {
  const products = coffeeHouseProducts
    .filter((p: any) => p.category === categoryId && p.isVisible)
    .map((product: any) => ({
      ...product,
      name: normalizeMultilingualField(product.name, lang),
      description: normalizeMultilingualField(product.description, lang),
    }));

  return products as any[];
}
