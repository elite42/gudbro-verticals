/**
 * useMenuTranslations Hook
 *
 * Fetches and caches translated menu items and categories from Supabase.
 * Automatically refetches when language changes.
 *
 * Usage:
 * const { menuItems, categories, isLoading, error } = useMenuTranslations();
 */

import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '../use-translation';
import {
  TranslatedMenuItem,
  TranslatedCategory,
  fetchTranslatedMenuItems,
  fetchTranslatedCategories,
  clearTranslationsCache,
} from '../translations-service';

// Default merchant ID for ROOTS (will be dynamic in multi-tenant setup)
const DEFAULT_MERCHANT_ID = '770e8400-e29b-41d4-a716-446655440001';

interface UseMenuTranslationsResult {
  /** Translated menu items */
  menuItems: TranslatedMenuItem[];
  /** Translated categories */
  categories: TranslatedCategory[];
  /** Whether translations are being loaded */
  isLoading: boolean;
  /** Error message if fetch failed */
  error: string | null;
  /** Current language code */
  language: string;
  /** Force refresh translations */
  refresh: () => Promise<void>;
  /** Get translated item by ID */
  getItem: (id: string) => TranslatedMenuItem | undefined;
  /** Get translated category by ID */
  getCategory: (id: string) => TranslatedCategory | undefined;
}

interface UseMenuTranslationsOptions {
  /** Merchant ID to fetch translations for */
  merchantId?: string;
  /** Whether to auto-fetch on mount */
  autoFetch?: boolean;
}

export function useMenuTranslations(
  options: UseMenuTranslationsOptions = {}
): UseMenuTranslationsResult {
  const { merchantId = DEFAULT_MERCHANT_ID, autoFetch = true } = options;
  const { language, isClient } = useTranslation();

  const [menuItems, setMenuItems] = useState<TranslatedMenuItem[]>([]);
  const [categories, setCategories] = useState<TranslatedCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch translations
  const fetchTranslations = useCallback(async () => {
    if (!isClient) return;

    setIsLoading(true);
    setError(null);

    try {
      const [items, cats] = await Promise.all([
        fetchTranslatedMenuItems(merchantId, language),
        fetchTranslatedCategories(merchantId, language),
      ]);

      setMenuItems(items);
      setCategories(cats);

      if (process.env.NODE_ENV === 'development') {
        console.log(`[useMenuTranslations] Loaded ${items.length} items, ${cats.length} categories for ${language}`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch translations';
      setError(message);
      console.error('[useMenuTranslations] Error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [merchantId, language, isClient]);

  // Auto-fetch on mount and language change
  useEffect(() => {
    if (autoFetch && isClient) {
      fetchTranslations();
    }
  }, [autoFetch, isClient, fetchTranslations]);

  // Force refresh
  const refresh = useCallback(async () => {
    clearTranslationsCache();
    await fetchTranslations();
  }, [fetchTranslations]);

  // Get item by ID
  const getItem = useCallback(
    (id: string) => menuItems.find((item) => item.id === id),
    [menuItems]
  );

  // Get category by ID
  const getCategory = useCallback(
    (id: string) => categories.find((cat) => cat.id === id),
    [categories]
  );

  return {
    menuItems,
    categories,
    isLoading,
    error,
    language,
    refresh,
    getItem,
    getCategory,
  };
}

/**
 * Hook to get a single translated menu item
 */
export function useTranslatedMenuItem(menuItemId: string | null) {
  const { menuItems, isLoading, error } = useMenuTranslations();

  const item = menuItemId
    ? menuItems.find((i) => i.id === menuItemId)
    : undefined;

  return {
    item,
    isLoading,
    error,
  };
}
