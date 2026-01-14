'use client';

import Link from 'next/link';

const statuses = [
  { id: 'suggested', label: 'Suggested', color: 'bg-gray-100 text-gray-700' },
  { id: 'contacted', label: 'Contacted', color: 'bg-blue-100 text-blue-700' },
  { id: 'responded', label: 'Responded', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'negotiating', label: 'Negotiating', color: 'bg-purple-100 text-purple-700' },
  { id: 'partnership_active', label: 'Active', color: 'bg-green-100 text-green-700' },
  { id: 'declined', label: 'Declined', color: 'bg-red-100 text-red-700' },
];

export default function OutreachPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/partnerships" className="hover:text-gray-700">
            Partnerships
          </Link>
          <span>/</span>
          <span>Outreach Pipeline</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold text-gray-900">Outreach Pipeline</h1>
        <p className="mt-1 text-gray-600">
          Track your partnership outreach from first contact to active partnership.
        </p>
      </div>

      {/* Pipeline Stats */}
      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <div
            key={status.id}
            className={`rounded-full px-3 py-1 text-sm font-medium ${status.color}`}
          >
            {status.label}: 0
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          <button className="border-b-2 border-purple-600 px-1 py-3 text-sm font-medium text-purple-600">
            Tour Operators
          </button>
          <button className="border-b-2 border-transparent px-1 py-3 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
            Accommodations
          </button>
        </nav>
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">No outreach yet</h3>
        <p className="mt-2 text-sm text-gray-500">
          Start reaching out to tour operators and accommodations to see them here.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Link
            href="/partnerships/tour-operators"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Find Tour Operators
          </Link>
          <Link
            href="/partnerships/accommodations"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Find Accommodations
          </Link>
        </div>
      </div>
    </div>
  );
}
