'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { KPICard } from './KPICard';

// --- Constants ---

const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';
const AUTH_HEADERS = { Authorization: `Bearer ${ADMIN_API_KEY}` };

const TIME_RANGES = [
  { label: '7d', value: 7 },
  { label: '30d', value: 30 },
  { label: '90d', value: 90 },
  { label: '12m', value: 365 },
];

const ROOM_TYPE_COLORS: Record<string, string> = {
  single: '#3b82f6',
  double: '#8b5cf6',
  twin: '#06b6d4',
  suite: '#f59e0b',
  family: '#10b981',
  dormitory: '#f97316',
  deluxe: '#ec4899',
  studio: '#6366f1',
  penthouse: '#14b8a6',
  Unknown: '#6b7280',
};

const SERVICE_COLOR = '#94a3b8';

// --- Types ---

interface KPIData {
  value: number;
  previousValue: number;
  trend: 'up' | 'down' | 'flat';
}

interface KPIsResponse {
  occupancyRate: KPIData;
  totalRevenue: KPIData;
  adr: KPIData;
  serviceRevenue: KPIData;
}

interface RevenueChartResponse {
  chartData: Record<string, string | number>[];
  roomTypes: string[];
}

interface OccupancyChartResponse {
  chartData: { date: string; occupancy: number }[];
}

// --- Helper ---

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-gray-200 ${className || ''}`} />;
}

function getColorForRoomType(roomType: string): string {
  return ROOM_TYPE_COLORS[roomType] || ROOM_TYPE_COLORS['Unknown'];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

// --- Main Component ---

interface AccommodationAnalyticsProps {
  propertyId: string;
  currencyCode?: string;
}

export function AccommodationAnalytics({
  propertyId,
  currencyCode = 'VND',
}: AccommodationAnalyticsProps) {
  const [selectedDays, setSelectedDays] = useState(30);
  const [kpis, setKpis] = useState<KPIsResponse | null>(null);
  const [revenueChart, setRevenueChart] = useState<RevenueChartResponse | null>(null);
  const [occupancyChart, setOccupancyChart] = useState<OccupancyChartResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      try {
        const params = `?propertyId=${propertyId}&days=${selectedDays}`;
        const [kpiRes, revRes, occRes] = await Promise.all([
          fetch(`/api/accommodations/analytics/kpis${params}`, { headers: AUTH_HEADERS }),
          fetch(`/api/accommodations/analytics/revenue-chart${params}`, { headers: AUTH_HEADERS }),
          fetch(`/api/accommodations/analytics/occupancy-chart${params}`, {
            headers: AUTH_HEADERS,
          }),
        ]);

        if (cancelled) return;

        if (kpiRes.ok) {
          setKpis(await kpiRes.json());
        } else {
          setKpis(null);
        }

        if (revRes.ok) {
          setRevenueChart(await revRes.json());
        } else {
          setRevenueChart(null);
        }

        if (occRes.ok) {
          setOccupancyChart(await occRes.json());
        } else {
          setOccupancyChart(null);
        }
      } catch {
        if (!cancelled) {
          setKpis(null);
          setRevenueChart(null);
          setOccupancyChart(null);
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
  }, [propertyId, selectedDays]);

  const isEmpty =
    !loading &&
    !kpis &&
    (!revenueChart || revenueChart.chartData.length === 0) &&
    (!occupancyChart || occupancyChart.chartData.length === 0);

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex w-fit items-center gap-1 rounded-lg border border-gray-200 bg-white p-1">
        {TIME_RANGES.map((range) => (
          <button
            key={range.value}
            onClick={() => setSelectedDays(range.value)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              selectedDays === range.value
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-28" />
            ))}
          </div>
          <Skeleton className="h-[340px]" />
          <Skeleton className="h-[340px]" />
        </div>
      )}

      {/* Empty state */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white py-16">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
              />
            </svg>
          </div>
          <h3 className="mb-1 text-lg font-semibold text-gray-900">No data yet</h3>
          <p className="text-sm text-gray-500">
            Analytics will appear once bookings and orders start coming in.
          </p>
        </div>
      )}

      {/* Dashboard content */}
      {!loading && !isEmpty && (
        <div className="space-y-6">
          {/* KPI Cards */}
          {kpis && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <KPICard
                title="Occupancy Rate"
                value={kpis.occupancyRate.value}
                previousValue={kpis.occupancyRate.previousValue}
                trend={kpis.occupancyRate.trend}
                format="percent"
              />
              <KPICard
                title="Total Revenue"
                value={kpis.totalRevenue.value}
                previousValue={kpis.totalRevenue.previousValue}
                trend={kpis.totalRevenue.trend}
                format="currency"
                currencyCode={currencyCode}
              />
              <KPICard
                title="ADR (Avg Daily Rate)"
                value={kpis.adr.value}
                previousValue={kpis.adr.previousValue}
                trend={kpis.adr.trend}
                format="currency"
                currencyCode={currencyCode}
              />
              <KPICard
                title="Service Revenue"
                value={kpis.serviceRevenue.value}
                previousValue={kpis.serviceRevenue.previousValue}
                trend={kpis.serviceRevenue.trend}
                format="currency"
                currencyCode={currencyCode}
              />
            </div>
          )}

          {/* Revenue Chart (Stacked Bar) */}
          {revenueChart && revenueChart.chartData.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Revenue by Room Type</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueChart.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    tickFormatter={(v) => {
                      const major = v / 100;
                      if (major >= 1000000) return `${(major / 1000000).toFixed(1)}M`;
                      if (major >= 1000) return `${(major / 1000).toFixed(0)}K`;
                      return major.toString();
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any, name: any) => [
                      `${((Number(value) || 0) / 100).toLocaleString('en-US', { minimumFractionDigits: 0 })} ${currencyCode}`,
                      String(name || ''),
                    ]}
                  />
                  <Legend />
                  {revenueChart.roomTypes.map((rt) => (
                    <Bar
                      key={rt}
                      dataKey={rt}
                      stackId="revenue"
                      fill={getColorForRoomType(rt)}
                      name={rt}
                      radius={[0, 0, 0, 0]}
                    />
                  ))}
                  <Bar
                    dataKey="services"
                    stackId="revenue"
                    fill={SERVICE_COLOR}
                    name="Services"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Occupancy Chart (Line) */}
          {occupancyChart && occupancyChart.chartData.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Daily Occupancy Rate</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={occupancyChart.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    labelFormatter={(label) => {
                      const d = new Date(label as string);
                      return d.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      });
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any) => [`${Number(value) || 0}%`, 'Occupancy']}
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="occupancy"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                    name="Occupancy"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Revenue Breakdown Table */}
          {revenueChart && revenueChart.chartData.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Revenue Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                        Category
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">
                        Revenue ({currencyCode})
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {revenueChart.roomTypes.map((rt) => {
                      const total = revenueChart.chartData.reduce(
                        (sum, dp) => sum + ((dp[rt] as number) || 0),
                        0
                      );
                      return (
                        <tr key={rt} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">
                            <div className="flex items-center gap-2">
                              <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: getColorForRoomType(rt) }}
                              />
                              {rt}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                            {(total / 100).toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                        </tr>
                      );
                    })}
                    {/* Services row */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: SERVICE_COLOR }}
                          />
                          Services
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                        {(
                          revenueChart.chartData.reduce(
                            (sum, dp) => sum + ((dp['services'] as number) || 0),
                            0
                          ) / 100
                        ).toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
