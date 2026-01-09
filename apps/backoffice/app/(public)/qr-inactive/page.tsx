'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function QRInactiveContent() {
  const searchParams = useSearchParams();
  const merchantName = searchParams.get('merchant');
  const menuUrl = searchParams.get('menu');
  const phone = searchParams.get('phone');

  // Format phone for tel: link
  const phoneLink = phone ? `tel:${phone.replace(/\s/g, '')}` : null;
  const whatsappLink = phone ? `https://wa.me/${phone.replace(/\D/g, '')}` : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <div className="mb-4 text-6xl">⏸️</div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">QR Code Inactive</h1>
        <p className="mb-6 text-gray-600">
          This QR code has been temporarily deactivated
          {merchantName ? ` by ${merchantName}` : ''}. The menu is still available!
        </p>

        <div className="space-y-3">
          {/* Primary CTA - View Menu */}
          {menuUrl && (
            <a
              href={menuUrl}
              className="block w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              View Menu
            </a>
          )}

          {/* Contact options */}
          {phone && (
            <div className="flex gap-3">
              <a
                href={phoneLink!}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                📞 Call
              </a>
              <a
                href={whatsappLink!}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-600"
              >
                💬 WhatsApp
              </a>
            </div>
          )}

          {/* Search on Google Maps */}
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

          {/* Fallback - Home */}
          <a href="/" className="mt-4 block text-sm text-gray-500 hover:text-gray-700">
            Go to Home
          </a>
        </div>

        {/* Info section */}
        <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-left">
          <p className="mb-1 text-sm font-medium text-amber-800">Why is this inactive?</p>
          <p className="text-sm text-amber-700">
            The business may have temporarily paused this QR code for maintenance, a menu update, or
            promotional changes. The menu is usually still accessible.
          </p>
        </div>
      </div>
    </div>
  );
}

function QRInactiveLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <div className="mb-4 text-6xl">⏸️</div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">QR Code Inactive</h1>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default function QRInactivePage() {
  return (
    <Suspense fallback={<QRInactiveLoading />}>
      <QRInactiveContent />
    </Suspense>
  );
}
