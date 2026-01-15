/**
 * Operational Scenario Detection
 *
 * 5 Scenari Madre:
 * 1. 🔵 GIORNATA LENTA - Traffico basso, tavoli vuoti
 * 2. 🔴 PICCO IMPROVVISO - Tutto pieno, stress, rischio errori
 * 3. 🟠 MARGINI A RISCHIO - Lavori ma guadagni poco
 * 4. 🟢 OPPORTUNITÀ - Condizioni favorevoli da sfruttare
 * 5. 🟣 CONTROLLO & TRANQUILLITÀ - Tutto ok
 */

export type ScenarioType = 'slow_day' | 'rush_hour' | 'margin_risk' | 'opportunity' | 'all_clear';

export interface OperationalScenario {
  type: ScenarioType;
  emoji: string;
  label: string;
  shortLabel: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  actions: ScenarioAction[];
  confidence: number;
  dataPoints: string[];
}

export interface ScenarioAction {
  id: string;
  label: string;
  icon: string;
  priority: 'high' | 'medium' | 'low';
  href?: string;
  action?: () => void;
}

export interface ScenarioInput {
  // Weather data
  weather?: {
    temp: number;
    conditions: string;
    isRaining: boolean;
  };
  // Food cost data
  foodCost?: {
    highCostDishCount: number;
    avgFoodCostPercent: number;
    criticalDishCount: number;
  };
  // Time context
  currentHour: number;
  dayOfWeek: number; // 0 = Sunday
  // Traffic indicators (simulated for now)
  estimatedTraffic?: 'low' | 'normal' | 'high' | 'peak';
  // Active orders (if available)
  activeOrders?: number;
  avgOrdersAtThisTime?: number;
}

const scenarioConfigs: Record<
  ScenarioType,
  Omit<OperationalScenario, 'confidence' | 'dataPoints' | 'actions'>
> = {
  slow_day: {
    type: 'slow_day',
    emoji: '🔵',
    label: 'Giornata Lenta',
    shortLabel: 'Lento',
    description: 'Traffico sotto la media. Buon momento per azioni proattive.',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  rush_hour: {
    type: 'rush_hour',
    emoji: '🔴',
    label: 'Picco Improvviso',
    shortLabel: 'Picco',
    description: 'Alta affluenza. Focus su velocità e qualità.',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  margin_risk: {
    type: 'margin_risk',
    emoji: '🟠',
    label: 'Margini a Rischio',
    shortLabel: 'Margini',
    description: 'Lavori ma i margini sono sotto pressione.',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  opportunity: {
    type: 'opportunity',
    emoji: '🟢',
    label: 'Opportunità',
    shortLabel: 'Opportunità',
    description: 'Condizioni favorevoli da sfruttare.',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  all_clear: {
    type: 'all_clear',
    emoji: '🟣',
    label: 'Tutto Sotto Controllo',
    shortLabel: 'OK',
    description: 'Nessuna azione richiesta. Operatività regolare.',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
};

/**
 * Detect the current operational scenario based on available data
 */
export function detectScenario(input: ScenarioInput): OperationalScenario {
  const scores: Record<ScenarioType, { score: number; dataPoints: string[] }> = {
    slow_day: { score: 0, dataPoints: [] },
    rush_hour: { score: 0, dataPoints: [] },
    margin_risk: { score: 0, dataPoints: [] },
    opportunity: { score: 0, dataPoints: [] },
    all_clear: { score: 0, dataPoints: [] },
  };

  // === MARGIN RISK Detection ===
  if (input.foodCost) {
    if (input.foodCost.criticalDishCount > 0) {
      scores.margin_risk.score += 40;
      scores.margin_risk.dataPoints.push(
        `${input.foodCost.criticalDishCount} piatti con food cost critico (>45%)`
      );
    }
    if (input.foodCost.highCostDishCount > 2) {
      scores.margin_risk.score += 30;
      scores.margin_risk.dataPoints.push(
        `${input.foodCost.highCostDishCount} piatti sopra soglia 35%`
      );
    }
    if (input.foodCost.avgFoodCostPercent > 38) {
      scores.margin_risk.score += 20;
      scores.margin_risk.dataPoints.push(
        `Food cost medio ${input.foodCost.avgFoodCostPercent.toFixed(0)}%`
      );
    }
  }

  // === SLOW DAY Detection ===
  if (input.estimatedTraffic === 'low') {
    scores.slow_day.score += 40;
    scores.slow_day.dataPoints.push('Traffico stimato basso');
  }
  if (input.weather?.isRaining) {
    scores.slow_day.score += 20;
    scores.slow_day.dataPoints.push(`Pioggia in corso`);
  }
  // Weekday afternoon typically slower
  if (
    input.dayOfWeek >= 1 &&
    input.dayOfWeek <= 4 &&
    input.currentHour >= 14 &&
    input.currentHour <= 17
  ) {
    scores.slow_day.score += 15;
    scores.slow_day.dataPoints.push('Fascia oraria tipicamente lenta');
  }
  if (input.activeOrders !== undefined && input.avgOrdersAtThisTime !== undefined) {
    if (input.activeOrders < input.avgOrdersAtThisTime * 0.6) {
      scores.slow_day.score += 25;
      scores.slow_day.dataPoints.push(
        `Ordini -${Math.round((1 - input.activeOrders / input.avgOrdersAtThisTime) * 100)}% vs media`
      );
    }
  }

  // === RUSH HOUR Detection ===
  if (input.estimatedTraffic === 'peak') {
    scores.rush_hour.score += 50;
    scores.rush_hour.dataPoints.push('Traffico al massimo');
  } else if (input.estimatedTraffic === 'high') {
    scores.rush_hour.score += 30;
    scores.rush_hour.dataPoints.push('Traffico alto');
  }
  // Typical rush hours
  if (
    (input.currentHour >= 12 && input.currentHour <= 14) ||
    (input.currentHour >= 19 && input.currentHour <= 21)
  ) {
    scores.rush_hour.score += 15;
    scores.rush_hour.dataPoints.push('Fascia oraria di punta');
  }
  // Weekend dinner
  if ((input.dayOfWeek === 5 || input.dayOfWeek === 6) && input.currentHour >= 19) {
    scores.rush_hour.score += 20;
    scores.rush_hour.dataPoints.push('Weekend serale');
  }
  if (input.activeOrders !== undefined && input.avgOrdersAtThisTime !== undefined) {
    if (input.activeOrders > input.avgOrdersAtThisTime * 1.4) {
      scores.rush_hour.score += 30;
      scores.rush_hour.dataPoints.push(
        `Ordini +${Math.round((input.activeOrders / input.avgOrdersAtThisTime - 1) * 100)}% vs media`
      );
    }
  }

  // === OPPORTUNITY Detection ===
  if (input.weather && !input.weather.isRaining) {
    if (input.weather.temp >= 20 && input.weather.temp <= 28) {
      scores.opportunity.score += 25;
      scores.opportunity.dataPoints.push(`Meteo ideale (${input.weather.temp}°C)`);
    }
    if (
      input.weather.conditions.toLowerCase().includes('sun') ||
      input.weather.conditions.toLowerCase().includes('clear')
    ) {
      scores.opportunity.score += 15;
      scores.opportunity.dataPoints.push('Cielo sereno');
    }
  }
  // Weekend lunch is opportunity
  if (
    (input.dayOfWeek === 0 || input.dayOfWeek === 6) &&
    input.currentHour >= 11 &&
    input.currentHour <= 14
  ) {
    scores.opportunity.score += 20;
    scores.opportunity.dataPoints.push('Pranzo weekend');
  }

  // Find the highest scoring scenario
  let maxScore = 0;
  let detectedType: ScenarioType = 'all_clear';

  for (const [type, data] of Object.entries(scores) as [
    ScenarioType,
    { score: number; dataPoints: string[] },
  ][]) {
    if (data.score > maxScore && type !== 'all_clear') {
      maxScore = data.score;
      detectedType = type;
    }
  }

  // If no scenario scores above threshold, it's all clear
  if (maxScore < 30) {
    detectedType = 'all_clear';
    scores.all_clear.dataPoints.push('Nessuna anomalia rilevata');
    scores.all_clear.dataPoints.push('Operatività regolare');
  }

  // Generate actions based on scenario
  const actions = getScenarioActions(detectedType);

  // Calculate confidence (normalized score)
  const confidence = detectedType === 'all_clear' ? 95 : Math.min(95, Math.max(50, maxScore + 30));

  return {
    ...scenarioConfigs[detectedType],
    confidence,
    dataPoints: scores[detectedType].dataPoints.slice(0, 3),
    actions,
  };
}

function getScenarioActions(type: ScenarioType): ScenarioAction[] {
  switch (type) {
    case 'slow_day':
      return [
        {
          id: 'promo-flash',
          label: 'Lancia promo flash',
          icon: '⚡',
          priority: 'high',
          href: '/marketing/promotions',
        },
        {
          id: 'push-drinks',
          label: 'Push bevande',
          icon: '🍹',
          priority: 'medium',
          href: '/marketing/promotions',
        },
        {
          id: 'notify-customers',
          label: 'Notifica clienti',
          icon: '📱',
          priority: 'medium',
          href: '/customers',
        },
        { id: 'reduce-staff', label: 'Riduci staff', icon: '👥', priority: 'low', href: '/team' },
      ];

    case 'rush_hour':
      return [
        {
          id: 'pause-slow',
          label: 'Pausa piatti lenti',
          icon: '⏸️',
          priority: 'high',
          href: '/content/menu',
        },
        {
          id: 'suggest-fast',
          label: 'Suggerisci veloci',
          icon: '🚀',
          priority: 'high',
          href: '/content/menu',
        },
        {
          id: 'reinforce-kitchen',
          label: 'Rinforza cucina',
          icon: '👨‍🍳',
          priority: 'medium',
          href: '/team',
        },
      ];

    case 'margin_risk':
      return [
        {
          id: 'fix-prices',
          label: 'Correggi prezzi',
          icon: '💰',
          priority: 'high',
          href: '/food-cost',
        },
        {
          id: 'reduce-portions',
          label: 'Rivedi porzioni',
          icon: '📏',
          priority: 'medium',
          href: '/content/recipes',
        },
        {
          id: 'substitute-ingredients',
          label: 'Sostituisci ingredienti',
          icon: '🔄',
          priority: 'medium',
          href: '/content/ingredients',
        },
      ];

    case 'opportunity':
      return [
        {
          id: 'highlight-top',
          label: 'Evidenzia top seller',
          icon: '⭐',
          priority: 'high',
          href: '/content/menu',
        },
        {
          id: 'update-qr',
          label: 'Aggiorna QR',
          icon: '📱',
          priority: 'medium',
          href: '/qr-codes',
        },
        {
          id: 'soft-promo',
          label: 'Promo soft',
          icon: '🎁',
          priority: 'low',
          href: '/marketing/promotions',
        },
      ];

    case 'all_clear':
      return [
        {
          id: 'view-analytics',
          label: 'Vedi analytics',
          icon: '📊',
          priority: 'low',
          href: '/analytics',
        },
      ];

    default:
      return [];
  }
}

/**
 * Get a simple traffic estimate based on time and day
 * In production, this would use historical data
 */
export function estimateTraffic(
  hour: number,
  dayOfWeek: number
): 'low' | 'normal' | 'high' | 'peak' {
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const isFriday = dayOfWeek === 5;

  // Lunch rush
  if (hour >= 12 && hour <= 14) {
    if (isWeekend) return 'peak';
    return 'high';
  }

  // Dinner rush
  if (hour >= 19 && hour <= 21) {
    if (isWeekend || isFriday) return 'peak';
    return 'high';
  }

  // Late night (closing)
  if (hour >= 22 || hour < 10) {
    return 'low';
  }

  // Afternoon lull
  if (hour >= 14 && hour <= 17) {
    if (isWeekend) return 'normal';
    return 'low';
  }

  return 'normal';
}
