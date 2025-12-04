'use server';

// Using Coffee House products (81 products with nutrition data)
// Updated with new category structure v2.0: hot-coffee, iced-coffee, matcha, tea, smoothie, milkshake
import coffeeHouseProducts from '@/data/coffee-house-products.json';
import { categories, Temperature, TEMPERATURE_ICONS } from '@/data/categories';

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
    // Add temperature icon for display
    temperatureIcon: product.temperature === 'hot' ? TEMPERATURE_ICONS.hot : TEMPERATURE_ICONS.iced,
  }));

  return products as any[];
}

export async function getMenuCategories(lang: string = 'en') {
  return categories.map(cat => ({
    ...cat,
    name: normalizeMultilingualField(cat.name, lang),
    description: normalizeMultilingualField(cat.description, lang),
    // Normalize subcategory names
    subcategories: cat.subcategories?.map(sub => ({
      ...sub,
      name: normalizeMultilingualField(sub.name, lang),
      description: sub.description ? normalizeMultilingualField(sub.description, lang) : undefined,
    })),
  }));
}

export async function getProductsByCategory(categoryId: string, lang: string = 'en') {
  const products = coffeeHouseProducts
    .filter((p: any) => p.category === categoryId && p.isVisible)
    .map((product: any) => ({
      ...product,
      name: normalizeMultilingualField(product.name, lang),
      description: normalizeMultilingualField(product.description, lang),
      temperatureIcon: product.temperature === 'hot' ? TEMPERATURE_ICONS.hot : TEMPERATURE_ICONS.iced,
    }));

  return products as any[];
}

// New function: Get products by temperature
export async function getProductsByTemperature(temp: Temperature, lang: string = 'en') {
  const products = coffeeHouseProducts
    .filter((p: any) => p.temperature === temp && p.isVisible)
    .map((product: any) => ({
      ...product,
      name: normalizeMultilingualField(product.name, lang),
      description: normalizeMultilingualField(product.description, lang),
      temperatureIcon: temp === 'hot' ? TEMPERATURE_ICONS.hot : TEMPERATURE_ICONS.iced,
    }));

  return products as any[];
}

// New function: Get products by subcategory
export async function getProductsBySubcategory(categoryId: string, subcategoryId: string, lang: string = 'en') {
  const products = coffeeHouseProducts
    .filter((p: any) => p.category === categoryId && p.subcategory === subcategoryId && p.isVisible)
    .map((product: any) => ({
      ...product,
      name: normalizeMultilingualField(product.name, lang),
      description: normalizeMultilingualField(product.description, lang),
      temperatureIcon: product.temperature === 'hot' ? TEMPERATURE_ICONS.hot : TEMPERATURE_ICONS.iced,
    }));

  return products as any[];
}

// New function: Get hot categories only
export async function getHotCategories(lang: string = 'en') {
  return categories
    .filter(c => c.temperature === 'hot' || c.temperature === 'both')
    .map(cat => ({
      ...cat,
      name: normalizeMultilingualField(cat.name, lang),
      description: normalizeMultilingualField(cat.description, lang),
    }));
}

// New function: Get iced categories only
export async function getIcedCategories(lang: string = 'en') {
  return categories
    .filter(c => c.temperature === 'iced' || c.temperature === 'both')
    .map(cat => ({
      ...cat,
      name: normalizeMultilingualField(cat.name, lang),
      description: normalizeMultilingualField(cat.description, lang),
    }));
}
