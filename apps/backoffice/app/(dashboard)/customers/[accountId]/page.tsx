'use client';

import { useState, useEffect } from 'react';
import { useTenant } from '@/lib/contexts/TenantContext';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  Gift,
  User,
  DollarSign,
  ShoppingBag,
  Calculator,
  Award,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle,
  XCircle,
  Send,
  Crown,
  Heart,
  Sprout,
  AlertCircle,
  Moon,
  Star,
} from 'lucide-react';

// Types
interface CustomerDetailData {
  success: boolean;
  account: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    displayName: string | null;
    avatarUrl: string | null;
  } | null;
  follower: {
    id: string;
    source: string | null;
    followedAt: string;
    isActive: boolean;
    analytics: {
      totalVisits: number;
      totalOrders: number;
      totalSpent: number;
      averageOrderValue: number;
      lastVisitAt: string | null;
      loyaltyPoints: number;
      feedbackCount: number;
      averageRating: number | null;
    } | null;
  } | null;
  intelligence: {
    clvEstimated: number | null;
    clvConfidence: number | null;
    churnRiskScore: number | null;
    churnRiskLevel: string | null;
    churnFactors: string[];
    daysSinceLastVisit: number | null;
    segment: string | null;
    predictedNextVisitAt: string | null;
    recommendedActions: Array<{
      type: string;
      priority: number;
      title: string;
      description: string;
      expectedRoi?: number;
    }>;
    visitPattern: Record<string, any>;
    orderPattern: Record<string, any>;
  } | null;
  triggerHistory: Array<{
    id: string;
    triggerId: string;
    triggerName: string;
    triggerType: string;
    actionType: string;
    triggeredAt: string;
    status: string;
    convertedAt: string | null;
    conversionValue: number | null;
  }>;
}

// Segment config
const SEGMENT_CONFIG: Record<string, { icon: any; label: string; color: string; bgColor: string }> =
  {
    champion: {
      icon: Crown,
      label: 'Champion',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    loyal: { icon: Heart, label: 'Loyal', color: 'text-green-600', bgColor: 'bg-green-100' },
    potential: { icon: Sprout, label: 'Potential', color: 'text-blue-600', bgColor: 'bg-blue-100' },
    new: { icon: Sparkles, label: 'New', color: 'text-purple-600', bgColor: 'bg-purple-100' },
    at_risk: {
      icon: AlertCircle,
      label: 'At Risk',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    dormant: { icon: Moon, label: 'Dormant', color: 'text-gray-600', bgColor: 'bg-gray-100' },
    lost: { icon: XCircle, label: 'Lost', color: 'text-red-600', bgColor: 'bg-red-100' },
  };

// Currency info
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
};

function formatCurrency(value: number, currencyCode: string = 'EUR'): string {
  const info = CURRENCY_INFO[currencyCode] || { locale: 'en-US', symbol: currencyCode };
  return new Intl.NumberFormat(info.locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '-';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
}

function formatDateTime(dateString: string | null): string {
  if (!dateString) return '-';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}

// Get initials from name or email
function getInitials(firstName: string | null, lastName: string | null, email: string): string {
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }
  if (firstName) {
    return firstName.slice(0, 2).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
}

// Get display name
function getDisplayName(account: CustomerDetailData['account']): string {
  if (!account) return 'Unknown Customer';
  if (account.displayName) return account.displayName;
  if (account.firstName && account.lastName) {
    return `${account.firstName} ${account.lastName}`;
  }
  if (account.firstName) return account.firstName;
  return account.email.split('@')[0];
}

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { brand, location } = useTenant();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<CustomerDetailData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const accountId = params.accountId as string;
  const merchantId = brand?.id;
  const currencyCode = location?.currency_code || 'EUR';

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!merchantId || !accountId) return;

      try {
        const res = await fetch(
          `/api/ai/customer-intelligence/${accountId}?merchantId=${merchantId}`
        );
        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.error || 'Failed to fetch customer data');
        }

        setData(result);
      } catch (err) {
        console.error('Error fetching customer:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerData();
  }, [merchantId, accountId]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="animate-pulse">
          <div className="mb-4 h-4 w-32 rounded bg-gray-200" />
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gray-200" />
            <div>
              <div className="mb-2 h-6 w-48 rounded bg-gray-200" />
              <div className="h-4 w-64 rounded bg-gray-100" />
            </div>
          </div>
        </div>
        {/* Cards skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <XCircle className="mb-4 h-12 w-12 text-red-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Error loading customer
        </h2>
        <p className="mt-1 text-gray-500">{error || 'Customer not found'}</p>
        <button
          onClick={() => router.back()}
          className="mt-4 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Go back
        </button>
      </div>
    );
  }

  const { account, follower, intelligence, triggerHistory } = data;
  const analytics = follower?.analytics;
  const segmentConfig = intelligence?.segment ? SEGMENT_CONFIG[intelligence.segment] : null;
  const SegmentIcon = segmentConfig?.icon;

  // Calculate churn risk percentage
  const churnRiskPercentage = intelligence?.churnRiskScore
    ? Math.round(intelligence.churnRiskScore * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Link
            href="/customers/intelligence"
            className="mt-1 rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-4">
            {/* Avatar */}
            {account?.avatarUrl ? (
              <img src={account.avatarUrl} alt="" className="h-16 w-16 rounded-full object-cover" />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-bold text-white">
                {getInitials(
                  account?.firstName || null,
                  account?.lastName || null,
                  account?.email || 'U'
                )}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {getDisplayName(account)}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {account?.email}
                {follower?.followedAt && (
                  <span className="ml-2 text-gray-400">
                    · Follower since {formatDate(follower.followedAt)}
                  </span>
                )}
              </p>
              {segmentConfig && (
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${segmentConfig.bgColor} ${segmentConfig.color}`}
                  >
                    {SegmentIcon && <SegmentIcon className="h-3 w-3" />}
                    {segmentConfig.label}
                  </span>
                  {intelligence?.clvEstimated && (
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      · CLV: {formatCurrency(intelligence.clvEstimated, currencyCode)}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <Mail className="h-4 w-4" />
            Message
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Gift className="h-4 w-4" />
            Send Promo
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={DollarSign}
          label="Lifetime Value"
          value={formatCurrency(
            intelligence?.clvEstimated || analytics?.totalSpent || 0,
            currencyCode
          )}
          subtitle={
            intelligence?.clvConfidence
              ? `${Math.round(intelligence.clvConfidence * 100)}% confidence`
              : undefined
          }
          color="green"
        />
        <MetricCard
          icon={ShoppingBag}
          label="Total Orders"
          value={analytics?.totalOrders || 0}
          color="blue"
        />
        <MetricCard
          icon={Calculator}
          label="Avg Order"
          value={formatCurrency(analytics?.averageOrderValue || 0, currencyCode)}
          color="purple"
        />
        <MetricCard
          icon={Award}
          label="Loyalty Points"
          value={analytics?.loyaltyPoints || 0}
          color="yellow"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Churn Risk */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Churn Risk</h2>
          </div>

          {intelligence?.churnRiskScore !== null ? (
            <>
              {/* Risk Gauge */}
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {churnRiskPercentage}%
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      intelligence?.churnRiskLevel === 'critical'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : intelligence?.churnRiskLevel === 'high'
                          ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                          : intelligence?.churnRiskLevel === 'medium'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}
                  >
                    {intelligence?.churnRiskLevel?.toUpperCase()}
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                  <div
                    className={`h-full transition-all duration-500 ${
                      churnRiskPercentage >= 75
                        ? 'bg-red-500'
                        : churnRiskPercentage >= 50
                          ? 'bg-orange-500'
                          : churnRiskPercentage >= 25
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                    }`}
                    style={{ width: `${churnRiskPercentage}%` }}
                  />
                </div>
              </div>

              {/* Risk Details */}
              <div className="space-y-2">
                {intelligence?.daysSinceLastVisit !== null &&
                  intelligence?.daysSinceLastVisit !== undefined && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{intelligence?.daysSinceLastVisit} days since last visit</span>
                    </div>
                  )}
                {intelligence?.predictedNextVisitAt && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Predicted next visit: {formatDate(intelligence?.predictedNextVisitAt)}
                    </span>
                  </div>
                )}
              </div>

              {/* Churn Factors */}
              {intelligence?.churnFactors && intelligence.churnFactors.length > 0 && (
                <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">
                  <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Risk Factors:
                  </p>
                  <ul className="space-y-1">
                    {intelligence.churnFactors.slice(0, 3).map((factor, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-400" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-300 dark:text-gray-600" />
              <p className="mt-3 text-gray-500">No risk analysis available</p>
              <p className="text-sm text-gray-400">Run AI analysis from the Intelligence page</p>
            </div>
          )}
        </div>

        {/* AI Recommendations */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI Recommendations
            </h2>
          </div>

          {intelligence?.recommendedActions && intelligence.recommendedActions.length > 0 ? (
            <div className="space-y-3">
              {intelligence.recommendedActions.map((action, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-gray-100 p-3 dark:border-gray-800"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                            action.priority <= 1
                              ? 'bg-red-100 text-red-600'
                              : action.priority <= 2
                                ? 'bg-orange-100 text-orange-600'
                                : 'bg-blue-100 text-blue-600'
                          }`}
                        >
                          {action.priority}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {action.title}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{action.description}</p>
                      {action.expectedRoi && (
                        <p className="mt-1 text-xs text-green-600">
                          Expected ROI: {formatCurrency(action.expectedRoi, currencyCode)}
                        </p>
                      )}
                    </div>
                    <button className="ml-2 rounded-lg bg-purple-100 p-2 text-purple-600 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400">
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Sparkles className="h-12 w-12 text-gray-300 dark:text-gray-600" />
              <p className="mt-3 text-gray-500">No recommendations yet</p>
              <p className="text-sm text-gray-400">
                AI analysis will generate personalized actions
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Activity Stats */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Summary</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Visits</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {analytics?.totalVisits || 0}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">Last Visit</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {analytics?.lastVisitAt ? formatDate(analytics.lastVisitAt) : 'Never'}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">Feedback Given</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {analytics?.feedbackCount || 0}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">Avg Rating</p>
            <div className="flex items-center gap-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analytics?.averageRating?.toFixed(1) || '-'}
              </p>
              {analytics?.averageRating && (
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trigger History */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Send className="h-5 w-5 text-green-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Trigger History</h2>
          </div>
          <Link
            href="/ai/triggers"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Manage Triggers
          </Link>
        </div>

        {triggerHistory && triggerHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="pb-3 text-left text-xs font-medium uppercase text-gray-500">
                    Date
                  </th>
                  <th className="pb-3 text-left text-xs font-medium uppercase text-gray-500">
                    Trigger
                  </th>
                  <th className="pb-3 text-left text-xs font-medium uppercase text-gray-500">
                    Type
                  </th>
                  <th className="pb-3 text-left text-xs font-medium uppercase text-gray-500">
                    Status
                  </th>
                  <th className="pb-3 text-right text-xs font-medium uppercase text-gray-500">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {triggerHistory.map((trigger) => (
                  <tr key={trigger.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {formatDateTime(trigger.triggeredAt)}
                    </td>
                    <td className="py-3">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {trigger.triggerName}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="text-sm capitalize text-gray-500">
                        {trigger.triggerType.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                          trigger.status === 'converted'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : trigger.status === 'sent'
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                              : trigger.status === 'failed'
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                        }`}
                      >
                        {trigger.status === 'converted' && <CheckCircle className="h-3 w-3" />}
                        {trigger.status === 'failed' && <XCircle className="h-3 w-3" />}
                        {trigger.status.charAt(0).toUpperCase() + trigger.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      {trigger.conversionValue ? (
                        <span className="font-medium text-green-600">
                          +{formatCurrency(trigger.conversionValue, currencyCode)}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Send className="h-12 w-12 text-gray-300 dark:text-gray-600" />
            <p className="mt-3 text-gray-500">No trigger history</p>
            <Link
              href="/ai/triggers"
              className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Set up automated triggers
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// Metric Card Component
function MetricCard({
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
  color: 'green' | 'blue' | 'purple' | 'yellow';
}) {
  const colorClasses = {
    green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
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
