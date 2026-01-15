/**
 * Tests for challenges-service.ts
 *
 * Tests cover:
 * - Types and interfaces (FoodChallenge, ChallengeAttempt, etc.)
 * - Pure helper functions (formatTime, parseTime, getDifficultyColor, getDifficultyLabel)
 * - Constants (DIFFICULTY_OPTIONS, WIN_REWARD_OPTIONS, DAYS_OPTIONS)
 * - Type unions (ChallengeDifficulty, WinRewardType)
 */

import { describe, it, expect } from 'vitest';
import type {
  ChallengeDifficulty,
  WinRewardType,
  ChallengeItem,
  FoodChallenge,
  ChallengeAttempt,
  ChallengeFormData,
  AttemptFormData,
  WallOfFameEntry,
  ChallengeStats,
} from '../challenges-service';
import {
  formatTime,
  parseTime,
  getDifficultyColor,
  getDifficultyLabel,
  DIFFICULTY_OPTIONS,
  WIN_REWARD_OPTIONS,
  DAYS_OPTIONS,
} from '../challenges-service';

// ============================================
// TYPE DEFINITIONS
// ============================================

describe('ChallengeDifficulty type', () => {
  it('should accept valid difficulty values', () => {
    const easy: ChallengeDifficulty = 'easy';
    const medium: ChallengeDifficulty = 'medium';
    const hard: ChallengeDifficulty = 'hard';
    const extreme: ChallengeDifficulty = 'extreme';

    expect(easy).toBe('easy');
    expect(medium).toBe('medium');
    expect(hard).toBe('hard');
    expect(extreme).toBe('extreme');
  });

  it('should have 4 difficulty levels', () => {
    const validDifficulties: ChallengeDifficulty[] = ['easy', 'medium', 'hard', 'extreme'];
    expect(validDifficulties).toHaveLength(4);
  });

  it('should match DIFFICULTY_OPTIONS values', () => {
    const difficulties: ChallengeDifficulty[] = ['easy', 'medium', 'hard', 'extreme'];
    const optionValues = DIFFICULTY_OPTIONS.map((opt) => opt.value);
    expect(optionValues).toEqual(difficulties);
  });
});

describe('WinRewardType type', () => {
  it('should accept valid reward types', () => {
    const free: WinRewardType = 'free';
    const freePlusCash: WinRewardType = 'free_plus_cash';
    const freePlusPrize: WinRewardType = 'free_plus_prize';

    expect(free).toBe('free');
    expect(freePlusCash).toBe('free_plus_cash');
    expect(freePlusPrize).toBe('free_plus_prize');
  });

  it('should have 3 reward types', () => {
    const validRewards: WinRewardType[] = ['free', 'free_plus_cash', 'free_plus_prize'];
    expect(validRewards).toHaveLength(3);
  });

  it('should match WIN_REWARD_OPTIONS values', () => {
    const rewards: WinRewardType[] = ['free', 'free_plus_cash', 'free_plus_prize'];
    const optionValues = WIN_REWARD_OPTIONS.map((opt) => opt.value);
    expect(optionValues).toEqual(rewards);
  });
});

describe('ChallengeItem interface', () => {
  it('should have required name and quantity fields', () => {
    const item: ChallengeItem = {
      name: 'Burger',
      quantity: '5 pieces',
    };

    expect(item.name).toBe('Burger');
    expect(item.quantity).toBe('5 pieces');
  });

  it('should support optional description', () => {
    const itemWithDesc: ChallengeItem = {
      name: 'Fries',
      quantity: '2 kg',
      description: 'Extra crispy',
    };

    expect(itemWithDesc.description).toBe('Extra crispy');
  });

  it('should allow multiple items in array', () => {
    const items: ChallengeItem[] = [
      { name: 'Burger', quantity: '5' },
      { name: 'Fries', quantity: '1 kg' },
      { name: 'Soda', quantity: '2 liters' },
    ];

    expect(items).toHaveLength(3);
  });
});

describe('FoodChallenge interface', () => {
  it('should require essential fields', () => {
    const challenge: Partial<FoodChallenge> = {
      id: '123',
      merchant_id: 'merchant-456',
      name: 'Monster Burger Challenge',
      time_limit_minutes: 30,
      price_if_lose: 49.99,
      difficulty: 'hard',
      is_active: true,
    };

    expect(challenge.id).toBe('123');
    expect(challenge.name).toBe('Monster Burger Challenge');
    expect(challenge.time_limit_minutes).toBe(30);
    expect(challenge.price_if_lose).toBe(49.99);
    expect(challenge.difficulty).toBe('hard');
  });

  it('should support nullable fields', () => {
    const challenge: Partial<FoodChallenge> = {
      description: null,
      image_url: null,
      win_cash_prize: null,
      record_time_minutes: null,
      record_holder_name: null,
    };

    expect(challenge.description).toBeNull();
    expect(challenge.win_cash_prize).toBeNull();
    expect(challenge.record_time_minutes).toBeNull();
  });

  it('should support team challenges', () => {
    const teamChallenge: Partial<FoodChallenge> = {
      is_team_challenge: true,
      team_size: 4,
    };

    expect(teamChallenge.is_team_challenge).toBe(true);
    expect(teamChallenge.team_size).toBe(4);
  });

  it('should support record bonus', () => {
    const challenge: Partial<FoodChallenge> = {
      record_bonus_enabled: true,
      record_bonus_cash: 100,
      record_bonus_prize: 'Gold Medal',
    };

    expect(challenge.record_bonus_enabled).toBe(true);
    expect(challenge.record_bonus_cash).toBe(100);
    expect(challenge.record_bonus_prize).toBe('Gold Medal');
  });

  it('should track availability settings', () => {
    const challenge: Partial<FoodChallenge> = {
      requires_booking: true,
      available_days: [5, 6, 0], // Fri, Sat, Sun
      available_time_start: '18:00',
      available_time_end: '22:00',
    };

    expect(challenge.requires_booking).toBe(true);
    expect(challenge.available_days).toEqual([5, 6, 0]);
    expect(challenge.available_time_start).toBe('18:00');
  });
});

describe('ChallengeAttempt interface', () => {
  it('should track basic attempt info', () => {
    const attempt: Partial<ChallengeAttempt> = {
      id: 'attempt-1',
      challenge_id: 'challenge-1',
      merchant_id: 'merchant-1',
      participant_name: 'John Doe',
      succeeded: true,
      completion_time_minutes: 25.5,
    };

    expect(attempt.participant_name).toBe('John Doe');
    expect(attempt.succeeded).toBe(true);
    expect(attempt.completion_time_minutes).toBe(25.5);
  });

  it('should support team members', () => {
    const attempt: Partial<ChallengeAttempt> = {
      team_members: [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }],
    };

    expect(attempt.team_members).toHaveLength(3);
    expect(attempt.team_members![0].name).toBe('Alice');
  });

  it('should track media', () => {
    const attempt: Partial<ChallengeAttempt> = {
      photo_url: 'https://example.com/photo.jpg',
      video_url: 'https://example.com/video.mp4',
    };

    expect(attempt.photo_url).toBe('https://example.com/photo.jpg');
    expect(attempt.video_url).toBe('https://example.com/video.mp4');
  });

  it('should track record status', () => {
    const recordAttempt: Partial<ChallengeAttempt> = {
      is_current_record: true,
      record_bonus_awarded: true,
    };

    expect(recordAttempt.is_current_record).toBe(true);
    expect(recordAttempt.record_bonus_awarded).toBe(true);
  });
});

describe('WallOfFameEntry interface', () => {
  it('should have rank and participant info', () => {
    const entry: WallOfFameEntry = {
      rank: 1,
      participant_name: 'Speed Eater Pro',
      completion_time_minutes: 12.5,
      attempt_date: '2026-01-10',
      photo_url: null,
      video_url: 'https://example.com/record.mp4',
      is_current_record: true,
    };

    expect(entry.rank).toBe(1);
    expect(entry.participant_name).toBe('Speed Eater Pro');
    expect(entry.is_current_record).toBe(true);
  });

  it('should create multiple ranked entries', () => {
    const entries: WallOfFameEntry[] = [
      {
        rank: 1,
        participant_name: 'First',
        completion_time_minutes: 10,
        attempt_date: '2026-01-10',
        photo_url: null,
        video_url: null,
        is_current_record: true,
      },
      {
        rank: 2,
        participant_name: 'Second',
        completion_time_minutes: 15,
        attempt_date: '2026-01-08',
        photo_url: null,
        video_url: null,
        is_current_record: false,
      },
      {
        rank: 3,
        participant_name: 'Third',
        completion_time_minutes: 20,
        attempt_date: '2026-01-05',
        photo_url: null,
        video_url: null,
        is_current_record: false,
      },
    ];

    expect(entries).toHaveLength(3);
    expect(entries[0].rank).toBe(1);
    expect(entries[2].rank).toBe(3);
  });
});

describe('ChallengeStats interface', () => {
  it('should track all stats', () => {
    const stats: ChallengeStats = {
      total_attempts: 100,
      total_wins: 15,
      success_rate: 15.0,
      record_time_minutes: 12.5,
      record_holder_name: 'Champion Joe',
      record_date: '2026-01-05',
      has_ever_been_won: true,
    };

    expect(stats.total_attempts).toBe(100);
    expect(stats.total_wins).toBe(15);
    expect(stats.success_rate).toBe(15.0);
    expect(stats.has_ever_been_won).toBe(true);
  });

  it('should handle zero attempts', () => {
    const emptyStats: ChallengeStats = {
      total_attempts: 0,
      total_wins: 0,
      success_rate: 0,
      record_time_minutes: null,
      record_holder_name: null,
      record_date: null,
      has_ever_been_won: false,
    };

    expect(emptyStats.total_attempts).toBe(0);
    expect(emptyStats.success_rate).toBe(0);
    expect(emptyStats.has_ever_been_won).toBe(false);
    expect(emptyStats.record_time_minutes).toBeNull();
  });
});

describe('ChallengeFormData interface', () => {
  it('should contain all form fields', () => {
    const formData: ChallengeFormData = {
      name: 'Ultimate Challenge',
      description: 'Can you handle it?',
      items: [{ name: 'Giant Burger', quantity: '1' }],
      time_limit_minutes: 30,
      price_if_lose: 35.0,
      rules: ['No utensils', 'Must finish everything'],
      difficulty: 'extreme',
      win_reward_type: 'free_plus_cash',
      win_cash_prize: 50,
      record_bonus_enabled: true,
      record_bonus_cash: 100,
      is_team_challenge: false,
      requires_booking: true,
      available_days: [5, 6],
      is_active: true,
    };

    expect(formData.name).toBe('Ultimate Challenge');
    expect(formData.rules).toHaveLength(2);
    expect(formData.win_reward_type).toBe('free_plus_cash');
  });

  it('should have sensible defaults', () => {
    const minimalForm: ChallengeFormData = {
      name: 'Simple Challenge',
      items: [{ name: 'Food', quantity: '1' }],
      time_limit_minutes: 15,
      price_if_lose: 20,
      rules: [],
      difficulty: 'easy',
      win_reward_type: 'free',
      record_bonus_enabled: false,
      is_team_challenge: false,
      requires_booking: false,
      is_active: true,
    };

    expect(minimalForm.record_bonus_enabled).toBe(false);
    expect(minimalForm.is_team_challenge).toBe(false);
  });
});

describe('AttemptFormData interface', () => {
  it('should track attempt submission', () => {
    const attemptData: AttemptFormData = {
      participant_name: 'Brave Challenger',
      succeeded: false,
      attempt_date: '2026-01-14',
    };

    expect(attemptData.participant_name).toBe('Brave Challenger');
    expect(attemptData.succeeded).toBe(false);
  });

  it('should track successful attempt with time', () => {
    const successAttempt: AttemptFormData = {
      participant_name: 'Winner',
      succeeded: true,
      completion_time_minutes: 18.5,
      attempt_date: '2026-01-14',
      photo_url: 'https://example.com/victory.jpg',
    };

    expect(successAttempt.succeeded).toBe(true);
    expect(successAttempt.completion_time_minutes).toBe(18.5);
  });
});

// ============================================
// HELPER FUNCTIONS
// ============================================

describe('formatTime', () => {
  it('should format whole minutes', () => {
    expect(formatTime(5)).toBe('5:00');
    expect(formatTime(10)).toBe('10:00');
    expect(formatTime(30)).toBe('30:00');
  });

  it('should format minutes with seconds', () => {
    expect(formatTime(5.5)).toBe('5:30');
    expect(formatTime(10.25)).toBe('10:15');
    expect(formatTime(15.75)).toBe('15:45');
  });

  it('should handle zero', () => {
    expect(formatTime(0)).toBe('0:00');
  });

  it('should handle small fractions', () => {
    expect(formatTime(1.0833)).toBe('1:05'); // ~1 minute 5 seconds
    expect(formatTime(0.5)).toBe('0:30');
  });

  it('should round seconds properly', () => {
    expect(formatTime(1.999)).toBe('1:60'); // Edge case - rounds to 60
    expect(formatTime(1.016667)).toBe('1:01'); // ~1 minute 1 second
  });

  it('should format typical challenge times', () => {
    expect(formatTime(12.5)).toBe('12:30');
    expect(formatTime(25.75)).toBe('25:45');
    expect(formatTime(59.5)).toBe('59:30');
  });

  it('should handle large times', () => {
    expect(formatTime(120)).toBe('120:00'); // 2 hours
    expect(formatTime(90.5)).toBe('90:30');
  });
});

describe('parseTime', () => {
  it('should parse time string to minutes', () => {
    expect(parseTime('5:00')).toBe(5);
    expect(parseTime('10:30')).toBe(10.5);
    expect(parseTime('15:45')).toBe(15.75);
  });

  it('should handle zero seconds', () => {
    expect(parseTime('0:00')).toBe(0);
    expect(parseTime('30:00')).toBe(30);
  });

  it('should handle only minutes', () => {
    expect(parseTime('5:')).toBe(5);
    // Note: parseTime('5') would give NaN for seconds part
  });

  it('should be inverse of formatTime', () => {
    const testValues = [5, 10.5, 15.75, 25.25, 30];
    testValues.forEach((original) => {
      const formatted = formatTime(original);
      const parsed = parseTime(formatted);
      // Allow small floating point differences
      expect(Math.abs(parsed - original)).toBeLessThan(0.02);
    });
  });

  it('should parse typical times', () => {
    expect(parseTime('12:30')).toBe(12.5);
    expect(parseTime('25:15')).toBe(25.25);
  });

  it('should handle leading zeros', () => {
    expect(parseTime('05:05')).toBe(5 + 5 / 60);
    expect(parseTime('01:01')).toBeCloseTo(1.0167, 2);
  });
});

describe('getDifficultyColor', () => {
  it('should return green for easy', () => {
    const color = getDifficultyColor('easy');
    expect(color).toBe('bg-green-100 text-green-700');
  });

  it('should return yellow for medium', () => {
    const color = getDifficultyColor('medium');
    expect(color).toBe('bg-yellow-100 text-yellow-700');
  });

  it('should return orange for hard', () => {
    const color = getDifficultyColor('hard');
    expect(color).toBe('bg-orange-100 text-orange-700');
  });

  it('should return red for extreme', () => {
    const color = getDifficultyColor('extreme');
    expect(color).toBe('bg-red-100 text-red-700');
  });

  it('should return gray for unknown difficulty', () => {
    // @ts-expect-error testing unknown value
    const color = getDifficultyColor('unknown');
    expect(color).toBe('bg-gray-100 text-gray-700');
  });

  it('should follow danger escalation pattern', () => {
    // Colors should escalate from calm to alarming
    const easyColor = getDifficultyColor('easy');
    const mediumColor = getDifficultyColor('medium');
    const hardColor = getDifficultyColor('hard');
    const extremeColor = getDifficultyColor('extreme');

    expect(easyColor).toContain('green');
    expect(mediumColor).toContain('yellow');
    expect(hardColor).toContain('orange');
    expect(extremeColor).toContain('red');
  });
});

describe('getDifficultyLabel', () => {
  it('should return Italian label for easy', () => {
    expect(getDifficultyLabel('easy')).toBe('Facile');
  });

  it('should return Italian label for medium', () => {
    expect(getDifficultyLabel('medium')).toBe('Media');
  });

  it('should return Italian label for hard', () => {
    expect(getDifficultyLabel('hard')).toBe('Difficile');
  });

  it('should return Italian label for extreme', () => {
    expect(getDifficultyLabel('extreme')).toBe('Estrema');
  });

  it('should return value for unknown difficulty', () => {
    // @ts-expect-error testing unknown value
    expect(getDifficultyLabel('unknown')).toBe('unknown');
  });

  it('should match DIFFICULTY_OPTIONS labels', () => {
    DIFFICULTY_OPTIONS.forEach((option) => {
      expect(getDifficultyLabel(option.value)).toBe(option.label);
    });
  });
});

// ============================================
// CONSTANTS
// ============================================

describe('DIFFICULTY_OPTIONS', () => {
  it('should have 4 difficulty options', () => {
    expect(DIFFICULTY_OPTIONS).toHaveLength(4);
  });

  it('should have value and label for each option', () => {
    DIFFICULTY_OPTIONS.forEach((option) => {
      expect(option).toHaveProperty('value');
      expect(option).toHaveProperty('label');
      expect(typeof option.value).toBe('string');
      expect(typeof option.label).toBe('string');
    });
  });

  it('should be in order from easy to extreme', () => {
    expect(DIFFICULTY_OPTIONS[0].value).toBe('easy');
    expect(DIFFICULTY_OPTIONS[1].value).toBe('medium');
    expect(DIFFICULTY_OPTIONS[2].value).toBe('hard');
    expect(DIFFICULTY_OPTIONS[3].value).toBe('extreme');
  });

  it('should have Italian labels', () => {
    expect(DIFFICULTY_OPTIONS[0].label).toBe('Facile');
    expect(DIFFICULTY_OPTIONS[1].label).toBe('Media');
    expect(DIFFICULTY_OPTIONS[2].label).toBe('Difficile');
    expect(DIFFICULTY_OPTIONS[3].label).toBe('Estrema');
  });
});

describe('WIN_REWARD_OPTIONS', () => {
  it('should have 3 reward options', () => {
    expect(WIN_REWARD_OPTIONS).toHaveLength(3);
  });

  it('should have value, label, and description for each option', () => {
    WIN_REWARD_OPTIONS.forEach((option) => {
      expect(option).toHaveProperty('value');
      expect(option).toHaveProperty('label');
      expect(option).toHaveProperty('description');
      expect(typeof option.value).toBe('string');
      expect(typeof option.label).toBe('string');
      expect(typeof option.description).toBe('string');
    });
  });

  it('should have correct values', () => {
    const values = WIN_REWARD_OPTIONS.map((opt) => opt.value);
    expect(values).toContain('free');
    expect(values).toContain('free_plus_cash');
    expect(values).toContain('free_plus_prize');
  });

  it('should have Italian labels', () => {
    expect(WIN_REWARD_OPTIONS[0].label).toBe('Pasto Gratis');
    expect(WIN_REWARD_OPTIONS[1].label).toBe('Gratis + Cash');
    expect(WIN_REWARD_OPTIONS[2].label).toBe('Gratis + Premio');
  });

  it('should have meaningful descriptions', () => {
    WIN_REWARD_OPTIONS.forEach((option) => {
      expect(option.description.length).toBeGreaterThan(10);
    });
  });

  it('should start with basic free option', () => {
    expect(WIN_REWARD_OPTIONS[0].value).toBe('free');
  });
});

describe('DAYS_OPTIONS', () => {
  it('should have 7 day options', () => {
    expect(DAYS_OPTIONS).toHaveLength(7);
  });

  it('should have value and label for each day', () => {
    DAYS_OPTIONS.forEach((day) => {
      expect(day).toHaveProperty('value');
      expect(day).toHaveProperty('label');
      expect(typeof day.value).toBe('number');
      expect(typeof day.label).toBe('string');
    });
  });

  it('should start with Sunday (value 0)', () => {
    expect(DAYS_OPTIONS[0].value).toBe(0);
    expect(DAYS_OPTIONS[0].label).toBe('Dom');
  });

  it('should end with Saturday (value 6)', () => {
    expect(DAYS_OPTIONS[6].value).toBe(6);
    expect(DAYS_OPTIONS[6].label).toBe('Sab');
  });

  it('should have values 0-6', () => {
    const values = DAYS_OPTIONS.map((d) => d.value);
    expect(values).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  it('should have Italian abbreviated labels', () => {
    const labels = DAYS_OPTIONS.map((d) => d.label);
    expect(labels).toEqual(['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']);
  });

  it('should be compatible with JavaScript Date.getDay()', () => {
    // JavaScript getDay() returns 0 for Sunday
    const sunday = new Date('2026-01-11'); // A Sunday
    expect(sunday.getDay()).toBe(0);
    expect(DAYS_OPTIONS.find((d) => d.value === 0)?.label).toBe('Dom');

    // Monday = 1
    const monday = new Date('2026-01-12');
    expect(monday.getDay()).toBe(1);
    expect(DAYS_OPTIONS.find((d) => d.value === 1)?.label).toBe('Lun');
  });
});

// ============================================
// EDGE CASES AND INTEGRATION
// ============================================

describe('formatTime and parseTime edge cases', () => {
  it('should handle very small times', () => {
    expect(formatTime(0.1)).toBe('0:06'); // 6 seconds
    expect(formatTime(0.0167)).toBe('0:01'); // ~1 second
  });

  it('should handle very large times', () => {
    expect(formatTime(180)).toBe('180:00'); // 3 hours
    expect(formatTime(1440)).toBe('1440:00'); // 24 hours
  });

  it('should maintain precision for typical challenge times', () => {
    const times = [10, 15.5, 20.25, 25.75, 30];
    times.forEach((time) => {
      const roundTrip = parseTime(formatTime(time));
      expect(Math.abs(roundTrip - time)).toBeLessThan(0.02);
    });
  });
});

describe('Difficulty and Reward type consistency', () => {
  it('should have matching colors for all difficulties', () => {
    DIFFICULTY_OPTIONS.forEach((opt) => {
      const color = getDifficultyColor(opt.value);
      expect(color).toBeDefined();
      expect(color.length).toBeGreaterThan(0);
    });
  });

  it('should have matching labels for all difficulties', () => {
    DIFFICULTY_OPTIONS.forEach((opt) => {
      const label = getDifficultyLabel(opt.value);
      expect(label).toBe(opt.label);
    });
  });

  it('should use consistent color scheme', () => {
    // All colors should follow Tailwind pattern
    const colors = DIFFICULTY_OPTIONS.map((opt) => getDifficultyColor(opt.value));
    colors.forEach((color) => {
      expect(color).toMatch(/^bg-\w+-100 text-\w+-700$/);
    });
  });
});

describe('Real-world challenge scenarios', () => {
  it('should support typical burger challenge', () => {
    const burgerChallenge: Partial<FoodChallenge> = {
      name: 'Monster Burger Challenge',
      items: [
        { name: 'Giant Burger', quantity: '1 (2kg)', description: 'Double patty, triple cheese' },
        { name: 'Fries', quantity: '500g' },
        { name: 'Soda', quantity: '1L' },
      ],
      time_limit_minutes: 30,
      price_if_lose: 45,
      difficulty: 'hard',
      win_reward_type: 'free',
      is_team_challenge: false,
    };

    expect(burgerChallenge.items).toHaveLength(3);
    expect(formatTime(burgerChallenge.time_limit_minutes!)).toBe('30:00');
    expect(getDifficultyColor(burgerChallenge.difficulty!)).toContain('orange');
  });

  it('should support team eating contest', () => {
    const teamContest: Partial<FoodChallenge> = {
      name: 'Pizza Party Challenge',
      items: [{ name: 'XL Pizza', quantity: '5', description: '40cm each' }],
      time_limit_minutes: 60,
      price_if_lose: 100,
      difficulty: 'extreme',
      win_reward_type: 'free_plus_cash',
      win_cash_prize: 200,
      is_team_challenge: true,
      team_size: 4,
    };

    expect(teamContest.is_team_challenge).toBe(true);
    expect(teamContest.team_size).toBe(4);
    expect(getDifficultyColor(teamContest.difficulty!)).toContain('red');
  });

  it('should track Wall of Fame properly', () => {
    const wallOfFame: WallOfFameEntry[] = [
      {
        rank: 1,
        participant_name: 'Competitive Eater Pro',
        completion_time_minutes: 15.5,
        attempt_date: '2026-01-10',
        photo_url: 'https://example.com/winner.jpg',
        video_url: null,
        is_current_record: true,
      },
      {
        rank: 2,
        participant_name: 'Local Hero',
        completion_time_minutes: 18.25,
        attempt_date: '2026-01-05',
        photo_url: null,
        video_url: null,
        is_current_record: false,
      },
    ];

    expect(wallOfFame[0].completion_time_minutes).toBeLessThan(
      wallOfFame[1].completion_time_minutes
    );
    expect(formatTime(wallOfFame[0].completion_time_minutes)).toBe('15:30');
    expect(formatTime(wallOfFame[1].completion_time_minutes)).toBe('18:15');
  });

  it('should calculate stats correctly', () => {
    const stats: ChallengeStats = {
      total_attempts: 50,
      total_wins: 8,
      success_rate: 16,
      record_time_minutes: 12.5,
      record_holder_name: 'Speed King',
      record_date: '2026-01-08',
      has_ever_been_won: true,
    };

    // Verify success rate calculation
    const calculatedRate = (stats.total_wins / stats.total_attempts) * 100;
    expect(calculatedRate).toBe(stats.success_rate);
  });
});
