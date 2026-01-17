/**
 * Structured Logging with Pino
 *
 * Usage:
 * ```ts
 * import { logger, createRequestLogger } from '@/lib/observability/logger';
 *
 * // Basic logging
 * logger.info('Server started');
 * logger.error({ err }, 'Failed to process request');
 *
 * // Request-scoped logging
 * const log = createRequestLogger(request);
 * log.info('Processing request');
 * log.info({ duration: 123 }, 'Request completed');
 * ```
 */

import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Base logger configuration
 */
export const logger = pino({
  level: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),

  // Base context added to all logs
  base: {
    env: process.env.NODE_ENV,
    version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'local',
    region: process.env.VERCEL_REGION || 'local',
  },

  // Redact sensitive data
  redact: {
    paths: [
      'password',
      'token',
      'apiKey',
      'api_key',
      'authorization',
      'cookie',
      'secret',
      '*.password',
      '*.token',
      '*.apiKey',
      '*.api_key',
      '*.authorization',
      '*.cookie',
      '*.secret',
      'req.headers.authorization',
      'req.headers.cookie',
    ],
    censor: '[REDACTED]',
  },

  // Format output
  formatters: {
    level: (label) => ({ level: label }),
    bindings: (bindings) => ({
      pid: bindings.pid,
      host: bindings.hostname,
    }),
  },

  // Custom serializers
  serializers: {
    err: pino.stdSerializers.err,
    error: pino.stdSerializers.err,
    req: (req) => ({
      method: req.method,
      url: req.url,
      path: req.path,
      query: req.query,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },

  // Timestamp format
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
});

/**
 * Create a child logger with request context
 */
export function createRequestLogger(req: Request, additionalContext?: Record<string, unknown>) {
  const url = new URL(req.url);

  return logger.child({
    requestId: crypto.randomUUID(),
    path: url.pathname,
    method: req.method,
    userAgent: req.headers.get('user-agent')?.slice(0, 100),
    ip: getClientIP(req),
    ...additionalContext,
  });
}

/**
 * Create a child logger for a specific service/module
 */
export function createServiceLogger(
  serviceName: string,
  additionalContext?: Record<string, unknown>
) {
  return logger.child({
    service: serviceName,
    ...additionalContext,
  });
}

/**
 * Get client IP from request headers
 */
function getClientIP(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIP = req.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  return 'unknown';
}

/**
 * Log API request start and end with duration
 */
export function withRequestLogging<T>(
  req: Request,
  fn: (log: pino.Logger) => Promise<T>
): Promise<T> {
  const log = createRequestLogger(req);
  const startTime = Date.now();

  log.info('Request started');

  return fn(log)
    .then((result) => {
      const duration = Date.now() - startTime;
      log.info({ duration, status: 'success' }, 'Request completed');
      return result;
    })
    .catch((error) => {
      const duration = Date.now() - startTime;
      log.error({ duration, status: 'error', err: error }, 'Request failed');
      throw error;
    });
}

/**
 * Log database operation
 */
export function logDatabaseOperation(
  operation: 'select' | 'insert' | 'update' | 'delete' | 'rpc',
  table: string,
  duration: number,
  success: boolean,
  merchantId?: string
) {
  const log = createServiceLogger('database');

  const logData = {
    metric: 'db_query',
    operation,
    table,
    duration,
    success,
    merchantId,
  };

  if (success) {
    log.info(logData, 'Database operation completed');
  } else {
    log.warn(logData, 'Database operation failed');
  }
}

/**
 * Log cache operation
 */
export function logCacheOperation(
  operation: 'get' | 'set' | 'del',
  key: string,
  hit: boolean | null,
  duration?: number
) {
  const log = createServiceLogger('cache');

  log.debug(
    {
      metric: 'cache',
      operation,
      key: key.slice(0, 50), // Truncate key for logging
      hit,
      duration,
    },
    `Cache ${operation} ${hit === true ? 'HIT' : hit === false ? 'MISS' : ''}`
  );
}

/**
 * Log AI service operation
 */
export function logAIOperation(
  service: string,
  operation: string,
  duration: number,
  success: boolean,
  tokenUsage?: { prompt: number; completion: number }
) {
  const log = createServiceLogger('ai', { aiService: service });

  log.info(
    {
      metric: 'ai_operation',
      service,
      operation,
      duration,
      success,
      tokenUsage,
    },
    `AI ${operation} ${success ? 'completed' : 'failed'}`
  );
}

/**
 * Log rate limit event
 */
export function logRateLimit(ip: string, endpoint: string, limited: boolean, remaining: number) {
  const log = createServiceLogger('security');

  log.info(
    {
      metric: 'rate_limit',
      ip: ip.slice(0, 16), // Truncate IP for privacy
      endpoint,
      limited,
      remaining,
    },
    limited ? 'Rate limit exceeded' : 'Rate limit check'
  );
}

/**
 * Log authentication event
 */
export function logAuthEvent(
  event: 'login' | 'logout' | 'signup' | 'failed_login' | 'password_reset',
  userId?: string,
  merchantId?: string,
  reason?: string
) {
  const log = createServiceLogger('auth');

  const logData = {
    metric: 'auth_event',
    event,
    userId,
    merchantId,
    reason,
  };

  if (event === 'failed_login') {
    log.warn(logData, 'Authentication failed');
  } else {
    log.info(logData, `Auth event: ${event}`);
  }
}

/**
 * Log business metric
 */
export function logBusinessMetric(metric: string, value: number, tags?: Record<string, string>) {
  const log = createServiceLogger('metrics');

  log.info(
    {
      metric,
      value,
      ...tags,
    },
    `Metric: ${metric}`
  );
}

// Development-only: pretty print logs
if (isDevelopment && typeof window === 'undefined') {
  // In development, logs are already formatted by pino
  // For prettier output, use pino-pretty in terminal:
  // pnpm dev:backoffice | npx pino-pretty
}

export default logger;
