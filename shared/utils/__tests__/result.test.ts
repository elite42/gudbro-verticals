import { describe, it, expect } from 'vitest';
import {
  ok,
  err,
  isOk,
  isErr,
  unwrap,
  unwrapOr,
  unwrapOrElse,
  map,
  mapErr,
  andThen,
  all,
  fromPromise,
  tryCatch,
  tryCatchAsync,
  type Result,
} from '../result';

// ============================================
// Constructors
// ============================================

describe('ok', () => {
  it('should create a success result with the given value', () => {
    const result = ok(42);
    expect(result.ok).toBe(true);
    expect(result.value).toBe(42);
  });

  it('should work with string values', () => {
    const result = ok('hello');
    expect(result.ok).toBe(true);
    expect(result.value).toBe('hello');
  });

  it('should work with object values', () => {
    const obj = { name: 'test', count: 5 };
    const result = ok(obj);
    expect(result.ok).toBe(true);
    expect(result.value).toEqual(obj);
  });

  it('should work with null', () => {
    const result = ok(null);
    expect(result.ok).toBe(true);
    expect(result.value).toBeNull();
  });

  it('should work with undefined', () => {
    const result = ok(undefined);
    expect(result.ok).toBe(true);
    expect(result.value).toBeUndefined();
  });

  it('should work with array values', () => {
    const arr = [1, 2, 3];
    const result = ok(arr);
    expect(result.ok).toBe(true);
    expect(result.value).toEqual(arr);
  });
});

describe('err', () => {
  it('should create a failure result with the given error', () => {
    const error = new Error('test error');
    const result = err(error);
    expect(result.ok).toBe(false);
    expect(result.error).toBe(error);
  });

  it('should work with string errors', () => {
    const result = err('something went wrong');
    expect(result.ok).toBe(false);
    expect(result.error).toBe('something went wrong');
  });

  it('should work with custom error objects', () => {
    const customError = { code: 'NOT_FOUND', message: 'Resource not found' };
    const result = err(customError);
    expect(result.ok).toBe(false);
    expect(result.error).toEqual(customError);
  });

  it('should work with error codes (numbers)', () => {
    const result = err(404);
    expect(result.ok).toBe(false);
    expect(result.error).toBe(404);
  });
});

// ============================================
// Type Guards
// ============================================

describe('isOk', () => {
  it('should return true for success results', () => {
    const result = ok('value');
    expect(isOk(result)).toBe(true);
  });

  it('should return false for failure results', () => {
    const result = err(new Error('error'));
    expect(isOk(result)).toBe(false);
  });

  it('should narrow the type correctly', () => {
    const result: Result<number, Error> = ok(42);
    if (isOk(result)) {
      // TypeScript should know result.value exists here
      expect(result.value).toBe(42);
    }
  });
});

describe('isErr', () => {
  it('should return true for failure results', () => {
    const result = err(new Error('error'));
    expect(isErr(result)).toBe(true);
  });

  it('should return false for success results', () => {
    const result = ok('value');
    expect(isErr(result)).toBe(false);
  });

  it('should narrow the type correctly', () => {
    const error = new Error('test');
    const result: Result<number, Error> = err(error);
    if (isErr(result)) {
      // TypeScript should know result.error exists here
      expect(result.error).toBe(error);
    }
  });
});

// ============================================
// Utility Functions
// ============================================

describe('unwrap', () => {
  it('should return the value for success results', () => {
    const result = ok(42);
    expect(unwrap(result)).toBe(42);
  });

  it('should throw for failure results', () => {
    const error = new Error('test error');
    const result = err(error);
    expect(() => unwrap(result)).toThrow(error);
  });

  it('should throw string errors', () => {
    const result = err('string error');
    expect(() => unwrap(result)).toThrow('string error');
  });
});

describe('unwrapOr', () => {
  it('should return the value for success results', () => {
    const result = ok(42);
    expect(unwrapOr(result, 0)).toBe(42);
  });

  it('should return the default for failure results', () => {
    const result = err(new Error('error'));
    expect(unwrapOr(result, 0)).toBe(0);
  });

  it('should work with string defaults', () => {
    const result: Result<string, Error> = err(new Error('error'));
    expect(unwrapOr(result, 'default')).toBe('default');
  });

  it('should not call the default when success', () => {
    const result = ok('value');
    expect(unwrapOr(result, 'not used')).toBe('value');
  });
});

describe('unwrapOrElse', () => {
  it('should return the value for success results', () => {
    const result = ok(42);
    expect(unwrapOrElse(result, () => 0)).toBe(42);
  });

  it('should call the function for failure results', () => {
    const result = err(new Error('error'));
    expect(unwrapOrElse(result, () => 0)).toBe(0);
  });

  it('should pass the error to the function', () => {
    const error = { code: 404, message: 'not found' };
    const result = err(error);
    expect(unwrapOrElse(result, (e) => e.code)).toBe(404);
  });

  it('should not call the function for success results', () => {
    const result = ok(42);
    const fn = () => {
      throw new Error('should not be called');
    };
    expect(unwrapOrElse(result, fn)).toBe(42);
  });
});

describe('map', () => {
  it('should transform the value for success results', () => {
    const result = ok(5);
    const mapped = map(result, (x) => x * 2);
    expect(isOk(mapped)).toBe(true);
    expect(unwrap(mapped)).toBe(10);
  });

  it('should preserve the error for failure results', () => {
    const error = new Error('test');
    const result: Result<number, Error> = err(error);
    const mapped = map(result, (x) => x * 2);
    expect(isErr(mapped)).toBe(true);
    if (isErr(mapped)) {
      expect(mapped.error).toBe(error);
    }
  });

  it('should change the value type', () => {
    const result = ok(42);
    const mapped = map(result, (x) => x.toString());
    expect(unwrap(mapped)).toBe('42');
  });

  it('should not call the function for failure results', () => {
    const result: Result<number, Error> = err(new Error('error'));
    const fn = () => {
      throw new Error('should not be called');
    };
    const mapped = map(result, fn);
    expect(isErr(mapped)).toBe(true);
  });
});

describe('mapErr', () => {
  it('should transform the error for failure results', () => {
    const result = err('error message');
    const mapped = mapErr(result, (e) => new Error(e));
    expect(isErr(mapped)).toBe(true);
    if (isErr(mapped)) {
      expect(mapped.error).toBeInstanceOf(Error);
      expect(mapped.error.message).toBe('error message');
    }
  });

  it('should preserve the value for success results', () => {
    const result: Result<number, string> = ok(42);
    const mapped = mapErr(result, (e) => new Error(e));
    expect(isOk(mapped)).toBe(true);
    expect(unwrap(mapped)).toBe(42);
  });

  it('should not call the function for success results', () => {
    const result: Result<number, string> = ok(42);
    const fn = () => {
      throw new Error('should not be called');
    };
    const mapped = mapErr(result, fn);
    expect(isOk(mapped)).toBe(true);
  });
});

describe('andThen', () => {
  it('should chain successful results', () => {
    const result = ok(5);
    const chained = andThen(result, (x) => ok(x * 2));
    expect(isOk(chained)).toBe(true);
    expect(unwrap(chained)).toBe(10);
  });

  it('should propagate the first error', () => {
    const error = new Error('first error');
    const result: Result<number, Error> = err(error);
    const chained = andThen(result, (x) => ok(x * 2));
    expect(isErr(chained)).toBe(true);
    if (isErr(chained)) {
      expect(chained.error).toBe(error);
    }
  });

  it('should propagate errors from the chained function', () => {
    const result = ok(5);
    const error = new Error('second error');
    const chained = andThen(result, () => err(error));
    expect(isErr(chained)).toBe(true);
    if (isErr(chained)) {
      expect(chained.error).toBe(error);
    }
  });

  it('should allow type changes through the chain', () => {
    const result = ok(42);
    const chained = andThen(result, (x) => ok(`Number: ${x}`));
    expect(unwrap(chained)).toBe('Number: 42');
  });
});

describe('all', () => {
  it('should combine all successful results', () => {
    const results = [ok(1), ok(2), ok(3)];
    const combined = all(results);
    expect(isOk(combined)).toBe(true);
    expect(unwrap(combined)).toEqual([1, 2, 3]);
  });

  it('should return the first error', () => {
    const error = new Error('error');
    const results: Result<number, Error>[] = [ok(1), err(error), ok(3)];
    const combined = all(results);
    expect(isErr(combined)).toBe(true);
    if (isErr(combined)) {
      expect(combined.error).toBe(error);
    }
  });

  it('should return empty array for empty input', () => {
    const results: Result<number, Error>[] = [];
    const combined = all(results);
    expect(isOk(combined)).toBe(true);
    expect(unwrap(combined)).toEqual([]);
  });

  it('should return the first of multiple errors', () => {
    const error1 = new Error('error 1');
    const error2 = new Error('error 2');
    const results: Result<number, Error>[] = [ok(1), err(error1), err(error2)];
    const combined = all(results);
    expect(isErr(combined)).toBe(true);
    if (isErr(combined)) {
      expect(combined.error).toBe(error1);
    }
  });

  it('should work with single element', () => {
    const results = [ok(42)];
    const combined = all(results);
    expect(unwrap(combined)).toEqual([42]);
  });
});

// ============================================
// Async Utilities
// ============================================

describe('fromPromise', () => {
  it('should wrap a resolved promise in success', async () => {
    const promise = Promise.resolve(42);
    const result = await fromPromise(promise);
    expect(isOk(result)).toBe(true);
    expect(unwrap(result)).toBe(42);
  });

  it('should wrap a rejected promise in failure', async () => {
    const error = new Error('rejected');
    const promise = Promise.reject(error);
    const result = await fromPromise(promise);
    expect(isErr(result)).toBe(true);
    if (isErr(result)) {
      expect(result.error).toBe(error);
    }
  });

  it('should use error mapper for rejected promises', async () => {
    const promise = Promise.reject(new Error('original'));
    const result = await fromPromise(promise, () => 'mapped error');
    expect(isErr(result)).toBe(true);
    if (isErr(result)) {
      expect(result.error).toBe('mapped error');
    }
  });

  it('should pass the error to the mapper', async () => {
    const originalError = new Error('original message');
    const promise = Promise.reject(originalError);
    const result = await fromPromise(promise, (e) => `Wrapped: ${(e as Error).message}`);
    expect(isErr(result)).toBe(true);
    if (isErr(result)) {
      expect(result.error).toBe('Wrapped: original message');
    }
  });
});

describe('tryCatch', () => {
  it('should wrap a successful function in success', () => {
    const result = tryCatch(() => 42);
    expect(isOk(result)).toBe(true);
    expect(unwrap(result)).toBe(42);
  });

  it('should wrap a throwing function in failure', () => {
    const error = new Error('thrown');
    const result = tryCatch(() => {
      throw error;
    });
    expect(isErr(result)).toBe(true);
    if (isErr(result)) {
      expect(result.error).toBe(error);
    }
  });

  it('should use error mapper for exceptions', () => {
    const result = tryCatch(
      () => {
        throw new Error('original');
      },
      () => 'mapped error'
    );
    expect(isErr(result)).toBe(true);
    if (isErr(result)) {
      expect(result.error).toBe('mapped error');
    }
  });

  it('should pass the error to the mapper', () => {
    const result = tryCatch(
      () => {
        throw new Error('original message');
      },
      (e) => `Caught: ${(e as Error).message}`
    );
    expect(isErr(result)).toBe(true);
    if (isErr(result)) {
      expect(result.error).toBe('Caught: original message');
    }
  });

  it('should handle JSON parsing', () => {
    const validJson = '{"name": "test"}';
    const result = tryCatch(() => JSON.parse(validJson));
    expect(isOk(result)).toBe(true);
    expect(unwrap(result)).toEqual({ name: 'test' });
  });

  it('should catch JSON parsing errors', () => {
    const invalidJson = 'not valid json';
    const result = tryCatch(() => JSON.parse(invalidJson));
    expect(isErr(result)).toBe(true);
  });
});

describe('tryCatchAsync', () => {
  it('should wrap a successful async function in success', async () => {
    const result = await tryCatchAsync(async () => 42);
    expect(isOk(result)).toBe(true);
    expect(unwrap(result)).toBe(42);
  });

  it('should wrap a throwing async function in failure', async () => {
    const error = new Error('async error');
    const result = await tryCatchAsync(async () => {
      throw error;
    });
    expect(isErr(result)).toBe(true);
    if (isErr(result)) {
      expect(result.error).toBe(error);
    }
  });

  it('should wrap a rejected promise in failure', async () => {
    const error = new Error('rejected');
    const result = await tryCatchAsync(() => Promise.reject(error));
    expect(isErr(result)).toBe(true);
    if (isErr(result)) {
      expect(result.error).toBe(error);
    }
  });

  it('should use error mapper for async exceptions', async () => {
    const result = await tryCatchAsync(
      async () => {
        throw new Error('original');
      },
      () => 'mapped async error'
    );
    expect(isErr(result)).toBe(true);
    if (isErr(result)) {
      expect(result.error).toBe('mapped async error');
    }
  });

  it('should handle delayed async operations', async () => {
    const result = await tryCatchAsync(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      return 'delayed result';
    });
    expect(isOk(result)).toBe(true);
    expect(unwrap(result)).toBe('delayed result');
  });
});

// ============================================
// Integration / Real World Scenarios
// ============================================

describe('Real world scenarios', () => {
  it('should handle parsing and validation chain', () => {
    const parseNumber = (str: string): Result<number, string> => {
      const num = parseInt(str, 10);
      if (isNaN(num)) {
        return err('Invalid number');
      }
      return ok(num);
    };

    const validatePositive = (num: number): Result<number, string> => {
      if (num <= 0) {
        return err('Number must be positive');
      }
      return ok(num);
    };

    // Success case
    const result1 = andThen(parseNumber('42'), validatePositive);
    expect(unwrap(result1)).toBe(42);

    // Parse failure
    const result2 = andThen(parseNumber('abc'), validatePositive);
    expect(isErr(result2)).toBe(true);

    // Validation failure
    const result3 = andThen(parseNumber('-5'), validatePositive);
    expect(isErr(result3)).toBe(true);
  });

  it('should handle fetching and transforming data', async () => {
    interface User {
      id: number;
      name: string;
    }

    const fetchUser = async (id: number): Promise<Result<User, string>> => {
      if (id === 1) {
        return ok({ id: 1, name: 'Alice' });
      }
      return err('User not found');
    };

    // Success case
    const result1 = await fetchUser(1);
    const userName1 = map(result1, (user) => user.name);
    expect(unwrap(userName1)).toBe('Alice');

    // Error case
    const result2 = await fetchUser(999);
    const userName2 = map(result2, (user) => user.name);
    expect(unwrapOr(userName2, 'Unknown')).toBe('Unknown');
  });

  it('should handle multiple API calls', async () => {
    const api1 = async (): Promise<Result<number, string>> => ok(10);
    const api2 = async (): Promise<Result<number, string>> => ok(20);
    const api3 = async (): Promise<Result<number, string>> => ok(30);

    const results = await Promise.all([api1(), api2(), api3()]);
    const combined = all(results);

    expect(isOk(combined)).toBe(true);
    expect(unwrap(combined)).toEqual([10, 20, 30]);
  });
});
