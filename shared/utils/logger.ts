/**
 * Structured Logger
 * Consistent logging across all applications
 */

// ============================================================================
// Types
// ============================================================================

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogContext {
  [key: string]: unknown;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
  error?: {
    name: string;
    message: string;
    stack?: string;
    code?: string;
  };
}

export interface LoggerOptions {
  /** Service/app name for identification */
  service: string;
  /** Minimum log level to output */
  minLevel?: LogLevel;
  /** Include stack traces in production */
  includeStackInProd?: boolean;
}

// ============================================================================
// Log Level Priority
// ============================================================================

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// ============================================================================
// Logger Class
// ============================================================================

class Logger {
  private service: string;
  private minLevel: LogLevel;
  private includeStackInProd: boolean;
  private isDevelopment: boolean;

  constructor(options: LoggerOptions) {
    this.service = options.service;
    this.minLevel = options.minLevel || 'info';
    this.includeStackInProd = options.includeStackInProd || false;
    this.isDevelopment = process.env.NODE_ENV !== 'production';
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.minLevel];
  }

  private formatError(error: unknown): LogEntry['error'] | undefined {
    if (!error) return undefined;

    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: this.isDevelopment || this.includeStackInProd ? error.stack : undefined,
        code: (error as { code?: string }).code,
      };
    }

    return {
      name: 'UnknownError',
      message: String(error),
    };
  }

  private createEntry(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: unknown
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context: {
        service: this.service,
        ...context,
      },
      error: this.formatError(error),
    };
  }

  private output(entry: LogEntry): void {
    if (this.isDevelopment) {
      // Pretty print in development
      const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}] [${this.service}]`;
      const contextStr = entry.context
        ? ` ${JSON.stringify(entry.context, null, 2)}`
        : '';

      switch (entry.level) {
        case 'debug':
          console.debug(`${prefix} ${entry.message}${contextStr}`);
          break;
        case 'info':
          console.info(`${prefix} ${entry.message}${contextStr}`);
          break;
        case 'warn':
          console.warn(`${prefix} ${entry.message}${contextStr}`);
          break;
        case 'error':
          console.error(`${prefix} ${entry.message}${contextStr}`);
          if (entry.error?.stack) {
            console.error(entry.error.stack);
          }
          break;
      }
    } else {
      // JSON output in production (for log aggregators)
      console.log(JSON.stringify(entry));
    }
  }

  debug(message: string, context?: LogContext): void {
    if (!this.shouldLog('debug')) return;
    this.output(this.createEntry('debug', message, context));
  }

  info(message: string, context?: LogContext): void {
    if (!this.shouldLog('info')) return;
    this.output(this.createEntry('info', message, context));
  }

  warn(message: string, context?: LogContext, error?: unknown): void {
    if (!this.shouldLog('warn')) return;
    this.output(this.createEntry('warn', message, context, error));
  }

  error(message: string, error?: unknown, context?: LogContext): void {
    if (!this.shouldLog('error')) return;
    this.output(this.createEntry('error', message, context, error));
  }

  /**
   * Create a child logger with additional context
   */
  child(additionalContext: LogContext): Logger {
    const childLogger = new Logger({
      service: this.service,
      minLevel: this.minLevel,
      includeStackInProd: this.includeStackInProd,
    });

    // Override methods to include additional context
    const originalDebug = childLogger.debug.bind(childLogger);
    const originalInfo = childLogger.info.bind(childLogger);
    const originalWarn = childLogger.warn.bind(childLogger);
    const originalError = childLogger.error.bind(childLogger);

    childLogger.debug = (msg, ctx) => originalDebug(msg, { ...additionalContext, ...ctx });
    childLogger.info = (msg, ctx) => originalInfo(msg, { ...additionalContext, ...ctx });
    childLogger.warn = (msg, ctx, err) => originalWarn(msg, { ...additionalContext, ...ctx }, err);
    childLogger.error = (msg, err, ctx) =>
      originalError(msg, err, { ...additionalContext, ...ctx });

    return childLogger;
  }
}

// ============================================================================
// Factory Function
// ============================================================================

/**
 * Create a new logger instance
 */
export function createLogger(options: LoggerOptions): Logger {
  return new Logger(options);
}

// ============================================================================
// Pre-configured Loggers
// ============================================================================

export const loggers = {
  website: createLogger({ service: 'website', minLevel: 'info' }),
  backoffice: createLogger({ service: 'backoffice', minLevel: 'info' }),
  pwa: createLogger({ service: 'pwa', minLevel: 'info' }),
  api: createLogger({ service: 'api', minLevel: 'info' }),
};

// ============================================================================
// Convenience Export
// ============================================================================

export type { Logger };
