'use client';

import { HeroContent } from '@/lib/supabase';
import { ImageUpload } from '@/components/ui/image-upload';

interface HeroEditorProps {
  content: Record<string, unknown>;
  onChange: (content: Record<string, unknown>) => void;
  locationId?: string;
}

export function HeroEditor({ content, onChange, locationId }: HeroEditorProps) {
  const heroContent = content as unknown as HeroContent;

  const updateField = (field: keyof HeroContent, value: unknown) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={heroContent.title || ''}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="Welcome to Our Restaurant"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Subtitle */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Subtitle</label>
        <textarea
          value={heroContent.subtitle || ''}
          onChange={(e) => updateField('subtitle', e.target.value)}
          placeholder="Experience the finest cuisine in town"
          rows={2}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Background Image */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Background Image</label>
        <ImageUpload
          value={heroContent.image_url || ''}
          onChange={(url) => updateField('image_url', url)}
          folder="site-assets"
          locationId={locationId}
          entityId="hero-bg"
          maxSizeMB={10}
          aspectRatio="landscape"
          previewSize="lg"
          helpText="Recommended: 1920x1080px or larger for best quality"
        />
      </div>

      {/* CTA */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Button Text</label>
          <input
            type="text"
            value={heroContent.cta_text || ''}
            onChange={(e) => updateField('cta_text', e.target.value)}
            placeholder="View Menu"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Button Link</label>
          <input
            type="text"
            value={heroContent.cta_link || ''}
            onChange={(e) => updateField('cta_link', e.target.value)}
            placeholder="/menu"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Overlay Opacity */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Overlay Opacity: {Math.round((heroContent.overlay_opacity || 0.4) * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={heroContent.overlay_opacity || 0.4}
          onChange={(e) => updateField('overlay_opacity', parseFloat(e.target.value))}
          className="w-full"
        />
        <p className="mt-1 text-xs text-gray-500">
          Darkens the background image to improve text readability
        </p>
      </div>
    </div>
  );
}
