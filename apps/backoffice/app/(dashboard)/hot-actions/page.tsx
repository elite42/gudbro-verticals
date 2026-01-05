'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type RequestStatus = 'pending' | 'acknowledged' | 'in_progress' | 'completed' | 'cancelled';
type Priority = 'low' | 'normal' | 'high' | 'urgent';

interface HotActionRequest {
  request_id: string;
  action_code: string;
  action_name: string;
  action_icon: string;
  action_color: string;
  table_number: string | null;
  customer_note: string | null;
  status: RequestStatus;
  priority: Priority;
  created_at: string;
  acknowledged_at: string | null;
  acknowledged_by_name: string | null;
  seconds_waiting: number;
}

const statusConfig: Record<RequestStatus, { label: string; color: string; bgColor: string }> = {
  pending: { label: 'Pending', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  acknowledged: { label: 'Acknowledged', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  in_progress: { label: 'In Progress', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  completed: { label: 'Completed', color: 'text-green-700', bgColor: 'bg-green-100' },
  cancelled: { label: 'Cancelled', color: 'text-gray-700', bgColor: 'bg-gray-100' },
};

const priorityConfig: Record<
  Priority,
  { label: string; color: string; bgColor: string; order: number }
> = {
  urgent: { label: 'Urgent', color: 'text-red-700', bgColor: 'bg-red-100', order: 1 },
  high: { label: 'High', color: 'text-orange-700', bgColor: 'bg-orange-100', order: 2 },
  normal: { label: 'Normal', color: 'text-blue-700', bgColor: 'bg-blue-100', order: 3 },
  low: { label: 'Low', color: 'text-gray-700', bgColor: 'bg-gray-100', order: 4 },
};

const actionIcons: Record<string, string> = {
  call_waiter: '🙋',
  request_bill: '💳',
  clean_table: '✨',
  need_assistance: '❓',
  water_refill: '💧',
};

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function formatWaitTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}

function getWaitTimeColor(seconds: number): string {
  if (seconds < 60) return 'text-green-600';
  if (seconds < 180) return 'text-yellow-600';
  if (seconds < 300) return 'text-orange-600';
  return 'text-red-600';
}

export default function HotActionsPage() {
  const [requests, setRequests] = useState<HotActionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'active' | 'all'>('active');
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<string | null>(null);

  // Fetch default location
  useEffect(() => {
    const fetchLocation = async () => {
      const { data, error } = await supabase.from('locations').select('id').limit(1).single();

      if (!error && data) {
        setLocationId(data.id);
      }
    };
    fetchLocation();
  }, []);

  const fetchRequests = useCallback(async () => {
    if (!locationId) return;

    try {
      const { data, error } = await supabase.rpc('get_pending_hot_actions', {
        p_location_id: locationId,
        p_limit: 100,
      });

      if (error) throw error;

      let filtered = data || [];

      // Apply filter
      if (statusFilter === 'active') {
        filtered = filtered.filter((r: HotActionRequest) =>
          ['pending', 'acknowledged', 'in_progress'].includes(r.status)
        );
      } else if (statusFilter !== 'all') {
        filtered = filtered.filter((r: HotActionRequest) => r.status === statusFilter);
      }

      setRequests(filtered);
    } catch (err) {
      console.error('Error fetching hot actions:', err);
    } finally {
      setLoading(false);
    }
  }, [locationId, statusFilter]);

  const acknowledgeRequest = async (requestId: string) => {
    setIsUpdating(requestId);
    try {
      const { error } = await supabase.rpc('acknowledge_hot_action', {
        p_request_id: requestId,
        p_staff_id: null, // TODO: Get current user ID
      });

      if (error) throw error;
      await fetchRequests();
    } catch (err) {
      console.error('Error acknowledging request:', err);
    } finally {
      setIsUpdating(null);
    }
  };

  const completeRequest = async (requestId: string) => {
    setIsUpdating(requestId);
    try {
      const { error } = await supabase.rpc('complete_hot_action', {
        p_request_id: requestId,
        p_staff_id: null, // TODO: Get current user ID
      });

      if (error) throw error;
      await fetchRequests();
    } catch (err) {
      console.error('Error completing request:', err);
    } finally {
      setIsUpdating(null);
    }
  };

  useEffect(() => {
    if (locationId) {
      fetchRequests();
    }
  }, [locationId, fetchRequests]);

  // Set up realtime subscription
  useEffect(() => {
    if (!locationId) return;

    const channel = supabase
      .channel('hot-actions-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'hot_action_requests',
          filter: `location_id=eq.${locationId}`,
        },
        () => {
          // Refetch on any change
          fetchRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [locationId, fetchRequests]);

  // Auto-refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (locationId) fetchRequests();
    }, 10000);
    return () => clearInterval(interval);
  }, [locationId, fetchRequests]);

  // Stats
  const stats = {
    pending: requests.filter((r) => r.status === 'pending').length,
    acknowledged: requests.filter((r) => r.status === 'acknowledged').length,
    avgWaitTime:
      requests.length > 0
        ? Math.round(requests.reduce((sum, r) => sum + r.seconds_waiting, 0) / requests.length)
        : 0,
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hot Actions</h1>
          <p className="mt-1 text-sm text-gray-500">
            Real-time customer requests from the digital menu
          </p>
        </div>
        <button
          onClick={fetchRequests}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
            </div>
            {stats.pending > 0 && (
              <span className="flex h-3 w-3">
                <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-yellow-500"></span>
              </span>
            )}
          </div>
        </div>
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-600">Acknowledged</p>
          <p className="text-3xl font-bold text-blue-700">{stats.acknowledged}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-600">Avg Wait Time</p>
          <p className={`text-3xl font-bold ${getWaitTimeColor(stats.avgWaitTime)}`}>
            {formatWaitTime(stats.avgWaitTime)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {(['active', 'pending', 'acknowledged', 'in_progress', 'completed', 'all'] as const).map(
          (filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                statusFilter === filter
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter === 'active'
                ? 'Active'
                : filter.charAt(0).toUpperCase() + filter.slice(1).replace('_', ' ')}
              {filter === 'pending' && stats.pending > 0 && (
                <span className="ml-2 rounded-full bg-yellow-500 px-1.5 py-0.5 text-xs text-white">
                  {stats.pending}
                </span>
              )}
            </button>
          )
        )}
      </div>

      {/* Requests Grid */}
      {requests.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white py-12 text-center">
          <span className="text-4xl">🔔</span>
          <p className="mt-2 text-gray-500">No requests found</p>
          <p className="text-sm text-gray-400">Customer requests will appear here in real-time</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((request) => {
            const status = statusConfig[request.status];
            const priority = priorityConfig[request.priority];
            const icon = actionIcons[request.action_code] || '🔔';

            return (
              <div
                key={request.request_id}
                className={`rounded-xl border-2 bg-white p-4 transition-all ${
                  request.status === 'pending'
                    ? request.priority === 'urgent'
                      ? 'animate-pulse border-red-400'
                      : request.priority === 'high'
                        ? 'border-orange-400'
                        : 'border-yellow-400'
                    : 'border-gray-200'
                }`}
              >
                {/* Header */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{icon}</span>
                    <span className="text-lg font-bold text-gray-900">{request.action_name}</span>
                  </div>
                  <span
                    className={`rounded-lg px-2 py-1 text-xs font-medium ${priority.bgColor} ${priority.color}`}
                  >
                    {priority.label}
                  </span>
                </div>

                {/* Table & Status */}
                <div className="mb-3">
                  {request.table_number && (
                    <p className="font-medium text-gray-900">Table {request.table_number}</p>
                  )}
                  <span
                    className={`mt-1 inline-block rounded px-2 py-0.5 text-xs font-medium ${status.bgColor} ${status.color}`}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Customer Note */}
                {request.customer_note && (
                  <div className="mb-3 rounded-lg bg-gray-50 p-2 text-sm text-gray-600">
                    "{request.customer_note}"
                  </div>
                )}

                {/* Time Info */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-sm">
                  <span className="text-gray-500">{formatTime(request.created_at)}</span>
                  <span className={`font-medium ${getWaitTimeColor(request.seconds_waiting)}`}>
                    {formatWaitTime(request.seconds_waiting)} waiting
                  </span>
                </div>

                {/* Acknowledged By */}
                {request.acknowledged_by_name && (
                  <div className="mt-2 text-xs text-gray-500">
                    Acknowledged by {request.acknowledged_by_name}
                  </div>
                )}

                {/* Actions */}
                <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
                  {request.status === 'pending' && (
                    <button
                      onClick={() => acknowledgeRequest(request.request_id)}
                      disabled={isUpdating === request.request_id}
                      className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                      {isUpdating === request.request_id ? 'Updating...' : 'Acknowledge'}
                    </button>
                  )}
                  {(request.status === 'pending' ||
                    request.status === 'acknowledged' ||
                    request.status === 'in_progress') && (
                    <button
                      onClick={() => completeRequest(request.request_id)}
                      disabled={isUpdating === request.request_id}
                      className={`flex-1 rounded-lg py-2 text-sm font-medium disabled:opacity-50 ${
                        request.status === 'pending'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {isUpdating === request.request_id ? 'Updating...' : 'Complete'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Sound notification for new pending requests */}
      {stats.pending > 0 && (
        <audio autoPlay loop className="hidden">
          <source src="/sounds/notification.mp3" type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
}
