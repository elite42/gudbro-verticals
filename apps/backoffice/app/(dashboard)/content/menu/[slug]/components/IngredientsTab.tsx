'use client';

import type { MenuItem, MenuItemIngredient, Ingredient } from './types';
import { allergensList } from './types';

interface IngredientsTabProps {
  item: MenuItem;
  itemIngredients: MenuItemIngredient[];
  ingredientSearch: string;
  setIngredientSearch: (search: string) => void;
  showIngredientPicker: boolean;
  setShowIngredientPicker: (show: boolean) => void;
  filteredAvailableIngredients: Ingredient[];
  addIngredient: (ingredientId: string) => void;
  removeIngredient: (itemIngredientId: string) => void;
  updateIngredientQuantity: (itemIngredientId: string, quantity: number) => void;
  toggleIngredientOptional: (itemIngredientId: string) => void;
  computeFromIngredients: (ingredients: MenuItemIngredient[]) => void;
}

export function IngredientsTab({
  item,
  itemIngredients,
  ingredientSearch,
  setIngredientSearch,
  showIngredientPicker,
  setShowIngredientPicker,
  filteredAvailableIngredients,
  addIngredient,
  removeIngredient,
  updateIngredientQuantity,
  toggleIngredientOptional,
  computeFromIngredients,
}: IngredientsTabProps) {
  return (
    <div className="space-y-6">
      {/* Ingredients List */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recipe Ingredients</h3>
            <p className="text-sm text-gray-500">
              Add ingredients to auto-calculate allergens, nutrition & dietary flags
            </p>
          </div>
          <button
            onClick={() => setShowIngredientPicker(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Add Ingredient
          </button>
        </div>

        {itemIngredients.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 py-12 text-center">
            <span className="text-4xl">{'\u{1F957}'}</span>
            <p className="mt-2 text-gray-500">No ingredients added yet</p>
            <p className="text-sm text-gray-400">Add ingredients to auto-compute safety data</p>
            <button
              onClick={() => setShowIngredientPicker(true)}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
            >
              Add First Ingredient
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {itemIngredients.map((ii, index) => (
              <div
                key={ii.id}
                className={`flex items-center gap-4 rounded-lg border p-4 ${
                  ii.is_optional ? 'border-gray-200 bg-gray-50' : 'border-gray-200 bg-white'
                }`}
              >
                {/* Order */}
                <span className="w-6 text-sm text-gray-400">{index + 1}.</span>

                {/* Ingredient Info */}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {ii.ingredient?.name_multilang?.en || ii.ingredient_id}
                  </p>
                  <div className="mt-1 flex gap-2">
                    {Object.entries(ii.ingredient?.allergens || {})
                      .filter(([, v]) => v)
                      .slice(0, 3)
                      .map(([key]) => (
                        <span
                          key={key}
                          className="rounded bg-red-100 px-1.5 py-0.5 text-xs text-red-700"
                        >
                          {allergensList.find((a) => a.key === key)?.icon} {key}
                        </span>
                      ))}
                    {Object.entries(ii.ingredient?.allergens || {}).filter(([, v]) => v).length >
                      3 && (
                      <span className="text-xs text-gray-400">
                        +
                        {Object.entries(ii.ingredient?.allergens || {}).filter(([, v]) => v)
                          .length - 3}{' '}
                        more
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={ii.quantity_grams}
                    onChange={(e) => updateIngredientQuantity(ii.id, Number(e.target.value))}
                    className="w-20 rounded border border-gray-300 px-2 py-1 text-center text-sm"
                    min="1"
                  />
                  <span className="text-sm text-gray-500">g</span>
                </div>

                {/* Optional Toggle */}
                <button
                  onClick={() => toggleIngredientOptional(ii.id)}
                  className={`rounded px-3 py-1 text-xs font-medium ${
                    ii.is_optional ? 'bg-gray-200 text-gray-600' : 'bg-green-100 text-green-700'
                  }`}
                >
                  {ii.is_optional ? 'Optional' : 'Required'}
                </button>

                {/* Nutrition Preview */}
                {ii.ingredient?.calories_per_100g && (
                  <span className="text-xs text-gray-400">
                    {Math.round((ii.ingredient.calories_per_100g * ii.quantity_grams) / 100)} kcal
                  </span>
                )}

                {/* Remove */}
                <button
                  onClick={() => removeIngredient(ii.id)}
                  className="rounded p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
                >
                  {'\u{1F5D1}\u{FE0F}'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Computed Summary */}
        {itemIngredients.length > 0 && (
          <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-medium text-blue-900">
                Computed from {itemIngredients.filter((i) => !i.is_optional).length} Ingredients
              </h4>
              <button
                onClick={() => computeFromIngredients(itemIngredients)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Recalculate
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-blue-600">Allergens</p>
                <p className="font-semibold text-blue-900">
                  {Object.entries(item.allergens).filter(([, v]) => v).length || 0} detected
                </p>
              </div>
              <div>
                <p className="text-blue-600">Intolerances</p>
                <p className="font-semibold text-blue-900">
                  {Object.entries(item.intolerances).filter(([, v]) => v).length || 0} detected
                </p>
              </div>
              <div>
                <p className="text-blue-600">Calories</p>
                <p className="font-semibold text-blue-900">{item.calories || 0} kcal</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ingredient Picker Modal */}
      {showIngredientPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex max-h-[80vh] w-full max-w-lg flex-col rounded-xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Add Ingredient</h3>
              <button
                onClick={() => {
                  setShowIngredientPicker(false);
                  setIngredientSearch('');
                }}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                {'\u{2715}'}
              </button>
            </div>

            <input
              type="text"
              value={ingredientSearch}
              onChange={(e) => setIngredientSearch(e.target.value)}
              placeholder="Search ingredients..."
              className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-2"
              autoFocus
            />

            <div className="flex-1 space-y-1 overflow-y-auto">
              {filteredAvailableIngredients.length === 0 ? (
                <p className="py-8 text-center text-gray-500">
                  {ingredientSearch
                    ? 'No ingredients match your search'
                    : 'All ingredients already added'}
                </p>
              ) : (
                filteredAvailableIngredients.map((ing) => (
                  <button
                    key={ing.id}
                    onClick={() => addIngredient(ing.id)}
                    className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-blue-50"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {ing.name_multilang?.en || ing.slug}
                      </p>
                      <div className="mt-1 flex gap-2">
                        {Object.entries(ing.allergens || {})
                          .filter(([, v]) => v)
                          .slice(0, 4)
                          .map(([key]) => (
                            <span key={key} className="text-xs text-red-600">
                              {allergensList.find((a) => a.key === key)?.icon}
                            </span>
                          ))}
                        {ing.calories_per_100g && (
                          <span className="text-xs text-gray-400">
                            {ing.calories_per_100g} kcal/100g
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-blue-600">+ Add</span>
                  </button>
                ))
              )}
            </div>

            <div className="mt-4 border-t pt-4 text-center">
              <a href="/content/ingredients" className="text-sm text-blue-600 hover:underline">
                Manage Ingredients Database {'\u{2192}'}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
