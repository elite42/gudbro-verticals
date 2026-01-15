'use client';

import { useState, useEffect } from 'react';
import { Brain, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import { useTenant } from '@/lib/contexts/TenantContext';
import { AIPriorityCard, AIPriority, PriorityLevel } from './AIPriorityCard';
import { ScenarioBanner } from './ScenarioBanner';
import {
  detectScenario,
  estimateTraffic,
  type OperationalScenario,
  type ScenarioInput,
} from '@/lib/ai/scenario-detection';

interface WeatherBusinessImpact {
  deliveryImpact: string;
  dineInImpact: string;
  outdoorSeating: boolean;
  recommendedActions: string[];
  weatherCategory?: string;
  staffAdjustment?: {
    sala: number;
    kitchen: number;
    delivery: number;
    bar: number;
  };
  menuSuggestions?: Array<{
    category: string;
    reason: string;
    priority: string;
  }>;
  beverageFocus?: 'hot' | 'cold' | 'mixed';
  marketingHook?: string;
}

interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    conditions: string;
  };
  businessImpact?: WeatherBusinessImpact;
}

// Food Cost dish data
interface FoodCostDish {
  id: string;
  name: string;
  food_cost_percent: number | null;
  selling_price: number | null;
  ingredient_cost: number | null;
}

export function AIPrioritiesHero() {
  const { location } = useTenant();
  const [priorities, setPriorities] = useState<AIPriority[]>([]);
  const [scenario, setScenario] = useState<OperationalScenario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPriorities = async () => {
    if (!location?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch weather data and food cost data in parallel
      const [weatherRes, foodCostRes] = await Promise.all([
        fetch(`/api/ai/weather?locationId=${location.id}`),
        fetch(`/api/food-cost/dishes?locationId=${location.id}`),
      ]);

      let weatherData: WeatherData | null = null;
      let foodCostDishes: FoodCostDish[] = [];

      if (weatherRes.ok) {
        weatherData = await weatherRes.json();
      }

      if (foodCostRes.ok) {
        const foodCostData = await foodCostRes.json();
        foodCostDishes = foodCostData.dishes || [];
      }

      // Generate priorities based on available data
      const generatedPriorities: AIPriority[] = [];

      // Food Cost Priority - High cost dishes (>35%)
      const highCostDishes = foodCostDishes.filter(
        (d) => d.food_cost_percent !== null && d.food_cost_percent > 35
      );

      if (highCostDishes.length > 0) {
        // Sort by food cost descending
        const sortedHighCost = [...highCostDishes].sort(
          (a, b) => (b.food_cost_percent || 0) - (a.food_cost_percent || 0)
        );
        const worstDish = sortedHighCost[0];
        const isCritical = highCostDishes.some((d) => (d.food_cost_percent || 0) > 45);
        const avgFoodCost =
          highCostDishes.reduce((sum, d) => sum + (d.food_cost_percent || 0), 0) /
          highCostDishes.length;

        generatedPriorities.push({
          id: 'food-cost-high',
          level: isCritical ? 'critical' : 'warning',
          category: 'food_cost',
          // Legacy title/description for backward compat
          title:
            highCostDishes.length === 1
              ? `Food cost alto: ${worstDish.name}`
              : `${highCostDishes.length} piatti con food cost alto`,
          description: `Food cost medio ${avgFoodCost.toFixed(0)}% sui piatti problematici`,

          // === 5 DOMANDE TEMPLATE ===
          // 1. ❓ Cosa sta succedendo
          situation:
            highCostDishes.length === 1
              ? `"${worstDish.name}" ha un food cost del ${worstDish.food_cost_percent?.toFixed(0)}%`
              : `${highCostDishes.length} piatti hanno food cost superiore al 35%. Il peggiore è "${worstDish.name}" al ${worstDish.food_cost_percent?.toFixed(0)}%`,

          // 2. 📉 Perché è un problema
          reason: isCritical
            ? 'Con food cost >45%, stai vendendo quasi a costo. Ogni vendita erode i margini.'
            : 'Il target food cost è 28-32%. Sopra il 35% i margini si riducono significativamente.',

          // 3. 💰 Impatto stimato
          impact: isCritical ? 'Margini a rischio (-8-12%)' : 'Margini sotto target (-3-5%)',

          // 4. 🧠 Cosa consiglia l'AI
          aiSuggestion:
            highCostDishes.length === 1
              ? `Rivedi il prezzo di "${worstDish.name}" o ottimizza le porzioni degli ingredienti più costosi`
              : `Analizza i ${highCostDishes.length} piatti e considera: aumento prezzi, porzioni ridotte, o ingredienti alternativi`,

          // Metadata
          timeframe: 'Richiede attenzione',
          confidence: 95,
          dataPoints: [
            `${highCostDishes.length} piatti sopra soglia 35%`,
            `Food cost medio: ${avgFoodCost.toFixed(1)}%`,
            `Piatto peggiore: ${worstDish.name} (${worstDish.food_cost_percent?.toFixed(0)}%)`,
          ],

          // 5. 👉 Cosa fai ORA
          actions: {
            primary: {
              label: 'Analizza costi',
              action: () => {
                window.location.href = '/food-cost';
              },
            },
            secondary: {
              label: 'Dopo',
              action: () => {},
            },
          },
        });
      }

      if (weatherData?.businessImpact) {
        const impact = weatherData.businessImpact;
        const temp = weatherData.current?.temp || 0;

        // Staffing Priority - 5 DOMANDE TEMPLATE
        if (impact.staffAdjustment) {
          const { sala, kitchen, delivery, bar } = impact.staffAdjustment;
          const totalAdjustment = sala + kitchen + delivery + bar;

          if (totalAdjustment !== 0) {
            const isOverstaffed = totalAdjustment < 0;
            const adjustmentDetails = [];

            if (sala !== 0) adjustmentDetails.push(`Sala ${sala > 0 ? '+' : ''}${sala}%`);
            if (delivery !== 0)
              adjustmentDetails.push(`Delivery ${delivery > 0 ? '+' : ''}${delivery}%`);
            if (kitchen !== 0)
              adjustmentDetails.push(`Kitchen ${kitchen > 0 ? '+' : ''}${kitchen}%`);
            if (bar !== 0) adjustmentDetails.push(`Bar ${bar > 0 ? '+' : ''}${bar}%`);

            generatedPriorities.push({
              id: 'staffing-weather',
              level: isOverstaffed ? 'warning' : 'opportunity',
              category: 'staffing',
              // Legacy
              title: isOverstaffed ? 'Possibile overstaffing' : 'Opportunità staff',
              description: `Basato su meteo (${temp}°C, ${weatherData.current?.conditions})`,

              // === 5 DOMANDE TEMPLATE ===
              // 1. ❓ Cosa sta succedendo
              situation: `Oggi ${temp}°C con ${weatherData.current?.conditions?.toLowerCase()}. ${
                isOverstaffed ? 'Affluenza stimata in calo.' : 'Affluenza stimata in aumento.'
              }`,

              // 2. 📉📈 Perché è problema/opportunità
              reason: isOverstaffed
                ? "Con queste condizioni meteo, storicamente l'affluenza cala. Rischio costi personale eccessivi."
                : "Con queste condizioni meteo, storicamente l'affluenza aumenta. Opportunità di servire più clienti.",

              // 3. 💰 Impatto stimato
              impact: adjustmentDetails.join(', '),

              // 4. 🧠 Cosa consiglia l'AI
              aiSuggestion: isOverstaffed
                ? 'Considera di ridurre o spostare personale nelle ore 16-18. Meno costi, stessa qualità servizio.'
                : 'Considera di aumentare personale o chiamare rinforzi per gestire il picco previsto.',

              // Metadata
              timeframe: 'Oggi',
              confidence: 75,
              dataPoints: [
                `Temperatura: ${temp}°C`,
                `Condizioni: ${weatherData?.current?.conditions}`,
                `Umidità: ${weatherData?.current?.humidity}%`,
              ],

              // 5. 👉 Cosa fai ORA
              actions: {
                primary: {
                  label: isOverstaffed ? 'Gestisci turni' : 'Vedi staff',
                  action: () => {
                    window.location.href = '/team';
                  },
                },
                secondary: {
                  label: 'Dopo',
                  action: () => {},
                },
              },
            });
          }
        }

        // Weather-based Promo Priority - 5 DOMANDE TEMPLATE
        if (impact.beverageFocus && impact.marketingHook) {
          const isHotWeather = impact.beverageFocus === 'cold';
          const isColdWeather = impact.beverageFocus === 'hot';
          const beverageType = isHotWeather ? 'fredde' : isColdWeather ? 'calde' : 'stagionali';

          generatedPriorities.push({
            id: 'promo-weather',
            level: 'opportunity',
            category: 'promo',
            // Legacy
            title: `Opportunità bevande ${beverageType}`,
            description: impact.marketingHook,

            // === 5 DOMANDE TEMPLATE ===
            // 1. ❓ Cosa sta succedendo
            situation: `Oggi ${temp}°C - condizioni ideali per bevande ${beverageType}. ${impact.marketingHook}`,

            // 2. 📈 Perché è un'opportunità
            reason: `Le promozioni basate sul meteo hanno un conversion rate +23% superiore. Il timing è perfetto per massimizzare le vendite.`,

            // 3. 💰 Impatto stimato
            impact: impact.deliveryImpact || '+10-15% vendite bevande',

            // 4. 🧠 Cosa consiglia l'AI
            aiSuggestion: isHotWeather
              ? 'Lancia una promo "Beat the Heat" su smoothies, frappè e bevande ghiacciate. Push sui social e in-app.'
              : isColdWeather
                ? 'Spingi combo "Warm Up" con caffè speciali, cioccolate e tè. Evidenzia sul menu digitale.'
                : 'Crea una promo stagionale sulle bevande del momento.',

            // Metadata
            timeframe: 'Oggi',
            confidence: 82,
            dataPoints: [
              `Temperatura: ${temp}°C`,
              `Focus consigliato: bevande ${beverageType}`,
              `Impatto delivery: ${impact.deliveryImpact}`,
              `Impatto dine-in: ${impact.dineInImpact}`,
            ],

            // 5. 👉 Cosa fai ORA
            actions: {
              primary: {
                label: 'Crea promo',
                action: () => {
                  window.location.href = '/marketing/promotions';
                },
              },
              secondary: {
                label: 'Ignora',
                action: () => {},
              },
            },
          });
        }

        // Menu Focus Priority - 5 DOMANDE TEMPLATE
        if (impact.menuSuggestions && impact.menuSuggestions.length > 0) {
          const highPrioritySuggestions = impact.menuSuggestions.filter(
            (s) => s.priority === 'high'
          );

          if (highPrioritySuggestions.length > 0) {
            const suggestion = highPrioritySuggestions[0];
            generatedPriorities.push({
              id: 'menu-focus',
              level: 'opportunity',
              category: 'weather',
              // Legacy
              title: `Spingi categoria: ${suggestion.category}`,
              description: suggestion.reason,

              // === 5 DOMANDE TEMPLATE ===
              // 1. ❓ Cosa sta succedendo
              situation: `Condizioni meteo favorevoli per la categoria "${suggestion.category}"`,

              // 2. 📈 Perché è un'opportunità
              reason: suggestion.reason,

              // 3. 💰 Impatto stimato
              impact: '+8-12% vendite categoria',

              // 4. 🧠 Cosa consiglia l'AI
              aiSuggestion: `Metti in evidenza la categoria "${suggestion.category}" nel menu digitale. Considera di spostarla in alto o aggiungerla ai "Consigliati".`,

              // Metadata
              timeframe: 'Oggi',
              confidence: 70,
              dataPoints: [
                `Categoria consigliata: ${suggestion.category}`,
                `Priorità: ${suggestion.priority}`,
                `Temperatura: ${temp}°C`,
              ],

              // 5. 👉 Cosa fai ORA
              actions: {
                primary: {
                  label: 'Aggiorna menu',
                  action: () => {
                    window.location.href = '/menu';
                  },
                },
                secondary: {
                  label: 'Dopo',
                  action: () => {},
                },
              },
            });
          }
        }
      }

      // If no priorities generated, add a placeholder
      if (generatedPriorities.length === 0) {
        // No action needed - we'll show "All good" state
      }

      // Sort by priority level: critical > warning > opportunity
      const levelOrder: Record<PriorityLevel, number> = {
        critical: 0,
        warning: 1,
        opportunity: 2,
      };

      generatedPriorities.sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);

      // Limit to max 3 priorities
      setPriorities(generatedPriorities.slice(0, 3));

      // === SCENARIO DETECTION ===
      const now = new Date();
      const currentHour = now.getHours();
      const dayOfWeek = now.getDay();

      const scenarioInput: ScenarioInput = {
        currentHour,
        dayOfWeek,
        estimatedTraffic: estimateTraffic(currentHour, dayOfWeek),
        weather: weatherData?.current
          ? {
              temp: weatherData.current.temp,
              conditions: weatherData.current.conditions,
              isRaining:
                weatherData.current.conditions.toLowerCase().includes('rain') ||
                weatherData.current.conditions.toLowerCase().includes('storm'),
            }
          : undefined,
        foodCost:
          foodCostDishes.length > 0
            ? {
                highCostDishCount: highCostDishes.length,
                avgFoodCostPercent:
                  highCostDishes.length > 0
                    ? highCostDishes.reduce((sum, d) => sum + (d.food_cost_percent || 0), 0) /
                      highCostDishes.length
                    : 0,
                criticalDishCount: foodCostDishes.filter(
                  (d) => d.food_cost_percent !== null && d.food_cost_percent > 45
                ).length,
              }
            : undefined,
      };

      const detectedScenario = detectScenario(scenarioInput);
      setScenario(detectedScenario);

      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching priorities:', err);
      setError('Impossibile caricare le priorità');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPriorities();
  }, [location?.id]);

  // Show setup prompt if no location selected
  if (!location) {
    return (
      <div className="rounded-xl border-2 border-dashed border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-purple-100 p-3">
            <Brain className="h-8 w-8 text-purple-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">AI Co-Manager</h2>
              <Sparkles className="h-4 w-4 text-purple-500" />
            </div>
            <p className="mt-1 text-gray-600">
              Seleziona una location dal menu in alto a sinistra per attivare i suggerimenti AI
              personalizzati.
            </p>
          </div>
          <a
            href="/onboarding"
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
          >
            Setup Location
          </a>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-8">
        <div className="flex items-center justify-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
          <span className="text-gray-500">Analisi AI in corso...</span>
        </div>
      </div>
    );
  }

  // All good state - no priorities
  if (priorities.length === 0 && !error) {
    return (
      <div className="rounded-xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-green-100 p-3">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">AI Co-Manager</h2>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                Tutto OK
              </span>
            </div>
            <p className="mt-1 text-gray-600">
              Nessuna azione richiesta al momento. Situazione sotto controllo.
            </p>
          </div>
          <button
            onClick={fetchPriorities}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/50 hover:text-gray-600"
            title="Aggiorna"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
        {lastUpdated && (
          <p className="mt-3 text-xs text-gray-400">
            Ultimo aggiornamento: {lastUpdated.toLocaleTimeString('it-IT')}
          </p>
        )}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-xl border-2 border-red-200 bg-red-50 p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-red-100 p-3">
            <Brain className="h-8 w-8 text-red-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">AI Co-Manager</h2>
            <p className="text-sm text-red-600">{error}</p>
          </div>
          <button
            onClick={fetchPriorities}
            className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-200"
          >
            Riprova
          </button>
        </div>
      </div>
    );
  }

  // Priorities state
  const criticalCount = priorities.filter((p) => p.level === 'critical').length;
  const warningCount = priorities.filter((p) => p.level === 'warning').length;
  const opportunityCount = priorities.filter((p) => p.level === 'opportunity').length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 p-2.5">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900">AI Priorities</h2>
              <Sparkles className="h-4 w-4 text-purple-500" />
            </div>
            <p className="text-sm text-gray-500">
              {criticalCount > 0 && (
                <span className="font-medium text-red-600">{criticalCount} urgente</span>
              )}
              {criticalCount > 0 && (warningCount > 0 || opportunityCount > 0) && ' · '}
              {warningCount > 0 && (
                <span className="font-medium text-amber-600">{warningCount} attenzione</span>
              )}
              {warningCount > 0 && opportunityCount > 0 && ' · '}
              {opportunityCount > 0 && (
                <span className="font-medium text-green-600">{opportunityCount} opportunità</span>
              )}
            </p>
          </div>
        </div>
        <button
          onClick={fetchPriorities}
          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          title="Aggiorna"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      {/* Operational Scenario Banner */}
      {scenario && <ScenarioBanner scenario={scenario} />}

      {/* Priority Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {priorities.map((priority) => (
          <AIPriorityCard key={priority.id} priority={priority} />
        ))}
      </div>

      {/* Last updated */}
      {lastUpdated && (
        <p className="text-xs text-gray-400">
          Aggiornato: {lastUpdated.toLocaleTimeString('it-IT')}
        </p>
      )}
    </div>
  );
}
