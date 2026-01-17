/**
 * Observability Module
 *
 * Exports logging, error tracking, and metrics utilities.
 *
 * Usage:
 * ```ts
 * import {
 *   logger,
 *   createRequestLogger,
 *   captureAIError,
 *   addBreadcrumb
 * } from '@/lib/observability';
 * ```
 */

// Logging
export {
  logger,
  createRequestLogger,
  createServiceLogger,
  withRequestLogging,
  logDatabaseOperation,
  logCacheOperation,
  logAIOperation,
  logRateLimit,
  logAuthEvent,
  logBusinessMetric,
} from './logger';

// Error tracking (Sentry)
export {
  captureAIError,
  captureDatabaseError,
  captureWebhookError,
  captureAPIError,
  capturePaymentError,
  addBreadcrumb,
  setUserContext,
  clearUserContext,
  withErrorCapture,
} from './sentry';
