'use client';

import { useState } from 'react';

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  notes?: string;
}

interface NutritionData {
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

interface ServingsSelectorProps {
  defaultServings: number;
  ingredients: Ingredient[];
  allergens?: string[];
  nutritionPerServing?: NutritionData;
}

export function ServingsSelector({ defaultServings, ingredients, allergens = [], nutritionPerServing }: ServingsSelectorProps) {
  const [servings, setServings] = useState(defaultServings);
  const [showAllergenWarning, setShowAllergenWarning] = useState(false);
  const [portionBoost, setPortionBoost] = useState(0); // 0% to 100% extra

  const ratio = servings / defaultServings;
  const boostMultiplier = 1 + (portionBoost / 100);
  const totalMultiplier = ratio * boostMultiplier;

  const formatAmount = (amount: number): string => {
    const scaled = amount * totalMultiplier;
    // Round to 1 decimal place, remove trailing zeros
    if (scaled < 0.1) return scaled.toFixed(2);
    if (scaled < 1) return scaled.toFixed(1);
    if (Number.isInteger(scaled)) return scaled.toString();
    return scaled.toFixed(1).replace(/\.0$/, '');
  };

  const decreaseServings = () => {
    if (servings > 1) setServings(servings - 1);
  };

  const increaseServings = () => {
    if (servings < 20) setServings(servings + 1);
  };

  return (
    <div className="space-y-6">
      {/* Servings Control */}
      <div className="bg-orange-50 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Servings</p>
            <p className="text-2xl font-bold text-gray-900">{servings} {servings === 1 ? 'person' : 'people'}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={decreaseServings}
              disabled={servings <= 1}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xl font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              -
            </button>
            <span className="w-8 text-center text-xl font-bold">{servings}</span>
            <button
              onClick={increaseServings}
              disabled={servings >= 20}
              className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {servings !== defaultServings && (
          <p className="text-sm text-orange-600 mt-2">
            Original recipe is for {defaultServings} {defaultServings === 1 ? 'person' : 'people'}. Quantities adjusted.
          </p>
        )}
      </div>

      {/* Generous Portions Slider */}
      <div className="bg-green-50 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            <div>
              <p className="font-medium text-gray-900">Portion Size</p>
              <p className="text-sm text-gray-600">
                {portionBoost === 0
                  ? 'Standard portions'
                  : `+${portionBoost}% generous portions`}
              </p>
            </div>
          </div>
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${
            portionBoost === 0
              ? 'bg-gray-100 text-gray-600'
              : portionBoost <= 25
                ? 'bg-green-100 text-green-700'
                : portionBoost <= 50
                  ? 'bg-yellow-100 text-yellow-700'
                  : portionBoost <= 75
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-red-100 text-red-700'
          }`}>
            {portionBoost === 0
              ? 'Normal'
              : portionBoost <= 25
                ? 'Generous'
                : portionBoost <= 50
                  ? 'Hungry!'
                  : portionBoost <= 75
                    ? 'Feast Mode!'
                    : 'Double Down!'}
          </span>
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={portionBoost}
            onChange={(e) => setPortionBoost(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Standard</span>
            <span>+50%</span>
            <span>+100%</span>
          </div>
        </div>

        {portionBoost > 0 && (
          <p className="text-sm text-green-700 mt-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            All quantities below include the +{portionBoost}% boost
          </p>
        )}
      </div>

      {/* Allergen Warning Button */}
      {allergens.length > 0 && (
        <button
          onClick={() => setShowAllergenWarning(!showAllergenWarning)}
          className="w-full bg-amber-50 border border-amber-200 rounded-xl p-4 text-left hover:bg-amber-100 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-medium text-amber-800">Cooking for guests?</p>
                <p className="text-sm text-amber-600">Check allergens before cooking</p>
              </div>
            </div>
            <svg
              className={`w-5 h-5 text-amber-600 transition-transform ${showAllergenWarning ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      )}

      {/* Allergen Warning Panel */}
      {showAllergenWarning && allergens.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">👨‍🍳</span>
            <div>
              <p className="font-medium text-gray-900">Before you start cooking:</p>
              <p className="text-sm text-gray-600 mt-1">
                This recipe contains ingredients that may cause allergic reactions.
                Ask your guests if they have any of these allergies:
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {allergens.map((allergen) => (
              <span
                key={allergen}
                className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {allergen}
              </span>
            ))}
          </div>

          <div className="bg-white rounded-lg p-3 border border-amber-100">
            <p className="text-sm text-gray-700">
              <strong>Tip:</strong> Send your guests a quick message asking about dietary restrictions
              before cooking. It's better to know in advance!
            </p>
          </div>

          <div className="pt-2 border-t border-amber-200">
            <a
              href="#invite-guests"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm"
            >
              <span>Want to invite guests and check their allergies?</span>
              <span>Coming soon →</span>
            </a>
          </div>
        </div>
      )}

      {/* Ingredients List with Dynamic Quantities */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Ingredients</h3>
        <ul className="space-y-2">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
              <input
                type="checkbox"
                className="mt-1 w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <div className="flex-1">
                <span className="font-medium text-orange-600">
                  {formatAmount(ingredient.amount)} {ingredient.unit}
                </span>
                <span className="text-gray-900 ml-2">{ingredient.name}</span>
                {ingredient.notes && (
                  <span className="text-gray-500 text-sm ml-1">({ingredient.notes})</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Dynamic Nutrition per Serving */}
      {nutritionPerServing && (
        <div className="bg-blue-50 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <div>
                <p className="font-medium text-gray-900">Nutrition per Serving</p>
                <p className="text-sm text-gray-600">
                  {boostMultiplier > 1
                    ? `Adjusted for +${portionBoost}% portion size`
                    : 'Based on standard portions'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center mb-4">
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <p className="text-xl font-bold text-orange-600">
                {Math.round(nutritionPerServing.calories * boostMultiplier)}
              </p>
              <p className="text-xs text-gray-500">Calories</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <p className="text-xl font-bold text-blue-600">
                {Math.round(nutritionPerServing.protein * boostMultiplier)}g
              </p>
              <p className="text-xs text-gray-500">Protein</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <p className="text-xl font-bold text-yellow-600">
                {Math.round(nutritionPerServing.fat * boostMultiplier)}g
              </p>
              <p className="text-xs text-gray-500">Fat</p>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <p className="text-xl font-bold text-green-600">
                {Math.round(nutritionPerServing.carbohydrates * boostMultiplier)}g
              </p>
              <p className="text-xs text-gray-500">Carbs</p>
            </div>
          </div>

          {/* Detailed nutrition */}
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Fiber</span>
                <span className="font-medium">{Math.round(nutritionPerServing.fiber * boostMultiplier)}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sugar</span>
                <span className="font-medium">{Math.round(nutritionPerServing.sugar * boostMultiplier)}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sodium</span>
                <span className="font-medium">{Math.round(nutritionPerServing.sodium * boostMultiplier)}mg</span>
              </div>
            </div>
          </div>

          {boostMultiplier > 1 && (
            <p className="text-xs text-blue-600 mt-3 text-center">
              Standard serving: {nutritionPerServing.calories} cal | Your portion: {Math.round(nutritionPerServing.calories * boostMultiplier)} cal (+{Math.round((boostMultiplier - 1) * 100)}%)
            </p>
          )}
        </div>
      )}
    </div>
  );
}
