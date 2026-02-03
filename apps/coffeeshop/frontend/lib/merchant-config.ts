/**
 * Merchant Configuration Service
 *
 * Fetches merchant locale settings from Supabase:
 * - enabled_languages: Languages shown in customer PWA
 * - primary_language: Main language for the merchant
 * - currency_code: Merchant's base currency
 * - country_code: Merchant's country
 *
 * Falls back to static config when Supabase not available.
 */

import { supabase, isSupabaseConfigured } from './supabase';
import { coffeeshopConfig } from '../config/coffeeshop.config';
import { isRTLLanguage } from './hooks/useDirection';

// Types
export interface MerchantLanguage {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  countryCode: string;
  direction: 'ltr' | 'rtl';
}

export interface MerchantBranding {
  brandName: string;
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string | null;
  accentColor: string | null;
}

export interface MerchantLocaleConfig {
  primaryLanguage: string;
  enabledLanguages: MerchantLanguage[];
  currencyCode: string;
  countryCode: string;
  // Branding (from brands table)
  branding: MerchantBranding;
  // Domain context (from middleware headers)
  customDomain: string | null;
  tenantType: 'brand' | 'location' | null;
  isLoading: boolean;
  error: string | null;
}

// Cache for merchant config
let cachedConfig: MerchantLocaleConfig | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Language metadata (native names and flags)
const LANGUAGE_METADATA: Record<
  string,
  { name: string; nativeName: string; flag: string; countryCode: string }
> = {
  // Common languages
  en: { name: 'English', nativeName: 'English', flag: '🇬🇧', countryCode: 'gb' },
  vi: { name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', countryCode: 'vn' },
  it: { name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', countryCode: 'it' },
  zh: { name: 'Chinese', nativeName: '中文', flag: '🇨🇳', countryCode: 'cn' },
  ja: { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', countryCode: 'jp' },
  ko: { name: 'Korean', nativeName: '한국어', flag: '🇰🇷', countryCode: 'kr' },
  fr: { name: 'French', nativeName: 'Français', flag: '🇫🇷', countryCode: 'fr' },
  de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', countryCode: 'de' },
  es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', countryCode: 'es' },
  pt: { name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', countryCode: 'pt' },
  ru: { name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', countryCode: 'ru' },
  th: { name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', countryCode: 'th' },
  // RTL languages
  ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', countryCode: 'sa' },
  he: { name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', countryCode: 'il' },
  fa: { name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', countryCode: 'ir' },
  ur: { name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', countryCode: 'pk' },
  ps: { name: 'Pashto', nativeName: 'پښتو', flag: '🇦🇫', countryCode: 'af' },
  dv: { name: 'Divehi', nativeName: 'ދިވެހި', flag: '🇲🇻', countryCode: 'mv' },
};

/**
 * Get language metadata with fallback
 */
function getLanguageMetadata(code: string): MerchantLanguage {
  const meta = LANGUAGE_METADATA[code] || {
    name: code.toUpperCase(),
    nativeName: code.toUpperCase(),
    flag: '🏳️',
    countryCode: code,
  };

  return {
    code,
    name: meta.name,
    nativeName: meta.nativeName,
    flag: meta.flag,
    countryCode: meta.countryCode,
    direction: isRTLLanguage(code) ? 'rtl' : 'ltr',
  };
}

// Default branding when no custom branding
const DEFAULT_BRANDING: MerchantBranding = {
  brandName: 'GUDBRO',
  logoUrl: null,
  primaryColor: '#000000',
  secondaryColor: null,
  accentColor: null,
};

/**
 * Convert static config to MerchantLocaleConfig format
 */
function getStaticFallback(): MerchantLocaleConfig {
  const { i18n } = coffeeshopConfig;

  return {
    primaryLanguage: i18n.defaultLanguage,
    enabledLanguages: i18n.supportedLanguages.map((lang) => ({
      code: lang.code,
      name: lang.name,
      nativeName: lang.name,
      flag: lang.flag,
      countryCode: lang.countryCode,
      direction: isRTLLanguage(lang.code) ? 'rtl' : 'ltr',
    })),
    currencyCode: i18n.baseCurrency,
    countryCode: 'VN', // Default for ROOTS
    branding: DEFAULT_BRANDING,
    customDomain: null,
    tenantType: null,
    isLoading: false,
    error: null,
  };
}

/**
 * Fetch merchant locale config from Supabase
 * Includes brand data for branding (logo, colors)
 *
 * @param merchantId - Optional merchant ID (uses first merchant if not provided)
 * @param headers - Optional headers from middleware (for domain context)
 * @returns MerchantLocaleConfig
 */
export async function fetchMerchantConfig(
  merchantId?: string,
  headers?: { customDomain?: string; tenantType?: string; brandId?: string }
): Promise<MerchantLocaleConfig> {
  // Check cache
  if (cachedConfig && Date.now() - cacheTimestamp < CACHE_TTL) {
    return cachedConfig;
  }

  // Return static fallback if Supabase not configured
  if (!isSupabaseConfigured || !supabase) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[MerchantConfig] Supabase not configured');
    }
    const fallback = getStaticFallback();
    cachedConfig = fallback;
    cacheTimestamp = Date.now();
    return fallback;
  }

  try {
    // Build query - now includes brand data via location -> brand join
    let query = supabase
      .from('locations')
      .select(
        `
        id,
        primary_language,
        enabled_languages,
        currency_code,
        country_code,
        brand:brands(
          id,
          name,
          logo_url,
          primary_color,
          secondary_color,
          accent_color
        )
      `
      )
      .eq('is_active', true)
      .limit(1);

    if (merchantId) {
      query = query.eq('id', merchantId);
    }

    const { data, error } = await query.single();

    if (error) {
      console.error('[MerchantConfig] Error fetching merchant:', error.message);
      const fallback = getStaticFallback();
      fallback.error = error.message;
      return fallback;
    }

    if (!data) {
      console.warn('[MerchantConfig] No merchant found, using static fallback');
      return getStaticFallback();
    }

    // Parse enabled_languages (stored as array in DB)
    const enabledLangCodes: string[] = data.enabled_languages || [data.primary_language || 'en'];

    // Extract brand data (Supabase returns joined relations as arrays)
    const brandData = data.brand as
      | {
          id: string;
          name: string;
          logo_url: string | null;
          primary_color: string | null;
          secondary_color: string | null;
          accent_color: string | null;
        }[]
      | null;
    const brand = Array.isArray(brandData) ? brandData[0] : brandData;

    const branding: MerchantBranding = brand
      ? {
          brandName: brand.name,
          logoUrl: brand.logo_url,
          primaryColor: brand.primary_color || '#000000',
          secondaryColor: brand.secondary_color,
          accentColor: brand.accent_color,
        }
      : DEFAULT_BRANDING;

    const config: MerchantLocaleConfig = {
      primaryLanguage: data.primary_language || 'en',
      enabledLanguages: enabledLangCodes.map((code) => getLanguageMetadata(code)),
      currencyCode: data.currency_code || 'USD',
      countryCode: data.country_code || 'US',
      branding,
      customDomain: headers?.customDomain || null,
      tenantType: (headers?.tenantType as 'brand' | 'location') || null,
      isLoading: false,
      error: null,
    };

    // Cache the result
    cachedConfig = config;
    cacheTimestamp = Date.now();

    if (process.env.NODE_ENV === 'development') {
      console.log('[MerchantConfig] Loaded from Supabase:', {
        languages: enabledLangCodes,
        currency: config.currencyCode,
        country: config.countryCode,
        brand: branding.brandName,
      });
    }

    return config;
  } catch (err) {
    console.error('[MerchantConfig] Unexpected error:', err);
    const fallback = getStaticFallback();
    fallback.error = 'Failed to load merchant config';
    return fallback;
  }
}

/**
 * Clear the cached config (useful for testing or when merchant changes)
 */
export function clearMerchantConfigCache(): void {
  cachedConfig = null;
  cacheTimestamp = 0;
}

/**
 * Get static config synchronously (for SSR or initial render)
 */
export function getStaticMerchantConfig(): MerchantLocaleConfig {
  return getStaticFallback();
}
