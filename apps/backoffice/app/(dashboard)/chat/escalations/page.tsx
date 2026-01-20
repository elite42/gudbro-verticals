'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  AlertTriangle,
  Clock,
  User,
  Phone,
  Mail,
  Check,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { InfoTooltip } from '@/components/ui/info-tooltip';

interface Escalation {
  id: string;
  conversation_id: string;
  reason: string;
  reason_details: string | null;
  ai_summary: string | null;
  status: 'pending' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  created_at: string;
  resolved_at: string | null;
  conversation: {
    id: string;
    customer_name: string | null;
    customer_phone: string | null;
    customer_email: string | null;
    channel: string;
    topic: string | null;
    total_messages: number;
    last_message_at: string;
  };
  assigned_user: {
    id: string;
    full_name: string | null;
    email: string;
  } | null;
}

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-800',
  assigned: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-purple-100 text-purple-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800',
};

const PRIORITY_STYLES = {
  low: 'bg-gray-100 text-gray-600',
  normal: 'bg-blue-100 text-blue-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700',
};

const REASON_LABELS: Record<string, string> = {
  customer_request: 'Customer requested human',
  ai_uncertainty: 'AI uncertain',
  negative_sentiment: 'Negative sentiment',
  complex_issue: 'Complex issue',
  complaint: 'Complaint',
  urgent: 'Urgent matter',
  payment_issue: 'Payment issue',
  other: 'Other',
};

const CHANNEL_ICONS: Record<string, string> = {
  widget: '💬',
  whatsapp: '📱',
  telegram: '✈️',
  line: '🟢',
  zalo: '🔵',
  web: '🌐',
};

export default function EscalationsPage() {
  const [escalations, setEscalations] = useState<Escalation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('pending');

  const fetchEscalations = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (statusFilter && statusFilter !== 'all') {
        params.set('status', statusFilter);
      }

      const res = await fetch(`/api/chat/escalations?${params}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch escalations');
      }

      setEscalations(data.escalations || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchEscalations();
  }, [fetchEscalations]);

  const handleResolve = async (escalationId: string) => {
    try {
      const res = await fetch('/api/chat/escalations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          escalationId,
          status: 'resolved',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to resolve escalation');
      }

      fetchEscalations();
    } catch (err) {
      console.error('Failed to resolve:', err);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    }
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) {
      return `${diffHours}h ago`;
    }
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">Chat Escalations</h1>
            <InfoTooltip contentKey="pages.chatEscalations" kbPageId="chat-escalations" />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Customer conversations requiring human attention
          </p>
        </div>
        <button
          onClick={fetchEscalations}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2">
        {['all', 'pending', 'assigned', 'in_progress', 'resolved'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              statusFilter === status
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status === 'all'
              ? 'All'
              : status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
        </div>
      )}

      {/* Empty state */}
      {!isLoading && escalations.length === 0 && (
        <div className="rounded-lg border border-gray-200 bg-white py-12 text-center">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No escalations</h3>
          <p className="mt-1 text-sm text-gray-500">
            {statusFilter === 'pending'
              ? 'No pending escalations. Great job!'
              : 'No escalations match your filter.'}
          </p>
        </div>
      )}

      {/* Escalations list */}
      {!isLoading && escalations.length > 0 && (
        <div className="space-y-4">
          {escalations.map((escalation) => (
            <div
              key={escalation.id}
              className="rounded-lg border border-gray-200 bg-white p-4 hover:border-gray-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {CHANNEL_ICONS[escalation.conversation.channel] || '💬'}
                    </span>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {escalation.conversation.customer_name || 'Anonymous Customer'}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {escalation.conversation.customer_phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {escalation.conversation.customer_phone}
                          </span>
                        )}
                        {escalation.conversation.customer_email && (
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {escalation.conversation.customer_email}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${PRIORITY_STYLES[escalation.priority]}`}
                    >
                      {escalation.priority === 'urgent' && <AlertTriangle className="h-3 w-3" />}
                      {escalation.priority.toUpperCase()}
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${STATUS_STYLES[escalation.status]}`}
                    >
                      {escalation.status.replace('_', ' ')}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                      {REASON_LABELS[escalation.reason] || escalation.reason}
                    </span>
                    {escalation.conversation.topic && (
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                        {escalation.conversation.topic}
                      </span>
                    )}
                  </div>

                  {/* AI Summary */}
                  {escalation.ai_summary && (
                    <p className="mt-3 line-clamp-2 text-sm text-gray-600">
                      {escalation.ai_summary}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTime(escalation.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {escalation.conversation.total_messages} messages
                    </span>
                    {escalation.assigned_user && (
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {escalation.assigned_user.full_name || escalation.assigned_user.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="ml-4 flex flex-col gap-2">
                  <Link
                    href={`/chat/conversations/${escalation.conversation_id}`}
                    className="flex items-center gap-1 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
                  >
                    View <ArrowRight className="h-4 w-4" />
                  </Link>
                  {escalation.status !== 'resolved' && (
                    <button
                      onClick={() => handleResolve(escalation.id)}
                      className="flex items-center gap-1 rounded-lg border border-green-500 px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-50"
                    >
                      <Check className="h-4 w-4" /> Resolve
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
