import { describe, it, expect, beforeEach, vi } from 'vitest';
import { calculateCost, MODEL_PRICING, DEFAULT_MODEL, MODEL_LIMITS } from '../openai';

// ============================================
// MODEL_PRICING constants validation
// ============================================

describe('MODEL_PRICING', () => {
  it('should have pricing for gpt-4o-mini', () => {
    expect(MODEL_PRICING['gpt-4o-mini']).toBeDefined();
    expect(MODEL_PRICING['gpt-4o-mini'].input).toBe(0.15);
    expect(MODEL_PRICING['gpt-4o-mini'].output).toBe(0.6);
  });

  it('should have pricing for gpt-4o', () => {
    expect(MODEL_PRICING['gpt-4o']).toBeDefined();
    expect(MODEL_PRICING['gpt-4o'].input).toBe(2.5);
    expect(MODEL_PRICING['gpt-4o'].output).toBe(10.0);
  });

  it('should have pricing for gpt-4-turbo', () => {
    expect(MODEL_PRICING['gpt-4-turbo']).toBeDefined();
    expect(MODEL_PRICING['gpt-4-turbo'].input).toBe(10.0);
    expect(MODEL_PRICING['gpt-4-turbo'].output).toBe(30.0);
  });

  it('should have pricing for gpt-3.5-turbo', () => {
    expect(MODEL_PRICING['gpt-3.5-turbo']).toBeDefined();
    expect(MODEL_PRICING['gpt-3.5-turbo'].input).toBe(0.5);
    expect(MODEL_PRICING['gpt-3.5-turbo'].output).toBe(1.5);
  });

  it('should have at least 4 models', () => {
    expect(Object.keys(MODEL_PRICING).length).toBeGreaterThanOrEqual(4);
  });

  it('all models should have positive input pricing', () => {
    Object.values(MODEL_PRICING).forEach((pricing) => {
      expect(pricing.input).toBeGreaterThan(0);
    });
  });

  it('all models should have positive output pricing', () => {
    Object.values(MODEL_PRICING).forEach((pricing) => {
      expect(pricing.output).toBeGreaterThan(0);
    });
  });

  it('output pricing should be higher than input pricing for all models', () => {
    // Output is typically more expensive as it requires more computation
    Object.values(MODEL_PRICING).forEach((pricing) => {
      expect(pricing.output).toBeGreaterThan(pricing.input);
    });
  });
});

// ============================================
// DEFAULT_MODEL constant
// ============================================

describe('DEFAULT_MODEL', () => {
  it('should be gpt-4o-mini', () => {
    expect(DEFAULT_MODEL).toBe('gpt-4o-mini');
  });

  it('should have pricing defined', () => {
    expect(MODEL_PRICING[DEFAULT_MODEL]).toBeDefined();
  });

  it('should have limits defined', () => {
    expect(MODEL_LIMITS[DEFAULT_MODEL]).toBeDefined();
  });
});

// ============================================
// MODEL_LIMITS constants validation
// ============================================

describe('MODEL_LIMITS', () => {
  it('should have limits for gpt-4o-mini', () => {
    expect(MODEL_LIMITS['gpt-4o-mini']).toBe(128000);
  });

  it('should have limits for gpt-4o', () => {
    expect(MODEL_LIMITS['gpt-4o']).toBe(128000);
  });

  it('should have limits for gpt-4-turbo', () => {
    expect(MODEL_LIMITS['gpt-4-turbo']).toBe(128000);
  });

  it('should have limits for gpt-3.5-turbo', () => {
    expect(MODEL_LIMITS['gpt-3.5-turbo']).toBe(16385);
  });

  it('all models should have positive token limits', () => {
    Object.values(MODEL_LIMITS).forEach((limit) => {
      expect(limit).toBeGreaterThan(0);
    });
  });

  it('all models in pricing should have limits defined', () => {
    Object.keys(MODEL_PRICING).forEach((model) => {
      expect(MODEL_LIMITS[model]).toBeDefined();
    });
  });
});

// ============================================
// calculateCost function
// ============================================

describe('calculateCost', () => {
  describe('basic calculations', () => {
    it('should return 0 for 0 tokens', () => {
      const cost = calculateCost('gpt-4o-mini', 0, 0);
      expect(cost).toBe(0);
    });

    it('should calculate cost for input tokens only', () => {
      // gpt-4o-mini input: $0.15 per 1M tokens
      // 1000 tokens = 0.00015
      const cost = calculateCost('gpt-4o-mini', 1000, 0);
      expect(cost).toBeCloseTo(0.00015, 10);
    });

    it('should calculate cost for output tokens only', () => {
      // gpt-4o-mini output: $0.6 per 1M tokens
      // 1000 tokens = 0.0006
      const cost = calculateCost('gpt-4o-mini', 0, 1000);
      expect(cost).toBeCloseTo(0.0006, 10);
    });

    it('should calculate combined cost for input and output tokens', () => {
      // gpt-4o-mini: input $0.15/1M, output $0.6/1M
      // 1000 input + 500 output = 0.00015 + 0.0003 = 0.00045
      const cost = calculateCost('gpt-4o-mini', 1000, 500);
      expect(cost).toBeCloseTo(0.00045, 10);
    });
  });

  describe('different models', () => {
    it('should calculate correct cost for gpt-4o', () => {
      // gpt-4o: input $2.5/1M, output $10.0/1M
      // 1000 input + 1000 output = 0.0025 + 0.01 = 0.0125
      const cost = calculateCost('gpt-4o', 1000, 1000);
      expect(cost).toBeCloseTo(0.0125, 10);
    });

    it('should calculate correct cost for gpt-4-turbo', () => {
      // gpt-4-turbo: input $10.0/1M, output $30.0/1M
      // 1000 input + 1000 output = 0.01 + 0.03 = 0.04
      const cost = calculateCost('gpt-4-turbo', 1000, 1000);
      expect(cost).toBeCloseTo(0.04, 10);
    });

    it('should calculate correct cost for gpt-3.5-turbo', () => {
      // gpt-3.5-turbo: input $0.5/1M, output $1.5/1M
      // 1000 input + 1000 output = 0.0005 + 0.0015 = 0.002
      const cost = calculateCost('gpt-3.5-turbo', 1000, 1000);
      expect(cost).toBeCloseTo(0.002, 10);
    });
  });

  describe('large token counts', () => {
    it('should calculate cost for 1 million tokens', () => {
      // gpt-4o-mini: 1M input = $0.15
      const cost = calculateCost('gpt-4o-mini', 1_000_000, 0);
      expect(cost).toBeCloseTo(0.15, 10);
    });

    it('should calculate cost for typical conversation (2000 input, 500 output)', () => {
      // gpt-4o-mini: 2000 input + 500 output
      // = (2000/1M * 0.15) + (500/1M * 0.6)
      // = 0.0003 + 0.0003 = 0.0006
      const cost = calculateCost('gpt-4o-mini', 2000, 500);
      expect(cost).toBeCloseTo(0.0006, 10);
    });

    it('should handle 10 million tokens', () => {
      // gpt-4o-mini: 10M input + 1M output
      // = (10M/1M * 0.15) + (1M/1M * 0.6)
      // = 1.5 + 0.6 = 2.1
      const cost = calculateCost('gpt-4o-mini', 10_000_000, 1_000_000);
      expect(cost).toBeCloseTo(2.1, 10);
    });
  });

  describe('unknown model fallback', () => {
    it('should fallback to gpt-4o-mini pricing for unknown model', () => {
      const unknownCost = calculateCost('unknown-model', 1000, 1000);
      const miniCost = calculateCost('gpt-4o-mini', 1000, 1000);
      expect(unknownCost).toBe(miniCost);
    });

    it('should fallback to gpt-4o-mini pricing for empty model', () => {
      const emptyCost = calculateCost('', 1000, 1000);
      const miniCost = calculateCost('gpt-4o-mini', 1000, 1000);
      expect(emptyCost).toBe(miniCost);
    });
  });

  describe('cost comparison between models', () => {
    it('gpt-4o-mini should be cheapest per 1K tokens', () => {
      const mini = calculateCost('gpt-4o-mini', 1000, 1000);
      const o = calculateCost('gpt-4o', 1000, 1000);
      const turbo = calculateCost('gpt-4-turbo', 1000, 1000);
      const threePointFive = calculateCost('gpt-3.5-turbo', 1000, 1000);

      expect(mini).toBeLessThan(o);
      expect(mini).toBeLessThan(turbo);
      expect(mini).toBeLessThan(threePointFive);
    });

    it('gpt-4-turbo should be most expensive per 1K tokens', () => {
      const mini = calculateCost('gpt-4o-mini', 1000, 1000);
      const o = calculateCost('gpt-4o', 1000, 1000);
      const turbo = calculateCost('gpt-4-turbo', 1000, 1000);
      const threePointFive = calculateCost('gpt-3.5-turbo', 1000, 1000);

      expect(turbo).toBeGreaterThan(o);
      expect(turbo).toBeGreaterThan(mini);
      expect(turbo).toBeGreaterThan(threePointFive);
    });
  });

  describe('edge cases', () => {
    it('should handle fractional token counts', () => {
      // While tokens are typically integers, the function should handle floats
      const cost = calculateCost('gpt-4o-mini', 500.5, 250.25);
      expect(cost).toBeGreaterThan(0);
    });

    it('should handle very small token counts', () => {
      const cost = calculateCost('gpt-4o-mini', 1, 1);
      expect(cost).toBeGreaterThan(0);
      expect(cost).toBeLessThan(0.0001);
    });

    it('should return consistent results for same inputs', () => {
      const cost1 = calculateCost('gpt-4o', 5000, 2000);
      const cost2 = calculateCost('gpt-4o', 5000, 2000);
      expect(cost1).toBe(cost2);
    });
  });

  describe('real-world usage scenarios', () => {
    it('should calculate monthly cost for moderate usage (100K conversations)', () => {
      // Assume average conversation: 1500 input, 300 output tokens
      // 100K conversations = 150M input + 30M output
      const totalInputTokens = 100_000 * 1500;
      const totalOutputTokens = 100_000 * 300;
      const monthlyCost = calculateCost('gpt-4o-mini', totalInputTokens, totalOutputTokens);

      // Expected: (150M/1M * 0.15) + (30M/1M * 0.6) = 22.5 + 18 = 40.5
      expect(monthlyCost).toBeCloseTo(40.5, 1);
    });

    it('should calculate cost for a single chat session (5 rounds)', () => {
      // Typical session: 5 user messages, 5 assistant responses
      // ~500 tokens per user message (including context), ~300 tokens per response
      const inputTokens = 5 * 500;
      const outputTokens = 5 * 300;
      const sessionCost = calculateCost('gpt-4o-mini', inputTokens, outputTokens);

      // Expected: (2500/1M * 0.15) + (1500/1M * 0.6) = 0.000375 + 0.0009 = 0.001275
      expect(sessionCost).toBeCloseTo(0.001275, 6);
    });
  });
});
