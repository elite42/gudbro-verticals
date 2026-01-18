/**
 * Alert Definitions and Thresholds
 *
 * Defines what metrics to monitor, warning/critical thresholds,
 * and specific actions to take when thresholds are breached.
 *
 * Alert Levels:
 * - INFO: Informational, no action needed
 * - WARNING: Approaching limits, plan action soon
 * - CRITICAL: Immediate action required
 */

import { getMetricsSummary, getCacheHitRate, getErrorRate } from './metrics';
import { logger } from './logger';
import { createClient } from '@/lib/supabase-server';

/**
 * Alert severity levels
 */
export type AlertLevel = 'INFO' | 'WARNING' | 'CRITICAL';

/**
 * Alert definition structure
 */
export interface AlertDefinition {
  id: string;
  name: string;
  description: string;
  category: 'performance' | 'database' | 'errors' | 'capacity' | 'business';
  checkFn: () => Promise<AlertCheckResult>;
  warningThreshold: number;
  criticalThreshold: number;
  /** Higher = worse (like response time). Lower = worse (like cache hit rate) */
  higherIsBad: boolean;
  /** Action to take at WARNING level */
  warningAction: string;
  /** Action to take at CRITICAL level */
  criticalAction: string;
  /** How often to check (minutes) */
  checkIntervalMinutes: number;
}

export interface AlertCheckResult {
  currentValue: number;
  unit: string;
  level: AlertLevel;
  message: string;
  action?: string;
  metadata?: Record<string, unknown>;
}

export interface AlertStatus {
  alert: AlertDefinition;
  result: AlertCheckResult;
  timestamp: Date;
}

/**
 * All alert definitions
 */
export const ALERTS: AlertDefinition[] = [
  // ============================================
  // PERFORMANCE ALERTS
  // ============================================
  {
    id: 'api_response_time_p95',
    name: 'API Response Time (P95)',
    description: 'P95 response time across all API endpoints',
    category: 'performance',
    warningThreshold: 500, // 500ms
    criticalThreshold: 1000, // 1 second
    higherIsBad: true,
    warningAction: `
      **Azione:** Attiva caching aggressivo
      1. Verifica che Redis sia configurato (UPSTASH_REDIS_REST_URL)
      2. Controlla cache hit rate nel dashboard
      3. Considera attivare Vercel KV per edge caching
    `,
    criticalAction: `
      **Azione URGENTE:** Performance degradata
      1. Controlla Sentry per errori recenti
      2. Verifica query lente: SELECT * FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10
      3. Considera scalare a Supabase Pro per più risorse
      4. Attiva rate limiting più aggressivo temporaneamente
    `,
    checkIntervalMinutes: 5,
    checkFn: async () => {
      const summary = await getMetricsSummary('api_response_time', 15);
      const value = summary.p95;
      return {
        currentValue: value,
        unit: 'ms',
        level: getLevel(value, 500, 1000, true),
        message: `P95 response time: ${Math.round(value)}ms (${summary.count} requests)`,
        metadata: { ...summary },
      };
    },
  },

  {
    id: 'db_query_time_p95',
    name: 'Database Query Time (P95)',
    description: 'P95 database query execution time',
    category: 'database',
    warningThreshold: 100, // 100ms
    criticalThreshold: 300, // 300ms
    higherIsBad: true,
    warningAction: `
      **Azione:** Ottimizza query database
      1. Esegui: SELECT * FROM v_shard_distribution per verificare bilanciamento
      2. Controlla indici mancanti con pg_stat_user_indexes
      3. Considera aggiungere indici per query frequenti
    `,
    criticalAction: `
      **Azione URGENTE:** Database sovraccarico
      1. Attiva read replica (SUPABASE_READ_REPLICA_URL)
      2. Verifica lock contention: SELECT * FROM pg_locks WHERE NOT granted
      3. Considera upgrade Supabase tier
      4. Attiva archive maintenance per ridurre dimensioni tabelle
    `,
    checkIntervalMinutes: 5,
    checkFn: async () => {
      const summary = await getMetricsSummary('db_query_time', 15);
      const value = summary.p95;
      return {
        currentValue: value,
        unit: 'ms',
        level: getLevel(value, 100, 300, true),
        message: `P95 query time: ${Math.round(value)}ms`,
        metadata: { ...summary },
      };
    },
  },

  // ============================================
  // CACHE ALERTS
  // ============================================
  {
    id: 'cache_hit_rate',
    name: 'Cache Hit Rate',
    description: 'Percentage of requests served from cache',
    category: 'performance',
    warningThreshold: 70, // Below 70% is warning
    criticalThreshold: 50, // Below 50% is critical
    higherIsBad: false, // Lower is bad
    warningAction: `
      **Azione:** Migliora cache hit rate
      1. Verifica TTL delle cache keys in lib/cache/keys.ts
      2. Aumenta TTL per dati che cambiano raramente (menu, config)
      3. Implementa cache warming per dati popolari
    `,
    criticalAction: `
      **Azione URGENTE:** Cache inefficace
      1. Controlla se Redis è connesso
      2. Verifica memoria Redis: redis-cli INFO memory
      3. Considera upgrade Redis plan se memoria piena
      4. Attiva Vercel KV per edge caching
    `,
    checkIntervalMinutes: 15,
    checkFn: async () => {
      const hitRate = await getCacheHitRate(60);
      return {
        currentValue: hitRate,
        unit: '%',
        level: getLevel(hitRate, 70, 50, false),
        message: `Cache hit rate: ${hitRate.toFixed(1)}%`,
      };
    },
  },

  // ============================================
  // ERROR ALERTS
  // ============================================
  {
    id: 'error_rate',
    name: 'Error Rate',
    description: 'Errors per minute across the application',
    category: 'errors',
    warningThreshold: 5, // 5 errors/minute
    criticalThreshold: 20, // 20 errors/minute
    higherIsBad: true,
    warningAction: `
      **Azione:** Investiga errori
      1. Controlla Sentry dashboard per errori recenti
      2. Verifica logs: tail -f /var/log/app.log | grep ERROR
      3. Controlla health dei servizi esterni (Supabase, OpenAI)
    `,
    criticalAction: `
      **Azione URGENTE:** Alto tasso di errori
      1. Controlla IMMEDIATAMENTE Sentry per stack traces
      2. Verifica status Supabase: https://status.supabase.com
      3. Verifica status OpenAI: https://status.openai.com
      4. Considera attivare maintenance mode se necessario
      5. Controlla deploy recenti per possibili regressioni
    `,
    checkIntervalMinutes: 5,
    checkFn: async () => {
      const errorRate = await getErrorRate(15);
      return {
        currentValue: errorRate,
        unit: 'errors/min',
        level: getLevel(errorRate, 5, 20, true),
        message: `Error rate: ${errorRate.toFixed(2)} errors/minute`,
      };
    },
  },

  // ============================================
  // DATABASE CAPACITY ALERTS
  // ============================================
  {
    id: 'db_connections',
    name: 'Database Connections',
    description: 'Active database connections vs limit',
    category: 'database',
    warningThreshold: 70, // 70% of max
    criticalThreshold: 90, // 90% of max
    higherIsBad: true,
    warningAction: `
      **Azione:** Gestisci connessioni DB
      1. Verifica connection pooling attivo (Supabase Pooler)
      2. Controlla query bloccate: SELECT * FROM pg_stat_activity WHERE state = 'active'
      3. Considera implementare connection timeout più aggressivo
    `,
    criticalAction: `
      **Azione URGENTE:** Connessioni DB quasi esaurite
      1. Termina query lunghe: SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE duration > interval '5 minutes'
      2. Attiva PgBouncer se non attivo
      3. Upgrade Supabase tier per più connessioni
      4. Implementa circuit breaker per servizi esterni
    `,
    checkIntervalMinutes: 5,
    checkFn: async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.rpc('get_db_stats').single();
        const stats = data as { max_connections?: number; active_connections?: number } | null;

        // Default max connections for Supabase free tier
        const maxConnections = stats?.max_connections || 60;
        const activeConnections = stats?.active_connections || 0;
        const percentage = (activeConnections / maxConnections) * 100;

        return {
          currentValue: percentage,
          unit: '%',
          level: getLevel(percentage, 70, 90, true),
          message: `DB connections: ${activeConnections}/${maxConnections} (${percentage.toFixed(1)}%)`,
          metadata: { activeConnections, maxConnections },
        };
      } catch {
        // If we can't check, assume OK
        return {
          currentValue: 0,
          unit: '%',
          level: 'INFO',
          message: 'Unable to check DB connections (function may not exist)',
        };
      }
    },
  },

  {
    id: 'db_size',
    name: 'Database Size',
    description: 'Database storage usage',
    category: 'database',
    warningThreshold: 70, // 70% of limit
    criticalThreshold: 90, // 90% of limit
    higherIsBad: true,
    warningAction: `
      **Azione:** Gestisci spazio database
      1. Esegui archive maintenance: curl /api/maintenance/archive
      2. Verifica tabelle più grandi: SELECT pg_size_pretty(pg_total_relation_size(tablename)) FROM pg_tables
      3. Considera data retention policy più aggressiva
    `,
    criticalAction: `
      **Azione URGENTE:** Database quasi pieno
      1. Esegui IMMEDIATAMENTE archive maintenance
      2. VACUUM FULL sulle tabelle più grandi
      3. Elimina dati vecchi non necessari
      4. Upgrade Supabase tier per più storage
    `,
    checkIntervalMinutes: 60,
    checkFn: async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.rpc('get_db_size_stats').single();
        const stats = data as { storage_limit_mb?: number; storage_used_mb?: number } | null;

        // Supabase free tier: 500MB, Pro: 8GB
        const limitMB = stats?.storage_limit_mb || 500;
        const usedMB = stats?.storage_used_mb || 0;
        const percentage = (usedMB / limitMB) * 100;

        return {
          currentValue: percentage,
          unit: '%',
          level: getLevel(percentage, 70, 90, true),
          message: `DB size: ${usedMB.toFixed(0)}MB / ${limitMB}MB (${percentage.toFixed(1)}%)`,
          metadata: { usedMB, limitMB },
        };
      } catch {
        return {
          currentValue: 0,
          unit: '%',
          level: 'INFO',
          message: 'Unable to check DB size (function may not exist)',
        };
      }
    },
  },

  // ============================================
  // BUSINESS ALERTS
  // ============================================
  {
    id: 'orders_per_hour',
    name: 'Orders Volume',
    description: 'Orders processed per hour',
    category: 'business',
    warningThreshold: 100, // Alert if > 100/hour (scaling needed)
    criticalThreshold: 500, // Alert if > 500/hour (urgent scaling)
    higherIsBad: true,
    warningAction: `
      **Buona notizia!** Volume ordini in crescita
      1. Verifica che sistema regga il carico
      2. Considera attivare Trigger.dev per background processing
      3. Prepara upgrade infrastruttura
    `,
    criticalAction: `
      **Volume altissimo!** Scaling necessario
      1. Attiva TUTTE le ottimizzazioni Phase 2/3
      2. Considera upgrade Supabase a Pro/Team
      3. Attiva multi-region se utenti globali
      4. Contatta supporto se problemi
    `,
    checkIntervalMinutes: 15,
    checkFn: async () => {
      try {
        const supabase = createClient();
        const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
        const { count } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', oneHourAgo);

        const ordersPerHour = count || 0;

        return {
          currentValue: ordersPerHour,
          unit: 'orders/hour',
          level: getLevel(ordersPerHour, 100, 500, true),
          message: `Order volume: ${ordersPerHour} orders in last hour`,
        };
      } catch {
        return {
          currentValue: 0,
          unit: 'orders/hour',
          level: 'INFO',
          message: 'Unable to check order volume',
        };
      }
    },
  },

  {
    id: 'active_users',
    name: 'Active Users (DAU)',
    description: 'Daily active users',
    category: 'business',
    warningThreshold: 1000, // 1K DAU
    criticalThreshold: 10000, // 10K DAU
    higherIsBad: true,
    warningAction: `
      **Crescita utenti!** Prepara scaling
      1. Assicurati Phase 2 sia attiva (Trigger.dev, materialized views)
      2. Monitora performance più frequentemente
      3. Considera upgrade tier servizi
    `,
    criticalAction: `
      **10K+ utenti!** Scaling immediato
      1. Attiva TUTTO: read replicas, edge caching, multi-region
      2. Upgrade Supabase a Team/Enterprise
      3. Considera CDN dedicato per assets
      4. Implementa sharding se necessario
    `,
    checkIntervalMinutes: 60,
    checkFn: async () => {
      try {
        const supabase = createClient();
        const oneDayAgo = new Date(Date.now() - 86400000).toISOString();
        const { count } = await supabase
          .from('analytics_events')
          .select('session_id', { count: 'exact', head: true })
          .gte('created_at', oneDayAgo);

        // Rough estimate: unique sessions ≈ DAU
        const dau = count || 0;

        return {
          currentValue: dau,
          unit: 'users',
          level: getLevel(dau, 1000, 10000, true),
          message: `Daily active users: ~${dau}`,
        };
      } catch {
        return {
          currentValue: 0,
          unit: 'users',
          level: 'INFO',
          message: 'Unable to check active users',
        };
      }
    },
  },
];

/**
 * Determine alert level based on value and thresholds
 */
function getLevel(
  value: number,
  warningThreshold: number,
  criticalThreshold: number,
  higherIsBad: boolean
): AlertLevel {
  if (higherIsBad) {
    if (value >= criticalThreshold) return 'CRITICAL';
    if (value >= warningThreshold) return 'WARNING';
    return 'INFO';
  } else {
    // Lower is bad (e.g., cache hit rate)
    if (value <= criticalThreshold) return 'CRITICAL';
    if (value <= warningThreshold) return 'WARNING';
    return 'INFO';
  }
}

/**
 * Run all alert checks
 */
export async function checkAllAlerts(): Promise<AlertStatus[]> {
  const results: AlertStatus[] = [];

  for (const alert of ALERTS) {
    try {
      const result = await alert.checkFn();

      // Add action based on level
      if (result.level === 'WARNING') {
        result.action = alert.warningAction;
      } else if (result.level === 'CRITICAL') {
        result.action = alert.criticalAction;
      }

      results.push({
        alert,
        result,
        timestamp: new Date(),
      });

      // Log alerts
      if (result.level !== 'INFO') {
        logger.warn(
          {
            alertId: alert.id,
            alertName: alert.name,
            level: result.level,
            value: result.currentValue,
            unit: result.unit,
            message: result.message,
          },
          `Alert triggered: ${alert.name}`
        );
      }
    } catch (error) {
      logger.error(
        {
          alertId: alert.id,
          alertName: alert.name,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        `Failed to check alert: ${alert.name}`
      );
    }
  }

  return results;
}

/**
 * Get only triggered alerts (WARNING or CRITICAL)
 */
export async function getTriggeredAlerts(): Promise<AlertStatus[]> {
  const all = await checkAllAlerts();
  return all.filter((s) => s.result.level !== 'INFO');
}

/**
 * Get alerts by category
 */
export function getAlertsByCategory(category: AlertDefinition['category']): AlertDefinition[] {
  return ALERTS.filter((a) => a.category === category);
}
