/**
 * Translations Service
 *
 * Fetches translated menu items, categories, and modifiers from Supabase.
 * Uses Supabase RPC functions for efficient fallback logic.
 *
 * Fallback order: Requested language → English → Original
 */

import { supabase, isSupabaseConfigured } from './supabase';

// Types
export interface TranslatedMenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  language_used: string;
}

export interface TranslatedCategory {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  display_order: number;
  language_used: string;
}

export interface TranslationsCache {
  menuItems: Map<string, TranslatedMenuItem[]>;
  categories: Map<string, TranslatedCategory[]>;
  lastUpdated: number;
}

// Cache for translations
const translationsCache: TranslationsCache = {
  menuItems: new Map(),
  categories: new Map(),
  lastUpdated: 0,
};

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch translated menu items from Supabase
 *
 * Uses the get_menu_items_with_translations() RPC function
 * which handles fallback logic server-side.
 */
export async function fetchTranslatedMenuItems(
  merchantId: string,
  languageCode: string,
  fallbackLanguage: string = 'en'
): Promise<TranslatedMenuItem[]> {
  const cacheKey = `${merchantId}:${languageCode}`;

  // Check cache
  const cached = translationsCache.menuItems.get(cacheKey);
  if (cached && Date.now() - translationsCache.lastUpdated < CACHE_TTL) {
    return cached;
  }

  if (!isSupabaseConfigured || !supabase) {
    console.warn('[TranslationsService] Supabase not configured');
    return [];
  }

  try {
    const { data, error } = await supabase.rpc('get_menu_items_with_translations', {
      p_merchant_id: merchantId,
      p_language_code: languageCode,
      p_fallback_language: fallbackLanguage,
    });

    if (error) {
      console.error('[TranslationsService] Error fetching menu items:', error.message);
      return [];
    }

    const items = (data || []) as TranslatedMenuItem[];

    // Cache the result
    translationsCache.menuItems.set(cacheKey, items);
    translationsCache.lastUpdated = Date.now();

    if (process.env.NODE_ENV === 'development') {
      // Silently ignore
    }

    return items;
  } catch (err) {
    console.error('[TranslationsService] Unexpected error:', err);
    return [];
  }
}

/**
 * Fetch translated categories from Supabase
 *
 * Uses the get_categories_with_translations() RPC function.
 */
export async function fetchTranslatedCategories(
  merchantId: string,
  languageCode: string,
  fallbackLanguage: string = 'en'
): Promise<TranslatedCategory[]> {
  const cacheKey = `${merchantId}:${languageCode}`;

  // Check cache
  const cached = translationsCache.categories.get(cacheKey);
  if (cached && Date.now() - translationsCache.lastUpdated < CACHE_TTL) {
    return cached;
  }

  if (!isSupabaseConfigured || !supabase) {
    console.warn('[TranslationsService] Supabase not configured');
    return [];
  }

  try {
    const { data, error } = await supabase.rpc('get_categories_with_translations', {
      p_merchant_id: merchantId,
      p_language_code: languageCode,
      p_fallback_language: fallbackLanguage,
    });

    if (error) {
      console.error('[TranslationsService] Error fetching categories:', error.message);
      return [];
    }

    const categories = (data || []) as TranslatedCategory[];

    // Cache the result
    translationsCache.categories.set(cacheKey, categories);
    translationsCache.lastUpdated = Date.now();

    if (process.env.NODE_ENV === 'development') {
      // Silently ignore
    }

    return categories;
  } catch (err) {
    console.error('[TranslationsService] Unexpected error:', err);
    return [];
  }
}

/**
 * Fetch single translated menu item
 */
export async function fetchTranslatedMenuItem(
  menuItemId: string,
  languageCode: string,
  fallbackLanguage: string = 'en'
): Promise<TranslatedMenuItem | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase.rpc('get_translated_menu_item', {
      p_menu_item_id: menuItemId,
      p_language_code: languageCode,
      p_fallback_language: fallbackLanguage,
    });

    if (error) {
      console.error('[TranslationsService] Error fetching menu item:', error.message);
      return null;
    }

    return data?.[0] || null;
  } catch (err) {
    console.error('[TranslationsService] Unexpected error:', err);
    return null;
  }
}

/**
 * Clear the translations cache
 */
export function clearTranslationsCache(): void {
  translationsCache.menuItems.clear();
  translationsCache.categories.clear();
  translationsCache.lastUpdated = 0;
}

/**
 * Preload translations for a language
 *
 * Useful for warming the cache on app load.
 */
export async function preloadTranslations(merchantId: string, languageCode: string): Promise<void> {
  await Promise.all([
    fetchTranslatedMenuItems(merchantId, languageCode),
    fetchTranslatedCategories(merchantId, languageCode),
  ]);
}
