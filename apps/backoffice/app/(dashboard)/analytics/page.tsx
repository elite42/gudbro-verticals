'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getAnalyticsSummary,
  getDailyMetrics,
  getTopItems,
  getPopularPages,
  getDeviceBreakdown,
  getHourlyBreakdown,
  getDateRange,
  type AnalyticsSummary,
  type DailyMetrics,
  type TopItem,
  type PopularPage,
  type DeviceBreakdown,
  type HourlyBreakdown,
} from '@/lib/analytics-service';

type TimeRange = '7d' | '30d' | '90d' | '1y';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [dailyMetrics, setDailyMetrics] = useState<DailyMetrics[]>([]);
  const [topItems, setTopItems] = useState<TopItem[]>([]);
  const [popularPages, setPopularPages] = useState<PopularPage[]>([]);
  const [deviceBreakdown, setDeviceBreakdown] = useState<DeviceBreakdown[]>([]);
  const [hourlyBreakdown, setHourlyBreakdown] = useState<HourlyBreakdown[]>([]);

  const loadAnalytics = useCallback(async () => {
    setIsLoading(true);
    const { startDate, endDate } = getDateRange(timeRange);

    try {
      const [summaryData, dailyData, itemsData, pagesData, devicesData, hourlyData] =
        await Promise.all([
          getAnalyticsSummary(startDate, endDate),
          getDailyMetrics(startDate, endDate),
          getTopItems(startDate, endDate, 5),
          getPopularPages(startDate, endDate, 5),
          getDeviceBreakdown(startDate, endDate),
          getHourlyBreakdown(startDate, endDate),
        ]);

      setSummary(summaryData);
      setDailyMetrics(dailyData);
      setTopItems(itemsData);
      setPopularPages(pagesData);
      setDeviceBreakdown(devicesData);
      setHourlyBreakdown(hourlyData);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setIsLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  const maxDailyViews = Math.max(...dailyMetrics.map((d) => d.pageViews), 1);
  const maxHourlyEvents = Math.max(...hourlyBreakdown.map((h) => h.eventCount), 1);
  const hasData = dailyMetrics.length > 0 || (summary && summary.totalPageViews > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">Track user engagement and menu performance</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-1">
          {(['7d', '30d', '90d', '1y'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                timeRange === range ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range === '7d' && 'Week'}
              {range === '30d' && 'Month'}
              {range === '90d' && 'Quarter'}
              {range === '1y' && 'Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !hasData && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">No analytics data yet</h3>
          <p className="mt-2 text-gray-500">
            Analytics will appear here once users start interacting with your menu.
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Events tracked: page views, item clicks, add to cart
          </p>
        </div>
      )}

      {/* Dashboard Content */}
      {!isLoading && hasData && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <MetricCard
              label="Page Views"
              value={summary?.totalPageViews || 0}
              change={summary?.pageViewsChange || 0}
            />
            <MetricCard
              label="Unique Visitors"
              value={summary?.totalUniqueVisitors || 0}
              change={summary?.visitorsChange || 0}
            />
            <MetricCard
              label="Sessions"
              value={summary?.totalSessions || 0}
              change={summary?.sessionsChange || 0}
            />
            <MetricCard
              label="Conversion Rate"
              value={`${(summary?.conversionRate || 0).toFixed(1)}%`}
              change={0}
              isPercentage
            />
          </div>

          {/* Views Chart */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="font-semibold text-gray-900">Page Views Over Time</h3>
            <div className="mt-6 flex h-64 items-end justify-between gap-2">
              {dailyMetrics.slice(-14).map((day) => (
                <div key={day.date} className="flex flex-1 flex-col items-center">
                  <div
                    className="w-full rounded-t bg-blue-500 transition-all hover:bg-blue-600"
                    style={{
                      height: `${(day.pageViews / maxDailyViews) * 200}px`,
                      minHeight: day.pageViews > 0 ? '4px' : '0',
                    }}
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p className="text-xs font-medium text-gray-700">{day.pageViews}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Top Items */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-semibold text-gray-900">Top Menu Items</h3>
              {topItems.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {topItems.map((item, index) => (
                    <div key={item.itemId} className="flex items-center gap-4">
                      <span className="w-6 text-center font-bold text-gray-400">#{index + 1}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="max-w-[150px] truncate font-medium text-gray-900">
                            {item.itemName}
                          </span>
                          <span className="text-sm text-gray-600">{item.viewCount} views</span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{
                              width: `${(item.viewCount / (topItems[0]?.viewCount || 1)) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-medium text-green-600">
                        {item.conversionRate.toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-gray-500">No item views tracked yet</p>
              )}
            </div>

            {/* Device Distribution */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-semibold text-gray-900">Device Distribution</h3>
              {deviceBreakdown.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {deviceBreakdown.map((device) => (
                    <div key={device.deviceType} className="flex items-center gap-4">
                      <span className="text-xl">
                        {device.deviceType === 'mobile' && '📱'}
                        {device.deviceType === 'desktop' && '💻'}
                        {device.deviceType === 'tablet' && '📟'}
                        {!['mobile', 'desktop', 'tablet'].includes(device.deviceType) && '🌐'}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium capitalize text-gray-900">
                            {device.deviceType}
                          </span>
                          <span className="text-sm text-gray-600">{device.percentage}%</span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-purple-500"
                            style={{ width: `${device.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-gray-500">No device data tracked yet</p>
              )}
            </div>
          </div>

          {/* Popular Pages */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="font-semibold text-gray-900">Popular Pages</h3>
            {popularPages.length > 0 ? (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                        Page
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                        Views
                      </th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                        Unique Visitors
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {popularPages.map((page) => (
                      <tr key={page.pagePath} className="border-b border-gray-100">
                        <td className="px-4 py-3 font-mono text-sm text-gray-900">
                          {page.pagePath}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-600">
                          {page.viewCount}
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-gray-600">
                          {page.uniqueVisitors}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-500">No page views tracked yet</p>
            )}
          </div>

          {/* Peak Hours */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="font-semibold text-gray-900">Peak Hours</h3>
            <p className="text-sm text-gray-500">When users are most active</p>
            {hourlyBreakdown.some((h) => h.eventCount > 0) ? (
              <>
                <div className="mt-6 flex h-40 items-end justify-between gap-1">
                  {hourlyBreakdown.map((hour) => (
                    <div key={hour.hour} className="flex flex-1 flex-col items-center">
                      <div
                        className={`w-full rounded-t transition-all ${
                          hour.eventCount === maxHourlyEvents
                            ? 'bg-green-500'
                            : hour.eventCount > maxHourlyEvents * 0.7
                              ? 'bg-yellow-500'
                              : 'bg-gray-300'
                        }`}
                        style={{
                          height: `${(hour.eventCount / maxHourlyEvents) * 120}px`,
                          minHeight: hour.eventCount > 0 ? '4px' : '0',
                        }}
                      />
                      <p className="mt-2 -rotate-45 text-xs text-gray-500">
                        {hour.hour.toString().padStart(2, '0')}:00
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-green-500" />
                    <span className="text-gray-600">Peak</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-yellow-500" />
                    <span className="text-gray-600">High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-gray-300" />
                    <span className="text-gray-600">Normal</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="mt-4 text-sm text-gray-500">No hourly data tracked yet</p>
            )}
          </div>

          {/* Export */}
          <div className="flex items-center justify-end gap-3">
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Export CSV
            </button>
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Export PDF Report
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Metric Card Component
function MetricCard({
  label,
  value,
  change,
  isPercentage = false,
}: {
  label: string;
  value: number | string;
  change: number;
  isPercentage?: boolean;
}) {
  const displayValue = typeof value === 'number' ? value.toLocaleString() : value;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{displayValue}</p>
      {!isPercentage && change !== 0 && (
        <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '+' : ''}
          {change}% vs last period
        </p>
      )}
      {!isPercentage && change === 0 && <p className="text-sm text-gray-400">No previous data</p>}
    </div>
  );
}
