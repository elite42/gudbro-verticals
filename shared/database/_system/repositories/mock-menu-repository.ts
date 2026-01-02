/**
 * Mock Menu Repository
 *
 * In-memory implementation of IMenuRepository for offline development.
 * Uses mock data that mirrors the SQL seed data.
 *
 * This repository can be swapped with a real implementation
 * (Supabase, Firebase, Cloud SQL) when ready for production.
 */

import type {
  IMenuRepository,
  MenuCategory,
  CreateMenuCategoryInput,
  UpdateMenuCategoryInput,
  MenuItem,
  CreateMenuItemInput,
  UpdateMenuItemInput,
  MenuItemIngredient,
  CreateMenuItemIngredientInput,
  MenuFilterOptions,
  FilteredMenuResult,
  MenuItemFullView,
  MerchantMenuView,
  MenuCategoryWithItems,
  MenuItemSummary,
} from '../types';

import {
  demoMerchant,
  demoCategories,
  demoMenuItems,
  demoMenuItemIngredients,
} from './mock-data';

// ============================================================================
// IN-MEMORY STORAGE
// ============================================================================

// Clone mock data to allow mutations
let categories: MenuCategory[] = JSON.parse(JSON.stringify(demoCategories));
let menuItems: MenuItem[] = JSON.parse(JSON.stringify(demoMenuItems));
let menuItemIngredients: MenuItemIngredient[] = JSON.parse(
  JSON.stringify(demoMenuItemIngredients)
);

// UUID generator for new items
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// ============================================================================
// MOCK MENU REPOSITORY
// ============================================================================

export class MockMenuRepository implements IMenuRepository {
  // ==========================================================================
  // CATEGORIES
  // ==========================================================================

  async listCategories(merchantId: string): Promise<MenuCategory[]> {
    return categories
      .filter((c) => c.merchantId === merchantId && c.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async getCategory(id: string): Promise<MenuCategory | null> {
    return categories.find((c) => c.id === id) || null;
  }

  async createCategory(input: CreateMenuCategoryInput): Promise<MenuCategory> {
    const now = new Date().toISOString();
    const newCategory: MenuCategory = {
      id: generateUUID(),
      merchantId: input.merchantId,
      slug: input.slug,
      name: input.name,
      description: input.description,
      icon: input.icon,
      imageUrl: input.imageUrl,
      color: input.color,
      displayOrder: input.displayOrder ?? categories.length,
      isActive: input.isActive ?? true,
      visibleFrom: input.visibleFrom,
      visibleTo: input.visibleTo,
      visibleDays: input.visibleDays,
      createdAt: now,
      updatedAt: now,
    };

    categories.push(newCategory);
    return newCategory;
  }

  async updateCategory(
    id: string,
    input: UpdateMenuCategoryInput
  ): Promise<MenuCategory> {
    const index = categories.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(`Category not found: ${id}`);
    }

    const updated: MenuCategory = {
      ...categories[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };

    categories[index] = updated;
    return updated;
  }

  async deleteCategory(id: string): Promise<void> {
    const index = categories.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(`Category not found: ${id}`);
    }

    // Remove category
    categories.splice(index, 1);

    // Set menu items in this category to null categoryId
    menuItems = menuItems.map((item) =>
      item.categoryId === id ? { ...item, categoryId: undefined } : item
    );
  }

  async reorderCategories(
    merchantId: string,
    categoryIds: string[]
  ): Promise<void> {
    categoryIds.forEach((id, index) => {
      const categoryIndex = categories.findIndex(
        (c) => c.id === id && c.merchantId === merchantId
      );
      if (categoryIndex !== -1) {
        categories[categoryIndex] = {
          ...categories[categoryIndex],
          displayOrder: index,
          updatedAt: new Date().toISOString(),
        };
      }
    });
  }

  // ==========================================================================
  // MENU ITEMS
  // ==========================================================================

  async listItems(
    merchantId: string,
    options?: MenuFilterOptions
  ): Promise<FilteredMenuResult> {
    let filtered = menuItems.filter((item) => item.merchantId === merchantId);

    // Apply filters
    if (options) {
      // Category filter
      if (options.categoryId) {
        filtered = filtered.filter((item) => item.categoryId === options.categoryId);
      }
      if (options.categorySlug) {
        const category = categories.find(
          (c) => c.slug === options.categorySlug && c.merchantId === merchantId
        );
        if (category) {
          filtered = filtered.filter((item) => item.categoryId === category.id);
        }
      }

      // Search
      if (options.searchQuery) {
        const query = options.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.name.en.toLowerCase().includes(query) ||
            item.name.vi?.toLowerCase().includes(query) ||
            item.description?.en?.toLowerCase().includes(query) ||
            item.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      // Price range
      if (options.minPrice !== undefined) {
        filtered = filtered.filter((item) => item.price >= options.minPrice!);
      }
      if (options.maxPrice !== undefined) {
        filtered = filtered.filter((item) => item.price <= options.maxPrice!);
      }

      // Dietary preferences
      if (options.dietary) {
        const { excludeAllergens, excludeIntolerances, requiredDiets, maxSpiceLevel } =
          options.dietary;

        // Exclude allergens
        if (excludeAllergens && excludeAllergens.length > 0) {
          filtered = filtered.filter((item) => {
            return !excludeAllergens.some(
              (allergen) => item.allergens[allergen] === true
            );
          });
        }

        // Exclude intolerances
        if (excludeIntolerances && excludeIntolerances.length > 0) {
          filtered = filtered.filter((item) => {
            return !excludeIntolerances.some(
              (intolerance) => item.intolerances[intolerance] === true
            );
          });
        }

        // Required diets
        if (requiredDiets && requiredDiets.length > 0) {
          filtered = filtered.filter((item) => {
            return requiredDiets.every(
              (diet) => item.dietaryFlags[diet] === true
            );
          });
        }

        // Max spice level
        if (maxSpiceLevel !== undefined) {
          filtered = filtered.filter((item) => item.spiceLevel <= maxSpiceLevel);
        }
      }

      // Availability filters
      if (options.availableOnly) {
        filtered = filtered.filter((item) => item.isAvailable && item.isActive);
      }
      if (options.featuredOnly) {
        filtered = filtered.filter((item) => item.isFeatured);
      }
      if (options.newOnly) {
        filtered = filtered.filter((item) => item.isNew);
      }

      // Sorting
      if (options.sortBy) {
        const order = options.sortOrder === 'desc' ? -1 : 1;
        filtered.sort((a, b) => {
          switch (options.sortBy) {
            case 'price':
              return (a.price - b.price) * order;
            case 'name':
              return a.name.en.localeCompare(b.name.en) * order;
            case 'popularity':
              return (a.totalOrders - b.totalOrders) * order;
            case 'displayOrder':
            default:
              return (a.displayOrder - b.displayOrder) * order;
          }
        });
      } else {
        // Default sort by displayOrder
        filtered.sort((a, b) => a.displayOrder - b.displayOrder);
      }
    }

    // Calculate total before pagination
    const total = filtered.length;

    // Pagination
    const offset = options?.offset ?? 0;
    const limit = options?.limit ?? 50;
    const paginated = filtered.slice(offset, offset + limit);

    // Convert to summary format
    const items: MenuItemSummary[] = paginated.map((item) => ({
      id: item.id,
      slug: item.slug,
      name: item.name,
      description: item.description,
      price: item.price,
      imageUrl: item.imageUrl,
      allergens: item.allergens,
      intolerances: item.intolerances,
      dietaryFlags: item.dietaryFlags,
      spiceLevel: item.spiceLevel,
      customizations: item.customizations,
      isFeatured: item.isFeatured,
      isNew: item.isNew,
      displayOrder: item.displayOrder,
    }));

    return {
      items,
      total,
      hasMore: offset + limit < total,
      appliedFilters: options ?? {},
    };
  }

  async getItem(id: string): Promise<MenuItemFullView | null> {
    const item = menuItems.find((i) => i.id === id);
    if (!item) return null;

    const category = item.categoryId
      ? categories.find((c) => c.id === item.categoryId)
      : undefined;

    const ingredients = menuItemIngredients.filter(
      (ing) => ing.menuItemId === id
    );

    return {
      ...item,
      category,
      merchant: {
        slug: demoMerchant.slug,
        name: demoMerchant.name,
        currency: demoMerchant.currency,
        defaultLanguage: demoMerchant.defaultLanguage,
      },
      ingredients,
    };
  }

  async getItemBySlug(
    merchantId: string,
    slug: string
  ): Promise<MenuItemFullView | null> {
    const item = menuItems.find(
      (i) => i.merchantId === merchantId && i.slug === slug
    );
    if (!item) return null;
    return this.getItem(item.id);
  }

  async createItem(input: CreateMenuItemInput): Promise<MenuItem> {
    const now = new Date().toISOString();
    const newItem: MenuItem = {
      id: generateUUID(),
      merchantId: input.merchantId,
      categoryId: input.categoryId,
      slug: input.slug,
      name: input.name,
      description: input.description,
      shortDescription: input.shortDescription,
      price: input.price,
      compareAtPrice: input.compareAtPrice,
      currency: input.currency ?? 'VND',
      imageUrl: input.imageUrl,
      thumbnailUrl: input.thumbnailUrl,
      galleryUrls: input.galleryUrls,
      allergens: input.allergens ?? {},
      intolerances: input.intolerances ?? {},
      dietaryFlags: input.dietaryFlags ?? {},
      spiceLevel: input.spiceLevel ?? 0,
      basedOnRecipeId: input.basedOnRecipeId,
      safetyDataSource: input.safetyDataSource ?? 'manual',
      calories: input.calories,
      nutritionInfo: input.nutritionInfo,
      customizations: input.customizations ?? [],
      trackInventory: input.trackInventory ?? false,
      inventoryCount: input.inventoryCount,
      lowStockThreshold: input.lowStockThreshold ?? 10,
      isAvailable: input.isAvailable ?? true,
      isActive: input.isActive ?? true,
      isFeatured: input.isFeatured ?? false,
      isNew: input.isNew ?? false,
      newUntil: input.newUntil,
      availableFrom: input.availableFrom,
      availableTo: input.availableTo,
      availableDays: input.availableDays,
      displayOrder: input.displayOrder ?? menuItems.length,
      tags: input.tags ?? [],
      totalOrders: 0,
      createdAt: now,
      updatedAt: now,
    };

    menuItems.push(newItem);
    return newItem;
  }

  async updateItem(id: string, input: UpdateMenuItemInput): Promise<MenuItem> {
    const index = menuItems.findIndex((i) => i.id === id);
    if (index === -1) {
      throw new Error(`Menu item not found: ${id}`);
    }

    const updated: MenuItem = {
      ...menuItems[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };

    menuItems[index] = updated;
    return updated;
  }

  async deleteItem(id: string): Promise<void> {
    const index = menuItems.findIndex((i) => i.id === id);
    if (index === -1) {
      throw new Error(`Menu item not found: ${id}`);
    }

    // Remove item
    menuItems.splice(index, 1);

    // Remove associated ingredients
    menuItemIngredients = menuItemIngredients.filter(
      (ing) => ing.menuItemId !== id
    );
  }

  async reorderItems(categoryId: string, itemIds: string[]): Promise<void> {
    itemIds.forEach((id, index) => {
      const itemIndex = menuItems.findIndex(
        (i) => i.id === id && i.categoryId === categoryId
      );
      if (itemIndex !== -1) {
        menuItems[itemIndex] = {
          ...menuItems[itemIndex],
          displayOrder: index,
          updatedAt: new Date().toISOString(),
        };
      }
    });
  }

  // ==========================================================================
  // ITEM INGREDIENTS
  // ==========================================================================

  async listItemIngredients(menuItemId: string): Promise<MenuItemIngredient[]> {
    return menuItemIngredients
      .filter((ing) => ing.menuItemId === menuItemId)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async addItemIngredient(
    input: CreateMenuItemIngredientInput
  ): Promise<MenuItemIngredient> {
    const newIngredient: MenuItemIngredient = {
      id: generateUUID(),
      menuItemId: input.menuItemId,
      masterIngredientId: input.masterIngredientId,
      ingredientName: input.ingredientName,
      quantity: input.quantity,
      unit: input.unit,
      allergens: input.allergens ?? {},
      intolerances: input.intolerances ?? {},
      dietaryFlags: input.dietaryFlags ?? {},
      isOptional: input.isOptional ?? false,
      displayOrder: input.displayOrder ?? menuItemIngredients.length,
      createdAt: new Date().toISOString(),
    };

    menuItemIngredients.push(newIngredient);

    // Trigger recomputation
    await this.recomputeItemSafety(input.menuItemId);

    return newIngredient;
  }

  async removeItemIngredient(id: string): Promise<void> {
    const ingredient = menuItemIngredients.find((ing) => ing.id === id);
    if (!ingredient) {
      throw new Error(`Ingredient not found: ${id}`);
    }

    menuItemIngredients = menuItemIngredients.filter((ing) => ing.id !== id);

    // Trigger recomputation
    await this.recomputeItemSafety(ingredient.menuItemId);
  }

  async recomputeItemSafety(menuItemId: string): Promise<MenuItem> {
    const itemIndex = menuItems.findIndex((i) => i.id === menuItemId);
    if (itemIndex === -1) {
      throw new Error(`Menu item not found: ${menuItemId}`);
    }

    const ingredients = menuItemIngredients.filter(
      (ing) => ing.menuItemId === menuItemId
    );

    // Aggregate allergens (any TRUE means item contains it)
    const aggregatedAllergens: Record<string, boolean> = {};
    const aggregatedIntolerances: Record<string, boolean> = {};

    for (const ing of ingredients) {
      // Merge allergens
      for (const [key, value] of Object.entries(ing.allergens)) {
        if (value === true) {
          aggregatedAllergens[key] = true;
        }
      }
      // Merge intolerances
      for (const [key, value] of Object.entries(ing.intolerances)) {
        if (value === true) {
          aggregatedIntolerances[key] = true;
        }
      }
    }

    // Update menu item
    menuItems[itemIndex] = {
      ...menuItems[itemIndex],
      allergens: aggregatedAllergens,
      intolerances: aggregatedIntolerances,
      safetyDataSource: 'computed',
      updatedAt: new Date().toISOString(),
    };

    return menuItems[itemIndex];
  }

  // ==========================================================================
  // FULL MENU (for PWA)
  // ==========================================================================

  async getFullMenu(merchantSlug: string): Promise<MerchantMenuView | null> {
    // In real implementation, this would query by slug
    if (merchantSlug !== demoMerchant.slug) {
      return null;
    }

    const merchantCategories = categories
      .filter((c) => c.merchantId === demoMerchant.id && c.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);

    const categoriesWithItems: MenuCategoryWithItems[] = merchantCategories.map(
      (category) => {
        const categoryItems = menuItems
          .filter(
            (item) =>
              item.categoryId === category.id &&
              item.isActive &&
              item.isAvailable
          )
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((item) => ({
            id: item.id,
            slug: item.slug,
            name: item.name,
            description: item.description,
            price: item.price,
            imageUrl: item.imageUrl,
            allergens: item.allergens,
            intolerances: item.intolerances,
            dietaryFlags: item.dietaryFlags,
            spiceLevel: item.spiceLevel,
            customizations: item.customizations,
            isFeatured: item.isFeatured,
            isNew: item.isNew,
            displayOrder: item.displayOrder,
          }));

        return {
          id: category.id,
          slug: category.slug,
          name: category.name,
          icon: category.icon,
          displayOrder: category.displayOrder,
          items: categoryItems,
        };
      }
    );

    return {
      merchantSlug: demoMerchant.slug,
      merchantName: demoMerchant.name,
      logoUrl: demoMerchant.logoUrl,
      primaryColor: demoMerchant.primaryColor,
      currency: demoMerchant.currency,
      defaultLanguage: demoMerchant.defaultLanguage,
      supportedLanguages: demoMerchant.supportedLanguages,
      wifiEnabled: demoMerchant.wifiEnabled,
      wifiSsid: demoMerchant.wifiSsid,
      categories: categoriesWithItems,
    };
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const mockMenuRepository = new MockMenuRepository();

// ============================================================================
// RESET FUNCTION (for testing)
// ============================================================================

export const resetMockData = (): void => {
  categories = JSON.parse(JSON.stringify(demoCategories));
  menuItems = JSON.parse(JSON.stringify(demoMenuItems));
  menuItemIngredients = JSON.parse(JSON.stringify(demoMenuItemIngredients));
};
