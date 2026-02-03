'use client';

import { useState, useEffect } from 'react';
import { X, FloppyDisk, SpinnerGap } from '@phosphor-icons/react';
import { SiteSectionType } from '@/lib/supabase';

// Import editors
import { HeroEditor } from './editors/HeroEditor';
import { AboutEditor } from './editors/AboutEditor';
import { GalleryEditor } from './editors/GalleryEditor';
import { HoursEditor } from './editors/HoursEditor';
import { ContactEditor } from './editors/ContactEditor';
import { SocialEditor } from './editors/SocialEditor';
import { ReviewsEditor } from './editors/ReviewsEditor';

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

interface SectionEditorProps {
  section: SiteSectionData;
  metadata: SectionMetadata;
  onSave: (content: Record<string, unknown>) => void;
  onClose: () => void;
  saving: boolean;
}

// ============================================================================
// Component
// ============================================================================

export function SectionEditor({ section, metadata, onSave, onClose, saving }: SectionEditorProps) {
  const [content, setContent] = useState<Record<string, unknown>>(section.content);
  const [hasChanges, setHasChanges] = useState(false);

  // Reset content when section changes
  useEffect(() => {
    setContent(section.content);
    setHasChanges(false);
  }, [section.id]);

  // Handle content changes
  const handleContentChange = (newContent: Record<string, unknown>) => {
    setContent(newContent);
    setHasChanges(true);
  };

  // Handle save
  const handleSave = () => {
    onSave(content);
  };

  // Render the appropriate editor
  const renderEditor = () => {
    const props = {
      content,
      onChange: handleContentChange,
    };

    // Props for editors that need locationId for image uploads
    const propsWithLocation = {
      ...props,
      locationId: section.locationId,
    };

    switch (section.sectionType) {
      case 'hero':
        return <HeroEditor {...propsWithLocation} />;
      case 'about':
        return <AboutEditor {...props} />;
      case 'gallery':
        return <GalleryEditor {...propsWithLocation} />;
      case 'hours':
        return <HoursEditor {...props} />;
      case 'contact':
        return <ContactEditor {...props} />;
      case 'social':
        return <SocialEditor {...props} />;
      case 'reviews':
        return <ReviewsEditor {...props} />;
      default:
        return <div className="p-4 text-gray-500">Editor not available for this section type.</div>;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/30 transition-opacity" onClick={onClose} />

      {/* Slide-out Panel */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{metadata.icon}</span>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{metadata.label}</h2>
              <p className="text-sm text-gray-500">{metadata.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{renderEditor()}</div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${
              hasChanges ? 'bg-blue-600 hover:bg-blue-700' : 'cursor-not-allowed bg-gray-400'
            }`}
          >
            {saving ? (
              <>
                <SpinnerGap className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FloppyDisk className="h-4 w-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
