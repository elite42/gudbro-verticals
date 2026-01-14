'use client';

import Link from 'next/link';

export default function TourOperatorsPage() {
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
            <span>Tour Operators</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Tour Operators</h1>
          <p className="mt-1 text-gray-600">
            Discover and connect with tour operators that bring groups to your area.
          </p>
        </div>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Discover Partners
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
          <option value="">All Types</option>
          <option value="bus_operator">Bus Operator</option>
          <option value="cruise">Cruise</option>
          <option value="cultural">Cultural Tours</option>
          <option value="luxury">Luxury</option>
        </select>
        <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
          <option value="">All Countries</option>
          <option value="US">United States</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
          <option value="GB">United Kingdom</option>
        </select>
        <input
          type="text"
          placeholder="Search operators..."
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
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">No tour operators yet</h3>
        <p className="mt-2 text-sm text-gray-500">
          Click &quot;Discover Partners&quot; to find tour operators that visit your area.
        </p>
      </div>
    </div>
  );
}
