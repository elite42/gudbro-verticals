'use client';

import { DealsManager } from '@/components/accommodations/DealsManager';

const PROPERTY_ID = process.env.NEXT_PUBLIC_ACCOM_PROPERTY_ID || '';

export default function DealsPage() {
  if (!PROPERTY_ID) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="text-2xl font-bold text-gray-900">Deals</h1>
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
          <p className="font-medium text-amber-800">No property configured</p>
          <p className="mt-1 text-sm text-amber-600">
            Set the{' '}
            <code className="rounded bg-amber-100 px-1 py-0.5">NEXT_PUBLIC_ACCOM_PROPERTY_ID</code>{' '}
            environment variable to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Deal Management</h1>
      <DealsManager propertyId={PROPERTY_ID} />
    </div>
  );
}
