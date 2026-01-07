// Event types for PWA and Backoffice
// Complete event management system for restaurants, bars, and venues

// ============================================
// EVENT TYPES - Categorized by purpose
// ============================================

export type EventType =
  // Entertainment
  | 'live_music' // Concerti, jazz night, acoustic
  | 'dj_set' // House, techno, commercial
  | 'karaoke' // Karaoke night
  | 'trivia_night' // Quiz a squadre con premi
  | 'game_night' // Board games, beer pong, bar olympics
  | 'comedy_night' // Stand-up comedy
  | 'open_mic' // Artisti emergenti
  | 'theme_night' // Anni '80, '90, Halloween, etc.
  // Food & Beverage
  | 'tasting' // Degustazione vini, whiskey, birre
  | 'pairing' // Abbinamenti cibo-vino
  | 'chefs_table' // Cena esclusiva con chef
  | 'cooking_class' // Lezione di cucina
  | 'menu_launch' // Lancio nuovo menu
  | 'food_tour' // Percorso gastronomico
  | 'food_challenge' // Sfida alimentare - finisci per vincere!
  // Time-based Promos
  | 'happy_hour' // Happy hour standard
  | 'brunch' // Weekend brunch
  | 'lunch_special' // Business lunch
  | 'late_night' // After midnight specials
  // Sports
  | 'sports_viewing' // Partite, F1, boxe, UFC
  // Community & Business
  | 'networking' // Business networking
  | 'charity' // Evento beneficenza
  | 'book_club' // Club del libro
  | 'wine_club' // Club del vino
  | 'singles_night' // Speed dating, singles
  // Private & Corporate
  | 'private_party' // Festa privata
  | 'corporate' // Evento aziendale
  | 'birthday' // Compleanno
  | 'anniversary' // Anniversario
  // Special Occasions
  | 'holiday' // Natale, Capodanno, Pasqua
  | 'special_menu' // Menu speciale stagionale
  | 'closure' // Chiusura per evento privato
  | 'other';

export type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed';

export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'biweekly' | 'monthly';

// ============================================
// VENUE STATUS - Impact on venue availability
// ============================================

export type VenueStatus =
  | 'open' // Normale operatività
  | 'partial' // Parzialmente disponibile (area riservata)
  | 'reservation_only' // Solo su prenotazione
  | 'members_only' // Solo membri/iscritti
  | 'closed'; // Chiuso al pubblico

// ============================================
// PROMOTION MECHANICS - How discounts work
// ============================================

export type PromoMechanic =
  | 'percent_off' // -X% sul prezzo
  | 'fixed_discount' // -€X sul prezzo
  | 'fixed_price' // Prezzo fisso speciale
  | 'bogo' // Buy One Get One Free
  | 'bogoho' // Buy One Get One Half Off
  | 'buy_x_get_y' // Compra X prendi Y (es. 3x2)
  | 'bundle' // Combo a prezzo speciale
  | 'free_item' // Omaggio con acquisto
  | 'bottomless' // Illimitato (es. prosecco)
  | 'points_multiplier' // Punti fedeltà moltiplicati
  | 'points_bonus' // Punti fedeltà extra
  | 'free_upgrade' // Upgrade gratuito (es. size)
  | 'kids_free' // Bambini gratis
  | 'group_discount' // Sconto gruppo
  | 'early_bird' // Sconto primi arrivati
  | 'last_minute' // Sconto ultima ora
  | 'none';

// ============================================
// EVENT PROMOTION - Discount during event
// ============================================

export interface EventPromotion {
  id: string;
  name: string; // "Happy Hour Cocktails"
  description?: string;

  // Mechanic
  mechanic: PromoMechanic;
  value?: number; // 20 per 20%, 10 per €10, 2 per 2x
  secondaryValue?: number; // For buy_x_get_y: buy X, get Y

  // Legacy/Compat fields (used by some UI components)
  type?: 'discount' | 'freeItem' | 'freebie' | 'bundle' | 'special'; // Simplified type for UI
  discountPercent?: number; // Alias for value when type is 'discount'

  // What it applies to
  applicableTo: 'all' | 'categories' | 'products' | 'tags';
  categoryIds?: string[]; // Categories included
  productIds?: string[]; // Products included
  productTags?: string[]; // Tags included (e.g., 'cocktails', 'appetizers')
  excludedProductIds?: string[]; // Products excluded

  // Conditions
  minPurchase?: number; // Minimum order amount
  minQuantity?: number; // Minimum items
  maxUsesPerCustomer?: number; // Max uses per person
  maxTotalUses?: number; // Max total redemptions
  requiresLoyaltyMember?: boolean; // Only for loyalty members

  // Time restrictions within event
  validFrom?: string; // HH:mm - start time for promo
  validTo?: string; // HH:mm - end time for promo

  // Display
  badge?: string; // "2x1", "-30%", "GRATIS"
  badgeColor?: string; // Tailwind color class
  highlighted?: boolean; // Show prominently

  // Stats
  usageCount?: number;
}

// ============================================
// LOYALTY BONUS - Points during event
// ============================================

export interface EventLoyaltyBonus {
  enabled: boolean;
  pointsMultiplier?: number; // e.g., 2 = double points during event
  bonusPoints?: number; // flat bonus for attendance
  exclusiveReward?: string; // special reward ID
  vipOnly?: boolean; // Only for VIP tier
}

// ============================================
// MAIN EVENT INTERFACE
// ============================================

export interface Event {
  id: string;
  merchantId: string;

  // Basic info
  title: string;
  description: string;
  shortDescription?: string;
  image?: string;
  coverImage?: string; // Wide banner image
  eventType: EventType;
  status: EventStatus;

  // Timing
  startDate: string; // ISO date YYYY-MM-DD
  endDate: string; // ISO date
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  timezone?: string;

  // Recurrence
  recurrence: RecurrenceType;
  recurrenceDays?: number[]; // 0-6 (Sun-Sat) for weekly
  recurrenceEndDate?: string;
  recurrenceExceptions?: string[]; // Dates to skip

  // ============================================
  // VENUE IMPACT - How event affects the venue
  // ============================================
  venueStatus: VenueStatus;
  affectedAreas?: string[]; // ["Sala 1", "Terrazza"]
  availableAreas?: string[]; // Areas still open to public
  reducedCapacity?: number; // If capacity is limited

  // ============================================
  // MENU IMPACT - How event affects the menu
  // ============================================
  menuImpact?: {
    useSpecialMenu: boolean; // Use a dedicated event menu
    specialMenuId?: string; // ID of special menu
    disabledCategories?: string[]; // Categories not available
    disabledProducts?: string[]; // Products not available
    featuredProducts?: string[]; // Products to highlight
    featuredCategories?: string[]; // Categories to highlight
    limitedStock?: {
      // Products with limited availability
      productId: string;
      quantity: number;
      remaining?: number;
    }[];
  };

  // ============================================
  // PROMOTIONS - Active during event
  // ============================================
  promotions?: EventPromotion[];

  // ============================================
  // ACCESS & REQUIREMENTS
  // ============================================
  requiresReservation: boolean;
  reservationLink?: string;
  reservationDeadline?: string; // ISO datetime - book before this
  maxReservationsPerPerson?: number;

  entranceFee?: number;
  entranceFeeCurrency?: string;
  entranceFeeIncludesConsumation?: boolean;
  entranceFeeConsumationValue?: number;

  prepaymentRequired?: boolean;
  prepaymentAmount?: number;
  prepaymentDeadline?: string;

  ageRestriction?: number;
  dressCode?: string;
  memberOnly?: boolean;

  // Location & Capacity
  location?: string; // 'main_room' | 'terrace' | 'private_room' | custom
  maxCapacity?: number;
  currentAttendees?: number;
  waitlistEnabled?: boolean;
  waitlistCount?: number;

  // ============================================
  // LOYALTY INTEGRATION
  // ============================================
  loyaltyBonus?: EventLoyaltyBonus;

  // ============================================
  // PERFORMER / ENTERTAINMENT
  // ============================================
  performer?: {
    name: string;
    genre?: string;
    image?: string;
    bio?: string;
    socialLinks?: {
      instagram?: string;
      spotify?: string;
      youtube?: string;
      website?: string;
    };
  };

  // For sports events
  sportsInfo?: {
    sport:
      | 'football'
      | 'basketball'
      | 'tennis'
      | 'f1'
      | 'motogp'
      | 'boxing'
      | 'ufc'
      | 'rugby'
      | 'other';
    homeTeam?: string;
    awayTeam?: string;
    competition?: string; // "Serie A", "Champions League"
    broadcastChannel?: string;
  };

  // For food/drink challenge events
  challengeInfo?: {
    name: string; // "The Mega Burger Challenge"
    items: {
      // What must be consumed
      name: string;
      quantity: string; // "1kg", "2L", "5 pieces"
      description?: string;
    }[];
    timeLimitMinutes: number; // Time to complete (e.g., 30, 45, 60)
    priceIfLose: number; // Price if you LOSE (e.g., €45)

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

    rules: string[]; // ["No bathroom breaks", "No sharing"]
    difficulty: 'easy' | 'medium' | 'hard' | 'extreme';

    // Record tracking
    recordTime?: number; // Current record in minutes (null = never beaten)
    recordHolder?: string; // Name on wall of fame
    recordDate?: string; // When record was set

    // Stats
    totalAttempts: number; // How many tried
    totalWins: number; // How many succeeded (0 = "nessuno ha mai vinto!")

    // Team challenge
    isTeamChallenge: boolean; // Can be done as team?
    teamSize?: number; // If team, how many people

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

  // ============================================
  // NOTIFICATIONS
  // ============================================
  notifications?: {
    sendReminder: boolean;
    reminderHoursBefore?: number;
    sendToFollowers: boolean;
    sendToNearby: boolean;
    nearbyRadiusKm?: number;
    customMessage?: string;
  };

  // ============================================
  // SOCIAL & SHARING
  // ============================================
  social?: {
    hashtags?: string[];
    shareMessage?: string;
    instagramHandle?: string;
    photoBoothEnabled?: boolean;
  };

  // ============================================
  // METADATA
  // ============================================
  tags?: string[];
  priority?: number; // For sorting (higher = more prominent)
  views?: number;
  saves?: number;
  shares?: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// FORM DATA - For creating/editing events
// ============================================

export interface EventFormData {
  title: string;
  description: string;
  shortDescription?: string;
  image?: string;
  eventType: EventType;

  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;

  recurrence: RecurrenceType;
  recurrenceDays?: number[];
  recurrenceEndDate?: string;

  venueStatus: VenueStatus;
  affectedAreas?: string[];
  reducedCapacity?: number;

  location?: string;
  maxCapacity?: number;

  requiresReservation: boolean;
  reservationLink?: string;
  entranceFee?: number;
  prepaymentRequired?: boolean;
  prepaymentAmount?: number;
  ageRestriction?: number;
  dressCode?: string;
  memberOnly?: boolean;

  menuImpact?: Event['menuImpact'];
  promotions?: EventPromotion[];
  loyaltyBonus?: EventLoyaltyBonus;

  performer?: Event['performer'];
  sportsInfo?: Event['sportsInfo'];
  challengeInfo?: Event['challengeInfo'];
  notifications?: Event['notifications'];

  tags?: string[];
}

// ============================================
// UI CONFIGURATION
// ============================================

export const EVENT_TYPE_CONFIG: Record<
  EventType,
  {
    label: string;
    labelIt: string;
    icon: string;
    color: string;
    category: 'entertainment' | 'food' | 'promo' | 'sports' | 'community' | 'private' | 'special';
  }
> = {
  // Entertainment
  live_music: {
    label: 'Live Music',
    labelIt: 'Musica Live',
    icon: '🎵',
    color: 'from-purple-500 to-pink-500',
    category: 'entertainment',
  },
  dj_set: {
    label: 'DJ Set',
    labelIt: 'DJ Set',
    icon: '🎧',
    color: 'from-blue-500 to-purple-500',
    category: 'entertainment',
  },
  karaoke: {
    label: 'Karaoke',
    labelIt: 'Karaoke',
    icon: '🎤',
    color: 'from-pink-500 to-red-500',
    category: 'entertainment',
  },
  trivia_night: {
    label: 'Trivia Night',
    labelIt: 'Quiz Night',
    icon: '🧠',
    color: 'from-indigo-500 to-blue-500',
    category: 'entertainment',
  },
  game_night: {
    label: 'Game Night',
    labelIt: 'Serata Giochi',
    icon: '🎲',
    color: 'from-green-500 to-teal-500',
    category: 'entertainment',
  },
  comedy_night: {
    label: 'Comedy Night',
    labelIt: 'Stand-up Comedy',
    icon: '😂',
    color: 'from-yellow-500 to-orange-500',
    category: 'entertainment',
  },
  open_mic: {
    label: 'Open Mic',
    labelIt: 'Open Mic',
    icon: '🎙️',
    color: 'from-gray-500 to-gray-700',
    category: 'entertainment',
  },
  theme_night: {
    label: 'Theme Night',
    labelIt: 'Serata a Tema',
    icon: '🎭',
    color: 'from-indigo-500 to-purple-500',
    category: 'entertainment',
  },

  // Food & Beverage
  tasting: {
    label: 'Tasting',
    labelIt: 'Degustazione',
    icon: '🍷',
    color: 'from-red-500 to-orange-500',
    category: 'food',
  },
  pairing: {
    label: 'Pairing Event',
    labelIt: 'Abbinamento',
    icon: '🧀',
    color: 'from-amber-500 to-orange-500',
    category: 'food',
  },
  chefs_table: {
    label: "Chef's Table",
    labelIt: 'Tavola dello Chef',
    icon: '👨‍🍳',
    color: 'from-gray-700 to-gray-900',
    category: 'food',
  },
  cooking_class: {
    label: 'Cooking Class',
    labelIt: 'Corso di Cucina',
    icon: '📚',
    color: 'from-green-500 to-emerald-500',
    category: 'food',
  },
  menu_launch: {
    label: 'Menu Launch',
    labelIt: 'Lancio Menu',
    icon: '✨',
    color: 'from-yellow-400 to-amber-500',
    category: 'food',
  },
  food_tour: {
    label: 'Food Tour',
    labelIt: 'Tour Gastronomico',
    icon: '🗺️',
    color: 'from-teal-500 to-cyan-500',
    category: 'food',
  },
  food_challenge: {
    label: 'Food Challenge',
    labelIt: 'Sfida Alimentare',
    icon: '🏆',
    color: 'from-orange-500 to-red-500',
    category: 'food',
  },

  // Time-based Promos
  happy_hour: {
    label: 'Happy Hour',
    labelIt: 'Happy Hour',
    icon: '🍹',
    color: 'from-yellow-500 to-orange-500',
    category: 'promo',
  },
  brunch: {
    label: 'Brunch',
    labelIt: 'Brunch',
    icon: '🥐',
    color: 'from-orange-400 to-pink-400',
    category: 'promo',
  },
  lunch_special: {
    label: 'Lunch Special',
    labelIt: 'Menu Pranzo',
    icon: '🍽️',
    color: 'from-blue-400 to-cyan-400',
    category: 'promo',
  },
  late_night: {
    label: 'Late Night',
    labelIt: 'After Hours',
    icon: '🌙',
    color: 'from-indigo-600 to-purple-700',
    category: 'promo',
  },

  // Sports
  sports_viewing: {
    label: 'Sports Event',
    labelIt: 'Evento Sportivo',
    icon: '⚽',
    color: 'from-green-500 to-emerald-500',
    category: 'sports',
  },

  // Community
  networking: {
    label: 'Networking',
    labelIt: 'Networking',
    icon: '🤝',
    color: 'from-blue-500 to-indigo-500',
    category: 'community',
  },
  charity: {
    label: 'Charity Event',
    labelIt: 'Evento Benefico',
    icon: '💝',
    color: 'from-pink-500 to-rose-500',
    category: 'community',
  },
  book_club: {
    label: 'Book Club',
    labelIt: 'Club del Libro',
    icon: '📖',
    color: 'from-amber-600 to-orange-600',
    category: 'community',
  },
  wine_club: {
    label: 'Wine Club',
    labelIt: 'Club del Vino',
    icon: '🍇',
    color: 'from-purple-600 to-red-600',
    category: 'community',
  },
  singles_night: {
    label: 'Singles Night',
    labelIt: 'Serata Single',
    icon: '💕',
    color: 'from-red-400 to-pink-500',
    category: 'community',
  },

  // Private & Corporate
  private_party: {
    label: 'Private Party',
    labelIt: 'Festa Privata',
    icon: '🎉',
    color: 'from-pink-500 to-rose-500',
    category: 'private',
  },
  corporate: {
    label: 'Corporate Event',
    labelIt: 'Evento Aziendale',
    icon: '💼',
    color: 'from-gray-600 to-gray-800',
    category: 'private',
  },
  birthday: {
    label: 'Birthday',
    labelIt: 'Compleanno',
    icon: '🎂',
    color: 'from-pink-400 to-purple-400',
    category: 'private',
  },
  anniversary: {
    label: 'Anniversary',
    labelIt: 'Anniversario',
    icon: '💍',
    color: 'from-yellow-400 to-amber-500',
    category: 'private',
  },

  // Special
  holiday: {
    label: 'Holiday',
    labelIt: 'Festività',
    icon: '🎄',
    color: 'from-red-500 to-green-500',
    category: 'special',
  },
  special_menu: {
    label: 'Special Menu',
    labelIt: 'Menu Speciale',
    icon: '⭐',
    color: 'from-amber-500 to-yellow-500',
    category: 'special',
  },
  closure: {
    label: 'Closure',
    labelIt: 'Chiusura',
    icon: '🔒',
    color: 'from-gray-500 to-gray-700',
    category: 'special',
  },
  other: {
    label: 'Other',
    labelIt: 'Altro',
    icon: '📅',
    color: 'from-gray-500 to-gray-600',
    category: 'special',
  },
};

export const VENUE_STATUS_CONFIG: Record<
  VenueStatus,
  {
    label: string;
    labelIt: string;
    icon: string;
    color: string;
  }
> = {
  open: { label: 'Open', labelIt: 'Aperto', icon: '✅', color: 'text-green-600' },
  partial: {
    label: 'Partially Available',
    labelIt: 'Parzialmente Disponibile',
    icon: '⚠️',
    color: 'text-yellow-600',
  },
  reservation_only: {
    label: 'Reservation Only',
    labelIt: 'Solo Prenotazione',
    icon: '📋',
    color: 'text-blue-600',
  },
  members_only: {
    label: 'Members Only',
    labelIt: 'Solo Membri',
    icon: '🔐',
    color: 'text-purple-600',
  },
  closed: { label: 'Closed', labelIt: 'Chiuso', icon: '🔒', color: 'text-red-600' },
};

export const PROMO_MECHANIC_CONFIG: Record<
  PromoMechanic,
  {
    label: string;
    labelIt: string;
    icon: string;
    example: string;
    requiresValue: boolean;
    valueLabel?: string;
    requiresSecondaryValue?: boolean;
    secondaryValueLabel?: string;
  }
> = {
  percent_off: {
    label: 'Percent Off',
    labelIt: 'Sconto %',
    icon: '🏷️',
    example: '-20%',
    requiresValue: true,
    valueLabel: 'Percentuale',
  },
  fixed_discount: {
    label: 'Fixed Discount',
    labelIt: 'Sconto Fisso',
    icon: '💵',
    example: '-€5',
    requiresValue: true,
    valueLabel: 'Importo (€)',
  },
  fixed_price: {
    label: 'Fixed Price',
    labelIt: 'Prezzo Fisso',
    icon: '🎯',
    example: '€10',
    requiresValue: true,
    valueLabel: 'Prezzo (€)',
  },
  bogo: {
    label: 'Buy One Get One',
    labelIt: '2x1',
    icon: '🎁',
    example: '2x1',
    requiresValue: false,
  },
  bogoho: {
    label: 'Buy One Get One Half',
    labelIt: 'Compra 1 il 2° -50%',
    icon: '🎊',
    example: '-50% sul 2°',
    requiresValue: false,
  },
  buy_x_get_y: {
    label: 'Buy X Get Y',
    labelIt: 'Prendi X Paghi Y',
    icon: '🛒',
    example: '3x2',
    requiresValue: true,
    valueLabel: 'Prendi',
    requiresSecondaryValue: true,
    secondaryValueLabel: 'Paghi',
  },
  bundle: {
    label: 'Bundle',
    labelIt: 'Combo',
    icon: '📦',
    example: 'Combo €15',
    requiresValue: true,
    valueLabel: 'Prezzo Bundle (€)',
  },
  free_item: {
    label: 'Free Item',
    labelIt: 'Omaggio',
    icon: '🎁',
    example: 'Caffè gratis',
    requiresValue: false,
  },
  bottomless: {
    label: 'Bottomless',
    labelIt: 'Illimitato',
    icon: '♾️',
    example: 'Prosecco illimitato',
    requiresValue: true,
    valueLabel: 'Prezzo (€)',
  },
  points_multiplier: {
    label: 'Points Multiplier',
    labelIt: 'Punti x2',
    icon: '⭐',
    example: 'Punti x2',
    requiresValue: true,
    valueLabel: 'Moltiplicatore',
  },
  points_bonus: {
    label: 'Bonus Points',
    labelIt: 'Punti Bonus',
    icon: '🌟',
    example: '+50 punti',
    requiresValue: true,
    valueLabel: 'Punti',
  },
  free_upgrade: {
    label: 'Free Upgrade',
    labelIt: 'Upgrade Gratis',
    icon: '⬆️',
    example: 'Size L gratis',
    requiresValue: false,
  },
  kids_free: {
    label: 'Kids Free',
    labelIt: 'Bambini Gratis',
    icon: '👶',
    example: 'Under 12 gratis',
    requiresValue: false,
  },
  group_discount: {
    label: 'Group Discount',
    labelIt: 'Sconto Gruppo',
    icon: '👥',
    example: '-10% per 4+ persone',
    requiresValue: true,
    valueLabel: 'Sconto %',
  },
  early_bird: {
    label: 'Early Bird',
    labelIt: 'Early Bird',
    icon: '🐦',
    example: '-15% primi 20',
    requiresValue: true,
    valueLabel: 'Sconto %',
  },
  last_minute: {
    label: 'Last Minute',
    labelIt: 'Last Minute',
    icon: '⏰',
    example: '-20% ultima ora',
    requiresValue: true,
    valueLabel: 'Sconto %',
  },
  none: { label: 'None', labelIt: 'Nessuna', icon: '➖', example: '-', requiresValue: false },
};

export const EVENT_CATEGORY_CONFIG: Record<
  string,
  {
    label: string;
    labelIt: string;
    color: string;
  }
> = {
  entertainment: {
    label: 'Entertainment',
    labelIt: 'Intrattenimento',
    color: 'bg-purple-100 text-purple-700',
  },
  food: {
    label: 'Food & Beverage',
    labelIt: 'Food & Beverage',
    color: 'bg-orange-100 text-orange-700',
  },
  promo: { label: 'Promotions', labelIt: 'Promozioni', color: 'bg-yellow-100 text-yellow-700' },
  sports: { label: 'Sports', labelIt: 'Sport', color: 'bg-green-100 text-green-700' },
  community: { label: 'Community', labelIt: 'Community', color: 'bg-blue-100 text-blue-700' },
  private: { label: 'Private', labelIt: 'Privato', color: 'bg-gray-100 text-gray-700' },
  special: { label: 'Special', labelIt: 'Speciale', color: 'bg-amber-100 text-amber-700' },
};
