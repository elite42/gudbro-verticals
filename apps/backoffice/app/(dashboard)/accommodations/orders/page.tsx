'use client';

import Link from 'next/link';
import { ClipboardText } from '@phosphor-icons/react';
import OrderManagement from '@/components/accommodations/OrderManagement';

export const dynamic = 'force-dynamic';

// TODO: Replace with proper auth system (session-based)
const PROPERTY_ID = process.env.NEXT_PUBLIC_ACCOM_PROPERTY_ID || '';

export default function AccommodationOrdersPage() {
  if (!PROPERTY_ID) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <ClipboardText size={48} className="mx-auto text-gray-400" weight="duotone" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No accommodation property configured
          </h3>
          <p className="mt-2 text-sm text-gray-500">Contact support to set up your property.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header />
      <OrderManagement propertyId={PROPERTY_ID} />
    </div>
  );
}

function Header() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/accommodations/bookings" className="hover:text-gray-700">
          Accommodations
        </Link>
        <span>/</span>
        <span>Orders</span>
      </div>
      <h1 className="mt-1 text-2xl font-bold text-gray-900">Service Orders</h1>
      <p className="mt-1 text-gray-600">View and manage guest service orders.</p>
    </div>
  );
}
