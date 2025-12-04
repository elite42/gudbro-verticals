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
const DIFFICULTY_COLORS = ['', 'bg-green-100 text-green-800', 'bg-yellow-100 text-yellow-800', 'bg-orange-100 text-orange-800', 'bg-red-100 text-red-800'];

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
    setRecipes(recipesData.recipes as Recipe[]);
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.name.it.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (recipe.description?.en?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesTemperature = selectedTemperature === 'all' || recipe.temperature === selectedTemperature;

    return matchesSearch && matchesCategory && matchesTemperature;
  });

  const stats = {
    total: recipes.length,
    hot: recipes.filter(r => r.temperature === 'hot').length,
    iced: recipes.filter(r => r.temperature === 'iced').length,
    categories: new Set(recipes.map(r => r.category)).size,
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
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
        >
          <span>+</span> Add Recipe
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Total Recipes</p>
          <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-red-600 font-medium">Hot Drinks</p>
          <p className="text-2xl font-bold text-red-900">{stats.hot}</p>
        </div>
        <div className="p-4 bg-cyan-50 rounded-lg">
          <p className="text-sm text-cyan-600 font-medium">Iced Drinks</p>
          <p className="text-2xl font-bold text-cyan-900">{stats.iced}</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">Categories</p>
          <p className="text-2xl font-bold text-purple-900">{stats.categories}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Temperature Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedTemperature('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTemperature === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedTemperature('hot')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
              selectedTemperature === 'hot'
                ? 'bg-red-600 text-white'
                : 'bg-red-50 text-red-700 hover:bg-red-100'
            }`}
          >
            🔥 Hot
          </button>
          <button
            onClick={() => setSelectedTemperature('iced')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
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
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
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
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Recipe
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Temp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Caffeine
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRecipes.map((recipe) => (
              <tr key={recipe.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {recipe.name.en}
                    </div>
                    <div className="text-sm text-gray-500">
                      {recipe.name.it !== recipe.name.en && recipe.name.it}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                    {recipe.category}
                  </span>
                  {recipe.subcategory && (
                    <span className="ml-1 px-2 py-1 text-xs text-gray-500">
                      / {recipe.subcategory}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-lg ${recipe.temperature === 'hot' ? 'text-red-500' : 'text-cyan-500'}`}>
                    {recipe.temperature === 'hot' ? '🔥' : '❄️'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${DIFFICULTY_COLORS[recipe.difficulty]}`}>
                    {DIFFICULTY_LABELS[recipe.difficulty]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatTime(recipe.totalTime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {recipe.nutrition?.caffeine_mg ? `${recipe.nutrition.caffeine_mg}mg` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/content/recipes/${recipe.id}`}
                    className="text-blue-600 hover:text-blue-900 mr-3"
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
          <div className="text-center py-12">
            <span className="text-4xl">📖</span>
            <p className="mt-2 text-gray-500">No recipes found</p>
          </div>
        )}
      </div>
    </div>
  );
}
