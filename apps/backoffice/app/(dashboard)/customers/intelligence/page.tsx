'use client';

import { useState, useEffect } from 'react';
import { useTenant } from '@/lib/contexts/TenantContext';
import { EmptyState } from '@/components/ui/empty-state';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Target,
  RefreshCw,
  ChevronRight,
  Sparkles,
  DollarSign,
  Clock,
  UserX,
  Crown,
  Heart,
  Sprout,
  AlertCircle,
  Moon,
  XCircle,
} from 'lucide-react';

// Types
interface CustomerIntelligenceSummary {
  merchantId: string;
  totalCustomers: number;
  bySegment: Record<string, number>;
  highRiskCount: number;
  avgClv: number;
  totalClv: number;
}

interface CustomerAtRisk {
  accountId: string;
  email: string;
  name: string;
  churnRiskScore: number;
  churnRiskLevel: string;
  daysSinceLastVisit: number;
  clvEstimated: number;
  segment: string;
  recommendedActions: any[];
}

// Segment config with icons and colors
const SEGMENT_CONFIG: Record<string, { icon: any; color: string; bgColor: string }> = {
  champion: {
    icon: Crown,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  loyal: { icon: Heart, color: 'text-green-600', bgColor: 'bg-green-100' },
  potential: { icon: Sprout, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  new: { icon: Sparkles, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  at_risk: {
    icon: AlertCircle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  dormant: { icon: Moon, color: 'text-gray-600', bgColor: 'bg-gray-100' },
  lost: { icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-100' },
};

// Currency info for formatting
const CURRENCY_INFO: Record<string, { locale: string; symbol: string }> = {
  USD: { locale: 'en-US', symbol: '$' },
  EUR: { locale: 'de-DE', symbol: '€' },
  GBP: { locale: 'en-GB', symbol: '£' },
  VND: { locale: 'vi-VN', symbol: '₫' },
  JPY: { locale: 'ja-JP', symbol: '¥' },
  CNY: { locale: 'zh-CN', symbol: '¥' },
  KRW: { locale: 'ko-KR', symbol: '₩' },
  THB: { locale: 'th-TH', symbol: '฿' },
  SGD: { locale: 'en-SG', symbol: 'S$' },
  AUD: { locale: 'en-AU', symbol: 'A$' },
  CAD: { locale: 'en-CA', symbol: 'C$' },
  CHF: { locale: 'de-CH', symbol: 'CHF' },
  MXN: { locale: 'es-MX', symbol: 'MX$' },
  BRL: { locale: 'pt-BR', symbol: 'R$' },
  INR: { locale: 'en-IN', symbol: '₹' },
  RUB: { locale: 'ru-RU', symbol: '₽' },
  TRY: { locale: 'tr-TR', symbol: '₺' },
  PLN: { locale: 'pl-PL', symbol: 'zł' },
  IDR: { locale: 'id-ID', symbol: 'Rp' },
  MYR: { locale: 'ms-MY', symbol: 'RM' },
  PHP: { locale: 'en-PH', symbol: '₱' },
};

// Format currency with dynamic currency code
function formatCurrency(value: number, currencyCode: string = 'EUR'): string {
  const info = CURRENCY_INFO[currencyCode] || { locale: 'en-US', symbol: currencyCode };
  return new Intl.NumberFormat(info.locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function CustomerIntelligencePage() {
  const t = useTranslations('intelligencePage');
  const { brand, location } = useTenant();
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [summary, setSummary] = useState<CustomerIntelligenceSummary | null>(null);
  const [atRiskCustomers, setAtRiskCustomers] = useState<CustomerAtRisk[]>([]);

  // Use brand.id as merchantId (following existing patterns)
  const merchantId = brand?.id;
  // Get currency from location settings
  const currencyCode = location?.currency_code || 'EUR';

  // Fetch data
  const fetchData = async () => {
    if (!merchantId) return;

    try {
      const [summaryRes, atRiskRes] = await Promise.all([
        fetch(`/api/ai/customer-intelligence?merchantId=${merchantId}&action=summary`),
        fetch(`/api/ai/customer-intelligence?merchantId=${merchantId}&action=at-risk`),
      ]);

      const summaryData = await summaryRes.json();
      const atRiskData = await atRiskRes.json();

      if (summaryData.success) {
        setSummary(summaryData.summary);
      }

      if (atRiskData.success) {
        setAtRiskCustomers(atRiskData.customers || []);
      }
    } catch (error) {
      console.error('Error fetching intelligence data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [merchantId]);

  // Sync from analytics
  const handleSync = async () => {
    if (!merchantId) return;
    setIsSyncing(true);

    try {
      const res = await fetch('/api/ai/customer-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchantId, action: 'sync' }),
      });

      const data = await res.json();
      if (data.success) {
        await fetchData();
      }
    } catch (error) {
      console.error('Error syncing:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  // Analyze all customers
  const handleAnalyzeAll = async () => {
    if (!merchantId) return;
    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/ai/customer-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchantId, action: 'analyze-all' }),
      });

      const data = await res.json();
      if (data.success) {
        await fetchData();
      }
    } catch (error) {
      console.error('Error analyzing:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="mb-2 h-8 w-64 rounded bg-gray-200" />
          <div className="h-4 w-96 rounded bg-gray-100" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      </div>
    );
  }

  // Calculate at-risk value
  const atRiskValue = atRiskCustomers.reduce((sum, c) => sum + (c.clvEstimated || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
          >
            <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {t('sync')}
          </button>
          <button
            onClick={handleAnalyzeAll}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Sparkles className={`h-4 w-4 ${isAnalyzing ? 'animate-pulse' : ''}`} />
            {isAnalyzing ? t('analyzing') : t('analyzeAll')}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={DollarSign}
          label={t('stats.totalClv')}
          value={formatCurrency(summary?.totalClv || 0, currencyCode)}
          color="green"
        />
        <StatCard
          icon={Users}
          label={t('stats.customersAnalyzed')}
          value={summary?.totalCustomers || 0}
          color="blue"
        />
        <StatCard
          icon={AlertTriangle}
          label={t('stats.atRisk')}
          value={summary?.highRiskCount || 0}
          subtitle={t('stats.highPriority')}
          color="red"
        />
        <StatCard
          icon={TrendingUp}
          label={t('stats.averageClv')}
          value={formatCurrency(summary?.avgClv || 0, currencyCode)}
          color="purple"
        />
      </div>

      {/* Urgent Banner */}
      {(summary?.highRiskCount || 0) > 0 && (
        <div className="rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 p-4 dark:border-red-800 dark:from-red-900/20 dark:to-orange-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-red-100 p-2 dark:bg-red-900/50">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="font-semibold text-red-900 dark:text-red-100">
                  {t('urgentBanner.title', { count: summary?.highRiskCount ?? 0 })}
                </p>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {t('urgentBanner.potentialLoss', {
                    amount: formatCurrency(atRiskValue, currencyCode),
                  })}
                </p>
              </div>
            </div>
            <Link
              href="#at-risk"
              className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              {t('urgentBanner.viewAtRisk')}
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Segments Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('segments.title')}
              </h2>
            </div>
          </div>

          <div className="space-y-3">
            {Object.entries(SEGMENT_CONFIG).map(([key, config]) => {
              const count = summary?.bySegment?.[key] || 0;
              const percentage = summary?.totalCustomers
                ? Math.round((count / summary.totalCustomers) * 100)
                : 0;
              const Icon = config.icon;

              return (
                <div key={key} className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${config.bgColor}`}>
                    <Icon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t(`segments.${key}`)}
                      </span>
                      <span className="text-sm text-gray-500">{count}</span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                      <div
                        className={`h-full transition-all duration-500 ${
                          key === 'champion'
                            ? 'bg-yellow-500'
                            : key === 'loyal'
                              ? 'bg-green-500'
                              : key === 'potential'
                                ? 'bg-blue-500'
                                : key === 'at_risk'
                                  ? 'bg-orange-500'
                                  : key === 'dormant'
                                    ? 'bg-gray-400'
                                    : key === 'lost'
                                      ? 'bg-red-500'
                                      : 'bg-purple-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Recommended Actions */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('recommendations.title')}
              </h2>
            </div>
          </div>

          {atRiskCustomers.length > 0 ? (
            <div className="space-y-3">
              {atRiskCustomers.slice(0, 3).map((customer, idx) => (
                <Link
                  key={customer.accountId}
                  href={`/customers/${customer.accountId}`}
                  className="block rounded-lg border border-gray-100 p-3 transition-colors hover:border-purple-200 dark:border-gray-800 dark:hover:border-purple-800"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-600">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {t('recommendations.winBack', {
                            name: customer.name || customer.email?.split('@')[0],
                          })}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {t('recommendations.clvAtRisk', {
                          amount: formatCurrency(customer.clvEstimated, currencyCode),
                        })}
                        {customer.daysSinceLastVisit && (
                          <>
                            {' '}
                            •{' '}
                            {t('recommendations.daysInactive', {
                              days: customer.daysSinceLastVisit,
                            })}
                          </>
                        )}
                      </p>
                    </div>
                    <span className="rounded-lg bg-purple-100 px-3 py-1.5 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                      {t('recommendations.view')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Sparkles className="h-12 w-12 text-gray-300 dark:text-gray-600" />
              <p className="mt-3 text-gray-500">{t('recommendations.noActions')}</p>
              <button
                onClick={handleAnalyzeAll}
                className="mt-3 text-sm font-medium text-purple-600 hover:text-purple-700"
              >
                {t('recommendations.runAnalysis')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* At-Risk Customers Table */}
      <div
        id="at-risk"
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserX className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('atRiskTable.title')}
            </h2>
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
              {t('atRiskTable.sortedByClv')}
            </span>
          </div>
          <Link
            href="/ai/triggers"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            {t('atRiskTable.setupTriggers')}
          </Link>
        </div>

        {atRiskCustomers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="pb-3 text-left text-xs font-medium uppercase text-gray-500">
                    {t('atRiskTable.customer')}
                  </th>
                  <th className="pb-3 text-left text-xs font-medium uppercase text-gray-500">
                    {t('atRiskTable.clv')}
                  </th>
                  <th className="pb-3 text-left text-xs font-medium uppercase text-gray-500">
                    {t('atRiskTable.inactive')}
                  </th>
                  <th className="pb-3 text-left text-xs font-medium uppercase text-gray-500">
                    {t('atRiskTable.risk')}
                  </th>
                  <th className="pb-3 text-right text-xs font-medium uppercase text-gray-500">
                    {t('atRiskTable.action')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {atRiskCustomers.map((customer) => (
                  <tr
                    key={customer.accountId}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="py-3">
                      <Link href={`/customers/${customer.accountId}`} className="block">
                        <p className="font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
                          {customer.name || t('atRiskTable.unknown')}
                        </p>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                      </Link>
                    </td>
                    <td className="py-3">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(customer.clvEstimated, currencyCode)}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>{t('atRiskTable.days', { count: customer.daysSinceLastVisit })}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          customer.churnRiskLevel === 'critical'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                        }`}
                      >
                        {customer.churnRiskLevel?.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/customers/${customer.accountId}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
                      >
                        {t('atRiskTable.viewDetails')}
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={<Users className="h-12 w-12" />}
            title={t('atRiskTable.emptyTitle')}
            description={t('atRiskTable.emptyDescription')}
            variant="minimal"
            size="sm"
          />
        )}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({
  icon: Icon,
  label,
  value,
  subtitle,
  color,
}: {
  icon: any;
  label: string;
  value: string | number;
  subtitle?: string;
  color: 'green' | 'blue' | 'red' | 'purple';
}) {
  const colorClasses = {
    green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center gap-3">
        <div className={`rounded-lg p-2 ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
