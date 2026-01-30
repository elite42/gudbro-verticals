'use client';

import { useDroppable } from '@dnd-kit/core';
import { TaskCard, type FeedbackTask } from './TaskCard';

// ============================================================================
// Types
// ============================================================================

interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  tasks: FeedbackTask[];
  onTaskClick?: (task: FeedbackTask) => void;
}

// ============================================================================
// Component
// ============================================================================

export function KanbanColumn({ id, title, color, tasks, onTaskClick }: KanbanColumnProps) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`flex w-72 shrink-0 flex-col rounded-lg border bg-gray-50 transition-colors ${
        isOver ? 'bg-blue-50 ring-2 ring-blue-400' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 rounded-t-lg border-b bg-white px-3 py-2.5">
        <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <span className="ml-auto rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
          {tasks.length}
        </span>
      </div>

      {/* Card list */}
      <div
        className="flex flex-1 flex-col gap-2 overflow-y-auto p-2"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        {tasks.length === 0 ? (
          <p className="py-8 text-center text-xs text-gray-400">No tasks</p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} onClick={onTaskClick} />)
        )}
      </div>
    </div>
  );
}
