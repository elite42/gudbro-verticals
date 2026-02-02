'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

/* =============================================================================
   HELPERS
   ============================================================================= */

function formatPrice(vnd: number): string {
  return new Intl.NumberFormat('vi-VN').format(vnd) + '\u20AB';
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={star <= Math.round(rating) ? 'var(--amber)' : '#E5E7EB'}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

/* =============================================================================
   TYPES
   ============================================================================= */

interface Workshop {
  slug: string;
  name: string;
  operator: string;
  operatorSlug: string;
  operatorTagline: string;
  operatorYears: number;
  operatorWorkshops: number;
  operatorRating: number;
  type: string;
  typeEmoji: string;
  area: string;
  areaSlug: string;
  price: number;
  duration: string;
  maxGroup: number;
  skill: string;
  languages: string[];
  rating: number;
  reviewCount: number;
  description: string;
  whatYouCreate: string;
  included: string[];
  bring: string[];
  images: string[];
  address: string;
  geo: { lat: number; lng: number };
  reviews: { name: string; flag: string; rating: number; text: string; date: string }[];
}

/* =============================================================================
   MOCK DATA
   ============================================================================= */

const LANGUAGE_MAP: Record<string, { label: string; flag: string }> = {
  EN: { label: 'English', flag: '\uD83C\uDDEC\uD83C\uDDE7' },
  VI: { label: 'Vietnamese', flag: '\uD83C\uDDFB\uD83C\uDDF3' },
  KO: { label: 'Korean', flag: '\uD83C\uDDF0\uD83C\uDDF7' },
  ZH: { label: 'Chinese', flag: '\uD83C\uDDE8\uD83C\uDDF3' },
  JA: { label: 'Japanese', flag: '\uD83C\uDDEF\uD83C\uDDF5' },
};

const WORKSHOPS: Workshop[] = [
  {
    slug: 'traditional-pho-making',
    name: 'Traditional Pho Making',
    operator: 'Chef Minh',
    operatorSlug: 'chef-minh',
    operatorTagline: 'Pho master & culinary storyteller',
    operatorYears: 15,
    operatorWorkshops: 420,
    operatorRating: 4.9,
    type: 'Cooking',
    typeEmoji: '\uD83D\uDC68\u200D\uD83C\uDF73',
    area: 'Hoi An',
    areaSlug: 'hoi-an',
    price: 350000,
    duration: '2.5 hours',
    maxGroup: 8,
    skill: 'Beginner',
    languages: ['EN', 'VI'],
    rating: 4.9,
    reviewCount: 67,
    description: 'Learn to make authentic Vietnamese pho from scratch \u2014 from bone broth to rice noodles. Visit the local market, select fresh herbs, and cook alongside Chef Minh in his family kitchen.',
    whatYouCreate: 'Recipe booklet & the knowledge to make pho at home forever.',
    included: ['Market visit & ingredient tour', 'All ingredients & cooking tools', 'Recipe booklet', 'Bowl of pho you made', 'Vietnamese coffee', 'Professional instruction'],
    bring: ['Comfortable clothes', 'Camera', 'Appetite!'],
    images: [
      'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1503764654157-72d979d9af2f?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&h=450&fit=crop',
    ],
    address: '42 Nguyen Thai Hoc, Hoi An Old Town',
    geo: { lat: 15.8801, lng: 108.338 },
    reviews: [
      { name: 'Sarah M.', flag: '\uD83C\uDDFA\uD83C\uDDF8', rating: 5, text: 'Incredible experience! Chef Minh is so passionate and the market tour was the highlight of our trip.', date: 'Dec 2025' },
      { name: 'Yuki T.', flag: '\uD83C\uDDEF\uD83C\uDDF5', rating: 5, text: 'Best cooking class in Vietnam. The pho was delicious and I learned so much about Vietnamese food culture.', date: 'Nov 2025' },
      { name: 'James K.', flag: '\uD83C\uDDE6\uD83C\uDDFA', rating: 5, text: 'Chef Minh made it so easy and fun. Even I managed to make a great bowl of pho!', date: 'Nov 2025' },
    ],
  },
  {
    slug: 'lantern-making',
    name: 'Hoi An Lantern Making',
    operator: 'Artisan Lan',
    operatorSlug: 'artisan-lan',
    operatorTagline: '3rd-generation lantern artisan',
    operatorYears: 22,
    operatorWorkshops: 680,
    operatorRating: 4.8,
    type: 'Crafts',
    typeEmoji: '\uD83C\uDFEE',
    area: 'Hoi An Old Town',
    areaSlug: 'hoi-an-old-town',
    price: 250000,
    duration: '2 hours',
    maxGroup: 10,
    skill: 'Beginner',
    languages: ['EN', 'VI', 'KO'],
    rating: 4.8,
    reviewCount: 124,
    description: 'Create your own traditional Hoi An silk lantern in the heart of the Old Town. Learn the bamboo frame technique passed down through 3 generations of Lan\'s family.',
    whatYouCreate: 'Your very own handmade silk lantern to take home.',
    included: ['All materials (bamboo, silk, wire)', 'Tools & workspace', 'Professional instructor', 'Finished lantern to take home', 'Tea & Vietnamese snacks', 'Certificate of completion'],
    bring: ['Comfortable clothes', 'Camera', 'Enthusiasm!'],
    images: [
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&h=450&fit=crop',
    ],
    address: '15 Nguyen Thi Minh Khai, Hoi An Old Town',
    geo: { lat: 15.8794, lng: 108.3380 },
    reviews: [
      { name: 'Min-ji P.', flag: '\uD83C\uDDF0\uD83C\uDDF7', rating: 5, text: 'Such a beautiful experience. Lan is so patient and kind. My lantern turned out amazing!', date: 'Jan 2026' },
      { name: 'Emma L.', flag: '\uD83C\uDDEC\uD83C\uDDE7', rating: 5, text: 'We loved every minute. The lantern I made is now hanging in my living room.', date: 'Dec 2025' },
      { name: 'Tom R.', flag: '\uD83C\uDDE8\uD83C\uDDE6', rating: 4, text: 'Great workshop. A bit crowded but Lan and her assistants managed well.', date: 'Dec 2025' },
    ],
  },
  {
    slug: 'thanh-ha-pottery',
    name: 'Thanh Ha Pottery Workshop',
    operator: 'Master Toan',
    operatorSlug: 'master-toan',
    operatorTagline: 'Master Potter since 1998',
    operatorYears: 27,
    operatorWorkshops: 510,
    operatorRating: 4.7,
    type: 'Crafts',
    typeEmoji: '\uD83C\uDFEE',
    area: 'Thanh Ha Village',
    areaSlug: 'thanh-ha',
    price: 400000,
    duration: '3 hours',
    maxGroup: 6,
    skill: 'Beginner',
    languages: ['EN', 'VI'],
    rating: 4.7,
    reviewCount: 52,
    description: 'Shape clay on a traditional kick-wheel in Vietnam\'s oldest pottery village. Master Toan\'s family has been potting for 500 years. You\'ll learn wedging, centering, and throwing your own piece.',
    whatYouCreate: 'A hand-thrown pottery piece fired and shipped to your address.',
    included: ['All clay & materials', 'Pottery wheel access', 'Professional instruction', 'Firing & glazing of your piece', 'Shipping worldwide (included)', 'Refreshments'],
    bring: ['Clothes you don\'t mind getting muddy', 'Camera', 'Patience & curiosity'],
    images: [
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=450&fit=crop',
    ],
    address: 'Thanh Ha Pottery Village, Hoi An',
    geo: { lat: 15.8726, lng: 108.3156 },
    reviews: [
      { name: 'Alex D.', flag: '\uD83C\uDDE9\uD83C\uDDEA', rating: 5, text: 'An unforgettable experience. Master Toan is a true artist and a wonderful teacher.', date: 'Jan 2026' },
      { name: 'Lisa W.', flag: '\uD83C\uDDFA\uD83C\uDDF8', rating: 5, text: 'So cool to use a kick wheel! My pot actually turned out pretty decent.', date: 'Dec 2025' },
      { name: 'Pierre F.', flag: '\uD83C\uDDEB\uD83C\uDDF7', rating: 4, text: 'Beautiful village, great experience. The shipping took 3 weeks but my vase arrived perfectly.', date: 'Nov 2025' },
    ],
  },
  {
    slug: 'vietnamese-coffee',
    name: 'Vietnamese Coffee Masterclass',
    operator: 'Barista Hung',
    operatorSlug: 'barista-hung',
    operatorTagline: 'Award-winning barista & roaster',
    operatorYears: 10,
    operatorWorkshops: 320,
    operatorRating: 4.9,
    type: 'Coffee',
    typeEmoji: '\u2615',
    area: 'Da Nang',
    areaSlug: 'da-nang',
    price: 200000,
    duration: '1.5 hours',
    maxGroup: 8,
    skill: 'Beginner',
    languages: ['EN', 'VI'],
    rating: 4.9,
    reviewCount: 89,
    description: 'Discover why Vietnamese coffee is unique. Learn to brew traditional phin coffee, make egg coffee, and taste rare weasel coffee. Visit Hung\'s roastery and understand the bean-to-cup journey.',
    whatYouCreate: 'Your own phin filter set & coffee blend to take home.',
    included: ['Phin filter set to take home', 'Coffee tasting (5 varieties)', 'Roastery tour', 'Professional instruction', 'All brewing equipment', 'Light snacks'],
    bring: ['Comfortable clothes', 'Camera', 'Love of coffee!'],
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=450&fit=crop',
    ],
    address: '88 Tran Phu, Hai Chau, Da Nang',
    geo: { lat: 16.0471, lng: 108.2068 },
    reviews: [
      { name: 'Mark S.', flag: '\uD83C\uDDFA\uD83C\uDDF8', rating: 5, text: 'Hung is amazing. I never knew coffee could taste so different. The egg coffee blew my mind!', date: 'Jan 2026' },
      { name: 'Sakura N.', flag: '\uD83C\uDDEF\uD83C\uDDF5', rating: 5, text: 'Perfect activity for coffee lovers. I use my phin filter every morning now.', date: 'Dec 2025' },
      { name: 'Ben T.', flag: '\uD83C\uDDE6\uD83C\uDDFA', rating: 5, text: 'Great value for money. Hung really knows his stuff and the roastery tour was a bonus.', date: 'Nov 2025' },
    ],
  },
  {
    slug: 'watercolor-hoi-an',
    name: 'Watercolor in Hoi An',
    operator: 'Artist Mai',
    operatorSlug: 'artist-mai',
    operatorTagline: 'Fine art graduate & plein air painter',
    operatorYears: 12,
    operatorWorkshops: 240,
    operatorRating: 4.8,
    type: 'Art',
    typeEmoji: '\uD83C\uDFA8',
    area: 'Hoi An Old Town',
    areaSlug: 'hoi-an-old-town',
    price: 500000,
    duration: '3 hours',
    maxGroup: 6,
    skill: 'Intermediate',
    languages: ['EN'],
    rating: 4.8,
    reviewCount: 38,
    description: 'Paint the golden streets of Hoi An in watercolor with Artist Mai. Set up your easel by the Thu Bon river and learn wet-on-wet, dry brush, and color mixing techniques while capturing the magic of this UNESCO town.',
    whatYouCreate: 'Your finished watercolor painting, professionally mounted.',
    included: ['Professional watercolor set', 'Paper & easel', 'Professional instruction', 'Mounted painting to take home', 'Iced tea & snacks', 'Certificate of completion'],
    bring: ['Comfortable clothes (may get paint on them)', 'Sun hat', 'Water bottle'],
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&h=450&fit=crop',
    ],
    address: 'Meeting point: An Hoi Bridge, Hoi An',
    geo: { lat: 15.8753, lng: 108.3286 },
    reviews: [
      { name: 'Claire B.', flag: '\uD83C\uDDEB\uD83C\uDDF7', rating: 5, text: 'Mai is an incredible teacher. I had no idea I could paint like that. The setting was magical.', date: 'Jan 2026' },
      { name: 'David H.', flag: '\uD83C\uDDEC\uD83C\uDDE7', rating: 5, text: 'Best activity in Hoi An. My painting is now framed on my wall back home.', date: 'Dec 2025' },
      { name: 'Soo-yeon K.', flag: '\uD83C\uDDF0\uD83C\uDDF7', rating: 4, text: 'Beautiful experience but intermediate level is accurate \u2014 some painting experience helps.', date: 'Nov 2025' },
    ],
  },
  {
    slug: 'food-tour-hoi-an',
    name: 'Hoi An Street Food Tour',
    operator: 'Guide Thao',
    operatorSlug: 'guide-thao',
    operatorTagline: 'Certified food guide & local foodie',
    operatorYears: 8,
    operatorWorkshops: 560,
    operatorRating: 5.0,
    type: 'Food Tour',
    typeEmoji: '\uD83C\uDF5C',
    area: 'Hoi An',
    areaSlug: 'hoi-an',
    price: 600000,
    duration: '4 hours',
    maxGroup: 10,
    skill: 'Beginner',
    languages: ['EN', 'VI', 'KO', 'ZH'],
    rating: 5.0,
    reviewCount: 76,
    description: 'Eat your way through Hoi An with Guide Thao. Visit 7 iconic food spots locals love \u2014 from cao lau and white rose dumplings to banh mi and che desserts. Includes history, culture, and plenty of food.',
    whatYouCreate: 'Memories, a full belly, and a Hoi An food map.',
    included: ['All food tastings (7 stops)', 'Drinks at each stop', 'Local food guide', 'Hoi An food map', 'Motorbike transfer between stops', 'Vegetarian options available'],
    bring: ['Comfortable walking shoes', 'Empty stomach!', 'Camera'],
    images: [
      'https://images.unsplash.com/photo-1583077874340-47e13b4c5bcd?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=450&fit=crop',
    ],
    address: 'Meeting point: Hoi An Central Market',
    geo: { lat: 15.8773, lng: 108.3380 },
    reviews: [
      { name: 'Anna P.', flag: '\uD83C\uDDE9\uD83C\uDDEA', rating: 5, text: 'Thao is the best! We ate SO much and everything was delicious. Must-do in Hoi An.', date: 'Jan 2026' },
      { name: 'Kevin L.', flag: '\uD83C\uDDFA\uD83C\uDDF8', rating: 5, text: 'This tour was the highlight of our Vietnam trip. Thao knows every food stall by name.', date: 'Dec 2025' },
      { name: 'Ji-hye C.', flag: '\uD83C\uDDF0\uD83C\uDDF7', rating: 5, text: 'Perfect tour! Thao speaks Korean which made it even better. The cao lau was incredible.', date: 'Dec 2025' },
    ],
  },
];

/* =============================================================================
   AVAILABILITY DATA (next 7 days)
   ============================================================================= */

function getNext7Days() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      full: d.toISOString().split('T')[0],
      isToday: i === 0,
      slots: i === 2 || i === 5
        ? [{ time: '9:00 AM', status: 'full' as const }]
        : i === 6
          ? []
          : [
              { time: '9:00 AM', status: 'available' as const },
              ...(i % 2 === 0 ? [{ time: '2:00 PM', status: 'available' as const }] : []),
            ],
    });
  }
  return days;
}

/* =============================================================================
   WORKSHOP DETAIL PAGE
   ============================================================================= */

export default function WorkshopDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [mounted, setMounted] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const workshop = WORKSHOPS.find((w) => w.slug === slug);
  const availableDays = getNext7Days();

  // Set default selected day
  useEffect(() => {
    if (availableDays.length > 0 && !selectedDay) {
      const firstAvailable = availableDays.find((d) => d.slots.some((s) => s.status === 'available'));
      if (firstAvailable) setSelectedDay(firstAvailable.full);
    }
  }, []);

  /* ---- Not Found ---- */
  if (!workshop) {
    return (
      <div className="min-h-screen pb-24 flex items-center justify-center" style={{ background: 'var(--ivory)' }}>
        <div className="text-center px-6">
          <p className="text-6xl mb-4">{'\uD83C\uDFA8'}</p>
          <h2
            className="text-xl font-bold mb-2"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)' }}
          >
            Workshop Not Found
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--charcoal-muted)' }}>
            We couldn&apos;t find this workshop. It may have been removed or the link is incorrect.
          </p>
          <Link
            href="/workshops"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            style={{ background: 'var(--terracotta)' }}
          >
            {'\u2190'} Browse Workshops
          </Link>
        </div>
      </div>
    );
  }

  /* ---- Similar Workshops ---- */
  const similarWorkshops = WORKSHOPS.filter(
    (w) => w.slug !== workshop.slug && (w.type === workshop.type || w.areaSlug === workshop.areaSlug)
  ).slice(0, 3);

  /* ---- WhatsApp message ---- */
  const selectedDayObj = availableDays.find((d) => d.full === selectedDay);
  const dateStr = selectedDayObj
    ? `${selectedDayObj.dayName}, ${selectedDayObj.month} ${selectedDayObj.dateNum}`
    : 'Flexible';
  const whatsappText = encodeURIComponent(
    `Hi ${workshop.operator}! I'd like to book:\n\nWorkshop: ${workshop.name}\nDate: ${dateStr}\nGuests: 2\nLanguage: English\n\nBooked via GUDBRO Workshops`
  );

  /* ---- Rating breakdown (mock) ---- */
  const ratingBreakdown = [
    { stars: 5, pct: workshop.rating >= 4.9 ? 88 : workshop.rating >= 4.8 ? 78 : 68 },
    { stars: 4, pct: workshop.rating >= 4.9 ? 9 : 16 },
    { stars: 3, pct: workshop.rating >= 4.9 ? 2 : 4 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 0 },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--ivory)' }}>

      {/* ================================================================
         1. HERO IMAGE GALLERY
         ================================================================ */}
      <section className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <div className="w-full h-full overflow-hidden relative">
          <img
            src={workshop.images[currentImage]}
            alt={`${workshop.name} - Photo ${currentImage + 1}`}
            className="w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: mounted ? 1 : 0 }}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.3) 100%)',
            }}
          />
        </div>

        {/* Back button */}
        <Link
          href="/workshops"
          className="absolute top-4 left-4 glass flex items-center justify-center w-10 h-10 rounded-full z-10"
          style={{ backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.7)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--charcoal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>

        {/* Share button */}
        <button
          className="absolute top-4 right-4 glass flex items-center justify-center w-10 h-10 rounded-full z-10"
          style={{ backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.7)' }}
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: workshop.name, url: window.location.href });
            }
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--charcoal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>

        {/* Image dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {workshop.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className="rounded-full transition-all duration-300"
              style={{
                width: idx === currentImage ? 24 : 8,
                height: 8,
                background: idx === currentImage ? 'white' : 'rgba(255,255,255,0.5)',
              }}
            />
          ))}
        </div>

        {/* Swipe areas */}
        <button
          className="absolute left-0 top-0 w-1/3 h-full z-[5] cursor-default"
          onClick={() => setCurrentImage((p) => (p === 0 ? workshop.images.length - 1 : p - 1))}
          aria-label="Previous image"
        />
        <button
          className="absolute right-0 top-0 w-1/3 h-full z-[5] cursor-default"
          onClick={() => setCurrentImage((p) => (p + 1) % workshop.images.length)}
          aria-label="Next image"
        />
      </section>

      <main className="max-w-lg mx-auto px-4">

        {/* ================================================================
           2. TYPE BADGE + TITLE
           ================================================================ */}
        <section className={`mt-5 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Type badge */}
          <span
            className="badge-amber inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'var(--amber-light)', color: 'var(--amber-dark)' }}
          >
            <span>{workshop.typeEmoji}</span>
            {workshop.type}
          </span>

          {/* Workshop name */}
          <h1
            className="mt-2 text-2xl leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)', letterSpacing: '-0.02em' }}
          >
            {workshop.name}
          </h1>

          {/* Operator */}
          <p className="mt-1 text-sm" style={{ color: 'var(--charcoal-muted)' }}>
            with <span style={{ color: 'var(--terracotta)', fontWeight: 600 }}>{workshop.operator}</span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <StarRating rating={workshop.rating} size={16} />
            <span className="text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>
              {workshop.rating}
            </span>
            <span className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>
              ({workshop.reviewCount} reviews)
            </span>
          </div>
        </section>

        {/* ================================================================
           3. QUICK FACTS BAR
           ================================================================ */}
        <section
          className={`mt-5 flex gap-3 overflow-x-auto hide-scrollbar py-3 px-1 -mx-1 ${mounted ? 'animate-fade-in-up delay-1' : 'opacity-0'}`}
        >
          {[
            { icon: '\uD83D\uDD50', label: 'Duration', value: workshop.duration },
            { icon: '\uD83D\uDCB0', label: 'Price', value: formatPrice(workshop.price) },
            { icon: '\uD83D\uDC65', label: 'Max Group', value: `${workshop.maxGroup} people` },
            { icon: '\uD83D\uDCCA', label: 'Level', value: workshop.skill },
            { icon: '\uD83C\uDF10', label: 'Languages', value: workshop.languages.map((l) => LANGUAGE_MAP[l]?.flag || l).join(' ') },
          ].map((fact) => (
            <div
              key={fact.label}
              className="flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3 rounded-xl"
              style={{ background: 'var(--cream)', minWidth: 90 }}
            >
              <span className="text-lg">{fact.icon}</span>
              <span className="text-[10px] font-medium" style={{ color: 'var(--charcoal-muted)' }}>
                {fact.label}
              </span>
              <span className="text-xs font-bold text-center" style={{ color: 'var(--charcoal)' }}>
                {fact.value}
              </span>
            </div>
          ))}
        </section>

        {/* ================================================================
           4. DESCRIPTION SECTION
           ================================================================ */}
        <section className={`mt-6 ${mounted ? 'animate-fade-in-up delay-2' : 'opacity-0'}`}>
          <h2
            className="text-lg mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)' }}
          >
            What You&apos;ll Do
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--charcoal-light)' }}>
            {workshop.description}
          </p>

          {/* What You'll Create */}
          <div
            className="mt-4 p-4 rounded-xl"
            style={{ background: 'var(--amber-light)', borderLeft: '3px solid var(--amber)' }}
          >
            <p className="text-xs font-bold mb-1" style={{ color: 'var(--amber-dark)' }}>
              {'\uD83C\uDF81'} What You&apos;ll Create
            </p>
            <p className="text-sm" style={{ color: 'var(--charcoal)' }}>
              {workshop.whatYouCreate}
            </p>
          </div>
        </section>

        {/* ================================================================
           5. WHAT'S INCLUDED
           ================================================================ */}
        <section className={`mt-6 ${mounted ? 'animate-fade-in-up delay-3' : 'opacity-0'}`}>
          <h2
            className="text-lg mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)' }}
          >
            What&apos;s Included
          </h2>
          <div className="space-y-2.5">
            {workshop.included.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: 'var(--sage-light)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--sage-dark)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-sm" style={{ color: 'var(--charcoal-light)' }}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================
           6. WHAT TO BRING
           ================================================================ */}
        <section className={`mt-6 ${mounted ? 'animate-fade-in-up delay-4' : 'opacity-0'}`}>
          <h2
            className="text-lg mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)' }}
          >
            What to Bring
          </h2>
          <div
            className="p-4 rounded-xl space-y-2"
            style={{ background: 'var(--cream)' }}
          >
            {workshop.bring.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm" style={{ color: 'var(--terracotta)' }}>{'\u2022'}</span>
                <span className="text-sm" style={{ color: 'var(--charcoal-light)' }}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================
           7. AVAILABILITY CALENDAR
           ================================================================ */}
        <section className={`mt-6 ${mounted ? 'animate-fade-in-up delay-5' : 'opacity-0'}`}>
          <h2
            className="text-lg mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)' }}
          >
            Availability
          </h2>
          <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-2 -mx-1 px-1">
            {availableDays.map((day) => {
              const isSelected = selectedDay === day.full;
              const hasAvailable = day.slots.some((s) => s.status === 'available');
              const isFull = day.slots.length > 0 && day.slots.every((s) => s.status === 'full');
              const noSlots = day.slots.length === 0;

              return (
                <button
                  key={day.full}
                  onClick={() => hasAvailable ? setSelectedDay(day.full) : undefined}
                  className="flex-shrink-0 flex flex-col items-center gap-1 p-3 rounded-xl transition-all"
                  style={{
                    minWidth: 72,
                    background: isSelected
                      ? 'var(--terracotta)'
                      : noSlots
                        ? 'var(--sand)'
                        : 'white',
                    border: isSelected ? 'none' : '1px solid var(--sand)',
                    opacity: noSlots ? 0.5 : 1,
                    cursor: hasAvailable ? 'pointer' : 'default',
                  }}
                >
                  <span
                    className="text-[10px] font-semibold uppercase"
                    style={{ color: isSelected ? 'rgba(255,255,255,0.7)' : 'var(--charcoal-muted)' }}
                  >
                    {day.isToday ? 'Today' : day.dayName}
                  </span>
                  <span
                    className="text-lg font-bold"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: isSelected ? 'white' : 'var(--charcoal)',
                    }}
                  >
                    {day.dateNum}
                  </span>
                  <span
                    className="text-[9px] font-medium"
                    style={{ color: isSelected ? 'rgba(255,255,255,0.8)' : 'var(--charcoal-muted)' }}
                  >
                    {day.month}
                  </span>

                  {/* Slots */}
                  <div className="flex flex-col gap-0.5 mt-1">
                    {day.slots.map((slot, si) => (
                      <span
                        key={si}
                        className="text-[8px] font-semibold px-1.5 py-0.5 rounded"
                        style={{
                          background: slot.status === 'available'
                            ? isSelected ? 'rgba(255,255,255,0.2)' : 'var(--sage-light)'
                            : isSelected ? 'rgba(255,255,255,0.15)' : 'var(--sand)',
                          color: slot.status === 'available'
                            ? isSelected ? 'white' : 'var(--sage-dark)'
                            : isSelected ? 'rgba(255,255,255,0.6)' : 'var(--charcoal-muted)',
                        }}
                      >
                        {slot.time}
                      </span>
                    ))}
                    {noSlots && (
                      <span
                        className="text-[8px] font-semibold px-1.5 py-0.5 rounded"
                        style={{ background: 'var(--sand)', color: 'var(--charcoal-muted)' }}
                      >
                        Closed
                      </span>
                    )}
                    {isFull && (
                      <span
                        className="text-[8px] font-semibold px-1.5 py-0.5 rounded"
                        style={{ background: 'var(--sand)', color: 'var(--charcoal-muted)' }}
                      >
                        Full
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ================================================================
           8. OPERATOR PROFILE CARD
           ================================================================ */}
        <section className={`mt-6 ${mounted ? 'animate-fade-in-up delay-6' : 'opacity-0'}`}>
          <h2
            className="text-lg mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)' }}
          >
            Your Instructor
          </h2>
          <div
            className="card p-5 rounded-2xl"
            style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          >
            <div className="flex items-center gap-4">
              {/* Photo placeholder */}
              <div
                className="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center text-2xl"
                style={{ background: 'var(--terracotta-light)', color: 'var(--terracotta-dark)' }}
              >
                {workshop.operator.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base" style={{ color: 'var(--charcoal)' }}>
                  {workshop.operator}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--charcoal-muted)' }}>
                  {workshop.operatorTagline}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 mt-4 pt-4" style={{ borderTop: '1px solid var(--sand)' }}>
              <div className="flex-1 text-center">
                <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--terracotta)' }}>
                  {workshop.operatorYears}
                </p>
                <p className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>Years Exp.</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--terracotta)' }}>
                  {workshop.operatorWorkshops}+
                </p>
                <p className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>Workshops</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--terracotta)' }}>
                  {workshop.operatorRating}
                </p>
                <p className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>Avg. Rating</p>
              </div>
            </div>

            <Link
              href={`/operator/${workshop.operatorSlug}`}
              className="block mt-4 text-center text-sm font-semibold py-2.5 rounded-xl transition-colors"
              style={{
                color: 'var(--terracotta)',
                background: 'var(--terracotta-light)',
              }}
            >
              View Profile
            </Link>
          </div>
        </section>

        {/* ================================================================
           9. LOCATION SECTION
           ================================================================ */}
        <section className={`mt-6 ${mounted ? 'animate-fade-in-up delay-7' : 'opacity-0'}`}>
          <h2
            className="text-lg mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)' }}
          >
            Location
          </h2>

          {/* Map placeholder */}
          <div
            className="w-full h-40 rounded-xl flex items-center justify-center relative overflow-hidden"
            style={{ background: 'var(--sand)' }}
          >
            <div className="text-center">
              <span className="text-3xl">{'\uD83D\uDCCD'}</span>
              <p className="text-xs mt-1 font-medium" style={{ color: 'var(--charcoal-muted)' }}>
                Map Preview
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-start gap-3">
            <span className="text-lg mt-0.5">{'\uD83D\uDCCD'}</span>
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: 'var(--charcoal)' }}>
                {workshop.address}
              </p>
              <span
                className="inline-block mt-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
                style={{ background: 'var(--cream)', color: 'var(--charcoal-light)' }}
              >
                {workshop.area}
              </span>
            </div>
          </div>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${workshop.geo.lat},${workshop.geo.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            style={{
              color: 'var(--terracotta)',
              border: '1.5px solid var(--terracotta)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            Get Directions
          </a>
        </section>

        {/* ================================================================
           10. REVIEWS SECTION
           ================================================================ */}
        <section className={`mt-6 ${mounted ? 'animate-fade-in-up delay-8' : 'opacity-0'}`}>
          <h2
            className="text-lg mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)' }}
          >
            Reviews
          </h2>

          {/* Overall rating + breakdown */}
          <div
            className="p-4 rounded-xl flex gap-6 items-center"
            style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          >
            <div className="text-center flex-shrink-0">
              <p
                className="text-4xl font-bold"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)' }}
              >
                {workshop.rating}
              </p>
              <StarRating rating={workshop.rating} size={14} />
              <p className="text-[10px] mt-1" style={{ color: 'var(--charcoal-muted)' }}>
                {workshop.reviewCount} reviews
              </p>
            </div>
            <div className="flex-1 space-y-1.5">
              {ratingBreakdown.map((row) => (
                <div key={row.stars} className="flex items-center gap-2">
                  <span className="text-[10px] w-3 text-right" style={{ color: 'var(--charcoal-muted)' }}>
                    {row.stars}
                  </span>
                  <div
                    className="flex-1 h-2 rounded-full overflow-hidden"
                    style={{ background: 'var(--sand)' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${row.pct}%`, background: 'var(--amber)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review cards */}
          <div className="mt-4 space-y-3">
            {workshop.reviews.map((review, i) => (
              <div
                key={i}
                className="p-4 rounded-xl"
                style={{ background: 'white', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{review.flag}</span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>
                      {review.name}
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>{review.date}</span>
                </div>
                <div className="mt-1.5">
                  <StarRating rating={review.rating} size={12} />
                </div>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--charcoal-light)' }}>
                  {review.text}
                </p>
              </div>
            ))}
          </div>

          <button
            className="mt-3 w-full text-center text-sm font-semibold py-2.5 rounded-xl"
            style={{ color: 'var(--terracotta)', background: 'var(--terracotta-light)' }}
          >
            See All {workshop.reviewCount} Reviews
          </button>
        </section>

        {/* ================================================================
           11. SIMILAR WORKSHOPS
           ================================================================ */}
        {similarWorkshops.length > 0 && (
          <section className={`mt-6 ${mounted ? 'animate-fade-in-up delay-9' : 'opacity-0'}`}>
            <h2
              className="text-lg mb-3"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)' }}
            >
              Similar Workshops
            </h2>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-1 px-1">
              {similarWorkshops.map((w) => (
                <Link
                  key={w.slug}
                  href={`/workshops/${w.slug}`}
                  className="flex-shrink-0 rounded-xl overflow-hidden"
                  style={{
                    width: 200,
                    background: 'white',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                  }}
                >
                  <div className="h-28 overflow-hidden">
                    <img
                      src={w.images[0]}
                      alt={w.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <span
                      className="text-[10px] font-semibold"
                      style={{ color: 'var(--amber-dark)' }}
                    >
                      {w.typeEmoji} {w.type}
                    </span>
                    <h3
                      className="text-sm font-bold mt-0.5 line-clamp-1"
                      style={{ color: 'var(--charcoal)' }}
                    >
                      {w.name}
                    </h3>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center gap-1">
                        <StarRating rating={w.rating} size={10} />
                        <span className="text-[10px] font-medium" style={{ color: 'var(--charcoal-muted)' }}>
                          {w.rating}
                        </span>
                      </div>
                      <span className="text-xs font-bold" style={{ color: 'var(--terracotta)' }}>
                        {formatPrice(w.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ================================================================
           13. BOTTOM SPACING
           ================================================================ */}
        <div className="pb-32" />
      </main>

      {/* ================================================================
         12. STICKY BOOKING BAR
         ================================================================ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 border-t"
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--sand)',
        }}
      >
        {/* Push above BottomNav */}
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3" style={{ marginBottom: 'env(safe-area-inset-bottom)' }}>
          {/* Price */}
          <div className="flex-shrink-0">
            <p
              className="text-lg font-bold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)' }}
            >
              {formatPrice(workshop.price)}
            </p>
            <p className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>per person</p>
          </div>

          {/* Buttons */}
          <div className="flex-1 flex gap-2">
            <a
              href={`https://wa.me/+84905456789?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'var(--terracotta)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="https://zalo.me/0905456789"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                color: 'var(--terracotta)',
                border: '2px solid var(--terracotta)',
                background: 'transparent',
              }}
            >
              Zalo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
