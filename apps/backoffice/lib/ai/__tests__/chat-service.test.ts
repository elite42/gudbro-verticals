import { describe, it, expect, vi } from 'vitest';

// Mock dependencies before importing
vi.mock('../openai', () => ({
  getOpenAIClient: vi.fn(),
  DEFAULT_MODEL: 'gpt-4o-mini',
  calculateCost: vi.fn((model: string, input: number, output: number) => {
    return (input / 1_000_000) * 0.15 + (output / 1_000_000) * 0.6;
  }),
}));

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue({ data: [], error: null }),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
    })),
    rpc: vi.fn().mockResolvedValue({ data: null, error: null }),
  },
}));

vi.mock('./prompts', () => ({
  buildSystemPrompt: vi.fn(() => 'System prompt'),
  MerchantContext: {},
}));

vi.mock('./knowledge-service', () => ({
  fetchMerchantKnowledge: vi.fn().mockResolvedValue({}),
  formatKnowledgeForAI: vi.fn(() => 'Knowledge context'),
}));

vi.mock('./actions-service', () => ({
  AI_TOOLS: [],
  executeAction: vi.fn(),
  logActionExecution: vi.fn(),
}));

vi.mock('./onboarding-service', () => ({
  checkOnboardingStatus: vi.fn().mockResolvedValue({
    isComplete: true,
    completionPercentage: 100,
    missingFields: [],
  }),
  buildOnboardingPrompt: vi.fn(() => ''),
  ONBOARDING_TOOLS: [],
  updateOrganization: vi.fn(),
  updateBrand: vi.fn(),
  updateLocation: vi.fn(),
}));

// ============================================
// ChatMessage Type Tests
// ============================================

describe('ChatMessage type', () => {
  interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
  }

  it('should support user role', () => {
    const message: ChatMessage = {
      role: 'user',
      content: 'Hello',
    };
    expect(message.role).toBe('user');
  });

  it('should support assistant role', () => {
    const message: ChatMessage = {
      role: 'assistant',
      content: 'Hi there!',
    };
    expect(message.role).toBe('assistant');
  });

  it('should support system role', () => {
    const message: ChatMessage = {
      role: 'system',
      content: 'You are a helpful assistant',
    };
    expect(message.role).toBe('system');
  });

  it('should have required content field', () => {
    const message: ChatMessage = {
      role: 'user',
      content: 'What is the weather?',
    };
    expect(message.content).toBeDefined();
    expect(typeof message.content).toBe('string');
  });

  it('should allow empty content', () => {
    const message: ChatMessage = {
      role: 'assistant',
      content: '',
    };
    expect(message.content).toBe('');
  });

  it('should allow long content', () => {
    const longContent = 'A'.repeat(10000);
    const message: ChatMessage = {
      role: 'user',
      content: longContent,
    };
    expect(message.content.length).toBe(10000);
  });
});

// ============================================
// ChatRequest Type Tests
// ============================================

describe('ChatRequest type', () => {
  interface ChatRequest {
    merchantId: string;
    accountId: string;
    sessionId: string;
    message: string;
    locationId?: string;
    conversationHistory?: Array<{ role: string; content: string }>;
  }

  it('should have required fields', () => {
    const request: ChatRequest = {
      merchantId: 'merchant-123',
      accountId: 'account-456',
      sessionId: 'session-789',
      message: 'Hello',
    };
    expect(request.merchantId).toBeDefined();
    expect(request.accountId).toBeDefined();
    expect(request.sessionId).toBeDefined();
    expect(request.message).toBeDefined();
  });

  it('should allow optional locationId', () => {
    const request: ChatRequest = {
      merchantId: 'merchant-123',
      accountId: 'account-456',
      sessionId: 'session-789',
      message: 'Hello',
      locationId: 'location-abc',
    };
    expect(request.locationId).toBe('location-abc');
  });

  it('should allow optional conversationHistory', () => {
    const request: ChatRequest = {
      merchantId: 'merchant-123',
      accountId: 'account-456',
      sessionId: 'session-789',
      message: 'Hello',
      conversationHistory: [
        { role: 'user', content: 'Previous message' },
        { role: 'assistant', content: 'Previous response' },
      ],
    };
    expect(request.conversationHistory).toHaveLength(2);
  });

  it('should work without optional fields', () => {
    const request: ChatRequest = {
      merchantId: 'm1',
      accountId: 'a1',
      sessionId: 's1',
      message: 'test',
    };
    expect(request.locationId).toBeUndefined();
    expect(request.conversationHistory).toBeUndefined();
  });
});

// ============================================
// ChatResponse Type Tests
// ============================================

describe('ChatResponse type', () => {
  interface ActionResult {
    success: boolean;
    action: string;
    message: string;
    data?: unknown;
  }

  interface OnboardingStatus {
    isComplete: boolean;
    completionPercentage: number;
    missingFields: string[];
  }

  interface ChatResponse {
    message: string;
    sessionId: string;
    inputTokens: number;
    outputTokens: number;
    model: string;
    latencyMs: number;
    actions?: ActionResult[];
    onboardingStatus?: OnboardingStatus;
  }

  it('should have required response fields', () => {
    const response: ChatResponse = {
      message: 'Hello!',
      sessionId: 'session-123',
      inputTokens: 100,
      outputTokens: 50,
      model: 'gpt-4o-mini',
      latencyMs: 500,
    };
    expect(response.message).toBeDefined();
    expect(response.sessionId).toBeDefined();
    expect(response.inputTokens).toBeGreaterThanOrEqual(0);
    expect(response.outputTokens).toBeGreaterThanOrEqual(0);
    expect(response.model).toBeDefined();
    expect(response.latencyMs).toBeGreaterThanOrEqual(0);
  });

  it('should allow optional actions', () => {
    const response: ChatResponse = {
      message: 'Event created',
      sessionId: 'session-123',
      inputTokens: 100,
      outputTokens: 50,
      model: 'gpt-4o-mini',
      latencyMs: 800,
      actions: [
        {
          success: true,
          action: 'create_event',
          message: 'Event created successfully',
        },
      ],
    };
    expect(response.actions).toHaveLength(1);
    expect(response.actions![0].success).toBe(true);
  });

  it('should allow optional onboardingStatus', () => {
    const response: ChatResponse = {
      message: 'Please complete setup',
      sessionId: 'session-123',
      inputTokens: 100,
      outputTokens: 50,
      model: 'gpt-4o-mini',
      latencyMs: 300,
      onboardingStatus: {
        isComplete: false,
        completionPercentage: 60,
        missingFields: ['phone', 'address'],
      },
    };
    expect(response.onboardingStatus).toBeDefined();
    expect(response.onboardingStatus!.isComplete).toBe(false);
    expect(response.onboardingStatus!.completionPercentage).toBe(60);
  });
});

// ============================================
// Request Validation Tests
// ============================================

describe('Chat Request Validation', () => {
  const validateChatRequest = (request: {
    merchantId?: string;
    accountId?: string;
    sessionId?: string;
    message?: string;
  }): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!request.merchantId?.trim()) {
      errors.push('merchantId is required');
    }
    if (!request.accountId?.trim()) {
      errors.push('accountId is required');
    }
    if (!request.sessionId?.trim()) {
      errors.push('sessionId is required');
    }
    if (!request.message?.trim()) {
      errors.push('message is required');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  };

  describe('merchantId validation', () => {
    it('should fail when merchantId is missing', () => {
      const result = validateChatRequest({
        accountId: 'a1',
        sessionId: 's1',
        message: 'hello',
      });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('merchantId is required');
    });

    it('should fail when merchantId is empty', () => {
      const result = validateChatRequest({
        merchantId: '',
        accountId: 'a1',
        sessionId: 's1',
        message: 'hello',
      });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('merchantId is required');
    });

    it('should fail when merchantId is whitespace', () => {
      const result = validateChatRequest({
        merchantId: '   ',
        accountId: 'a1',
        sessionId: 's1',
        message: 'hello',
      });
      expect(result.valid).toBe(false);
    });
  });

  describe('accountId validation', () => {
    it('should fail when accountId is missing', () => {
      const result = validateChatRequest({
        merchantId: 'm1',
        sessionId: 's1',
        message: 'hello',
      });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('accountId is required');
    });
  });

  describe('sessionId validation', () => {
    it('should fail when sessionId is missing', () => {
      const result = validateChatRequest({
        merchantId: 'm1',
        accountId: 'a1',
        message: 'hello',
      });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('sessionId is required');
    });
  });

  describe('message validation', () => {
    it('should fail when message is missing', () => {
      const result = validateChatRequest({
        merchantId: 'm1',
        accountId: 'a1',
        sessionId: 's1',
      });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('message is required');
    });

    it('should fail when message is empty', () => {
      const result = validateChatRequest({
        merchantId: 'm1',
        accountId: 'a1',
        sessionId: 's1',
        message: '',
      });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('message is required');
    });
  });

  describe('valid request', () => {
    it('should pass with all required fields', () => {
      const result = validateChatRequest({
        merchantId: 'm1',
        accountId: 'a1',
        sessionId: 's1',
        message: 'Hello',
      });
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('multiple errors', () => {
    it('should collect all validation errors', () => {
      const result = validateChatRequest({});
      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(4);
    });
  });
});

// ============================================
// Conversation History Tests
// ============================================

describe('Conversation History', () => {
  interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
  }

  const formatConversationHistory = (
    messages: Array<{ role: string; content: string }>
  ): ChatMessage[] => {
    return messages.map((msg) => ({
      role: msg.role as 'user' | 'assistant' | 'system',
      content: msg.content,
    }));
  };

  const buildMessagesArray = (
    systemPrompt: string,
    history: ChatMessage[],
    userMessage: string
  ): ChatMessage[] => {
    return [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: userMessage },
    ];
  };

  describe('formatConversationHistory', () => {
    it('should format empty history', () => {
      const result = formatConversationHistory([]);
      expect(result).toEqual([]);
    });

    it('should format single message', () => {
      const result = formatConversationHistory([{ role: 'user', content: 'Hello' }]);
      expect(result).toHaveLength(1);
      expect(result[0].role).toBe('user');
    });

    it('should format multiple messages', () => {
      const result = formatConversationHistory([
        { role: 'user', content: 'Hello' },
        { role: 'assistant', content: 'Hi!' },
        { role: 'user', content: 'How are you?' },
      ]);
      expect(result).toHaveLength(3);
    });

    it('should preserve message order', () => {
      const input = [
        { role: 'user', content: 'First' },
        { role: 'assistant', content: 'Second' },
        { role: 'user', content: 'Third' },
      ];
      const result = formatConversationHistory(input);
      expect(result[0].content).toBe('First');
      expect(result[1].content).toBe('Second');
      expect(result[2].content).toBe('Third');
    });
  });

  describe('buildMessagesArray', () => {
    it('should put system prompt first', () => {
      const messages = buildMessagesArray('System prompt', [], 'Hello');
      expect(messages[0].role).toBe('system');
      expect(messages[0].content).toBe('System prompt');
    });

    it('should put user message last', () => {
      const messages = buildMessagesArray('System', [], 'User msg');
      expect(messages[messages.length - 1].role).toBe('user');
      expect(messages[messages.length - 1].content).toBe('User msg');
    });

    it('should include history in middle', () => {
      const history: ChatMessage[] = [
        { role: 'user', content: 'Prev user' },
        { role: 'assistant', content: 'Prev assistant' },
      ];
      const messages = buildMessagesArray('System', history, 'New msg');
      expect(messages).toHaveLength(4);
      expect(messages[1].content).toBe('Prev user');
      expect(messages[2].content).toBe('Prev assistant');
    });

    it('should handle empty history', () => {
      const messages = buildMessagesArray('System', [], 'Hello');
      expect(messages).toHaveLength(2);
    });
  });
});

// ============================================
// Session Management Tests
// ============================================

describe('Session Management', () => {
  const generateSessionId = (): string => {
    return crypto.randomUUID();
  };

  const createSessionTitle = (title?: string): string => {
    return title || 'New Conversation';
  };

  const getSessionStatus = (session: {
    status: string;
    archived_at?: string | null;
  }): 'active' | 'archived' => {
    if (session.status === 'archived' || session.archived_at) {
      return 'archived';
    }
    return 'active';
  };

  describe('generateSessionId', () => {
    it('should generate valid UUID format', () => {
      const sessionId = generateSessionId();
      expect(sessionId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    });

    it('should generate unique IDs', () => {
      const id1 = generateSessionId();
      const id2 = generateSessionId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('createSessionTitle', () => {
    it('should use provided title', () => {
      const title = createSessionTitle('My Chat');
      expect(title).toBe('My Chat');
    });

    it('should default to "New Conversation"', () => {
      const title = createSessionTitle();
      expect(title).toBe('New Conversation');
    });

    it('should default when undefined', () => {
      const title = createSessionTitle(undefined);
      expect(title).toBe('New Conversation');
    });
  });

  describe('getSessionStatus', () => {
    it('should return active for active session', () => {
      const status = getSessionStatus({ status: 'active' });
      expect(status).toBe('active');
    });

    it('should return archived for archived status', () => {
      const status = getSessionStatus({ status: 'archived' });
      expect(status).toBe('archived');
    });

    it('should return archived when archived_at is set', () => {
      const status = getSessionStatus({
        status: 'active',
        archived_at: '2026-01-14T10:00:00Z',
      });
      expect(status).toBe('archived');
    });

    it('should return active when archived_at is null', () => {
      const status = getSessionStatus({
        status: 'active',
        archived_at: null,
      });
      expect(status).toBe('active');
    });
  });
});

// ============================================
// Onboarding Action Routing Tests
// ============================================

describe('Onboarding Action Routing', () => {
  const ONBOARDING_FUNCTION_NAMES = [
    'update_organization_info',
    'update_brand_info',
    'update_location_info',
    'check_onboarding_progress',
  ];

  const isOnboardingAction = (functionName: string): boolean => {
    return ONBOARDING_FUNCTION_NAMES.includes(functionName);
  };

  it('should identify update_organization_info as onboarding', () => {
    expect(isOnboardingAction('update_organization_info')).toBe(true);
  });

  it('should identify update_brand_info as onboarding', () => {
    expect(isOnboardingAction('update_brand_info')).toBe(true);
  });

  it('should identify update_location_info as onboarding', () => {
    expect(isOnboardingAction('update_location_info')).toBe(true);
  });

  it('should identify check_onboarding_progress as onboarding', () => {
    expect(isOnboardingAction('check_onboarding_progress')).toBe(true);
  });

  it('should not identify create_event as onboarding', () => {
    expect(isOnboardingAction('create_event')).toBe(false);
  });

  it('should not identify translate_menu as onboarding', () => {
    expect(isOnboardingAction('translate_menu')).toBe(false);
  });

  it('should not identify update_menu_item as onboarding', () => {
    expect(isOnboardingAction('update_menu_item')).toBe(false);
  });

  it('should not identify get_analytics as onboarding', () => {
    expect(isOnboardingAction('get_analytics')).toBe(false);
  });
});

// ============================================
// Tool Selection Tests
// ============================================

describe('Tool Selection', () => {
  const AI_TOOLS = [{ name: 'create_event' }, { name: 'translate_menu' }];
  const ONBOARDING_TOOLS = [{ name: 'update_organization_info' }];

  const selectTools = (isOnboardingComplete: boolean): Array<{ name: string }> => {
    return isOnboardingComplete ? AI_TOOLS : [...AI_TOOLS, ...ONBOARDING_TOOLS];
  };

  it('should return only AI_TOOLS when onboarding complete', () => {
    const tools = selectTools(true);
    expect(tools).toEqual(AI_TOOLS);
    expect(tools).toHaveLength(2);
  });

  it('should include ONBOARDING_TOOLS when onboarding incomplete', () => {
    const tools = selectTools(false);
    expect(tools).toHaveLength(3);
    expect(tools).toContainEqual({ name: 'update_organization_info' });
  });

  it('should not modify original arrays', () => {
    const originalAIToolsLength = AI_TOOLS.length;
    const originalOnboardingToolsLength = ONBOARDING_TOOLS.length;

    selectTools(false);

    expect(AI_TOOLS).toHaveLength(originalAIToolsLength);
    expect(ONBOARDING_TOOLS).toHaveLength(originalOnboardingToolsLength);
  });
});

// ============================================
// Action Result Processing Tests
// ============================================

describe('Action Result Processing', () => {
  interface ActionResult {
    success: boolean;
    action: string;
    message: string;
    data?: unknown;
  }

  const formatActionResults = (results: ActionResult[]): string => {
    return results.map((a) => `[${a.action}]: ${a.message}`).join('\n');
  };

  const hasSuccessfulActions = (results: ActionResult[]): boolean => {
    return results.some((r) => r.success);
  };

  const hasFailedActions = (results: ActionResult[]): boolean => {
    return results.some((r) => !r.success);
  };

  describe('formatActionResults', () => {
    it('should format empty results', () => {
      const result = formatActionResults([]);
      expect(result).toBe('');
    });

    it('should format single result', () => {
      const result = formatActionResults([
        { success: true, action: 'create_event', message: 'Event created' },
      ]);
      expect(result).toBe('[create_event]: Event created');
    });

    it('should format multiple results with newlines', () => {
      const result = formatActionResults([
        { success: true, action: 'action1', message: 'Done 1' },
        { success: false, action: 'action2', message: 'Failed' },
      ]);
      expect(result).toBe('[action1]: Done 1\n[action2]: Failed');
    });
  });

  describe('hasSuccessfulActions', () => {
    it('should return false for empty array', () => {
      expect(hasSuccessfulActions([])).toBe(false);
    });

    it('should return true when all succeed', () => {
      const results: ActionResult[] = [
        { success: true, action: 'a1', message: 'm1' },
        { success: true, action: 'a2', message: 'm2' },
      ];
      expect(hasSuccessfulActions(results)).toBe(true);
    });

    it('should return true when some succeed', () => {
      const results: ActionResult[] = [
        { success: true, action: 'a1', message: 'm1' },
        { success: false, action: 'a2', message: 'm2' },
      ];
      expect(hasSuccessfulActions(results)).toBe(true);
    });

    it('should return false when all fail', () => {
      const results: ActionResult[] = [
        { success: false, action: 'a1', message: 'm1' },
        { success: false, action: 'a2', message: 'm2' },
      ];
      expect(hasSuccessfulActions(results)).toBe(false);
    });
  });

  describe('hasFailedActions', () => {
    it('should return false for empty array', () => {
      expect(hasFailedActions([])).toBe(false);
    });

    it('should return true when some fail', () => {
      const results: ActionResult[] = [
        { success: true, action: 'a1', message: 'm1' },
        { success: false, action: 'a2', message: 'm2' },
      ];
      expect(hasFailedActions(results)).toBe(true);
    });

    it('should return false when all succeed', () => {
      const results: ActionResult[] = [
        { success: true, action: 'a1', message: 'm1' },
        { success: true, action: 'a2', message: 'm2' },
      ];
      expect(hasFailedActions(results)).toBe(false);
    });
  });
});

// ============================================
// Usage Logging Tests
// ============================================

describe('Usage Logging', () => {
  const truncateSummary = (text: string, maxLength: number = 200): string => {
    return text.slice(0, maxLength);
  };

  const calculateEstimatedCost = (inputTokens: number, outputTokens: number): number => {
    // gpt-4o-mini pricing: $0.15/1M input, $0.6/1M output
    return (inputTokens / 1_000_000) * 0.15 + (outputTokens / 1_000_000) * 0.6;
  };

  describe('truncateSummary', () => {
    it('should not truncate short text', () => {
      const result = truncateSummary('Hello world');
      expect(result).toBe('Hello world');
    });

    it('should truncate long text to 200 chars', () => {
      const longText = 'A'.repeat(300);
      const result = truncateSummary(longText);
      expect(result.length).toBe(200);
    });

    it('should truncate to custom length', () => {
      const text = 'Hello world';
      const result = truncateSummary(text, 5);
      expect(result).toBe('Hello');
    });

    it('should handle empty string', () => {
      const result = truncateSummary('');
      expect(result).toBe('');
    });
  });

  describe('calculateEstimatedCost', () => {
    it('should calculate cost for typical chat', () => {
      // 1000 input, 500 output
      const cost = calculateEstimatedCost(1000, 500);
      // 0.00015 + 0.0003 = 0.00045
      expect(cost).toBeCloseTo(0.00045, 6);
    });

    it('should return 0 for 0 tokens', () => {
      const cost = calculateEstimatedCost(0, 0);
      expect(cost).toBe(0);
    });

    it('should handle large token counts', () => {
      const cost = calculateEstimatedCost(100000, 50000);
      // 0.015 + 0.03 = 0.045
      expect(cost).toBeCloseTo(0.045, 4);
    });

    it('should handle only input tokens', () => {
      const cost = calculateEstimatedCost(10000, 0);
      expect(cost).toBeCloseTo(0.0015, 5);
    });

    it('should handle only output tokens', () => {
      const cost = calculateEstimatedCost(0, 10000);
      expect(cost).toBeCloseTo(0.006, 5);
    });
  });
});

// ============================================
// Merchant Preferences Defaults Tests
// ============================================

describe('Merchant Preferences Defaults', () => {
  const DEFAULT_PREFERENCES = {
    communication_style: 'professional',
    preferred_language: 'en',
    can_read_menu: true,
    can_read_orders: true,
    can_read_feedback: true,
    can_read_analytics: true,
    can_read_events: true,
    can_create_events: false,
    can_modify_menu: false,
    include_last_n_days_data: 30,
  };

  const getPreferenceWithDefault = <T>(value: T | undefined | null, defaultValue: T): T => {
    return value ?? defaultValue;
  };

  describe('default values', () => {
    it('should have professional communication style', () => {
      expect(DEFAULT_PREFERENCES.communication_style).toBe('professional');
    });

    it('should have English as default language', () => {
      expect(DEFAULT_PREFERENCES.preferred_language).toBe('en');
    });

    it('should enable read permissions by default', () => {
      expect(DEFAULT_PREFERENCES.can_read_menu).toBe(true);
      expect(DEFAULT_PREFERENCES.can_read_orders).toBe(true);
      expect(DEFAULT_PREFERENCES.can_read_feedback).toBe(true);
      expect(DEFAULT_PREFERENCES.can_read_analytics).toBe(true);
      expect(DEFAULT_PREFERENCES.can_read_events).toBe(true);
    });

    it('should disable write permissions by default', () => {
      expect(DEFAULT_PREFERENCES.can_create_events).toBe(false);
      expect(DEFAULT_PREFERENCES.can_modify_menu).toBe(false);
    });

    it('should default to 30 days of data', () => {
      expect(DEFAULT_PREFERENCES.include_last_n_days_data).toBe(30);
    });
  });

  describe('getPreferenceWithDefault', () => {
    it('should return value when defined', () => {
      const result = getPreferenceWithDefault('custom', 'default');
      expect(result).toBe('custom');
    });

    it('should return default when undefined', () => {
      const result = getPreferenceWithDefault(undefined, 'default');
      expect(result).toBe('default');
    });

    it('should return default when null', () => {
      const result = getPreferenceWithDefault(null, 'default');
      expect(result).toBe('default');
    });

    it('should preserve false boolean', () => {
      const result = getPreferenceWithDefault(false, true);
      expect(result).toBe(false);
    });

    it('should preserve 0 number', () => {
      const result = getPreferenceWithDefault(0, 30);
      expect(result).toBe(0);
    });

    it('should preserve empty string', () => {
      const result = getPreferenceWithDefault('', 'default');
      expect(result).toBe('');
    });
  });
});

// ============================================
// Error Handling Tests
// ============================================

describe('Error Handling', () => {
  const formatErrorMessage = (error: unknown): string => {
    return error instanceof Error ? error.message : 'Unknown error';
  };

  const createErrorResponse = (error: unknown, startTime: number) => ({
    status: 'error' as const,
    error_message: formatErrorMessage(error),
    latency_ms: Date.now() - startTime,
  });

  describe('formatErrorMessage', () => {
    it('should extract message from Error object', () => {
      const error = new Error('Something went wrong');
      expect(formatErrorMessage(error)).toBe('Something went wrong');
    });

    it('should return "Unknown error" for string', () => {
      expect(formatErrorMessage('error string')).toBe('Unknown error');
    });

    it('should return "Unknown error" for null', () => {
      expect(formatErrorMessage(null)).toBe('Unknown error');
    });

    it('should return "Unknown error" for undefined', () => {
      expect(formatErrorMessage(undefined)).toBe('Unknown error');
    });

    it('should return "Unknown error" for object', () => {
      expect(formatErrorMessage({ message: 'test' })).toBe('Unknown error');
    });
  });

  describe('createErrorResponse', () => {
    it('should include error status', () => {
      const response = createErrorResponse(new Error('test'), Date.now());
      expect(response.status).toBe('error');
    });

    it('should include error message', () => {
      const response = createErrorResponse(new Error('test error'), Date.now());
      expect(response.error_message).toBe('test error');
    });

    it('should calculate latency', () => {
      const startTime = Date.now() - 100;
      const response = createErrorResponse(new Error('test'), startTime);
      expect(response.latency_ms).toBeGreaterThanOrEqual(100);
    });
  });
});

// ============================================
// Latency Calculation Tests
// ============================================

describe('Latency Calculation', () => {
  const calculateLatency = (startTime: number): number => {
    return Date.now() - startTime;
  };

  const isLatencyAcceptable = (latencyMs: number, thresholdMs: number = 5000): boolean => {
    return latencyMs <= thresholdMs;
  };

  describe('calculateLatency', () => {
    it('should calculate positive latency', () => {
      const startTime = Date.now() - 100;
      const latency = calculateLatency(startTime);
      expect(latency).toBeGreaterThanOrEqual(100);
    });

    it('should handle immediate calculation', () => {
      const startTime = Date.now();
      const latency = calculateLatency(startTime);
      expect(latency).toBeGreaterThanOrEqual(0);
      expect(latency).toBeLessThan(100);
    });
  });

  describe('isLatencyAcceptable', () => {
    it('should accept latency under threshold', () => {
      expect(isLatencyAcceptable(1000, 5000)).toBe(true);
    });

    it('should accept latency at threshold', () => {
      expect(isLatencyAcceptable(5000, 5000)).toBe(true);
    });

    it('should reject latency over threshold', () => {
      expect(isLatencyAcceptable(6000, 5000)).toBe(false);
    });

    it('should use default 5000ms threshold', () => {
      expect(isLatencyAcceptable(4000)).toBe(true);
      expect(isLatencyAcceptable(6000)).toBe(false);
    });
  });
});

// ============================================
// Token Counting Estimation Tests
// ============================================

describe('Token Estimation', () => {
  // Rough estimation: ~4 chars per token for English text
  const estimateTokens = (text: string): number => {
    return Math.ceil(text.length / 4);
  };

  const estimateConversationTokens = (messages: Array<{ content: string }>): number => {
    return messages.reduce((sum, msg) => sum + estimateTokens(msg.content), 0);
  };

  describe('estimateTokens', () => {
    it('should estimate empty string as 0', () => {
      expect(estimateTokens('')).toBe(0);
    });

    it('should estimate short text', () => {
      const estimate = estimateTokens('Hello');
      expect(estimate).toBe(2); // 5 chars / 4 = 1.25, ceil = 2
    });

    it('should estimate longer text', () => {
      const estimate = estimateTokens('This is a longer message.');
      expect(estimate).toBe(7); // 26 chars / 4 = 6.5, ceil = 7
    });
  });

  describe('estimateConversationTokens', () => {
    it('should sum all message tokens', () => {
      const messages = [
        { content: 'Hello' }, // ~2 tokens
        { content: 'Hi there!' }, // ~3 tokens
      ];
      const estimate = estimateConversationTokens(messages);
      expect(estimate).toBe(5);
    });

    it('should handle empty conversation', () => {
      expect(estimateConversationTokens([])).toBe(0);
    });
  });
});

// ============================================
// Communication Style Tests
// ============================================

describe('Communication Style', () => {
  const VALID_STYLES = ['professional', 'friendly', 'casual', 'formal'];

  const isValidStyle = (style: string): boolean => {
    return VALID_STYLES.includes(style);
  };

  const normalizeStyle = (style: string): string => {
    return style.toLowerCase().trim();
  };

  it('should validate professional style', () => {
    expect(isValidStyle('professional')).toBe(true);
  });

  it('should validate friendly style', () => {
    expect(isValidStyle('friendly')).toBe(true);
  });

  it('should validate casual style', () => {
    expect(isValidStyle('casual')).toBe(true);
  });

  it('should validate formal style', () => {
    expect(isValidStyle('formal')).toBe(true);
  });

  it('should reject invalid style', () => {
    expect(isValidStyle('rude')).toBe(false);
  });

  it('should normalize style with whitespace', () => {
    expect(normalizeStyle('  Professional  ')).toBe('professional');
  });

  it('should normalize uppercase style', () => {
    expect(normalizeStyle('FRIENDLY')).toBe('friendly');
  });
});
