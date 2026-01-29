'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useStaySession } from '@/hooks/useStaySession';

/**
 * Booking Verification Page
 *
 * Entry point for guests. Accepts booking code + last name,
 * verifies via API, saves JWT, and redirects to /stay/{code}.
 *
 * Returning guests with valid tokens auto-redirect without re-verifying.
 */
export default function VerificationPage() {
  const router = useRouter();
  const { isLoading, isAuthenticated, stay, verify } = useStaySession();

  const [bookingCode, setBookingCode] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-redirect authenticated guests
  useEffect(() => {
    if (!isLoading && isAuthenticated && stay) {
      router.push(`/stay/${stay.booking.code}`);
    }
  }, [isLoading, isAuthenticated, stay, router]);

  /**
   * Normalize booking code: uppercase, ensure BK- prefix.
   */
  function normalizeCode(raw: string): string {
    const upper = raw.toUpperCase().trim();
    if (upper.startsWith('BK-')) return upper;
    // If user typed just the 6-char code, add prefix
    if (/^[A-HJ-NP-Z2-9]{6}$/.test(upper)) return `BK-${upper}`;
    return upper;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    const code = normalizeCode(bookingCode);
    const trimmedLastName = lastName.trim();

    if (!code || !trimmedLastName) {
      setError('Please enter both your booking code and last name.');
      return;
    }

    setIsSubmitting(true);
    const result = await verify(code, trimmedLastName);
    setIsSubmitting(false);

    if (result.success) {
      // verify() already saved token + stay to localStorage/state.
      // The useEffect above will handle redirect once state updates.
    } else {
      setError(result.error || 'Verification failed. Please try again.');
    }
  }

  // Show loading screen while checking localStorage for existing session
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#E07A5F] border-t-transparent" />
          <p className="text-sm text-[#6B6560]">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, show loading while redirect happens
  if (isAuthenticated && stay) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#E07A5F] border-t-transparent" />
          <p className="text-sm text-[#6B6560]">Redirecting to your stay...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F5]">
      {/* Main Content - Vertically centered */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        {/* Brand */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E07A5F] shadow-lg shadow-[#E07A5F]/25">
            <svg
              className="h-8 w-8 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
              />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-semibold text-[#2D2926]">
            Welcome to Your Stay
          </h1>
          <p className="mt-2 text-sm text-[#6B6560]">
            Enter your booking details to access your stay dashboard
          </p>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            {/* Booking Code */}
            <div className="mb-4">
              <label
                htmlFor="bookingCode"
                className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#6B6560]"
              >
                Booking Code
              </label>
              <input
                id="bookingCode"
                type="text"
                value={bookingCode}
                onChange={(e) => {
                  setBookingCode(e.target.value.toUpperCase());
                  setError('');
                }}
                placeholder="BK-XXXXXX"
                autoComplete="off"
                autoCapitalize="characters"
                className="w-full rounded-xl border border-[#E8E4DF] bg-[#FAF8F5] px-4 py-3 font-mono text-base tracking-wider text-[#2D2926] placeholder:text-[#C4BFB9] focus:border-[#E07A5F] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20"
              />
            </div>

            {/* Last Name */}
            <div className="mb-5">
              <label
                htmlFor="lastName"
                className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#6B6560]"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setError('');
                }}
                placeholder="As on your booking"
                autoComplete="family-name"
                className="w-full rounded-xl border border-[#E8E4DF] bg-[#FAF8F5] px-4 py-3 text-base text-[#2D2926] placeholder:text-[#C4BFB9] focus:border-[#E07A5F] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !bookingCode.trim() || !lastName.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E07A5F] py-3.5 font-semibold text-white shadow-[0_4px_14px_rgba(224,122,95,0.35)] transition-all hover:bg-[#D16A4F] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Verifying...</span>
                </>
              ) : (
                'Access Your Stay'
              )}
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="px-6 pb-8 pt-4 text-center">
        <p className="text-xs text-[#C4BFB9]">
          Need help?{' '}
          <a
            href="mailto:support@gudbro.com"
            className="font-medium text-[#6B6560] underline decoration-[#E8E4DF] underline-offset-2 hover:text-[#E07A5F]"
          >
            Contact support
          </a>
        </p>
      </footer>
    </div>
  );
}
