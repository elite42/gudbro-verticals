'use client';

import { useState } from 'react';

// Mock booking data
// Visa rules per country (would come from backend/API)
const VISA_RULES: Record<
  string,
  {
    exemptionDays: number | null;
    evisaDays: number;
    evisaFee: { single: number; multiple: number };
    notes: string[];
  }
> = {
  IT: {
    exemptionDays: 45,
    evisaDays: 90,
    evisaFee: { single: 25, multiple: 50 },
    notes: ['Visa exemption valid until March 2028', 'No visa required for stays up to 45 days'],
  },
  DE: {
    exemptionDays: 45,
    evisaDays: 90,
    evisaFee: { single: 25, multiple: 50 },
    notes: ['Visa exemption valid until March 2028', 'No visa required for stays up to 45 days'],
  },
  FR: {
    exemptionDays: 45,
    evisaDays: 90,
    evisaFee: { single: 25, multiple: 50 },
    notes: ['Visa exemption valid until March 2028', 'No visa required for stays up to 45 days'],
  },
  GB: {
    exemptionDays: 45,
    evisaDays: 90,
    evisaFee: { single: 25, multiple: 50 },
    notes: ['Visa exemption valid until March 2028', 'No visa required for stays up to 45 days'],
  },
  US: {
    exemptionDays: null,
    evisaDays: 90,
    evisaFee: { single: 25, multiple: 50 },
    notes: ['E-Visa required for all stays', 'Apply at evisa.xuatnhapcanh.gov.vn'],
  },
  AU: {
    exemptionDays: null,
    evisaDays: 90,
    evisaFee: { single: 25, multiple: 50 },
    notes: ['E-Visa required for all stays', 'Apply at evisa.xuatnhapcanh.gov.vn'],
  },
  CN: {
    exemptionDays: null,
    evisaDays: 90,
    evisaFee: { single: 25, multiple: 50 },
    notes: ['E-Visa or Visa on Arrival available', 'Check embassy for latest requirements'],
  },
  KR: {
    exemptionDays: 45,
    evisaDays: 90,
    evisaFee: { single: 25, multiple: 50 },
    notes: ['Visa exemption valid until March 2028', 'No visa required for stays up to 45 days'],
  },
  JP: {
    exemptionDays: 45,
    evisaDays: 90,
    evisaFee: { single: 25, multiple: 50 },
    notes: ['Visa exemption valid until March 2028', 'No visa required for stays up to 45 days'],
  },
  // Default for countries without exemption
  DEFAULT: {
    exemptionDays: null,
    evisaDays: 90,
    evisaFee: { single: 25, multiple: 50 },
    notes: ['E-Visa required', 'Apply 5-7 days before travel'],
  },
};

const mockBooking = {
  code: 'BK-2024-BEACH123',
  guestName: 'Marco Rossi',
  guestEmail: 'marco.rossi@email.com',
  guestCountry: 'IT', // ISO country code
  property: {
    name: 'Beach View Apartment',
    type: 'apartment',
    address: 'My Khe Beach, Da Nang',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    verified: true,
  },
  unit: {
    name: 'Ocean Suite 301',
    floor: '3rd Floor',
  },
  checkIn: new Date('2026-01-25'),
  checkOut: new Date('2026-01-30'),
  wifi: {
    network: 'BeachView_Guest',
    password: 'Welcome2024!',
  },
  host: {
    name: 'Nguyen Thi Lan',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    responseTime: '< 1 hour',
    channels: [
      { type: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/84905123456', icon: '💬' },
      { type: 'zalo', label: 'Zalo', url: 'https://zalo.me/84905123456', icon: '📱' },
      { type: 'telegram', label: 'Telegram', url: 'https://t.me/nguyenlan', icon: '✈️' },
      { type: 'phone', label: 'Call', url: 'tel:+84905123456', icon: '📞' },
    ],
  },
  visa: {
    type: 'E-Visa',
    entryDate: new Date('2026-01-15'),
    expiryDate: new Date('2026-02-15'),
    uploaded: true,
    lastUpdated: new Date('2026-01-20'),
    // Visa info - entries depends on actual visa type
    entries: 'Multiple entry',
    purpose: 'Tourism',
  },
  // Owner's recommended visa partner (max 1-2)
  visaPartner: {
    name: 'Vietnam Visa Pro',
    discount: '10%',
    services: ['Extension', 'Visa Run'],
    contact: 'https://wa.me/84901234567',
  },
  // City-based useful numbers
  usefulNumbers: {
    city: 'Da Nang',
    emergency: [
      { name: 'Police', number: '113', icon: '🚔' },
      { name: 'Fire', number: '114', icon: '🚒' },
      { name: 'Ambulance', number: '115', icon: '🚑' },
    ],
    local: [
      { name: 'Tourist Police', number: '+84 236 3822 324', icon: '👮' },
      { name: 'Hospital (Vinmec)', number: '+84 236 3711 111', icon: '🏥' },
      { name: 'Grab Taxi', number: 'Open App', icon: '🚕', isApp: true, url: 'grab://' },
    ],
    property: {
      name: 'Beach View Emergency',
      number: '+84 905 123 456',
      available: '24/7',
    },
  },
};

const services = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    icon: '🥐',
    gradient: 'from-amber-400 to-orange-500',
    price: 'From $8',
  },
  {
    id: 'minibar',
    name: 'Minibar',
    icon: '🍹',
    gradient: 'from-rose-400 to-pink-500',
    price: 'From $2',
  },
  {
    id: 'laundry',
    name: 'Laundry',
    icon: '👔',
    gradient: 'from-sky-400 to-blue-500',
    price: 'From $5',
  },
  {
    id: 'spa',
    name: 'Spa',
    icon: '💆',
    gradient: 'from-violet-400 to-purple-500',
    price: 'From $25',
  },
];

const localDeals = {
  tours: [
    {
      id: 't1',
      name: 'Marble Mountains',
      partner: 'Da Nang Explorer',
      discount: '15%',
      price: '$38',
      originalPrice: '$45',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400',
      gudbro: true,
      distance: '8 km',
    },
    {
      id: 't2',
      name: 'Hoi An Day Trip',
      partner: 'Local Tours',
      discount: '10%',
      price: '$28',
      originalPrice: '$31',
      image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400',
      gudbro: false,
      contact: 'https://wa.me/84901234567',
      distance: '30 km',
    },
  ],
  food: [
    {
      id: 'f1',
      name: 'Seafood Dinner',
      partner: 'Ocean Grill',
      discount: '10%',
      price: '$31',
      originalPrice: '$35',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400',
      delivery: true,
      deliveryTime: '25-35 min',
      deliveryFee: 'Free',
      pickup: true,
      pickupTime: '15-20 min',
      gudbro: true,
      distance: '1.2 km',
    },
    {
      id: 'f2',
      name: 'Cooking Class',
      partner: 'Mama Kitchen',
      discount: '15%',
      price: '$21',
      originalPrice: '$25',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400',
      gudbro: true,
      distance: '2.5 km',
    },
    {
      id: 'f3',
      name: 'Pizza & Pasta',
      partner: 'Little Italy',
      discount: '10%',
      price: '$18',
      originalPrice: '$20',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
      delivery: true,
      deliveryTime: '30-40 min',
      deliveryFee: '$1.50',
      pickup: true,
      pickupTime: '20-25 min',
      gudbro: false,
      contact: 'https://wa.me/84907654321',
      distance: '3.1 km',
    },
    {
      id: 'f4',
      name: 'Specialty Coffee',
      partner: 'The Local Bean',
      discount: '10%',
      price: '$3',
      originalPrice: '$3.50',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      pickup: true,
      pickupTime: '5 min',
      gudbro: true,
      distance: '400 m',
    },
    {
      id: 'f5',
      name: 'Bánh Mì & Coffee',
      partner: 'Saigon Corner',
      discount: '15%',
      price: '$4',
      originalPrice: '$5',
      image: 'https://images.unsplash.com/photo-1600454021018-3bcee5c54fed?w=400',
      pickup: true,
      pickupTime: '10 min',
      gudbro: true,
      distance: '650 m',
    },
  ],
  more: [
    {
      id: 'm1',
      name: 'Airport Transfer',
      partner: 'VIP Transport',
      discount: '20%',
      price: '$20',
      originalPrice: '$25',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400',
      gudbro: true,
      distance: 'Pickup',
    },
    {
      id: 'm2',
      name: 'Motorbike Rental',
      partner: 'Easy Ride',
      discount: '15%',
      price: '$8/day',
      originalPrice: '$10/day',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      gudbro: false,
      contact: 'tel:+84905123456',
      distance: '500 m',
    },
  ],
};

// Delivery apps for the region
const deliveryApps = [
  { name: 'Grab', color: 'bg-[#00B14F]', url: 'https://grab.onelink.me/2695613898' },
  { name: 'ShopeeFood', color: 'bg-[#EE4D2D]', url: 'https://shopee.vn/m/shopeefood' },
  { name: 'Baemin', color: 'bg-[#3BD1C7]', url: 'https://baemin.vn' },
];

const quickActions = [
  { id: 'room-service', name: 'Room Service', icon: '🛎️', color: 'bg-[#E07A5F]/10' },
  { id: 'concierge', name: 'Concierge', icon: '💁', color: 'bg-[#3D8B87]/10' },
  { id: 'housekeeping', name: 'Housekeeping', icon: '🧹', color: 'bg-amber-500/10' },
  { id: 'report', name: 'Report Issue', icon: '⚠️', color: 'bg-red-50' },
];

const LANGUAGES = [
  { code: 'en', flag: '🇬🇧' },
  { code: 'vi', flag: '🇻🇳' },
  { code: 'ko', flag: '🇰🇷' },
  { code: 'zh', flag: '🇨🇳' },
  { code: 'ja', flag: '🇯🇵' },
];

const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'VND', symbol: '₫' },
  { code: 'EUR', symbol: '€' },
];

type DealTab = 'tours' | 'food' | 'more';

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function InStayDashboard({ params: _params }: { params: { code: string } }) {
  const [copiedWifi, setCopiedWifi] = useState(false);
  const [activeNav, setActiveNav] = useState<'home' | 'services' | 'local' | 'help'>('home');
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showCurrMenu, setShowCurrMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showContactSheet, setShowContactSheet] = useState(false);
  const [showVisaInfo, setShowVisaInfo] = useState(false);
  const [dealTab, setDealTab] = useState<DealTab>('tours');

  const booking = mockBooking;

  // Calculate days remaining
  const today = new Date();
  const daysRemaining = Math.ceil(
    (booking.checkOut.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Visa days remaining
  const visaDaysRemaining = Math.ceil(
    (booking.visa.expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  const visaPercentage = Math.min(100, Math.max(0, (visaDaysRemaining / 90) * 100));

  const copyWifiPassword = () => {
    navigator.clipboard.writeText(booking.wifi.password);
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2000);
  };

  const currentCurr = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
  const currentDeals = localDeals[dealTab];

  // Get visa rules for guest's country
  const guestVisaRules = VISA_RULES[booking.guestCountry] || VISA_RULES.DEFAULT;
  const hasExemption = guestVisaRules.exemptionDays !== null;

  // Country names and flags
  const COUNTRY_INFO: Record<string, { name: string; flag: string; embassy: string }> = {
    IT: { name: 'Italy', flag: '🇮🇹', embassy: 'https://ambhanoi.esteri.it' },
    DE: { name: 'Germany', flag: '🇩🇪', embassy: 'https://vietnam.diplo.de' },
    FR: { name: 'France', flag: '🇫🇷', embassy: 'https://vn.ambafrance.org' },
    GB: { name: 'United Kingdom', flag: '🇬🇧', embassy: 'https://www.gov.uk/world/vietnam' },
    US: { name: 'United States', flag: '🇺🇸', embassy: 'https://vn.usembassy.gov' },
    AU: { name: 'Australia', flag: '🇦🇺', embassy: 'https://vietnam.embassy.gov.au' },
    CN: { name: 'China', flag: '🇨🇳', embassy: 'http://vn.china-embassy.gov.cn' },
    KR: { name: 'South Korea', flag: '🇰🇷', embassy: 'https://overseas.mofa.go.kr/vn-ko' },
    JP: { name: 'Japan', flag: '🇯🇵', embassy: 'https://www.vn.emb-japan.go.jp' },
  };
  const guestCountryInfo = COUNTRY_INFO[booking.guestCountry] || {
    name: 'Your Country',
    flag: '🌍',
    embassy: '',
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-xl">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-11 w-11 overflow-hidden rounded-2xl shadow-lg shadow-[#E07A5F]/20">
                  <img
                    src={booking.property.image}
                    alt={booking.property.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {booking.property.verified && (
                  <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
                    <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-base font-semibold tracking-tight text-gray-900">
                  {booking.property.name}
                </h1>
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-gray-500">
                    {booking.property.address}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Language */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowLangMenu(!showLangMenu);
                    setShowCurrMenu(false);
                  }}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center transition-all',
                    showLangMenu ? 'text-[#E07A5F]' : 'text-gray-400 hover:text-gray-500'
                  )}
                >
                  <svg
                    className="h-6 w-6"
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
                {showLangMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowLangMenu(false)} />
                    <div className="absolute right-0 top-full z-20 mt-2 min-w-[140px] rounded-2xl border border-gray-200 bg-white/95 py-2 shadow-xl backdrop-blur-xl">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setShowLangMenu(false);
                          }}
                          className={cn(
                            'flex w-full items-center gap-3 px-4 py-2.5 text-sm',
                            language === lang.code
                              ? 'bg-[#E07A5F]/10 text-[#E07A5F]'
                              : 'text-gray-700 hover:bg-gray-50'
                          )}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="font-medium uppercase">{lang.code}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Currency */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowCurrMenu(!showCurrMenu);
                    setShowLangMenu(false);
                  }}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center text-lg font-medium transition-all',
                    showCurrMenu ? 'text-[#E07A5F]' : 'text-gray-400 hover:text-gray-500'
                  )}
                >
                  {currentCurr.symbol}
                </button>
                {showCurrMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowCurrMenu(false)} />
                    <div className="absolute right-0 top-full z-20 mt-2 min-w-[120px] rounded-2xl border border-gray-200 bg-white/95 py-2 shadow-xl backdrop-blur-xl">
                      {CURRENCIES.map((curr) => (
                        <button
                          key={curr.code}
                          onClick={() => {
                            setCurrency(curr.code);
                            setShowCurrMenu(false);
                          }}
                          className={cn(
                            'flex w-full items-center gap-3 px-4 py-2.5 text-sm',
                            currency === curr.code
                              ? 'bg-[#E07A5F]/10 font-semibold text-[#E07A5F]'
                              : 'text-gray-700 hover:bg-gray-50'
                          )}
                        >
                          <span className="w-5 text-center font-semibold">{curr.symbol}</span>
                          <span>{curr.code}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTACT SHEET */}
      {showContactSheet && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 animate-[fadeIn_0.3s_ease-out] bg-black/50"
            onClick={() => setShowContactSheet(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 animate-[slideUp_0.3s_ease-out] rounded-t-3xl bg-white p-5 pb-24">
            <div className="mb-4 flex justify-center">
              <div className="h-1 w-10 rounded-full bg-gray-300" />
            </div>
            <div className="mb-5 flex items-center gap-3">
              <img
                src={booking.host.photo}
                alt={booking.host.name}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{booking.host.name}</h3>
                <p className="text-sm text-gray-500">Responds {booking.host.responseTime}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {booking.host.channels.map((channel) => (
                <a
                  key={channel.type}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl bg-[#FAF8F5] p-4 transition-colors hover:bg-[#3D8B87]/10"
                >
                  <span className="text-2xl">{channel.icon}</span>
                  <span className="font-medium text-gray-900">{channel.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VISA INFO SHEET */}
      {showVisaInfo && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 animate-[fadeIn_0.3s_ease-out] bg-black/50"
            onClick={() => setShowVisaInfo(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] animate-[slideUp_0.3s_ease-out] overflow-y-auto rounded-t-3xl bg-white p-5 pb-24">
            <div className="mb-4 flex justify-center">
              <div className="h-1 w-10 rounded-full bg-gray-300" />
            </div>

            {/* Header */}
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3D8B87]/10">
                <span className="text-2xl">🛂</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-gray-900">
                  Visa Information
                </h3>
                <p className="text-xs text-[#8B7355]">
                  Last updated:{' '}
                  {booking.visa.lastUpdated.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {/* Guest Country Badge */}
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-[#3D8B87]/10 p-3">
              <span className="text-2xl">{guestCountryInfo.flag}</span>
              <div>
                <p className="text-sm font-semibold text-[#2D2016]">
                  {guestCountryInfo.name} Passport
                </p>
                <p className="text-xs text-[#3D8B87]">
                  {hasExemption
                    ? `${guestVisaRules.exemptionDays} days visa-free`
                    : 'E-Visa required'}
                </p>
              </div>
            </div>

            {/* Visa Details Grid */}
            <div className="mb-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#FAF8F5] p-3">
                <p className="mb-1 text-[10px] uppercase tracking-wide text-[#8B7355]">Your Visa</p>
                <p className="font-semibold text-[#2D2016]">{booking.visa.type}</p>
              </div>
              <div className="rounded-xl bg-[#FAF8F5] p-3">
                <p className="mb-1 text-[10px] uppercase tracking-wide text-[#8B7355]">Max Stay</p>
                <p className="font-semibold text-[#2D2016]">{guestVisaRules.evisaDays} days</p>
              </div>
              <div className="rounded-xl bg-[#FAF8F5] p-3">
                <p className="mb-1 text-[10px] uppercase tracking-wide text-[#8B7355]">Entries</p>
                <p className="font-semibold text-[#2D2016]">{booking.visa.entries}</p>
              </div>
              <div className="rounded-xl bg-[#FAF8F5] p-3">
                <p className="mb-1 text-[10px] uppercase tracking-wide text-[#8B7355]">Purpose</p>
                <p className="font-semibold text-[#2D2016]">{booking.visa.purpose}</p>
              </div>
            </div>

            {/* Expiry Status */}
            <div className="mb-5 rounded-xl bg-gradient-to-r from-[#3D8B87]/10 to-[#3D8B87]/5 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-[#2D2016]">Valid until</span>
                <span
                  className={cn(
                    'text-sm font-bold',
                    visaDaysRemaining > 14
                      ? 'text-emerald-600'
                      : visaDaysRemaining > 7
                        ? 'text-amber-600'
                        : 'text-red-600'
                  )}
                >
                  {visaDaysRemaining} days remaining
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white">
                <div
                  className={cn(
                    'h-full rounded-full',
                    visaDaysRemaining > 14
                      ? 'bg-emerald-500'
                      : visaDaysRemaining > 7
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                  )}
                  style={{ width: `${visaPercentage}%` }}
                />
              </div>
              <p className="mt-2 text-center text-xs font-medium text-[#3D8B87]">
                {booking.visa.expiryDate.toLocaleDateString('en-GB', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>

            {/* Country-specific Notes */}
            <div className="mb-5">
              <h4 className="mb-2 text-sm font-semibold text-[#2D2016]">
                For {guestCountryInfo.name} Citizens
              </h4>
              <div className="space-y-2">
                {guestVisaRules.notes.map((note, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-[#8B7355]">
                    <span className="mt-0.5 text-[#3D8B87]">ℹ️</span>
                    <span>{note}</span>
                  </div>
                ))}
                <div className="flex items-start gap-2 text-sm text-[#8B7355]">
                  <span className="mt-0.5 text-amber-500">⚠️</span>
                  <span>Overstay penalty: ~$25/day + potential entry ban</span>
                </div>
              </div>
            </div>

            {/* Official Links - Dynamic based on country */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-[#2D2016]">Official Resources</h4>
              <div className="space-y-2">
                <a
                  href="https://evisa.xuatnhapcanh.gov.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-[#FAF8F5] p-3 transition-colors hover:bg-[#3D8B87]/10"
                >
                  <span className="text-xl">🏛️</span>
                  <span className="flex-1 font-medium text-[#2D2016]">Vietnam E-Visa Portal</span>
                  <svg
                    className="h-5 w-5 text-[#8B7355]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
                <a
                  href="https://evisa.gov.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-[#FAF8F5] p-3 transition-colors hover:bg-[#3D8B87]/10"
                >
                  <span className="text-xl">🌐</span>
                  <span className="flex-1 font-medium text-[#2D2016]">Immigration Department</span>
                  <svg
                    className="h-5 w-5 text-[#8B7355]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
                {guestCountryInfo.embassy && (
                  <a
                    href={guestCountryInfo.embassy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl bg-[#FAF8F5] p-3 transition-colors hover:bg-[#3D8B87]/10"
                  >
                    <span className="text-xl">{guestCountryInfo.flag}</span>
                    <span className="flex-1 font-medium text-[#2D2016]">
                      {guestCountryInfo.name} Embassy
                    </span>
                    <svg
                      className="h-5 w-5 text-[#8B7355]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BENTO MENU */}
      {showMenu && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 animate-[fadeIn_0.3s_ease-out] bg-black/50"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 animate-[slideUp_0.3s_ease-out] rounded-t-3xl bg-white p-5 pb-24">
            <div className="mb-5 flex justify-center">
              <div className="h-1 w-10 rounded-full bg-gray-300" />
            </div>
            <div className="mb-6 grid grid-cols-4 gap-3">
              {[
                { icon: '🍳', label: 'Breakfast' },
                { icon: '🍹', label: 'Minibar' },
                { icon: '👔', label: 'Laundry' },
                { icon: '💆', label: 'Spa' },
                { icon: '🛵', label: 'Delivery' },
                { icon: '🗺️', label: 'Tours' },
                { icon: '🛂', label: 'Visa Help' },
                { icon: '📞', label: 'Contact' },
              ].map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setShowMenu(false)}
                  className="flex flex-col items-center gap-2 rounded-2xl bg-gray-50 p-3 transition-all hover:bg-gray-100"
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-[10px] font-medium text-gray-600">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="pb-20">
        {/* WiFi Card */}
        <section className="px-4 py-3">
          <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#3D8B87] to-[#2D7A76] p-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3C7.03 3 2.89 5.67 1 9.5l1.83 1.83C4.48 8.5 7.98 6.5 12 6.5s7.52 2 9.17 4.83L23 9.5C21.11 5.67 16.97 3 12 3zm0 7c-2.76 0-5.19 1.45-6.55 3.63L7.28 15.5c.92-1.44 2.6-2.5 4.72-2.5s3.8 1.06 4.72 2.5l1.83-1.87C17.19 11.45 14.76 10 12 10zm0 5c-1.38 0-2.5 1.12-2.5 2.5S10.62 20 12 20s2.5-1.12 2.5-2.5S13.38 15 12 15z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-white/70">WiFi</p>
              <div className="flex items-center gap-2">
                <span className="truncate font-semibold text-white">{booking.wifi.network}</span>
                <span className="text-white/40">•</span>
                <span className="font-mono text-sm text-white">{booking.wifi.password}</span>
              </div>
            </div>
            <button
              onClick={copyWifiPassword}
              className="flex-shrink-0 rounded-lg bg-white/20 px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-white/30"
            >
              {copiedWifi ? '✓' : 'Copy'}
            </button>
          </div>
        </section>

        {/* Welcome + Compact Stay Card */}
        <section className="mb-4 px-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm text-[#8B7355]">Welcome back</p>
              <h2 className="font-display text-2xl font-semibold text-[#2D2016]">
                {booking.guestName.split(' ')[0]} 👋
              </h2>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-[#2D2016]">{booking.unit.name}</p>
              <div className="inline-block rounded-full bg-[#E07A5F]/10 px-2 py-0.5">
                <span className="text-xs font-semibold text-[#E07A5F]">{daysRemaining}d left</span>
              </div>
            </div>
          </div>
        </section>

        {/* Visa Status Card (if uploaded) */}
        {booking.visa.uploaded && (
          <section className="mb-4 px-4">
            <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm">
              {/* Header Row */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛂</span>
                  <span className="font-semibold text-[#2D2016]">Visa Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#3D8B87]/10 px-2 py-0.5 text-[10px] font-semibold text-[#3D8B87]">
                    {booking.visa.type}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3 flex items-center gap-3">
                <div className="flex-1">
                  <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        visaDaysRemaining > 14
                          ? 'bg-emerald-500'
                          : visaDaysRemaining > 7
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                      )}
                      style={{ width: `${visaPercentage}%` }}
                    />
                  </div>
                </div>
                <span
                  className={cn(
                    'min-w-[40px] text-right text-sm font-bold',
                    visaDaysRemaining > 14
                      ? 'text-emerald-600'
                      : visaDaysRemaining > 7
                        ? 'text-amber-600'
                        : 'text-red-600'
                  )}
                >
                  {visaDaysRemaining}d
                </span>
              </div>

              {/* Info Row */}
              <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3 text-xs text-[#8B7355]">
                <span>
                  Expires:{' '}
                  {booking.visa.expiryDate.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <span>
                  Updated:{' '}
                  {booking.visa.lastUpdated.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </span>
              </div>

              {/* Two CTAs: Extension Partner + Visa Info */}
              <div className="flex gap-2">
                {/* Extension CTA - Links to visa partner */}
                {booking.visaPartner && (
                  <a
                    href={booking.visaPartner.contact}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#E07A5F] py-2.5 transition-colors hover:bg-[#C4634B] active:scale-[0.98]"
                  >
                    <span className="text-sm font-semibold text-white">Extension</span>
                    <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      -{booking.visaPartner.discount}
                    </span>
                  </a>
                )}
                {/* Info Visa CTA - Links to visa info page */}
                <button
                  onClick={() => setShowVisaInfo(true)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#3D8B87]/10 py-2.5 transition-colors hover:bg-[#3D8B87]/20 active:scale-[0.98]"
                >
                  <svg
                    className="h-4 w-4 text-[#3D8B87]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-[#3D8B87]">Info Visa</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Quick Actions */}
        <section className="mb-5 px-4">
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((action) => (
              <button
                key={action.id}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-[#E8E2D9] bg-white p-3 shadow-sm transition-all hover:shadow-md active:scale-95"
              >
                <div
                  className={`h-10 w-10 rounded-xl ${action.color} flex items-center justify-center text-lg`}
                >
                  {action.icon}
                </div>
                <span className="text-center text-[10px] font-medium leading-tight text-[#2D2016]">
                  {action.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="mb-5">
          <div className="mb-3 flex items-center justify-between px-4">
            <h2 className="font-display text-base font-semibold text-[#2D2016]">Services</h2>
            <button className="text-sm font-medium text-[#3D8B87]">View All</button>
          </div>
          <div className="hide-scrollbar flex gap-3 overflow-x-auto px-4 pb-2">
            {services.map((service) => (
              <div
                key={service.id}
                className="w-28 flex-shrink-0 overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white shadow-sm"
              >
                <div
                  className={`h-14 bg-gradient-to-br ${service.gradient} flex items-center justify-center text-2xl`}
                >
                  {service.icon}
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-semibold text-[#2D2016]">{service.name}</h3>
                  <span className="text-[10px] font-medium text-[#E07A5F]">{service.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Local Deals with Tabs */}
        <section className="mb-5">
          <div className="mb-3 px-4">
            <h2 className="font-display text-base font-semibold text-[#2D2016]">Local Deals</h2>
            <p className="text-[10px] text-[#8B7355]">Exclusive discounts for guests</p>
          </div>

          {/* Tabs */}
          <div className="hide-scrollbar mb-3 flex gap-2 overflow-x-auto px-4">
            {[
              { id: 'tours' as DealTab, label: 'Tours', icon: '🗺️' },
              { id: 'food' as DealTab, label: 'Food & Drinks', icon: '🍽️' },
              { id: 'more' as DealTab, label: 'More', icon: '✨' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setDealTab(tab.id)}
                className={cn(
                  'flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-all',
                  dealTab === tab.id
                    ? 'bg-[#E07A5F] text-white'
                    : 'border border-[#E8E2D9] bg-white text-[#8B7355]'
                )}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Delivery Apps Row - Only show in Food tab */}
          {dealTab === 'food' && (
            <div className="mb-4 px-4">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-base">🛵</span>
                <span className="text-sm font-semibold text-[#2D2016]">Delivery Apps</span>
              </div>
              <div className="flex gap-3">
                {deliveryApps.map((app) => (
                  <a
                    key={app.name}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 flex-col items-center gap-2 rounded-2xl border border-[#E8E2D9] bg-white p-4 transition-all hover:border-[#3D8B87] hover:shadow-md active:scale-95"
                  >
                    <div
                      className={`h-12 w-12 ${app.color} flex items-center justify-center rounded-xl text-xl font-bold text-white shadow-lg`}
                    >
                      {app.name.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-[#2D2016]">{app.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Deal Cards */}
          <div className="flex flex-col gap-2.5 px-4">
            {currentDeals.map((deal) => (
              <div
                key={deal.id}
                className={cn(
                  'flex gap-3 rounded-xl border bg-white p-2.5 shadow-sm',
                  deal.gudbro ? 'border-[#3D8B87]/30' : 'border-[#E8E2D9]'
                )}
              >
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                  <img src={deal.image} alt={deal.name} className="h-full w-full object-cover" />
                  {deal.discount && (
                    <div className="absolute left-1 top-1 rounded-full bg-[#E07A5F] px-1.5 py-0.5 text-[9px] font-bold text-white">
                      -{deal.discount}
                    </div>
                  )}
                  {/* GUDBRO badge */}
                  {deal.gudbro && (
                    <div className="absolute bottom-1 left-1 flex items-center gap-0.5 rounded-full bg-[#3D8B87] px-1.5 py-0.5 text-[7px] font-bold text-white">
                      <svg className="h-2 w-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      GUDBRO
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1 py-0.5">
                  <div className="mb-0.5 flex items-start justify-between gap-2">
                    <h3 className="truncate text-sm font-semibold text-[#2D2016]">{deal.name}</h3>
                    {'tag' in deal && deal.tag ? (
                      <span className="flex-shrink-0 rounded-full bg-[#3D8B87]/10 px-1.5 py-0.5 text-[9px] font-medium text-[#3D8B87]">
                        {String(deal.tag)}
                      </span>
                    ) : null}
                  </div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-[10px] text-[#8B7355]">{deal.partner}</span>
                    {deal.distance && (
                      <span className="flex items-center gap-0.5 text-[10px] text-[#8B7355]">
                        <span>📍</span>
                        {deal.distance}
                      </span>
                    )}
                  </div>
                  {/* Delivery & Pickup badges */}
                  {(('delivery' in deal && deal.delivery) || ('pickup' in deal && deal.pickup)) && (
                    <div className="mb-1 flex flex-wrap items-center gap-1.5">
                      {/* Pickup badge */}
                      {'pickup' in deal && deal.pickup && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-1.5 py-0.5 text-[9px] font-medium text-blue-700">
                          <span>🚶</span> Pickup {deal.pickupTime}
                        </span>
                      )}
                      {/* Delivery badge */}
                      {'delivery' in deal && deal.delivery && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700">
                          <span>🛵</span> {deal.deliveryFee === 'Free' ? 'Free' : deal.deliveryFee}{' '}
                          • {deal.deliveryTime}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-bold text-[#E07A5F]">{deal.price}</span>
                      {deal.originalPrice && (
                        <span className="text-xs text-[#8B7355] line-through">
                          {deal.originalPrice}
                        </span>
                      )}
                    </div>
                    {/* CTA Button */}
                    {deal.gudbro ? (
                      <button className="rounded-lg bg-[#3D8B87] px-2.5 py-1 text-[10px] font-semibold text-white">
                        Order
                      </button>
                    ) : (
                      <a
                        href={deal.contact}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-[#E8E2D9] px-2.5 py-1 text-[10px] font-semibold text-[#2D2016]"
                      >
                        Contact
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Useful Numbers */}
        <section className="mb-5">
          <div className="mb-3 px-4">
            <h2 className="font-display text-base font-semibold text-[#2D2016]">Useful Numbers</h2>
            <p className="text-[10px] text-[#8B7355]">{booking.usefulNumbers.city} • Tap to call</p>
          </div>

          {/* Emergency Numbers Row */}
          <div className="mb-3 flex gap-2 px-4">
            {booking.usefulNumbers.emergency.map((item) => (
              <a
                key={item.name}
                href={`tel:${item.number}`}
                className="flex flex-1 flex-col items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 p-3 transition-all active:scale-95"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-[10px] font-semibold text-red-600">{item.name}</span>
                <span className="text-xs font-bold text-red-700">{item.number}</span>
              </a>
            ))}
          </div>

          {/* Local Services */}
          <div className="mb-3 flex flex-col gap-2 px-4">
            {booking.usefulNumbers.local.map((item) => (
              <a
                key={item.name}
                href={item.isApp ? item.url : `tel:${item.number.replace(/\s/g, '')}`}
                className="flex items-center gap-3 rounded-xl border border-[#E8E2D9] bg-white p-3 transition-all active:scale-[0.98]"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#3D8B87]/10">
                  <span className="text-lg">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-[#2D2016]">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-[#3D8B87]">{item.number}</span>
              </a>
            ))}
          </div>

          {/* Property Emergency */}
          <div className="px-4">
            <a
              href={`tel:${booking.usefulNumbers.property.number.replace(/\s/g, '')}`}
              className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#3D8B87] to-[#2D7A76] p-3 transition-all active:scale-[0.98]"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
                <span className="text-lg">🏠</span>
              </div>
              <div className="flex-1">
                <span className="text-sm font-semibold text-white">
                  {booking.usefulNumbers.property.name}
                </span>
                <p className="text-[10px] text-white/70">
                  Available {booking.usefulNumbers.property.available}
                </p>
              </div>
              <div className="flex items-center gap-1 text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
            </a>
          </div>
        </section>

        {/* Return Discount Banner */}
        <section className="mb-5 px-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#E07A5F] to-[#C4634B] p-4">
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10" />
            <div className="relative z-10">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="text-xl">🎁</span>
                <span className="text-xs font-medium text-white/80">Guest Exclusive</span>
              </div>
              <h3 className="font-display mb-0.5 text-base font-semibold text-white">
                Book again & save 10%
              </h3>
              <p className="mb-2 text-xs text-white/70">Code: RETURN10</p>
              <button className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-[#E07A5F]">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-around px-4">
          {/* Home */}
          <button
            onClick={() => setActiveNav('home')}
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-2xl transition-all',
              activeNav === 'home' ? 'scale-110 text-[#E07A5F]' : 'text-gray-400'
            )}
          >
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill={activeNav === 'home' ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={activeNav === 'home' ? 0 : 1.5}
            >
              {activeNav === 'home' ? (
                <>
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198c.03-.028.061-.056.091-.086L12 5.43z" />
                </>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              )}
            </svg>
          </button>

          {/* Services */}
          <button
            onClick={() => setActiveNav('services')}
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-2xl transition-all',
              activeNav === 'services' ? 'scale-110 text-[#E07A5F]' : 'text-gray-400'
            )}
          >
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill={activeNav === 'services' ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={activeNav === 'services' ? 0 : 1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </button>

          {/* Bento Menu */}
          <button
            onClick={() => setShowMenu(true)}
            className="flex h-12 w-12 items-center justify-center rounded-2xl text-gray-400 transition-all hover:scale-105 active:scale-95"
          >
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-1.5 w-1.5 rounded-full bg-gray-400" />
              ))}
            </div>
          </button>

          {/* Local */}
          <button
            onClick={() => setActiveNav('local')}
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-2xl transition-all',
              activeNav === 'local' ? 'scale-110 text-[#E07A5F]' : 'text-gray-400'
            )}
          >
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill={activeNav === 'local' ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={activeNav === 'local' ? 0 : 1.5}
            >
              {activeNav === 'local' ? (
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              ) : (
                <>
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
                </>
              )}
            </svg>
          </button>

          {/* Help/Contact - Opens messaging channels */}
          <button
            onClick={() => setShowContactSheet(true)}
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-2xl transition-all',
              activeNav === 'help' ? 'scale-110 text-[#E07A5F]' : 'text-gray-400'
            )}
          >
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill={activeNav === 'help' ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={activeNav === 'help' ? 0 : 1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
}
