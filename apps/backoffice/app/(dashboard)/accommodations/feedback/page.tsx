'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ChatDots,
  Wrench,
  Broom,
  Question,
  WarningCircle,
  Heart,
  DotsThree,
  Clock,
  CheckCircle,
  ArrowClockwise,
  XCircle,
  Eye,
  PaperPlaneTilt,
} from '@phosphor-icons/react';

export const dynamic = 'force-dynamic';

const PROPERTY_ID = process.env.NEXT_PUBLIC_ACCOM_PROPERTY_ID || '';

type FeedbackStatus = 'new' | 'acknowledged' | 'in_progress' | 'resolved' | 'dismissed';

interface FeedbackItem {
  id: string;
  category: string;
  message: string;
  photoUrl: string | null;
  status: FeedbackStatus;
  ownerResponse: string | null;
  respondedAt: string | null;
  guestName: string | null;
  guestRoomNumber: string | null;
  feedbackType: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-amber-100 text-amber-800',
  acknowledged: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-indigo-100 text-indigo-800',
  resolved: 'bg-green-100 text-green-800',
  dismissed: 'bg-gray-100 text-gray-600',
};

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  acknowledged: 'Acknowledged',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  dismissed: 'Dismissed',
};

const CATEGORY_ICONS: Record<string, typeof Wrench> = {
  maintenance: Wrench,
  housekeeping: Broom,
  question: Question,
  complaint: WarningCircle,
  compliment: Heart,
  other: DotsThree,
};

const CATEGORY_COLORS: Record<string, string> = {
  maintenance: 'text-orange-500',
  housekeeping: 'text-teal-500',
  question: 'text-indigo-500',
  complaint: 'text-red-500',
  compliment: 'text-pink-500',
  other: 'text-gray-500',
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function AccommodationFeedbackPage() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchFeedback = useCallback(async () => {
    if (!PROPERTY_ID) return;
    try {
      const apiKey = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';
      const res = await fetch(`/api/accommodations/feedback?propertyId=${PROPERTY_ID}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (res.ok) {
        const data = await res.json();
        setFeedback(data.feedback || []);
      }
    } catch (err) {
      console.error('[FeedbackPage] fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  const handleStatusUpdate = async (feedbackId: string, newStatus: string) => {
    setUpdatingId(feedbackId);
    try {
      const apiKey = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';
      const res = await fetch(`/api/accommodations/feedback/${feedbackId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          ownerResponse: responseText.trim() || undefined,
        }),
      });

      if (res.ok) {
        setResponseText('');
        await fetchFeedback();
      }
    } catch (err) {
      console.error('[FeedbackPage] update error:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'new', label: 'New' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'resolved', label: 'Resolved' },
  ];

  const filteredFeedback =
    activeFilter === 'all' ? feedback : feedback.filter((f) => f.status === activeFilter);

  const counts: Record<string, number> = {
    all: feedback.length,
    new: feedback.filter((f) => f.status === 'new').length,
    in_progress: feedback.filter((f) => f.status === 'in_progress').length,
    resolved: feedback.filter((f) => f.status === 'resolved').length,
  };

  if (!PROPERTY_ID) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <ChatDots size={48} className="mx-auto text-gray-400" weight="duotone" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No accommodation property configured
          </h3>
          <p className="mt-2 text-sm text-gray-500">Contact support to set up your property.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header />

      {/* Filter tabs */}
      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === f.key
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f.label}
            {counts[f.key] > 0 && (
              <span
                className={`rounded-full px-1.5 text-xs ${
                  activeFilter === f.key ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {counts[f.key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Feedback list */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
        </div>
      ) : filteredFeedback.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <ChatDots size={48} className="mx-auto text-gray-400" weight="duotone" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No feedback yet</h3>
          <p className="mt-2 text-sm text-gray-500">
            Guest feedback will appear here when submitted.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFeedback.map((item) => {
            const CatIcon = CATEGORY_ICONS[item.category] || DotsThree;
            const catColor = CATEGORY_COLORS[item.category] || 'text-gray-500';
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                {/* Row summary */}
                <button
                  onClick={() => {
                    setExpandedId(isExpanded ? null : item.id);
                    setResponseText(item.ownerResponse || '');
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                >
                  <CatIcon size={24} weight="duotone" className={catColor} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        {item.guestName || 'Guest'}
                      </span>
                      {item.guestRoomNumber && (
                        <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600">
                          Room {item.guestRoomNumber}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-sm text-gray-500">
                      {item.message.slice(0, 80)}
                      {item.message.length > 80 ? '...' : ''}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {item.photoUrl && (
                      <span className="text-xs text-gray-400">
                        <Eye size={14} />
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[item.status] || 'bg-gray-100 text-gray-600'}`}
                    >
                      {STATUS_LABELS[item.status] || item.status}
                    </span>
                    <span className="whitespace-nowrap text-xs text-gray-400">
                      {timeAgo(item.createdAt)}
                    </span>
                  </div>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-gray-100 px-4 py-4">
                    <div className="space-y-4">
                      {/* Full message */}
                      <div>
                        <h4 className="mb-1 text-xs font-medium uppercase text-gray-400">
                          Message
                        </h4>
                        <p className="whitespace-pre-wrap text-sm text-gray-700">{item.message}</p>
                      </div>

                      {/* Photo */}
                      {item.photoUrl && (
                        <div>
                          <h4 className="mb-1 text-xs font-medium uppercase text-gray-400">
                            Photo
                          </h4>
                          <div className="overflow-hidden rounded-lg border border-gray-200">
                            <img
                              src={item.photoUrl}
                              alt="Feedback photo"
                              className="max-h-64 w-full object-contain"
                            />
                          </div>
                        </div>
                      )}

                      {/* Status update */}
                      <div>
                        <h4 className="mb-2 text-xs font-medium uppercase text-gray-400">
                          Update Status
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {item.status === 'new' && (
                            <button
                              onClick={() => handleStatusUpdate(item.id, 'acknowledged')}
                              disabled={updatingId === item.id}
                              className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 disabled:opacity-50"
                            >
                              <CheckCircle size={16} />
                              Acknowledge
                            </button>
                          )}
                          {(item.status === 'new' || item.status === 'acknowledged') && (
                            <button
                              onClick={() => handleStatusUpdate(item.id, 'in_progress')}
                              disabled={updatingId === item.id}
                              className="flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100 disabled:opacity-50"
                            >
                              <ArrowClockwise size={16} />
                              In Progress
                            </button>
                          )}
                          {item.status !== 'resolved' && item.status !== 'dismissed' && (
                            <button
                              onClick={() => handleStatusUpdate(item.id, 'resolved')}
                              disabled={updatingId === item.id}
                              className="flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 transition-colors hover:bg-green-100 disabled:opacity-50"
                            >
                              <CheckCircle size={16} />
                              Resolve
                            </button>
                          )}
                          {item.status !== 'resolved' && item.status !== 'dismissed' && (
                            <button
                              onClick={() => handleStatusUpdate(item.id, 'dismissed')}
                              disabled={updatingId === item.id}
                              className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50"
                            >
                              <XCircle size={16} />
                              Dismiss
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Owner response */}
                      <div>
                        <h4 className="mb-2 text-xs font-medium uppercase text-gray-400">
                          Response to Guest
                        </h4>
                        <div className="flex gap-2">
                          <textarea
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                            placeholder="Write a response to the guest..."
                            rows={2}
                            className="flex-1 resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                          />
                          <button
                            onClick={() => handleStatusUpdate(item.id, item.status)}
                            disabled={!responseText.trim() || updatingId === item.id}
                            className="flex items-center gap-1 self-end rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
                          >
                            <PaperPlaneTilt size={14} />
                            Send
                          </button>
                        </div>
                        {item.ownerResponse && item.respondedAt && (
                          <div className="mt-2 rounded-lg bg-gray-50 p-2">
                            <p className="text-xs text-gray-400">
                              Previous response ({timeAgo(item.respondedAt)}):
                            </p>
                            <p className="mt-0.5 text-sm text-gray-600">{item.ownerResponse}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Header() {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/accommodations/bookings" className="hover:text-gray-700">
          Accommodations
        </Link>
        <span>/</span>
        <span>Feedback</span>
      </div>
      <h1 className="mt-1 text-2xl font-bold text-gray-900">Guest Feedback</h1>
      <p className="mt-1 text-gray-600">
        View and respond to guest feedback, issues, and complaints.
      </p>
    </div>
  );
}
