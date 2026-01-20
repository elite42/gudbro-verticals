'use client';

import { Plus, Trash2, GripVertical } from 'lucide-react';
import { GalleryContent } from '@/lib/supabase';
import { ImageUpload } from '@/components/ui/image-upload';

interface GalleryEditorProps {
  content: Record<string, unknown>;
  onChange: (content: Record<string, unknown>) => void;
  locationId?: string;
}

export function GalleryEditor({ content, onChange, locationId }: GalleryEditorProps) {
  const galleryContent = content as unknown as GalleryContent;

  const updateField = (field: keyof GalleryContent, value: unknown) => {
    onChange({ ...content, [field]: value });
  };

  // Image helpers
  const addImage = () => {
    const images = galleryContent.images || [];
    updateField('images', [...images, { url: '', alt: '', caption: '' }]);
  };

  const updateImage = (index: number, field: string, value: string) => {
    const images = [...(galleryContent.images || [])];
    images[index] = { ...images[index], [field]: value };
    updateField('images', images);
  };

  const removeImage = (index: number) => {
    const images = [...(galleryContent.images || [])];
    images.splice(index, 1);
    updateField('images', images);
  };

  const moveImage = (from: number, to: number) => {
    const images = [...(galleryContent.images || [])];
    const [removed] = images.splice(from, 1);
    images.splice(to, 0, removed);
    updateField('images', images);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Section Title</label>
        <input
          type="text"
          value={galleryContent.title || ''}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="Gallery"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Images */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Images ({(galleryContent.images || []).length})
          </label>
          <button
            onClick={addImage}
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Image
          </button>
        </div>

        <div className="space-y-4">
          {(galleryContent.images || []).map((image, index) => (
            <div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 cursor-grab text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">Image {index + 1}</span>
                </div>
                <div className="flex items-center gap-2">
                  {index > 0 && (
                    <button
                      onClick={() => moveImage(index, index - 1)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Move Up
                    </button>
                  )}
                  {index < (galleryContent.images?.length || 0) - 1 && (
                    <button
                      onClick={() => moveImage(index, index + 1)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Move Down
                    </button>
                  )}
                  <button
                    onClick={() => removeImage(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid gap-3">
                <ImageUpload
                  value={image.url}
                  onChange={(url) => updateImage(index, 'url', url)}
                  folder="locations"
                  locationId={locationId}
                  entityId={`gallery-${index}`}
                  maxSizeMB={5}
                  aspectRatio="landscape"
                  previewSize="lg"
                />
                <input
                  type="text"
                  value={image.alt || ''}
                  onChange={(e) => updateImage(index, 'alt', e.target.value)}
                  placeholder="Alt text (for accessibility)"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={image.caption || ''}
                  onChange={(e) => updateImage(index, 'caption', e.target.value)}
                  placeholder="Caption (optional)"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}

          {(galleryContent.images || []).length === 0 && (
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
              <p className="text-sm text-gray-500">
                No images added yet. Click "Add Image" to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
