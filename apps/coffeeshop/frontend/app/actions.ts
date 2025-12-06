'use server';

/**
 * Server Actions for Menu Data
 *
 * These actions fetch menu data using the menu-service which:
 * 1. Tries Supabase first (if configured and has data)
 * 2. Falls back to local JSON files
 *
 * This enables real-time menu updates from backoffice while
 * maintaining offline/fallback support.
 */

import {
  getMenuProducts as fetchMenuProducts,
  getMenuProductsRaw as fetchMenuProductsRaw,
  getMenuCategories as fetchMenuCategories,
  NormalizedProduct,
} from '@/lib/menu-service';

import { categories, Temperature, TEMPERATURE_ICONS } from '@/data/categories';

// Re-export types
export type { NormalizedProduct };

/**
 * Get menu products with language-specific text
 * Uses Supabase if available, falls back to JSON
 */
export async function getMenuProducts(lang: string = 'en'): Promise<NormalizedProduct[]> {
  return fetchMenuProducts(lang);
}

/**
 * Get menu products with multilang fields intact
 * For client-side language switching
 */
export async function getMenuProductsRaw(): Promise<NormalizedProduct[]> {
  return fetchMenuProductsRaw();
}

/**
 * Get menu categories
 * Uses Supabase if available, falls back to local categories.ts
 */
export async function getMenuCategories(lang: string = 'en') {
  return fetchMenuCategories(lang);
}

/**
 * Get products filtered by category
 */
export async function getProductsByCategory(categoryId: string, lang: string = 'en'): Promise<NormalizedProduct[]> {
  const products = await fetchMenuProducts(lang);
  return products.filter(p => p.category === categoryId && p.isVisible);
}

/**
 * Get products filtered by temperature (hot/iced)
 */
export async function getProductsByTemperature(temp: Temperature, lang: string = 'en'): Promise<NormalizedProduct[]> {
  const products = await fetchMenuProducts(lang);
  return products.filter(p => p.temperature === temp && p.isVisible);
}

/**
 * Get products filtered by subcategory
 */
export async function getProductsBySubcategory(
  categoryId: string,
  subcategoryId: string,
  lang: string = 'en'
): Promise<NormalizedProduct[]> {
  const products = await fetchMenuProducts(lang);
  return products.filter(p =>
    p.category === categoryId &&
    p.subcategory === subcategoryId &&
    p.isVisible
  );
}

/**
 * Get hot categories only
 */
export async function getHotCategories(lang: string = 'en') {
  return categories
    .filter(c => c.temperature === 'hot' || c.temperature === 'both')
    .map(cat => ({
      ...cat,
      name: typeof cat.name === 'object' ? cat.name[lang as keyof typeof cat.name] || cat.name.en : cat.name,
      description: typeof cat.description === 'object'
        ? cat.description[lang as keyof typeof cat.description] || cat.description.en
        : cat.description,
    }));
}

/**
 * Get iced categories only
 */
export async function getIcedCategories(lang: string = 'en') {
  return categories
    .filter(c => c.temperature === 'iced' || c.temperature === 'both')
    .map(cat => ({
      ...cat,
      name: typeof cat.name === 'object' ? cat.name[lang as keyof typeof cat.name] || cat.name.en : cat.name,
      description: typeof cat.description === 'object'
        ? cat.description[lang as keyof typeof cat.description] || cat.description.en
        : cat.description,
    }));
}
