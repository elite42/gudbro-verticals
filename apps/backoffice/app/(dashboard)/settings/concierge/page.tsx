'use client';

import ConciergeToggles from '@/components/settings/ConciergeToggles';

export default function ConciergeSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Concierge Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Control which concierge sections are visible to your guests.
        </p>
      </div>

      <ConciergeToggles />
    </div>
  );
}
