import { VerticalConfig } from '../../../menu-template/types';
import { getTierConfig, TierLevel, DEFAULT_TIER } from '../lib/tier-system';

/**
 * Coffeeshop Vertical Configuration
 * Based on @gudbro/menu-template system
 *
 * ✨ NEW: Integrated with SaaS Tier System
 * Features and limits are now determined by active subscription tier.
 * Change activeTier to test different subscription levels.
 */

/**
 * Active subscription tier
 *
 * For MVP testing, change this value to simulate tier upgrades/downgrades:
 * - 'digital-menu': $29/mo - Digital menu only, no ordering
 * - 'pre-ordering': $79/mo - Digital menu + ordering + engagement
 * - 'full-suite': $149/mo - Complete restaurant management
 */
const ACTIVE_TIER: TierLevel = 'pre-ordering'; // ✅ Currently testing PRO tier with ordering enabled

// Get tier configuration
const tierConfig = getTierConfig(ACTIVE_TIER);

export const coffeeshopConfig = {
  // Vertical identification
  vertical: 'restaurant' as const,
  name: 'ROOTS',

  // 🆕 Tier system
  activeTier: ACTIVE_TIER,
  tierInfo: {
    name: tierConfig.name,
    price: tierConfig.price,
    badge: tierConfig.branding.badge,
  },

  // Business information
  business: {
    name: 'ROOTS',
    logo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=120&h=120&fit=crop&crop=center',
    tagline: 'Clean food opportunity for everyone',
    description: 'Clean food opportunity for everyone. Modern plant-based dining using fresh, locally farmed produce to make a change through healthy and sustainable food.'
  },

  // Contact information
  contact: {
    phone: '+84 865 528 252',
    zaloId: '0865528252',
    whatsappNumber: '+84865528252',
    email: 'info@rootsplantbasedcafe.com'
  },

  // Social media
  social: {
    facebook: 'https://facebook.com/rootscafevn',
    instagram: 'https://instagram.com/roots.vietnam',
    tiktok: 'https://www.tripadvisor.com/Restaurant_Review-g15296807-d15326920-Reviews-Roots_Plant_Based_Cafe-My_An_Da_Nang.html'
  },

  // Location
  location: {
    address: '27 Trần Bạch Đằng, Bắc Mỹ Phú, Ngũ Hành Sơn, Đà Nẵng',
    googleMapsUrl: 'https://www.google.com/maps/place/Roots+Plant-Based+Cafe+-+Healthy+vegan+restaurant/@16.0486723,108.2452807,17z/data=!3m1!4b1!4m6!3m5!1s0x3142171cef03cf01:0x8bc2a190f42f983!8m2!3d16.0486723!4d108.2478556!16s%2Fg%2F11fd4prghb?entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D',
    coordinates: {
      lat: 16.0486723,
      lng: 108.2478556
    }
  },

  // Reviews
  reviews: {
    googleReviewUrl: 'https://www.google.com/maps/place/Roots+Plant-Based+Cafe+-+Healthy+vegan+restaurant/@16.0486723,108.2452807,17z/data=!3m1!4b1!4m6!3m5!1s0x3142171cef03cf01:0x8bc2a190f42f983!8m2!3d16.0486723!4d108.2478556!16s%2Fg%2F11fd4prghb?entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D',
    tripadvisorUrl: 'https://www.tripadvisor.com/Restaurant_Review-g15296807-d15326920-Reviews-Roots_Plant_Based_Cafe-My_An_Da_Nang.html'
  },

  // Payment methods
  paymentMethods: ['Cash', 'Card', 'MoMo', 'ZaloPay', 'GrabPay', 'Apple Pay'],

  // UI Configuration
  ui: {
    // Item card configuration
    itemCard: {
      components: ['image', 'description', 'price', 'quantity'],
      showExtras: true // Coffeeshops have extras like size, milk type, etc.
    },

    // Available filters
    filters: ['category', 'price', 'dietary'],

    // Booking flow: cart-based ordering (typical for coffee shops)
    bookingFlow: 'cart-based' as const,

    // Custom terminology
    labels: {
      items: 'Menu',
      category: 'Categoria',
      price: 'Prezzo',
      duration: 'Preparazione',
      search: 'Cerca nel menu',
      packages: 'Combo',
      promotions: 'Offerte',
      bookNow: 'Aggiungi al Carrello',
      home: 'Home',
      services: 'Menu',
      team: 'Baristi',
      offers: 'Offerte',
      menu: 'Menu',
      cart: 'Carrello',
      checkout: 'Ordina'
    },

    // Theme colors - ROOTS brand colors
    theme: {
      primary: '#f6bc26', // golden yellow
      secondary: '#0170B9', // blue
      accent: '#3a3a3a'   // dark gray
    }
  },

  // Feature flags (now controlled by tier system)
  // 🔒 These are READ-ONLY - Change ACTIVE_TIER above to enable/disable features
  get features() {
    return tierConfig.features;
  },

  // Usage limits (controlled by tier system)
  // 🔒 These are READ-ONLY - Change ACTIVE_TIER above to adjust limits
  get limits() {
    return tierConfig.limits;
  },

  // Engagement System Configuration (PRO TIER FEATURE)
  engagement: {
    // Review platforms
    reviewPlatforms: [
      {
        id: 'google',
        name: 'Google',
        url: 'https://www.google.com/maps/place/Roots+Plant-Based+Cafe+-+Healthy+vegan+restaurant/@16.0486723,108.2452807,17z',
        icon: '🔍'
      },
      {
        id: 'tripadvisor',
        name: 'TripAdvisor',
        url: 'https://www.tripadvisor.com/Restaurant_Review-g15296807-d15326920-Reviews-Roots_Plant_Based_Cafe-My_An_Da_Nang.html',
        icon: '🦉'
      },
      {
        id: 'facebook',
        name: 'Facebook',
        url: 'https://facebook.com/rootscafevn',
        icon: '👍'
      }
    ],

    // Social media platforms for sharing
    socialPlatforms: [
      {
        id: 'instagram',
        name: 'Instagram',
        handle: '@roots.vietnam',
        hashtags: ['#RootsPlantBased', '#DaNangVegan', '#PlantBasedDaNang'],
        icon: '📷'
      },
      {
        id: 'facebook',
        name: 'Facebook',
        handle: 'rootscafevn',
        icon: '👍'
      }
    ],

    // Discount rewards configuration
    rewards: {
      review_positive: { value: 10, type: 'percentage', validDays: 30 }, // >= 4 stars
      review_negative: { value: 15, type: 'percentage', validDays: 30 }, // < 4 stars (private feedback)
      photo_share: { value: 10, type: 'percentage', validDays: 30 },
      checkin: { value: 5, type: 'percentage', validDays: 30 },
      follow: { value: 5, type: 'percentage', validDays: 30 }
    },

    // Threshold for public vs private review
    minRatingForPublic: 4
  },

  // WiFi Configuration (Auto-connect feature)
  wifi: {
    enabled: process.env.NEXT_PUBLIC_WIFI_ENABLED === 'true',
    ssid: process.env.NEXT_PUBLIC_WIFI_SSID || 'ROOTS_Guest',
    password: process.env.NEXT_PUBLIC_WIFI_PASSWORD || '',
    security: (process.env.NEXT_PUBLIC_WIFI_SECURITY || 'WPA') as 'WPA' | 'WEP' | 'nopass',
    hidden: process.env.NEXT_PUBLIC_WIFI_HIDDEN === 'true'
  },

  // Internationalization & Currency
  // 🏪 Base currency = the currency the locale sets their prices in
  // 🌍 Supported currencies = currencies tourists can convert to for reference
  i18n: {
    defaultLanguage: 'en',
    supportedLanguages: [
      { code: 'en', flag: '🇬🇧', name: 'English', countryCode: 'gb' },
      { code: 'vi', flag: '🇻🇳', name: 'Tiếng Việt', countryCode: 'vn' },
      { code: 'it', flag: '🇮🇹', name: 'Italiano', countryCode: 'it' }
    ],
    // Base currency: The currency prices are stored in (locale's native currency)
    // ROOTS is in Da Nang, Vietnam - prices are set in VND
    baseCurrency: 'VND',
    // Supported currencies for tourist conversion
    supportedCurrencies: ['VND', 'USD', 'EUR', 'GBP', 'AUD', 'JPY', 'KRW', 'CNY']
  }
};

// Export helper to get API URL
export function getApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3014/api/coffeeshop';
}

// Export hub ID
export const HUB_ID = '770e8400-e29b-41d4-a716-446655440001';
