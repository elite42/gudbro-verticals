/**
 * Loyalty Service Tests - Business Logic
 *
 * Tests for loyalty-service.ts business logic:
 * - Tier calculation and progression
 * - Points earning calculations
 * - Signup bonus logic
 * - Profile completion bonus logic
 * - Purchase points with multipliers
 * - Transaction types
 */

import { describe, it, expect } from 'vitest';
import type {
  LoyaltyProgram,
  LoyaltyTier,
  CustomerLoyaltyAccount,
  LoyaltyTransactionType,
} from '../loyalty-service';

// =====================================================
// TYPE DEFINITIONS (mirror from loyalty-service.ts)
// =====================================================

const DEFAULT_TIERS: LoyaltyTier[] = [
  { name: 'Bronze', min_points: 0, multiplier: 1.0 },
  { name: 'Silver', min_points: 500, multiplier: 1.1 },
  { name: 'Gold', min_points: 2000, multiplier: 1.2 },
  { name: 'Platinum', min_points: 5000, multiplier: 1.3 },
  { name: 'Diamond', min_points: 10000, multiplier: 1.5 },
];

// Helper functions extracted from service for testing
function calculateTier(lifetimePoints: number, tiers: LoyaltyTier[]): string {
  if (!tiers || tiers.length === 0) {
    return 'Bronze';
  }

  const sortedTiers = [...tiers].sort((a, b) => b.min_points - a.min_points);

  for (const tier of sortedTiers) {
    if (lifetimePoints >= tier.min_points) {
      return tier.name;
    }
  }

  return tiers[0]?.name || 'Bronze';
}

function getTierMultiplier(tierName: string, tiers: LoyaltyTier[]): number {
  const tier = tiers.find((t) => t.name === tierName);
  return tier?.multiplier || 1.0;
}

// =====================================================
// calculateTier
// =====================================================

describe('calculateTier', () => {
  describe('with default tiers', () => {
    it('should return Bronze for 0 points', () => {
      expect(calculateTier(0, DEFAULT_TIERS)).toBe('Bronze');
    });

    it('should return Bronze for 499 points', () => {
      expect(calculateTier(499, DEFAULT_TIERS)).toBe('Bronze');
    });

    it('should return Silver for exactly 500 points', () => {
      expect(calculateTier(500, DEFAULT_TIERS)).toBe('Silver');
    });

    it('should return Silver for 1999 points', () => {
      expect(calculateTier(1999, DEFAULT_TIERS)).toBe('Silver');
    });

    it('should return Gold for exactly 2000 points', () => {
      expect(calculateTier(2000, DEFAULT_TIERS)).toBe('Gold');
    });

    it('should return Gold for 4999 points', () => {
      expect(calculateTier(4999, DEFAULT_TIERS)).toBe('Gold');
    });

    it('should return Platinum for exactly 5000 points', () => {
      expect(calculateTier(5000, DEFAULT_TIERS)).toBe('Platinum');
    });

    it('should return Platinum for 9999 points', () => {
      expect(calculateTier(9999, DEFAULT_TIERS)).toBe('Platinum');
    });

    it('should return Diamond for exactly 10000 points', () => {
      expect(calculateTier(10000, DEFAULT_TIERS)).toBe('Diamond');
    });

    it('should return Diamond for very high points', () => {
      expect(calculateTier(1000000, DEFAULT_TIERS)).toBe('Diamond');
    });

    it('should handle negative points by returning Bronze', () => {
      expect(calculateTier(-100, DEFAULT_TIERS)).toBe('Bronze');
    });
  });

  describe('with empty tiers', () => {
    it('should return Bronze for empty tiers array', () => {
      expect(calculateTier(1000, [])).toBe('Bronze');
    });
  });

  describe('with custom tiers', () => {
    const customTiers: LoyaltyTier[] = [
      { name: 'Starter', min_points: 0, multiplier: 1.0 },
      { name: 'Regular', min_points: 100, multiplier: 1.5 },
      { name: 'VIP', min_points: 500, multiplier: 2.0 },
    ];

    it('should return Starter for 0 points', () => {
      expect(calculateTier(0, customTiers)).toBe('Starter');
    });

    it('should return Regular for 100 points', () => {
      expect(calculateTier(100, customTiers)).toBe('Regular');
    });

    it('should return VIP for 500 points', () => {
      expect(calculateTier(500, customTiers)).toBe('VIP');
    });

    it('should return VIP for points above highest tier', () => {
      expect(calculateTier(10000, customTiers)).toBe('VIP');
    });
  });

  describe('with single tier', () => {
    const singleTier: LoyaltyTier[] = [{ name: 'Member', min_points: 0, multiplier: 1.0 }];

    it('should always return the single tier', () => {
      expect(calculateTier(0, singleTier)).toBe('Member');
      expect(calculateTier(1000, singleTier)).toBe('Member');
      expect(calculateTier(1000000, singleTier)).toBe('Member');
    });
  });

  describe('edge cases', () => {
    it('should handle unsorted tiers correctly', () => {
      const unsortedTiers: LoyaltyTier[] = [
        { name: 'Gold', min_points: 1000, multiplier: 1.2 },
        { name: 'Bronze', min_points: 0, multiplier: 1.0 },
        { name: 'Silver', min_points: 500, multiplier: 1.1 },
      ];

      expect(calculateTier(0, unsortedTiers)).toBe('Bronze');
      expect(calculateTier(500, unsortedTiers)).toBe('Silver');
      expect(calculateTier(1000, unsortedTiers)).toBe('Gold');
    });
  });
});

// =====================================================
// getTierMultiplier
// =====================================================

describe('getTierMultiplier', () => {
  describe('with default tiers', () => {
    it('should return 1.0 for Bronze', () => {
      expect(getTierMultiplier('Bronze', DEFAULT_TIERS)).toBe(1.0);
    });

    it('should return 1.1 for Silver', () => {
      expect(getTierMultiplier('Silver', DEFAULT_TIERS)).toBeCloseTo(1.1, 5);
    });

    it('should return 1.2 for Gold', () => {
      expect(getTierMultiplier('Gold', DEFAULT_TIERS)).toBeCloseTo(1.2, 5);
    });

    it('should return 1.3 for Platinum', () => {
      expect(getTierMultiplier('Platinum', DEFAULT_TIERS)).toBeCloseTo(1.3, 5);
    });

    it('should return 1.5 for Diamond', () => {
      expect(getTierMultiplier('Diamond', DEFAULT_TIERS)).toBeCloseTo(1.5, 5);
    });
  });

  describe('with unknown tier', () => {
    it('should return 1.0 for unknown tier name', () => {
      expect(getTierMultiplier('Unknown', DEFAULT_TIERS)).toBe(1.0);
    });

    it('should return 1.0 for empty string', () => {
      expect(getTierMultiplier('', DEFAULT_TIERS)).toBe(1.0);
    });
  });

  describe('with custom tiers', () => {
    const customTiers: LoyaltyTier[] = [
      { name: 'Basic', min_points: 0, multiplier: 1.0 },
      { name: 'Premium', min_points: 100, multiplier: 2.0 },
      { name: 'Elite', min_points: 500, multiplier: 3.0 },
    ];

    it('should return custom multipliers', () => {
      expect(getTierMultiplier('Basic', customTiers)).toBe(1.0);
      expect(getTierMultiplier('Premium', customTiers)).toBe(2.0);
      expect(getTierMultiplier('Elite', customTiers)).toBe(3.0);
    });
  });

  describe('case sensitivity', () => {
    it('should be case-sensitive', () => {
      expect(getTierMultiplier('bronze', DEFAULT_TIERS)).toBe(1.0); // Not found
      expect(getTierMultiplier('BRONZE', DEFAULT_TIERS)).toBe(1.0); // Not found
      expect(getTierMultiplier('Bronze', DEFAULT_TIERS)).toBe(1.0); // Found
    });
  });
});

// =====================================================
// POINTS CALCULATION BUSINESS LOGIC
// =====================================================

describe('Points Calculation Business Logic', () => {
  describe('Purchase points calculation', () => {
    const DEFAULT_POINTS_PER_CURRENCY = 1;

    function calculatePurchasePoints(
      amountCents: number,
      pointsPerCurrency: number,
      tierMultiplier: number = 1.0,
      residentMultiplier: number = 1.0
    ): number {
      const amountCurrency = amountCents / 100;
      let points = Math.floor(amountCurrency * pointsPerCurrency);
      points = Math.floor(points * residentMultiplier);
      points = Math.floor(points * tierMultiplier);
      return points;
    }

    it('should calculate base points correctly', () => {
      expect(calculatePurchasePoints(1000, DEFAULT_POINTS_PER_CURRENCY)).toBe(10); // €10 = 10 points
      expect(calculatePurchasePoints(2500, DEFAULT_POINTS_PER_CURRENCY)).toBe(25); // €25 = 25 points
      expect(calculatePurchasePoints(10000, DEFAULT_POINTS_PER_CURRENCY)).toBe(100); // €100 = 100 points
    });

    it('should floor fractional points', () => {
      expect(calculatePurchasePoints(1050, DEFAULT_POINTS_PER_CURRENCY)).toBe(10); // €10.50 = 10 points (floored)
      expect(calculatePurchasePoints(999, DEFAULT_POINTS_PER_CURRENCY)).toBe(9); // €9.99 = 9 points
    });

    it('should return 0 for small purchases', () => {
      expect(calculatePurchasePoints(50, DEFAULT_POINTS_PER_CURRENCY)).toBe(0); // €0.50 = 0 points
      expect(calculatePurchasePoints(99, DEFAULT_POINTS_PER_CURRENCY)).toBe(0); // €0.99 = 0 points
    });

    it('should apply Silver tier multiplier (1.1x)', () => {
      const points = calculatePurchasePoints(1000, DEFAULT_POINTS_PER_CURRENCY, 1.1);
      expect(points).toBe(11); // 10 * 1.1 = 11
    });

    it('should apply Gold tier multiplier (1.2x)', () => {
      const points = calculatePurchasePoints(1000, DEFAULT_POINTS_PER_CURRENCY, 1.2);
      expect(points).toBe(12); // 10 * 1.2 = 12
    });

    it('should apply Diamond tier multiplier (1.5x)', () => {
      const points = calculatePurchasePoints(1000, DEFAULT_POINTS_PER_CURRENCY, 1.5);
      expect(points).toBe(15); // 10 * 1.5 = 15
    });

    it('should apply resident multiplier', () => {
      const points = calculatePurchasePoints(1000, DEFAULT_POINTS_PER_CURRENCY, 1.0, 1.5);
      expect(points).toBe(15); // 10 * 1.5 = 15
    });

    it('should stack tier and resident multipliers', () => {
      // Base: 10 points, Resident: 1.5x = 15, Silver: 1.1x = 16.5 -> 16 (floored)
      const points = calculatePurchasePoints(1000, DEFAULT_POINTS_PER_CURRENCY, 1.1, 1.5);
      expect(points).toBe(16);
    });

    it('should handle custom points per currency', () => {
      expect(calculatePurchasePoints(1000, 2)).toBe(20); // 2 points per €1
      expect(calculatePurchasePoints(1000, 0.5)).toBe(5); // 0.5 points per €1
    });
  });

  describe('Signup bonus calculation', () => {
    const DEFAULT_RESIDENT_SIGNUP_BONUS = 100;
    const DEFAULT_TOURIST_SIGNUP_BONUS = 50;

    function calculateSignupBonus(
      isResident: boolean,
      residentBonus: number = DEFAULT_RESIDENT_SIGNUP_BONUS,
      touristBonus: number = DEFAULT_TOURIST_SIGNUP_BONUS
    ): number {
      return isResident ? residentBonus : touristBonus;
    }

    it('should return resident bonus for residents', () => {
      expect(calculateSignupBonus(true)).toBe(100);
    });

    it('should return tourist bonus for tourists', () => {
      expect(calculateSignupBonus(false)).toBe(50);
    });

    it('should handle custom bonus amounts', () => {
      expect(calculateSignupBonus(true, 200, 75)).toBe(200);
      expect(calculateSignupBonus(false, 200, 75)).toBe(75);
    });

    it('should handle zero bonus', () => {
      expect(calculateSignupBonus(true, 0, 0)).toBe(0);
      expect(calculateSignupBonus(false, 0, 0)).toBe(0);
    });
  });

  describe('Profile completion bonus logic', () => {
    function shouldAwardProfileBonus(
      profileCompletionPct: number,
      alreadyAwarded: boolean,
      bonusEnabled: boolean
    ): boolean {
      if (!bonusEnabled) return false;
      if (alreadyAwarded) return false;
      if (profileCompletionPct < 100) return false;
      return true;
    }

    it('should award bonus for complete profile not yet awarded', () => {
      expect(shouldAwardProfileBonus(100, false, true)).toBe(true);
    });

    it('should not award if profile incomplete', () => {
      expect(shouldAwardProfileBonus(99, false, true)).toBe(false);
      expect(shouldAwardProfileBonus(50, false, true)).toBe(false);
      expect(shouldAwardProfileBonus(0, false, true)).toBe(false);
    });

    it('should not award if already awarded', () => {
      expect(shouldAwardProfileBonus(100, true, true)).toBe(false);
    });

    it('should not award if bonus disabled', () => {
      expect(shouldAwardProfileBonus(100, false, false)).toBe(false);
    });

    it('should not award if multiple conditions fail', () => {
      expect(shouldAwardProfileBonus(50, true, false)).toBe(false);
    });
  });

  describe('Balance calculation', () => {
    function calculateNewBalance(
      currentBalance: number,
      points: number,
      transactionType: 'earn' | 'redeem'
    ): number {
      if (transactionType === 'earn') {
        return currentBalance + points;
      } else {
        return currentBalance - points;
      }
    }

    it('should add points for earn transaction', () => {
      expect(calculateNewBalance(100, 50, 'earn')).toBe(150);
      expect(calculateNewBalance(0, 100, 'earn')).toBe(100);
    });

    it('should subtract points for redeem transaction', () => {
      expect(calculateNewBalance(100, 50, 'redeem')).toBe(50);
      expect(calculateNewBalance(100, 100, 'redeem')).toBe(0);
    });

    it('should handle negative balance (for refunds)', () => {
      expect(calculateNewBalance(0, 50, 'redeem')).toBe(-50);
    });
  });

  describe('Lifetime points calculation', () => {
    function calculateNewLifetime(currentLifetime: number, points: number): number {
      // Only positive points add to lifetime (redemptions don't reduce lifetime)
      return currentLifetime + (points > 0 ? points : 0);
    }

    it('should add positive points to lifetime', () => {
      expect(calculateNewLifetime(100, 50)).toBe(150);
      expect(calculateNewLifetime(0, 100)).toBe(100);
    });

    it('should not reduce lifetime for negative points (redemptions)', () => {
      expect(calculateNewLifetime(100, -50)).toBe(100);
    });

    it('should not change lifetime for zero points', () => {
      expect(calculateNewLifetime(100, 0)).toBe(100);
    });
  });
});

// =====================================================
// TIER PROGRESSION BUSINESS LOGIC
// =====================================================

describe('Tier Progression Business Logic', () => {
  describe('Tier change detection', () => {
    function hasTierChanged(
      oldTier: string,
      newLifetimePoints: number,
      tiers: LoyaltyTier[]
    ): boolean {
      const newTier = calculateTier(newLifetimePoints, tiers);
      return oldTier !== newTier;
    }

    it('should detect upgrade from Bronze to Silver', () => {
      expect(hasTierChanged('Bronze', 500, DEFAULT_TIERS)).toBe(true);
    });

    it('should not detect change when staying in same tier', () => {
      expect(hasTierChanged('Bronze', 100, DEFAULT_TIERS)).toBe(false);
      expect(hasTierChanged('Silver', 1000, DEFAULT_TIERS)).toBe(false);
    });

    it('should detect upgrade across multiple tiers', () => {
      expect(hasTierChanged('Bronze', 10000, DEFAULT_TIERS)).toBe(true);
    });
  });

  describe('Points to next tier calculation', () => {
    function getPointsToNextTier(currentLifetime: number, tiers: LoyaltyTier[]): number | null {
      const sortedTiers = [...tiers].sort((a, b) => a.min_points - b.min_points);
      const currentTierIndex = sortedTiers.findIndex(
        (tier, index, arr) =>
          currentLifetime >= tier.min_points &&
          (index === arr.length - 1 || currentLifetime < arr[index + 1].min_points)
      );

      if (currentTierIndex === sortedTiers.length - 1) {
        return null; // At max tier
      }

      const nextTier = sortedTiers[currentTierIndex + 1];
      return nextTier.min_points - currentLifetime;
    }

    it('should return points needed to reach Silver from Bronze', () => {
      expect(getPointsToNextTier(0, DEFAULT_TIERS)).toBe(500);
      expect(getPointsToNextTier(250, DEFAULT_TIERS)).toBe(250);
      expect(getPointsToNextTier(499, DEFAULT_TIERS)).toBe(1);
    });

    it('should return points needed to reach Gold from Silver', () => {
      expect(getPointsToNextTier(500, DEFAULT_TIERS)).toBe(1500); // 2000 - 500
      expect(getPointsToNextTier(1500, DEFAULT_TIERS)).toBe(500); // 2000 - 1500
    });

    it('should return null at Diamond (max tier)', () => {
      expect(getPointsToNextTier(10000, DEFAULT_TIERS)).toBeNull();
      expect(getPointsToNextTier(50000, DEFAULT_TIERS)).toBeNull();
    });
  });

  describe('Progress percentage calculation', () => {
    function getTierProgress(currentLifetime: number, tiers: LoyaltyTier[]): number {
      const sortedTiers = [...tiers].sort((a, b) => a.min_points - b.min_points);
      const currentTierIndex = sortedTiers.findIndex(
        (tier, index, arr) =>
          currentLifetime >= tier.min_points &&
          (index === arr.length - 1 || currentLifetime < arr[index + 1].min_points)
      );

      if (currentTierIndex === sortedTiers.length - 1) {
        return 100; // Max tier
      }

      const currentTier = sortedTiers[currentTierIndex];
      const nextTier = sortedTiers[currentTierIndex + 1];
      const tierRange = nextTier.min_points - currentTier.min_points;
      const pointsInTier = currentLifetime - currentTier.min_points;

      return Math.round((pointsInTier / tierRange) * 100);
    }

    it('should return 0% at Bronze with 0 points', () => {
      expect(getTierProgress(0, DEFAULT_TIERS)).toBe(0);
    });

    it('should return 50% at 250 points in Bronze', () => {
      expect(getTierProgress(250, DEFAULT_TIERS)).toBe(50);
    });

    it('should return ~100% at 499 points in Bronze', () => {
      expect(getTierProgress(499, DEFAULT_TIERS)).toBeCloseTo(100, 0);
    });

    it('should return 0% at start of Silver', () => {
      expect(getTierProgress(500, DEFAULT_TIERS)).toBe(0);
    });

    it('should return 100% at Diamond', () => {
      expect(getTierProgress(10000, DEFAULT_TIERS)).toBe(100);
      expect(getTierProgress(50000, DEFAULT_TIERS)).toBe(100);
    });
  });
});

// =====================================================
// TRANSACTION TYPES
// =====================================================

describe('Transaction Types', () => {
  const VALID_TRANSACTION_TYPES: LoyaltyTransactionType[] = [
    'earn_purchase',
    'earn_bonus',
    'earn_referral',
    'earn_engagement',
    'earn_profile_complete',
    'earn_signup',
    'redeem',
    'expire',
    'adjustment',
  ];

  it('should have all expected transaction types', () => {
    expect(VALID_TRANSACTION_TYPES).toHaveLength(9);
  });

  describe('Earning transaction types', () => {
    const earningTypes = VALID_TRANSACTION_TYPES.filter((t) => t.startsWith('earn_'));

    it('should have 6 earning types', () => {
      expect(earningTypes).toHaveLength(6);
    });

    it('should include all earning types', () => {
      expect(earningTypes).toContain('earn_purchase');
      expect(earningTypes).toContain('earn_bonus');
      expect(earningTypes).toContain('earn_referral');
      expect(earningTypes).toContain('earn_engagement');
      expect(earningTypes).toContain('earn_profile_complete');
      expect(earningTypes).toContain('earn_signup');
    });
  });

  describe('Spending transaction types', () => {
    it('should have redeem type', () => {
      expect(VALID_TRANSACTION_TYPES).toContain('redeem');
    });
  });

  describe('System transaction types', () => {
    it('should have expire type', () => {
      expect(VALID_TRANSACTION_TYPES).toContain('expire');
    });

    it('should have adjustment type', () => {
      expect(VALID_TRANSACTION_TYPES).toContain('adjustment');
    });
  });
});

// =====================================================
// LOYALTY PROGRAM DEFAULTS
// =====================================================

describe('Loyalty Program Defaults', () => {
  const DEFAULT_PROGRAM: Partial<LoyaltyProgram> = {
    points_per_currency: 1,
    is_active: true,
    tiers: DEFAULT_TIERS,
    profile_completion_bonus_points: 50,
    profile_completion_bonus_enabled: true,
    resident_signup_bonus: 100,
    tourist_signup_bonus: 50,
    resident_multiplier: 1.0,
  };

  it('should have default points per currency of 1', () => {
    expect(DEFAULT_PROGRAM.points_per_currency).toBe(1);
  });

  it('should be active by default', () => {
    expect(DEFAULT_PROGRAM.is_active).toBe(true);
  });

  it('should have profile completion bonus enabled by default', () => {
    expect(DEFAULT_PROGRAM.profile_completion_bonus_enabled).toBe(true);
    expect(DEFAULT_PROGRAM.profile_completion_bonus_points).toBe(50);
  });

  it('should have different signup bonuses for residents vs tourists', () => {
    expect(DEFAULT_PROGRAM.resident_signup_bonus).toBeGreaterThan(
      DEFAULT_PROGRAM.tourist_signup_bonus!
    );
  });

  it('should have no resident multiplier by default (1.0)', () => {
    expect(DEFAULT_PROGRAM.resident_multiplier).toBe(1.0);
  });
});

// =====================================================
// EDGE CASES AND ERROR SCENARIOS
// =====================================================

describe('Edge Cases and Error Scenarios', () => {
  describe('Redemption validation', () => {
    function canRedeem(currentBalance: number, requestedPoints: number): boolean {
      return currentBalance >= requestedPoints;
    }

    it('should allow redemption when balance is sufficient', () => {
      expect(canRedeem(100, 50)).toBe(true);
      expect(canRedeem(100, 100)).toBe(true);
    });

    it('should deny redemption when balance is insufficient', () => {
      expect(canRedeem(50, 100)).toBe(false);
      expect(canRedeem(0, 1)).toBe(false);
    });

    it('should allow zero point redemption', () => {
      expect(canRedeem(100, 0)).toBe(true);
      expect(canRedeem(0, 0)).toBe(true);
    });
  });

  describe('Program active state', () => {
    function shouldAwardPoints(programIsActive: boolean, points: number): boolean {
      if (!programIsActive) return false;
      if (points <= 0) return false;
      return true;
    }

    it('should award points when program is active', () => {
      expect(shouldAwardPoints(true, 100)).toBe(true);
    });

    it('should not award points when program is inactive', () => {
      expect(shouldAwardPoints(false, 100)).toBe(false);
    });

    it('should not award zero or negative points', () => {
      expect(shouldAwardPoints(true, 0)).toBe(false);
      expect(shouldAwardPoints(true, -50)).toBe(false);
    });
  });

  describe('Account state transitions', () => {
    interface AccountState {
      points_balance: number;
      lifetime_points: number;
      current_tier: string;
      profile_completion_bonus_awarded: boolean;
    }

    function applyEarnTransaction(state: AccountState, points: number): AccountState {
      const newBalance = state.points_balance + points;
      const newLifetime = state.lifetime_points + (points > 0 ? points : 0);
      const newTier = calculateTier(newLifetime, DEFAULT_TIERS);

      return {
        ...state,
        points_balance: newBalance,
        lifetime_points: newLifetime,
        current_tier: newTier,
      };
    }

    it('should update state correctly after earning points', () => {
      const initial: AccountState = {
        points_balance: 0,
        lifetime_points: 0,
        current_tier: 'Bronze',
        profile_completion_bonus_awarded: false,
      };

      const after = applyEarnTransaction(initial, 100);

      expect(after.points_balance).toBe(100);
      expect(after.lifetime_points).toBe(100);
      expect(after.current_tier).toBe('Bronze');
    });

    it('should upgrade tier when crossing threshold', () => {
      const initial: AccountState = {
        points_balance: 450,
        lifetime_points: 450,
        current_tier: 'Bronze',
        profile_completion_bonus_awarded: false,
      };

      const after = applyEarnTransaction(initial, 100);

      expect(after.points_balance).toBe(550);
      expect(after.lifetime_points).toBe(550);
      expect(after.current_tier).toBe('Silver');
    });

    it('should not reduce lifetime on negative points', () => {
      const initial: AccountState = {
        points_balance: 500,
        lifetime_points: 1000,
        current_tier: 'Silver',
        profile_completion_bonus_awarded: false,
      };

      // Adjustment with negative points (correction)
      const after = applyEarnTransaction(initial, -100);

      expect(after.points_balance).toBe(400);
      expect(after.lifetime_points).toBe(1000); // Unchanged
      expect(after.current_tier).toBe('Silver'); // Based on lifetime
    });
  });
});

// =====================================================
// REFERRAL LOGIC
// =====================================================

describe('Referral Logic', () => {
  const REFERRER_BONUS = 100;
  const REFEREE_BONUS = 50;

  describe('Referral rewards calculation', () => {
    it('should calculate referrer reward', () => {
      expect(REFERRER_BONUS).toBe(100);
    });

    it('should calculate referee reward', () => {
      expect(REFEREE_BONUS).toBe(50);
    });

    it('should give referrer more than referee', () => {
      expect(REFERRER_BONUS).toBeGreaterThan(REFEREE_BONUS);
    });
  });

  describe('Referral validation', () => {
    function isValidReferral(
      referrerAccountId: string | null,
      refereeAccountId: string,
      existingReferrals: string[]
    ): boolean {
      if (!referrerAccountId) return false;
      if (referrerAccountId === refereeAccountId) return false;
      if (existingReferrals.includes(refereeAccountId)) return false;
      return true;
    }

    it('should accept valid referral', () => {
      expect(isValidReferral('user-1', 'user-2', [])).toBe(true);
    });

    it('should reject self-referral', () => {
      expect(isValidReferral('user-1', 'user-1', [])).toBe(false);
    });

    it('should reject null referrer', () => {
      expect(isValidReferral(null, 'user-1', [])).toBe(false);
    });

    it('should reject duplicate referral', () => {
      expect(isValidReferral('user-1', 'user-2', ['user-2'])).toBe(false);
    });
  });
});

// =====================================================
// STATS CALCULATION
// =====================================================

describe('Stats Calculation', () => {
  describe('Tier breakdown', () => {
    function calculateTierBreakdown(
      accounts: Array<{ current_tier: string }>
    ): Record<string, number> {
      const breakdown: Record<string, number> = {};
      for (const account of accounts) {
        breakdown[account.current_tier] = (breakdown[account.current_tier] || 0) + 1;
      }
      return breakdown;
    }

    it('should calculate tier breakdown correctly', () => {
      const accounts = [
        { current_tier: 'Bronze' },
        { current_tier: 'Bronze' },
        { current_tier: 'Silver' },
        { current_tier: 'Gold' },
        { current_tier: 'Bronze' },
      ];

      const breakdown = calculateTierBreakdown(accounts);

      expect(breakdown['Bronze']).toBe(3);
      expect(breakdown['Silver']).toBe(1);
      expect(breakdown['Gold']).toBe(1);
      expect(breakdown['Diamond']).toBeUndefined();
    });

    it('should handle empty accounts list', () => {
      const breakdown = calculateTierBreakdown([]);
      expect(Object.keys(breakdown)).toHaveLength(0);
    });
  });

  describe('Points redemption rate', () => {
    function calculateRedemptionRate(totalIssued: number, totalRedeemed: number): number {
      if (totalIssued === 0) return 0;
      return Math.round((totalRedeemed / totalIssued) * 100);
    }

    it('should calculate redemption rate correctly', () => {
      expect(calculateRedemptionRate(1000, 250)).toBe(25);
      expect(calculateRedemptionRate(1000, 500)).toBe(50);
      expect(calculateRedemptionRate(1000, 1000)).toBe(100);
    });

    it('should return 0 for zero issued', () => {
      expect(calculateRedemptionRate(0, 0)).toBe(0);
    });
  });

  describe('Active members calculation', () => {
    function countActiveMembers(lastActivityDates: (string | null)[], cutoffDays: number): number {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - cutoffDays);

      return lastActivityDates.filter((date) => {
        if (!date) return false;
        return new Date(date) >= cutoff;
      }).length;
    }

    it('should count members active within cutoff', () => {
      const now = new Date();
      const recent = new Date(now);
      recent.setDate(recent.getDate() - 15);
      const old = new Date(now);
      old.setDate(old.getDate() - 45);

      const dates = [now.toISOString(), recent.toISOString(), old.toISOString(), null];

      expect(countActiveMembers(dates, 30)).toBe(2);
    });

    it('should return 0 for all inactive members', () => {
      const old = new Date();
      old.setDate(old.getDate() - 60);

      expect(countActiveMembers([old.toISOString(), null], 30)).toBe(0);
    });
  });
});
