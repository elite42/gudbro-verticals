/**
 * Claude Translation Provider
 * Uses Anthropic Claude API for high-quality translations
 *
 * Models:
 * - claude-haiku: Fast, cheap ($0.25/M input, $1.25/M output)
 * - claude-sonnet: Balanced ($3/M input, $15/M output)
 */

import { BaseTranslationProvider } from './base-provider';
import {
  TranslationProvider,
  TranslationRequest,
  TranslationResult,
  LanguageCode,
  SUPPORTED_LANGUAGES,
} from '../types';

interface ClaudeConfig {
  apiKey: string;
  model: 'claude-3-haiku-20240307' | 'claude-3-5-sonnet-20241022';
  maxTokens?: number;
}

export class ClaudeTranslationProvider extends BaseTranslationProvider {
  name: TranslationProvider;
  private config: ClaudeConfig;

  // Pricing per 1M tokens (USD)
  private static PRICING = {
    'claude-3-haiku-20240307': { input: 0.25, output: 1.25 },
    'claude-3-5-sonnet-20241022': { input: 3, output: 15 },
  };

  constructor(config: ClaudeConfig) {
    super();
    this.config = {
      maxTokens: 4096,
      ...config,
    };
    this.name = config.model.includes('haiku') ? 'claude-haiku' : 'claude-sonnet';
  }

  async translate(request: TranslationRequest): Promise<TranslationResult> {
    const { text, sourceLanguage, targetLanguages, context, preserveFormatting, glossary } = request;

    // Build the prompt
    const prompt = this.buildPrompt(text, sourceLanguage, targetLanguages, context, preserveFormatting, glossary);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.config.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.config.model,
          max_tokens: this.config.maxTokens,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.content[0].text;

      // Parse JSON response
      const translations = this.parseResponse(content, targetLanguages);

      // Calculate cost
      const inputTokens = data.usage?.input_tokens || this.estimateTokens(prompt);
      const outputTokens = data.usage?.output_tokens || this.estimateTokens(content);
      const cost = this.calculateCost(inputTokens, outputTokens);

      return {
        original: text,
        sourceLanguage,
        translations,
        provider: this.name,
        cached: false,
        cost,
      };
    } catch (error) {
      console.error('Claude translation error:', error);
      throw error;
    }
  }

  estimateCost(request: TranslationRequest): number {
    const inputTokens = this.estimateTokens(request.text) * 2; // Prompt overhead
    const outputTokens = this.estimateTokens(request.text) * request.targetLanguages.length;
    return this.calculateCost(inputTokens, outputTokens);
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.config.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.config.model,
          max_tokens: 10,
          messages: [{ role: 'user', content: 'Hi' }],
        }),
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  private buildPrompt(
    text: string,
    sourceLanguage: LanguageCode,
    targetLanguages: LanguageCode[],
    context: string,
    preserveFormatting?: boolean,
    glossary?: Record<string, string>
  ): string {
    const sourceLang = SUPPORTED_LANGUAGES.find(l => l.code === sourceLanguage);
    const targetLangs = targetLanguages.map(code =>
      SUPPORTED_LANGUAGES.find(l => l.code === code)
    );

    let prompt = `You are a professional translator. ${this.getContextPrompt(context as any)}

Translate the following text from ${sourceLang?.name || sourceLanguage} to these languages:
${targetLangs.map(l => `- ${l?.name || 'Unknown'} (${l?.code})`).join('\n')}

`;

    if (preserveFormatting) {
      prompt += `IMPORTANT: Preserve all formatting (HTML, markdown, line breaks, etc.)\n\n`;
    }

    if (glossary && Object.keys(glossary).length > 0) {
      prompt += `Use these specific translations for terms:\n`;
      for (const [term, translation] of Object.entries(glossary)) {
        prompt += `- "${term}" → "${translation}"\n`;
      }
      prompt += '\n';
    }

    prompt += `Text to translate:
"""
${text}
"""

Respond ONLY with a JSON object in this exact format (no markdown, no explanation):
{
${targetLanguages.map(code => `  "${code}": "translated text here"`).join(',\n')}
}`;

    return prompt;
  }

  private parseResponse(content: string, targetLanguages: LanguageCode[]): Record<LanguageCode, string> {
    // Try to extract JSON from response
    let jsonStr = content.trim();

    // Remove markdown code blocks if present
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/```json?\n?/g, '').replace(/```$/g, '').trim();
    }

    try {
      const parsed = JSON.parse(jsonStr);
      const result: Record<LanguageCode, string> = {} as any;

      for (const lang of targetLanguages) {
        if (parsed[lang]) {
          result[lang] = parsed[lang];
        }
      }

      return result;
    } catch (error) {
      console.error('Failed to parse Claude response:', content);
      throw new Error('Failed to parse translation response');
    }
  }

  private calculateCost(inputTokens: number, outputTokens: number): number {
    const pricing = ClaudeTranslationProvider.PRICING[this.config.model];
    const inputCost = (inputTokens / 1_000_000) * pricing.input;
    const outputCost = (outputTokens / 1_000_000) * pricing.output;
    return inputCost + outputCost;
  }
}
