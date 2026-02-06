'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/Button';
import { VerifiedBadge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { formatDate } from '@gudbro/utils';
import type { Tour, TourOperator, TourBooking } from '@/lib/types';

/* ═══════════════════════════════════════════════════════════════════════════
   BOOKING CONFIRMATION COMPONENT

   Success state after booking submission.
   Shows booking details, operator contact, and next steps.
   Celebratory confetti animation on mount.
   ═══════════════════════════════════════════════════════════════════════════ */

interface BookingConfirmationProps {
  booking: TourBooking;
  tour: Tour;
  operator: TourOperator;
  currency: string;
  onBrowseMore: () => void;
}

export function BookingConfirmation({
  booking,
  tour,
  operator,
  currency,
  onBrowseMore,
}: BookingConfirmationProps) {
  const [showContent, setShowContent] = useState(false);

  // Confetti celebration on mount
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#E07B39', '#FFB400', '#2C5F2D', '#22C55E'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Stagger content reveal
    setTimeout(() => setShowContent(true), 300);
  }, []);

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

  return (
    <div className="bg-tropical min-h-screen">
      {/* ─────────────────────────────────────────────────────────────────
          SUCCESS HEADER
         ───────────────────────────────────────────────────────────────── */}
      <header className="px-4 pb-8 pt-12 text-center">
        {/* Animated checkmark */}
        <div className="relative mx-auto mb-6 h-24 w-24">
          <div className="bg-success/20 absolute inset-0 animate-ping rounded-full" />
          <div className="bg-success animate-scale-in relative flex h-full w-full items-center justify-center rounded-full">
            <svg
              className="h-12 w-12 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                className="animate-draw"
                d="M5 13l4 4L19 7"
                style={{
                  strokeDasharray: 24,
                  strokeDashoffset: 24,
                  animation: 'draw 0.5s ease-out 0.3s forwards',
                }}
              />
            </svg>
          </div>
        </div>

        <h1 className="font-display text-foreground mb-2 text-2xl font-bold md:text-3xl">
          Booking Confirmed!
        </h1>
        <p className="text-foreground-muted">Confirmation sent via WhatsApp</p>
      </header>

      {/* ─────────────────────────────────────────────────────────────────
          BOOKING DETAILS CARD
         ───────────────────────────────────────────────────────────────── */}
      <section
        className={cn(
          'border-border shadow-card mx-4 rounded-2xl border bg-white p-5',
          'transition-all duration-500',
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        )}
      >
        <h2 className="font-display mb-4 flex items-center gap-2 text-lg font-semibold">
          <svg className="text-primary h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
          Booking Details
        </h2>

        <div className="space-y-4">
          <div className="border-border flex justify-between border-b py-2">
            <span className="text-foreground-muted">Tour</span>
            <span className="text-right font-medium">{tour.name}</span>
          </div>

          <div className="border-border flex justify-between border-b py-2">
            <span className="text-foreground-muted">Date</span>
            <span className="font-medium">
              {formatDate(booking.booking_date, { style: 'full' })}
            </span>
          </div>

          <div className="border-border flex justify-between border-b py-2">
            <span className="text-foreground-muted">Time</span>
            <span className="font-medium">{booking.booking_time}</span>
          </div>

          <div className="border-border flex justify-between border-b py-2">
            <span className="text-foreground-muted">People</span>
            <span className="font-medium">{booking.number_of_people}</span>
          </div>

          <div className="border-border flex justify-between border-b py-2">
            <span className="text-foreground-muted">Pickup</span>
            <span className="max-w-[60%] text-right font-medium">{booking.pickup_location}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="font-semibold">Total</span>
            <div className="text-right">
              <span className="font-display text-primary text-xl font-bold">
                {formatPrice(booking.total_price_vnd, currency)}
              </span>
              {currency !== 'VND' && (
                <span className="text-foreground-muted ml-2 text-sm">
                  ({booking.total_price_vnd.toLocaleString()}₫)
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          OPERATOR CONTACT
         ───────────────────────────────────────────────────────────────── */}
      <section
        className={cn(
          'border-border shadow-card mx-4 mt-4 rounded-2xl border bg-white p-5',
          'transition-all delay-100 duration-500',
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        )}
      >
        <h2 className="font-display mb-4 flex items-center gap-2 text-lg font-semibold">
          <span className="text-2xl">🧑‍✈️</span>
          Your Operator
        </h2>

        <div className="mb-4 flex items-center gap-4">
          <div className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-full text-2xl">
            🏍️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-foreground font-semibold">{operator.name}</h3>
              {operator.verified && <VerifiedBadge />}
            </div>
            <p className="text-foreground-muted text-sm">{operator.area}</p>
          </div>
        </div>

        <a
          href={`tel:${operator.phone}`}
          className="bg-background-elevated mb-3 flex items-center gap-3 rounded-xl p-3"
        >
          <svg className="text-primary h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          <span className="font-medium">{operator.phone}</span>
        </a>

        {/* Contact buttons */}
        <div className="flex gap-3">
          {operator.whatsapp && (
            <a
              href={`https://wa.me/${operator.whatsapp.replace(/\D/g, '')}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-medium text-white transition-colors hover:bg-[#22c55e]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          )}
          {operator.zalo && (
            <a
              href={`https://zalo.me/${operator.zalo}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0068FF] px-4 py-3 font-medium text-white transition-colors hover:bg-[#0056d6]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-lg">💬</span>
              Zalo
            </a>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          NEXT STEPS
         ───────────────────────────────────────────────────────────────── */}
      <section
        className={cn(
          'bg-secondary/10 border-secondary/20 mx-4 mt-4 rounded-2xl border p-5',
          'transition-all delay-200 duration-500',
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        )}
      >
        <h2 className="font-display text-secondary mb-4 flex items-center gap-2 text-lg font-semibold">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
          </svg>
          What's Next?
        </h2>

        <ol className="space-y-4">
          <li className="flex gap-3">
            <span className="bg-secondary flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
              1
            </span>
            <span className="text-foreground-muted pt-0.5">
              Save the operator's contact in your phone
            </span>
          </li>
          <li className="flex gap-3">
            <span className="bg-secondary flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
              2
            </span>
            <span className="text-foreground-muted pt-0.5">
              Be ready at your pickup location 15 minutes early
            </span>
          </li>
          <li className="flex gap-3">
            <span className="bg-secondary flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
              3
            </span>
            <span className="text-foreground-muted pt-0.5">
              Bring cash (VND preferred) or card for payment
            </span>
          </li>
          <li className="flex gap-3">
            <span className="bg-secondary flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
              4
            </span>
            <span className="text-foreground-muted pt-0.5">Enjoy your tour! 🎉</span>
          </li>
        </ol>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          ACTION BUTTONS
         ───────────────────────────────────────────────────────────────── */}
      <section
        className={cn(
          'mx-4 mb-8 mt-6 space-y-3',
          'transition-all delay-300 duration-500',
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        )}
      >
        <Button
          variant="outline"
          fullWidth
          size="lg"
          icon={
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
          }
        >
          Save Booking Details
        </Button>

        <Button
          variant="secondary"
          fullWidth
          size="lg"
          onClick={onBrowseMore}
          icon={
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          }
        >
          Browse More Tours
        </Button>
      </section>

      {/* Custom animation for checkmark */}
      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
