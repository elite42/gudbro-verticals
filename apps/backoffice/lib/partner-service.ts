// Partner Service
// Handles partner portal operations for agencies/resellers
// Feature: WHITE-LABEL-FULL

import { supabase } from '@/lib/supabase';

// =============================================================================
// TYPES
// =============================================================================

export interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: 'pending' | 'active' | 'suspended';
  territoryCodes: string[];
  royaltyPercent: number;
  logoUrl: string | null;
  primaryColor: string;
  backofficeDomain: string | null;
  hideGudbroBranding: boolean;
  createdAt: string;
}

export interface PartnerOrganization {
  id: string;
  name: string;
  email: string | null;
  subscriptionPlan: string;
  subscriptionStatus: string;
  isActive: boolean;
  createdAt: string;
  brandCount: number;
  locationCount: number;
}

export interface PartnerMetrics {
  totalOrganizations: number;
  activeOrganizations: number;
  totalBrands: number;
  totalLocations: number;
  totalRevenue: number;
  pendingRoyalties: number;
  thisMonthSignups: number;
  thisMonthRevenue: number;
}

export interface PartnerDashboard {
  partner: Partner;
  metrics: PartnerMetrics;
  recentOrganizations: PartnerOrganization[];
  pendingApprovals: number;
}

// =============================================================================
// PARTNER INFO
// =============================================================================

/**
 * Get partner by ID
 */
export async function getPartner(partnerId: string): Promise<Partner | null> {
  const { data, error } = await supabase.from('partners').select('*').eq('id', partnerId).single();

  if (error) {
    console.error('[Partner] Get error:', error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    status: data.status,
    territoryCodes: data.territory_codes || [],
    royaltyPercent: data.royalty_pct || 0,
    logoUrl: data.logo_url,
    primaryColor: data.primary_color || '#000000',
    backofficeDomain: data.backoffice_domain,
    hideGudbroBranding: data.hide_gudbro_branding || false,
    createdAt: data.created_at,
  };
}

/**
 * Get partner for current user (from account_roles)
 */
export async function getPartnerForUser(userId: string): Promise<Partner | null> {
  const { data: roleData, error: roleError } = await supabase
    .from('account_roles')
    .select('tenant_id')
    .eq('account_id', userId)
    .eq('tenant_type', 'partner')
    .eq('is_active', true)
    .limit(1)
    .single();

  if (roleError || !roleData) {
    return null;
  }

  return getPartner(roleData.tenant_id);
}

// =============================================================================
// ORGANIZATIONS
// =============================================================================

/**
 * List organizations managed by partner
 */
export async function listPartnerOrganizations(
  partnerId: string,
  options?: {
    limit?: number;
    offset?: number;
    status?: 'active' | 'inactive' | 'all';
    search?: string;
  }
): Promise<{ organizations: PartnerOrganization[]; total: number }> {
  let query = supabase
    .from('organizations')
    .select(
      `
      id,
      name,
      email,
      subscription_plan,
      subscription_status,
      is_active,
      created_at,
      brands:brands(count),
      locations:brands(locations(count))
    `,
      { count: 'exact' }
    )
    .eq('partner_id', partnerId);

  // Filter by status
  if (options?.status === 'active') {
    query = query.eq('is_active', true);
  } else if (options?.status === 'inactive') {
    query = query.eq('is_active', false);
  }

  // Search
  if (options?.search) {
    query = query.ilike('name', `%${options.search}%`);
  }

  // Pagination
  const limit = options?.limit || 10;
  const offset = options?.offset || 0;
  query = query.range(offset, offset + limit - 1);

  // Order
  query = query.order('created_at', { ascending: false });

  const { data, error, count } = await query;

  if (error) {
    console.error('[Partner] List organizations error:', error);
    return { organizations: [], total: 0 };
  }

  const organizations: PartnerOrganization[] = (data || []).map((org) => ({
    id: org.id,
    name: org.name,
    email: org.email,
    subscriptionPlan: org.subscription_plan || 'free',
    subscriptionStatus: org.subscription_status || 'active',
    isActive: org.is_active,
    createdAt: org.created_at,
    brandCount: Array.isArray(org.brands) ? org.brands.length : 0,
    locationCount: 0, // Would need proper aggregation
  }));

  return { organizations, total: count || 0 };
}

/**
 * Get single organization details
 */
export async function getPartnerOrganization(
  partnerId: string,
  organizationId: string
): Promise<PartnerOrganization | null> {
  const { data, error } = await supabase
    .from('organizations')
    .select(
      `
      id,
      name,
      email,
      subscription_plan,
      subscription_status,
      is_active,
      created_at,
      brands:brands(
        id,
        name,
        locations:locations(id, name)
      )
    `
    )
    .eq('id', organizationId)
    .eq('partner_id', partnerId)
    .single();

  if (error) {
    console.error('[Partner] Get organization error:', error);
    return null;
  }

  const brandCount = Array.isArray(data.brands) ? data.brands.length : 0;
  const locationCount = Array.isArray(data.brands)
    ? data.brands.reduce((sum, b) => sum + (Array.isArray(b.locations) ? b.locations.length : 0), 0)
    : 0;

  return {
    id: data.id,
    name: data.name,
    email: data.email,
    subscriptionPlan: data.subscription_plan || 'free',
    subscriptionStatus: data.subscription_status || 'active',
    isActive: data.is_active,
    createdAt: data.created_at,
    brandCount,
    locationCount,
  };
}

// =============================================================================
// METRICS
// =============================================================================

/**
 * Get partner metrics
 */
export async function getPartnerMetrics(partnerId: string): Promise<PartnerMetrics> {
  // Count organizations
  const { count: totalOrgs } = await supabase
    .from('organizations')
    .select('id', { count: 'exact', head: true })
    .eq('partner_id', partnerId);

  const { count: activeOrgs } = await supabase
    .from('organizations')
    .select('id', { count: 'exact', head: true })
    .eq('partner_id', partnerId)
    .eq('is_active', true);

  // Count brands
  const { count: totalBrands } = await supabase
    .from('brands')
    .select('id', { count: 'exact', head: true })
    .eq(
      'organization_id',
      (await supabase.from('organizations').select('id').eq('partner_id', partnerId)).data?.map(
        (o) => o.id
      ) || []
    );

  // Count this month signups
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count: thisMonthSignups } = await supabase
    .from('organizations')
    .select('id', { count: 'exact', head: true })
    .eq('partner_id', partnerId)
    .gte('created_at', startOfMonth.toISOString());

  return {
    totalOrganizations: totalOrgs || 0,
    activeOrganizations: activeOrgs || 0,
    totalBrands: totalBrands || 0,
    totalLocations: 0, // Would need proper aggregation
    totalRevenue: 0, // Would come from billing system
    pendingRoyalties: 0, // Would come from billing system
    thisMonthSignups: thisMonthSignups || 0,
    thisMonthRevenue: 0, // Would come from billing system
  };
}

/**
 * Get partner dashboard (combined data)
 */
export async function getPartnerDashboard(partnerId: string): Promise<PartnerDashboard | null> {
  const partner = await getPartner(partnerId);
  if (!partner) return null;

  const [metrics, { organizations: recentOrganizations }] = await Promise.all([
    getPartnerMetrics(partnerId),
    listPartnerOrganizations(partnerId, { limit: 5 }),
  ]);

  return {
    partner,
    metrics,
    recentOrganizations,
    pendingApprovals: 0, // Would check pending organization requests
  };
}

// =============================================================================
// PARTNER BRANDING
// =============================================================================

/**
 * Update partner branding
 */
export async function updatePartnerBranding(
  partnerId: string,
  branding: {
    logoUrl?: string;
    primaryColor?: string;
    backofficeDomain?: string;
    hideGudbroBranding?: boolean;
  }
): Promise<boolean> {
  const { error } = await supabase
    .from('partners')
    .update({
      logo_url: branding.logoUrl,
      primary_color: branding.primaryColor,
      backoffice_domain: branding.backofficeDomain,
      hide_gudbro_branding: branding.hideGudbroBranding,
    })
    .eq('id', partnerId);

  if (error) {
    console.error('[Partner] Update branding error:', error);
    return false;
  }

  return true;
}

// =============================================================================
// BILLING
// =============================================================================

/**
 * Get partner billing info
 */
export async function getPartnerBilling(partnerId: string): Promise<{
  totalRevenue: number;
  pendingRoyalties: number;
  lastPayout: string | null;
  payoutHistory: { date: string; amount: number }[];
}> {
  // This would integrate with Stripe or billing system
  // For now, return placeholder data
  return {
    totalRevenue: 0,
    pendingRoyalties: 0,
    lastPayout: null,
    payoutHistory: [],
  };
}
