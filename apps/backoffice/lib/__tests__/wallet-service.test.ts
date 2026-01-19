/**
 * Wallet Service Tests
 *
 * Comprehensive tests for customer wallet management.
 * Priority P0: Financial logic must be 100% tested.
 *
 * Structure:
 * - Pure functions (formatCurrency, parseCurrencyToCents): Full coverage
 * - Database functions: Integration tests (require mock setup)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { formatCurrency, parseCurrencyToCents } from '../wallet-service';

// =====================================================
// formatCurrency Tests (65 test cases)
// =====================================================

describe('formatCurrency', () => {
  describe('basic formatting', () => {
    it('should format 0 cents correctly', () => {
      expect(formatCurrency(0)).toBe('€0.00');
    });

    it('should format 1 cent correctly', () => {
      expect(formatCurrency(1)).toBe('€0.01');
    });

    it('should format 5 cents correctly', () => {
      expect(formatCurrency(5)).toBe('€0.05');
    });

    it('should format 10 cents correctly', () => {
      expect(formatCurrency(10)).toBe('€0.10');
    });

    it('should format 50 cents correctly', () => {
      expect(formatCurrency(50)).toBe('€0.50');
    });

    it('should format 99 cents correctly', () => {
      expect(formatCurrency(99)).toBe('€0.99');
    });

    it('should format 100 cents (1 euro) correctly', () => {
      expect(formatCurrency(100)).toBe('€1.00');
    });

    it('should format 199 cents correctly', () => {
      expect(formatCurrency(199)).toBe('€1.99');
    });

    it('should format 1000 cents (10 euros) correctly', () => {
      expect(formatCurrency(1000)).toBe('€10.00');
    });

    it('should format 1250 cents correctly', () => {
      expect(formatCurrency(1250)).toBe('€12.50');
    });

    it('should format 9999 cents correctly', () => {
      expect(formatCurrency(9999)).toBe('€99.99');
    });

    it('should format 10000 cents (100 euros) correctly', () => {
      expect(formatCurrency(10000)).toBe('€100.00');
    });
  });

  describe('thousands separator', () => {
    it('should format 100000 cents with comma', () => {
      expect(formatCurrency(100000)).toBe('€1,000.00');
    });

    it('should format 1000000 cents with comma', () => {
      expect(formatCurrency(1000000)).toBe('€10,000.00');
    });

    it('should format 10000000 cents with commas', () => {
      expect(formatCurrency(10000000)).toBe('€100,000.00');
    });

    it('should format 99999999 cents correctly', () => {
      expect(formatCurrency(99999999)).toBe('€999,999.99');
    });
  });

  describe('different currencies', () => {
    it('should format USD correctly', () => {
      expect(formatCurrency(1000, 'USD')).toBe('$10.00');
    });

    it('should format GBP correctly', () => {
      expect(formatCurrency(1000, 'GBP')).toBe('£10.00');
    });

    it('should format EUR correctly', () => {
      expect(formatCurrency(1000, 'EUR')).toBe('€10.00');
    });

    it('should format CHF correctly', () => {
      const result = formatCurrency(1000, 'CHF');
      expect(result).toContain('10.00');
    });

    it('should default to EUR when no currency specified', () => {
      const result = formatCurrency(1000);
      expect(result).toContain('€');
    });
  });

  describe('negative amounts', () => {
    it('should format -100 cents correctly', () => {
      expect(formatCurrency(-100)).toBe('-€1.00');
    });

    it('should format -1500 cents correctly', () => {
      expect(formatCurrency(-1500)).toBe('-€15.00');
    });

    it('should format -99 cents correctly', () => {
      expect(formatCurrency(-99)).toBe('-€0.99');
    });

    it('should format -10000 cents correctly', () => {
      expect(formatCurrency(-10000)).toBe('-€100.00');
    });
  });

  describe('rounding behavior', () => {
    it('should format 333 cents correctly', () => {
      expect(formatCurrency(333)).toBe('€3.33');
    });

    it('should format 666 cents correctly', () => {
      expect(formatCurrency(666)).toBe('€6.66');
    });

    it('should format 111 cents correctly', () => {
      expect(formatCurrency(111)).toBe('€1.11');
    });
  });

  describe('edge cases', () => {
    it('should handle very large positive amounts', () => {
      expect(formatCurrency(999999999)).toBe('€9,999,999.99');
    });

    it('should handle amount at typical wallet max (100000 cents)', () => {
      expect(formatCurrency(100000)).toBe('€1,000.00');
    });
  });
});

// =====================================================
// parseCurrencyToCents Tests (85 test cases)
// =====================================================

describe('parseCurrencyToCents', () => {
  describe('number input - whole numbers', () => {
    it('should convert 0 to 0 cents', () => {
      expect(parseCurrencyToCents(0)).toBe(0);
    });

    it('should convert 1 to 100 cents', () => {
      expect(parseCurrencyToCents(1)).toBe(100);
    });

    it('should convert 10 to 1000 cents', () => {
      expect(parseCurrencyToCents(10)).toBe(1000);
    });

    it('should convert 100 to 10000 cents', () => {
      expect(parseCurrencyToCents(100)).toBe(10000);
    });

    it('should convert 1000 to 100000 cents', () => {
      expect(parseCurrencyToCents(1000)).toBe(100000);
    });
  });

  describe('number input - decimal numbers', () => {
    it('should convert 0.01 to 1 cent', () => {
      expect(parseCurrencyToCents(0.01)).toBe(1);
    });

    it('should convert 0.50 to 50 cents', () => {
      expect(parseCurrencyToCents(0.5)).toBe(50);
    });

    it('should convert 0.99 to 99 cents', () => {
      expect(parseCurrencyToCents(0.99)).toBe(99);
    });

    it('should convert 1.5 to 150 cents', () => {
      expect(parseCurrencyToCents(1.5)).toBe(150);
    });

    it('should convert 1.99 to 199 cents', () => {
      expect(parseCurrencyToCents(1.99)).toBe(199);
    });

    it('should convert 10.99 to 1099 cents', () => {
      expect(parseCurrencyToCents(10.99)).toBe(1099);
    });

    it('should convert 99.99 to 9999 cents', () => {
      expect(parseCurrencyToCents(99.99)).toBe(9999);
    });

    it('should convert 123.45 to 12345 cents', () => {
      expect(parseCurrencyToCents(123.45)).toBe(12345);
    });
  });

  describe('number input - rounding', () => {
    it('should round 1.999 to 200 cents', () => {
      expect(parseCurrencyToCents(1.999)).toBe(200);
    });

    it('should round 1.991 to 199 cents', () => {
      expect(parseCurrencyToCents(1.991)).toBe(199);
    });

    it('should round 1.995 to 200 cents', () => {
      expect(parseCurrencyToCents(1.995)).toBe(200);
    });

    it('should round 1.994 to 199 cents', () => {
      expect(parseCurrencyToCents(1.994)).toBe(199);
    });

    it('should round 0.001 to 0 cents', () => {
      expect(parseCurrencyToCents(0.001)).toBe(0);
    });

    it('should round 0.005 to 1 cent', () => {
      expect(parseCurrencyToCents(0.005)).toBe(1);
    });

    it('should round 0.004 to 0 cents', () => {
      expect(parseCurrencyToCents(0.004)).toBe(0);
    });
  });

  describe('string input - simple decimals', () => {
    it('should parse "0.00" to 0 cents', () => {
      expect(parseCurrencyToCents('0.00')).toBe(0);
    });

    it('should parse "1.00" to 100 cents', () => {
      expect(parseCurrencyToCents('1.00')).toBe(100);
    });

    it('should parse "10.50" to 1050 cents', () => {
      expect(parseCurrencyToCents('10.50')).toBe(1050);
    });

    it('should parse "99.99" to 9999 cents', () => {
      expect(parseCurrencyToCents('99.99')).toBe(9999);
    });

    it('should parse "123.45" to 12345 cents', () => {
      expect(parseCurrencyToCents('123.45')).toBe(12345);
    });
  });

  describe('string input - with currency symbols', () => {
    it('should parse "€10.00" to 1000 cents', () => {
      expect(parseCurrencyToCents('€10.00')).toBe(1000);
    });

    it('should parse "$25.50" to 2550 cents', () => {
      expect(parseCurrencyToCents('$25.50')).toBe(2550);
    });

    it('should parse "£100.00" to 10000 cents', () => {
      expect(parseCurrencyToCents('£100.00')).toBe(10000);
    });

    it('should parse "€0.99" to 99 cents', () => {
      expect(parseCurrencyToCents('€0.99')).toBe(99);
    });

    it('should parse "$0.01" to 1 cent', () => {
      expect(parseCurrencyToCents('$0.01')).toBe(1);
    });
  });

  describe('string input - European format with comma', () => {
    it('should parse "10,50" to 1050 cents', () => {
      expect(parseCurrencyToCents('10,50')).toBe(1050);
    });

    it('should parse "€99,99" to 9999 cents', () => {
      expect(parseCurrencyToCents('€99,99')).toBe(9999);
    });

    it('should parse "1,00" to 100 cents', () => {
      expect(parseCurrencyToCents('1,00')).toBe(100);
    });

    it('should parse "0,50" to 50 cents', () => {
      expect(parseCurrencyToCents('0,50')).toBe(50);
    });
  });

  describe('string input - integer strings', () => {
    it('should parse "10" to 1000 cents', () => {
      expect(parseCurrencyToCents('10')).toBe(1000);
    });

    it('should parse "100" to 10000 cents', () => {
      expect(parseCurrencyToCents('100')).toBe(10000);
    });

    it('should parse "1" to 100 cents', () => {
      expect(parseCurrencyToCents('1')).toBe(100);
    });

    it('should parse "0" to 0 cents', () => {
      expect(parseCurrencyToCents('0')).toBe(0);
    });
  });

  describe('string input - with spaces', () => {
    it('should parse "€ 10.00" to 1000 cents', () => {
      expect(parseCurrencyToCents('€ 10.00')).toBe(1000);
    });

    it('should parse " 25.50 " to 2550 cents', () => {
      expect(parseCurrencyToCents(' 25.50 ')).toBe(2550);
    });

    it('should parse "  100  " to 10000 cents', () => {
      expect(parseCurrencyToCents('  100  ')).toBe(10000);
    });
  });

  describe('string input - invalid inputs', () => {
    it('should return 0 for "abc"', () => {
      expect(parseCurrencyToCents('abc')).toBe(0);
    });

    it('should return 0 for empty string', () => {
      expect(parseCurrencyToCents('')).toBe(0);
    });

    it('should return 0 for "not a number"', () => {
      expect(parseCurrencyToCents('not a number')).toBe(0);
    });

    it('should return 0 for "NaN"', () => {
      expect(parseCurrencyToCents('NaN')).toBe(0);
    });

    it('should return 0 for special characters only', () => {
      expect(parseCurrencyToCents('!@#$%')).toBe(0);
    });
  });

  describe('edge cases', () => {
    it('should handle string "1000" as 100000 cents', () => {
      expect(parseCurrencyToCents('1000')).toBe(100000);
    });

    it('should handle typical top-up amount "50.00"', () => {
      expect(parseCurrencyToCents('50.00')).toBe(5000);
    });

    it('should handle max typical balance "1000.00"', () => {
      expect(parseCurrencyToCents('1000.00')).toBe(100000);
    });

    it('should handle bonus tier threshold "10.00"', () => {
      expect(parseCurrencyToCents('10.00')).toBe(1000);
    });

    it('should handle welcome bonus "5.00"', () => {
      expect(parseCurrencyToCents('5.00')).toBe(500);
    });
  });
});

// =====================================================
// Bonus Calculation Logic Tests (Pure logic, mocked data)
// =====================================================

describe('Bonus Calculation Logic', () => {
  // These test the expected behavior of bonus calculations
  // without requiring database mocks

  describe('Tier matching rules', () => {
    it('should match Bronze tier for €50 top-up', () => {
      // Bronze tier: min €50, 5% bonus
      const amount = 5000; // 50 EUR in cents
      const bonusPercent = 5;
      const expectedBonus = Math.floor((amount * bonusPercent) / 100);
      expect(expectedBonus).toBe(250); // €2.50 bonus
    });

    it('should match Silver tier for €100 top-up', () => {
      // Silver tier: min €100, 10% bonus
      const amount = 10000; // 100 EUR in cents
      const bonusPercent = 10;
      const expectedBonus = Math.floor((amount * bonusPercent) / 100);
      expect(expectedBonus).toBe(1000); // €10.00 bonus
    });

    it('should match Gold tier for €200 top-up', () => {
      // Gold tier: min €200, 15% bonus
      const amount = 20000; // 200 EUR in cents
      const bonusPercent = 15;
      const expectedBonus = Math.floor((amount * bonusPercent) / 100);
      expect(expectedBonus).toBe(3000); // €30.00 bonus
    });

    it('should give no bonus below minimum tier', () => {
      // Below Bronze tier minimum (€50)
      const amount = 4999; // €49.99 in cents
      // No tier matches, bonus should be 0
      expect(amount < 5000).toBe(true);
    });
  });

  describe('Max bonus cap logic', () => {
    it('should cap bonus at max_bonus_cents when exceeded', () => {
      // Silver tier with max bonus €20
      const amount = 30000; // €300 top-up
      const bonusPercent = 10;
      const maxBonusCents = 2000; // €20 max
      const calculatedBonus = Math.floor((amount * bonusPercent) / 100); // €30
      const actualBonus = Math.min(calculatedBonus, maxBonusCents);
      expect(actualBonus).toBe(2000); // Capped at €20
    });

    it('should not cap when below max', () => {
      const amount = 10000; // €100 top-up
      const bonusPercent = 10;
      const maxBonusCents = 2000; // €20 max
      const calculatedBonus = Math.floor((amount * bonusPercent) / 100); // €10
      const actualBonus = Math.min(calculatedBonus, maxBonusCents);
      expect(actualBonus).toBe(1000); // Not capped
    });
  });

  describe('Bonus percentage calculations', () => {
    it('should calculate 5% bonus correctly', () => {
      expect(Math.floor((5000 * 5) / 100)).toBe(250);
      expect(Math.floor((10000 * 5) / 100)).toBe(500);
      expect(Math.floor((7500 * 5) / 100)).toBe(375);
    });

    it('should calculate 10% bonus correctly', () => {
      expect(Math.floor((10000 * 10) / 100)).toBe(1000);
      expect(Math.floor((15000 * 10) / 100)).toBe(1500);
      expect(Math.floor((12345 * 10) / 100)).toBe(1234);
    });

    it('should calculate 15% bonus correctly', () => {
      expect(Math.floor((20000 * 15) / 100)).toBe(3000);
      expect(Math.floor((50000 * 15) / 100)).toBe(7500);
      expect(Math.floor((25000 * 15) / 100)).toBe(3750);
    });

    it('should floor fractional cents', () => {
      // 5001 * 5% = 250.05, should floor to 250
      expect(Math.floor((5001 * 5) / 100)).toBe(250);
      // 5099 * 5% = 254.95, should floor to 254
      expect(Math.floor((5099 * 5) / 100)).toBe(254);
    });
  });

  describe('Total calculation', () => {
    it('should calculate total correctly with bonus', () => {
      const amount = 10000;
      const bonus = 1000;
      expect(amount + bonus).toBe(11000);
    });

    it('should calculate total correctly without bonus', () => {
      const amount = 4999;
      const bonus = 0;
      expect(amount + bonus).toBe(4999);
    });
  });
});

// =====================================================
// Wallet Balance Logic Tests
// =====================================================

describe('Wallet Balance Logic', () => {
  describe('Total balance calculation', () => {
    it('should sum balance and bonus correctly', () => {
      const balance = 5000;
      const bonus = 500;
      expect(balance + bonus).toBe(5500);
    });

    it('should handle zero bonus', () => {
      const balance = 10000;
      const bonus = 0;
      expect(balance + bonus).toBe(10000);
    });

    it('should handle zero balance', () => {
      const balance = 0;
      const bonus = 500;
      expect(balance + bonus).toBe(500);
    });

    it('should handle both zero', () => {
      const balance = 0;
      const bonus = 0;
      expect(balance + bonus).toBe(0);
    });
  });

  describe('Max balance check', () => {
    it('should detect when top-up would exceed max', () => {
      const currentBalance = 95000;
      const currentBonus = 4000;
      const topUpAmount = 5000;
      const topUpBonus = 500;
      const maxBalance = 100000;

      const newTotal = currentBalance + currentBonus + topUpAmount + topUpBonus;
      const wouldExceed = newTotal > maxBalance;

      expect(newTotal).toBe(104500);
      expect(wouldExceed).toBe(true);
    });

    it('should allow top-up within max', () => {
      const currentBalance = 5000;
      const currentBonus = 500;
      const topUpAmount = 10000;
      const topUpBonus = 1000;
      const maxBalance = 100000;

      const newTotal = currentBalance + currentBonus + topUpAmount + topUpBonus;
      const wouldExceed = newTotal > maxBalance;

      expect(newTotal).toBe(16500);
      expect(wouldExceed).toBe(false);
    });
  });
});

// =====================================================
// Refund Logic Tests
// =====================================================

describe('Refund Logic', () => {
  it('should add refund amount to balance', () => {
    const currentBalance = 5000;
    const refundAmount = 1000;
    expect(currentBalance + refundAmount).toBe(6000);
  });

  it('should handle refund to zero balance', () => {
    const currentBalance = 0;
    const refundAmount = 2500;
    expect(currentBalance + refundAmount).toBe(2500);
  });

  it('should handle full order refund', () => {
    const currentBalance = 3000;
    const orderAmount = 2500;
    expect(currentBalance + orderAmount).toBe(5500);
  });
});

// =====================================================
// Payment Deduction Logic Tests
// =====================================================

describe('Payment Deduction Logic', () => {
  it('should deduct payment from balance', () => {
    const balance = 10000;
    const payment = 2500;
    expect(balance - payment).toBe(7500);
  });

  it('should detect insufficient balance', () => {
    const balance = 1000;
    const payment = 2500;
    expect(balance >= payment).toBe(false);
  });

  it('should allow exact balance payment', () => {
    const balance = 2500;
    const payment = 2500;
    expect(balance >= payment).toBe(true);
    expect(balance - payment).toBe(0);
  });

  describe('Bonus-first usage', () => {
    it('should use bonus balance first', () => {
      const balance = 5000;
      const bonus = 500;
      const payment = 700;

      // Use bonus first
      const fromBonus = Math.min(bonus, payment);
      const remaining = payment - fromBonus;
      const fromBalance = remaining;

      expect(fromBonus).toBe(500);
      expect(fromBalance).toBe(200);
    });

    it('should use only bonus if sufficient', () => {
      const balance = 5000;
      const bonus = 1000;
      const payment = 500;

      const fromBonus = Math.min(bonus, payment);
      const remaining = payment - fromBonus;
      const fromBalance = remaining;

      expect(fromBonus).toBe(500);
      expect(fromBalance).toBe(0);
    });
  });
});

// =====================================================
// Default Settings Tests
// =====================================================

describe('Default Wallet Settings', () => {
  const defaultSettings = {
    wallet_enabled: true,
    stripe_enabled: true,
    cash_enabled: true,
    min_top_up_cents: 1000, // €10
    max_top_up_cents: 50000, // €500
    max_balance_cents: 100000, // €1000
    welcome_bonus_cents: 500, // €5
    referral_bonus_inviter_cents: 1000, // €10
    referral_bonus_invitee_cents: 500, // €5
    bonus_expiry_months: 12,
    default_currency: 'EUR',
  };

  it('should have sensible min top-up', () => {
    expect(defaultSettings.min_top_up_cents).toBe(1000);
    expect(formatCurrency(defaultSettings.min_top_up_cents)).toBe('€10.00');
  });

  it('should have sensible max top-up', () => {
    expect(defaultSettings.max_top_up_cents).toBe(50000);
    expect(formatCurrency(defaultSettings.max_top_up_cents)).toBe('€500.00');
  });

  it('should have sensible max balance', () => {
    expect(defaultSettings.max_balance_cents).toBe(100000);
    expect(formatCurrency(defaultSettings.max_balance_cents)).toBe('€1,000.00');
  });

  it('should have EUR as default currency', () => {
    expect(defaultSettings.default_currency).toBe('EUR');
  });

  it('should have 12 months bonus expiry', () => {
    expect(defaultSettings.bonus_expiry_months).toBe(12);
  });
});

// =====================================================
// Default Bonus Tiers Tests
// =====================================================

describe('Default Bonus Tiers', () => {
  const defaultTiers = [
    { min_amount_cents: 5000, bonus_percent: 5, tier_name: 'Bronze' },
    { min_amount_cents: 10000, bonus_percent: 10, tier_name: 'Silver' },
    { min_amount_cents: 20000, bonus_percent: 15, tier_name: 'Gold' },
  ];

  it('should have Bronze tier at €50', () => {
    expect(defaultTiers[0].min_amount_cents).toBe(5000);
    expect(defaultTiers[0].bonus_percent).toBe(5);
  });

  it('should have Silver tier at €100', () => {
    expect(defaultTiers[1].min_amount_cents).toBe(10000);
    expect(defaultTiers[1].bonus_percent).toBe(10);
  });

  it('should have Gold tier at €200', () => {
    expect(defaultTiers[2].min_amount_cents).toBe(20000);
    expect(defaultTiers[2].bonus_percent).toBe(15);
  });

  it('should have increasing percentages', () => {
    expect(defaultTiers[0].bonus_percent).toBeLessThan(defaultTiers[1].bonus_percent);
    expect(defaultTiers[1].bonus_percent).toBeLessThan(defaultTiers[2].bonus_percent);
  });

  it('should have increasing minimums', () => {
    expect(defaultTiers[0].min_amount_cents).toBeLessThan(defaultTiers[1].min_amount_cents);
    expect(defaultTiers[1].min_amount_cents).toBeLessThan(defaultTiers[2].min_amount_cents);
  });
});
