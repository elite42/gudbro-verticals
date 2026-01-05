// Promotion types for QR Marketing System

// Merchant info for promo landing page
export interface Merchant {
  id: string;
  name: string;
  logo?: string;
  address: string;
  phone?: string;
  rating: number;
  reviewCount: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  placeId: string; // Google Maps place ID
  openNow?: boolean;
  hours?: string; // e.g., "Oggi: 08:00 - 22:00"
}

export type PromotionType =
  | 'discount_percent' // -X% on total
  | 'discount_fixed' // -€X on total
  | 'free_item' // Free product
  | 'buy_x_get_y' // Buy X get Y free
  | 'bundle' // Special bundle price
  | 'loyalty_bonus' // Extra points
  | 'scratch_card' // Digital scratch card (random prize)
  | 'spin_wheel' // Spin wheel for prize
  | 'first_visit' // First time customer reward
  | 'food_challenge'; // Food/drink challenge - finish to win

export type PromotionStatus = 'draft' | 'active' | 'paused' | 'expired' | 'completed';

export type PlacementType = 'offline' | 'online';

export type TriggerAction =
  | 'signup' // User creates account
  | 'social_share' // Share on social media
  | 'follow' // Follow the merchant
  | 'review' // Leave a review
  | 'checkin' // Check-in at location
  | 'minimum_purchase' // Spend minimum amount
  | 'none'; // No action required

// QR Placement - Where external QRs are placed
export interface QRPlacement {
  id: string;
  promotionId: string;

  // Placement info
  type: PlacementType;
  name: string; // "Volantino Centro", "Instagram Bio", "Partner Bar XYZ"
  description?: string;

  // Location (for offline)
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };

  // Online placement details
  platform?: string; // "instagram", "facebook", "google_ads", "partner_website"
  url?: string; // URL where QR is displayed

  // Cost tracking
  cost?: number; // Cost for this placement
  costPeriod?: 'once' | 'daily' | 'weekly' | 'monthly';

  // QR Code
  qrCodeUrl: string;
  shortUrl: string; // gudbro.link/abc123

  // Stats
  scans: number;
  uniqueScans: number;
  conversions: number; // People who completed step 2

  // Dates
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;

  isActive: boolean;
}

// Main Promotion
export interface Promotion {
  id: string;
  merchantId: string;

  // Basic info
  name: string;
  title: string; // Public facing title
  description: string;
  shortDescription: string; // For QR landing page
  image?: string;

  type: PromotionType;
  status: PromotionStatus;

  // Reward details
  reward: {
    discountPercent?: number;
    discountFixed?: number;
    freeItemId?: string;
    freeItemName?: string;
    buyQuantity?: number;
    getQuantity?: number;
    bundleItems?: string[];
    bundlePrice?: number;
    bonusPoints?: number;
    prizes?: {
      // For scratch_card, spin_wheel
      id: string;
      name: string;
      probability: number; // 0-100
      quantity?: number; // Limited quantity
      claimed: number;
    }[];
    // Food Challenge specific
    challenge?: {
      name: string; // "The Mega Burger Challenge"
      items: {
        // What must be consumed
        name: string;
        quantity: string; // "1kg", "2L", "5 pieces"
        description?: string;
      }[];
      timeLimitMinutes: number; // Time to complete (e.g., 30, 45, 60)
      price: number; // Price if you LOSE (e.g., €45)
      rules: string[]; // ["No bathroom breaks", "No sharing", "Must finish everything"]

      // Standard win reward
      winReward: {
        type: 'free' | 'free_plus_cash' | 'free_plus_prize';
        cashPrize?: number; // Cash prize if any (e.g., €50)
        prizeName?: string; // "Wall of Fame + T-Shirt"
        prizeDescription?: string;
      };

      // BONUS for beating the record!
      recordBreakerBonus?: {
        enabled: boolean;
        bonusCash?: number; // Extra cash for new record (e.g., €100)
        bonusPrize?: string; // Extra prize (e.g., "Lifetime 10% discount")
        bonusDescription?: string; // "Batti il record e vinci €100 extra!"
      };

      difficulty: 'easy' | 'medium' | 'hard' | 'extreme';

      // Record tracking
      recordTime?: number; // Current record in minutes (null/undefined = never beaten)
      recordHolder?: string; // Name on wall of fame
      recordDate?: string; // When record was set

      // Stats
      totalAttempts: number; // How many tried
      totalWins: number; // How many succeeded (0 = "nessuno ha mai vinto!")

      // Team challenge
      isTeamChallenge?: boolean; // Can be done as team?
      teamSize?: number; // If team, how many people

      // Availability
      requiresBooking: boolean; // Must book in advance?
      availableDays?: number[]; // Which days available (0-6)
      availableTimeStart?: string; // Start time
      availableTimeEnd?: string; // End time

      // Wall of Fame - Winners with times
      wallOfFame?: {
        rank: number; // 1, 2, 3...
        name: string; // Name or nickname
        time: number; // Completion time in minutes
        date: string; // ISO date
        photo?: string; // Photo URL
        isRecord: boolean; // Is this the current record?
        videoUrl?: string; // Video of the challenge (if any)
      }[];
    };
  };

  // Conditions
  conditions: {
    minPurchase?: number;
    maxUsesTotal?: number; // Total redemptions allowed
    maxUsesPerUser?: number;
    validDays?: number[]; // 0-6 (Sun-Sat)
    validTimeStart?: string; // HH:mm
    validTimeEnd?: string;
    validProducts?: string[]; // Only for specific products
    excludedProducts?: string[];
    newCustomersOnly?: boolean;
    requiresReservation?: boolean;
  };

  // 2-Step QR System
  externalQR: {
    enabled: boolean;
    placements: QRPlacement[];
  };

  // What user must do inside the locale
  triggerAction: TriggerAction;
  triggerDescription?: string; // "Share on Instagram to activate"

  // Dates
  startDate: string;
  endDate: string;

  // Stats
  stats: {
    totalViews: number; // External QR scans
    totalRedemptions: number;
    totalRevenue: number; // Estimated revenue generated
    conversionRate: number; // views -> redemptions
    avgOrderValue: number;
  };

  // Google Maps integration
  googleMapsInfo: {
    enabled: boolean;
    placeId?: string;
    showDirections: boolean;
    showReviews: boolean;
  };

  // Metadata
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// For creating promotions
export interface PromotionFormData {
  name: string;
  title: string;
  description: string;
  shortDescription: string;
  image?: string;
  type: PromotionType;

  reward: Promotion['reward'];
  conditions: Promotion['conditions'];

  externalQREnabled: boolean;
  triggerAction: TriggerAction;
  triggerDescription?: string;

  startDate: string;
  endDate: string;

  googleMapsEnabled: boolean;

  tags?: string[];
}

// Placement form data
export interface PlacementFormData {
  type: PlacementType;
  name: string;
  description?: string;
  address?: string;
  platform?: string;
  url?: string;
  cost?: number;
  costPeriod?: 'once' | 'daily' | 'weekly' | 'monthly';
  startDate: string;
  endDate?: string;
}

// Promotion type metadata
export const PROMOTION_TYPE_CONFIG: Record<
  PromotionType,
  {
    label: string;
    icon: string;
    color: string;
    description: string;
  }
> = {
  discount_percent: {
    label: 'Sconto %',
    icon: '🏷️',
    color: 'bg-green-100 text-green-700',
    description: 'Sconto percentuale sul totale',
  },
  discount_fixed: {
    label: 'Sconto Fisso',
    icon: '💵',
    color: 'bg-emerald-100 text-emerald-700',
    description: 'Sconto fisso in euro',
  },
  free_item: {
    label: 'Omaggio',
    icon: '🎁',
    color: 'bg-pink-100 text-pink-700',
    description: 'Prodotto gratuito',
  },
  buy_x_get_y: {
    label: 'Prendi X Paghi Y',
    icon: '🛒',
    color: 'bg-blue-100 text-blue-700',
    description: 'Es: Prendi 3 paghi 2',
  },
  bundle: {
    label: 'Bundle',
    icon: '📦',
    color: 'bg-purple-100 text-purple-700',
    description: 'Combo a prezzo speciale',
  },
  loyalty_bonus: {
    label: 'Bonus Punti',
    icon: '⭐',
    color: 'bg-amber-100 text-amber-700',
    description: 'Punti fedeltà extra',
  },
  scratch_card: {
    label: 'Gratta e Vinci',
    icon: '🎰',
    color: 'bg-red-100 text-red-700',
    description: 'Carta digitale con premio casuale',
  },
  spin_wheel: {
    label: 'Ruota della Fortuna',
    icon: '🎡',
    color: 'bg-indigo-100 text-indigo-700',
    description: 'Gira la ruota per vincere',
  },
  first_visit: {
    label: 'Prima Visita',
    icon: '👋',
    color: 'bg-teal-100 text-teal-700',
    description: 'Sconto per nuovi clienti',
  },
  food_challenge: {
    label: 'Food Challenge',
    icon: '🏆',
    color: 'bg-orange-100 text-orange-700',
    description: 'Sfida alimentare - finisci per vincere!',
  },
};

export const TRIGGER_ACTION_CONFIG: Record<
  TriggerAction,
  {
    label: string;
    icon: string;
    description: string;
  }
> = {
  signup: {
    label: 'Registrazione',
    icon: '📝',
    description: "L'utente deve creare un account",
  },
  social_share: {
    label: 'Condivisione Social',
    icon: '📱',
    description: 'Condividi su Instagram/Facebook',
  },
  follow: {
    label: 'Follow',
    icon: '❤️',
    description: 'Segui il locale su GUDBRO',
  },
  review: {
    label: 'Recensione',
    icon: '⭐',
    description: 'Lascia una recensione',
  },
  checkin: {
    label: 'Check-in',
    icon: '📍',
    description: 'Fai check-in al locale',
  },
  minimum_purchase: {
    label: 'Acquisto Minimo',
    icon: '💳',
    description: 'Spendi almeno €X',
  },
  none: {
    label: 'Nessuna Azione',
    icon: '✅',
    description: 'Promozione automatica',
  },
};

export const PLACEMENT_TYPE_CONFIG: Record<
  PlacementType,
  {
    label: string;
    icon: string;
    examples: string[];
  }
> = {
  offline: {
    label: 'Offline',
    icon: '📍',
    examples: ['Volantini', 'Manifesti', 'Biglietti da visita', 'Partner locali', 'Eventi'],
  },
  online: {
    label: 'Online',
    icon: '🌐',
    examples: ['Instagram Bio', 'Facebook', 'Google Ads', 'Sito partner', 'Email marketing'],
  },
};

// Data structure for promo landing page (includes merchant info)
export interface PromoLandingPageData {
  code: string; // Short code from URL
  promotion: Promotion;
  merchant: Merchant;
  placement?: {
    // Which placement was scanned
    id: string;
    name: string;
    type: PlacementType;
  };
  validUntil: string; // Formatted end date
  isSaved: boolean; // User saved this promo
  isRedeemed: boolean; // User already redeemed
}
