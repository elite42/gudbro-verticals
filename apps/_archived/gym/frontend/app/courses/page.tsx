'use client';

import Link from 'next/link';
import { useState } from 'react';
import { courses, instructors } from '@/config/gym.config';
import { formatVNDPrice } from '@/lib/currency';

const categories = ['All', 'Boxing', 'Yoga', 'CrossFit', 'HIIT', 'Pilates', 'Swimming'];
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const shortDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getTodayIndex() {
  const day = new Date().getDay();
  return day === 0 ? 6 : day - 1; // Convert to Monday=0
}

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDay, setSelectedDay] = useState(getTodayIndex());

  const dayName = weekDays[selectedDay];

  const filtered = courses
    .filter((c) => selectedCategory === 'All' || c.category === selectedCategory)
    .filter((c) => c.schedule.some((s) => s.day === dayName))
    .map((c) => ({
      ...c,
      dayTime: c.schedule.find((s) => s.day === dayName)!.time,
    }))
    .sort((a, b) => a.dayTime.localeCompare(b.dayTime));

  return (
    <main className="mx-auto max-w-lg pb-24">
      {/* Header */}
      <div
        className="glass animate-slide-down sticky top-0 z-40 border-b px-4 py-3"
        style={{ borderColor: 'var(--cloud-dark)' }}
      >
        <div className="flex items-center gap-3">
          <Link href="/" className="rounded-full p-1.5 hover:bg-gray-100">
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
          <h1 className="font-display text-lg font-bold" style={{ color: 'var(--navy)' }}>
            Courses & Classes
          </h1>
        </div>
      </div>

      {/* Category Pills */}
      <div className="animate-fade-in-up mt-3 px-4">
        <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="flex-shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all"
              style={{
                background: selectedCategory === cat ? 'var(--orange)' : 'white',
                color: selectedCategory === cat ? 'white' : 'var(--charcoal-light)',
                border: selectedCategory === cat ? 'none' : '1px solid var(--cloud-dark)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Day Toggle */}
      <div className="animate-fade-in-up mt-3 px-4 delay-100">
        <div className="shadow-soft flex gap-1 rounded-2xl bg-white p-1.5">
          {shortDays.map((day, i) => (
            <button
              key={day}
              onClick={() => setSelectedDay(i)}
              className="flex-1 rounded-xl py-2 text-xs font-semibold transition-all"
              style={{
                background: selectedDay === i ? 'var(--navy)' : 'transparent',
                color:
                  selectedDay === i
                    ? 'white'
                    : i === getTodayIndex()
                      ? 'var(--orange)'
                      : 'var(--charcoal-muted)',
              }}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Course List */}
      <div className="mt-4 space-y-3 px-4">
        {filtered.length === 0 ? (
          <div className="animate-fade-in-up py-12 text-center">
            <span className="text-4xl">🧘</span>
            <p className="mt-2 text-sm font-medium" style={{ color: 'var(--charcoal-muted)' }}>
              No classes on {dayName}
              {selectedCategory !== 'All' ? ` for ${selectedCategory}` : ''}.
            </p>
            <p className="mt-1 text-xs" style={{ color: 'var(--charcoal-muted)' }}>
              Try another day or category.
            </p>
          </div>
        ) : (
          filtered.map((course, i) => (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="shadow-soft hover-lift animate-fade-in-up block overflow-hidden rounded-2xl bg-white"
              style={{ animationDelay: `${(i + 1) * 75}ms` }}
            >
              <div className="flex">
                <div
                  className="h-24 w-24 flex-shrink-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${course.image})` }}
                />
                <div className="flex-1 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium cat-${course.category.toLowerCase()}`}
                    >
                      {course.category}
                    </span>
                    <span
                      className="rounded-full px-1.5 py-0.5 text-[10px] font-medium"
                      style={{ background: 'var(--navy-light)', color: 'var(--navy)' }}
                    >
                      {course.level}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold">{course.name}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs font-semibold" style={{ color: 'var(--orange)' }}>
                      {course.dayTime}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                      · {course.duration}min
                    </span>
                    <span className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                      · {course.instructor}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="var(--gold)"
                        stroke="var(--gold)"
                        strokeWidth="2"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="text-xs font-medium">{course.rating}</span>
                    </div>
                    <span
                      className="text-xs"
                      style={{
                        color:
                          course.currentEnrolled >= course.capacity
                            ? 'var(--error)'
                            : 'var(--charcoal-muted)',
                      }}
                    >
                      {course.currentEnrolled}/{course.capacity} spots
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Personal Training Section */}
      <div className="animate-fade-in-up mt-6 px-4 delay-300">
        <div className="rounded-2xl bg-gradient-to-br from-[var(--navy)] to-[#2a3f6e] p-5 text-white">
          <h3 className="font-display text-lg font-bold">Personal Training</h3>
          <p className="mt-1 text-sm opacity-80">
            1-on-1 coaching with certified trainers. Custom programs tailored to your goals.
          </p>
        </div>
        <div className="mt-3 space-y-2.5">
          {instructors
            .filter((i) => i.ptAvailable)
            .map((trainer, i) => (
              <Link
                key={trainer.id}
                href={`/courses/trainers/${trainer.slug}`}
                className="shadow-soft hover-lift animate-fade-in-up flex items-center gap-3 rounded-2xl bg-white p-3"
                style={{ animationDelay: `${(i + 1) * 75 + 300}ms` }}
              >
                <div
                  className="h-14 w-14 flex-shrink-0 rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${trainer.photo})` }}
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold">{trainer.name}</div>
                  <div className="text-xs" style={{ color: 'var(--charcoal-muted)' }}>
                    {trainer.title}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
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
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-sm font-bold" style={{ color: 'var(--orange)' }}>
                    {formatVNDPrice(trainer.ptRate!)}
                  </div>
                  <div className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
                    per session
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
}
