// OpenAI Client Configuration for Website
// Used for AI-powered onboarding

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
      baseURL: process.env.OPENAI_BASE_URL || undefined,
    });
  }
  return openaiClient;
}

// Model for onboarding chat (cost-efficient)
export const ONBOARDING_MODEL = 'gpt-4o-mini';

// Token limits for onboarding (keep conversations focused)
export const MAX_ONBOARDING_TOKENS = 2000;
