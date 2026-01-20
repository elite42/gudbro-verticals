'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useTenant } from '@/lib/contexts/TenantContext';
import { InfoTooltip } from '@/components/ui/info-tooltip';

export const dynamic = 'force-dynamic';

interface TourOperator {
  id: string;
  name: string;
  countryCode: string;
  website: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  operatorType: string | null;
  regionsCovered: string[];
  poisVisited: string[];
  typicalGroupSizeMin: number | null;
  typicalGroupSizeMax: number | null;
  mealBudgetMin: number | null;
  mealBudgetMax: number | null;
  volumeEstimate: 'high' | 'medium' | 'low' | null;
  isVerified: boolean;
  isActive: boolean;
}

interface OutreachStatus {
  operatorId: string;
  status: string;
  revenueGenerated: number;
  bookingsGenerated: number;
}

const OPERATOR_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'bus_operator', label: 'Bus Operator' },
  { value: 'cruise', label: 'Cruise' },
  { value: 'cultural', label: 'Cultural Tours' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'food_and_wine', label: 'Food & Wine' },
  { value: 'senior', label: 'Senior Tours' },
  { value: 'student', label: 'Student Groups' },
];

const COUNTRIES = [
  { value: '', label: 'All Countries' },
  { value: 'US', label: 'United States' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'IT', label: 'Italy' },
  { value: 'ES', label: 'Spain' },
  { value: 'JP', label: 'Japan' },
  { value: 'CN', label: 'China' },
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

function getVolumeIcon(volume: string | null) {
  switch (volume) {
    case 'high':
      return '🔥';
    case 'medium':
      return '📊';
    case 'low':
      return '📉';
    default:
      return '';
  }
}

interface DiscoveredPartner {
  type: 'tour_operator' | 'accommodation';
  name: string;
  reason: string;
  potentialValue: number;
  confidence: number;
}

export default function TourOperatorsPage() {
  const { location, isLoading: tenantLoading } = useTenant();
  const [operators, setOperators] = useState<TourOperator[]>([]);
  const [outreachMap, setOutreachMap] = useState<Record<string, OutreachStatus>>({});
  const [loading, setLoading] = useState(true);
  const [discovering, setDiscovering] = useState(false);
  const [startingOutreach, setStartingOutreach] = useState<string | null>(null);
  const [showDiscoveryModal, setShowDiscoveryModal] = useState(false);
  const [discoveredPartners, setDiscoveredPartners] = useState<DiscoveredPartner[]>([]);

  // Filters
  const [filterType, setFilterType] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch operators and outreach status
  useEffect(() => {
    async function fetchData() {
      if (!location?.id) {
        setLoading(false);
        return;
      }

      try {
        // Fetch tour operators
        const operatorsRes = await fetch('/api/ai/tourism-partnerships?action=list-tour-operators');
        if (operatorsRes.ok) {
          const data = await operatorsRes.json();
          if (data.success) {
            setOperators(data.tourOperators || []);
          }
        }

        // Fetch outreach status for this merchant
        const outreachRes = await fetch(
          `/api/ai/tourism-partnerships?action=tour-operator-outreach&merchantId=${location.id}`
        );
        if (outreachRes.ok) {
          const data = await outreachRes.json();
          if (data.success && data.outreach) {
            const map: Record<string, OutreachStatus> = {};
            for (const o of data.outreach) {
              map[o.operatorId] = {
                operatorId: o.operatorId,
                status: o.status,
                revenueGenerated: o.revenueGenerated || 0,
                bookingsGenerated: o.bookingsGenerated || 0,
              };
            }
            setOutreachMap(map);
          }
        }
      } catch (error) {
        console.error('Error fetching tour operators:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!tenantLoading) {
      fetchData();
    }
  }, [location?.id, tenantLoading]);

  // Filtered operators
  const filteredOperators = useMemo(() => {
    return operators.filter((op) => {
      if (filterType && op.operatorType !== filterType) return false;
      if (filterCountry && op.countryCode !== filterCountry) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const nameMatch = op.name.toLowerCase().includes(query);
        const regionMatch = op.regionsCovered.some((r) => r.toLowerCase().includes(query));
        if (!nameMatch && !regionMatch) return false;
      }
      return true;
    });
  }, [operators, filterType, filterCountry, searchQuery]);

  // Discover partners using AI
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
          radiusMeters: 50000,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.discovered) {
          // Filter only tour operators
          const tourOperatorSuggestions = (data.discovered as DiscoveredPartner[]).filter(
            (p) => p.type === 'tour_operator'
          );
          setDiscoveredPartners(tourOperatorSuggestions);
        }

        // Refresh the list
        const operatorsRes = await fetch('/api/ai/tourism-partnerships?action=list-tour-operators');
        if (operatorsRes.ok) {
          const refreshData = await operatorsRes.json();
          if (refreshData.success) {
            setOperators(refreshData.tourOperators || []);
          }
        }
      }
    } catch (error) {
      console.error('Error discovering partners:', error);
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

  // Start outreach to an operator
  const handleStartOutreach = async (operatorId: string) => {
    if (!location?.id) return;

    setStartingOutreach(operatorId);
    try {
      const res = await fetch('/api/ai/tourism-partnerships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: location.id,
          action: 'create-tour-operator-outreach',
          operatorId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.outreach) {
          setOutreachMap((prev) => ({
            ...prev,
            [operatorId]: {
              operatorId,
              status: data.outreach.status,
              revenueGenerated: 0,
              bookingsGenerated: 0,
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
            <span>Tour Operators</span>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="mt-1 text-2xl font-bold text-gray-900">Tour Operators</h1>
            <InfoTooltip contentKey="pages.tourOperators" kbPageId="partnerships-tour-operators" />
          </div>
          <p className="mt-1 text-gray-600">
            Discover and connect with tour operators that bring groups to your area.
          </p>
        </div>
        <button
          onClick={handleDiscover}
          disabled={discovering || !location?.id}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400"
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
              Discovering...
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Discover Partners
            </>
          )}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {OPERATOR_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <select
          value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {COUNTRIES.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search operators..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {filteredOperators.length > 0 && (
          <span className="flex items-center text-sm text-gray-500">
            {filteredOperators.length} operator{filteredOperators.length !== 1 ? 's' : ''}
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

      {/* Operators Grid */}
      {!isLoading && filteredOperators.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredOperators.map((operator) => {
            const outreach = outreachMap[operator.id];
            const hasOutreach = !!outreach;

            return (
              <div
                key={operator.id}
                className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{operator.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {operator.countryCode} ·{' '}
                      {operator.operatorType?.replace('_', ' ') || 'Tour Operator'}
                    </p>
                  </div>
                  {operator.volumeEstimate && (
                    <span title={`${operator.volumeEstimate} volume`} className="text-lg">
                      {getVolumeIcon(operator.volumeEstimate)}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="mb-4 space-y-2 text-sm text-gray-600">
                  {operator.typicalGroupSizeMin && operator.typicalGroupSizeMax && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Group:</span>
                      <span>
                        {operator.typicalGroupSizeMin}-{operator.typicalGroupSizeMax} pax
                      </span>
                    </div>
                  )}
                  {operator.mealBudgetMin && operator.mealBudgetMax && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Budget:</span>
                      <span>
                        €{operator.mealBudgetMin}-€{operator.mealBudgetMax}/person
                      </span>
                    </div>
                  )}
                  {operator.regionsCovered.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Regions:</span>
                      <span className="truncate">
                        {operator.regionsCovered.slice(0, 2).join(', ')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Status & Actions */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(outreach?.status)}`}
                  >
                    {getStatusLabel(outreach?.status)}
                  </span>

                  {!hasOutreach ? (
                    <button
                      onClick={() => handleStartOutreach(operator.id)}
                      disabled={startingOutreach === operator.id}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 disabled:text-blue-400"
                    >
                      {startingOutreach === operator.id ? 'Starting...' : 'Start Outreach'}
                    </button>
                  ) : (
                    <Link
                      href={`/partnerships/outreach?operator=${operator.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      View Details
                    </Link>
                  )}
                </div>

                {/* Revenue if active */}
                {outreach?.status === 'partnership_active' && outreach.revenueGenerated > 0 && (
                  <div className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
                    €{outreach.revenueGenerated.toLocaleString()} revenue ·{' '}
                    {outreach.bookingsGenerated} bookings
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredOperators.length === 0 && (
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
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {operators.length === 0 ? 'No tour operators yet' : 'No matching operators'}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {operators.length === 0
              ? 'Click "Discover Partners" to find tour operators that visit your area.'
              : 'Try adjusting your filters to see more results.'}
          </p>
          {operators.length === 0 && (
            <button
              onClick={handleDiscover}
              disabled={discovering || !location?.id}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400"
            >
              {discovering ? 'Discovering...' : 'Discover Partners'}
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <svg
                      className="h-5 w-5 text-blue-600"
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
                    <h2 className="text-xl font-bold text-gray-900">AI Partner Discovery</h2>
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
                <svg className="h-12 w-12 animate-spin text-blue-600" viewBox="0 0 24 24">
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
                <p className="mt-4 text-lg font-medium text-gray-900">Analyzing your location...</p>
                <p className="mt-2 text-sm text-gray-500">
                  AI is identifying potential tour operator partners in your area
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
                  AI couldn&apos;t find tour operator suggestions for your area. Try expanding your
                  search radius.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Found <strong>{discoveredPartners.length}</strong> potential tour operator
                    partners
                  </p>
                </div>

                <div className="space-y-3">
                  {discoveredPartners.map((partner, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-blue-200 hover:bg-blue-50/50"
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

                <div className="rounded-lg bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 text-blue-600"
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
                      <p className="text-sm font-medium text-blue-900">AI-Generated Suggestions</p>
                      <p className="mt-1 text-sm text-blue-700">
                        These are AI-generated suggestions based on your location and venue type.
                        Actual partners may need to be researched and contacted manually. Browse the
                        operator list to find and start outreach to real partners.
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
