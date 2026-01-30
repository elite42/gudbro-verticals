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
  Cell,
} from 'recharts';

// --- Constants ---

const TIME_RANGES = [
  { label: '7 days', value: 7 },
  { label: '30 days', value: 30 },
  { label: '90 days', value: 90 },
  { label: 'All time', value: 0 },
];

const TYPE_COLORS: Record<string, string> = {
  bug: '#ef4444',
  feature_request: '#3b82f6',
  improvement: '#8b5cf6',
  complaint: '#f59e0b',
  praise: '#10b981',
  operational: '#6b7280',
};

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  new: { bg: 'bg-blue-100', text: 'text-blue-700' },
  triaged: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  in_progress: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  done: { bg: 'bg-green-100', text: 'text-green-700' },
  rejected: { bg: 'bg-red-100', text: 'text-red-700' },
};

// --- Types ---

interface VolumeEntry {
  date: string;
  count: number;
}

interface TypeEntry {
  type: string;
  count: number;
}

interface VerticalEntry {
  vertical: string;
  count: number;
}

interface TopFeature {
  id: string;
  title: string;
  type: string;
  submission_count: number;
  priority: number;
  status: string;
}

interface SummaryData {
  totalSubmissions: number;
  byType: TypeEntry[];
  byVertical: VerticalEntry[];
  topFeatures: TopFeature[];
  avgProcessingHours: number | null;
  avgResolutionHours: number | null;
}

// --- Helper functions ---

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function formatTypeName(type: string): string {
  return type
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function getPriorityBadge(priority: number): { label: string; bg: string; text: string } {
  if (priority <= 2) return { label: 'High', bg: 'bg-red-100', text: 'text-red-700' };
  if (priority === 3) return { label: 'Medium', bg: 'bg-yellow-100', text: 'text-yellow-700' };
  return { label: 'Low', bg: 'bg-green-100', text: 'text-green-700' };
}

// --- Components ---

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-gray-200 ${className || ''}`} />;
}

function MetricCard({ label, value, tooltip }: { label: string; value: string; tooltip: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6" title={tooltip}>
      <p className="mb-1 text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

// --- Main Dashboard ---

export function AnalyticsDashboard() {
  const [selectedDays, setSelectedDays] = useState(30);
  const [volumeData, setVolumeData] = useState<VolumeEntry[]>([]);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      try {
        const params = selectedDays > 0 ? `?days=${selectedDays}` : '?days=0';
        const [volumeRes, summaryRes] = await Promise.all([
          fetch(`/api/feedback/analytics/volume${params}`),
          fetch(`/api/feedback/analytics/summary${params}`),
        ]);

        if (cancelled) return;

        if (volumeRes.ok) {
          const vData = await volumeRes.json();
          setVolumeData(vData.volume || []);
        } else {
          setVolumeData([]);
        }

        if (summaryRes.ok) {
          const sData = await summaryRes.json();
          setSummaryData(sData);
        } else {
          setSummaryData(null);
        }
      } catch {
        if (!cancelled) {
          setVolumeData([]);
          setSummaryData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [selectedDays]);

  const isEmpty =
    !loading && volumeData.length === 0 && (!summaryData || summaryData.totalSubmissions === 0);

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
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
          <Skeleton className="h-[340px]" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Skeleton className="h-[300px]" />
            <Skeleton className="h-[300px]" />
          </div>
          <Skeleton className="h-[300px]" />
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
          <h3 className="mb-1 text-lg font-semibold text-gray-900">
            No submissions in this time range
          </h3>
          <p className="text-sm text-gray-500">
            Try selecting a wider time range or wait for new feedback.
          </p>
        </div>
      )}

      {/* Dashboard content */}
      {!loading && !isEmpty && summaryData && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              label="Total Submissions"
              value={summaryData.totalSubmissions.toLocaleString()}
              tooltip="Total feedback submissions received in the selected time range"
            />
            <MetricCard
              label="Avg Processing Time"
              value={
                summaryData.avgProcessingHours !== null
                  ? `${summaryData.avgProcessingHours}h`
                  : 'N/A'
              }
              tooltip="Average time from submission to AI processing completion"
            />
            <MetricCard
              label="Avg Resolution Time"
              value={
                summaryData.avgResolutionHours !== null
                  ? `${summaryData.avgResolutionHours}h`
                  : 'N/A'
              }
              tooltip="Average time from task creation to resolution"
            />
            <MetricCard
              label="Top Features"
              value={summaryData.topFeatures.length.toString()}
              tooltip="Number of unique feature requests tracked"
            />
          </div>

          {/* Volume Line Chart */}
          {volumeData.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Submission Volume</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip
                    labelFormatter={(label) => {
                      const d = new Date(label as string);
                      return d.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      });
                    }}
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                    name="Submissions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Type + Vertical Breakdown */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Type Breakdown */}
            {summaryData.byType.length > 0 && (
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Type Breakdown</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={summaryData.byType}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="type"
                      tickFormatter={formatTypeName}
                      tick={{ fontSize: 11, fill: '#6b7280' }}
                    />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <Tooltip
                      labelFormatter={(label) => formatTypeName(label as string)}
                      contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                      }}
                    />
                    <Bar dataKey="count" name="Submissions" radius={[4, 4, 0, 0]}>
                      {summaryData.byType.map((entry) => (
                        <Cell key={entry.type} fill={TYPE_COLORS[entry.type] || '#6b7280'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Vertical Breakdown */}
            {summaryData.byVertical.length > 0 && (
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Vertical Breakdown</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={summaryData.byVertical} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      type="number"
                      allowDecimals={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis
                      type="category"
                      dataKey="vertical"
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      width={100}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                      }}
                    />
                    <Bar dataKey="count" fill="#3b82f6" name="Submissions" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Top Features Table */}
          {summaryData.topFeatures.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Top Requested Features</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                        #
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                        Title
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                        Submissions
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                        Priority
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {summaryData.topFeatures.map((feature, index) => {
                      const priority = getPriorityBadge(feature.priority);
                      const status = STATUS_COLORS[feature.status] || {
                        bg: 'bg-gray-100',
                        text: 'text-gray-700',
                      };
                      return (
                        <tr key={feature.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-500">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {feature.title}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {feature.submission_count}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${priority.bg} ${priority.text}`}
                            >
                              {priority.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${status.bg} ${status.text}`}
                            >
                              {feature.status.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
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
