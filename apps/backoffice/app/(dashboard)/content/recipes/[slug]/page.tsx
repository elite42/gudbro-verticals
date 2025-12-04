'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Import recipes from local shared copy
import recipesData from '@/lib/shared/recipes-database.json';

type RecipeIngredient = {
  item: string;
  amount: number;
  unit: string;
  notes?: string;
  optional?: boolean;
};

type RecipeStep = {
  order: number;
  action: string;
  duration: number;
  tips?: string;
};

type RecipeVariation = {
  name: string;
  modification: string;
  result: string;
};

type Recipe = {
  id: string;
  name: { en: string; it: string; vi: string };
  description?: { en: string; it: string; vi: string };
  category: string;
  subcategory?: string;
  temperature: string;
  difficulty: number;
  totalTime?: number;
  origin?: string;
  servingSize?: { volume: number; unit: string };
  ingredients?: RecipeIngredient[];
  equipment?: string[];
  method?: { steps: RecipeStep[]; totalTime: number; difficulty: number };
  ratio?: string;
  ratioExplanation?: string;
  parameters?: Record<string, any>;
  nutrition?: Record<string, any>;
  baristaTips?: string[];
  variations?: RecipeVariation[];
  latteArt?: { recommended: string[]; difficulty: string };
};

const DIFFICULTY_LABELS = ['', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
const DIFFICULTY_COLORS = ['', 'bg-green-100 text-green-800', 'bg-yellow-100 text-yellow-800', 'bg-orange-100 text-orange-800', 'bg-red-100 text-red-800'];

function formatTime(seconds?: number): string {
  if (!seconds) return '-';
  if (seconds < 60) return `${seconds} sec`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins} min`;
}

export default function RecipeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [activeTab, setActiveTab] = useState<'method' | 'ingredients' | 'tips'>('method');

  useEffect(() => {
    const found = recipesData.recipes.find((r: any) => r.id === slug);
    setRecipe(found as Recipe || null);
  }, [slug]);

  if (!recipe) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <span className="text-4xl">📖</span>
          <p className="mt-2 text-gray-500">Recipe not found</p>
          <Link href="/content/recipes" className="mt-4 text-blue-600 hover:underline">
            Back to recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/content" className="hover:text-gray-700">Content</Link>
        <span>/</span>
        <Link href="/content/recipes" className="hover:text-gray-700">Recipes</Link>
        <span>/</span>
        <span className="text-gray-900">{recipe.name.en}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className={`text-3xl ${recipe.temperature === 'hot' ? '' : ''}`}>
              {recipe.temperature === 'hot' ? '🔥' : '❄️'}
            </span>
            <h1 className="text-2xl font-bold text-gray-900">{recipe.name.en}</h1>
          </div>
          {recipe.name.it !== recipe.name.en && (
            <p className="mt-1 text-gray-500 italic">{recipe.name.it}</p>
          )}
          {recipe.description?.en && (
            <p className="mt-2 text-gray-600 max-w-2xl">{recipe.description.en}</p>
          )}
        </div>
        <Link
          href={`/content/recipes/${recipe.id}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          Edit Recipe
        </Link>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500 uppercase">Category</p>
          <p className="mt-1 font-medium text-gray-900">{recipe.category}</p>
          {recipe.subcategory && (
            <p className="text-sm text-gray-500">{recipe.subcategory}</p>
          )}
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500 uppercase">Difficulty</p>
          <span className={`mt-1 inline-block px-2 py-1 text-xs font-medium rounded ${DIFFICULTY_COLORS[recipe.difficulty]}`}>
            {DIFFICULTY_LABELS[recipe.difficulty]}
          </span>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500 uppercase">Total Time</p>
          <p className="mt-1 font-medium text-gray-900">{formatTime(recipe.totalTime)}</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500 uppercase">Serving Size</p>
          <p className="mt-1 font-medium text-gray-900">
            {recipe.servingSize ? `${recipe.servingSize.volume} ${recipe.servingSize.unit}` : '-'}
          </p>
        </div>
        {recipe.ratio && (
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 uppercase">Ratio</p>
            <p className="mt-1 font-medium text-gray-900">{recipe.ratio}</p>
          </div>
        )}
        {recipe.origin && (
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 uppercase">Origin</p>
            <p className="mt-1 font-medium text-gray-900">{recipe.origin}</p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-8">
          {['method', 'ingredients', 'tips'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'method' && recipe.method?.steps && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Preparation Method</h2>
              <ol className="space-y-4">
                {recipe.method.steps.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                      {step.order}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">{step.action}</p>
                      <div className="mt-1 flex items-center gap-4 text-sm">
                        <span className="text-gray-500">⏱️ {step.duration}s</span>
                        {step.tips && (
                          <span className="text-blue-600">💡 {step.tips}</span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {activeTab === 'ingredients' && recipe.ingredients && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Ingredients</h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ing, index) => (
                  <li key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {ing.item.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      {ing.optional && (
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded">Optional</span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-gray-900">{ing.amount} {ing.unit}</span>
                      {ing.notes && (
                        <p className="text-xs text-gray-500">{ing.notes}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-6">
              {recipe.baristaTips && recipe.baristaTips.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Barista Tips</h2>
                  <ul className="space-y-3">
                    {recipe.baristaTips.map((tip, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-yellow-500">💡</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recipe.variations && recipe.variations.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Variations</h2>
                  <div className="space-y-4">
                    {recipe.variations.map((variation, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-900">{variation.name}</h3>
                        <p className="mt-1 text-sm text-gray-600">{variation.modification}</p>
                        <p className="mt-1 text-sm text-green-600">→ {variation.result}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {recipe.latteArt && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Latte Art</h2>
                  <div className="flex flex-wrap gap-2">
                    {recipe.latteArt.recommended.map((pattern, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {pattern}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-gray-500">
                    Difficulty: <span className="font-medium">{recipe.latteArt.difficulty}</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Equipment */}
          {recipe.equipment && recipe.equipment.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-3">Equipment</h3>
              <ul className="space-y-2">
                {recipe.equipment.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-gray-400">•</span>
                    {item.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Parameters */}
          {recipe.parameters && Object.keys(recipe.parameters).length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-3">Parameters</h3>
              <dl className="space-y-2">
                {Object.entries(recipe.parameters).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <dt className="text-gray-500">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</dt>
                    <dd className="text-gray-900 font-medium">
                      {typeof value === 'object' ? `${value.value} ${value.unit}` : value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Nutrition */}
          {recipe.nutrition && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-3">Nutrition</h3>
              <dl className="space-y-2">
                {recipe.nutrition.calories !== undefined && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-gray-500">Calories</dt>
                    <dd className="text-gray-900 font-medium">{recipe.nutrition.calories} kcal</dd>
                  </div>
                )}
                {recipe.nutrition.caffeine_mg !== undefined && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-gray-500">Caffeine</dt>
                    <dd className="text-gray-900 font-medium">{recipe.nutrition.caffeine_mg} mg</dd>
                  </div>
                )}
                {recipe.nutrition.protein_g !== undefined && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-gray-500">Protein</dt>
                    <dd className="text-gray-900 font-medium">{recipe.nutrition.protein_g} g</dd>
                  </div>
                )}
                {recipe.nutrition.carbs_g !== undefined && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-gray-500">Carbs</dt>
                    <dd className="text-gray-900 font-medium">{recipe.nutrition.carbs_g} g</dd>
                  </div>
                )}
                {recipe.nutrition.fat_g !== undefined && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-gray-500">Fat</dt>
                    <dd className="text-gray-900 font-medium">{recipe.nutrition.fat_g} g</dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          {/* Ratio Explanation */}
          {recipe.ratioExplanation && (
            <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6">
              <h3 className="text-sm font-semibold text-yellow-800 uppercase mb-2">Ratio: {recipe.ratio}</h3>
              <p className="text-sm text-yellow-700">{recipe.ratioExplanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
