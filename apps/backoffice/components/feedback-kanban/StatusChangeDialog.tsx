'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

// ============================================================================
// Types
// ============================================================================

interface StatusChangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetStatus: string;
  taskTitle: string;
  submissionCount: number;
  onConfirm: (resolutionNote?: string) => void;
}

// ============================================================================
// Status display config
// ============================================================================

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; description: (count: number) => string }
> = {
  done: {
    label: 'Done',
    color: 'bg-green-600 hover:bg-green-700',
    description: (count) =>
      `This will notify ${count} merchant(s) that their feedback has been resolved.`,
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-600 hover:bg-red-700',
    description: (count) =>
      `This will notify ${count} merchant(s) that their feedback was not accepted.`,
  },
};

// ============================================================================
// Component
// ============================================================================

export function StatusChangeDialog({
  open,
  onOpenChange,
  targetStatus,
  taskTitle,
  submissionCount,
  onConfirm,
}: StatusChangeDialogProps) {
  const [resolutionNote, setResolutionNote] = useState('');

  const config = STATUS_CONFIG[targetStatus];
  if (!config) return null;

  const handleConfirm = () => {
    onConfirm(resolutionNote.trim() || undefined);
    setResolutionNote('');
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) setResolutionNote('');
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Move task to {config.label}?</DialogTitle>
          <DialogDescription>{config.description(submissionCount)}</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Task: {taskTitle}</p>
          <label className="block text-sm text-gray-600">
            Resolution note (optional)
            <textarea
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              placeholder="Add a note explaining the resolution..."
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </label>
        </div>

        <DialogFooter>
          <button
            onClick={() => handleOpenChange(false)}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white ${config.color}`}
          >
            Confirm
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
