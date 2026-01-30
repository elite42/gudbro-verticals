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

// ============================================================================
// Component
// ============================================================================

interface KanbanBoardProps {
  onTaskClick?: (task: FeedbackTask) => void;
}

export function KanbanBoard({ onTaskClick }: KanbanBoardProps) {
  const [tasks, setTasks] = useState<FeedbackTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<FeedbackTask | null>(null);
  const snapshotRef = useRef<FeedbackTask[]>([]);

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

  // Drag handlers
  const handleDragStart = (event: DragStartEvent) => {
    const task = event.active.data.current?.task as FeedbackTask | undefined;
    if (task) {
      setActiveTask(task);
      snapshotRef.current = [...tasks];
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;
    const currentStatus = findTaskStatus(taskId);

    if (!currentStatus || newStatus === currentStatus) return;

    // Confirmation for Done/Rejected moves
    if (newStatus === 'done' || newStatus === 'rejected') {
      const confirmed = window.confirm('This will notify merchants. Continue?');
      if (!confirmed) return;
    }

    // Optimistic update
    const snapshot = snapshotRef.current;
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));

    // Persist via API
    try {
      const res = await fetch('/api/feedback/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, status: newStatus }),
      });

      if (!res.ok) {
        throw new Error('Failed to update task status');
      }
    } catch (err) {
      console.error('Error updating task status:', err);
      // Revert on failure
      setTasks(snapshot);
    }
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

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

  return (
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
            onTaskClick={onTaskClick}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
