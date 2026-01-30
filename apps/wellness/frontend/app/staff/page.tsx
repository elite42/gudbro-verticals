'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// =============================================================================
// MOCK DATA
// =============================================================================

const specialtyFilters = [
  { id: 'all', label: 'All Team' },
  { id: 'massage', label: 'Massage' },
  { id: 'hair', label: 'Hair' },
  { id: 'nails', label: 'Nails' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'barber', label: 'Barber' },
  { id: 'tattoo', label: 'Tattoo' },
];

const allStaff = [
  {
    id: '1',
    slug: 'linh-nguyen',
    name: 'Linh Nguyen',
    title: 'Senior Massage Therapist',
    specialty: 'massage',
    bio: 'Over 10 years of experience in traditional Vietnamese and Thai massage techniques. Specializes in deep tissue and therapeutic bodywork.',
    languages: ['EN', 'VI'],
    rating: 4.9,
    reviewCount: 87,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
    featured: true,
    premium: true,
  },
  {
    id: '2',
    slug: 'minh-tran',
    name: 'Minh Tran',
    title: 'Hair Stylist & Colorist',
    specialty: 'hair',
    bio: 'Creative hair stylist trained in Seoul. Expert in Korean styling trends, balayage, and precision cuts.',
    languages: ['EN', 'VI', 'KO'],
    rating: 4.8,
    reviewCount: 54,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    featured: true,
  },
  {
    id: '3',
    slug: 'mai-pham',
    name: 'Mai Pham',
    title: 'Nail Artist',
    specialty: 'nails',
    bio: 'Award-winning nail artist known for intricate gel art and creative designs. Instagram-famous for her miniature masterpieces.',
    languages: ['EN', 'VI', 'ZH'],
    rating: 4.7,
    reviewCount: 93,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
  },
  {
    id: '4',
    slug: 'duc-le',
    name: 'Duc Le',
    title: 'Barber & Grooming Specialist',
    specialty: 'barber',
    bio: 'Master barber with a passion for classic cuts and modern fades. Trained in traditional hot towel shaving.',
    languages: ['EN', 'VI'],
    rating: 4.8,
    reviewCount: 44,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
  },
  {
    id: '5',
    slug: 'hana-kim',
    name: 'Hana Kim',
    title: 'Beauty & Skincare Expert',
    specialty: 'beauty',
    bio: 'Korean beauty specialist with certifications in advanced facials, lash extensions, and skin rejuvenation therapies.',
    languages: ['EN', 'KO', 'VI'],
    rating: 4.9,
    reviewCount: 41,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop',
    featured: true,
  },
  {
    id: '6',
    slug: 'tuan-vo',
    name: 'Tuan Vo',
    title: 'Tattoo Artist',
    specialty: 'tattoo',
    bio: 'Resident tattoo artist specializing in fine-line, watercolor, and traditional Vietnamese motifs. Portfolio of 500+ custom pieces.',
    languages: ['EN', 'VI'],
    rating: 4.9,
    reviewCount: 28,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
  },
  {
    id: '7',
    slug: 'thu-dao',
    name: 'Thu Dao',
    title: 'Massage & Wellness Therapist',
    specialty: 'massage',
    bio: 'Certified in aromatherapy, reflexology, and hot stone techniques. Creates personalized wellness journeys for each guest.',
    languages: ['EN', 'VI', 'ZH'],
    rating: 4.7,
    reviewCount: 62,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop',
  },
];

// =============================================================================
// COMPONENT
// =============================================================================

export default function StaffPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredStaff = allStaff.filter(
    (s) => activeFilter === 'all' || s.specialty === activeFilter
  );

  return (
    <div className="min-h-screen bg-[var(--cream)] pb-24">
      {/* ===== HEADER ===== */}
      <header className="bg-[var(--cream)]/90 fixed left-0 right-0 top-0 z-50 border-b border-[var(--cream-dark)] backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[var(--cream-dark)]"
            >
              <svg
                className="h-5 w-5 text-[var(--charcoal)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </Link>
            <div>
              <h1 className="font-display text-lg font-semibold text-[var(--charcoal)]">
                Our Team
              </h1>
              <p className="text-xs text-[var(--charcoal-muted)]">
                {filteredStaff.length} professionals
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* ===== SPECIALTY FILTERS ===== */}
        <section className="border-b border-[var(--cream-dark)] bg-[var(--cream)]">
          <div className="hide-scrollbar flex gap-1 overflow-x-auto px-4 py-3">
            {specialtyFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'shadow-soft bg-[var(--sage-hex)] text-white'
                    : 'shadow-soft bg-white text-[var(--charcoal)] hover:bg-[var(--sage-light)]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        {/* ===== FEATURED BADGE ===== */}
        {activeFilter === 'all' && (
          <section className="px-4 pt-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--charcoal-muted)]">
              Featured Professionals
            </p>
          </section>
        )}

        {/* ===== STAFF LIST ===== */}
        <section className="px-4 py-3">
          <div className="space-y-3">
            {filteredStaff.map((member, index) => (
              <Link
                key={member.id}
                href={`/staff/${member.slug}`}
                className="animate-fade-in-up shadow-soft hover-lift group flex overflow-hidden rounded-xl bg-white"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* Photo */}
                <div className="relative h-36 w-28 shrink-0 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={112}
                    height={144}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                  {member.featured && (
                    <div className="absolute left-1.5 top-1.5 rounded-full bg-[var(--gold)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--charcoal)]">
                      FEATURED
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-3">
                  <div>
                    <div className="mb-0.5 flex items-center gap-2">
                      <h3 className="font-display text-[15px] font-semibold text-[var(--charcoal)]">
                        {member.name}
                      </h3>
                      {member.premium && (
                        <span className="rounded bg-[var(--gold-light)] px-1 py-0.5 text-[9px] font-bold text-[var(--gold)]">
                          PREMIUM
                        </span>
                      )}
                    </div>
                    <p className="mb-1.5 text-xs font-medium text-[var(--sage-hex)]">
                      {member.title}
                    </p>
                    <p className="line-clamp-2 text-xs text-[var(--charcoal-muted)]">
                      {member.bio}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    {/* Languages */}
                    <div className="flex gap-1">
                      {member.languages.map((lang) => (
                        <span
                          key={lang}
                          className="rounded bg-[var(--sage-light)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--sage-dark)]"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-xs">
                      <svg
                        className="h-3.5 w-3.5 text-[var(--gold)]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                      <span className="font-medium text-[var(--charcoal)]">{member.rating}</span>
                      <span className="text-[var(--charcoal-muted)]">({member.reviewCount})</span>
                    </div>
                  </div>
                </div>

                {/* Chevron */}
                <div className="flex items-center pr-3">
                  <svg
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
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="px-4 pb-4 pt-2">
          <div className="shadow-soft rounded-xl bg-[var(--sage-light)] p-5 text-center">
            <h3 className="font-display mb-2 text-lg font-semibold text-[var(--charcoal)]">
              Book with Your Preferred Professional
            </h3>
            <p className="mb-4 text-sm text-[var(--charcoal-muted)]">
              Choose your therapist or let us match you with the perfect expert.
            </p>
            <Link
              href="/"
              className="inline-block rounded-xl bg-[var(--sage-hex)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[var(--sage-dark)] active:scale-[0.98]"
            >
              Book Now
            </Link>
          </div>
        </section>
      </main>

      {/* ===== BOTTOM NAVIGATION ===== */}
      <nav className="pb-safe fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--cream-dark)] bg-white px-6 pt-2">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Link
            href="/"
            className="flex flex-col items-center py-2 text-[var(--charcoal-muted)] transition-all"
          >
            <svg
              width="24"
              height="24"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
          <Link
            href="/services"
            className="flex flex-col items-center py-2 text-[var(--charcoal-muted)] transition-all"
          >
            <svg
              width="24"
              height="24"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
          </Link>
          <span className="flex flex-col items-center py-2 text-[var(--charcoal-muted)]">
            <svg
              width="24"
              height="24"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              />
            </svg>
          </span>
          <span className="flex scale-110 flex-col items-center py-2 text-[var(--sage-hex)]">
            <svg
              width="24"
              height="24"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          </span>
          <span className="flex flex-col items-center py-2 text-[var(--charcoal-muted)]">
            <svg
              width="24"
              height="24"
              className="h-6 w-6"
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
          </span>
        </div>
      </nav>
    </div>
  );
}
