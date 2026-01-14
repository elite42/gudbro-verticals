import { describe, it, expect } from 'vitest';
import { buildSystemPrompt, QUICK_ACTIONS, type MerchantContext } from '../prompts';

// ============================================
// Test Fixtures
// ============================================

const createMockContext = (overrides: Partial<MerchantContext> = {}): MerchantContext => ({
  merchantId: 'test-merchant-123',
  merchantName: 'Test Restaurant',
  businessType: 'restaurant',
  preferredLanguage: 'it',
  communicationStyle: 'professional',
  timezone: 'Europe/Rome',
  canReadMenu: true,
  canReadOrders: true,
  canReadFeedback: true,
  canReadAnalytics: true,
  canReadEvents: true,
  canCreateEvents: false,
  canModifyMenu: false,
  ...overrides,
});

// ============================================
// buildSystemPrompt
// ============================================

describe('buildSystemPrompt', () => {
  describe('basic structure', () => {
    it('should include merchant name in prompt', () => {
      const context = createMockContext({ merchantName: 'Pizzeria Roma' });
      const prompt = buildSystemPrompt(context);
      expect(prompt).toContain('Pizzeria Roma');
    });

    it('should include role description', () => {
      const prompt = buildSystemPrompt(createMockContext());
      expect(prompt).toContain('AI Co-Manager');
      expect(prompt).toContain('GudBro platform');
    });

    it('should include language instructions', () => {
      const prompt = buildSystemPrompt(createMockContext());
      expect(prompt).toContain('ALWAYS respond in the SAME language');
      expect(prompt).toContain('Italian → You respond in Italian');
    });

    it('should include important guidelines', () => {
      const prompt = buildSystemPrompt(createMockContext());
      expect(prompt).toContain('Be concise but helpful');
      expect(prompt).toContain('confirm before taking actions');
    });

    it('should include timezone in date/time section', () => {
      const context = createMockContext({ timezone: 'Asia/Tokyo' });
      const prompt = buildSystemPrompt(context);
      expect(prompt).toContain('Asia/Tokyo');
    });

    it('should use UTC when no timezone provided', () => {
      const context = createMockContext({ timezone: undefined });
      const prompt = buildSystemPrompt(context);
      expect(prompt).toContain('UTC');
    });
  });

  describe('communication styles', () => {
    it('should include professional style instructions', () => {
      const context = createMockContext({ communicationStyle: 'professional' });
      const prompt = buildSystemPrompt(context);
      expect(prompt).toContain('formal and business-like');
      expect(prompt).toContain('professional terminology');
    });

    it('should include friendly style instructions', () => {
      const context = createMockContext({ communicationStyle: 'friendly' });
      const prompt = buildSystemPrompt(context);
      expect(prompt).toContain('warm and casual');
      expect(prompt).toContain('conversational tone');
    });

    it('should include concise style instructions', () => {
      const context = createMockContext({ communicationStyle: 'concise' });
      const prompt = buildSystemPrompt(context);
      expect(prompt).toContain('brief and to the point');
      expect(prompt).toContain('bullet points');
    });

    it('should include detailed style instructions', () => {
      const context = createMockContext({ communicationStyle: 'detailed' });
      const prompt = buildSystemPrompt(context);
      expect(prompt).toContain('thorough explanations');
      expect(prompt).toContain('comprehensive');
    });

    it('should have default style for unknown style', () => {
      const context = createMockContext({ communicationStyle: 'unknown' });
      const prompt = buildSystemPrompt(context);
      expect(prompt).toContain('helpful and clear');
    });
  });

  describe('permissions list', () => {
    it('should list menu permission when granted', () => {
      const context = createMockContext({ canReadMenu: true });
      const prompt = buildSystemPrompt(context);
      expect(prompt).toContain('Menu items and categories');
    });

    it('should list orders permission when granted', () => {
      const context = createMockContext({ canReadOrders: true });
      const prompt = buildSystemPrompt(context);
      expect(prompt).toContain('Order history and trends');
    });

    it('should list feedback permission when granted', () => {
      const context = createMockContext({ canReadFeedback: true });
      const prompt = buildSystemPrompt(context);
      expect(prompt).toContain('Customer feedback and reviews');
    });

    it('should list analytics permission when granted', () => {
      const context = createMockContext({ canReadAnalytics: true });
      const prompt = buildSystemPrompt(context);
      expect(prompt).toContain('Analytics and insights');
    });

    it('should list events permission when granted', () => {
      const context = createMockContext({ canReadEvents: true });
      const prompt = buildSystemPrompt(context);
      expect(prompt).toContain('Events and promotions');
    });

    it('should show basic chat message when no permissions', () => {
      const context = createMockContext({
        canReadMenu: false,
        canReadOrders: false,
        canReadFeedback: false,
        canReadAnalytics: false,
        canReadEvents: false,
      });
      const prompt = buildSystemPrompt(context);
      expect(prompt).toContain('Basic chat and content generation only');
    });

    it('should NOT include menu when permission denied', () => {
      const context = createMockContext({
        canReadMenu: false,
        canReadOrders: true,
      });
      const prompt = buildSystemPrompt(context);
      expect(prompt).not.toContain('Menu items and categories');
      expect(prompt).toContain('Order history and trends');
    });
  });

  describe('actions description', () => {
    it('should always include base actions', () => {
      const context = createMockContext({
        canCreateEvents: false,
        canModifyMenu: false,
      });
      const prompt = buildSystemPrompt(context);
      expect(prompt).toContain('Generate text content');
      expect(prompt).toContain('Translate content');
      expect(prompt).toContain('Answer questions about the business');
    });

    it('should include create events action when permitted', () => {
      const context = createMockContext({ canCreateEvents: true });
      const prompt = buildSystemPrompt(context);
      expect(prompt).toContain('Create new events');
    });

    it('should NOT include create events when not permitted', () => {
      const context = createMockContext({ canCreateEvents: false });
      const prompt = buildSystemPrompt(context);
      expect(prompt).not.toContain('Create new events');
    });

    it('should include modify menu action when permitted', () => {
      const context = createMockContext({ canModifyMenu: true });
      const prompt = buildSystemPrompt(context);
      expect(prompt).toContain('Update menu items');
    });

    it('should NOT include modify menu when not permitted', () => {
      const context = createMockContext({ canModifyMenu: false });
      const prompt = buildSystemPrompt(context);
      expect(prompt).not.toContain('Update menu items');
    });

    it('should include confirmation requirement for actions', () => {
      const context = createMockContext({
        canCreateEvents: true,
        canModifyMenu: true,
      });
      const prompt = buildSystemPrompt(context);
      expect(prompt).toContain('with your confirmation');
    });
  });

  describe('full permission combinations', () => {
    it('should handle all permissions granted', () => {
      const context = createMockContext({
        canReadMenu: true,
        canReadOrders: true,
        canReadFeedback: true,
        canReadAnalytics: true,
        canReadEvents: true,
        canCreateEvents: true,
        canModifyMenu: true,
      });
      const prompt = buildSystemPrompt(context);

      // Check all read permissions
      expect(prompt).toContain('Menu items and categories');
      expect(prompt).toContain('Order history and trends');
      expect(prompt).toContain('Customer feedback and reviews');
      expect(prompt).toContain('Analytics and insights');
      expect(prompt).toContain('Events and promotions');

      // Check all write permissions
      expect(prompt).toContain('Create new events');
      expect(prompt).toContain('Update menu items');
    });

    it('should handle all permissions denied', () => {
      const context = createMockContext({
        canReadMenu: false,
        canReadOrders: false,
        canReadFeedback: false,
        canReadAnalytics: false,
        canReadEvents: false,
        canCreateEvents: false,
        canModifyMenu: false,
      });
      const prompt = buildSystemPrompt(context);

      // Should have fallback message
      expect(prompt).toContain('Basic chat and content generation only');

      // Should NOT have any specific permissions
      expect(prompt).not.toContain('Menu items and categories');
      expect(prompt).not.toContain('Order history and trends');
      expect(prompt).not.toContain('Create new events');
      expect(prompt).not.toContain('Update menu items');
    });
  });
});

// ============================================
// QUICK_ACTIONS
// ============================================

describe('QUICK_ACTIONS', () => {
  describe('translate', () => {
    it('should include text to translate', () => {
      const result = QUICK_ACTIONS.translate('Ciao mondo', 'en');
      expect(result).toContain('Ciao mondo');
    });

    it('should include target language name (English)', () => {
      const result = QUICK_ACTIONS.translate('Hello', 'en');
      expect(result).toContain('English');
    });

    it('should include target language name (Italian)', () => {
      const result = QUICK_ACTIONS.translate('Hello', 'it');
      expect(result).toContain('Italian');
    });

    it('should include target language name (Vietnamese)', () => {
      const result = QUICK_ACTIONS.translate('Hello', 'vi');
      expect(result).toContain('Vietnamese');
    });

    it('should include target language name (Korean)', () => {
      const result = QUICK_ACTIONS.translate('Hello', 'ko');
      expect(result).toContain('Korean');
    });

    it('should include target language name (Japanese)', () => {
      const result = QUICK_ACTIONS.translate('Hello', 'ja');
      expect(result).toContain('Japanese');
    });

    it('should include target language name (Chinese)', () => {
      const result = QUICK_ACTIONS.translate('Hello', 'zh');
      expect(result).toContain('Chinese');
    });

    it('should include target language name (Spanish)', () => {
      const result = QUICK_ACTIONS.translate('Hello', 'es');
      expect(result).toContain('Spanish');
    });

    it('should include target language name (French)', () => {
      const result = QUICK_ACTIONS.translate('Hello', 'fr');
      expect(result).toContain('French');
    });

    it('should include target language name (German)', () => {
      const result = QUICK_ACTIONS.translate('Hello', 'de');
      expect(result).toContain('German');
    });

    it('should include target language name (Portuguese)', () => {
      const result = QUICK_ACTIONS.translate('Hello', 'pt');
      expect(result).toContain('Portuguese');
    });

    it('should fallback to English for unknown language code', () => {
      const result = QUICK_ACTIONS.translate('Hello', 'xx');
      expect(result).toContain('English');
    });

    it('should request only translation without explanations', () => {
      const result = QUICK_ACTIONS.translate('Test', 'it');
      expect(result).toContain('Only provide the translation');
      expect(result).toContain('no explanations');
    });
  });

  describe('generateDescription', () => {
    it('should include item name', () => {
      const result = QUICK_ACTIONS.generateDescription('Margherita Pizza', 'pizza');
      expect(result).toContain('Margherita Pizza');
    });

    it('should include category', () => {
      const result = QUICK_ACTIONS.generateDescription('Carbonara', 'pasta');
      expect(result).toContain('pasta');
    });

    it('should request appetizing description', () => {
      const result = QUICK_ACTIONS.generateDescription('Test', 'test');
      expect(result).toContain('appetizing');
    });

    it('should request short description (2-3 sentences)', () => {
      const result = QUICK_ACTIONS.generateDescription('Test', 'test');
      expect(result).toContain('2-3 sentences');
    });
  });

  describe('improveDescription', () => {
    it('should include current description', () => {
      const currentDesc = 'A simple pasta dish';
      const result = QUICK_ACTIONS.improveDescription(currentDesc);
      expect(result).toContain(currentDesc);
    });

    it('should request appetizing improvement', () => {
      const result = QUICK_ACTIONS.improveDescription('Basic description');
      expect(result).toContain('appetizing');
      expect(result).toContain('engaging');
    });

    it('should request concise output (2-3 sentences)', () => {
      const result = QUICK_ACTIONS.improveDescription('Basic description');
      expect(result).toContain('2-3 sentences');
    });
  });

  describe('generateEventDescription', () => {
    it('should include event type', () => {
      const result = QUICK_ACTIONS.generateEventDescription('happy hour', 'Drinks at 50% off');
      expect(result).toContain('happy hour');
    });

    it('should include event details', () => {
      const details = 'Every Friday from 5-7 PM';
      const result = QUICK_ACTIONS.generateEventDescription('special', details);
      expect(result).toContain(details);
    });

    it('should request exciting description', () => {
      const result = QUICK_ACTIONS.generateEventDescription('event', 'details');
      expect(result).toContain('exciting');
    });

    it('should request call to action', () => {
      const result = QUICK_ACTIONS.generateEventDescription('event', 'details');
      expect(result).toContain('call to action');
    });
  });

  describe('summarizeFeedback', () => {
    it('should include feedback list', () => {
      const feedbackList = '1. Great food\n2. Slow service\n3. Nice ambiance';
      const result = QUICK_ACTIONS.summarizeFeedback(feedbackList);
      expect(result).toContain(feedbackList);
    });

    it('should request key themes', () => {
      const result = QUICK_ACTIONS.summarizeFeedback('test feedback');
      expect(result).toContain('key themes');
    });

    it('should request actionable insights', () => {
      const result = QUICK_ACTIONS.summarizeFeedback('test feedback');
      expect(result).toContain('actionable insights');
    });
  });
});

// ============================================
// MerchantContext type validation
// ============================================

describe('MerchantContext', () => {
  it('should work with minimal required fields', () => {
    const minimalContext: MerchantContext = {
      merchantId: 'id',
      merchantName: 'Name',
      preferredLanguage: 'en',
      communicationStyle: 'professional',
      canReadMenu: false,
      canReadOrders: false,
      canReadFeedback: false,
      canReadAnalytics: false,
      canReadEvents: false,
      canCreateEvents: false,
      canModifyMenu: false,
    };

    const prompt = buildSystemPrompt(minimalContext);
    expect(prompt).toContain('Name');
  });

  it('should work with all optional fields', () => {
    const fullContext: MerchantContext = {
      merchantId: 'id',
      merchantName: 'Name',
      businessType: 'restaurant',
      preferredLanguage: 'it',
      communicationStyle: 'friendly',
      timezone: 'Europe/Rome',
      canReadMenu: true,
      canReadOrders: true,
      canReadFeedback: true,
      canReadAnalytics: true,
      canReadEvents: true,
      canCreateEvents: true,
      canModifyMenu: true,
    };

    const prompt = buildSystemPrompt(fullContext);
    expect(prompt).toContain('Name');
    expect(prompt).toContain('Europe/Rome');
  });
});
