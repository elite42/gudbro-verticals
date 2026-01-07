'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // In production, you would send this to an error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="to-theme-brand-secondary flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
            <div className="mb-4 text-6xl">😔</div>
            <h1 className="mb-2 text-2xl font-bold text-gray-900">Qualcosa è andato storto</h1>
            <p className="mb-6 text-gray-600">
              Ci scusiamo per l'inconveniente. L'app ha riscontrato un errore inatteso.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="mb-2 cursor-pointer text-sm font-semibold text-gray-700">
                  Dettagli errore (solo dev)
                </summary>
                <pre className="max-h-40 overflow-auto rounded-lg bg-red-50 p-3 text-xs text-red-800">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <button
              onClick={() => window.location.reload()}
              className="from-theme-brand-primary to-theme-brand-primary hover:from-theme-brand-primary-hover hover:to-theme-brand-primary-hover w-full rounded-xl bg-gradient-to-r px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg"
            >
              Ricarica la pagina
            </button>

            <button
              onClick={() => (window.location.href = '/')}
              className="mt-3 w-full rounded-xl bg-gray-100 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-200"
            >
              Torna alla home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
