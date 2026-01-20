'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTenant } from '@/lib/contexts/TenantContext';
import { InfoTooltip } from '@/components/ui/info-tooltip';

export const dynamic = 'force-dynamic';

interface TourOperatorOutreach {
  id: string;
  operatorId: string;
  status: string;
  firstContactAt: string | null;
  lastContactAt: string | null;
  responseAt: string | null;
  outreachTemplateUsed: string | null;
  customMessage: string | null;
  bookingsGenerated: number;
  revenueGenerated: number;
  createdAt: string;
  operator?: {
    id: string;
    name: string;
    countryCode: string;
    operatorType: string | null;
    contactEmail: string | null;
  };
}

interface AccommodationOutreach {
  id: string;
  accommodationId: string;
  status: string;
  partnershipType: string | null;
  discountPercent: number | null;
  firstContactAt: string | null;
  lastContactAt: string | null;
  responseAt: string | null;
  guestsReferred: number;
  revenueGenerated: number;
  createdAt: string;
  accommodation?: {
    id: string;
    name: string;
    accommodationType: string | null;
    city: string;
    contactEmail: string | null;
  };
}

const STATUSES = [
  {
    id: 'suggested',
    label: 'Suggested',
    color: 'bg-gray-100 text-gray-700',
    borderColor: 'border-gray-300',
  },
  {
    id: 'contacted',
    label: 'Contacted',
    color: 'bg-blue-100 text-blue-700',
    borderColor: 'border-blue-300',
  },
  {
    id: 'responded',
    label: 'Responded',
    color: 'bg-yellow-100 text-yellow-700',
    borderColor: 'border-yellow-300',
  },
  {
    id: 'negotiating',
    label: 'Negotiating',
    color: 'bg-purple-100 text-purple-700',
    borderColor: 'border-purple-300',
  },
  {
    id: 'partnership_active',
    label: 'Active',
    color: 'bg-green-100 text-green-700',
    borderColor: 'border-green-300',
  },
  {
    id: 'declined',
    label: 'Declined',
    color: 'bg-red-100 text-red-700',
    borderColor: 'border-red-300',
  },
  {
    id: 'no_response',
    label: 'No Response',
    color: 'bg-gray-100 text-gray-500',
    borderColor: 'border-gray-200',
  },
];

function getStatusConfig(status: string) {
  return STATUSES.find((s) => s.id === status) || STATUSES[0];
}

function formatDate(date: string | null) {
  if (!date) return null;
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function getNextStatuses(currentStatus: string): string[] {
  const transitions: Record<string, string[]> = {
    suggested: ['contacted'],
    contacted: ['responded', 'no_response'],
    responded: ['negotiating', 'declined'],
    negotiating: ['partnership_active', 'declined'],
    partnership_active: [],
    declined: ['contacted'],
    no_response: ['contacted'],
  };
  return transitions[currentStatus] || [];
}

function OutreachPageContent() {
  const searchParams = useSearchParams();
  const { location, isLoading: tenantLoading } = useTenant();

  // Determine initial tab from URL params
  const initialTab = searchParams.get('accommodation') ? 'accommodations' : 'tour_operators';
  const [activeTab, setActiveTab] = useState<'tour_operators' | 'accommodations'>(initialTab);

  const [tourOperatorOutreach, setTourOperatorOutreach] = useState<TourOperatorOutreach[]>([]);
  const [accommodationOutreach, setAccommodationOutreach] = useState<AccommodationOutreach[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  // Fetch outreach data
  useEffect(() => {
    async function fetchData() {
      if (!location?.id) {
        setLoading(false);
        return;
      }

      try {
        // Fetch tour operator outreach
        const toRes = await fetch(
          `/api/ai/tourism-partnerships?action=tour-operator-outreach&merchantId=${location.id}`
        );
        if (toRes.ok) {
          const data = await toRes.json();
          if (data.success) {
            setTourOperatorOutreach(data.outreach || []);
          }
        }

        // Fetch accommodation outreach
        const accomRes = await fetch(
          `/api/ai/tourism-partnerships?action=accommodation-outreach&merchantId=${location.id}`
        );
        if (accomRes.ok) {
          const data = await accomRes.json();
          if (data.success) {
            setAccommodationOutreach(data.outreach || []);
          }
        }
      } catch (error) {
        console.error('Error fetching outreach data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!tenantLoading) {
      fetchData();
    }
  }, [location?.id, tenantLoading]);

  // Group outreach by status
  const tourOperatorsByStatus = useMemo(() => {
    const grouped: Record<string, TourOperatorOutreach[]> = {};
    for (const status of STATUSES) {
      grouped[status.id] = tourOperatorOutreach.filter((o) => o.status === status.id);
    }
    return grouped;
  }, [tourOperatorOutreach]);

  const accommodationsByStatus = useMemo(() => {
    const grouped: Record<string, AccommodationOutreach[]> = {};
    for (const status of STATUSES) {
      grouped[status.id] = accommodationOutreach.filter((o) => o.status === status.id);
    }
    return grouped;
  }, [accommodationOutreach]);

  // Count by status for stats bar
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const status of STATUSES) {
      if (activeTab === 'tour_operators') {
        counts[status.id] = tourOperatorsByStatus[status.id]?.length || 0;
      } else {
        counts[status.id] = accommodationsByStatus[status.id]?.length || 0;
      }
    }
    return counts;
  }, [activeTab, tourOperatorsByStatus, accommodationsByStatus]);

  // Update outreach status
  const handleUpdateStatus = async (
    outreachId: string,
    partnerType: 'tour_operator' | 'accommodation',
    newStatus: string
  ) => {
    setUpdatingStatus(outreachId);
    try {
      const res = await fetch('/api/ai/tourism-partnerships', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outreachId,
          partnerType,
          status: newStatus,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          // Update local state
          if (partnerType === 'tour_operator') {
            setTourOperatorOutreach((prev) =>
              prev.map((o) => (o.id === outreachId ? { ...o, status: newStatus } : o))
            );
          } else {
            setAccommodationOutreach((prev) =>
              prev.map((o) => (o.id === outreachId ? { ...o, status: newStatus } : o))
            );
          }
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const isLoading = loading || tenantLoading;
  const totalOutreach =
    activeTab === 'tour_operators' ? tourOperatorOutreach.length : accommodationOutreach.length;

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
        <div className="flex items-center gap-2">
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Outreach Pipeline</h1>
          <InfoTooltip contentKey="pages.outreach" kbPageId="partnerships-outreach" />
        </div>
        <p className="mt-1 text-gray-600">
          Track your partnership outreach from first contact to active partnership.
        </p>
      </div>

      {/* Pipeline Stats */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.filter((s) => s.id !== 'no_response').map((status) => (
          <div
            key={status.id}
            className={`rounded-full px-3 py-1 text-sm font-medium ${status.color}`}
          >
            {status.label}: {isLoading ? '-' : statusCounts[status.id]}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          <button
            onClick={() => setActiveTab('tour_operators')}
            className={`border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'tour_operators'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Tour Operators ({tourOperatorOutreach.length})
          </button>
          <button
            onClick={() => setActiveTab('accommodations')}
            className={`border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'accommodations'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Accommodations ({accommodationOutreach.length})
          </button>
        </nav>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-white p-4">
              <div className="mb-3 h-5 w-2/3 rounded bg-gray-200" />
              <div className="mb-2 h-4 w-1/2 rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      )}

      {/* Pipeline View */}
      {!isLoading && totalOutreach > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {STATUSES.map((status) => {
            const items =
              activeTab === 'tour_operators'
                ? tourOperatorsByStatus[status.id]
                : accommodationsByStatus[status.id];

            if (items.length === 0) return null;

            return (
              <div key={status.id} className="space-y-3">
                <div
                  className={`flex items-center gap-2 rounded-lg border-l-4 ${status.borderColor} bg-white px-3 py-2`}
                >
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.color}`}>
                    {items.length}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{status.label}</span>
                </div>

                {/* Cards */}
                <div className="space-y-2">
                  {items.map((item) => {
                    const isTourOperator = 'operatorId' in item;
                    const partner = isTourOperator
                      ? (item as TourOperatorOutreach).operator
                      : (item as AccommodationOutreach).accommodation;
                    const nextStatuses = getNextStatuses(item.status);

                    return (
                      <div
                        key={item.id}
                        className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                      >
                        {/* Partner Info */}
                        <div className="mb-3">
                          <h4 className="font-medium text-gray-900">
                            {partner?.name || 'Unknown Partner'}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {isTourOperator
                              ? `${(partner as any)?.countryCode || ''} · ${(partner as any)?.operatorType?.replace('_', ' ') || 'Tour Operator'}`
                              : `${(partner as any)?.city || ''} · ${(partner as any)?.accommodationType?.replace('_', ' ') || 'Accommodation'}`}
                          </p>
                        </div>

                        {/* Contact Timeline */}
                        <div className="mb-3 space-y-1 text-xs text-gray-500">
                          {item.firstContactAt && (
                            <div className="flex items-center gap-1">
                              <span className="text-gray-400">First contact:</span>
                              <span>{formatDate(item.firstContactAt)}</span>
                            </div>
                          )}
                          {item.lastContactAt && (
                            <div className="flex items-center gap-1">
                              <span className="text-gray-400">Last contact:</span>
                              <span>{formatDate(item.lastContactAt)}</span>
                            </div>
                          )}
                          {item.responseAt && (
                            <div className="flex items-center gap-1">
                              <span className="text-gray-400">Responded:</span>
                              <span>{formatDate(item.responseAt)}</span>
                            </div>
                          )}
                        </div>

                        {/* Revenue/Metrics */}
                        {(item.revenueGenerated > 0 ||
                          ('bookingsGenerated' in item && item.bookingsGenerated > 0) ||
                          ('guestsReferred' in item &&
                            (item as AccommodationOutreach).guestsReferred > 0)) && (
                          <div className="mb-3 rounded-lg bg-green-50 px-2 py-1 text-xs text-green-700">
                            {item.revenueGenerated > 0 && (
                              <span>€{item.revenueGenerated.toLocaleString()}</span>
                            )}
                            {'bookingsGenerated' in item && item.bookingsGenerated > 0 && (
                              <span> · {item.bookingsGenerated} bookings</span>
                            )}
                            {'guestsReferred' in item &&
                              (item as AccommodationOutreach).guestsReferred > 0 && (
                                <span>
                                  {' '}
                                  · {(item as AccommodationOutreach).guestsReferred} guests
                                </span>
                              )}
                          </div>
                        )}

                        {/* Actions */}
                        {nextStatuses.length > 0 && (
                          <div className="flex flex-wrap gap-1 border-t border-gray-100 pt-3">
                            {nextStatuses.map((nextStatus) => {
                              const statusConfig = getStatusConfig(nextStatus);
                              return (
                                <button
                                  key={nextStatus}
                                  onClick={() =>
                                    handleUpdateStatus(
                                      item.id,
                                      isTourOperator ? 'tour_operator' : 'accommodation',
                                      nextStatus
                                    )
                                  }
                                  disabled={updatingStatus === item.id}
                                  className={`rounded px-2 py-1 text-xs font-medium transition-colors hover:opacity-80 disabled:opacity-50 ${statusConfig.color}`}
                                >
                                  {updatingStatus === item.id ? '...' : `→ ${statusConfig.label}`}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Contact Email */}
                        {partner?.contactEmail && (
                          <div className="mt-2 border-t border-gray-100 pt-2">
                            <a
                              href={`mailto:${partner.contactEmail}`}
                              className="text-xs text-blue-600 hover:underline"
                            >
                              {partner.contactEmail}
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && totalOutreach === 0 && (
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
      )}
    </div>
  );
}

function OutreachLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 w-24 animate-pulse rounded-full bg-gray-100" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    </div>
  );
}

export default function OutreachPage() {
  return (
    <Suspense fallback={<OutreachLoading />}>
      <OutreachPageContent />
    </Suspense>
  );
}
