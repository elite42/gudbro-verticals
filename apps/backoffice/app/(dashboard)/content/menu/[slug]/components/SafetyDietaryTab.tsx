'use client';

import { useState } from 'react';
import type {
  MenuItem,
  MenuItemIngredient,
  AllergenFlags,
  IntoleranceFlags,
  DietaryFlags,
} from './types';
import { allergensList, intolerancesList, dietaryList, spiceLevels } from './types';

interface SafetyDietaryTabProps {
  item: MenuItem;
  itemIngredients: MenuItemIngredient[];
  updateItem: <K extends keyof MenuItem>(key: K, value: MenuItem[K]) => void;
  toggleAllergen: (key: keyof AllergenFlags) => void;
  toggleIntolerance: (key: keyof IntoleranceFlags) => void;
  toggleDietary: (key: keyof DietaryFlags) => void;
}

export function SafetyDietaryTab({
  item,
  itemIngredients,
  updateItem,
  toggleAllergen,
  toggleIntolerance,
  toggleDietary,
}: SafetyDietaryTabProps) {
  const [allergenRegionFilter, setAllergenRegionFilter] = useState<string>('all');

  const filteredAllergens =
    allergenRegionFilter === 'all'
      ? allergensList
      : allergensList.filter((a) => a.region === allergenRegionFilter);

  return (
    <div className="space-y-6">
      {/* Data Source Info */}
      {item.safetyDataSource === 'computed' && itemIngredients.length > 0 && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{'\u{2705}'}</span>
            <div>
              <h3 className="font-medium text-green-900">Auto-Computed from Ingredients</h3>
              <p className="text-sm text-green-700">
                Safety data is automatically calculated from{' '}
                {itemIngredients.filter((i) => !i.is_optional).length} ingredients. You can still
                override values manually below.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Allergens */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Allergens</h3>
            <p className="text-sm text-gray-500">
              Sistema 5 Dimensioni - 30 allergens from EU, Korea, Japan + GUDBRO
            </p>
          </div>
          <div className="flex gap-2">
            {['all', 'EU', 'Korea', 'Japan', 'GUDBRO'].map((region) => (
              <button
                key={region}
                onClick={() => setAllergenRegionFilter(region)}
                className={`rounded-full px-3 py-1 text-xs ${
                  allergenRegionFilter === region
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {region === 'all' ? 'All' : region}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {filteredAllergens.map((allergen) => (
            <button
              key={allergen.key}
              onClick={() => toggleAllergen(allergen.key)}
              className={`rounded-lg border p-3 text-center transition-colors ${
                item.allergens[allergen.key]
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">{allergen.icon}</span>
              <p className="mt-1 text-xs font-medium">{allergen.label}</p>
              <p className="text-xs text-gray-400">{allergen.region}</p>
            </button>
          ))}
        </div>
        {Object.entries(item.allergens).filter(([, v]) => v).length > 0 && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-700">
              {'\u{26A0}\u{FE0F}'} <strong>Contains:</strong>{' '}
              {Object.entries(item.allergens)
                .filter(([, v]) => v)
                .map(([k]) => allergensList.find((a) => a.key === k)?.label)
                .join(', ')}
            </p>
          </div>
        )}
      </div>

      {/* Intolerances */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">Intolerances</h3>
        <p className="mb-4 text-sm text-gray-500">
          Select intolerances that may affect sensitive customers
        </p>
        <div className="grid grid-cols-5 gap-2">
          {intolerancesList.map((intolerance) => (
            <button
              key={intolerance.key}
              onClick={() => toggleIntolerance(intolerance.key)}
              className={`rounded-lg border p-3 text-center transition-colors ${
                item.intolerances[intolerance.key]
                  ? 'border-amber-400 bg-amber-50 text-amber-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">{intolerance.icon}</span>
              <p className="mt-1 text-xs font-medium">{intolerance.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Dietary Flags */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">Dietary Compatibility</h3>
        <p className="mb-4 text-sm text-gray-500">Mark which diets this item is suitable for</p>
        <div className="grid grid-cols-4 gap-2">
          {dietaryList.map((diet) => (
            <button
              key={diet.key}
              onClick={() => toggleDietary(diet.key)}
              className={`rounded-lg border p-3 text-center transition-colors ${
                item.dietaryFlags[diet.key]
                  ? diet.positive
                    ? 'border-green-400 bg-green-50 text-green-700'
                    : 'border-red-400 bg-red-50 text-red-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">{diet.icon}</span>
              <p className="mt-1 text-xs font-medium">{diet.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Spice Level */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">Spice Level</h3>
        <p className="mb-4 text-sm text-gray-500">Select the heat level (Scoville scale)</p>
        <div className="flex gap-2">
          {spiceLevels.map((spice) => (
            <button
              key={spice.level}
              onClick={() => updateItem('spiceLevel', spice.level)}
              className={`flex-1 rounded-lg border p-4 text-center transition-colors ${
                item.spiceLevel === spice.level
                  ? spice.level === 0
                    ? 'border-gray-400 bg-gray-100'
                    : 'border-orange-400 bg-orange-50 text-orange-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">{spice.icon}</span>
              <p className="mt-1 text-sm font-medium">{spice.label}</p>
              <p className="text-xs text-gray-400">{spice.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Nutrition */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Nutrition Info</h3>
            <p className="text-sm text-gray-500">
              {item.safetyDataSource === 'computed'
                ? '\u{2705} Auto-calculated from ingredients'
                : '\u{270F}\u{FE0F} Manual entry (add ingredients to auto-calculate)'}
            </p>
          </div>
          {item.calories && (
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">{item.calories}</p>
              <p className="text-sm text-gray-500">kcal / serving</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Calories (kcal)</label>
            <input
              type="number"
              value={item.calories || ''}
              onChange={(e) =>
                updateItem('calories', e.target.value ? Number(e.target.value) : undefined)
              }
              placeholder="e.g. 150"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Protein (g)</label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 5.2"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Carbs (g)</label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 20.5"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Fat (g)</label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 8.0"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-700">
            {'\u{1F4A1}'} <strong>Tip:</strong> Add ingredients with quantities in the Ingredients
            section to automatically calculate nutrition values. Each ingredient has pre-defined
            nutrition data per 100g.
          </p>
        </div>
      </div>
    </div>
  );
}
