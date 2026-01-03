/**
 * Custom types for GUDBRO
 * Types that extend or complement Supabase generated types
 */

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ============================================================================
// Auth Types
// ============================================================================

export interface AuthUser {
  id: string;
  email: string;
  accountId?: string;
  role?: 'consumer' | 'merchant' | 'admin';
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

// ============================================================================
// Points Economy Types
// ============================================================================

export interface PointsTransactionDTO {
  id: string;
  accountId: string;
  amount: number;
  type: 'earn' | 'redeem' | 'expire' | 'bonus' | 'transfer';
  source: string;
  description: string;
  createdAt: string;
}

export interface PointsBalance {
  available: number;
  pending: number;
  lifetime: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  nextTierPoints?: number;
}

// ============================================================================
// Subscription Types
// ============================================================================

export type SubscriptionPlanType =
  | 'consumer_free'
  | 'consumer_premium'
  | 'merchant_starter'
  | 'merchant_standard'
  | 'merchant_premium'
  | 'merchant_enterprise';

export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing' | 'paused';

export interface SubscriptionInfo {
  planId: SubscriptionPlanType;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

// ============================================================================
// Badge Types
// ============================================================================

export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export type BadgeCategory =
  | 'onboarding'
  | 'engagement'
  | 'social'
  | 'loyalty'
  | 'seasonal'
  | 'merchant'
  | 'special';

export interface BadgeProgress {
  badgeId: string;
  currentValue: number;
  targetValue: number;
  percentComplete: number;
  isCompleted: boolean;
}

// ============================================================================
// Notification Types
// ============================================================================

export type NotificationType =
  | 'points_earned'
  | 'badge_unlocked'
  | 'offer_available'
  | 'reservation_confirmed'
  | 'order_status'
  | 'system';

export type NotificationChannel = 'push' | 'email' | 'sms' | 'in_app';

export interface NotificationPayload {
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  channels: NotificationChannel[];
}

// ============================================================================
// Recipe Types
// ============================================================================

export type RecipeDifficulty = 1 | 2 | 3 | 4 | 5;

export interface RecipeIngredient {
  ingredientId: string;
  name: string;
  amount: number;
  unit: string;
  isOptional: boolean;
}

export interface RecipeSummary {
  id: string;
  name: string;
  slug: string;
  coverImage?: string;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  difficulty: RecipeDifficulty;
  servings: number;
  rating?: number;
  ratingCount: number;
  cuisineTags: string[];
  dietTags: string[];
  isPremium: boolean;
}

// ============================================================================
// Reservation Types
// ============================================================================

export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'seated'
  | 'completed'
  | 'canceled'
  | 'no_show';

export interface ReservationRequest {
  merchantId: string;
  date: string;
  time: string;
  partySize: number;
  guestName: string;
  guestPhone?: string;
  guestEmail?: string;
  specialRequests?: string;
}

// ============================================================================
// Menu Types
// ============================================================================

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  imageUrl?: string;
  category: string;
  allergens: string[];
  dietaryTags: string[];
  isAvailable: boolean;
  preparationTime?: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  displayOrder: number;
  items: MenuItem[];
}

// ============================================================================
// Utility Types
// ============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Nullable<T> = T | null;

export type WithTimestamps<T> = T & {
  createdAt: string;
  updatedAt: string;
};
