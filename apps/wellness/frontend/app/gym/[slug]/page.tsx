'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// =============================================================================
// TYPES
// =============================================================================

interface GymFacilities {
  airConditioning: boolean;
  hotShowers: boolean;
  lockers: boolean;
  towelService: boolean;
  freeWater: boolean;
  wifi: boolean;
  parking: boolean;
  parkingNote?: string;
  mirrorWalls: boolean;
  music: boolean;
}

interface EquipmentCategory {
  freeWeights: string;
  racks: string;
  machines: string[];
  cardio: string[];
  functional: string[];
  quality: 'Standard' | 'Premium' | 'Professional';
  qualityNote?: string;
}

interface GymClass {
  day: string;
  time: string;
  name: string;
  instructor?: string;
}

interface GymReview {
  name: string;
  flag: string;
  rating: number;
  text: string;
  date: string;
}

interface GymHours {
  day: string;
  hours: string;
  isToday?: boolean;
}

interface GymData {
  slug: string;
  name: string;
  area: string;
  distance: string;
  rating: number;
  reviewCount: number;
  image: string;
  isOpen: boolean;
  dayPass: number;
  weekPass: number;
  monthPass?: number;
  facilities: GymFacilities;
  equipment: EquipmentCategory;
  classes: GymClass[];
  hours: GymHours[];
  address: string;
  mapPlaceholder: string;
  reviews: GymReview[];
  zaloPhone: string;
}

// =============================================================================
// MOCK DATA
// =============================================================================

const todayIndex = new Date().getDay(); // 0=Sun, 1=Mon...
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const allGyms: Record<string, GymData> = {
  'iron-paradise': {
    slug: 'iron-paradise',
    name: 'Iron Paradise Gym',
    area: 'An Thuong',
    distance: '0.3 km',
    rating: 4.7,
    reviewCount: 52,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop',
    isOpen: true,
    dayPass: 100000,
    weekPass: 400000,
    monthPass: 800000,
    facilities: {
      airConditioning: true,
      hotShowers: true,
      lockers: true,
      towelService: false,
      freeWater: true,
      wifi: true,
      parking: true,
      parkingNote: 'Motorbike',
      mirrorWalls: true,
      music: true,
    },
    equipment: {
      freeWeights: 'Dumbbells 2-40kg, 3 barbells with 200kg plates, Kettlebells 4-24kg',
      racks: '2 squat racks, 1 Smith machine',
      machines: [
        'Chest press',
        'Leg press',
        'Lat pulldown',
        'Cable crossover',
        'Leg extension',
        'Leg curl',
      ],
      cardio: ['5 treadmills', '2 ellipticals', '3 stationary bikes'],
      functional: ['TRX', 'Resistance bands', 'Ab roller'],
      quality: 'Standard',
    },
    classes: [],
    hours: [
      { day: 'Monday', hours: '5:30 - 22:00' },
      { day: 'Tuesday', hours: '5:30 - 22:00' },
      { day: 'Wednesday', hours: '5:30 - 22:00' },
      { day: 'Thursday', hours: '5:30 - 22:00' },
      { day: 'Friday', hours: '5:30 - 22:00' },
      { day: 'Saturday', hours: '5:30 - 22:00' },
      { day: 'Sunday', hours: '7:00 - 20:00' },
    ],
    address: '45 An Thuong 4, Ngu Hanh Son, Da Nang',
    mapPlaceholder:
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=200&fit=crop',
    reviews: [
      {
        name: 'Jake S.',
        flag: '\u{1F1EC}\u{1F1E7}',
        rating: 5,
        text: 'Great gym with everything you need. Squat racks always available early morning. AC works well.',
        date: '3 days ago',
      },
      {
        name: 'Ana R.',
        flag: '\u{1F1E7}\u{1F1F7}',
        rating: 4,
        text: 'Good equipment, friendly staff. Wish they had towels though. Free water is nice.',
        date: '1 week ago',
      },
      {
        name: 'Marcus T.',
        flag: '\u{1F1E9}\u{1F1EA}',
        rating: 5,
        text: 'Best value gym in An Thuong. 100K for a day pass is a steal.',
        date: '2 weeks ago',
      },
    ],
    zaloPhone: '0901234567',
  },
  'zen-fitness': {
    slug: 'zen-fitness',
    name: 'Zen Fitness & Yoga',
    area: 'My Khe Beach',
    distance: '1.2 km',
    rating: 4.9,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=400&fit=crop',
    isOpen: true,
    dayPass: 120000,
    weekPass: 500000,
    monthPass: 1000000,
    facilities: {
      airConditioning: true,
      hotShowers: true,
      lockers: true,
      towelService: true,
      freeWater: true,
      wifi: true,
      parking: true,
      parkingNote: 'Car & motorbike',
      mirrorWalls: true,
      music: true,
    },
    equipment: {
      freeWeights: 'Dumbbells 2-50kg, Olympic barbells, Kettlebells 4-32kg',
      racks: '3 squat racks, 2 Smith machines, 1 power cage',
      machines: [
        'Technogym chest press',
        'Leg press',
        'Lat pulldown',
        'Cable crossover',
        'Leg extension',
        'Leg curl',
        'Shoulder press',
        'Pec fly',
        'Hip abductor/adductor',
      ],
      cardio: [
        '8 Life Fitness treadmills',
        '4 ellipticals',
        '4 stationary bikes',
        '2 rowing machines',
      ],
      functional: ['TRX', 'Resistance bands', 'Bosu balls', 'Battle ropes', 'Plyo boxes'],
      quality: 'Premium',
      qualityNote: 'Technogym, Life Fitness',
    },
    classes: [
      { day: 'Monday', time: '7:00 AM', name: 'Vinyasa Yoga', instructor: 'Thi' },
      { day: 'Tuesday', time: '6:00 PM', name: 'Power Yoga', instructor: 'Thi' },
      { day: 'Wednesday', time: '7:00 AM', name: 'Vinyasa Yoga', instructor: 'Thi' },
      { day: 'Thursday', time: '6:00 PM', name: 'Power Yoga', instructor: 'Thi' },
      { day: 'Friday', time: '7:00 AM', name: 'Vinyasa Yoga', instructor: 'Thi' },
      { day: 'Saturday', time: '9:00 AM', name: 'Aqua Fitness', instructor: 'Lan' },
    ],
    hours: [
      { day: 'Monday', hours: '5:00 - 22:00' },
      { day: 'Tuesday', hours: '5:00 - 22:00' },
      { day: 'Wednesday', hours: '5:00 - 22:00' },
      { day: 'Thursday', hours: '5:00 - 22:00' },
      { day: 'Friday', hours: '5:00 - 22:00' },
      { day: 'Saturday', hours: '6:00 - 21:00' },
      { day: 'Sunday', hours: '6:00 - 20:00' },
    ],
    address: '78 Vo Nguyen Giap, Son Tra, Da Nang',
    mapPlaceholder:
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=200&fit=crop',
    reviews: [
      {
        name: 'Sarah L.',
        flag: '\u{1F1E6}\u{1F1FA}',
        rating: 5,
        text: 'Hands down the best gym in Da Nang. Premium equipment, yoga classes are amazing, and the pool is a bonus.',
        date: '2 days ago',
      },
      {
        name: 'Tom K.',
        flag: '\u{1F1FA}\u{1F1F8}',
        rating: 5,
        text: 'Feels like a gym you would find back home. Technogym and Life Fitness equipment. Worth every dong.',
        date: '5 days ago',
      },
      {
        name: 'Yuki M.',
        flag: '\u{1F1EF}\u{1F1F5}',
        rating: 5,
        text: 'Clean, well maintained, great yoga classes. Staff speaks English well. Towel service is appreciated.',
        date: '1 week ago',
      },
    ],
    zaloPhone: '0907654321',
  },
  'dragon-crossfit': {
    slug: 'dragon-crossfit',
    name: 'Dragon CrossFit Box',
    area: 'Son Tra',
    distance: '2.5 km',
    rating: 4.8,
    reviewCount: 34,
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=400&fit=crop',
    isOpen: true,
    dayPass: 150000,
    weekPass: 600000,
    facilities: {
      airConditioning: false,
      hotShowers: true,
      lockers: true,
      towelService: false,
      freeWater: true,
      wifi: false,
      parking: true,
      parkingNote: 'Motorbike',
      mirrorWalls: false,
      music: true,
    },
    equipment: {
      freeWeights:
        'Rogue Olympic barbells, Bumper plates 5-25kg, Dumbbells 5-35kg, Kettlebells 8-32kg',
      racks: '6 squat racks (Rogue), Pull-up rigs',
      machines: [],
      cardio: ['4 Concept2 rowers', '3 Assault bikes', '2 SkiErgs'],
      functional: [
        'Rings',
        'Rope climbs',
        'Wall balls',
        'Plyo boxes',
        'Slam balls',
        'Parallettes',
        'GHD machines',
      ],
      quality: 'Professional',
      qualityNote: 'Rogue Fitness',
    },
    classes: [
      { day: 'Monday', time: '6:00 AM', name: 'WOD', instructor: 'Coach Dat' },
      { day: 'Monday', time: '7:30 AM', name: 'WOD', instructor: 'Coach Dat' },
      { day: 'Monday', time: '5:00 PM', name: 'WOD', instructor: 'Coach Hien' },
      { day: 'Monday', time: '6:30 PM', name: 'WOD', instructor: 'Coach Hien' },
      { day: 'Tuesday', time: '6:00 AM', name: 'WOD', instructor: 'Coach Dat' },
      { day: 'Tuesday', time: '7:30 AM', name: 'WOD', instructor: 'Coach Dat' },
      { day: 'Tuesday', time: '5:00 PM', name: 'WOD', instructor: 'Coach Hien' },
      { day: 'Tuesday', time: '6:30 PM', name: 'WOD', instructor: 'Coach Hien' },
      { day: 'Wednesday', time: '6:00 AM', name: 'WOD', instructor: 'Coach Dat' },
      { day: 'Wednesday', time: '7:30 AM', name: 'WOD', instructor: 'Coach Dat' },
      { day: 'Wednesday', time: '5:00 PM', name: 'WOD', instructor: 'Coach Hien' },
      { day: 'Wednesday', time: '6:30 PM', name: 'WOD', instructor: 'Coach Hien' },
      { day: 'Thursday', time: '6:00 AM', name: 'WOD', instructor: 'Coach Dat' },
      { day: 'Thursday', time: '7:30 AM', name: 'WOD', instructor: 'Coach Dat' },
      { day: 'Thursday', time: '5:00 PM', name: 'WOD', instructor: 'Coach Hien' },
      { day: 'Thursday', time: '6:30 PM', name: 'WOD', instructor: 'Coach Hien' },
      { day: 'Friday', time: '6:00 AM', name: 'WOD', instructor: 'Coach Dat' },
      { day: 'Friday', time: '7:30 AM', name: 'WOD', instructor: 'Coach Dat' },
      { day: 'Friday', time: '5:00 PM', name: 'WOD', instructor: 'Coach Hien' },
      { day: 'Friday', time: '6:30 PM', name: 'WOD', instructor: 'Coach Hien' },
      { day: 'Saturday', time: '6:00 AM', name: 'WOD', instructor: 'Coach Dat' },
      { day: 'Saturday', time: '7:30 AM', name: 'WOD', instructor: 'Coach Dat' },
      { day: 'Saturday', time: '5:00 PM', name: 'Team WOD', instructor: 'Coach Dat & Hien' },
    ],
    hours: [
      { day: 'Monday', hours: '5:30 - 20:00' },
      { day: 'Tuesday', hours: '5:30 - 20:00' },
      { day: 'Wednesday', hours: '5:30 - 20:00' },
      { day: 'Thursday', hours: '5:30 - 20:00' },
      { day: 'Friday', hours: '5:30 - 20:00' },
      { day: 'Saturday', hours: '5:30 - 18:00' },
      { day: 'Sunday', hours: 'Closed' },
    ],
    address: '12 Le Duc Tho, Son Tra, Da Nang',
    mapPlaceholder:
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=200&fit=crop',
    reviews: [
      {
        name: 'Chris B.',
        flag: '\u{1F1FA}\u{1F1F8}',
        rating: 5,
        text: 'Legit CrossFit box with Rogue equipment. Coaches are excellent and the community is welcoming.',
        date: '1 week ago',
      },
      {
        name: 'Emma W.',
        flag: '\u{1F1EC}\u{1F1E7}',
        rating: 5,
        text: 'Open air setup is actually great - the breeze keeps it cool. WODs are well programmed.',
        date: '2 weeks ago',
      },
      {
        name: 'Liam O.',
        flag: '\u{1F1EE}\u{1F1EA}',
        rating: 4,
        text: 'Great box but no AC can be rough at midday. Morning and evening classes are the way to go.',
        date: '3 weeks ago',
      },
    ],
    zaloPhone: '0912345678',
  },
  'titan-gym': {
    slug: 'titan-gym',
    name: 'Titan Gym & Boxing',
    area: 'An Thuong',
    distance: '0.5 km',
    rating: 4.8,
    reviewCount: 28,
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&h=400&fit=crop',
    isOpen: true,
    dayPass: 90000,
    weekPass: 380000,
    monthPass: 700000,
    facilities: {
      airConditioning: true,
      hotShowers: true,
      lockers: true,
      towelService: false,
      freeWater: true,
      wifi: true,
      parking: true,
      parkingNote: 'Motorbike',
      mirrorWalls: true,
      music: true,
    },
    equipment: {
      freeWeights: 'Dumbbells 2-40kg, 2 barbells with 150kg plates, Kettlebells 4-24kg',
      racks: '2 squat racks, 1 bench press station',
      machines: ['Chest press', 'Leg press', 'Lat pulldown', 'Cable machine', 'Leg extension'],
      cardio: ['3 treadmills', '2 stationary bikes', '1 elliptical'],
      functional: [
        'Heavy bags (4)',
        'Speed bags (2)',
        'Boxing ring',
        'Jump ropes',
        'Medicine balls',
        'TRX',
      ],
      quality: 'Standard',
    },
    classes: [
      { day: 'Tuesday', time: '7:00 AM', name: 'Boxing Fundamentals', instructor: 'Coach Vinh' },
      { day: 'Tuesday', time: '5:00 PM', name: 'Boxing Sparring', instructor: 'Coach Vinh' },
      { day: 'Thursday', time: '7:00 AM', name: 'Boxing Fundamentals', instructor: 'Coach Vinh' },
      { day: 'Thursday', time: '5:00 PM', name: 'Boxing Sparring', instructor: 'Coach Vinh' },
      { day: 'Saturday', time: '7:00 AM', name: 'Boxing Cardio', instructor: 'Coach Vinh' },
      { day: 'Saturday', time: '5:00 PM', name: 'Open Sparring', instructor: 'Coach Vinh' },
    ],
    hours: [
      { day: 'Monday', hours: '6:00 - 22:00' },
      { day: 'Tuesday', hours: '6:00 - 22:00' },
      { day: 'Wednesday', hours: '6:00 - 22:00' },
      { day: 'Thursday', hours: '6:00 - 22:00' },
      { day: 'Friday', hours: '6:00 - 22:00' },
      { day: 'Saturday', hours: '6:00 - 21:00' },
      { day: 'Sunday', hours: '7:00 - 20:00' },
    ],
    address: '23 An Thuong 31, Ngu Hanh Son, Da Nang',
    mapPlaceholder:
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=200&fit=crop',
    reviews: [
      {
        name: 'Daniel P.',
        flag: '\u{1F1FA}\u{1F1F8}',
        rating: 5,
        text: 'Amazing boxing gym! Coach Vinh is the real deal. Full weight room too so you get both.',
        date: '4 days ago',
      },
      {
        name: 'Lisa H.',
        flag: '\u{1F1E8}\u{1F1E6}',
        rating: 5,
        text: 'Best price in An Thuong and great boxing classes. 90K day pass is incredible value.',
        date: '1 week ago',
      },
      {
        name: 'Nhat T.',
        flag: '\u{1F1FB}\u{1F1F3}',
        rating: 4,
        text: 'Solid gym with good boxing setup. Equipment is not fancy but everything works well.',
        date: '2 weeks ago',
      },
    ],
    zaloPhone: '0923456789',
  },
};

// =============================================================================
// UTILS
// =============================================================================

function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN').format(price) + '\u20AB';
}

function getUpcomingClasses(classes: GymClass[]): GymClass[] {
  const todayName = dayNames[todayIndex];
  const orderedDays = [...dayNames.slice(todayIndex), ...dayNames.slice(0, todayIndex)];
  const upcoming: GymClass[] = [];

  for (const day of orderedDays) {
    const dayClasses = classes.filter((c) => c.day === day);
    upcoming.push(...dayClasses);
    if (upcoming.length >= 6) break;
  }

  return upcoming.slice(0, 6);
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? '#c9a962' : 'none'}
          stroke={star <= Math.round(rating) ? '#c9a962' : '#9b9590'}
          strokeWidth="1.5"
        >
          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ))}
    </span>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function GymDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [selectedPass, setSelectedPass] = useState<'day' | 'week' | 'month'>('day');

  const gym = allGyms[slug];

  // ---- NOT FOUND STATE ----
  if (!gym) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--cream)]">
        <div className="mb-4 text-5xl">{'\u{1F3CB}'}</div>
        <h1 className="font-display mb-2 text-2xl font-semibold text-[var(--charcoal)]">
          Gym Not Found
        </h1>
        <p className="mb-6 text-sm text-[var(--charcoal-muted)]">
          This gym may no longer be listed.
        </p>
        <Link
          href="/gym"
          className="rounded-xl bg-[#E06040] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#c85535] active:scale-[0.98]"
        >
          Browse Gyms
        </Link>
      </div>
    );
  }

  // Mark today in hours
  const hoursWithToday = gym.hours.map((h) => ({
    ...h,
    isToday: h.day === dayNames[todayIndex],
  }));

  const upcomingClasses = getUpcomingClasses(gym.classes);

  const similarGyms = Object.values(allGyms)
    .filter((g) => g.slug !== slug)
    .slice(0, 3);

  const facilityItems: { emoji: string; label: string; available: boolean; note?: string }[] = [
    { emoji: '\u2744\uFE0F', label: 'Air Conditioning', available: gym.facilities.airConditioning },
    { emoji: '\u{1F6BF}', label: 'Hot Showers', available: gym.facilities.hotShowers },
    { emoji: '\u{1F510}', label: 'Lockers', available: gym.facilities.lockers },
    { emoji: '\u{1F9F4}', label: 'Towel Service', available: gym.facilities.towelService },
    { emoji: '\u{1F4A7}', label: 'Free Water', available: gym.facilities.freeWater },
    { emoji: '\u{1F4F6}', label: 'WiFi', available: gym.facilities.wifi },
    {
      emoji: '\u{1F17F}\uFE0F',
      label: 'Parking',
      available: gym.facilities.parking,
      note: gym.facilities.parkingNote,
    },
    { emoji: '\u{1FA9E}', label: 'Mirror Walls', available: gym.facilities.mirrorWalls },
    { emoji: '\u{1F3B5}', label: 'Music / Sound', available: gym.facilities.music },
  ];

  const passOptions = [
    { key: 'day' as const, label: 'Day Pass', subtitle: 'Full day access', price: gym.dayPass },
    { key: 'week' as const, label: 'Week Pass', subtitle: '7 days unlimited', price: gym.weekPass },
    {
      key: 'month' as const,
      label: 'Month Pass',
      subtitle: '30 days unlimited',
      price: gym.monthPass,
    },
  ].filter(
    (p): p is { key: 'day' | 'week' | 'month'; label: string; subtitle: string; price: number } =>
      p.price !== undefined
  );

  const selectedPrice =
    selectedPass === 'day'
      ? gym.dayPass
      : selectedPass === 'week'
        ? gym.weekPass
        : (gym.monthPass ?? gym.dayPass);

  const zaloMessage = encodeURIComponent(
    `Hi! I'm interested in a ${selectedPass} pass at ${gym.name}. Is it available?`
  );

  return (
    <div className="min-h-screen bg-[var(--cream)] pb-32">
      {/* ================================================================= */}
      {/* 1. HERO IMAGE                                                     */}
      {/* ================================================================= */}
      <div className="relative h-72 overflow-hidden">
        <img src={gym.image} alt={gym.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--cream)] via-transparent to-black/30" />

        {/* Back Button */}
        <Link
          href="/gym"
          className="glass absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition-colors hover:bg-white"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[var(--charcoal)]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>

        {/* Share Button */}
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: gym.name, url: window.location.href });
            }
          }}
          className="glass absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition-colors hover:bg-white"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-[var(--charcoal)]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
        </button>
      </div>

      {/* ================================================================= */}
      {/* CONTENT                                                            */}
      {/* ================================================================= */}
      <main className="-mt-6 px-4">
        {/* ================================================================= */}
        {/* 2. GYM HEADER                                                     */}
        {/* ================================================================= */}
        <section className="animate-fade-in-up">
          <h1 className="font-display text-[28px] font-semibold leading-tight text-[var(--charcoal)]">
            {gym.name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            {/* Area badge */}
            <span className="rounded-full bg-[var(--sage-light)] px-2.5 py-0.5 text-xs font-medium text-[var(--sage-dark)]">
              {gym.area}
            </span>
            {/* Distance */}
            <span className="text-xs text-[var(--charcoal-muted)]">{gym.distance}</span>
            {/* Divider */}
            <span className="text-xs text-[var(--charcoal-muted)]">&middot;</span>
            {/* Rating */}
            <div className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#c9a962">
                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <span className="text-xs font-semibold text-[var(--charcoal)]">{gym.rating}</span>
              <span className="text-xs text-[var(--charcoal-muted)]">({gym.reviewCount})</span>
            </div>
            {/* Divider */}
            <span className="text-xs text-[var(--charcoal-muted)]">&middot;</span>
            {/* Open/Closed badge */}
            {gym.isOpen ? (
              <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Open Now
              </span>
            ) : (
              <span className="flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-600">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                Closed
              </span>
            )}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 3. PASS PRICING CARDS                                             */}
        {/* ================================================================= */}
        <section className="animate-fade-in-up mt-6 delay-100">
          <h2 className="font-display mb-3 text-lg font-semibold text-[var(--charcoal)]">
            Gym Passes
          </h2>
          <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
            {passOptions.map((pass) => {
              const isActive = selectedPass === pass.key;
              return (
                <button
                  key={pass.key}
                  onClick={() => setSelectedPass(pass.key)}
                  className={`flex w-36 shrink-0 flex-col rounded-xl border-2 p-4 text-left transition-all ${
                    isActive
                      ? 'shadow-soft border-[#E06040] bg-[#E06040]/5'
                      : 'hover:border-[var(--charcoal-muted)]/30 border-[var(--cream-dark)] bg-white'
                  }`}
                >
                  <span
                    className={`text-xs font-semibold uppercase tracking-wide ${isActive ? 'text-[#E06040]' : 'text-[var(--charcoal-muted)]'}`}
                  >
                    {pass.label}
                  </span>
                  <span
                    className={`font-display mt-1 text-xl font-bold ${isActive ? 'text-[#E06040]' : 'text-[var(--charcoal)]'}`}
                  >
                    {formatPrice(pass.price)}
                  </span>
                  <span className="mt-1 text-[11px] text-[var(--charcoal-muted)]">
                    {pass.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 4. FACILITY CHECKLIST                                             */}
        {/* ================================================================= */}
        <section className="animate-fade-in-up mt-8 delay-150">
          <h2 className="font-display mb-3 text-lg font-semibold text-[var(--charcoal)]">
            Facilities
          </h2>
          <div className="shadow-soft rounded-xl bg-white p-4">
            <div className="grid grid-cols-2 gap-3">
              {facilityItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2.5">
                  <span className="text-base">{item.emoji}</span>
                  <div className="flex-1">
                    <span
                      className={`text-sm ${item.available ? 'text-[var(--charcoal)]' : 'text-[var(--charcoal-muted)] line-through'}`}
                    >
                      {item.label}
                    </span>
                    {item.note && item.available && (
                      <span className="ml-1 text-[10px] text-[var(--charcoal-muted)]">
                        ({item.note})
                      </span>
                    )}
                  </div>
                  {item.available ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#8BA888"
                      strokeWidth="2.5"
                      className="shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9b9590"
                      strokeWidth="2"
                      className="shrink-0"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 5. EQUIPMENT SECTION                                              */}
        {/* ================================================================= */}
        <section className="animate-fade-in-up mt-8 delay-200">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-[var(--charcoal)]">Equipment</h2>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                gym.equipment.quality === 'Premium'
                  ? 'bg-[var(--gold-light)] text-[var(--gold)]'
                  : gym.equipment.quality === 'Professional'
                    ? 'bg-[#E06040]/10 text-[#E06040]'
                    : 'bg-[var(--cream-dark)] text-[var(--charcoal-muted)]'
              }`}
            >
              {gym.equipment.quality}
              {gym.equipment.qualityNote && ` \u2022 ${gym.equipment.qualityNote}`}
            </span>
          </div>
          <div className="space-y-3">
            {/* Free Weights */}
            <div className="shadow-soft rounded-xl bg-white p-4">
              <h3 className="mb-1 text-xs font-bold uppercase tracking-wide text-[#E06040]">
                Free Weights
              </h3>
              <p className="text-sm text-[var(--charcoal-light)]">{gym.equipment.freeWeights}</p>
            </div>

            {/* Racks */}
            <div className="shadow-soft rounded-xl bg-white p-4">
              <h3 className="mb-1 text-xs font-bold uppercase tracking-wide text-[#E06040]">
                Racks
              </h3>
              <p className="text-sm text-[var(--charcoal-light)]">{gym.equipment.racks}</p>
            </div>

            {/* Machines */}
            {gym.equipment.machines.length > 0 && (
              <div className="shadow-soft rounded-xl bg-white p-4">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-[#E06040]">
                  Machines
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {gym.equipment.machines.map((m) => (
                    <span
                      key={m}
                      className="rounded-full bg-[var(--cream)] px-2.5 py-1 text-xs text-[var(--charcoal)]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Cardio */}
            {gym.equipment.cardio.length > 0 && (
              <div className="shadow-soft rounded-xl bg-white p-4">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-[#E06040]">
                  Cardio
                </h3>
                <ul className="space-y-1">
                  {gym.equipment.cardio.map((c) => (
                    <li
                      key={c}
                      className="flex items-center gap-2 text-sm text-[var(--charcoal-light)]"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#E06040]" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Functional */}
            {gym.equipment.functional.length > 0 && (
              <div className="shadow-soft rounded-xl bg-white p-4">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-[#E06040]">
                  Functional
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {gym.equipment.functional.map((f) => (
                    <span
                      key={f}
                      className="rounded-full bg-[var(--cream)] px-2.5 py-1 text-xs text-[var(--charcoal)]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 6. CLASS SCHEDULE                                                  */}
        {/* ================================================================= */}
        {gym.classes.length > 0 && (
          <section className="animate-fade-in-up mt-8 delay-300">
            <h2 className="font-display mb-3 text-lg font-semibold text-[var(--charcoal)]">
              Upcoming Classes
            </h2>
            <div className="shadow-soft overflow-hidden rounded-xl bg-white">
              {upcomingClasses.map((cls, i) => {
                const isToday = cls.day === dayNames[todayIndex];
                return (
                  <div
                    key={`${cls.day}-${cls.time}-${i}`}
                    className={`flex items-center gap-3 border-b border-[var(--cream-dark)] px-4 py-3 last:border-0 ${isToday ? 'bg-[#E06040]/5' : ''}`}
                  >
                    <div className="w-20 shrink-0">
                      <p
                        className={`text-xs font-semibold ${isToday ? 'text-[#E06040]' : 'text-[var(--charcoal-muted)]'}`}
                      >
                        {isToday ? 'Today' : cls.day.slice(0, 3)}
                      </p>
                      <p className="text-sm font-bold text-[var(--charcoal)]">{cls.time}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[var(--charcoal)]">{cls.name}</p>
                      {cls.instructor && (
                        <p className="text-xs text-[var(--charcoal-muted)]">{cls.instructor}</p>
                      )}
                    </div>
                    <div className="h-2 w-2 shrink-0 rounded-full bg-[#E06040]" />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* 7. OPENING HOURS                                                   */}
        {/* ================================================================= */}
        <section className="animate-fade-in-up delay-400 mt-8">
          <h2 className="font-display mb-3 text-lg font-semibold text-[var(--charcoal)]">
            Opening Hours
          </h2>
          <div className="shadow-soft overflow-hidden rounded-xl bg-white">
            {hoursWithToday.map((h) => (
              <div
                key={h.day}
                className={`flex items-center justify-between border-b border-[var(--cream-dark)] px-4 py-2.5 last:border-0 ${
                  h.isToday ? 'bg-[var(--sage-light)]/50' : ''
                }`}
              >
                <span
                  className={`text-sm ${h.isToday ? 'font-bold text-[var(--sage-dark)]' : 'text-[var(--charcoal)]'}`}
                >
                  {h.day}
                  {h.isToday && (
                    <span className="ml-2 rounded-full bg-[var(--sage-hex)] px-1.5 py-0.5 text-[10px] font-bold text-white">
                      TODAY
                    </span>
                  )}
                </span>
                <span
                  className={`text-sm ${h.hours === 'Closed' ? 'text-red-500' : h.isToday ? 'font-semibold text-[var(--sage-dark)]' : 'text-[var(--charcoal-light)]'}`}
                >
                  {h.hours}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 8. LOCATION                                                        */}
        {/* ================================================================= */}
        <section className="animate-fade-in-up mt-8 delay-500">
          <h2 className="font-display mb-3 text-lg font-semibold text-[var(--charcoal)]">
            Location
          </h2>
          <div className="shadow-soft overflow-hidden rounded-xl bg-white">
            {/* Map placeholder */}
            <div className="relative h-40 overflow-hidden bg-[var(--cream-dark)]">
              <img
                src={gym.mapPlaceholder}
                alt="Map"
                className="h-full w-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[var(--charcoal)] shadow-sm backdrop-blur-sm">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="#E06040"
                    className="-mt-0.5 mr-1 inline-block"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  View on Map
                </div>
              </div>
            </div>
            {/* Address + Directions */}
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-[var(--charcoal)]">{gym.address}</p>
                <p className="mt-0.5 text-xs text-[var(--charcoal-muted)]">{gym.area}, Da Nang</p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gym.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-lg bg-[var(--sage-light)] px-3 py-2 text-xs font-semibold text-[var(--sage-dark)] transition-colors hover:bg-[var(--sage-hex)] hover:text-white"
              >
                Get Directions
              </a>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 9. REVIEWS                                                         */}
        {/* ================================================================= */}
        <section className="animate-fade-in-up delay-600 mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-[var(--charcoal)]">Reviews</h2>
            <button className="text-xs font-semibold text-[#E06040]">See All Reviews</button>
          </div>
          <div className="space-y-3">
            {gym.reviews.map((review, i) => (
              <div key={i} className="shadow-soft rounded-xl bg-white p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{review.flag}</span>
                    <span className="text-sm font-semibold text-[var(--charcoal)]">
                      {review.name}
                    </span>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="mb-2 text-sm leading-relaxed text-[var(--charcoal-light)]">
                  {review.text}
                </p>
                <p className="text-[11px] text-[var(--charcoal-muted)]">{review.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 10. SIMILAR GYMS                                                   */}
        {/* ================================================================= */}
        <section className="mt-8">
          <h2 className="font-display mb-3 text-lg font-semibold text-[var(--charcoal)]">
            Similar Gyms
          </h2>
          <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
            {similarGyms.map((g) => (
              <Link
                key={g.slug}
                href={`/gym/${g.slug}`}
                className="shadow-soft hover-lift group w-52 shrink-0 overflow-hidden rounded-xl bg-white"
              >
                <div className="relative h-28 overflow-hidden">
                  <img
                    src={g.image}
                    alt={g.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold backdrop-blur-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#c9a962">
                      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    {g.rating}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-display line-clamp-1 text-sm font-semibold text-[var(--charcoal)]">
                    {g.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-[var(--charcoal-muted)]">{g.area}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-[var(--charcoal-muted)]">Day pass</span>
                    <span className="text-xs font-bold text-[#E06040]">
                      {formatPrice(g.dayPass)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* ================================================================= */}
      {/* 11. STICKY BUY BAR                                                 */}
      {/* ================================================================= */}
      <div className="pb-safe fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--cream-dark)] bg-white/95 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          {/* Price info */}
          <div className="shrink-0">
            <p className="text-[10px] uppercase tracking-wide text-[var(--charcoal-muted)]">
              {selectedPass} pass
            </p>
            <p className="font-display text-lg font-bold text-[var(--charcoal)]">
              {formatPrice(selectedPrice)}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-1 gap-2">
            <a
              href={`https://zalo.me/${gym.zaloPhone}?text=${zaloMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-xl border-2 border-[#E06040] px-3 py-3 text-xs font-bold text-[#E06040] transition-all hover:bg-[#E06040]/5 active:scale-[0.98]"
            >
              Zalo
            </a>
            <button className="flex-1 rounded-xl bg-[#E06040] py-3 text-center text-sm font-bold text-white shadow-lg transition-all hover:bg-[#c85535] active:scale-[0.98]">
              Buy {selectedPass === 'day' ? 'Day' : selectedPass === 'week' ? 'Week' : 'Month'} Pass
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
