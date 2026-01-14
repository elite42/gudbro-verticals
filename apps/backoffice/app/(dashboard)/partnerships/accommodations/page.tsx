'use client';

import Link from 'next/link';

export default function AccommodationsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/partnerships" className="hover:text-gray-700">
              Partnerships
            </Link>
            <span>/</span>
            <span>Accommodations</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Accommodations</h1>
          <p className="mt-1 text-gray-600">
            Partner with nearby hotels, hostels, and Airbnb hosts.
          </p>
        </div>
        <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
          Find Accommodations
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
          <option value="">All Types</option>
          <option value="hotel">Hotels</option>
          <option value="hostel">Hostels</option>
          <option value="b_and_b">B&amp;B</option>
          <option value="airbnb_host">Airbnb Hosts</option>
        </select>
        <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
          <option value="">Distance</option>
          <option value="200">Within 200m</option>
          <option value="500">Within 500m</option>
          <option value="1000">Within 1km</option>
        </select>
        <input
          type="text"
          placeholder="Search accommodations..."
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      {/* Empty State */}
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">No accommodations yet</h3>
        <p className="mt-2 text-sm text-gray-500">
          Click &quot;Find Accommodations&quot; to discover hotels and hosts near your venue.
        </p>
      </div>
    </div>
  );
}
