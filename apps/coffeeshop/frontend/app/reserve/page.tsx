'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { coffeeshopConfig } from '../../config/coffeeshop.config';
import { ReservationWidget } from '../../components/reservations';
import { useTranslation } from '../../lib/use-translation';
import { Calendar, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

// Inner component that uses useSearchParams
function ReservePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [showWidget, setShowWidget] = useState(true);

  // Get locationId from query params or config
  // In production, this would come from the merchant's location settings
  const locationId =
    searchParams.get('locationId') ||
    process.env.NEXT_PUBLIC_LOCATION_ID ||
    coffeeshopConfig.merchant.id;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClose = () => {
    // Navigate back or to home
    router.push('/');
  };

  const handleSuccess = (reservation: {
    code: string;
    date: string;
    time: string;
    partySize: number;
  }) => {
    // Could trigger analytics, notifications, etc.
  };

  // Get translations with fallback
  const tr = (t as unknown as Record<string, unknown>).reservation as
    | Record<string, unknown>
    | undefined;

  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex animate-pulse flex-col items-center gap-4">
          <Calendar className="h-12 w-12 text-gray-300" />
          <div className="h-4 w-32 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header for when widget is closed */}
      {!showWidget && (
        <div className="border-b bg-white">
          <div className="mx-auto flex max-w-lg items-center gap-4 px-4 py-4">
            <Link href="/" className="-ml-2 rounded-full p-2 transition-colors hover:bg-gray-100">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold">
                {(tr?.title as string) || 'Make a Reservation'}
              </h1>
              <p className="text-sm text-gray-500">{coffeeshopConfig.business.name}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="mx-auto max-w-lg">
        {!showWidget ? (
          <div className="p-4">
            <button
              onClick={() => setShowWidget(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 py-4 font-semibold text-white transition-colors hover:bg-blue-600"
            >
              <Calendar className="h-5 w-5" />
              {(tr?.makeReservation as string) || 'Make a Reservation'}
            </button>

            {/* Restaurant info */}
            <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">{coffeeshopConfig.business.name}</h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-gray-500">📍</span>
                  <span>{coffeeshopConfig.location.address}</span>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-500">📞</span>
                  <a
                    href={`tel:${coffeeshopConfig.contact.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {coffeeshopConfig.contact.phone}
                  </a>
                </div>

                {coffeeshopConfig.contact.email && (
                  <div className="flex items-start gap-3">
                    <span className="text-gray-500">✉️</span>
                    <a
                      href={`mailto:${coffeeshopConfig.contact.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {coffeeshopConfig.contact.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <ReservationWidget
            locationId={locationId}
            onClose={handleClose}
            onSuccess={handleSuccess}
            isOpen={showWidget}
          />
        )}
      </div>
    </div>
  );
}

// Loading fallback
function ReservePageLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function ReservePage() {
  return (
    <Suspense fallback={<ReservePageLoading />}>
      <ReservePageContent />
    </Suspense>
  );
}
