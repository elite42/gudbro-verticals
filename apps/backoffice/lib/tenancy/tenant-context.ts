/**
 * Tenant Context with AsyncLocalStorage
 *
 * Provides request-scoped tenant context for multi-tenant isolation.
 * Uses Node.js AsyncLocalStorage to maintain context across async operations
 * without passing tenant info through every function call.
 *
 * Phase 3: 10K → 100K users
 *
 * Usage:
 * ```ts
 * import { runWithTenant, getTenant, requireTenant } from '@/lib/tenancy/tenant-context';
 *
 * // In middleware or API route
 * await runWithTenant({ merchantId, tier: 'full_suite' }, async () => {
 *   // All code here has access to tenant context
 *   const tenant = requireTenant();
 *   console.log(`Processing for ${tenant.merchantId}`);
 * });
 *
 * // Deep in service code
 * function someService() {
 *   const tenant = getTenant(); // Gets context without parameter passing
 *   if (tenant?.tier === 'full_suite') {
 *     // Premium features
 *   }
 * }
 * ```
 */

import { AsyncLocalStorage } from 'async_hooks';

/**
 * Merchant tier levels
 */
export type MerchantTier = 'digital_menu' | 'pre_ordering' | 'full_suite';

/**
 * Tenant context interface
 */
export interface TenantContext {
  /** Primary merchant/organization ID */
  merchantId: string;

  /** Brand ID (for multi-brand merchants) */
  brandId?: string;

  /** Location ID (for multi-location brands) */
  locationId?: string;

  /** Subscription tier */
  tier: MerchantTier;

  /** Enabled feature flags */
  features: string[];

  /** Current user ID (if authenticated) */
  userId?: string;

  /** User roles */
  roles?: string[];

  /** Request metadata */
  request?: {
    id: string;
    path: string;
    method: string;
    ip?: string;
    userAgent?: string;
  };
}

// AsyncLocalStorage instance for tenant context
const tenantStorage = new AsyncLocalStorage<TenantContext>();

/**
 * Run a function within a tenant context
 *
 * @param context - Tenant context to set for this execution
 * @param fn - Function to execute with tenant context
 * @returns Result of the function
 */
export function runWithTenant<T>(context: TenantContext, fn: () => T | Promise<T>): T | Promise<T> {
  return tenantStorage.run(context, fn);
}

/**
 * Get the current tenant context (may be undefined)
 *
 * @returns Current tenant context or undefined if not in tenant scope
 */
export function getTenant(): TenantContext | undefined {
  return tenantStorage.getStore();
}

/**
 * Get the current tenant context (throws if not available)
 *
 * @throws Error if no tenant context is available
 * @returns Current tenant context
 */
export function requireTenant(): TenantContext {
  const tenant = getTenant();
  if (!tenant) {
    throw new Error('No tenant context available. Ensure request is wrapped with runWithTenant.');
  }
  return tenant;
}

/**
 * Check if a feature is enabled for the current tenant
 *
 * @param feature - Feature name to check
 * @returns true if feature is enabled
 */
export function hasFeature(feature: string): boolean {
  const tenant = getTenant();
  return tenant?.features.includes(feature) ?? false;
}

/**
 * Check if the current tenant has a specific tier or higher
 *
 * @param requiredTier - Minimum required tier
 * @returns true if tenant has required tier or higher
 */
export function hasTier(requiredTier: MerchantTier): boolean {
  const tenant = getTenant();
  if (!tenant) return false;

  const tierHierarchy: Record<MerchantTier, number> = {
    digital_menu: 1,
    pre_ordering: 2,
    full_suite: 3,
  };

  return tierHierarchy[tenant.tier] >= tierHierarchy[requiredTier];
}

/**
 * Check if the current user has a specific role
 *
 * @param role - Role to check
 * @returns true if user has the role
 */
export function hasRole(role: string): boolean {
  const tenant = getTenant();
  return tenant?.roles?.includes(role) ?? false;
}

/**
 * Get merchant ID from context (safe accessor)
 */
export function getMerchantId(): string | undefined {
  return getTenant()?.merchantId;
}

/**
 * Get location ID from context (safe accessor)
 */
export function getLocationId(): string | undefined {
  return getTenant()?.locationId;
}

/**
 * Feature flags that can be enabled per tenant
 */
export const TenantFeatures = {
  // Core features
  DIGITAL_MENU: 'digital_menu',
  PRE_ORDERING: 'pre_ordering',
  TABLE_RESERVATIONS: 'table_reservations',

  // AI features
  AI_CO_MANAGER: 'ai_co_manager',
  AI_CUSTOMER_CHAT: 'ai_customer_chat',
  AI_INSIGHTS: 'ai_insights',

  // Advanced features
  MULTI_LOCATION: 'multi_location',
  MULTI_BRAND: 'multi_brand',
  CUSTOM_DOMAIN: 'custom_domain',
  API_ACCESS: 'api_access',

  // Beta features
  BETA_FEATURES: 'beta_features',
} as const;

/**
 * Default features by tier
 */
export const DEFAULT_FEATURES_BY_TIER: Record<MerchantTier, string[]> = {
  digital_menu: [TenantFeatures.DIGITAL_MENU],
  pre_ordering: [
    TenantFeatures.DIGITAL_MENU,
    TenantFeatures.PRE_ORDERING,
    TenantFeatures.AI_CUSTOMER_CHAT,
  ],
  full_suite: [
    TenantFeatures.DIGITAL_MENU,
    TenantFeatures.PRE_ORDERING,
    TenantFeatures.TABLE_RESERVATIONS,
    TenantFeatures.AI_CO_MANAGER,
    TenantFeatures.AI_CUSTOMER_CHAT,
    TenantFeatures.AI_INSIGHTS,
    TenantFeatures.MULTI_LOCATION,
    TenantFeatures.MULTI_BRAND,
    TenantFeatures.CUSTOM_DOMAIN,
    TenantFeatures.API_ACCESS,
  ],
};

/**
 * Create a tenant context from merchant data
 *
 * @param merchant - Merchant data from database
 * @param options - Additional context options
 */
export function createTenantContext(
  merchant: {
    id: string;
    tier?: MerchantTier;
    features?: string[];
    brand_id?: string;
    location_id?: string;
  },
  options?: {
    userId?: string;
    roles?: string[];
    request?: TenantContext['request'];
  }
): TenantContext {
  const tier = merchant.tier || 'digital_menu';
  const baseFeatures = DEFAULT_FEATURES_BY_TIER[tier];
  const customFeatures = merchant.features || [];

  return {
    merchantId: merchant.id,
    brandId: merchant.brand_id,
    locationId: merchant.location_id,
    tier,
    features: [...new Set([...baseFeatures, ...customFeatures])],
    userId: options?.userId,
    roles: options?.roles,
    request: options?.request,
  };
}
