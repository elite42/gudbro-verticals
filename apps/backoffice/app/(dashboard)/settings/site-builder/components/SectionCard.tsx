'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DotsSixVertical, PencilSimple, Eye, EyeSlash, Clock } from '@phosphor-icons/react';
import { SiteSectionType } from '@/lib/supabase';

// ============================================================================
// Types
// ============================================================================

interface SiteSectionData {
  id: string;
  locationId: string;
  sectionType: SiteSectionType;
  isEnabled: boolean;
  displayOrder: number;
  content: Record<string, unknown>;
  styleOverrides: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

interface SectionMetadata {
  label: string;
  description: string;
  icon: string;
}

interface SectionCardProps {
  section: SiteSectionData;
  metadata: SectionMetadata;
  onToggleEnabled: () => void;
  onEdit: () => void;
  disabled?: boolean;
}

// ============================================================================
// Component
// ============================================================================

export function SectionCard({
  section,
  metadata,
  onToggleEnabled,
  onEdit,
  disabled,
}: SectionCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Determine status
  const isPublished = section.publishedAt !== null;
  const hasUnpublishedChanges =
    isPublished && new Date(section.updatedAt) > new Date(section.publishedAt!);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-4 px-6 py-4 ${
        isDragging ? 'z-50 bg-blue-50 shadow-lg' : 'bg-white'
      } ${!section.isEnabled ? 'opacity-60' : ''}`}
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none text-gray-400 hover:text-gray-600"
        disabled={disabled}
      >
        <DotsSixVertical className="h-5 w-5" />
      </button>

      {/* Icon */}
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xl">
        {metadata.icon}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900">{metadata.label}</h3>

          {/* Status Badges */}
          {!section.isEnabled && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              Hidden
            </span>
          )}
          {section.isEnabled && !isPublished && (
            <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">
              Draft
            </span>
          )}
          {hasUnpublishedChanges && (
            <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-700">
              <Clock className="h-3 w-3" />
              Unsaved
            </span>
          )}
        </div>
        <p className="mt-0.5 truncate text-sm text-gray-500">{metadata.description}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Toggle Visibility */}
        <button
          onClick={onToggleEnabled}
          disabled={disabled}
          className={`rounded-lg p-2 transition-colors ${
            section.isEnabled ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-400 hover:bg-gray-100'
          }`}
          title={section.isEnabled ? 'Hide section' : 'Show section'}
        >
          {section.isEnabled ? <Eye className="h-5 w-5" /> : <EyeSlash className="h-5 w-5" />}
        </button>

        {/* Edit Button */}
        <button
          onClick={onEdit}
          disabled={disabled}
          className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          title="Edit section"
        >
          <PencilSimple className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
