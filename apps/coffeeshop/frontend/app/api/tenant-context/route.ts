import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/tenant-context
 * Returns the current tenant context from middleware headers
 * Used by client components to understand which brand/location they're serving
 */
export async function GET(request: NextRequest) {
  // Read headers set by middleware
  const tenantType = request.headers.get('x-tenant-type');
  const tenantId = request.headers.get('x-tenant-id');
  const brandId = request.headers.get('x-brand-id');
  const locationId = request.headers.get('x-location-id');
  const organizationId = request.headers.get('x-organization-id');
  const partnerId = request.headers.get('x-partner-id');
  const customDomain = request.headers.get('x-custom-domain');
  const domainStatus = request.headers.get('x-domain-status');

  // If no tenant context, return default
  if (!tenantType || !tenantId) {
    return NextResponse.json({
      tenantType: null,
      tenantId: null,
      brandId: null,
      locationId: null,
      organizationId: null,
      partnerId: null,
      customDomain: null,
      domainStatus: null,
      isWhiteLabel: false,
    });
  }

  return NextResponse.json({
    tenantType,
    tenantId,
    brandId,
    locationId,
    organizationId,
    partnerId,
    customDomain,
    domainStatus,
    isWhiteLabel: !!customDomain,
  });
}
