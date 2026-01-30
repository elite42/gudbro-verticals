'use client';

import { useState, useEffect } from 'react';
import { X, Globe, ChatCircle, Clock, CalendarBlank } from '@phosphor-icons/react';
import { formatDistanceToNow } from 'date-fns';
import type { FeedbackTask } from './TaskCard';

// ============================================================================
// Types
// ============================================================================

interface Submission {
  id: string;
  original_title: string | null;
  original_body: string;
  translated_body: string | null;
  detected_language: string;
  sentiment_score: number | null;
  priority_score: number | null;
  screenshot_url: string | null;
  created_at: string;
}

interface TaskDetailPanelProps {
  task: FeedbackTask | null;
  onClose: () => void;
  onStatusChange: (taskId: string, newStatus: string) => void;
}

// ============================================================================
// Status config
// ============================================================================

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  reviewing: 'bg-yellow-100 text-yellow-700',
  in_progress: 'bg-purple-100 text-purple-700',
  done: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  reviewing: 'Reviewing',
  in_progress: 'In Progress',
  done: 'Done',
  rejected: 'Rejected',
};

const TYPE_LABELS: Record<string, string> = {
  bug: 'Bug',
  feature_request: 'Feature',
  improvement: 'Improvement',
  question: 'Question',
  complaint: 'Complaint',
  praise: 'Praise',
  other: 'Other',
};

const PRIORITY_COLORS: Record<number, string> = {
  1: 'bg-red-50 text-red-700 border-red-200',
  2: 'bg-orange-50 text-orange-700 border-orange-200',
  3: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  4: 'bg-blue-50 text-blue-700 border-blue-200',
  5: 'bg-gray-50 text-gray-600 border-gray-200',
};

// ============================================================================
// Status action buttons
// ============================================================================

interface StatusAction {
  label: string;
  targetStatus: string;
  style: string;
}

function getStatusActions(currentStatus: string): StatusAction[] {
  switch (currentStatus) {
    case 'new':
      return [
        {
          label: 'Start Reviewing',
          targetStatus: 'reviewing',
          style: 'bg-yellow-500 hover:bg-yellow-600 text-white',
        },
      ];
    case 'reviewing':
      return [
        {
          label: 'Start Working',
          targetStatus: 'in_progress',
          style: 'bg-purple-500 hover:bg-purple-600 text-white',
        },
        {
          label: 'Reject',
          targetStatus: 'rejected',
          style: 'bg-red-500 hover:bg-red-600 text-white',
        },
      ];
    case 'in_progress':
      return [
        {
          label: 'Mark Done',
          targetStatus: 'done',
          style: 'bg-green-500 hover:bg-green-600 text-white',
        },
        {
          label: 'Reject',
          targetStatus: 'rejected',
          style: 'bg-red-500 hover:bg-red-600 text-white',
        },
      ];
    case 'done':
    case 'rejected':
      return [
        {
          label: 'Reopen',
          targetStatus: 'reviewing',
          style: 'bg-gray-500 hover:bg-gray-600 text-white',
        },
      ];
    default:
      return [];
  }
}

// ============================================================================
// Component
// ============================================================================

export function TaskDetailPanel({ task, onClose, onStatusChange }: TaskDetailPanelProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  useEffect(() => {
    if (!task) {
      setSubmissions([]);
      return;
    }

    let cancelled = false;
    setLoadingSubmissions(true);

    fetch(`/api/feedback/tasks/${task.id}/submissions`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch submissions');
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setSubmissions(data.submissions || []);
      })
      .catch((err) => {
        console.error('Error fetching submissions:', err);
        if (!cancelled) setSubmissions([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingSubmissions(false);
      });

    return () => {
      cancelled = true;
    };
  }, [task?.id]);

  if (!task) return null;

  const statusActions = getStatusActions(task.status);
  const priorityColor = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS[5];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg overflow-y-auto bg-white shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="mb-4 flex items-start justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>
            <button
              onClick={onClose}
              className="shrink-0 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X size={20} weight="duotone" />
            </button>
          </div>

          {/* Metadata */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {/* Type */}
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {TYPE_LABELS[task.type] || task.type}
            </span>

            {/* Priority */}
            <span
              className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${priorityColor}`}
            >
              P{task.priority}
            </span>

            {/* Status */}
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[task.status] || ''}`}
            >
              {STATUS_LABELS[task.status] || task.status}
            </span>
          </div>

          {/* Tags */}
          {task.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Dates */}
          <div className="mb-4 space-y-1 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <CalendarBlank size={14} weight="duotone" />
              <span>
                First submitted:{' '}
                {formatDistanceToNow(new Date(task.first_submitted_at), { addSuffix: true })}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} weight="duotone" />
              <span>
                Last activity:{' '}
                {formatDistanceToNow(new Date(task.last_submitted_at), { addSuffix: true })}
              </span>
            </div>
          </div>

          {/* Submission count and languages */}
          <div className="mb-4 flex items-center gap-3 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <ChatCircle size={14} weight="duotone" />
              {task.submission_count} submission{task.submission_count !== 1 ? 's' : ''}
            </span>
            {task.languages.length > 0 && (
              <span className="inline-flex items-center gap-1">
                <Globe size={14} weight="duotone" />
                {task.languages.join(', ')}
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="my-4 border-t" />

          {/* Status actions */}
          {statusActions.length > 0 && (
            <>
              <div className="flex flex-wrap gap-2">
                {statusActions.map((action) => (
                  <button
                    key={action.targetStatus}
                    onClick={() => onStatusChange(task.id, action.targetStatus)}
                    className={`rounded-md px-3 py-1.5 text-sm font-medium ${action.style}`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
              <div className="my-4 border-t" />
            </>
          )}

          {/* Linked Submissions */}
          <h3 className="mb-3 text-sm font-semibold text-gray-700">
            Linked Submissions ({loadingSubmissions ? '...' : submissions.length})
          </h3>

          {loadingSubmissions ? (
            <div className="flex justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
            </div>
          ) : submissions.length === 0 ? (
            <p className="py-4 text-center text-sm text-gray-400">No submissions found</p>
          ) : (
            <div className="space-y-3">
              {submissions.map((sub) => (
                <div key={sub.id} className="rounded-lg border p-4">
                  {/* Submission header */}
                  <div className="mb-2 flex items-center gap-2">
                    {sub.original_title && (
                      <span className="text-sm font-medium text-gray-800">
                        {sub.original_title}
                      </span>
                    )}
                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">
                      {sub.detected_language}
                    </span>
                    <span className="ml-auto text-[10px] text-gray-400">
                      {formatDistanceToNow(new Date(sub.created_at), { addSuffix: true })}
                    </span>
                  </div>

                  {/* Original text */}
                  <div className="mb-2">
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-gray-400">
                      Original
                    </p>
                    <div className="whitespace-pre-wrap rounded bg-gray-50 p-2.5 text-sm text-gray-700">
                      {sub.original_body}
                    </div>
                  </div>

                  {/* Translated text */}
                  {sub.translated_body && sub.translated_body !== sub.original_body && (
                    <div className="mb-2">
                      <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-gray-400">
                        Translated
                      </p>
                      <div className="whitespace-pre-wrap rounded bg-blue-50 p-2.5 text-sm text-gray-700">
                        {sub.translated_body}
                      </div>
                    </div>
                  )}

                  {/* Screenshot link */}
                  {sub.screenshot_url && (
                    <a
                      href={sub.screenshot_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      View screenshot
                    </a>
                  )}

                  {/* Sentiment + Priority indicators */}
                  <div className="mt-2 flex items-center gap-3 text-[10px] text-gray-400">
                    {sub.sentiment_score !== null && (
                      <span>Sentiment: {sub.sentiment_score.toFixed(2)}</span>
                    )}
                    {sub.priority_score !== null && (
                      <span>Priority: {sub.priority_score.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
