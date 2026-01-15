/**
 * useTenantContext Hook
 *
 * Reads tenant context from middleware headers (x-brand-id, x-location-id, etc.)
 * Used for white-label domain resolution.
 */

import { useEffect, useState } from 'react';

interface TenantContext {
  tenantType: 'brand' | 'location' | null;
  tenantId: string | null;
  brandId: string | null;
  locationId: string | null;
  organizationId: string | null;
  partnerId: string | null;
  customDomain: string | null;
  isWhiteLabel: boolean;
  isLoading: boolean;
}

const DEFAULT_CONTEXT: TenantContext = {
  tenantType: null,
  tenantId: null,
  brandId: null,
  locationId: null,
  organizationId: null,
  partnerId: null,
  customDomain: null,
  isWhiteLabel: false,
  isLoading: true,
};

/**
 * Get tenant context from current page
 * In production, this would read from headers/cookies set by middleware
 */
export function useTenantContext(): TenantContext {
  const [context, setContext] = useState<TenantContext>(DEFAULT_CONTEXT);

  useEffect(() => {
    // Try to get context from meta tags (set by middleware via headers)
    // Or from localStorage/sessionStorage for client-side
    async function fetchContext() {
      try {
        // Call API to get current tenant context
        const response = await fetch('/api/tenant-context');

        if (response.ok) {
          const data = await response.json();
          setContext({
            tenantType: data.tenantType || null,
            tenantId: data.tenantId || null,
            brandId: data.brandId || null,
            locationId: data.locationId || null,
            organizationId: data.organizationId || null,
            partnerId: data.partnerId || null,
            customDomain: data.customDomain || null,
            isWhiteLabel: !!data.customDomain,
            isLoading: false,
          });
        } else {
          setContext({ ...DEFAULT_CONTEXT, isLoading: false });
        }
      } catch {
        setContext({ ...DEFAULT_CONTEXT, isLoading: false });
      }
    }

    fetchContext();
  }, []);

  return context;
}

/**
 * Check if we're in a multi-location brand context
 */
export function useIsMultiLocation(): { isMultiLocation: boolean; isLoading: boolean } {
  const context = useTenantContext();

  return {
    isMultiLocation: context.tenantType === 'brand' && !context.locationId,
    isLoading: context.isLoading,
  };
}
