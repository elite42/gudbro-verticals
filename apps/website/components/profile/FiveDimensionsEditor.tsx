'use client';

import { useState } from 'react';

export interface HealthProfile {
  allergens: string[];
  dietaryPreferences: string[];
  intolerances: string[];
  healthConditions: string[];
  tastePreferences: string[];
}

interface FiveDimensionsEditorProps {
  data: HealthProfile;
  onUpdate: (data: HealthProfile) => void;
  onSave?: () => void;
  isSaving?: boolean;
}

// 5 Dimensions options
const allergenOptions = [
  { id: 'gluten', label: 'Gluten', icon: '🌾' },
  { id: 'dairy', label: 'Dairy', icon: '🥛' },
  { id: 'eggs', label: 'Eggs', icon: '🥚' },
  { id: 'peanuts', label: 'Peanuts', icon: '🥜' },
  { id: 'tree_nuts', label: 'Tree Nuts', icon: '🌰' },
  { id: 'soy', label: 'Soy', icon: '🫘' },
  { id: 'fish', label: 'Fish', icon: '🐟' },
  { id: 'shellfish', label: 'Shellfish', icon: '🦐' },
  { id: 'sesame', label: 'Sesame', icon: '🌱' },
  { id: 'mustard', label: 'Mustard', icon: '🟡' },
  { id: 'celery', label: 'Celery', icon: '🥬' },
  { id: 'lupin', label: 'Lupin', icon: '🌸' },
  { id: 'molluscs', label: 'Molluscs', icon: '🦪' },
  { id: 'sulfites', label: 'Sulfites', icon: '🍷' },
];

const dietaryOptions = [
  { id: 'vegetarian', label: 'Vegetarian', icon: '🥗', description: 'No meat or fish' },
  { id: 'vegan', label: 'Vegan', icon: '🌱', description: 'No animal products' },
  { id: 'pescatarian', label: 'Pescatarian', icon: '🐟', description: 'Fish but no meat' },
  { id: 'halal', label: 'Halal', icon: '☪️', description: 'Islamic dietary laws' },
  { id: 'kosher', label: 'Kosher', icon: '✡️', description: 'Jewish dietary laws' },
  { id: 'keto', label: 'Keto', icon: '🥑', description: 'High fat, low carb' },
  { id: 'paleo', label: 'Paleo', icon: '🥩', description: 'Whole foods only' },
  { id: 'low_carb', label: 'Low Carb', icon: '📉', description: 'Reduced carbohydrates' },
  { id: 'low_sodium', label: 'Low Sodium', icon: '🧂', description: 'Reduced salt' },
  { id: 'diabetic', label: 'Diabetic Friendly', icon: '💉', description: 'Blood sugar conscious' },
];

const intoleranceOptions = [
  { id: 'lactose', label: 'Lactose Intolerant', icon: '🥛', description: 'Cannot digest milk sugar' },
  { id: 'fructose', label: 'Fructose Intolerant', icon: '🍎', description: 'Cannot digest fruit sugar' },
  { id: 'histamine', label: 'Histamine Intolerant', icon: '🧪', description: 'Sensitive to histamine' },
  { id: 'fodmap', label: 'Low FODMAP', icon: '🫃', description: 'Avoid fermentable carbs' },
];

const healthConditionOptions = [
  { id: 'diabetes', label: 'Diabetes', icon: '💉' },
  { id: 'hypertension', label: 'Hypertension', icon: '❤️' },
  { id: 'celiac', label: 'Celiac Disease', icon: '🌾' },
  { id: 'ibs', label: 'IBS', icon: '🫃' },
  { id: 'gerd', label: 'GERD/Acid Reflux', icon: '🔥' },
  { id: 'pregnancy', label: 'Pregnancy', icon: '🤰' },
];

const tasteOptions = [
  { id: 'no_spicy', label: 'No Spicy Food', icon: '🌶️', description: 'Avoid all spicy dishes' },
  { id: 'mild_spicy', label: 'Mild Spicy Only', icon: '🔥', description: 'Light heat is okay' },
  { id: 'love_spicy', label: 'Love Spicy', icon: '🌶️🔥', description: 'Bring on the heat!' },
  { id: 'no_raw', label: 'No Raw Food', icon: '🍣', description: 'All food cooked' },
  { id: 'no_alcohol', label: 'No Alcohol in Dishes', icon: '🍷', description: 'Even in cooking' },
  { id: 'no_pork', label: 'No Pork', icon: '🐷', description: 'Avoid pork products' },
  { id: 'no_beef', label: 'No Beef', icon: '🐄', description: 'Avoid beef products' },
];

type DimensionTab = 'allergens' | 'diets' | 'intolerances' | 'conditions' | 'tastes';

export function FiveDimensionsEditor({
  data,
  onUpdate,
  onSave,
  isSaving = false,
}: FiveDimensionsEditorProps) {
  const [activeTab, setActiveTab] = useState<DimensionTab>('allergens');

  const handleToggle = (field: keyof HealthProfile, value: string) => {
    const current = data[field];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onUpdate({ ...data, [field]: updated });
  };

  const tabs: { id: DimensionTab; label: string; icon: string; count: number }[] = [
    { id: 'allergens', label: 'Allergens', icon: '⚠️', count: data.allergens.length },
    { id: 'diets', label: 'Diets', icon: '🥗', count: data.dietaryPreferences.length },
    { id: 'intolerances', label: 'Intolerances', icon: '🧪', count: data.intolerances.length },
    { id: 'conditions', label: 'Health', icon: '❤️', count: data.healthConditions.length },
    { id: 'tastes', label: 'Preferences', icon: '😋', count: data.tastePreferences.length },
  ];

  const totalSelected = tabs.reduce((sum, tab) => sum + tab.count, 0);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Food Preferences
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              These preferences sync automatically when you visit partner restaurants
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{totalSelected}</span>
            <p className="text-xs text-gray-500 dark:text-gray-400">preferences set</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-0 px-4 py-3 text-center text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="hidden sm:block mt-0.5">{tab.label}</span>
            {tab.count > 0 && (
              <span className="absolute top-1 right-1 sm:top-2 sm:right-2 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Allergens */}
        {activeTab === 'allergens' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Allergens are strictly filtered - dishes containing these will be hidden</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {allergenOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleToggle('allergens', option.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left ${
                    data.allergens.includes(option.id)
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-xl">{option.icon}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Diets */}
        {activeTab === 'diets' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dietaryOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleToggle('dietaryPreferences', option.id)}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                  data.dietaryPreferences.includes(option.id)
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-2xl">{option.icon}</span>
                <div>
                  <span className="font-medium block">{option.label}</span>
                  <span className="text-xs opacity-70">{option.description}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Intolerances */}
        {activeTab === 'intolerances' && (
          <div className="space-y-3">
            {intoleranceOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleToggle('intolerances', option.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                  data.intolerances.includes(option.id)
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-3xl">{option.icon}</span>
                <div>
                  <span className="font-medium block">{option.label}</span>
                  <span className="text-sm opacity-70">{option.description}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Health Conditions */}
        {activeTab === 'conditions' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Optional: Help us recommend dishes suitable for your health needs
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {healthConditionOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleToggle('healthConditions', option.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left ${
                    data.healthConditions.includes(option.id)
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-xl">{option.icon}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Taste Preferences */}
        {activeTab === 'tastes' && (
          <div className="space-y-3">
            {tasteOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleToggle('tastePreferences', option.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                  data.tastePreferences.includes(option.id)
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-2xl">{option.icon}</span>
                <div>
                  <span className="font-medium block">{option.label}</span>
                  <span className="text-sm opacity-70">{option.description}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Save button */}
      {onSave && (
        <div className="p-6 pt-0">
          <button
            onClick={onSave}
            disabled={isSaving}
            className="w-full py-3 px-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      )}
    </div>
  );
}
