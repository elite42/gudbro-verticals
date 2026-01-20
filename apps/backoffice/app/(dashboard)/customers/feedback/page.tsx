'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useTranslations } from 'next-intl';
import { InfoTooltip } from '@/components/ui/info-tooltip';

interface FeedbackItem {
  id: string;
  user_id: string | null;
  user_email: string | null;
  user_name: string | null;
  type: 'rating' | 'review' | 'suggestion' | 'issue' | 'compliment';
  category: string;
  rating: number | null;
  title: string | null;
  message: string | null;
  status: 'new' | 'read' | 'in_progress' | 'replied' | 'resolved' | 'dismissed';
  staff_reply: string | null;
  is_public: boolean;
  is_featured: boolean;
  created_at: string;
}

const TYPE_CONFIG: Record<string, { icon: string; color: string }> = {
  rating: { icon: '⭐', color: 'bg-yellow-100 text-yellow-800' },
  review: { icon: '📝', color: 'bg-blue-100 text-blue-800' },
  suggestion: { icon: '💡', color: 'bg-green-100 text-green-800' },
  issue: { icon: '⚠️', color: 'bg-red-100 text-red-800' },
  compliment: { icon: '🎉', color: 'bg-purple-100 text-purple-800' },
};

const STATUS_CONFIG: Record<string, { color: string }> = {
  new: { color: 'bg-blue-100 text-blue-800' },
  read: { color: 'bg-gray-100 text-gray-800' },
  in_progress: { color: 'bg-yellow-100 text-yellow-800' },
  replied: { color: 'bg-green-100 text-green-800' },
  resolved: { color: 'bg-green-100 text-green-800' },
  dismissed: { color: 'bg-gray-100 text-gray-500' },
};

export default function FeedbackPage() {
  const t = useTranslations('feedbackPage');
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  // Fetch feedback
  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const merchantId = process.env.NEXT_PUBLIC_MERCHANT_ID;

        if (!merchantId) {
          setFeedback([]);
          setIsLoading(false);
          return;
        }

        let query = supabase
          .from('customer_feedback')
          .select(
            `
            *,
            gudbro_user_profiles (
              email,
              name
            )
          `
          )
          .eq('merchant_id', merchantId)
          .order('created_at', { ascending: false });

        if (filterType !== 'all') {
          query = query.eq('type', filterType);
        }

        if (filterStatus !== 'all') {
          query = query.eq('status', filterStatus);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
          throw fetchError;
        }

        // Use 'any' for Supabase response flexibility
        const transformedData: FeedbackItem[] = (data || []).map((row: any) => {
          const profile = Array.isArray(row.gudbro_user_profiles)
            ? row.gudbro_user_profiles[0]
            : row.gudbro_user_profiles;

          return {
            id: row.id,
            user_id: row.user_id,
            user_email: profile?.email || null,
            user_name: profile?.name || null,
            type: row.type,
            category: row.category,
            rating: row.rating,
            title: row.title,
            message: row.message,
            status: row.status,
            staff_reply: row.staff_reply,
            is_public: row.is_public,
            is_featured: row.is_featured,
            created_at: row.created_at,
          };
        });

        setFeedback(transformedData);
      } catch (err) {
        console.error('Error fetching feedback:', err);
        setError('Failed to load feedback. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, [filterType, filterStatus]);

  // Handle reply submit
  const handleReply = async () => {
    if (!selectedFeedback || !replyText.trim()) return;

    setIsReplying(true);
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { error } = await supabase
        .from('customer_feedback')
        .update({
          staff_reply: replyText,
          status: 'replied',
          replied_at: new Date().toISOString(),
        })
        .eq('id', selectedFeedback.id);

      if (error) throw error;

      // Update local state
      setFeedback((prev) =>
        prev.map((f) =>
          f.id === selectedFeedback.id
            ? { ...f, staff_reply: replyText, status: 'replied' as const }
            : f
        )
      );
      setSelectedFeedback(null);
      setReplyText('');
    } catch (err) {
      console.error('Error replying:', err);
    } finally {
      setIsReplying(false);
    }
  };

  // Format date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Count stats
  const newCount = feedback.filter((f) => f.status === 'new').length;
  const issuesCount = feedback.filter((f) => f.type === 'issue' && f.status !== 'resolved').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <InfoTooltip contentKey="pages.feedback" kbPageId="customers-feedback" />
          </div>
          <p className="mt-1 text-gray-600">
            {t('subtitle', { count: feedback.length })}
            {newCount > 0 && (
              <span className="ml-2 text-blue-600">({t('newCount', { count: newCount })})</span>
            )}
            {issuesCount > 0 && (
              <span className="ml-2 text-red-600">({t('openIssues', { count: issuesCount })})</span>
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{t('filters.allTypes')}</option>
            <option value="rating">{t('filters.ratings')}</option>
            <option value="review">{t('filters.reviews')}</option>
            <option value="suggestion">{t('filters.suggestions')}</option>
            <option value="issue">{t('filters.issues')}</option>
            <option value="compliment">{t('filters.compliments')}</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{t('filters.allStatus')}</option>
            <option value="new">{t('status.new')}</option>
            <option value="read">{t('status.read')}</option>
            <option value="in_progress">{t('status.in_progress')}</option>
            <option value="replied">{t('status.replied')}</option>
            <option value="resolved">{t('status.resolved')}</option>
            <option value="dismissed">{t('status.dismissed')}</option>
          </select>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-500">{t('loading')}</p>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
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
            <p className="mt-4 text-red-600">{t('error')}</p>
          </div>
        ) : feedback.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">{t('empty.title')}</h3>
            <p className="mx-auto mt-2 max-w-sm text-gray-500">{t('empty.description')}</p>
          </div>
        ) : (
          feedback.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl border border-gray-200 bg-white p-5 ${
                item.status === 'new' ? 'border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_CONFIG[item.type]?.color || 'bg-gray-100 text-gray-800'}`}
                    >
                      {TYPE_CONFIG[item.type]?.icon} {t(`types.${item.type}`)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {t(`categories.${item.category}`)}
                    </span>
                    <span
                      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${STATUS_CONFIG[item.status]?.color || 'bg-gray-100 text-gray-800'}`}
                    >
                      {t(`status.${item.status}`)}
                    </span>
                    {item.is_public && (
                      <span className="inline-flex items-center rounded bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                        {t('public')}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  {item.rating && (
                    <div className="mt-2 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`h-5 w-5 ${star <= item.rating! ? 'text-yellow-400' : 'text-gray-200'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  )}

                  {/* Title & Message */}
                  {item.title && <h4 className="mt-2 font-medium text-gray-900">{item.title}</h4>}
                  {item.message && <p className="mt-1 text-gray-600">{item.message}</p>}

                  {/* Staff Reply */}
                  {item.staff_reply && (
                    <div className="mt-3 rounded-lg border-l-4 border-blue-500 bg-gray-50 p-3">
                      <p className="text-sm font-medium text-gray-700">{t('yourReply')}</p>
                      <p className="mt-1 text-sm text-gray-600">{item.staff_reply}</p>
                    </div>
                  )}

                  {/* Meta */}
                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                    <span>{item.user_name || item.user_email || t('guest')}</span>
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {!item.staff_reply && (
                    <button
                      onClick={() => {
                        setSelectedFeedback(item);
                        setReplyText('');
                      }}
                      className="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
                    >
                      {t('reply')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reply Modal */}
      {selectedFeedback && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setSelectedFeedback(null)}
          />
          <div className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-lg -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">{t('replyModal.title')}</h3>

            <div className="mb-4 rounded-lg bg-gray-50 p-3">
              <p className="text-sm text-gray-600">
                {selectedFeedback.message || selectedFeedback.title || t('replyModal.noMessage')}
              </p>
              <p className="mt-2 text-xs text-gray-400">
                {t('replyModal.from')}:{' '}
                {selectedFeedback.user_name || selectedFeedback.user_email || t('guest')}
              </p>
            </div>

            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={t('replyModal.placeholder')}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setSelectedFeedback(null)}
                className="rounded-lg px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
              >
                {t('replyModal.cancel')}
              </button>
              <button
                onClick={handleReply}
                disabled={isReplying || !replyText.trim()}
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                {isReplying ? t('replyModal.sending') : t('replyModal.sendReply')}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
