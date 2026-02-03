/**
 * Centralized Date & Time Formatting
 *
 * Provides consistent date formatting across all GUDBRO verticals.
 * Uses native Intl APIs — no external dependencies.
 *
 * Three main functions cover all display use cases:
 *
 * 1. formatDate(input, options?)
 *    - Formats a date for display: "Jan 5, 2026"
 *    - Accepts ISO string, Date, or timestamp
 *
 * 2. formatDateTime(input, options?)
 *    - Includes time: "Jan 5, 2026, 2:30 PM"
 *
 * 3. formatRelativeDate(input, locale?)
 *    - Relative: "2 hours ago", "Yesterday", "3 days ago"
 */

// --- Types ---

type DateInput = string | Date | number;

type DateStyle = 'short' | 'medium' | 'long' | 'full';

interface FormatDateOptions {
  /** Locale (e.g., 'en-US', 'it-IT'). Defaults to 'en-US'. */
  locale?: string;
  /** Predefined style. Defaults to 'medium'. */
  style?: DateStyle;
}

interface FormatDateTimeOptions extends FormatDateOptions {
  /** Whether to include seconds. Defaults to false. */
  showSeconds?: boolean;
}

// --- Style Presets ---

const DATE_STYLES: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  short: { month: 'short', day: 'numeric' },
  medium: { month: 'short', day: 'numeric', year: 'numeric' },
  long: { month: 'long', day: 'numeric', year: 'numeric' },
  full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
};

// --- Internal Helpers ---

function toDate(input: DateInput): Date {
  if (input instanceof Date) return input;
  if (typeof input === 'number') return new Date(input);
  return new Date(input);
}

const DEFAULT_LOCALE = 'en-US';

// --- Main Functions ---

/**
 * Format a date for display.
 *
 * @param input - ISO string, Date object, or Unix timestamp (ms)
 * @param options - Locale and style overrides
 * @returns Formatted date string
 *
 * @example
 * ```ts
 * formatDate('2026-01-05')                     // "Jan 5, 2026"
 * formatDate('2026-01-05', { style: 'short' }) // "Jan 5"
 * formatDate('2026-01-05', { style: 'long' })  // "January 5, 2026"
 * formatDate('2026-01-05', { style: 'full' })  // "Monday, January 5, 2026"
 * formatDate(new Date(), { locale: 'it-IT' })  // "5 gen 2026"
 * formatDate(null)                              // ""
 * ```
 */
export function formatDate(
  input: DateInput | null | undefined,
  options?: FormatDateOptions
): string {
  if (input == null) return '';

  const date = toDate(input);
  if (isNaN(date.getTime())) return '';

  const locale = options?.locale ?? DEFAULT_LOCALE;
  const style = options?.style ?? 'medium';

  return new Intl.DateTimeFormat(locale, DATE_STYLES[style]).format(date);
}

/**
 * Format a date with time for display.
 *
 * @param input - ISO string, Date object, or Unix timestamp (ms)
 * @param options - Locale, style, and time overrides
 * @returns Formatted datetime string
 *
 * @example
 * ```ts
 * formatDateTime('2026-01-05T14:30:00Z')                  // "Jan 5, 2026, 2:30 PM"
 * formatDateTime('2026-01-05T14:30:00Z', { style: 'short' }) // "Jan 5, 2:30 PM"
 * formatDateTime(new Date(), { locale: 'it-IT' })          // "5 gen 2026, 14:30"
 * formatDateTime(null)                                      // ""
 * ```
 */
export function formatDateTime(
  input: DateInput | null | undefined,
  options?: FormatDateTimeOptions
): string {
  if (input == null) return '';

  const date = toDate(input);
  if (isNaN(date.getTime())) return '';

  const locale = options?.locale ?? DEFAULT_LOCALE;
  const style = options?.style ?? 'medium';

  const dateOpts = DATE_STYLES[style];
  const timeOpts: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    ...(options?.showSeconds ? { second: '2-digit' } : {}),
  };

  return new Intl.DateTimeFormat(locale, { ...dateOpts, ...timeOpts }).format(date);
}

/**
 * Format a date relative to now.
 *
 * Returns human-readable relative time:
 * - Under 1 minute: "just now"
 * - Under 1 hour: "5 minutes ago"
 * - Under 24 hours: "3 hours ago"
 * - Under 7 days: "2 days ago"
 * - Older: falls back to formatDate with 'medium' style
 *
 * @param input - ISO string, Date object, or Unix timestamp (ms)
 * @param locale - Locale for output (e.g., 'it-IT' for "2 ore fa")
 * @returns Relative time string
 *
 * @example
 * ```ts
 * formatRelativeDate(new Date(Date.now() - 30_000))       // "just now"
 * formatRelativeDate(new Date(Date.now() - 3_600_000))    // "1 hour ago"
 * formatRelativeDate(new Date(Date.now() - 86_400_000))   // "1 day ago"
 * formatRelativeDate('2025-01-01', 'it-IT')               // "1 gen 2025"
 * formatRelativeDate(null)                                  // ""
 * ```
 */
export function formatRelativeDate(input: DateInput | null | undefined, locale?: string): string {
  if (input == null) return '';

  const date = toDate(input);
  if (isNaN(date.getTime())) return '';

  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  const loc = locale ?? DEFAULT_LOCALE;
  const rtf = new Intl.RelativeTimeFormat(loc, { numeric: 'auto' });

  if (diffSec < 60) return rtf.format(0, 'second'); // "now" / "adesso"
  if (diffMin < 60) return rtf.format(-diffMin, 'minute');
  if (diffHours < 24) return rtf.format(-diffHours, 'hour');
  if (diffDays < 7) return rtf.format(-diffDays, 'day');

  // Older than a week: use absolute date
  return formatDate(date, { locale: loc, style: 'medium' });
}
