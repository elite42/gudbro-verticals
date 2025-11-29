/**
 * Translation Engine
 * Provider-agnostic translation system for GUDBRO
 *
 * Usage:
 *
 * ```typescript
 * import { TranslationEngine } from '@gudbro/core/translation-engine';
 *
 * // Initialize with preferred provider
 * const engine = new TranslationEngine({
 *   provider: 'gpt-4o-mini',  // Cheapest good option
 *   apiKey: process.env.OPENAI_API_KEY,
 * });
 *
 * // Single translation
 * const result = await engine.translate({
 *   text: 'Espresso with oat milk',
 *   sourceLanguage: 'en',
 *   targetLanguages: ['vi', 'ko', 'zh'],
 *   context: 'menu_item',
 * });
 *
 * // Batch translation
 * const results = await engine.translateBatch({
 *   items: [
 *     { text: 'Cappuccino', ... },
 *     { text: 'Green Tea Latte', ... },
 *   ],
 *   priority: 'cost', // 'speed' | 'quality' | 'cost'
 * });
 * ```
 */

import {
  TranslationProvider,
  TranslationProviderInterface,
  TranslationRequest,
  TranslationResult,
  BatchTranslationRequest,
  BatchTranslationResult,
  LanguageCode,
  MultiLangText,
} from './types';

import { ClaudeTranslationProvider } from './providers/claude-provider';
import { OpenAITranslationProvider } from './providers/openai-provider';

export * from './types';
export { ClaudeTranslationProvider } from './providers/claude-provider';
export { OpenAITranslationProvider } from './providers/openai-provider';

interface TranslationEngineConfig {
  provider: TranslationProvider;
  apiKey: string;
  cacheEnabled?: boolean;
  cacheTTL?: number; // milliseconds
}

// Simple in-memory cache
interface CacheEntry {
  result: TranslationResult;
  timestamp: number;
}

export class TranslationEngine {
  private provider: TranslationProviderInterface;
  private cache: Map<string, CacheEntry> = new Map();
  private cacheEnabled: boolean;
  private cacheTTL: number;

  constructor(config: TranslationEngineConfig) {
    this.cacheEnabled = config.cacheEnabled ?? true;
    this.cacheTTL = config.cacheTTL ?? 24 * 60 * 60 * 1000; // 24 hours default

    // Initialize provider based on config
    this.provider = this.createProvider(config.provider, config.apiKey);
  }

  private createProvider(provider: TranslationProvider, apiKey: string): TranslationProviderInterface {
    switch (provider) {
      case 'claude-haiku':
        return new ClaudeTranslationProvider({
          apiKey,
          model: 'claude-3-haiku-20240307',
        });

      case 'claude-sonnet':
        return new ClaudeTranslationProvider({
          apiKey,
          model: 'claude-3-5-sonnet-20241022',
        });

      case 'gpt-4o-mini':
        return new OpenAITranslationProvider({
          apiKey,
          model: 'gpt-4o-mini',
        });

      case 'gpt-4o':
        return new OpenAITranslationProvider({
          apiKey,
          model: 'gpt-4o',
        });

      // TODO: Add more providers
      case 'deepl':
      case 'google':
      case 'local':
        throw new Error(`Provider ${provider} not yet implemented`);

      default:
        throw new Error(`Unknown provider: ${provider}`);
    }
  }

  /**
   * Translate text to multiple languages
   */
  async translate(request: TranslationRequest): Promise<TranslationResult> {
    // Check cache first
    const cacheKey = this.getCacheKey(request);
    if (this.cacheEnabled) {
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return { ...cached, cached: true };
      }
    }

    // Perform translation
    const result = await this.provider.translate(request);

    // Cache result
    if (this.cacheEnabled) {
      this.setCache(cacheKey, result);
    }

    return result;
  }

  /**
   * Translate multiple items in batch
   */
  async translateBatch(request: BatchTranslationRequest): Promise<BatchTranslationResult> {
    // For now, use sequential translation with caching
    // TODO: Optimize with provider-specific batch APIs
    const startTime = Date.now();
    const results: TranslationResult[] = [];
    let totalCost = 0;

    for (const item of request.items) {
      const result = await this.translate(item);
      results.push(result);
      totalCost += result.cost || 0;
    }

    return {
      results,
      totalCost,
      processingTime: Date.now() - startTime,
    };
  }

  /**
   * Translate a MultiLangText object to additional languages
   * Uses existing translations as source
   */
  async translateMultiLang(
    text: MultiLangText,
    targetLanguages: LanguageCode[],
    context: TranslationRequest['context'] = 'general'
  ): Promise<MultiLangText> {
    // Find best source language (prefer English)
    const sourceLanguage = this.findSourceLanguage(text);
    if (!sourceLanguage) {
      throw new Error('No source text found');
    }

    const sourceText = text[sourceLanguage]!;

    // Filter out languages we already have
    const missingLanguages = targetLanguages.filter(
      lang => !text[lang] || text[lang]!.trim() === ''
    );

    if (missingLanguages.length === 0) {
      return text; // All translations exist
    }

    // Translate missing languages
    const result = await this.translate({
      text: sourceText,
      sourceLanguage,
      targetLanguages: missingLanguages,
      context,
    });

    // Merge with existing translations
    return {
      ...text,
      ...result.translations,
    };
  }

  /**
   * Estimate cost for translation request
   */
  estimateCost(request: TranslationRequest): number {
    return this.provider.estimateCost(request);
  }

  /**
   * Check if provider is available
   */
  async isAvailable(): Promise<boolean> {
    return this.provider.isAvailable();
  }

  /**
   * Switch provider at runtime
   */
  switchProvider(provider: TranslationProvider, apiKey: string): void {
    this.provider = this.createProvider(provider, apiKey);
  }

  /**
   * Clear translation cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  // Cache helpers
  private getCacheKey(request: TranslationRequest): string {
    return JSON.stringify({
      text: request.text,
      source: request.sourceLanguage,
      targets: request.targetLanguages.sort(),
      context: request.context,
    });
  }

  private getFromCache(key: string): TranslationResult | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check if expired
    if (Date.now() - entry.timestamp > this.cacheTTL) {
      this.cache.delete(key);
      return null;
    }

    return entry.result;
  }

  private setCache(key: string, result: TranslationResult): void {
    this.cache.set(key, {
      result,
      timestamp: Date.now(),
    });
  }

  private findSourceLanguage(text: MultiLangText): LanguageCode | null {
    // Prefer English as source
    if (text.en && text.en.trim()) return 'en';

    // Fall back to any available language
    const available = Object.entries(text).find(
      ([_, value]) => value && value.trim()
    );

    return available ? (available[0] as LanguageCode) : null;
  }
}

// Default instance factory
export function createTranslationEngine(
  provider: TranslationProvider = 'gpt-4o-mini'
): TranslationEngine {
  const apiKey = provider.startsWith('claude')
    ? process.env.ANTHROPIC_API_KEY
    : process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(`API key not found for provider ${provider}`);
  }

  return new TranslationEngine({
    provider,
    apiKey,
  });
}
