'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// =============================================================================
// MOCK DATA
// =============================================================================

const categories = [
  { id: 'massage', label: 'Massage', color: '#8BA888' },
  { id: 'hair', label: 'Hair', color: '#B8A898' },
  { id: 'nails', label: 'Nails', color: '#E8B8B8' },
  { id: 'beauty', label: 'Beauty', color: '#D4B8D4' },
  { id: 'barber', label: 'Barber', color: '#8B7355' },
  { id: 'tattoo', label: 'Tattoo', color: '#5A5A5A' },
  { id: 'wellness', label: 'Wellness', color: '#A8C8D8' },
];

const allServices: Record<
  string,
  {
    id: string;
    slug: string;
    name: string;
    category: string;
    duration: number;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    image: string;
    description: string;
    longDescription: string;
    includes: string[];
    benefits: string[];
    staffIds: string[];
  }
> = {
  'traditional-vietnamese-massage': {
    id: '1',
    slug: 'traditional-vietnamese-massage',
    name: 'Traditional Vietnamese Massage',
    category: 'massage',
    duration: 90,
    price: 450000,
    originalPrice: 550000,
    rating: 4.9,
    reviewCount: 87,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=500&fit=crop',
    description: 'A deeply relaxing full-body massage combining traditional Vietnamese techniques.',
    longDescription:
      'Experience the ancient art of Vietnamese massage, passed down through generations. Our skilled therapists use a blend of long flowing strokes, gentle stretching, and acupressure to release tension and restore balance to your body and mind. This treatment incorporates aromatic Vietnamese herbs and warm oils to enhance relaxation.',
    includes: [
      'Full body massage',
      'Aromatic herbal oils',
      'Hot towel treatment',
      'Complimentary herbal tea',
    ],
    benefits: [
      'Stress relief',
      'Improved circulation',
      'Pain reduction',
      'Better sleep',
      'Flexibility',
    ],
    staffIds: ['1', '7'],
  },
  'hot-stone-therapy': {
    id: '2',
    slug: 'hot-stone-therapy',
    name: 'Hot Stone Therapy',
    category: 'massage',
    duration: 120,
    price: 650000,
    rating: 5.0,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&h=500&fit=crop',
    description: 'Heated basalt stones placed on key energy points for deep relaxation.',
    longDescription:
      'Smooth, heated basalt stones are placed on key energy points across your body while our therapist combines traditional massage techniques with the penetrating warmth of the stones. The heat melts away tension, eases muscle stiffness, and promotes deep relaxation of both body and mind.',
    includes: [
      'Heated basalt stones',
      'Full body massage',
      'Aromatherapy oils',
      'Post-treatment refreshments',
    ],
    benefits: [
      'Deep muscle relaxation',
      'Stress relief',
      'Detoxification',
      'Pain management',
      'Mental clarity',
    ],
    staffIds: ['1'],
  },
  'luxury-hair-treatment': {
    id: '5',
    slug: 'luxury-hair-treatment',
    name: 'Luxury Hair Treatment',
    category: 'hair',
    duration: 60,
    price: 350000,
    rating: 4.7,
    reviewCount: 54,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=500&fit=crop',
    description: 'Deep conditioning treatment with premium products for silky, healthy hair.',
    longDescription:
      'Revive your hair with our luxury treatment using premium Korean and Japanese hair care products. Includes a thorough consultation, deep cleansing, intensive conditioning mask, and professional blow-dry styling. Suitable for all hair types.',
    includes: [
      'Hair consultation',
      'Deep cleansing shampoo',
      'Intensive conditioning mask',
      'Blow-dry & styling',
    ],
    benefits: ['Deep hydration', 'Damage repair', 'Shine & softness', 'Scalp health'],
    staffIds: ['2'],
  },
  'gel-nail-art': {
    id: '8',
    slug: 'gel-nail-art',
    name: 'Gel Nail Art Set',
    category: 'nails',
    duration: 75,
    price: 280000,
    rating: 4.8,
    reviewCount: 93,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=500&fit=crop',
    description: 'Custom gel nail art with long-lasting shine and creative designs.',
    longDescription:
      'Express your style with our custom gel nail art service. Choose from hundreds of designs or work with our nail artists to create something uniquely yours. We use only premium gel products that last 3-4 weeks without chipping.',
    includes: [
      'Nail shaping & prep',
      'Cuticle care',
      'Gel application',
      'Custom art design',
      'Top coat finish',
    ],
    benefits: [
      'Long-lasting (3-4 weeks)',
      'Chip-resistant',
      'Custom designs',
      'Nail strengthening',
    ],
    staffIds: ['3'],
  },
};

const staffMembers: Record<
  string,
  { id: string; name: string; title: string; image: string; rating: number; languages: string[] }
> = {
  '1': {
    id: '1',
    name: 'Linh Nguyen',
    title: 'Senior Massage Therapist',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    rating: 4.9,
    languages: ['EN', 'VI'],
  },
  '2': {
    id: '2',
    name: 'Minh Tran',
    title: 'Hair Stylist & Colorist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    rating: 4.8,
    languages: ['EN', 'VI', 'KO'],
  },
  '3': {
    id: '3',
    name: 'Mai Pham',
    title: 'Nail Artist',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    rating: 4.7,
    languages: ['EN', 'VI', 'ZH'],
  },
  '7': {
    id: '7',
    name: 'Thu Dao',
    title: 'Massage & Wellness Therapist',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    rating: 4.7,
    languages: ['EN', 'VI', 'ZH'],
  },
};

// =============================================================================
// UTILS
// =============================================================================

import { formatPrice } from '@gudbro/utils';

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// =============================================================================
// COMPONENT
// =============================================================================

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [currency] = useState('VND');

  const service = allServices[slug];

  if (!service) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--cream)]">
        <div className="mb-4 text-5xl">🌿</div>
        <h1 className="font-display mb-2 text-2xl font-semibold text-[var(--charcoal)]">
          Service Not Found
        </h1>
        <p className="mb-6 text-sm text-[var(--charcoal-muted)]">
          This service may no longer be available.
        </p>
        <Link
          href="/services"
          className="rounded-xl bg-[var(--sage-hex)] px-6 py-3 text-sm font-semibold text-white"
        >
          Browse Services
        </Link>
      </div>
    );
  }

  const cat = categories.find((c) => c.id === service.category);
  const serviceStaff = service.staffIds.map((id) => staffMembers[id]).filter(Boolean);
  const relatedServices = Object.values(allServices)
    .filter((s) => s.slug !== slug && s.category === service.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--cream)] pb-28">
      {/* ===== HEADER (Overlay on image) ===== */}
      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/services"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
          >
            <svg
              width="24"
              height="24"
              className="h-5 w-5 text-[var(--charcoal)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Link>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm">
            <svg
              width="24"
              height="24"
              className="h-5 w-5 text-[var(--charcoal)]"
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
        </div>
      </header>

      {/* ===== HERO IMAGE ===== */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={service.image}
          alt={service.name}
          width={800}
          height={256}
          className="h-full w-full object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Category + Rating overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div
            className="rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: cat?.color }}
          >
            {cat?.label}
          </div>
          <div className="flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold backdrop-blur-sm">
            <svg
              width="24"
              height="24"
              className="h-3.5 w-3.5 text-[var(--gold)]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            <span>{service.rating}</span>
            <span className="text-[var(--charcoal-muted)]">({service.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <main className="px-4">
        {/* Title + Quick Info */}
        <section className="animate-fade-in-up py-5">
          <h1 className="font-display mb-2 text-2xl font-semibold text-[var(--charcoal)]">
            {service.name}
          </h1>
          <p className="mb-4 text-sm text-[var(--charcoal-muted)]">{service.description}</p>

          {/* Key Metrics */}
          <div className="flex gap-3">
            <div className="shadow-soft flex-1 rounded-xl bg-white p-3 text-center">
              <svg
                width="24"
                height="24"
                className="mx-auto mb-1 h-5 w-5 text-[var(--sage-hex)]"
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
              <p className="text-xs text-[var(--charcoal-muted)]">Duration</p>
              <p className="font-display text-sm font-semibold text-[var(--charcoal)]">
                {formatDuration(service.duration)}
              </p>
            </div>
            <div className="shadow-soft flex-1 rounded-xl bg-white p-3 text-center">
              <svg
                width="24"
                height="24"
                className="mx-auto mb-1 h-5 w-5 text-[var(--sage-hex)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                />
              </svg>
              <p className="text-xs text-[var(--charcoal-muted)]">Price</p>
              <p className="font-display text-sm font-semibold text-[var(--sage-hex)]">
                {formatPrice(service.price, currency)}
              </p>
              {service.originalPrice && (
                <p className="text-[10px] text-[var(--charcoal-muted)] line-through">
                  {formatPrice(service.originalPrice, currency)}
                </p>
              )}
            </div>
            <div className="shadow-soft flex-1 rounded-xl bg-white p-3 text-center">
              <svg
                width="24"
                height="24"
                className="mx-auto mb-1 h-5 w-5 text-[var(--gold)]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <p className="text-xs text-[var(--charcoal-muted)]">Rating</p>
              <p className="font-display text-sm font-semibold text-[var(--charcoal)]">
                {service.rating}/5
              </p>
            </div>
          </div>
        </section>

        {/* Long Description */}
        <section className="animate-fade-in-up mb-6 delay-100">
          <h2 className="font-display mb-2 text-lg font-semibold text-[var(--charcoal)]">
            About This Treatment
          </h2>
          <p className="text-sm leading-relaxed text-[var(--charcoal-light)]">
            {service.longDescription}
          </p>
        </section>

        {/* What's Included */}
        <section className="animate-fade-in-up mb-6 delay-150">
          <h2 className="font-display mb-3 text-lg font-semibold text-[var(--charcoal)]">
            What&apos;s Included
          </h2>
          <div className="shadow-soft rounded-xl bg-white p-4">
            <ul className="space-y-2.5">
              {service.includes.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[var(--charcoal)]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--sage-light)] text-[10px] text-[var(--sage-hex)]">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Benefits */}
        <section className="animate-fade-in-up mb-6 delay-200">
          <h2 className="font-display mb-3 text-lg font-semibold text-[var(--charcoal)]">
            Benefits
          </h2>
          <div className="flex flex-wrap gap-2">
            {service.benefits.map((benefit, i) => (
              <span
                key={i}
                className="rounded-full bg-[var(--sage-light)] px-3 py-1.5 text-xs font-medium text-[var(--sage-dark)]"
              >
                {benefit}
              </span>
            ))}
          </div>
        </section>

        {/* Available Staff */}
        {serviceStaff.length > 0 && (
          <section className="animate-fade-in-up mb-6 delay-300">
            <h2 className="font-display mb-3 text-lg font-semibold text-[var(--charcoal)]">
              Available Therapists
            </h2>
            <div className="space-y-2">
              {serviceStaff.map((member) => (
                <Link
                  key={member.id}
                  href={`/staff/${member.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="shadow-soft hover-lift flex items-center gap-3 rounded-xl bg-white p-3"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                    unoptimized
                  />
                  <div className="flex-1">
                    <h3 className="font-display text-sm font-semibold text-[var(--charcoal)]">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[var(--charcoal-muted)]">{member.title}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {member.languages.map((lang) => (
                      <span
                        key={lang}
                        className="rounded bg-[var(--sage-light)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--sage-dark)]"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                  <svg
                    width="24"
                    height="24"
                    className="h-4 w-4 text-[var(--charcoal-muted)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="animate-fade-in-up delay-400 mb-6">
            <h2 className="font-display mb-3 text-lg font-semibold text-[var(--charcoal)]">
              You Might Also Like
            </h2>
            <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/services/${rel.slug}`}
                  className="shadow-soft hover-lift group w-48 shrink-0 overflow-hidden rounded-xl bg-white"
                >
                  <div className="relative h-28 overflow-hidden">
                    <Image
                      src={rel.image}
                      alt={rel.name}
                      width={192}
                      height={112}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-2.5">
                    <h3 className="font-display line-clamp-1 text-sm font-semibold text-[var(--charcoal)]">
                      {rel.name}
                    </h3>
                    <div className="mt-1 flex items-center justify-between text-xs">
                      <span className="text-[var(--charcoal-muted)]">
                        {formatDuration(rel.duration)}
                      </span>
                      <span className="font-semibold text-[var(--sage-hex)]">
                        {formatPrice(rel.price, currency)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ===== STICKY BOOK CTA ===== */}
      <div className="pb-safe fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--cream-dark)] bg-white px-4 py-3">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
          <div>
            <p className="text-xs text-[var(--charcoal-muted)]">From</p>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-xl font-bold text-[var(--sage-hex)]">
                {formatPrice(service.price, currency)}
              </span>
              {service.originalPrice && (
                <span className="text-xs text-[var(--charcoal-muted)] line-through">
                  {formatPrice(service.originalPrice, currency)}
                </span>
              )}
            </div>
          </div>
          <button className="flex-1 rounded-xl bg-[var(--sage-hex)] py-3.5 text-center text-sm font-bold text-white shadow-lg transition-all hover:bg-[var(--sage-dark)] active:scale-[0.98]">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
