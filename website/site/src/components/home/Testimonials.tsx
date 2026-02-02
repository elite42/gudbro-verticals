'use client';

import { useState } from 'react';
import { CaretLeft, CaretRight, Star } from '@phosphor-icons/react';

const testimonials = [
  {
    quote:
      "GUDBRO transformed our cafe. Tourists can now read our menu in their own language and understand our Vietnamese dishes. Orders increased 40% in the first month!",
    author: 'Nguyen Thi Mai',
    role: 'Owner, Sunrise Cafe',
    location: 'Hoi An, Vietnam',
    avatar: '👩‍🍳',
    rating: 5,
    vertical: 'Coffeeshop',
  },
  {
    quote:
      "I was losing customers to Klook because I couldn't explain my tours in English. Now my QR sign does all the talking. Best investment I made.",
    author: 'Somchai Phuket',
    role: 'Tour Operator',
    location: 'Phuket, Thailand',
    avatar: '🧑‍✈️',
    rating: 5,
    vertical: 'Tours',
  },
  {
    quote:
      "Zero commission means I keep what I earn. My small guesthouse finally competes with big hotels on Booking.com. The partnership network sends me 3-4 guests per week.",
    author: 'Made Wirawan',
    role: 'Guesthouse Owner',
    location: 'Ubud, Bali',
    avatar: '🏠',
    rating: 5,
    vertical: 'Stays',
  },
  {
    quote:
      "Setup took 10 minutes. My massage menu now shows prices in 10 currencies. Korean tourists especially love it - they book right from their phones.",
    author: 'Linh Spa',
    role: 'Spa Manager',
    location: 'Da Nang, Vietnam',
    avatar: '💆‍♀️',
    rating: 5,
    vertical: 'Wellness',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-[var(--accent)]/10 px-4 py-1.5 text-sm font-medium text-[var(--accent-dark)]">
            Success Stories
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--neutral-900)] sm:text-4xl">
            Loved by Businesses Across Southeast Asia
          </h2>
          <p className="mt-4 text-lg text-[var(--neutral-600)]">
            See how small business owners are growing with GUDBRO
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative mt-12">
          {/* Main testimonial */}
          <div className="mx-auto max-w-3xl">
            <div className="relative rounded-2xl bg-[var(--neutral-50)] p-8 sm:p-12">
              {/* Quote mark */}
              <div className="absolute -top-4 left-8 text-6xl text-[var(--primary)]/20">&quot;</div>

              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    weight="fill"
                    className="text-[var(--accent)]"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mt-4 text-xl font-medium text-[var(--neutral-800)] sm:text-2xl">
                {testimonials[currentIndex].quote}
              </blockquote>

              {/* Author */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)]/10 text-2xl">
                  {testimonials[currentIndex].avatar}
                </div>
                <div>
                  <p className="font-semibold text-[var(--neutral-900)]">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-sm text-[var(--neutral-600)]">
                    {testimonials[currentIndex].role}
                  </p>
                  <p className="text-sm text-[var(--neutral-500)]">
                    {testimonials[currentIndex].location}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium text-[var(--primary)]">
                    {testimonials[currentIndex].vertical}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--neutral-100)] text-[var(--neutral-600)] transition-colors hover:bg-[var(--primary)] hover:text-white"
              aria-label="Previous testimonial"
            >
              <CaretLeft size={20} weight="bold" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-[var(--primary)]'
                      : 'w-2 bg-[var(--neutral-300)] hover:bg-[var(--neutral-400)]'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--neutral-100)] text-[var(--neutral-600)] transition-colors hover:bg-[var(--primary)] hover:text-white"
              aria-label="Next testimonial"
            >
              <CaretRight size={20} weight="bold" />
            </button>
          </div>
        </div>

        {/* Mini testimonials grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.author}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-xl border p-4 text-left transition-all ${
                index === currentIndex
                  ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                  : 'border-[var(--neutral-200)] hover:border-[var(--neutral-300)]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{testimonial.avatar}</span>
                <div>
                  <p className="text-sm font-medium text-[var(--neutral-900)]">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-[var(--neutral-500)]">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
