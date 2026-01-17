/**
 * Request Validation Utilities
 *
 * Provides type-safe request validation using Zod schemas.
 *
 * Usage:
 * ```ts
 * import { validateRequest, validateQuery, schemas } from '@/lib/validation';
 *
 * export async function POST(request: NextRequest) {
 *   const result = await validateRequest(request, schemas.createOrder);
 *   if (!result.success) {
 *     return result.error;
 *   }
 *   const data = result.data; // Fully typed
 * }
 *
 * export async function GET(request: NextRequest) {
 *   const result = validateQuery(request, schemas.pagination);
 *   if (!result.success) {
 *     return result.error;
 *   }
 * }
 * ```
 */

import { NextResponse } from 'next/server';
import { z, ZodError, ZodSchema } from 'zod';
import { createServiceLogger } from '@/lib/observability/logger';

// Re-export schemas
export { schemas } from './schemas';
export * from './schemas';

const log = createServiceLogger('validation');

// Types
export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: NextResponse };

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

/**
 * Format Zod errors into a user-friendly structure
 */
function formatZodErrors(error: ZodError): ValidationError[] {
  return error.errors.map((err) => ({
    field: err.path.join('.') || 'root',
    message: err.message,
    code: err.code,
  }));
}

/**
 * Create a validation error response
 */
function createValidationErrorResponse(errors: ValidationError[]): NextResponse {
  return NextResponse.json(
    {
      error: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: errors,
    },
    { status: 400 }
  );
}

/**
 * Validate request body against a Zod schema
 *
 * @param request - The incoming request
 * @param schema - Zod schema to validate against
 * @returns Validation result with typed data or error response
 */
export async function validateRequest<T extends ZodSchema>(
  request: Request,
  schema: T
): Promise<ValidationResult<z.infer<T>>> {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      const errors = formatZodErrors(result.error);
      log.warn({ errors, path: new URL(request.url).pathname }, 'Request validation failed');
      return {
        success: false,
        error: createValidationErrorResponse(errors),
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    // JSON parse error
    log.warn({ err: error, path: new URL(request.url).pathname }, 'Invalid JSON in request body');
    return {
      success: false,
      error: NextResponse.json(
        {
          error: 'Invalid JSON in request body',
          code: 'INVALID_JSON',
        },
        { status: 400 }
      ),
    };
  }
}

/**
 * Validate URL query parameters against a Zod schema
 *
 * @param request - The incoming request
 * @param schema - Zod schema to validate against
 * @returns Validation result with typed data or error response
 */
export function validateQuery<T extends ZodSchema>(
  request: Request,
  schema: T
): ValidationResult<z.infer<T>> {
  try {
    const url = new URL(request.url);
    const params: Record<string, string | string[]> = {};

    // Convert URLSearchParams to object
    url.searchParams.forEach((value, key) => {
      const existing = params[key];
      if (existing) {
        // Multiple values for same key -> array
        if (Array.isArray(existing)) {
          existing.push(value);
        } else {
          params[key] = [existing, value];
        }
      } else {
        params[key] = value;
      }
    });

    const result = schema.safeParse(params);

    if (!result.success) {
      const errors = formatZodErrors(result.error);
      log.warn({ errors, path: url.pathname }, 'Query validation failed');
      return {
        success: false,
        error: createValidationErrorResponse(errors),
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    log.error({ err: error }, 'Query validation error');
    return {
      success: false,
      error: NextResponse.json(
        {
          error: 'Invalid query parameters',
          code: 'INVALID_QUERY',
        },
        { status: 400 }
      ),
    };
  }
}

/**
 * Validate route parameters against a Zod schema
 *
 * @param params - Route parameters object
 * @param schema - Zod schema to validate against
 * @returns Validation result with typed data or error response
 */
export function validateParams<T extends ZodSchema>(
  params: Record<string, string | string[]>,
  schema: T
): ValidationResult<z.infer<T>> {
  const result = schema.safeParse(params);

  if (!result.success) {
    const errors = formatZodErrors(result.error);
    log.warn({ errors }, 'Route params validation failed');
    return {
      success: false,
      error: createValidationErrorResponse(errors),
    };
  }

  return {
    success: true,
    data: result.data,
  };
}

/**
 * Simple validation helper that throws on error
 * Use this for internal validation where you want to handle errors yourself
 *
 * @param data - Data to validate
 * @param schema - Zod schema to validate against
 * @returns Validated and typed data
 * @throws ZodError if validation fails
 */
export function validate<T extends ZodSchema>(data: unknown, schema: T): z.infer<T> {
  return schema.parse(data);
}

/**
 * Safe validation helper that returns result object
 *
 * @param data - Data to validate
 * @param schema - Zod schema to validate against
 * @returns SafeParseResult with success status and data/error
 */
export function validateSafe<T extends ZodSchema>(
  data: unknown,
  schema: T
): z.SafeParseReturnType<z.input<T>, z.output<T>> {
  return schema.safeParse(data);
}

/**
 * Create a validated API handler wrapper
 *
 * Usage:
 * ```ts
 * export const POST = withValidation(schemas.createOrder, async (data, request) => {
 *   // data is fully typed based on schema
 *   const order = await createOrder(data);
 *   return NextResponse.json(order);
 * });
 * ```
 */
export function withValidation<T extends ZodSchema>(
  schema: T,
  handler: (data: z.infer<T>, request: Request) => Promise<NextResponse>
) {
  return async (request: Request): Promise<NextResponse> => {
    const result = await validateRequest(request, schema);

    if (!result.success) {
      return result.error;
    }

    return handler(result.data, request);
  };
}

/**
 * Middleware to validate request and add to context
 * For use with Next.js middleware pattern
 */
export async function validateMiddleware<T extends ZodSchema>(
  request: Request,
  schema: T
): Promise<{ valid: true; data: z.infer<T> } | { valid: false; response: NextResponse }> {
  const result = await validateRequest(request, schema);

  if (!result.success) {
    return { valid: false, response: result.error };
  }

  return { valid: true, data: result.data };
}

export default {
  validateRequest,
  validateQuery,
  validateParams,
  validate,
  validateSafe,
  withValidation,
  validateMiddleware,
};
