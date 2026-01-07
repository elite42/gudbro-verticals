'use client';

import { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Smartphone,
  Monitor,
  Tablet,
  FileDown,
  Zap,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  LineChart,
} from 'lucide-react';

const METRICS = [
  { id: 'views', label: 'Page Views', value: '12,847', change: '+23%', positive: true, icon: Eye },
  {
    id: 'visitors',
    label: 'Unique Visitors',
    value: '3,421',
    change: '+18%',
    positive: true,
    icon: Users,
  },
  {
    id: 'sessions',
    label: 'Sessions',
    value: '4,892',
    change: '+12%',
    positive: true,
    icon: Target,
  },
  {
    id: 'conversion',
    label: 'Conversion Rate',
    value: '8.4%',
    change: '+2.1%',
    positive: true,
    icon: Zap,
  },
];

const CHART_DATA = [
  { day: 'Mon', views: 1200, orders: 45 },
  { day: 'Tue', views: 1400, orders: 52 },
  { day: 'Wed', views: 1100, orders: 38 },
  { day: 'Thu', views: 1600, orders: 61 },
  { day: 'Fri', views: 2200, orders: 89 },
  { day: 'Sat', views: 2800, orders: 112 },
  { day: 'Sun', views: 2100, orders: 78 },
];

const TOP_ITEMS = [
  { name: 'Signature Latte', views: 847, conversion: 12 },
  { name: 'Wagyu Burger', views: 623, conversion: 18 },
  { name: 'Truffle Pasta', views: 512, conversion: 15 },
  { name: 'Matcha Cake', views: 489, conversion: 22 },
  { name: 'Cold Brew', views: 456, conversion: 9 },
];

const DEVICES = [
  { type: 'Mobile', percentage: 68, icon: Smartphone, color: 'bg-blue-500' },
  { type: 'Desktop', percentage: 24, icon: Monitor, color: 'bg-purple-500' },
  { type: 'Tablet', percentage: 8, icon: Tablet, color: 'bg-emerald-500' },
];

const PEAK_HOURS = [
  { hour: '10', activity: 30 },
  { hour: '11', activity: 45 },
  { hour: '12', activity: 90 },
  { hour: '13', activity: 85 },
  { hour: '14', activity: 55 },
  { hour: '15', activity: 40 },
  { hour: '16', activity: 35 },
  { hour: '17', activity: 50 },
  { hour: '18', activity: 80 },
  { hour: '19', activity: 100 },
  { hour: '20', activity: 95 },
  { hour: '21', activity: 70 },
];

export function AnalyticsSection() {
  const [activeTab, setActiveTab] = useState<'overview' | 'items' | 'behavior'>('overview');
  const maxViews = Math.max(...CHART_DATA.map((d) => d.views));

  return (
    <section className="bg-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
            <BarChart3 className="h-5 w-5 text-blue-400" />
            <span className="font-medium text-blue-400">Real-Time Analytics</span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Data-Driven Decisions,
            <br />
            <span className="text-blue-400">Real-Time Insights</span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-slate-300">
            Track every interaction, understand your customers, and optimize your menu with
            comprehensive analytics built for F&B.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex rounded-xl bg-slate-800 p-1">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'items', label: 'Top Items' },
              { id: 'behavior', label: 'User Behavior' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`rounded-lg px-6 py-3 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-slate-400 hover:text-white'
                } `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metrics Row */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {METRICS.map((metric) => (
                <div
                  key={metric.id}
                  className="rounded-xl border border-slate-700 bg-slate-800 p-6"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <metric.icon className="h-5 w-5 text-slate-400" />
                    <span
                      className={`flex items-center gap-1 text-sm font-medium ${metric.positive ? 'text-green-400' : 'text-red-400'} `}
                    >
                      {metric.positive ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      {metric.change}
                    </span>
                  </div>
                  <div className="mb-1 text-3xl font-bold text-white">{metric.value}</div>
                  <div className="text-sm text-slate-400">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Page Views Over Time</h3>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <LineChart className="h-4 w-4" />
                  Last 7 days
                </div>
              </div>
              <div className="flex h-48 items-end justify-between gap-4">
                {CHART_DATA.map((day, idx) => (
                  <div key={idx} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-blue-600 to-blue-400 transition-all hover:from-blue-500 hover:to-blue-300"
                      style={{ height: `${(day.views / maxViews) * 180}px` }}
                    />
                    <span className="text-sm text-slate-400">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Top Items Tab */}
        {activeTab === 'items' && (
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Top Items List */}
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
              <h3 className="mb-6 text-lg font-semibold text-white">Most Viewed Items</h3>
              <div className="space-y-4">
                {TOP_ITEMS.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-sm font-bold text-slate-300">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="font-medium text-white">{item.name}</span>
                        <span className="text-sm text-slate-400">{item.views} views</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                          style={{ width: `${(item.views / TOP_ITEMS[0].views) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-green-400">{item.conversion}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversion Funnel */}
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
              <h3 className="mb-6 text-lg font-semibold text-white">Conversion Funnel</h3>
              <div className="space-y-4">
                {[
                  { stage: 'Menu Views', count: 12847, percentage: 100 },
                  { stage: 'Item Details', count: 6423, percentage: 50 },
                  { stage: 'Add to Cart', count: 2134, percentage: 17 },
                  { stage: 'Order Placed', count: 1078, percentage: 8 },
                ].map((stage, idx) => (
                  <div key={idx} className="relative">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-slate-300">{stage.stage}</span>
                      <span className="font-medium text-white">{stage.count.toLocaleString()}</span>
                    </div>
                    <div className="h-10 overflow-hidden rounded-lg bg-slate-700">
                      <div
                        className="flex h-full items-center justify-end rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 pr-4"
                        style={{ width: `${stage.percentage}%` }}
                      >
                        <span className="text-sm font-medium text-white">{stage.percentage}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* User Behavior Tab */}
        {activeTab === 'behavior' && (
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Device Distribution */}
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
              <h3 className="mb-6 text-lg font-semibold text-white">Device Distribution</h3>
              <div className="space-y-4">
                {DEVICES.map((device) => (
                  <div key={device.type} className="flex items-center gap-4">
                    <div className={`rounded-xl p-3 ${device.color}`}>
                      <device.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="font-medium text-white">{device.type}</span>
                        <span className="text-slate-400">{device.percentage}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                        <div
                          className={`h-full ${device.color} rounded-full`}
                          style={{ width: `${device.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg bg-slate-700/50 p-4">
                <p className="text-sm text-slate-300">
                  <span className="font-medium text-blue-400">68%</span> of your customers view your
                  menu on mobile devices. Our PWA is optimized for mobile-first experiences.
                </p>
              </div>
            </div>

            {/* Peak Hours */}
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
              <h3 className="mb-2 text-lg font-semibold text-white">Peak Hours</h3>
              <p className="mb-6 text-sm text-slate-400">When customers are most active</p>
              <div className="flex h-40 items-end justify-between gap-1">
                {PEAK_HOURS.map((hour) => (
                  <div key={hour.hour} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-t transition-all ${
                        hour.activity === 100
                          ? 'bg-green-500'
                          : hour.activity >= 80
                            ? 'bg-yellow-500'
                            : 'bg-slate-600'
                      } `}
                      style={{ height: `${hour.activity * 1.2}px` }}
                    />
                    <span className="text-xs text-slate-500">{hour.hour}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-green-500" />
                  <span className="text-slate-400">Peak</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-yellow-500" />
                  <span className="text-slate-400">Busy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-slate-600" />
                  <span className="text-slate-400">Normal</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export Options */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3">
            <FileDown className="h-5 w-5 text-slate-400" />
            <span className="text-slate-300">Export to CSV or PDF</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3">
            <Clock className="h-5 w-5 text-slate-400" />
            <span className="text-slate-300">Real-time updates</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3">
            <TrendingUp className="h-5 w-5 text-slate-400" />
            <span className="text-slate-300">AI-powered insights</span>
          </div>
        </div>
      </div>
    </section>
  );
}
