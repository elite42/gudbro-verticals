/**
 * Custom Error Classes
 * Standardized errors for consistent handling across the application
 */

// ============================================================================
// Base Application Error
// ============================================================================

export interface ErrorContext {
  [key: string]: unknown;
}

export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly context?: ErrorContext;
  public readonly timestamp: Date;

  constructor(
    message: string,
    options: {
      code?: string;
      statusCode?: number;
      isOperational?: boolean;
      context?: ErrorContext;
      cause?: Error;
    } = {}
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = options.code || 'INTERNAL_ERROR';
    this.statusCode = options.statusCode || 500;
    this.isOperational = options.isOperational ?? true;
    this.context = options.context;
    this.timestamp = new Date();

    if (options.cause) {
      this.cause = options.cause;
    }

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      context: this.context,
      timestamp: this.timestamp.toISOString(),
    };
  }
}

// ============================================================================
// Specific Error Types
// ============================================================================

/**
 * Authentication errors (401)
 */
export class AuthenticationError extends AppError {
  constructor(message = 'Authentication required', context?: ErrorContext) {
    super(message, {
      code: 'AUTHENTICATION_ERROR',
      statusCode: 401,
      context,
    });
  }
}

/**
 * Authorization errors (403)
 */
export class AuthorizationError extends AppError {
  constructor(message = 'Access denied', context?: ErrorContext) {
    super(message, {
      code: 'AUTHORIZATION_ERROR',
      statusCode: 403,
      context,
    });
  }
}

/**
 * Resource not found errors (404)
 */
export class NotFoundError extends AppError {
  constructor(resource = 'Resource', context?: ErrorContext) {
    super(`${resource} not found`, {
      code: 'NOT_FOUND',
      statusCode: 404,
      context,
    });
  }
}

/**
 * Validation errors (400)
 */
export class ValidationError extends AppError {
  public readonly errors: Record<string, string[]>;

  constructor(
    message = 'Validation failed',
    errors: Record<string, string[]> = {},
    context?: ErrorContext
  ) {
    super(message, {
      code: 'VALIDATION_ERROR',
      statusCode: 400,
      context,
    });
    this.errors = errors;
  }

  override toJSON() {
    return {
      ...super.toJSON(),
      errors: this.errors,
    };
  }
}

/**
 * Conflict errors (409)
 */
export class ConflictError extends AppError {
  constructor(message = 'Resource already exists', context?: ErrorContext) {
    super(message, {
      code: 'CONFLICT',
      statusCode: 409,
      context,
    });
  }
}

/**
 * Rate limit errors (429)
 */
export class RateLimitError extends AppError {
  public readonly retryAfter?: number;

  constructor(message = 'Too many requests', retryAfter?: number, context?: ErrorContext) {
    super(message, {
      code: 'RATE_LIMIT_EXCEEDED',
      statusCode: 429,
      context,
    });
    this.retryAfter = retryAfter;
  }
}

/**
 * External service errors (502)
 */
export class ExternalServiceError extends AppError {
  public readonly service: string;

  constructor(service: string, message?: string, context?: ErrorContext) {
    super(message || `External service error: ${service}`, {
      code: 'EXTERNAL_SERVICE_ERROR',
      statusCode: 502,
      context,
    });
    this.service = service;
  }
}

/**
 * Database errors (500)
 */
export class DatabaseError extends AppError {
  constructor(message = 'Database operation failed', context?: ErrorContext, cause?: Error) {
    super(message, {
      code: 'DATABASE_ERROR',
      statusCode: 500,
      isOperational: false,
      context,
      cause,
    });
  }
}

/**
 * Business logic errors (422)
 */
export class BusinessError extends AppError {
  constructor(message: string, code = 'BUSINESS_ERROR', context?: ErrorContext) {
    super(message, {
      code,
      statusCode: 422,
      context,
    });
  }
}

// ============================================================================
// Error Type Guards
// ============================================================================

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function isOperationalError(error: unknown): boolean {
  if (isAppError(error)) {
    return error.isOperational;
  }
  return false;
}

// ============================================================================
// Error Conversion
// ============================================================================

/**
 * Convert unknown error to AppError
 */
export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message, {
      code: 'UNKNOWN_ERROR',
      isOperational: false,
      cause: error,
    });
  }

  return new AppError(String(error), {
    code: 'UNKNOWN_ERROR',
    isOperational: false,
  });
}

/**
 * Extract error message safely
 */
export function getErrorMessage(error: unknown): string {
  if (isAppError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}
