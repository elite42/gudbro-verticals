'use client';

/**
 * Prep Time Analytics Dashboard
 *
 * Displays preparation time analytics including:
 * - Summary stats (avg, median, p90, trend)
 * - Daily time series chart
 * - Station comparison (Kitchen vs Bar)
 * - Top slowest/fastest items
 * - Hourly heatmap
 */

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ChartLine,
  Timer,
  TrendUp,
  TrendDown,
  Clock,
  CookingPot,
  Martini,
  WarningCircle,
  ArrowsClockwise,
} from '@phosphor-icons/react';

export const dynamic = 'force-dynamic';

type Period = '7d' | '14d' | '30d' | '90d';
type Station = 'all' | 'kitchen' | 'bar';

interface Stats {
  totalItems: number;
  avgPrepSeconds: number | null;
  medianPrepSeconds: number | null;
  p90PrepSeconds: number | null;
  minPrepSeconds: number | null;
  maxPrepSeconds: number | null;
  itemsOver10min: number;
  itemsOver15min: number;
  trend: number | null;
}

interface DailyData {
  date: string;
  station: string | null;
  itemsCompleted: number;
  avgPrepSeconds: number;
  medianPrepSeconds: number;
  p90PrepSeconds: number;
}

interface ItemData {
  name: Record<string, string>;
  menuItemId: string | null;
  station: string | null;
  timesPrepared: number;
  avgPrepSeconds: number;
  medianPrepSeconds: number;
}

interface HourlyData {
  dayOfWeek: number;
  hourOfDay: number;
  itemsCompleted: number;
  avgPrepSeconds: number;
  medianPrepSeconds: number;
}

interface AnalyticsData {
  stats: Stats;
  dailyBreakdown: DailyData[];
  slowestItems?: ItemData[];
  fastestItems?: ItemData[];
  hourlyPattern?: HourlyData[];
}

function formatTime(seconds: number | null): string {
  if (seconds === null || seconds === undefined) return '-';
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const minutes = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  if (minutes < 60) return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

function formatTimeShort(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const minutes = Math.round(seconds / 60);
  return `${minutes}m`;
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function PrepTimeAnalyticsPage() {
  const searchParams = useSearchParams();
  const merchantIdParam = searchParams.get('merchantId');

  const [merchantId, setMerchantId] = useState<string>(merchantIdParam || '');
  const [period, setPeriod] = useState<Period>('7d');
  const [station, setStation] = useState<Station>('all');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    if (!merchantId) return;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        merchantId,
        period,
        includeItems: 'true',
        includeHourly: 'true',
      });

      if (station !== 'all') {
        params.set('station', station);
      }

      const response = await fetch(`/api/analytics/prep-time?${params}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch analytics');
      }

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [merchantId, period, station]);

  useEffect(() => {
    if (merchantId) {
      fetchAnalytics();
    }
  }, [merchantId, fetchAnalytics]);

  // Get color for prep time (green to red scale)
  const getPrepTimeColor = (seconds: number): string => {
    if (seconds < 180) return 'text-green-500'; // < 3 min
    if (seconds < 300) return 'text-green-400'; // < 5 min
    if (seconds < 420) return 'text-yellow-500'; // < 7 min
    if (seconds < 600) return 'text-orange-500'; // < 10 min
    return 'text-red-500'; // >= 10 min
  };

  const getPrepTimeBgColor = (seconds: number): string => {
    if (seconds < 180) return 'bg-green-500/20';
    if (seconds < 300) return 'bg-green-400/20';
    if (seconds < 420) return 'bg-yellow-500/20';
    if (seconds < 600) return 'bg-orange-500/20';
    return 'bg-red-500/20';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900/30">
              <Timer className="h-6 w-6 text-orange-600 dark:text-orange-400" weight="duotone" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Prep Time Analytics
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Track and optimize preparation times
              </p>
            </div>
          </div>

          <button
            onClick={fetchAnalytics}
            disabled={loading || !merchantId}
            className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700 disabled:opacity-50"
          >
            <ArrowsClockwise className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-gray-200 bg-white px-6 py-3 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-wrap items-center gap-4">
          {/* Merchant ID (temporary - would use session in production) */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Merchant ID:
            </label>
            <input
              type="text"
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
              placeholder="Enter merchant ID"
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Period Selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Period:</label>
            <div className="flex rounded-lg border border-gray-300 dark:border-gray-600">
              {(['7d', '14d', '30d', '90d'] as Period[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors first:rounded-l-lg last:rounded-r-lg ${
                    period === p
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Station Selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Station:</label>
            <div className="flex rounded-lg border border-gray-300 dark:border-gray-600">
              {(['all', 'kitchen', 'bar'] as Station[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStation(s)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors first:rounded-l-lg last:rounded-r-lg ${
                    station === s
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {s === 'kitchen' && <CookingPot className="h-4 w-4" />}
                  {s === 'bar' && <Martini className="h-4 w-4" />}
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {!merchantId && (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
            <Timer className="mx-auto h-12 w-12 text-gray-400" weight="duotone" />
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              Enter a Merchant ID
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Enter a merchant ID above to view prep time analytics
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-900/20">
            <WarningCircle className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}

        {loading && merchantId && (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-200 border-t-orange-600"></div>
          </div>
        )}

        {data && !loading && (
          <>
            {/* Stats Cards */}
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {/* Average Prep Time */}
              <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Avg Prep Time
                  </p>
                  <Clock className="h-5 w-5 text-gray-400" weight="duotone" />
                </div>
                <p
                  className={`mt-2 text-2xl font-bold ${
                    data.stats.avgPrepSeconds
                      ? getPrepTimeColor(data.stats.avgPrepSeconds)
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {formatTime(data.stats.avgPrepSeconds)}
                </p>
                {data.stats.trend !== null && (
                  <div
                    className={`mt-1 flex items-center gap-1 text-sm ${
                      data.stats.trend < 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {data.stats.trend < 0 ? (
                      <TrendDown className="h-4 w-4" />
                    ) : (
                      <TrendUp className="h-4 w-4" />
                    )}
                    <span>{Math.abs(data.stats.trend)}% vs previous</span>
                  </div>
                )}
              </div>

              {/* Median Prep Time */}
              <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Median Prep Time
                  </p>
                  <Timer className="h-5 w-5 text-gray-400" weight="duotone" />
                </div>
                <p
                  className={`mt-2 text-2xl font-bold ${
                    data.stats.medianPrepSeconds
                      ? getPrepTimeColor(data.stats.medianPrepSeconds)
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {formatTime(data.stats.medianPrepSeconds)}
                </p>
                <p className="mt-1 text-sm text-gray-500">50th percentile</p>
              </div>

              {/* P90 Prep Time */}
              <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">P90 Time</p>
                  <ChartLine className="h-5 w-5 text-gray-400" weight="duotone" />
                </div>
                <p
                  className={`mt-2 text-2xl font-bold ${
                    data.stats.p90PrepSeconds
                      ? getPrepTimeColor(data.stats.p90PrepSeconds)
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {formatTime(data.stats.p90PrepSeconds)}
                </p>
                <p className="mt-1 text-sm text-gray-500">90% complete within</p>
              </div>

              {/* Total Items */}
              <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Items Completed
                  </p>
                  <CookingPot className="h-5 w-5 text-gray-400" weight="duotone" />
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {data.stats.totalItems.toLocaleString()}
                </p>
                <div className="mt-1 flex gap-2 text-sm">
                  <span className="text-orange-600">{data.stats.itemsOver10min} &gt;10m</span>
                  <span className="text-red-600">{data.stats.itemsOver15min} &gt;15m</span>
                </div>
              </div>
            </div>

            {/* Daily Chart (simplified bar chart) */}
            <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Daily Prep Time Trend
              </h3>
              <div className="flex h-40 items-end gap-1 overflow-x-auto">
                {data.dailyBreakdown
                  .slice(0, 30)
                  .reverse()
                  .map((day, index) => {
                    const maxSeconds = Math.max(
                      ...data.dailyBreakdown.map((d) => d.avgPrepSeconds || 0),
                      600
                    );
                    const height = Math.max(((day.avgPrepSeconds || 0) / maxSeconds) * 100, 5);

                    return (
                      <div
                        key={index}
                        className="group relative flex flex-1 flex-col items-center"
                        style={{ minWidth: '24px' }}
                      >
                        <div
                          className={`w-full rounded-t transition-all ${getPrepTimeBgColor(day.avgPrepSeconds || 0)} hover:opacity-80`}
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="absolute -top-8 hidden rounded bg-gray-900 px-2 py-1 text-xs text-white group-hover:block">
                          {formatTimeShort(day.avgPrepSeconds)} ({day.itemsCompleted} items)
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>{data.dailyBreakdown[data.dailyBreakdown.length - 1]?.date}</span>
                <span>{data.dailyBreakdown[0]?.date}</span>
              </div>
            </div>

            {/* Slowest & Fastest Items */}
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              {/* Slowest Items */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                  <TrendUp className="h-5 w-5 text-red-500" />
                  Slowest Items
                </h3>
                <div className="space-y-3">
                  {(data.slowestItems || []).slice(0, 5).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.name.en || item.name.vi || 'Unknown'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.timesPrepared} prepared • {item.station || 'unknown'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${getPrepTimeColor(item.avgPrepSeconds)}`}>
                          {formatTime(item.avgPrepSeconds)}
                        </p>
                        <p className="text-xs text-gray-500">avg</p>
                      </div>
                    </div>
                  ))}
                  {(data.slowestItems || []).length === 0 && (
                    <p className="py-4 text-center text-sm text-gray-500">No data available</p>
                  )}
                </div>
              </div>

              {/* Fastest Items */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                  <TrendDown className="h-5 w-5 text-green-500" />
                  Fastest Items
                </h3>
                <div className="space-y-3">
                  {(data.fastestItems || []).slice(0, 5).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.name.en || item.name.vi || 'Unknown'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.timesPrepared} prepared • {item.station || 'unknown'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${getPrepTimeColor(item.avgPrepSeconds)}`}>
                          {formatTime(item.avgPrepSeconds)}
                        </p>
                        <p className="text-xs text-gray-500">avg</p>
                      </div>
                    </div>
                  ))}
                  {(data.fastestItems || []).length === 0 && (
                    <p className="py-4 text-center text-sm text-gray-500">No data available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Hourly Heatmap */}
            {data.hourlyPattern && data.hourlyPattern.length > 0 && (
              <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Prep Time by Hour & Day
                </h3>
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full">
                    <div className="flex">
                      <div className="w-12"></div>
                      {Array.from({ length: 24 }, (_, i) => (
                        <div key={i} className="w-8 text-center text-xs text-gray-500">
                          {i}
                        </div>
                      ))}
                    </div>
                    {DAY_NAMES.map((day, dayIndex) => (
                      <div key={dayIndex} className="flex items-center">
                        <div className="w-12 text-xs text-gray-500">{day}</div>
                        {Array.from({ length: 24 }, (_, hourIndex) => {
                          const hourData = data.hourlyPattern?.find(
                            (h) => h.dayOfWeek === dayIndex && h.hourOfDay === hourIndex
                          );
                          const avgSeconds = hourData?.avgPrepSeconds || 0;
                          const itemCount = hourData?.itemsCompleted || 0;

                          return (
                            <div
                              key={hourIndex}
                              className={`group relative m-0.5 h-6 w-7 rounded ${
                                itemCount > 0
                                  ? getPrepTimeBgColor(avgSeconds)
                                  : 'bg-gray-100 dark:bg-gray-700'
                              }`}
                              title={
                                itemCount > 0
                                  ? `${formatTimeShort(avgSeconds)} avg, ${itemCount} items`
                                  : 'No data'
                              }
                            >
                              {itemCount > 0 && (
                                <div className="absolute -top-8 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white group-hover:block">
                                  {formatTimeShort(avgSeconds)} ({itemCount})
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded bg-green-500/20"></div> &lt;3m
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded bg-yellow-500/20"></div> 5-7m
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded bg-orange-500/20"></div> 7-10m
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded bg-red-500/20"></div> &gt;10m
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
