/**
 * Merchant Onboarding Service
 *
 * Handles merchant self-registration wizard
 */

import { getSupabase } from '@/lib/supabase-lazy';

export interface OnboardingSession {
  id: string;
  currentStep: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  businessName?: string;
  businessType?: 'fnb' | 'hotel' | 'rental' | 'wellness' | 'other';
  countryCode?: string;
  city?: string;
  selectedPlan?: 'free' | 'starter' | 'pro';
  billingCycle?: 'monthly' | 'yearly';
  brandName?: string;
  brandLogoUrl?: string;
  primaryColor?: string;
  locationName?: string;
  locationAddress?: string;
  locationCurrency?: string;
  locationLanguages?: string[];
  isCompleted: boolean;
  expiresAt: string;
}

export interface StartOnboardingResult {
  sessionId: string;
  sessionToken: string;
  accountId?: string;
  isExistingAccount: boolean;
}

export interface CompleteOnboardingResult {
  success: boolean;
  accountId?: string;
  organizationId?: string;
  brandId?: string;
  locationId?: string;
  errorMessage?: string;
}

const SESSION_TOKEN_KEY = 'gudbro_onboarding_token';

/**
 * Start a new merchant onboarding session
 */
export async function startOnboarding(
  email: string,
  options?: {
    firstName?: string;
    lastName?: string;
    referralCode?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  }
): Promise<StartOnboardingResult | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase.rpc('start_merchant_onboarding', {
    p_email: email,
    p_first_name: options?.firstName || null,
    p_last_name: options?.lastName || null,
    p_referral_code: options?.referralCode || null,
    p_utm_source: options?.utmSource || null,
    p_utm_medium: options?.utmMedium || null,
    p_utm_campaign: options?.utmCampaign || null,
  });

  if (error) {
    console.error('[OnboardingService] Start error:', error);
    return null;
  }

  if (data && data.length > 0) {
    const result = data[0];
    // Store token in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(SESSION_TOKEN_KEY, result.session_token);
    }
    return {
      sessionId: result.session_id,
      sessionToken: result.session_token,
      accountId: result.account_id,
      isExistingAccount: result.is_existing_account,
    };
  }

  return null;
}

/**
 * Get current onboarding session from stored token
 */
export async function getOnboardingSession(): Promise<OnboardingSession | null> {
  const token = typeof window !== 'undefined' ? localStorage.getItem(SESSION_TOKEN_KEY) : null;
  if (!token) return null;

  const supabase = getSupabase();
  const { data, error } = await supabase.rpc('get_onboarding_session', {
    p_session_token: token,
  });

  if (error || !data || data.length === 0) {
    // Clear invalid token
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SESSION_TOKEN_KEY);
    }
    return null;
  }

  const session = data[0];
  return {
    id: session.id,
    currentStep: session.current_step,
    email: session.email,
    firstName: session.first_name,
    lastName: session.last_name,
    phone: session.phone,
    businessName: session.business_name,
    businessType: session.business_type,
    countryCode: session.country_code,
    city: session.city,
    selectedPlan: session.selected_plan,
    billingCycle: session.billing_cycle,
    brandName: session.brand_name,
    brandLogoUrl: session.brand_logo_url,
    primaryColor: session.primary_color,
    locationName: session.location_name,
    locationAddress: session.location_address,
    locationCurrency: session.location_currency,
    locationLanguages: session.location_languages,
    isCompleted: session.is_completed,
    expiresAt: session.expires_at,
  };
}

/**
 * Update onboarding step data
 */
export async function updateOnboardingStep(
  step: number,
  data: Record<string, any>
): Promise<boolean> {
  const token = typeof window !== 'undefined' ? localStorage.getItem(SESSION_TOKEN_KEY) : null;
  if (!token) return false;

  const supabase = getSupabase();
  const { error } = await supabase.rpc('update_onboarding_step', {
    p_session_token: token,
    p_step: step,
    p_data: data,
  });

  if (error) {
    console.error('[OnboardingService] Update error:', error);
    return false;
  }

  return true;
}

/**
 * Complete the onboarding process
 */
export async function completeOnboarding(authId?: string): Promise<CompleteOnboardingResult> {
  const token = typeof window !== 'undefined' ? localStorage.getItem(SESSION_TOKEN_KEY) : null;
  if (!token) {
    return { success: false, errorMessage: 'No active session' };
  }

  const supabase = getSupabase();
  const { data, error } = await supabase.rpc('complete_merchant_onboarding', {
    p_session_token: token,
    p_auth_id: authId || null,
  });

  if (error) {
    console.error('[OnboardingService] Complete error:', error);
    return { success: false, errorMessage: error.message };
  }

  if (data && data.length > 0) {
    const result = data[0];
    if (result.success) {
      // Clear token on success
      if (typeof window !== 'undefined') {
        localStorage.removeItem(SESSION_TOKEN_KEY);
      }
    }
    return {
      success: result.success,
      accountId: result.account_id,
      organizationId: result.organization_id,
      brandId: result.brand_id,
      locationId: result.location_id,
      errorMessage: result.error_message,
    };
  }

  return { success: false, errorMessage: 'Unknown error' };
}

/**
 * Clear onboarding session
 */
export function clearOnboardingSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_TOKEN_KEY);
  }
}

/**
 * Available subscription plans
 */
export const SUBSCRIPTION_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    priceYearly: 0,
    features: ['1 location', '50 menu items', 'Basic QR menu', 'Community support'],
    limitations: ['GUDBRO branding', 'No analytics', 'No ordering'],
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    priceYearly: 290,
    features: [
      '1 location',
      'Unlimited menu items',
      'Custom branding',
      'Basic analytics',
      'Email support',
    ],
    popular: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 79,
    priceYearly: 790,
    features: [
      'Up to 5 locations',
      'Unlimited menu items',
      'Custom branding',
      'Advanced analytics',
      'Online ordering',
      'Priority support',
      'API access',
    ],
  },
];

/**
 * Business types
 */
export const BUSINESS_TYPES = [
  { id: 'fnb', label: 'Restaurant / Café', icon: '🍽️' },
  { id: 'hotel', label: 'Hotel / Hospitality', icon: '🏨' },
  { id: 'rental', label: 'Vacation Rental', icon: '🏡' },
  { id: 'wellness', label: 'Spa / Wellness', icon: '💆' },
  { id: 'other', label: 'Other', icon: '🏢' },
];

/**
 * Common countries for selection
 */
export const COUNTRIES = [
  { code: 'IT', name: 'Italy', currency: 'EUR' },
  { code: 'US', name: 'United States', currency: 'USD' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
  { code: 'DE', name: 'Germany', currency: 'EUR' },
  { code: 'FR', name: 'France', currency: 'EUR' },
  { code: 'ES', name: 'Spain', currency: 'EUR' },
  { code: 'VN', name: 'Vietnam', currency: 'VND' },
  { code: 'AU', name: 'Australia', currency: 'AUD' },
  { code: 'CA', name: 'Canada', currency: 'CAD' },
  { code: 'JP', name: 'Japan', currency: 'JPY' },
];
