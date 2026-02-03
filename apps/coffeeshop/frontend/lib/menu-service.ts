/**
 * Menu Service v2.0
 *
 * Fetches menu data from Supabase product tables (coffee, tea, smoothies, etc.)
 * with fallback to local JSON files.
 *
 * This enables:
 * - Real-time menu updates from database
 * - Offline support via JSON fallback
 * - Multi-language support (translations coming soon)
 *
 * Data Sources:
 * - Primary: Supabase tables (coffee, tea, smoothies, milkshakes)
 * - Fallback: coffee-house-products.json
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

// Supabase Coffee/Tea table schema
export interface SupabaseCoffeeItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string; // espresso, latte, cold_brew, etc.
  style: 'hot' | 'iced'; // temperature
  caffeine_level: string;
  sweetness: string;
  main_ingredients: string[];
  ingredient_ids: string[];
  glass_type: string;
  volume_ml: number;
  prep_time_seconds: number;
  skill_level: number;
  ingredient_cost_usd: number;
  selling_price_usd: number;
  profit_margin_percent: number;
  calories_per_serving: number;
  caffeine_mg: number | null;
  sugar_g: number | null;
  protein_g: number | null;
  fat_g: number | null;
  is_vegan: boolean;
  is_dairy_free: boolean;
  is_gluten_free: boolean;
  is_sugar_free: boolean;
  default_milk: string;
  allergens: string[];
  available_milks: string[];
  available_syrups: string[];
  can_add_espresso_shot: boolean;
  can_adjust_sweetness: boolean;
  can_make_decaf: boolean;
  tags: string[];
  popularity: number;
  is_seasonal: boolean;
  is_signature: boolean;
  image_url: string | null;
  is_public: boolean;
  owner_id: string | null;
  created_at: string;
  updated_at: string;
}

// Legacy menu_items schema (kept for backward compatibility)
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
 * Map coffee category to PWA category
 * Supabase: espresso, latte, cappuccino, cold_brew, etc.
 * PWA: hot-coffee, iced-coffee
 */
function mapCoffeeCategory(category: string, style: 'hot' | 'iced'): string {
  return style === 'hot' ? 'hot-coffee' : 'iced-coffee';
}

/**
 * Map coffee subcategory for UI grouping
 */
function mapCoffeeSubcategory(category: string): string {
  const subcategoryMap: Record<string, string> = {
    espresso: 'espresso-based',
    americano: 'espresso-based',
    latte: 'milk-based',
    cappuccino: 'milk-based',
    flat_white: 'milk-based',
    mocha: 'signature',
    macchiato: 'espresso-based',
    cold_brew: 'cold-brew',
    frappe: 'blended',
    specialty: 'signature',
  };
  return subcategoryMap[category] || 'signature';
}

/**
 * Build dietary array from boolean flags
 */
function buildDietaryFlags(item: SupabaseCoffeeItem): string[] {
  const dietary: string[] = [];
  if (item.is_vegan) dietary.push('vegan');
  if (item.is_dairy_free) dietary.push('dairy-free');
  if (item.is_gluten_free) dietary.push('gluten-free');
  if (item.is_sugar_free) dietary.push('sugar-free');
  return dietary;
}

/**
 * Build intolerances array from coffee data
 */
function buildIntolerances(item: SupabaseCoffeeItem): string[] {
  const intolerances: string[] = [];
  if (item.caffeine_mg && item.caffeine_mg > 0) {
    intolerances.push('caffeine');
  }
  if (!item.is_dairy_free && item.default_milk !== 'none') {
    intolerances.push('lactose');
  }
  return intolerances;
}

/**
 * Convert USD price to VND (approximate rate for Vietnam coffeeshop)
 * Rate: 1 USD ≈ 24,500 VND, rounded to nearest 1000
 */
function usdToVnd(usd: number): number {
  const vnd = usd * 24500;
  return Math.round(vnd / 1000) * 1000;
}

/**
 * Transform Supabase coffee item to normalized product
 */
function transformCoffeeItem(item: SupabaseCoffeeItem): NormalizedProduct {
  const category = mapCoffeeCategory(item.category, item.style);
  const subcategory = mapCoffeeSubcategory(item.category);

  return {
    id: item.id,
    slug: item.slug,
    name: item.name,
    nameMulti: { en: item.name }, // Will be populated from translations table later
    description: item.description,
    descriptionMulti: { en: item.description },
    price: usdToVnd(item.selling_price_usd),
    image: item.image_url || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    category,
    subcategory,
    temperature: item.style,
    temperatureIcon: item.style === 'hot' ? TEMPERATURE_ICONS.hot : TEMPERATURE_ICONS.iced,
    isNew: false, // Could be based on created_at < 30 days
    isVisible: item.is_public,
    isFeatured: item.is_signature,
    allergens: item.allergens || [],
    intolerances: buildIntolerances(item),
    dietary: buildDietaryFlags(item),
    spiceLevel: 0,
    calories: item.calories_per_serving,
    protein_g: item.protein_g || 0,
    carbs_g: item.sugar_g || 0, // sugar_g as proxy for carbs
    fat_g: item.fat_g || 0,
    prepTime: Math.round((item.prep_time_seconds || 60) / 60), // Convert to minutes
    recipeId: item.id,
    sortOrder: 100 - (item.popularity || 50), // Higher popularity = lower sortOrder (appears first)
    _source: 'supabase',
  };
}

/**
 * Transform Supabase menu item to normalized product (legacy)
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
  const description =
    typeof item.description === 'object' ? item.description : { en: item.description };

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
 * Fetch coffee items from Supabase
 * Returns null if Supabase is not configured or query fails
 */
async function fetchCoffeeFromSupabase(): Promise<SupabaseCoffeeItem[] | null> {
  if (!isSupabaseConfigured || !supabase) {
    console.warn('[MenuService] Supabase not configured, using JSON fallback');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('coffee')
      .select('*')
      .eq('is_public', true)
      .order('popularity', { ascending: false });

    if (error) {
      console.error('[MenuService] Supabase coffee query error:', error.message);
      return null;
    }

    if (!data || data.length === 0) {
      return null;
    }

    return data as SupabaseCoffeeItem[];
  } catch (err) {
    console.error('[MenuService] Supabase coffee fetch failed:', err);
    return null;
  }
}

/**
 * Fetch tea items from Supabase (similar schema to coffee)
 */
async function fetchTeaFromSupabase(): Promise<SupabaseCoffeeItem[] | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('tea')
      .select('*')
      .eq('is_public', true)
      .order('popularity', { ascending: false });

    if (error) {
      console.error('[MenuService] Supabase tea query error:', error.message);
      return null;
    }

    return data as SupabaseCoffeeItem[];
  } catch (err) {
    console.error('[MenuService] Supabase tea fetch failed:', err);
    return null;
  }
}

/**
 * Fetch all beverage items from Supabase (coffee + tea)
 * Returns null if Supabase is not configured or query fails
 */
async function fetchFromSupabase(): Promise<NormalizedProduct[] | null> {
  if (!isSupabaseConfigured || !supabase) {
    console.warn('[MenuService] Supabase not configured, using JSON fallback');
    return null;
  }

  try {
    // Fetch coffee and tea in parallel
    const [coffeeItems, teaItems] = await Promise.all([
      fetchCoffeeFromSupabase(),
      fetchTeaFromSupabase(),
    ]);

    const allItems: NormalizedProduct[] = [];

    // Transform coffee items
    if (coffeeItems && coffeeItems.length > 0) {
      allItems.push(...coffeeItems.map(transformCoffeeItem));
    }

    // Transform tea items (reuse coffee transformer, adjust category)
    if (teaItems && teaItems.length > 0) {
      allItems.push(
        ...teaItems.map((item) => {
          const product = transformCoffeeItem(item);
          product.category = 'tea'; // Override category for tea
          return product;
        })
      );
    }

    if (allItems.length === 0) {
      return null;
    }

    return allItems;
  } catch (err) {
    console.error('[MenuService] Supabase fetch failed:', err);
    return null;
  }
}

/**
 * Get menu products with automatic Supabase/JSON fallback
 */
export async function getMenuProducts(lang: string = 'en'): Promise<NormalizedProduct[]> {
  // Try Supabase first (now returns NormalizedProduct[] directly)
  const supabaseItems = await fetchFromSupabase();

  if (supabaseItems && supabaseItems.length > 0) {
    return supabaseItems.filter((item) => item.isVisible);
  }

  // Fallback to JSON
  return (coffeeHouseProducts as any[])
    .filter((item) => item.isVisible !== false)
    .map((item) => transformJsonItem(item, lang));
}

/**
 * Get menu products with multilang fields intact (for client-side language switching)
 */
export async function getMenuProductsRaw(): Promise<NormalizedProduct[]> {
  // Try Supabase first (now returns NormalizedProduct[] directly)
  const supabaseItems = await fetchFromSupabase();

  if (supabaseItems && supabaseItems.length > 0) {
    return supabaseItems.filter((item) => item.isVisible);
  }

  // Fallback to JSON
  return (coffeeHouseProducts as any[])
    .filter((item) => item.isVisible !== false)
    .map((item) => transformJsonItem(item, 'en'));
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
 * Watches both coffee and tea tables
 */
export function subscribeToMenuChanges(onUpdate: (items: NormalizedProduct[]) => void): () => void {
  if (!isSupabaseConfigured || !supabase) {
    console.warn('[MenuService] Real-time not available');
    return () => {};
  }

  // Subscribe to coffee table changes
  const coffeeSubscription = supabase
    .channel('coffee_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'coffee' }, async (payload) => {
      const items = await getMenuProductsRaw();
      onUpdate(items);
    })
    .subscribe();

  // Subscribe to tea table changes
  const teaSubscription = supabase
    .channel('tea_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'tea' }, async (payload) => {
      const items = await getMenuProductsRaw();
      onUpdate(items);
    })
    .subscribe();

  return () => {
    coffeeSubscription.unsubscribe();
    teaSubscription.unsubscribe();
  };
}
