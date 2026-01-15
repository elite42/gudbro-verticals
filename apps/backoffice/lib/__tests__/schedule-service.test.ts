/**
 * Tests for schedule-service.ts
 *
 * Tests cover:
 * - Types and interfaces (OperatingHours, ScheduleOverride, EffectiveHours, LocationOpenStatus)
 * - Pure helper functions (getOverridePriority, isDateInOverride, getApplicableOverride)
 * - Constants (DEFAULT_OPERATING_HOURS)
 * - Type unions (ScheduleOverrideType)
 */

import { describe, it, expect, vi } from 'vitest';

// Mock supabase before importing the service
vi.mock('../supabase', () => ({
  supabase: {
    from: vi.fn(),
    rpc: vi.fn(),
  },
}));
import type {
  OperatingHours,
  ScheduleOverrideType,
  ScheduleOverride,
  EffectiveHours,
  LocationOpenStatus,
} from '../schedule-service';
import {
  getOverridePriority,
  isDateInOverride,
  getApplicableOverride,
  DEFAULT_OPERATING_HOURS,
} from '../schedule-service';

// ============================================
// TYPE DEFINITIONS
// ============================================

describe('ScheduleOverrideType type', () => {
  it('should accept valid override types', () => {
    const closure: ScheduleOverrideType = 'closure';
    const holiday: ScheduleOverrideType = 'holiday';
    const seasonal: ScheduleOverrideType = 'seasonal';
    const special: ScheduleOverrideType = 'special';
    const event: ScheduleOverrideType = 'event';

    expect(closure).toBe('closure');
    expect(holiday).toBe('holiday');
    expect(seasonal).toBe('seasonal');
    expect(special).toBe('special');
    expect(event).toBe('event');
  });

  it('should have 5 override types', () => {
    const types: ScheduleOverrideType[] = ['closure', 'holiday', 'seasonal', 'special', 'event'];
    expect(types).toHaveLength(5);
  });
});

describe('OperatingHours interface', () => {
  it('should have all 7 days', () => {
    const hours: OperatingHours = {
      mon: { open: '09:00', close: '22:00' },
      tue: { open: '09:00', close: '22:00' },
      wed: { open: '09:00', close: '22:00' },
      thu: { open: '09:00', close: '22:00' },
      fri: { open: '09:00', close: '23:00' },
      sat: { open: '10:00', close: '23:00' },
      sun: { open: '10:00', close: '21:00' },
    };

    expect(Object.keys(hours)).toHaveLength(7);
    expect(hours.mon).not.toBeNull();
    expect(hours.sun).not.toBeNull();
  });

  it('should support null for closed days', () => {
    const hours: OperatingHours = {
      mon: { open: '09:00', close: '22:00' },
      tue: { open: '09:00', close: '22:00' },
      wed: null, // Closed on Wednesday
      thu: { open: '09:00', close: '22:00' },
      fri: { open: '09:00', close: '23:00' },
      sat: { open: '10:00', close: '23:00' },
      sun: null, // Closed on Sunday
    };

    expect(hours.wed).toBeNull();
    expect(hours.sun).toBeNull();
  });

  it('should support varied hours per day', () => {
    const hours: OperatingHours = {
      mon: { open: '07:00', close: '15:00' }, // Early shift
      tue: { open: '07:00', close: '15:00' },
      wed: { open: '07:00', close: '15:00' },
      thu: { open: '07:00', close: '15:00' },
      fri: { open: '07:00', close: '15:00' },
      sat: { open: '08:00', close: '14:00' }, // Short Saturday
      sun: null, // Closed
    };

    expect(hours.mon?.close).toBe('15:00');
    expect(hours.sat?.open).toBe('08:00');
  });
});

describe('ScheduleOverride interface', () => {
  it('should have required fields', () => {
    const override: Partial<ScheduleOverride> = {
      id: 'override-1',
      location_id: 'location-1',
      override_type: 'holiday',
      name: 'Christmas Day',
      date_start: '2026-12-25',
      is_closed: true,
      priority: 20,
      recurrence: 'yearly',
    };

    expect(override.override_type).toBe('holiday');
    expect(override.is_closed).toBe(true);
    expect(override.recurrence).toBe('yearly');
  });

  it('should support custom hours override', () => {
    const override: Partial<ScheduleOverride> = {
      name: 'Extended Hours Friday',
      override_type: 'special',
      is_closed: false,
      hours: { open: '08:00', close: '01:00' },
    };

    expect(override.is_closed).toBe(false);
    expect(override.hours?.close).toBe('01:00');
  });

  it('should support date ranges', () => {
    const override: Partial<ScheduleOverride> = {
      name: 'Summer Hours',
      override_type: 'seasonal',
      date_start: '2026-06-01',
      date_end: '2026-08-31',
      is_closed: false,
      hours: { open: '08:00', close: '23:00' },
    };

    expect(override.date_start).toBe('2026-06-01');
    expect(override.date_end).toBe('2026-08-31');
  });

  it('should support event-linked overrides', () => {
    const override: Partial<ScheduleOverride> = {
      name: 'Live Music Night',
      override_type: 'event',
      event_id: 'event-123',
      hours: { open: '18:00', close: '02:00' },
    };

    expect(override.event_id).toBe('event-123');
    expect(override.override_type).toBe('event');
  });
});

describe('EffectiveHours interface', () => {
  it('should track source of hours', () => {
    const effective: EffectiveHours = {
      date: '2026-01-14',
      source: 'override',
      source_name: 'Holiday Hours',
      is_closed: false,
      hours: { open: '10:00', close: '18:00' },
    };

    expect(effective.source).toBe('override');
    expect(effective.source_name).toBe('Holiday Hours');
  });

  it('should handle closed status', () => {
    const closed: EffectiveHours = {
      date: '2026-12-25',
      source: 'override',
      source_name: 'Christmas',
      is_closed: true,
      hours: null,
    };

    expect(closed.is_closed).toBe(true);
    expect(closed.hours).toBeNull();
  });

  it('should handle regular hours', () => {
    const regular: EffectiveHours = {
      date: '2026-01-14',
      source: 'operating_hours',
      is_closed: false,
      hours: { open: '09:00', close: '22:00' },
    };

    expect(regular.source).toBe('operating_hours');
    expect(regular.source_name).toBeUndefined();
  });
});

describe('LocationOpenStatus interface', () => {
  it('should show open status', () => {
    const status: LocationOpenStatus = {
      is_open: true,
      current_time: '14:30',
      closes_at: '22:00',
      effective_hours: {
        date: '2026-01-14',
        source: 'operating_hours',
        is_closed: false,
        hours: { open: '09:00', close: '22:00' },
      },
    };

    expect(status.is_open).toBe(true);
    expect(status.closes_at).toBe('22:00');
  });

  it('should show closed status with reason', () => {
    const status: LocationOpenStatus = {
      is_open: false,
      reason: 'Holiday closure',
      effective_hours: {
        date: '2026-12-25',
        source: 'override',
        source_name: 'Christmas',
        is_closed: true,
        hours: null,
      },
    };

    expect(status.is_open).toBe(false);
    expect(status.reason).toBe('Holiday closure');
  });

  it('should show opens_at when closed but will open later', () => {
    const status: LocationOpenStatus = {
      is_open: false,
      current_time: '07:30',
      opens_at: '09:00',
      effective_hours: {
        date: '2026-01-14',
        source: 'operating_hours',
        is_closed: false,
        hours: { open: '09:00', close: '22:00' },
      },
    };

    expect(status.is_open).toBe(false);
    expect(status.opens_at).toBe('09:00');
  });
});

// ============================================
// HELPER FUNCTIONS
// ============================================

describe('getOverridePriority', () => {
  it('should return correct priority for seasonal', () => {
    expect(getOverridePriority('seasonal')).toBe(10);
  });

  it('should return correct priority for holiday', () => {
    expect(getOverridePriority('holiday')).toBe(20);
  });

  it('should return correct priority for special', () => {
    expect(getOverridePriority('special')).toBe(30);
  });

  it('should return correct priority for event', () => {
    expect(getOverridePriority('event')).toBe(30);
  });

  it('should return highest priority for closure', () => {
    expect(getOverridePriority('closure')).toBe(100);
  });

  it('should have closure as highest priority', () => {
    const types: ScheduleOverrideType[] = ['seasonal', 'holiday', 'special', 'event', 'closure'];
    const priorities = types.map(getOverridePriority);
    const maxPriority = Math.max(...priorities);
    expect(getOverridePriority('closure')).toBe(maxPriority);
  });

  it('should have seasonal as lowest priority', () => {
    const types: ScheduleOverrideType[] = ['seasonal', 'holiday', 'special', 'event', 'closure'];
    const priorities = types.map(getOverridePriority);
    const minPriority = Math.min(...priorities);
    expect(getOverridePriority('seasonal')).toBe(minPriority);
  });

  it('should return 10 for unknown type', () => {
    // @ts-expect-error testing unknown type
    expect(getOverridePriority('unknown')).toBe(10);
  });

  it('should have special and event with same priority', () => {
    expect(getOverridePriority('special')).toBe(getOverridePriority('event'));
  });
});

describe('isDateInOverride', () => {
  const createOverride = (
    start: string,
    end: string | null = null,
    recurrence: 'none' | 'yearly' = 'none'
  ): ScheduleOverride => ({
    id: 'test-1',
    location_id: 'loc-1',
    override_type: 'holiday',
    name: 'Test Override',
    description: null,
    date_start: start,
    date_end: end,
    recurrence,
    is_closed: true,
    hours: null,
    priority: 20,
    event_id: null,
    created_by: null,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  });

  describe('single day override', () => {
    it('should match exact date', () => {
      const override = createOverride('2026-01-15');
      expect(isDateInOverride(override, new Date('2026-01-15'))).toBe(true);
    });

    it('should not match different date', () => {
      const override = createOverride('2026-01-15');
      expect(isDateInOverride(override, new Date('2026-01-14'))).toBe(false);
      expect(isDateInOverride(override, new Date('2026-01-16'))).toBe(false);
    });
  });

  describe('date range override', () => {
    it('should match start date', () => {
      const override = createOverride('2026-06-01', '2026-06-30');
      expect(isDateInOverride(override, new Date('2026-06-01'))).toBe(true);
    });

    it('should match end date', () => {
      const override = createOverride('2026-06-01', '2026-06-30');
      expect(isDateInOverride(override, new Date('2026-06-30'))).toBe(true);
    });

    it('should match middle date', () => {
      const override = createOverride('2026-06-01', '2026-06-30');
      expect(isDateInOverride(override, new Date('2026-06-15'))).toBe(true);
    });

    it('should not match before range', () => {
      const override = createOverride('2026-06-01', '2026-06-30');
      expect(isDateInOverride(override, new Date('2026-05-31'))).toBe(false);
    });

    it('should not match after range', () => {
      const override = createOverride('2026-06-01', '2026-06-30');
      expect(isDateInOverride(override, new Date('2026-07-01'))).toBe(false);
    });
  });

  describe('yearly recurrence', () => {
    it('should match same month and day in current year', () => {
      const override = createOverride('2025-12-25', null, 'yearly');
      expect(isDateInOverride(override, new Date('2026-12-25'))).toBe(true);
    });

    it('should match same month and day in future year', () => {
      const override = createOverride('2020-12-25', null, 'yearly');
      expect(isDateInOverride(override, new Date('2030-12-25'))).toBe(true);
    });

    it('should not match different month', () => {
      const override = createOverride('2025-12-25', null, 'yearly');
      expect(isDateInOverride(override, new Date('2026-11-25'))).toBe(false);
    });

    it('should not match different day', () => {
      const override = createOverride('2025-12-25', null, 'yearly');
      expect(isDateInOverride(override, new Date('2026-12-24'))).toBe(false);
    });

    it('should handle New Year correctly', () => {
      const override = createOverride('2025-01-01', null, 'yearly');
      expect(isDateInOverride(override, new Date('2026-01-01'))).toBe(true);
      expect(isDateInOverride(override, new Date('2027-01-01'))).toBe(true);
    });

    it('should handle leap year February 29', () => {
      const override = createOverride('2024-02-29', null, 'yearly'); // 2024 is leap year
      // Feb 29, 2028 (next leap year)
      expect(isDateInOverride(override, new Date('2028-02-29'))).toBe(true);
    });
  });
});

describe('getApplicableOverride', () => {
  const createOverride = (
    id: string,
    type: ScheduleOverrideType,
    start: string,
    end: string | null = null,
    priority?: number
  ): ScheduleOverride => ({
    id,
    location_id: 'loc-1',
    override_type: type,
    name: `Override ${id}`,
    description: null,
    date_start: start,
    date_end: end,
    recurrence: 'none',
    is_closed: true,
    hours: null,
    priority: priority ?? getOverridePriority(type),
    event_id: null,
    created_by: null,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  });

  it('should return null when no overrides', () => {
    const result = getApplicableOverride([], new Date('2026-01-15'));
    expect(result).toBeNull();
  });

  it('should return null when no matching overrides', () => {
    const overrides = [
      createOverride('1', 'holiday', '2026-12-25'),
      createOverride('2', 'holiday', '2026-01-01'),
    ];
    const result = getApplicableOverride(overrides, new Date('2026-06-15'));
    expect(result).toBeNull();
  });

  it('should return single matching override', () => {
    const overrides = [createOverride('christmas', 'holiday', '2026-12-25')];
    const result = getApplicableOverride(overrides, new Date('2026-12-25'));
    expect(result?.id).toBe('christmas');
  });

  it('should return highest priority when multiple match', () => {
    const overrides = [
      createOverride('seasonal', 'seasonal', '2026-06-01', '2026-08-31'), // priority 10
      createOverride('special', 'special', '2026-07-15'), // priority 30
    ];
    const result = getApplicableOverride(overrides, new Date('2026-07-15'));
    expect(result?.id).toBe('special');
  });

  it('should prioritize closure over everything', () => {
    const overrides = [
      createOverride('holiday', 'holiday', '2026-12-25'), // priority 20
      createOverride('seasonal', 'seasonal', '2026-12-01', '2026-12-31'), // priority 10
      createOverride('closure', 'closure', '2026-12-25'), // priority 100
    ];
    const result = getApplicableOverride(overrides, new Date('2026-12-25'));
    expect(result?.id).toBe('closure');
  });

  it('should handle overlapping date ranges', () => {
    const overrides = [
      createOverride('summer', 'seasonal', '2026-06-01', '2026-08-31'), // priority 10
      createOverride('july-special', 'special', '2026-07-01', '2026-07-31'), // priority 30
    ];

    // In June, only summer applies
    const juneResult = getApplicableOverride(overrides, new Date('2026-06-15'));
    expect(juneResult?.id).toBe('summer');

    // In July, special takes priority
    const julyResult = getApplicableOverride(overrides, new Date('2026-07-15'));
    expect(julyResult?.id).toBe('july-special');

    // In August, back to summer
    const augResult = getApplicableOverride(overrides, new Date('2026-08-15'));
    expect(augResult?.id).toBe('summer');
  });

  it('should handle custom priorities', () => {
    const overrides = [
      createOverride('seasonal', 'seasonal', '2026-06-01', '2026-08-31', 50), // custom priority 50
      createOverride('holiday', 'holiday', '2026-07-04', undefined, 40), // custom priority 40
    ];
    const result = getApplicableOverride(overrides, new Date('2026-07-04'));
    expect(result?.id).toBe('seasonal'); // Higher custom priority wins
  });
});

// ============================================
// CONSTANTS
// ============================================

describe('DEFAULT_OPERATING_HOURS', () => {
  it('should have all 7 days defined', () => {
    expect(DEFAULT_OPERATING_HOURS).toHaveProperty('mon');
    expect(DEFAULT_OPERATING_HOURS).toHaveProperty('tue');
    expect(DEFAULT_OPERATING_HOURS).toHaveProperty('wed');
    expect(DEFAULT_OPERATING_HOURS).toHaveProperty('thu');
    expect(DEFAULT_OPERATING_HOURS).toHaveProperty('fri');
    expect(DEFAULT_OPERATING_HOURS).toHaveProperty('sat');
    expect(DEFAULT_OPERATING_HOURS).toHaveProperty('sun');
  });

  it('should have no null days (all open)', () => {
    expect(DEFAULT_OPERATING_HOURS.mon).not.toBeNull();
    expect(DEFAULT_OPERATING_HOURS.tue).not.toBeNull();
    expect(DEFAULT_OPERATING_HOURS.wed).not.toBeNull();
    expect(DEFAULT_OPERATING_HOURS.thu).not.toBeNull();
    expect(DEFAULT_OPERATING_HOURS.fri).not.toBeNull();
    expect(DEFAULT_OPERATING_HOURS.sat).not.toBeNull();
    expect(DEFAULT_OPERATING_HOURS.sun).not.toBeNull();
  });

  it('should have consistent weekday hours (Mon-Thu)', () => {
    expect(DEFAULT_OPERATING_HOURS.mon).toEqual(DEFAULT_OPERATING_HOURS.tue);
    expect(DEFAULT_OPERATING_HOURS.tue).toEqual(DEFAULT_OPERATING_HOURS.wed);
    expect(DEFAULT_OPERATING_HOURS.wed).toEqual(DEFAULT_OPERATING_HOURS.thu);
  });

  it('should open at 09:00 on weekdays', () => {
    expect(DEFAULT_OPERATING_HOURS.mon?.open).toBe('09:00');
    expect(DEFAULT_OPERATING_HOURS.tue?.open).toBe('09:00');
    expect(DEFAULT_OPERATING_HOURS.wed?.open).toBe('09:00');
    expect(DEFAULT_OPERATING_HOURS.thu?.open).toBe('09:00');
  });

  it('should have extended Friday hours', () => {
    expect(DEFAULT_OPERATING_HOURS.fri?.close).toBe('23:00');
  });

  it('should open later on weekend', () => {
    expect(DEFAULT_OPERATING_HOURS.sat?.open).toBe('10:00');
    expect(DEFAULT_OPERATING_HOURS.sun?.open).toBe('10:00');
  });

  it('should close at 22:00 on regular weekdays', () => {
    expect(DEFAULT_OPERATING_HOURS.mon?.close).toBe('22:00');
    expect(DEFAULT_OPERATING_HOURS.thu?.close).toBe('22:00');
  });

  it('should close earlier on Sunday', () => {
    expect(DEFAULT_OPERATING_HOURS.sun?.close).toBe('21:00');
  });

  it('should be valid time format (HH:MM)', () => {
    const timePattern = /^\d{2}:\d{2}$/;
    Object.values(DEFAULT_OPERATING_HOURS).forEach((day) => {
      if (day) {
        expect(day.open).toMatch(timePattern);
        expect(day.close).toMatch(timePattern);
      }
    });
  });
});

// ============================================
// INTEGRATION / REAL-WORLD SCENARIOS
// ============================================

describe('Real-world scheduling scenarios', () => {
  const createOverride = (
    id: string,
    type: ScheduleOverrideType,
    start: string,
    end: string | null = null,
    recurrence: 'none' | 'yearly' = 'none',
    isClosed: boolean = true,
    hours: { open: string; close: string } | null = null
  ): ScheduleOverride => ({
    id,
    location_id: 'loc-1',
    override_type: type,
    name: `Override ${id}`,
    description: null,
    date_start: start,
    date_end: end,
    recurrence,
    is_closed: isClosed,
    hours,
    priority: getOverridePriority(type),
    event_id: null,
    created_by: null,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  });

  it('should handle restaurant with holidays and seasonal hours', () => {
    const overrides = [
      // Yearly holidays
      createOverride('christmas', 'holiday', '2026-12-25', null, 'yearly'),
      createOverride('new-years', 'holiday', '2026-01-01', null, 'yearly'),
      // Summer extended hours
      createOverride('summer', 'seasonal', '2026-06-01', '2026-08-31', 'none', false, {
        open: '08:00',
        close: '00:00',
      }),
    ];

    // Regular day - no override
    expect(getApplicableOverride(overrides, new Date('2026-03-15'))).toBeNull();

    // Christmas - closed
    const christmas = getApplicableOverride(overrides, new Date('2026-12-25'));
    expect(christmas?.id).toBe('christmas');
    expect(christmas?.is_closed).toBe(true);

    // Summer day - extended hours
    const summer = getApplicableOverride(overrides, new Date('2026-07-15'));
    expect(summer?.id).toBe('summer');
    expect(summer?.hours?.close).toBe('00:00');
  });

  it('should handle emergency closure during event', () => {
    const overrides = [
      createOverride('festival', 'event', '2026-08-01', '2026-08-03', 'none', false, {
        open: '10:00',
        close: '02:00',
      }),
      createOverride('emergency', 'closure', '2026-08-02'), // Emergency on day 2
    ];

    // Day 1 - festival
    const day1 = getApplicableOverride(overrides, new Date('2026-08-01'));
    expect(day1?.id).toBe('festival');

    // Day 2 - emergency closure takes priority
    const day2 = getApplicableOverride(overrides, new Date('2026-08-02'));
    expect(day2?.id).toBe('emergency');
    expect(day2?.is_closed).toBe(true);

    // Day 3 - back to festival
    const day3 = getApplicableOverride(overrides, new Date('2026-08-03'));
    expect(day3?.id).toBe('festival');
  });

  it('should calculate priority correctly for complex scenarios', () => {
    // Closure > Special/Event > Holiday > Seasonal
    expect(getOverridePriority('closure')).toBeGreaterThan(getOverridePriority('special'));
    expect(getOverridePriority('special')).toBeGreaterThan(getOverridePriority('holiday'));
    expect(getOverridePriority('holiday')).toBeGreaterThan(getOverridePriority('seasonal'));
  });

  it('should handle year-round weekly pattern with holidays', () => {
    // Check if holiday is detected on recurring date
    const override = createOverride('easter-monday', 'holiday', '2025-04-21', null, 'yearly');

    // Easter Monday 2026 (April 6, 2026) - different date!
    // But our yearly recurrence matches month+day, not actual Easter
    // So April 21 would match
    expect(isDateInOverride(override, new Date('2026-04-21'))).toBe(true);
    expect(isDateInOverride(override, new Date('2027-04-21'))).toBe(true);
  });
});

describe('Edge cases', () => {
  it('should handle empty override list gracefully', () => {
    const result = getApplicableOverride([], new Date());
    expect(result).toBeNull();
  });

  it('should handle override with same start and end date', () => {
    const override: ScheduleOverride = {
      id: 'single-day',
      location_id: 'loc-1',
      override_type: 'special',
      name: 'Single Day Event',
      description: null,
      date_start: '2026-03-15',
      date_end: '2026-03-15', // Same as start
      recurrence: 'none',
      is_closed: false,
      hours: { open: '18:00', close: '23:00' },
      priority: 30,
      event_id: null,
      created_by: null,
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
    };

    expect(isDateInOverride(override, new Date('2026-03-15'))).toBe(true);
    expect(isDateInOverride(override, new Date('2026-03-14'))).toBe(false);
    expect(isDateInOverride(override, new Date('2026-03-16'))).toBe(false);
  });

  it('should handle multiple overrides with same priority', () => {
    const createOverride = (id: string): ScheduleOverride => ({
      id,
      location_id: 'loc-1',
      override_type: 'special',
      name: `Override ${id}`,
      description: null,
      date_start: '2026-03-15',
      date_end: null,
      recurrence: 'none',
      is_closed: true,
      hours: null,
      priority: 30, // Same priority
      event_id: null,
      created_by: null,
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
    });

    const overrides = [createOverride('a'), createOverride('b'), createOverride('c')];

    // Should return one of them (first after sorting)
    const result = getApplicableOverride(overrides, new Date('2026-03-15'));
    expect(result).not.toBeNull();
    expect(['a', 'b', 'c']).toContain(result?.id);
  });

  it('should handle timezone edge cases', () => {
    // Create date at midnight UTC
    const dateUTC = new Date('2026-03-15T00:00:00Z');

    const override: ScheduleOverride = {
      id: 'test',
      location_id: 'loc-1',
      override_type: 'holiday',
      name: 'Test',
      description: null,
      date_start: '2026-03-15',
      date_end: null,
      recurrence: 'none',
      is_closed: true,
      hours: null,
      priority: 20,
      event_id: null,
      created_by: null,
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
    };

    // The function uses toISOString which is UTC-based
    expect(isDateInOverride(override, dateUTC)).toBe(true);
  });
});
