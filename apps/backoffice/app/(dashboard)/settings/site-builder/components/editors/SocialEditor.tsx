'use client';

import { SocialContent } from '@/lib/supabase';

interface SocialEditorProps {
  content: Record<string, unknown>;
  onChange: (content: Record<string, unknown>) => void;
}

const DISPLAY_STYLES = [
  { value: 'buttons', label: 'Buttons', description: 'Large buttons with platform names' },
  { value: 'icons', label: 'Icons', description: 'Compact icons only' },
  { value: 'list', label: 'List', description: 'Vertical list with descriptions' },
] as const;

export function SocialEditor({ content, onChange }: SocialEditorProps) {
  const socialContent = content as unknown as SocialContent;

  const updateField = (field: keyof SocialContent, value: unknown) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Section Title</label>
        <input
          type="text"
          value={socialContent.title || ''}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="Follow Us"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Display Style */}
      <div>
        <label className="mb-3 block text-sm font-medium text-gray-700">Display Style</label>
        <div className="space-y-3">
          {DISPLAY_STYLES.map((style) => (
            <label
              key={style.value}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                socialContent.display_style === style.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="display_style"
                value={style.value}
                checked={socialContent.display_style === style.value}
                onChange={(e) => updateField('display_style', e.target.value)}
                className="mt-0.5 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <div className="font-medium text-gray-900">{style.label}</div>
                <div className="text-sm text-gray-500">{style.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Preview</label>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-lg font-semibold text-gray-900">
            {socialContent.title || 'Follow Us'}
          </h3>

          {socialContent.display_style === 'buttons' && (
            <div className="flex gap-3">
              <div className="flex-1 rounded-lg bg-blue-600 p-3 text-center text-sm font-medium text-white">
                Facebook
              </div>
              <div className="flex-1 rounded-lg bg-pink-500 p-3 text-center text-sm font-medium text-white">
                Instagram
              </div>
              <div className="flex-1 rounded-lg bg-black p-3 text-center text-sm font-medium text-white">
                TikTok
              </div>
            </div>
          )}

          {socialContent.display_style === 'icons' && (
            <div className="flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                f
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-white">
                📷
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                ♪
              </div>
            </div>
          )}

          {socialContent.display_style === 'list' && (
            <div className="space-y-2">
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
                  f
                </div>
                <div>
                  <div className="font-medium">Facebook</div>
                  <div className="text-xs text-gray-500">@yourrestaurant</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-sm text-white">
                  📷
                </div>
                <div>
                  <div className="font-medium">Instagram</div>
                  <div className="text-xs text-gray-500">@yourrestaurant</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h4 className="mb-2 font-medium text-blue-900">Social Media Links</h4>
        <p className="text-sm text-blue-800">
          Social media links are configured in the <strong>Social</strong> settings tab. This
          section displays those links on your customer-facing site.
        </p>
        <a
          href="/settings/social"
          className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Go to Social Settings →
        </a>
      </div>
    </div>
  );
}
