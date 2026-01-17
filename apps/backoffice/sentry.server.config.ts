// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Only enable in production
  enabled: process.env.NODE_ENV === 'production',

  // Adjust this value in production
  tracesSampleRate: 0.1, // 10% of transactions

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Filter out sensitive data before sending
  beforeSend(event) {
    // Scrub sensitive request data
    if (event.request) {
      if (event.request.headers) {
        delete event.request.headers['authorization'];
        delete event.request.headers['cookie'];
        delete event.request.headers['x-api-key'];
        delete event.request.headers['x-supabase-auth'];
      }
      if (event.request.data) {
        // Redact potential sensitive fields in request body
        const sensitiveFields = ['password', 'token', 'apiKey', 'secret', 'creditCard'];
        for (const field of sensitiveFields) {
          if (typeof event.request.data === 'object' && field in event.request.data) {
            event.request.data[field] = '[REDACTED]';
          }
        }
      }
    }

    // Add environment context
    event.environment = process.env.VERCEL_ENV || process.env.NODE_ENV;

    return event;
  },

  // Capture unhandled promise rejections
  integrations: [
    Sentry.captureConsoleIntegration({
      levels: ['error'], // Only capture console.error
    }),
  ],
});
