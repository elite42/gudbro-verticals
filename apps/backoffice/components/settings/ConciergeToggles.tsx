'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useToast } from '@/lib/contexts/ToastContext';
import { MapPin, Phone, Shield, Globe, Bus } from '@phosphor-icons/react';

interface SectionToggle {
  id: string;
  label: string;
  description: string;
  icon: typeof MapPin;
}

const SECTIONS: SectionToggle[] = [
  {
    id: 'discover',
    label: 'Discover',
    description: 'Places of interest and local recommendations',
    icon: MapPin,
  },
  {
    id: 'emergency',
    label: 'Emergency',
    description: 'Emergency numbers, embassies, and hotlines',
    icon: Phone,
  },
  {
    id: 'safety',
    label: 'Safety Tips',
    description: 'Scam alerts and practical safety advice',
    icon: Shield,
  },
  {
    id: 'culture',
    label: 'Culture',
    description: "Local customs, etiquette, and dos/don'ts",
    icon: Globe,
  },
  {
    id: 'transport',
    label: 'Transport',
    description: 'How to get around safely and affordably',
    icon: Bus,
  },
];

type Sections = Record<string, boolean>;

export default function ConciergeToggles() {
  const { user } = useAuth();
  const merchantId = user?.id;
  const { addToast } = useToast();
  const [sections, setSections] = useState<Sections | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load current toggles
  useEffect(() => {
    if (!merchantId) return;

    async function load() {
      try {
        const res = await fetch(`/api/settings/concierge?merchantId=${merchantId}`);
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        setSections(data.sections);
      } catch {
        addToast('Failed to load concierge settings', 'error');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [merchantId, addToast]);

  // Save toggle change
  const handleToggle = useCallback(
    async (key: string) => {
      if (!sections || !merchantId || saving) return;

      const updated = { ...sections, [key]: !sections[key] };
      setSections(updated); // Optimistic update
      setSaving(true);

      try {
        const res = await fetch('/api/settings/concierge', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ merchantId, sections: updated }),
        });

        if (!res.ok) throw new Error('Save failed');
        addToast('Concierge settings saved', 'success');
      } catch {
        // Revert optimistic update
        setSections(sections);
        addToast('Failed to save settings', 'error');
      } finally {
        setSaving(false);
      }
    },
    [sections, merchantId, saving, addToast]
  );

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg bg-gray-100" />
        ))}
      </div>
    );
  }

  if (!sections) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
        No property found. Concierge settings require an accommodation property.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {SECTIONS.map((section) => {
        const Icon = section.icon;
        const isOn = sections[section.id] ?? true;

        return (
          <div
            key={section.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50">
                <Icon className="h-4.5 w-4.5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{section.label}</p>
                <p className="text-xs text-gray-500">{section.description}</p>
              </div>
            </div>

            <button
              onClick={() => handleToggle(section.id)}
              disabled={saving}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 ${
                isOn ? 'bg-blue-600' : 'bg-gray-200'
              }`}
              role="switch"
              aria-checked={isOn}
              aria-label={`Toggle ${section.label}`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
                  isOn ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        );
      })}

      <p className="pt-2 text-xs text-gray-400">
        Toggled-off sections will not be visible to guests in the Concierge hub.
      </p>
    </div>
  );
}
