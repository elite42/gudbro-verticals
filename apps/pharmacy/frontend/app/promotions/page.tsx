'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/* =============================================================================
   MOCK DATA
   ============================================================================= */

const SEASONAL_ALERTS = [
  {
    id: 1,
    emoji: '🌧️',
    title: 'Rainy Season',
    description: 'Stock up on cold & flu medicine, waterproof bandages',
    color: '#E0F2FE',
    textColor: '#0369A1',
  },
  {
    id: 2,
    emoji: '☀️',
    title: 'Beach Season',
    description: "Don't forget sunscreen SPF50+ and aloe vera",
    color: '#FEF3C7',
    textColor: '#A16207',
  },
  {
    id: 3,
    emoji: '🦟',
    title: 'Mosquito Season',
    description: 'DEET repellent and antihistamine cream essential',
    color: '#ECFDF5',
    textColor: '#047857',
  },
];

const HEALTH_GUIDES = [
  {
    id: 1,
    emoji: '🏥',
    title: "What's OTC in Vietnam?",
    description: 'Quick guide to over-the-counter medicines available without prescription in Vietnamese pharmacies.',
    href: '/info',
  },
  {
    id: 2,
    emoji: '⚠️',
    title: 'Medicines to Avoid',
    description: 'List of controlled substances in Vietnam that tourists should know about before visiting a pharmacy.',
    href: '/info',
  },
  {
    id: 3,
    emoji: '💰',
    title: 'Price Guide',
    description: 'Know the fair price before you buy. Avoid tourist markups with our reference pricing.',
    href: '/info',
  },
  {
    id: 4,
    emoji: '🗣️',
    title: 'Pharmacy Phrases',
    description: 'Essential Vietnamese phrases at the pharmacy to communicate your needs effectively.',
    href: '/info',
  },
];

const TOURIST_KIT_ITEMS = [
  'Paracetamol',
  'Imodium',
  'ORS',
  'Sunscreen',
  'Insect Repellent',
];

const POPULAR_BUNDLES = [
  {
    id: 1,
    emoji: '💊',
    name: 'Pain Relief Pack',
    items: ['Paracetamol', 'Ibuprofen', 'Tiger Balm'],
    price: '85k₫',
  },
  {
    id: 2,
    emoji: '🤢',
    name: 'Stomach Pack',
    items: ['Loperamide', 'ORS x3', 'Omeprazole'],
    price: '70k₫',
  },
  {
    id: 3,
    emoji: '☀️',
    name: 'Sun Protection',
    items: ['Sunscreen', 'Aloe Vera', 'Lip Balm'],
    price: '180k₫',
  },
  {
    id: 4,
    emoji: '🩹',
    name: 'First Aid Kit',
    items: ['Betadine', 'Bandages', 'Cotton', 'Gauze'],
    price: '95k₫',
  },
];

/* =============================================================================
   MAIN COMPONENT
   ============================================================================= */

export default function PromotionsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: 'var(--cloud)' }}
    >
      {/* ================================================================
          HEADER
          ================================================================ */}
      <header
        className="sticky top-0 z-40 glass border-b"
        style={{ borderColor: 'rgba(45, 159, 131, 0.12)' }}
      >
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: 'var(--green-light)' }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--green)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1
                className="font-display text-[15px] font-bold leading-tight"
                style={{ color: 'var(--charcoal)', letterSpacing: '-0.02em' }}
              >
                Health Tips & Offers
              </h1>
              <p
                className="text-[10px] font-medium tracking-wide uppercase"
                style={{ color: 'var(--green)' }}
              >
                Seasonal guides & bundles
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4">

        {/* ================================================================
            TOURIST HEALTH KIT — Hero Banner
            ================================================================ */}
        <section className={`mt-5 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(165deg, var(--green) 0%, var(--green-dark) 100%)',
              boxShadow: '0 4px 20px rgba(45, 159, 131, 0.35)',
            }}
          >
            {/* Decorative medical cross watermark */}
            <div className="absolute top-3 right-3 opacity-[0.1]">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="white" stroke="none">
                <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7z" />
              </svg>
            </div>

            {/* Decorative circles */}
            <div
              className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-[0.08]"
              style={{ background: 'white' }}
            />

            <div className="relative z-10">
              <span className="text-3xl mb-2 block">🧳</span>
              <h2
                className="font-display text-xl font-bold mb-1 text-white"
                style={{ letterSpacing: '-0.02em' }}
              >
                Tourist Health Kit
              </h2>
              <p className="text-sm text-white/80 mb-4">
                Essential medicines for your trip to Vietnam
              </p>

              {/* Bundle items */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {TOURIST_KIT_ITEMS.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Pricing */}
              <div className="flex items-center gap-3 mb-4">
                <div>
                  <span
                    className="text-sm line-through text-white/50"
                  >
                    285k₫
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="font-display text-2xl font-bold text-white"
                    style={{ letterSpacing: '-0.03em' }}
                  >
                    230k₫
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase"
                    style={{
                      background: 'var(--amber)',
                      color: 'white',
                    }}
                  >
                    Save 20%
                  </span>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/+84905456789?text=Hi%20MediViet!%20I%27d%20like%20to%20order%20the%20Tourist%20Health%20Kit%20(230k%E2%82%AB)"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-transform hover:scale-[1.02]"
                style={{
                  background: 'white',
                  color: 'var(--green-dark)',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order Kit
              </a>
            </div>
          </div>
        </section>

        {/* ================================================================
            SEASONAL ALERTS — Horizontal Scroll
            ================================================================ */}
        <section className={`mt-7 ${mounted ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
          <h3
            className="font-display text-[15px] font-bold mb-3"
            style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
          >
            Seasonal Alerts
          </h3>

          <div className="flex gap-3 overflow-x-auto hide-scrollbar snap-x pb-1 -mx-1 px-1">
            {SEASONAL_ALERTS.map((alert) => (
              <div
                key={alert.id}
                className="flex-shrink-0 w-[220px] rounded-2xl p-4 snap-start"
                style={{
                  background: alert.color,
                }}
              >
                <span className="text-3xl mb-2 block">{alert.emoji}</span>
                <h4
                  className="text-[13px] font-bold mb-1"
                  style={{ color: alert.textColor }}
                >
                  {alert.title}
                </h4>
                <p
                  className="text-[11px] leading-relaxed"
                  style={{ color: alert.textColor, opacity: 0.85 }}
                >
                  {alert.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================
            HEALTH GUIDES — Vertical Cards
            ================================================================ */}
        <section className={`mt-7 ${mounted ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          <h3
            className="font-display text-[15px] font-bold mb-3"
            style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
          >
            Health Guides
          </h3>

          <div className="space-y-2.5">
            {HEALTH_GUIDES.map((guide) => (
              <Link
                key={guide.id}
                href={guide.href}
                className="flex items-start gap-3.5 bg-white rounded-xl p-4 shadow-soft hover-lift transition-all"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                  style={{ background: 'var(--green-light)' }}
                >
                  {guide.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className="text-[13px] font-semibold mb-0.5"
                    style={{ color: 'var(--charcoal)' }}
                  >
                    {guide.title}
                  </h4>
                  <p
                    className="text-[11px] leading-relaxed mb-1.5"
                    style={{ color: 'var(--charcoal-muted)' }}
                  >
                    {guide.description}
                  </p>
                  <span
                    className="text-[11px] font-semibold"
                    style={{ color: 'var(--green)' }}
                  >
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================================================================
            FREE DELIVERY PROMO — Full-width Card
            ================================================================ */}
        <section className={`mt-7 ${mounted ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
          <div
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(170deg, var(--amber-light) 0%, #FFF8EB 40%, #FFFDF7 100%)',
              border: '1px solid rgba(232, 168, 56, 0.2)',
            }}
          >
            {/* Decorative corner */}
            <div
              className="absolute -top-2 -right-2 w-20 h-20 opacity-[0.07] rounded-full"
              style={{ background: 'var(--amber)' }}
            />

            <div className="relative z-10">
              <span className="text-3xl mb-2 block">🚚</span>
              <h3
                className="font-display text-lg font-bold mb-1"
                style={{ color: 'var(--charcoal)', letterSpacing: '-0.02em' }}
              >
                Free Delivery This Week!
              </h3>
              <p
                className="text-[13px] leading-relaxed mb-2"
                style={{ color: 'var(--charcoal-light)' }}
              >
                Order over 200k₫ and get free delivery within 5km
              </p>

              {/* Promo code */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-4"
                style={{
                  background: 'white',
                  border: '1.5px dashed var(--amber)',
                }}
              >
                <span
                  className="text-[11px] font-medium"
                  style={{ color: 'var(--charcoal-muted)' }}
                >
                  Use code:
                </span>
                <span
                  className="text-sm font-bold tracking-wider"
                  style={{ color: 'var(--amber)' }}
                >
                  TOURIST2026
                </span>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/+84905456789?text=Hi%20MediViet!%20I%27d%20like%20to%20place%20an%20order%20with%20code%20TOURIST2026"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                style={{ background: '#25D366' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order via WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ================================================================
            POPULAR BUNDLES — 2-column Grid
            ================================================================ */}
        <section className={`mt-7 mb-4 ${mounted ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
          <h3
            className="font-display text-[15px] font-bold mb-3"
            style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
          >
            Popular Bundles
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {POPULAR_BUNDLES.map((bundle) => (
              <div
                key={bundle.id}
                className="bg-white rounded-2xl p-4 shadow-soft flex flex-col"
              >
                <span className="text-2xl mb-2">{bundle.emoji}</span>
                <h4
                  className="text-[13px] font-bold mb-1.5"
                  style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
                >
                  {bundle.name}
                </h4>
                <ul className="mb-3 flex-1">
                  {bundle.items.map((item) => (
                    <li
                      key={item}
                      className="text-[10px] leading-relaxed flex items-center gap-1"
                      style={{ color: 'var(--charcoal-muted)' }}
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: 'var(--green)' }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mt-auto">
                  <span
                    className="text-sm font-bold"
                    style={{ color: 'var(--green-dark)' }}
                  >
                    {bundle.price}
                  </span>
                  <a
                    href={`https://wa.me/+84905456789?text=Hi%20MediViet!%20I%27d%20like%20to%20order%20the%20${encodeURIComponent(bundle.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg text-[11px] font-semibold text-white transition-transform hover:scale-105"
                    style={{ background: 'var(--green)' }}
                  >
                    Order
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
