'use client';

import { useState, useEffect } from 'react';
import { Brain, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import { useTenant } from '@/lib/contexts/TenantContext';
import { AIPriorityCard, AIPriority, PriorityLevel } from './AIPriorityCard';

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

export function AIPrioritiesHero() {
  const { location } = useTenant();
  const [priorities, setPriorities] = useState<AIPriority[]>([]);
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
      // Fetch weather data
      const weatherRes = await fetch(`/api/ai/weather?locationId=${location.id}`);
      let weatherData: WeatherData | null = null;

      if (weatherRes.ok) {
        weatherData = await weatherRes.json();
      }

      // Generate priorities based on available data
      const generatedPriorities: AIPriority[] = [];

      if (weatherData?.businessImpact) {
        const impact = weatherData.businessImpact;
        const temp = weatherData.current?.temp || 0;

        // Staffing Priority
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
              title: isOverstaffed ? 'Possibile overstaffing' : 'Staff adjustment suggerito',
              description: `Basato su meteo (${temp}°C, ${weatherData.current?.conditions}). ${
                isOverstaffed
                  ? 'Considera di ridurre staff nelle ore di punta.'
                  : 'Considera di aumentare staff per gestire domanda.'
              }`,
              impact: adjustmentDetails.join(', '),
              timeframe: 'Oggi',
              confidence: 75,
              actions: {
                primary: {
                  label: 'Vedi dettagli',
                  action: () => {
                    // Could open a modal or navigate to team page
                    window.location.href = '/team';
                  },
                },
                secondary: {
                  label: 'Dopo',
                  action: () => {},
                },
              },
              onExplain: () => {
                alert(
                  `Suggerimento basato su:\n\n` +
                    `• Temperatura: ${temp}°C\n` +
                    `• Condizioni: ${weatherData?.current?.conditions}\n` +
                    `• Umidità: ${weatherData?.current?.humidity}%\n\n` +
                    `Storicamente, queste condizioni impattano affluenza e delivery.`
                );
              },
            });
          }
        }

        // Weather-based Promo Priority
        if (impact.beverageFocus && impact.marketingHook) {
          const isHotWeather = impact.beverageFocus === 'cold';
          const isColdWeather = impact.beverageFocus === 'hot';

          generatedPriorities.push({
            id: 'promo-weather',
            level: 'opportunity',
            category: 'promo',
            title: isHotWeather
              ? 'Opportunità bevande fredde'
              : isColdWeather
                ? 'Opportunità bevande calde'
                : 'Opportunità menu',
            description: impact.marketingHook,
            impact: impact.deliveryImpact || '+10-15%',
            timeframe: 'Oggi',
            confidence: 82,
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
            onExplain: () => {
              alert(
                `Suggerimento basato su:\n\n` +
                  `• Temperatura: ${temp}°C\n` +
                  `• Focus bevande: ${impact.beverageFocus}\n` +
                  `• Impatto delivery: ${impact.deliveryImpact}\n` +
                  `• Impatto dine-in: ${impact.dineInImpact}\n\n` +
                  `Promozioni basate sul meteo hanno conversion rate +23% superiore.`
              );
            },
          });
        }

        // Menu Focus Priority
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
              title: `Spingi categoria: ${suggestion.category}`,
              description: suggestion.reason,
              timeframe: 'Oggi',
              confidence: 70,
              actions: {
                primary: {
                  label: 'Aggiorna menu',
                  action: () => {
                    window.location.href = '/menu';
                  },
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
