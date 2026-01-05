'use client';

import { useState, useEffect, useCallback } from 'react';
import { createBrowserClient } from '@supabase/ssr';

type VisitorType = 'resident' | 'tourist' | 'unknown' | 'all';
type NotificationStatus = 'active' | 'paused' | 'stopped' | 'archived' | 'all';

interface FollowerWithAnalytics {
  account_id: string;
  email: string;
  display_name: string | null;
  first_name: string | null;
  avatar_url: string | null;
  followed_at: string;
  source: string;
  // Tourist lifecycle
  visitor_type: 'resident' | 'tourist' | 'unknown';
  trip_end_date: string | null;
  notification_status: 'active' | 'paused' | 'stopped' | 'archived';
  visit_count: number;
  home_country: string | null;
  // Analytics
  first_visit_at: string | null;
  last_visit_at: string | null;
  total_visits: number;
  total_orders: number;
  total_spent: number;
  average_order_value: number;
  loyalty_points: number;
  loyalty_tier: string;
  total_feedback_given: number;
  average_rating: number | null;
}

interface FollowerStats {
  total: number;
  active: number;
  residents: number;
  activeTourists: number;
  pausedTourists: number;
  archivedTourists: number;
  returning: number;
}

const LOYALTY_TIER_COLORS: Record<string, { bg: string; text: string }> = {
  bronze: { bg: 'bg-orange-100', text: 'text-orange-800' },
  silver: { bg: 'bg-gray-100', text: 'text-gray-800' },
  gold: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  platinum: { bg: 'bg-purple-100', text: 'text-purple-800' },
};

const SOURCE_LABELS: Record<string, string> = {
  qr_scan: 'QR Scan',
  search: 'Search',
  referral: 'Referral',
  promo: 'Promo',
};

const VISITOR_TYPE_CONFIG: Record<string, { label: string; icon: string; color: string }> = {
  resident: { label: 'Resident', icon: '🏠', color: 'bg-green-100 text-green-800' },
  tourist: { label: 'Tourist', icon: '✈️', color: 'bg-blue-100 text-blue-800' },
  unknown: { label: 'Unknown', icon: '❓', color: 'bg-gray-100 text-gray-600' },
};

const NOTIFICATION_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  active: { label: 'Active', color: 'bg-green-100 text-green-800' },
  paused: { label: 'Paused', color: 'bg-yellow-100 text-yellow-800' },
  stopped: { label: 'Stopped', color: 'bg-red-100 text-red-800' },
  archived: { label: 'Archived', color: 'bg-gray-100 text-gray-500' },
};

const COUNTRY_FLAGS: Record<string, string> = {
  IT: '🇮🇹',
  US: '🇺🇸',
  UK: '🇬🇧',
  DE: '🇩🇪',
  FR: '🇫🇷',
  ES: '🇪🇸',
  AU: '🇦🇺',
  JP: '🇯🇵',
  KR: '🇰🇷',
  CN: '🇨🇳',
  CA: '🇨🇦',
  BR: '🇧🇷',
  NL: '🇳🇱',
  SE: '🇸🇪',
  CH: '🇨🇭',
};

export default function FollowersPage() {
  const [followers, setFollowers] = useState<FollowerWithAnalytics[]>([]);
  const [stats, setStats] = useState<FollowerStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [visitorTypeFilter, setVisitorTypeFilter] = useState<VisitorType>('all');
  const [statusFilter, setStatusFilter] = useState<NotificationStatus>('all');
  const [sortBy, setSortBy] = useState<
    'followed_at' | 'total_spent' | 'total_orders' | 'last_visit_at' | 'visit_count'
  >('followed_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch stats
  const fetchStats = useCallback(
    async (merchantId: string) => {
      const { data } = await supabase.rpc('get_follower_stats', {
        p_merchant_id: merchantId,
      });

      if (data && data[0]) {
        setStats({
          total: Number(data[0].total_followers) || 0,
          active: Number(data[0].active_followers) || 0,
          residents: Number(data[0].residents) || 0,
          activeTourists: Number(data[0].active_tourists) || 0,
          pausedTourists: Number(data[0].paused_tourists) || 0,
          archivedTourists: Number(data[0].archived_tourists) || 0,
          returning: Number(data[0].returning_tourists) || 0,
        });
      }
    },
    [supabase]
  );

  // Fetch followers with analytics
  useEffect(() => {
    const fetchFollowers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Get the current merchant ID from context (simplified for demo)
        const merchantId = process.env.NEXT_PUBLIC_MERCHANT_ID;

        if (!merchantId) {
          setFollowers([]);
          setIsLoading(false);
          return;
        }

        // Fetch stats
        await fetchStats(merchantId);

        // Build query - using P5 accounts instead of gudbro_user_profiles
        let query = supabase
          .from('merchant_followers')
          .select(
            `
            account_id,
            followed_at,
            source,
            visitor_type,
            trip_end_date,
            notification_status,
            visit_count,
            home_country,
            accounts!inner (
              email,
              display_name,
              first_name,
              avatar_url
            ),
            follower_analytics (
              first_visit_at,
              last_visit_at,
              total_visits,
              total_orders,
              total_spent,
              average_order_value,
              loyalty_points,
              loyalty_tier,
              total_feedback_given,
              average_rating
            )
          `
          )
          .eq('merchant_id', merchantId)
          .eq('is_active', true);

        // Apply visitor type filter
        if (visitorTypeFilter !== 'all') {
          query = query.eq('visitor_type', visitorTypeFilter);
        }

        // Apply notification status filter
        if (statusFilter !== 'all') {
          query = query.eq('notification_status', statusFilter);
        }

        const { data, error: fetchError } = await query.order('followed_at', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        // Transform the data
        const transformedData: FollowerWithAnalytics[] = (data || []).map((row: any) => {
          const analytics = row.follower_analytics?.[0] || {};
          const account = Array.isArray(row.accounts) ? row.accounts[0] : row.accounts;

          return {
            account_id: row.account_id,
            email: account?.email || '',
            display_name: account?.display_name || null,
            first_name: account?.first_name || null,
            avatar_url: account?.avatar_url || null,
            followed_at: row.followed_at,
            source: row.source,
            visitor_type: row.visitor_type || 'unknown',
            trip_end_date: row.trip_end_date,
            notification_status: row.notification_status || 'active',
            visit_count: row.visit_count || 1,
            home_country: row.home_country,
            first_visit_at: analytics.first_visit_at || null,
            last_visit_at: analytics.last_visit_at || null,
            total_visits: analytics.total_visits || 0,
            total_orders: analytics.total_orders || 0,
            total_spent: analytics.total_spent || 0,
            average_order_value: analytics.average_order_value || 0,
            loyalty_points: analytics.loyalty_points || 0,
            loyalty_tier: analytics.loyalty_tier || 'bronze',
            total_feedback_given: analytics.total_feedback_given || 0,
            average_rating: analytics.average_rating || null,
          };
        });

        setFollowers(transformedData);
      } catch (err) {
        console.error('Error fetching followers:', err);
        setError('Failed to load followers. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFollowers();
  }, [supabase, visitorTypeFilter, statusFilter, fetchStats]);

  // Filter followers by search query
  const filteredFollowers = followers.filter(
    (f) =>
      f.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.display_name && f.display_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (f.first_name && f.first_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sort followers
  const sortedFollowers = [...filteredFollowers].sort((a, b) => {
    let aVal: number | string = 0;
    let bVal: number | string = 0;

    switch (sortBy) {
      case 'total_spent':
        aVal = a.total_spent;
        bVal = b.total_spent;
        break;
      case 'total_orders':
        aVal = a.total_orders;
        bVal = b.total_orders;
        break;
      case 'last_visit_at':
        aVal = a.last_visit_at || '';
        bVal = b.last_visit_at || '';
        break;
      case 'visit_count':
        aVal = a.visit_count;
        bVal = b.visit_count;
        break;
      default:
        aVal = a.followed_at;
        bVal = b.followed_at;
    }

    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });

  // Format helpers
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatTimeAgo = (dateStr: string | null) => {
    if (!dateStr) return 'Never';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const getName = (f: FollowerWithAnalytics) => {
    return f.display_name || f.first_name || 'Anonymous';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Followers</h1>
          <p className="mt-1 text-gray-600">{followers.length} customers following your locale</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="text-sm text-green-600">Active</p>
            <p className="text-2xl font-bold text-green-700">{stats.active}</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm text-emerald-600">Residents</p>
            <p className="text-2xl font-bold text-emerald-700">{stats.residents}</p>
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm text-blue-600">Active Tourists</p>
            <p className="text-2xl font-bold text-blue-700">{stats.activeTourists}</p>
          </div>
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
            <p className="text-sm text-yellow-600">Paused</p>
            <p className="text-2xl font-bold text-yellow-700">{stats.pausedTourists}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Archived</p>
            <p className="text-2xl font-bold text-gray-600">{stats.archivedTourists}</p>
          </div>
          <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
            <p className="text-sm text-purple-600">Returning</p>
            <p className="text-2xl font-bold text-purple-700">{stats.returning}</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="min-w-[200px] flex-1">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Visitor Type Filter */}
          <select
            value={visitorTypeFilter}
            onChange={(e) => setVisitorTypeFilter(e.target.value as VisitorType)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="resident">🏠 Residents</option>
            <option value="tourist">✈️ Tourists</option>
            <option value="unknown">❓ Unknown</option>
          </select>

          {/* Notification Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as NotificationStatus)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="stopped">Stopped</option>
            <option value="archived">Archived</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="followed_at">Sort by: Follow Date</option>
            <option value="total_spent">Sort by: Total Spent</option>
            <option value="total_orders">Sort by: Orders</option>
            <option value="last_visit_at">Sort by: Last Visit</option>
            <option value="visit_count">Sort by: Visit Count</option>
          </select>

          {/* Sort Order */}
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50"
            title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          >
            {sortOrder === 'asc' ? (
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Followers Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-500">Loading followers...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="mt-4 text-red-600">{error}</p>
          </div>
        ) : sortedFollowers.length === 0 ? (
          <div className="p-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No followers found</h3>
            <p className="mx-auto mt-2 max-w-sm text-gray-500">
              {visitorTypeFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your filters to see more results.'
                : "When customers scan your QR code and follow your locale, they'll appear here."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Visits
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Last Visit
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Total Spent
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    Tier
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedFollowers.map((follower) => (
                  <tr key={follower.account_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {follower.avatar_url ? (
                          <img
                            src={follower.avatar_url}
                            alt=""
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-medium text-gray-500">
                            {getName(follower).charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{getName(follower)}</p>
                          <p className="text-sm text-gray-500">{follower.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${VISITOR_TYPE_CONFIG[follower.visitor_type]?.color || 'bg-gray-100 text-gray-600'}`}
                        >
                          <span>{VISITOR_TYPE_CONFIG[follower.visitor_type]?.icon}</span>
                          <span>{VISITOR_TYPE_CONFIG[follower.visitor_type]?.label}</span>
                        </span>
                        {follower.home_country && (
                          <span title={follower.home_country}>
                            {COUNTRY_FLAGS[follower.home_country] || '🌍'}
                          </span>
                        )}
                      </div>
                      {follower.trip_end_date && (
                        <p className="mt-1 text-xs text-gray-400">
                          Trip ends: {formatDate(follower.trip_end_date)}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${NOTIFICATION_STATUS_CONFIG[follower.notification_status]?.color || 'bg-gray-100'}`}
                      >
                        {NOTIFICATION_STATUS_CONFIG[follower.notification_status]?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {follower.visit_count}
                        </span>
                        {follower.visit_count > 1 && (
                          <span className="text-xs font-medium text-purple-600">returning</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatTimeAgo(follower.last_visit_at)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                      {follower.total_orders}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                      {formatCurrency(follower.total_spent)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${LOYALTY_TIER_COLORS[follower.loyalty_tier]?.bg || 'bg-gray-100'} ${LOYALTY_TIER_COLORS[follower.loyalty_tier]?.text || 'text-gray-800'}`}
                      >
                        {follower.loyalty_tier}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
