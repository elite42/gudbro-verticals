/**
 * useMenu Hook
 *
 * Fetches menu data from the GUDBRO API and provides
 * filtering, search, and dietary preference support.
 *
 * Integrates with Sistema 5 Dimensioni for allergen/dietary filtering.
 */

import { useState, useEffect, useMemo, useCallback } from 'react';

// ============================================================================
// TYPES
// ============================================================================

interface MultiLangText {
  en: string;
  it?: string;
  vi?: string;
  ko?: string;
  ja?: string;
}

interface AllergenFlags {
  [key: string]: boolean | undefined;
}

interface IntoleranceFlags {
  [key: string]: boolean | undefined;
}

interface DietaryFlags {
  [key: string]: boolean | undefined;
}

interface ProductCustomization {
  id: string;
  type: 'radio' | 'checkbox' | 'quantity';
  name: MultiLangText;
  required: boolean;
  max_selections?: number;
  options: {
    id: string;
    name: MultiLangText;
    price_modifier: number;
    is_default: boolean;
  }[];
  display_order: number;
}

export interface MenuItemSummary {
  id: string;
  slug: string;
  name: MultiLangText;
  description?: MultiLangText;
  price: number;
  imageUrl?: string;
  allergens: AllergenFlags;
  intolerances: IntoleranceFlags;
  dietaryFlags: DietaryFlags;
  spiceLevel: number;
  customizations: ProductCustomization[];
  isFeatured: boolean;
  isNew: boolean;
  displayOrder: number;
}

export interface MenuCategory {
  id: string;
  slug: string;
  name: MultiLangText;
  icon?: string;
  displayOrder: number;
  items: MenuItemSummary[];
}

export interface MerchantMenu {
  merchantSlug: string;
  merchantName: string;
  logoUrl?: string;
  primaryColor: string;
  currency: string;
  defaultLanguage: string;
  supportedLanguages: string[];
  wifiEnabled: boolean;
  wifiSsid?: string;
  categories: MenuCategory[];
}

export interface UserDietaryPreferences {
  excludeAllergens: string[];
  excludeIntolerances: string[];
  requiredDiets: string[];
  maxSpiceLevel?: number;
}

export interface MenuFilters {
  categorySlug?: string;
  searchQuery?: string;
  dietary?: UserDietaryPreferences;
  featuredOnly?: boolean;
  newOnly?: boolean;
}

// ============================================================================
// API CONFIGURATION
// ============================================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// ============================================================================
// HOOK
// ============================================================================

export function useMenu(merchantSlug: string) {
  const [menu, setMenu] = useState<MerchantMenu | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<MenuFilters>({});
  const [language, setLanguage] = useState('en');

  // Fetch menu data
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/api/menu/${merchantSlug}?lang=${language}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch menu: ${response.statusText}`);
        }

        const data = await response.json();
        setMenu(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [merchantSlug, language]);

  // Filter items based on dietary preferences
  const filterByDietary = useCallback(
    (item: MenuItemSummary, dietary: UserDietaryPreferences): boolean => {
      // Check allergens
      if (dietary.excludeAllergens.length > 0) {
        for (const allergen of dietary.excludeAllergens) {
          if (item.allergens[allergen]) {
            return false;
          }
        }
      }

      // Check intolerances
      if (dietary.excludeIntolerances.length > 0) {
        for (const intolerance of dietary.excludeIntolerances) {
          if (item.intolerances[intolerance]) {
            return false;
          }
        }
      }

      // Check required diets
      if (dietary.requiredDiets.length > 0) {
        for (const diet of dietary.requiredDiets) {
          if (!item.dietaryFlags[diet]) {
            return false;
          }
        }
      }

      // Check spice level
      if (dietary.maxSpiceLevel !== undefined && item.spiceLevel > dietary.maxSpiceLevel) {
        return false;
      }

      return true;
    },
    []
  );

  // Apply all filters to get filtered menu
  const filteredMenu = useMemo(() => {
    if (!menu) return null;

    let filteredCategories = [...menu.categories];

    // Filter by category
    if (filters.categorySlug) {
      filteredCategories = filteredCategories.filter((cat) => cat.slug === filters.categorySlug);
    }

    // Filter items within categories
    filteredCategories = filteredCategories.map((category) => {
      let items = [...category.items];

      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        items = items.filter(
          (item) =>
            item.name.en.toLowerCase().includes(query) ||
            item.name.vi?.toLowerCase().includes(query) ||
            item.description?.en?.toLowerCase().includes(query)
        );
      }

      // Dietary filter
      if (filters.dietary) {
        items = items.filter((item) => filterByDietary(item, filters.dietary!));
      }

      // Featured only
      if (filters.featuredOnly) {
        items = items.filter((item) => item.isFeatured);
      }

      // New only
      if (filters.newOnly) {
        items = items.filter((item) => item.isNew);
      }

      return { ...category, items };
    });

    // Remove empty categories
    filteredCategories = filteredCategories.filter((cat) => cat.items.length > 0);

    return { ...menu, categories: filteredCategories };
  }, [menu, filters, filterByDietary]);

  // Get all items (flattened)
  const allItems = useMemo(() => {
    if (!filteredMenu) return [];
    return filteredMenu.categories.flatMap((cat) => cat.items);
  }, [filteredMenu]);

  // Get featured items
  const featuredItems = useMemo(() => {
    return allItems.filter((item) => item.isFeatured);
  }, [allItems]);

  // Get new items
  const newItems = useMemo(() => {
    return allItems.filter((item) => item.isNew);
  }, [allItems]);

  // Get item by slug
  const getItemBySlug = useCallback(
    (slug: string): MenuItemSummary | undefined => {
      return allItems.find((item) => item.slug === slug);
    },
    [allItems]
  );

  // Get localized text
  const getLocalizedText = useCallback(
    (text: MultiLangText | undefined): string => {
      if (!text) return '';
      return (text as unknown as Record<string, string>)[language] || text.en || '';
    },
    [language]
  );

  // Format price
  const formatPrice = useCallback(
    (price: number): string => {
      const currency = menu?.currency || 'VND';
      if (currency === 'VND') {
        return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
      }
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
      }).format(price);
    },
    [menu?.currency]
  );

  // Check if item is safe for user's dietary preferences
  const isItemSafe = useCallback(
    (item: MenuItemSummary, preferences: UserDietaryPreferences): boolean => {
      return filterByDietary(item, preferences);
    },
    [filterByDietary]
  );

  // Get allergen warnings for an item
  const getAllergenWarnings = useCallback((item: MenuItemSummary): string[] => {
    return Object.entries(item.allergens)
      .filter(([, value]) => value)
      .map(([key]) => key);
  }, []);

  // Get intolerance warnings for an item
  const getIntoleranceWarnings = useCallback((item: MenuItemSummary): string[] => {
    return Object.entries(item.intolerances)
      .filter(([, value]) => value)
      .map(([key]) => key);
  }, []);

  return {
    // Data
    menu: filteredMenu,
    rawMenu: menu,
    categories: filteredMenu?.categories || [],
    allItems,
    featuredItems,
    newItems,

    // State
    loading,
    error,
    language,
    filters,

    // Setters
    setLanguage,
    setFilters,

    // Helpers
    getItemBySlug,
    getLocalizedText,
    formatPrice,
    isItemSafe,
    getAllergenWarnings,
    getIntoleranceWarnings,

    // Refresh
    refetch: () => {
      setLoading(true);
      // Trigger re-fetch by updating a dependency
    },
  };
}

// ============================================================================
// DIETARY PREFERENCES HOOK
// ============================================================================

export function useDietaryPreferences() {
  const [preferences, setPreferences] = useState<UserDietaryPreferences>({
    excludeAllergens: [],
    excludeIntolerances: [],
    requiredDiets: [],
    maxSpiceLevel: undefined,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dietaryPreferences');
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Save to localStorage when changed
  const updatePreferences = useCallback((newPrefs: Partial<UserDietaryPreferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...newPrefs };
      localStorage.setItem('dietaryPreferences', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleAllergen = useCallback((allergen: string) => {
    setPreferences((prev) => {
      const newExclude = prev.excludeAllergens.includes(allergen)
        ? prev.excludeAllergens.filter((a) => a !== allergen)
        : [...prev.excludeAllergens, allergen];
      const updated = { ...prev, excludeAllergens: newExclude };
      localStorage.setItem('dietaryPreferences', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleIntolerance = useCallback((intolerance: string) => {
    setPreferences((prev) => {
      const newExclude = prev.excludeIntolerances.includes(intolerance)
        ? prev.excludeIntolerances.filter((i) => i !== intolerance)
        : [...prev.excludeIntolerances, intolerance];
      const updated = { ...prev, excludeIntolerances: newExclude };
      localStorage.setItem('dietaryPreferences', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleDiet = useCallback((diet: string) => {
    setPreferences((prev) => {
      const newRequired = prev.requiredDiets.includes(diet)
        ? prev.requiredDiets.filter((d) => d !== diet)
        : [...prev.requiredDiets, diet];
      const updated = { ...prev, requiredDiets: newRequired };
      localStorage.setItem('dietaryPreferences', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const setMaxSpiceLevel = useCallback((level: number | undefined) => {
    setPreferences((prev) => {
      const updated = { ...prev, maxSpiceLevel: level };
      localStorage.setItem('dietaryPreferences', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearPreferences = useCallback(() => {
    const cleared: UserDietaryPreferences = {
      excludeAllergens: [],
      excludeIntolerances: [],
      requiredDiets: [],
      maxSpiceLevel: undefined,
    };
    setPreferences(cleared);
    localStorage.setItem('dietaryPreferences', JSON.stringify(cleared));
  }, []);

  return {
    preferences,
    updatePreferences,
    toggleAllergen,
    toggleIntolerance,
    toggleDiet,
    setMaxSpiceLevel,
    clearPreferences,
    hasPreferences:
      preferences.excludeAllergens.length > 0 ||
      preferences.excludeIntolerances.length > 0 ||
      preferences.requiredDiets.length > 0 ||
      preferences.maxSpiceLevel !== undefined,
  };
}
