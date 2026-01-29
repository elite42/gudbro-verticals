'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/* =============================================================================
   MOCK DATA
   ============================================================================= */

const LANGUAGES = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'vi', flag: '🇻🇳', name: 'Tiếng Việt' },
  { code: 'ko', flag: '🇰🇷', name: '한국어' },
  { code: 'zh', flag: '🇨🇳', name: '中文' },
];

const CURRENCIES = [
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'KRW', symbol: '₩', name: 'Korean Won' },
];

const SYMPTOMS = [
  { key: 'headache', label: 'Headache', emoji: '🤕', vi: 'Đau đầu' },
  { key: 'stomach', label: 'Stomach', emoji: '🤢', vi: 'Đau bụng' },
  { key: 'diarrhea', label: 'Diarrhea', emoji: '💧', vi: 'Tiêu chảy' },
  { key: 'allergy', label: 'Allergy', emoji: '🤧', vi: 'Dị ứng' },
  { key: 'cold', label: 'Cold & Flu', emoji: '🤒', vi: 'Cảm cúm' },
  { key: 'sunburn', label: 'Sunburn', emoji: '☀️', vi: 'Cháy nắng' },
  { key: 'insect_bite', label: 'Insect Bite', emoji: '🦟', vi: 'Côn trùng cắn' },
  { key: 'muscle_pain', label: 'Muscle Pain', emoji: '💪', vi: 'Đau cơ' },
  { key: 'fever', label: 'Fever', emoji: '🌡️', vi: 'Sốt' },
  { key: 'wound', label: 'Wound', emoji: '🩹', vi: 'Vết thương' },
  { key: 'motion', label: 'Motion Sick', emoji: '🚗', vi: 'Say xe' },
  { key: 'dehydration', label: 'Dehydrated', emoji: '💦', vi: 'Mất nước' },
];

const CATEGORIES = [
  { key: 'pain_relief', label: 'Pain Relief', emoji: '💊', color: '#EDE9FE', textColor: '#7C3AED' },
  { key: 'stomach', label: 'Stomach', emoji: '🫃', color: '#FFF8EB', textColor: '#C48B20' },
  { key: 'allergy', label: 'Allergy', emoji: '🤧', color: '#FEF3C7', textColor: '#A16207' },
  { key: 'cold_flu', label: 'Cold & Flu', emoji: '🤒', color: '#E0F2FE', textColor: '#0369A1' },
  { key: 'skincare', label: 'Skincare', emoji: '☀️', color: '#FCE7F3', textColor: '#BE185D' },
  { key: 'first_aid', label: 'First Aid', emoji: '🩹', color: '#FEF2F2', textColor: '#DC2626' },
  { key: 'vitamins', label: 'Vitamins', emoji: '💪', color: '#ECFDF5', textColor: '#047857' },
  { key: 'insect', label: 'Insects', emoji: '🦟', color: '#F0FDF4', textColor: '#15803D' },
];

const PRODUCTS = [
  {
    id: 1,
    nameEn: 'Paracetamol 500mg',
    nameBrand: 'Panadol',
    nameVi: 'Thuốc giảm đau',
    generic: 'Acetaminophen',
    price: 25000,
    type: 'otc',
    category: 'pain_relief',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop',
  },
  {
    id: 2,
    nameEn: 'Ibuprofen 400mg',
    nameBrand: 'Advil',
    nameVi: 'Thuốc kháng viêm',
    generic: 'Ibuprofen',
    price: 35000,
    type: 'otc',
    category: 'pain_relief',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop',
  },
  {
    id: 3,
    nameEn: 'Loperamide 2mg',
    nameBrand: 'Imodium',
    nameVi: 'Thuốc trị tiêu chảy',
    generic: 'Loperamide',
    price: 30000,
    type: 'otc',
    category: 'stomach',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop',
  },
  {
    id: 4,
    nameEn: 'ORS Electrolytes',
    nameBrand: 'Oresol',
    nameVi: 'Bù điện giải',
    generic: 'Oral Rehydration Salts',
    price: 8000,
    type: 'otc',
    category: 'stomach',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=200&h=200&fit=crop',
  },
  {
    id: 5,
    nameEn: 'Cetirizine 10mg',
    nameBrand: 'Zyrtec',
    nameVi: 'Thuốc dị ứng',
    generic: 'Cetirizine HCl',
    price: 20000,
    type: 'otc',
    category: 'allergy',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop',
  },
  {
    id: 6,
    nameEn: 'Amoxicillin 500mg',
    nameBrand: 'Amoxil',
    nameVi: 'Kháng sinh',
    generic: 'Amoxicillin',
    price: 45000,
    type: 'prescription',
    category: 'antibiotics',
    image: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=200&h=200&fit=crop',
  },
  {
    id: 7,
    nameEn: 'Sunscreen SPF50+',
    nameBrand: 'Bioré UV',
    nameVi: 'Kem chống nắng',
    generic: 'UV Protection',
    price: 120000,
    type: 'otc',
    category: 'skincare',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop',
  },
  {
    id: 8,
    nameEn: 'Tiger Balm',
    nameBrand: 'Tiger Balm',
    nameVi: 'Dầu con hổ',
    generic: 'Camphor + Menthol',
    price: 40000,
    type: 'otc',
    category: 'pain_relief',
    image: 'https://images.unsplash.com/photo-1616671276441-2f2c277b8bf6?w=200&h=200&fit=crop',
  },
];

const REVIEWS = [
  {
    id: 1,
    name: 'Sarah M.',
    country: '🇦🇺',
    rating: 5,
    text: 'Lifesaver! I had terrible food poisoning and they helped me find exactly what I needed. The English labels on everything made it so easy.',
    date: '3 days ago',
  },
  {
    id: 2,
    name: 'Kim J.',
    country: '🇰🇷',
    rating: 5,
    text: '약 이름을 영어로 검색할 수 있어서 너무 편했어요. 배달도 30분만에 왔습니다!',
    date: '1 week ago',
  },
  {
    id: 3,
    name: 'Marco P.',
    country: '🇮🇹',
    rating: 4,
    text: 'Fair prices, no tourist markup. They even warned me about a medicine that needs prescription here. Very honest pharmacy.',
    date: '2 weeks ago',
  },
];

const INFO_CARDS = [
  {
    icon: '✅',
    title: 'OTC Medicines',
    desc: 'Most pain relievers, antacids, and antihistamines are available without prescription',
    color: 'var(--green-light)',
    borderColor: 'var(--green)',
  },
  {
    icon: '⚠️',
    title: 'Controlled Substances',
    desc: 'Codeine, Diazepam, Zolpidem and others are restricted in Vietnam',
    color: 'var(--red-light)',
    borderColor: 'var(--red)',
  },
  {
    icon: '💰',
    title: 'Price Guide',
    desc: 'Paracetamol from 25k₫, Ibuprofen from 35k₫, ORS from 8k₫',
    color: 'var(--amber-light)',
    borderColor: 'var(--amber)',
  },
];

/* =============================================================================
   HELPERS
   ============================================================================= */

function formatPrice(vnd: number, currency: string): string {
  if (currency === 'VND') return `${Math.round(vnd / 1000)}k₫`;
  if (currency === 'USD') return `$${(vnd * 0.00004).toFixed(2)}`;
  if (currency === 'EUR') return `€${(vnd * 0.000037).toFixed(2)}`;
  if (currency === 'KRW') return `₩${Math.round(vnd * 0.054)}`;
  return `${Math.round(vnd / 1000)}k₫`;
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
          fill={star <= rating ? '#E8A838' : '#E5E7EB'}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

/* =============================================================================
   MAIN COMPONENT
   ============================================================================= */

export default function PharmacyHomePage() {
  const [selectedLang, setSelectedLang] = useState('en');
  const [selectedCurrency, setSelectedCurrency] = useState('VND');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSymptom, setActiveSymptom] = useState<string | null>(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showCurrMenu, setShowCurrMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];
  const currentCurr = CURRENCIES.find((c) => c.code === selectedCurrency) || CURRENCIES[0];

  const isOpen = (() => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    if (day === 0) return hour >= 8 && hour < 20;
    return hour >= 7 && hour < 21;
  })();

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--cloud)' }}>
      {/* ================================================================
          HEADER — Sticky, glass, compact
          ================================================================ */}
      <header
        className="glass sticky top-0 z-40 border-b"
        style={{ borderColor: 'rgba(45, 159, 131, 0.12)' }}
      >
        <div className="mx-auto max-w-lg px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo + Name */}
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, var(--green) 0%, var(--green-dark) 100%)',
                  boxShadow: '0 2px 8px rgba(45, 159, 131, 0.3)',
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v6M9 5h6" />
                  <rect x="4" y="8" width="16" height="14" rx="2" />
                </svg>
              </div>
              <div>
                <h1
                  className="font-display text-[15px] font-bold leading-tight"
                  style={{ color: 'var(--charcoal)', letterSpacing: '-0.02em' }}
                >
                  MediViet
                </h1>
                <p
                  className="text-[10px] font-medium uppercase tracking-wide"
                  style={{ color: 'var(--green)' }}
                >
                  Your Health, Translated
                </p>
              </div>
            </div>

            {/* Language + Currency selectors */}
            <div className="flex items-center gap-1.5">
              {/* Language */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowLangMenu(!showLangMenu);
                    setShowCurrMenu(false);
                  }}
                  className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors"
                  style={{
                    background: showLangMenu ? 'var(--green-light)' : 'transparent',
                    color: 'var(--charcoal-light)',
                  }}
                >
                  <span className="text-sm">{currentLang.flag}</span>
                  <span className="text-[11px]">{currentLang.code.toUpperCase()}</span>
                </button>
                {showLangMenu && (
                  <div
                    className="shadow-soft-lg animate-fade-in absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-xl border bg-white py-1"
                    style={{ borderColor: 'var(--cloud-dark)' }}
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLang(lang.code);
                          setShowLangMenu(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-xs transition-colors hover:bg-gray-50"
                        style={{
                          color: lang.code === selectedLang ? 'var(--green)' : 'var(--charcoal)',
                          fontWeight: lang.code === selectedLang ? 600 : 400,
                        }}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                        {lang.code === selectedLang && (
                          <svg
                            className="ml-auto"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="var(--green)"
                            stroke="none"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Currency */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowCurrMenu(!showCurrMenu);
                    setShowLangMenu(false);
                  }}
                  className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors"
                  style={{
                    background: showCurrMenu ? 'var(--green-light)' : 'transparent',
                    color: 'var(--charcoal-light)',
                  }}
                >
                  <span className="text-[11px] font-semibold">{currentCurr.symbol}</span>
                  <span className="text-[11px]">{currentCurr.code}</span>
                </button>
                {showCurrMenu && (
                  <div
                    className="shadow-soft-lg animate-fade-in absolute right-0 top-full z-50 mt-1 min-w-[160px] rounded-xl border bg-white py-1"
                    style={{ borderColor: 'var(--cloud-dark)' }}
                  >
                    {CURRENCIES.map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          setSelectedCurrency(curr.code);
                          setShowCurrMenu(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-xs transition-colors hover:bg-gray-50"
                        style={{
                          color:
                            curr.code === selectedCurrency ? 'var(--green)' : 'var(--charcoal)',
                          fontWeight: curr.code === selectedCurrency ? 600 : 400,
                        }}
                      >
                        <span className="w-5 font-semibold">{curr.symbol}</span>
                        <span>{curr.name}</span>
                        {curr.code === selectedCurrency && (
                          <svg
                            className="ml-auto"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="var(--green)"
                            stroke="none"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Click-away overlay for dropdowns */}
      {(showLangMenu || showCurrMenu) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowLangMenu(false);
            setShowCurrMenu(false);
          }}
        />
      )}

      <main className="mx-auto max-w-lg px-4">
        {/* ================================================================
            SYMPTOM SEARCH — Hero section
            ================================================================ */}
        <section className={`mt-5 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Decorative cross pattern */}
          <div className="relative">
            <div
              className="absolute -right-2 -top-2 h-20 w-20 opacity-[0.04]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 0h4v40h-4zM0 18h40v4H0z' fill='%232D9F83' fill-opacity='1'/%3E%3C/svg%3E")`,
                backgroundSize: '20px 20px',
              }}
            />

            <div
              className="relative overflow-hidden rounded-2xl p-5"
              style={{
                background:
                  'linear-gradient(165deg, #ffffff 0%, var(--green-light) 50%, var(--mint-light) 100%)',
                boxShadow: '0 1px 3px rgba(45, 159, 131, 0.08)',
              }}
            >
              {/* Subtle medical cross watermark */}
              <div className="absolute right-3 top-3 opacity-[0.06]">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="var(--green-dark)"
                  stroke="none"
                >
                  <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7z" />
                </svg>
              </div>

              <p
                className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em]"
                style={{ color: 'var(--green)' }}
              >
                Symptom Search
              </p>
              <h2
                className="font-display mb-4 text-xl font-bold"
                style={{ color: 'var(--charcoal)', letterSpacing: '-0.02em' }}
              >
                What&rsquo;s bothering you?
              </h2>

              {/* Search Input */}
              <div className="relative mb-4">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--charcoal-muted)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search medicine, symptom, or brand name..."
                  className="w-full rounded-xl border-0 py-3 pl-10 pr-4 text-sm transition-shadow focus:ring-2 focus:ring-[var(--green)]"
                  style={{
                    background: 'white',
                    color: 'var(--charcoal)',
                    boxShadow:
                      '0 1px 4px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(45, 159, 131, 0.15)',
                  }}
                />
              </div>

              {/* Symptom Pills */}
              <div className="hide-scrollbar -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1">
                {SYMPTOMS.map((symptom) => (
                  <button
                    key={symptom.key}
                    onClick={() =>
                      setActiveSymptom(activeSymptom === symptom.key ? null : symptom.key)
                    }
                    className="flex flex-shrink-0 snap-start items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all"
                    style={{
                      background: activeSymptom === symptom.key ? 'var(--green)' : 'white',
                      color: activeSymptom === symptom.key ? 'white' : 'var(--charcoal)',
                      boxShadow:
                        activeSymptom === symptom.key
                          ? '0 2px 8px rgba(45, 159, 131, 0.35)'
                          : '0 1px 3px rgba(0,0,0,0.06)',
                      transform: activeSymptom === symptom.key ? 'scale(1.05)' : 'scale(1)',
                    }}
                  >
                    <span className="text-sm">{symptom.emoji}</span>
                    <span>{symptom.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            CATEGORIES — Horizontal scroll
            ================================================================ */}
        <section className={`mt-7 ${mounted ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
          <div className="mb-3 flex items-center justify-between">
            <h3
              className="font-display text-[15px] font-bold"
              style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
            >
              Categories
            </h3>
            <Link
              href="/products"
              className="text-xs font-medium"
              style={{ color: 'var(--green)' }}
            >
              View all →
            </Link>
          </div>

          <div className="hide-scrollbar -mx-1 flex snap-x gap-2.5 overflow-x-auto px-1 pb-1">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.key}
                href={`/products?category=${cat.key}`}
                className="flex w-[76px] flex-shrink-0 snap-start flex-col items-center gap-1.5 rounded-2xl py-3 transition-transform hover:scale-105"
                style={{
                  background: cat.color,
                }}
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span
                  className="px-1 text-center text-[10px] font-semibold leading-tight"
                  style={{ color: cat.textColor }}
                >
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ================================================================
            POPULAR PRODUCTS — 2-column grid
            ================================================================ */}
        <section className={`mt-7 ${mounted ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          <div className="mb-3 flex items-center justify-between">
            <h3
              className="font-display text-[15px] font-bold"
              style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
            >
              Popular Products
            </h3>
            <Link
              href="/products"
              className="text-xs font-medium"
              style={{ color: 'var(--green)' }}
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="shadow-soft hover-lift overflow-hidden rounded-2xl bg-white"
              >
                {/* Image */}
                <div
                  className="relative h-28"
                  style={{
                    background: `linear-gradient(135deg, var(--green-light) 0%, var(--mint-light) 100%)`,
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.nameEn}
                    className="h-full w-full object-cover opacity-80 mix-blend-multiply"
                    loading="lazy"
                  />
                  {/* OTC / Prescription badge */}
                  <span
                    className="absolute left-2 top-2 rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                    style={{
                      background: product.type === 'otc' ? 'var(--green)' : 'var(--amber)',
                      color: 'white',
                    }}
                  >
                    {product.type === 'otc' ? 'OTC' : 'Rx'}
                  </span>
                </div>

                {/* Details */}
                <div className="p-3">
                  <p
                    className="mb-0.5 text-[13px] font-semibold leading-tight"
                    style={{ color: 'var(--charcoal)' }}
                  >
                    {product.nameEn}
                  </p>
                  <p className="mb-0.5 text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
                    {product.nameVi} · {product.nameBrand}
                  </p>
                  <p
                    className="mb-2 text-[10px] italic"
                    style={{ color: 'var(--charcoal-muted)', opacity: 0.7 }}
                  >
                    {product.generic}
                  </p>
                  <p className="text-sm font-bold" style={{ color: 'var(--green-dark)' }}>
                    {formatPrice(product.price, selectedCurrency)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================================================================
            IMPORTANT INFO BANNER — Warning / Amber
            ================================================================ */}
        <section className={`mt-8 ${mounted ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
          <div
            className="relative overflow-hidden rounded-2xl p-5"
            style={{
              background:
                'linear-gradient(170deg, var(--amber-light) 0%, #FFF8EB 40%, #FFFDF7 100%)',
              border: '1px solid rgba(232, 168, 56, 0.2)',
            }}
          >
            {/* Decorative corner */}
            <div
              className="absolute -right-1 -top-1 h-16 w-16 rounded-full opacity-[0.07]"
              style={{ background: 'var(--amber)' }}
            />

            <div className="mb-3 flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <div>
                <h3
                  className="font-display text-[15px] font-bold"
                  style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
                >
                  Traveling in Vietnam?
                </h3>
                <p className="text-[11px]" style={{ color: 'var(--charcoal-muted)' }}>
                  Important medicine information for visitors
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {INFO_CARDS.map((card, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl bg-white p-3"
                  style={{
                    borderLeft: `3px solid ${card.borderColor}`,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  }}
                >
                  <span className="mt-0.5 flex-shrink-0 text-lg">{card.icon}</span>
                  <div>
                    <p
                      className="mb-0.5 text-xs font-semibold"
                      style={{ color: 'var(--charcoal)' }}
                    >
                      {card.title}
                    </p>
                    <p
                      className="text-[11px] leading-relaxed"
                      style={{ color: 'var(--charcoal-muted)' }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/info"
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold transition-colors"
              style={{
                background: 'var(--amber)',
                color: 'white',
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Read Full Guide
            </Link>
          </div>
        </section>

        {/* ================================================================
            DELIVERY SECTION
            ================================================================ */}
        <section className={`mt-7 ${mounted ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
          <div className="shadow-soft relative overflow-hidden rounded-2xl bg-white p-5">
            {/* Subtle gradient accent on top */}
            <div
              className="absolute left-0 right-0 top-0 h-1 rounded-t-2xl"
              style={{ background: 'linear-gradient(90deg, var(--green) 0%, var(--mint) 100%)' }}
            />

            <div className="mb-4 flex items-center gap-2.5">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: 'var(--green-light)' }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--green)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="1" y="3" width="15" height="13" rx="1" />
                  <path d="M16 8h4l3 3v5h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div>
                <h3
                  className="font-display text-[15px] font-bold"
                  style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
                >
                  We Deliver
                </h3>
                <p className="text-[11px]" style={{ color: 'var(--charcoal-muted)' }}>
                  Medicines to your hotel or apartment
                </p>
              </div>
            </div>

            {/* Info grid */}
            <div className="mb-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl p-2.5 text-center" style={{ background: 'var(--cloud)' }}>
                <p className="mb-0.5 text-lg">📍</p>
                <p className="text-[10px] font-semibold" style={{ color: 'var(--charcoal)' }}>
                  5 km
                </p>
                <p className="text-[9px]" style={{ color: 'var(--charcoal-muted)' }}>
                  Radius
                </p>
              </div>
              <div className="rounded-xl p-2.5 text-center" style={{ background: 'var(--cloud)' }}>
                <p className="mb-0.5 text-lg">🆓</p>
                <p className="text-[10px] font-semibold" style={{ color: 'var(--charcoal)' }}>
                  Free over 200k₫
                </p>
                <p className="text-[9px]" style={{ color: 'var(--charcoal-muted)' }}>
                  Delivery
                </p>
              </div>
              <div className="rounded-xl p-2.5 text-center" style={{ background: 'var(--cloud)' }}>
                <p className="mb-0.5 text-lg">⏱️</p>
                <p className="text-[10px] font-semibold" style={{ color: 'var(--charcoal)' }}>
                  30-60 min
                </p>
                <p className="text-[9px]" style={{ color: 'var(--charcoal-muted)' }}>
                  Estimated
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2.5">
              <a
                href="https://wa.me/+84905456789?text=Hi%20MediViet!%20I%20need%20medicine%20delivered."
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold text-white transition-transform hover:scale-[1.02]"
                style={{ background: '#25D366' }}
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
                className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold text-white transition-transform hover:scale-[1.02]"
                style={{ background: '#0068FF' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.18-.192-.42-.288-.72-.288h-1.032V6.36c0-.324-.108-.6-.324-.828-.216-.228-.504-.342-.864-.342H9.36c-.36 0-.648.114-.864.342-.216.228-.324.504-.324.828v1.512H7.152c-.3 0-.54.096-.72.288-.18.192-.27.432-.27.72v.96h11.676v-.96c0-.288-.09-.528-.27-.72zM7.884 18.24h8.232c.36 0 .648-.108.864-.324.216-.216.324-.492.324-.852V10.8H6.696v6.264c0 .36.108.636.324.852.216.216.504.324.864.324z" />
                </svg>
                Zalo
              </a>
            </div>
          </div>
        </section>

        {/* ================================================================
            NEARBY PHARMACIES — Map placeholder
            ================================================================ */}
        <section className={`mt-7 ${mounted ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
          <div className="shadow-soft overflow-hidden rounded-2xl bg-white">
            {/* Map placeholder */}
            <div
              className="relative flex h-40 items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #e8f5f0 0%, #d1ede4 50%, #c8e6db 100%)',
              }}
            >
              {/* Fake map dots */}
              <div className="absolute inset-0 opacity-20">
                {[
                  { top: '20%', left: '30%' },
                  { top: '45%', left: '55%' },
                  { top: '60%', left: '25%' },
                  { top: '30%', left: '70%' },
                  { top: '70%', left: '65%' },
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute h-3 w-3 rounded-full"
                    style={{ top: pos.top, left: pos.left, background: 'var(--green)' }}
                  />
                ))}
              </div>

              {/* Center pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg"
                  style={{ background: 'var(--green)' }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v6M9 5h6" />
                  </svg>
                </div>
                <div
                  className="mt-0.5 h-2 w-2 rounded-full"
                  style={{ background: 'var(--green-dark)' }}
                />
              </div>
            </div>

            <div className="p-4">
              <h3
                className="font-display mb-1 text-[15px] font-bold"
                style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
              >
                Find Pharmacies Near You
              </h3>
              <p className="mb-3 text-[11px]" style={{ color: 'var(--charcoal-muted)' }}>
                12 pharmacies within 2km of your location
              </p>

              <div className="mb-3 flex gap-2">
                <button
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium"
                  style={{
                    background: 'var(--green)',
                    color: 'white',
                  }}
                >
                  <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-white" />
                  Open Now
                </button>
                <button
                  className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium"
                  style={{
                    borderColor: 'var(--cloud-dark)',
                    color: 'var(--charcoal-light)',
                  }}
                >
                  24/7 Pharmacies
                </button>
                <button
                  className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium"
                  style={{
                    borderColor: 'var(--cloud-dark)',
                    color: 'var(--charcoal-light)',
                  }}
                >
                  Delivers
                </button>
              </div>

              <Link
                href="/search"
                className="flex w-full items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-semibold transition-colors"
                style={{
                  borderColor: 'var(--green)',
                  color: 'var(--green)',
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                  <line x1="8" y1="2" x2="8" y2="18" />
                  <line x1="16" y1="6" x2="16" y2="22" />
                </svg>
                Open Full Map
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================================
            REVIEWS
            ================================================================ */}
        <section className={`mt-7 ${mounted ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
          <div className="mb-3 flex items-center justify-between">
            <h3
              className="font-display text-[15px] font-bold"
              style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
            >
              Reviews
            </h3>
            <Link
              href="/promotions"
              className="text-xs font-medium"
              style={{ color: 'var(--green)' }}
            >
              See all 247 →
            </Link>
          </div>

          {/* Aggregate rating */}
          <div className="shadow-soft mb-3 flex items-center gap-4 rounded-2xl bg-white p-4">
            <div className="text-center">
              <p
                className="font-display text-3xl font-bold"
                style={{ color: 'var(--charcoal)', letterSpacing: '-0.03em' }}
              >
                4.8
              </p>
              <StarRating rating={5} size={12} />
              <p className="mt-1 text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
                247 reviews
              </p>
            </div>

            {/* Rating bars */}
            <div className="flex-1 space-y-1">
              {[
                { stars: 5, pct: 82 },
                { stars: 4, pct: 12 },
                { stars: 3, pct: 4 },
                { stars: 2, pct: 1 },
                { stars: 1, pct: 1 },
              ].map((row) => (
                <div key={row.stars} className="flex items-center gap-2">
                  <span
                    className="w-3 text-right text-[10px]"
                    style={{ color: 'var(--charcoal-muted)' }}
                  >
                    {row.stars}
                  </span>
                  <div
                    className="h-1.5 flex-1 rounded-full"
                    style={{ background: 'var(--cloud-dark)' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${row.pct}%`, background: 'var(--amber)' }}
                    />
                  </div>
                  <span className="w-7 text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
                    {row.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Review cards */}
          <div className="space-y-2.5">
            {REVIEWS.map((review) => (
              <div key={review.id} className="shadow-soft rounded-xl bg-white p-3.5">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ background: 'var(--green)' }}
                    >
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: 'var(--charcoal)' }}>
                        {review.name} {review.country}
                      </p>
                      <p className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} size={11} />
                </div>
                <p
                  className="text-[12px] leading-relaxed"
                  style={{ color: 'var(--charcoal-light)' }}
                >
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================
            LOCATION & HOURS
            ================================================================ */}
        <section className="mb-4 mt-7">
          <div className="shadow-soft relative overflow-hidden rounded-2xl bg-white p-5">
            <div
              className="absolute bottom-0 right-0 h-24 w-24 rounded-tl-full opacity-[0.04]"
              style={{ background: 'var(--green)' }}
            />

            <h3
              className="font-display mb-4 text-[15px] font-bold"
              style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
            >
              Location & Hours
            </h3>

            {/* Address */}
            <div className="mb-3 flex items-start gap-3">
              <div
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                style={{ background: 'var(--green-light)' }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--green)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: 'var(--charcoal)' }}>
                  123 Nguyen Van Linh
                </p>
                <p className="text-[11px]" style={{ color: 'var(--charcoal-muted)' }}>
                  Hai Chau, Da Nang, Vietnam
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="mb-4 flex items-start gap-3">
              <div
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                style={{ background: isOpen ? 'var(--green-light)' : 'var(--red-light)' }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isOpen ? 'var(--green)' : 'var(--red)'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold" style={{ color: 'var(--charcoal)' }}>
                    Today: 7:00 AM – 9:00 PM
                  </p>
                  <span
                    className="rounded-md px-1.5 py-0.5 text-[9px] font-bold"
                    style={{
                      background: isOpen ? 'var(--green)' : 'var(--red)',
                      color: 'white',
                    }}
                  >
                    {isOpen ? 'OPEN' : 'CLOSED'}
                  </span>
                </div>
                <p className="text-[11px]" style={{ color: 'var(--charcoal-muted)' }}>
                  Sun: 8:00 AM – 8:00 PM
                </p>
              </div>
            </div>

            {/* Quick contact buttons */}
            <div className="flex gap-2">
              <a
                href="https://wa.me/+84905456789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-[11px] font-semibold text-white"
                style={{ background: '#25D366' }}
              >
                WhatsApp
              </a>
              <a
                href="https://zalo.me/0905456789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-[11px] font-semibold text-white"
                style={{ background: '#0068FF' }}
              >
                Zalo
              </a>
              <a
                href="tel:+84905456789"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-[11px] font-semibold"
                style={{
                  borderColor: 'var(--green)',
                  color: 'var(--green)',
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ================================================================
          BENTO MORE MENU — Drawer
          ================================================================ */}
      {showMoreMenu && (
        <div className="animate-fade-in fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowMoreMenu(false)}
          />

          {/* Panel */}
          <div
            className="pb-safe animate-slide-up absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5"
            style={{ maxHeight: '80vh', overflowY: 'auto' }}
          >
            {/* Handle */}
            <div className="mb-4 flex justify-center">
              <div className="h-1 w-10 rounded-full bg-gray-300" />
            </div>

            <h3
              className="font-display mb-4 text-lg font-bold"
              style={{ color: 'var(--charcoal)' }}
            >
              More
            </h3>

            <div className="mb-5 grid grid-cols-3 gap-3">
              {[
                { icon: '💊', label: 'All Products', href: '/products' },
                { icon: 'ℹ️', label: 'Drug Info', href: '/info' },
                { icon: '📍', label: 'Pharmacy Map', href: '/map' },
                { icon: '🏥', label: 'About Us', href: '/about' },
                { icon: '❓', label: 'FAQ', href: '/faq' },
                { icon: '📞', label: 'Contact', href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setShowMoreMenu(false)}
                  className="flex flex-col items-center gap-1.5 rounded-xl p-3 transition-colors"
                  style={{ background: 'var(--cloud)' }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-[10px] font-medium" style={{ color: 'var(--charcoal)' }}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Language setting */}
            <div className="mb-3">
              <p
                className="mb-2 text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: 'var(--charcoal-muted)' }}
              >
                Language
              </p>
              <div className="flex gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code)}
                    className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all"
                    style={{
                      background: selectedLang === lang.code ? 'var(--green)' : 'var(--cloud)',
                      color: selectedLang === lang.code ? 'white' : 'var(--charcoal)',
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Currency setting */}
            <div className="mb-5">
              <p
                className="mb-2 text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: 'var(--charcoal-muted)' }}
              >
                Currency
              </p>
              <div className="flex gap-2">
                {CURRENCIES.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => setSelectedCurrency(curr.code)}
                    className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all"
                    style={{
                      background: selectedCurrency === curr.code ? 'var(--green)' : 'var(--cloud)',
                      color: selectedCurrency === curr.code ? 'white' : 'var(--charcoal)',
                    }}
                  >
                    <span className="font-semibold">{curr.symbol}</span>
                    <span>{curr.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Close */}
            <button
              onClick={() => setShowMoreMenu(false)}
              className="w-full rounded-xl py-3 text-sm font-semibold"
              style={{
                background: 'var(--cloud)',
                color: 'var(--charcoal-light)',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
