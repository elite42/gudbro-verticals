'use client';

import { AccommodationAnalytics } from '@/components/accommodations/AccommodationAnalytics';

const PROPERTY_ID = process.env.NEXT_PUBLIC_ACCOM_PROPERTY_ID || '';

export default function AccommodationAnalyticsPage() {
  if (!PROPERTY_ID) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Accommodation Analytics</h1>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <p className="font-medium">Property not configured</p>
          <p className="mt-1">
            Set{' '}
            <code className="rounded bg-amber-100 px-1 py-0.5">NEXT_PUBLIC_ACCOM_PROPERTY_ID</code>{' '}
            in your environment variables to enable analytics.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Accommodation Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor occupancy, revenue, and service performance
        </p>
      </div>
      <AccommodationAnalytics propertyId={PROPERTY_ID} />
    </div>
  );
}
