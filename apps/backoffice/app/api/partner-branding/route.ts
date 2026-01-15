import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/partner-branding
 * Returns partner branding from middleware headers
 * Used by PartnerBrandingContext for white-label backoffice
 */
export async function GET(request: NextRequest) {
  // Read headers set by middleware
  const partnerId = request.headers.get('x-partner-id');
  const partnerName = request.headers.get('x-partner-name');
  const logoUrl = request.headers.get('x-partner-logo');
  const primaryColor = request.headers.get('x-partner-color');
  const hideGudbroBranding = request.headers.get('x-hide-gudbro-branding') === 'true';
  const isWhiteLabel = request.headers.get('x-white-label') === 'true';

  // If no partner context, return defaults
  if (!isWhiteLabel) {
    return NextResponse.json({
      partnerId: null,
      partnerName: null,
      logoUrl: null,
      primaryColor: '#000000',
      hideGudbroBranding: false,
      isWhiteLabel: false,
    });
  }

  return NextResponse.json({
    partnerId,
    partnerName: partnerName ? decodeURIComponent(partnerName) : null,
    logoUrl,
    primaryColor: primaryColor || '#000000',
    hideGudbroBranding,
    isWhiteLabel,
  });
}
