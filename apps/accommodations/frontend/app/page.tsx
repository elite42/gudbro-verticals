'use client';

import { useState, useRef, useEffect } from 'react';
import BottomNav from '../components/BottomNav';

// Mock property data
const property = {
  id: 'beach-view-apt-1',
  name: 'Beach View Apartment',
  type: 'apartment',
  tagline: 'Modern coastal living with panoramic sea views',
  rating: 4.9,
  reviewCount: 47,
  location: {
    area: 'My Khe Beach',
    city: 'Da Nang',
    country: 'Vietnam',
    coordinates: { lat: 16.0544, lng: 108.2472 },
  },
  host: {
    name: 'Mario',
    photo:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    joined: '2023',
    responseRate: 98,
    responseTime: '< 1 hour',
    properties: 3,
    superhost: true,
  },
  images: [
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop',
  ],
  capacity: {
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
  },
  pricing: {
    perNight: 45,
    currency: 'USD',
    cleaningFee: 15,
    weeklyDiscount: 10,
    monthlyDiscount: 25,
  },
  amenities: [
    { id: 'wifi', label: 'High-Speed WiFi', icon: 'wifi' },
    { id: 'ac', label: 'Air Conditioning', icon: 'ac' },
    { id: 'kitchen', label: 'Full Kitchen', icon: 'kitchen' },
    { id: 'washer', label: 'Washer', icon: 'washer' },
    { id: 'tv', label: 'Smart TV', icon: 'tv' },
    { id: 'balcony', label: 'Ocean Balcony', icon: 'balcony' },
    { id: 'parking', label: 'Free Parking', icon: 'parking' },
    { id: 'workspace', label: 'Work Desk', icon: 'workspace' },
  ],
  description: `Wake up to the sound of waves and breathtaking sunrise views over the East Sea. This modern apartment is perfectly positioned on My Khe Beach, one of the most beautiful beaches in Vietnam.

The space features floor-to-ceiling windows that flood the apartment with natural light, a fully equipped kitchen for those who love to cook, and a spacious balcony where you can enjoy your morning coffee while watching the fishermen set out to sea.

Just a 2-minute walk to the beach and surrounded by excellent restaurants, cafes, and local markets. The apartment is ideal for couples, families, or digital nomads looking for an inspiring workspace with a view.`,
  houseRules: {
    checkIn: '14:00',
    checkOut: '11:00',
    selfCheckIn: true,
    rules: [
      { id: 'no_smoking', label: 'No smoking', icon: '🚭' },
      { id: 'no_parties', label: 'No parties or events', icon: '🎉' },
      { id: 'quiet', label: 'Quiet hours after 10 PM', icon: '🤫' },
    ],
  },
  reviews: [
    {
      id: '1',
      name: 'Sarah',
      country: 'US',
      avatar: 'S',
      rating: 5,
      date: '2 weeks ago',
      comment:
        'Amazing view, super clean! Mario was very helpful with local recommendations. Would definitely stay again.',
    },
    {
      id: '2',
      name: 'Kim',
      country: 'KR',
      avatar: 'K',
      rating: 5,
      date: '1 month ago',
      comment: 'Great location, helpful host. The sunrise view from the balcony was unforgettable.',
    },
    {
      id: '3',
      name: 'Thomas',
      country: 'DE',
      avatar: 'T',
      rating: 4,
      date: '1 month ago',
      comment: 'Nice apartment with good facilities. Beach is literally 2 minutes away.',
    },
  ],
  services: [
    { id: 'breakfast', name: 'Breakfast', icon: '🍳', hours: '6:30-10:00', items: 12 },
    { id: 'minibar', name: 'Minibar', icon: '🍫', hours: '24/7', items: 8 },
    { id: 'laundry', name: 'Laundry', icon: '👕', hours: '8:00-18:00', items: 6 },
  ],
  nearby: [
    { name: 'My Khe Beach', distance: '2 min walk', icon: '🏖️' },
    { name: 'Da Nang Airport', distance: '15 min drive', icon: '✈️' },
    { name: 'Dragon Bridge', distance: '10 min drive', icon: '🌉' },
    { name: 'Han Market', distance: '12 min drive', icon: '🛒' },
  ],
};

// Icon components
const icons = {
  wifi: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
      />
    </svg>
  ),
  ac: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  ),
  kitchen: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12"
      />
    </svg>
  ),
  washer: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="13" r="5" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="12" cy="13" r="2" />
      <circle cx="7" cy="7" r="1" fill="currentColor" />
      <circle cx="10" cy="7" r="1" fill="currentColor" />
    </svg>
  ),
  tv: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
      />
    </svg>
  ),
  balcony: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  ),
  parking: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-3m0 0l-3.362-3.838a2.25 2.25 0 00-1.694-.77H9.456c-.65 0-1.275.265-1.727.717l-2.48 2.476m15.501 1.415l-2.67.748a2.25 2.25 0 01-1.694-.17l-.54-.289"
      />
    </svg>
  ),
  workspace: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
      />
    </svg>
  ),
};

export default function PropertyPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedCurrency, _setSelectedCurrency] = useState('USD');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [activeTab, setActiveTab] = useState<'home' | 'map' | 'services' | 'profile'>('home');
  const [showMenu, setShowMenu] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Handle gallery scroll
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const handleScroll = () => {
      const scrollLeft = gallery.scrollLeft;
      const width = gallery.clientWidth;
      const newIndex = Math.round(scrollLeft / width);
      setCurrentImage(newIndex);
    };

    gallery.addEventListener('scroll', handleScroll);
    return () => gallery.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToImage = (index: number) => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    gallery.scrollTo({ left: index * gallery.clientWidth, behavior: 'smooth' });
  };

  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    VND: '₫',
    KRW: '₩',
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#E8E4DF] bg-[#FAF8F5]/90 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          <button className="-ml-2 rounded-full p-2 transition-colors hover:bg-[#E8E4DF]">
            <svg
              className="h-5 w-5 text-[#2D2926]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            {/* Language */}
            <button className="rounded-full p-2 transition-colors hover:bg-[#E8E4DF]">
              <svg
                className="h-5 w-5 text-[#2D2926]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </button>

            {/* Currency */}
            <button className="flex items-center gap-1 rounded-full px-2 py-1.5 text-sm font-medium text-[#2D2926] transition-colors hover:bg-[#E8E4DF]">
              {currencySymbols[selectedCurrency]}
            </button>

            {/* Share */}
            <button className="rounded-full p-2 transition-colors hover:bg-[#E8E4DF]">
              <svg
                className="h-5 w-5 text-[#2D2926]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                />
              </svg>
            </button>

            {/* Save */}
            <button className="rounded-full p-2 transition-colors hover:bg-[#E8E4DF]">
              <svg
                className="h-5 w-5 text-[#2D2926]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-14">
        {/* Image Gallery */}
        <div className="relative">
          <div
            ref={galleryRef}
            className="hide-scrollbar flex snap-x snap-mandatory overflow-x-auto"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {property.images.map((image, index) => (
              <div key={index} className="aspect-[4/3] w-full flex-shrink-0 snap-center">
                <img
                  src={image}
                  alt={`${property.name} - Image ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Gallery Dots */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToImage(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentImage ? 'w-6 bg-white' : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
            {currentImage + 1} / {property.images.length}
          </div>
        </div>

        {/* Property Info */}
        <div className="px-5 pt-5">
          {/* Type Badge & Rating */}
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-full bg-[#E07A5F]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#E07A5F]">
              Apartment
            </span>
            <div className="flex items-center gap-1.5">
              <svg className="h-4 w-4 fill-current text-[#E07A5F]" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="font-semibold text-[#2D2926]">{property.rating}</span>
              <span className="text-[#6B6560]">({property.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Property Name */}
          <h1 className="font-display mb-1 text-2xl font-semibold text-[#2D2926]">
            {property.name}
          </h1>

          {/* Location */}
          <p className="mb-4 flex items-center gap-1.5 text-[#6B6560]">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {property.location.area}, {property.location.city}
          </p>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 border-y border-[#E8E4DF] py-4">
            <div className="flex items-center gap-2 text-[#2D2926]">
              <svg
                className="h-5 w-5 text-[#6B6560]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <span className="text-sm">{property.capacity.guests} guests</span>
            </div>
            <div className="h-4 w-px bg-[#E8E4DF]" />
            <div className="flex items-center gap-2 text-[#2D2926]">
              <svg
                className="h-5 w-5 text-[#6B6560]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75"
                />
              </svg>
              <span className="text-sm">{property.capacity.bedrooms} bedrooms</span>
            </div>
            <div className="h-4 w-px bg-[#E8E4DF]" />
            <div className="flex items-center gap-2 text-[#2D2926]">
              <svg
                className="h-5 w-5 text-[#6B6560]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm">{property.capacity.bathrooms} bath</span>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="mx-5 mt-6 rounded-2xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <div className="mb-4 flex items-baseline justify-between">
            <div>
              <span className="font-display text-3xl font-semibold text-[#2D2926]">
                ${property.pricing.perNight}
              </span>
              <span className="ml-1 text-[#6B6560]">/ night</span>
            </div>
            <div className="flex flex-col items-end text-xs">
              <span className="font-medium text-[#3D8B87]">
                -{property.pricing.weeklyDiscount}% weekly
              </span>
              <span className="font-medium text-[#3D8B87]">
                -{property.pricing.monthlyDiscount}% monthly
              </span>
            </div>
          </div>

          {/* Date Inputs */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#6B6560]">
                Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full rounded-xl border border-[#E8E4DF] bg-[#FAF8F5] px-3 py-2.5 text-sm text-[#2D2926] focus:border-[#E07A5F] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#6B6560]">
                Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full rounded-xl border border-[#E8E4DF] bg-[#FAF8F5] px-3 py-2.5 text-sm text-[#2D2926] focus:border-[#E07A5F] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/30"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="mb-5">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#6B6560]">
              Guests
            </label>
            <div className="flex items-center justify-between rounded-xl border border-[#E8E4DF] bg-[#FAF8F5] px-3 py-2.5">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E4DF] bg-white text-[#2D2926] transition-colors hover:border-[#E07A5F]"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                </svg>
              </button>
              <span className="font-medium text-[#2D2926]">
                {guests} guest{guests > 1 ? 's' : ''}
              </span>
              <button
                onClick={() => setGuests(Math.min(property.capacity.guests, guests + 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E4DF] bg-white text-[#2D2926] transition-colors hover:border-[#E07A5F]"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Book Button */}
          <button className="w-full rounded-xl bg-[#E07A5F] py-3.5 font-semibold text-white shadow-[0_4px_14px_rgba(224,122,95,0.35)] transition-colors hover:bg-[#D16A4F]">
            Check Availability
          </button>
        </div>

        {/* Amenities */}
        <section className="mt-8 px-5">
          <h2 className="font-display mb-4 text-xl font-semibold text-[#2D2926]">
            What this place offers
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {property.amenities.map((amenity) => (
              <div key={amenity.id} className="flex items-center gap-3 rounded-xl bg-white p-3">
                <div className="text-[#3D8B87]">{icons[amenity.icon as keyof typeof icons]}</div>
                <span className="text-sm text-[#2D2926]">{amenity.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Description */}
        <section className="mt-8 px-5">
          <h2 className="font-display mb-4 text-xl font-semibold text-[#2D2926]">
            About this space
          </h2>
          <div className="relative">
            <p
              className={`leading-relaxed text-[#6B6560] ${!showFullDescription && 'line-clamp-4'}`}
            >
              {property.description}
            </p>
            {!showFullDescription && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#FAF8F5] to-transparent" />
            )}
          </div>
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="mt-2 flex items-center gap-1 text-sm font-medium text-[#E07A5F]"
          >
            {showFullDescription ? 'Show less' : 'Read more'}
            <svg
              className={`h-4 w-4 transition-transform ${showFullDescription && 'rotate-180'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </section>

        {/* House Rules */}
        <section className="mt-8 px-5">
          <h2 className="font-display mb-4 text-xl font-semibold text-[#2D2926]">House Rules</h2>
          <div className="space-y-4 rounded-2xl bg-white p-4">
            <div className="flex items-center justify-between border-b border-[#E8E4DF] py-2">
              <div className="flex items-center gap-3">
                <span className="text-xl">🕐</span>
                <span className="text-[#2D2926]">Check-in</span>
              </div>
              <span className="font-medium text-[#2D2926]">
                After {property.houseRules.checkIn}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-[#E8E4DF] py-2">
              <div className="flex items-center gap-3">
                <span className="text-xl">🕐</span>
                <span className="text-[#2D2926]">Check-out</span>
              </div>
              <span className="font-medium text-[#2D2926]">
                Before {property.houseRules.checkOut}
              </span>
            </div>
            {property.houseRules.selfCheckIn && (
              <div className="flex items-center justify-between border-b border-[#E8E4DF] py-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🔑</span>
                  <span className="text-[#2D2926]">Self check-in</span>
                </div>
                <span className="rounded-full bg-[#3D8B87]/10 px-2 py-0.5 text-xs font-medium text-[#3D8B87]">
                  Available
                </span>
              </div>
            )}
            {property.houseRules.rules.map((rule) => (
              <div key={rule.id} className="flex items-center gap-3 py-2">
                <span className="text-xl">{rule.icon}</span>
                <span className="text-[#6B6560]">{rule.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="mt-8 px-5">
          <h2 className="font-display mb-4 text-xl font-semibold text-[#2D2926]">Location</h2>
          <div className="overflow-hidden rounded-2xl bg-white">
            {/* Map Placeholder */}
            <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[#3D8B87]/20 to-[#3D8B87]/5">
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#E07A5F]/10">
                  <svg
                    className="h-6 w-6 text-[#E07A5F]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-[#6B6560]">{property.location.area}</p>
                <p className="text-xs text-[#6B6560]/70">
                  {property.location.city}, {property.location.country}
                </p>
              </div>
            </div>
            {/* Nearby */}
            <div className="space-y-3 p-4">
              <h3 className="text-sm font-medium text-[#2D2926]">What's nearby</h3>
              {property.nearby.map((place, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{place.icon}</span>
                    <span className="text-sm text-[#2D2926]">{place.name}</span>
                  </div>
                  <span className="text-xs text-[#6B6560]">{place.distance}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-8 px-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-[#2D2926]">Reviews</h2>
            <div className="flex items-center gap-1">
              <svg className="h-5 w-5 fill-current text-[#E07A5F]" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="font-semibold text-[#2D2926]">{property.rating}</span>
              <span className="text-[#6B6560]">· {property.reviewCount} reviews</span>
            </div>
          </div>

          <div className="space-y-4">
            {property.reviews.map((review) => (
              <div key={review.id} className="rounded-2xl bg-white p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E07A5F]/10 font-semibold text-[#E07A5F]">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-[#2D2926]">{review.name}</p>
                    <p className="text-xs text-[#6B6560]">
                      {review.country} · {review.date}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-3.5 w-3.5 fill-current text-[#E07A5F]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#6B6560]">{review.comment}</p>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full rounded-xl border border-[#E8E4DF] py-3 font-medium text-[#2D2926] transition-colors hover:bg-white">
            See all {property.reviewCount} reviews
          </button>
        </section>

        {/* Host */}
        <section className="mt-8 px-5">
          <h2 className="font-display mb-4 text-xl font-semibold text-[#2D2926]">
            Hosted by {property.host.name}
          </h2>
          <div className="rounded-2xl bg-white p-4">
            <div className="mb-4 flex items-center gap-4">
              <div className="relative">
                <img
                  src={property.host.photo}
                  alt={property.host.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                {property.host.superhost && (
                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#E07A5F]">
                    <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-[#2D2926]">{property.host.name}</h3>
                  {property.host.superhost && (
                    <span className="rounded-full bg-[#E07A5F]/10 px-2 py-0.5 text-xs font-medium text-[#E07A5F]">
                      Superhost
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#6B6560]">
                  Joined in {property.host.joined} · {property.host.properties} properties
                </p>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#FAF8F5] py-2 text-center">
                <p className="font-semibold text-[#2D2926]">{property.host.responseRate}%</p>
                <p className="text-xs text-[#6B6560]">Response rate</p>
              </div>
              <div className="rounded-xl bg-[#FAF8F5] py-2 text-center">
                <p className="font-semibold text-[#2D2926]">{property.host.responseTime}</p>
                <p className="text-xs text-[#6B6560]">Response time</p>
              </div>
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3D8B87] py-3 font-semibold text-white transition-colors hover:bg-[#357A76]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.546 20.2A1 1 0 003.8 21.454l3.032-.892A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
              Contact Host
            </button>
          </div>
        </section>

        {/* In-Stay Services */}
        <section className="mb-8 mt-8 px-5">
          <h2 className="font-display mb-4 text-xl font-semibold text-[#2D2926]">
            In-Stay Services
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {property.services.map((service) => (
              <button
                key={service.id}
                className="rounded-2xl bg-white p-4 text-center transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
              >
                <span className="mb-2 block text-3xl">{service.icon}</span>
                <h3 className="mb-0.5 text-sm font-medium text-[#2D2926]">{service.name}</h3>
                <p className="text-xs text-[#6B6560]">{service.hours}</p>
                <p className="mt-1 text-xs text-[#3D8B87]">{service.items} items</p>
              </button>
            ))}
          </div>
        </section>
      </main>

      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as typeof activeTab)}
        onMenuToggle={() => setShowMenu(!showMenu)}
      />

      {/* Bento Menu Drawer */}
      {showMenu && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowMenu(false)}
          />
          <div className="pb-safe-bottom animate-slide-up absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-6">
            <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-[#E8E4DF]" />
            <h3 className="font-display mb-4 text-xl font-semibold text-[#2D2926]">Quick Access</h3>
            <div className="grid grid-cols-3 gap-4">
              <button className="flex flex-col items-center rounded-2xl bg-[#FAF8F5] p-4 transition-colors hover:bg-[#E07A5F]/10">
                <span className="mb-2 text-2xl">🍳</span>
                <span className="text-sm text-[#2D2926]">Breakfast</span>
              </button>
              <button className="flex flex-col items-center rounded-2xl bg-[#FAF8F5] p-4 transition-colors hover:bg-[#E07A5F]/10">
                <span className="mb-2 text-2xl">🍫</span>
                <span className="text-sm text-[#2D2926]">Minibar</span>
              </button>
              <button className="flex flex-col items-center rounded-2xl bg-[#FAF8F5] p-4 transition-colors hover:bg-[#E07A5F]/10">
                <span className="mb-2 text-2xl">👕</span>
                <span className="text-sm text-[#2D2926]">Laundry</span>
              </button>
              <button className="flex flex-col items-center rounded-2xl bg-[#FAF8F5] p-4 transition-colors hover:bg-[#E07A5F]/10">
                <span className="mb-2 text-2xl">🚗</span>
                <span className="text-sm text-[#2D2926]">Transfer</span>
              </button>
              <button className="flex flex-col items-center rounded-2xl bg-[#FAF8F5] p-4 transition-colors hover:bg-[#E07A5F]/10">
                <span className="mb-2 text-2xl">📞</span>
                <span className="text-sm text-[#2D2926]">Contact</span>
              </button>
              <button className="flex flex-col items-center rounded-2xl bg-[#FAF8F5] p-4 transition-colors hover:bg-[#E07A5F]/10">
                <span className="mb-2 text-2xl">🎁</span>
                <span className="text-sm text-[#2D2926]">Deals</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
