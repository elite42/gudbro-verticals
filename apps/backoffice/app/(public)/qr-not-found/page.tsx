'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function QRNotFoundContent() {
  const searchParams = useSearchParams();
  const merchantName = searchParams.get('merchant');
  const menuUrl = searchParams.get('menu');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <div className="mb-4 text-6xl">🔍</div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">QR Code Not Found</h1>
        <p className="mb-6 text-gray-600">
          This QR code doesn&apos;t exist or has been removed.
          {merchantName && ` Please contact ${merchantName} for assistance.`}
        </p>

        <div className="space-y-3">
          {/* Primary CTA - Menu if available */}
          {menuUrl && (
            <a
              href={menuUrl}
              className="block w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              View Menu
            </a>
          )}

          {/* Secondary CTA - Search on Google Maps */}
          {merchantName && (
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(merchantName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              📍 Find on Google Maps
            </a>
          )}

          {/* Tertiary CTA - Try scanning again */}
          <a
            href="/"
            className="block w-full rounded-lg px-6 py-3 font-medium text-blue-600 transition-colors hover:bg-blue-50"
          >
            Scan Another QR Code
          </a>

          {/* Fallback - Home */}
          <a href="/" className="mt-4 block text-sm text-gray-500 hover:text-gray-700">
            Go to Home
          </a>
        </div>

        {/* Help section */}
        <div className="mt-8 rounded-lg bg-gray-100 p-4 text-left">
          <p className="mb-2 text-sm font-medium text-gray-700">Why am I seeing this?</p>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• The QR code may have been deleted</li>
            <li>• The link might be typed incorrectly</li>
            <li>• The business may have changed their QR codes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function QRNotFoundLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <div className="mb-4 text-6xl">🔍</div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">QR Code Not Found</h1>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default function QRNotFoundPage() {
  return (
    <Suspense fallback={<QRNotFoundLoading />}>
      <QRNotFoundContent />
    </Suspense>
  );
}
