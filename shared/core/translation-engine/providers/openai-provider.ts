/**
 * OpenAI Translation Provider
 * Uses GPT models for translations
 *
 * Models:
 * - gpt-4o-mini: Very cheap ($0.15/M input, $0.60/M output) - RECOMMENDED
 * - gpt-4o: High quality ($5/M input, $15/M output)
 */

import { BaseTranslationProvider } from './base-provider';
import {
  TranslationProvider,
  TranslationRequest,
  TranslationResult,
  LanguageCode,
  SUPPORTED_LANGUAGES,
} from '../types';

interface OpenAIConfig {
  apiKey: string;
  model: 'gpt-4o-mini' | 'gpt-4o';
  maxTokens?: number;
}

export class OpenAITranslationProvider extends BaseTranslationProvider {
  name: TranslationProvider;
  private config: OpenAIConfig;

  // Pricing per 1M tokens (USD)
  private static PRICING = {
    'gpt-4o-mini': { input: 0.15, output: 0.60 },
    'gpt-4o': { input: 5, output: 15 },
  };

  constructor(config: OpenAIConfig) {
    super();
    this.config = {
      maxTokens: 4096,
      ...config,
    };
    this.name = config.model === 'gpt-4o-mini' ? 'gpt-4o-mini' : 'gpt-4o';
  }

  async translate(request: TranslationRequest): Promise<TranslationResult> {
    const { text, sourceLanguage, targetLanguages, context, preserveFormatting, glossary } = request;

    const systemPrompt = this.buildSystemPrompt(context, preserveFormatting, glossary);
    const userPrompt = this.buildUserPrompt(text, sourceLanguage, targetLanguages);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config.model,
          max_tokens: this.config.maxTokens,
          temperature: 0.3,
          response_format: { type: 'json_object' },
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      // Parse JSON response
      const translations = this.parseResponse(content, targetLanguages);

      // Calculate cost
      const inputTokens = data.usage?.prompt_tokens || this.estimateTokens(systemPrompt + userPrompt);
      const outputTokens = data.usage?.completion_tokens || this.estimateTokens(content);
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
      console.error('OpenAI translation error:', error);
      throw error;
    }
  }

  estimateCost(request: TranslationRequest): number {
    const inputTokens = this.estimateTokens(request.text) * 2;
    const outputTokens = this.estimateTokens(request.text) * request.targetLanguages.length;
    return this.calculateCost(inputTokens, outputTokens);
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  private buildSystemPrompt(
    context: string,
    preserveFormatting?: boolean,
    glossary?: Record<string, string>
  ): string {
    let prompt = `You are a professional translator. ${this.getContextPrompt(context as any)}

Your task is to translate text accurately while maintaining natural language flow in each target language.`;

    if (preserveFormatting) {
      prompt += `\n\nIMPORTANT: Preserve all formatting (HTML, markdown, line breaks, etc.)`;
    }

    if (glossary && Object.keys(glossary).length > 0) {
      prompt += `\n\nUse these specific translations for terms:`;
      for (const [term, translation] of Object.entries(glossary)) {
        prompt += `\n- "${term}" → "${translation}"`;
      }
    }

    prompt += `\n\nAlways respond with a valid JSON object containing the translations.`;

    return prompt;
  }

  private buildUserPrompt(
    text: string,
    sourceLanguage: LanguageCode,
    targetLanguages: LanguageCode[]
  ): string {
    const sourceLang = SUPPORTED_LANGUAGES.find(l => l.code === sourceLanguage);
    const targetLangs = targetLanguages.map(code =>
      SUPPORTED_LANGUAGES.find(l => l.code === code)
    );

    return `Translate from ${sourceLang?.name || sourceLanguage} to:
${targetLangs.map(l => `- ${l?.name} (${l?.code})`).join('\n')}

Text:
"""
${text}
"""

Respond with JSON:
{
${targetLanguages.map(code => `  "${code}": "translated text"`).join(',\n')}
}`;
  }

  private parseResponse(content: string, targetLanguages: LanguageCode[]): Record<LanguageCode, string> {
    try {
      const parsed = JSON.parse(content);
      const result: Record<LanguageCode, string> = {} as any;

      for (const lang of targetLanguages) {
        if (parsed[lang]) {
          result[lang] = parsed[lang];
        }
      }

      return result;
    } catch (error) {
      console.error('Failed to parse OpenAI response:', content);
      throw new Error('Failed to parse translation response');
    }
  }

  private calculateCost(inputTokens: number, outputTokens: number): number {
    const pricing = OpenAITranslationProvider.PRICING[this.config.model];
    const inputCost = (inputTokens / 1_000_000) * pricing.input;
    const outputCost = (outputTokens / 1_000_000) * pricing.output;
    return inputCost + outputCost;
  }
}
