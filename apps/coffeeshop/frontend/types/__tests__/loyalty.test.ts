/**
 * Loyalty Types and Helper Functions Tests
 *
 * Tests pure functions from loyalty.ts:
 * - getTierForPoints: Calculate tier based on points
 * - getTierProgress: Calculate progress to next tier
 * - formatShareMessage: Format share message with placeholders
 * - buildShareUrl: Build platform-specific share URLs
 */

import { describe, it, expect } from 'vitest';
import {
  getTierForPoints,
  getTierProgress,
  formatShareMessage,
  buildShareUrl,
  DEFAULT_TIERS,
  DEFAULT_POINTS_ACTIONS,
  DEFAULT_SHARE_TEMPLATES,
  LoyaltyTier,
  SharePlatform,
} from '../loyalty';

// =====================================================
// getTierForPoints
// =====================================================

describe('getTierForPoints', () => {
  describe('with default tiers', () => {
    it('should return Bronze for 0 points', () => {
      const tier = getTierForPoints(0);
      expect(tier.id).toBe('bronze');
      expect(tier.name).toBe('Bronze');
    });

    it('should return Bronze for points below Silver threshold', () => {
      const tier = getTierForPoints(499);
      expect(tier.id).toBe('bronze');
    });

    it('should return Silver for 500 points', () => {
      const tier = getTierForPoints(500);
      expect(tier.id).toBe('silver');
    });

    it('should return Silver for 1999 points', () => {
      const tier = getTierForPoints(1999);
      expect(tier.id).toBe('silver');
    });

    it('should return Gold for 2000 points', () => {
      const tier = getTierForPoints(2000);
      expect(tier.id).toBe('gold');
    });

    it('should return Gold for 4999 points', () => {
      const tier = getTierForPoints(4999);
      expect(tier.id).toBe('gold');
    });

    it('should return Platinum for 5000 points', () => {
      const tier = getTierForPoints(5000);
      expect(tier.id).toBe('platinum');
    });

    it('should return Platinum for 9999 points', () => {
      const tier = getTierForPoints(9999);
      expect(tier.id).toBe('platinum');
    });

    it('should return Diamond for 10000 points', () => {
      const tier = getTierForPoints(10000);
      expect(tier.id).toBe('diamond');
    });

    it('should return Diamond for very high points', () => {
      const tier = getTierForPoints(1000000);
      expect(tier.id).toBe('diamond');
    });

    it('should handle negative points by returning first tier', () => {
      const tier = getTierForPoints(-100);
      expect(tier.id).toBe('bronze');
    });
  });

  describe('with custom tiers', () => {
    const customTiers: LoyaltyTier[] = [
      {
        id: 'bronze',
        name: 'Starter',
        nameIt: 'Iniziale',
        icon: '🥉',
        color: 'text-amber-700',
        gradientFrom: 'from-amber-600',
        gradientTo: 'to-amber-800',
        minPoints: 0,
        maxPoints: 99,
        pointsMultiplier: 1.0,
        benefits: [],
      },
      {
        id: 'gold',
        name: 'VIP',
        nameIt: 'VIP',
        icon: '🥇',
        color: 'text-yellow-500',
        gradientFrom: 'from-yellow-400',
        gradientTo: 'to-amber-500',
        minPoints: 100,
        maxPoints: null,
        pointsMultiplier: 2.0,
        benefits: [],
      },
    ];

    it('should work with custom tier thresholds', () => {
      const tier = getTierForPoints(50, customTiers);
      expect(tier.name).toBe('Starter');
    });

    it('should return custom VIP tier at threshold', () => {
      const tier = getTierForPoints(100, customTiers);
      expect(tier.name).toBe('VIP');
    });

    it('should return custom VIP tier above threshold', () => {
      const tier = getTierForPoints(500, customTiers);
      expect(tier.name).toBe('VIP');
    });
  });

  describe('with single tier', () => {
    const singleTier: LoyaltyTier[] = [
      {
        id: 'bronze',
        name: 'Member',
        nameIt: 'Membro',
        icon: '⭐',
        color: 'text-gray-500',
        gradientFrom: 'from-gray-400',
        gradientTo: 'to-gray-600',
        minPoints: 0,
        maxPoints: null,
        pointsMultiplier: 1.0,
        benefits: [],
      },
    ];

    it('should always return single tier', () => {
      expect(getTierForPoints(0, singleTier).name).toBe('Member');
      expect(getTierForPoints(1000, singleTier).name).toBe('Member');
      expect(getTierForPoints(1000000, singleTier).name).toBe('Member');
    });
  });

  describe('edge cases', () => {
    it('should handle exactly at tier boundaries', () => {
      // At exact boundary of Silver (500)
      const atSilver = getTierForPoints(500);
      expect(atSilver.id).toBe('silver');

      // One below Silver
      const belowSilver = getTierForPoints(499);
      expect(belowSilver.id).toBe('bronze');
    });

    it('should handle very large point values', () => {
      const tier = getTierForPoints(Number.MAX_SAFE_INTEGER);
      expect(tier.id).toBe('diamond');
    });
  });
});

// =====================================================
// getTierProgress
// =====================================================

describe('getTierProgress', () => {
  describe('Bronze to Silver progression', () => {
    const bronzeTier = DEFAULT_TIERS.find((t) => t.id === 'bronze')!;

    it('should return 0% progress at 0 points', () => {
      const result = getTierProgress(0, bronzeTier);
      expect(result.progress).toBe(0);
      expect(result.pointsToNext).toBe(500);
      expect(result.nextTier?.id).toBe('silver');
    });

    it('should return 50% progress at 250 points', () => {
      const result = getTierProgress(250, bronzeTier);
      expect(result.progress).toBe(50);
      expect(result.pointsToNext).toBe(250);
    });

    it('should return ~100% at 499 points', () => {
      const result = getTierProgress(499, bronzeTier);
      expect(result.progress).toBeCloseTo(100, 0);
      expect(result.pointsToNext).toBe(1);
    });

    it('should return 100% exactly at 500 points (edge)', () => {
      // At 500 points, actually in Silver tier already
      // But if still considered Bronze for calculation
      const result = getTierProgress(500, bronzeTier);
      expect(result.progress).toBe(100);
    });
  });

  describe('Silver to Gold progression', () => {
    const silverTier = DEFAULT_TIERS.find((t) => t.id === 'silver')!;

    it('should return 0% at Silver minimum', () => {
      const result = getTierProgress(500, silverTier);
      expect(result.progress).toBe(0);
      expect(result.pointsToNext).toBe(1500); // 2000 - 500
      expect(result.nextTier?.id).toBe('gold');
    });

    it('should return ~33% at 1000 points', () => {
      const result = getTierProgress(1000, silverTier);
      // (1000 - 500) / (2000 - 500) = 500/1500 = 33.3%
      expect(result.progress).toBeCloseTo(33, 0);
    });

    it('should return ~67% at 1500 points', () => {
      const result = getTierProgress(1500, silverTier);
      // (1500 - 500) / (2000 - 500) = 1000/1500 = 66.7%
      expect(result.progress).toBeCloseTo(67, 0);
    });
  });

  describe('Diamond (max tier)', () => {
    const diamondTier = DEFAULT_TIERS.find((t) => t.id === 'diamond')!;

    it('should return 100% and null for next tier', () => {
      const result = getTierProgress(10000, diamondTier);
      expect(result.progress).toBe(100);
      expect(result.pointsToNext).toBeNull();
      expect(result.nextTier).toBeNull();
    });

    it('should return 100% even with very high points', () => {
      const result = getTierProgress(1000000, diamondTier);
      expect(result.progress).toBe(100);
      expect(result.pointsToNext).toBeNull();
    });
  });

  describe('with custom tiers', () => {
    const customTiers: LoyaltyTier[] = [
      {
        id: 'bronze',
        name: 'Basic',
        nameIt: 'Base',
        icon: '🥉',
        color: 'text-amber-700',
        gradientFrom: 'from-amber-600',
        gradientTo: 'to-amber-800',
        minPoints: 0,
        maxPoints: 49,
        pointsMultiplier: 1.0,
        benefits: [],
      },
      {
        id: 'silver',
        name: 'Pro',
        nameIt: 'Pro',
        icon: '🥈',
        color: 'text-gray-400',
        gradientFrom: 'from-gray-400',
        gradientTo: 'to-gray-600',
        minPoints: 50,
        maxPoints: null,
        pointsMultiplier: 1.5,
        benefits: [],
      },
    ];

    it('should calculate progress with custom thresholds', () => {
      const result = getTierProgress(25, customTiers[0], customTiers);
      expect(result.progress).toBe(50); // 25/50
      expect(result.pointsToNext).toBe(25);
      expect(result.nextTier?.name).toBe('Pro');
    });
  });
});

// =====================================================
// formatShareMessage
// =====================================================

describe('formatShareMessage', () => {
  describe('placeholder replacement', () => {
    it('should replace {merchant} placeholder', () => {
      const template = 'Visit {merchant} today!';
      const result = formatShareMessage(template, { merchant: 'Caffè Rossi' });
      expect(result).toBe('Visit Caffè Rossi today!');
    });

    it('should replace {dish} placeholder', () => {
      const template = 'Try the amazing {dish}!';
      const result = formatShareMessage(template, {
        merchant: 'Test',
        dish: 'Tiramisu',
      });
      expect(result).toBe('Try the amazing Tiramisu!');
    });

    it('should replace {user} placeholder', () => {
      const template = 'Thanks {user} for visiting!';
      const result = formatShareMessage(template, {
        merchant: 'Test',
        user: 'Mario',
      });
      expect(result).toBe('Thanks Mario for visiting!');
    });

    it('should replace all placeholders in one template', () => {
      const template = '{user} is enjoying {dish} at {merchant}!';
      const result = formatShareMessage(template, {
        merchant: 'Ristorante Roma',
        dish: 'Carbonara',
        user: 'Luigi',
      });
      expect(result).toBe('Luigi is enjoying Carbonara at Ristorante Roma!');
    });
  });

  describe('missing placeholders', () => {
    it('should replace missing dish with empty string', () => {
      const template = 'Enjoying {dish} at {merchant}';
      const result = formatShareMessage(template, { merchant: 'Caffè' });
      expect(result).toBe('Enjoying  at Caffè');
    });

    it('should replace missing user with empty string', () => {
      const template = '{user} loves {merchant}';
      const result = formatShareMessage(template, { merchant: 'Pizzeria' });
      expect(result).toBe(' loves Pizzeria');
    });
  });

  describe('special characters', () => {
    it('should handle Italian characters', () => {
      const template = 'Visita {merchant}!';
      const result = formatShareMessage(template, { merchant: 'Caffè Perù' });
      expect(result).toBe('Visita Caffè Perù!');
    });

    it('should handle emojis', () => {
      const template = '🍕 {dish} at {merchant} 🇮🇹';
      const result = formatShareMessage(template, {
        merchant: 'Pizza Place',
        dish: 'Margherita',
      });
      expect(result).toBe('🍕 Margherita at Pizza Place 🇮🇹');
    });

    it('should handle quotes and apostrophes', () => {
      const template = "Try {merchant}'s famous {dish}!";
      const result = formatShareMessage(template, {
        merchant: "Mario's",
        dish: "Nonna's Pasta",
      });
      expect(result).toBe("Try Mario's's famous Nonna's Pasta!");
    });
  });

  describe('default share templates', () => {
    it('should format dish_photo template correctly', () => {
      const template = DEFAULT_SHARE_TEMPLATES.find((t) => t.id === 'dish_photo');
      expect(template).toBeDefined();
      const result = formatShareMessage(template!.messageTemplate, {
        dish: 'Pizza Margherita',
        merchant: 'Trattoria Roma',
      });
      expect(result).toContain('Pizza Margherita');
      expect(result).toContain('Trattoria Roma');
    });

    it('should format recommend template correctly', () => {
      const template = DEFAULT_SHARE_TEMPLATES.find((t) => t.id === 'recommend');
      expect(template).toBeDefined();
      const result = formatShareMessage(template!.messageTemplate, {
        merchant: 'Best Café',
      });
      expect(result).toContain('Best Café');
    });
  });
});

// =====================================================
// buildShareUrl
// =====================================================

describe('buildShareUrl', () => {
  const testMessage = 'Check out this place!';
  const testUrl = 'https://example.com/share';
  const testHashtags = ['food', 'restaurant'];

  describe('Twitter', () => {
    it('should build correct Twitter share URL', () => {
      const url = buildShareUrl('twitter', testMessage, testUrl, testHashtags);
      expect(url).toContain('twitter.com/intent/tweet');
      expect(url).toContain(encodeURIComponent(testMessage));
      expect(url).toContain(encodeURIComponent(testUrl));
      expect(url).toContain('hashtags=food,restaurant');
    });

    it('should handle empty hashtags', () => {
      const url = buildShareUrl('twitter', testMessage, testUrl, []);
      expect(url).toContain('twitter.com/intent/tweet');
      expect(url).toContain('hashtags=');
    });

    it('should URL encode special characters in message', () => {
      const specialMessage = 'Amazing food & drinks!';
      const url = buildShareUrl('twitter', specialMessage, testUrl, []);
      expect(url).toContain(encodeURIComponent(specialMessage));
    });
  });

  describe('Facebook', () => {
    it('should build correct Facebook share URL', () => {
      const url = buildShareUrl('facebook', testMessage, testUrl, testHashtags);
      expect(url).toContain('facebook.com/sharer/sharer.php');
      expect(url).toContain('u=' + encodeURIComponent(testUrl));
      expect(url).toContain('quote=' + encodeURIComponent(testMessage));
    });
  });

  describe('WhatsApp', () => {
    it('should build correct WhatsApp share URL', () => {
      const url = buildShareUrl('whatsapp', testMessage, testUrl, testHashtags);
      expect(url).toContain('wa.me');
      expect(url).toContain(encodeURIComponent(testMessage));
      expect(url).toContain(encodeURIComponent(testUrl));
    });

    it('should format WhatsApp URL with message and link', () => {
      const url = buildShareUrl('whatsapp', 'Hello', 'https://test.com', []);
      expect(url).toBe('https://wa.me/?text=Hello%20https%3A%2F%2Ftest.com');
    });
  });

  describe('Native sharing', () => {
    it('should return empty string for native platform', () => {
      const url = buildShareUrl('native', testMessage, testUrl, testHashtags);
      expect(url).toBe('');
    });
  });

  describe('Instagram/TikTok', () => {
    it('should return empty string for instagram (uses native)', () => {
      // Instagram deep linking is handled differently
      const url = buildShareUrl('instagram' as SharePlatform, testMessage, testUrl, testHashtags);
      // Note: buildShareUrl doesn't have explicit handling for instagram
      // so it falls through to default (empty string)
      expect(url).toBe('');
    });

    it('should return empty string for tiktok (uses native)', () => {
      const url = buildShareUrl('tiktok' as SharePlatform, testMessage, testUrl, testHashtags);
      expect(url).toBe('');
    });
  });

  describe('URL encoding', () => {
    it('should properly encode URLs with query params', () => {
      const urlWithParams = 'https://example.com/share?ref=loyalty&id=123';
      const url = buildShareUrl('twitter', testMessage, urlWithParams, []);
      expect(url).toContain(encodeURIComponent(urlWithParams));
    });

    it('should handle Italian characters in message', () => {
      const italianMessage = 'Che buono! Caffè eccezionale!';
      const url = buildShareUrl('whatsapp', italianMessage, testUrl, []);
      expect(url).toContain(encodeURIComponent(italianMessage));
    });

    it('should handle emojis in message', () => {
      const emojiMessage = 'Amazing! 🍕🍝🇮🇹';
      const url = buildShareUrl('twitter', emojiMessage, testUrl, []);
      expect(url).toContain(encodeURIComponent(emojiMessage));
    });
  });
});

// =====================================================
// DEFAULT_TIERS constants
// =====================================================

describe('DEFAULT_TIERS', () => {
  it('should have 5 tiers', () => {
    expect(DEFAULT_TIERS).toHaveLength(5);
  });

  it('should have tiers in correct order', () => {
    const ids = DEFAULT_TIERS.map((t) => t.id);
    expect(ids).toEqual(['bronze', 'silver', 'gold', 'platinum', 'diamond']);
  });

  it('should have increasing minPoints', () => {
    for (let i = 1; i < DEFAULT_TIERS.length; i++) {
      expect(DEFAULT_TIERS[i].minPoints).toBeGreaterThan(DEFAULT_TIERS[i - 1].minPoints);
    }
  });

  it('should have increasing multipliers', () => {
    for (let i = 1; i < DEFAULT_TIERS.length; i++) {
      expect(DEFAULT_TIERS[i].pointsMultiplier).toBeGreaterThanOrEqual(
        DEFAULT_TIERS[i - 1].pointsMultiplier
      );
    }
  });

  it('should have bronze with multiplier 1.0', () => {
    const bronze = DEFAULT_TIERS.find((t) => t.id === 'bronze');
    expect(bronze?.pointsMultiplier).toBe(1.0);
  });

  it('should have diamond with multiplier 1.5', () => {
    const diamond = DEFAULT_TIERS.find((t) => t.id === 'diamond');
    expect(diamond?.pointsMultiplier).toBe(1.5);
  });

  it('should have all required fields for each tier', () => {
    for (const tier of DEFAULT_TIERS) {
      expect(tier.id).toBeDefined();
      expect(tier.name).toBeDefined();
      expect(tier.nameIt).toBeDefined();
      expect(tier.icon).toBeDefined();
      expect(tier.color).toBeDefined();
      expect(tier.gradientFrom).toBeDefined();
      expect(tier.gradientTo).toBeDefined();
      expect(tier.minPoints).toBeDefined();
      expect(tier.pointsMultiplier).toBeDefined();
      expect(tier.benefits).toBeDefined();
    }
  });

  it('should have non-overlapping point ranges', () => {
    for (let i = 0; i < DEFAULT_TIERS.length - 1; i++) {
      const currentMax = DEFAULT_TIERS[i].maxPoints;
      const nextMin = DEFAULT_TIERS[i + 1].minPoints;
      if (currentMax !== null) {
        expect(currentMax).toBeLessThan(nextMin);
      }
    }
  });

  it('should have Diamond with null maxPoints (unlimited)', () => {
    const diamond = DEFAULT_TIERS.find((t) => t.id === 'diamond');
    expect(diamond?.maxPoints).toBeNull();
  });
});

// =====================================================
// DEFAULT_POINTS_ACTIONS constants
// =====================================================

describe('DEFAULT_POINTS_ACTIONS', () => {
  it('should have purchase action enabled by default', () => {
    const purchase = DEFAULT_POINTS_ACTIONS.find((a) => a.type === 'purchase');
    expect(purchase).toBeDefined();
    expect(purchase?.enabled).toBe(true);
  });

  it('should have all actions with required fields', () => {
    for (const action of DEFAULT_POINTS_ACTIONS) {
      expect(action.type).toBeDefined();
      expect(action.name).toBeDefined();
      expect(action.nameIt).toBeDefined();
      expect(action.description).toBeDefined();
      expect(action.descriptionIt).toBeDefined();
      expect(action.icon).toBeDefined();
      expect(action.category).toBeDefined();
      expect(typeof action.points).toBe('number');
      expect(typeof action.requiresVerification).toBe('boolean');
      expect(typeof action.enabled).toBe('boolean');
    }
  });

  it('should have verification required for review actions', () => {
    const googleReview = DEFAULT_POINTS_ACTIONS.find((a) => a.type === 'review_google');
    const tripReview = DEFAULT_POINTS_ACTIONS.find((a) => a.type === 'review_tripadvisor');
    expect(googleReview?.requiresVerification).toBe(true);
    expect(tripReview?.requiresVerification).toBe(true);
  });

  it('should have proper categories', () => {
    const categories = new Set(DEFAULT_POINTS_ACTIONS.map((a) => a.category));
    expect(categories.has('purchase')).toBe(true);
    expect(categories.has('engagement')).toBe(true);
    expect(categories.has('social')).toBe(true);
    expect(categories.has('referral')).toBe(true);
    expect(categories.has('gamification')).toBe(true);
  });

  it('should have daily caps for repeatable actions', () => {
    const checkin = DEFAULT_POINTS_ACTIONS.find((a) => a.type === 'checkin');
    expect(checkin?.maxPointsPerDay).toBeDefined();
    expect(checkin?.cooldownHours).toBeDefined();
  });

  it('should have total caps for one-time actions', () => {
    const firstPurchase = DEFAULT_POINTS_ACTIONS.find((a) => a.type === 'first_purchase');
    const follow = DEFAULT_POINTS_ACTIONS.find((a) => a.type === 'follow');
    expect(firstPurchase?.maxPointsTotal).toBe(50);
    expect(follow?.maxPointsTotal).toBe(25);
  });
});

// =====================================================
// DEFAULT_SHARE_TEMPLATES constants
// =====================================================

describe('DEFAULT_SHARE_TEMPLATES', () => {
  it('should have share templates defined', () => {
    expect(DEFAULT_SHARE_TEMPLATES.length).toBeGreaterThan(0);
  });

  it('should have dish_photo template', () => {
    const template = DEFAULT_SHARE_TEMPLATES.find((t) => t.id === 'dish_photo');
    expect(template).toBeDefined();
    expect(template?.requiresPhoto).toBe(true);
    expect(template?.suggestedPhotoType).toBe('dish');
  });

  it('should have recommend template (no photo required)', () => {
    const template = DEFAULT_SHARE_TEMPLATES.find((t) => t.id === 'recommend');
    expect(template).toBeDefined();
    expect(template?.requiresPhoto).toBe(false);
  });

  it('should have all templates with required fields', () => {
    for (const template of DEFAULT_SHARE_TEMPLATES) {
      expect(template.id).toBeDefined();
      expect(template.name).toBeDefined();
      expect(template.nameIt).toBeDefined();
      expect(template.platforms.length).toBeGreaterThan(0);
      expect(typeof template.pointsReward).toBe('number');
      expect(template.callToAction).toBeDefined();
      expect(template.callToActionIt).toBeDefined();
    }
  });

  it('should have valid platform arrays', () => {
    const validPlatforms: SharePlatform[] = [
      'instagram',
      'facebook',
      'tiktok',
      'twitter',
      'whatsapp',
      'native',
    ];
    for (const template of DEFAULT_SHARE_TEMPLATES) {
      for (const platform of template.platforms) {
        expect(validPlatforms).toContain(platform);
      }
    }
  });

  it('should have positive points rewards', () => {
    for (const template of DEFAULT_SHARE_TEMPLATES) {
      expect(template.pointsReward).toBeGreaterThan(0);
    }
  });
});

// =====================================================
// Business Logic Tests (Points Calculation)
// =====================================================

describe('Points Calculation Business Logic', () => {
  describe('Purchase points earning', () => {
    const purchaseAction = DEFAULT_POINTS_ACTIONS.find((a) => a.type === 'purchase')!;

    it('should have pointsPerUnit for purchase action', () => {
      expect(purchaseAction.pointsPerUnit).toBe(1);
    });

    it('should calculate purchase points correctly', () => {
      const pointsPerUnit = purchaseAction.pointsPerUnit || 0;
      expect(10 * pointsPerUnit).toBe(10); // €10 = 10 points
      expect(25 * pointsPerUnit).toBe(25); // €25 = 25 points
      expect(100 * pointsPerUnit).toBe(100); // €100 = 100 points
    });
  });

  describe('Tier multiplier application', () => {
    it('should calculate bonus points correctly with multipliers', () => {
      const basePoints = 100;

      const bronzeBonus = basePoints * DEFAULT_TIERS[0].pointsMultiplier;
      expect(bronzeBonus).toBeCloseTo(100, 5); // 1.0x

      const silverBonus = basePoints * DEFAULT_TIERS[1].pointsMultiplier;
      expect(silverBonus).toBeCloseTo(110, 5); // 1.1x

      const goldBonus = basePoints * DEFAULT_TIERS[2].pointsMultiplier;
      expect(goldBonus).toBeCloseTo(120, 5); // 1.2x

      const platinumBonus = basePoints * DEFAULT_TIERS[3].pointsMultiplier;
      expect(platinumBonus).toBeCloseTo(130, 5); // 1.3x

      const diamondBonus = basePoints * DEFAULT_TIERS[4].pointsMultiplier;
      expect(diamondBonus).toBeCloseTo(150, 5); // 1.5x
    });
  });

  describe('Cooldown logic', () => {
    it('should have 4 hour cooldown for checkin', () => {
      const checkin = DEFAULT_POINTS_ACTIONS.find((a) => a.type === 'checkin')!;
      expect(checkin.cooldownHours).toBe(4);
    });

    it('should have 2 hour cooldown for share intent', () => {
      const share = DEFAULT_POINTS_ACTIONS.find((a) => a.type === 'share_intent')!;
      expect(share.cooldownHours).toBe(2);
    });
  });

  describe('Daily caps', () => {
    it('should limit checkin points to 10 per day', () => {
      const checkin = DEFAULT_POINTS_ACTIONS.find((a) => a.type === 'checkin')!;
      expect(checkin.maxPointsPerDay).toBe(10);
      expect(checkin.points).toBe(10);
      // Can only earn once per day
    });

    it('should limit share intent to 30 points per day', () => {
      const share = DEFAULT_POINTS_ACTIONS.find((a) => a.type === 'share_intent')!;
      expect(share.maxPointsPerDay).toBe(30);
      expect(share.points).toBe(15);
      // Can earn twice per day max
    });
  });
});

// =====================================================
// Tier Progression Scenarios
// =====================================================

describe('Tier Progression Scenarios', () => {
  describe('New customer journey', () => {
    it('should start at Bronze', () => {
      const tier = getTierForPoints(0);
      expect(tier.id).toBe('bronze');
    });

    it('should reach Silver after €500 spent (at 1 point/€)', () => {
      const tier = getTierForPoints(500);
      expect(tier.id).toBe('silver');
    });

    it('should reach Gold after €2000 spent', () => {
      const tier = getTierForPoints(2000);
      expect(tier.id).toBe('gold');
    });
  });

  describe('Points to next tier calculations', () => {
    it('should calculate points needed from Bronze to Silver', () => {
      const bronze = DEFAULT_TIERS[0];
      const result = getTierProgress(100, bronze);
      expect(result.pointsToNext).toBe(400); // 500 - 100
    });

    it('should calculate points needed from Silver to Gold', () => {
      const silver = DEFAULT_TIERS[1];
      const result = getTierProgress(1000, silver);
      expect(result.pointsToNext).toBe(1000); // 2000 - 1000
    });

    it('should calculate points needed from Gold to Platinum', () => {
      const gold = DEFAULT_TIERS[2];
      const result = getTierProgress(3000, gold);
      expect(result.pointsToNext).toBe(2000); // 5000 - 3000
    });

    it('should calculate points needed from Platinum to Diamond', () => {
      const platinum = DEFAULT_TIERS[3];
      const result = getTierProgress(7500, platinum);
      expect(result.pointsToNext).toBe(2500); // 10000 - 7500
    });
  });

  describe('Earning velocity', () => {
    // With 1 point per € spent
    it('should calculate time to reach Silver (€500)', () => {
      // If customer spends €50/week = 50 points/week
      const weeksToSilver = 500 / 50;
      expect(weeksToSilver).toBe(10); // 10 weeks
    });

    it('should calculate time to reach Diamond (€10000)', () => {
      // If customer spends €100/week = 100 points/week
      const weeksToDiamond = 10000 / 100;
      expect(weeksToDiamond).toBe(100); // 100 weeks (~2 years)
    });
  });
});

// =====================================================
// Social Sharing Scenarios
// =====================================================

describe('Social Sharing Scenarios', () => {
  describe('Share URL generation for different platforms', () => {
    const shareData = {
      message: 'Amazing pizza at Roma Pizzeria!',
      url: 'https://gudbro.com/roma-pizzeria',
      hashtags: ['pizza', 'italian', 'foodie'],
    };

    it('should generate complete Twitter share URL', () => {
      const url = buildShareUrl('twitter', shareData.message, shareData.url, shareData.hashtags);
      expect(url).toMatch(/^https:\/\/twitter\.com\/intent\/tweet\?/);
      expect(url).toContain('text=');
      expect(url).toContain('url=');
      expect(url).toContain('hashtags=');
    });

    it('should generate complete Facebook share URL', () => {
      const url = buildShareUrl('facebook', shareData.message, shareData.url, shareData.hashtags);
      expect(url).toMatch(/^https:\/\/www\.facebook\.com\/sharer\//);
      expect(url).toContain('u=');
      expect(url).toContain('quote=');
    });

    it('should generate complete WhatsApp share URL', () => {
      const url = buildShareUrl('whatsapp', shareData.message, shareData.url, shareData.hashtags);
      expect(url).toMatch(/^https:\/\/wa\.me\//);
      expect(url).toContain('text=');
    });
  });

  describe('Message template scenarios', () => {
    it('should format full dining experience message', () => {
      const result = formatShareMessage(
        'Just had the most incredible {dish} at {merchant}! Highly recommend!',
        {
          dish: 'Carbonara',
          merchant: 'Trattoria Toscana',
        }
      );
      expect(result).toBe(
        'Just had the most incredible Carbonara at Trattoria Toscana! Highly recommend!'
      );
    });

    it('should format event announcement', () => {
      const result = formatShareMessage("Join me at {merchant}'s wine tasting tonight!", {
        merchant: "Antonio's Wine Bar",
      });
      expect(result).toBe("Join me at Antonio's Wine Bar's wine tasting tonight!");
    });
  });
});
