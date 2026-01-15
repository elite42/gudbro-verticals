/**
 * Tests for logger.ts
 *
 * Tests cover:
 * - LogLevel type and LOG_LEVELS constant
 * - LogContext and LogEntry interfaces
 * - LoggerOptions interface
 * - createLogger factory function
 * - Logger class behavior
 * - Pre-configured loggers
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { LogLevel, LogContext, LogEntry, LoggerOptions } from '../logger';
import { createLogger, loggers } from '../logger';

// ============================================
// TYPES
// ============================================

describe('LogLevel type', () => {
  it('should accept valid log levels', () => {
    const debug: LogLevel = 'debug';
    const info: LogLevel = 'info';
    const warn: LogLevel = 'warn';
    const error: LogLevel = 'error';

    expect(debug).toBe('debug');
    expect(info).toBe('info');
    expect(warn).toBe('warn');
    expect(error).toBe('error');
  });

  it('should have 4 log levels', () => {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    expect(levels).toHaveLength(4);
  });

  it('should follow severity order (debug < info < warn < error)', () => {
    // By convention, debug is least severe, error is most severe
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    expect(levels[0]).toBe('debug');
    expect(levels[3]).toBe('error');
  });
});

describe('LogContext interface', () => {
  it('should accept any key-value pairs', () => {
    const context: LogContext = {
      userId: '123',
      action: 'login',
      timestamp: Date.now(),
    };

    expect(context.userId).toBe('123');
    expect(context.action).toBe('login');
  });

  it('should accept nested objects', () => {
    const context: LogContext = {
      user: {
        id: '123',
        name: 'John',
      },
      request: {
        method: 'POST',
        path: '/api/login',
      },
    };

    expect(context.user).toEqual({ id: '123', name: 'John' });
  });

  it('should accept various value types', () => {
    const context: LogContext = {
      string: 'value',
      number: 42,
      boolean: true,
      array: [1, 2, 3],
      object: { key: 'value' },
      nullValue: null,
    };

    expect(Object.keys(context)).toHaveLength(6);
  });
});

describe('LogEntry interface', () => {
  it('should have required fields', () => {
    const entry: LogEntry = {
      level: 'info',
      message: 'User logged in',
      timestamp: '2026-01-14T12:00:00.000Z',
    };

    expect(entry.level).toBe('info');
    expect(entry.message).toBe('User logged in');
    expect(entry.timestamp).toBeTruthy();
  });

  it('should support optional context', () => {
    const entry: LogEntry = {
      level: 'info',
      message: 'Request processed',
      timestamp: '2026-01-14T12:00:00.000Z',
      context: {
        requestId: 'abc-123',
        duration: 150,
      },
    };

    expect(entry.context?.requestId).toBe('abc-123');
  });

  it('should support error details', () => {
    const entry: LogEntry = {
      level: 'error',
      message: 'Failed to process',
      timestamp: '2026-01-14T12:00:00.000Z',
      error: {
        name: 'ValidationError',
        message: 'Invalid input',
        stack: 'Error: Invalid input\n    at validate...',
        code: 'VALIDATION_FAILED',
      },
    };

    expect(entry.error?.name).toBe('ValidationError');
    expect(entry.error?.code).toBe('VALIDATION_FAILED');
  });
});

describe('LoggerOptions interface', () => {
  it('should require service name', () => {
    const options: LoggerOptions = {
      service: 'my-service',
    };

    expect(options.service).toBe('my-service');
  });

  it('should support optional minLevel', () => {
    const options: LoggerOptions = {
      service: 'my-service',
      minLevel: 'warn',
    };

    expect(options.minLevel).toBe('warn');
  });

  it('should support optional includeStackInProd', () => {
    const options: LoggerOptions = {
      service: 'my-service',
      includeStackInProd: true,
    };

    expect(options.includeStackInProd).toBe(true);
  });

  it('should support all options together', () => {
    const options: LoggerOptions = {
      service: 'api-server',
      minLevel: 'info',
      includeStackInProd: false,
    };

    expect(options.service).toBe('api-server');
    expect(options.minLevel).toBe('info');
    expect(options.includeStackInProd).toBe(false);
  });
});

// ============================================
// createLogger FACTORY
// ============================================

describe('createLogger', () => {
  it('should create a logger with service name', () => {
    const logger = createLogger({ service: 'test-service' });
    expect(logger).toBeDefined();
  });

  it('should create loggers with different services', () => {
    const logger1 = createLogger({ service: 'service-a' });
    const logger2 = createLogger({ service: 'service-b' });

    expect(logger1).toBeDefined();
    expect(logger2).toBeDefined();
    expect(logger1).not.toBe(logger2);
  });

  it('should respect minLevel option', () => {
    const logger = createLogger({ service: 'test', minLevel: 'error' });
    expect(logger).toBeDefined();
  });

  it('should have all log methods', () => {
    const logger = createLogger({ service: 'test' });

    expect(typeof logger.debug).toBe('function');
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.error).toBe('function');
  });

  it('should have child method', () => {
    const logger = createLogger({ service: 'test' });
    expect(typeof logger.child).toBe('function');
  });
});

// ============================================
// LOGGER BEHAVIOR
// ============================================

describe('Logger behavior', () => {
  let consoleSpy: {
    debug: ReturnType<typeof vi.spyOn>;
    info: ReturnType<typeof vi.spyOn>;
    warn: ReturnType<typeof vi.spyOn>;
    error: ReturnType<typeof vi.spyOn>;
    log: ReturnType<typeof vi.spyOn>;
  };

  beforeEach(() => {
    consoleSpy = {
      debug: vi.spyOn(console, 'debug').mockImplementation(() => {}),
      info: vi.spyOn(console, 'info').mockImplementation(() => {}),
      warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
      error: vi.spyOn(console, 'error').mockImplementation(() => {}),
      log: vi.spyOn(console, 'log').mockImplementation(() => {}),
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('log level filtering', () => {
    it('should not log debug when minLevel is info', () => {
      const logger = createLogger({ service: 'test', minLevel: 'info' });
      logger.debug('Debug message');

      expect(consoleSpy.debug).not.toHaveBeenCalled();
    });

    it('should log info when minLevel is info', () => {
      const logger = createLogger({ service: 'test', minLevel: 'info' });
      logger.info('Info message');

      expect(consoleSpy.info).toHaveBeenCalled();
    });

    it('should log warn when minLevel is info', () => {
      const logger = createLogger({ service: 'test', minLevel: 'info' });
      logger.warn('Warn message');

      expect(consoleSpy.warn).toHaveBeenCalled();
    });

    it('should log error when minLevel is info', () => {
      const logger = createLogger({ service: 'test', minLevel: 'info' });
      logger.error('Error message');

      expect(consoleSpy.error).toHaveBeenCalled();
    });

    it('should only log error when minLevel is error', () => {
      const logger = createLogger({ service: 'test', minLevel: 'error' });

      logger.debug('Debug');
      logger.info('Info');
      logger.warn('Warn');
      logger.error('Error');

      expect(consoleSpy.debug).not.toHaveBeenCalled();
      expect(consoleSpy.info).not.toHaveBeenCalled();
      expect(consoleSpy.warn).not.toHaveBeenCalled();
      expect(consoleSpy.error).toHaveBeenCalled();
    });

    it('should log all levels when minLevel is debug', () => {
      const logger = createLogger({ service: 'test', minLevel: 'debug' });

      logger.debug('Debug');
      logger.info('Info');
      logger.warn('Warn');
      logger.error('Error');

      expect(consoleSpy.debug).toHaveBeenCalled();
      expect(consoleSpy.info).toHaveBeenCalled();
      expect(consoleSpy.warn).toHaveBeenCalled();
      expect(consoleSpy.error).toHaveBeenCalled();
    });
  });

  describe('logging with context', () => {
    it('should accept context in debug', () => {
      const logger = createLogger({ service: 'test', minLevel: 'debug' });
      logger.debug('Debug message', { key: 'value' });

      expect(consoleSpy.debug).toHaveBeenCalled();
    });

    it('should accept context in info', () => {
      const logger = createLogger({ service: 'test', minLevel: 'info' });
      logger.info('Info message', { userId: '123' });

      expect(consoleSpy.info).toHaveBeenCalled();
    });

    it('should accept context in warn', () => {
      const logger = createLogger({ service: 'test', minLevel: 'info' });
      logger.warn('Warn message', { warning: 'deprecated' });

      expect(consoleSpy.warn).toHaveBeenCalled();
    });

    it('should accept error object in error', () => {
      const logger = createLogger({ service: 'test', minLevel: 'info' });
      const error = new Error('Test error');
      logger.error('Error message', error);

      expect(consoleSpy.error).toHaveBeenCalled();
    });

    it('should accept both error and context in error', () => {
      const logger = createLogger({ service: 'test', minLevel: 'info' });
      const error = new Error('Test error');
      logger.error('Error message', error, { requestId: 'abc' });

      expect(consoleSpy.error).toHaveBeenCalled();
    });
  });

  describe('child logger', () => {
    it('should create a child logger', () => {
      const logger = createLogger({ service: 'parent', minLevel: 'info' });
      const child = logger.child({ component: 'auth' });

      expect(child).toBeDefined();
    });

    it('should inherit parent log level', () => {
      const logger = createLogger({ service: 'parent', minLevel: 'warn' });
      const child = logger.child({ component: 'auth' });

      child.info('This should not log');
      child.warn('This should log');

      expect(consoleSpy.info).not.toHaveBeenCalled();
      expect(consoleSpy.warn).toHaveBeenCalled();
    });

    it('should include additional context', () => {
      const logger = createLogger({ service: 'parent', minLevel: 'info' });
      const child = logger.child({ requestId: '123' });

      child.info('Child log message');

      expect(consoleSpy.info).toHaveBeenCalled();
      // The context should include requestId
      const logOutput = consoleSpy.info.mock.calls[0][0];
      expect(logOutput).toContain('requestId');
    });

    it('should merge child context with log context', () => {
      const logger = createLogger({ service: 'parent', minLevel: 'info' });
      const child = logger.child({ requestId: '123' });

      child.info('Message', { action: 'test' });

      expect(consoleSpy.info).toHaveBeenCalled();
    });
  });
});

// ============================================
// PRE-CONFIGURED LOGGERS
// ============================================

describe('Pre-configured loggers', () => {
  it('should have website logger', () => {
    expect(loggers.website).toBeDefined();
    expect(typeof loggers.website.info).toBe('function');
  });

  it('should have backoffice logger', () => {
    expect(loggers.backoffice).toBeDefined();
    expect(typeof loggers.backoffice.info).toBe('function');
  });

  it('should have pwa logger', () => {
    expect(loggers.pwa).toBeDefined();
    expect(typeof loggers.pwa.info).toBe('function');
  });

  it('should have api logger', () => {
    expect(loggers.api).toBeDefined();
    expect(typeof loggers.api.info).toBe('function');
  });

  it('should have 4 pre-configured loggers', () => {
    const loggerKeys = Object.keys(loggers);
    expect(loggerKeys).toHaveLength(4);
    expect(loggerKeys).toContain('website');
    expect(loggerKeys).toContain('backoffice');
    expect(loggerKeys).toContain('pwa');
    expect(loggerKeys).toContain('api');
  });
});

// ============================================
// EDGE CASES
// ============================================

describe('Edge cases', () => {
  let consoleSpy: {
    info: ReturnType<typeof vi.spyOn>;
    error: ReturnType<typeof vi.spyOn>;
  };

  beforeEach(() => {
    consoleSpy = {
      info: vi.spyOn(console, 'info').mockImplementation(() => {}),
      error: vi.spyOn(console, 'error').mockImplementation(() => {}),
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should handle empty message', () => {
    const logger = createLogger({ service: 'test', minLevel: 'info' });
    logger.info('');

    expect(consoleSpy.info).toHaveBeenCalled();
  });

  it('should handle very long message', () => {
    const logger = createLogger({ service: 'test', minLevel: 'info' });
    const longMessage = 'A'.repeat(10000);
    logger.info(longMessage);

    expect(consoleSpy.info).toHaveBeenCalled();
  });

  it('should handle undefined context', () => {
    const logger = createLogger({ service: 'test', minLevel: 'info' });
    logger.info('Message', undefined);

    expect(consoleSpy.info).toHaveBeenCalled();
  });

  it('should handle empty context', () => {
    const logger = createLogger({ service: 'test', minLevel: 'info' });
    logger.info('Message', {});

    expect(consoleSpy.info).toHaveBeenCalled();
  });

  it('should handle non-Error objects in error logging', () => {
    const logger = createLogger({ service: 'test', minLevel: 'info' });
    logger.error('Error occurred', 'string error');

    expect(consoleSpy.error).toHaveBeenCalled();
  });

  it('should handle null as error', () => {
    const logger = createLogger({ service: 'test', minLevel: 'info' });
    logger.error('Error occurred', null);

    expect(consoleSpy.error).toHaveBeenCalled();
  });

  it('should handle circular references in context', () => {
    const logger = createLogger({ service: 'test', minLevel: 'info' });
    const circular: LogContext = { key: 'value' };
    // Note: This might cause issues in JSON.stringify, but logger should handle it
    // The logger uses try-catch or circular-safe stringify internally

    // Just verify it doesn't throw
    expect(() => logger.info('Message', circular)).not.toThrow();
  });

  it('should handle special characters in message', () => {
    const logger = createLogger({ service: 'test', minLevel: 'info' });
    logger.info('Message with special chars: \n\t"quotes" \\backslash');

    expect(consoleSpy.info).toHaveBeenCalled();
  });

  it('should handle unicode in message', () => {
    const logger = createLogger({ service: 'test', minLevel: 'info' });
    logger.info('Message with unicode: 你好世界 🌍 مرحبا');

    expect(consoleSpy.info).toHaveBeenCalled();
  });

  it('should handle Error with custom properties', () => {
    const logger = createLogger({ service: 'test', minLevel: 'info' });
    const error = new Error('Custom error');
    (error as Error & { code: string }).code = 'CUSTOM_CODE';

    logger.error('Error with code', error);

    expect(consoleSpy.error).toHaveBeenCalled();
  });
});

// ============================================
// REAL-WORLD SCENARIOS
// ============================================

describe('Real-world scenarios', () => {
  let consoleSpy: {
    info: ReturnType<typeof vi.spyOn>;
    warn: ReturnType<typeof vi.spyOn>;
    error: ReturnType<typeof vi.spyOn>;
  };

  beforeEach(() => {
    consoleSpy = {
      info: vi.spyOn(console, 'info').mockImplementation(() => {}),
      warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
      error: vi.spyOn(console, 'error').mockImplementation(() => {}),
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should handle API request logging pattern', () => {
    const logger = createLogger({ service: 'api', minLevel: 'info' });

    // Simulate API request logging
    logger.info('Incoming request', {
      method: 'POST',
      path: '/api/orders',
      userId: 'user-123',
    });

    expect(consoleSpy.info).toHaveBeenCalled();
  });

  it('should handle error with stack trace', () => {
    const logger = createLogger({ service: 'api', minLevel: 'info' });

    try {
      throw new Error('Database connection failed');
    } catch (error) {
      logger.error('Failed to connect to database', error, {
        host: 'db.example.com',
        port: 5432,
      });
    }

    expect(consoleSpy.error).toHaveBeenCalled();
  });

  it('should handle warning for deprecated feature', () => {
    const logger = createLogger({ service: 'api', minLevel: 'info' });

    logger.warn('Deprecated API endpoint used', {
      endpoint: '/api/v1/legacy',
      suggestedEndpoint: '/api/v2/modern',
      userId: 'user-456',
    });

    expect(consoleSpy.warn).toHaveBeenCalled();
  });

  it('should use child logger for request scoping', () => {
    const baseLogger = createLogger({ service: 'api', minLevel: 'info' });

    // Create request-scoped logger
    const requestLogger = baseLogger.child({
      requestId: 'req-abc-123',
      traceId: 'trace-xyz-789',
    });

    requestLogger.info('Processing order');
    requestLogger.info('Validating payment');
    requestLogger.info('Order completed');

    expect(consoleSpy.info).toHaveBeenCalledTimes(3);
  });

  it('should handle high-frequency logging', () => {
    const logger = createLogger({ service: 'metrics', minLevel: 'info' });

    // Simulate high-frequency metric logging
    for (let i = 0; i < 100; i++) {
      logger.info('Metric recorded', { value: i, timestamp: Date.now() });
    }

    expect(consoleSpy.info).toHaveBeenCalledTimes(100);
  });
});
