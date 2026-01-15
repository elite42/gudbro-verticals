/**
 * Timezone Utilities for Reservations
 *
 * Handles conversion between customer timezone and restaurant timezone.
 * Uses date-fns-tz for proper IANA timezone support.
 */

import { formatInTimeZone, toZonedTime, fromZonedTime } from 'date-fns-tz';
import { format, parse } from 'date-fns';

// Default timezone for Vietnam (GUDBRO primary market)
export const DEFAULT_TIMEZONE = 'Asia/Ho_Chi_Minh';

/**
 * Convert a date/time from customer's timezone to restaurant's timezone
 */
export function convertToLocationTime(
  date: string,
  time: string,
  customerTz: string,
  locationTz: string
): { date: string; time: string } {
  // Parse customer's local datetime
  const customerDateTimeStr = `${date}T${time}`;
  const customerDateTime = fromZonedTime(customerDateTimeStr, customerTz);

  // Convert to location timezone
  const locationDateTime = toZonedTime(customerDateTime, locationTz);

  return {
    date: formatInTimeZone(locationDateTime, locationTz, 'yyyy-MM-dd'),
    time: formatInTimeZone(locationDateTime, locationTz, 'HH:mm'),
  };
}

/**
 * Convert a date/time from restaurant's timezone to customer's timezone
 * Used for displaying reservation times to customers
 */
export function convertToCustomerTime(
  date: string,
  time: string,
  locationTz: string,
  customerTz: string
): { date: string; time: string } {
  // Parse location's local datetime
  const locationDateTimeStr = `${date}T${time}`;
  const locationDateTime = fromZonedTime(locationDateTimeStr, locationTz);

  // Convert to customer timezone
  const customerDateTime = toZonedTime(locationDateTime, customerTz);

  return {
    date: formatInTimeZone(customerDateTime, customerTz, 'yyyy-MM-dd'),
    time: formatInTimeZone(customerDateTime, customerTz, 'HH:mm'),
  };
}

/**
 * Format a date/time for display in a specific timezone
 */
export function formatForDisplay(
  date: string,
  time: string,
  timezone: string,
  locale: string = 'en'
): string {
  const dateTimeStr = `${date}T${time}`;
  const dateTime = fromZonedTime(dateTimeStr, timezone);

  // Format based on locale
  const dateFormat = locale === 'vi' ? 'dd/MM/yyyy' : 'MMM d, yyyy';
  const timeFormat = 'HH:mm';

  return `${formatInTimeZone(dateTime, timezone, dateFormat)} ${formatInTimeZone(dateTime, timezone, timeFormat)}`;
}

/**
 * Get the current time in a specific timezone
 */
export function getCurrentTimeInZone(timezone: string): { date: string; time: string } {
  const now = new Date();
  const zonedTime = toZonedTime(now, timezone);

  return {
    date: formatInTimeZone(zonedTime, timezone, 'yyyy-MM-dd'),
    time: formatInTimeZone(zonedTime, timezone, 'HH:mm'),
  };
}

/**
 * Check if a datetime has passed in a specific timezone
 */
export function hasDateTimePassed(date: string, time: string, timezone: string): boolean {
  const dateTimeStr = `${date}T${time}`;
  const targetDateTime = fromZonedTime(dateTimeStr, timezone);
  const now = new Date();

  return now > targetDateTime;
}

/**
 * Get timezone offset string (e.g., "+07:00" for Vietnam)
 */
export function getTimezoneOffset(timezone: string): string {
  const now = new Date();
  const zonedTime = toZonedTime(now, timezone);
  return formatInTimeZone(zonedTime, timezone, 'xxx');
}

/**
 * Validate IANA timezone identifier
 */
export function isValidTimezone(timezone: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
}

/**
 * Detect customer's timezone from browser (client-side only)
 */
export function detectCustomerTimezone(): string {
  if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
    const resolved = Intl.DateTimeFormat().resolvedOptions();
    return resolved.timeZone || DEFAULT_TIMEZONE;
  }
  return DEFAULT_TIMEZONE;
}
