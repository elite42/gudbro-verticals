/**
 * Environment Variable Validation
 *
 * This module validates environment variables at startup to catch
 * configuration errors early instead of at runtime.
 *
 * Usage:
 * import { env } from '@gudbro/config';
 * const url = env.SUPABASE_URL;
 */

import { z } from 'zod';

// ============================================================================
// Schema Definitions
// ============================================================================

/**
 * Server-side environment variables (not exposed to client)
 */
const serverEnvSchema = z.object({
  // Supabase
  SUPABASE_URL: z.string().url('SUPABASE_URL must be a valid URL'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'SUPABASE_SERVICE_ROLE_KEY is required'),

  // Stripe (optional - only needed for billing features)
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

/**
 * Client-side environment variables (exposed to browser via NEXT_PUBLIC_)
 */
const clientEnvSchema = z.object({
  // Supabase public
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('NEXT_PUBLIC_SUPABASE_URL must be a valid URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'NEXT_PUBLIC_SUPABASE_ANON_KEY is required'),

  // App config
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
});

/**
 * Combined schema for all environment variables
 */
const envSchema = serverEnvSchema.merge(clientEnvSchema);

// ============================================================================
// Type Exports
// ============================================================================

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type ClientEnv = z.infer<typeof clientEnvSchema>;
export type Env = z.infer<typeof envSchema>;

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validates server-side environment variables
 * Call this in server components or API routes
 */
export function validateServerEnv(): ServerEnv {
  const result = serverEnvSchema.safeParse({
    SUPABASE_URL: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  });

  if (!result.success) {
    console.error('Invalid server environment variables:');
    console.error(result.error.flatten().fieldErrors);
    throw new Error('Invalid server environment configuration');
  }

  return result.data;
}

/**
 * Validates client-side environment variables
 * Safe to call in client components
 */
export function validateClientEnv(): ClientEnv {
  const result = clientEnvSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  });

  if (!result.success) {
    console.error('Invalid client environment variables:');
    console.error(result.error.flatten().fieldErrors);
    throw new Error('Invalid client environment configuration');
  }

  return result.data;
}

/**
 * Validates all environment variables
 * Call this at app startup
 */
export function validateEnv(): Env {
  const result = envSchema.safeParse({
    // Server
    SUPABASE_URL: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    // Client
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  });

  if (!result.success) {
    console.error('Invalid environment variables:');
    const errors = result.error.flatten().fieldErrors;
    Object.entries(errors).forEach(([key, messages]) => {
      console.error(`  ${key}: ${messages?.join(', ')}`);
    });
    throw new Error('Invalid environment configuration. See console for details.');
  }

  return result.data;
}

// ============================================================================
// Lazy Environment Access
// ============================================================================

/**
 * Type-safe environment variable access
 * Validates on first access, caches result
 */
class EnvAccessor {
  private _serverEnv: ServerEnv | null = null;
  private _clientEnv: ClientEnv | null = null;

  get server(): ServerEnv {
    if (!this._serverEnv) {
      this._serverEnv = validateServerEnv();
    }
    return this._serverEnv;
  }

  get client(): ClientEnv {
    if (!this._clientEnv) {
      this._clientEnv = validateClientEnv();
    }
    return this._clientEnv;
  }

  // Convenience getters for common values
  get supabaseUrl(): string {
    return this.client.NEXT_PUBLIC_SUPABASE_URL;
  }

  get supabaseAnonKey(): string {
    return this.client.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  }

  get supabaseServiceKey(): string {
    return this.server.SUPABASE_SERVICE_ROLE_KEY;
  }

  get isDevelopment(): boolean {
    return this.server.NODE_ENV === 'development';
  }

  get isProduction(): boolean {
    return this.server.NODE_ENV === 'production';
  }
}

export const env = new EnvAccessor();

// ============================================================================
// Development Helper
// ============================================================================

/**
 * Prints environment status (for debugging)
 * Only shows if variables are set, not their values
 */
export function printEnvStatus(): void {
  console.log('Environment Status:');
  console.log('-------------------');
  console.log(`NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
  console.log(`SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'set' : 'NOT SET'}`);
  console.log(`SUPABASE_ANON_KEY: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'set' : 'NOT SET'}`);
  console.log(`SUPABASE_SERVICE_ROLE_KEY: ${process.env.SUPABASE_SERVICE_ROLE_KEY ? 'set' : 'NOT SET'}`);
  console.log(`STRIPE_SECRET_KEY: ${process.env.STRIPE_SECRET_KEY ? 'set' : 'not set (optional)'}`);
}
