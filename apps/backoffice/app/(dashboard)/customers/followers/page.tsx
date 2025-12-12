'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';

interface FollowerWithAnalytics {
  user_id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  followed_at: string;
  source: string;
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

export default function FollowersPage() {
  const [followers, setFollowers] = useState<FollowerWithAnalytics[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'followed_at' | 'total_spent' | 'total_orders' | 'last_visit_at'>('followed_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Fetch followers with analytics
  useEffect(() => {
    const fetchFollowers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // Get the current merchant ID from context (simplified for demo)
        // In production, this would come from the auth context
        const merchantId = process.env.NEXT_PUBLIC_MERCHANT_ID;

        if (!merchantId) {
          // Demo mode - show empty state
          setFollowers([]);
          setIsLoading(false);
          return;
        }

        // Fetch followers with their analytics
        const { data, error: fetchError } = await supabase
          .from('merchant_followers')
          .select(`
            user_id,
            followed_at,
            source,
            gudbro_user_profiles!inner (
              email,
              name,
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
          `)
          .eq('merchant_id', merchantId)
          .eq('is_active', true)
          .order(sortBy === 'followed_at' ? 'followed_at' : 'followed_at', { ascending: sortOrder === 'asc' });

        if (fetchError) {
          throw fetchError;
        }

        // Transform the data - use 'any' for Supabase response flexibility
        const transformedData: FollowerWithAnalytics[] = (data || []).map((row: any) => {
          const analytics = row.follower_analytics?.[0] || {};
          const profile = Array.isArray(row.gudbro_user_profiles)
            ? row.gudbro_user_profiles[0]
            : row.gudbro_user_profiles;

          return {
            user_id: row.user_id,
            email: profile?.email || '',
            name: profile?.name || null,
            avatar_url: profile?.avatar_url || null,
            followed_at: row.followed_at,
            source: row.source,
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
  }, [sortBy, sortOrder]);

  // Filter followers by search query
  const filteredFollowers = followers.filter(f =>
    f.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (f.name && f.name.toLowerCase().includes(searchQuery.toLowerCase()))
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Followers</h1>
          <p className="text-gray-600 mt-1">
            {followers.length} customers following your locale
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="followed_at">Sort by: Follow Date</option>
            <option value="total_spent">Sort by: Total Spent</option>
            <option value="total_orders">Sort by: Orders</option>
            <option value="last_visit_at">Sort by: Last Visit</option>
          </select>

          {/* Sort Order */}
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          >
            {sortOrder === 'asc' ? (
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Followers Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading followers...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center">
            <svg className="w-12 h-12 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-red-600 mt-4">{error}</p>
          </div>
        ) : sortedFollowers.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mt-4">No followers yet</h3>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
              When customers scan your QR code and follow your locale, they&apos;ll appear here with their analytics.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Followed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tier</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedFollowers.map((follower) => (
                  <tr key={follower.user_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {follower.avatar_url ? (
                          <img
                            src={follower.avatar_url}
                            alt=""
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                            {(follower.name || follower.email).charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{follower.name || 'Anonymous'}</p>
                          <p className="text-sm text-gray-500">{follower.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {SOURCE_LABELS[follower.source] || follower.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(follower.followed_at)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatTimeAgo(follower.last_visit_at)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">
                      {follower.total_orders}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">
                      {formatCurrency(follower.total_spent)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${LOYALTY_TIER_COLORS[follower.loyalty_tier]?.bg || 'bg-gray-100'} ${LOYALTY_TIER_COLORS[follower.loyalty_tier]?.text || 'text-gray-800'}`}>
                        {follower.loyalty_tier}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {follower.average_rating ? (
                        <div className="flex items-center justify-center gap-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-900">{follower.average_rating.toFixed(1)}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
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
