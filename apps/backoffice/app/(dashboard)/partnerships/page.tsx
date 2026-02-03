'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useTenant } from '@/lib/contexts/TenantContext';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { formatPrice as _fp } from '@gudbro/utils';

export const dynamic = 'force-dynamic';

interface PartnershipMetrics {
  tourOperators: {
    total: number;
    byStatus: Record<string, number>;
    totalBookings: number;
    totalRevenue: number;
  };
  accommodations: {
    total: number;
    byStatus: Record<string, number>;
    totalGuestsReferred: number;
    totalRevenue: number;
  };
  activePartnerships: number;
  monthlyRevenueEstimate: number;
}

interface BookingStats {
  pendingCount: number;
}

export default function PartnershipsPage() {
  const t = useTranslations('partnershipsPage');
  const { location, isLoading: tenantLoading } = useTenant();
  const [metrics, setMetrics] = useState<PartnershipMetrics | null>(null);
  const [bookingStats, setBookingStats] = useState<BookingStats>({ pendingCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!location?.id) {
        setLoading(false);
        return;
      }

      try {
        // Fetch partnership metrics
        const metricsRes = await fetch(
          `/api/ai/tourism-partnerships?action=metrics&merchantId=${location.id}`
        );
        if (metricsRes.ok) {
          const metricsData = await metricsRes.json();
          if (metricsData.success) {
            setMetrics(metricsData.metrics);
          }
        }

        // Fetch pending bookings count
        const bookingsRes = await fetch(
          `/api/ai/tourism-bookings?action=requests&merchantId=${location.id}&status=pending`
        );
        if (bookingsRes.ok) {
          const bookingsData = await bookingsRes.json();
          if (bookingsData.success) {
            setBookingStats({ pendingCount: bookingsData.count || 0 });
          }
        }
      } catch (error) {
        console.error('Error fetching partnership data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!tenantLoading) {
      fetchData();
    }
  }, [location?.id, tenantLoading]);

  const isLoading = loading || tenantLoading;

  // Format numbers for display
  const formatNumber = (num: number | undefined) => {
    if (num === undefined) return '0';
    return num.toLocaleString();
  };

  const formatCurrency = (num: number | undefined) => {
    if (num === undefined)
      return _fp(0, 'EUR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    return _fp(num, 'EUR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
          <InfoTooltip contentKey="nav.partnerships" kbPageId="partnerships-overview" />
        </div>
        <p className="mt-1 text-gray-600">{t('subtitle')}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
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
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
            <div>
              {isLoading ? (
                <div className="h-8 w-12 animate-pulse rounded bg-gray-200" />
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(metrics?.tourOperators?.total)}
                </p>
              )}
              <p className="text-sm text-gray-500">Tour Operators</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div>
              {isLoading ? (
                <div className="h-8 w-12 animate-pulse rounded bg-gray-200" />
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(metrics?.accommodations?.total)}
                </p>
              )}
              <p className="text-sm text-gray-500">Accommodations</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              {isLoading ? (
                <div className="h-8 w-12 animate-pulse rounded bg-gray-200" />
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(metrics?.activePartnerships)}
                </p>
              )}
              <p className="text-sm text-gray-500">Active Partnerships</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
              <svg
                className="h-5 w-5 text-yellow-600"
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
            </div>
            <div>
              {isLoading ? (
                <div className="h-8 w-12 animate-pulse rounded bg-gray-200" />
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(bookingStats.pendingCount)}
                </p>
              )}
              <p className="text-sm text-gray-500">Pending Bookings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Estimate Banner - Show only if there's revenue */}
      {metrics && metrics.monthlyRevenueEstimate > 0 && (
        <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">Estimated Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-900">
                  {formatCurrency(metrics.monthlyRevenueEstimate)}/mo
                </p>
              </div>
            </div>
            <Link
              href="/analytics"
              className="text-sm font-medium text-green-600 hover:text-green-700"
            >
              View Analytics →
            </Link>
          </div>
        </div>
      )}

      {/* Section Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Tour Operators */}
        <Link href="/partnerships/tour-operators" className="block">
          <div className="h-full rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <svg
                  className="h-6 w-6 text-blue-600"
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
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">Tour Operators</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Discover tour operators that bring groups to your area. Connect with bus
                  operators, cruise lines, and more.
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                  Browse Operators
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Accommodations */}
        <Link href="/partnerships/accommodations" className="block">
          <div className="h-full rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
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
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">Accommodations</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Partner with nearby hotels, hostels, and Airbnb hosts to recommend your venue to
                  their guests.
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-green-600">
                  Find Accommodations
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Outreach Pipeline */}
        <Link href="/partnerships/outreach" className="block">
          <div className="h-full rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6 transition-shadow hover:shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                <svg
                  className="h-6 w-6 text-purple-600"
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
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">Outreach Pipeline</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Track your partnership outreach. See who you&apos;ve contacted, who responded, and
                  manage negotiations.
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-purple-600">
                  View Pipeline
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Group Bookings */}
        <Link href="/partnerships/bookings" className="block">
          <div className="h-full rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-orange-50 p-6 transition-shadow hover:shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
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
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">Group Bookings</h3>
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                    AI
                  </span>
                  {bookingStats.pendingCount > 0 && (
                    <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                      {bookingStats.pendingCount} pending
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  AI Booking Coordinator manages group reservations. Accept, decline, or
                  counter-offer automatically.
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-red-600">
                  Manage Bookings
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Tourism Products */}
        <Link href="/partnerships/products" className="block">
          <div className="h-full rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
                <svg
                  className="h-6 w-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">Tourism Products</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Create packaged experiences for tour groups: gelato tastings, wine tours, cooking
                  demos.
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-yellow-600">
                  Manage Products
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* AI Settings */}
        <Link href="/partnerships/bookings/config" className="block">
          <div className="h-full rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                <svg
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">AI Configuration</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Configure AI Booking Coordinator automation level, pricing rules, and partner
                  preferences.
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-gray-600">
                  Configure AI
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Info Banner */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex gap-3">
          <svg
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600"
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
            <h4 className="font-medium text-blue-900">B2B Partnership Automation</h4>
            <p className="mt-0.5 text-sm text-blue-700">
              The AI Booking Coordinator can automatically accept or decline group booking requests
              based on your rules. Set up your preferences in the configuration to start automating.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
