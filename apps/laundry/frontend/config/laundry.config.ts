export const laundryConfig = {
  // Vertical identification
  vertical: 'laundry',
  name: 'Fresh & Clean Laundry',

  // Business information
  business: {
    name: 'Fresh & Clean Laundry',
    logo: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=120&h=120&fit=crop&crop=center',
    tagline: 'Professional Laundry & Dry Cleaning',
    description: 'Fast, affordable laundry and dry cleaning services in Da Nang. Wash & fold, ironing, dry cleaning, shoe cleaning, and express service available.',
  },

  // Contact information
  contact: {
    phone: '+84 935 123 456',
    zaloId: '0935123456',
    whatsappNumber: '+84935123456',
    email: 'info@freshclean.gudbro.com',
  },

  // Social media
  social: {
    facebook: 'https://facebook.com/freshcleanlaundry',
    instagram: 'https://instagram.com/freshcleanlaundry',
  },

  // Location
  location: {
    address: '56 An Thuong 4, Da Nang',
    googleMapsUrl: 'https://maps.google.com/?q=56+An+Thuong+4+Da+Nang',
    coordinates: {
      lat: 16.0544,
      lng: 108.2022,
    },
  },

  // Reviews
  reviews: {
    googleReviewUrl: 'https://g.page/r/freshcleanlaundry/review',
  },

  // Payment methods
  paymentMethods: ['Cash', 'Card', 'MoMo', 'ZaloPay', 'GrabPay'],

  // UI Configuration
  ui: {
    itemCard: {
      components: ['price', 'image', 'description'],
      showExtras: false,
    },
    filters: ['category', 'price'],
    bookingFlow: 'direct-contact',
    labels: {
      items: 'Services',
      category: 'Type',
      price: 'Price',
      search: 'Search services',
      promotions: 'Promotions',
      bookNow: 'Order on Zalo',
      home: 'Home',
      services: 'Services',
      offers: 'Promos',
    },
    theme: {
      primary: '#4A90D9',
      secondary: '#38B2AC',
      accent: '#D69E2E',
    },
  },

  // Feature flags
  features: {
    enableLanguageSelector: true,
    enableCurrencyConverter: true,
    enableSearch: true,
    enablePackages: false,
    enablePromotions: true,
  },

  // Internationalization
  i18n: {
    defaultLanguage: 'en',
    supportedLanguages: [
      { code: 'en', flag: '\u{1F1EC}\u{1F1E7}', name: 'English' },
      { code: 'vi', flag: '\u{1F1FB}\u{1F1F3}', name: 'Ti\u1EBFng Vi\u1EC7t' },
      { code: 'ko', flag: '\u{1F1F0}\u{1F1F7}', name: '\uD55C\uAD6D\uC5B4' },
      { code: 'zh', flag: '\u{1F1E8}\u{1F1F3}', name: '\u4E2D\u6587' },
    ],
    defaultCurrency: 'VND',
    baseCurrency: 'VND',
    supportedCurrencies: ['VND', 'USD', 'EUR', 'KRW', 'CNY'],
  },
};

export function getApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';
}
