import { describe, it, expect, vi } from 'vitest';

// Mock supabase module before importing knowledge-service
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            limit: vi.fn(() => Promise.resolve({ data: [], error: null })),
          })),
        })),
      })),
    })),
  },
}));

import {
  formatKnowledgeForAI,
  type MerchantKnowledge,
  type MenuKnowledge,
  type AnalyticsKnowledge,
  type EventsKnowledge,
  type FeedbackKnowledge,
  type InventoryKnowledge,
} from '../knowledge-service';

// ============================================
// Test Fixtures
// ============================================

const createEmptyKnowledge = (): MerchantKnowledge => ({
  menu: null,
  analytics: null,
  events: null,
  feedback: null,
  inventory: null,
  lastUpdated: new Date().toISOString(),
});

const createMockMenuKnowledge = (overrides: Partial<MenuKnowledge> = {}): MenuKnowledge => ({
  totalItems: 25,
  categories: [
    { name: 'Pasta', itemCount: 8, priceRange: { min: 12, max: 18 } },
    { name: 'Pizza', itemCount: 10, priceRange: { min: 10, max: 22 } },
    { name: 'Desserts', itemCount: 7, priceRange: { min: 6, max: 10 } },
  ],
  topItems: [
    { id: '1', name: 'Margherita', price: 12, category: 'Pizza' },
    { id: '2', name: 'Carbonara', price: 15, category: 'Pasta' },
    { id: '3', name: 'Tiramisu', price: 8, category: 'Desserts' },
  ],
  recentChanges: ['Added new pasta dish', 'Updated prices'],
  ...overrides,
});

const createMockAnalyticsKnowledge = (
  overrides: Partial<AnalyticsKnowledge> = {}
): AnalyticsKnowledge => ({
  periodDays: 30,
  totalViews: 5420,
  totalOrders: 234,
  topItems: [
    { name: 'Margherita', views: 450, orders: 89 },
    { name: 'Carbonara', views: 380, orders: 67 },
  ],
  peakHours: ['12:00-14:00', '19:00-21:00'],
  trends: [
    { metric: 'Page Views', change: 15, direction: 'up' },
    { metric: 'Orders', change: -3, direction: 'stable' },
  ],
  ...overrides,
});

const createMockEventsKnowledge = (overrides: Partial<EventsKnowledge> = {}): EventsKnowledge => ({
  upcoming: [
    { id: '1', title: 'Wine Tasting Night', date: '2026-01-20T19:00:00Z', type: 'special' },
    { id: '2', title: 'Live Jazz', date: '2026-01-25T20:00:00Z', type: 'entertainment' },
  ],
  recent: [{ id: '3', title: 'New Year Party', date: '2026-01-01T23:00:00Z', type: 'celebration' }],
  totalThisMonth: 5,
  ...overrides,
});

const createMockFeedbackKnowledge = (
  overrides: Partial<FeedbackKnowledge> = {}
): FeedbackKnowledge => ({
  averageRating: 4.3,
  totalReviews: 45,
  recentFeedback: [
    { rating: 5, comment: 'Amazing food and great service!', date: '2026-01-10T12:00:00Z' },
    { rating: 4, comment: 'Good pasta, but a bit slow today.', date: '2026-01-09T19:00:00Z' },
    {
      rating: 3,
      comment: 'Average experience, nothing special.',
      date: '2026-01-08T13:00:00Z',
    },
  ],
  sentimentSummary: {
    positive: 35,
    neutral: 7,
    negative: 3,
  },
  ...overrides,
});

const createMockInventoryKnowledge = (
  overrides: Partial<InventoryKnowledge> = {}
): InventoryKnowledge => ({
  totalItems: 50,
  lowStockItems: [
    { id: '1', name: 'Mozzarella', currentStock: 2, minStock: 5, unit: 'kg', daysUntilEmpty: 2 },
    { id: '2', name: 'Tomato Sauce', currentStock: 3, minStock: 10, unit: 'L' },
  ],
  categories: [
    { name: 'Dairy', itemCount: 12 },
    { name: 'Produce', itemCount: 20 },
    { name: 'Dry Goods', itemCount: 18 },
  ],
  suppliers: [
    { name: 'Fresh Farms', categories: ['Produce', 'Dairy'] },
    { name: 'Pasta Co', categories: ['Dry Goods'] },
  ],
  pendingOrders: 2,
  ...overrides,
});

// ============================================
// formatKnowledgeForAI
// ============================================

describe('formatKnowledgeForAI', () => {
  describe('empty knowledge', () => {
    it('should return fallback message when all data is null', () => {
      const knowledge = createEmptyKnowledge();
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('No data available yet');
      expect(result).toContain('just getting started');
    });
  });

  describe('menu section', () => {
    it('should include menu header', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        menu: createMockMenuKnowledge(),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('## Menu Data');
    });

    it('should include total items count', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        menu: createMockMenuKnowledge({ totalItems: 42 }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Total items: 42');
    });

    it('should include categories with item counts', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        menu: createMockMenuKnowledge(),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Pasta (8 items');
      expect(result).toContain('Pizza (10 items');
      expect(result).toContain('Desserts (7 items');
    });

    it('should include price ranges for categories', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        menu: createMockMenuKnowledge(),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('$12-$18');
      expect(result).toContain('$10-$22');
    });

    it('should include top items with prices', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        menu: createMockMenuKnowledge(),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Margherita ($12)');
      expect(result).toContain('Carbonara ($15)');
      expect(result).toContain('Tiramisu ($8)');
    });
  });

  describe('analytics section', () => {
    it('should include analytics header with period', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        analytics: createMockAnalyticsKnowledge({ periodDays: 30 }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('## Analytics (Last 30 days)');
    });

    it('should include total views and orders', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        analytics: createMockAnalyticsKnowledge({ totalViews: 5420, totalOrders: 234 }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Total page views: 5420');
      expect(result).toContain('Total orders: 234');
    });

    it('should include top performing items', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        analytics: createMockAnalyticsKnowledge(),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Margherita (450 views, 89 orders)');
      expect(result).toContain('Carbonara (380 views, 67 orders)');
    });

    it('should show "No data yet" for empty top items', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        analytics: createMockAnalyticsKnowledge({ topItems: [] }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('No data yet');
    });

    it('should include peak hours', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        analytics: createMockAnalyticsKnowledge({ peakHours: ['12:00-14:00', '19:00-21:00'] }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Peak hours: 12:00-14:00, 19:00-21:00');
    });

    it('should include trends with up arrow', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        analytics: createMockAnalyticsKnowledge({
          trends: [{ metric: 'Views', change: 15, direction: 'up' }],
        }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Views: ↑ 15%');
    });

    it('should include trends with down arrow', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        analytics: createMockAnalyticsKnowledge({
          trends: [{ metric: 'Orders', change: -10, direction: 'down' }],
        }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Orders: ↓ -10%');
    });

    it('should include trends with stable arrow', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        analytics: createMockAnalyticsKnowledge({
          trends: [{ metric: 'Visits', change: 0, direction: 'stable' }],
        }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Visits: → 0%');
    });
  });

  describe('events section', () => {
    it('should include events header', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        events: createMockEventsKnowledge(),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('## Events');
    });

    it('should include events this month count', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        events: createMockEventsKnowledge({ totalThisMonth: 5 }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Events this month: 5');
    });

    it('should include upcoming events', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        events: createMockEventsKnowledge(),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Wine Tasting Night');
      expect(result).toContain('Live Jazz');
    });

    it('should show "None scheduled" for no upcoming events', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        events: createMockEventsKnowledge({ upcoming: [] }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Upcoming: None scheduled');
    });

    it('should include recent events', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        events: createMockEventsKnowledge(),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('New Year Party');
    });

    it('should show "None" for no recent events', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        events: createMockEventsKnowledge({ recent: [] }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Recent: None');
    });
  });

  describe('feedback section', () => {
    it('should include feedback header', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        feedback: createMockFeedbackKnowledge(),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('## Customer Feedback (Last 30 days)');
    });

    it('should include average rating and total reviews', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        feedback: createMockFeedbackKnowledge({ averageRating: 4.3, totalReviews: 45 }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Average rating: 4.3/5 (45 reviews)');
    });

    it('should include sentiment summary', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        feedback: createMockFeedbackKnowledge({
          sentimentSummary: { positive: 35, neutral: 7, negative: 3 },
        }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('35 positive');
      expect(result).toContain('7 neutral');
      expect(result).toContain('3 negative');
    });

    it('should include recent feedback with ratings', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        feedback: createMockFeedbackKnowledge(),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('5/5:');
      expect(result).toContain('Amazing food');
    });

    it('should truncate long feedback comments', () => {
      const longComment = 'A'.repeat(150);
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        feedback: createMockFeedbackKnowledge({
          recentFeedback: [{ rating: 4, comment: longComment, date: '2026-01-10T12:00:00Z' }],
        }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('...');
      expect(result).not.toContain('A'.repeat(150));
    });

    it('should show "No recent feedback" for empty feedback', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        feedback: createMockFeedbackKnowledge({ recentFeedback: [] }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('No recent feedback');
    });
  });

  describe('inventory section', () => {
    it('should include inventory header', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        inventory: createMockInventoryKnowledge(),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('## Inventory Status');
    });

    it('should include total items tracked', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        inventory: createMockInventoryKnowledge({ totalItems: 50 }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Total items tracked: 50');
    });

    it('should include categories with counts', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        inventory: createMockInventoryKnowledge(),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Dairy (12)');
      expect(result).toContain('Produce (20)');
      expect(result).toContain('Dry Goods (18)');
    });

    it('should include supplier names', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        inventory: createMockInventoryKnowledge(),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Fresh Farms');
      expect(result).toContain('Pasta Co');
    });

    it('should show "None configured" for no suppliers', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        inventory: createMockInventoryKnowledge({ suppliers: [] }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Suppliers: None configured');
    });

    it('should include pending orders count', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        inventory: createMockInventoryKnowledge({ pendingOrders: 2 }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Pending orders: 2');
    });

    it('should include low stock alerts with warning emoji', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        inventory: createMockInventoryKnowledge(),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('⚠️ LOW STOCK ALERTS');
      expect(result).toContain('Mozzarella: 2 kg (min: 5)');
      expect(result).toContain('~2 days left');
    });

    it('should show items without daysUntilEmpty', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        inventory: createMockInventoryKnowledge({
          lowStockItems: [
            { id: '1', name: 'Tomato Sauce', currentStock: 3, minStock: 10, unit: 'L' },
          ],
        }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('Tomato Sauce: 3 L (min: 10)');
      expect(result).not.toContain('days left');
    });

    it('should show "All items well stocked" when no low stock items', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        inventory: createMockInventoryKnowledge({ lowStockItems: [] }),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('All items well stocked');
    });
  });

  describe('combined sections', () => {
    it('should include main header when data exists', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        menu: createMockMenuKnowledge(),
      };
      const result = formatKnowledgeForAI(knowledge);
      expect(result).toContain('# Current Business Data');
    });

    it('should combine all sections when all data present', () => {
      const knowledge: MerchantKnowledge = {
        menu: createMockMenuKnowledge(),
        analytics: createMockAnalyticsKnowledge(),
        events: createMockEventsKnowledge(),
        feedback: createMockFeedbackKnowledge(),
        inventory: createMockInventoryKnowledge(),
        lastUpdated: new Date().toISOString(),
      };
      const result = formatKnowledgeForAI(knowledge);

      // Check all sections present
      expect(result).toContain('## Menu Data');
      expect(result).toContain('## Analytics');
      expect(result).toContain('## Events');
      expect(result).toContain('## Customer Feedback');
      expect(result).toContain('## Inventory Status');
    });

    it('should only include sections with data', () => {
      const knowledge: MerchantKnowledge = {
        ...createEmptyKnowledge(),
        menu: createMockMenuKnowledge(),
        analytics: null,
        events: createMockEventsKnowledge(),
      };
      const result = formatKnowledgeForAI(knowledge);

      expect(result).toContain('## Menu Data');
      expect(result).toContain('## Events');
      expect(result).not.toContain('## Analytics');
      expect(result).not.toContain('## Customer Feedback');
      expect(result).not.toContain('## Inventory Status');
    });
  });
});

// ============================================
// Type interface validation
// ============================================

describe('MerchantKnowledge type structure', () => {
  it('should accept all null values', () => {
    const knowledge: MerchantKnowledge = {
      menu: null,
      analytics: null,
      events: null,
      feedback: null,
      inventory: null,
      lastUpdated: '2026-01-14T12:00:00Z',
    };
    expect(knowledge.lastUpdated).toBeDefined();
  });

  it('should accept complete data structure', () => {
    const knowledge: MerchantKnowledge = {
      menu: {
        totalItems: 10,
        categories: [],
        topItems: [],
        recentChanges: [],
      },
      analytics: {
        periodDays: 30,
        totalViews: 100,
        totalOrders: 50,
        topItems: [],
        peakHours: [],
        trends: [],
      },
      events: {
        upcoming: [],
        recent: [],
        totalThisMonth: 0,
      },
      feedback: {
        averageRating: 0,
        totalReviews: 0,
        recentFeedback: [],
        sentimentSummary: { positive: 0, neutral: 0, negative: 0 },
      },
      inventory: {
        totalItems: 0,
        lowStockItems: [],
        categories: [],
        suppliers: [],
        pendingOrders: 0,
      },
      lastUpdated: '2026-01-14T12:00:00Z',
    };
    expect(knowledge.menu?.totalItems).toBe(10);
    expect(knowledge.analytics?.periodDays).toBe(30);
  });
});
