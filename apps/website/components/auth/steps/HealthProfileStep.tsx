'use client';

import { useState } from 'react';
import type { HealthProfileData } from '@/lib/auth-service';

interface HealthProfileStepProps {
  onSubmit: (profile: HealthProfileData) => void;
  onSkip: () => void;
  onBack: () => void;
  isLoading: boolean;
}

// Common allergens
const ALLERGENS = [
  { id: 'gluten', label: 'Gluten', icon: 'wheat' },
  { id: 'milk', label: 'Dairy/Milk', icon: 'milk' },
  { id: 'eggs', label: 'Eggs', icon: 'egg' },
  { id: 'fish', label: 'Fish', icon: 'fish' },
  { id: 'shellfish', label: 'Shellfish', icon: 'shrimp' },
  { id: 'tree_nuts', label: 'Tree Nuts', icon: 'nut' },
  { id: 'peanuts', label: 'Peanuts', icon: 'peanut' },
  { id: 'soy', label: 'Soy', icon: 'soy' },
  { id: 'sesame', label: 'Sesame', icon: 'sesame' },
  { id: 'celery', label: 'Celery', icon: 'celery' },
  { id: 'mustard', label: 'Mustard', icon: 'mustard' },
  { id: 'sulfites', label: 'Sulfites', icon: 'wine' },
];

// Common dietary preferences
const DIETARY = [
  { id: 'vegetarian', label: 'Vegetarian', description: 'No meat or fish' },
  { id: 'vegan', label: 'Vegan', description: 'No animal products' },
  { id: 'pescatarian', label: 'Pescatarian', description: 'Fish but no meat' },
  { id: 'halal', label: 'Halal', description: 'Islamic dietary law' },
  { id: 'kosher', label: 'Kosher', description: 'Jewish dietary law' },
  { id: 'gluten_free', label: 'Gluten Free', description: 'No gluten grains' },
  { id: 'dairy_free', label: 'Dairy Free', description: 'No dairy products' },
  { id: 'keto', label: 'Keto', description: 'Low carb, high fat' },
  { id: 'paleo', label: 'Paleo', description: 'Whole foods only' },
];

// Intolerances
const INTOLERANCES = [
  { id: 'lactose', label: 'Lactose' },
  { id: 'fructose', label: 'Fructose' },
  { id: 'histamine', label: 'Histamine' },
  { id: 'caffeine', label: 'Caffeine' },
  { id: 'fodmap', label: 'FODMAPs' },
];

export function HealthProfileStep({
  onSubmit,
  onSkip,
  onBack,
  isLoading,
}: HealthProfileStepProps) {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedIntolerances, setSelectedIntolerances] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'allergens' | 'dietary' | 'intolerances'>('allergens');

  const toggleAllergen = (id: string) => {
    setSelectedAllergens(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const toggleDietary = (id: string) => {
    setSelectedDietary(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const toggleIntolerance = (id: string) => {
    setSelectedIntolerances(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const profile: HealthProfileData = {
      allergens: Object.fromEntries(ALLERGENS.map(a => [a.id, selectedAllergens.includes(a.id)])),
      dietary: Object.fromEntries(DIETARY.map(d => [d.id, selectedDietary.includes(d.id)])),
      intolerances: Object.fromEntries(INTOLERANCES.map(i => [i.id, selectedIntolerances.includes(i.id)])),
    };
    onSubmit(profile);
  };

  const totalSelected = selectedAllergens.length + selectedDietary.length + selectedIntolerances.length;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
          *
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Set up your health profile
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          This helps restaurants show you safe menu items
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('allergens')}
          className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'allergens'
              ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Allergens
          {selectedAllergens.length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full">
              {selectedAllergens.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('dietary')}
          className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'dietary'
              ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Dietary
          {selectedDietary.length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full">
              {selectedDietary.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('intolerances')}
          className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'intolerances'
              ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Intolerances
          {selectedIntolerances.length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 rounded-full">
              {selectedIntolerances.length}
            </span>
          )}
        </button>
      </div>

      {/* Allergens Tab */}
      {activeTab === 'allergens' && (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Select any allergens you need to avoid:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {ALLERGENS.map(allergen => (
              <button
                key={allergen.id}
                onClick={() => toggleAllergen(allergen.id)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  selectedAllergens.includes(allergen.id)
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {allergen.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dietary Tab */}
      {activeTab === 'dietary' && (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Select your dietary preferences:
          </p>
          <div className="space-y-2">
            {DIETARY.map(diet => (
              <button
                key={diet.id}
                onClick={() => toggleDietary(diet.id)}
                className={`w-full p-3 rounded-xl border-2 text-left transition-all ${
                  selectedDietary.includes(diet.id)
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white block">
                  {diet.label}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {diet.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Intolerances Tab */}
      {activeTab === 'intolerances' && (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Select any food intolerances:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {INTOLERANCES.map(intolerance => (
              <button
                key={intolerance.id}
                onClick={() => toggleIntolerance(intolerance.id)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  selectedIntolerances.includes(intolerance.id)
                    ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {intolerance.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {totalSelected > 0 && (
        <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">{totalSelected}</span> preferences selected.
            You can update these anytime in your profile.
          </p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="py-3 px-4 text-gray-500 dark:text-gray-400 font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-all"
        >
          Skip
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex-1 py-3 px-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="inline-flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </span>
          ) : (
            'Save & Continue'
          )}
        </button>
      </div>
    </div>
  );
}
