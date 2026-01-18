import { describe, it, expect, vi } from 'vitest';

// Mock all dependencies before importing
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      lte: vi.fn().mockReturnThis(),
      lt: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
    })),
  },
}));

vi.mock('@/lib/qr/qr-service', () => ({
  createQRCode: vi.fn(),
  bulkCreateQRCodes: vi.fn(),
  getQRAnalytics: vi.fn(),
  getMerchantSourcePerformance: vi.fn(),
  getMerchantQRStats: vi.fn(),
}));

vi.mock('@/lib/qr/qr-generator', () => ({
  exportQRCode: vi.fn(),
  buildQRContent: vi.fn(),
}));

import { AI_TOOLS } from '../actions-service';

// ============================================
// AI_TOOLS constant validation
// ============================================

describe('AI_TOOLS', () => {
  it('should have at least 9 tools defined', () => {
    expect(AI_TOOLS.length).toBeGreaterThanOrEqual(9);
  });

  it('all tools should have type "function"', () => {
    AI_TOOLS.forEach((tool) => {
      expect(tool.type).toBe('function');
    });
  });

  it('all tools should have a name', () => {
    AI_TOOLS.forEach((tool) => {
      expect(tool.function.name).toBeDefined();
      expect(tool.function.name.length).toBeGreaterThan(0);
    });
  });

  it('all tools should have a description', () => {
    AI_TOOLS.forEach((tool) => {
      expect(tool.function.description).toBeDefined();
      expect(tool.function.description.length).toBeGreaterThan(0);
    });
  });

  it('all tools should have parameters object', () => {
    AI_TOOLS.forEach((tool) => {
      expect(tool.function.parameters).toBeDefined();
      expect(tool.function.parameters.type).toBe('object');
    });
  });

  describe('create_event tool', () => {
    const tool = AI_TOOLS.find((t) => t.function.name === 'create_event');

    it('should exist', () => {
      expect(tool).toBeDefined();
    });

    it('should have correct required fields', () => {
      expect(tool?.function.parameters.required).toContain('title');
      expect(tool?.function.parameters.required).toContain('start_date');
      expect(tool?.function.parameters.required).toContain('event_type');
    });

    it('should have valid event_type enum', () => {
      const eventType = tool?.function.parameters.properties.event_type;
      expect(eventType?.enum).toContain('sports');
      expect(eventType?.enum).toContain('live_music');
      expect(eventType?.enum).toContain('dj');
      expect(eventType?.enum).toContain('special');
      expect(eventType?.enum).toContain('holiday');
      expect(eventType?.enum).toContain('promotion');
    });

    it('should support sports_info for sports events', () => {
      const sportsInfo = tool?.function.parameters.properties.sports_info;
      expect(sportsInfo).toBeDefined();
      expect(sportsInfo?.properties.home_team).toBeDefined();
      expect(sportsInfo?.properties.away_team).toBeDefined();
    });
  });

  describe('translate_content tool', () => {
    const tool = AI_TOOLS.find((t) => t.function.name === 'translate_content');

    it('should exist', () => {
      expect(tool).toBeDefined();
    });

    it('should require text and target_languages', () => {
      expect(tool?.function.parameters.required).toContain('text');
      expect(tool?.function.parameters.required).toContain('target_languages');
    });

    it('should have target_languages as array', () => {
      const targetLangs = tool?.function.parameters.properties.target_languages;
      expect(targetLangs?.type).toBe('array');
      expect(targetLangs?.items.type).toBe('string');
    });
  });

  describe('generate_description tool', () => {
    const tool = AI_TOOLS.find((t) => t.function.name === 'generate_description');

    it('should exist', () => {
      expect(tool).toBeDefined();
    });

    it('should have valid item_type enum', () => {
      const itemType = tool?.function.parameters.properties.item_type;
      expect(itemType?.enum).toContain('menu_item');
      expect(itemType?.enum).toContain('event');
      expect(itemType?.enum).toContain('promotion');
    });

    it('should have valid style enum', () => {
      const style = tool?.function.parameters.properties.style;
      expect(style?.enum).toContain('elegant');
      expect(style?.enum).toContain('casual');
      expect(style?.enum).toContain('fun');
      expect(style?.enum).toContain('professional');
      expect(style?.enum).toContain('appetizing');
    });
  });

  describe('update_menu_item tool', () => {
    const tool = AI_TOOLS.find((t) => t.function.name === 'update_menu_item');

    it('should exist', () => {
      expect(tool).toBeDefined();
    });

    it('should require item_id, item_name, and updates', () => {
      expect(tool?.function.parameters.required).toContain('item_id');
      expect(tool?.function.parameters.required).toContain('item_name');
      expect(tool?.function.parameters.required).toContain('updates');
    });

    it('should have updates with price, description, availability fields', () => {
      const updates = tool?.function.parameters.properties.updates;
      expect(updates?.properties.price).toBeDefined();
      expect(updates?.properties.description).toBeDefined();
      expect(updates?.properties.is_available).toBeDefined();
      expect(updates?.properties.is_featured).toBeDefined();
    });
  });

  describe('get_analytics_insight tool', () => {
    const tool = AI_TOOLS.find((t) => t.function.name === 'get_analytics_insight');

    it('should exist', () => {
      expect(tool).toBeDefined();
    });

    it('should have valid metric enum', () => {
      const metric = tool?.function.parameters.properties.metric;
      expect(metric?.enum).toContain('sales');
      expect(metric?.enum).toContain('views');
      expect(metric?.enum).toContain('orders');
      expect(metric?.enum).toContain('popular_items');
      expect(metric?.enum).toContain('peak_hours');
      expect(metric?.enum).toContain('trends');
    });

    it('should have valid period enum', () => {
      const period = tool?.function.parameters.properties.period;
      expect(period?.enum).toContain('today');
      expect(period?.enum).toContain('yesterday');
      expect(period?.enum).toContain('this_week');
      expect(period?.enum).toContain('last_week');
      expect(period?.enum).toContain('this_month');
      expect(period?.enum).toContain('last_month');
    });
  });

  describe('create_qr_code tool', () => {
    const tool = AI_TOOLS.find((t) => t.function.name === 'create_qr_code');

    it('should exist', () => {
      expect(tool).toBeDefined();
    });

    it('should have valid type enum (url, wifi)', () => {
      const type = tool?.function.parameters.properties.type;
      expect(type?.enum).toContain('url');
      expect(type?.enum).toContain('wifi');
    });

    it('should have valid context enum for table ordering', () => {
      const context = tool?.function.parameters.properties.context;
      expect(context?.enum).toContain('table');
      expect(context?.enum).toContain('external');
      expect(context?.enum).toContain('takeaway');
      expect(context?.enum).toContain('delivery');
    });

    it('should have valid source enum for marketing', () => {
      const source = tool?.function.parameters.properties.source;
      expect(source?.enum).toContain('google_maps');
      expect(source?.enum).toContain('instagram');
      expect(source?.enum).toContain('facebook');
      expect(source?.enum).toContain('flyer');
      expect(source?.enum).toContain('event');
    });

    it('should support wifi parameters', () => {
      const props = tool?.function.parameters.properties;
      expect(props!.wifi_ssid).toBeDefined();
      expect(props!.wifi_password).toBeDefined();
      expect(props!.wifi_security?.enum).toContain('WPA');
      expect(props!.wifi_security?.enum).toContain('WEP');
      expect(props!.wifi_security?.enum).toContain('nopass');
    });
  });

  describe('create_qr_batch tool', () => {
    const tool = AI_TOOLS.find((t) => t.function.name === 'create_qr_batch');

    it('should exist', () => {
      expect(tool).toBeDefined();
    });

    it('should require context', () => {
      expect(tool?.function.parameters.required).toContain('context');
    });

    it('should have valid context enum', () => {
      const context = tool?.function.parameters.properties.context;
      expect(context?.enum).toContain('table');
      expect(context?.enum).toContain('external');
    });

    it('should support count and start_number for tables', () => {
      const props = tool?.function.parameters.properties;
      expect(props!.count).toBeDefined();
      expect(props!.start_number).toBeDefined();
    });

    it('should support sources array for external', () => {
      const sources = tool?.function.parameters.properties.sources;
      expect(sources?.type).toBe('array');
    });
  });

  describe('suggest_qr_format tool', () => {
    const tool = AI_TOOLS.find((t) => t.function.name === 'suggest_qr_format');

    it('should exist', () => {
      expect(tool).toBeDefined();
    });

    it('should require use_case', () => {
      expect(tool?.function.parameters.required).toContain('use_case');
    });

    it('should have use_case as string', () => {
      const useCase = tool?.function.parameters.properties.use_case;
      expect(useCase?.type).toBe('string');
    });
  });

  describe('analyze_qr_performance tool', () => {
    const tool = AI_TOOLS.find((t) => t.function.name === 'analyze_qr_performance');

    it('should exist', () => {
      expect(tool).toBeDefined();
    });

    it('should require analysis_type', () => {
      expect(tool?.function.parameters.required).toContain('analysis_type');
    });

    it('should have valid analysis_type enum', () => {
      const analysisType = tool?.function.parameters.properties.analysis_type;
      expect(analysisType?.enum).toContain('overview');
      expect(analysisType?.enum).toContain('source_comparison');
      expect(analysisType?.enum).toContain('underperforming');
      expect(analysisType?.enum).toContain('trending');
    });

    it('should have valid period enum', () => {
      const period = tool?.function.parameters.properties.period;
      expect(period?.enum).toContain('today');
      expect(period?.enum).toContain('this_week');
      expect(period?.enum).toContain('this_month');
    });
  });
});

// ============================================
// Tool naming conventions
// ============================================

describe('AI_TOOLS naming conventions', () => {
  it('all tool names should be snake_case', () => {
    AI_TOOLS.forEach((tool) => {
      const name = tool.function.name;
      expect(name).toMatch(/^[a-z][a-z0-9_]*$/);
    });
  });

  it('all tool names should be unique', () => {
    const names = AI_TOOLS.map((t) => t.function.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });

  it('all descriptions should be clear and actionable', () => {
    AI_TOOLS.forEach((tool) => {
      const desc = tool.function.description;
      // Description should be at least 20 characters
      expect(desc.length).toBeGreaterThan(20);
      // Should not start with "This"
      expect(desc).not.toMatch(/^This /);
    });
  });
});

// ============================================
// Tool categories
// ============================================

describe('AI_TOOLS categories', () => {
  it('should have event management tools', () => {
    const eventTools = AI_TOOLS.filter((t) => t.function.name.includes('event'));
    expect(eventTools.length).toBeGreaterThanOrEqual(1);
  });

  it('should have content tools (translate, generate)', () => {
    const contentTools = AI_TOOLS.filter(
      (t) => t.function.name.includes('translate') || t.function.name.includes('generate')
    );
    expect(contentTools.length).toBeGreaterThanOrEqual(2);
  });

  it('should have QR code tools', () => {
    const qrTools = AI_TOOLS.filter((t) => t.function.name.includes('qr'));
    expect(qrTools.length).toBeGreaterThanOrEqual(4);
  });

  it('should have analytics tools', () => {
    const analyticsTools = AI_TOOLS.filter((t) => t.function.name.includes('analytics'));
    expect(analyticsTools.length).toBeGreaterThanOrEqual(1);
  });

  it('should have menu management tools', () => {
    const menuTools = AI_TOOLS.filter((t) => t.function.name.includes('menu'));
    expect(menuTools.length).toBeGreaterThanOrEqual(1);
  });
});
