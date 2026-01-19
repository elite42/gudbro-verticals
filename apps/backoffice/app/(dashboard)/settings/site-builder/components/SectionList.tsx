'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SectionCard } from './SectionCard';
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

interface SectionListProps {
  sections: SiteSectionData[];
  sectionMetadata: Record<SiteSectionType, SectionMetadata>;
  onReorder: (orderedIds: string[]) => void;
  onToggleEnabled: (section: SiteSectionData) => void;
  onEdit: (section: SiteSectionData) => void;
  saving: boolean;
}

// ============================================================================
// Component
// ============================================================================

export function SectionList({
  sections,
  sectionMetadata,
  onReorder,
  onToggleEnabled,
  onEdit,
  saving,
}: SectionListProps) {
  const [items, setItems] = useState(sections);

  // Update items when sections prop changes
  if (sections.length !== items.length || sections.some((s, i) => s.id !== items[i]?.id)) {
    setItems(sections);
  }

  // Sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required to start drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);

      // Notify parent of new order
      onReorder(newItems.map((item) => item.id));
    }
  };

  if (sections.length === 0) {
    return (
      <div className="px-6 py-12 text-center text-gray-500">
        <p>No sections configured yet.</p>
        <p className="mt-1 text-sm">Sections will be created automatically when you save.</p>
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div className="divide-y divide-gray-100">
          {items.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              metadata={sectionMetadata[section.sectionType]}
              onToggleEnabled={() => onToggleEnabled(section)}
              onEdit={() => onEdit(section)}
              disabled={saving}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
