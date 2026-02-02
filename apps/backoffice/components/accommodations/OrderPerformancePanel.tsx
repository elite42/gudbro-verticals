'use client';

import { useState, useEffect } from 'react';
import { Clock, Package, XCircle, HourglassHigh } from '@phosphor-icons/react';

const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';
const AUTH_HEADERS = { Authorization: `Bearer ${ADMIN_API_KEY}` };

interface CategoryMetric {
  category: string;
  avgMinutes: number | null;
  count: number;
}

interface OrderPerformanceData {
  avgFulfillmentMinutes: number | null;
  totalDelivered: number;
  totalCancelled: number;
  totalPending: number;
  byCategory: CategoryMetric[];
}

interface OrderPerformancePanelProps {
  propertyId: string;
  days: number;
}

/** Format minutes as human-readable time string */
function formatTime(minutes: number | null): string {
  if (minutes === null) return '--';
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/** Capitalize first letter of a category tag */
function formatCategory(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

const CATEGORY_COLORS: Record<string, string> = {
  food: '#f59e0b',
  beverage: '#3b82f6',
  laundry: '#8b5cf6',
  minibar: '#06b6d4',
  spa: '#ec4899',
  transport: '#10b981',
  activity: '#f97316',
  general: '#6b7280',
};

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS['general'];
}

export function OrderPerformancePanel({ propertyId, days }: OrderPerformancePanelProps) {
  const [data, setData] = useState<OrderPerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(
          `/api/accommodations/analytics/order-performance?propertyId=${propertyId}&days=${days}`,
          { headers: AUTH_HEADERS }
        );
        if (cancelled) return;
        if (res.ok) {
          setData(await res.json());
        } else {
          setData(null);
          setError(true);
        }
      } catch {
        if (!cancelled) {
          setData(null);
          setError(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (propertyId) {
      fetchData();
    }

    return () => {
      cancelled = true;
    };
  }, [propertyId, days]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Order Performance</h3>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
        <div className="h-40 animate-pulse rounded-xl bg-gray-200" />
      </div>
    );
  }

  // Error state
  if (error) {
    return null;
  }

  // Empty state
  if (
    !data ||
    (data.totalDelivered === 0 && data.totalCancelled === 0 && data.totalPending === 0)
  ) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <Clock size={20} weight="duotone" className="text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">Order Performance</h3>
        </div>
        <p className="text-sm text-gray-500">
          Order performance metrics will appear once orders are delivered.
        </p>
      </div>
    );
  }

  const notEnoughData = data.totalDelivered < 3;

  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <Clock size={20} weight="duotone" className="text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-900">Order Performance</h3>
      </div>

      {/* Counter cards - 2x2 grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Avg Fulfillment Time */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-2 flex items-center gap-2">
            <Clock size={18} weight="duotone" className="text-blue-500" />
            <p className="text-sm text-gray-500">Avg Fulfillment</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {notEnoughData ? '--' : formatTime(data.avgFulfillmentMinutes)}
          </p>
          {notEnoughData && <p className="mt-1 text-xs text-gray-400">Need 3+ delivered orders</p>}
        </div>

        {/* Total Delivered */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-2 flex items-center gap-2">
            <Package size={18} weight="duotone" className="text-green-500" />
            <p className="text-sm text-gray-500">Delivered</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{data.totalDelivered}</p>
        </div>

        {/* Total Cancelled */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-2 flex items-center gap-2">
            <XCircle size={18} weight="duotone" className="text-red-500" />
            <p className="text-sm text-gray-500">Cancelled</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{data.totalCancelled}</p>
        </div>

        {/* Pending Now */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-2 flex items-center gap-2">
            <HourglassHigh size={18} weight="duotone" className="text-amber-500" />
            <p className="text-sm text-gray-500">Pending</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{data.totalPending}</p>
        </div>
      </div>

      {/* Category breakdown table */}
      {!notEnoughData && data.byCategory.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h4 className="mb-3 text-sm font-medium text-gray-700">By Category</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                    Category
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500">
                    Avg Time
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium uppercase text-gray-500">
                    Orders
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.byCategory.map((cat) => (
                  <tr key={cat.category} className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: getCategoryColor(cat.category) }}
                        />
                        {formatCategory(cat.category)}
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right text-sm font-medium text-gray-900">
                      {formatTime(cat.avgMinutes)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-sm text-gray-600">{cat.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
