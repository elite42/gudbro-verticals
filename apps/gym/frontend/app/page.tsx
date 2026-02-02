'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  gymConfig,
  passes,
  courses,
  facilities,
  products,
  reviews,
  promotions,
  instructors,
} from '@/config/gym.config';
import { formatVNDPrice } from '@/lib/currency';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? 'var(--gold)' : 'none'}
          stroke="var(--gold)"
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function isGymOpen(): { open: boolean; label: string } {
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const time = hours * 60 + minutes;

  if (day >= 1 && day <= 5) {
    return {
      open: time >= 330 && time <= 1320,
      label: time >= 330 && time <= 1320 ? 'Open Now' : 'Closed',
    };
  }
  if (day === 6) {
    return {
      open: time >= 360 && time <= 1260,
      label: time >= 360 && time <= 1260 ? 'Open Now' : 'Closed',
    };
  }
  return {
    open: time >= 420 && time <= 1200,
    label: time >= 420 && time <= 1200 ? 'Open Now' : 'Closed',
  };
}

function getTodaysCourses() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];
  return courses
    .filter((c) => c.schedule.some((s) => s.day === today))
    .map((c) => ({
      ...c,
      todayTime: c.schedule.find((s) => s.day === today)!.time,
    }))
    .sort((a, b) => a.todayTime.localeCompare(b.todayTime));
}

export default function HomePage() {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showCurrMenu, setShowCurrMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');
  const [selectedCurrency, setSelectedCurrency] = useState('VND');

  const status = isGymOpen();
  const todaysCourses = getTodaysCourses();
  const quickPasses = passes.filter((p) => ['day', 'week', '10entry', 'monthly'].includes(p.id));
  const featuredProducts = products.filter((p) => p.featured);
  const activePromo = promotions[0];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayIndex = new Date().getDay();

  return (
    <main className="mx-auto max-w-lg pb-24">
      {/* Header */}
      <header
        className="glass animate-slide-down sticky top-0 z-40 border-b"
        style={{ borderColor: 'var(--cloud-dark)' }}
      >
        <div className="mx-auto max-w-lg px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo + Name */}
            <div className="flex items-center gap-2">
              <div
                className="h-8 w-8 rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${gymConfig.business.logo})` }}
              />
              <div>
                <h1
                  className="font-display text-sm font-bold leading-tight"
                  style={{ color: 'var(--navy)' }}
                >
                  Iron Paradise
                </h1>
                <p className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
                  {gymConfig.business.tagline}
                </p>
              </div>
            </div>
            {/* Lang + Currency */}
            <div className="flex items-center gap-1.5">
              {/* Language */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowLangMenu(!showLangMenu);
                    setShowCurrMenu(false);
                  }}
                  className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium hover:bg-gray-100"
                >
                  <span>
                    {gymConfig.i18n.supportedLanguages.find((l) => l.code === selectedLang)?.flag}
                  </span>
                  <span className="uppercase">{selectedLang}</span>
                </button>
                {showLangMenu && (
                  <div
                    className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-xl border bg-white py-1 shadow-lg"
                    style={{ borderColor: 'var(--cloud-dark)' }}
                  >
                    {gymConfig.i18n.supportedLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLang(lang.code);
                          setShowLangMenu(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-gray-50"
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                        {selectedLang === lang.code && (
                          <svg
                            className="ml-auto"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--orange)"
                            strokeWidth="2.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
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
                  className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium hover:bg-gray-100"
                >
                  <span className="font-semibold">{selectedCurrency}</span>
                </button>
                {showCurrMenu && (
                  <div
                    className="absolute right-0 top-full z-50 mt-1 min-w-[120px] rounded-xl border bg-white py-1 shadow-lg"
                    style={{ borderColor: 'var(--cloud-dark)' }}
                  >
                    {gymConfig.i18n.supportedCurrencies.map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          setSelectedCurrency(curr);
                          setShowCurrMenu(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-gray-50"
                      >
                        <span>{curr}</span>
                        {selectedCurrency === curr && (
                          <svg
                            className="ml-auto"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--orange)"
                            strokeWidth="2.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
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

      {/* 1. Hero */}
      <section className="animate-fade-in-up relative">
        <div
          className="relative h-56 bg-cover bg-center"
          style={{ backgroundImage: `url(${gymConfig.business.heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h1 className="font-display text-2xl font-extrabold leading-tight">{gymConfig.name}</h1>
            <p className="mt-0.5 text-sm opacity-90">{gymConfig.business.tagline}</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <StarRating rating={gymConfig.rating.value} />
                <span className="text-sm font-semibold">{gymConfig.rating.value}</span>
                <span className="text-xs opacity-70">({gymConfig.rating.count})</span>
              </div>
              <span
                className="rounded-full px-2 py-0.5 text-xs font-semibold"
                style={{
                  background: status.open ? 'var(--success)' : 'var(--error)',
                  color: 'white',
                }}
              >
                {status.label}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Actions */}
      <section className="animate-fade-in-up relative z-10 -mt-4 px-4 delay-100">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Day Pass', icon: '🎫', href: '#', action: 'drawer' },
            { label: 'Schedule', icon: '📅', href: '/courses' },
            { label: 'My Account', icon: '👤', href: '/account' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="shadow-soft hover-lift flex flex-col items-center gap-1.5 rounded-2xl bg-white py-3"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-semibold" style={{ color: 'var(--navy)' }}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Pass Pricing Strip */}
      <section className="animate-fade-in-up mt-6 delay-150">
        <div className="mb-3 flex items-center justify-between px-4">
          <h2 className="font-display text-lg font-bold" style={{ color: 'var(--navy)' }}>
            Passes & Pricing
          </h2>
          <Link href="/passes" className="text-sm font-semibold" style={{ color: 'var(--orange)' }}>
            View All
          </Link>
        </div>
        <div className="hide-scrollbar flex gap-3 overflow-x-auto px-4">
          {quickPasses.map((pass) => (
            <Link
              key={pass.id}
              href="/passes"
              className="shadow-soft hover-lift w-32 flex-shrink-0 rounded-2xl bg-white p-3"
            >
              <div className="mb-1 text-xs font-medium" style={{ color: 'var(--charcoal-muted)' }}>
                {pass.duration}
              </div>
              <div className="font-display text-lg font-bold" style={{ color: 'var(--orange)' }}>
                {formatVNDPrice(pass.price)}
              </div>
              <div className="mt-0.5 text-xs font-semibold" style={{ color: 'var(--navy)' }}>
                {pass.shortName}
              </div>
              {pass.popular && (
                <span
                  className="mt-1.5 inline-block rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                  style={{ background: 'var(--yellow-light)', color: 'var(--gold)' }}
                >
                  POPULAR
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Today's Courses */}
      <section className="animate-fade-in-up mt-6 px-4 delay-200">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold" style={{ color: 'var(--navy)' }}>
            Today&apos;s Classes
          </h2>
          <Link
            href="/courses"
            className="text-sm font-semibold"
            style={{ color: 'var(--orange)' }}
          >
            All Courses
          </Link>
        </div>
        {todaysCourses.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--charcoal-muted)' }}>
            No classes scheduled today.
          </p>
        ) : (
          <div className="space-y-2.5">
            {todaysCourses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="shadow-soft hover-lift flex items-center gap-3 rounded-2xl bg-white p-3"
              >
                <div
                  className="h-12 w-12 flex-shrink-0 rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${course.image})` }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold">{course.name}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium cat-${course.category.toLowerCase()}`}
                    >
                      {course.category}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2">
                    <span className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                      {course.todayTime}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                      · {course.instructor}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                      · {course.duration}min
                    </span>
                  </div>
                </div>
                <div className="text-xs font-medium" style={{ color: 'var(--charcoal-muted)' }}>
                  {course.currentEnrolled}/{course.capacity}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Personal Training */}
      <section className="animate-fade-in-up mt-6 delay-200">
        <div className="mb-3 flex items-center justify-between px-4">
          <h2 className="font-display text-lg font-bold" style={{ color: 'var(--navy)' }}>
            Personal Training
          </h2>
        </div>
        <div className="hide-scrollbar flex gap-3 overflow-x-auto px-4">
          {instructors
            .filter((i) => i.ptAvailable)
            .map((trainer) => (
              <Link
                key={trainer.id}
                href={`/courses/trainers/${trainer.slug}`}
                className="shadow-soft hover-lift w-44 flex-shrink-0 overflow-hidden rounded-2xl bg-white"
              >
                <div
                  className="relative h-32 bg-cover bg-center"
                  style={{ backgroundImage: `url(${trainer.photo})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <div className="text-xs font-bold">{trainer.name}</div>
                    <div className="text-[10px] opacity-80">{trainer.title}</div>
                  </div>
                </div>
                <div className="p-2.5">
                  <div className="mb-1.5 flex flex-wrap gap-1">
                    {trainer.specialties.slice(0, 2).map((s) => (
                      <span
                        key={s}
                        className="rounded-full px-1.5 py-0.5 text-[9px] font-medium"
                        style={{ background: 'var(--orange-light)', color: 'var(--orange-dark)' }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: 'var(--orange)' }}>
                      from {formatVNDPrice(trainer.ptRate!)}/hr
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* 5. Facility Highlights */}
      <section className="animate-fade-in-up delay-250 mt-6 px-4">
        <h2 className="font-display mb-3 text-lg font-bold" style={{ color: 'var(--navy)' }}>
          Facilities
        </h2>
        <div className="flex flex-wrap gap-2">
          {facilities.slice(0, 12).map((f) => (
            <span
              key={f.name}
              className="shadow-soft inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 text-xs font-medium"
            >
              <span>{f.icon}</span>
              {f.name}
            </span>
          ))}
          <Link
            href="/info"
            className="inline-flex items-center rounded-full px-2.5 py-1.5 text-xs font-semibold"
            style={{ color: 'var(--orange)', background: 'var(--orange-light)' }}
          >
            +{facilities.length - 12} more →
          </Link>
        </div>
      </section>

      {/* 6. Active Promotion Banner */}
      {activePromo && (
        <section className="animate-fade-in-up mt-6 px-4 delay-300">
          <Link href="/promotions" className="block">
            <div
              className="hover-lift relative h-36 overflow-hidden rounded-2xl bg-cover bg-center"
              style={{ backgroundImage: `url(${activePromo.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                <span
                  className="mb-1.5 self-start rounded-full px-2 py-0.5 text-xs font-bold"
                  style={{ background: 'var(--orange)' }}
                >
                  {activePromo.badge}
                </span>
                <h3 className="font-display text-lg font-bold">{activePromo.title}</h3>
                <p className="mt-0.5 line-clamp-2 text-xs opacity-80">{activePromo.description}</p>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* 7. Quick Shop */}
      <section className="animate-fade-in-up delay-400 mt-6">
        <div className="mb-3 flex items-center justify-between px-4">
          <h2 className="font-display text-lg font-bold" style={{ color: 'var(--navy)' }}>
            Shop
          </h2>
          <Link href="/shop" className="text-sm font-semibold" style={{ color: 'var(--orange)' }}>
            View All
          </Link>
        </div>
        <div className="hide-scrollbar flex gap-3 overflow-x-auto px-4">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="shadow-soft hover-lift w-36 flex-shrink-0 overflow-hidden rounded-2xl bg-white"
            >
              <div
                className="h-28 bg-cover bg-center"
                style={{ backgroundImage: `url(${product.image})` }}
              />
              <div className="p-2.5">
                <div className="truncate text-xs font-semibold">{product.name}</div>
                <div className="mt-0.5 text-sm font-bold" style={{ color: 'var(--orange)' }}>
                  {formatVNDPrice(product.price)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. Reviews */}
      <section className="animate-fade-in-up mt-6 px-4 delay-500">
        <h2 className="font-display mb-3 text-lg font-bold" style={{ color: 'var(--navy)' }}>
          Reviews
        </h2>
        <div className="space-y-3">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="shadow-soft rounded-2xl bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{review.flag}</span>
                  <span className="text-sm font-semibold">{review.author}</span>
                  <span
                    className="rounded-full px-1.5 py-0.5 text-xs"
                    style={{ background: 'var(--orange-light)', color: 'var(--orange-dark)' }}
                  >
                    {review.passType}
                  </span>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--charcoal-light)' }}>
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Location & Contact */}
      <section className="animate-fade-in-up delay-600 mt-6 px-4">
        <h2 className="font-display mb-3 text-lg font-bold" style={{ color: 'var(--navy)' }}>
          Location & Contact
        </h2>
        <div className="shadow-soft rounded-2xl bg-white p-4">
          <div className="mb-3 flex items-start gap-3">
            <span className="text-xl">📍</span>
            <div>
              <p className="text-sm font-medium">{gymConfig.location.address}</p>
              <a
                href={gymConfig.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 inline-block text-xs font-semibold"
                style={{ color: 'var(--orange)' }}
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href={`https://wa.me/${gymConfig.contact.whatsappNumber.replace(/\s/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold text-white"
              style={{ background: '#25D366' }}
            >
              WhatsApp
            </a>
            <a
              href={`https://zalo.me/${gymConfig.contact.zaloId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-semibold text-white"
              style={{ background: '#0068FF' }}
            >
              Zalo
            </a>
            <a
              href={`tel:${gymConfig.contact.phone.replace(/\s/g, '')}`}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-semibold"
              style={{ borderColor: 'var(--cloud-dark)', color: 'var(--navy)' }}
            >
              Call
            </a>
          </div>

          {/* Social Links */}
          <div
            className="mt-3 flex items-center justify-center gap-3 border-t pt-3"
            style={{ borderColor: 'var(--cloud-dark)' }}
          >
            <a
              href={gymConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium hover:opacity-80"
              style={{
                background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                color: 'white',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Instagram
            </a>
            <a
              href={gymConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium hover:opacity-80"
              style={{ background: '#1877F2', color: 'white' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </a>
            <a
              href={gymConfig.social.google}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium hover:opacity-80"
              style={{ borderColor: 'var(--cloud-dark)', color: 'var(--charcoal-light)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </a>
          </div>
        </div>
      </section>

      {/* 10. Opening Hours */}
      <section className="animate-fade-in-up mb-4 mt-6 px-4 delay-700">
        <h2 className="font-display mb-3 text-lg font-bold" style={{ color: 'var(--navy)' }}>
          Opening Hours
        </h2>
        <div className="shadow-soft rounded-2xl bg-white p-4">
          {gymConfig.openingHours.map((slot) => {
            const isToday = slot.days.includes(days[todayIndex]);
            return (
              <div
                key={slot.label}
                className="flex items-center justify-between border-b py-2 last:border-b-0"
                style={{
                  borderColor: 'var(--cloud-dark)',
                  background: isToday ? 'var(--orange-light)' : 'transparent',
                  margin: isToday ? '-0.25rem -0.5rem' : undefined,
                  padding: isToday ? '0.5rem' : undefined,
                  borderRadius: isToday ? '0.75rem' : undefined,
                }}
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: isToday ? 'var(--orange-dark)' : 'var(--charcoal)' }}
                >
                  {slot.label} {isToday && '(Today)'}
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: isToday ? 'var(--orange)' : 'var(--charcoal-light)' }}
                >
                  {slot.open} – {slot.close}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
