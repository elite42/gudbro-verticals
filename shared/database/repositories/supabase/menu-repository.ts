/**
 * Supabase Menu Repository
 *
 * Implementation of IMenuRepository using Supabase as the backend.
 * Provides full CRUD operations for menu management.
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
  MultiLangText,
  AllergenFlags,
  IntoleranceFlags,
  DietaryFlags,
  ProductCustomization,
} from '../../types';

import { getSupabaseClient } from './client';
import type { Database } from './database.types';

type Json = Database['public']['Tables']['menu_items']['Row']['allergens'];

// ============================================================================
// TYPE HELPERS
// ============================================================================

/**
 * Convert JSON from database to typed object
 */
function parseJson<T>(json: Json | null, defaultValue: T): T {
  if (!json) return defaultValue;
  return json as T;
}

/**
 * Convert database row to MenuCategory
 */
function toMenuCategory(
  row: Database['public']['Tables']['menu_categories']['Row']
): MenuCategory {
  return {
    id: row.id,
    merchantId: row.merchant_id,
    slug: row.slug,
    name: parseJson<MultiLangText>(row.name_multilang, { en: '' }),
    description: parseJson<MultiLangText | undefined>(
      row.description_multilang,
      undefined
    ),
    icon: row.icon ?? undefined,
    imageUrl: row.image_url ?? undefined,
    displayOrder: row.display_order,
    isActive: row.is_active,
    visibleFrom: row.available_from ?? undefined,
    visibleTo: row.available_until ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Convert database row to MenuItem
 */
function toMenuItem(
  row: Database['public']['Tables']['menu_items']['Row']
): MenuItem {
  return {
    id: row.id,
    merchantId: row.merchant_id,
    categoryId: row.category_id,
    slug: row.slug,
    name: parseJson<MultiLangText>(row.name_multilang, { en: '' }),
    description: parseJson<MultiLangText | undefined>(
      row.description_multilang,
      undefined
    ),
    price: row.price,
    compareAtPrice: row.compare_at_price ?? undefined,
    currency: 'VND', // Default, should come from merchant
    imageUrl: row.image_url ?? undefined,
    galleryUrls: row.gallery_urls,
    allergens: parseJson<AllergenFlags>(row.allergens, {}),
    intolerances: parseJson<IntoleranceFlags>(row.intolerances, {}),
    dietaryFlags: parseJson<DietaryFlags>(row.dietary_flags, {}),
    spiceLevel: row.spice_level as 0 | 1 | 2 | 3 | 4,
    safetyDataSource: 'manual',
    calories: row.calories ?? undefined,
    nutritionInfo: row.protein_g
      ? {
          protein: row.protein_g,
          carbohydrates: row.carbs_g ?? undefined,
          fat: row.fat_g ?? undefined,
          fiber: row.fiber_g ?? undefined,
          calories: row.calories ?? undefined,
        }
      : undefined,
    customizations: parseJson<ProductCustomization[]>(row.customizations, []),
    trackInventory: false,
    lowStockThreshold: 10,
    isAvailable: row.is_active,
    isActive: row.is_active,
    isFeatured: row.is_featured,
    isNew: row.is_new,
    availableFrom: row.available_from ?? undefined,
    availableTo: row.available_until ?? undefined,
    displayOrder: row.display_order,
    tags: row.tags,
    totalOrders: 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Convert MenuItem to MenuItemSummary
 */
function toMenuItemSummary(item: MenuItem): MenuItemSummary {
  return {
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
  };
}

// ============================================================================
// SUPABASE MENU REPOSITORY
// ============================================================================

export class SupabaseMenuRepository implements IMenuRepository {
  // ==========================================================================
  // CATEGORIES
  // ==========================================================================

  async listCategories(merchantId: string): Promise<MenuCategory[]> {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('menu_categories')
      .select('*')
      .eq('merchant_id', merchantId)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      throw new Error(`Failed to list categories: ${error.message}`);
    }

    return (data ?? []).map(toMenuCategory);
  }

  async getCategory(id: string): Promise<MenuCategory | null> {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('menu_categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw new Error(`Failed to get category: ${error.message}`);
    }

    return toMenuCategory(data);
  }

  async createCategory(input: CreateMenuCategoryInput): Promise<MenuCategory> {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('menu_categories')
      .insert({
        merchant_id: input.merchantId,
        slug: input.slug,
        name_multilang: input.name as Json,
        description_multilang: input.description as Json,
        icon: input.icon,
        image_url: input.imageUrl,
        display_order: input.displayOrder ?? 0,
        is_active: input.isActive ?? true,
        available_from: input.visibleFrom,
        available_until: input.visibleTo,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }

    return toMenuCategory(data);
  }

  async updateCategory(
    id: string,
    input: UpdateMenuCategoryInput
  ): Promise<MenuCategory> {
    const supabase = getSupabaseClient();

    const updateData: Record<string, unknown> = {};

    if (input.slug !== undefined) updateData.slug = input.slug;
    if (input.name !== undefined) updateData.name_multilang = input.name;
    if (input.description !== undefined)
      updateData.description_multilang = input.description;
    if (input.icon !== undefined) updateData.icon = input.icon;
    if (input.imageUrl !== undefined) updateData.image_url = input.imageUrl;
    if (input.displayOrder !== undefined)
      updateData.display_order = input.displayOrder;
    if (input.isActive !== undefined) updateData.is_active = input.isActive;
    if (input.visibleFrom !== undefined)
      updateData.available_from = input.visibleFrom;
    if (input.visibleTo !== undefined)
      updateData.available_until = input.visibleTo;

    const { data, error } = await supabase
      .from('menu_categories')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }

    return toMenuCategory(data);
  }

  async deleteCategory(id: string): Promise<void> {
    const supabase = getSupabaseClient();

    const { error } = await supabase
      .from('menu_categories')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }

  async reorderCategories(
    merchantId: string,
    categoryIds: string[]
  ): Promise<void> {
    const supabase = getSupabaseClient();

    // Update each category's display_order
    const updates = categoryIds.map((id, index) =>
      supabase
        .from('menu_categories')
        .update({ display_order: index })
        .eq('id', id)
        .eq('merchant_id', merchantId)
    );

    await Promise.all(updates);
  }

  // ==========================================================================
  // MENU ITEMS
  // ==========================================================================

  async listItems(
    merchantId: string,
    options?: MenuFilterOptions
  ): Promise<FilteredMenuResult> {
    const supabase = getSupabaseClient();

    let query = supabase
      .from('menu_items')
      .select('*', { count: 'exact' })
      .eq('merchant_id', merchantId);

    // Apply filters
    if (options?.categoryId) {
      query = query.eq('category_id', options.categoryId);
    }

    if (options?.availableOnly) {
      query = query.eq('is_active', true);
    }

    if (options?.featuredOnly) {
      query = query.eq('is_featured', true);
    }

    if (options?.newOnly) {
      query = query.eq('is_new', true);
    }

    if (options?.minPrice !== undefined) {
      query = query.gte('price', options.minPrice);
    }

    if (options?.maxPrice !== undefined) {
      query = query.lte('price', options.maxPrice);
    }

    // Sorting
    const sortBy = options?.sortBy ?? 'displayOrder';
    const sortOrder = options?.sortOrder === 'desc' ? false : true;

    switch (sortBy) {
      case 'price':
        query = query.order('price', { ascending: sortOrder });
        break;
      case 'name':
        // Note: Sorting by JSONB field is complex, defaulting to display_order
        query = query.order('display_order', { ascending: sortOrder });
        break;
      default:
        query = query.order('display_order', { ascending: sortOrder });
    }

    // Pagination
    const limit = options?.limit ?? 50;
    const offset = options?.offset ?? 0;
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Failed to list items: ${error.message}`);
    }

    let items = (data ?? []).map(toMenuItem);

    // Apply dietary filters (must be done in JS for complex JSONB queries)
    if (options?.dietary) {
      const { excludeAllergens, excludeIntolerances, requiredDiets, maxSpiceLevel } =
        options.dietary;

      if (excludeAllergens?.length) {
        items = items.filter((item) =>
          !excludeAllergens.some((a) => item.allergens[a])
        );
      }

      if (excludeIntolerances?.length) {
        items = items.filter((item) =>
          !excludeIntolerances.some((i) => item.intolerances[i])
        );
      }

      if (requiredDiets?.length) {
        items = items.filter((item) =>
          requiredDiets.every((d) => item.dietaryFlags[d])
        );
      }

      if (maxSpiceLevel !== undefined) {
        items = items.filter((item) => item.spiceLevel <= maxSpiceLevel);
      }
    }

    // Apply search filter (must be done in JS for multilingual search)
    if (options?.searchQuery) {
      const query = options.searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.en?.toLowerCase().includes(query) ||
          item.name.vi?.toLowerCase().includes(query) ||
          item.description?.en?.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return {
      items: items.map(toMenuItemSummary),
      total: count ?? items.length,
      hasMore: offset + limit < (count ?? items.length),
      appliedFilters: options ?? {},
    };
  }

  async getItem(id: string): Promise<MenuItemFullView | null> {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('menu_items')
      .select(
        `
        *,
        category:menu_categories(*),
        merchant:merchants(slug, name, currency, default_language)
      `
      )
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Failed to get item: ${error.message}`);
    }

    const item = toMenuItem(data);

    // Get ingredients
    const { data: ingredientData } = await supabase
      .from('menu_item_ingredients')
      .select('*')
      .eq('menu_item_id', id)
      .order('display_order');

    const ingredients: MenuItemIngredient[] = (ingredientData ?? []).map(
      (ing) => ({
        id: ing.id,
        menuItemId: ing.menu_item_id,
        masterIngredientId: ing.ingredient_id,
        quantity: ing.quantity_grams,
        unit: 'g',
        allergens: {},
        intolerances: {},
        dietaryFlags: {},
        isOptional: ing.is_optional,
        displayOrder: ing.display_order,
        createdAt: ing.created_at,
      })
    );

    return {
      ...item,
      category: data.category ? toMenuCategory(data.category) : undefined,
      merchant: data.merchant
        ? {
            slug: data.merchant.slug,
            name: data.merchant.name,
            currency: data.merchant.currency,
            defaultLanguage: data.merchant.default_language,
          }
        : undefined,
      ingredients,
    };
  }

  async getItemBySlug(
    merchantId: string,
    slug: string
  ): Promise<MenuItemFullView | null> {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('menu_items')
      .select('id')
      .eq('merchant_id', merchantId)
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Failed to get item by slug: ${error.message}`);
    }

    return this.getItem(data.id);
  }

  async createItem(input: CreateMenuItemInput): Promise<MenuItem> {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('menu_items')
      .insert({
        merchant_id: input.merchantId,
        category_id: input.categoryId ?? '',
        slug: input.slug,
        name_multilang: input.name as Json,
        description_multilang: input.description as Json,
        price: input.price,
        compare_at_price: input.compareAtPrice,
        image_url: input.imageUrl,
        gallery_urls: input.galleryUrls ?? [],
        allergens: (input.allergens ?? {}) as Json,
        intolerances: (input.intolerances ?? {}) as Json,
        dietary_flags: (input.dietaryFlags ?? {}) as Json,
        spice_level: input.spiceLevel ?? 0,
        calories: input.calories,
        protein_g: input.nutritionInfo?.protein,
        carbs_g: input.nutritionInfo?.carbohydrates,
        fat_g: input.nutritionInfo?.fat,
        fiber_g: input.nutritionInfo?.fiber,
        customizations: (input.customizations ?? []) as Json,
        is_featured: input.isFeatured ?? false,
        is_new: input.isNew ?? false,
        is_active: input.isActive ?? true,
        display_order: input.displayOrder ?? 0,
        available_from: input.availableFrom,
        available_until: input.availableTo,
        tags: input.tags ?? [],
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create item: ${error.message}`);
    }

    return toMenuItem(data);
  }

  async updateItem(id: string, input: UpdateMenuItemInput): Promise<MenuItem> {
    const supabase = getSupabaseClient();

    const updateData: Record<string, unknown> = {};

    if (input.categoryId !== undefined)
      updateData.category_id = input.categoryId;
    if (input.name !== undefined) updateData.name_multilang = input.name;
    if (input.description !== undefined)
      updateData.description_multilang = input.description;
    if (input.price !== undefined) updateData.price = input.price;
    if (input.compareAtPrice !== undefined)
      updateData.compare_at_price = input.compareAtPrice;
    if (input.imageUrl !== undefined) updateData.image_url = input.imageUrl;
    if (input.galleryUrls !== undefined)
      updateData.gallery_urls = input.galleryUrls;
    if (input.allergens !== undefined) updateData.allergens = input.allergens;
    if (input.intolerances !== undefined)
      updateData.intolerances = input.intolerances;
    if (input.dietaryFlags !== undefined)
      updateData.dietary_flags = input.dietaryFlags;
    if (input.spiceLevel !== undefined)
      updateData.spice_level = input.spiceLevel;
    if (input.calories !== undefined) updateData.calories = input.calories;
    if (input.nutritionInfo?.protein !== undefined)
      updateData.protein_g = input.nutritionInfo.protein;
    if (input.nutritionInfo?.carbohydrates !== undefined)
      updateData.carbs_g = input.nutritionInfo.carbohydrates;
    if (input.nutritionInfo?.fat !== undefined)
      updateData.fat_g = input.nutritionInfo.fat;
    if (input.nutritionInfo?.fiber !== undefined)
      updateData.fiber_g = input.nutritionInfo.fiber;
    if (input.customizations !== undefined)
      updateData.customizations = input.customizations;
    if (input.isFeatured !== undefined)
      updateData.is_featured = input.isFeatured;
    if (input.isNew !== undefined) updateData.is_new = input.isNew;
    if (input.isActive !== undefined) updateData.is_active = input.isActive;
    if (input.displayOrder !== undefined)
      updateData.display_order = input.displayOrder;
    if (input.tags !== undefined) updateData.tags = input.tags;

    const { data, error } = await supabase
      .from('menu_items')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update item: ${error.message}`);
    }

    return toMenuItem(data);
  }

  async deleteItem(id: string): Promise<void> {
    const supabase = getSupabaseClient();

    // First delete ingredients
    await supabase.from('menu_item_ingredients').delete().eq('menu_item_id', id);

    // Then delete the item
    const { error } = await supabase.from('menu_items').delete().eq('id', id);

    if (error) {
      throw new Error(`Failed to delete item: ${error.message}`);
    }
  }

  async reorderItems(categoryId: string, itemIds: string[]): Promise<void> {
    const supabase = getSupabaseClient();

    const updates = itemIds.map((id, index) =>
      supabase
        .from('menu_items')
        .update({ display_order: index })
        .eq('id', id)
        .eq('category_id', categoryId)
    );

    await Promise.all(updates);
  }

  // ==========================================================================
  // ITEM INGREDIENTS
  // ==========================================================================

  async listItemIngredients(menuItemId: string): Promise<MenuItemIngredient[]> {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('menu_item_ingredients')
      .select('*, ingredient:ingredients(*)')
      .eq('menu_item_id', menuItemId)
      .order('display_order');

    if (error) {
      throw new Error(`Failed to list ingredients: ${error.message}`);
    }

    return (data ?? []).map((ing) => ({
      id: ing.id,
      menuItemId: ing.menu_item_id,
      masterIngredientId: ing.ingredient_id,
      ingredientName: ing.ingredient
        ? parseJson<MultiLangText>(ing.ingredient.name_multilang, { en: '' })
        : undefined,
      quantity: ing.quantity_grams,
      unit: 'g',
      allergens: ing.ingredient
        ? parseJson<AllergenFlags>(ing.ingredient.allergens, {})
        : {},
      intolerances: ing.ingredient
        ? parseJson<IntoleranceFlags>(ing.ingredient.intolerances, {})
        : {},
      dietaryFlags: ing.ingredient
        ? parseJson<DietaryFlags>(ing.ingredient.dietary_flags, {})
        : {},
      isOptional: ing.is_optional,
      displayOrder: ing.display_order,
      createdAt: ing.created_at,
    }));
  }

  async addItemIngredient(
    input: CreateMenuItemIngredientInput
  ): Promise<MenuItemIngredient> {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('menu_item_ingredients')
      .insert({
        menu_item_id: input.menuItemId,
        ingredient_id: input.masterIngredientId ?? '',
        quantity_grams: input.quantity ?? 0,
        is_optional: input.isOptional ?? false,
        display_order: input.displayOrder ?? 0,
      })
      .select('*, ingredient:ingredients(*)')
      .single();

    if (error) {
      throw new Error(`Failed to add ingredient: ${error.message}`);
    }

    // Trigger recomputation
    await this.recomputeItemSafety(input.menuItemId);

    return {
      id: data.id,
      menuItemId: data.menu_item_id,
      masterIngredientId: data.ingredient_id,
      ingredientName: data.ingredient
        ? parseJson<MultiLangText>(data.ingredient.name_multilang, { en: '' })
        : undefined,
      quantity: data.quantity_grams,
      unit: 'g',
      allergens: data.ingredient
        ? parseJson<AllergenFlags>(data.ingredient.allergens, {})
        : {},
      intolerances: data.ingredient
        ? parseJson<IntoleranceFlags>(data.ingredient.intolerances, {})
        : {},
      dietaryFlags: data.ingredient
        ? parseJson<DietaryFlags>(data.ingredient.dietary_flags, {})
        : {},
      isOptional: data.is_optional,
      displayOrder: data.display_order,
      createdAt: data.created_at,
    };
  }

  async removeItemIngredient(id: string): Promise<void> {
    const supabase = getSupabaseClient();

    // Get the menu_item_id first
    const { data: ingredient } = await supabase
      .from('menu_item_ingredients')
      .select('menu_item_id')
      .eq('id', id)
      .single();

    const { error } = await supabase
      .from('menu_item_ingredients')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to remove ingredient: ${error.message}`);
    }

    // Trigger recomputation
    if (ingredient) {
      await this.recomputeItemSafety(ingredient.menu_item_id);
    }
  }

  async recomputeItemSafety(menuItemId: string): Promise<MenuItem> {
    const supabase = getSupabaseClient();

    // Call the PostgreSQL function to recompute safety data
    const { error: fnError } = await supabase.rpc('compute_menu_item_safety', {
      p_item_id: menuItemId,
    });

    if (fnError) {
      console.warn('compute_menu_item_safety function not available:', fnError);
      // Fallback: do manual computation
    }

    // Fetch and return the updated item
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('id', menuItemId)
      .single();

    if (error) {
      throw new Error(`Failed to get recomputed item: ${error.message}`);
    }

    return toMenuItem(data);
  }

  // ==========================================================================
  // FULL MENU (for PWA)
  // ==========================================================================

  async getFullMenu(merchantSlug: string): Promise<MerchantMenuView | null> {
    const supabase = getSupabaseClient();

    // Get merchant
    const { data: merchant, error: merchantError } = await supabase
      .from('merchants')
      .select('*')
      .eq('slug', merchantSlug)
      .single();

    if (merchantError || !merchant) {
      return null;
    }

    // Get categories
    const { data: categories } = await supabase
      .from('menu_categories')
      .select('*')
      .eq('merchant_id', merchant.id)
      .eq('is_active', true)
      .order('display_order');

    // Get all active items
    const { data: items } = await supabase
      .from('menu_items')
      .select('*')
      .eq('merchant_id', merchant.id)
      .eq('is_active', true)
      .order('display_order');

    // Build categories with items
    const categoriesWithItems: MenuCategoryWithItems[] = (categories ?? []).map(
      (cat) => {
        const categoryItems = (items ?? [])
          .filter((item) => item.category_id === cat.id)
          .map((item) => toMenuItemSummary(toMenuItem(item)));

        return {
          id: cat.id,
          slug: cat.slug,
          name: parseJson<MultiLangText>(cat.name_multilang, { en: '' }),
          icon: cat.icon ?? undefined,
          displayOrder: cat.display_order,
          items: categoryItems,
        };
      }
    );

    return {
      merchantSlug: merchant.slug,
      merchantName: merchant.name,
      logoUrl: merchant.logo_url ?? undefined,
      primaryColor: merchant.primary_color,
      currency: merchant.currency,
      defaultLanguage: merchant.default_language,
      supportedLanguages: merchant.supported_languages,
      wifiEnabled: merchant.wifi_enabled,
      wifiSsid: merchant.wifi_ssid ?? undefined,
      categories: categoriesWithItems,
    };
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const supabaseMenuRepository = new SupabaseMenuRepository();
