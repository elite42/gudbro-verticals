/**
 * Delivery Apps Data Module — Static config for food delivery platforms
 *
 * Phase 38: Guest Lifecycle
 *
 * Country-keyed registry of food delivery apps available in each market.
 * Used by DeliveryAppsSection to show branded cards with deep-links.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DeliveryApp {
  id: string;
  name: string;
  description: string;
  color: string;
  iconEmoji: string;
  universalLink: string;
  iosAppStore: string;
  googlePlay: string;
}

// ---------------------------------------------------------------------------
// Vietnam (VN)
// ---------------------------------------------------------------------------

const VN_APPS: DeliveryApp[] = [
  {
    id: 'grab',
    name: 'Grab',
    description: 'Food, groceries & rides',
    color: '#00B14F',
    iconEmoji: '\u{1F7E2}',
    universalLink: 'https://food.grab.com/vn/en/',
    iosAppStore: 'https://apps.apple.com/app/grab-taxi-ride-food-delivery/id647268330',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.grabtaxi.passenger',
  },
  {
    id: 'shopeefood',
    name: 'ShopeeFood',
    description: 'Local restaurants & street food',
    color: '#EE4D2D',
    iconEmoji: '\u{1F7E0}',
    universalLink: 'https://shopeefood.vn/',
    iosAppStore: 'https://apps.apple.com/app/shopeefood/id1137498563',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.shopee.shopeefood',
  },
  {
    id: 'baemin',
    name: 'Baemin',
    description: 'Korean-style food delivery',
    color: '#3BC5AA',
    iconEmoji: '\u{1FA75}',
    universalLink: 'https://baemin.vn/',
    iosAppStore: 'https://apps.apple.com/app/baemin-food-delivery/id1479498631',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.vng.baemin',
  },
];

// ---------------------------------------------------------------------------
// Thailand (TH)
// ---------------------------------------------------------------------------

const TH_APPS: DeliveryApp[] = [
  {
    id: 'grab',
    name: 'Grab',
    description: 'Food, groceries & rides',
    color: '#00B14F',
    iconEmoji: '\u{1F7E2}',
    universalLink: 'https://food.grab.com/th/en/',
    iosAppStore: 'https://apps.apple.com/app/grab-taxi-ride-food-delivery/id647268330',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.grabtaxi.passenger',
  },
  {
    id: 'foodpanda',
    name: 'foodpanda',
    description: 'Food & grocery delivery',
    color: '#D70F64',
    iconEmoji: '\u{1FA77}',
    universalLink: 'https://www.foodpanda.co.th/',
    iosAppStore: 'https://apps.apple.com/app/foodpanda-food-delivery/id758103884',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.global.foodpanda.android',
  },
  {
    id: 'lineman',
    name: 'LINE MAN',
    description: 'Food, parcels & services',
    color: '#00C300',
    iconEmoji: '\u{1F49A}',
    universalLink: 'https://lineman.line.me/',
    iosAppStore: 'https://apps.apple.com/app/line-man/id1078271530',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.linecorp.lineman',
  },
];

// ---------------------------------------------------------------------------
// Data Registry
// ---------------------------------------------------------------------------

const DELIVERY_APPS: Record<string, DeliveryApp[]> = {
  VN: VN_APPS,
  TH: TH_APPS,
};

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

/**
 * Get delivery apps for a given country code.
 * Returns empty array if no apps are configured for that country.
 */
export function getDeliveryApps(countryCode: string): DeliveryApp[] {
  return DELIVERY_APPS[countryCode?.toUpperCase()] || [];
}
