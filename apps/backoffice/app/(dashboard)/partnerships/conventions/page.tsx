'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTenant } from '@/lib/contexts/TenantContext';

export const dynamic = 'force-dynamic';

interface ConventionsMetrics {
  offices: {
    total: number;
    byStatus: Record<string, number>;
    totalEmployeesEnrolled: number;
  };
  conventions: {
    total: number;
    active: number;
    totalRedemptions: number;
    totalRevenue: number;
  };
  vouchers: {
    total: number;
    active: number;
    totalUsed: number;
  };
  monthlyRevenueEstimate: number;
}

const DEFAULT_METRICS: ConventionsMetrics = {
  offices: {
    total: 0,
    byStatus: {},
    totalEmployeesEnrolled: 0,
  },
  conventions: {
    total: 0,
    active: 0,
    totalRedemptions: 0,
    totalRevenue: 0,
  },
  vouchers: {
    total: 0,
    active: 0,
    totalUsed: 0,
  },
  monthlyRevenueEstimate: 0,
};

export default function ConventionsHubPage() {
  const { location, isLoading: tenantLoading } = useTenant();
  const [metrics, setMetrics] = useState<ConventionsMetrics>(DEFAULT_METRICS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      if (!location?.id) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/ai/conventions?action=metrics&merchantId=${location.id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.metrics) {
            setMetrics(data.metrics);
          }
        }
      } catch (error) {
        console.error('Error fetching conventions metrics:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!tenantLoading) {
      fetchMetrics();
    }
  }, [location?.id, tenantLoading]);

  const isLoading = loading || tenantLoading;

  const quickLinks = [
    {
      title: 'Offices & Companies',
      description: 'Discover and manage corporate partners',
      href: '/partnerships/conventions/offices',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      count: metrics.offices.total,
      color: 'purple',
    },
    {
      title: 'Active Conventions',
      description: 'View and manage your conventions',
      href: '/partnerships/conventions/active',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
      count: metrics.conventions.active,
      color: 'green',
    },
    {
      title: 'Vouchers',
      description: 'Generate and track vouchers',
      href: '/partnerships/conventions/vouchers',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
          />
        </svg>
      ),
      count: metrics.vouchers.active,
      color: 'blue',
    },
    {
      title: 'Staff Verification',
      description: 'Verify codes and redeem vouchers',
      href: '/partnerships/conventions/verify',
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
          />
        </svg>
      ),
      count: null,
      color: 'orange',
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'purple':
        return {
          bg: 'bg-purple-100',
          text: 'text-purple-600',
          hover: 'hover:border-purple-300 hover:bg-purple-50',
        };
      case 'green':
        return {
          bg: 'bg-green-100',
          text: 'text-green-600',
          hover: 'hover:border-green-300 hover:bg-green-50',
        };
      case 'blue':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-600',
          hover: 'hover:border-blue-300 hover:bg-blue-50',
        };
      case 'orange':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-600',
          hover: 'hover:border-orange-300 hover:bg-orange-50',
        };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600', hover: 'hover:border-gray-300' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/partnerships" className="hover:text-gray-700">
            Partnerships
          </Link>
          <span>/</span>
          <span>Conventions</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold text-gray-900">Corporate Conventions</h1>
        <p className="mt-1 text-gray-600">
          Manage partnerships with offices, gyms, schools and other organizations.
        </p>
      </div>

      {/* Metrics Cards */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-white p-6">
              <div className="h-4 w-1/2 rounded bg-gray-200" />
              <div className="mt-4 h-8 w-1/3 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Partner Companies</span>
              <span className="rounded-full bg-purple-100 p-1.5">
                <svg
                  className="h-4 w-4 text-purple-600"
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
              </span>
            </div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{metrics.offices.total}</div>
            <div className="mt-1 text-sm text-gray-500">
              {metrics.offices.totalEmployeesEnrolled.toLocaleString()} employees enrolled
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Active Conventions</span>
              <span className="rounded-full bg-green-100 p-1.5">
                <svg
                  className="h-4 w-4 text-green-600"
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
              </span>
            </div>
            <div className="mt-2 text-3xl font-bold text-gray-900">
              {metrics.conventions.active}
            </div>
            <div className="mt-1 text-sm text-gray-500">
              {metrics.conventions.total} total conventions
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Total Redemptions</span>
              <span className="rounded-full bg-blue-100 p-1.5">
                <svg
                  className="h-4 w-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </span>
            </div>
            <div className="mt-2 text-3xl font-bold text-gray-900">
              {metrics.conventions.totalRedemptions}
            </div>
            <div className="mt-1 text-sm text-gray-500">
              {metrics.vouchers.active} active vouchers
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Revenue Generated</span>
              <span className="rounded-full bg-orange-100 p-1.5">
                <svg
                  className="h-4 w-4 text-orange-600"
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
              </span>
            </div>
            <div className="mt-2 text-3xl font-bold text-gray-900">
              €{metrics.conventions.totalRevenue.toLocaleString()}
            </div>
            <div className="mt-1 text-sm text-gray-500">
              ~€{Math.round(metrics.monthlyRevenueEstimate).toLocaleString()}/month
            </div>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Manage Conventions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => {
            const colors = getColorClasses(link.color);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl border border-gray-200 bg-white p-6 transition-colors ${colors.hover}`}
              >
                <div className="flex items-start justify-between">
                  <div className={`rounded-lg p-2 ${colors.bg}`}>
                    <div className={colors.text}>{link.icon}</div>
                  </div>
                  {link.count !== null && (
                    <span className="text-2xl font-bold text-gray-900">{link.count}</span>
                  )}
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{link.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{link.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* How It Works */}
      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50 to-blue-50 p-6">
        <h2 className="text-lg font-semibold text-gray-900">How Corporate Conventions Work</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-4">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
              1
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Discover Partners</h3>
              <p className="mt-1 text-sm text-gray-600">
                AI helps you find offices, gyms and schools nearby
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
              2
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Create Convention</h3>
              <p className="mt-1 text-sm text-gray-600">
                Set discount terms, validity and verification method
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
              3
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Generate Vouchers</h3>
              <p className="mt-1 text-sm text-gray-600">
                Create codes for employees with QR or daily codes
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
              4
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Track & Grow</h3>
              <p className="mt-1 text-sm text-gray-600">
                Monitor redemptions and optimize partnerships
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State CTA */}
      {!isLoading && metrics.offices.total === 0 && (
        <div className="rounded-xl border border-dashed border-purple-300 bg-purple-50 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Start Building Partnerships</h3>
          <p className="mt-2 text-gray-600">
            Discover offices and companies nearby to offer exclusive lunch conventions.
          </p>
          <Link
            href="/partnerships/conventions/offices"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Discover Partners
          </Link>
        </div>
      )}
    </div>
  );
}
