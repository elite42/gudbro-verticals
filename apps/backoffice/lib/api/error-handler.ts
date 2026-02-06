/**
 * API Error Handler for Backoffice
 * Re-exports from shared utilities + Pino logger adapter
 */

// Re-export all error types and utilities from shared
export {
  AppError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
  ConflictError,
  RateLimitError,
  ExternalServiceError,
  DatabaseError,
  BusinessError,
  isAppError,
  isOperationalError,
  toAppError,
  getErrorMessage,
  // Response utilities
  successResponse,
  createdResponse,
  noContentResponse,
  paginatedResponse,
  errorResponse,
  handleError,
  unauthorized,
  forbidden,
  notFound,
  badRequest,
  rateLimited,
  withErrorHandling,
  withErrorHandlingDynamic,
  parseBody,
  parseQuery,
} from '@gudbro/utils';

export type {
  ErrorContext,
  ApiSuccessResponse,
  ApiErrorResponse,
  ApiResponse,
  MinimalLogger,
  ErrorHandlingOptions,
} from '@gudbro/utils';

// ============================================================================
// Pino → MinimalLogger Adapter
// ============================================================================

import { logger as pinoLogger } from '@/lib/observability/logger';
import type { MinimalLogger } from '@gudbro/utils';

/**
 * Pino-based logger that satisfies MinimalLogger interface.
 * Use this when calling withErrorHandling in backoffice routes:
 *
 * @example
 * import { withErrorHandling, backofficeLogger } from '@/lib/api/error-handler';
 *
 * export const GET = withErrorHandling(async (request) => {
 *   // ...
 * }, { context: 'audit-logs', logger: backofficeLogger });
 */
export const backofficeLogger: MinimalLogger = {
  warn(message: string, context?: Record<string, unknown>) {
    pinoLogger.warn(context || {}, message);
  },
  error(message: string, error?: unknown, context?: Record<string, unknown>) {
    pinoLogger.error({ err: error, ...context }, message);
  },
};
