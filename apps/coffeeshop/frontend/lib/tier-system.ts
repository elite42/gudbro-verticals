/**
 * GUDBRO SaaS Tier System
 *
 * Multi-tier subscription architecture for coffeeshop vertical.
 * Enables feature gating and limits based on subscription level.
 *
 * @architecture 3-tier system (Digital Menu → Pre-ordering → Full Suite)
 * @testing Ready for MVP validation - easily toggle tiers to test upgrade/downgrade flows
 */

/**
 * Available subscription tier levels
 */
export type TierLevel = 'digital-menu' | 'pre-ordering' | 'full-suite';

/**
 * Tier configuration interface
 * Defines features, limits, and pricing for each subscription level
 */
export interface TierConfig {
  /** Tier identifier */
  id: TierLevel;

  /** Display name */
  name: string;

  /** Monthly price in USD */
  price: number;

  /** Short description */
  tagline: string;

  /** Feature availability flags */
  features: {
    // Core features
    enableLanguageSelector: boolean;
    enableCurrencyConverter: boolean;
    enableSearch: boolean;
    enablePackages: boolean;
    enablePromotions: boolean;

    // Ordering system
    enableCart: boolean;
    enableTableOrdering: boolean;
    enableTakeaway: boolean;
    enableDelivery: boolean;

    // Engagement system (PRO tier)
    enableEngagementSystem: boolean;

    // Advanced features (FULL SUITE only)
    enableInventoryManagement: boolean;
    enableAnalytics: boolean;
    enableStaffManagement: boolean;
    enableMultiVenue: boolean;
    enableWhiteLabel: boolean;
  };

  /** Usage limits */
  limits: {
    maxProducts: number;         // Maximum menu items
    maxLanguages: number;         // Maximum supported languages
    maxQRCodes: number;           // Maximum QR codes (tables/venues)
    maxOrders: number;            // Monthly order limit (-1 = unlimited)
    maxStaff: number;             // Maximum staff accounts
    maxVenues: number;            // Maximum venues/locations
  };

  /** Tier-specific branding */
  branding: {
    badge: string;                // Badge text (e.g., "BASIC", "PRO", "ENTERPRISE")
    color: string;                // Primary color for tier (Tailwind class)
    icon: string;                 // Emoji icon
  };
}

/**
 * TIER CONFIGURATIONS
 *
 * Each tier progressively unlocks more features and increases limits.
 * Designed for graceful degradation - disabling features doesn't break the app.
 */
export const TIER_CONFIGS: Record<TierLevel, TierConfig> = {
  /**
   * TIER 1: Digital Menu Only ($29/month)
   *
   * Perfect for restaurants that want a modern digital menu with QR codes.
   * No ordering system - just a beautiful, mobile-friendly menu presentation.
   */
  'digital-menu': {
    id: 'digital-menu',
    name: 'Digital Menu',
    price: 29,
    tagline: 'Beautiful QR menu with multi-language support',

    features: {
      // ✅ Core features - Always available
      enableLanguageSelector: true,
      enableCurrencyConverter: true,
      enableSearch: true,
      enablePackages: false,         // ❌ No combo/packages
      enablePromotions: false,        // ❌ No promotions

      // ❌ Ordering system - Disabled
      enableCart: false,
      enableTableOrdering: false,
      enableTakeaway: false,
      enableDelivery: false,

      // ❌ Engagement system - Disabled
      enableEngagementSystem: false,

      // ❌ Advanced features - Disabled
      enableInventoryManagement: false,
      enableAnalytics: false,
      enableStaffManagement: false,
      enableMultiVenue: false,
      enableWhiteLabel: false,
    },

    limits: {
      maxProducts: 50,              // Up to 50 menu items
      maxLanguages: 2,               // 2 languages max
      maxQRCodes: 5,                 // 5 QR codes (5 tables)
      maxOrders: 0,                  // No ordering
      maxStaff: 1,                   // 1 admin account
      maxVenues: 1,                  // 1 location only
    },

    branding: {
      badge: 'BASIC',
      color: 'bg-gray-500',
      icon: '📄',
    }
  },

  /**
   * TIER 2: Pre-ordering System ($79/month)
   *
   * Adds ordering functionality - customers can build cart, customize items,
   * and submit orders. Includes engagement system for reviews/social sharing.
   */
  'pre-ordering': {
    id: 'pre-ordering',
    name: 'Pre-ordering',
    price: 79,
    tagline: 'Digital menu + ordering + customer engagement',

    features: {
      // ✅ Core features
      enableLanguageSelector: true,
      enableCurrencyConverter: true,
      enableSearch: true,
      enablePackages: true,          // ✅ Combo/packages available
      enablePromotions: true,         // ✅ Promotions available

      // ✅ Ordering system - Enabled
      enableCart: true,
      enableTableOrdering: true,      // ✅ Table ordering
      enableTakeaway: true,           // ✅ Takeaway
      enableDelivery: false,          // ❌ No delivery yet

      // ✅ Engagement system - Enabled
      enableEngagementSystem: true,   // ✅ Reviews, social sharing, rewards

      // ❌ Advanced features - Disabled
      enableInventoryManagement: false,
      enableAnalytics: false,         // ❌ Basic stats only
      enableStaffManagement: false,   // ❌ No staff management
      enableMultiVenue: false,
      enableWhiteLabel: false,
    },

    limits: {
      maxProducts: 200,              // Up to 200 menu items
      maxLanguages: 4,               // 4 languages max
      maxQRCodes: 20,                // 20 QR codes (20 tables)
      maxOrders: 500,                // 500 orders/month
      maxStaff: 3,                   // 3 staff accounts
      maxVenues: 1,                  // 1 location
    },

    branding: {
      badge: 'PRO',
      color: 'bg-blue-600',
      icon: '🚀',
    }
  },

  /**
   * TIER 3: Full Suite ($149/month)
   *
   * Complete restaurant management system with delivery, inventory,
   * analytics, staff management, and multi-venue support.
   */
  'full-suite': {
    id: 'full-suite',
    name: 'Full Suite',
    price: 149,
    tagline: 'Complete restaurant management platform',

    features: {
      // ✅ All core features
      enableLanguageSelector: true,
      enableCurrencyConverter: true,
      enableSearch: true,
      enablePackages: true,
      enablePromotions: true,

      // ✅ Full ordering system
      enableCart: true,
      enableTableOrdering: true,
      enableTakeaway: true,
      enableDelivery: true,           // ✅ Delivery enabled

      // ✅ Engagement system
      enableEngagementSystem: true,

      // ✅ Advanced features - All enabled
      enableInventoryManagement: true, // ✅ Inventory tracking
      enableAnalytics: true,           // ✅ Advanced analytics
      enableStaffManagement: true,     // ✅ Staff management
      enableMultiVenue: true,          // ✅ Multiple locations
      enableWhiteLabel: true,          // ✅ White-label branding
    },

    limits: {
      maxProducts: -1,               // Unlimited menu items
      maxLanguages: -1,              // Unlimited languages
      maxQRCodes: -1,                // Unlimited QR codes
      maxOrders: -1,                 // Unlimited orders
      maxStaff: -1,                  // Unlimited staff
      maxVenues: -1,                 // Unlimited venues
    },

    branding: {
      badge: 'ENTERPRISE',
      color: 'bg-purple-600',
      icon: '👑',
    }
  }
};

/**
 * Get tier configuration by tier level
 *
 * @param tier - The tier level to get config for
 * @returns Tier configuration object
 */
export function getTierConfig(tier: TierLevel): TierConfig {
  return TIER_CONFIGS[tier];
}

/**
 * Get all available tiers sorted by price (ascending)
 *
 * @returns Array of all tier configs
 */
export function getAllTiers(): TierConfig[] {
  return Object.values(TIER_CONFIGS).sort((a, b) => a.price - b.price);
}

/**
 * Check if a specific feature is available for a tier
 *
 * @param tier - The tier level to check
 * @param feature - The feature key to check
 * @returns True if feature is enabled for this tier
 */
export function isFeatureAvailable(
  tier: TierLevel,
  feature: keyof TierConfig['features']
): boolean {
  return getTierConfig(tier).features[feature];
}

/**
 * Check if a limit has been reached for a tier
 *
 * @param tier - The tier level to check
 * @param limitKey - The limit key to check
 * @param currentValue - The current usage value
 * @returns True if limit has been reached (false if unlimited)
 */
export function isLimitReached(
  tier: TierLevel,
  limitKey: keyof TierConfig['limits'],
  currentValue: number
): boolean {
  const limit = getTierConfig(tier).limits[limitKey];

  // -1 means unlimited
  if (limit === -1) return false;

  return currentValue >= limit;
}

/**
 * Get the next higher tier (for upgrade suggestions)
 *
 * @param currentTier - Current tier level
 * @returns Next tier config, or null if already on highest tier
 */
export function getNextTier(currentTier: TierLevel): TierConfig | null {
  const tiers = getAllTiers();
  const currentIndex = tiers.findIndex(t => t.id === currentTier);

  if (currentIndex === -1 || currentIndex === tiers.length - 1) {
    return null; // Already on highest tier
  }

  return tiers[currentIndex + 1];
}

/**
 * Calculate tier savings when upgrading
 *
 * @param fromTier - Current tier
 * @param toTier - Target tier
 * @returns Object with pricing comparison
 */
export function calculateUpgradeSavings(fromTier: TierLevel, toTier: TierLevel) {
  const from = getTierConfig(fromTier);
  const to = getTierConfig(toTier);

  const monthlyDifference = to.price - from.price;
  const yearlyDifference = monthlyDifference * 12;

  return {
    monthlyDifference,
    yearlyDifference,
    percentageIncrease: Math.round((monthlyDifference / from.price) * 100),
  };
}

/**
 * Tier comparison helper
 * Shows which features are unlocked when upgrading
 *
 * @param fromTier - Current tier
 * @param toTier - Target tier
 * @returns List of newly available features
 */
export function getUpgradeFeatures(fromTier: TierLevel, toTier: TierLevel): string[] {
  const from = getTierConfig(fromTier);
  const to = getTierConfig(toTier);

  const newFeatures: string[] = [];

  // Compare features
  Object.entries(to.features).forEach(([key, value]) => {
    const featureKey = key as keyof TierConfig['features'];
    if (value === true && from.features[featureKey] === false) {
      newFeatures.push(formatFeatureName(key));
    }
  });

  return newFeatures;
}

/**
 * Format feature key to human-readable name
 *
 * @param featureKey - Feature key (e.g., 'enableCart')
 * @returns Human-readable name (e.g., 'Shopping Cart')
 */
function formatFeatureName(featureKey: string): string {
  const nameMap: Record<string, string> = {
    enableCart: 'Shopping Cart',
    enableTableOrdering: 'Table Ordering',
    enableTakeaway: 'Takeaway Orders',
    enableDelivery: 'Delivery Service',
    enableEngagementSystem: 'Customer Engagement System',
    enableInventoryManagement: 'Inventory Management',
    enableAnalytics: 'Advanced Analytics',
    enableStaffManagement: 'Staff Management',
    enableMultiVenue: 'Multi-Venue Support',
    enableWhiteLabel: 'White-Label Branding',
    enablePackages: 'Combo Packages',
    enablePromotions: 'Promotions & Offers',
  };

  return nameMap[featureKey] || featureKey.replace('enable', '').replace(/([A-Z])/g, ' $1').trim();
}

/**
 * Default tier for new accounts
 */
export const DEFAULT_TIER: TierLevel = 'digital-menu';

/**
 * Export tier levels for TypeScript autocomplete
 */
export const TIER_LEVELS: TierLevel[] = ['digital-menu', 'pre-ordering', 'full-suite'];
