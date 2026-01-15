'use client';

/**
 * BrandingLogo Component
 *
 * Displays either GUDBRO branding or partner branding
 * based on white-label context.
 */

import Link from 'next/link';
import { usePartnerBranding } from '@/lib/contexts/PartnerBrandingContext';

export function BrandingLogo() {
  const { isWhiteLabel, logoUrl, partnerName, primaryColor, hideGudbroBranding, isLoading } =
    usePartnerBranding();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
      </div>
    );
  }

  // White-label: Show partner branding
  if (isWhiteLabel && (logoUrl || partnerName)) {
    return (
      <Link href="/dashboard" className="flex items-center gap-2">
        {logoUrl ? (
          <img src={logoUrl} alt={partnerName || 'Partner'} className="h-8 w-auto" />
        ) : (
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ backgroundColor: primaryColor }}
          >
            {partnerName?.charAt(0) || 'P'}
          </div>
        )}
        {partnerName && <span className="font-semibold text-gray-900">{partnerName}</span>}
      </Link>
    );
  }

  // Default: Show GUDBRO branding (unless hidden)
  if (hideGudbroBranding) {
    return null;
  }

  return (
    <Link href="/dashboard" className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-xs font-bold text-white">
        GB
      </div>
      <span className="font-semibold text-gray-900">GUDBRO</span>
    </Link>
  );
}
