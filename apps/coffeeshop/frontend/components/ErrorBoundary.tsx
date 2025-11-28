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
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // In production, you would send this to an error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-theme-brand-secondary p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">😔</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Qualcosa è andato storto
            </h1>
            <p className="text-gray-600 mb-6">
              Ci scusiamo per l'inconveniente. L'app ha riscontrato un errore inatteso.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm font-semibold text-gray-700 mb-2">
                  Dettagli errore (solo dev)
                </summary>
                <pre className="bg-red-50 p-3 rounded-lg text-xs text-red-800 overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-theme-brand-primary to-theme-brand-primary text-white py-3 px-6 rounded-xl font-semibold hover:from-theme-brand-primary-hover hover:to-theme-brand-primary-hover transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Ricarica la pagina
            </button>

            <button
              onClick={() => window.location.href = '/'}
              className="w-full mt-3 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
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
