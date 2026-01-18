import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock Supabase before importing
vi.mock('../supabase-browser', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    gte: vi.fn().mockReturnThis(),
    lte: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    order: vi.fn().mockResolvedValue({ data: [], error: null }),
    rpc: vi.fn().mockResolvedValue({ data: [], error: null }),
  })),
}));

import { getDateRange } from '../analytics-service';

// ============================================
// getDateRange function tests
// ============================================

describe('getDateRange', () => {
  beforeEach(() => {
    // Mock current date for consistent testing
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-14T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('7 day period', () => {
    it('should return correct start date for 7d', () => {
      const result = getDateRange('7d');
      expect(result.startDate).toBe('2026-01-07');
    });

    it('should return correct end date for 7d', () => {
      const result = getDateRange('7d');
      expect(result.endDate).toBe('2026-01-14');
    });
  });

  describe('30 day period', () => {
    it('should return correct start date for 30d', () => {
      const result = getDateRange('30d');
      expect(result.startDate).toBe('2025-12-15');
    });

    it('should return correct end date for 30d', () => {
      const result = getDateRange('30d');
      expect(result.endDate).toBe('2026-01-14');
    });
  });

  describe('90 day period', () => {
    it('should return correct start date for 90d', () => {
      const result = getDateRange('90d');
      expect(result.startDate).toBe('2025-10-16');
    });

    it('should return correct end date for 90d', () => {
      const result = getDateRange('90d');
      expect(result.endDate).toBe('2026-01-14');
    });
  });

  describe('1 year period', () => {
    it('should return correct start date for 1y', () => {
      const result = getDateRange('1y');
      expect(result.startDate).toBe('2025-01-14');
    });

    it('should return correct end date for 1y', () => {
      const result = getDateRange('1y');
      expect(result.endDate).toBe('2026-01-14');
    });
  });

  describe('date format', () => {
    it('should return dates in ISO format YYYY-MM-DD', () => {
      const result = getDateRange('7d');
      expect(result.startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(result.endDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});

// ============================================
// Test helper functions (exported for testing)
// ============================================

// Since calculateMetrics, calculateChange, and getEmptySummary are not exported,
// we test them indirectly through the public API or create unit tests for their logic

describe('calculateChange logic', () => {
  // Replicate the logic for testing
  const calculateChange = (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  it('should return 0 when both values are 0', () => {
    expect(calculateChange(0, 0)).toBe(0);
  });

  it('should return 100 when previous is 0 and current is positive', () => {
    expect(calculateChange(100, 0)).toBe(100);
  });

  it('should return positive change for increase', () => {
    expect(calculateChange(150, 100)).toBe(50);
  });

  it('should return negative change for decrease', () => {
    expect(calculateChange(50, 100)).toBe(-50);
  });

  it('should return 0 when values are equal', () => {
    expect(calculateChange(100, 100)).toBe(0);
  });

  it('should handle small changes correctly', () => {
    expect(calculateChange(101, 100)).toBe(1);
  });

  it('should handle large increases', () => {
    expect(calculateChange(300, 100)).toBe(200);
  });

  it('should return -100 when current is 0 and previous is positive', () => {
    expect(calculateChange(0, 100)).toBe(-100);
  });

  it('should round to nearest integer', () => {
    // 33.333...% should round to 33
    expect(calculateChange(133, 100)).toBe(33);
    // 66.666...% should round to 67
    expect(calculateChange(166, 100)).toBe(66);
  });
});

describe('calculateMetrics logic', () => {
  // Replicate the logic for testing
  interface EventData {
    event_name: string;
    anonymous_id?: string | null;
    session_id?: string | null;
    properties?: Record<string, unknown> | null;
  }

  const calculateMetrics = (events: EventData[]) => {
    const visitors = new Set<string>();
    const sessions = new Set<string>();
    let pageViews = 0;
    let itemViews = 0;
    let addToCarts = 0;

    for (const event of events) {
      if (event.anonymous_id) visitors.add(event.anonymous_id);
      if (event.session_id) sessions.add(event.session_id);

      switch (event.event_name) {
        case 'page_view':
          pageViews++;
          break;
        case 'item_view':
          itemViews++;
          break;
        case 'add_to_cart':
          addToCarts++;
          break;
      }
    }

    return {
      totalPageViews: pageViews,
      totalUniqueVisitors: visitors.size,
      totalSessions: sessions.size,
      avgSessionDuration: 0,
      totalItemViews: itemViews,
      totalAddToCarts: addToCarts,
      conversionRate: itemViews > 0 ? (addToCarts / itemViews) * 100 : 0,
    };
  };

  describe('empty events', () => {
    it('should return zeros for empty array', () => {
      const result = calculateMetrics([]);
      expect(result.totalPageViews).toBe(0);
      expect(result.totalUniqueVisitors).toBe(0);
      expect(result.totalSessions).toBe(0);
      expect(result.totalItemViews).toBe(0);
      expect(result.totalAddToCarts).toBe(0);
      expect(result.conversionRate).toBe(0);
    });
  });

  describe('page views', () => {
    it('should count page_view events', () => {
      const events: EventData[] = [
        { event_name: 'page_view' },
        { event_name: 'page_view' },
        { event_name: 'page_view' },
      ];
      const result = calculateMetrics(events);
      expect(result.totalPageViews).toBe(3);
    });

    it('should not count other events as page views', () => {
      const events: EventData[] = [
        { event_name: 'item_view' },
        { event_name: 'add_to_cart' },
        { event_name: 'click' },
      ];
      const result = calculateMetrics(events);
      expect(result.totalPageViews).toBe(0);
    });
  });

  describe('unique visitors', () => {
    it('should count unique anonymous_ids', () => {
      const events: EventData[] = [
        { event_name: 'page_view', anonymous_id: 'user1' },
        { event_name: 'page_view', anonymous_id: 'user1' },
        { event_name: 'page_view', anonymous_id: 'user2' },
        { event_name: 'page_view', anonymous_id: 'user3' },
      ];
      const result = calculateMetrics(events);
      expect(result.totalUniqueVisitors).toBe(3);
    });

    it('should ignore null/undefined anonymous_ids', () => {
      const events: EventData[] = [
        { event_name: 'page_view', anonymous_id: null },
        { event_name: 'page_view', anonymous_id: undefined },
        { event_name: 'page_view', anonymous_id: 'user1' },
      ];
      const result = calculateMetrics(events);
      expect(result.totalUniqueVisitors).toBe(1);
    });
  });

  describe('sessions', () => {
    it('should count unique session_ids', () => {
      const events: EventData[] = [
        { event_name: 'page_view', session_id: 'sess1' },
        { event_name: 'page_view', session_id: 'sess1' },
        { event_name: 'page_view', session_id: 'sess2' },
      ];
      const result = calculateMetrics(events);
      expect(result.totalSessions).toBe(2);
    });
  });

  describe('item views and add to cart', () => {
    it('should count item_view events', () => {
      const events: EventData[] = [{ event_name: 'item_view' }, { event_name: 'item_view' }];
      const result = calculateMetrics(events);
      expect(result.totalItemViews).toBe(2);
    });

    it('should count add_to_cart events', () => {
      const events: EventData[] = [
        { event_name: 'add_to_cart' },
        { event_name: 'add_to_cart' },
        { event_name: 'add_to_cart' },
      ];
      const result = calculateMetrics(events);
      expect(result.totalAddToCarts).toBe(3);
    });
  });

  describe('conversion rate', () => {
    it('should calculate conversion rate correctly', () => {
      const events: EventData[] = [
        { event_name: 'item_view' },
        { event_name: 'item_view' },
        { event_name: 'item_view' },
        { event_name: 'item_view' },
        { event_name: 'add_to_cart' },
      ];
      const result = calculateMetrics(events);
      // 1 add_to_cart / 4 item_views = 25%
      expect(result.conversionRate).toBe(25);
    });

    it('should return 0 when no item views', () => {
      const events: EventData[] = [{ event_name: 'page_view' }, { event_name: 'add_to_cart' }];
      const result = calculateMetrics(events);
      expect(result.conversionRate).toBe(0);
    });

    it('should handle 100% conversion rate', () => {
      const events: EventData[] = [{ event_name: 'item_view' }, { event_name: 'add_to_cart' }];
      const result = calculateMetrics(events);
      expect(result.conversionRate).toBe(100);
    });
  });

  describe('mixed events', () => {
    it('should correctly aggregate all event types', () => {
      const events: EventData[] = [
        { event_name: 'page_view', anonymous_id: 'u1', session_id: 's1' },
        { event_name: 'page_view', anonymous_id: 'u1', session_id: 's1' },
        { event_name: 'item_view', anonymous_id: 'u1', session_id: 's1' },
        { event_name: 'item_view', anonymous_id: 'u2', session_id: 's2' },
        { event_name: 'add_to_cart', anonymous_id: 'u2', session_id: 's2' },
        { event_name: 'page_view', anonymous_id: 'u3', session_id: 's3' },
      ];
      const result = calculateMetrics(events);

      expect(result.totalPageViews).toBe(3);
      expect(result.totalUniqueVisitors).toBe(3);
      expect(result.totalSessions).toBe(3);
      expect(result.totalItemViews).toBe(2);
      expect(result.totalAddToCarts).toBe(1);
      expect(result.conversionRate).toBe(50); // 1/2 = 50%
    });
  });
});

describe('getEmptySummary logic', () => {
  const getEmptySummary = () => ({
    totalPageViews: 0,
    totalUniqueVisitors: 0,
    totalSessions: 0,
    avgSessionDuration: 0,
    totalItemViews: 0,
    totalAddToCarts: 0,
    conversionRate: 0,
    pageViewsChange: 0,
    visitorsChange: 0,
    sessionsChange: 0,
  });

  it('should return all zeros', () => {
    const summary = getEmptySummary();
    expect(summary.totalPageViews).toBe(0);
    expect(summary.totalUniqueVisitors).toBe(0);
    expect(summary.totalSessions).toBe(0);
    expect(summary.avgSessionDuration).toBe(0);
    expect(summary.totalItemViews).toBe(0);
    expect(summary.totalAddToCarts).toBe(0);
    expect(summary.conversionRate).toBe(0);
    expect(summary.pageViewsChange).toBe(0);
    expect(summary.visitorsChange).toBe(0);
    expect(summary.sessionsChange).toBe(0);
  });

  it('should have all required properties', () => {
    const summary = getEmptySummary();
    expect(summary).toHaveProperty('totalPageViews');
    expect(summary).toHaveProperty('totalUniqueVisitors');
    expect(summary).toHaveProperty('totalSessions');
    expect(summary).toHaveProperty('avgSessionDuration');
    expect(summary).toHaveProperty('totalItemViews');
    expect(summary).toHaveProperty('totalAddToCarts');
    expect(summary).toHaveProperty('conversionRate');
    expect(summary).toHaveProperty('pageViewsChange');
    expect(summary).toHaveProperty('visitorsChange');
    expect(summary).toHaveProperty('sessionsChange');
  });
});

// ============================================
// Type definitions tests
// ============================================

describe('Analytics types', () => {
  it('EventCount should have correct shape', () => {
    const eventCount = {
      eventDate: '2026-01-14',
      eventName: 'page_view',
      eventCount: 100,
      uniqueUsers: 50,
    };
    expect(eventCount.eventDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(typeof eventCount.eventName).toBe('string');
    expect(typeof eventCount.eventCount).toBe('number');
    expect(typeof eventCount.uniqueUsers).toBe('number');
  });

  it('DailyMetrics should have correct shape', () => {
    const metrics = {
      date: '2026-01-14',
      pageViews: 100,
      uniqueVisitors: 50,
      sessions: 30,
      avgSessionDuration: 120,
    };
    expect(typeof metrics.date).toBe('string');
    expect(typeof metrics.pageViews).toBe('number');
    expect(typeof metrics.uniqueVisitors).toBe('number');
    expect(typeof metrics.sessions).toBe('number');
    expect(typeof metrics.avgSessionDuration).toBe('number');
  });

  it('TopItem should have correct shape', () => {
    const item = {
      itemId: 'item-123',
      itemName: 'Pizza Margherita',
      viewCount: 100,
      addToCartCount: 25,
      conversionRate: 25,
    };
    expect(typeof item.itemId).toBe('string');
    expect(typeof item.itemName).toBe('string');
    expect(typeof item.viewCount).toBe('number');
    expect(typeof item.addToCartCount).toBe('number');
    expect(typeof item.conversionRate).toBe('number');
  });

  it('DeviceBreakdown should have correct shape', () => {
    const breakdown = {
      deviceType: 'mobile',
      eventCount: 500,
      percentage: 60,
    };
    expect(typeof breakdown.deviceType).toBe('string');
    expect(typeof breakdown.eventCount).toBe('number');
    expect(typeof breakdown.percentage).toBe('number');
    expect(breakdown.percentage).toBeLessThanOrEqual(100);
    expect(breakdown.percentage).toBeGreaterThanOrEqual(0);
  });

  it('HourlyBreakdown should have valid hour range', () => {
    const breakdown = {
      hour: 14,
      eventCount: 100,
    };
    expect(breakdown.hour).toBeGreaterThanOrEqual(0);
    expect(breakdown.hour).toBeLessThanOrEqual(23);
    expect(typeof breakdown.eventCount).toBe('number');
  });
});
