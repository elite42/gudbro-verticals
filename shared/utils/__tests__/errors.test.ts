import { describe, it, expect } from 'vitest';
import {
  AppError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
  ConflictError,
  RateLimitError,
  BusinessError,
  isAppError,
  isOperationalError,
  toAppError,
  getErrorMessage,
} from '../errors';

describe('AppError', () => {
  it('should create error with default values', () => {
    const error = new AppError('Test error');

    expect(error.message).toBe('Test error');
    expect(error.code).toBe('INTERNAL_ERROR');
    expect(error.statusCode).toBe(500);
    expect(error.isOperational).toBe(true);
    expect(error.timestamp).toBeInstanceOf(Date);
  });

  it('should create error with custom options', () => {
    const error = new AppError('Custom error', {
      code: 'CUSTOM_CODE',
      statusCode: 418,
      isOperational: false,
      context: { userId: '123' },
    });

    expect(error.code).toBe('CUSTOM_CODE');
    expect(error.statusCode).toBe(418);
    expect(error.isOperational).toBe(false);
    expect(error.context).toEqual({ userId: '123' });
  });

  it('should serialize to JSON correctly', () => {
    const error = new AppError('JSON test');
    const json = error.toJSON();

    expect(json).toHaveProperty('name', 'AppError');
    expect(json).toHaveProperty('message', 'JSON test');
    expect(json).toHaveProperty('code');
    expect(json).toHaveProperty('statusCode');
    expect(json).toHaveProperty('timestamp');
  });
});

describe('AuthenticationError', () => {
  it('should create with default message', () => {
    const error = new AuthenticationError();

    expect(error.message).toBe('Authentication required');
    expect(error.statusCode).toBe(401);
    expect(error.code).toBe('AUTHENTICATION_ERROR');
  });

  it('should create with custom message', () => {
    const error = new AuthenticationError('Invalid token');
    expect(error.message).toBe('Invalid token');
  });
});

describe('AuthorizationError', () => {
  it('should create with correct status code', () => {
    const error = new AuthorizationError();

    expect(error.statusCode).toBe(403);
    expect(error.code).toBe('AUTHORIZATION_ERROR');
  });
});

describe('NotFoundError', () => {
  it('should format resource name in message', () => {
    const error = new NotFoundError('User');

    expect(error.message).toBe('User not found');
    expect(error.statusCode).toBe(404);
  });

  it('should use default resource name', () => {
    const error = new NotFoundError();
    expect(error.message).toBe('Resource not found');
  });
});

describe('ValidationError', () => {
  it('should store validation errors', () => {
    const errors = {
      email: ['Invalid email format'],
      password: ['Too short', 'Must contain number'],
    };
    const error = new ValidationError('Validation failed', errors);

    expect(error.statusCode).toBe(400);
    expect(error.errors).toEqual(errors);
  });

  it('should include errors in JSON', () => {
    const errors = { field: ['Error'] };
    const error = new ValidationError('Test', errors);
    const json = error.toJSON();

    expect(json).toHaveProperty('errors', errors);
  });
});

describe('ConflictError', () => {
  it('should create with correct status code', () => {
    const error = new ConflictError('Email already exists');

    expect(error.statusCode).toBe(409);
    expect(error.code).toBe('CONFLICT');
  });
});

describe('RateLimitError', () => {
  it('should store retryAfter value', () => {
    const error = new RateLimitError('Too many requests', 60);

    expect(error.statusCode).toBe(429);
    expect(error.retryAfter).toBe(60);
  });
});

describe('BusinessError', () => {
  it('should create with custom code', () => {
    const error = new BusinessError('Insufficient funds', 'INSUFFICIENT_FUNDS');

    expect(error.statusCode).toBe(422);
    expect(error.code).toBe('INSUFFICIENT_FUNDS');
  });
});

describe('isAppError', () => {
  it('should return true for AppError instances', () => {
    expect(isAppError(new AppError('test'))).toBe(true);
    expect(isAppError(new ValidationError('test'))).toBe(true);
    expect(isAppError(new NotFoundError())).toBe(true);
  });

  it('should return false for non-AppError', () => {
    expect(isAppError(new Error('test'))).toBe(false);
    expect(isAppError('string')).toBe(false);
    expect(isAppError(null)).toBe(false);
    expect(isAppError(undefined)).toBe(false);
  });
});

describe('isOperationalError', () => {
  it('should return true for operational errors', () => {
    expect(isOperationalError(new ValidationError('test'))).toBe(true);
    expect(isOperationalError(new NotFoundError())).toBe(true);
  });

  it('should return false for non-operational errors', () => {
    const error = new AppError('test', { isOperational: false });
    expect(isOperationalError(error)).toBe(false);
  });

  it('should return false for non-AppError', () => {
    expect(isOperationalError(new Error('test'))).toBe(false);
  });
});

describe('toAppError', () => {
  it('should return same error if already AppError', () => {
    const original = new NotFoundError('User');
    const converted = toAppError(original);

    expect(converted).toBe(original);
  });

  it('should convert Error to AppError', () => {
    const original = new Error('Standard error');
    const converted = toAppError(original);

    expect(converted).toBeInstanceOf(AppError);
    expect(converted.message).toBe('Standard error');
    expect(converted.code).toBe('UNKNOWN_ERROR');
  });

  it('should convert string to AppError', () => {
    const converted = toAppError('String error');

    expect(converted).toBeInstanceOf(AppError);
    expect(converted.message).toBe('String error');
  });
});

describe('getErrorMessage', () => {
  it('should extract message from AppError', () => {
    expect(getErrorMessage(new AppError('App error'))).toBe('App error');
  });

  it('should extract message from Error', () => {
    expect(getErrorMessage(new Error('Standard error'))).toBe('Standard error');
  });

  it('should convert non-error to string', () => {
    expect(getErrorMessage('String message')).toBe('String message');
    expect(getErrorMessage(123)).toBe('123');
  });
});
