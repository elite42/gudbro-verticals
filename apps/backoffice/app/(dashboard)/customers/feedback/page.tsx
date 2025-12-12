'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';

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

const TYPE_CONFIG: Record<string, { label: string; icon: string; color: string }> = {
  rating: { label: 'Rating', icon: '⭐', color: 'bg-yellow-100 text-yellow-800' },
  review: { label: 'Review', icon: '📝', color: 'bg-blue-100 text-blue-800' },
  suggestion: { label: 'Suggestion', icon: '💡', color: 'bg-green-100 text-green-800' },
  issue: { label: 'Issue', icon: '⚠️', color: 'bg-red-100 text-red-800' },
  compliment: { label: 'Compliment', icon: '🎉', color: 'bg-purple-100 text-purple-800' },
};

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-800' },
  read: { label: 'Read', color: 'bg-gray-100 text-gray-800' },
  in_progress: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
  replied: { label: 'Replied', color: 'bg-green-100 text-green-800' },
  resolved: { label: 'Resolved', color: 'bg-green-100 text-green-800' },
  dismissed: { label: 'Dismissed', color: 'bg-gray-100 text-gray-500' },
};

const CATEGORY_LABELS: Record<string, string> = {
  food_quality: 'Food Quality',
  service: 'Service',
  ambience: 'Ambience',
  cleanliness: 'Cleanliness',
  app_experience: 'App Experience',
  delivery: 'Delivery',
  pricing: 'Pricing',
  menu: 'Menu',
  general: 'General',
};

export default function FeedbackPage() {
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
          .select(`
            *,
            gudbro_user_profiles (
              email,
              name
            )
          `)
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
      setFeedback(prev =>
        prev.map(f =>
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
  const newCount = feedback.filter(f => f.status === 'new').length;
  const issuesCount = feedback.filter(f => f.type === 'issue' && f.status !== 'resolved').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Feedback</h1>
          <p className="text-gray-600 mt-1">
            {feedback.length} total feedback items
            {newCount > 0 && <span className="text-blue-600 ml-2">({newCount} new)</span>}
            {issuesCount > 0 && <span className="text-red-600 ml-2">({issuesCount} open issues)</span>}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="rating">Ratings</option>
            <option value="review">Reviews</option>
            <option value="suggestion">Suggestions</option>
            <option value="issue">Issues</option>
            <option value="compliment">Compliments</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="in_progress">In Progress</option>
            <option value="replied">Replied</option>
            <option value="resolved">Resolved</option>
            <option value="dismissed">Dismissed</option>
          </select>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading feedback...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <svg className="w-12 h-12 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-red-600 mt-4">{error}</p>
          </div>
        ) : feedback.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mt-4">No feedback yet</h3>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
              Customer feedback will appear here when they submit ratings, reviews, or suggestions through the PWA.
            </p>
          </div>
        ) : (
          feedback.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl border border-gray-200 p-5 ${
                item.status === 'new' ? 'border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${TYPE_CONFIG[item.type]?.color || 'bg-gray-100 text-gray-800'}`}>
                      {TYPE_CONFIG[item.type]?.icon} {TYPE_CONFIG[item.type]?.label || item.type}
                    </span>
                    <span className="text-sm text-gray-500">{CATEGORY_LABELS[item.category] || item.category}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${STATUS_CONFIG[item.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                      {STATUS_CONFIG[item.status]?.label || item.status}
                    </span>
                    {item.is_public && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700">
                        Public
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  {item.rating && (
                    <div className="flex items-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${star <= item.rating! ? 'text-yellow-400' : 'text-gray-200'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  )}

                  {/* Title & Message */}
                  {item.title && (
                    <h4 className="font-medium text-gray-900 mt-2">{item.title}</h4>
                  )}
                  {item.message && (
                    <p className="text-gray-600 mt-1">{item.message}</p>
                  )}

                  {/* Staff Reply */}
                  {item.staff_reply && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                      <p className="text-sm font-medium text-gray-700">Your reply:</p>
                      <p className="text-sm text-gray-600 mt-1">{item.staff_reply}</p>
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span>{item.user_name || item.user_email || 'Guest'}</span>
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
                      className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Reply
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
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setSelectedFeedback(null)}
          />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-lg mx-auto bg-white rounded-xl shadow-xl z-50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reply to Feedback</h3>

            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                {selectedFeedback.message || selectedFeedback.title || 'No message'}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                From: {selectedFeedback.user_name || selectedFeedback.user_email || 'Guest'}
              </p>
            </div>

            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setSelectedFeedback(null)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReply}
                disabled={isReplying || !replyText.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isReplying ? 'Sending...' : 'Send Reply'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
