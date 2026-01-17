// This file is used by Next.js to instrument the server.
// It runs before anything else in the app (server-side).
// https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

// This is called when the server starts
export const onRequestError = async (
  err: Error,
  request: Request,
  context: { routerKind: string; routePath: string; routeType: string; renderSource: string }
) => {
  // Only import Sentry on error to reduce overhead
  const Sentry = await import('@sentry/nextjs');

  Sentry.captureException(err, {
    extra: {
      routerKind: context.routerKind,
      routePath: context.routePath,
      routeType: context.routeType,
      renderSource: context.renderSource,
    },
  });
};
