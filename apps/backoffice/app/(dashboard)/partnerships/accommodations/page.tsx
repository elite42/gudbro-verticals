'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useTenant } from '@/lib/contexts/TenantContext';
import { InfoTooltip } from '@/components/ui/info-tooltip';

export const dynamic = 'force-dynamic';

interface AccommodationPartner {
  id: string;
  name: string;
  accommodationType: string | null;
  address: string | null;
  city: string;
  countryCode: string;
  distanceToMerchantM: number | null;
  contactEmail: string | null;
  contactPhone: string | null;
  website: string | null;
  roomCount: number | null;
  avgGuestsPerDay: number | null;
  starRating: number | null;
  propertiesCount: number | null;
  isSuperhost: boolean | null;
  businessVsLeisure: 'business' | 'leisure' | 'mixed' | null;
  needsBreakfast: boolean;
  needsLunch: boolean;
  needsDinner: boolean;
  needsRecommendations: boolean;
  isVerified: boolean;
  isActive: boolean;
}

interface OutreachStatus {
  accommodationId: string;
  status: string;
  discountPercent: number | null;
  partnershipType: string | null;
  guestsReferred: number;
  revenueGenerated: number;
}

const ACCOMMODATION_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'hotel', label: 'Hotels' },
  { value: 'hostel', label: 'Hostels' },
  { value: 'b_and_b', label: 'B&B' },
  { value: 'airbnb_host', label: 'Airbnb Hosts' },
  { value: 'aparthotel', label: 'Aparthotels' },
];

const DISTANCE_OPTIONS = [
  { value: '', label: 'Any Distance' },
  { value: '200', label: 'Within 200m' },
  { value: '500', label: 'Within 500m' },
  { value: '1000', label: 'Within 1km' },
  { value: '2000', label: 'Within 2km' },
];

function getStatusColor(status: string | undefined) {
  switch (status) {
    case 'partnership_active':
      return 'bg-green-100 text-green-800';
    case 'negotiating':
      return 'bg-yellow-100 text-yellow-800';
    case 'responded':
      return 'bg-blue-100 text-blue-800';
    case 'contacted':
      return 'bg-purple-100 text-purple-800';
    case 'declined':
    case 'no_response':
      return 'bg-gray-100 text-gray-600';
    default:
      return 'bg-gray-50 text-gray-500';
  }
}

function getStatusLabel(status: string | undefined) {
  switch (status) {
    case 'partnership_active':
      return 'Active Partner';
    case 'negotiating':
      return 'Negotiating';
    case 'responded':
      return 'Responded';
    case 'contacted':
      return 'Contacted';
    case 'declined':
      return 'Declined';
    case 'no_response':
      return 'No Response';
    case 'suggested':
      return 'Suggested';
    default:
      return 'New';
  }
}

function getTypeIcon(type: string | null) {
  switch (type) {
    case 'hotel':
      return '🏨';
    case 'hostel':
      return '🏠';
    case 'b_and_b':
      return '🛏️';
    case 'airbnb_host':
      return '🏡';
    case 'aparthotel':
      return '🏢';
    default:
      return '🏘️';
  }
}

function formatDistance(meters: number | null) {
  if (meters === null) return null;
  if (meters < 1000) return `${meters}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}

function getStarRating(stars: number | null) {
  if (stars === null) return '';
  return '⭐'.repeat(Math.min(stars, 5));
}

interface DiscoveredPartner {
  type: 'tour_operator' | 'accommodation';
  name: string;
  reason: string;
  potentialValue: number;
  confidence: number;
}

export default function AccommodationsPage() {
  const { location, isLoading: tenantLoading } = useTenant();
  const [accommodations, setAccommodations] = useState<AccommodationPartner[]>([]);
  const [outreachMap, setOutreachMap] = useState<Record<string, OutreachStatus>>({});
  const [loading, setLoading] = useState(true);
  const [discovering, setDiscovering] = useState(false);
  const [startingOutreach, setStartingOutreach] = useState<string | null>(null);
  const [showDiscoveryModal, setShowDiscoveryModal] = useState(false);
  const [discoveredPartners, setDiscoveredPartners] = useState<DiscoveredPartner[]>([]);

  // Filters
  const [filterType, setFilterType] = useState('');
  const [filterDistance, setFilterDistance] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch accommodations and outreach status
  useEffect(() => {
    async function fetchData() {
      if (!location?.id) {
        setLoading(false);
        return;
      }

      try {
        // Build query params
        const params = new URLSearchParams({
          action: 'list-accommodations',
        });
        if (filterType) params.append('type', filterType);
        if (filterDistance) params.append('maxDistance', filterDistance);

        // Fetch accommodations
        const accomRes = await fetch(`/api/ai/tourism-partnerships?${params}`);
        if (accomRes.ok) {
          const data = await accomRes.json();
          if (data.success) {
            setAccommodations(data.accommodations || []);
          }
        }

        // Fetch outreach status for this merchant
        const outreachRes = await fetch(
          `/api/ai/tourism-partnerships?action=accommodation-outreach&merchantId=${location.id}`
        );
        if (outreachRes.ok) {
          const data = await outreachRes.json();
          if (data.success && data.outreach) {
            const map: Record<string, OutreachStatus> = {};
            for (const o of data.outreach) {
              map[o.accommodationId] = {
                accommodationId: o.accommodationId,
                status: o.status,
                discountPercent: o.discountPercent,
                partnershipType: o.partnershipType,
                guestsReferred: o.guestsReferred || 0,
                revenueGenerated: o.revenueGenerated || 0,
              };
            }
            setOutreachMap(map);
          }
        }
      } catch (error) {
        console.error('Error fetching accommodations:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!tenantLoading) {
      fetchData();
    }
  }, [location?.id, tenantLoading, filterType, filterDistance]);

  // Filtered accommodations (search only, type/distance handled by API)
  const filteredAccommodations = useMemo(() => {
    if (!searchQuery) return accommodations;
    const query = searchQuery.toLowerCase();
    return accommodations.filter((acc) => {
      const nameMatch = acc.name.toLowerCase().includes(query);
      const cityMatch = acc.city.toLowerCase().includes(query);
      const addressMatch = acc.address?.toLowerCase().includes(query);
      return nameMatch || cityMatch || addressMatch;
    });
  }, [accommodations, searchQuery]);

  // Discover nearby accommodations
  const handleDiscover = async () => {
    if (!location?.id) return;

    setDiscovering(true);
    setShowDiscoveryModal(true);
    setDiscoveredPartners([]);

    try {
      const res = await fetch('/api/ai/tourism-partnerships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: location.id,
          action: 'discover-partners',
          city: location.city,
          countryCode: location.country_code,
          latitude: location.latitude,
          longitude: location.longitude,
          radiusMeters: parseInt(filterDistance) || 1000,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.discovered) {
          // Filter only accommodations
          const accommodationSuggestions = (data.discovered as DiscoveredPartner[]).filter(
            (p) => p.type === 'accommodation'
          );
          setDiscoveredPartners(accommodationSuggestions);
        }

        // Refresh the list
        const params = new URLSearchParams({ action: 'list-accommodations' });
        if (filterType) params.append('type', filterType);
        if (filterDistance) params.append('maxDistance', filterDistance);

        const accomRes = await fetch(`/api/ai/tourism-partnerships?${params}`);
        if (accomRes.ok) {
          const refreshData = await accomRes.json();
          if (refreshData.success) {
            setAccommodations(refreshData.accommodations || []);
          }
        }
      }
    } catch (error) {
      console.error('Error discovering accommodations:', error);
    } finally {
      setDiscovering(false);
    }
  };

  // Get confidence color
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-100 text-green-700';
    if (confidence >= 0.6) return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-600';
  };

  // Start outreach to an accommodation
  const handleStartOutreach = async (accommodationId: string) => {
    if (!location?.id) return;

    setStartingOutreach(accommodationId);
    try {
      const res = await fetch('/api/ai/tourism-partnerships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: location.id,
          action: 'create-accommodation-outreach',
          accommodationId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.outreach) {
          setOutreachMap((prev) => ({
            ...prev,
            [accommodationId]: {
              accommodationId,
              status: data.outreach.status,
              discountPercent: data.outreach.discountPercent,
              partnershipType: data.outreach.partnershipType,
              guestsReferred: 0,
              revenueGenerated: 0,
            },
          }));
        }
      }
    } catch (error) {
      console.error('Error starting outreach:', error);
    } finally {
      setStartingOutreach(null);
    }
  };

  const isLoading = loading || tenantLoading;

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
          <div className="flex items-center gap-2">
            <h1 className="mt-1 text-2xl font-bold text-gray-900">Accommodations</h1>
            <InfoTooltip contentKey="pages.accommodations" kbPageId="partnerships-accommodations" />
          </div>
          <p className="mt-1 text-gray-600">
            Partner with nearby hotels, hostels, and Airbnb hosts.
          </p>
        </div>
        <button
          onClick={handleDiscover}
          disabled={discovering || !location?.id}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:bg-green-400"
        >
          {discovering ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Finding...
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Find Accommodations
            </>
          )}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          {ACCOMMODATION_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <select
          value={filterDistance}
          onChange={(e) => setFilterDistance(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          {DISTANCE_OPTIONS.map((dist) => (
            <option key={dist.value} value={dist.value}>
              {dist.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search accommodations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        {filteredAccommodations.length > 0 && (
          <span className="flex items-center text-sm text-gray-500">
            {filteredAccommodations.length} accommodation
            {filteredAccommodations.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-4 h-6 w-3/4 rounded bg-gray-200" />
              <div className="mb-2 h-4 w-1/2 rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      )}

      {/* Accommodations Grid */}
      {!isLoading && filteredAccommodations.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAccommodations.map((accom) => {
            const outreach = outreachMap[accom.id];
            const hasOutreach = !!outreach;

            return (
              <div
                key={accom.id}
                className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getTypeIcon(accom.accommodationType)}</span>
                      <h3 className="font-semibold text-gray-900">{accom.name}</h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {accom.accommodationType?.replace('_', ' ') || 'Accommodation'}
                      {accom.distanceToMerchantM && (
                        <span> · {formatDistance(accom.distanceToMerchantM)}</span>
                      )}
                    </p>
                  </div>
                  {accom.isSuperhost && (
                    <span
                      title="Superhost"
                      className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700"
                    >
                      ★ Superhost
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="mb-4 space-y-2 text-sm text-gray-600">
                  {accom.starRating && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Rating:</span>
                      <span>{getStarRating(accom.starRating)}</span>
                    </div>
                  )}
                  {accom.roomCount && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Rooms:</span>
                      <span>{accom.roomCount}</span>
                    </div>
                  )}
                  {accom.avgGuestsPerDay && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Avg guests:</span>
                      <span>{accom.avgGuestsPerDay}/day</span>
                    </div>
                  )}
                  {accom.address && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Address:</span>
                      <span className="truncate">{accom.address}</span>
                    </div>
                  )}
                </div>

                {/* Needs */}
                {(accom.needsBreakfast ||
                  accom.needsLunch ||
                  accom.needsDinner ||
                  accom.needsRecommendations) && (
                  <div className="mb-4 flex flex-wrap gap-1">
                    {accom.needsBreakfast && (
                      <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs text-orange-700">
                        Breakfast
                      </span>
                    )}
                    {accom.needsLunch && (
                      <span className="rounded-full bg-yellow-50 px-2 py-0.5 text-xs text-yellow-700">
                        Lunch
                      </span>
                    )}
                    {accom.needsDinner && (
                      <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs text-purple-700">
                        Dinner
                      </span>
                    )}
                    {accom.needsRecommendations && (
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
                        Recommends
                      </span>
                    )}
                  </div>
                )}

                {/* Status & Actions */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(outreach?.status)}`}
                  >
                    {getStatusLabel(outreach?.status)}
                  </span>

                  {!hasOutreach ? (
                    <button
                      onClick={() => handleStartOutreach(accom.id)}
                      disabled={startingOutreach === accom.id}
                      className="text-sm font-medium text-green-600 hover:text-green-700 disabled:text-green-400"
                    >
                      {startingOutreach === accom.id ? 'Starting...' : 'Start Outreach'}
                    </button>
                  ) : (
                    <Link
                      href={`/partnerships/outreach?accommodation=${accom.id}`}
                      className="text-sm font-medium text-green-600 hover:text-green-700"
                    >
                      View Details
                    </Link>
                  )}
                </div>

                {/* Partnership info if active */}
                {outreach?.status === 'partnership_active' && (
                  <div className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
                    {outreach.discountPercent && (
                      <span>{outreach.discountPercent}% discount · </span>
                    )}
                    {outreach.guestsReferred > 0 && (
                      <span>{outreach.guestsReferred} guests referred</span>
                    )}
                    {outreach.revenueGenerated > 0 && (
                      <span> · €{outreach.revenueGenerated.toLocaleString()}</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredAccommodations.length === 0 && (
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
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {accommodations.length === 0 ? 'No accommodations yet' : 'No matching accommodations'}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {accommodations.length === 0
              ? 'Click "Find Accommodations" to discover hotels and hosts near your venue.'
              : 'Try adjusting your filters to see more results.'}
          </p>
          {accommodations.length === 0 && (
            <button
              onClick={handleDiscover}
              disabled={discovering || !location?.id}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:bg-green-400"
            >
              {discovering ? 'Finding...' : 'Find Accommodations'}
            </button>
          )}
        </div>
      )}

      {/* AI Discovery Modal */}
      {showDiscoveryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => !discovering && setShowDiscoveryModal(false)}
        >
          <div
            className="mx-4 max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <svg
                      className="h-5 w-5 text-green-600"
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
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">AI Accommodation Discovery</h2>
                    <p className="text-sm text-gray-500">
                      {location?.city}, {location?.country_code}
                    </p>
                  </div>
                </div>
              </div>
              {!discovering && (
                <button
                  onClick={() => setShowDiscoveryModal(false)}
                  className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {discovering ? (
              <div className="mt-8 flex flex-col items-center py-12">
                <svg className="h-12 w-12 animate-spin text-green-600" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <p className="mt-4 text-lg font-medium text-gray-900">Analyzing nearby area...</p>
                <p className="mt-2 text-sm text-gray-500">
                  AI is identifying accommodation partners near your venue
                </p>
              </div>
            ) : discoveredPartners.length === 0 ? (
              <div className="mt-8 py-12 text-center">
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
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-4 text-lg font-medium text-gray-900">No suggestions found</p>
                <p className="mt-2 text-sm text-gray-500">
                  AI couldn&apos;t find accommodation suggestions nearby. Try expanding your search
                  radius.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Found <strong>{discoveredPartners.length}</strong> potential accommodation
                    partners
                  </p>
                </div>

                <div className="space-y-3">
                  {discoveredPartners.map((partner, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-green-200 hover:bg-green-50/50"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-medium ${getConfidenceColor(partner.confidence)}`}
                            >
                              {Math.round(partner.confidence * 100)}% match
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">{partner.reason}</p>
                        </div>
                        <div className="ml-4 text-right">
                          <div className="text-lg font-bold text-green-600">
                            €{partner.potentialValue.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">potential/month</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg bg-green-50 p-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-green-900">AI-Generated Suggestions</p>
                      <p className="mt-1 text-sm text-green-700">
                        These are AI-generated suggestions based on your location. Actual
                        accommodations may need to be researched and contacted manually. Browse the
                        accommodation list to find and start outreach to real partners.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDiscoveryModal(false)}
                disabled={discovering}
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50"
              >
                {discovering ? 'Please wait...' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
