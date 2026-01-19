'use client';

import { ContactContent } from '@/lib/supabase';

interface ContactEditorProps {
  content: Record<string, unknown>;
  onChange: (content: Record<string, unknown>) => void;
}

export function ContactEditor({ content, onChange }: ContactEditorProps) {
  const contactContent = content as unknown as ContactContent;

  const updateField = (field: keyof ContactContent, value: unknown) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Section Title</label>
        <input
          type="text"
          value={contactContent.title || ''}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="Contact Us"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Display Options */}
      <div>
        <label className="mb-3 block text-sm font-medium text-gray-700">Display Options</label>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="show_phone"
              checked={contactContent.show_phone ?? true}
              onChange={(e) => updateField('show_phone', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="show_phone" className="text-sm text-gray-700">
              Show phone number
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="show_email"
              checked={contactContent.show_email ?? true}
              onChange={(e) => updateField('show_email', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="show_email" className="text-sm text-gray-700">
              Show email address
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="show_map"
              checked={contactContent.show_map ?? true}
              onChange={(e) => updateField('show_map', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="show_map" className="text-sm text-gray-700">
              Show map / directions button
            </label>
          </div>
        </div>
      </div>

      {/* Map Embed URL */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Google Maps Embed URL (optional)
        </label>
        <input
          type="url"
          value={contactContent.map_embed_url || ''}
          onChange={(e) => updateField('map_embed_url', e.target.value)}
          placeholder="https://www.google.com/maps/embed?pb=..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          Get this from Google Maps → Share → Embed a map
        </p>
        {contactContent.map_embed_url && (
          <div className="mt-2 overflow-hidden rounded-lg">
            <iframe
              src={contactContent.map_embed_url}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h4 className="mb-2 font-medium text-blue-900">Contact Information</h4>
        <p className="text-sm text-blue-800">
          Phone number and email are pulled from your location settings. To update them, go to the{' '}
          <strong>General</strong> settings tab.
        </p>
        <a
          href="/settings"
          className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Go to General Settings →
        </a>
      </div>
    </div>
  );
}
