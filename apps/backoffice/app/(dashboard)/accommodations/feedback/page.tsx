'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  ChatDots,
  Wrench,
  Broom,
  Question,
  WarningCircle,
  Heart,
  DotsThree,
  CheckCircle,
  ArrowClockwise,
  XCircle,
  Eye,
  PaperPlaneTilt,
  Star,
  Lightning,
  Tag,
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
  // Post-stay ratings
  ratingCleanliness: number | null;
  ratingLocation: number | null;
  ratingValue: number | null;
  ratingCommunication: number | null;
  ratingWifi: number | null;
  ratingOverall: number | null;
  // AI fields
  aiTags: string[] | null;
  aiSentiment: string | null;
  aiPriority: number | null;
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

const SENTIMENT_COLORS: Record<string, string> = {
  positive: 'bg-emerald-500',
  neutral: 'bg-amber-400',
  negative: 'bg-red-500',
};

const SENTIMENT_TAG_COLORS: Record<string, string> = {
  positive: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  neutral: 'bg-amber-50 text-amber-700 border-amber-200',
  negative: 'bg-red-50 text-red-700 border-red-200',
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

function MiniStars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          weight={s <= Math.round(rating) ? 'fill' : 'regular'}
          className={s <= Math.round(rating) ? 'text-amber-400' : 'text-gray-300'}
        />
      ))}
    </span>
  );
}

export default function AccommodationFeedbackPage() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [processingAI, setProcessingAI] = useState(false);
  const [aiResult, setAiResult] = useState<{ processed: number; failed: number } | null>(null);

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

  // Aggregate scores (post_stay only)
  const aggregates = useMemo(() => {
    const postStay = feedback.filter(
      (f) => f.feedbackType === 'post_stay' && f.ratingOverall != null
    );
    if (postStay.length === 0) return null;

    const avg = (key: keyof FeedbackItem) => {
      const vals = postStay.filter((f) => f[key] != null).map((f) => f[key] as number);
      return vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    };

    const withResponse = feedback.filter((f) => f.ownerResponse).length;

    return {
      count: postStay.length,
      overall: avg('ratingOverall'),
      cleanliness: avg('ratingCleanliness'),
      location: avg('ratingLocation'),
      value: avg('ratingValue'),
      communication: avg('ratingCommunication'),
      wifi: avg('ratingWifi'),
      responseRate: feedback.length > 0 ? withResponse / feedback.length : 0,
    };
  }, [feedback]);

  // AI tag frequency
  const tagCloud = useMemo(() => {
    const tagMap: Record<string, { count: number; sentiments: Record<string, number> }> = {};
    for (const f of feedback) {
      if (!f.aiTags || f.aiTags.length === 0) continue;
      for (const tag of f.aiTags) {
        if (!tagMap[tag]) tagMap[tag] = { count: 0, sentiments: {} };
        tagMap[tag].count++;
        const s = f.aiSentiment || 'neutral';
        tagMap[tag].sentiments[s] = (tagMap[tag].sentiments[s] || 0) + 1;
      }
    }
    return Object.entries(tagMap)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 15)
      .map(([tag, data]) => {
        // Dominant sentiment
        const dominant =
          Object.entries(data.sentiments).sort((a, b) => b[1] - a[1])[0]?.[0] || 'neutral';
        return { tag, count: data.count, sentiment: dominant };
      });
  }, [feedback]);

  const unprocessedCount = feedback.filter((f) => !f.aiTags || f.aiTags.length === 0).length;

  const handleProcessAI = async () => {
    setProcessingAI(true);
    setAiResult(null);
    try {
      const apiKey = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';
      const res = await fetch('/api/accommodations/feedback/process-ai', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAiResult({ processed: data.processed, failed: data.failed });
        // Refresh feedback list to show updated AI data
        await fetchFeedback();
      }
    } catch (err) {
      console.error('[FeedbackPage] AI process error:', err);
    } finally {
      setProcessingAI(false);
    }
  };

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

      {/* Aggregate Scores Section */}
      {aggregates && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Guest Ratings Overview
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {/* Overall - prominent */}
            <div className="col-span-2 flex items-center gap-3 rounded-lg bg-gray-50 p-4 sm:col-span-1">
              <div>
                <p className="text-3xl font-bold text-gray-900">{aggregates.overall.toFixed(1)}</p>
                <MiniStars rating={aggregates.overall} size={16} />
                <p className="mt-1 text-xs text-gray-500">
                  {aggregates.count} review{aggregates.count !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            {/* Category averages */}
            {[
              { label: 'Cleanliness', value: aggregates.cleanliness },
              { label: 'Location', value: aggregates.location },
              { label: 'Value', value: aggregates.value },
              { label: 'Communication', value: aggregates.communication },
              { label: 'WiFi', value: aggregates.wifi },
              { label: 'Response Rate', value: aggregates.responseRate, isPercent: true },
            ].map(({ label, value, isPercent }) => (
              <div key={label} className="flex flex-col">
                <p className="text-xs text-gray-500">{label}</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="text-lg font-semibold text-gray-900">
                    {isPercent ? `${Math.round(value * 100)}%` : value.toFixed(1)}
                  </span>
                  {!isPercent && <MiniStars rating={value} size={12} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Tags & Processing Section */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            AI Insights
          </h2>
          <button
            onClick={handleProcessAI}
            disabled={processingAI || unprocessedCount === 0}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100 disabled:opacity-50"
          >
            {processingAI ? (
              <>
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-indigo-300 border-t-indigo-700" />
                Processing...
              </>
            ) : (
              <>
                <Lightning size={16} weight="fill" />
                Process AI ({unprocessedCount})
              </>
            )}
          </button>
        </div>

        {aiResult && (
          <p className="mt-2 text-xs text-gray-500">
            Processed {aiResult.processed} feedback item{aiResult.processed !== 1 ? 's' : ''}
            {aiResult.failed > 0 && `, ${aiResult.failed} failed`}
          </p>
        )}

        {/* Tag cloud */}
        {tagCloud.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {tagCloud.map(({ tag, count, sentiment }) => (
              <span
                key={tag}
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${SENTIMENT_TAG_COLORS[sentiment] || SENTIMENT_TAG_COLORS.neutral}`}
              >
                <Tag size={12} />
                {tag}
                <span className="ml-0.5 opacity-60">{count}</span>
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-gray-400">
            No AI tags yet. Process feedback to generate insights.
          </p>
        )}
      </div>

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
                      {item.feedbackType === 'post_stay' && (
                        <span className="rounded bg-purple-100 px-1.5 py-0.5 text-xs text-purple-700">
                          Post-stay
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2">
                      <p className="truncate text-sm text-gray-500">
                        {item.message.slice(0, 80)}
                        {item.message.length > 80 ? '...' : ''}
                      </p>
                    </div>
                    {/* AI tags inline */}
                    {item.aiTags && item.aiTags.length > 0 && (
                      <div className="mt-1 flex items-center gap-1">
                        {item.aiSentiment && (
                          <span
                            className={`inline-block h-2 w-2 rounded-full ${SENTIMENT_COLORS[item.aiSentiment] || SENTIMENT_COLORS.neutral}`}
                            title={`Sentiment: ${item.aiSentiment}`}
                          />
                        )}
                        {item.aiTags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.aiTags.length > 3 && (
                          <span className="text-[10px] text-gray-400">
                            +{item.aiTags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {item.ratingOverall != null && (
                      <span className="flex items-center gap-0.5 text-xs text-amber-600">
                        <Star size={12} weight="fill" />
                        {item.ratingOverall}
                      </span>
                    )}
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

                      {/* Post-stay ratings */}
                      {item.feedbackType === 'post_stay' && item.ratingOverall != null && (
                        <div>
                          <h4 className="mb-2 text-xs font-medium uppercase text-gray-400">
                            Ratings
                          </h4>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {[
                              { label: 'Overall', value: item.ratingOverall },
                              { label: 'Cleanliness', value: item.ratingCleanliness },
                              { label: 'Location', value: item.ratingLocation },
                              { label: 'Value', value: item.ratingValue },
                              { label: 'Communication', value: item.ratingCommunication },
                              { label: 'WiFi', value: item.ratingWifi },
                            ]
                              .filter((r) => r.value != null)
                              .map(({ label, value }) => (
                                <div key={label} className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500">{label}:</span>
                                  <MiniStars rating={value!} size={12} />
                                  <span className="text-xs font-medium text-gray-700">{value}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

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
