'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function QRExpiredContent() {
  const searchParams = useSearchParams();
  const merchantName = searchParams.get('merchant');
  const menuUrl = searchParams.get('menu');
  const phone = searchParams.get('phone');

  // Format phone for tel: link
  const phoneLink = phone ? `tel:${phone.replace(/\s/g, '')}` : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <div className="mb-4 text-6xl">⏰</div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">QR Code Expired</h1>
        <p className="mb-6 text-gray-600">
          This QR code has expired and is no longer valid.
          {merchantName
            ? ` Visit ${merchantName} for the latest offers!`
            : ' Please contact the business for an updated code.'}
        </p>

        <div className="space-y-3">
          {/* Primary CTA - View current offers/menu */}
          {menuUrl && (
            <a
              href={menuUrl}
              className="block w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              See Current Offers
            </a>
          )}

          {/* Secondary CTA - View full menu */}
          {menuUrl && (
            <a
              href={`${menuUrl}/menu`}
              className="block w-full rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              View Full Menu
            </a>
          )}

          {/* Contact for updated code */}
          {phone && (
            <a
              href={phoneLink!}
              className="block w-full rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              📞 Call for Updated Code
            </a>
          )}

          {/* Search on Google Maps */}
          {merchantName && (
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(merchantName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-lg px-6 py-3 font-medium text-blue-600 transition-colors hover:bg-blue-50"
            >
              📍 Find on Google Maps
            </a>
          )}

          {/* Fallback - Home */}
          <a href="/" className="mt-4 block text-sm text-gray-500 hover:text-gray-700">
            Go to Home
          </a>
        </div>

        {/* Promo hint */}
        <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-4 text-left">
          <p className="mb-1 text-sm font-medium text-green-800">Looking for a deal?</p>
          <p className="text-sm text-green-700">
            This promotional QR has expired, but {merchantName || 'the business'} may have new
            offers available. Check the menu for current promotions!
          </p>
        </div>
      </div>
    </div>
  );
}

function QRExpiredLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <div className="mb-4 text-6xl">⏰</div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">QR Code Expired</h1>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default function QRExpiredPage() {
  return (
    <Suspense fallback={<QRExpiredLoading />}>
      <QRExpiredContent />
    </Suspense>
  );
}
