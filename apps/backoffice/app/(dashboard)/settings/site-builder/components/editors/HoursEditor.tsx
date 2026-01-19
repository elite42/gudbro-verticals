'use client';

import { HoursContent } from '@/lib/supabase';

interface HoursEditorProps {
  content: Record<string, unknown>;
  onChange: (content: Record<string, unknown>) => void;
}

export function HoursEditor({ content, onChange }: HoursEditorProps) {
  const hoursContent = content as unknown as HoursContent;

  const updateField = (field: keyof HoursContent, value: unknown) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Section Title</label>
        <input
          type="text"
          value={hoursContent.title || ''}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="Opening Hours"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Show Status Badge */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="show_status_badge"
          checked={hoursContent.show_status_badge ?? true}
          onChange={(e) => updateField('show_status_badge', e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="show_status_badge" className="text-sm text-gray-700">
          Show "Open Now" / "Closed" status badge
        </label>
      </div>

      {/* Info Box */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h4 className="mb-2 font-medium text-blue-900">About this section</h4>
        <p className="text-sm text-blue-800">
          Opening hours are configured in the <strong>Hours</strong> settings tab. This section
          displays those hours on your customer-facing site.
        </p>
        <a
          href="/settings/hours"
          className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Go to Hours Settings →
        </a>
      </div>

      {/* Preview */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Preview</label>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {hoursContent.title || 'Opening Hours'}
            </h3>
            {hoursContent.show_status_badge && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                Open Now
              </span>
            )}
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Monday - Friday</span>
              <span>09:00 - 22:00</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday - Sunday</span>
              <span>10:00 - 23:00</span>
            </div>
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          This is a preview. Actual hours come from your Hours settings.
        </p>
      </div>
    </div>
  );
}
