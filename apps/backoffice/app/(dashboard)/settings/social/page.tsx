'use client';

import { useState, useEffect } from 'react';
import { Loader2, Check, AlertCircle, ExternalLink, Plus, Trash2 } from 'lucide-react';

// ============================================================================
// Types
// ============================================================================

interface CustomLink {
  name: string;
  url: string;
  icon?: string;
}

interface SocialLinks {
  merchantId: string;
  // Global Social Media
  facebookUrl: string;
  instagramHandle: string;
  tiktokHandle: string;
  twitterHandle: string;
  youtubeUrl: string;
  linkedinUrl: string;
  // Asian Platforms
  zaloOaId: string;
  lineId: string;
  kakaotalkChannel: string;
  wechatId: string;
  xiaohongshuId: string;
  // Review Platforms
  googleBusinessUrl: string;
  tripadvisorUrl: string;
  dianpingUrl: string;
  yelpUrl: string;
  // Delivery Platforms
  grabfoodUrl: string;
  shopeefoodUrl: string;
  gojekUrl: string;
  baeminUrl: string;
  foodpandaUrl: string;
  deliverooUrl: string;
  ubereatsUrl: string;
  // Custom
  customLinks: CustomLink[];
}

// ============================================================================
// Platform Configurations
// ============================================================================

const SOCIAL_PLATFORMS = [
  {
    key: 'facebookUrl',
    name: 'Facebook',
    icon: '📘',
    placeholder: 'https://facebook.com/yourpage',
    type: 'url',
  },
  {
    key: 'instagramHandle',
    name: 'Instagram',
    icon: '📸',
    placeholder: 'yourhandle',
    type: 'handle',
    prefix: '@',
  },
  {
    key: 'tiktokHandle',
    name: 'TikTok',
    icon: '🎵',
    placeholder: 'yourhandle',
    type: 'handle',
    prefix: '@',
  },
  {
    key: 'twitterHandle',
    name: 'X (Twitter)',
    icon: '🐦',
    placeholder: 'yourhandle',
    type: 'handle',
    prefix: '@',
  },
  {
    key: 'youtubeUrl',
    name: 'YouTube',
    icon: '📺',
    placeholder: 'https://youtube.com/@yourchannel',
    type: 'url',
  },
  {
    key: 'linkedinUrl',
    name: 'LinkedIn',
    icon: '💼',
    placeholder: 'https://linkedin.com/company/yourcompany',
    type: 'url',
  },
];

const ASIAN_PLATFORMS = [
  {
    key: 'zaloOaId',
    name: 'Zalo OA',
    icon: '💬',
    placeholder: 'Official Account ID',
    type: 'id',
    region: 'Vietnam',
  },
  {
    key: 'lineId',
    name: 'LINE',
    icon: '💚',
    placeholder: '@lineid',
    type: 'handle',
    prefix: '@',
    region: 'Japan, Thailand, Taiwan',
  },
  {
    key: 'kakaotalkChannel',
    name: 'KakaoTalk',
    icon: '💛',
    placeholder: 'Channel URL',
    type: 'url',
    region: 'Korea',
  },
  {
    key: 'wechatId',
    name: 'WeChat',
    icon: '🟢',
    placeholder: 'Official Account ID',
    type: 'id',
    region: 'China',
  },
  {
    key: 'xiaohongshuId',
    name: 'Xiaohongshu (RED)',
    icon: '📕',
    placeholder: 'User ID',
    type: 'id',
    region: 'China',
  },
];

const REVIEW_PLATFORMS = [
  {
    key: 'googleBusinessUrl',
    name: 'Google Business',
    icon: '🔍',
    placeholder: 'https://g.page/yourbusiness',
    type: 'url',
  },
  {
    key: 'tripadvisorUrl',
    name: 'TripAdvisor',
    icon: '🦉',
    placeholder: 'https://tripadvisor.com/Restaurant-...',
    type: 'url',
  },
  {
    key: 'dianpingUrl',
    name: 'Dianping',
    icon: '⭐',
    placeholder: 'https://dianping.com/shop/...',
    type: 'url',
    region: 'China',
  },
  {
    key: 'yelpUrl',
    name: 'Yelp',
    icon: '🔴',
    placeholder: 'https://yelp.com/biz/...',
    type: 'url',
  },
];

const DELIVERY_PLATFORMS = [
  {
    key: 'grabfoodUrl',
    name: 'GrabFood',
    icon: '🟢',
    placeholder: 'https://food.grab.com/...',
    type: 'url',
    region: 'SEA',
  },
  {
    key: 'shopeefoodUrl',
    name: 'ShopeeFood',
    icon: '🧡',
    placeholder: 'https://shopeefood.vn/...',
    type: 'url',
    region: 'SEA',
  },
  {
    key: 'gojekUrl',
    name: 'GoFood',
    icon: '🟢',
    placeholder: 'https://gofood.co.id/...',
    type: 'url',
    region: 'Indonesia',
  },
  {
    key: 'baeminUrl',
    name: 'Baemin',
    icon: '🩵',
    placeholder: 'https://baemin.vn/...',
    type: 'url',
    region: 'Vietnam, Korea',
  },
  {
    key: 'foodpandaUrl',
    name: 'Foodpanda',
    icon: '🩷',
    placeholder: 'https://foodpanda.com/...',
    type: 'url',
    region: 'Asia, Europe',
  },
  {
    key: 'deliverooUrl',
    name: 'Deliveroo',
    icon: '🔵',
    placeholder: 'https://deliveroo.com/...',
    type: 'url',
    region: 'Europe, Asia',
  },
  {
    key: 'ubereatsUrl',
    name: 'UberEats',
    icon: '⚫',
    placeholder: 'https://ubereats.com/...',
    type: 'url',
    region: 'Global',
  },
];

// ============================================================================
// Demo merchant ID
// ============================================================================
const DEMO_MERCHANT_ID = '00000000-0000-0000-0000-000000000001';

// ============================================================================
// Component
// ============================================================================

export default function SocialSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [links, setLinks] = useState<SocialLinks>({
    merchantId: DEMO_MERCHANT_ID,
    facebookUrl: '',
    instagramHandle: '',
    tiktokHandle: '',
    twitterHandle: '',
    youtubeUrl: '',
    linkedinUrl: '',
    zaloOaId: '',
    lineId: '',
    kakaotalkChannel: '',
    wechatId: '',
    xiaohongshuId: '',
    googleBusinessUrl: '',
    tripadvisorUrl: '',
    dianpingUrl: '',
    yelpUrl: '',
    grabfoodUrl: '',
    shopeefoodUrl: '',
    gojekUrl: '',
    baeminUrl: '',
    foodpandaUrl: '',
    deliverooUrl: '',
    ubereatsUrl: '',
    customLinks: [],
  });

  // Load links on mount
  useEffect(() => {
    const loadLinks = async () => {
      try {
        const response = await fetch(`/api/settings/social?merchantId=${DEMO_MERCHANT_ID}`);
        const data = await response.json();

        if (data.links) {
          setLinks((prev) => ({ ...prev, ...data.links }));
        }
      } catch (err) {
        console.error('Error loading social links:', err);
        setError('Failed to load social links');
      } finally {
        setIsLoading(false);
      }
    };

    loadLinks();
  }, []);

  // Save links
  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setError(null);

    try {
      const response = await fetch('/api/settings/social', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(links),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save');
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving:', err);
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  // Update a link value
  const updateLink = (key: string, value: string) => {
    setLinks((prev) => ({ ...prev, [key]: value }));
  };

  // Add custom link
  const addCustomLink = () => {
    setLinks((prev) => ({
      ...prev,
      customLinks: [...prev.customLinks, { name: '', url: '' }],
    }));
  };

  // Update custom link
  const updateCustomLink = (index: number, field: 'name' | 'url', value: string) => {
    setLinks((prev) => ({
      ...prev,
      customLinks: prev.customLinks.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      ),
    }));
  };

  // Remove custom link
  const removeCustomLink = (index: number) => {
    setLinks((prev) => ({
      ...prev,
      customLinks: prev.customLinks.filter((_, i) => i !== index),
    }));
  };

  // Count filled links
  const filledCount =
    Object.entries(links).filter(
      ([key, value]) => key !== 'merchantId' && key !== 'customLinks' && value
    ).length + links.customLinks.filter((l) => l.url).length;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Social & Platforms</h1>
        <p className="mt-1 text-sm text-gray-500">
          Add your social media profiles and delivery platform links. These will be displayed on
          your digital menu.
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 rounded-lg bg-blue-50 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
          <span className="text-lg font-bold text-blue-600">{filledCount}</span>
        </div>
        <div>
          <p className="font-medium text-blue-900">Platforms Connected</p>
          <p className="text-sm text-blue-700">Links will appear on your digital menu</p>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Social Media Section */}
      <PlatformSection
        title="Social Media"
        description="Your main social media profiles"
        platforms={SOCIAL_PLATFORMS}
        links={links}
        onUpdate={updateLink}
      />

      {/* Asian Platforms Section */}
      <PlatformSection
        title="Asian Platforms"
        description="Popular messaging and social apps in Asia"
        platforms={ASIAN_PLATFORMS}
        links={links}
        onUpdate={updateLink}
      />

      {/* Review Platforms Section */}
      <PlatformSection
        title="Review Platforms"
        description="Where customers can find and review you"
        platforms={REVIEW_PLATFORMS}
        links={links}
        onUpdate={updateLink}
      />

      {/* Delivery Platforms Section */}
      <PlatformSection
        title="Delivery Platforms"
        description="Food delivery apps where you're listed"
        platforms={DELIVERY_PLATFORMS}
        links={links}
        onUpdate={updateLink}
      />

      {/* Custom Links Section */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Custom Links</h3>
            <p className="text-sm text-gray-500">Add any other platforms or links</p>
          </div>
          <button
            onClick={addCustomLink}
            className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            <Plus className="h-4 w-4" />
            Add Link
          </button>
        </div>

        {links.customLinks.length === 0 ? (
          <p className="py-4 text-center text-sm text-gray-400">No custom links added yet</p>
        ) : (
          <div className="space-y-3">
            {links.customLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={link.name}
                  onChange={(e) => updateCustomLink(index, 'name', e.target.value)}
                  placeholder="Platform name"
                  className="w-40 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => updateCustomLink(index, 'url', e.target.value)}
                  placeholder="https://..."
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeCustomLink(index)}
                  className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Request New Platform */}
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
            <span className="text-lg">💡</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">Missing a platform?</h3>
            <p className="mt-1 text-sm text-gray-600">
              Don&apos;t see the social network or delivery platform you use? Let us know and
              we&apos;ll add it!
            </p>
            <a
              href="mailto:support@gudbro.com?subject=Platform Request&body=Hi GUDBRO team,%0A%0AI would like to request support for the following platform:%0A%0APlatform name: %0AWebsite/Link: %0ARegion: %0A%0AThank you!"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-200"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Request a Platform
            </a>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <div>
          {saveSuccess && (
            <span className="flex items-center gap-1 text-sm text-green-600">
              <Check className="h-4 w-4" />
              Links saved successfully!
            </span>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Links'
          )}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Platform Section Component
// ============================================================================

interface Platform {
  key: string;
  name: string;
  icon: string;
  placeholder: string;
  type: string;
  prefix?: string;
  region?: string;
}

interface PlatformSectionProps {
  title: string;
  description: string;
  platforms: Platform[];
  links: SocialLinks;
  onUpdate: (key: string, value: string) => void;
}

function PlatformSection({ title, description, platforms, links, onUpdate }: PlatformSectionProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {platforms.map((platform) => {
          const value = (links[platform.key as keyof SocialLinks] as string) || '';
          const hasValue = !!value;

          return (
            <div key={platform.key} className="relative">
              <label className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-700">
                <span>{platform.icon}</span>
                <span>{platform.name}</span>
                {platform.region && (
                  <span className="text-xs text-gray-400">({platform.region})</span>
                )}
              </label>
              <div className="relative">
                {platform.prefix && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {platform.prefix}
                  </span>
                )}
                <input
                  type={platform.type === 'url' ? 'url' : 'text'}
                  value={value}
                  onChange={(e) => onUpdate(platform.key, e.target.value)}
                  placeholder={platform.placeholder}
                  className={`w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                    hasValue ? 'border-green-300 bg-green-50' : 'border-gray-300'
                  } ${platform.prefix ? 'pl-7' : ''}`}
                />
                {hasValue && platform.type === 'url' && (
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
