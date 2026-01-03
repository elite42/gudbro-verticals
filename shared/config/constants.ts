/**
 * Shared Constants
 * Application-wide constants and configuration values
 */

// ============================================================================
// Application Info
// ============================================================================

export const APP_NAME = 'GUDBRO';
export const APP_VERSION = '1.0.0';

// ============================================================================
// Points Economy
// ============================================================================

export const POINTS = {
  // Tier thresholds
  TIERS: {
    BRONZE: 0,
    SILVER: 1000,
    GOLD: 5000,
    PLATINUM: 15000,
  },

  // Earning multipliers by tier
  TIER_MULTIPLIERS: {
    bronze: 1.0,
    silver: 1.25,
    gold: 1.5,
    platinum: 2.0,
  },

  // Base earning rates (points per euro)
  EARN_RATE: {
    DEFAULT: 10,
    PREMIUM: 15,
    PROMOTIONAL: 20,
  },

  // Expiration
  EXPIRATION_MONTHS: 12,
  EXPIRATION_WARNING_DAYS: 30,
} as const;

// ============================================================================
// Subscriptions
// ============================================================================

export const SUBSCRIPTION = {
  TRIAL_DAYS: 14,
  GRACE_PERIOD_DAYS: 7,

  PLANS: {
    CONSUMER_FREE: 'consumer_free',
    CONSUMER_PREMIUM: 'consumer_premium',
    MERCHANT_STARTER: 'merchant_starter',
    MERCHANT_STANDARD: 'merchant_standard',
    MERCHANT_PREMIUM: 'merchant_premium',
    MERCHANT_ENTERPRISE: 'merchant_enterprise',
  },
} as const;

// ============================================================================
// Badges
// ============================================================================

export const BADGES = {
  CATEGORIES: [
    'onboarding',
    'engagement',
    'social',
    'loyalty',
    'seasonal',
    'merchant',
    'special',
  ],

  RARITIES: ['common', 'uncommon', 'rare', 'epic', 'legendary'],

  // Points awarded by rarity
  POINTS_BY_RARITY: {
    common: 50,
    uncommon: 100,
    rare: 250,
    epic: 500,
    legendary: 1000,
  },
} as const;

// ============================================================================
// Reservations
// ============================================================================

export const RESERVATIONS = {
  MIN_PARTY_SIZE: 1,
  MAX_PARTY_SIZE: 20,
  MIN_ADVANCE_HOURS: 2,
  MAX_ADVANCE_DAYS: 90,

  STATUSES: [
    'pending',
    'confirmed',
    'seated',
    'completed',
    'canceled',
    'no_show',
  ],
} as const;

// ============================================================================
// Social Sharing
// ============================================================================

export const SOCIAL = {
  PLATFORMS: ['facebook', 'twitter', 'whatsapp', 'instagram', 'linkedin', 'email', 'native'],

  POINTS_PER_SHARE: 25,
  POINTS_PER_CONVERSION: 100,
  MAX_SHARES_PER_DAY: 10,
} as const;

// ============================================================================
// API Limits
// ============================================================================

export const API = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,

  RATE_LIMITS: {
    DEFAULT: 100, // requests per minute
    AUTH: 10, // auth requests per minute
    UPLOAD: 20, // uploads per minute
  },
} as const;

// ============================================================================
// Database
// ============================================================================

export const DB = {
  // Ingredient categories
  INGREDIENT_CATEGORIES: [
    'dairy',
    'fats',
    'fruits',
    'grains',
    'herbs',
    'legumes',
    'nuts',
    'other',
    'pasta',
    'proteins',
    'sauces',
    'seafood',
    'spices',
    'spirits',
    'sweeteners',
    'vegetables',
    'vinegars',
    'wines',
  ],

  // Product taxonomy values
  MENU_TYPES: ['bar_menu', 'cafe_menu', 'traditional_course', 'side_dish', 'standalone'],
  SERVICE_TYPES: ['beverage', 'food'],
  CATEGORIES: [
    'appetizer',
    'first_course',
    'second_course',
    'side',
    'dessert',
    'pizza',
    'burger',
    'sandwich',
    'sushi',
    'cocktail',
    'wine',
    'beer',
    'coffee',
    'tea',
  ],
} as const;

// ============================================================================
// Feature Flags
// ============================================================================

export const FEATURES = {
  ENABLE_CRYPTO_PAYMENTS: false,
  ENABLE_SPLIT_BILL: true,
  ENABLE_RECIPES: true,
  ENABLE_RESERVATIONS: true,
  ENABLE_SOCIAL_SHARING: true,
  ENABLE_PREMIUM_CONTENT: true,
} as const;
