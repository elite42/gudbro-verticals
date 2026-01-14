// Tourism Products Service
// Part of TOURISM-B2B feature
// Manages tourism product templates and merchant-specific tourism products

import { supabase } from '@/lib/supabase';

// =============================================================================
// TYPES
// =============================================================================

export type ProductTarget = 'tour_operator' | 'accommodation' | 'both';

export type ProductSlot = 'morning' | 'afternoon' | 'evening';

export interface TourismProductTemplate {
  id: string;
  venueType: string;
  productName: string;
  productSlug: string;
  target: ProductTarget | null;
  durationMinutes: number | null;
  suggestedPriceMin: number | null;
  suggestedPriceMax: number | null;
  minGroupSize: number | null;
  maxGroupSize: number | null;
  descriptionTemplate: string | null;
  includes: string[];
  isActive: boolean;
  displayOrder: number | null;
  createdAt: string;
}

export interface MerchantTourismProduct {
  id: string;
  merchantId: string;
  templateId: string | null;
  customName: string | null;
  customPrice: number | null;
  customDuration: number | null;
  customMinGroup: number | null;
  customMaxGroup: number | null;
  customDescription: string | null;
  customIncludes: string[];
  availableDays: number[];
  availableSlots: ProductSlot[];
  maxPerDay: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  template?: TourismProductTemplate;
}

export interface ResolvedProduct {
  id: string;
  merchantId: string;
  name: string;
  price: number | null;
  duration: number | null;
  minGroup: number | null;
  maxGroup: number | null;
  description: string | null;
  includes: string[];
  target: ProductTarget | null;
  venueType: string;
  availableDays: number[];
  availableSlots: ProductSlot[];
  maxPerDay: number | null;
  isActive: boolean;
  templateId: string | null;
  templateSlug: string | null;
}

export interface ProductStats {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  byTarget: Record<string, number>;
  bySlot: Record<string, number>;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function snakeToCamel<T>(obj: Record<string, unknown>): T {
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] = obj[key];
  }
  return result as T;
}

// =============================================================================
// TEMPLATE FUNCTIONS
// =============================================================================

export async function getProductTemplates(venueType?: string): Promise<TourismProductTemplate[]> {
  let query = supabase
    .from('tourism_product_templates')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true, nullsFirst: false })
    .order('product_name', { ascending: true });

  if (venueType) {
    query = query.eq('venue_type', venueType);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching product templates:', error);
    return [];
  }

  return (data || []).map((row) => snakeToCamel<TourismProductTemplate>(row));
}

export async function getProductTemplate(
  templateId: string
): Promise<TourismProductTemplate | null> {
  const { data, error } = await supabase
    .from('tourism_product_templates')
    .select('*')
    .eq('id', templateId)
    .single();

  if (error) {
    console.error('Error fetching product template:', error);
    return null;
  }

  return snakeToCamel<TourismProductTemplate>(data);
}

export async function getTemplateVenueTypes(): Promise<string[]> {
  const { data, error } = await supabase
    .from('tourism_product_templates')
    .select('venue_type')
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching venue types:', error);
    return [];
  }

  const venueTypes = [
    ...new Set((data || []).map((t: { venue_type: string }) => t.venue_type)),
  ].sort();
  return venueTypes;
}

// =============================================================================
// MERCHANT PRODUCT FUNCTIONS
// =============================================================================

export async function getMerchantProducts(
  merchantId: string,
  options?: { activeOnly?: boolean }
): Promise<MerchantTourismProduct[]> {
  let query = supabase
    .from('merchant_tourism_products')
    .select(
      `
      *,
      template:tourism_product_templates(*)
    `
    )
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false });

  if (options?.activeOnly) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching merchant products:', error);
    return [];
  }

  return (data || []).map((row) => {
    const product = snakeToCamel<MerchantTourismProduct>(row);
    if (row.template) {
      product.template = snakeToCamel<TourismProductTemplate>(row.template);
    }
    return product;
  });
}

export async function getMerchantProduct(
  productId: string
): Promise<MerchantTourismProduct | null> {
  const { data, error } = await supabase
    .from('merchant_tourism_products')
    .select(
      `
      *,
      template:tourism_product_templates(*)
    `
    )
    .eq('id', productId)
    .single();

  if (error) {
    console.error('Error fetching merchant product:', error);
    return null;
  }

  const product = snakeToCamel<MerchantTourismProduct>(data);
  if (data.template) {
    product.template = snakeToCamel<TourismProductTemplate>(data.template);
  }
  return product;
}

export async function createMerchantProduct(
  merchantId: string,
  templateId: string,
  options?: {
    customName?: string;
    customPrice?: number;
    customDuration?: number;
    customMinGroup?: number;
    customMaxGroup?: number;
    customDescription?: string;
    customIncludes?: string[];
    availableDays?: number[];
    availableSlots?: ProductSlot[];
    maxPerDay?: number;
  }
): Promise<MerchantTourismProduct | null> {
  const { data, error } = await supabase
    .from('merchant_tourism_products')
    .insert({
      merchant_id: merchantId,
      template_id: templateId,
      custom_name: options?.customName,
      custom_price: options?.customPrice,
      custom_duration: options?.customDuration,
      custom_min_group: options?.customMinGroup,
      custom_max_group: options?.customMaxGroup,
      custom_description: options?.customDescription,
      custom_includes: options?.customIncludes || [],
      available_days: options?.availableDays || [0, 1, 2, 3, 4, 5, 6],
      available_slots: options?.availableSlots || ['morning', 'afternoon', 'evening'],
      max_per_day: options?.maxPerDay,
      is_active: true,
    })
    .select(
      `
      *,
      template:tourism_product_templates(*)
    `
    )
    .single();

  if (error) {
    console.error('Error creating merchant product:', error);
    return null;
  }

  const product = snakeToCamel<MerchantTourismProduct>(data);
  if (data.template) {
    product.template = snakeToCamel<TourismProductTemplate>(data.template);
  }
  return product;
}

export async function updateMerchantProduct(
  productId: string,
  updates: {
    customName?: string;
    customPrice?: number;
    customDuration?: number;
    customMinGroup?: number;
    customMaxGroup?: number;
    customDescription?: string;
    customIncludes?: string[];
    availableDays?: number[];
    availableSlots?: ProductSlot[];
    maxPerDay?: number;
    isActive?: boolean;
  }
): Promise<boolean> {
  const updateData: Record<string, unknown> = {};

  if (updates.customName !== undefined) updateData.custom_name = updates.customName;
  if (updates.customPrice !== undefined) updateData.custom_price = updates.customPrice;
  if (updates.customDuration !== undefined) updateData.custom_duration = updates.customDuration;
  if (updates.customMinGroup !== undefined) updateData.custom_min_group = updates.customMinGroup;
  if (updates.customMaxGroup !== undefined) updateData.custom_max_group = updates.customMaxGroup;
  if (updates.customDescription !== undefined)
    updateData.custom_description = updates.customDescription;
  if (updates.customIncludes !== undefined) updateData.custom_includes = updates.customIncludes;
  if (updates.availableDays !== undefined) updateData.available_days = updates.availableDays;
  if (updates.availableSlots !== undefined) updateData.available_slots = updates.availableSlots;
  if (updates.maxPerDay !== undefined) updateData.max_per_day = updates.maxPerDay;
  if (updates.isActive !== undefined) updateData.is_active = updates.isActive;

  const { error } = await supabase
    .from('merchant_tourism_products')
    .update(updateData)
    .eq('id', productId);

  if (error) {
    console.error('Error updating merchant product:', error);
    return false;
  }

  return true;
}

export async function toggleProductAvailability(
  productId: string,
  isActive: boolean
): Promise<boolean> {
  const { error } = await supabase
    .from('merchant_tourism_products')
    .update({ is_active: isActive })
    .eq('id', productId);

  if (error) {
    console.error('Error toggling product availability:', error);
    return false;
  }

  return true;
}

export async function deleteMerchantProduct(productId: string): Promise<boolean> {
  const { error } = await supabase.from('merchant_tourism_products').delete().eq('id', productId);

  if (error) {
    console.error('Error deleting merchant product:', error);
    return false;
  }

  return true;
}

// =============================================================================
// RESOLVED PRODUCT HELPERS
// =============================================================================

export function resolveProduct(product: MerchantTourismProduct): ResolvedProduct {
  const template = product.template;

  return {
    id: product.id,
    merchantId: product.merchantId,
    name: product.customName || template?.productName || 'Unnamed Product',
    price: product.customPrice ?? template?.suggestedPriceMin ?? null,
    duration: product.customDuration ?? template?.durationMinutes ?? null,
    minGroup: product.customMinGroup ?? template?.minGroupSize ?? null,
    maxGroup: product.customMaxGroup ?? template?.maxGroupSize ?? null,
    description: product.customDescription || template?.descriptionTemplate || null,
    includes: product.customIncludes?.length ? product.customIncludes : template?.includes || [],
    target: template?.target || null,
    venueType: template?.venueType || 'unknown',
    availableDays: product.availableDays || [0, 1, 2, 3, 4, 5, 6],
    availableSlots: product.availableSlots || ['morning', 'afternoon', 'evening'],
    maxPerDay: product.maxPerDay,
    isActive: product.isActive,
    templateId: product.templateId,
    templateSlug: template?.productSlug || null,
  };
}

export async function getResolvedProducts(
  merchantId: string,
  options?: { activeOnly?: boolean }
): Promise<ResolvedProduct[]> {
  const products = await getMerchantProducts(merchantId, options);
  return products.map(resolveProduct);
}

// =============================================================================
// ANALYTICS & SUGGESTIONS
// =============================================================================

export async function suggestProducts(
  merchantId: string,
  venueType: string
): Promise<TourismProductTemplate[]> {
  const templates = await getProductTemplates(venueType);
  const existingProducts = await getMerchantProducts(merchantId);

  const existingTemplateIds = new Set(
    existingProducts.filter((p) => p.templateId).map((p) => p.templateId)
  );

  return templates.filter((t) => !existingTemplateIds.has(t.id));
}

export async function getProductStats(merchantId: string): Promise<ProductStats> {
  const products = await getMerchantProducts(merchantId);
  const resolved = products.map(resolveProduct);

  const stats: ProductStats = {
    totalProducts: products.length,
    activeProducts: products.filter((p) => p.isActive).length,
    inactiveProducts: products.filter((p) => !p.isActive).length,
    byTarget: {},
    bySlot: {},
  };

  for (const product of resolved) {
    const target = product.target || 'unspecified';
    stats.byTarget[target] = (stats.byTarget[target] || 0) + 1;

    for (const slot of product.availableSlots) {
      stats.bySlot[slot] = (stats.bySlot[slot] || 0) + 1;
    }
  }

  return stats;
}

// =============================================================================
// BULK OPERATIONS
// =============================================================================

export async function bulkCreateProducts(
  merchantId: string,
  templateIds: string[],
  defaults?: {
    availableDays?: number[];
    availableSlots?: ProductSlot[];
    maxPerDay?: number;
  }
): Promise<{ created: number; errors: string[] }> {
  const results = { created: 0, errors: [] as string[] };

  for (const templateId of templateIds) {
    const product = await createMerchantProduct(merchantId, templateId, {
      availableDays: defaults?.availableDays,
      availableSlots: defaults?.availableSlots,
      maxPerDay: defaults?.maxPerDay,
    });

    if (!product) {
      results.errors.push(`Template ${templateId}: Failed to create`);
    } else {
      results.created++;
    }
  }

  return results;
}

export async function deactivateAllProducts(merchantId: string): Promise<boolean> {
  const { error } = await supabase
    .from('merchant_tourism_products')
    .update({ is_active: false })
    .eq('merchant_id', merchantId);

  if (error) {
    console.error('Error deactivating products:', error);
    return false;
  }

  return true;
}
