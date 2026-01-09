'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function QRLimitReachedContent() {
  const searchParams = useSearchParams();
  const merchantName = searchParams.get('merchant');
  const menuUrl = searchParams.get('menu');
  const phone = searchParams.get('phone');

  // Format phone for tel: link
  const phoneLink = phone ? `tel:${phone.replace(/\s/g, '')}` : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <div className="mb-4 text-6xl">🎯</div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Scan Limit Reached</h1>
        <p className="mb-6 text-gray-600">
          This QR code has reached its maximum number of scans.
          {merchantName
            ? ` ${merchantName} may have newer codes available!`
            : ' Please contact the business for assistance.'}
        </p>

        <div className="space-y-3">
          {/* Primary CTA - View menu */}
          {menuUrl && (
            <a
              href={menuUrl}
              className="block w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              View Menu
            </a>
          )}

          {/* Secondary CTA - Current offers */}
          {menuUrl && (
            <a
              href={`${menuUrl}/offers`}
              className="block w-full rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              See Current Offers
            </a>
          )}

          {/* Contact */}
          {phone && (
            <a
              href={phoneLink!}
              className="block w-full rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              📞 Contact {merchantName || 'Business'}
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

        {/* Info section */}
        <div className="mt-8 rounded-lg border border-purple-200 bg-purple-50 p-4 text-left">
          <p className="mb-1 text-sm font-medium text-purple-800">Why is there a limit?</p>
          <p className="text-sm text-purple-700">
            Some promotional QR codes have a limited number of uses to ensure fairness.
            {merchantName ? ` ${merchantName}` : ' The business'} likely has new promotions
            available!
          </p>
        </div>
      </div>
    </div>
  );
}

function QRLimitReachedLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <div className="mb-4 text-6xl">🎯</div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Scan Limit Reached</h1>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default function QRLimitReachedPage() {
  return (
    <Suspense fallback={<QRLimitReachedLoading />}>
      <QRLimitReachedContent />
    </Suspense>
  );
}
