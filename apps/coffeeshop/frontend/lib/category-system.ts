/**
 * GUDBRO Coffee House - Robust Category System v1.0
 *
 * This module provides:
 * - Type-safe category IDs (no more string typos)
 * - Automatic menuType resolution from categories.ts
 * - Product validation to catch orphan categories
 * - Dynamic categories (Popular, New, Favorites) management
 * - Runtime warnings in development mode
 *
 * USAGE:
 * - When adding a new category: Add to categories.ts with menuType
 * - When loading products: Use validateProducts() to catch issues
 * - When filtering by menuType: Use getProductMenuType()
 */

import {
  categories,
  getCategoryById,
  getCategoryMenuType as getCategoryMenuTypeFromData,
  MenuType,
  Category,
} from '@/data/categories';

// =============================================================================
// TYPE-SAFE CATEGORY IDS
// =============================================================================

/**
 * All valid static category IDs from categories.ts
 * This is auto-generated from the categories array
 */
export const VALID_CATEGORY_IDS = categories.map((c) => c.id) as readonly string[];

/**
 * Type representing a valid category ID
 */
export type ValidCategoryId = (typeof VALID_CATEGORY_IDS)[number];

/**
 * Dynamic/virtual category IDs (not in database, computed at runtime)
 */
export const DYNAMIC_CATEGORY_IDS = ['popular', 'new', 'favorites', 'all'] as const;
export type DynamicCategoryId = (typeof DYNAMIC_CATEGORY_IDS)[number];

/**
 * All category IDs (static + dynamic)
 */
export type AnyCategoryId = ValidCategoryId | DynamicCategoryId;

// =============================================================================
// CATEGORY VALIDATION
// =============================================================================

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  type: 'unknown_category' | 'missing_menu_type' | 'invalid_product';
  productId: string;
  productName: string;
  category: string;
  message: string;
}

export interface ValidationWarning {
  type: 'legacy_category' | 'empty_category';
  category: string;
  message: string;
}

/**
 * Validates that all products have valid categories with proper menuType mapping.
 * Call this when loading products from database/JSON.
 *
 * @param products - Array of products to validate
 * @param options - Validation options
 * @returns ValidationResult with errors and warnings
 */
export function validateProducts<T extends { id: string; name: string; category: string }>(
  products: T[],
  options: {
    throwOnError?: boolean;
    logWarnings?: boolean;
  } = {}
): ValidationResult {
  const { throwOnError = false, logWarnings = true } = options;

  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const categoriesUsed = new Set<string>();

  for (const product of products) {
    categoriesUsed.add(product.category);

    // Check if category exists in categories.ts
    const categoryData = getCategoryById(product.category);

    if (!categoryData) {
      // Check if it's a known legacy category that maps to a valid one
      const menuType = getProductMenuType(product.category);

      if (menuType === 'drinks') {
        // It fell back to default - this might be intentional or an error
        warnings.push({
          type: 'legacy_category',
          category: product.category,
          message: `Category "${product.category}" not found in categories.ts. Product "${product.name}" defaulted to 'drinks' tab.`,
        });
      } else {
        errors.push({
          type: 'unknown_category',
          productId: product.id,
          productName: product.name,
          category: product.category,
          message: `Product "${product.name}" has unknown category "${product.category}" not defined in categories.ts`,
        });
      }
    } else if (!categoryData.menuType) {
      errors.push({
        type: 'missing_menu_type',
        productId: product.id,
        productName: product.name,
        category: product.category,
        message: `Category "${product.category}" exists but has no menuType defined`,
      });
    }
  }

  // Check for empty categories (defined but no products)
  for (const category of categories) {
    if (category.isVisible && !categoriesUsed.has(category.id)) {
      warnings.push({
        type: 'empty_category',
        category: category.id,
        message: `Category "${category.id}" is visible but has no products`,
      });
    }
  }

  // Log in development
  if (process.env.NODE_ENV === 'development' && logWarnings) {
    if (errors.length > 0) {
      console.error('🚨 Category Validation Errors:', errors);
    }
    if (warnings.length > 0) {
      console.warn('⚠️ Category Validation Warnings:', warnings);
    }
  }

  if (throwOnError && errors.length > 0) {
    throw new Error(`Category validation failed: ${errors.map((e) => e.message).join('; ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

// =============================================================================
// MENU TYPE RESOLUTION
// =============================================================================

/**
 * Gets the menuType for a product's category.
 * Uses categories.ts as the single source of truth.
 * Falls back to intelligent defaults for legacy categories.
 *
 * @param categoryId - The category ID from the product
 * @returns The MenuType ('food', 'drinks', or 'merchandise')
 */
export function getProductMenuType(categoryId: string): MenuType {
  // 1. First, try to get from categories.ts (single source of truth)
  const menuType = getCategoryMenuTypeFromData(categoryId.toLowerCase());
  if (menuType) {
    return menuType;
  }

  // 2. Fallback for legacy categories not yet migrated to categories.ts
  const cat = categoryId.toLowerCase();

  // Known food categories (legacy)
  const legacyFoodCategories = [
    'antipasti',
    'primi',
    'secondi',
    'contorni',
    'piatti-unici',
    'pizza',
    'bowl',
    'lunch',
    'breakfast',
    'brunch',
    'dinner',
    'snack',
  ];

  // Known merchandise categories (legacy)
  const legacyMerchCategories = ['merchandise', 'gadget', 'gift', 'retail'];

  if (legacyFoodCategories.includes(cat)) return 'food';
  if (legacyMerchCategories.includes(cat)) return 'merchandise';

  // 3. Default to drinks for coffee shop
  return 'drinks';
}

/**
 * Checks if a category ID is valid (exists in categories.ts)
 */
export function isValidCategory(categoryId: string): boolean {
  return VALID_CATEGORY_IDS.includes(categoryId.toLowerCase());
}

/**
 * Checks if a category ID is a dynamic category
 */
export function isDynamicCategory(categoryId: string): categoryId is DynamicCategoryId {
  return DYNAMIC_CATEGORY_IDS.includes(categoryId as DynamicCategoryId);
}

// =============================================================================
// DYNAMIC CATEGORIES CONFIGURATION
// =============================================================================

export interface DynamicCategoryConfig {
  id: DynamicCategoryId;
  name: {
    en: string;
    it: string;
    vi: string;
  };
  icon: string;
  color: string;
  /** Whether this category should be visible when empty */
  showWhenEmpty: boolean;
  /** Sort order in the category list (lower = first) */
  sortOrder: number;
  /** Description for accessibility */
  description: {
    en: string;
    it: string;
    vi: string;
  };
}

/**
 * Configuration for dynamic categories
 * These are computed at runtime, not stored in database
 */
export const DYNAMIC_CATEGORIES: Record<DynamicCategoryId, DynamicCategoryConfig> = {
  all: {
    id: 'all',
    name: { en: 'All', it: 'Tutti', vi: 'Tất cả' },
    icon: '⭐',
    color: 'bg-theme-brand-accent',
    showWhenEmpty: true,
    sortOrder: 0,
    description: {
      en: 'View all menu items',
      it: 'Vedi tutti gli articoli',
      vi: 'Xem tất cả món',
    },
  },
  popular: {
    id: 'popular',
    name: { en: 'Popular', it: 'Popolari', vi: 'Phổ biến' },
    icon: '🔥',
    color: 'bg-orange-500',
    showWhenEmpty: false,
    sortOrder: 1,
    description: {
      en: 'Most ordered items',
      it: 'Articoli più ordinati',
      vi: 'Món được đặt nhiều nhất',
    },
  },
  new: {
    id: 'new',
    name: { en: 'New', it: 'Nuovi', vi: 'Mới' },
    icon: '✨',
    color: 'bg-yellow-500',
    showWhenEmpty: false,
    sortOrder: 2,
    description: {
      en: 'Recently added items',
      it: 'Articoli aggiunti di recente',
      vi: 'Món mới thêm gần đây',
    },
  },
  favorites: {
    id: 'favorites',
    name: { en: 'Favorites', it: 'Preferiti', vi: 'Yêu thích' },
    icon: '❤️',
    color: 'bg-red-500',
    showWhenEmpty: false,
    sortOrder: 3,
    description: {
      en: 'Your saved favorites',
      it: 'I tuoi preferiti salvati',
      vi: 'Món yêu thích đã lưu',
    },
  },
};

/**
 * Get dynamic category configuration
 */
export function getDynamicCategory(id: DynamicCategoryId): DynamicCategoryConfig {
  return DYNAMIC_CATEGORIES[id];
}

/**
 * Get all dynamic categories sorted by sortOrder
 */
export function getDynamicCategoriesSorted(): DynamicCategoryConfig[] {
  return Object.values(DYNAMIC_CATEGORIES).sort((a, b) => a.sortOrder - b.sortOrder);
}

// =============================================================================
// CATEGORY REGISTRY (Unified Access)
// =============================================================================

export interface CategoryInfo {
  id: string;
  name: { en: string; it: string; vi: string };
  icon: string;
  menuType: MenuType | null; // null for dynamic categories
  isDynamic: boolean;
  isVisible: boolean;
}

/**
 * Get unified category info for any category ID (static or dynamic)
 */
export function getCategoryInfo(categoryId: string): CategoryInfo | null {
  const lowerCategoryId = categoryId.toLowerCase();

  // Check dynamic categories first
  if (isDynamicCategory(lowerCategoryId)) {
    const dynamic = DYNAMIC_CATEGORIES[lowerCategoryId];
    return {
      id: dynamic.id,
      name: dynamic.name,
      icon: dynamic.icon,
      menuType: null,
      isDynamic: true,
      isVisible: true,
    };
  }

  // Check static categories
  const staticCategory = getCategoryById(lowerCategoryId);
  if (staticCategory) {
    return {
      id: staticCategory.id,
      name: staticCategory.name,
      icon: staticCategory.icon,
      menuType: staticCategory.menuType,
      isDynamic: false,
      isVisible: staticCategory.isVisible,
    };
  }

  return null;
}

// =============================================================================
// DEVELOPMENT HELPERS
// =============================================================================

/**
 * Logs a summary of the category system state
 * Only runs in development mode
 */
export function logCategorySystemStatus(): void {
  if (process.env.NODE_ENV !== 'development') return;

  console.group('📁 Category System Status');

  console.table(
    categories.map((c) => ({
      id: c.id,
      menuType: c.menuType,
      visible: c.isVisible,
      subcategories: c.subcategories?.length || 0,
    }))
  );

  console.table(DYNAMIC_CATEGORIES);

  console.groupEnd();
}

// =============================================================================
// EXPORTS FOR EASY ACCESS
// =============================================================================

// Re-export from categories.ts
export { categories } from '@/data/categories';
export type { MenuType, Category } from '@/data/categories';
