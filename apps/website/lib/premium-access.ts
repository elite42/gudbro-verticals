import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

// Premium feature definitions
export const PREMIUM_FEATURES = {
  // Consumer features
  food_diary: {
    name: 'Food Diary',
    description: 'Track your meals and nutrition',
    requiredPlans: ['consumer_premium'],
  },
  personal_analytics: {
    name: 'Personal Analytics',
    description: 'Insights about your eating habits',
    requiredPlans: ['consumer_premium'],
  },
  unlimited_referrals: {
    name: 'Unlimited Referrals',
    description: 'Invite unlimited friends',
    requiredPlans: ['consumer_premium'],
  },
  priority_support: {
    name: 'Priority Support',
    description: 'Faster response times',
    requiredPlans: [
      'consumer_premium',
      'merchant_standard',
      'merchant_premium',
      'merchant_enterprise',
    ],
  },
  no_ads: {
    name: 'No Ads',
    description: 'Ad-free experience',
    requiredPlans: ['consumer_premium'],
  },
  early_access: {
    name: 'Early Access',
    description: 'Try new features first',
    requiredPlans: ['consumer_premium', 'merchant_premium', 'merchant_enterprise'],
  },

  // Merchant features
  advanced_analytics: {
    name: 'Advanced Analytics',
    description: 'Detailed business insights',
    requiredPlans: ['merchant_standard', 'merchant_premium', 'merchant_enterprise'],
  },
  custom_branding: {
    name: 'Custom Branding',
    description: 'Customize with your brand colors and logo',
    requiredPlans: ['merchant_standard', 'merchant_premium', 'merchant_enterprise'],
  },
  api_access: {
    name: 'API Access',
    description: 'Integrate with your systems',
    requiredPlans: ['merchant_premium', 'merchant_enterprise'],
  },
  white_label: {
    name: 'White Label',
    description: 'Remove GudBro branding',
    requiredPlans: ['merchant_enterprise'],
  },
  multi_location: {
    name: 'Multiple Locations',
    description: 'Manage multiple venues',
    requiredPlans: ['merchant_standard', 'merchant_premium', 'merchant_enterprise'],
  },
} as const;

export type PremiumFeature = keyof typeof PREMIUM_FEATURES;

// Check if account has access to a specific feature
export async function hasFeatureAccess(
  accountId: string,
  feature: PremiumFeature
): Promise<boolean> {
  const { data } = await supabase.rpc('has_feature_access', {
    p_account_id: accountId,
    p_feature: feature,
  });
  return data === true;
}

// Check if account has premium subscription
export async function hasPremiumSubscription(accountId: string): Promise<boolean> {
  const { data } = await supabase.rpc('has_premium_subscription', {
    p_account_id: accountId,
  });
  return data === true;
}

// Get all accessible features for an account
export async function getAccessibleFeatures(accountId: string): Promise<PremiumFeature[]> {
  const { data: subscription } = await supabase.rpc('get_current_subscription', {
    p_account_id: accountId,
  });

  if (!subscription?.[0]) {
    return [];
  }

  const planType = subscription[0].plan_type;
  const features = subscription[0].features || {};

  const accessibleFeatures: PremiumFeature[] = [];

  for (const [feature, config] of Object.entries(PREMIUM_FEATURES)) {
    if (
      (config.requiredPlans as readonly string[]).includes(planType) ||
      features[feature] === true
    ) {
      accessibleFeatures.push(feature as PremiumFeature);
    }
  }

  return accessibleFeatures;
}

// Get feature limits for an account
export async function getFeatureLimits(accountId: string): Promise<{
  maxLocations: number;
  maxStaff: number;
  maxQrCodes: number;
  loyaltyMultiplier: number;
}> {
  const { data: subscription } = await supabase.rpc('get_current_subscription', {
    p_account_id: accountId,
  });

  if (!subscription?.[0]) {
    // Free tier limits
    return {
      maxLocations: 1,
      maxStaff: 1,
      maxQrCodes: 5,
      loyaltyMultiplier: 1.0,
    };
  }

  const features = subscription[0].features || {};

  return {
    maxLocations: features.max_locations || 1,
    maxStaff: features.max_staff || 3,
    maxQrCodes: features.qr_codes || 10,
    loyaltyMultiplier: features.loyalty_multiplier || 1.0,
  };
}

// Middleware helper for API routes
export async function requirePremiumFeature(
  accountId: string,
  feature: PremiumFeature
): Promise<{ allowed: boolean; error?: string }> {
  const hasAccess = await hasFeatureAccess(accountId, feature);

  if (!hasAccess) {
    const featureInfo = PREMIUM_FEATURES[feature];
    return {
      allowed: false,
      error: `${featureInfo.name} requires a premium subscription. Upgrade to access this feature.`,
    };
  }

  return { allowed: true };
}

// Check usage limits
export async function checkUsageLimit(
  accountId: string,
  limitType: 'locations' | 'staff' | 'qr_codes',
  currentCount: number
): Promise<{ allowed: boolean; limit: number; error?: string }> {
  const limits = await getFeatureLimits(accountId);

  const limitMap = {
    locations: limits.maxLocations,
    staff: limits.maxStaff,
    qr_codes: limits.maxQrCodes,
  };

  const limit = limitMap[limitType];

  // -1 means unlimited
  if (limit === -1) {
    return { allowed: true, limit: -1 };
  }

  if (currentCount >= limit) {
    return {
      allowed: false,
      limit,
      error: `You've reached your limit of ${limit} ${limitType.replace('_', ' ')}. Upgrade to add more.`,
    };
  }

  return { allowed: true, limit };
}

// Calculate loyalty points with multiplier
export async function calculateLoyaltyPoints(
  accountId: string,
  basePoints: number
): Promise<number> {
  const limits = await getFeatureLimits(accountId);
  return Math.floor(basePoints * limits.loyaltyMultiplier);
}
