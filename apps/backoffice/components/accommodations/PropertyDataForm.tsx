'use client';

import { useState } from 'react';
import {
  InstagramLogo,
  FacebookLogo,
  TiktokLogo,
  Globe,
  MapPin,
  Plus,
  X,
} from '@phosphor-icons/react';

// ============================================================================
// Types
// ============================================================================

interface SocialLinks {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  website?: string;
}

interface OperatingHours {
  reception?: { open: string; close: string };
  restaurant?: { open: string; close: string };
}

interface PropertyDataFormProps {
  socialLinks: SocialLinks;
  googleMapsUrl: string;
  communicationMethods: string[];
  operatingHours: OperatingHours;
  staffLanguages: string[];
  onChange: (data: {
    socialLinks: SocialLinks;
    googleMapsUrl: string;
    communicationMethods: string[];
    operatingHours: OperatingHours;
    staffLanguages: string[];
  }) => void;
}

// ============================================================================
// Constants
// ============================================================================

const COMMUNICATION_OPTIONS = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'zalo', label: 'Zalo' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'line', label: 'LINE' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
] as const;

const COMMON_LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'vi', label: 'Vietnamese' },
  { value: 'ko', label: 'Korean' },
  { value: 'ja', label: 'Japanese' },
  { value: 'zh', label: 'Chinese' },
  { value: 'th', label: 'Thai' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'es', label: 'Spanish' },
] as const;

// ============================================================================
// Component
// ============================================================================

export default function PropertyDataForm({
  socialLinks,
  googleMapsUrl,
  communicationMethods,
  operatingHours,
  staffLanguages,
  onChange,
}: PropertyDataFormProps) {
  const [otherLangInput, setOtherLangInput] = useState('');

  const updateSocialLink = (key: keyof SocialLinks, value: string) => {
    onChange({
      socialLinks: { ...socialLinks, [key]: value },
      googleMapsUrl,
      communicationMethods,
      operatingHours,
      staffLanguages,
    });
  };

  const toggleCommunication = (method: string) => {
    const updated = communicationMethods.includes(method)
      ? communicationMethods.filter((m) => m !== method)
      : [...communicationMethods, method];
    onChange({
      socialLinks,
      googleMapsUrl,
      communicationMethods: updated,
      operatingHours,
      staffLanguages,
    });
  };

  const updateHours = (
    area: 'reception' | 'restaurant',
    field: 'open' | 'close',
    value: string
  ) => {
    const current = operatingHours[area] || { open: '', close: '' };
    onChange({
      socialLinks,
      googleMapsUrl,
      communicationMethods,
      operatingHours: { ...operatingHours, [area]: { ...current, [field]: value } },
      staffLanguages,
    });
  };

  const toggleLanguage = (lang: string) => {
    const updated = staffLanguages.includes(lang)
      ? staffLanguages.filter((l) => l !== lang)
      : [...staffLanguages, lang];
    onChange({
      socialLinks,
      googleMapsUrl,
      communicationMethods,
      operatingHours,
      staffLanguages: updated,
    });
  };

  const addOtherLanguage = () => {
    const trimmed = otherLangInput.trim();
    if (!trimmed || staffLanguages.includes(trimmed)) return;
    onChange({
      socialLinks,
      googleMapsUrl,
      communicationMethods,
      operatingHours,
      staffLanguages: [...staffLanguages, trimmed],
    });
    setOtherLangInput('');
  };

  const removeLanguage = (lang: string) => {
    onChange({
      socialLinks,
      googleMapsUrl,
      communicationMethods,
      operatingHours,
      staffLanguages: staffLanguages.filter((l) => l !== lang),
    });
  };

  const commonLangValues: string[] = COMMON_LANGUAGES.map((l) => l.value);
  const customLanguages = staffLanguages.filter((l) => !commonLangValues.includes(l));

  return (
    <div className="space-y-6">
      {/* Social Links */}
      <div>
        <label className="mb-3 block text-sm font-medium text-gray-700">Social Links</label>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <InstagramLogo className="h-5 w-5 flex-shrink-0 text-pink-500" weight="duotone" />
            <input
              type="url"
              value={socialLinks.instagram || ''}
              onChange={(e) => updateSocialLink('instagram', e.target.value)}
              placeholder="https://instagram.com/yourproperty"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <FacebookLogo className="h-5 w-5 flex-shrink-0 text-blue-600" weight="duotone" />
            <input
              type="url"
              value={socialLinks.facebook || ''}
              onChange={(e) => updateSocialLink('facebook', e.target.value)}
              placeholder="https://facebook.com/yourproperty"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <TiktokLogo className="h-5 w-5 flex-shrink-0 text-gray-900" weight="duotone" />
            <input
              type="url"
              value={socialLinks.tiktok || ''}
              onChange={(e) => updateSocialLink('tiktok', e.target.value)}
              placeholder="https://tiktok.com/@yourproperty"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 flex-shrink-0 text-gray-500" weight="duotone" />
            <input
              type="url"
              value={socialLinks.website || ''}
              onChange={(e) => updateSocialLink('website', e.target.value)}
              placeholder="https://yourproperty.com"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Google Maps URL */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Google Maps</label>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 flex-shrink-0 text-red-500" weight="duotone" />
          <input
            type="url"
            value={googleMapsUrl}
            onChange={(e) =>
              onChange({
                socialLinks,
                googleMapsUrl: e.target.value,
                communicationMethods,
                operatingHours,
                staffLanguages,
              })
            }
            placeholder="Paste Google Maps link"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Open Google Maps, find your property, click Share, and paste the link
        </p>
      </div>

      {/* Communication Methods */}
      <div>
        <label className="mb-3 block text-sm font-medium text-gray-700">
          Communication Methods
        </label>
        <p className="mb-2 text-xs text-gray-500">How guests can reach you</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {COMMUNICATION_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="has-[:checked]:border-blue-300 has-[:checked]:bg-blue-50 flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 transition-colors hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={communicationMethods.includes(opt.value)}
                onChange={() => toggleCommunication(opt.value)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Operating Hours */}
      <div>
        <label className="mb-3 block text-sm font-medium text-gray-700">Operating Hours</label>
        <div className="space-y-3">
          <div className="rounded-lg border border-gray-200 p-3">
            <p className="mb-2 text-xs font-medium text-gray-600">Reception</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs text-gray-500">Open</label>
                <input
                  type="time"
                  value={operatingHours.reception?.open || ''}
                  onChange={(e) => updateHours('reception', 'open', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">Close</label>
                <input
                  type="time"
                  value={operatingHours.reception?.close || ''}
                  onChange={(e) => updateHours('reception', 'close', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 p-3">
            <p className="mb-2 text-xs font-medium text-gray-600">Restaurant (optional)</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs text-gray-500">Open</label>
                <input
                  type="time"
                  value={operatingHours.restaurant?.open || ''}
                  onChange={(e) => updateHours('restaurant', 'open', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">Close</label>
                <input
                  type="time"
                  value={operatingHours.restaurant?.close || ''}
                  onChange={(e) => updateHours('restaurant', 'close', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Languages */}
      <div>
        <label className="mb-3 block text-sm font-medium text-gray-700">Staff Languages</label>
        <p className="mb-2 text-xs text-gray-500">Languages your staff can communicate in</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {COMMON_LANGUAGES.map((lang) => (
            <label
              key={lang.value}
              className="has-[:checked]:border-blue-300 has-[:checked]:bg-blue-50 flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 transition-colors hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={staffLanguages.includes(lang.value)}
                onChange={() => toggleLanguage(lang.value)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{lang.label}</span>
            </label>
          ))}
        </div>

        {/* Custom languages */}
        {customLanguages.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {customLanguages.map((lang) => (
              <span
                key={lang}
                className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
              >
                {lang}
                <button
                  type="button"
                  onClick={() => removeLanguage(lang)}
                  className="rounded-full p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                >
                  <X className="h-3.5 w-3.5" weight="bold" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Add other language */}
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={otherLangInput}
            onChange={(e) => setOtherLangInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addOtherLanguage();
              }
            }}
            placeholder="Add other language..."
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addOtherLanguage}
            disabled={!otherLangInput.trim()}
            className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
