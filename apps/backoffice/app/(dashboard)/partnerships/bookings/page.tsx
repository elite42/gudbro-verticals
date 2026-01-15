'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useTenant } from '@/lib/contexts/TenantContext';

export const dynamic = 'force-dynamic';

type BookingStatus =
  | 'pending'
  | 'ai_suggested_accept'
  | 'ai_suggested_decline'
  | 'ai_suggested_counter'
  | 'accepted'
  | 'declined'
  | 'countered'
  | 'expired'
  | 'cancelled';
type AutomationLevel = 'suggest' | 'auto_routine' | 'full_auto';

interface GroupBookingRequest {
  id: string;
  partnerType: 'tour_operator' | 'accommodation' | 'direct' | null;
  partnerId: string | null;
  requestedDate: string;
  requestedSlot: 'breakfast' | 'lunch' | 'dinner' | null;
  partySize: number;
  pricePerPerson: number | null;
  totalValue: number | null;
  menuType: string | null;
  dietaryRequirements: string[];
  specialRequests: string | null;
  status: BookingStatus;
  aiRecommendation: 'accept' | 'decline' | 'counter' | null;
  aiReasoning: string | null;
  aiExpectedValue: number | null;
  aiConfidence: number | null;
  requestedAt: string;
}

interface AIBookingConfig {
  automationLevel: AutomationLevel;
  weightRevenue: number;
  weightOccupancy: number;
  weightRelationships: number;
}

const STATUS_CONFIGS: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  ai_suggested_accept: { label: 'AI: Accept', color: 'bg-green-100 text-green-800' },
  ai_suggested_decline: { label: 'AI: Decline', color: 'bg-red-100 text-red-800' },
  ai_suggested_counter: { label: 'AI: Counter', color: 'bg-purple-100 text-purple-800' },
  accepted: { label: 'Accepted', color: 'bg-green-100 text-green-800' },
  declined: { label: 'Declined', color: 'bg-red-100 text-red-800' },
  countered: { label: 'Countered', color: 'bg-purple-100 text-purple-800' },
  expired: { label: 'Expired', color: 'bg-gray-100 text-gray-600' },
  cancelled: { label: 'Cancelled', color: 'bg-gray-100 text-gray-600' },
};

const AUTOMATION_LABELS: Record<
  AutomationLevel,
  { label: string; color: string; description: string }
> = {
  suggest: {
    label: 'Suggest Mode',
    color: 'bg-yellow-100 text-yellow-700',
    description: 'AI will suggest accept/decline but requires your approval.',
  },
  auto_routine: {
    label: 'Auto Routine',
    color: 'bg-blue-100 text-blue-700',
    description: 'AI auto-accepts routine requests, flags edge cases.',
  },
  full_auto: {
    label: 'Full Auto',
    color: 'bg-green-100 text-green-700',
    description: 'AI handles all bookings automatically.',
  },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function getSlotIcon(slot: string | null) {
  switch (slot) {
    case 'breakfast':
      return '🌅';
    case 'lunch':
      return '☀️';
    case 'dinner':
      return '🌙';
    default:
      return '🍽️';
  }
}

export default function BookingsPage() {
  const { location, isLoading: tenantLoading } = useTenant();
  const [requests, setRequests] = useState<GroupBookingRequest[]>([]);
  const [config, setConfig] = useState<AIBookingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'accepted' | 'declined' | 'all'>(
    'pending'
  );

  // Fetch bookings and config
  useEffect(() => {
    async function fetchData() {
      if (!location?.id) {
        setLoading(false);
        return;
      }

      try {
        // Fetch config
        const configRes = await fetch(
          `/api/ai/tourism-bookings?merchantId=${location.id}&action=config`
        );
        if (configRes.ok) {
          const data = await configRes.json();
          if (data.success && data.config) {
            setConfig(data.config);
          }
        }

        // Fetch requests
        const requestsRes = await fetch(
          `/api/ai/tourism-bookings?merchantId=${location.id}&action=requests`
        );
        if (requestsRes.ok) {
          const data = await requestsRes.json();
          if (data.success) {
            setRequests(data.requests || []);
          }
        }
      } catch (error) {
        console.error('Error fetching bookings data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!tenantLoading) {
      fetchData();
    }
  }, [location?.id, tenantLoading]);

  // Filter requests by tab
  const filteredRequests = useMemo(() => {
    switch (activeTab) {
      case 'pending':
        return requests.filter(
          (r) =>
            r.status === 'pending' ||
            r.status === 'ai_suggested_accept' ||
            r.status === 'ai_suggested_decline' ||
            r.status === 'ai_suggested_counter'
        );
      case 'accepted':
        return requests.filter((r) => r.status === 'accepted');
      case 'declined':
        return requests.filter((r) => r.status === 'declined' || r.status === 'countered');
      case 'all':
      default:
        return requests;
    }
  }, [requests, activeTab]);

  // Count by status
  const counts = useMemo(
    () => ({
      pending: requests.filter((r) => r.status === 'pending' || r.status.startsWith('ai_suggested'))
        .length,
      accepted: requests.filter((r) => r.status === 'accepted').length,
      declined: requests.filter((r) => r.status === 'declined' || r.status === 'countered').length,
      all: requests.length,
    }),
    [requests]
  );

  // Handle accept/decline
  const handleDecision = async (requestId: string, decision: 'accept' | 'decline') => {
    if (!location?.id) return;

    setProcessingId(requestId);
    try {
      const res = await fetch('/api/ai/tourism-bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: location.id,
          action: decision === 'accept' ? 'accept-request' : 'decline-request',
          requestId,
        }),
      });

      if (res.ok) {
        // Update local state
        setRequests((prev) =>
          prev.map((r) =>
            r.id === requestId
              ? { ...r, status: decision === 'accept' ? 'accepted' : 'declined' }
              : r
          )
        );
      }
    } catch (error) {
      console.error('Error processing decision:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const isLoading = loading || tenantLoading;
  const automationConfig = config
    ? AUTOMATION_LABELS[config.automationLevel]
    : AUTOMATION_LABELS.suggest;

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
            <span>Group Bookings</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Group Bookings</h1>
          <p className="mt-1 text-gray-600">
            Manage group booking requests from tour operators and accommodations.
          </p>
        </div>
        <Link
          href="/partnerships/bookings/config"
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          AI Settings
        </Link>
      </div>

      {/* AI Status Banner */}
      <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
            <svg
              className="h-5 w-5 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-gray-900">AI Booking Coordinator</h4>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${automationConfig.color}`}
              >
                {automationConfig.label}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-gray-600">
              {automationConfig.description}
              <Link
                href="/partnerships/bookings/config"
                className="ml-1 font-medium text-purple-600 hover:text-purple-700"
              >
                Change settings
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          {(['pending', 'accepted', 'declined', 'all'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} ({counts[tab]})
            </button>
          ))}
        </nav>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="h-6 w-1/3 rounded bg-gray-200" />
                <div className="h-6 w-20 rounded bg-gray-200" />
              </div>
              <div className="h-4 w-2/3 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      )}

      {/* Requests List */}
      {!isLoading && filteredRequests.length > 0 && (
        <div className="space-y-4">
          {filteredRequests.map((request) => {
            const statusConfig = STATUS_CONFIGS[request.status] || STATUS_CONFIGS.pending;
            const isPending =
              request.status === 'pending' || request.status.startsWith('ai_suggested');

            return (
              <div
                key={request.id}
                className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  {/* Main Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getSlotIcon(request.requestedSlot)}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">
                            {formatDate(request.requestedDate)} ·{' '}
                            {request.requestedSlot?.charAt(0).toUpperCase()}
                            {request.requestedSlot?.slice(1)}
                          </h3>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig.color}`}
                          >
                            {statusConfig.label}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          {request.partySize} guests ·
                          {request.pricePerPerson && ` €${request.pricePerPerson}/person · `}
                          {request.totalValue && (
                            <span className="font-medium text-green-700">
                              €{request.totalValue} total
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                      {request.menuType && (
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400">Menu:</span>
                          <span>{request.menuType}</span>
                        </div>
                      )}
                      {request.partnerType && (
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400">Partner:</span>
                          <span>{request.partnerType.replace('_', ' ')}</span>
                        </div>
                      )}
                      {request.dietaryRequirements.length > 0 && (
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400">Dietary:</span>
                          <span>{request.dietaryRequirements.join(', ')}</span>
                        </div>
                      )}
                    </div>

                    {/* AI Suggestion */}
                    {request.aiRecommendation && request.aiReasoning && (
                      <div className="mt-4 rounded-lg bg-purple-50 p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-purple-900">
                            AI recommends: {request.aiRecommendation}
                          </span>
                          {request.aiConfidence && (
                            <span className="text-xs text-purple-600">
                              ({Math.round(request.aiConfidence * 100)}% confidence)
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-purple-700">{request.aiReasoning}</p>
                        {request.aiExpectedValue && (
                          <p className="mt-1 text-xs text-purple-600">
                            Expected value: €{request.aiExpectedValue}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Special Requests */}
                    {request.specialRequests && (
                      <p className="mt-3 text-sm italic text-gray-500">
                        &quot;{request.specialRequests}&quot;
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  {isPending && (
                    <div className="ml-6 flex flex-col gap-2">
                      <button
                        onClick={() => handleDecision(request.id, 'accept')}
                        disabled={processingId === request.id}
                        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:bg-green-400"
                      >
                        {processingId === request.id ? '...' : 'Accept'}
                      </button>
                      <button
                        onClick={() => handleDecision(request.id, 'decline')}
                        disabled={processingId === request.id}
                        className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredRequests.length === 0 && (
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {activeTab === 'pending' ? 'No pending requests' : `No ${activeTab} requests`}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {activeTab === 'pending'
              ? 'Group booking requests from your partners will appear here.'
              : `Requests you've ${activeTab} will appear here.`}
          </p>
        </div>
      )}
    </div>
  );
}
