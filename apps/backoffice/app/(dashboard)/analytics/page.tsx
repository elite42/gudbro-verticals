'use client';

import { useState } from 'react';

type TimeRange = '7d' | '30d' | '90d' | '1y';

interface ScanData {
  date: string;
  scans: number;
}

const mockScanData: ScanData[] = [
  { date: '2024-01-22', scans: 45 },
  { date: '2024-01-23', scans: 62 },
  { date: '2024-01-24', scans: 58 },
  { date: '2024-01-25', scans: 71 },
  { date: '2024-01-26', scans: 89 },
  { date: '2024-01-27', scans: 112 },
  { date: '2024-01-28', scans: 95 },
];

const topQRCodes = [
  { name: 'Counter', scans: 456, change: +12 },
  { name: 'Table 1', scans: 234, change: +8 },
  { name: 'Table 2', scans: 189, change: -3 },
  { name: 'Outdoor Area', scans: 78, change: +5 },
];

const topLanguages = [
  { code: 'en', name: 'English', flag: '🇬🇧', percentage: 45 },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳', percentage: 30 },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', percentage: 15 },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', percentage: 7 },
  { code: 'other', name: 'Other', flag: '🌍', percentage: 3 },
];

const peakHours = [
  { hour: '8AM', scans: 12 },
  { hour: '9AM', scans: 25 },
  { hour: '10AM', scans: 38 },
  { hour: '11AM', scans: 45 },
  { hour: '12PM', scans: 78 },
  { hour: '1PM', scans: 65 },
  { hour: '2PM', scans: 42 },
  { hour: '3PM', scans: 35 },
  { hour: '4PM', scans: 28 },
  { hour: '5PM', scans: 45 },
  { hour: '6PM', scans: 68 },
  { hour: '7PM', scans: 82 },
  { hour: '8PM', scans: 55 },
  { hour: '9PM', scans: 32 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  const maxScans = Math.max(...mockScanData.map((d) => d.scans));
  const totalScans = mockScanData.reduce((acc, d) => acc + d.scans, 0);
  const avgScans = Math.round(totalScans / mockScanData.length);
  const maxPeakScans = Math.max(...peakHours.map((h) => h.scans));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track QR code scans and user engagement
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
          {(['7d', '30d', '90d', '1y'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Total Scans</p>
          <p className="text-2xl font-bold text-gray-900">{totalScans.toLocaleString()}</p>
          <p className="text-sm text-green-600">+23% vs last period</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Avg. Daily Scans</p>
          <p className="text-2xl font-bold text-gray-900">{avgScans}</p>
          <p className="text-sm text-green-600">+12% vs last period</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Unique Visitors</p>
          <p className="text-2xl font-bold text-gray-900">423</p>
          <p className="text-sm text-green-600">+18% vs last period</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Avg. Session Time</p>
          <p className="text-2xl font-bold text-gray-900">2m 34s</p>
          <p className="text-sm text-red-600">-5% vs last period</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900">Scans Over Time</h3>
        <div className="mt-6 h-64 flex items-end justify-between gap-2">
          {mockScanData.map((day, index) => (
            <div key={day.date} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                style={{ height: `${(day.scans / maxScans) * 200}px` }}
              />
              <p className="mt-2 text-xs text-gray-500">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <p className="text-xs font-medium text-gray-700">{day.scans}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top QR Codes */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900">Top QR Codes</h3>
          <div className="mt-4 space-y-4">
            {topQRCodes.map((qr, index) => (
              <div key={qr.name} className="flex items-center gap-4">
                <span className="w-6 text-center font-bold text-gray-400">
                  #{index + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{qr.name}</span>
                    <span className="text-sm text-gray-600">{qr.scans} scans</span>
                  </div>
                  <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(qr.scans / topQRCodes[0].scans) * 100}%` }}
                    />
                  </div>
                </div>
                <span
                  className={`text-sm font-medium ${
                    qr.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {qr.change >= 0 ? '+' : ''}
                  {qr.change}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Language Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900">Language Distribution</h3>
          <div className="mt-4 space-y-4">
            {topLanguages.map((lang) => (
              <div key={lang.code} className="flex items-center gap-4">
                <span className="text-xl">{lang.flag}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{lang.name}</span>
                    <span className="text-sm text-gray-600">{lang.percentage}%</span>
                  </div>
                  <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Peak Hours */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900">Peak Hours</h3>
        <p className="text-sm text-gray-500">When your QR codes get the most scans</p>
        <div className="mt-6 h-40 flex items-end justify-between gap-1">
          {peakHours.map((hour) => (
            <div key={hour.hour} className="flex-1 flex flex-col items-center">
              <div
                className={`w-full rounded-t transition-all ${
                  hour.scans === maxPeakScans
                    ? 'bg-green-500'
                    : hour.scans > maxPeakScans * 0.7
                    ? 'bg-yellow-500'
                    : 'bg-gray-300'
                }`}
                style={{ height: `${(hour.scans / maxPeakScans) * 120}px` }}
              />
              <p className="mt-2 text-xs text-gray-500 -rotate-45">{hour.hour}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded" />
            <span className="text-gray-600">Peak</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded" />
            <span className="text-gray-600">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-300 rounded" />
            <span className="text-gray-600">Normal</span>
          </div>
        </div>
      </div>

      {/* Export */}
      <div className="flex items-center justify-end gap-3">
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          📊 Export CSV
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          📄 Export PDF Report
        </button>
      </div>
    </div>
  );
}
