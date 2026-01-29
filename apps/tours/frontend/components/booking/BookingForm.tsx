'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { Tour } from '@/lib/types';

/* ═══════════════════════════════════════════════════════════════════════════
   BOOKING FORM COMPONENT

   Complete booking flow: date, time, people, pickup, contact info.
   Mobile-optimized with clear visual hierarchy and touch-friendly controls.
   ═══════════════════════════════════════════════════════════════════════════ */

interface BookingFormProps {
  tour: Tour;
  currency: string;
  onSubmit: (data: BookingData) => Promise<void>;
  onBack: () => void;
}

interface BookingData {
  date: string;
  time: string;
  numberOfPeople: number;
  pickupLocation: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  specialRequests: string;
}

export function BookingForm({ tour, currency, onSubmit, onBack }: BookingFormProps) {
  const [step, setStep] = useState<'details' | 'contact'>('details');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [formData, setFormData] = useState<BookingData>({
    date: '',
    time: tour.departure_times?.[0] || '',
    numberOfPeople: tour.min_people,
    pickupLocation: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    specialRequests: '',
  });

  // Price calculation
  const totalPrice =
    tour.price_per === 'person' ? tour.price_vnd * formData.numberOfPeople : tour.price_vnd;

  const formatPrice = (priceVnd: number, curr: string) => {
    const rates: Record<string, number> = {
      VND: 1,
      USD: 25000,
      EUR: 27000,
      KRW: 19,
      JPY: 170,
      AUD: 16000,
    };
    const converted = priceVnd / (rates[curr] || 25000);
    const symbols: Record<string, string> = {
      VND: '₫',
      USD: '$',
      EUR: '€',
      KRW: '₩',
      JPY: '¥',
      AUD: 'A$',
    };
    if (curr === 'VND') return `${priceVnd.toLocaleString()}${symbols[curr]}`;
    return `${symbols[curr] || '$'}${converted.toFixed(0)}`;
  };

  // Generate next 30 days
  const availableDates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toISOString().split('T')[0];
  });

  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  // Handlers
  const updateField = (field: keyof BookingData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateDetails = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time';
    if (!formData.pickupLocation.trim()) newErrors.pickupLocation = 'Please enter pickup location';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateContact = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.customerName.trim()) newErrors.customerName = 'Please enter your name';
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Please enter your phone number';
    } else if (!/^\+?[\d\s-]{8,}$/.test(formData.customerPhone)) {
      newErrors.customerPhone = 'Please enter a valid phone number';
    }
    if (formData.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateDetails()) {
      setStep('contact');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;

    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-tropical min-h-screen">
      {/* ─────────────────────────────────────────────────────────────────
          HEADER
         ───────────────────────────────────────────────────────────────── */}
      <header className="border-border sticky top-0 z-10 border-b bg-white">
        <div className="flex items-center gap-4 px-4 py-3">
          <button
            onClick={step === 'details' ? onBack : () => setStep('details')}
            className="-ml-2 rounded-lg p-2 transition-colors hover:bg-gray-100"
            aria-label="Go back"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="font-display text-lg font-semibold">Book This Tour</h1>
        </div>

        {/* Progress indicator */}
        <div className="flex gap-2 px-4 pb-3">
          <div
            className={cn(
              'h-1 flex-1 rounded-full',
              step === 'details' ? 'bg-primary' : 'bg-primary'
            )}
          />
          <div
            className={cn(
              'h-1 flex-1 rounded-full',
              step === 'contact' ? 'bg-primary' : 'bg-gray-200'
            )}
          />
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────
          TOUR SUMMARY
         ───────────────────────────────────────────────────────────────── */}
      <section className="border-border border-b bg-white px-4 py-4">
        <div className="flex gap-4">
          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
            <img
              src={tour.images[0] || '/placeholder-tour.jpg'}
              alt={tour.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-foreground line-clamp-2 font-semibold">{tour.name}</h2>
            <p className="text-foreground-muted mt-1 text-sm">
              {formatPrice(tour.price_vnd, currency)} / {tour.price_per}
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          FORM CONTENT
         ───────────────────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="space-y-6 p-4">
        {step === 'details' && (
          <>
            {/* Date Selection */}
            <section className="animate-in">
              <h3 className="font-display mb-3 flex items-center gap-2 text-lg font-semibold">
                <svg className="text-primary h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="18"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 2v4M8 2v4M3 10h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                Select Date
              </h3>

              <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
                {availableDates.slice(0, 14).map((date) => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => updateField('date', date)}
                    className={cn(
                      'flex-shrink-0 rounded-xl border-2 px-4 py-3 transition-all',
                      'min-w-[80px] text-center',
                      formData.date === date
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <div className="text-foreground-muted text-xs">
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="font-semibold">{new Date(date).getDate()}</div>
                  </button>
                ))}
              </div>

              {errors.date && <p className="text-error mt-2 text-sm">{errors.date}</p>}
            </section>

            {/* Time Selection */}
            {tour.departure_times && tour.departure_times.length > 0 && (
              <section className="animate-in delay-100">
                <h3 className="font-display mb-3 flex items-center gap-2 text-lg font-semibold">
                  <svg className="text-primary h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                  </svg>
                  Select Time
                </h3>

                <div className="flex flex-wrap gap-2">
                  {tour.departure_times.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => updateField('time', time)}
                      className={cn(
                        'rounded-xl border-2 px-4 py-2.5 font-medium transition-all',
                        formData.time === time
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                {errors.time && <p className="text-error mt-2 text-sm">{errors.time}</p>}
              </section>
            )}

            {/* Number of People */}
            <section className="animate-in delay-200">
              <h3 className="font-display mb-3 flex items-center gap-2 text-lg font-semibold">
                <svg className="text-primary h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
                Number of People
              </h3>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    updateField(
                      'numberOfPeople',
                      Math.max(tour.min_people, formData.numberOfPeople - 1)
                    )
                  }
                  className="border-border hover:border-primary flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors"
                  disabled={formData.numberOfPeople <= tour.min_people}
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                  </svg>
                </button>

                <span className="font-display w-16 text-center text-3xl font-bold">
                  {formData.numberOfPeople}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    updateField(
                      'numberOfPeople',
                      Math.min(tour.max_people, formData.numberOfPeople + 1)
                    )
                  }
                  className="border-border hover:border-primary flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors"
                  disabled={formData.numberOfPeople >= tour.max_people}
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>

              <p className="text-foreground-muted mt-2 text-sm">
                Min: {tour.min_people} • Max: {tour.max_people}
              </p>
            </section>

            {/* Pickup Location */}
            <section className="animate-in delay-300">
              <Input
                label="Pickup Location"
                placeholder="Hotel name or address..."
                value={formData.pickupLocation}
                onChange={(e) => updateField('pickupLocation', e.target.value)}
                error={errors.pickupLocation}
                required
                icon={
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                }
              />

              {/* Quick suggestions */}
              {tour.pickup_locations && tour.pickup_locations.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-foreground-muted text-sm">Popular:</span>
                  {tour.pickup_locations.slice(0, 3).map((location) => (
                    <button
                      key={location}
                      type="button"
                      onClick={() => updateField('pickupLocation', location)}
                      className="text-primary text-sm hover:underline"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {step === 'contact' && (
          <>
            <section className="animate-in">
              <h3 className="font-display mb-4 flex items-center gap-2 text-lg font-semibold">
                <svg className="text-primary h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                Your Details
              </h3>

              <div className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="John Smith"
                  value={formData.customerName}
                  onChange={(e) => updateField('customerName', e.target.value)}
                  error={errors.customerName}
                  required
                  autoComplete="name"
                />

                <Input
                  label="Phone (WhatsApp)"
                  placeholder="+82 10 1234 5678"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => updateField('customerPhone', e.target.value)}
                  error={errors.customerPhone}
                  hint="We'll send confirmation via WhatsApp"
                  required
                  autoComplete="tel"
                />

                <Input
                  label="Email"
                  placeholder="you@email.com"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => updateField('customerEmail', e.target.value)}
                  error={errors.customerEmail}
                  autoComplete="email"
                />

                <Textarea
                  label="Special Requests"
                  placeholder="Any special requirements? (e.g., dietary needs, child seat...)"
                  value={formData.specialRequests}
                  onChange={(e) => updateField('specialRequests', e.target.value)}
                />
              </div>
            </section>
          </>
        )}

        {/* ─────────────────────────────────────────────────────────────────
            PRICE SUMMARY
           ───────────────────────────────────────────────────────────────── */}
        <section className="bg-background-elevated border-border animate-in delay-400 rounded-2xl border p-4">
          <h3 className="font-display mb-3 font-semibold">Price Summary</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-foreground-muted">
                {tour.name} × {formData.numberOfPeople}{' '}
                {formData.numberOfPeople === 1 ? 'person' : 'people'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-muted">
                {formatPrice(tour.price_vnd, 'VND')} × {formData.numberOfPeople}
              </span>
              <span className="font-medium">{formatPrice(totalPrice, 'VND')}</span>
            </div>
          </div>

          <div className="border-border mt-3 flex items-baseline justify-between border-t pt-3">
            <span className="font-semibold">Total</span>
            <div className="text-right">
              <span className="font-display text-2xl font-bold">
                {formatPrice(totalPrice, currency)}
              </span>
              {currency !== 'VND' && (
                <p className="text-foreground-muted text-xs">≈ {totalPrice.toLocaleString()}₫</p>
              )}
            </div>
          </div>

          <div className="bg-primary/10 text-primary mt-4 flex items-center gap-2 rounded-xl p-3 text-sm">
            <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
            </svg>
            Pay on pickup (cash or card)
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            SUBMIT BUTTONS
           ───────────────────────────────────────────────────────────────── */}
        <div className="animate-in pt-4 delay-500">
          {step === 'details' ? (
            <Button type="button" fullWidth size="lg" onClick={handleNext}>
              Continue
            </Button>
          ) : (
            <Button type="submit" fullWidth size="lg" loading={loading}>
              Confirm Booking
            </Button>
          )}

          <p className="text-foreground-muted mt-4 text-center text-xs">
            By booking, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">
              {/* TODO: add /terms route */}
              Terms of Service
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
