'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  getMerchantQRStats,
  getMerchantSourcePerformance,
  listQRCodes,
  getQRCodeAnalytics,
} from '@/lib/qr/qr-service';
import { QRCode as QRCodeEntity } from '@/lib/qr/qr-types';
import { useTenant } from '@/lib/contexts/TenantContext';
import { EmptyState } from '@/components/ui/empty-state';
import {
  ArrowLeftIcon,
  QrCodeIcon,
  ScanLineIcon,
  TrendingUpIcon,
  SmartphoneIcon,
  GlobeIcon,
  MapPinIcon,
} from 'lucide-react';

type TimeRange = '7d' | '30d' | '90d' | '1y';

interface QRStats {
  totalQRCodes: number;
  activeQRCodes: number;
  totalScans: number;
  topPerformers: { id: string; title: string | null; scans: number }[];
}

interface SourcePerformance {
  bySource: Record<string, { qrCount: number; totalScans: number }>;
}

interface DetailedAnalytics {
  totalScans: number;
  uniqueDevices: number;
  byDevice: Record<string, number>;
  byOS: Record<string, number>;
  byBrowser: Record<string, number>;
  byCountry: Record<string, number>;
  timeline: { date: string; count: number }[];
}

function getDateRange(range: TimeRange): { startDate: string; endDate: string } {
  const end = new Date();
  const start = new Date();

  switch (range) {
    case '7d':
      start.setDate(start.getDate() - 7);
      break;
    case '30d':
      start.setDate(start.getDate() - 30);
      break;
    case '90d':
      start.setDate(start.getDate() - 90);
      break;
    case '1y':
      start.setFullYear(start.getFullYear() - 1);
      break;
  }

  return {
    startDate: start.toISOString(),
    endDate: end.toISOString(),
  };
}

const SOURCE_LABELS: Record<string, { label: string; color: string }> = {
  google_maps: { label: 'Google Maps', color: 'bg-red-500' },
  instagram: { label: 'Instagram', color: 'bg-pink-500' },
  facebook: { label: 'Facebook', color: 'bg-blue-600' },
  tiktok: { label: 'TikTok', color: 'bg-black' },
  tripadvisor: { label: 'TripAdvisor', color: 'bg-green-500' },
  website: { label: 'Website', color: 'bg-purple-500' },
  email: { label: 'Email', color: 'bg-yellow-500' },
  event: { label: 'Event', color: 'bg-orange-500' },
  flyer: { label: 'Flyer', color: 'bg-cyan-500' },
  table: { label: 'Table', color: 'bg-blue-500' },
  other: { label: 'Other', color: 'bg-gray-500' },
  unknown: { label: 'Unknown', color: 'bg-gray-400' },
};

export default function QRAnalyticsPage() {
  const { brand } = useTenant();
  const merchantId = brand?.id;

  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<QRStats | null>(null);
  const [sourcePerformance, setSourcePerformance] = useState<SourcePerformance | null>(null);
  const [qrCodes, setQrCodes] = useState<QRCodeEntity[]>([]);
  const [selectedQRId, setSelectedQRId] = useState<string | null>(null);
  const [detailedAnalytics, setDetailedAnalytics] = useState<DetailedAnalytics | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const loadData = useCallback(async () => {
    if (!merchantId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const [statsData, sourceData, qrData] = await Promise.all([
        getMerchantQRStats(merchantId),
        getMerchantSourcePerformance(merchantId),
        listQRCodes(merchantId, { orderBy: 'total_scans', orderDir: 'desc', limit: 100 }),
      ]);

      setStats(statsData);
      setSourcePerformance(sourceData);
      setQrCodes(qrData.data);

      // Auto-select first QR if none selected
      if (!selectedQRId && qrData.data.length > 0) {
        setSelectedQRId(qrData.data[0].id);
      }
    } catch (error) {
      console.error('Failed to load QR analytics:', error);
    } finally {
      setIsLoading(false);
    }
  }, [merchantId, selectedQRId]);

  // Load detailed analytics for selected QR
  const loadDetailedAnalytics = useCallback(async () => {
    if (!selectedQRId) {
      setDetailedAnalytics(null);
      return;
    }

    setLoadingDetails(true);
    const { startDate, endDate } = getDateRange(timeRange);

    try {
      const analytics = await getQRCodeAnalytics(selectedQRId, { startDate, endDate });
      setDetailedAnalytics(analytics);
    } catch (error) {
      console.error('Failed to load detailed analytics:', error);
      setDetailedAnalytics(null);
    } finally {
      setLoadingDetails(false);
    }
  }, [selectedQRId, timeRange]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    loadDetailedAnalytics();
  }, [loadDetailedAnalytics]);

  const hasData = stats && stats.totalQRCodes > 0;

  // Calculate max for bar charts
  const maxTimelineScans = detailedAnalytics
    ? Math.max(...detailedAnalytics.timeline.map((t) => t.count), 1)
    : 1;

  const totalSourceScans = sourcePerformance
    ? Object.values(sourcePerformance.bySource).reduce((sum, s) => sum + s.totalScans, 0)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/qr-codes"
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to QR Codes
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">QR Analytics</h1>
            <p className="text-sm text-gray-500">Track QR code performance and engagement</p>
          </div>
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
        <EmptyState
          icon={<QrCodeIcon className="h-12 w-12" />}
          title="No QR codes yet"
          description="Create your first QR code to start tracking analytics."
          variant="card"
          size="lg"
          action={{
            label: 'Create QR Code',
            href: '/qr-codes',
          }}
        />
      )}

      {/* Dashboard Content */}
      {!isLoading && hasData && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <MetricCard
              icon={<QrCodeIcon className="h-5 w-5 text-blue-600" />}
              label="Total QR Codes"
              value={stats?.totalQRCodes || 0}
              subLabel={`${stats?.activeQRCodes || 0} active`}
            />
            <MetricCard
              icon={<ScanLineIcon className="h-5 w-5 text-green-600" />}
              label="Total Scans"
              value={stats?.totalScans || 0}
              subLabel="All time"
            />
            <MetricCard
              icon={<TrendingUpIcon className="h-5 w-5 text-purple-600" />}
              label="Avg Scans/QR"
              value={
                stats?.totalQRCodes ? Math.round((stats?.totalScans || 0) / stats.totalQRCodes) : 0
              }
              subLabel="Per QR code"
            />
            <MetricCard
              icon={<SmartphoneIcon className="h-5 w-5 text-orange-600" />}
              label="Unique Devices"
              value={detailedAnalytics?.uniqueDevices || 0}
              subLabel={`In ${timeRange === '7d' ? 'last week' : timeRange === '30d' ? 'last month' : timeRange === '90d' ? 'last quarter' : 'last year'}`}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Column - Source Performance + Top Performers */}
            <div className="space-y-6 lg:col-span-1">
              {/* Source Performance */}
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 font-semibold text-gray-900">Performance by Source</h3>
                {sourcePerformance && Object.keys(sourcePerformance.bySource).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(sourcePerformance.bySource)
                      .sort((a, b) => b[1].totalScans - a[1].totalScans)
                      .slice(0, 6)
                      .map(([source, data]) => {
                        const sourceInfo = SOURCE_LABELS[source] || SOURCE_LABELS.unknown;
                        const percentage =
                          totalSourceScans > 0
                            ? Math.round((data.totalScans / totalSourceScans) * 100)
                            : 0;
                        return (
                          <div key={source} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium text-gray-700">{sourceInfo.label}</span>
                              <span className="text-gray-500">
                                {data.totalScans} scans ({data.qrCount} QR)
                              </span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                              <div
                                className={`h-full rounded-full ${sourceInfo.color}`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No source data yet</p>
                )}
              </div>

              {/* Top Performers */}
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 font-semibold text-gray-900">Top Performers</h3>
                {stats?.topPerformers && stats.topPerformers.length > 0 ? (
                  <div className="space-y-3">
                    {stats.topPerformers.map((qr, index) => (
                      <button
                        key={qr.id}
                        onClick={() => setSelectedQRId(qr.id)}
                        className={`flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors ${
                          selectedQRId === qr.id
                            ? 'bg-blue-50 ring-1 ring-blue-200'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">
                            {qr.title || `QR ${qr.id.slice(0, 6)}`}
                          </p>
                          <p className="text-xs text-gray-500">{qr.scans} scans</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No scans recorded yet</p>
                )}
              </div>
            </div>

            {/* Right Column - Detailed Analytics */}
            <div className="space-y-6 lg:col-span-2">
              {/* QR Selector */}
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Detailed Analytics</h3>
                  <select
                    value={selectedQRId || ''}
                    onChange={(e) => setSelectedQRId(e.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                  >
                    {qrCodes.map((qr) => (
                      <option key={qr.id} value={qr.id}>
                        {qr.title || `QR ${qr.id.slice(0, 6)}`}
                      </option>
                    ))}
                  </select>
                </div>

                {loadingDetails ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600" />
                  </div>
                ) : detailedAnalytics ? (
                  <>
                    {/* Timeline Chart */}
                    <div className="mb-6">
                      <h4 className="mb-3 text-sm font-medium text-gray-700">Scans Over Time</h4>
                      {detailedAnalytics.timeline.length > 0 ? (
                        <div className="flex h-32 items-end justify-between gap-1">
                          {detailedAnalytics.timeline.slice(-14).map((day) => (
                            <div key={day.date} className="flex flex-1 flex-col items-center">
                              <div
                                className="w-full rounded-t bg-blue-500 transition-all hover:bg-blue-600"
                                style={{
                                  height: `${(day.count / maxTimelineScans) * 100}px`,
                                  minHeight: day.count > 0 ? '4px' : '0',
                                }}
                                title={`${day.date}: ${day.count} scans`}
                              />
                              <p className="mt-1 -rotate-45 text-[10px] text-gray-400">
                                {new Date(day.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="py-8 text-center text-sm text-gray-500">
                          No scans in this period
                        </p>
                      )}
                    </div>

                    {/* Breakdown Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {/* Device Type */}
                      <BreakdownCard
                        title="Device Type"
                        icon={<SmartphoneIcon className="h-4 w-4" />}
                        data={detailedAnalytics.byDevice}
                        total={detailedAnalytics.totalScans}
                      />

                      {/* OS */}
                      <BreakdownCard
                        title="Operating System"
                        icon={<GlobeIcon className="h-4 w-4" />}
                        data={detailedAnalytics.byOS}
                        total={detailedAnalytics.totalScans}
                      />

                      {/* Country */}
                      <BreakdownCard
                        title="Country"
                        icon={<MapPinIcon className="h-4 w-4" />}
                        data={detailedAnalytics.byCountry}
                        total={detailedAnalytics.totalScans}
                      />
                    </div>
                  </>
                ) : (
                  <p className="py-8 text-center text-sm text-gray-500">
                    Select a QR code to view detailed analytics
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Metric Card Component
function MetricCard({
  icon,
  label,
  value,
  subLabel,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  subLabel: string;
}) {
  const displayValue = typeof value === 'number' ? value.toLocaleString() : value;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <p className="text-sm text-gray-500">{label}</p>
      </div>
      <p className="text-2xl font-bold text-gray-900">{displayValue}</p>
      <p className="text-xs text-gray-400">{subLabel}</p>
    </div>
  );
}

// Breakdown Card Component
function BreakdownCard({
  title,
  icon,
  data,
  total,
}: {
  title: string;
  icon: React.ReactNode;
  data: Record<string, number>;
  total: number;
}) {
  const entries = Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
      <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-gray-600">
        {icon}
        {title}
      </div>
      {entries.length > 0 ? (
        <div className="space-y-1.5">
          {entries.map(([key, count]) => {
            const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div key={key} className="flex items-center justify-between text-xs">
                <span className="capitalize text-gray-700">{key}</span>
                <span className="text-gray-500">{percentage}%</span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-gray-400">No data</p>
      )}
    </div>
  );
}
