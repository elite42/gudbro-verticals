// OpenAI Client Configuration
// Supports both OpenAI and compatible APIs (Anthropic via OpenAI format)

import OpenAI from 'openai';

// Lazy initialization to avoid errors when env vars are missing
let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }

    openaiClient = new OpenAI({
      apiKey,
      // Optional: Custom base URL for compatible APIs
      baseURL: process.env.OPENAI_BASE_URL || undefined,
    });
  }
  return openaiClient;
}

// Model pricing (per 1M tokens) - Updated Jan 2025
export const MODEL_PRICING: Record<string, { input: number; output: number }> = {
  'gpt-4o-mini': { input: 0.15, output: 0.6 },
  'gpt-4o': { input: 2.5, output: 10.0 },
  'gpt-4-turbo': { input: 10.0, output: 30.0 },
  'gpt-3.5-turbo': { input: 0.5, output: 1.5 },
};

// Calculate cost from token usage
export function calculateCost(model: string, inputTokens: number, outputTokens: number): number {
  const pricing = MODEL_PRICING[model] || MODEL_PRICING['gpt-4o-mini'];
  const inputCost = (inputTokens / 1_000_000) * pricing.input;
  const outputCost = (outputTokens / 1_000_000) * pricing.output;
  return inputCost + outputCost;
}

// Default model for the Co-Manager
export const DEFAULT_MODEL = 'gpt-4o-mini';

// Token limits per model
export const MODEL_LIMITS: Record<string, number> = {
  'gpt-4o-mini': 128000,
  'gpt-4o': 128000,
  'gpt-4-turbo': 128000,
  'gpt-3.5-turbo': 16385,
};
