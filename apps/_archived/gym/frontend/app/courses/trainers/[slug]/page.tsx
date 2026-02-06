'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { instructors, courses, gymConfig } from '@/config/gym.config';
import { formatVNDPrice } from '@/lib/currency';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
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

export default function TrainerProfilePage() {
  const params = useParams();
  const slug = params.slug as string;
  const instructor = instructors.find((i) => i.slug === slug);

  if (!instructor) {
    return (
      <main className="mx-auto max-w-lg px-4 pb-24 pt-20 text-center">
        <span className="text-5xl">🔍</span>
        <h1 className="font-display mt-4 text-xl font-bold">Trainer Not Found</h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--charcoal-muted)' }}>
          The trainer you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/courses"
          className="mt-4 inline-block text-sm font-semibold"
          style={{ color: 'var(--orange)' }}
        >
          ← Back to Courses
        </Link>
      </main>
    );
  }

  const trainerCourses = courses.filter((c) => c.instructorId === instructor.id);

  return (
    <main className="mx-auto max-w-lg pb-24">
      {/* Hero */}
      <div
        className="animate-fade-in-up relative h-56 bg-cover bg-center"
        style={{ backgroundImage: `url(${instructor.photo})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <Link href="/courses" className="glass absolute left-4 top-4 rounded-full p-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="font-display text-2xl font-extrabold">{instructor.name}</h1>
          <p className="mt-0.5 text-sm opacity-90">{instructor.title}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {instructor.languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  color: '#fff',
                }}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 space-y-5 px-4">
        {/* Bio */}
        <section className="animate-fade-in-up delay-100">
          <p className="text-sm leading-relaxed" style={{ color: 'var(--charcoal-light)' }}>
            {instructor.bio}
          </p>

          {/* Certifications */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {instructor.certifications.map((cert) => (
              <span
                key={cert}
                className="rounded-full px-2.5 py-1 text-[10px] font-medium"
                style={{ background: 'var(--orange-light)', color: 'var(--orange-dark)' }}
              >
                {cert}
              </span>
            ))}
          </div>

          {/* Specialties */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {instructor.specialties.map((spec) => (
              <span
                key={spec}
                className="rounded-full px-2.5 py-1 text-[10px] font-medium"
                style={{ background: 'var(--navy-light)', color: 'var(--navy)' }}
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Social Links */}
          {instructor.social && (
            <div className="mt-3 flex gap-2">
              {instructor.social.instagram && (
                <a
                  href={instructor.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium hover:opacity-80"
                  style={{
                    background:
                      'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                    color: 'white',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  Instagram
                </a>
              )}
              {instructor.social.facebook && (
                <a
                  href={instructor.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium hover:opacity-80"
                  style={{ background: '#1877F2', color: 'white' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
              )}
              {instructor.social.tiktok && (
                <a
                  href={instructor.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium hover:opacity-80"
                  style={{ background: '#000', color: 'white' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.71a8.16 8.16 0 004.77 1.53V6.79a4.85 4.85 0 01-1.01-.1z" />
                  </svg>
                  TikTok
                </a>
              )}
            </div>
          )}
        </section>

        {/* Group Classes */}
        {trainerCourses.length > 0 && (
          <section className="animate-fade-in-up delay-150">
            <h2 className="font-display mb-2 text-base font-bold" style={{ color: 'var(--navy)' }}>
              Group Classes
            </h2>
            <div className="space-y-3">
              {trainerCourses.map((course) => (
                <Link key={course.id} href={`/courses/${course.slug}`} className="block">
                  <div className="shadow-soft hover-lift rounded-2xl bg-white p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>
                          {course.name}
                        </h3>
                        <span
                          className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
                          style={{ background: 'var(--orange-light)', color: 'var(--orange-dark)' }}
                        >
                          {course.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <StarRating rating={course.rating} size={12} />
                        <span className="text-xs font-medium" style={{ color: 'var(--gold)' }}>
                          {course.rating}
                        </span>
                      </div>
                    </div>

                    {/* Schedule for this course */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {weekDays.map((day) => {
                        const slot = course.schedule.find((s) => s.day === day);
                        if (!slot) return null;
                        return (
                          <span
                            key={day}
                            className="rounded-full px-2 py-0.5 text-[10px]"
                            style={{
                              background: 'var(--cloud-dark)',
                              color: 'var(--charcoal-light)',
                            }}
                          >
                            {day.slice(0, 3)} {slot.time}
                          </span>
                        );
                      })}
                    </div>

                    <div
                      className="mt-2 flex items-center gap-3 text-xs"
                      style={{ color: 'var(--charcoal-muted)' }}
                    >
                      <span>
                        👥 {course.currentEnrolled}/{course.capacity}
                      </span>
                      <span>⏱️ {course.duration} min</span>
                      <span>📊 {course.level}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Personal Training */}
        {instructor.ptAvailable && instructor.ptRate && (
          <section className="animate-fade-in-up delay-200">
            <h2 className="font-display mb-2 text-base font-bold" style={{ color: 'var(--navy)' }}>
              Personal Training
            </h2>

            {/* Rate */}
            <div className="shadow-soft mb-3 rounded-2xl bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--charcoal-light)' }}>
                  Rate per session
                </span>
                <span className="font-display text-lg font-bold" style={{ color: 'var(--orange)' }}>
                  {formatVNDPrice(instructor.ptRate)}
                </span>
              </div>
            </div>

            {/* Package Pricing Table */}
            {instructor.ptPackages && instructor.ptPackages.length > 0 && (
              <div className="shadow-soft mb-3 rounded-2xl bg-white p-4">
                <h3 className="mb-3 text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>
                  Package Pricing
                </h3>
                <div className="space-y-0">
                  {/* Table Header */}
                  <div
                    className="mb-2 grid grid-cols-4 gap-2 pb-2 text-[10px] font-semibold uppercase tracking-wide"
                    style={{
                      color: 'var(--charcoal-muted)',
                      borderBottom: '1px solid var(--cloud-dark)',
                    }}
                  >
                    <span>Sessions</span>
                    <span className="text-right">Per Session</span>
                    <span className="text-right">Total</span>
                    <span className="text-right">Savings</span>
                  </div>

                  {/* Table Rows */}
                  {instructor.ptPackages.map((pkg) => {
                    const singleSessionTotal = instructor.ptRate! * pkg.sessions;
                    const savings = singleSessionTotal - pkg.totalPrice;
                    return (
                      <div
                        key={pkg.sessions}
                        className="grid grid-cols-4 gap-2 py-2"
                        style={{ borderBottom: '1px solid var(--cloud-dark)' }}
                      >
                        <div>
                          <span
                            className="text-sm font-semibold"
                            style={{ color: 'var(--charcoal)' }}
                          >
                            {pkg.sessions}
                          </span>
                          <span
                            className="ml-1 text-[10px]"
                            style={{ color: 'var(--charcoal-muted)' }}
                          >
                            {pkg.label}
                          </span>
                        </div>
                        <span
                          className="text-right text-sm"
                          style={{ color: 'var(--charcoal-light)' }}
                        >
                          {formatVNDPrice(pkg.pricePerSession)}
                        </span>
                        <span
                          className="text-right text-sm font-semibold"
                          style={{ color: 'var(--charcoal)' }}
                        >
                          {formatVNDPrice(pkg.totalPrice)}
                        </span>
                        <span
                          className="text-right text-sm font-medium"
                          style={{
                            color: savings > 0 ? 'var(--success)' : 'var(--charcoal-muted)',
                          }}
                        >
                          {savings > 0 ? `Save ${formatVNDPrice(savings)}` : '—'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Weekly Availability */}
            {instructor.ptAvailability && instructor.ptAvailability.length > 0 && (
              <div className="shadow-soft rounded-2xl bg-white p-4">
                <h3 className="mb-3 text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>
                  Weekly Availability
                </h3>
                <div className="space-y-0">
                  {weekDays.map((day) => {
                    const availability = instructor.ptAvailability?.find((a) => a.day === day);
                    const isToday =
                      day ===
                      [
                        'Sunday',
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                      ][new Date().getDay()];
                    return (
                      <div
                        key={day}
                        className="flex items-center justify-between py-2"
                        style={{ borderBottom: '1px solid var(--cloud-dark)' }}
                      >
                        <span
                          className="min-w-[70px] text-sm"
                          style={{
                            color: isToday ? 'var(--orange)' : 'var(--charcoal)',
                            fontWeight: isToday ? 600 : 400,
                          }}
                        >
                          {day.slice(0, 3)} {isToday && '(Today)'}
                        </span>
                        {availability ? (
                          <div className="flex flex-wrap justify-end gap-1">
                            {availability.slots.map((slot) => (
                              <span
                                key={slot}
                                className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                                style={{
                                  background: 'var(--orange-light)',
                                  color: 'var(--orange-dark)',
                                }}
                              >
                                {slot}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                            —
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Book PT CTA */}
        {instructor.ptAvailable && (
          <div className="animate-fade-in-up delay-250 pb-4">
            <a
              href={`https://wa.me/84935456789?text=${encodeURIComponent(`Hi! I'd like to book a Personal Training session with ${instructor.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 font-semibold text-white"
              style={{ background: 'var(--orange)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.108-1.14l-.292-.175-3.033.795.81-2.957-.192-.306A7.963 7.963 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
              </svg>
              Book Personal Training
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
