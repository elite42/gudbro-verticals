'use client';

/**
 * Error Boundary Component
 *
 * Catches JavaScript errors in child components and displays a fallback UI.
 */

import { Component, ReactNode } from 'react';
import { Warning, ArrowClockwise } from '@phosphor-icons/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <Warning size={32} weight="fill" className="text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-theme-text-primary mb-2">
            Qualcosa è andato storto
          </h3>
          <p className="text-sm text-theme-text-secondary mb-4 max-w-xs">
            Si è verificato un errore imprevisto. Prova a ricaricare la pagina.
          </p>
          <button
            onClick={this.handleRetry}
            className="flex items-center gap-2 px-4 py-2 bg-theme-brand-primary text-white rounded-xl font-medium hover:bg-theme-brand-primary/90 transition-colors"
          >
            <ArrowClockwise size={18} weight="bold" />
            Riprova
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Error fallback for smaller components
 */
export function ErrorFallback({
  message = 'Errore nel caricamento',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex items-center justify-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
      <Warning size={20} weight="fill" className="text-red-500 mr-2" />
      <span className="text-sm text-red-700 dark:text-red-300">{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-3 text-sm font-medium text-red-600 dark:text-red-400 hover:underline"
        >
          Riprova
        </button>
      )}
    </div>
  );
}
