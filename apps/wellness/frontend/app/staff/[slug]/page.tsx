'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// =============================================================================
// MOCK DATA
// =============================================================================

const allStaff: Record<
  string,
  {
    id: string;
    slug: string;
    name: string;
    title: string;
    specialty: string;
    bio: string;
    longBio: string;
    languages: string[];
    rating: number;
    reviewCount: number;
    image: string;
    featured: boolean;
    premium: boolean;
    premiumPercentage?: number;
    specialties: string[];
    experience: string;
    certifications: string[];
    serviceIds: string[];
  }
> = {
  'linh-nguyen': {
    id: '1',
    slug: 'linh-nguyen',
    name: 'Linh Nguyen',
    title: 'Senior Massage Therapist',
    specialty: 'massage',
    bio: 'Over 10 years of experience in traditional Vietnamese and Thai massage techniques.',
    longBio:
      'Linh began her journey in traditional healing at age 18, studying under master therapists in Hue. With over a decade of experience, she has developed a unique approach that combines traditional Vietnamese massage with modern therapeutic techniques. Her clients consistently praise her intuitive touch and ability to address deep-seated muscle tension. Linh is also certified in Thai massage and reflexology.',
    languages: ['EN', 'VI'],
    rating: 4.9,
    reviewCount: 87,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop',
    featured: true,
    premium: true,
    premiumPercentage: 15,
    specialties: ['Deep Tissue', 'Thai Massage', 'Reflexology', 'Hot Stone', 'Prenatal'],
    experience: '10+ years',
    certifications: ['Vietnamese Traditional Healing', 'Thai Massage Level 3', 'Prenatal Massage'],
    serviceIds: ['1', '2'],
  },
  'minh-tran': {
    id: '2',
    slug: 'minh-tran',
    name: 'Minh Tran',
    title: 'Hair Stylist & Colorist',
    specialty: 'hair',
    bio: 'Creative hair stylist trained in Seoul. Expert in Korean styling trends.',
    longBio:
      "Minh trained at one of Seoul's top hair academies before returning to Vietnam to bring the latest Korean beauty trends to Da Nang. He excels in precision cuts, creative coloring (especially balayage and highlights), and transformative styling. His trilingual ability makes him particularly popular with Korean tourists and expats.",
    languages: ['EN', 'VI', 'KO'],
    rating: 4.8,
    reviewCount: 54,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    featured: true,
    premium: false,
    specialties: [
      'Balayage',
      'Korean Styling',
      'Precision Cuts',
      'Hair Color',
      'Keratin Treatment',
    ],
    experience: '7 years',
    certifications: ['Seoul Academy of Hair Design', "L'Oreal Color Specialist"],
    serviceIds: ['5', '6', '7'],
  },
  'mai-pham': {
    id: '3',
    slug: 'mai-pham',
    name: 'Mai Pham',
    title: 'Nail Artist',
    specialty: 'nails',
    bio: 'Award-winning nail artist known for intricate gel art and creative designs.',
    longBio:
      'Mai is an award-winning nail artist whose intricate gel designs have earned her a loyal following on social media. She specializes in hand-painted nail art, 3D nail designs, and custom gel sets. Known for her patience and perfectionism, Mai treats each set of nails as a miniature canvas.',
    languages: ['EN', 'VI', 'ZH'],
    rating: 4.7,
    reviewCount: 93,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop',
    featured: false,
    premium: false,
    specialties: ['Gel Nail Art', '3D Designs', 'Manicure', 'Pedicure', 'Nail Extensions'],
    experience: '5 years',
    certifications: ['Japanese Nail Art Academy', 'OPI Certified Technician'],
    serviceIds: ['8', '9', '10'],
  },
  'duc-le': {
    id: '4',
    slug: 'duc-le',
    name: 'Duc Le',
    title: 'Barber & Grooming Specialist',
    specialty: 'barber',
    bio: 'Master barber with a passion for classic cuts and modern fades.',
    longBio:
      "Duc combines old-world barbering traditions with modern techniques. His hot towel shaves and precision fades have made him the go-to barber for discerning gentlemen in Da Nang. He creates a relaxed, gentlemen's club atmosphere that makes every visit feel special.",
    languages: ['EN', 'VI'],
    rating: 4.8,
    reviewCount: 44,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop',
    featured: false,
    premium: false,
    specialties: ['Classic Cuts', 'Modern Fades', 'Hot Towel Shave', 'Beard Grooming'],
    experience: '8 years',
    certifications: ['Master Barber Certificate'],
    serviceIds: ['13'],
  },
  'hana-kim': {
    id: '5',
    slug: 'hana-kim',
    name: 'Hana Kim',
    title: 'Beauty & Skincare Expert',
    specialty: 'beauty',
    bio: 'Korean beauty specialist with certifications in advanced facials.',
    longBio:
      "Hana brings the best of Korean skincare science to Serene Wellness. Trained in Seoul's top dermatological clinics, she specializes in HydraFacials, LED therapy, and anti-aging treatments. Her personalized skin consultations help clients build effective routines for lasting results.",
    languages: ['EN', 'KO', 'VI'],
    rating: 4.9,
    reviewCount: 41,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=600&fit=crop',
    featured: true,
    premium: false,
    specialties: ['HydraFacial', 'LED Therapy', 'Anti-aging', 'Lash Extensions', 'Skin Analysis'],
    experience: '6 years',
    certifications: [
      'Korean Dermatology Institute',
      'HydraFacial Certified',
      'Lash Extensions Expert',
    ],
    serviceIds: ['11', '12'],
  },
  'tuan-vo': {
    id: '6',
    slug: 'tuan-vo',
    name: 'Tuan Vo',
    title: 'Tattoo Artist',
    specialty: 'tattoo',
    bio: 'Resident tattoo artist specializing in fine-line, watercolor, and Vietnamese motifs.',
    longBio:
      'Tuan is a self-taught artist who turned his passion for drawing into a tattoo career. His portfolio features over 500 custom pieces ranging from delicate fine-line work to bold traditional Vietnamese motifs. He spends time with each client to ensure the design perfectly captures their vision.',
    languages: ['EN', 'VI'],
    rating: 4.9,
    reviewCount: 28,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop',
    featured: false,
    premium: false,
    specialties: ['Fine Line', 'Watercolor', 'Vietnamese Traditional', 'Minimalist', 'Cover-ups'],
    experience: '9 years',
    certifications: ['Health & Safety Certified', 'Bloodborne Pathogens'],
    serviceIds: ['14'],
  },
  'thu-dao': {
    id: '7',
    slug: 'thu-dao',
    name: 'Thu Dao',
    title: 'Massage & Wellness Therapist',
    specialty: 'massage',
    bio: 'Certified in aromatherapy, reflexology, and hot stone techniques.',
    longBio:
      'Thu approaches wellness holistically, combining massage therapy with aromatherapy and energy work. She creates personalized treatment plans for each guest, drawing from her knowledge of traditional Vietnamese medicine and modern wellness practices.',
    languages: ['EN', 'VI', 'ZH'],
    rating: 4.7,
    reviewCount: 62,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop',
    featured: false,
    premium: false,
    specialties: ['Aromatherapy', 'Reflexology', 'Swedish', 'Energy Healing'],
    experience: '6 years',
    certifications: ['Aromatherapy Diploma', 'Reflexology Level 2'],
    serviceIds: ['1', '3', '15'],
  },
};

const serviceNames: Record<
  string,
  { name: string; slug: string; duration: number; price: number }
> = {
  '1': {
    name: 'Traditional Vietnamese Massage',
    slug: 'traditional-vietnamese-massage',
    duration: 90,
    price: 450000,
  },
  '2': { name: 'Hot Stone Therapy', slug: 'hot-stone-therapy', duration: 120, price: 650000 },
  '3': { name: 'Aromatherapy Massage', slug: 'aromatherapy-massage', duration: 60, price: 380000 },
  '5': {
    name: 'Luxury Hair Treatment',
    slug: 'luxury-hair-treatment',
    duration: 60,
    price: 350000,
  },
  '6': { name: 'Haircut & Styling', slug: 'haircut-styling', duration: 45, price: 250000 },
  '7': { name: 'Keratin Treatment', slug: 'keratin-treatment', duration: 120, price: 800000 },
  '8': { name: 'Gel Nail Art Set', slug: 'gel-nail-art', duration: 75, price: 280000 },
  '9': { name: 'Classic Manicure', slug: 'classic-manicure', duration: 45, price: 150000 },
  '10': { name: 'Spa Pedicure', slug: 'spa-pedicure', duration: 60, price: 200000 },
  '11': { name: 'HydraFacial Treatment', slug: 'hydra-facial', duration: 60, price: 500000 },
  '12': { name: 'Eyelash Extensions', slug: 'eyelash-extensions', duration: 90, price: 400000 },
  '13': { name: 'Classic Hot Towel Shave', slug: 'classic-shave', duration: 30, price: 180000 },
  '14': { name: 'Custom Tattoo Design', slug: 'custom-tattoo', duration: 180, price: 1500000 },
  '15': { name: 'Herbal Sauna Session', slug: 'sauna-session', duration: 45, price: 200000 },
};

// =============================================================================
// UTILS
// =============================================================================

function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN').format(price) + '₫';
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// =============================================================================
// COMPONENT
// =============================================================================

export default function StaffDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [_tab] = useState<'about' | 'services'>('about');

  const member = allStaff[slug];

  if (!member) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--cream)]">
        <div className="mb-4 text-5xl">🌿</div>
        <h1 className="font-display mb-2 text-2xl font-semibold text-[var(--charcoal)]">
          Team Member Not Found
        </h1>
        <p className="mb-6 text-sm text-[var(--charcoal-muted)]">
          This profile may no longer be available.
        </p>
        <Link
          href="/staff"
          className="rounded-xl bg-[var(--sage-hex)] px-6 py-3 text-sm font-semibold text-white"
        >
          Browse Team
        </Link>
      </div>
    );
  }

  const memberServices = member.serviceIds.map((id) => serviceNames[id]).filter(Boolean);

  return (
    <div className="min-h-screen bg-[var(--cream)] pb-28">
      {/* ===== HEADER (Overlay) ===== */}
      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/staff"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
          >
            <svg
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
      <div className="relative h-72 overflow-hidden">
        <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--cream)] via-transparent to-black/20" />
      </div>

      {/* ===== PROFILE INFO ===== */}
      <main className="-mt-8 px-4">
        <section className="animate-fade-in-up relative">
          <div className="mb-1 flex items-center gap-2">
            {member.featured && (
              <span className="rounded-full bg-[var(--gold)] px-2 py-0.5 text-[10px] font-bold text-[var(--charcoal)]">
                FEATURED
              </span>
            )}
            {member.premium && (
              <span className="rounded-full bg-[var(--gold-light)] px-2 py-0.5 text-[10px] font-bold text-[var(--gold)]">
                PREMIUM +{member.premiumPercentage}%
              </span>
            )}
          </div>
          <h1 className="font-display mb-1 text-2xl font-semibold text-[var(--charcoal)]">
            {member.name}
          </h1>
          <p className="mb-3 text-sm font-medium text-[var(--sage-hex)]">{member.title}</p>

          {/* Quick Stats */}
          <div className="mb-5 flex gap-3">
            <div className="shadow-soft flex-1 rounded-xl bg-white p-3 text-center">
              <svg
                className="mx-auto mb-1 h-5 w-5 text-[var(--gold)]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <p className="font-display text-lg font-bold text-[var(--charcoal)]">
                {member.rating}
              </p>
              <p className="text-[10px] text-[var(--charcoal-muted)]">
                {member.reviewCount} reviews
              </p>
            </div>
            <div className="shadow-soft flex-1 rounded-xl bg-white p-3 text-center">
              <svg
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
              <p className="font-display text-lg font-bold text-[var(--charcoal)]">
                {member.experience}
              </p>
              <p className="text-[10px] text-[var(--charcoal-muted)]">Experience</p>
            </div>
            <div className="shadow-soft flex-1 rounded-xl bg-white p-3 text-center">
              <svg
                className="mx-auto mb-1 h-5 w-5 text-[var(--sage-hex)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              <p className="font-display text-lg font-bold text-[var(--charcoal)]">
                {member.languages.length}
              </p>
              <p className="text-[10px] text-[var(--charcoal-muted)]">Languages</p>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="animate-fade-in-up mb-6 delay-100">
          <h2 className="font-display mb-2 text-lg font-semibold text-[var(--charcoal)]">About</h2>
          <p className="text-sm leading-relaxed text-[var(--charcoal-light)]">{member.longBio}</p>
        </section>

        {/* Languages */}
        <section className="animate-fade-in-up mb-6 delay-150">
          <h2 className="font-display mb-3 text-lg font-semibold text-[var(--charcoal)]">
            Languages
          </h2>
          <div className="flex gap-2">
            {member.languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full bg-[var(--sage-light)] px-4 py-2 text-sm font-medium text-[var(--sage-dark)]"
              >
                {lang === 'EN'
                  ? 'English'
                  : lang === 'VI'
                    ? 'Tiếng Việt'
                    : lang === 'KO'
                      ? '한국어'
                      : '中文'}
              </span>
            ))}
          </div>
        </section>

        {/* Specialties */}
        <section className="animate-fade-in-up mb-6 delay-200">
          <h2 className="font-display mb-3 text-lg font-semibold text-[var(--charcoal)]">
            Specialties
          </h2>
          <div className="flex flex-wrap gap-2">
            {member.specialties.map((spec, i) => (
              <span
                key={i}
                className="shadow-soft rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[var(--charcoal)]"
              >
                {spec}
              </span>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="animate-fade-in-up mb-6 delay-300">
          <h2 className="font-display mb-3 text-lg font-semibold text-[var(--charcoal)]">
            Certifications
          </h2>
          <div className="shadow-soft rounded-xl bg-white p-4">
            <ul className="space-y-2">
              {member.certifications.map((cert, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[var(--charcoal)]">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold-light)] text-[10px] text-[var(--gold)]">
                    ✓
                  </span>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Services Offered */}
        {memberServices.length > 0 && (
          <section className="animate-fade-in-up delay-400 mb-6">
            <h2 className="font-display mb-3 text-lg font-semibold text-[var(--charcoal)]">
              Services by {member.name.split(' ')[0]}
            </h2>
            <div className="space-y-2">
              {memberServices.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  className="shadow-soft hover-lift flex items-center justify-between rounded-xl bg-white p-4"
                >
                  <div>
                    <h3 className="font-display text-sm font-semibold text-[var(--charcoal)]">
                      {svc.name}
                    </h3>
                    <p className="text-xs text-[var(--charcoal-muted)]">
                      {formatDuration(svc.duration)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[var(--sage-hex)]">
                      {formatPrice(svc.price)}
                    </span>
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
        )}
      </main>

      {/* ===== STICKY BOOK CTA ===== */}
      <div className="pb-safe-bottom fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--cream-dark)] bg-white px-4 py-3">
        <div className="mx-auto max-w-lg">
          <button className="w-full rounded-xl bg-[var(--sage-hex)] py-3.5 text-center text-sm font-bold text-white shadow-lg transition-all hover:bg-[var(--sage-dark)] active:scale-[0.98]">
            Book with {member.name.split(' ')[0]}
          </button>
        </div>
      </div>
    </div>
  );
}
