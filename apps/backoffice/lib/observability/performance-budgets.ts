/**
 * Performance Budgets
 *
 * Defines and enforces latency budgets for different operation types.
 * Helps identify performance regressions before they impact users.
 *
 * Phase 3: 10K → 100K users
 *
 * Usage:
 * ```ts
 * import { checkBudget, trackPerformance, PerformanceBudgets } from '@/lib/observability/performance-budgets';
 *
 * // Check if operation meets budget
 * const start = Date.now();
 * const result = await fetchMenu(slug);
 * const duration = Date.now() - start;
 *
 * const check = checkBudget('api', 'menu', duration);
 * if (!check.passed) {
 *   logger.warn('Performance budget exceeded', { ...check, duration });
 * }
 *
 * // Or use the tracking wrapper
 * const result = await trackPerformance('api', 'menu', () => fetchMenu(slug));
 * ```
 */

import { logger } from './logger';

/**
 * Performance budget definitions (in milliseconds)
 *
 * P50: Median - 50% of requests should be faster
 * P95: 95th percentile - 95% of requests should be faster
 * P99: 99th percentile - 99% of requests should be faster
 */
export const PerformanceBudgets = {
  /** API endpoint budgets */
  api: {
    menu: { p50: 50, p95: 150, p99: 300 },
    orders: { p50: 100, p95: 300, p99: 500 },
    analytics: { p50: 200, p95: 500, p99: 1000 },
    ai: { p50: 500, p95: 2000, p99: 5000 },
    chat: { p50: 100, p95: 300, p99: 500 },
    reservations: { p50: 100, p95: 250, p99: 400 },
  },

  /** Database query budgets */
  database: {
    simple: { p50: 5, p95: 20, p99: 50 },
    complex: { p50: 50, p95: 150, p99: 300 },
    aggregate: { p50: 100, p95: 500, p99: 1000 },
    write: { p50: 20, p95: 100, p99: 200 },
  },

  /** Cache operation budgets */
  cache: {
    get: { p50: 1, p95: 5, p99: 20 },
    set: { p50: 2, p95: 10, p99: 30 },
    edge: { p50: 5, p95: 20, p99: 50 },
  },

  /** External service budgets */
  external: {
    openai: { p50: 1000, p95: 3000, p99: 8000 },
    weather: { p50: 200, p95: 500, p99: 1000 },
    email: { p50: 500, p95: 1500, p99: 3000 },
  },
} as const;

type BudgetCategory = keyof typeof PerformanceBudgets;
type BudgetOperation<C extends BudgetCategory> = keyof (typeof PerformanceBudgets)[C];

interface BudgetCheck {
  passed: boolean;
  category: string;
  operation: string;
  duration: number;
  budget: { p50: number; p95: number; p99: number };
  violation?: 'p50' | 'p95' | 'p99';
  message?: string;
}

/**
 * Check if a duration meets the performance budget
 *
 * @param category - Budget category (api, database, cache, external)
 * @param operation - Specific operation within category
 * @param duration - Actual duration in milliseconds
 * @returns Budget check result
 */
export function checkBudget<C extends BudgetCategory>(
  category: C,
  operation: BudgetOperation<C>,
  duration: number
): BudgetCheck {
  const budget = PerformanceBudgets[category][operation] as {
    p50: number;
    p95: number;
    p99: number;
  };

  if (!budget) {
    return {
      passed: true,
      category,
      operation: String(operation),
      duration,
      budget: { p50: 0, p95: 0, p99: 0 },
      message: 'No budget defined',
    };
  }

  // Check from most severe to least severe
  if (duration > budget.p99) {
    return {
      passed: false,
      category,
      operation: String(operation),
      duration,
      budget,
      violation: 'p99',
      message: `P99 exceeded: ${duration}ms > ${budget.p99}ms (${Math.round((duration / budget.p99) * 100)}% of budget)`,
    };
  }

  if (duration > budget.p95) {
    return {
      passed: false,
      category,
      operation: String(operation),
      duration,
      budget,
      violation: 'p95',
      message: `P95 exceeded: ${duration}ms > ${budget.p95}ms`,
    };
  }

  if (duration > budget.p50) {
    // P50 exceeded is a warning, not a failure
    return {
      passed: true, // Still passes, but with warning
      category,
      operation: String(operation),
      duration,
      budget,
      violation: 'p50',
      message: `P50 exceeded: ${duration}ms > ${budget.p50}ms (consider optimization)`,
    };
  }

  return {
    passed: true,
    category,
    operation: String(operation),
    duration,
    budget,
  };
}

/**
 * Track performance and log violations
 *
 * @param category - Budget category
 * @param operation - Specific operation
 * @param fn - Async function to track
 * @returns Result of the function
 */
export async function trackPerformance<T, C extends BudgetCategory>(
  category: C,
  operation: BudgetOperation<C>,
  fn: () => Promise<T>
): Promise<T> {
  const start = Date.now();

  try {
    const result = await fn();
    const duration = Date.now() - start;

    const check = checkBudget(category, operation, duration);

    if (!check.passed) {
      logger.warn(
        {
          ...check,
          metric: 'performance_budget_violation',
        },
        'Performance budget exceeded'
      );
    } else if (check.violation === 'p50') {
      logger.info(
        {
          ...check,
          metric: 'performance_budget_warning',
        },
        'Performance budget warning (P50 exceeded)'
      );
    }

    return result;
  } catch (error) {
    const duration = Date.now() - start;
    logger.error(
      {
        category,
        operation: String(operation),
        duration,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      'Operation failed'
    );
    throw error;
  }
}

/**
 * Create a performance tracker for a specific category/operation
 *
 * @param category - Budget category
 * @param operation - Specific operation
 * @returns Tracker functions
 */
export function createPerformanceTracker<C extends BudgetCategory>(
  category: C,
  operation: BudgetOperation<C>
) {
  return {
    /**
     * Track an async operation
     */
    track: <T>(fn: () => Promise<T>) => trackPerformance(category, operation, fn),

    /**
     * Check a duration against budget
     */
    check: (duration: number) => checkBudget(category, operation, duration),

    /**
     * Get the budget for this operation
     */
    getBudget: () =>
      PerformanceBudgets[category][operation] as {
        p50: number;
        p95: number;
        p99: number;
      },
  };
}

// Pre-created trackers for common operations
export const Trackers = {
  menuApi: createPerformanceTracker('api', 'menu'),
  ordersApi: createPerformanceTracker('api', 'orders'),
  analyticsApi: createPerformanceTracker('api', 'analytics'),
  aiApi: createPerformanceTracker('api', 'ai'),
  simpleQuery: createPerformanceTracker('database', 'simple'),
  complexQuery: createPerformanceTracker('database', 'complex'),
  cacheGet: createPerformanceTracker('cache', 'get'),
  openai: createPerformanceTracker('external', 'openai'),
};

/**
 * Performance budget summary for monitoring dashboards
 */
export function getBudgetSummary(): Record<string, { p50: number; p95: number; p99: number }> {
  const summary: Record<string, { p50: number; p95: number; p99: number }> = {};

  for (const [category, operations] of Object.entries(PerformanceBudgets)) {
    for (const [operation, budget] of Object.entries(operations)) {
      summary[`${category}.${operation}`] = budget;
    }
  }

  return summary;
}
