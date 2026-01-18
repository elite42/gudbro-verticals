/**
 * API Error Handler for Backoffice
 * Re-exports from shared utilities + helper functions
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
  parseBody,
  parseQuery,
} from '@gudbro/utils';

export type {
  ErrorContext,
  ApiSuccessResponse,
  ApiErrorResponse,
  ApiResponse,
} from '@gudbro/utils';

import { NextResponse } from 'next/server';

/**
 * Standard error response format for backoffice API routes
 * Use this in catch blocks for consistent error formatting
 */
export function handleApiError(
  error: unknown,
  context?: string
): NextResponse<{ success: false; error: { code: string; message: string } }> {
  const message = error instanceof Error ? error.message : 'Internal server error';
  const code = error instanceof Error && 'code' in error ? String(error.code) : 'INTERNAL_ERROR';

  if (context) {
    console.error(`[${context}]`, error);
  } else {
    console.error(error);
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
      },
    },
    { status: 500 }
  );
}
