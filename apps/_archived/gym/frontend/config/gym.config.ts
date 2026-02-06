/**
 * Gym & Fitness PWA Configuration
 * Complete mock data for "Iron Paradise Gym & Fitness"
 */

export const gymConfig = {
  vertical: 'gym',
  name: 'Iron Paradise Gym & Fitness',

  business: {
    name: 'Iron Paradise Gym & Fitness',
    logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=120&h=120&fit=crop&crop=center',
    tagline: 'Train Hard. Stay Strong.',
    description:
      'Modern gym & fitness center in Da Nang with day passes, monthly memberships, group classes, personal training, swimming pool, and full equipment. Open to locals, expats, and tourists.',
    heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop',
  },

  contact: {
    phone: '+84 935 456 789',
    zaloId: '0935456789',
    whatsappNumber: '+84935456789',
    email: 'info@ironparadise.gudbro.com',
  },

  social: {
    facebook: 'https://facebook.com/ironparadisedanang',
    instagram: 'https://instagram.com/ironparadisedanang',
    google: 'https://g.page/ironparadisedanang',
    tiktok: 'https://tiktok.com/@ironparadisedanang',
  },

  location: {
    address: '88 Vo Nguyen Giap, Son Tra, Da Nang',
    googleMapsUrl: 'https://maps.google.com/?q=88+Vo+Nguyen+Giap+Da+Nang',
    coordinates: { lat: 16.06, lng: 108.245 },
  },

  rating: { value: 4.7, count: 214 },

  openingHours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      open: '05:30',
      close: '22:00',
      label: 'Mon - Fri',
    },
    { days: ['Saturday'], open: '06:00', close: '21:00', label: 'Saturday' },
    { days: ['Sunday'], open: '07:00', close: '20:00', label: 'Sunday' },
  ],

  paymentMethods: ['Cash', 'Card', 'MoMo', 'ZaloPay', 'Bank Transfer'],

  ui: {
    theme: {
      primary: '#E85D04',
      secondary: '#1B2A4A',
      accent: '#FFB800',
    },
    labels: {
      items: 'Courses',
      category: 'Type',
      price: 'Price',
      search: 'Search courses, passes, products...',
      promotions: 'Promotions',
      bookNow: 'Get Day Pass',
      home: 'Home',
      courses: 'Courses',
      shop: 'Shop',
      account: 'Account',
    },
  },

  features: {
    enableLanguageSelector: true,
    enableCurrencyConverter: true,
    enableSearch: true,
    enablePromotions: true,
    enableShop: true,
    enableAccount: true,
  },

  i18n: {
    defaultLanguage: 'en',
    supportedLanguages: [
      { code: 'en', flag: '🇬🇧', name: 'English' },
      { code: 'vi', flag: '🇻🇳', name: 'Tiếng Việt' },
      { code: 'ko', flag: '🇰🇷', name: '한국어' },
    ],
    defaultCurrency: 'VND',
    baseCurrency: 'VND',
    supportedCurrencies: ['VND', 'USD', 'EUR', 'KRW'],
  },
};

// ============================================
// PASSES / PRICING
// ============================================
export interface Pass {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  price: number;
  conventionPrice: number;
  duration: string;
  description: string;
  includes: string[];
  popular?: boolean;
  entries?: number;
  note?: string;
}

export const passes: Pass[] = [
  {
    id: 'day',
    slug: 'day-pass',
    name: 'Day Pass',
    shortName: 'Day',
    price: 100000,
    conventionPrice: 80000,
    duration: '1 day',
    description: 'Full access for one day. Perfect for travelers or try-before-you-commit.',
    includes: [
      'Full gym access',
      'Locker & towel',
      'Hot/cold showers',
      'WiFi',
      '1 group class (if scheduled)',
    ],
  },
  {
    id: 'week',
    slug: 'week-pass',
    name: 'Weekly Pass',
    shortName: 'Week',
    price: 400000,
    conventionPrice: 320000,
    duration: '7 days',
    description: 'A full week of unlimited gym access. Great for short stays.',
    includes: [
      'Full gym access',
      'Locker & towel',
      'Hot/cold showers',
      'WiFi',
      'All group classes',
      'Pool access',
    ],
  },
  {
    id: '10entry',
    slug: '10-entry-pack',
    name: '10-Entry Pack',
    shortName: '10 Entries',
    price: 700000,
    conventionPrice: 560000,
    duration: 'No expiry',
    description:
      'Buy 10 entries, use them anytime. Each visit deducts 1 entry. No expiration date.',
    includes: [
      'Full gym access',
      'Locker & towel',
      'Hot/cold showers',
      'WiFi',
      'All group classes',
      'Pool access',
    ],
    entries: 10,
    note: 'Entries are deducted per visit, not per day. Unused entries never expire.',
    popular: true,
  },
  {
    id: 'monthly',
    slug: 'monthly-membership',
    name: 'Monthly Membership',
    shortName: 'Monthly',
    price: 800000,
    conventionPrice: 640000,
    duration: '30 days',
    description: 'Unlimited access for a full month. Best value for regular gym-goers.',
    includes: [
      'Unlimited gym access',
      'Locker & towel',
      'Hot/cold showers',
      'WiFi',
      'All group classes',
      'Pool & sauna',
      '1 free PT session',
    ],
    popular: true,
  },
  {
    id: 'quarterly',
    slug: 'quarterly-membership',
    name: 'Quarterly Membership',
    shortName: 'Quarterly',
    price: 2000000,
    conventionPrice: 1600000,
    duration: '90 days',
    description: 'Three months of unlimited access at a discounted rate. Commit and save.',
    includes: [
      'Unlimited gym access',
      'Locker & towel',
      'Hot/cold showers',
      'WiFi',
      'All group classes',
      'Pool & sauna',
      '3 free PT sessions',
      'Nutrition consultation',
    ],
  },
  {
    id: 'yearly',
    slug: 'yearly-membership',
    name: 'Yearly Membership',
    shortName: 'Yearly',
    price: 6000000,
    conventionPrice: 4800000,
    duration: '365 days',
    description: 'The ultimate commitment. Best price per month with premium perks.',
    includes: [
      'Unlimited gym access',
      'Locker & towel',
      'Hot/cold showers',
      'WiFi',
      'All group classes',
      'Pool & sauna',
      '12 free PT sessions',
      'Nutrition consultation',
      'Free branded t-shirt',
      'Guest pass x2',
    ],
  },
];

// ============================================
// COURSES / CLASSES
// ============================================
export interface PTPackage {
  sessions: number;
  pricePerSession: number;
  totalPrice: number;
  label: string;
}

export interface Instructor {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  photo: string;
  certifications: string[];
  languages: string[];
  specialties: string[];
  ptAvailable: boolean;
  ptRate?: number; // per session, VND
  ptPackages?: PTPackage[];
  ptAvailability?: { day: string; slots: string[] }[];
  social?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
}

export const instructors: Instructor[] = [
  {
    id: 'coach-minh',
    slug: 'coach-minh',
    name: 'Coach Minh',
    title: 'Head Boxing Coach',
    bio: 'Former national amateur boxer with 15 years of coaching experience. Trained fighters across Southeast Asia. Specializes in technique, footwork, and conditioning.',
    photo:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop&crop=face',
    certifications: ['ISSA Certified', 'Boxing Federation VN'],
    languages: ['Vietnamese', 'English'],
    specialties: ['Boxing', 'Kickboxing', 'Conditioning'],
    ptAvailable: true,
    ptRate: 400000,
    ptPackages: [
      { sessions: 1, pricePerSession: 400000, totalPrice: 400000, label: 'Single Session' },
      { sessions: 5, pricePerSession: 350000, totalPrice: 1750000, label: '5-Session Pack' },
      { sessions: 10, pricePerSession: 300000, totalPrice: 3000000, label: '10-Session Pack' },
    ],
    ptAvailability: [
      { day: 'Monday', slots: ['09:00', '10:00', '14:00', '15:00'] },
      { day: 'Tuesday', slots: ['09:00', '10:00', '14:00', '19:00'] },
      { day: 'Wednesday', slots: ['09:00', '10:00', '14:00', '15:00'] },
      { day: 'Thursday', slots: ['09:00', '10:00', '14:00', '19:00'] },
      { day: 'Friday', slots: ['09:00', '10:00', '14:00', '15:00'] },
      { day: 'Saturday', slots: ['10:00', '11:00'] },
    ],
    social: {
      instagram: 'https://instagram.com/coachminh_boxing',
      facebook: 'https://facebook.com/coachminh.boxing',
    },
  },
  {
    id: 'lisa-nguyen',
    slug: 'lisa-nguyen',
    name: 'Lisa Nguyen',
    title: 'Yoga & Pilates Instructor',
    bio: 'RYT-500 certified yoga teacher. Trained in Bali and India. Focuses on alignment, breath work, and mindful movement for all levels.',
    photo:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
    certifications: ['RYT-500', 'Pilates Mat Certified'],
    languages: ['Vietnamese', 'English', 'French'],
    specialties: ['Vinyasa Yoga', 'Mat Pilates', 'Meditation'],
    ptAvailable: true,
    ptRate: 350000,
    ptPackages: [
      { sessions: 1, pricePerSession: 350000, totalPrice: 350000, label: 'Single Session' },
      { sessions: 5, pricePerSession: 300000, totalPrice: 1500000, label: '5-Session Pack' },
      { sessions: 10, pricePerSession: 260000, totalPrice: 2600000, label: '10-Session Pack' },
    ],
    ptAvailability: [
      { day: 'Monday', slots: ['10:00', '11:00', '14:00'] },
      { day: 'Tuesday', slots: ['10:30', '14:00', '15:00'] },
      { day: 'Wednesday', slots: ['10:00', '11:00', '14:00'] },
      { day: 'Thursday', slots: ['10:30', '14:00', '15:00'] },
      { day: 'Friday', slots: ['10:00', '11:00'] },
      { day: 'Saturday', slots: ['10:30', '11:30'] },
    ],
    social: {
      instagram: 'https://instagram.com/lisanguyen.yoga',
      tiktok: 'https://tiktok.com/@lisanguyen.yoga',
    },
  },
  {
    id: 'jake-wilson',
    slug: 'jake-wilson',
    name: 'Jake Wilson',
    title: 'CrossFit & Strength Coach',
    bio: 'CrossFit Level 2 trainer from Australia. Moved to Da Nang in 2021. Passionate about functional fitness and helping people break their limits.',
    photo:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    certifications: ['CrossFit L2', 'NSCA-CPT'],
    languages: ['English'],
    specialties: ['CrossFit', 'Olympic Lifting', 'Strength'],
    ptAvailable: true,
    ptRate: 450000,
    ptPackages: [
      { sessions: 1, pricePerSession: 450000, totalPrice: 450000, label: 'Single Session' },
      { sessions: 5, pricePerSession: 400000, totalPrice: 2000000, label: '5-Session Pack' },
      { sessions: 10, pricePerSession: 350000, totalPrice: 3500000, label: '10-Session Pack' },
    ],
    ptAvailability: [
      { day: 'Monday', slots: ['08:00', '09:00', '15:00', '16:00'] },
      { day: 'Tuesday', slots: ['08:00', '09:00', '15:00', '16:00'] },
      { day: 'Wednesday', slots: ['08:00', '09:00', '15:00', '16:00'] },
      { day: 'Thursday', slots: ['08:00', '09:00', '15:00', '16:00'] },
      { day: 'Friday', slots: ['08:00', '09:00', '15:00'] },
      { day: 'Saturday', slots: ['08:00', '09:00'] },
    ],
    social: {
      instagram: 'https://instagram.com/jakewilson.crossfit',
    },
  },
  {
    id: 'mai-tran',
    slug: 'mai-tran',
    name: 'Mai Tran',
    title: 'HIIT & Dance Fitness',
    bio: 'Energetic fitness instructor with a background in dance. Creates fun, high-intensity workouts that blend cardio, strength, and rhythm.',
    photo:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    certifications: ['ACE Group Fitness', 'Zumba Licensed'],
    languages: ['Vietnamese', 'English'],
    specialties: ['HIIT', 'Dance Fitness', 'Cardio'],
    ptAvailable: true,
    ptRate: 350000,
    ptPackages: [
      { sessions: 1, pricePerSession: 350000, totalPrice: 350000, label: 'Single Session' },
      { sessions: 5, pricePerSession: 300000, totalPrice: 1500000, label: '5-Session Pack' },
      { sessions: 10, pricePerSession: 260000, totalPrice: 2600000, label: '10-Session Pack' },
    ],
    ptAvailability: [
      { day: 'Monday', slots: ['10:00', '11:00', '16:00'] },
      { day: 'Wednesday', slots: ['10:00', '11:00', '16:00'] },
      { day: 'Friday', slots: ['10:00', '11:00', '16:00'] },
      { day: 'Saturday', slots: ['09:00', '10:00'] },
    ],
    social: {
      instagram: 'https://instagram.com/maitran.hiit',
      tiktok: 'https://tiktok.com/@maitran.hiit',
    },
  },
  {
    id: 'david-park',
    slug: 'david-park',
    name: 'David Park',
    title: 'Swimming Coach',
    bio: 'Former competitive swimmer from South Korea. Coaches all levels from beginners to advanced lap swimmers. Patient and methodical teaching style.',
    photo:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    certifications: ['ASCA Level 3', 'Lifeguard Certified'],
    languages: ['Korean', 'English', 'Vietnamese (basic)'],
    specialties: ['Lap Swimming', 'Technique', 'Endurance'],
    ptAvailable: true,
    ptRate: 400000,
    ptPackages: [
      { sessions: 1, pricePerSession: 400000, totalPrice: 400000, label: 'Single Session' },
      { sessions: 5, pricePerSession: 350000, totalPrice: 1750000, label: '5-Session Pack' },
      { sessions: 10, pricePerSession: 300000, totalPrice: 3000000, label: '10-Session Pack' },
    ],
    ptAvailability: [
      { day: 'Monday', slots: ['08:00', '09:00', '14:00'] },
      { day: 'Wednesday', slots: ['08:00', '09:00', '14:00'] },
      { day: 'Friday', slots: ['08:00', '09:00'] },
      { day: 'Sunday', slots: ['09:00', '10:00'] },
    ],
    social: {
      instagram: 'https://instagram.com/davidpark.swim',
    },
  },
];

export interface Course {
  id: string;
  slug: string;
  name: string;
  category: string;
  instructor: string;
  instructorId: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: number; // minutes
  capacity: number;
  currentEnrolled: number;
  priceNote: string;
  whatToBring: string[];
  schedule: { day: string; time: string }[];
  image: string;
  rating: number;
  reviewCount: number;
}

export const courses: Course[] = [
  {
    id: 'boxing',
    slug: 'boxing-fundamentals',
    name: 'Boxing Fundamentals',
    category: 'Boxing',
    instructor: 'Coach Minh',
    instructorId: 'coach-minh',
    description:
      'Learn proper boxing technique: stance, jab, cross, hook, uppercut. Includes pad work, bag work, and conditioning drills. Suitable for complete beginners to intermediate.',
    level: 'All Levels',
    duration: 60,
    capacity: 16,
    currentEnrolled: 12,
    priceNote: 'Included with any pass',
    whatToBring: [
      'Hand wraps (available for purchase)',
      'Water bottle',
      'Towel',
      'Comfortable sportswear',
    ],
    schedule: [
      { day: 'Monday', time: '07:00' },
      { day: 'Wednesday', time: '07:00' },
      { day: 'Friday', time: '07:00' },
      { day: 'Tuesday', time: '18:00' },
      { day: 'Thursday', time: '18:00' },
    ],
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 67,
  },
  {
    id: 'yoga',
    slug: 'vinyasa-yoga',
    name: 'Vinyasa Yoga',
    category: 'Yoga',
    instructor: 'Lisa Nguyen',
    instructorId: 'lisa-nguyen',
    description:
      'Flow through sun salutations, standing poses, balances, and deep stretches. Focus on breath-movement connection. Air-conditioned yoga studio with natural light.',
    level: 'All Levels',
    duration: 75,
    capacity: 20,
    currentEnrolled: 15,
    priceNote: 'Included with any pass',
    whatToBring: ['Yoga mat (available for rent)', 'Water bottle', 'Light comfortable clothing'],
    schedule: [
      { day: 'Monday', time: '08:30' },
      { day: 'Wednesday', time: '08:30' },
      { day: 'Friday', time: '08:30' },
      { day: 'Saturday', time: '09:00' },
    ],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: 'crossfit',
    slug: 'crossfit-wod',
    name: 'CrossFit WOD',
    category: 'CrossFit',
    instructor: 'Jake Wilson',
    instructorId: 'jake-wilson',
    description:
      'Workout of the Day combining weightlifting, gymnastics, and cardio. Scalable for all fitness levels. Whiteboard tracking and community atmosphere.',
    level: 'Intermediate',
    duration: 60,
    capacity: 14,
    currentEnrolled: 11,
    priceNote: 'Included with any pass',
    whatToBring: ['CrossFit shoes or trainers', 'Water bottle', 'Towel', 'Wrist wraps (optional)'],
    schedule: [
      { day: 'Monday', time: '06:00' },
      { day: 'Tuesday', time: '06:00' },
      { day: 'Wednesday', time: '06:00' },
      { day: 'Thursday', time: '06:00' },
      { day: 'Friday', time: '06:00' },
      { day: 'Saturday', time: '07:00' },
    ],
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 53,
  },
  {
    id: 'hiit',
    slug: 'hiit-burn',
    name: 'HIIT Burn',
    category: 'HIIT',
    instructor: 'Mai Tran',
    instructorId: 'mai-tran',
    description:
      'High-intensity interval training with bodyweight and light equipment. 45 minutes of maximum effort bursts followed by short recovery. Expect to burn 500-700 calories.',
    level: 'All Levels',
    duration: 45,
    capacity: 20,
    currentEnrolled: 18,
    priceNote: 'Included with any pass',
    whatToBring: ['Water bottle', 'Towel', 'Heart rate monitor (optional)'],
    schedule: [
      { day: 'Tuesday', time: '07:30' },
      { day: 'Thursday', time: '07:30' },
      { day: 'Saturday', time: '08:00' },
    ],
    image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=600&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 72,
  },
  {
    id: 'pilates',
    slug: 'mat-pilates',
    name: 'Mat Pilates',
    category: 'Pilates',
    instructor: 'Lisa Nguyen',
    instructorId: 'lisa-nguyen',
    description:
      'Core-focused mat work combining strength, flexibility, and control. Great for posture correction and injury prevention. Uses resistance bands and small balls.',
    level: 'Beginner',
    duration: 50,
    capacity: 15,
    currentEnrolled: 10,
    priceNote: 'Included with any pass',
    whatToBring: ['Mat (provided)', 'Comfortable clothing', 'Water bottle'],
    schedule: [
      { day: 'Tuesday', time: '09:00' },
      { day: 'Thursday', time: '09:00' },
    ],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 34,
  },
  {
    id: 'swimming',
    slug: 'lap-swimming',
    name: 'Lap Swimming',
    category: 'Swimming',
    instructor: 'David Park',
    instructorId: 'david-park',
    description:
      'Coached lap swimming sessions in our 20m pool. Technique drills, endurance sets, and stroke correction. Divided lanes by speed. Open water prep available.',
    level: 'Intermediate',
    duration: 60,
    capacity: 8,
    currentEnrolled: 5,
    priceNote: 'Included with weekly pass and above',
    whatToBring: ['Swimsuit', 'Goggles', 'Swim cap', 'Towel'],
    schedule: [
      { day: 'Monday', time: '06:00' },
      { day: 'Wednesday', time: '06:00' },
      { day: 'Friday', time: '17:00' },
      { day: 'Sunday', time: '08:00' },
    ],
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 28,
  },
];

// ============================================
// EQUIPMENT & FACILITIES
// ============================================
export interface EquipmentCategory {
  name: string;
  icon: string;
  items: string[];
}

export const equipment: EquipmentCategory[] = [
  {
    name: 'Free Weights',
    icon: '🏋️',
    items: [
      'Dumbbells 2-50kg',
      'Barbells (Olympic & Standard)',
      'EZ-curl bars',
      'Kettlebells 4-32kg',
      'Weight plates (bumper & iron)',
      'Adjustable benches x6',
    ],
  },
  {
    name: 'Racks & Platforms',
    icon: '🔩',
    items: [
      'Power racks x4',
      'Squat racks x2',
      'Deadlift platforms x2',
      'Smith machine',
      'Cable crossover machine',
      'Lat pulldown / Low row',
    ],
  },
  {
    name: 'Machines',
    icon: '⚙️',
    items: [
      'Leg press',
      'Hack squat',
      'Leg curl / extension',
      'Chest press',
      'Shoulder press',
      'Pec deck / Rear delt',
      'Hip thrust machine',
      'Glute kickback',
    ],
  },
  {
    name: 'Cardio',
    icon: '🏃',
    items: [
      'Treadmills x8',
      'Ellipticals x4',
      'Stationary bikes x6',
      'Rowing machines x3',
      'Stairmaster x2',
      'Assault bike x2',
    ],
  },
  {
    name: 'Functional & Combat',
    icon: '🥊',
    items: [
      'Battle ropes',
      'TRX suspension trainers',
      'Plyo boxes',
      'Medicine balls',
      'Slam balls',
      'Heavy bags x4',
      'Speed bags x2',
      'Boxing ring (small)',
    ],
  },
  {
    name: 'Pool & Recovery',
    icon: '🏊',
    items: [
      '20m lap pool (4 lanes)',
      'Sauna (dry)',
      'Steam room',
      'Cold plunge pool',
      'Foam rollers & massage guns',
      'Stretching area',
    ],
  },
];

export interface Facility {
  name: string;
  icon: string;
  available: boolean;
}

export const facilities: Facility[] = [
  { name: 'Air Conditioning', icon: '❄️', available: true },
  { name: 'Hot Showers', icon: '🚿', available: true },
  { name: 'Cold Showers', icon: '💧', available: true },
  { name: 'Lockers', icon: '🔒', available: true },
  { name: '20m Lap Pool', icon: '🏊', available: true },
  { name: 'Dry Sauna', icon: '🧖', available: true },
  { name: 'Steam Room', icon: '♨️', available: true },
  { name: 'Cold Plunge', icon: '🧊', available: true },
  { name: 'Yoga Studio', icon: '🧘', available: true },
  { name: 'Boxing Area', icon: '🥊', available: true },
  { name: 'CrossFit Zone', icon: '🏋️', available: true },
  { name: 'Stretching Area', icon: '🤸', available: true },
  { name: 'Free WiFi', icon: '📶', available: true },
  { name: 'Parking (Motorbike)', icon: '🏍️', available: true },
  { name: 'Towel Service', icon: '🧺', available: true },
  { name: 'Water Dispenser', icon: '🚰', available: true },
  { name: 'Protein Bar', icon: '🥤', available: true },
  { name: 'Music System', icon: '🎵', available: true },
  { name: 'CCTV Security', icon: '📹', available: true },
];

// ============================================
// SHOP / MERCHANDISE
// ============================================
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'Apparel' | 'Gear' | 'Supplements';
  price: number;
  description: string;
  image: string;
  sizes?: string[];
  inStock: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 'tshirt',
    slug: 'iron-paradise-tshirt',
    name: 'Iron Paradise T-Shirt',
    category: 'Apparel',
    price: 250000,
    description:
      'Premium cotton blend t-shirt with the Iron Paradise logo. Breathable, moisture-wicking fabric perfect for training or casual wear.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true,
  },
  {
    id: 'gloves',
    slug: 'boxing-gloves-12oz',
    name: 'Boxing Gloves 12oz',
    category: 'Gear',
    price: 450000,
    description:
      'Quality synthetic leather boxing gloves with multi-layer foam padding. Suitable for bag work and pad drills. Velcro strap closure.',
    image: 'https://images.unsplash.com/photo-1509255929945-586a420363cf?w=400&h=400&fit=crop',
    sizes: ['10oz', '12oz', '14oz'],
    inStock: true,
    featured: true,
  },
  {
    id: 'wraps',
    slug: 'hand-wraps',
    name: 'Hand Wraps (Pair)',
    category: 'Gear',
    price: 80000,
    description:
      'Semi-elastic hand wraps, 4.5m length. Essential for boxing and kickboxing. Protects knuckles and wrists during striking.',
    image: 'https://images.unsplash.com/photo-1583473848882-f9a5bc9a9f1f?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'yogamat',
    slug: 'yoga-mat-6mm',
    name: 'Yoga Mat 6mm',
    category: 'Gear',
    price: 350000,
    description:
      'Non-slip TPE yoga mat, 6mm thickness. Lightweight, eco-friendly material with alignment lines. Includes carry strap.',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
    inStock: true,
    featured: true,
  },
  {
    id: 'protein',
    slug: 'protein-shake',
    name: 'Protein Shake',
    category: 'Supplements',
    price: 60000,
    description:
      'Post-workout whey protein shake, 30g protein per serving. Available in chocolate, vanilla, and banana flavors. Made fresh at our protein bar.',
    image: 'https://images.unsplash.com/photo-1622485831930-34986638bfb8?w=400&h=400&fit=crop',
    inStock: true,
    featured: true,
  },
  {
    id: 'shorts',
    slug: 'training-shorts',
    name: 'Training Shorts',
    category: 'Apparel',
    price: 200000,
    description:
      'Lightweight training shorts with zip pocket. Quick-dry material with 4-way stretch. Iron Paradise embroidered logo.',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
  },
];

// ============================================
// REVIEWS
// ============================================
export interface Review {
  id: string;
  author: string;
  nationality: string;
  flag: string;
  rating: number;
  text: string;
  date: string;
  passType: string;
}

export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'Marcus B.',
    nationality: 'USA',
    flag: '🇺🇸',
    rating: 5,
    text: "Best gym I've found in Vietnam. Equipment is top-notch, the pool is clean, and Coach Minh's boxing class is incredible. The 10-entry pack is perfect for digital nomads like me.",
    date: '2024-12-15',
    passType: '10-Entry Pack',
  },
  {
    id: 'r2',
    author: 'Yuki T.',
    nationality: 'Japan',
    flag: '🇯🇵',
    rating: 5,
    text: 'Clean facilities, modern equipment, and very friendly staff. The yoga studio is beautiful with natural light. Lisa is an amazing instructor. Highly recommend!',
    date: '2024-11-28',
    passType: 'Monthly',
  },
  {
    id: 'r3',
    author: 'Sophie L.',
    nationality: 'France',
    flag: '🇫🇷',
    rating: 4,
    text: 'Great gym with excellent variety of classes. The CrossFit WOD with Jake is challenging and fun. Only minor issue is parking can be tight during peak hours.',
    date: '2024-11-10',
    passType: 'Quarterly',
  },
  {
    id: 'r4',
    author: 'Kim S.',
    nationality: 'South Korea',
    flag: '🇰🇷',
    rating: 5,
    text: "The sauna and cold plunge are perfect after a tough workout. Pool is clean and well-maintained. David's swimming sessions helped me improve my technique significantly.",
    date: '2024-10-22',
    passType: 'Monthly',
  },
  {
    id: 'r5',
    author: 'Tom H.',
    nationality: 'Australia',
    flag: '🇦🇺',
    rating: 4,
    text: 'Solid gym with everything you need. Day pass is very reasonably priced. HIIT class with Mai is no joke - bring extra water! Would love to see more evening class options.',
    date: '2024-10-05',
    passType: 'Day Pass',
  },
];

// ============================================
// PROMOTIONS
// ============================================
export interface Promotion {
  id: string;
  title: string;
  badge: string;
  description: string;
  details: string;
  validUntil: string;
  conditions: string[];
  image: string;
}

export const promotions: Promotion[] = [
  {
    id: 'promo-first-day',
    title: 'First Day Free',
    badge: 'FREE',
    description:
      'Try Iron Paradise for free! Your first visit is on us — full gym access, one group class, and all facilities included.',
    details: 'Valid for first-time visitors only. Bring valid ID. Available Monday–Saturday.',
    validUntil: '2025-06-30',
    conditions: ['First-time visitors only', 'Valid ID required', 'Mon–Sat only', 'One per person'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=300&fit=crop',
  },
  {
    id: 'promo-10entry',
    title: '10-Entry Launch Special',
    badge: '-15%',
    description:
      'Get the 10-Entry Pack at 595,000₫ instead of 700,000₫. Limited time launch offer for our flexible pass.',
    details: 'Save 105,000₫ on the most flexible pass. No expiry, use entries at your own pace.',
    validUntil: '2025-03-31',
    conditions: ['Limited time offer', 'Cannot combine with other discounts', 'New purchases only'],
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=300&fit=crop',
  },
  {
    id: 'promo-hotel',
    title: 'Hotel Guest Discount',
    badge: '-20%',
    description:
      'Staying at a partner hotel? Get 20% off any pass. Show your room key or booking confirmation at reception.',
    details:
      'Valid for guests of partner hotels in the Son Tra and My Khe area. Applies to day, weekly, and 10-entry passes.',
    validUntil: '2025-12-31',
    conditions: [
      'Valid hotel booking required',
      'Partner hotels only',
      'Day/Week/10-Entry passes',
      'Cannot combine with convention pricing',
    ],
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=300&fit=crop',
  },
];

// ============================================
// DOCUMENTS & INSURANCE
// ============================================
export const requiredDocuments = [
  { name: 'Valid passport or Vietnamese ID', required: true },
  { name: 'Passport-size photo (2 copies)', required: true },
  { name: 'Emergency contact information', required: true },
  { name: 'Health declaration form (provided at registration)', required: true },
  { name: 'Travel insurance details (recommended for tourists)', required: false },
];

export const insuranceOptions = [
  {
    name: 'Basic Coverage',
    price: 50000,
    period: 'per month',
    covers: ['Accidental injury during gym use', 'Basic medical expenses up to 10M VND'],
  },
  {
    name: 'Premium Coverage',
    price: 120000,
    period: 'per month',
    covers: [
      'Accidental injury during gym use',
      'Medical expenses up to 50M VND',
      'Equipment damage coverage',
      'Personal belongings in locker',
    ],
  },
];

export const gymRules = [
  'Wipe down equipment after use',
  'Return weights to their racks',
  'Proper gym attire and closed-toe shoes required',
  'No food on the gym floor (protein bar area only)',
  'Towels required in sauna and steam room',
  'Maximum 30-minute sessions on cardio during peak hours',
  'No photography/video of other members without consent',
  'Children under 16 must be accompanied by an adult',
  'Report any equipment damage to staff immediately',
  'Respect the shared space and other members',
];

// ============================================
// MOCK CUSTOMER ACCOUNT
// ============================================
export const mockCustomer = {
  id: 'cust_abc123',
  name: 'Jake Thompson',
  email: 'jake.t@email.com',
  phone: '+61 412 345 678',
  nationality: 'Australian',
  flag: '🇦🇺',
  memberSince: '2024-10-01',
  currentPass: {
    type: '10-Entry Pack',
    purchaseDate: '2024-12-01',
    totalEntries: 10,
    remainingEntries: 7,
    expiresAt: null,
    status: 'active' as const,
  },
  visitHistory: [
    { date: '2025-01-15', checkInTime: '07:02', checkOutTime: '08:45', class: 'CrossFit WOD' },
    { date: '2025-01-12', checkInTime: '16:30', checkOutTime: '18:10', class: null },
    {
      date: '2025-01-08',
      checkInTime: '06:55',
      checkOutTime: '08:30',
      class: 'Boxing Fundamentals',
    },
  ],
  documents: [
    { name: 'Passport', status: 'verified' as const },
    { name: 'Photo', status: 'verified' as const },
    { name: 'Health Declaration', status: 'verified' as const },
    { name: 'Emergency Contact', status: 'verified' as const },
    { name: 'Insurance', status: 'pending' as const },
  ],
};

export function getApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3033';
}
