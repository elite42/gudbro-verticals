/**
 * Base Translation Provider
 * Abstract class that all providers extend
 */

import {
  TranslationProvider,
  TranslationProviderInterface,
  TranslationRequest,
  TranslationResult,
  BatchTranslationRequest,
  BatchTranslationResult,
  TranslationContext,
  LanguageCode,
} from '../types';

export abstract class BaseTranslationProvider implements TranslationProviderInterface {
  abstract name: TranslationProvider;

  abstract translate(request: TranslationRequest): Promise<TranslationResult>;

  abstract estimateCost(request: TranslationRequest): number;

  abstract isAvailable(): Promise<boolean>;

  // Default batch implementation - can be overridden for efficiency
  async translateBatch(request: BatchTranslationRequest): Promise<BatchTranslationResult> {
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

  // Helper: Build context prompt for AI providers
  protected getContextPrompt(context: TranslationContext): string {
    const contextPrompts: Record<TranslationContext, string> = {
      menu_item: 'This is a food or drink menu item name. Keep it appetizing and culturally appropriate.',
      menu_description: 'This is a food description. Maintain sensory appeal and ingredient accuracy.',
      hotel_service: 'This is a hotel service description. Keep it professional and clear.',
      hotel_amenity: 'This is a room amenity description. Be concise and informative.',
      attraction: 'This is a tourist attraction description. Keep it engaging and informative.',
      transport: 'This is transportation information. Be precise about details.',
      price_list: 'This is a price list item. Preserve numbers and currency formatting.',
      instruction: 'This is an instruction or how-to. Keep it clear and actionable.',
      legal: 'This is legal text. Maintain formal tone and accuracy.',
      marketing: 'This is marketing content. Keep it persuasive but culturally appropriate.',
      ui_label: 'This is a UI label or button. Keep it short and clear.',
      general: 'Translate accurately while maintaining natural language flow.',
    };

    return contextPrompts[context] || contextPrompts.general;
  }

  // Helper: Estimate word count for pricing
  protected countWords(text: string): number {
    return text.split(/\s+/).filter(word => word.length > 0).length;
  }

  // Helper: Estimate token count (rough approximation)
  protected estimateTokens(text: string): number {
    // Rough estimate: 1 token ≈ 4 characters for English
    // Asian languages may have different ratios
    return Math.ceil(text.length / 4);
  }
}
