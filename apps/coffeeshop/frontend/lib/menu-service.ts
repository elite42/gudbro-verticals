/**
 * Menu Service
 *
 * Fetches menu data from Supabase with fallback to local JSON files.
 * This enables:
 * - Real-time menu updates from backoffice
 * - Offline support via JSON fallback
 * - Multi-language support via name_multilang fields
 */

import { supabase, isSupabaseConfigured } from './supabase';
import { TEMPERATURE_ICONS } from '@/data/categories';

// Import local JSON as fallback
import coffeeHouseProducts from '@/data/coffee-house-products.json';

// Types matching Supabase schema
export interface MultiLangText {
  en?: string;
  vi?: string;
  it?: string;
  ko?: string;
  ja?: string;
  [key: string]: string | undefined;
}

export interface SupabaseMenuItem {
  id: string;
  slug: string;
  name_multilang: MultiLangText;
  description_multilang: MultiLangText | null;
  price: number;
  currency: string;
  category_id: string;
  image_url: string | null;
  is_available: boolean;
  is_active: boolean;
  is_featured: boolean;
  is_new: boolean;
  allergens: Record<string, boolean> | null;
  intolerances: Record<string, boolean> | null;
  dietary_flags: Record<string, boolean> | null;
  spice_level: number;
  display_order: number;
  // Extended fields (may not exist yet)
  temperature?: string;
  subcategory?: string;
  calories?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  prep_time?: number;
  recipe_id?: string;
}

export interface SupabaseCategory {
  id: string;
  slug: string;
  name_multilang: MultiLangText;
  description_multilang?: MultiLangText | null;
  icon: string | null;
  display_order: number;
  is_active: boolean;
  menu_type?: string;
  temperature?: string;
}

// Normalized product for PWA (matches DishItem interface)
export interface NormalizedProduct {
  id: string;
  slug?: string;
  name: string;
  nameMulti?: MultiLangText;
  description: string;
  descriptionMulti?: MultiLangText;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
  temperature?: string;
  temperatureIcon?: string;
  isNew: boolean;
  isVisible: boolean;
  isFeatured?: boolean;
  allergens: string[];
  intolerances: string[];
  dietary: string[];
  spiceLevel?: number;
  calories?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  prepTime?: number;
  recipeId?: string;
  sortOrder?: number;
  // Source tracking
  _source: 'supabase' | 'json';
}

/**
 * Convert JSONB flags object to string array
 * { gluten: true, dairy: false } -> ['gluten']
 */
function flagsToArray(flags: Record<string, boolean> | null | undefined): string[] {
  if (!flags) return [];
  return Object.entries(flags)
    .filter(([_, value]) => value === true)
    .map(([key]) => key);
}

/**
 * Get localized text from multilang object
 */
function getLocalizedText(
  multilang: MultiLangText | null | undefined,
  fallback: string,
  lang: string = 'en'
): string {
  if (!multilang) return fallback;
  return multilang[lang] || multilang.en || fallback;
}

/**
 * Transform Supabase menu item to normalized product
 */
function transformSupabaseItem(item: SupabaseMenuItem, lang: string = 'en'): NormalizedProduct {
  return {
    id: item.slug || item.id,
    slug: item.slug,
    name: getLocalizedText(item.name_multilang, item.slug, lang),
    nameMulti: item.name_multilang,
    description: getLocalizedText(item.description_multilang, '', lang),
    descriptionMulti: item.description_multilang || undefined,
    price: item.price,
    image: item.image_url || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    category: item.category_id,
    subcategory: item.subcategory,
    temperature: item.temperature,
    temperatureIcon: item.temperature === 'hot' ? TEMPERATURE_ICONS.hot : TEMPERATURE_ICONS.iced,
    isNew: item.is_new,
    isVisible: item.is_available && item.is_active,
    isFeatured: item.is_featured,
    allergens: flagsToArray(item.allergens),
    intolerances: flagsToArray(item.intolerances),
    dietary: flagsToArray(item.dietary_flags),
    spiceLevel: item.spice_level,
    calories: item.calories,
    protein_g: item.protein_g,
    carbs_g: item.carbs_g,
    fat_g: item.fat_g,
    prepTime: item.prep_time,
    recipeId: item.recipe_id,
    sortOrder: item.display_order,
    _source: 'supabase',
  };
}

/**
 * Transform local JSON product to normalized product
 */
function transformJsonItem(item: any, lang: string = 'en'): NormalizedProduct {
  const name = typeof item.name === 'object' ? item.name : { en: item.name };
  const description = typeof item.description === 'object' ? item.description : { en: item.description };

  return {
    id: item.id,
    slug: item.id,
    name: getLocalizedText(name, item.id, lang),
    nameMulti: name,
    description: getLocalizedText(description, '', lang),
    descriptionMulti: description,
    price: item.price,
    image: item.image || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    category: item.category,
    subcategory: item.subcategory,
    temperature: item.temperature,
    temperatureIcon: item.temperature === 'hot' ? TEMPERATURE_ICONS.hot : TEMPERATURE_ICONS.iced,
    isNew: item.isNew || false,
    isVisible: item.isVisible !== false,
    isFeatured: item.isFeatured || false,
    allergens: item.allergens || [],
    intolerances: item.intolerances || [],
    dietary: item.dietary || [],
    spiceLevel: item.spiceLevel,
    calories: item.calories,
    protein_g: item.protein_g,
    carbs_g: item.carbs_g,
    fat_g: item.fat_g,
    prepTime: item.prepTime,
    recipeId: item.recipeId,
    sortOrder: item.sortOrder,
    _source: 'json',
  };
}

/**
 * Fetch menu items from Supabase
 * Returns null if Supabase is not configured or query fails
 */
async function fetchFromSupabase(): Promise<SupabaseMenuItem[] | null> {
  if (!isSupabaseConfigured || !supabase) {
    console.log('[MenuService] Supabase not configured, using JSON fallback');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (error) {
      console.error('[MenuService] Supabase query error:', error.message);
      return null;
    }

    if (!data || data.length === 0) {
      console.log('[MenuService] No items in Supabase, using JSON fallback');
      return null;
    }

    console.log(`[MenuService] Loaded ${data.length} items from Supabase`);
    return data as SupabaseMenuItem[];
  } catch (err) {
    console.error('[MenuService] Supabase fetch failed:', err);
    return null;
  }
}

/**
 * Get menu products with automatic Supabase/JSON fallback
 */
export async function getMenuProducts(lang: string = 'en'): Promise<NormalizedProduct[]> {
  // Try Supabase first
  const supabaseItems = await fetchFromSupabase();

  if (supabaseItems && supabaseItems.length > 0) {
    return supabaseItems
      .filter(item => item.is_available && item.is_active)
      .map(item => transformSupabaseItem(item, lang));
  }

  // Fallback to JSON
  console.log(`[MenuService] Using JSON fallback (${coffeeHouseProducts.length} items)`);
  return (coffeeHouseProducts as any[])
    .filter(item => item.isVisible !== false)
    .map(item => transformJsonItem(item, lang));
}

/**
 * Get menu products with multilang fields intact (for client-side language switching)
 */
export async function getMenuProductsRaw(): Promise<NormalizedProduct[]> {
  // Try Supabase first
  const supabaseItems = await fetchFromSupabase();

  if (supabaseItems && supabaseItems.length > 0) {
    return supabaseItems
      .filter(item => item.is_available && item.is_active)
      .map(item => transformSupabaseItem(item, 'en'));
  }

  // Fallback to JSON
  return (coffeeHouseProducts as any[])
    .filter(item => item.isVisible !== false)
    .map(item => transformJsonItem(item, 'en'));
}

/**
 * Get menu categories from Supabase with fallback
 */
export async function getMenuCategories(lang: string = 'en'): Promise<any[]> {
  if (!isSupabaseConfigured || !supabase) {
    // Return from local categories.ts
    const { categories } = await import('@/data/categories');
    return categories;
  }

  try {
    const { data, error } = await supabase
      .from('menu_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (error || !data || data.length === 0) {
      const { categories } = await import('@/data/categories');
      return categories;
    }

    // Transform to match local category format
    return data.map((cat: SupabaseCategory) => ({
      id: cat.slug || cat.id,
      slug: cat.slug,
      name: cat.name_multilang,
      description: cat.description_multilang,
      icon: cat.icon || '📦',
      menuType: cat.menu_type || 'drinks',
      temperature: cat.temperature,
      sortOrder: cat.display_order,
      isVisible: cat.is_active,
    }));
  } catch (err) {
    console.error('[MenuService] Categories fetch failed:', err);
    const { categories } = await import('@/data/categories');
    return categories;
  }
}

/**
 * Check if menu is being served from Supabase or JSON
 */
export async function getMenuSource(): Promise<'supabase' | 'json'> {
  const items = await fetchFromSupabase();
  return items && items.length > 0 ? 'supabase' : 'json';
}

/**
 * Subscribe to menu changes (for real-time updates)
 */
export function subscribeToMenuChanges(
  onUpdate: (items: NormalizedProduct[]) => void
): () => void {
  if (!isSupabaseConfigured || !supabase) {
    console.log('[MenuService] Real-time not available (Supabase not configured)');
    return () => {};
  }

  const subscription = supabase
    .channel('menu_items_changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'menu_items' },
      async (payload) => {
        console.log('[MenuService] Menu changed:', payload.eventType);
        // Refetch all items on any change
        const items = await getMenuProductsRaw();
        onUpdate(items);
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}
