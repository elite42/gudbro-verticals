export const pharmacyConfig = {
  // Vertical identification
  vertical: 'pharmacy',
  name: 'MediViet Pharmacy',

  // Business information
  business: {
    name: 'MediViet Pharmacy',
    logo: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=120&h=120&fit=crop&crop=center',
    tagline: 'Your Health, Translated',
    description:
      'Pharmacy catalog with English translations, symptom search, and delivery in Da Nang. Find medicines easily as a tourist or expat in Vietnam.',
  },

  // Contact information
  contact: {
    phone: '+84 905 456 789',
    zaloId: '0905456789',
    whatsappNumber: '+84905456789',
    email: 'info@mediviet.gudbro.com',
  },

  // Social media
  social: {
    facebook: 'https://facebook.com/medivietpharmacy',
    instagram: 'https://instagram.com/medivietpharmacy',
  },

  // Location
  location: {
    address: '123 Nguyen Van Linh, Da Nang',
    googleMapsUrl: 'https://maps.google.com/?q=123+Nguyen+Van+Linh+Da+Nang',
    coordinates: {
      lat: 16.0471,
      lng: 108.2068,
    },
  },

  // Reviews
  reviews: {
    googleReviewUrl: 'https://g.page/r/medivietpharmacy/review',
  },

  // Payment methods
  paymentMethods: ['Cash', 'Card', 'MoMo', 'ZaloPay', 'GrabPay'],

  // UI Configuration
  ui: {
    itemCard: {
      components: ['price', 'image', 'description'],
      showExtras: false,
    },
    filters: ['category', 'symptom', 'price'],
    bookingFlow: 'direct-contact',
    labels: {
      items: 'Products',
      category: 'Category',
      price: 'Price',
      search: 'Search by symptom or medicine name',
      promotions: 'Offers',
      bookNow: 'Order via Zalo',
      home: 'Home',
      services: 'Products',
      offers: 'Offers',
    },
    theme: {
      primary: '#2D9F83',
      secondary: '#5BB5A2',
      accent: '#E8A838',
    },
  },

  // Feature flags
  features: {
    enableLanguageSelector: true,
    enableCurrencyConverter: true,
    enableSearch: true,
    enableSymptomSearch: true,
    enablePackages: false,
    enablePromotions: true,
    enableDelivery: true,
    enableBannedDrugWarnings: true,
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

  // Symptom categories for search
  symptoms: [
    { key: 'headache', label: 'Headache', emoji: '🤕', vi: 'Đau đầu' },
    { key: 'stomach', label: 'Stomach Pain', emoji: '🤢', vi: 'Đau bụng' },
    { key: 'diarrhea', label: 'Diarrhea', emoji: '💧', vi: 'Tiêu chảy' },
    { key: 'allergy', label: 'Allergy', emoji: '🤧', vi: 'Dị ứng' },
    { key: 'cold', label: 'Cold & Flu', emoji: '🤒', vi: 'Cảm cúm' },
    { key: 'sunburn', label: 'Sunburn', emoji: '☀️', vi: 'Cháy nắng' },
    { key: 'insect_bite', label: 'Insect Bite', emoji: '🦟', vi: 'Côn trùng cắn' },
    { key: 'muscle_pain', label: 'Muscle Pain', emoji: '💪', vi: 'Đau cơ' },
    { key: 'fever', label: 'Fever', emoji: '🌡️', vi: 'Sốt' },
    { key: 'wound', label: 'Wound / Cut', emoji: '🩹', vi: 'Vết thương' },
    { key: 'motion_sickness', label: 'Motion Sickness', emoji: '🚗', vi: 'Say tàu xe' },
    { key: 'dehydration', label: 'Dehydration', emoji: '💦', vi: 'Mất nước' },
  ],

  // Product categories
  categories: [
    { key: 'pain_relief', label: 'Pain Relief', emoji: '💊', vi: 'Giảm đau' },
    { key: 'stomach_digestive', label: 'Stomach & Digestive', emoji: '🫃', vi: 'Tiêu hóa' },
    { key: 'allergy_antihistamine', label: 'Allergy', emoji: '🤧', vi: 'Dị ứng' },
    { key: 'cold_flu', label: 'Cold & Flu', emoji: '🤒', vi: 'Cảm cúm' },
    { key: 'antibiotics', label: 'Antibiotics', emoji: '🧬', vi: 'Kháng sinh' },
    { key: 'skincare_sun', label: 'Skincare & Sun', emoji: '☀️', vi: 'Chăm sóc da' },
    { key: 'first_aid', label: 'First Aid', emoji: '🩹', vi: 'Sơ cứu' },
    { key: 'vitamins', label: 'Vitamins & Supplements', emoji: '💪', vi: 'Vitamin' },
    { key: 'insect_repellent', label: 'Insect Protection', emoji: '🦟', vi: 'Chống côn trùng' },
    { key: 'oral_health', label: 'Oral Health', emoji: '🦷', vi: 'Răng miệng' },
  ],
};

export function getApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3031';
}
