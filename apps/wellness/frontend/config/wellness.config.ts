import { VerticalConfig } from '@gudbro/menu-template/types';

/**
 * Wellness/Spa Vertical Configuration
 * Based on @gudbro/menu-template system
 */
export const wellnessConfig: VerticalConfig = {
  // Vertical identification
  vertical: 'wellness',
  name: 'Jennie SPA',

  // Business information
  business: {
    name: 'Jennie SPA',
    logo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=120&h=120&fit=crop&crop=center',
    tagline: 'Traditional Vietnamese Massage',
    description:
      'Experience authentic Vietnamese spa and wellness treatments from our expert therapists',
  },

  // Contact information
  contact: {
    phone: '+84 932 594 962',
    zaloId: '0932594962',
    whatsappNumber: '+84932594962',
    email: 'info@jenniespa.com',
  },

  // Social media
  social: {
    facebook: 'https://facebook.com/jenniespa',
    instagram: 'https://instagram.com/jenniespa',
    tiktok: 'https://tiktok.com/@jenniespa',
  },

  // Location
  location: {
    address: '34 An Thuong 2, Da Nang',
    googleMapsUrl: 'https://maps.google.com/?q=34+An+Thuong+2+Da+Nang',
    coordinates: {
      lat: 16.0544,
      lng: 108.2022,
    },
  },

  // Reviews
  reviews: {
    googleReviewUrl: 'https://g.page/r/CZtKXZ0Z0Z0ZEAE/review',
    tripadvisorUrl: 'https://tripadvisor.com/jenniespa',
  },

  // Payment methods
  paymentMethods: ['Cash', 'Card', 'MoMo', 'ZaloPay', 'GrabPay'],

  // UI Configuration
  ui: {
    // Item card configuration
    itemCard: {
      components: ['duration', 'price', 'image', 'description'],
      showExtras: false, // Spas don't have extras like restaurants
    },

    // Available filters
    filters: ['category', 'duration', 'price'],

    // Booking flow: direct contact (no cart needed for spa bookings)
    bookingFlow: 'direct-contact',

    // Custom terminology
    labels: {
      items: 'Trattamenti',
      category: 'Tipo',
      price: 'Tariffa',
      duration: 'Durata',
      search: 'Cerca servizi',
      packages: 'Pacchetti VIP',
      promotions: 'Promozioni',
      bookNow: 'Prenota su Zalo',
      home: 'Home',
      services: 'Servizi',
      team: 'Team',
      offers: 'Offerte',
    },

    // Theme colors
    theme: {
      primary: '#EC4899', // pink-500
      secondary: '#A855F7', // purple-500
      accent: '#F59E0B', // amber-500
    },
  },

  // Feature flags
  features: {
    enableLanguageSelector: true,
    enableCurrencyConverter: true,
    enableSearch: true,
    enablePackages: true,
    enablePromotions: true,
  },

  // Internationalization
  i18n: {
    defaultLanguage: 'en',
    supportedLanguages: [
      { code: 'en', flag: '🇬🇧', name: 'English' },
      { code: 'vi', flag: '🇻🇳', name: 'Tiếng Việt' },
      { code: 'ko', flag: '🇰🇷', name: '한국어' },
      { code: 'zh', flag: '🇨🇳', name: '中文' },
      { code: 'ja', flag: '🇯🇵', name: '日本語' },
    ],
    defaultCurrency: 'VND',
    supportedCurrencies: ['VND', 'USD', 'EUR', 'CNY', 'KRW', 'JPY'],
  },
};

// Export helper to get API URL
export function getApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3013/api/wellness';
}

// Export hub ID
export const HUB_ID = '660e8400-e29b-41d4-a716-446655440000';
