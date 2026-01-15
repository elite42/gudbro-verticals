'use client';

/**
 * MerchantConfigContext
 *
 * Provides merchant locale configuration (languages, currency, country)
 * to all components in the app.
 *
 * Usage:
 * const { enabledLanguages, primaryLanguage, currencyCode } = useMerchantConfig();
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  MerchantLocaleConfig,
  MerchantLanguage,
  MerchantBranding,
  fetchMerchantConfig,
  getStaticMerchantConfig,
} from '../merchant-config';
import { useBrandTheme } from '../hooks/useBrandTheme';

interface MerchantConfigContextValue extends MerchantLocaleConfig {
  /** Refresh merchant config from Supabase */
  refresh: () => Promise<void>;
}

const MerchantConfigContext = createContext<MerchantConfigContextValue | null>(null);

interface MerchantConfigProviderProps {
  children: ReactNode;
  /** Optional merchant ID (for multi-tenant support) */
  merchantId?: string;
}

export function MerchantConfigProvider({ children, merchantId }: MerchantConfigProviderProps) {
  // Initialize with static config to avoid hydration mismatch
  const [config, setConfig] = useState<MerchantLocaleConfig>(() => getStaticMerchantConfig());

  // Apply brand theme CSS variables
  useBrandTheme(config.branding);

  // Fetch config from Supabase on mount
  useEffect(() => {
    let isMounted = true;

    async function loadConfig() {
      setConfig((prev) => ({ ...prev, isLoading: true }));

      const fetchedConfig = await fetchMerchantConfig(merchantId);

      if (isMounted) {
        setConfig(fetchedConfig);
      }
    }

    loadConfig();

    return () => {
      isMounted = false;
    };
  }, [merchantId]);

  // Refresh function
  const refresh = async () => {
    setConfig((prev) => ({ ...prev, isLoading: true }));
    const fetchedConfig = await fetchMerchantConfig(merchantId);
    setConfig(fetchedConfig);
  };

  const contextValue: MerchantConfigContextValue = {
    ...config,
    refresh,
  };

  return (
    <MerchantConfigContext.Provider value={contextValue}>{children}</MerchantConfigContext.Provider>
  );
}

/**
 * Hook to access merchant config
 *
 * @returns MerchantConfigContextValue with languages, currency, country
 * @throws Error if used outside MerchantConfigProvider
 */
export function useMerchantConfig(): MerchantConfigContextValue {
  const context = useContext(MerchantConfigContext);

  if (!context) {
    throw new Error('useMerchantConfig must be used within a MerchantConfigProvider');
  }

  return context;
}

/**
 * Hook to get just the enabled languages
 * Useful for language selectors
 */
export function useMerchantLanguages(): {
  languages: MerchantLanguage[];
  primaryLanguage: string;
  isLoading: boolean;
} {
  const { enabledLanguages, primaryLanguage, isLoading } = useMerchantConfig();

  return {
    languages: enabledLanguages,
    primaryLanguage,
    isLoading,
  };
}

/**
 * Hook to get brand styling
 * Useful for components that need brand colors/logo
 */
export function useMerchantBranding(): {
  branding: MerchantBranding;
  customDomain: string | null;
  isWhiteLabel: boolean;
  isLoading: boolean;
} {
  const { branding, customDomain, isLoading } = useMerchantConfig();

  return {
    branding,
    customDomain,
    isWhiteLabel: customDomain !== null,
    isLoading,
  };
}
