'use client';

import type { MenuItem, TabId } from './types';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'basic', label: 'Basic Info', icon: '\u{1F4DD}' },
  { id: 'ingredients', label: 'Ingredients', icon: '\u{1F957}' },
  { id: 'safety', label: 'Safety & Dietary', icon: '\u{26A0}\u{FE0F}' },
  { id: 'customizations', label: 'Customizations', icon: '\u{2699}\u{FE0F}' },
  { id: 'availability', label: 'Availability', icon: '\u{1F4C5}' },
  { id: 'seo', label: 'SEO & Tags', icon: '\u{1F3F7}\u{FE0F}' },
];

interface EditorHeaderProps {
  item: MenuItem;
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  hasChanges: boolean;
  isSaving: boolean;
  onSave: () => void;
  onBack: () => void;
  onPreview: () => void;
}

export function EditorHeader({
  item,
  activeTab,
  setActiveTab,
  hasChanges,
  isSaving,
  onSave,
  onBack,
  onPreview,
}: EditorHeaderProps) {
  return (
    <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              &larr; Back
            </button>
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <a href="/content/menu" className="hover:text-gray-700">
                  Menu
                </a>
                <span>/</span>
                <span className="text-gray-900">{item.name.en}</span>
              </div>
              <h1 className="mt-1 flex items-center gap-2 text-xl font-bold text-gray-900">
                {item.name.en}
                {item.isFeatured && <span className="text-yellow-500">{'\u{2B50}'}</span>}
                {item.isNew && (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                    NEW
                  </span>
                )}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {hasChanges && (
              <span className="flex items-center gap-1 text-sm text-amber-600">
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                Unsaved changes
              </span>
            )}
            <button
              onClick={onPreview}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Preview
            </button>
            <button
              onClick={onSave}
              disabled={!hasChanges || isSaving}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                hasChanges
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'cursor-not-allowed bg-gray-200 text-gray-500'
              }`}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="-mb-px mt-4 flex gap-1 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="mr-1.5">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
