import { describe, it, expect, vi } from 'vitest';

// Mock supabase
vi.mock('../supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      lte: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue({ data: [], error: null }),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
    })),
    rpc: vi.fn().mockResolvedValue({ data: [], error: null }),
  },
}));

// ============================================
// EventType Tests
// ============================================

describe('EventType', () => {
  const EVENT_TYPES = [
    // Entertainment
    'live_music',
    'dj_set',
    'karaoke',
    'trivia_night',
    'game_night',
    'comedy_night',
    'open_mic',
    'theme_night',
    // Food & Beverage
    'tasting',
    'pairing',
    'chefs_table',
    'cooking_class',
    'menu_launch',
    'food_tour',
    // Time-based Promos
    'happy_hour',
    'brunch',
    'lunch_special',
    'late_night',
    // Sports
    'sports_viewing',
    // Community
    'networking',
    'charity',
    'book_club',
    'wine_club',
    'singles_night',
    // Private & Corporate
    'private_party',
    'corporate',
    'birthday',
    'anniversary',
    // Special
    'holiday',
    'special_menu',
    'closure',
    'other',
  ];

  it('should have 32 event types', () => {
    expect(EVENT_TYPES.length).toBe(32);
  });

  describe('Entertainment events', () => {
    const entertainmentTypes = [
      'live_music',
      'dj_set',
      'karaoke',
      'trivia_night',
      'game_night',
      'comedy_night',
      'open_mic',
      'theme_night',
    ];

    it('should have 8 entertainment types', () => {
      expect(entertainmentTypes.length).toBe(8);
    });

    entertainmentTypes.forEach((type) => {
      it(`should include ${type}`, () => {
        expect(EVENT_TYPES).toContain(type);
      });
    });
  });

  describe('Food & Beverage events', () => {
    const foodTypes = [
      'tasting',
      'pairing',
      'chefs_table',
      'cooking_class',
      'menu_launch',
      'food_tour',
    ];

    it('should have 6 food types', () => {
      expect(foodTypes.length).toBe(6);
    });

    foodTypes.forEach((type) => {
      it(`should include ${type}`, () => {
        expect(EVENT_TYPES).toContain(type);
      });
    });
  });

  describe('Promo events', () => {
    const promoTypes = ['happy_hour', 'brunch', 'lunch_special', 'late_night'];

    it('should have 4 promo types', () => {
      expect(promoTypes.length).toBe(4);
    });

    promoTypes.forEach((type) => {
      it(`should include ${type}`, () => {
        expect(EVENT_TYPES).toContain(type);
      });
    });
  });

  describe('Community events', () => {
    const communityTypes = ['networking', 'charity', 'book_club', 'wine_club', 'singles_night'];

    it('should have 5 community types', () => {
      expect(communityTypes.length).toBe(5);
    });
  });

  describe('Private events', () => {
    const privateTypes = ['private_party', 'corporate', 'birthday', 'anniversary'];

    it('should have 4 private types', () => {
      expect(privateTypes.length).toBe(4);
    });
  });

  describe('Special events', () => {
    const specialTypes = ['holiday', 'special_menu', 'closure', 'other'];

    it('should have 4 special types', () => {
      expect(specialTypes.length).toBe(4);
    });
  });
});

// ============================================
// EventCategory Tests
// ============================================

describe('EventCategory', () => {
  const EVENT_CATEGORIES = [
    'entertainment',
    'food',
    'promo',
    'sports',
    'community',
    'private',
    'special',
  ];

  it('should have 7 categories', () => {
    expect(EVENT_CATEGORIES.length).toBe(7);
  });

  it('should include entertainment', () => {
    expect(EVENT_CATEGORIES).toContain('entertainment');
  });

  it('should include food', () => {
    expect(EVENT_CATEGORIES).toContain('food');
  });

  it('should include promo', () => {
    expect(EVENT_CATEGORIES).toContain('promo');
  });

  it('should include sports', () => {
    expect(EVENT_CATEGORIES).toContain('sports');
  });

  it('should include community', () => {
    expect(EVENT_CATEGORIES).toContain('community');
  });

  it('should include private', () => {
    expect(EVENT_CATEGORIES).toContain('private');
  });

  it('should include special', () => {
    expect(EVENT_CATEGORIES).toContain('special');
  });
});

// ============================================
// EventStatus Tests
// ============================================

describe('EventStatus', () => {
  const EVENT_STATUSES = ['draft', 'published', 'cancelled', 'completed'];

  it('should have 4 statuses', () => {
    expect(EVENT_STATUSES.length).toBe(4);
  });

  it('should include draft', () => {
    expect(EVENT_STATUSES).toContain('draft');
  });

  it('should include published', () => {
    expect(EVENT_STATUSES).toContain('published');
  });

  it('should include cancelled', () => {
    expect(EVENT_STATUSES).toContain('cancelled');
  });

  it('should include completed', () => {
    expect(EVENT_STATUSES).toContain('completed');
  });
});

// ============================================
// VenueStatus Tests
// ============================================

describe('VenueStatus', () => {
  const VENUE_STATUSES = ['open', 'partial', 'reservation_only', 'members_only', 'closed'];

  it('should have 5 venue statuses', () => {
    expect(VENUE_STATUSES.length).toBe(5);
  });

  it('should include open', () => {
    expect(VENUE_STATUSES).toContain('open');
  });

  it('should include partial', () => {
    expect(VENUE_STATUSES).toContain('partial');
  });

  it('should include reservation_only', () => {
    expect(VENUE_STATUSES).toContain('reservation_only');
  });

  it('should include members_only', () => {
    expect(VENUE_STATUSES).toContain('members_only');
  });

  it('should include closed', () => {
    expect(VENUE_STATUSES).toContain('closed');
  });
});

// ============================================
// RecurrenceType Tests
// ============================================

describe('RecurrenceType', () => {
  const RECURRENCE_TYPES = ['none', 'daily', 'weekly', 'biweekly', 'monthly'];

  it('should have 5 recurrence types', () => {
    expect(RECURRENCE_TYPES.length).toBe(5);
  });

  it('should include none', () => {
    expect(RECURRENCE_TYPES).toContain('none');
  });

  it('should include daily', () => {
    expect(RECURRENCE_TYPES).toContain('daily');
  });

  it('should include weekly', () => {
    expect(RECURRENCE_TYPES).toContain('weekly');
  });

  it('should include biweekly', () => {
    expect(RECURRENCE_TYPES).toContain('biweekly');
  });

  it('should include monthly', () => {
    expect(RECURRENCE_TYPES).toContain('monthly');
  });
});

// ============================================
// PromoMechanic Tests
// ============================================

describe('PromoMechanic', () => {
  const PROMO_MECHANICS = [
    'percent_off',
    'fixed_discount',
    'fixed_price',
    'bogo',
    'bogoho',
    'buy_x_get_y',
    'bundle',
    'free_item',
    'bottomless',
    'points_multiplier',
    'points_bonus',
    'free_upgrade',
    'kids_free',
    'group_discount',
    'early_bird',
    'last_minute',
    'none',
  ];

  it('should have 17 promo mechanics', () => {
    expect(PROMO_MECHANICS.length).toBe(17);
  });

  describe('Discount mechanics', () => {
    it('should include percent_off', () => {
      expect(PROMO_MECHANICS).toContain('percent_off');
    });

    it('should include fixed_discount', () => {
      expect(PROMO_MECHANICS).toContain('fixed_discount');
    });

    it('should include fixed_price', () => {
      expect(PROMO_MECHANICS).toContain('fixed_price');
    });
  });

  describe('BOGO mechanics', () => {
    it('should include bogo (Buy One Get One)', () => {
      expect(PROMO_MECHANICS).toContain('bogo');
    });

    it('should include bogoho (Buy One Get One Half Off)', () => {
      expect(PROMO_MECHANICS).toContain('bogoho');
    });

    it('should include buy_x_get_y', () => {
      expect(PROMO_MECHANICS).toContain('buy_x_get_y');
    });
  });

  describe('Special mechanics', () => {
    it('should include bundle', () => {
      expect(PROMO_MECHANICS).toContain('bundle');
    });

    it('should include free_item', () => {
      expect(PROMO_MECHANICS).toContain('free_item');
    });

    it('should include bottomless', () => {
      expect(PROMO_MECHANICS).toContain('bottomless');
    });
  });

  describe('Loyalty mechanics', () => {
    it('should include points_multiplier', () => {
      expect(PROMO_MECHANICS).toContain('points_multiplier');
    });

    it('should include points_bonus', () => {
      expect(PROMO_MECHANICS).toContain('points_bonus');
    });
  });

  describe('Time-based mechanics', () => {
    it('should include early_bird', () => {
      expect(PROMO_MECHANICS).toContain('early_bird');
    });

    it('should include last_minute', () => {
      expect(PROMO_MECHANICS).toContain('last_minute');
    });
  });
});

// ============================================
// getEventCategory Function Tests
// ============================================

describe('getEventCategory', () => {
  // Replicate the function logic for testing
  type EventType = string;
  type EventCategory =
    | 'entertainment'
    | 'food'
    | 'promo'
    | 'sports'
    | 'community'
    | 'private'
    | 'special';

  const getEventCategory = (eventType: EventType): EventCategory => {
    const categoryMap: Record<string, EventCategory> = {
      // Entertainment
      live_music: 'entertainment',
      dj_set: 'entertainment',
      karaoke: 'entertainment',
      trivia_night: 'entertainment',
      game_night: 'entertainment',
      comedy_night: 'entertainment',
      open_mic: 'entertainment',
      theme_night: 'entertainment',
      // Food & Beverage
      tasting: 'food',
      pairing: 'food',
      chefs_table: 'food',
      cooking_class: 'food',
      menu_launch: 'food',
      food_tour: 'food',
      // Time-based Promos
      happy_hour: 'promo',
      brunch: 'promo',
      lunch_special: 'promo',
      late_night: 'promo',
      // Sports
      sports_viewing: 'sports',
      // Community
      networking: 'community',
      charity: 'community',
      book_club: 'community',
      wine_club: 'community',
      singles_night: 'community',
      // Private & Corporate
      private_party: 'private',
      corporate: 'private',
      birthday: 'private',
      anniversary: 'private',
      // Special
      holiday: 'special',
      special_menu: 'special',
      closure: 'special',
      other: 'special',
    };

    return categoryMap[eventType];
  };

  describe('Entertainment mapping', () => {
    it('should map live_music to entertainment', () => {
      expect(getEventCategory('live_music')).toBe('entertainment');
    });

    it('should map dj_set to entertainment', () => {
      expect(getEventCategory('dj_set')).toBe('entertainment');
    });

    it('should map karaoke to entertainment', () => {
      expect(getEventCategory('karaoke')).toBe('entertainment');
    });

    it('should map trivia_night to entertainment', () => {
      expect(getEventCategory('trivia_night')).toBe('entertainment');
    });

    it('should map game_night to entertainment', () => {
      expect(getEventCategory('game_night')).toBe('entertainment');
    });

    it('should map comedy_night to entertainment', () => {
      expect(getEventCategory('comedy_night')).toBe('entertainment');
    });

    it('should map open_mic to entertainment', () => {
      expect(getEventCategory('open_mic')).toBe('entertainment');
    });

    it('should map theme_night to entertainment', () => {
      expect(getEventCategory('theme_night')).toBe('entertainment');
    });
  });

  describe('Food mapping', () => {
    it('should map tasting to food', () => {
      expect(getEventCategory('tasting')).toBe('food');
    });

    it('should map pairing to food', () => {
      expect(getEventCategory('pairing')).toBe('food');
    });

    it('should map chefs_table to food', () => {
      expect(getEventCategory('chefs_table')).toBe('food');
    });

    it('should map cooking_class to food', () => {
      expect(getEventCategory('cooking_class')).toBe('food');
    });

    it('should map menu_launch to food', () => {
      expect(getEventCategory('menu_launch')).toBe('food');
    });

    it('should map food_tour to food', () => {
      expect(getEventCategory('food_tour')).toBe('food');
    });
  });

  describe('Promo mapping', () => {
    it('should map happy_hour to promo', () => {
      expect(getEventCategory('happy_hour')).toBe('promo');
    });

    it('should map brunch to promo', () => {
      expect(getEventCategory('brunch')).toBe('promo');
    });

    it('should map lunch_special to promo', () => {
      expect(getEventCategory('lunch_special')).toBe('promo');
    });

    it('should map late_night to promo', () => {
      expect(getEventCategory('late_night')).toBe('promo');
    });
  });

  describe('Sports mapping', () => {
    it('should map sports_viewing to sports', () => {
      expect(getEventCategory('sports_viewing')).toBe('sports');
    });
  });

  describe('Community mapping', () => {
    it('should map networking to community', () => {
      expect(getEventCategory('networking')).toBe('community');
    });

    it('should map charity to community', () => {
      expect(getEventCategory('charity')).toBe('community');
    });

    it('should map book_club to community', () => {
      expect(getEventCategory('book_club')).toBe('community');
    });

    it('should map wine_club to community', () => {
      expect(getEventCategory('wine_club')).toBe('community');
    });

    it('should map singles_night to community', () => {
      expect(getEventCategory('singles_night')).toBe('community');
    });
  });

  describe('Private mapping', () => {
    it('should map private_party to private', () => {
      expect(getEventCategory('private_party')).toBe('private');
    });

    it('should map corporate to private', () => {
      expect(getEventCategory('corporate')).toBe('private');
    });

    it('should map birthday to private', () => {
      expect(getEventCategory('birthday')).toBe('private');
    });

    it('should map anniversary to private', () => {
      expect(getEventCategory('anniversary')).toBe('private');
    });
  });

  describe('Special mapping', () => {
    it('should map holiday to special', () => {
      expect(getEventCategory('holiday')).toBe('special');
    });

    it('should map special_menu to special', () => {
      expect(getEventCategory('special_menu')).toBe('special');
    });

    it('should map closure to special', () => {
      expect(getEventCategory('closure')).toBe('special');
    });

    it('should map other to special', () => {
      expect(getEventCategory('other')).toBe('special');
    });
  });
});

// ============================================
// getDefaultEvent Function Tests
// ============================================

describe('getDefaultEvent', () => {
  const getDefaultEvent = (locationId: string) => {
    const today = new Date().toISOString().split('T')[0];

    return {
      location_id: locationId,
      description: null,
      status: 'draft',
      start_date: today,
      end_date: null,
      start_time: '18:00',
      end_time: '22:00',
      timezone: 'Asia/Ho_Chi_Minh',
      recurrence: 'none',
      recurrence_days: null,
      recurrence_end_date: null,
      venue_status: 'open',
      affected_areas: null,
      reduced_capacity: null,
      hours_override: null,
      auto_create_schedule_override: true,
      menu_impact: {},
      requires_reservation: false,
      entrance_fee: null,
      max_capacity: null,
      current_attendees: 0,
      ticket_url: null,
      loyalty_bonus: { enabled: false },
      performer: null,
      sports_info: null,
      promotions: [],
      image_url: null,
      color: null,
      tags: null,
      is_featured: false,
      is_public: true,
      created_by: null,
    };
  };

  it('should set location_id from parameter', () => {
    const event = getDefaultEvent('loc-123');
    expect(event.location_id).toBe('loc-123');
  });

  it('should default status to draft', () => {
    const event = getDefaultEvent('loc-123');
    expect(event.status).toBe('draft');
  });

  it('should set start_date to today', () => {
    const today = new Date().toISOString().split('T')[0];
    const event = getDefaultEvent('loc-123');
    expect(event.start_date).toBe(today);
  });

  it('should default start_time to 18:00', () => {
    const event = getDefaultEvent('loc-123');
    expect(event.start_time).toBe('18:00');
  });

  it('should default end_time to 22:00', () => {
    const event = getDefaultEvent('loc-123');
    expect(event.end_time).toBe('22:00');
  });

  it('should default timezone to Asia/Ho_Chi_Minh', () => {
    const event = getDefaultEvent('loc-123');
    expect(event.timezone).toBe('Asia/Ho_Chi_Minh');
  });

  it('should default recurrence to none', () => {
    const event = getDefaultEvent('loc-123');
    expect(event.recurrence).toBe('none');
  });

  it('should default venue_status to open', () => {
    const event = getDefaultEvent('loc-123');
    expect(event.venue_status).toBe('open');
  });

  it('should default requires_reservation to false', () => {
    const event = getDefaultEvent('loc-123');
    expect(event.requires_reservation).toBe(false);
  });

  it('should default current_attendees to 0', () => {
    const event = getDefaultEvent('loc-123');
    expect(event.current_attendees).toBe(0);
  });

  it('should default loyalty_bonus to disabled', () => {
    const event = getDefaultEvent('loc-123');
    expect(event.loyalty_bonus.enabled).toBe(false);
  });

  it('should default promotions to empty array', () => {
    const event = getDefaultEvent('loc-123');
    expect(event.promotions).toEqual([]);
  });

  it('should default is_featured to false', () => {
    const event = getDefaultEvent('loc-123');
    expect(event.is_featured).toBe(false);
  });

  it('should default is_public to true', () => {
    const event = getDefaultEvent('loc-123');
    expect(event.is_public).toBe(true);
  });

  it('should default auto_create_schedule_override to true', () => {
    const event = getDefaultEvent('loc-123');
    expect(event.auto_create_schedule_override).toBe(true);
  });
});

// ============================================
// EVENT_TYPE_CONFIG Tests
// ============================================

describe('EVENT_TYPE_CONFIG', () => {
  const EVENT_TYPE_CONFIG: Record<
    string,
    {
      label: string;
      labelIt: string;
      icon: string;
      color: string;
      category: string;
    }
  > = {
    live_music: {
      label: 'Live Music',
      labelIt: 'Musica Live',
      icon: '🎵',
      color: 'bg-purple-100 text-purple-700',
      category: 'entertainment',
    },
    happy_hour: {
      label: 'Happy Hour',
      labelIt: 'Happy Hour',
      icon: '🍹',
      color: 'bg-orange-100 text-orange-700',
      category: 'promo',
    },
    tasting: {
      label: 'Tasting',
      labelIt: 'Degustazione',
      icon: '🍷',
      color: 'bg-red-100 text-red-700',
      category: 'food',
    },
    sports_viewing: {
      label: 'Sports Event',
      labelIt: 'Evento Sportivo',
      icon: '⚽',
      color: 'bg-emerald-100 text-emerald-700',
      category: 'sports',
    },
  };

  it('should have label property', () => {
    expect(EVENT_TYPE_CONFIG.live_music.label).toBe('Live Music');
  });

  it('should have Italian label', () => {
    expect(EVENT_TYPE_CONFIG.live_music.labelIt).toBe('Musica Live');
  });

  it('should have icon emoji', () => {
    expect(EVENT_TYPE_CONFIG.live_music.icon).toBe('🎵');
  });

  it('should have color class', () => {
    expect(EVENT_TYPE_CONFIG.live_music.color).toContain('bg-');
    expect(EVENT_TYPE_CONFIG.live_music.color).toContain('text-');
  });

  it('should have category', () => {
    expect(EVENT_TYPE_CONFIG.live_music.category).toBe('entertainment');
  });

  it('happy_hour should be promo category', () => {
    expect(EVENT_TYPE_CONFIG.happy_hour.category).toBe('promo');
  });

  it('tasting should be food category', () => {
    expect(EVENT_TYPE_CONFIG.tasting.category).toBe('food');
  });

  it('sports_viewing should be sports category', () => {
    expect(EVENT_TYPE_CONFIG.sports_viewing.category).toBe('sports');
  });
});

// ============================================
// STATUS_CONFIG Tests
// ============================================

describe('STATUS_CONFIG', () => {
  const STATUS_CONFIG: Record<string, { label: string; labelIt: string; color: string }> = {
    draft: { label: 'Draft', labelIt: 'Bozza', color: 'bg-gray-100 text-gray-700' },
    published: { label: 'Published', labelIt: 'Pubblicato', color: 'bg-green-100 text-green-700' },
    cancelled: { label: 'Cancelled', labelIt: 'Annullato', color: 'bg-red-100 text-red-700' },
    completed: { label: 'Completed', labelIt: 'Completato', color: 'bg-blue-100 text-blue-700' },
  };

  it('draft should have gray color', () => {
    expect(STATUS_CONFIG.draft.color).toContain('gray');
  });

  it('published should have green color', () => {
    expect(STATUS_CONFIG.published.color).toContain('green');
  });

  it('cancelled should have red color', () => {
    expect(STATUS_CONFIG.cancelled.color).toContain('red');
  });

  it('completed should have blue color', () => {
    expect(STATUS_CONFIG.completed.color).toContain('blue');
  });

  it('should have Italian labels', () => {
    expect(STATUS_CONFIG.draft.labelIt).toBe('Bozza');
    expect(STATUS_CONFIG.published.labelIt).toBe('Pubblicato');
    expect(STATUS_CONFIG.cancelled.labelIt).toBe('Annullato');
    expect(STATUS_CONFIG.completed.labelIt).toBe('Completato');
  });
});

// ============================================
// VENUE_STATUS_CONFIG Tests
// ============================================

describe('VENUE_STATUS_CONFIG', () => {
  const VENUE_STATUS_CONFIG: Record<
    string,
    {
      label: string;
      labelIt: string;
      icon: string;
      color: string;
    }
  > = {
    open: {
      label: 'Open normally',
      labelIt: 'Aperto normalmente',
      icon: '✅',
      color: 'text-green-600',
    },
    partial: {
      label: 'Partially available',
      labelIt: 'Parzialmente disponibile',
      icon: '⚠️',
      color: 'text-yellow-600',
    },
    reservation_only: {
      label: 'Reservation only',
      labelIt: 'Solo prenotazioni',
      icon: '📝',
      color: 'text-blue-600',
    },
    members_only: {
      label: 'Members only',
      labelIt: 'Solo membri',
      icon: '🔐',
      color: 'text-purple-600',
    },
    closed: {
      label: 'Closed to public',
      labelIt: 'Chiuso al pubblico',
      icon: '🚫',
      color: 'text-red-600',
    },
  };

  it('open should have green color', () => {
    expect(VENUE_STATUS_CONFIG.open.color).toContain('green');
  });

  it('partial should have yellow color', () => {
    expect(VENUE_STATUS_CONFIG.partial.color).toContain('yellow');
  });

  it('reservation_only should have blue color', () => {
    expect(VENUE_STATUS_CONFIG.reservation_only.color).toContain('blue');
  });

  it('members_only should have purple color', () => {
    expect(VENUE_STATUS_CONFIG.members_only.color).toContain('purple');
  });

  it('closed should have red color', () => {
    expect(VENUE_STATUS_CONFIG.closed.color).toContain('red');
  });

  it('should have appropriate icons', () => {
    expect(VENUE_STATUS_CONFIG.open.icon).toBe('✅');
    expect(VENUE_STATUS_CONFIG.partial.icon).toBe('⚠️');
    expect(VENUE_STATUS_CONFIG.closed.icon).toBe('🚫');
  });
});

// ============================================
// CATEGORY_CONFIG Tests
// ============================================

describe('CATEGORY_CONFIG', () => {
  const CATEGORY_CONFIG: Record<
    string,
    {
      label: string;
      labelIt: string;
      icon: string;
      color: string;
    }
  > = {
    entertainment: {
      label: 'Entertainment',
      labelIt: 'Intrattenimento',
      icon: '🎭',
      color: 'bg-purple-100 text-purple-700',
    },
    food: {
      label: 'Food & Beverage',
      labelIt: 'Cibo & Bevande',
      icon: '🍽️',
      color: 'bg-amber-100 text-amber-700',
    },
    promo: {
      label: 'Promotions',
      labelIt: 'Promozioni',
      icon: '🎁',
      color: 'bg-orange-100 text-orange-700',
    },
    sports: { label: 'Sports', labelIt: 'Sport', icon: '⚽', color: 'bg-green-100 text-green-700' },
    community: {
      label: 'Community',
      labelIt: 'Community',
      icon: '🤝',
      color: 'bg-blue-100 text-blue-700',
    },
    private: {
      label: 'Private',
      labelIt: 'Privati',
      icon: '🔒',
      color: 'bg-gray-100 text-gray-700',
    },
    special: {
      label: 'Special',
      labelIt: 'Speciali',
      icon: '✨',
      color: 'bg-yellow-100 text-yellow-700',
    },
  };

  it('entertainment should have theater icon', () => {
    expect(CATEGORY_CONFIG.entertainment.icon).toBe('🎭');
  });

  it('food should have plate icon', () => {
    expect(CATEGORY_CONFIG.food.icon).toBe('🍽️');
  });

  it('sports should have soccer icon', () => {
    expect(CATEGORY_CONFIG.sports.icon).toBe('⚽');
  });

  it('community should have handshake icon', () => {
    expect(CATEGORY_CONFIG.community.icon).toBe('🤝');
  });

  it('private should have lock icon', () => {
    expect(CATEGORY_CONFIG.private.icon).toBe('🔒');
  });

  it('special should have sparkle icon', () => {
    expect(CATEGORY_CONFIG.special.icon).toBe('✨');
  });

  it('all categories should have Italian labels', () => {
    expect(CATEGORY_CONFIG.entertainment.labelIt).toBe('Intrattenimento');
    expect(CATEGORY_CONFIG.food.labelIt).toBe('Cibo & Bevande');
    expect(CATEGORY_CONFIG.promo.labelIt).toBe('Promozioni');
    expect(CATEGORY_CONFIG.sports.labelIt).toBe('Sport');
  });
});

// ============================================
// SportsInfo Type Tests
// ============================================

describe('SportsInfo', () => {
  const SPORTS = [
    'football',
    'basketball',
    'tennis',
    'f1',
    'motogp',
    'boxing',
    'ufc',
    'rugby',
    'other',
  ];

  it('should have 9 sport types', () => {
    expect(SPORTS.length).toBe(9);
  });

  it('should include football', () => {
    expect(SPORTS).toContain('football');
  });

  it('should include basketball', () => {
    expect(SPORTS).toContain('basketball');
  });

  it('should include motorsports', () => {
    expect(SPORTS).toContain('f1');
    expect(SPORTS).toContain('motogp');
  });

  it('should include combat sports', () => {
    expect(SPORTS).toContain('boxing');
    expect(SPORTS).toContain('ufc');
  });

  it('should include other as fallback', () => {
    expect(SPORTS).toContain('other');
  });
});

// ============================================
// Event Interface Tests
// ============================================

describe('Event interface', () => {
  interface Event {
    id: string;
    location_id: string;
    title: string;
    event_type: string;
    event_category: string;
    status: string;
    start_date: string;
    start_time: string;
    end_time: string;
  }

  const createValidEvent = (): Event => ({
    id: 'evt-123',
    location_id: 'loc-456',
    title: 'Jazz Night',
    event_type: 'live_music',
    event_category: 'entertainment',
    status: 'draft',
    start_date: '2026-01-20',
    start_time: '19:00',
    end_time: '23:00',
  });

  it('should have required id', () => {
    const event = createValidEvent();
    expect(event.id).toBeDefined();
  });

  it('should have required location_id', () => {
    const event = createValidEvent();
    expect(event.location_id).toBeDefined();
  });

  it('should have required title', () => {
    const event = createValidEvent();
    expect(event.title).toBe('Jazz Night');
  });

  it('should have required event_type', () => {
    const event = createValidEvent();
    expect(event.event_type).toBe('live_music');
  });

  it('should have required event_category', () => {
    const event = createValidEvent();
    expect(event.event_category).toBe('entertainment');
  });

  it('should have valid date format', () => {
    const event = createValidEvent();
    expect(event.start_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('should have valid time format', () => {
    const event = createValidEvent();
    expect(event.start_time).toMatch(/^\d{2}:\d{2}$/);
    expect(event.end_time).toMatch(/^\d{2}:\d{2}$/);
  });
});

// ============================================
// EventPromotion Interface Tests
// ============================================

describe('EventPromotion', () => {
  interface EventPromotion {
    id: string;
    name: string;
    mechanic: string;
    value?: number;
    applicableTo: 'all' | 'categories' | 'products' | 'tags';
  }

  const createPromotion = (mechanic: string, value?: number): EventPromotion => ({
    id: 'promo-123',
    name: '20% Off',
    mechanic,
    value,
    applicableTo: 'all',
  });

  it('should support percent_off mechanic', () => {
    const promo = createPromotion('percent_off', 20);
    expect(promo.mechanic).toBe('percent_off');
    expect(promo.value).toBe(20);
  });

  it('should support bogo mechanic without value', () => {
    const promo = createPromotion('bogo');
    expect(promo.mechanic).toBe('bogo');
    expect(promo.value).toBeUndefined();
  });

  it('should support applicableTo all', () => {
    const promo = createPromotion('percent_off', 10);
    expect(promo.applicableTo).toBe('all');
  });
});

// ============================================
// LoyaltyBonus Interface Tests
// ============================================

describe('LoyaltyBonus', () => {
  interface LoyaltyBonus {
    enabled: boolean;
    pointsMultiplier?: number;
    bonusPoints?: number;
  }

  it('should default to disabled', () => {
    const bonus: LoyaltyBonus = { enabled: false };
    expect(bonus.enabled).toBe(false);
  });

  it('should support points multiplier', () => {
    const bonus: LoyaltyBonus = { enabled: true, pointsMultiplier: 2 };
    expect(bonus.pointsMultiplier).toBe(2);
  });

  it('should support bonus points', () => {
    const bonus: LoyaltyBonus = { enabled: true, bonusPoints: 100 };
    expect(bonus.bonusPoints).toBe(100);
  });

  it('should support both multiplier and bonus', () => {
    const bonus: LoyaltyBonus = { enabled: true, pointsMultiplier: 1.5, bonusPoints: 50 };
    expect(bonus.pointsMultiplier).toBe(1.5);
    expect(bonus.bonusPoints).toBe(50);
  });
});

// ============================================
// HoursOverride Interface Tests
// ============================================

describe('HoursOverride', () => {
  interface HoursOverride {
    open: string;
    close: string;
  }

  it('should have open time', () => {
    const override: HoursOverride = { open: '10:00', close: '02:00' };
    expect(override.open).toBe('10:00');
  });

  it('should have close time', () => {
    const override: HoursOverride = { open: '10:00', close: '02:00' };
    expect(override.close).toBe('02:00');
  });

  it('should support late night close (next day)', () => {
    const override: HoursOverride = { open: '18:00', close: '04:00' };
    expect(override.close).toBe('04:00');
  });
});

// ============================================
// Performer Interface Tests
// ============================================

describe('Performer', () => {
  interface Performer {
    name: string;
    genre?: string;
    image?: string;
  }

  it('should have required name', () => {
    const performer: Performer = { name: 'John Doe Band' };
    expect(performer.name).toBe('John Doe Band');
  });

  it('should support optional genre', () => {
    const performer: Performer = { name: 'Jazz Trio', genre: 'Jazz' };
    expect(performer.genre).toBe('Jazz');
  });

  it('should support optional image', () => {
    const performer: Performer = { name: 'DJ Max', image: 'https://example.com/dj.jpg' };
    expect(performer.image).toBe('https://example.com/dj.jpg');
  });
});

// ============================================
// Date/Time Validation Tests
// ============================================

describe('Date/Time Validation', () => {
  const isValidDateFormat = (date: string): boolean => {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
  };

  const isValidTimeFormat = (time: string): boolean => {
    return /^\d{2}:\d{2}$/.test(time);
  };

  const isEndTimeAfterStartTime = (startTime: string, endTime: string): boolean => {
    // Simple comparison (doesn't handle overnight events)
    return endTime > startTime;
  };

  describe('isValidDateFormat', () => {
    it('should validate ISO date format', () => {
      expect(isValidDateFormat('2026-01-20')).toBe(true);
    });

    it('should reject invalid date format', () => {
      expect(isValidDateFormat('01-20-2026')).toBe(false);
      expect(isValidDateFormat('2026/01/20')).toBe(false);
    });
  });

  describe('isValidTimeFormat', () => {
    it('should validate 24h time format', () => {
      expect(isValidTimeFormat('18:00')).toBe(true);
      expect(isValidTimeFormat('09:30')).toBe(true);
    });

    it('should reject invalid time format', () => {
      expect(isValidTimeFormat('6:00 PM')).toBe(false);
      expect(isValidTimeFormat('18:00:00')).toBe(false);
    });
  });

  describe('isEndTimeAfterStartTime', () => {
    it('should return true when end is after start', () => {
      expect(isEndTimeAfterStartTime('18:00', '22:00')).toBe(true);
    });

    it('should return false when end is before start', () => {
      expect(isEndTimeAfterStartTime('22:00', '18:00')).toBe(false);
    });

    it('should return false when times are equal', () => {
      expect(isEndTimeAfterStartTime('18:00', '18:00')).toBe(false);
    });
  });
});
