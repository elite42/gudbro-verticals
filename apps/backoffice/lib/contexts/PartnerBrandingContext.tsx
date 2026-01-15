'use client';

/**
 * PartnerBrandingContext
 *
 * Provides partner branding information for white-label backoffice.
 * Reads from middleware headers (x-partner-*, x-white-label).
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PartnerBranding {
  partnerId: string | null;
  partnerName: string | null;
  logoUrl: string | null;
  primaryColor: string;
  hideGudbroBranding: boolean;
  isWhiteLabel: boolean;
  isLoading: boolean;
}

const DEFAULT_BRANDING: PartnerBranding = {
  partnerId: null,
  partnerName: null,
  logoUrl: null,
  primaryColor: '#000000',
  hideGudbroBranding: false,
  isWhiteLabel: false,
  isLoading: true,
};

const PartnerBrandingContext = createContext<PartnerBranding>(DEFAULT_BRANDING);

interface PartnerBrandingProviderProps {
  children: ReactNode;
}

export function PartnerBrandingProvider({ children }: PartnerBrandingProviderProps) {
  const [branding, setBranding] = useState<PartnerBranding>(DEFAULT_BRANDING);

  useEffect(() => {
    async function fetchBranding() {
      try {
        // Fetch branding from API that reads middleware headers
        const response = await fetch('/api/partner-branding');

        if (response.ok) {
          const data = await response.json();
          setBranding({
            partnerId: data.partnerId || null,
            partnerName: data.partnerName || null,
            logoUrl: data.logoUrl || null,
            primaryColor: data.primaryColor || '#000000',
            hideGudbroBranding: data.hideGudbroBranding || false,
            isWhiteLabel: data.isWhiteLabel || false,
            isLoading: false,
          });
        } else {
          setBranding({ ...DEFAULT_BRANDING, isLoading: false });
        }
      } catch {
        setBranding({ ...DEFAULT_BRANDING, isLoading: false });
      }
    }

    fetchBranding();
  }, []);

  // Apply branding colors as CSS variables
  useEffect(() => {
    if (branding.isWhiteLabel && branding.primaryColor) {
      document.documentElement.style.setProperty('--partner-primary', branding.primaryColor);
    } else {
      document.documentElement.style.removeProperty('--partner-primary');
    }
  }, [branding.isWhiteLabel, branding.primaryColor]);

  return (
    <PartnerBrandingContext.Provider value={branding}>{children}</PartnerBrandingContext.Provider>
  );
}

/**
 * Hook to access partner branding
 */
export function usePartnerBranding(): PartnerBranding {
  return useContext(PartnerBrandingContext);
}
