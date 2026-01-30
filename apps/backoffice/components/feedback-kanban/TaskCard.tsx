'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { ChatCircle, Globe } from '@phosphor-icons/react';

// ============================================================================
// Types
// ============================================================================

export interface FeedbackTask {
  id: string;
  title: string;
  description: string | null;
  type: string;
  priority: number;
  tags: string[];
  status: 'new' | 'reviewing' | 'in_progress' | 'done' | 'rejected';
  submission_count: number;
  languages: string[];
  avg_sentiment: number | null;
  first_submitted_at: string;
  last_submitted_at: string;
  resolved_at: string | null;
  resolution_note: string | null;
  created_at: string;
  updated_at: string;
}

interface TaskCardProps {
  task: FeedbackTask;
  onClick?: (task: FeedbackTask) => void;
  isOverlay?: boolean;
}

// ============================================================================
// Priority badge config
// ============================================================================

const PRIORITY_COLORS: Record<number, string> = {
  1: 'bg-red-50 text-red-700 border-red-200',
  2: 'bg-orange-50 text-orange-700 border-orange-200',
  3: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  4: 'bg-blue-50 text-blue-700 border-blue-200',
  5: 'bg-gray-50 text-gray-600 border-gray-200',
};

// ============================================================================
// Type badge label
// ============================================================================

const TYPE_LABELS: Record<string, string> = {
  bug: 'Bug',
  feature_request: 'Feature',
  improvement: 'Improvement',
  question: 'Question',
  complaint: 'Complaint',
  praise: 'Praise',
  other: 'Other',
};

// ============================================================================
// Component
// ============================================================================

export function TaskCard({ task, onClick, isOverlay }: TaskCardProps) {
  const isDisabled = task.status === 'done' || task.status === 'rejected';

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { task },
    disabled: isDisabled,
  });

  const style = transform ? { transform: CSS.Translate.toString(transform) } : undefined;

  const sentimentColor =
    task.avg_sentiment === null
      ? null
      : task.avg_sentiment >= 0.7
        ? 'bg-green-400'
        : task.avg_sentiment >= 0.4
          ? 'bg-yellow-400'
          : 'bg-red-400';

  const priorityColor = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS[5];

  return (
    <div
      ref={isOverlay ? undefined : setNodeRef}
      style={style}
      {...(isOverlay ? {} : listeners)}
      {...(isOverlay ? {} : attributes)}
      onClick={() => onClick?.(task)}
      className={`rounded-lg border bg-white p-3 shadow-sm transition-shadow hover:shadow-md ${
        isDisabled ? 'cursor-default opacity-75' : 'cursor-grab active:cursor-grabbing'
      } ${isDragging && !isOverlay ? 'opacity-50' : ''}`}
    >
      {/* Title + Priority */}
      <div className="mb-2 flex items-start justify-between gap-2">
        <h4 className="line-clamp-2 text-sm font-medium text-gray-900">{task.title}</h4>
        <span
          className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold leading-tight ${priorityColor}`}
        >
          P{task.priority}
        </span>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
        {/* Sentiment dot */}
        {sentimentColor && (
          <span
            className={`inline-block h-2 w-2 rounded-full ${sentimentColor}`}
            title={`Sentiment: ${task.avg_sentiment?.toFixed(2)}`}
          />
        )}

        {/* Submission count */}
        <span className="inline-flex items-center gap-0.5">
          <ChatCircle size={12} weight="duotone" />
          {task.submission_count}
        </span>

        {/* Languages */}
        {task.languages.length > 0 && (
          <span className="inline-flex items-center gap-0.5">
            <Globe size={12} weight="duotone" />
            {task.languages.join(', ')}
          </span>
        )}

        {/* Type badge */}
        <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600">
          {TYPE_LABELS[task.type] || task.type}
        </span>
      </div>
    </div>
  );
}
