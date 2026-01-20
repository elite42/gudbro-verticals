'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Globe, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { SectionList } from './components/SectionList';
import { SectionEditor } from './components/SectionEditor';
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

// ============================================================================
// Section Metadata
// ============================================================================

const SECTION_METADATA: Record<
  SiteSectionType,
  { label: string; description: string; icon: string }
> = {
  hero: {
    label: 'Hero Banner',
    description: 'Main banner with title, subtitle, and call-to-action',
    icon: '🎯',
  },
  about: {
    label: 'About Us',
    description: 'Business description, team members, and values',
    icon: '📖',
  },
  gallery: {
    label: 'Photo Gallery',
    description: 'Showcase images of your venue and products',
    icon: '🖼️',
  },
  hours: {
    label: 'Opening Hours',
    description: 'Display operating hours and status badge',
    icon: '🕐',
  },
  contact: {
    label: 'Contact Info',
    description: 'Phone, email, and map location',
    icon: '📞',
  },
  social: {
    label: 'Social Media',
    description: 'Links to your social media profiles',
    icon: '🌐',
  },
  reviews: {
    label: 'Reviews',
    description: 'Customer testimonials and review platform links',
    icon: '⭐',
  },
};

// ============================================================================
// Main Component
// ============================================================================

export default function SiteBuilderPage() {
  const t = useTranslations('siteBuilderPage');
  // State
  const [sections, setSections] = useState<SiteSectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<SiteSectionData | null>(null);

  // TODO: Get from tenant context
  const locationId = 'demo-location-id';

  // ============================================================================
  // Data Fetching
  // ============================================================================

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/site-sections?locationId=${locationId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch sections');
      }

      setSections(data.sections || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sections');
    } finally {
      setLoading(false);
    }
  };

  // ============================================================================
  // Section Operations
  // ============================================================================

  const handleToggleEnabled = async (section: SiteSectionData) => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/site-sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationId,
          sectionType: section.sectionType,
          isEnabled: !section.isEnabled,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update section');
      }

      // Update local state
      setSections((prev) =>
        prev.map((s) => (s.id === section.id ? { ...s, isEnabled: !s.isEnabled } : s))
      );

      showSuccess('Section updated');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update section');
    } finally {
      setSaving(false);
    }
  };

  const handleReorder = async (orderedIds: string[]) => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/site-sections/reorder', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationId,
          orderedSectionIds: orderedIds,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reorder sections');
      }

      // Update local state with new order
      setSections((prev) => {
        const sectionMap = new Map(prev.map((s) => [s.id, s]));
        return orderedIds.map((id, index) => ({
          ...sectionMap.get(id)!,
          displayOrder: index,
        }));
      });

      showSuccess('Order saved');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reorder sections');
      // Refresh to restore original order
      fetchSections();
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSection = async (
    sectionType: SiteSectionType,
    content: Record<string, unknown>
  ) => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/site-sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationId,
          sectionType,
          content,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save section');
      }

      // Update local state
      setSections((prev) =>
        prev.map((s) =>
          s.sectionType === sectionType ? { ...s, content, updatedAt: new Date().toISOString() } : s
        )
      );

      showSuccess('Section saved');
      setEditingSection(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save section');
    } finally {
      setSaving(false);
    }
  };

  const handlePublishAll = async () => {
    setPublishing(true);
    setError(null);

    try {
      const response = await fetch('/api/site-sections/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to publish sections');
      }

      // Update local state
      setSections((prev) =>
        prev.map((s) => (s.isEnabled ? { ...s, publishedAt: data.publishedAt } : s))
      );

      showSuccess(`${data.publishedSections?.length || 0} sections published`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to publish sections');
    } finally {
      setPublishing(false);
    }
  };

  // ============================================================================
  // Helpers
  // ============================================================================

  const showSuccess = (message: string) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 3000);
  };

  const hasUnpublishedChanges = sections.some(
    (s) => s.isEnabled && (!s.publishedAt || new Date(s.updatedAt) > new Date(s.publishedAt))
  );

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <InfoTooltip contentKey="pages.siteBuilder" kbPageId="settings-site-builder" />
          </div>
          <p className="mt-1 text-sm text-gray-500">{t('subtitle')}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Preview Button */}
          <a
            href="/preview"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Globe className="h-4 w-4" />
            {t('preview')}
          </a>

          {/* Publish Button */}
          <button
            onClick={handlePublishAll}
            disabled={publishing || !hasUnpublishedChanges}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${
              hasUnpublishedChanges
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'cursor-not-allowed bg-gray-400'
            }`}
          >
            {publishing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                {hasUnpublishedChanges ? 'Publish Changes' : 'All Published'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
          <p>{success}</p>
        </div>
      )}

      {/* Main Content */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="font-semibold text-gray-900">Site Sections</h2>
            <p className="mt-1 text-sm text-gray-500">
              Drag to reorder. Toggle to enable/disable. Click to edit content.
            </p>
          </div>

          <SectionList
            sections={sections}
            sectionMetadata={SECTION_METADATA}
            onReorder={handleReorder}
            onToggleEnabled={handleToggleEnabled}
            onEdit={setEditingSection}
            saving={saving}
          />
        </div>
      )}

      {/* Section Editor Slide-out */}
      {editingSection && (
        <SectionEditor
          section={editingSection}
          metadata={SECTION_METADATA[editingSection.sectionType]}
          onSave={(content) => handleSaveSection(editingSection.sectionType, content)}
          onClose={() => setEditingSection(null)}
          saving={saving}
        />
      )}
    </div>
  );
}
