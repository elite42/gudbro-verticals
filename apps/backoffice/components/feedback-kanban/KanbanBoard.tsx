'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core';
import { KanbanColumn } from './KanbanColumn';
import { TaskCard, type FeedbackTask } from './TaskCard';
import { TaskDetailPanel } from './TaskDetailPanel';
import { StatusChangeDialog } from './StatusChangeDialog';

// ============================================================================
// Column config
// ============================================================================

const KANBAN_COLUMNS = [
  { id: 'new', title: 'New', color: 'bg-blue-500' },
  { id: 'reviewing', title: 'Reviewing', color: 'bg-yellow-500' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-purple-500' },
  { id: 'done', title: 'Done', color: 'bg-green-500' },
  { id: 'rejected', title: 'Rejected', color: 'bg-red-500' },
] as const;

type TaskStatus = (typeof KANBAN_COLUMNS)[number]['id'];

// Terminal statuses that require confirmation dialog
const TERMINAL_STATUSES: TaskStatus[] = ['done', 'rejected'];

// ============================================================================
// Component
// ============================================================================

export function KanbanBoard() {
  const [tasks, setTasks] = useState<FeedbackTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<FeedbackTask | null>(null);
  const snapshotRef = useRef<FeedbackTask[]>([]);

  // Detail panel state
  const [selectedTask, setSelectedTask] = useState<FeedbackTask | null>(null);

  // Status change dialog state
  const [pendingMove, setPendingMove] = useState<{ taskId: string; newStatus: string } | null>(
    null
  );

  // Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor)
  );

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch('/api/feedback/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data.tasks || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Group tasks by status
  const tasksByStatus = KANBAN_COLUMNS.reduce(
    (acc, col) => {
      acc[col.id] = tasks.filter((t) => t.status === col.id);
      return acc;
    },
    {} as Record<TaskStatus, FeedbackTask[]>
  );

  // Find task's current status
  const findTaskStatus = useCallback(
    (taskId: string): TaskStatus | null => {
      const task = tasks.find((t) => t.id === taskId);
      return task ? (task.status as TaskStatus) : null;
    },
    [tasks]
  );

  // ========================================================================
  // Status change logic (shared by drag and panel actions)
  // ========================================================================

  const applyStatusChange = useCallback(
    async (taskId: string, newStatus: string, resolutionNote?: string) => {
      const snapshot = [...tasks];
      // Optimistic update
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, status: newStatus as FeedbackTask['status'] } : t
        )
      );

      // Update selectedTask if it's the one being changed
      setSelectedTask((prev) =>
        prev && prev.id === taskId ? { ...prev, status: newStatus as FeedbackTask['status'] } : prev
      );

      try {
        const res = await fetch('/api/feedback/tasks', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            taskId,
            status: newStatus,
            ...(resolutionNote ? { resolutionNote } : {}),
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to update task status');
        }
      } catch (err) {
        console.error('Error updating task status:', err);
        // Revert on failure
        setTasks(snapshot);
        setSelectedTask((prev) => {
          if (!prev || prev.id !== taskId) return prev;
          const original = snapshot.find((t) => t.id === taskId);
          return original ? { ...prev, status: original.status } : prev;
        });
      }
    },
    [tasks]
  );

  // Handle confirmed status change (from dialog)
  const handleConfirmedStatusChange = useCallback(
    (resolutionNote?: string) => {
      if (!pendingMove) return;
      applyStatusChange(pendingMove.taskId, pendingMove.newStatus, resolutionNote);
      setPendingMove(null);
    },
    [pendingMove, applyStatusChange]
  );

  // Handle status change from detail panel
  const handleStatusChangeFromPanel = useCallback(
    (taskId: string, newStatus: string) => {
      if (TERMINAL_STATUSES.includes(newStatus as TaskStatus)) {
        // Terminal status: show confirmation dialog
        setPendingMove({ taskId, newStatus });
      } else {
        // Non-terminal: apply directly
        applyStatusChange(taskId, newStatus);
      }
    },
    [applyStatusChange]
  );

  // ========================================================================
  // Drag handlers
  // ========================================================================

  const handleDragStart = (event: DragStartEvent) => {
    const task = event.active.data.current?.task as FeedbackTask | undefined;
    if (task) {
      setActiveTask(task);
      snapshotRef.current = [...tasks];
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;
    const currentStatus = findTaskStatus(taskId);

    if (!currentStatus || newStatus === currentStatus) return;

    if (TERMINAL_STATUSES.includes(newStatus)) {
      // Terminal status: show confirmation dialog (no optimistic update yet)
      setPendingMove({ taskId, newStatus });
    } else {
      // Non-terminal: apply directly with optimistic update
      applyStatusChange(taskId, newStatus);
    }
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  // Handle card click to open detail panel
  const handleTaskClick = (task: FeedbackTask) => {
    setSelectedTask(task);
  };

  // ========================================================================
  // Render
  // ========================================================================

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-sm">{error}</p>
        <button
          onClick={() => {
            setLoading(true);
            fetchTasks();
          }}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  // Resolve pending move task for dialog props
  const pendingTask = pendingMove ? tasks.find((t) => t.id === pendingMove.taskId) : null;

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {KANBAN_COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              title={col.title}
              color={col.color}
              tasks={tasksByStatus[col.id]}
              onTaskClick={handleTaskClick}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={null}>
          {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
        </DragOverlay>
      </DndContext>

      {/* Task detail slide-over panel */}
      <TaskDetailPanel
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onStatusChange={handleStatusChangeFromPanel}
      />

      {/* Status change confirmation dialog */}
      <StatusChangeDialog
        open={!!pendingMove}
        onOpenChange={(open) => {
          if (!open) setPendingMove(null);
        }}
        targetStatus={pendingMove?.newStatus || ''}
        taskTitle={pendingTask?.title || ''}
        submissionCount={pendingTask?.submission_count || 0}
        onConfirm={handleConfirmedStatusChange}
      />
    </>
  );
}
