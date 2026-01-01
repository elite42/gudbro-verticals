/**
 * LOYALTY PROGRAM TYPES
 *
 * Unified loyalty system that integrates:
 * - Points earning (purchases, actions, social, referrals)
 * - Rewards redemption
 * - Tier progression
 * - Social sharing with pre-packaged messages
 *
 * All settings are configurable by the merchant via backoffice.
 */

// ============================================
// LOYALTY TIERS
// ============================================

export type LoyaltyTierId = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface LoyaltyTier {
  id: LoyaltyTierId;
  name: string;
  nameIt: string;
  icon: string;
  color: string;                    // Tailwind color class
  gradientFrom: string;
  gradientTo: string;
  minPoints: number;                // Points needed to reach this tier
  maxPoints: number | null;         // null for highest tier
  pointsMultiplier: number;         // e.g., 1.1 = +10% bonus points
  benefits: TierBenefit[];
}

export interface TierBenefit {
  id: string;
  icon: string;
  label: string;
  labelIt: string;
  description?: string;
  descriptionIt?: string;
}

export const DEFAULT_TIERS: LoyaltyTier[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    nameIt: 'Bronzo',
    icon: '🥉',
    color: 'text-amber-700',
    gradientFrom: 'from-amber-600',
    gradientTo: 'to-amber-800',
    minPoints: 0,
    maxPoints: 499,
    pointsMultiplier: 1.0,
    benefits: [
      { id: 'base_points', icon: '💰', label: 'Earn points on purchases', labelIt: 'Accumula punti sugli acquisti' },
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    nameIt: 'Argento',
    icon: '🥈',
    color: 'text-gray-400',
    gradientFrom: 'from-gray-400',
    gradientTo: 'to-gray-600',
    minPoints: 500,
    maxPoints: 1999,
    pointsMultiplier: 1.1,
    benefits: [
      { id: 'bonus_10', icon: '⭐', label: '+10% bonus points', labelIt: '+10% punti bonus' },
      { id: 'birthday', icon: '🎂', label: 'Birthday reward', labelIt: 'Regalo di compleanno' },
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    nameIt: 'Oro',
    icon: '🥇',
    color: 'text-yellow-500',
    gradientFrom: 'from-yellow-400',
    gradientTo: 'to-amber-500',
    minPoints: 2000,
    maxPoints: 4999,
    pointsMultiplier: 1.2,
    benefits: [
      { id: 'bonus_20', icon: '⭐', label: '+20% bonus points', labelIt: '+20% punti bonus' },
      { id: 'exclusive_rewards', icon: '🎁', label: 'Exclusive rewards', labelIt: 'Premi esclusivi' },
      { id: 'priority', icon: '⚡', label: 'Priority service', labelIt: 'Servizio prioritario' },
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    nameIt: 'Platino',
    icon: '💎',
    color: 'text-cyan-400',
    gradientFrom: 'from-cyan-400',
    gradientTo: 'to-blue-500',
    minPoints: 5000,
    maxPoints: 9999,
    pointsMultiplier: 1.3,
    benefits: [
      { id: 'bonus_30', icon: '⭐', label: '+30% bonus points', labelIt: '+30% punti bonus' },
      { id: 'reserved_table', icon: '🪑', label: 'Reserved table', labelIt: 'Tavolo riservato' },
      { id: 'vip_events', icon: '🎉', label: 'VIP event access', labelIt: 'Accesso eventi VIP' },
    ],
  },
  {
    id: 'diamond',
    name: 'Diamond',
    nameIt: 'Diamante',
    icon: '💠',
    color: 'text-purple-400',
    gradientFrom: 'from-purple-400',
    gradientTo: 'to-pink-500',
    minPoints: 10000,
    maxPoints: null,
    pointsMultiplier: 1.5,
    benefits: [
      { id: 'bonus_50', icon: '⭐', label: '+50% bonus points', labelIt: '+50% punti bonus' },
      { id: 'personal_concierge', icon: '👤', label: 'Personal concierge', labelIt: 'Concierge personale' },
      { id: 'free_delivery', icon: '🚗', label: 'Free delivery', labelIt: 'Consegna gratuita' },
      { id: 'exclusive_tastings', icon: '🍷', label: 'Exclusive tastings', labelIt: 'Degustazioni esclusive' },
    ],
  },
];

// ============================================
// POINTS EARNING ACTIONS
// ============================================

export type PointsActionType =
  // Purchase-based
  | 'purchase'              // Points per € spent
  | 'first_purchase'        // Bonus for first order
  // Engagement
  | 'checkin'               // Check-in at venue
  | 'follow'                // Follow the merchant
  | 'birthday'              // Birthday bonus
  | 'anniversary'           // Account anniversary
  // Social
  | 'share_intent'          // Clicked share (unverified)
  | 'share_verified'        // Verified post with hashtag
  | 'review_google'         // Google review
  | 'review_tripadvisor'    // TripAdvisor review
  | 'story_mention'         // Instagram/TikTok story mention
  | 'photo_upload'          // Upload photo of dish
  // Referral
  | 'referral_signup'       // Friend signs up with code
  | 'referral_purchase'     // Friend makes first purchase
  // Events
  | 'event_attendance'      // Attend an event
  | 'event_rsvp'            // RSVP to event
  // Gamification
  | 'streak_bonus'          // Consecutive visits
  | 'challenge_complete'    // Complete a challenge
  | 'survey_complete';      // Complete a survey

export interface PointsAction {
  type: PointsActionType;
  name: string;
  nameIt: string;
  description: string;
  descriptionIt: string;
  icon: string;
  category: 'purchase' | 'engagement' | 'social' | 'referral' | 'event' | 'gamification';
  // Points configuration
  points: number;                   // Fixed points for this action
  pointsPerUnit?: number;           // For purchase: points per €1
  maxPointsPerDay?: number;         // Daily cap
  maxPointsTotal?: number;          // Lifetime cap (for one-time actions)
  cooldownHours?: number;           // Hours between earning
  // Requirements
  requiresVerification: boolean;    // Needs staff/system verification
  requiresPhoto?: boolean;
  requiresLocation?: boolean;
  minPurchaseAmount?: number;       // For purchase-related
  // Status
  enabled: boolean;
}

export const DEFAULT_POINTS_ACTIONS: PointsAction[] = [
  // Purchase
  {
    type: 'purchase',
    name: 'Purchase',
    nameIt: 'Acquisto',
    description: 'Earn points on every purchase',
    descriptionIt: 'Guadagna punti su ogni acquisto',
    icon: '🛒',
    category: 'purchase',
    points: 0,
    pointsPerUnit: 1,  // 1 point per €1
    requiresVerification: false,
    enabled: true,
  },
  {
    type: 'first_purchase',
    name: 'First Purchase Bonus',
    nameIt: 'Bonus Primo Acquisto',
    description: 'Welcome bonus on your first order',
    descriptionIt: 'Bonus di benvenuto sul primo ordine',
    icon: '🎉',
    category: 'purchase',
    points: 50,
    maxPointsTotal: 50,
    requiresVerification: false,
    enabled: true,
  },
  // Engagement
  {
    type: 'checkin',
    name: 'Check-in',
    nameIt: 'Check-in',
    description: 'Check in when you visit',
    descriptionIt: 'Fai check-in quando visiti',
    icon: '📍',
    category: 'engagement',
    points: 10,
    maxPointsPerDay: 10,
    cooldownHours: 4,
    requiresVerification: false,
    requiresLocation: true,
    enabled: true,
  },
  {
    type: 'follow',
    name: 'Follow Us',
    nameIt: 'Seguici',
    description: 'Follow our profile',
    descriptionIt: 'Segui il nostro profilo',
    icon: '❤️',
    category: 'engagement',
    points: 25,
    maxPointsTotal: 25,
    requiresVerification: false,
    enabled: true,
  },
  {
    type: 'birthday',
    name: 'Birthday Bonus',
    nameIt: 'Bonus Compleanno',
    description: 'Special points on your birthday',
    descriptionIt: 'Punti speciali per il tuo compleanno',
    icon: '🎂',
    category: 'engagement',
    points: 100,
    requiresVerification: false,
    enabled: true,
  },
  // Social
  {
    type: 'share_intent',
    name: 'Share',
    nameIt: 'Condividi',
    description: 'Share on social media',
    descriptionIt: 'Condividi sui social',
    icon: '📤',
    category: 'social',
    points: 15,
    maxPointsPerDay: 30,
    cooldownHours: 2,
    requiresVerification: false,
    enabled: true,
  },
  {
    type: 'share_verified',
    name: 'Verified Post',
    nameIt: 'Post Verificato',
    description: 'Post with our hashtag (verified)',
    descriptionIt: 'Post con nostro hashtag (verificato)',
    icon: '✅',
    category: 'social',
    points: 50,
    maxPointsPerDay: 50,
    requiresVerification: true,
    enabled: true,
  },
  {
    type: 'photo_upload',
    name: 'Photo Upload',
    nameIt: 'Carica Foto',
    description: 'Share a photo of your experience',
    descriptionIt: 'Condividi una foto della tua esperienza',
    icon: '📸',
    category: 'social',
    points: 25,
    maxPointsPerDay: 50,
    requiresVerification: false,
    requiresPhoto: true,
    enabled: true,
  },
  {
    type: 'review_google',
    name: 'Google Review',
    nameIt: 'Recensione Google',
    description: 'Leave a Google review',
    descriptionIt: 'Lascia una recensione su Google',
    icon: '⭐',
    category: 'social',
    points: 100,
    maxPointsTotal: 100,
    requiresVerification: true,
    enabled: true,
  },
  {
    type: 'review_tripadvisor',
    name: 'TripAdvisor Review',
    nameIt: 'Recensione TripAdvisor',
    description: 'Leave a TripAdvisor review',
    descriptionIt: 'Lascia una recensione su TripAdvisor',
    icon: '🦉',
    category: 'social',
    points: 100,
    maxPointsTotal: 100,
    requiresVerification: true,
    enabled: true,
  },
  // Referral
  {
    type: 'referral_signup',
    name: 'Referral Sign Up',
    nameIt: 'Amico Iscritto',
    description: 'Friend signs up with your code',
    descriptionIt: 'Un amico si iscrive con il tuo codice',
    icon: '👥',
    category: 'referral',
    points: 100,
    requiresVerification: false,
    enabled: true,
  },
  {
    type: 'referral_purchase',
    name: 'Referral Purchase',
    nameIt: 'Acquisto Amico',
    description: 'Friend makes their first purchase',
    descriptionIt: 'Un amico fa il primo acquisto',
    icon: '🎁',
    category: 'referral',
    points: 200,
    requiresVerification: false,
    enabled: true,
  },
  // Events
  {
    type: 'event_attendance',
    name: 'Event Attendance',
    nameIt: 'Partecipazione Evento',
    description: 'Attend a special event',
    descriptionIt: 'Partecipa a un evento speciale',
    icon: '🎪',
    category: 'event',
    points: 50,
    requiresVerification: true,
    enabled: true,
  },
  // Gamification
  {
    type: 'streak_bonus',
    name: 'Visit Streak',
    nameIt: 'Serie Visite',
    description: 'Bonus for consecutive weekly visits',
    descriptionIt: 'Bonus per visite settimanali consecutive',
    icon: '🔥',
    category: 'gamification',
    points: 25,  // Per week in streak
    requiresVerification: false,
    enabled: true,
  },
];

// ============================================
// REWARDS (Redeemable with points)
// ============================================

export type RewardType =
  | 'free_item'         // Free specific item
  | 'discount_percent'  // Percentage discount
  | 'discount_fixed'    // Fixed amount discount
  | 'free_upgrade'      // Free size upgrade
  | 'experience'        // Special experience (tasting, etc.)
  | 'merch'             // Merchandise
  | 'custom';           // Custom reward

export interface Reward {
  id: string;
  name: string;
  nameIt: string;
  description: string;
  descriptionIt: string;
  icon: string;
  image?: string;
  type: RewardType;
  // Cost
  pointsCost: number;
  // Value
  value?: number;               // For discounts: amount or percentage
  productId?: string;           // For free_item: specific product
  categoryId?: string;          // For category-wide rewards
  // Restrictions
  minTier?: LoyaltyTierId;      // Minimum tier required
  minPurchaseAmount?: number;   // Minimum order to use
  maxUsesPerCustomer?: number;  // Lifetime limit per customer
  maxUsesTotal?: number;        // Total available
  usesRemaining?: number;       // Current availability
  // Validity
  validFrom?: string;           // ISO date
  validUntil?: string;          // ISO date
  validDays?: number[];         // 0-6 (Sun-Sat)
  validTimeStart?: string;      // HH:mm
  validTimeEnd?: string;        // HH:mm
  // Status
  enabled: boolean;
  featured: boolean;
}

// ============================================
// SOCIAL SHARING TEMPLATES
// ============================================

export type SharePlatform = 'instagram' | 'facebook' | 'tiktok' | 'twitter' | 'whatsapp' | 'native';

export interface ShareTemplate {
  id: string;
  name: string;
  nameIt: string;
  description: string;
  descriptionIt: string;
  icon: string;
  // Template content
  platforms: SharePlatform[];
  hashtags: string[];           // Without #, e.g., ['CaffeRossi', 'CoffeeTime']
  mentions: string[];           // Without @, e.g., ['cafferossi']
  messageTemplate: string;      // {dish}, {merchant}, {user} placeholders
  messageTemplateIt: string;
  // Points
  pointsReward: number;
  // Type of share
  requiresPhoto: boolean;
  suggestedPhotoType?: 'dish' | 'drink' | 'selfie' | 'ambiance' | 'any';
  // Prompt for user
  callToAction: string;
  callToActionIt: string;
}

export const DEFAULT_SHARE_TEMPLATES: ShareTemplate[] = [
  {
    id: 'dish_photo',
    name: 'Share Your Dish',
    nameIt: 'Condividi il Piatto',
    description: 'Take a photo of your dish and share it',
    descriptionIt: 'Fai una foto al piatto e condividila',
    icon: '🍽️',
    platforms: ['instagram', 'facebook', 'tiktok', 'native'],
    hashtags: ['FoodPorn', 'Foodie', 'InstaFood'],
    mentions: [],  // Will be filled from merchant config
    messageTemplate: "Enjoying this amazing {dish} at {merchant}! 😋",
    messageTemplateIt: "Sto gustando questo fantastico {dish} da {merchant}! 😋",
    pointsReward: 25,
    requiresPhoto: true,
    suggestedPhotoType: 'dish',
    callToAction: 'Snap & Share',
    callToActionIt: 'Scatta e Condividi',
  },
  {
    id: 'drink_photo',
    name: 'Share Your Drink',
    nameIt: 'Condividi il Drink',
    description: 'Show off your cocktail or coffee',
    descriptionIt: 'Mostra il tuo cocktail o caffè',
    icon: '🍹',
    platforms: ['instagram', 'facebook', 'tiktok', 'native'],
    hashtags: ['Cocktails', 'DrinkPorn', 'CheersToTheWeekend'],
    mentions: [],
    messageTemplate: "Cheers! 🥂 Having a {dish} at {merchant}",
    messageTemplateIt: "Cin cin! 🥂 Un {dish} da {merchant}",
    pointsReward: 25,
    requiresPhoto: true,
    suggestedPhotoType: 'drink',
    callToAction: 'Snap & Share',
    callToActionIt: 'Scatta e Condividi',
  },
  {
    id: 'selfie',
    name: 'Selfie Time',
    nameIt: 'Selfie Time',
    description: 'Take a selfie at the venue',
    descriptionIt: 'Fai un selfie nel locale',
    icon: '🤳',
    platforms: ['instagram', 'facebook', 'tiktok', 'native'],
    hashtags: ['Vibes', 'GoodTimes', 'WithFriends'],
    mentions: [],
    messageTemplate: "Great vibes at {merchant}! 📍",
    messageTemplateIt: "Atmosfera fantastica da {merchant}! 📍",
    pointsReward: 20,
    requiresPhoto: true,
    suggestedPhotoType: 'selfie',
    callToAction: 'Take a Selfie',
    callToActionIt: 'Fai un Selfie',
  },
  {
    id: 'recommend',
    name: 'Recommend to Friends',
    nameIt: 'Consiglia agli Amici',
    description: 'Tell your friends about us',
    descriptionIt: 'Racconta di noi ai tuoi amici',
    icon: '💬',
    platforms: ['whatsapp', 'native'],
    hashtags: [],
    mentions: [],
    messageTemplate: "Hey! You should check out {merchant} - great food and vibes! 🔥",
    messageTemplateIt: "Ehi! Dovresti provare {merchant} - ottimo cibo e atmosfera! 🔥",
    pointsReward: 15,
    requiresPhoto: false,
    callToAction: 'Share with Friends',
    callToActionIt: 'Condividi con Amici',
  },
  {
    id: 'story_mention',
    name: 'Story Mention',
    nameIt: 'Menziona nelle Storie',
    description: 'Mention us in your story',
    descriptionIt: 'Menzionaci nella tua storia',
    icon: '📱',
    platforms: ['instagram', 'tiktok'],
    hashtags: [],
    mentions: [],
    messageTemplate: '',  // Stories usually just have the tag
    messageTemplateIt: '',
    pointsReward: 30,
    requiresPhoto: true,
    suggestedPhotoType: 'any',
    callToAction: 'Add to Story',
    callToActionIt: 'Aggiungi alla Storia',
  },
];

// ============================================
// USER LOYALTY STATE
// ============================================

export interface UserLoyaltyState {
  pointsTotal: number;                // Total earned (lifetime)
  pointsAvailable: number;            // Current spendable balance
  pointsSpent: number;                // Total redeemed
  tierId: LoyaltyTierId;
  tierProgress: number;               // 0-100 progress to next tier
  pointsToNextTier: number | null;    // null if max tier

  // Streaks
  currentStreak: number;              // Consecutive weeks
  longestStreak: number;
  lastVisitDate: string | null;       // ISO date

  // Stats
  totalPurchases: number;
  totalSpent: number;                 // In base currency
  favoriteItems: string[];            // Product IDs
  rewardsRedeemed: number;

  // Referrals
  referralCode: string;
  referralsCount: number;
  referralPointsEarned: number;

  // Social
  socialSharesCount: number;
  socialPointsEarned: number;
  connectedSocials: SharePlatform[];

  // Timestamps
  joinedAt: string;                   // ISO datetime
  lastActivityAt: string;             // ISO datetime
  birthdayMonth?: number;             // 1-12
}

// ============================================
// POINTS TRANSACTION (History)
// ============================================

export interface PointsTransaction {
  id: string;
  userId: string;
  type: 'earn' | 'redeem' | 'expire' | 'adjust';
  actionType?: PointsActionType;      // For 'earn'
  rewardId?: string;                  // For 'redeem'
  points: number;                     // Positive for earn, negative for redeem
  balanceAfter: number;
  description: string;
  descriptionIt: string;
  // Metadata
  orderId?: string;
  orderAmount?: number;
  referralUserId?: string;
  eventId?: string;
  // Timestamps
  createdAt: string;
  expiresAt?: string;                 // Points expiration
}

// ============================================
// MERCHANT LOYALTY CONFIGURATION
// ============================================

export interface LoyaltyConfig {
  // Basic settings
  enabled: boolean;
  programName: string;
  programNameIt: string;

  // Points earning
  pointsPerCurrency: number;          // Points per €1 spent
  roundingMode: 'floor' | 'ceil' | 'round';
  minPurchaseForPoints: number;       // Minimum order to earn points

  // Tiers
  tiersEnabled: boolean;
  customTiers?: LoyaltyTier[];        // Override defaults

  // Actions
  actionsConfig: Partial<Record<PointsActionType, {
    enabled: boolean;
    points: number;
    maxPerDay?: number;
  }>>;

  // Rewards
  rewards: Reward[];

  // Social sharing
  socialEnabled: boolean;
  merchantHashtags: string[];         // e.g., ['CaffeRossi']
  merchantMentions: Record<SharePlatform, string>;  // Platform -> handle
  shareTemplates: ShareTemplate[];

  // Referral
  referralEnabled: boolean;
  referralRewardReferrer: number;     // Points for referrer
  referralRewardReferee: number;      // Points for new user

  // Points expiration
  pointsExpireAfterMonths: number | null;  // null = never expire

  // Notifications
  notifyOnPointsEarned: boolean;
  notifyOnTierChange: boolean;
  notifyOnRewardAvailable: boolean;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get tier for a given points total
 */
export function getTierForPoints(
  points: number,
  tiers: LoyaltyTier[] = DEFAULT_TIERS
): LoyaltyTier {
  // Sort by minPoints descending to find highest matching tier
  const sortedTiers = [...tiers].sort((a, b) => b.minPoints - a.minPoints);
  for (const tier of sortedTiers) {
    if (points >= tier.minPoints) {
      return tier;
    }
  }
  return tiers[0]; // Default to first tier
}

/**
 * Calculate progress to next tier
 */
export function getTierProgress(
  points: number,
  currentTier: LoyaltyTier,
  tiers: LoyaltyTier[] = DEFAULT_TIERS
): { progress: number; pointsToNext: number | null; nextTier: LoyaltyTier | null } {
  // Find next tier
  const sortedTiers = [...tiers].sort((a, b) => a.minPoints - b.minPoints);
  const currentIndex = sortedTiers.findIndex(t => t.id === currentTier.id);
  const nextTier = currentIndex < sortedTiers.length - 1 ? sortedTiers[currentIndex + 1] : null;

  if (!nextTier) {
    return { progress: 100, pointsToNext: null, nextTier: null };
  }

  const pointsInCurrentTier = points - currentTier.minPoints;
  const tierRange = nextTier.minPoints - currentTier.minPoints;
  const progress = Math.min(100, Math.round((pointsInCurrentTier / tierRange) * 100));
  const pointsToNext = nextTier.minPoints - points;

  return { progress, pointsToNext, nextTier };
}

/**
 * Format share message with placeholders
 */
export function formatShareMessage(
  template: string,
  data: {
    dish?: string;
    merchant: string;
    user?: string;
  }
): string {
  return template
    .replace('{dish}', data.dish || '')
    .replace('{merchant}', data.merchant)
    .replace('{user}', data.user || '');
}

/**
 * Build share URL for platform
 */
export function buildShareUrl(
  platform: SharePlatform,
  message: string,
  url: string,
  hashtags: string[]
): string {
  const encodedMessage = encodeURIComponent(message);
  const encodedUrl = encodeURIComponent(url);
  const hashtagString = hashtags.map(h => `#${h}`).join(' ');

  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}&hashtags=${hashtags.join(',')}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`;
    case 'whatsapp':
      return `https://wa.me/?text=${encodedMessage}%20${encodedUrl}`;
    case 'native':
    default:
      return ''; // Use Web Share API
  }
}
