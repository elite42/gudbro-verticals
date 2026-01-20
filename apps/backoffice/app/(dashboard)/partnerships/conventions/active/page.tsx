'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useTenant } from '@/lib/contexts/TenantContext';
import { InfoTooltip } from '@/components/ui/info-tooltip';

export const dynamic = 'force-dynamic';

interface Convention {
  id: string;
  merchantId: string;
  partnerType: string;
  partnerId: string;
  partnerName: string;
  conventionName: string;
  benefitType: string;
  benefitValue: number | null;
  benefitDescription: string | null;
  validFrom: string;
  validUntil: string | null;
  validDays: number[];
  validTimeStart: string;
  validTimeEnd: string;
  verificationMethod: string;
  currentDailyCode: string | null;
  isActive: boolean;
  totalRedemptions: number;
  totalRevenueGenerated: number;
}

const PARTNER_TYPES = [
  { value: '', label: 'All Partners' },
  { value: 'office', label: 'Offices' },
  { value: 'gym', label: 'Gyms' },
  { value: 'school', label: 'Schools' },
  { value: 'tour_operator', label: 'Tour Operators' },
  { value: 'accommodation', label: 'Hotels' },
];

const BENEFIT_TYPES = [
  { value: '', label: 'All Benefits' },
  { value: 'percentage_discount', label: 'Percentage Off' },
  { value: 'fixed_discount', label: 'Fixed Discount' },
  { value: 'free_item', label: 'Free Item' },
  { value: 'special_price', label: 'Special Price' },
];

function getBenefitDisplay(type: string, value: number | null) {
  switch (type) {
    case 'percentage_discount':
      return `${value || 0}% off`;
    case 'fixed_discount':
      return `€${value || 0} off`;
    case 'free_item':
      return 'Free item';
    case 'special_price':
      return `€${value || 0} menu`;
    case 'points_multiplier':
      return `${value || 2}x points`;
    default:
      return 'Discount';
  }
}

function getDaysDisplay(days: number[]) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  if (days.length === 7) return 'Every day';
  if (JSON.stringify(days.sort()) === JSON.stringify([1, 2, 3, 4, 5])) return 'Weekdays';
  if (JSON.stringify(days.sort()) === JSON.stringify([0, 6])) return 'Weekends';
  return days.map((d) => dayNames[d]).join(', ');
}

function getPartnerTypeIcon(type: string) {
  switch (type) {
    case 'office':
      return '🏢';
    case 'gym':
      return '💪';
    case 'school':
      return '🎓';
    case 'tour_operator':
      return '🚌';
    case 'accommodation':
      return '🏨';
    default:
      return '🤝';
  }
}

export default function ActiveConventionsPage() {
  const { location, isLoading: tenantLoading } = useTenant();
  const [conventions, setConventions] = useState<Convention[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);

  // Filters
  const [filterPartnerType, setFilterPartnerType] = useState('');
  const [filterBenefitType, setFilterBenefitType] = useState('');
  const [showInactive, setShowInactive] = useState(false);

  useEffect(() => {
    async function fetchConventions() {
      if (!location?.id) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `/api/ai/conventions?action=list-conventions&merchantId=${location.id}`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setConventions(data.conventions || []);
          }
        }
      } catch (error) {
        console.error('Error fetching conventions:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!tenantLoading) {
      fetchConventions();
    }
  }, [location?.id, tenantLoading]);

  const filteredConventions = useMemo(() => {
    return conventions.filter((conv) => {
      if (!showInactive && !conv.isActive) return false;
      if (filterPartnerType && conv.partnerType !== filterPartnerType) return false;
      if (filterBenefitType && conv.benefitType !== filterBenefitType) return false;
      return true;
    });
  }, [conventions, filterPartnerType, filterBenefitType, showInactive]);

  const handleToggle = async (id: string, currentState: boolean) => {
    if (!location?.id) return;

    setToggling(id);
    try {
      const res = await fetch('/api/ai/conventions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle-convention',
          conventionId: id,
          isActive: !currentState,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setConventions((prev) =>
            prev.map((c) => (c.id === id ? { ...c, isActive: !currentState } : c))
          );
        }
      }
    } catch (error) {
      console.error('Error toggling convention:', error);
    } finally {
      setToggling(null);
    }
  };

  const isLoading = loading || tenantLoading;

  const activeCount = conventions.filter((c) => c.isActive).length;
  const totalRevenue = conventions.reduce((sum, c) => sum + c.totalRevenueGenerated, 0);

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
            <span>Active</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">Active Conventions</h1>
            <InfoTooltip contentKey="pages.activeConventions" kbPageId="conventions-active" />
          </div>
          <p className="mt-1 text-gray-600">
            Manage your corporate discount conventions and special offers.
          </p>
        </div>
        <Link
          href="/partnerships/conventions/offices"
          className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Convention
        </Link>
      </div>

      {/* Stats */}
      {!isLoading && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="text-sm font-medium text-gray-500">Active Conventions</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{activeCount}</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="text-sm font-medium text-gray-500">Total Redemptions</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">
              {conventions.reduce((sum, c) => sum + c.totalRedemptions, 0)}
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="text-sm font-medium text-gray-500">Revenue Generated</div>
            <div className="mt-1 text-2xl font-bold text-green-600">
              €{totalRevenue.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filterPartnerType}
          onChange={(e) => setFilterPartnerType(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          {PARTNER_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <select
          value={filterBenefitType}
          onChange={(e) => setFilterBenefitType(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          {BENEFIT_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={showInactive}
            onChange={(e) => setShowInactive(e.target.checked)}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          Show inactive
        </label>
        {filteredConventions.length > 0 && (
          <span className="ml-auto text-sm text-gray-500">
            {filteredConventions.length} convention{filteredConventions.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div className="h-6 w-1/3 rounded bg-gray-200" />
                <div className="h-8 w-24 rounded bg-gray-200" />
              </div>
              <div className="mt-4 h-4 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      )}

      {/* Conventions List */}
      {!isLoading && filteredConventions.length > 0 && (
        <div className="space-y-4">
          {filteredConventions.map((conv) => (
            <div
              key={conv.id}
              className={`rounded-xl border bg-white p-6 transition-colors ${
                conv.isActive ? 'border-gray-200' : 'border-gray-100 bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getPartnerTypeIcon(conv.partnerType)}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{conv.conventionName}</h3>
                      <p className="text-sm text-gray-500">{conv.partnerName}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        conv.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {conv.isActive ? 'Active' : 'Paused'}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div className="rounded-lg bg-purple-50 px-3 py-1.5">
                      <span className="font-medium text-purple-700">
                        {getBenefitDisplay(conv.benefitType, conv.benefitValue)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <svg
                        className="h-4 w-4"
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
                      {getDaysDisplay(conv.validDays)}
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {conv.validTimeStart} - {conv.validTimeEnd}
                    </div>
                    {conv.currentDailyCode && (
                      <div className="flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-blue-700">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                          />
                        </svg>
                        <span className="font-mono font-medium">{conv.currentDailyCode}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
                    <div>
                      <span className="font-medium text-gray-900">{conv.totalRedemptions}</span>{' '}
                      redemptions
                    </div>
                    <div>
                      <span className="font-medium text-green-600">
                        €{conv.totalRevenueGenerated.toLocaleString()}
                      </span>{' '}
                      revenue
                    </div>
                  </div>
                </div>

                <div className="ml-4 flex flex-col items-end gap-2">
                  <button
                    onClick={() => handleToggle(conv.id, conv.isActive)}
                    disabled={toggling === conv.id}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                      conv.isActive
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    } disabled:opacity-50`}
                  >
                    {toggling === conv.id ? '...' : conv.isActive ? 'Pause' : 'Activate'}
                  </button>
                  <Link
                    href={`/partnerships/conventions/vouchers?convention=${conv.id}`}
                    className="text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    View Vouchers
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredConventions.length === 0 && (
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
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {conventions.length === 0 ? 'No conventions yet' : 'No matching conventions'}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {conventions.length === 0
              ? 'Start by finding partner companies and creating conventions for them.'
              : 'Try adjusting your filters to see more results.'}
          </p>
          {conventions.length === 0 && (
            <Link
              href="/partnerships/conventions/offices"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
            >
              Find Partners
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
