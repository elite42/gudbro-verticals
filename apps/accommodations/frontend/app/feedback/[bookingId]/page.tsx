'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { CheckCircle, WarningCircle } from '@phosphor-icons/react';
import PostStayRating from '@/components/stay/PostStayRating';

type PageState = 'loading' | 'ready' | 'submitted' | 'already_submitted' | 'error' | 'expired';

interface BookingInfo {
  propertyName: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  bookingCode: string;
}

export default function FeedbackPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const bookingId = params.bookingId as string;
  const token = searchParams.get('token') || '';

  const [state, setState] = useState<PageState>('loading');
  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!bookingId || !token) {
      setState('expired');
      return;
    }

    // Verify token and fetch booking info
    async function verifyAndLoad() {
      try {
        const res = await fetch(`/api/feedback/verify?bookingId=${bookingId}&token=${token}`);
        if (!res.ok) {
          const data = await res.json();
          if (data.error === 'already_submitted') {
            setState('already_submitted');
            return;
          }
          if (data.error === 'session_expired' || res.status === 401) {
            setState('expired');
            return;
          }
          throw new Error(data.error || 'Verification failed');
        }

        const data = await res.json();
        setBookingInfo(data.booking);
        setState('ready');
      } catch (err) {
        console.error('[FeedbackPage] verify error:', err);
        setErrorMessage(err instanceof Error ? err.message : 'Failed to load feedback form');
        setState('error');
      }
    }

    verifyAndLoad();
  }, [bookingId, token]);

  const handleSubmit = async (data: {
    ratings: Record<string, number>;
    overallRating: number;
    comment: string;
  }) => {
    try {
      const res = await fetch(
        `/api/stay/${bookingInfo?.bookingCode || '_'}/feedback/post-stay?token=${token}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ratings: data.ratings,
            overallRating: data.overallRating,
            comment: data.comment || undefined,
          }),
        }
      );

      if (res.status === 409) {
        setState('already_submitted');
        return;
      }

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Submission failed');
      }

      setState('submitted');
    } catch (err) {
      console.error('[FeedbackPage] submit error:', err);
      throw err; // Re-throw so PostStayRating can handle it
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="mx-auto max-w-lg px-4 py-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#2D2016]">Rate Your Stay</h1>
          {bookingInfo && (
            <p className="mt-1 text-sm text-[#8B7355]">
              {bookingInfo.propertyName} &middot;{' '}
              {formatDateRange(bookingInfo.checkIn, bookingInfo.checkOut)}
            </p>
          )}
        </div>

        {/* Loading */}
        {state === 'loading' && (
          <div className="flex flex-col items-center gap-3 py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3D8B87] border-t-transparent" />
            <p className="text-sm text-[#8B7355]">Loading...</p>
          </div>
        )}

        {/* Ready - show rating form */}
        {state === 'ready' && bookingInfo && (
          <PostStayRating
            bookingId={bookingId}
            propertyName={bookingInfo.propertyName}
            stayDates={{ checkIn: bookingInfo.checkIn, checkOut: bookingInfo.checkOut }}
            onSubmit={handleSubmit}
          />
        )}

        {/* Submitted successfully */}
        {state === 'submitted' && (
          <div className="flex flex-col items-center gap-4 py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle size={40} weight="duotone" className="text-emerald-600" />
            </div>
            <h2 className="text-xl font-semibold text-[#2D2016]">Thank You!</h2>
            <p className="text-center text-sm text-[#8B7355]">
              Your feedback has been submitted successfully.
              <br />
              It helps us improve the experience for future guests.
            </p>
          </div>
        )}

        {/* Already submitted */}
        {state === 'already_submitted' && (
          <div className="flex flex-col items-center gap-4 py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <CheckCircle size={40} weight="duotone" className="text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-[#2D2016]">Already Submitted</h2>
            <p className="text-center text-sm text-[#8B7355]">
              You have already submitted feedback for this stay.
              <br />
              Thank you for sharing your experience!
            </p>
          </div>
        )}

        {/* Expired token */}
        {state === 'expired' && (
          <div className="flex flex-col items-center gap-4 py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <WarningCircle size={40} weight="duotone" className="text-amber-600" />
            </div>
            <h2 className="text-xl font-semibold text-[#2D2016]">Link Expired</h2>
            <p className="text-center text-sm text-[#8B7355]">
              This feedback link has expired or is invalid.
              <br />
              Please contact the property if you would like to leave a review.
            </p>
          </div>
        )}

        {/* Error */}
        {state === 'error' && (
          <div className="flex flex-col items-center gap-4 py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <WarningCircle size={40} weight="duotone" className="text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-[#2D2016]">Something Went Wrong</h2>
            <p className="text-center text-sm text-[#8B7355]">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function formatDateRange(checkIn: string, checkOut: string): string {
  try {
    const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const cin = new Date(checkIn).toLocaleDateString('en-US', opts);
    const cout = new Date(checkOut).toLocaleDateString('en-US', opts);
    return `${cin} - ${cout}`;
  } catch {
    return `${checkIn} - ${checkOut}`;
  }
}
