/**
 * Modifier Service
 *
 * Fetches modifier groups from Supabase database and converts them
 * to the ProductCustomization format used by the frontend.
 *
 * This bridges the gap between:
 * - Database: modifier_groups + modifiers + category_modifier_groups
 * - Frontend: ProductCustomization[] used by DynamicCustomizationRenderer
 */

import { supabase, isSupabaseConfigured } from './supabase';
import type {
  ProductCustomization,
  CustomizationOption,
  MultiLangText,
  CustomizationType,
} from '@/database/_system/types';

// ============================================================================
// DATABASE TYPES (from Supabase)
// ============================================================================

interface DBModifierGroup {
  id: string;
  merchant_id: string;
  slug: string;
  name_multilang: { en?: string; it?: string; vi?: string };
  description_multilang?: { en?: string; it?: string; vi?: string };
  selection_type: 'single' | 'multiple';
  is_required: boolean;
  min_selections: number;
  max_selections: number;
  display_order: number;
  is_active: boolean;
}

interface DBModifier {
  id: string;
  group_id: string;
  slug: string;
  name_multilang: { en?: string; it?: string; vi?: string };
  description_multilang?: { en?: string; it?: string; vi?: string };
  price_adjustment: number;
  price_type: 'fixed' | 'percentage' | 'replace';
  calories?: number;
  is_default: boolean;
  is_available: boolean;
  display_order: number;
}

interface DBCategoryModifierGroup {
  id: string;
  category_id: string;
  modifier_group_id: string;
  display_order: number;
  is_visible: boolean;
  // Supabase returns joined table as array
  modifier_group?: DBModifierGroup | DBModifierGroup[];
}

// ============================================================================
// CACHE
// ============================================================================

// Simple in-memory cache for modifier groups
const modifierCache: {
  byCategory: Map<string, ProductCustomization[]>;
  lastFetch: Map<string, number>;
} = {
  byCategory: new Map(),
  lastFetch: new Map(),
};

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

// ============================================================================
// CONVERTERS
// ============================================================================

/**
 * Convert database modifier to frontend CustomizationOption
 */
function convertModifierToOption(modifier: DBModifier): CustomizationOption {
  return {
    id: modifier.slug || modifier.id,
    name: {
      en: modifier.name_multilang?.en || modifier.slug || 'Unknown',
      it: modifier.name_multilang?.it || modifier.name_multilang?.en || modifier.slug || 'Unknown',
      vi: modifier.name_multilang?.vi || modifier.name_multilang?.en || modifier.slug || 'Unknown',
    } as MultiLangText,
    price_modifier: modifier.price_adjustment || 0,
    is_default: modifier.is_default || false,
    description: modifier.description_multilang
      ? ({
          en: modifier.description_multilang.en || '',
          it: modifier.description_multilang.it || '',
          vi: modifier.description_multilang.vi || '',
        } as MultiLangText)
      : undefined,
    available: modifier.is_available !== false,
  };
}

/**
 * Convert database modifier group to frontend ProductCustomization
 */
function convertGroupToCustomization(
  group: DBModifierGroup,
  modifiers: DBModifier[]
): ProductCustomization {
  // Map selection_type to CustomizationType
  const type: CustomizationType = group.selection_type === 'single' ? 'radio' : 'checkbox';

  // Sort modifiers by display_order
  const sortedModifiers = [...modifiers].sort(
    (a, b) => (a.display_order || 0) - (b.display_order || 0)
  );

  return {
    id: group.slug || group.id,
    type,
    name: {
      en: group.name_multilang?.en || group.slug || 'Options',
      it: group.name_multilang?.it || group.name_multilang?.en || group.slug || 'Opzioni',
      vi: group.name_multilang?.vi || group.name_multilang?.en || group.slug || 'Options',
    } as MultiLangText,
    description: group.description_multilang
      ? ({
          en: group.description_multilang.en || '',
          it: group.description_multilang.it || '',
          vi: group.description_multilang.vi || '',
        } as MultiLangText)
      : undefined,
    required: group.is_required || false,
    min_selections: type === 'checkbox' ? group.min_selections || 0 : undefined,
    max_selections: type === 'checkbox' ? group.max_selections || undefined : undefined,
    options: sortedModifiers.filter((m) => m.is_available !== false).map(convertModifierToOption),
    display_order: group.display_order || 0,
    display_style: 'list',
  };
}

// ============================================================================
// FETCH FUNCTIONS
// ============================================================================

/**
 * Fetch all modifier groups with their modifiers for a specific category
 */
export async function getModifiersForCategory(categoryId: string): Promise<ProductCustomization[]> {
  // Check cache first
  const cached = modifierCache.byCategory.get(categoryId);
  const lastFetch = modifierCache.lastFetch.get(categoryId);

  if (cached && lastFetch && Date.now() - lastFetch < CACHE_TTL_MS) {
    return cached;
  }

  if (!isSupabaseConfigured || !supabase) {
    console.warn('[ModifierService] Supabase not configured');
    return [];
  }

  try {
    // Step 1: Get category-modifier-group links for this category
    const { data: categoryLinks, error: linksError } = await supabase
      .from('category_modifier_groups')
      .select(
        `
        id,
        category_id,
        modifier_group_id,
        display_order,
        is_visible,
        modifier_group:modifier_groups(
          id,
          merchant_id,
          slug,
          name_multilang,
          description_multilang,
          selection_type,
          is_required,
          min_selections,
          max_selections,
          display_order,
          is_active
        )
      `
      )
      .eq('category_id', categoryId)
      .eq('is_visible', true)
      .order('display_order');

    if (linksError) {
      console.error('[ModifierService] Error fetching category links:', linksError);
      return [];
    }

    if (!categoryLinks || categoryLinks.length === 0) {
      modifierCache.byCategory.set(categoryId, []);
      modifierCache.lastFetch.set(categoryId, Date.now());
      return [];
    }

    // Step 2: Get all modifier group IDs
    const groupIds = categoryLinks
      .map((link: DBCategoryModifierGroup) => link.modifier_group_id)
      .filter(Boolean);

    if (groupIds.length === 0) {
      return [];
    }

    // Step 3: Fetch all modifiers for these groups
    const { data: modifiers, error: modifiersError } = await supabase
      .from('modifiers')
      .select('*')
      .in('group_id', groupIds)
      .eq('is_available', true)
      .order('display_order');

    if (modifiersError) {
      console.error('[ModifierService] Error fetching modifiers:', modifiersError);
      return [];
    }

    // Step 4: Group modifiers by group_id
    const modifiersByGroup: Record<string, DBModifier[]> = {};
    (modifiers || []).forEach((modifier: DBModifier) => {
      if (!modifiersByGroup[modifier.group_id]) {
        modifiersByGroup[modifier.group_id] = [];
      }
      modifiersByGroup[modifier.group_id].push(modifier);
    });

    // Step 5: Convert to ProductCustomization format
    // Helper to get single group from array or object (Supabase returns array for joins)
    const getGroup = (link: DBCategoryModifierGroup): DBModifierGroup | undefined => {
      const mg = link.modifier_group;
      if (!mg) return undefined;
      return Array.isArray(mg) ? mg[0] : mg;
    };

    const customizations: ProductCustomization[] = categoryLinks
      .filter((link: DBCategoryModifierGroup) => {
        const group = getGroup(link);
        return group && group.is_active;
      })
      .map((link: DBCategoryModifierGroup) => {
        const group = getGroup(link)!;
        const groupModifiers = modifiersByGroup[group.id] || [];
        return convertGroupToCustomization(group, groupModifiers);
      })
      .filter((c: ProductCustomization) => c.options.length > 0); // Only include groups with options

    // Cache the result
    modifierCache.byCategory.set(categoryId, customizations);
    modifierCache.lastFetch.set(categoryId, Date.now());

    return customizations;
  } catch (error) {
    console.error('[ModifierService] Unexpected error:', error);
    return [];
  }
}

/**
 * Fetch all modifier groups (useful for products without category)
 */
export async function getAllModifierGroups(): Promise<ProductCustomization[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  try {
    // Fetch all active modifier groups
    const { data: groups, error: groupsError } = await supabase
      .from('modifier_groups')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (groupsError || !groups) {
      console.error('[ModifierService] Error fetching all groups:', groupsError);
      return [];
    }

    // Fetch all modifiers
    const { data: modifiers, error: modifiersError } = await supabase
      .from('modifiers')
      .select('*')
      .eq('is_available', true)
      .order('display_order');

    if (modifiersError) {
      console.error('[ModifierService] Error fetching all modifiers:', modifiersError);
      return [];
    }

    // Group modifiers by group_id
    const modifiersByGroup: Record<string, DBModifier[]> = {};
    (modifiers || []).forEach((modifier: DBModifier) => {
      if (!modifiersByGroup[modifier.group_id]) {
        modifiersByGroup[modifier.group_id] = [];
      }
      modifiersByGroup[modifier.group_id].push(modifier);
    });

    // Convert to ProductCustomization format
    return groups
      .map((group: DBModifierGroup) => {
        const groupModifiers = modifiersByGroup[group.id] || [];
        return convertGroupToCustomization(group, groupModifiers);
      })
      .filter((c: ProductCustomization) => c.options.length > 0);
  } catch (error) {
    console.error('[ModifierService] Unexpected error:', error);
    return [];
  }
}

/**
 * Clear the modifier cache (useful after updates)
 */
export function clearModifierCache(): void {
  modifierCache.byCategory.clear();
  modifierCache.lastFetch.clear();
}

/**
 * Get modifiers for a specific product
 * First checks product-specific overrides, then falls back to category modifiers
 */
export async function getModifiersForProduct(
  productId: string,
  categoryId?: string
): Promise<ProductCustomization[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  try {
    // Step 1: Check for product-specific modifier overrides
    const { data: overrides, error: overridesError } = await supabase
      .from('menu_item_modifier_overrides')
      .select('*')
      .eq('menu_item_id', productId);

    if (overridesError) {
      console.error('[ModifierService] Error fetching overrides:', overridesError);
    }

    // Step 2: Get base modifiers from category
    let baseModifiers: ProductCustomization[] = [];
    if (categoryId) {
      baseModifiers = await getModifiersForCategory(categoryId);
    }

    // Step 3: Apply overrides if any
    if (overrides && overrides.length > 0) {
      // For now, we handle simple override cases
      // Full override logic can be expanded later
      const overrideMap = new Map(overrides.map((o) => [o.modifier_group_id, o]));

      baseModifiers = baseModifiers
        .map((customization) => {
          // Find if there's an override for this group
          // Match by slug since we convert group.id to slug
          const override = Array.from(overrideMap.values()).find(
            (o) => o.modifier_group_id === customization.id
          );

          if (override) {
            // Apply override settings
            return {
              ...customization,
              // Override availability if explicitly set
              options: override.is_available === false ? [] : customization.options,
            };
          }

          return customization;
        })
        .filter((c) => c.options.length > 0);
    }

    return baseModifiers;
  } catch (error) {
    console.error('[ModifierService] Unexpected error:', error);
    return categoryId ? getModifiersForCategory(categoryId) : [];
  }
}
