'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { courses, instructors } from '@/config/gym.config';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width={size} height={size} viewBox="0 0 24 24" fill={star <= Math.round(rating) ? 'var(--gold)' : 'none'} stroke="var(--gold)" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const course = courses.find(c => c.slug === slug);

  if (!course) {
    return (
      <main className="pb-24 max-w-lg mx-auto px-4 pt-20 text-center">
        <span className="text-5xl">🔍</span>
        <h1 className="font-display text-xl font-bold mt-4">Course Not Found</h1>
        <Link href="/courses" className="text-sm font-semibold mt-2 inline-block" style={{ color: 'var(--orange)' }}>← Back to Courses</Link>
      </main>
    );
  }

  const instructor = instructors.find(i => i.id === course.instructorId);

  return (
    <main className="pb-24 max-w-lg mx-auto">
      {/* Hero */}
      <div className="relative h-52 bg-cover bg-center animate-fade-in-up" style={{ backgroundImage: `url(${course.image})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Link href="/courses" className="absolute top-4 left-4 p-2 rounded-full glass">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </Link>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold cat-${course.category.toLowerCase()}`}>
            {course.category}
          </span>
          <h1 className="font-display text-2xl font-extrabold mt-1">{course.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={course.rating} />
            <span className="text-sm font-medium">{course.rating}</span>
            <span className="text-xs opacity-70">({course.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="px-4 mt-4 space-y-5">
        {/* Description */}
        <section className="animate-fade-in-up delay-100">
          <p className="text-sm leading-relaxed" style={{ color: 'var(--charcoal-light)' }}>{course.description}</p>
          <div className="flex gap-3 mt-3">
            <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white shadow-soft">
              <span>⏱️</span> {course.duration} min
            </div>
            <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white shadow-soft">
              <span>📊</span> {course.level}
            </div>
            <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white shadow-soft">
              <span>👥</span> {course.currentEnrolled}/{course.capacity}
            </div>
          </div>
        </section>

        {/* Weekly Schedule */}
        <section className="animate-fade-in-up delay-150">
          <h2 className="font-display text-base font-bold mb-2" style={{ color: 'var(--navy)' }}>Weekly Schedule</h2>
          <div className="bg-white rounded-2xl p-3 shadow-soft">
            {weekDays.map((day) => {
              const slot = course.schedule.find(s => s.day === day);
              const isToday = day === ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()];
              return (
                <div
                  key={day}
                  className="flex items-center justify-between py-2 border-b last:border-b-0"
                  style={{ borderColor: 'var(--cloud-dark)' }}
                >
                  <span className="text-sm" style={{ color: isToday ? 'var(--orange)' : 'var(--charcoal)', fontWeight: isToday ? 600 : 400 }}>
                    {day} {isToday && '(Today)'}
                  </span>
                  {slot ? (
                    <span className="text-sm font-semibold" style={{ color: 'var(--orange)' }}>{slot.time}</span>
                  ) : (
                    <span className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>—</span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Instructor */}
        {instructor && (
          <section className="animate-fade-in-up delay-200">
            <h2 className="font-display text-base font-bold mb-2" style={{ color: 'var(--navy)' }}>Instructor</h2>
            <Link href={`/courses/trainers/${instructor.slug}`} className="block">
              <div className="bg-white rounded-2xl p-4 shadow-soft hover-lift">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-14 h-14 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${instructor.photo})` }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{instructor.name}</h3>
                    <p className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>{instructor.title}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--charcoal-muted)" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--charcoal-light)' }}>{instructor.bio}</p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {instructor.certifications.map((cert) => (
                    <span key={cert} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--orange-light)', color: 'var(--orange-dark)' }}>
                      {cert}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                    <span>🗣️</span> {instructor.languages.join(', ')}
                  </div>
                  {instructor.ptAvailable && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'var(--orange-light)', color: 'var(--orange)' }}>
                      PT Available
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* What to Bring */}
        <section className="animate-fade-in-up delay-250">
          <h2 className="font-display text-base font-bold mb-2" style={{ color: 'var(--navy)' }}>What to Bring</h2>
          <div className="bg-white rounded-2xl p-4 shadow-soft space-y-2">
            {course.whatToBring.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                <span style={{ color: 'var(--charcoal-light)' }}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Note */}
        <section className="animate-fade-in-up delay-300">
          <div className="p-4 rounded-2xl" style={{ background: 'var(--yellow-light)' }}>
            <div className="flex items-center gap-2 mb-1">
              <span>💰</span>
              <span className="text-sm font-bold" style={{ color: 'var(--gold)' }}>Pricing</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--charcoal-light)' }}>{course.priceNote}</p>
          </div>
        </section>

        {/* CTA */}
        <div className="animate-fade-in-up delay-400 pb-4">
          <a
            href={`https://wa.me/84935456789?text=${encodeURIComponent(`Hi! I'd like to join the ${course.name} class.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-semibold"
            style={{ background: 'var(--orange)' }}
          >
            Join This Class →
          </a>
        </div>
      </div>
    </main>
  );
}
