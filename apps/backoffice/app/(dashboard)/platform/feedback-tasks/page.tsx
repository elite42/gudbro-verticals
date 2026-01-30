import { KanbanBoard } from '@/components/feedback-kanban/KanbanBoard';

export const metadata = {
  title: 'Feedback Tasks | GUDBRO Admin',
};

export default function FeedbackTasksPage() {
  return (
    <div className="h-full w-full">
      {/* Header */}
      <div className="mb-6 px-1">
        <p className="text-sm text-gray-500">Platform</p>
        <h1 className="text-2xl font-bold text-gray-900">Feedback Tasks</h1>
      </div>

      {/* Kanban Board */}
      <KanbanBoard />
    </div>
  );
}
