/**
 * Operating Hours Tests
 *
 * Tests for operating hours configuration, day management,
 * time options, and preset schedules.
 */

import { describe, it, expect } from 'vitest';

// ============================================================================
// TYPE DEFINITIONS (Mirrored from component)
// ============================================================================

interface DayHours {
  open: string;
  close: string;
}

interface OperatingHours {
  mon: DayHours | null;
  tue: DayHours | null;
  wed: DayHours | null;
  thu: DayHours | null;
  fri: DayHours | null;
  sat: DayHours | null;
  sun: DayHours | null;
}

type DayKey = keyof OperatingHours;

// ============================================================================
// CONSTANTS (Mirrored from component)
// ============================================================================

const DAYS: { key: DayKey; label: string; shortLabel: string }[] = [
  { key: 'mon', label: 'Monday', shortLabel: 'Mon' },
  { key: 'tue', label: 'Tuesday', shortLabel: 'Tue' },
  { key: 'wed', label: 'Wednesday', shortLabel: 'Wed' },
  { key: 'thu', label: 'Thursday', shortLabel: 'Thu' },
  { key: 'fri', label: 'Friday', shortLabel: 'Fri' },
  { key: 'sat', label: 'Saturday', shortLabel: 'Sat' },
  { key: 'sun', label: 'Sunday', shortLabel: 'Sun' },
];

const DEFAULT_HOURS: DayHours = { open: '09:00', close: '22:00' };

const EMPTY_OPERATING_HOURS: OperatingHours = {
  mon: null,
  tue: null,
  wed: null,
  thu: null,
  fri: null,
  sat: null,
  sun: null,
};

// Generate time options in 30-minute increments
const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2);
  const minutes = i % 2 === 0 ? '00' : '30';
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
});

// ============================================================================
// PRESET SCHEDULES
// ============================================================================

const TYPICAL_RESTAURANT: OperatingHours = {
  mon: null, // Closed Monday
  tue: { open: '12:00', close: '22:00' },
  wed: { open: '12:00', close: '22:00' },
  thu: { open: '12:00', close: '22:00' },
  fri: { open: '12:00', close: '23:00' },
  sat: { open: '12:00', close: '23:00' },
  sun: { open: '12:00', close: '21:00' },
};

const TYPICAL_CAFE: OperatingHours = {
  mon: { open: '07:00', close: '19:00' },
  tue: { open: '07:00', close: '19:00' },
  wed: { open: '07:00', close: '19:00' },
  thu: { open: '07:00', close: '19:00' },
  fri: { open: '07:00', close: '19:00' },
  sat: { open: '08:00', close: '18:00' },
  sun: { open: '08:00', close: '18:00' },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Toggle day open/closed
 */
function toggleDay(hours: OperatingHours, day: DayKey): OperatingHours {
  const newHours = { ...hours };
  if (newHours[day]) {
    newHours[day] = null;
  } else {
    newHours[day] = { ...DEFAULT_HOURS };
  }
  return newHours;
}

/**
 * Update specific day hours
 */
function updateDayHours(
  hours: OperatingHours,
  day: DayKey,
  field: 'open' | 'close',
  time: string
): OperatingHours {
  if (!hours[day]) return hours;
  const newHours = { ...hours };
  newHours[day] = { ...hours[day]!, [field]: time };
  return newHours;
}

/**
 * Copy hours to all days
 */
function copyToAll(hours: OperatingHours, sourceDay: DayKey): OperatingHours {
  const sourceHours = hours[sourceDay];
  if (!sourceHours) return hours;

  const newHours = { ...hours };
  DAYS.forEach(({ key }) => {
    if (key !== sourceDay) {
      newHours[key] = { ...sourceHours };
    }
  });
  return newHours;
}

/**
 * Copy hours to weekdays only
 */
function copyToWeekdays(hours: OperatingHours, sourceDay: DayKey): OperatingHours {
  const sourceHours = hours[sourceDay];
  if (!sourceHours) return hours;

  const weekdays: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
  const newHours = { ...hours };
  weekdays.forEach((key) => {
    newHours[key] = { ...sourceHours };
  });
  return newHours;
}

/**
 * Count open days
 */
function countOpenDays(hours: OperatingHours): number {
  return DAYS.filter(({ key }) => hours[key] !== null).length;
}

/**
 * Check if a day is open
 */
function isDayOpen(hours: OperatingHours, day: DayKey): boolean {
  return hours[day] !== null;
}

/**
 * Get hours for a day (or null if closed)
 */
function getDayHours(hours: OperatingHours, day: DayKey): DayHours | null {
  return hours[day];
}

/**
 * Validate time format (HH:MM)
 */
function isValidTime(time: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
}

/**
 * Compare two times (returns -1, 0, or 1)
 */
function compareTimes(time1: string, time2: string): number {
  if (time1 < time2) return -1;
  if (time1 > time2) return 1;
  return 0;
}

/**
 * Check if hours are valid (close after open)
 */
function isValidDayHours(dayHours: DayHours): boolean {
  return compareTimes(dayHours.open, dayHours.close) < 0;
}

/**
 * Calculate total weekly hours
 */
function calculateWeeklyHours(hours: OperatingHours): number {
  let totalMinutes = 0;

  DAYS.forEach(({ key }) => {
    const dayHours = hours[key];
    if (dayHours) {
      const [openHours, openMins] = dayHours.open.split(':').map(Number);
      const [closeHours, closeMins] = dayHours.close.split(':').map(Number);
      const openTotal = openHours * 60 + openMins;
      const closeTotal = closeHours * 60 + closeMins;
      totalMinutes += closeTotal - openTotal;
    }
  });

  return totalMinutes / 60;
}

/**
 * Format hours for display
 */
function formatHoursRange(dayHours: DayHours): string {
  return `${dayHours.open} - ${dayHours.close}`;
}

// ============================================================================
// TESTS
// ============================================================================

describe('Operating Hours', () => {
  // ==========================================================================
  // DAYS Constant Tests
  // ==========================================================================

  describe('DAYS', () => {
    it('should have 7 days', () => {
      expect(DAYS).toHaveLength(7);
    });

    it('should start with Monday', () => {
      expect(DAYS[0].key).toBe('mon');
      expect(DAYS[0].label).toBe('Monday');
    });

    it('should end with Sunday', () => {
      expect(DAYS[6].key).toBe('sun');
      expect(DAYS[6].label).toBe('Sunday');
    });

    it('should have correct day order', () => {
      const expectedOrder: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
      expect(DAYS.map((d) => d.key)).toEqual(expectedOrder);
    });

    it('should have short labels for all days', () => {
      DAYS.forEach((day) => {
        expect(day.shortLabel.length).toBe(3);
      });
    });

    it('should have unique keys', () => {
      const keys = DAYS.map((d) => d.key);
      const uniqueKeys = new Set(keys);
      expect(uniqueKeys.size).toBe(7);
    });
  });

  // ==========================================================================
  // DEFAULT_HOURS Tests
  // ==========================================================================

  describe('DEFAULT_HOURS', () => {
    it('should have valid open time', () => {
      expect(DEFAULT_HOURS.open).toBe('09:00');
      expect(isValidTime(DEFAULT_HOURS.open)).toBe(true);
    });

    it('should have valid close time', () => {
      expect(DEFAULT_HOURS.close).toBe('22:00');
      expect(isValidTime(DEFAULT_HOURS.close)).toBe(true);
    });

    it('should be valid hours (close after open)', () => {
      expect(isValidDayHours(DEFAULT_HOURS)).toBe(true);
    });

    it('should represent 13 hours of operation', () => {
      const [openH] = DEFAULT_HOURS.open.split(':').map(Number);
      const [closeH] = DEFAULT_HOURS.close.split(':').map(Number);
      expect(closeH - openH).toBe(13);
    });
  });

  // ==========================================================================
  // EMPTY_OPERATING_HOURS Tests
  // ==========================================================================

  describe('EMPTY_OPERATING_HOURS', () => {
    it('should have all days null', () => {
      DAYS.forEach(({ key }) => {
        expect(EMPTY_OPERATING_HOURS[key]).toBeNull();
      });
    });

    it('should have 0 open days', () => {
      expect(countOpenDays(EMPTY_OPERATING_HOURS)).toBe(0);
    });
  });

  // ==========================================================================
  // TIME_OPTIONS Tests
  // ==========================================================================

  describe('TIME_OPTIONS', () => {
    it('should have 48 options (24 hours × 2)', () => {
      expect(TIME_OPTIONS).toHaveLength(48);
    });

    it('should start at 00:00', () => {
      expect(TIME_OPTIONS[0]).toBe('00:00');
    });

    it('should end at 23:30', () => {
      expect(TIME_OPTIONS[47]).toBe('23:30');
    });

    it('should have 30-minute increments', () => {
      expect(TIME_OPTIONS[1]).toBe('00:30');
      expect(TIME_OPTIONS[2]).toBe('01:00');
      expect(TIME_OPTIONS[3]).toBe('01:30');
    });

    it('should have valid time format for all options', () => {
      TIME_OPTIONS.forEach((time) => {
        expect(isValidTime(time)).toBe(true);
      });
    });

    it('should include common meal times', () => {
      expect(TIME_OPTIONS).toContain('07:00'); // Breakfast
      expect(TIME_OPTIONS).toContain('12:00'); // Lunch
      expect(TIME_OPTIONS).toContain('19:00'); // Dinner
      expect(TIME_OPTIONS).toContain('22:00'); // Late closing
    });

    it('should have padded hours', () => {
      expect(TIME_OPTIONS).toContain('08:00');
      expect(TIME_OPTIONS).toContain('09:30');
      expect(TIME_OPTIONS).not.toContain('8:00');
      expect(TIME_OPTIONS).not.toContain('9:30');
    });
  });

  // ==========================================================================
  // TYPICAL_RESTAURANT Tests
  // ==========================================================================

  describe('TYPICAL_RESTAURANT', () => {
    it('should be closed on Monday', () => {
      expect(TYPICAL_RESTAURANT.mon).toBeNull();
    });

    it('should be open Tuesday through Sunday', () => {
      expect(TYPICAL_RESTAURANT.tue).not.toBeNull();
      expect(TYPICAL_RESTAURANT.wed).not.toBeNull();
      expect(TYPICAL_RESTAURANT.thu).not.toBeNull();
      expect(TYPICAL_RESTAURANT.fri).not.toBeNull();
      expect(TYPICAL_RESTAURANT.sat).not.toBeNull();
      expect(TYPICAL_RESTAURANT.sun).not.toBeNull();
    });

    it('should have 6 open days', () => {
      expect(countOpenDays(TYPICAL_RESTAURANT)).toBe(6);
    });

    it('should open at 12:00 on weekdays', () => {
      expect(TYPICAL_RESTAURANT.tue?.open).toBe('12:00');
      expect(TYPICAL_RESTAURANT.wed?.open).toBe('12:00');
      expect(TYPICAL_RESTAURANT.thu?.open).toBe('12:00');
    });

    it('should close later on weekends', () => {
      expect(TYPICAL_RESTAURANT.fri?.close).toBe('23:00');
      expect(TYPICAL_RESTAURANT.sat?.close).toBe('23:00');
      expect(TYPICAL_RESTAURANT.sun?.close).toBe('21:00');
    });

    it('should have valid hours for all open days', () => {
      DAYS.forEach(({ key }) => {
        const hours = TYPICAL_RESTAURANT[key];
        if (hours) {
          expect(isValidDayHours(hours)).toBe(true);
        }
      });
    });
  });

  // ==========================================================================
  // TYPICAL_CAFE Tests
  // ==========================================================================

  describe('TYPICAL_CAFE', () => {
    it('should be open all 7 days', () => {
      expect(countOpenDays(TYPICAL_CAFE)).toBe(7);
    });

    it('should open early on weekdays', () => {
      expect(TYPICAL_CAFE.mon?.open).toBe('07:00');
      expect(TYPICAL_CAFE.tue?.open).toBe('07:00');
      expect(TYPICAL_CAFE.wed?.open).toBe('07:00');
      expect(TYPICAL_CAFE.thu?.open).toBe('07:00');
      expect(TYPICAL_CAFE.fri?.open).toBe('07:00');
    });

    it('should open later on weekends', () => {
      expect(TYPICAL_CAFE.sat?.open).toBe('08:00');
      expect(TYPICAL_CAFE.sun?.open).toBe('08:00');
    });

    it('should close earlier on weekends', () => {
      expect(TYPICAL_CAFE.sat?.close).toBe('18:00');
      expect(TYPICAL_CAFE.sun?.close).toBe('18:00');
    });

    it('should have consistent weekday hours', () => {
      const weekdays: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
      weekdays.forEach((day) => {
        expect(TYPICAL_CAFE[day]?.open).toBe('07:00');
        expect(TYPICAL_CAFE[day]?.close).toBe('19:00');
      });
    });
  });

  // ==========================================================================
  // toggleDay Tests
  // ==========================================================================

  describe('toggleDay', () => {
    it('should open a closed day', () => {
      const result = toggleDay(EMPTY_OPERATING_HOURS, 'mon');
      expect(result.mon).toEqual(DEFAULT_HOURS);
    });

    it('should close an open day', () => {
      const hours: OperatingHours = {
        ...EMPTY_OPERATING_HOURS,
        mon: { open: '09:00', close: '22:00' },
      };
      const result = toggleDay(hours, 'mon');
      expect(result.mon).toBeNull();
    });

    it('should not affect other days', () => {
      const hours: OperatingHours = {
        ...EMPTY_OPERATING_HOURS,
        tue: { open: '10:00', close: '20:00' },
      };
      const result = toggleDay(hours, 'mon');
      expect(result.tue).toEqual({ open: '10:00', close: '20:00' });
    });

    it('should return new object (immutable)', () => {
      const original = { ...EMPTY_OPERATING_HOURS };
      const result = toggleDay(original, 'mon');
      expect(result).not.toBe(original);
    });
  });

  // ==========================================================================
  // updateDayHours Tests
  // ==========================================================================

  describe('updateDayHours', () => {
    it('should update open time', () => {
      const hours: OperatingHours = {
        ...EMPTY_OPERATING_HOURS,
        mon: { open: '09:00', close: '22:00' },
      };
      const result = updateDayHours(hours, 'mon', 'open', '08:00');
      expect(result.mon?.open).toBe('08:00');
      expect(result.mon?.close).toBe('22:00');
    });

    it('should update close time', () => {
      const hours: OperatingHours = {
        ...EMPTY_OPERATING_HOURS,
        mon: { open: '09:00', close: '22:00' },
      };
      const result = updateDayHours(hours, 'mon', 'close', '23:00');
      expect(result.mon?.open).toBe('09:00');
      expect(result.mon?.close).toBe('23:00');
    });

    it('should not update closed day', () => {
      const hours = { ...EMPTY_OPERATING_HOURS };
      const result = updateDayHours(hours, 'mon', 'open', '08:00');
      expect(result.mon).toBeNull();
    });

    it('should not affect other days', () => {
      const hours: OperatingHours = {
        ...EMPTY_OPERATING_HOURS,
        mon: { open: '09:00', close: '22:00' },
        tue: { open: '10:00', close: '20:00' },
      };
      const result = updateDayHours(hours, 'mon', 'open', '08:00');
      expect(result.tue).toEqual({ open: '10:00', close: '20:00' });
    });
  });

  // ==========================================================================
  // copyToAll Tests
  // ==========================================================================

  describe('copyToAll', () => {
    it('should copy source day hours to all other days', () => {
      const hours: OperatingHours = {
        ...EMPTY_OPERATING_HOURS,
        mon: { open: '10:00', close: '20:00' },
      };
      const result = copyToAll(hours, 'mon');

      DAYS.forEach(({ key }) => {
        expect(result[key]).toEqual({ open: '10:00', close: '20:00' });
      });
    });

    it('should not modify if source day is closed', () => {
      const hours: OperatingHours = {
        ...EMPTY_OPERATING_HOURS,
        tue: { open: '09:00', close: '22:00' },
      };
      const result = copyToAll(hours, 'mon');
      expect(result).toEqual(hours);
    });

    it('should overwrite existing hours on other days', () => {
      const hours: OperatingHours = {
        ...EMPTY_OPERATING_HOURS,
        mon: { open: '10:00', close: '20:00' },
        tue: { open: '08:00', close: '18:00' },
      };
      const result = copyToAll(hours, 'mon');
      expect(result.tue).toEqual({ open: '10:00', close: '20:00' });
    });
  });

  // ==========================================================================
  // copyToWeekdays Tests
  // ==========================================================================

  describe('copyToWeekdays', () => {
    it('should copy to Monday through Friday', () => {
      const hours: OperatingHours = {
        ...EMPTY_OPERATING_HOURS,
        mon: { open: '09:00', close: '17:00' },
      };
      const result = copyToWeekdays(hours, 'mon');

      expect(result.mon).toEqual({ open: '09:00', close: '17:00' });
      expect(result.tue).toEqual({ open: '09:00', close: '17:00' });
      expect(result.wed).toEqual({ open: '09:00', close: '17:00' });
      expect(result.thu).toEqual({ open: '09:00', close: '17:00' });
      expect(result.fri).toEqual({ open: '09:00', close: '17:00' });
    });

    it('should not affect Saturday and Sunday', () => {
      const hours: OperatingHours = {
        ...EMPTY_OPERATING_HOURS,
        mon: { open: '09:00', close: '17:00' },
        sat: { open: '10:00', close: '16:00' },
        sun: null,
      };
      const result = copyToWeekdays(hours, 'mon');

      expect(result.sat).toEqual({ open: '10:00', close: '16:00' });
      expect(result.sun).toBeNull();
    });

    it('should not modify if source is closed', () => {
      const hours = { ...EMPTY_OPERATING_HOURS };
      const result = copyToWeekdays(hours, 'mon');
      expect(result).toEqual(hours);
    });
  });

  // ==========================================================================
  // countOpenDays Tests
  // ==========================================================================

  describe('countOpenDays', () => {
    it('should return 0 for all closed', () => {
      expect(countOpenDays(EMPTY_OPERATING_HOURS)).toBe(0);
    });

    it('should return 7 for all open', () => {
      expect(countOpenDays(TYPICAL_CAFE)).toBe(7);
    });

    it('should return 6 for typical restaurant', () => {
      expect(countOpenDays(TYPICAL_RESTAURANT)).toBe(6);
    });

    it('should count correctly for partial week', () => {
      const hours: OperatingHours = {
        ...EMPTY_OPERATING_HOURS,
        mon: { open: '09:00', close: '17:00' },
        wed: { open: '09:00', close: '17:00' },
        fri: { open: '09:00', close: '17:00' },
      };
      expect(countOpenDays(hours)).toBe(3);
    });
  });

  // ==========================================================================
  // isDayOpen Tests
  // ==========================================================================

  describe('isDayOpen', () => {
    it('should return true for open day', () => {
      expect(isDayOpen(TYPICAL_CAFE, 'mon')).toBe(true);
    });

    it('should return false for closed day', () => {
      expect(isDayOpen(TYPICAL_RESTAURANT, 'mon')).toBe(false);
    });

    it('should return false for all days when empty', () => {
      DAYS.forEach(({ key }) => {
        expect(isDayOpen(EMPTY_OPERATING_HOURS, key)).toBe(false);
      });
    });
  });

  // ==========================================================================
  // isValidTime Tests
  // ==========================================================================

  describe('isValidTime', () => {
    it('should validate correct times', () => {
      expect(isValidTime('00:00')).toBe(true);
      expect(isValidTime('09:30')).toBe(true);
      expect(isValidTime('12:00')).toBe(true);
      expect(isValidTime('23:59')).toBe(true);
    });

    it('should reject invalid times', () => {
      expect(isValidTime('24:00')).toBe(false);
      expect(isValidTime('9:30')).toBe(false);
      expect(isValidTime('09:60')).toBe(false);
      expect(isValidTime('25:00')).toBe(false);
      expect(isValidTime('')).toBe(false);
      expect(isValidTime('noon')).toBe(false);
    });
  });

  // ==========================================================================
  // compareTimes Tests
  // ==========================================================================

  describe('compareTimes', () => {
    it('should return -1 when first is earlier', () => {
      expect(compareTimes('09:00', '10:00')).toBe(-1);
      expect(compareTimes('09:00', '09:30')).toBe(-1);
    });

    it('should return 1 when first is later', () => {
      expect(compareTimes('10:00', '09:00')).toBe(1);
      expect(compareTimes('09:30', '09:00')).toBe(1);
    });

    it('should return 0 when equal', () => {
      expect(compareTimes('09:00', '09:00')).toBe(0);
      expect(compareTimes('23:30', '23:30')).toBe(0);
    });
  });

  // ==========================================================================
  // isValidDayHours Tests
  // ==========================================================================

  describe('isValidDayHours', () => {
    it('should validate when close is after open', () => {
      expect(isValidDayHours({ open: '09:00', close: '17:00' })).toBe(true);
      expect(isValidDayHours({ open: '00:00', close: '23:30' })).toBe(true);
    });

    it('should reject when close is before open', () => {
      expect(isValidDayHours({ open: '17:00', close: '09:00' })).toBe(false);
    });

    it('should reject when open equals close', () => {
      expect(isValidDayHours({ open: '09:00', close: '09:00' })).toBe(false);
    });
  });

  // ==========================================================================
  // calculateWeeklyHours Tests
  // ==========================================================================

  describe('calculateWeeklyHours', () => {
    it('should return 0 for all closed', () => {
      expect(calculateWeeklyHours(EMPTY_OPERATING_HOURS)).toBe(0);
    });

    it('should calculate correctly for single day', () => {
      const hours: OperatingHours = {
        ...EMPTY_OPERATING_HOURS,
        mon: { open: '09:00', close: '17:00' }, // 8 hours
      };
      expect(calculateWeeklyHours(hours)).toBe(8);
    });

    it('should calculate correctly for typical cafe', () => {
      // Weekdays: 5 × 12 hours = 60
      // Weekends: 2 × 10 hours = 20
      // Total: 80 hours
      expect(calculateWeeklyHours(TYPICAL_CAFE)).toBe(80);
    });

    it('should calculate correctly for typical restaurant', () => {
      // Tue-Thu: 3 × 10 hours = 30
      // Fri-Sat: 2 × 11 hours = 22
      // Sun: 9 hours
      // Total: 61 hours
      expect(calculateWeeklyHours(TYPICAL_RESTAURANT)).toBe(61);
    });

    it('should handle half hours', () => {
      const hours: OperatingHours = {
        ...EMPTY_OPERATING_HOURS,
        mon: { open: '09:00', close: '17:30' }, // 8.5 hours
      };
      expect(calculateWeeklyHours(hours)).toBe(8.5);
    });
  });

  // ==========================================================================
  // formatHoursRange Tests
  // ==========================================================================

  describe('formatHoursRange', () => {
    it('should format hours with dash', () => {
      expect(formatHoursRange({ open: '09:00', close: '17:00' })).toBe('09:00 - 17:00');
    });

    it('should format early morning hours', () => {
      expect(formatHoursRange({ open: '06:00', close: '14:00' })).toBe('06:00 - 14:00');
    });

    it('should format late night hours', () => {
      expect(formatHoursRange({ open: '18:00', close: '23:30' })).toBe('18:00 - 23:30');
    });
  });

  // ==========================================================================
  // DayHours Interface Tests
  // ==========================================================================

  describe('DayHours Interface', () => {
    it('should have open and close fields', () => {
      const hours: DayHours = { open: '09:00', close: '17:00' };
      expect(hours.open).toBeDefined();
      expect(hours.close).toBeDefined();
    });

    it('should accept any valid time string', () => {
      const earlyMorning: DayHours = { open: '05:00', close: '11:00' };
      const lateNight: DayHours = { open: '20:00', close: '23:30' };
      const allDay: DayHours = { open: '00:00', close: '23:59' };

      expect(earlyMorning.open).toBe('05:00');
      expect(lateNight.close).toBe('23:30');
      expect(allDay.open).toBe('00:00');
    });
  });

  // ==========================================================================
  // OperatingHours Interface Tests
  // ==========================================================================

  describe('OperatingHours Interface', () => {
    it('should have all 7 days', () => {
      const hours: OperatingHours = EMPTY_OPERATING_HOURS;
      expect('mon' in hours).toBe(true);
      expect('tue' in hours).toBe(true);
      expect('wed' in hours).toBe(true);
      expect('thu' in hours).toBe(true);
      expect('fri' in hours).toBe(true);
      expect('sat' in hours).toBe(true);
      expect('sun' in hours).toBe(true);
    });

    it('should allow null for closed days', () => {
      const hours: OperatingHours = {
        mon: null,
        tue: { open: '09:00', close: '17:00' },
        wed: null,
        thu: { open: '09:00', close: '17:00' },
        fri: null,
        sat: null,
        sun: null,
      };

      expect(hours.mon).toBeNull();
      expect(hours.tue).not.toBeNull();
    });
  });

  // ==========================================================================
  // Edge Cases Tests
  // ==========================================================================

  describe('Edge Cases', () => {
    it('should handle midnight opening', () => {
      const hours: DayHours = { open: '00:00', close: '06:00' };
      expect(isValidDayHours(hours)).toBe(true);
      expect(calculateWeeklyHours({ ...EMPTY_OPERATING_HOURS, mon: hours })).toBe(6);
    });

    it('should handle late closing (23:30)', () => {
      const hours: DayHours = { open: '18:00', close: '23:30' };
      expect(isValidDayHours(hours)).toBe(true);
      expect(calculateWeeklyHours({ ...EMPTY_OPERATING_HOURS, fri: hours })).toBe(5.5);
    });

    it('should handle minimum operating hours', () => {
      const hours: DayHours = { open: '12:00', close: '12:30' };
      expect(isValidDayHours(hours)).toBe(true);
      expect(calculateWeeklyHours({ ...EMPTY_OPERATING_HOURS, mon: hours })).toBe(0.5);
    });

    it('should handle maximum operating hours', () => {
      const hours: DayHours = { open: '00:00', close: '23:30' };
      expect(calculateWeeklyHours({ ...EMPTY_OPERATING_HOURS, mon: hours })).toBe(23.5);
    });
  });

  // ==========================================================================
  // Integration Tests
  // ==========================================================================

  describe('Integration', () => {
    it('should handle full workflow: toggle, update, copy', () => {
      let hours = { ...EMPTY_OPERATING_HOURS };

      // Toggle Monday on
      hours = toggleDay(hours, 'mon');
      expect(countOpenDays(hours)).toBe(1);

      // Update Monday hours
      hours = updateDayHours(hours, 'mon', 'open', '08:00');
      hours = updateDayHours(hours, 'mon', 'close', '18:00');
      expect(hours.mon).toEqual({ open: '08:00', close: '18:00' });

      // Copy to weekdays
      hours = copyToWeekdays(hours, 'mon');
      expect(countOpenDays(hours)).toBe(5);

      // Add different weekend hours
      hours = toggleDay(hours, 'sat');
      hours = updateDayHours(hours, 'sat', 'open', '10:00');
      hours = updateDayHours(hours, 'sat', 'close', '16:00');

      expect(countOpenDays(hours)).toBe(6);
      expect(hours.sat).toEqual({ open: '10:00', close: '16:00' });
    });

    it('should preserve immutability through operations', () => {
      const original = { ...TYPICAL_CAFE };
      const modified = toggleDay(original, 'mon');

      expect(original.mon).not.toBeNull();
      expect(modified.mon).toBeNull();
    });
  });
});
