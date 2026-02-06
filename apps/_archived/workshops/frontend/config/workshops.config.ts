// ===== WORKSHOPS & EXPERIENCES CONFIG =====

export const BUSINESS = {
  name: 'GUDBRO Workshops',
  tagline: 'Craft Your Story',
  description:
    'Discover authentic artisan workshops and cultural experiences in Da Nang & Hoi An. Cooking classes, pottery, lantern making, and more — taught by local masters.',
  type: 'TouristAttraction',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://workshops.gudbro.com',
  image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1200&h=630&fit=crop',
  phone: '+84905456789',
  whatsapp: '+84905456789',
  zalo: '+84905456789',
  email: 'workshops@gudbro.com',
  address: {
    street: 'Da Nang & Hoi An, Central Vietnam',
    city: 'Da Nang',
    region: 'Central Vietnam',
    postalCode: '550000',
    country: 'VN',
  },
  geo: {
    lat: 16.0471,
    lng: 108.2068,
  },
  rating: {
    value: 4.9,
    count: 312,
  },
};

export const CATEGORIES = [
  {
    slug: 'cooking',
    label: 'Cooking',
    emoji: '👨‍🍳',
    color: 'var(--cat-cooking)',
    viLabel: 'Nấu ăn',
  },
  { slug: 'craft', label: 'Crafts', emoji: '🏮', color: 'var(--cat-craft)', viLabel: 'Thủ công' },
  {
    slug: 'art',
    label: 'Art & Painting',
    emoji: '🎨',
    color: 'var(--cat-art)',
    viLabel: 'Nghệ thuật',
  },
  {
    slug: 'jewelry',
    label: 'Jewelry',
    emoji: '💎',
    color: 'var(--cat-jewelry)',
    viLabel: 'Trang sức',
  },
  {
    slug: 'bamboo',
    label: 'Bamboo Craft',
    emoji: '🎋',
    color: 'var(--cat-bamboo)',
    viLabel: 'Tre',
  },
  {
    slug: 'martial-arts',
    label: 'Martial Arts',
    emoji: '🥋',
    color: 'var(--cat-martial)',
    viLabel: 'Võ thuật',
  },
  { slug: 'dance', label: 'Dance', emoji: '💃', color: 'var(--cat-dance)', viLabel: 'Múa' },
  { slug: 'coffee', label: 'Coffee', emoji: '☕', color: 'var(--cat-coffee)', viLabel: 'Cà phê' },
  {
    slug: 'ao-dai',
    label: 'Ao Dai / Fashion',
    emoji: '👗',
    color: 'var(--cat-fashion)',
    viLabel: 'Áo dài',
  },
  {
    slug: 'food-tour',
    label: 'Food Tours',
    emoji: '🍜',
    color: 'var(--cat-food-tour)',
    viLabel: 'Ẩm thực',
  },
];

export const AREAS = [
  { slug: 'hoi-an', label: 'Hoi An', emoji: '🏮' },
  { slug: 'hoi-an-old-town', label: 'Hoi An Old Town', emoji: '🏛️' },
  { slug: 'da-nang', label: 'Da Nang', emoji: '🌉' },
  { slug: 'thanh-ha', label: 'Thanh Ha Village', emoji: '🏺' },
  { slug: 'tra-que', label: 'Tra Que Herb Village', emoji: '🌿' },
  { slug: 'an-bang', label: 'An Bang Beach', emoji: '🏖️' },
  { slug: 'marble-mountains', label: 'Marble Mountains', emoji: '🗻' },
  { slug: 'ba-na-hills', label: 'Ba Na Hills', emoji: '⛰️' },
];

export const SKILL_LEVELS = [
  { value: 'beginner', label: 'Beginner', description: 'No experience needed' },
  { value: 'intermediate', label: 'Intermediate', description: 'Some experience helpful' },
  { value: 'advanced', label: 'Advanced', description: 'Prior skills required' },
];

export const LANGUAGES_AVAILABLE = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'vi', label: 'Vietnamese', flag: '🇻🇳' },
  { code: 'ko', label: 'Korean', flag: '🇰🇷' },
  { code: 'zh', label: 'Chinese', flag: '🇨🇳' },
  { code: 'ja', label: 'Japanese', flag: '🇯🇵' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
];

export const I18N = {
  defaultLocale: 'en',
  supportedLocales: ['en', 'vi', 'ko', 'zh'],
  currencies: [
    { code: 'VND', symbol: '₫', label: 'Vietnamese Dong', locale: 'vi-VN' },
    { code: 'USD', symbol: '$', label: 'US Dollar', locale: 'en-US' },
    { code: 'EUR', symbol: '€', label: 'Euro', locale: 'de-DE' },
    { code: 'KRW', symbol: '₩', label: 'Korean Won', locale: 'ko-KR' },
    { code: 'AUD', symbol: 'A$', label: 'Australian Dollar', locale: 'en-AU' },
    { code: 'CNY', symbol: '¥', label: 'Chinese Yuan', locale: 'zh-CN' },
  ],
};

export const FEATURES = {
  calendarView: true,
  onlineBooking: false, // Phase 1: WhatsApp/Zalo only
  operatorProfiles: true,
  reviewSystem: true,
  multiLanguage: true,
  multiCurrency: true,
};
