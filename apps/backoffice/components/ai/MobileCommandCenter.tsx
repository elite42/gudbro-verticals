'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2 } from 'lucide-react';
import { useTenant } from '@/lib/contexts/TenantContext';
import { MobileDecisionCard, MobileDecision } from './MobileDecisionCard';
import { ScenarioChip } from './ScenarioBanner';
import {
  detectScenario,
  estimateTraffic,
  type OperationalScenario,
  type ScenarioInput,
} from '@/lib/ai/scenario-detection';

interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    conditions: string;
  };
  businessImpact?: {
    deliveryImpact: string;
    dineInImpact: string;
    outdoorSeating: boolean;
    recommendedActions: string[];
    staffAdjustment?: {
      sala: number;
      kitchen: number;
      delivery: number;
      bar: number;
    };
    beverageFocus?: 'hot' | 'cold' | 'mixed';
  };
}

interface FoodCostDish {
  id: string;
  name: string;
  food_cost_percent: number | null;
  selling_price: number | null;
  ingredient_cost: number | null;
}

/**
 * Mobile Command Center
 *
 * Mobile-first view for quick decisions.
 * Principles from spec:
 * - Mobile = telecomando, non backoffice
 * - Target: 8-12 secondi sessione media
 * - Max 2 decisioni mostrate
 * - Zero esplorazione
 */
export function MobileCommandCenter() {
  const { location, brand } = useTenant();
  const [decisions, setDecisions] = useState<MobileDecision[]>([]);
  const [scenario, setScenario] = useState<OperationalScenario | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [temperature, setTemperature] = useState<number | null>(null);
  const [allDone, setAllDone] = useState(false);

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchDecisions = async () => {
    if (!location?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const [weatherRes, foodCostRes] = await Promise.all([
        fetch(`/api/ai/weather?locationId=${location.id}`),
        fetch(`/api/food-cost/dishes?locationId=${location.id}`),
      ]);

      let weatherData: WeatherData | null = null;
      let foodCostDishes: FoodCostDish[] = [];

      if (weatherRes.ok) {
        weatherData = await weatherRes.json();
        setTemperature(weatherData?.current?.temp ?? null);
      }

      if (foodCostRes.ok) {
        const data = await foodCostRes.json();
        foodCostDishes = data.dishes || [];
      }

      const generatedDecisions: MobileDecision[] = [];

      // Decision 1: Food Cost Issues
      const highCostDishes = foodCostDishes.filter(
        (d) => d.food_cost_percent !== null && d.food_cost_percent > 35
      );

      if (highCostDishes.length > 0) {
        const sortedHighCost = [...highCostDishes].sort(
          (a, b) => (b.food_cost_percent || 0) - (a.food_cost_percent || 0)
        );
        const worstDish = sortedHighCost[0];
        const isCritical = highCostDishes.some((d) => (d.food_cost_percent || 0) > 45);

        generatedDecisions.push({
          id: 'food-cost-mobile',
          level: isCritical ? 'critical' : 'warning',
          title: 'Food Cost Alto',
          impact: isCritical ? '-8-12% margini' : '-3-5% margini',
          suggestion: `"${worstDish.name}" ha food cost ${worstDish.food_cost_percent?.toFixed(0)}%. Rivedi prezzo o porzioni.`,
          actions: {
            primary: {
              label: 'ANALIZZA',
              icon: '📊',
              action: async () => {
                window.location.href = '/food-cost';
              },
            },
            secondary: {
              label: 'DOPO',
              icon: '⏰',
              action: async () => {},
            },
          },
        });
      }

      // Decision 2: Staffing based on weather
      if (weatherData?.businessImpact?.staffAdjustment) {
        const { sala, kitchen, delivery, bar } = weatherData.businessImpact.staffAdjustment;
        const totalAdjustment = sala + kitchen + delivery + bar;

        if (totalAdjustment < -10) {
          // Overstaffing warning
          generatedDecisions.push({
            id: 'staffing-mobile',
            level: 'warning',
            title: 'Overstaffing imminente',
            timeframe: 'Oggi pomeriggio',
            impact: `-${Math.abs(totalAdjustment) * 3}€`,
            suggestion: `Affluenza stimata in calo. Consiglio: riduci ${Math.abs(Math.round(sala / 10))} FOH.`,
            actions: {
              primary: {
                label: 'APPLICA',
                icon: '✔️',
                action: async () => {
                  // Would update staffing
                },
              },
              secondary: {
                label: 'IGNORA',
                icon: '❌',
                action: async () => {},
              },
            },
          });
        }
      }

      // Decision 3: Promo based on weather
      if (weatherData?.businessImpact?.beverageFocus && generatedDecisions.length < 2) {
        const focus = weatherData.businessImpact.beverageFocus;
        const temp = weatherData.current?.temp || 0;

        if ((focus === 'cold' && temp > 28) || (focus === 'hot' && temp < 20)) {
          generatedDecisions.push({
            id: 'promo-mobile',
            level: 'warning',
            title: 'Promo suggerita',
            impact: '+8-12%',
            suggestion:
              focus === 'cold'
                ? `Con ${temp}°C, bevande fredde performano. Attivare promo?`
                : `Con ${temp}°C, bevande calde performano. Attivare promo?`,
            actions: {
              primary: {
                label: 'ATTIVA',
                icon: '🚀',
                action: async () => {
                  window.location.href = '/marketing/promotions';
                },
              },
              secondary: {
                label: 'DOPO',
                icon: '⏰',
                action: async () => {},
              },
            },
          });
        }
      }

      // Limit to 2 decisions
      setDecisions(generatedDecisions.slice(0, 2));
      setAllDone(generatedDecisions.length === 0);

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
              conditions: weatherData.current.conditions || '',
              isRaining: false,
            }
          : undefined,
        foodCost:
          highCostDishes.length > 0
            ? {
                highCostDishCount: highCostDishes.length,
                avgFoodCostPercent:
                  highCostDishes.reduce((sum, d) => sum + (d.food_cost_percent || 0), 0) /
                  highCostDishes.length,
                criticalDishCount: highCostDishes.filter(
                  (d) => d.food_cost_percent !== null && d.food_cost_percent > 45
                ).length,
              }
            : undefined,
      };

      const detectedScenario = detectScenario(scenarioInput);
      setScenario(detectedScenario);
    } catch (err) {
      console.error('Error fetching decisions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDecisions();
  }, [location?.id]);

  // When all decisions are dismissed
  const handleDismissAll = () => {
    if (decisions.every((d) => d === null)) {
      setAllDone(true);
    }
  };

  const timeString = currentTime.toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex min-h-[80vh] flex-col bg-gray-50 px-4 py-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="text-2xl">🔥</span>
          <h1 className="text-xl font-bold text-gray-900">AI COMMAND CENTER</h1>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <span className="font-medium">{brand?.name || location?.name || 'GUDBRO'}</span>
          <span>·</span>
          <span>{location?.city || 'Location'}</span>
          <span>·</span>
          <span>{timeString}</span>
          {temperature !== null && (
            <>
              <span>·</span>
              <span>{temperature}°C</span>
            </>
          )}
        </div>
        {/* Current Scenario Chip */}
        {scenario && (
          <div className="mt-3 flex justify-center">
            <ScenarioChip scenario={scenario} />
          </div>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <RefreshCw className="mx-auto mb-3 h-8 w-8 animate-spin text-gray-400" />
            <p className="text-sm text-gray-500">Analizzo la situazione...</p>
          </div>
        </div>
      ) : allDone || decisions.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-900">Tutto sotto controllo!</h2>
          <p className="text-center text-gray-500">
            Nessuna decisione urgente.
            <br />
            Ti avviso se cambia qualcosa.
          </p>
          <button
            onClick={fetchDecisions}
            className="mt-6 flex items-center gap-2 rounded-xl bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200 active:bg-gray-300"
          >
            <RefreshCw className="h-4 w-4" />
            Aggiorna
          </button>
        </div>
      ) : (
        <div className="flex-1">
          {/* Decisions Header */}
          <div className="mb-4 flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700">
              Decisioni Richieste
            </h2>
            <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600">
              {decisions.length}
            </span>
          </div>

          {/* Decision Cards */}
          <div className="space-y-4">
            {decisions.map((decision, index) => (
              <MobileDecisionCard key={decision.id} decision={decision} number={index + 1} />
            ))}
          </div>

          {/* Refresh Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={fetchDecisions}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm text-gray-500 shadow-sm transition-colors hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4" />
              Aggiorna
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
