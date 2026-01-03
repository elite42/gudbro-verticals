'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Import recipes from local shared copy
import recipesData from '@/lib/shared/recipes-database.json';

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
  nutrition?: {
    calories: number;
    caffeine_mg: number;
  };
};

const CATEGORIES = [
  { id: 'all', name: 'All', icon: '📋' },
  { id: 'hot-coffee', name: 'Hot Coffee', icon: '☕' },
  { id: 'iced-coffee', name: 'Iced Coffee', icon: '🧊' },
  { id: 'matcha', name: 'Matcha', icon: '🍵' },
  { id: 'tea', name: 'Tea', icon: '🫖' },
  { id: 'smoothie', name: 'Smoothie', icon: '🥤' },
  { id: 'milkshake', name: 'Milkshake', icon: '🥛' },
];

const DIFFICULTY_LABELS = ['', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
const DIFFICULTY_COLORS = [
  '',
  'bg-green-100 text-green-800',
  'bg-yellow-100 text-yellow-800',
  'bg-orange-100 text-orange-800',
  'bg-red-100 text-red-800',
];

function formatTime(seconds?: number): string {
  if (!seconds) return '-';
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemperature, setSelectedTemperature] = useState<'all' | 'hot' | 'iced'>('all');

  useEffect(() => {
    // Load recipes from JSON
    setRecipes(recipesData.recipes as unknown as Recipe[]);
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.name.it.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (recipe.description?.en?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesTemperature =
      selectedTemperature === 'all' || recipe.temperature === selectedTemperature;

    return matchesSearch && matchesCategory && matchesTemperature;
  });

  const stats = {
    total: recipes.length,
    hot: recipes.filter((r) => r.temperature === 'hot').length,
    iced: recipes.filter((r) => r.temperature === 'iced').length,
    categories: new Set(recipes.map((r) => r.category)).size,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recipes</h1>
          <p className="mt-1 text-sm text-gray-500">
            Professional barista recipes with detailed preparation methods
          </p>
        </div>
        <Link
          href="/content/recipes/create"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <span>+</span> Add Recipe
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-600">Total Recipes</p>
          <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
        </div>
        <div className="rounded-lg bg-red-50 p-4">
          <p className="text-sm font-medium text-red-600">Hot Drinks</p>
          <p className="text-2xl font-bold text-red-900">{stats.hot}</p>
        </div>
        <div className="rounded-lg bg-cyan-50 p-4">
          <p className="text-sm font-medium text-cyan-600">Iced Drinks</p>
          <p className="text-2xl font-bold text-cyan-900">{stats.iced}</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-4">
          <p className="text-sm font-medium text-purple-600">Categories</p>
          <p className="text-2xl font-bold text-purple-900">{stats.categories}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Temperature Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedTemperature('all')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selectedTemperature === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedTemperature('hot')}
            className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selectedTemperature === 'hot'
                ? 'bg-red-600 text-white'
                : 'bg-red-50 text-red-700 hover:bg-red-100'
            }`}
          >
            🔥 Hot
          </button>
          <button
            onClick={() => setSelectedTemperature('iced')}
            className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selectedTemperature === 'iced'
                ? 'bg-cyan-600 text-white'
                : 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100'
            }`}
          >
            ❄️ Iced
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Recipes Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Recipe
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Temp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Caffeine
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredRecipes.map((recipe) => (
              <tr key={recipe.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{recipe.name.en}</div>
                    <div className="text-sm text-gray-500">
                      {recipe.name.it !== recipe.name.en && recipe.name.it}
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                    {recipe.category}
                  </span>
                  {recipe.subcategory && (
                    <span className="ml-1 px-2 py-1 text-xs text-gray-500">
                      / {recipe.subcategory}
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`text-lg ${recipe.temperature === 'hot' ? 'text-red-500' : 'text-cyan-500'}`}
                  >
                    {recipe.temperature === 'hot' ? '🔥' : '❄️'}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium ${DIFFICULTY_COLORS[recipe.difficulty]}`}
                  >
                    {DIFFICULTY_LABELS[recipe.difficulty]}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {formatTime(recipe.totalTime)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {recipe.nutrition?.caffeine_mg ? `${recipe.nutrition.caffeine_mg}mg` : '-'}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <Link
                    href={`/content/recipes/${recipe.id}`}
                    className="mr-3 text-blue-600 hover:text-blue-900"
                  >
                    View
                  </Link>
                  <Link
                    href={`/content/recipes/${recipe.id}/edit`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRecipes.length === 0 && (
          <div className="py-12 text-center">
            <span className="text-4xl">📖</span>
            <p className="mt-2 text-gray-500">No recipes found</p>
          </div>
        )}
      </div>
    </div>
  );
}
