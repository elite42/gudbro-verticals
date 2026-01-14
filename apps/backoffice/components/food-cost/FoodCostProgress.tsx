'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useTenant } from '@/lib/contexts/TenantContext';
import {
  Calculator,
  ChefHat,
  TrendingUp,
  Lock,
  Unlock,
  Sparkles,
  ArrowRight,
  Trophy,
  Target,
  Zap,
} from 'lucide-react';

interface FoodCostStats {
  totalDishes: number;
  dishesWithCosts: number;
  totalIngredients: number;
  ingredientsWithPrices: number;
  avgFoodCostPercent: number | null;
  lastUpdated: Date | null;
}

interface UnlockableFeature {
  id: string;
  name: string;
  description: string;
  icon: typeof Calculator;
  requiredProgress: number;
  unlocked: boolean;
  color: string;
}

export function FoodCostProgress() {
  const { location, brand } = useTenant();
  const locationId = location?.id || brand?.id;

  const [stats, setStats] = useState<FoodCostStats | null>(null);
  const [mounted, setMounted] = useState(false);

  const fetchStats = useCallback(async () => {
    if (!locationId) {
      // If no location, show empty state
      setStats({
        totalDishes: 0,
        dishesWithCosts: 0,
        totalIngredients: 0,
        ingredientsWithPrices: 0,
        avgFoodCostPercent: null,
        lastUpdated: null,
      });
      return;
    }

    try {
      const res = await fetch(`/api/food-cost/stats?locationId=${locationId}`);
      const data = await res.json();

      if (data.stats) {
        setStats({
          totalDishes: data.stats.totalDishes,
          dishesWithCosts: data.stats.dishesWithCosts,
          totalIngredients: data.stats.totalIngredients,
          ingredientsWithPrices: data.stats.ingredientsWithPrices,
          avgFoodCostPercent: data.stats.avgFoodCostPercent,
          lastUpdated: data.stats.lastUpdated ? new Date(data.stats.lastUpdated) : null,
        });
      }
    } catch (err) {
      console.error('Error fetching food cost stats:', err);
      // Fallback to empty state on error
      setStats({
        totalDishes: 0,
        dishesWithCosts: 0,
        totalIngredients: 0,
        ingredientsWithPrices: 0,
        avgFoodCostPercent: null,
        lastUpdated: null,
      });
    }
  }, [locationId]);

  useEffect(() => {
    setMounted(true);
    fetchStats();
  }, [fetchStats]);

  if (!mounted || !stats) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="h-32 animate-pulse rounded-lg bg-gray-100" />
      </div>
    );
  }

  // Calculate progress
  const dishProgress =
    stats.totalDishes > 0 ? Math.round((stats.dishesWithCosts / stats.totalDishes) * 100) : 0;

  const ingredientProgress =
    stats.totalIngredients > 0
      ? Math.round((stats.ingredientsWithPrices / stats.totalIngredients) * 100)
      : 0;

  const overallProgress = Math.round((dishProgress + ingredientProgress) / 2);

  // Define unlockable features
  const features: UnlockableFeature[] = [
    {
      id: 'margin-analysis',
      name: 'Analisi Margini',
      description: 'Scopri quali piatti ti fanno guadagnare di più',
      icon: TrendingUp,
      requiredProgress: 20,
      unlocked: overallProgress >= 20,
      color: 'emerald',
    },
    {
      id: 'menu-engineering',
      name: 'Menu Engineering',
      description: 'Classifica BCG: Stars, Puzzles, Plowhorses, Dogs',
      icon: Target,
      requiredProgress: 50,
      unlocked: overallProgress >= 50,
      color: 'purple',
    },
    {
      id: 'ai-suggestions',
      name: 'Suggerimenti AI',
      description: "L'AI ti dice come ottimizzare i margini",
      icon: Sparkles,
      requiredProgress: 75,
      unlocked: overallProgress >= 75,
      color: 'blue',
    },
    {
      id: 'variance-alerts',
      name: 'Alert Varianza',
      description: 'Notifiche quando i costi deviano dal teorico',
      icon: Zap,
      requiredProgress: 90,
      unlocked: overallProgress >= 90,
      color: 'amber',
    },
  ];

  const nextFeature = features.find((f) => !f.unlocked);
  const progressToNext = nextFeature
    ? Math.round((overallProgress / nextFeature.requiredProgress) * 100)
    : 100;

  // Get motivational message based on progress
  const getMotivationalMessage = () => {
    if (overallProgress === 0) {
      return {
        title: 'Inizia a tracciare i tuoi costi!',
        message:
          'Investire 2 ore con il tuo chef può farti scoprire €500/mese di margine nascosto.',
      };
    }
    if (overallProgress < 20) {
      return {
        title: 'Ottimo inizio!',
        message: `Ancora ${20 - overallProgress}% per sbloccare l'Analisi Margini.`,
      };
    }
    if (overallProgress < 50) {
      return {
        title: 'Stai andando alla grande!',
        message: `${50 - overallProgress}% per sbloccare il Menu Engineering BCG.`,
      };
    }
    if (overallProgress < 75) {
      return {
        title: 'Quasi a metà strada!',
        message: `${75 - overallProgress}% per sbloccare i Suggerimenti AI.`,
      };
    }
    if (overallProgress < 90) {
      return {
        title: 'Sei un professionista!',
        message: `Solo ${90 - overallProgress}% per sbloccare gli Alert Varianza.`,
      };
    }
    return {
      title: 'Complimenti! Tutto sbloccato!',
      message: 'Hai accesso completo a tutte le funzionalità di food costing.',
    };
  };

  const motivation = getMotivationalMessage();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-orange-100 p-2.5">
              <Calculator className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Food Cost Tracker</h3>
              <p className="text-sm text-gray-600">{motivation.title}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-600">{overallProgress}%</div>
            <p className="text-xs text-gray-500">completato</p>
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-4 px-6 py-4">
        {/* Overall Progress */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Progresso Totale</span>
            <span className="text-sm text-gray-500">{overallProgress}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-500 transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Detailed Progress */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="mb-2 flex items-center gap-2">
              <ChefHat className="h-4 w-4 text-gray-500" />
              <span className="text-xs font-medium text-gray-600">Piatti con costi</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-gray-900">{stats.dishesWithCosts}</span>
              <span className="text-sm text-gray-500">/ {stats.totalDishes}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${dishProgress}%` }}
              />
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-3">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm">🥕</span>
              <span className="text-xs font-medium text-gray-600">Ingredienti prezzati</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-gray-900">{stats.ingredientsWithPrices}</span>
              <span className="text-sm text-gray-500">/ {stats.totalIngredients}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${ingredientProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Average Food Cost (if available) */}
        {stats.avgFoodCostPercent !== null && overallProgress >= 20 && (
          <div className="rounded-lg border border-emerald-100 bg-gradient-to-r from-emerald-50 to-green-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-800">Food Cost Medio</p>
                <p className="mt-0.5 text-xs text-emerald-600">
                  Benchmark: 25-35% per casual dining
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-emerald-700">
                  {stats.avgFoodCostPercent.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Unlockable Features */}
      <div className="border-t border-gray-100 px-6 py-4">
        <h4 className="mb-3 text-sm font-medium text-gray-700">Funzionalità Sbloccabili</h4>
        <div className="grid grid-cols-2 gap-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`relative rounded-lg p-3 transition-all ${
                  feature.unlocked
                    ? 'border border-gray-200 bg-white shadow-sm'
                    : 'border border-gray-100 bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div
                    className={`rounded-lg p-1.5 ${
                      feature.unlocked ? `bg-${feature.color}-100` : 'bg-gray-200'
                    }`}
                  >
                    {feature.unlocked ? (
                      <Icon className={`h-4 w-4 text-${feature.color}-600`} />
                    ) : (
                      <Lock className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-medium ${
                        feature.unlocked ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {feature.name}
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-[10px] text-gray-500">
                      {feature.unlocked
                        ? feature.description
                        : `Sblocca al ${feature.requiredProgress}%`}
                    </p>
                  </div>
                </div>
                {feature.unlocked && (
                  <div className="absolute right-1 top-1">
                    <Unlock className="h-3 w-3 text-green-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational Message */}
      <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-amber-100 p-2">
            <Trophy className="h-5 w-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-700">{motivation.message}</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-gray-200 px-6 py-4">
        <Link
          href="/food-cost/onboarding"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-700"
        >
          {overallProgress === 0 ? (
            <>
              <Sparkles className="h-4 w-4" />
              Inizia il Setup Food Cost
            </>
          ) : overallProgress < 100 ? (
            <>
              <ArrowRight className="h-4 w-4" />
              Continua il Setup ({overallProgress}%)
            </>
          ) : (
            <>
              <TrendingUp className="h-4 w-4" />
              Vai all'Analisi Margini
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
