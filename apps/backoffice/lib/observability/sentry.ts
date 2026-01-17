/**
 * Sentry Error Tracking Utilities
 *
 * Custom error capture functions with context for different services.
 * These should be used instead of raw Sentry.captureException for better
 * filtering and debugging capabilities.
 */

import * as Sentry from '@sentry/nextjs';

/**
 * Capture an AI service error with context
 */
export function captureAIError(
  error: Error,
  context: {
    service: string;
    merchantId?: string;
    action?: string;
    prompt?: string;
    model?: string;
    [key: string]: unknown;
  }
) {
  Sentry.withScope((scope) => {
    scope.setTag('service_type', 'ai');
    scope.setTag('ai_service', context.service);
    if (context.merchantId) {
      scope.setTag('merchant_id', context.merchantId);
    }
    if (context.action) {
      scope.setTag('ai_action', context.action);
    }
    scope.setContext('ai_context', {
      ...context,
      // Truncate prompt to avoid sending too much data
      prompt: context.prompt?.slice(0, 500),
    });
    Sentry.captureException(error);
  });
}

/**
 * Capture a database error with context
 */
export function captureDatabaseError(
  error: Error,
  context: {
    operation: 'select' | 'insert' | 'update' | 'delete' | 'rpc';
    table?: string;
    merchantId?: string;
    query?: string;
    [key: string]: unknown;
  }
) {
  Sentry.withScope((scope) => {
    scope.setTag('service_type', 'database');
    scope.setTag('db_operation', context.operation);
    if (context.table) {
      scope.setTag('db_table', context.table);
    }
    if (context.merchantId) {
      scope.setTag('merchant_id', context.merchantId);
    }
    scope.setContext('db_context', {
      ...context,
      // Don't send full query, just table and operation
      query: context.query?.slice(0, 200),
    });
    Sentry.captureException(error);
  });
}

/**
 * Capture a webhook error with context
 */
export function captureWebhookError(
  error: Error,
  context: {
    channel: 'telegram' | 'whatsapp' | 'line' | 'zalo';
    event?: string;
    merchantId?: string;
    [key: string]: unknown;
  }
) {
  Sentry.withScope((scope) => {
    scope.setTag('service_type', 'webhook');
    scope.setTag('webhook_channel', context.channel);
    if (context.event) {
      scope.setTag('webhook_event', context.event);
    }
    if (context.merchantId) {
      scope.setTag('merchant_id', context.merchantId);
    }
    scope.setContext('webhook_context', context);
    Sentry.captureException(error);
  });
}

/**
 * Capture an API error with context
 */
export function captureAPIError(
  error: Error,
  context: {
    endpoint: string;
    method: string;
    statusCode?: number;
    merchantId?: string;
    userId?: string;
    [key: string]: unknown;
  }
) {
  Sentry.withScope((scope) => {
    scope.setTag('service_type', 'api');
    scope.setTag('api_endpoint', context.endpoint);
    scope.setTag('api_method', context.method);
    if (context.statusCode) {
      scope.setTag('http_status', context.statusCode.toString());
    }
    if (context.merchantId) {
      scope.setTag('merchant_id', context.merchantId);
    }
    if (context.userId) {
      scope.setUser({ id: context.userId });
    }
    scope.setContext('api_context', context);
    Sentry.captureException(error);
  });
}

/**
 * Capture a payment/billing error with context
 */
export function capturePaymentError(
  error: Error,
  context: {
    provider: 'stripe' | 'other';
    operation: string;
    merchantId?: string;
    amount?: number;
    currency?: string;
    [key: string]: unknown;
  }
) {
  Sentry.withScope((scope) => {
    scope.setTag('service_type', 'payment');
    scope.setTag('payment_provider', context.provider);
    scope.setTag('payment_operation', context.operation);
    if (context.merchantId) {
      scope.setTag('merchant_id', context.merchantId);
    }
    // Don't include sensitive payment data in context
    scope.setContext('payment_context', {
      provider: context.provider,
      operation: context.operation,
      merchantId: context.merchantId,
      currency: context.currency,
    });
    Sentry.captureException(error);
  });
}

/**
 * Add breadcrumb for debugging (useful for complex flows)
 */
export function addBreadcrumb(
  category: string,
  message: string,
  data?: Record<string, unknown>,
  level: Sentry.SeverityLevel = 'info'
) {
  Sentry.addBreadcrumb({
    category,
    message,
    data,
    level,
    timestamp: Date.now() / 1000,
  });
}

/**
 * Set user context for error tracking
 */
export function setUserContext(user: {
  id: string;
  email?: string;
  merchantId?: string;
  role?: string;
}) {
  Sentry.setUser({
    id: user.id,
    email: user.email,
  });
  if (user.merchantId) {
    Sentry.setTag('merchant_id', user.merchantId);
  }
  if (user.role) {
    Sentry.setTag('user_role', user.role);
  }
}

/**
 * Clear user context (on logout)
 */
export function clearUserContext() {
  Sentry.setUser(null);
}

/**
 * Start a performance transaction
 */
export function startTransaction(name: string, op: string, data?: Record<string, unknown>) {
  return Sentry.startSpan(
    {
      name,
      op,
      attributes: data as Record<string, string | number | boolean>,
    },
    () => {}
  );
}

/**
 * Wrapper for async operations with automatic error capture
 */
export async function withErrorCapture<T>(
  fn: () => Promise<T>,
  context: {
    operation: string;
    service: string;
    [key: string]: unknown;
  }
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setTag('operation', context.operation);
      scope.setTag('service', context.service);
      scope.setContext('error_context', context);
      Sentry.captureException(error);
    });
    throw error;
  }
}
