'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calculator,
  ChefHat,
  TrendingUp,
  TrendingDown,
  Target,
  Sparkles,
  Plus,
  Filter,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle,
  DollarSign,
} from 'lucide-react';
import { FoodCostProgress } from '@/components/food-cost';
import { AIInlineTrigger } from '@/components/ai';

// Mock data types
interface DishAnalysis {
  id: string;
  name: string;
  category: string;
  sellingPrice: number;
  foodCost: number;
  foodCostPercent: number;
  laborCost: number;
  margin: number;
  marginPercent: number;
  monthlySales: number;
  bcgClass: 'star' | 'puzzle' | 'plowhorse' | 'dog';
}

// Mock data
const mockDishAnalysis: DishAnalysis[] = [
  {
    id: '1',
    name: 'Spaghetti Carbonara',
    category: 'primi',
    sellingPrice: 14.0,
    foodCost: 3.2,
    foodCostPercent: 22.9,
    laborCost: 2.0,
    margin: 8.8,
    marginPercent: 62.9,
    monthlySales: 156,
    bcgClass: 'star',
  },
  {
    id: '2',
    name: 'Risotto ai Funghi',
    category: 'primi',
    sellingPrice: 16.0,
    foodCost: 5.8,
    foodCostPercent: 36.3,
    laborCost: 3.5,
    margin: 6.7,
    marginPercent: 41.9,
    monthlySales: 45,
    bcgClass: 'puzzle',
  },
  {
    id: '3',
    name: 'Pizza Margherita',
    category: 'pizze',
    sellingPrice: 10.0,
    foodCost: 2.5,
    foodCostPercent: 25.0,
    laborCost: 1.5,
    margin: 6.0,
    marginPercent: 60.0,
    monthlySales: 234,
    bcgClass: 'star',
  },
  {
    id: '4',
    name: 'Tagliata di Manzo',
    category: 'secondi',
    sellingPrice: 24.0,
    foodCost: 12.0,
    foodCostPercent: 50.0,
    laborCost: 4.0,
    margin: 8.0,
    marginPercent: 33.3,
    monthlySales: 28,
    bcgClass: 'dog',
  },
  {
    id: '5',
    name: 'Insalata Caesar',
    category: 'antipasti',
    sellingPrice: 12.0,
    foodCost: 3.6,
    foodCostPercent: 30.0,
    laborCost: 1.0,
    margin: 7.4,
    marginPercent: 61.7,
    monthlySales: 189,
    bcgClass: 'plowhorse',
  },
];

const bcgConfig = {
  star: {
    emoji: '⭐',
    label: 'Star',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
  },
  puzzle: {
    emoji: '❓',
    label: 'Puzzle',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  plowhorse: {
    emoji: '🐴',
    label: 'Plowhorse',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  dog: {
    emoji: '💀',
    label: 'Dog',
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
};

export default function FoodCostPage() {
  const [dishes] = useState<DishAnalysis[]>(mockDishAnalysis);
  const [selectedBCG, setSelectedBCG] = useState<string | null>(null);

  // Calculate summary stats
  const avgFoodCost = dishes.reduce((sum, d) => sum + d.foodCostPercent, 0) / dishes.length;
  const totalMonthlyRevenue = dishes.reduce((sum, d) => sum + d.sellingPrice * d.monthlySales, 0);
  const totalMonthlyProfit = dishes.reduce((sum, d) => sum + d.margin * d.monthlySales, 0);
  const avgMargin = (totalMonthlyProfit / totalMonthlyRevenue) * 100;

  // BCG counts
  const bcgCounts = {
    star: dishes.filter((d) => d.bcgClass === 'star').length,
    puzzle: dishes.filter((d) => d.bcgClass === 'puzzle').length,
    plowhorse: dishes.filter((d) => d.bcgClass === 'plowhorse').length,
    dog: dishes.filter((d) => d.bcgClass === 'dog').length,
  };

  // Filter dishes
  const filteredDishes = selectedBCG ? dishes.filter((d) => d.bcgClass === selectedBCG) : dishes;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Food Cost Analysis</h1>
          <p className="mt-1 text-sm text-gray-500">
            Analizza i margini dei tuoi piatti e ottimizza il menu
          </p>
        </div>
        <Link
          href="/food-cost/onboarding"
          className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
        >
          <Plus className="h-4 w-4" />
          Aggiungi Piatti
        </Link>
      </div>

      {/* AI Inline Trigger - Contextual suggestions */}
      <AIInlineTrigger category="food_cost" maxTriggers={1} />

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-blue-100 p-2">
              <Calculator className="h-5 w-5 text-blue-600" />
            </div>
            <span
              className={`rounded px-2 py-1 text-xs font-medium ${
                avgFoodCost < 30
                  ? 'bg-green-100 text-green-700'
                  : avgFoodCost < 40
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-red-100 text-red-700'
              }`}
            >
              {avgFoodCost < 30 ? 'Ottimo' : avgFoodCost < 40 ? 'OK' : 'Alto'}
            </span>
          </div>
          <p className="mt-4 text-2xl font-bold text-gray-900">{avgFoodCost.toFixed(1)}%</p>
          <p className="text-sm text-gray-500">Food Cost Medio</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-green-100 p-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <p className="mt-4 text-2xl font-bold text-gray-900">{avgMargin.toFixed(1)}%</p>
          <p className="text-sm text-gray-500">Margine Medio</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-purple-100 p-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <p className="mt-4 text-2xl font-bold text-gray-900">
            €{(totalMonthlyRevenue / 1000).toFixed(1)}k
          </p>
          <p className="text-sm text-gray-500">Revenue Mensile</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-emerald-100 p-2">
              <Target className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <p className="mt-4 text-2xl font-bold text-gray-900">
            €{(totalMonthlyProfit / 1000).toFixed(1)}k
          </p>
          <p className="text-sm text-gray-500">Profitto Lordo</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content - Dishes Table */}
        <div className="space-y-6 lg:col-span-2">
          {/* BCG Filter */}
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Menu Engineering (BCG Matrix)</h3>
              <button
                onClick={() => setSelectedBCG(null)}
                className={`rounded px-2 py-1 text-xs font-medium ${
                  !selectedBCG
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Tutti
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(bcgConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setSelectedBCG(selectedBCG === key ? null : key)}
                  className={`rounded-lg border-2 p-3 transition-all ${
                    selectedBCG === key
                      ? `${config.bg} ${config.border}`
                      : 'border-transparent bg-gray-50 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{config.emoji}</span>
                    <span className="text-lg font-bold text-gray-900">
                      {bcgCounts[key as keyof typeof bcgCounts]}
                    </span>
                  </div>
                  <p className={`mt-1 text-xs font-medium ${config.color}`}>{config.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Dishes List */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
              <h3 className="font-semibold text-gray-900">
                Analisi Piatti ({filteredDishes.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {filteredDishes.map((dish) => {
                const config = bcgConfig[dish.bcgClass];
                return (
                  <div key={dish.id} className="p-4 transition-colors hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{config.emoji}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{dish.name}</p>
                            <span
                              className={`rounded px-2 py-0.5 text-xs font-medium ${config.color} ${config.bg}`}
                            >
                              {config.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {dish.category} • {dish.monthlySales} vendite/mese
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <span
                            className={`text-lg font-bold ${
                              dish.foodCostPercent < 30
                                ? 'text-green-600'
                                : dish.foodCostPercent < 40
                                  ? 'text-amber-600'
                                  : 'text-red-600'
                            }`}
                          >
                            {dish.foodCostPercent.toFixed(1)}%
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          €{dish.sellingPrice.toFixed(2)} → €{dish.margin.toFixed(2)} margine
                        </p>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${
                          dish.foodCostPercent < 30
                            ? 'bg-green-500'
                            : dish.foodCostPercent < 40
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(dish.foodCostPercent, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dogs Alert */}
          {bcgCounts.dog > 0 && (
            <div className="rounded-xl border border-red-100 bg-gradient-to-r from-red-50 to-rose-50 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                <div>
                  <p className="font-medium text-red-900">
                    Attenzione: {bcgCounts.dog} piatti "Dog"
                  </p>
                  <p className="mt-1 text-sm text-red-800">
                    Questi piatti hanno basso margine e basse vendite. Considera di rimuoverli dal
                    menu per liberare spazio e risorse per i tuoi piatti Star e Puzzle.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Progress Widget */}
        <div className="space-y-6">
          <FoodCostProgress />

          {/* AI Suggestions */}
          <div className="rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-indigo-50 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-purple-900">Suggerimenti AI</h3>
            </div>
            <ul className="space-y-3 text-sm text-purple-800">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                <span>
                  La <strong>Carbonara</strong> è il tuo piatto Star - mantieni la qualità!
                </span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500" />
                <span>
                  Promuovi il <strong>Risotto ai Funghi</strong> (Puzzle) - alto margine, basse
                  vendite
                </span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingDown className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                <span>
                  La <strong>Tagliata</strong> ha food cost 50% - considera aumento prezzo €2-3
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-3 font-semibold text-gray-900">Azioni Rapide</h3>
            <div className="space-y-2">
              <Link
                href="/food-cost/onboarding"
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Aggiungi piatti</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </Link>
              <Link
                href="/content/recipes"
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  <ChefHat className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Libreria Ricette</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
