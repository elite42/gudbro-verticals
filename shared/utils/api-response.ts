/**
 * API Response Helpers
 * Standardized API response formatting for Next.js API routes
 */

import { NextResponse } from 'next/server';
import {
  AppError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  toAppError,
} from './errors';
import { createLogger } from './logger';

const logger = createLogger({ service: 'api' });

// ============================================================================
// Logger Interface (duck-typed for Pino or shared Logger compatibility)
// ============================================================================

/**
 * Minimal logger interface that both the shared Logger and
 * a Pino adapter can satisfy. Allows backoffice to inject its
 * Pino-based logger while other apps use the shared one.
 */
export interface MinimalLogger {
  warn(message: string, context?: Record<string, unknown>): void;
  error(message: string, error?: unknown, context?: Record<string, unknown>): void;
}

// ============================================================================
// Response Types
// ============================================================================

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    hasMore?: boolean;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

// ============================================================================
// Success Responses
// ============================================================================

/**
 * Create a success response
 */
export function successResponse<T>(
  data: T,
  meta?: ApiSuccessResponse<T>['meta'],
  status = 200
): NextResponse<ApiSuccessResponse<T>> {
  const response: ApiSuccessResponse<T> = {
    success: true,
    data,
  };

  if (meta) {
    response.meta = meta;
  }

  return NextResponse.json(response, { status });
}

/**
 * Create a created response (201)
 */
export function createdResponse<T>(data: T): NextResponse<ApiSuccessResponse<T>> {
  return successResponse(data, undefined, 201);
}

/**
 * Create a no content response (204)
 */
export function noContentResponse(): NextResponse {
  return new NextResponse(null, { status: 204 });
}

/**
 * Create a paginated response
 */
export function paginatedResponse<T>(
  data: T[],
  pagination: {
    page: number;
    limit: number;
    total: number;
  }
): NextResponse<ApiSuccessResponse<T[]>> {
  return successResponse(data, {
    page: pagination.page,
    limit: pagination.limit,
    total: pagination.total,
    hasMore: pagination.page * pagination.limit < pagination.total,
  });
}

// ============================================================================
// Error Responses
// ============================================================================

/**
 * Create an error response from an AppError
 */
export function errorResponse(error: AppError): NextResponse<ApiErrorResponse> {
  const response: ApiErrorResponse = {
    success: false,
    error: {
      code: error.code,
      message: error.message,
    },
  };

  // Include validation details if available
  if (error instanceof ValidationError && Object.keys(error.errors).length > 0) {
    response.error.details = error.errors;
  }

  const nextResponse = NextResponse.json(response, { status: error.statusCode });

  // Add retry-after header for rate limits
  if (error instanceof RateLimitError && error.retryAfter) {
    nextResponse.headers.set('Retry-After', String(error.retryAfter));
  }

  return nextResponse;
}

/**
 * Handle any error and return appropriate response.
 * Accepts an optional custom logger (e.g. Pino adapter for backoffice).
 */
export function handleError(
  error: unknown,
  context?: string,
  customLogger?: MinimalLogger
): NextResponse<ApiErrorResponse> {
  const appError = toAppError(error);
  const log: MinimalLogger = customLogger || logger;

  // Log error
  if (appError.isOperational) {
    log.warn(`[${context || 'API'}] ${appError.message}`, {
      code: appError.code,
      statusCode: appError.statusCode,
      context: appError.context,
    });
  } else {
    log.error(`[${context || 'API'}] Unexpected error`, error, {
      code: appError.code,
      context: appError.context,
    });
  }

  return errorResponse(appError);
}

// ============================================================================
// Quick Error Responses
// ============================================================================

export function unauthorized(message?: string): NextResponse<ApiErrorResponse> {
  return errorResponse(new AuthenticationError(message));
}

export function forbidden(message?: string): NextResponse<ApiErrorResponse> {
  return errorResponse(new AuthorizationError(message));
}

export function notFound(resource?: string): NextResponse<ApiErrorResponse> {
  return errorResponse(new NotFoundError(resource));
}

export function badRequest(
  message: string,
  errors?: Record<string, string[]>
): NextResponse<ApiErrorResponse> {
  return errorResponse(new ValidationError(message, errors));
}

export function rateLimited(retryAfter?: number): NextResponse<ApiErrorResponse> {
  return errorResponse(new RateLimitError(undefined, retryAfter));
}

// ============================================================================
// API Route Wrapper
// ============================================================================

type ApiHandler<T = unknown> = (
  request: Request
) => Promise<NextResponse<ApiSuccessResponse<T> | ApiErrorResponse>>;

export interface ErrorHandlingOptions {
  /** Context label for log messages (e.g. 'auth/2fa/verify') */
  context?: string;
  /** Custom logger — pass backofficeLogger for Pino, or omit for shared logger */
  logger?: MinimalLogger;
}

/**
 * Wrap an API handler with automatic error handling.
 * Accepts a context string (backward-compatible) or an options object.
 */
export function withErrorHandling<T>(
  handler: ApiHandler<T>,
  contextOrOptions?: string | ErrorHandlingOptions
): ApiHandler<T> {
  const opts: ErrorHandlingOptions =
    typeof contextOrOptions === 'string' ? { context: contextOrOptions } : contextOrOptions || {};

  return async (request: Request) => {
    try {
      return await handler(request);
    } catch (error) {
      return handleError(error, opts.context, opts.logger) as NextResponse<
        ApiSuccessResponse<T> | ApiErrorResponse
      >;
    }
  };
}

// ============================================================================
// Dynamic Route Wrapper (for routes with [id], [slug], etc.)
// ============================================================================

type DynamicApiHandler<T = unknown, P = Record<string, string>> = (
  request: Request,
  context: { params: Promise<P> }
) => Promise<NextResponse<ApiSuccessResponse<T> | ApiErrorResponse>>;

/**
 * Like withErrorHandling but for routes with dynamic params.
 *
 * @example
 * export const PATCH = withErrorHandlingDynamic<unknown, { itemId: string }>(
 *   async (request, { params }) => {
 *     const { itemId } = await params;
 *     // ...
 *   },
 *   { context: 'orders/items/status', logger: backofficeLogger }
 * );
 */
export function withErrorHandlingDynamic<T = unknown, P = Record<string, string>>(
  handler: DynamicApiHandler<T, P>,
  contextOrOptions?: string | ErrorHandlingOptions
): DynamicApiHandler<T, P> {
  const opts: ErrorHandlingOptions =
    typeof contextOrOptions === 'string' ? { context: contextOrOptions } : contextOrOptions || {};

  return async (request, routeContext) => {
    try {
      return await handler(request, routeContext);
    } catch (error) {
      return handleError(error, opts.context, opts.logger) as NextResponse<
        ApiSuccessResponse<T> | ApiErrorResponse
      >;
    }
  };
}

// ============================================================================
// Validation Helper
// ============================================================================

import { ZodSchema, ZodError } from 'zod';

/**
 * Parse and validate request body with Zod schema
 */
export async function parseBody<T>(request: Request, schema: ZodSchema<T>): Promise<T> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    throw new ValidationError('Invalid JSON body');
  }

  try {
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: Record<string, string[]> = {};
      error.errors.forEach((e) => {
        const path = e.path.join('.');
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(e.message);
      });
      throw new ValidationError('Validation failed', errors);
    }
    throw error;
  }
}

/**
 * Parse URL search params with Zod schema
 */
export function parseQuery<T>(request: Request, schema: ZodSchema<T>): T {
  const url = new URL(request.url);
  const params: Record<string, string> = {};

  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  try {
    return schema.parse(params);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: Record<string, string[]> = {};
      error.errors.forEach((e) => {
        const path = e.path.join('.');
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(e.message);
      });
      throw new ValidationError('Invalid query parameters', errors);
    }
    throw error;
  }
}
