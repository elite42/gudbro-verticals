'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useTenant } from '@/lib/contexts/TenantContext';

export const dynamic = 'force-dynamic';

interface OfficePartner {
  id: string;
  companyName: string;
  industry: string | null;
  partnerType: string;
  city: string;
  distanceToMerchantM: number | null;
  employeeCount: number | null;
  hasCanteen: boolean;
  canteenQuality: string | null;
  wfhPolicy: string | null;
  isVerified: boolean;
  isActive: boolean;
}

interface OutreachStatus {
  officeId: string;
  status: string;
  employeesEnrolled: number;
  monthlyRevenue: number;
}

interface DiscoveredOffice {
  name: string;
  industry: string;
  partnerType: string;
  employeeCount: number;
  reason: string;
  potentialValue: number;
  confidence: number;
  hasCanteen: boolean;
}

const PARTNER_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'office', label: 'Office' },
  { value: 'gym', label: 'Gym' },
  { value: 'school', label: 'School' },
  { value: 'coworking', label: 'Coworking' },
  { value: 'hospital', label: 'Hospital' },
];

const INDUSTRIES = [
  { value: '', label: 'All Industries' },
  { value: 'tech', label: 'Technology' },
  { value: 'finance', label: 'Finance' },
  { value: 'legal', label: 'Legal' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'government', label: 'Government' },
];

function getStatusColor(status: string | undefined) {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'negotiating':
      return 'bg-yellow-100 text-yellow-800';
    case 'meeting_scheduled':
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
    case 'active':
      return 'Active Partner';
    case 'negotiating':
      return 'Negotiating';
    case 'meeting_scheduled':
      return 'Meeting Set';
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

function getPartnerTypeIcon(type: string) {
  switch (type) {
    case 'office':
      return '🏢';
    case 'gym':
      return '💪';
    case 'school':
      return '🎓';
    case 'coworking':
      return '🏠';
    case 'hospital':
      return '🏥';
    default:
      return '🏛️';
  }
}

export default function OfficesPage() {
  const { location, isLoading: tenantLoading } = useTenant();
  const [offices, setOffices] = useState<OfficePartner[]>([]);
  const [outreachMap, setOutreachMap] = useState<Record<string, OutreachStatus>>({});
  const [loading, setLoading] = useState(true);
  const [discovering, setDiscovering] = useState(false);
  const [startingOutreach, setStartingOutreach] = useState<string | null>(null);
  const [showDiscoveryModal, setShowDiscoveryModal] = useState(false);
  const [discoveredOffices, setDiscoveredOffices] = useState<DiscoveredOffice[]>([]);

  // Filters
  const [filterType, setFilterType] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch offices and outreach status
  useEffect(() => {
    async function fetchData() {
      if (!location?.id) {
        setLoading(false);
        return;
      }

      try {
        // Fetch offices
        const officesRes = await fetch('/api/ai/conventions?action=list-offices');
        if (officesRes.ok) {
          const data = await officesRes.json();
          if (data.success) {
            setOffices(data.offices || []);
          }
        }

        // Fetch outreach status for this merchant
        const outreachRes = await fetch(
          `/api/ai/conventions?action=office-outreach&merchantId=${location.id}`
        );
        if (outreachRes.ok) {
          const data = await outreachRes.json();
          if (data.success && data.outreach) {
            const map: Record<string, OutreachStatus> = {};
            for (const o of data.outreach) {
              map[o.officeId] = {
                officeId: o.officeId,
                status: o.status,
                employeesEnrolled: o.employeesEnrolled || 0,
                monthlyRevenue: o.monthlyRevenue || 0,
              };
            }
            setOutreachMap(map);
          }
        }
      } catch (error) {
        console.error('Error fetching offices:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!tenantLoading) {
      fetchData();
    }
  }, [location?.id, tenantLoading]);

  // Filtered offices
  const filteredOffices = useMemo(() => {
    return offices.filter((office) => {
      if (filterType && office.partnerType !== filterType) return false;
      if (filterIndustry && office.industry !== filterIndustry) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const nameMatch = office.companyName.toLowerCase().includes(query);
        const cityMatch = office.city.toLowerCase().includes(query);
        if (!nameMatch && !cityMatch) return false;
      }
      return true;
    });
  }, [offices, filterType, filterIndustry, searchQuery]);

  // Discover offices using AI
  const handleDiscover = async () => {
    if (!location?.id) return;

    setDiscovering(true);
    setShowDiscoveryModal(true);
    setDiscoveredOffices([]);

    try {
      const res = await fetch('/api/ai/conventions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: location.id,
          action: 'discover-offices',
          city: location.city,
          countryCode: location.country_code,
          latitude: location.latitude,
          longitude: location.longitude,
          radiusMeters: 5000,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.discovered) {
          setDiscoveredOffices(data.discovered as DiscoveredOffice[]);
        }
      }
    } catch (error) {
      console.error('Error discovering offices:', error);
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

  // Start outreach to an office
  const handleStartOutreach = async (officeId: string) => {
    if (!location?.id) return;

    setStartingOutreach(officeId);
    try {
      const res = await fetch('/api/ai/conventions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: location.id,
          action: 'create-outreach',
          officeId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.outreach) {
          setOutreachMap((prev) => ({
            ...prev,
            [officeId]: {
              officeId,
              status: data.outreach.status,
              employeesEnrolled: 0,
              monthlyRevenue: 0,
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
            <Link href="/partnerships/conventions" className="hover:text-gray-700">
              Conventions
            </Link>
            <span>/</span>
            <span>Offices</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Offices & Companies</h1>
          <p className="mt-1 text-gray-600">
            Discover and partner with nearby offices, gyms, schools and organizations.
          </p>
        </div>
        <button
          onClick={handleDiscover}
          disabled={discovering || !location?.id}
          className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:bg-purple-400"
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
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          {PARTNER_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <select
          value={filterIndustry}
          onChange={(e) => setFilterIndustry(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          {INDUSTRIES.map((industry) => (
            <option key={industry.value} value={industry.value}>
              {industry.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search companies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
        {filteredOffices.length > 0 && (
          <span className="flex items-center text-sm text-gray-500">
            {filteredOffices.length} compan{filteredOffices.length !== 1 ? 'ies' : 'y'}
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

      {/* Offices Grid */}
      {!isLoading && filteredOffices.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredOffices.map((office) => {
            const outreach = outreachMap[office.id];
            const hasOutreach = !!outreach;

            return (
              <div
                key={office.id}
                className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getPartnerTypeIcon(office.partnerType)}</span>
                      <h3 className="font-semibold text-gray-900">{office.companyName}</h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {office.industry || office.partnerType} · {office.city}
                    </p>
                  </div>
                  {office.isVerified && (
                    <span title="Verified" className="text-blue-500">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="mb-4 space-y-2 text-sm text-gray-600">
                  {office.employeeCount && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Employees:</span>
                      <span>{office.employeeCount.toLocaleString()}</span>
                    </div>
                  )}
                  {office.distanceToMerchantM && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Distance:</span>
                      <span>{office.distanceToMerchantM}m</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Canteen:</span>
                    <span>
                      {office.hasCanteen
                        ? office.canteenQuality === 'basic'
                          ? 'Basic canteen'
                          : 'Has canteen'
                        : 'No canteen'}
                    </span>
                    {!office.hasCanteen && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                        Good prospect
                      </span>
                    )}
                  </div>
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
                      onClick={() => handleStartOutreach(office.id)}
                      disabled={startingOutreach === office.id}
                      className="text-sm font-medium text-purple-600 hover:text-purple-700 disabled:text-purple-400"
                    >
                      {startingOutreach === office.id ? 'Starting...' : 'Start Outreach'}
                    </button>
                  ) : (
                    <Link
                      href={`/partnerships/conventions/active?partner=${office.id}`}
                      className="text-sm font-medium text-purple-600 hover:text-purple-700"
                    >
                      View Details
                    </Link>
                  )}
                </div>

                {/* Revenue if active */}
                {outreach?.status === 'active' && outreach.monthlyRevenue > 0 && (
                  <div className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
                    €{outreach.monthlyRevenue.toLocaleString()}/month · {outreach.employeesEnrolled}{' '}
                    enrolled
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredOffices.length === 0 && (
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
            {offices.length === 0 ? 'No office partners yet' : 'No matching companies'}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {offices.length === 0
              ? 'Click "Discover Partners" to find offices and companies nearby.'
              : 'Try adjusting your filters to see more results.'}
          </p>
          {offices.length === 0 && (
            <button
              onClick={handleDiscover}
              disabled={discovering || !location?.id}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:bg-purple-400"
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
                <svg className="h-12 w-12 animate-spin text-purple-600" viewBox="0 0 24 24">
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
                <p className="mt-4 text-lg font-medium text-gray-900">Analyzing your area...</p>
                <p className="mt-2 text-sm text-gray-500">
                  AI is identifying offices and companies nearby for potential conventions
                </p>
              </div>
            ) : discoveredOffices.length === 0 ? (
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
                  AI couldn&apos;t find suggestions for your area. Try expanding your search.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Found <strong>{discoveredOffices.length}</strong> potential partners
                  </p>
                </div>

                <div className="space-y-3">
                  {discoveredOffices.map((office, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-purple-200 hover:bg-purple-50/50"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {getPartnerTypeIcon(office.partnerType)}
                            </span>
                            <h3 className="font-semibold text-gray-900">{office.name}</h3>
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-medium ${getConfidenceColor(office.confidence)}`}
                            >
                              {Math.round(office.confidence * 100)}% match
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">{office.reason}</p>
                          <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                            <span>{office.industry}</span>
                            <span>·</span>
                            <span>{office.employeeCount} employees</span>
                            {!office.hasCanteen && (
                              <>
                                <span>·</span>
                                <span className="text-green-600">No canteen</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <div className="text-lg font-bold text-green-600">
                            €{office.potentialValue.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">potential/month</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg bg-purple-50 p-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 text-purple-600"
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
                      <p className="text-sm font-medium text-purple-900">
                        AI-Generated Suggestions
                      </p>
                      <p className="mt-1 text-sm text-purple-700">
                        These are AI suggestions based on your location. Companies without canteens
                        are typically great prospects as employees need lunch options.
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
