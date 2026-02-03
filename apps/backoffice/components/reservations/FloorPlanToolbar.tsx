'use client';

import {
  Plus,
  MagnifyingGlassPlus,
  MagnifyingGlassMinus,
  ArrowCounterClockwise,
  PencilSimple,
  Eye,
  Trash,
  FloppyDisk,
} from '@phosphor-icons/react';
import { TableShapeType } from './TableShape';

interface FloorPlanToolbarProps {
  isEditing: boolean;
  scale: number;
  hasChanges: boolean;
  selectedTableId: string | null;
  onToggleEdit: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onAddTable: (shape: TableShapeType) => void;
  onDeleteSelected: () => void;
  onSave: () => void;
  isSaving?: boolean;
}

export function FloorPlanToolbar({
  isEditing,
  scale,
  hasChanges,
  selectedTableId,
  onToggleEdit,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onAddTable,
  onDeleteSelected,
  onSave,
  isSaving = false,
}: FloorPlanToolbarProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
      {/* Left side - Mode toggle and add buttons */}
      <div className="flex items-center gap-3">
        {/* Edit/View toggle */}
        <button
          onClick={onToggleEdit}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            isEditing ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isEditing ? (
            <>
              <PencilSimple className="h-4 w-4" />
              Editing
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              Viewing
            </>
          )}
        </button>

        {/* Add table buttons - only in edit mode */}
        {isEditing && (
          <div className="flex items-center gap-1 border-l border-gray-200 pl-3">
            <span className="mr-2 text-sm text-gray-500">Add:</span>
            <button
              onClick={() => onAddTable('round')}
              className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
              title="Add round table"
            >
              <div className="h-4 w-4 rounded-full border-2 border-gray-600" />
              Round
            </button>
            <button
              onClick={() => onAddTable('square')}
              className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
              title="Add square table"
            >
              <div className="h-4 w-4 rounded border-2 border-gray-600" />
              Square
            </button>
            <button
              onClick={() => onAddTable('rectangle')}
              className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
              title="Add rectangular table"
            >
              <div className="h-3 w-5 rounded border-2 border-gray-600" />
              Rectangle
            </button>
          </div>
        )}

        {/* Delete selected - only when table selected */}
        {isEditing && selectedTableId && (
          <button
            onClick={onDeleteSelected}
            className="flex items-center gap-1.5 rounded-lg bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-200"
          >
            <Trash className="h-4 w-4" />
            Delete
          </button>
        )}
      </div>

      {/* Right side - Zoom and save */}
      <div className="flex items-center gap-3">
        {/* Zoom controls */}
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-0.5">
          <button
            onClick={onZoomOut}
            className="rounded p-1.5 hover:bg-white"
            disabled={scale <= 0.5}
            title="Zoom out"
          >
            <MagnifyingGlassMinus className="h-4 w-4" />
          </button>
          <span className="min-w-[50px] text-center text-sm text-gray-600">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={onZoomIn}
            className="rounded p-1.5 hover:bg-white"
            disabled={scale >= 2}
            title="Zoom in"
          >
            <MagnifyingGlassPlus className="h-4 w-4" />
          </button>
          <button
            onClick={onResetZoom}
            className="rounded border-l border-gray-200 p-1.5 hover:bg-white"
            title="Reset zoom"
          >
            <ArrowCounterClockwise className="h-4 w-4" />
          </button>
        </div>

        {/* Save button */}
        {isEditing && hasChanges && (
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            <FloppyDisk className="h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>
    </div>
  );
}

export function FloorPlanLegend() {
  return (
    <div className="flex items-center gap-4 border-t border-gray-200 bg-gray-50 px-4 py-2 text-xs">
      <span className="font-medium text-gray-600">Status:</span>
      <span className="flex items-center gap-1">
        <span className="h-3 w-3 rounded-full border-2 border-green-400 bg-green-100" />
        Available
      </span>
      <span className="flex items-center gap-1">
        <span className="h-3 w-3 rounded-full border-2 border-yellow-400 bg-yellow-100" />
        Reserved
      </span>
      <span className="flex items-center gap-1">
        <span className="h-3 w-3 rounded-full border-2 border-red-400 bg-red-100" />
        Occupied
      </span>
      <span className="flex items-center gap-1">
        <span className="h-3 w-3 rounded-full border-2 border-gray-400 bg-gray-200" />
        Blocked
      </span>
    </div>
  );
}
