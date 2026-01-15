/**
 * Locale Utilities Tests
 *
 * Tests for country flag generation, language selection logic,
 * and other locale-related utilities.
 */

import { describe, it, expect } from 'vitest';

// ============================================================================
// UTILITY FUNCTIONS (Mirrored from components)
// ============================================================================

/**
 * Convert country code to flag emoji
 */
function getCountryFlag(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * Group countries by continent
 */
function groupCountriesByContinent<T extends { continent?: string }>(
  countries: T[]
): Record<string, T[]> {
  return countries.reduce(
    (acc, country) => {
      const continent = country.continent || 'Other';
      if (!acc[continent]) acc[continent] = [];
      acc[continent].push(country);
      return acc;
    },
    {} as Record<string, T[]>
  );
}

/**
 * Continent display order
 */
const CONTINENT_ORDER = [
  'Europe',
  'Asia',
  'North America',
  'South America',
  'Africa',
  'Oceania',
  'Other',
];

/**
 * Toggle language in selection
 */
function toggleLanguageSelection(
  currentSelection: string[],
  code: string,
  primaryLanguage: string | undefined,
  maxSelections: number
): string[] {
  // Already selected - remove it (unless primary)
  if (currentSelection.includes(code)) {
    if (code === primaryLanguage) return currentSelection;
    return currentSelection.filter((v) => v !== code);
  }

  // Not selected - add it (if not at max)
  if (currentSelection.length >= maxSelections) return currentSelection;
  return [...currentSelection, code];
}

/**
 * Separate languages by direction
 */
function separateLanguagesByDirection<T extends { direction: 'ltr' | 'rtl' }>(
  languages: T[]
): { rtl: T[]; ltr: T[] } {
  return {
    rtl: languages.filter((l) => l.direction === 'rtl'),
    ltr: languages.filter((l) => l.direction === 'ltr'),
  };
}

/**
 * Validate language code format (ISO 639-1)
 */
function isValidLanguageCode(code: string): boolean {
  return /^[a-z]{2}(-[A-Z]{2})?$/.test(code);
}

/**
 * Validate country code format (ISO 3166-1 alpha-2)
 */
function isValidCountryCode(code: string): boolean {
  return /^[A-Z]{2}$/.test(code.toUpperCase());
}

// ============================================================================
// INTERFACES (Mirrored from components)
// ============================================================================

interface Country {
  code: string;
  name_en: string;
  name_native?: string;
  continent?: string;
  currency_code: string;
  currency_symbol: string;
  primary_language: string;
}

interface Language {
  code: string;
  name_en: string;
  name_native: string;
  direction: 'ltr' | 'rtl';
}

// ============================================================================
// TESTS
// ============================================================================

describe('Locale Utilities', () => {
  // ==========================================================================
  // getCountryFlag Tests
  // ==========================================================================

  describe('getCountryFlag', () => {
    it('should convert IT to Italian flag', () => {
      const flag = getCountryFlag('IT');
      expect(flag).toBe('🇮🇹');
    });

    it('should convert US to US flag', () => {
      const flag = getCountryFlag('US');
      expect(flag).toBe('🇺🇸');
    });

    it('should convert GB to UK flag', () => {
      const flag = getCountryFlag('GB');
      expect(flag).toBe('🇬🇧');
    });

    it('should convert FR to French flag', () => {
      const flag = getCountryFlag('FR');
      expect(flag).toBe('🇫🇷');
    });

    it('should convert DE to German flag', () => {
      const flag = getCountryFlag('DE');
      expect(flag).toBe('🇩🇪');
    });

    it('should convert ES to Spanish flag', () => {
      const flag = getCountryFlag('ES');
      expect(flag).toBe('🇪🇸');
    });

    it('should convert JP to Japanese flag', () => {
      const flag = getCountryFlag('JP');
      expect(flag).toBe('🇯🇵');
    });

    it('should convert CN to Chinese flag', () => {
      const flag = getCountryFlag('CN');
      expect(flag).toBe('🇨🇳');
    });

    it('should convert BR to Brazilian flag', () => {
      const flag = getCountryFlag('BR');
      expect(flag).toBe('🇧🇷');
    });

    it('should convert AU to Australian flag', () => {
      const flag = getCountryFlag('AU');
      expect(flag).toBe('🇦🇺');
    });

    it('should handle lowercase input', () => {
      const flag = getCountryFlag('it');
      expect(flag).toBe('🇮🇹');
    });

    it('should handle mixed case input', () => {
      const flag = getCountryFlag('It');
      expect(flag).toBe('🇮🇹');
    });

    it('should handle all lowercase', () => {
      const flag = getCountryFlag('us');
      expect(flag).toBe('🇺🇸');
    });

    it('should return regional indicator symbols', () => {
      const flag = getCountryFlag('AA');
      // AA would produce regional indicator A + A
      expect(flag.length).toBe(4); // Two regional indicator symbols (each 2 chars)
    });

    describe('European countries', () => {
      const europeanFlags: [string, string][] = [
        ['AT', '🇦🇹'], // Austria
        ['BE', '🇧🇪'], // Belgium
        ['CH', '🇨🇭'], // Switzerland
        ['CZ', '🇨🇿'], // Czech Republic
        ['DK', '🇩🇰'], // Denmark
        ['FI', '🇫🇮'], // Finland
        ['GR', '🇬🇷'], // Greece
        ['IE', '🇮🇪'], // Ireland
        ['NL', '🇳🇱'], // Netherlands
        ['NO', '🇳🇴'], // Norway
        ['PL', '🇵🇱'], // Poland
        ['PT', '🇵🇹'], // Portugal
        ['SE', '🇸🇪'], // Sweden
      ];

      europeanFlags.forEach(([code, expected]) => {
        it(`should convert ${code} correctly`, () => {
          expect(getCountryFlag(code)).toBe(expected);
        });
      });
    });

    describe('Asian countries', () => {
      const asianFlags: [string, string][] = [
        ['KR', '🇰🇷'], // South Korea
        ['IN', '🇮🇳'], // India
        ['TH', '🇹🇭'], // Thailand
        ['VN', '🇻🇳'], // Vietnam
        ['SG', '🇸🇬'], // Singapore
        ['MY', '🇲🇾'], // Malaysia
        ['ID', '🇮🇩'], // Indonesia
        ['PH', '🇵🇭'], // Philippines
      ];

      asianFlags.forEach(([code, expected]) => {
        it(`should convert ${code} correctly`, () => {
          expect(getCountryFlag(code)).toBe(expected);
        });
      });
    });

    describe('Americas countries', () => {
      const americasFlags: [string, string][] = [
        ['CA', '🇨🇦'], // Canada
        ['MX', '🇲🇽'], // Mexico
        ['AR', '🇦🇷'], // Argentina
        ['CL', '🇨🇱'], // Chile
        ['CO', '🇨🇴'], // Colombia
        ['PE', '🇵🇪'], // Peru
      ];

      americasFlags.forEach(([code, expected]) => {
        it(`should convert ${code} correctly`, () => {
          expect(getCountryFlag(code)).toBe(expected);
        });
      });
    });
  });

  // ==========================================================================
  // groupCountriesByContinent Tests
  // ==========================================================================

  describe('groupCountriesByContinent', () => {
    it('should group countries by continent', () => {
      const countries: { name: string; continent: string }[] = [
        { name: 'Italy', continent: 'Europe' },
        { name: 'France', continent: 'Europe' },
        { name: 'Japan', continent: 'Asia' },
        { name: 'USA', continent: 'North America' },
      ];

      const grouped = groupCountriesByContinent(countries);

      expect(grouped['Europe']).toHaveLength(2);
      expect(grouped['Asia']).toHaveLength(1);
      expect(grouped['North America']).toHaveLength(1);
    });

    it('should handle missing continent as Other', () => {
      const countries: { name: string; continent?: string }[] = [
        { name: 'Unknown' },
        { name: 'Also Unknown' },
      ];

      const grouped = groupCountriesByContinent(countries);

      expect(grouped['Other']).toHaveLength(2);
    });

    it('should handle empty array', () => {
      const grouped = groupCountriesByContinent([]);
      expect(Object.keys(grouped)).toHaveLength(0);
    });

    it('should handle single country', () => {
      const countries = [{ name: 'Italy', continent: 'Europe' }];
      const grouped = groupCountriesByContinent(countries);

      expect(grouped['Europe']).toHaveLength(1);
      expect(grouped['Europe'][0].name).toBe('Italy');
    });

    it('should preserve original objects', () => {
      const countries = [{ name: 'Italy', continent: 'Europe', code: 'IT', extra: 'data' }];

      const grouped = groupCountriesByContinent(countries);

      expect(grouped['Europe'][0]).toEqual(countries[0]);
    });
  });

  // ==========================================================================
  // CONTINENT_ORDER Tests
  // ==========================================================================

  describe('CONTINENT_ORDER', () => {
    it('should have 7 continents', () => {
      expect(CONTINENT_ORDER).toHaveLength(7);
    });

    it('should start with Europe', () => {
      expect(CONTINENT_ORDER[0]).toBe('Europe');
    });

    it('should include Asia', () => {
      expect(CONTINENT_ORDER).toContain('Asia');
    });

    it('should include North America', () => {
      expect(CONTINENT_ORDER).toContain('North America');
    });

    it('should include South America', () => {
      expect(CONTINENT_ORDER).toContain('South America');
    });

    it('should include Africa', () => {
      expect(CONTINENT_ORDER).toContain('Africa');
    });

    it('should include Oceania', () => {
      expect(CONTINENT_ORDER).toContain('Oceania');
    });

    it('should end with Other', () => {
      expect(CONTINENT_ORDER[CONTINENT_ORDER.length - 1]).toBe('Other');
    });
  });

  // ==========================================================================
  // toggleLanguageSelection Tests
  // ==========================================================================

  describe('toggleLanguageSelection', () => {
    it('should add language when not selected', () => {
      const result = toggleLanguageSelection(['en'], 'it', undefined, 10);
      expect(result).toEqual(['en', 'it']);
    });

    it('should remove language when already selected', () => {
      const result = toggleLanguageSelection(['en', 'it'], 'it', undefined, 10);
      expect(result).toEqual(['en']);
    });

    it('should not remove primary language', () => {
      const result = toggleLanguageSelection(['en', 'it'], 'en', 'en', 10);
      expect(result).toEqual(['en', 'it']);
    });

    it('should not add when at max selections', () => {
      const result = toggleLanguageSelection(['en', 'it'], 'fr', undefined, 2);
      expect(result).toEqual(['en', 'it']);
    });

    it('should add when below max selections', () => {
      const result = toggleLanguageSelection(['en'], 'it', undefined, 2);
      expect(result).toEqual(['en', 'it']);
    });

    it('should handle empty selection', () => {
      const result = toggleLanguageSelection([], 'en', undefined, 10);
      expect(result).toEqual(['en']);
    });

    it('should handle removing last non-primary language', () => {
      const result = toggleLanguageSelection(['en', 'it'], 'it', 'en', 10);
      expect(result).toEqual(['en']);
    });

    it('should respect max of 1', () => {
      const result = toggleLanguageSelection(['en'], 'it', undefined, 1);
      expect(result).toEqual(['en']);
    });

    it('should allow toggle even when primary is set', () => {
      const result = toggleLanguageSelection(['en'], 'it', 'en', 10);
      expect(result).toEqual(['en', 'it']);
    });

    it('should handle undefined primary language', () => {
      const result = toggleLanguageSelection(['en'], 'en', undefined, 10);
      expect(result).toEqual([]);
    });
  });

  // ==========================================================================
  // separateLanguagesByDirection Tests
  // ==========================================================================

  describe('separateLanguagesByDirection', () => {
    it('should separate RTL and LTR languages', () => {
      const languages: Language[] = [
        { code: 'en', name_en: 'English', name_native: 'English', direction: 'ltr' },
        { code: 'ar', name_en: 'Arabic', name_native: 'العربية', direction: 'rtl' },
        { code: 'he', name_en: 'Hebrew', name_native: 'עברית', direction: 'rtl' },
        { code: 'it', name_en: 'Italian', name_native: 'Italiano', direction: 'ltr' },
      ];

      const result = separateLanguagesByDirection(languages);

      expect(result.rtl).toHaveLength(2);
      expect(result.ltr).toHaveLength(2);
      expect(result.rtl.map((l) => l.code)).toEqual(['ar', 'he']);
      expect(result.ltr.map((l) => l.code)).toEqual(['en', 'it']);
    });

    it('should handle all LTR languages', () => {
      const languages: Language[] = [
        { code: 'en', name_en: 'English', name_native: 'English', direction: 'ltr' },
        { code: 'it', name_en: 'Italian', name_native: 'Italiano', direction: 'ltr' },
      ];

      const result = separateLanguagesByDirection(languages);

      expect(result.rtl).toHaveLength(0);
      expect(result.ltr).toHaveLength(2);
    });

    it('should handle all RTL languages', () => {
      const languages: Language[] = [
        { code: 'ar', name_en: 'Arabic', name_native: 'العربية', direction: 'rtl' },
        { code: 'he', name_en: 'Hebrew', name_native: 'עברית', direction: 'rtl' },
      ];

      const result = separateLanguagesByDirection(languages);

      expect(result.rtl).toHaveLength(2);
      expect(result.ltr).toHaveLength(0);
    });

    it('should handle empty array', () => {
      const result = separateLanguagesByDirection([]);

      expect(result.rtl).toHaveLength(0);
      expect(result.ltr).toHaveLength(0);
    });
  });

  // ==========================================================================
  // isValidLanguageCode Tests
  // ==========================================================================

  describe('isValidLanguageCode', () => {
    it('should validate ISO 639-1 codes', () => {
      expect(isValidLanguageCode('en')).toBe(true);
      expect(isValidLanguageCode('it')).toBe(true);
      expect(isValidLanguageCode('fr')).toBe(true);
      expect(isValidLanguageCode('de')).toBe(true);
      expect(isValidLanguageCode('ja')).toBe(true);
      expect(isValidLanguageCode('zh')).toBe(true);
    });

    it('should validate language-region codes', () => {
      expect(isValidLanguageCode('en-US')).toBe(true);
      expect(isValidLanguageCode('en-GB')).toBe(true);
      expect(isValidLanguageCode('zh-CN')).toBe(true);
      expect(isValidLanguageCode('pt-BR')).toBe(true);
    });

    it('should reject invalid formats', () => {
      expect(isValidLanguageCode('eng')).toBe(false);
      expect(isValidLanguageCode('e')).toBe(false);
      expect(isValidLanguageCode('EN')).toBe(false);
      expect(isValidLanguageCode('en-us')).toBe(false);
      expect(isValidLanguageCode('en_US')).toBe(false);
      expect(isValidLanguageCode('')).toBe(false);
    });
  });

  // ==========================================================================
  // isValidCountryCode Tests
  // ==========================================================================

  describe('isValidCountryCode', () => {
    it('should validate ISO 3166-1 alpha-2 codes', () => {
      expect(isValidCountryCode('IT')).toBe(true);
      expect(isValidCountryCode('US')).toBe(true);
      expect(isValidCountryCode('GB')).toBe(true);
      expect(isValidCountryCode('FR')).toBe(true);
      expect(isValidCountryCode('DE')).toBe(true);
      expect(isValidCountryCode('JP')).toBe(true);
    });

    it('should handle lowercase input', () => {
      expect(isValidCountryCode('it')).toBe(true);
      expect(isValidCountryCode('us')).toBe(true);
    });

    it('should reject invalid formats', () => {
      expect(isValidCountryCode('ITA')).toBe(false);
      expect(isValidCountryCode('I')).toBe(false);
      expect(isValidCountryCode('123')).toBe(false);
      expect(isValidCountryCode('')).toBe(false);
      expect(isValidCountryCode('IT-1')).toBe(false);
    });
  });

  // ==========================================================================
  // Country Interface Tests
  // ==========================================================================

  describe('Country Interface', () => {
    it('should have required fields', () => {
      const country: Country = {
        code: 'IT',
        name_en: 'Italy',
        currency_code: 'EUR',
        currency_symbol: '€',
        primary_language: 'it',
      };

      expect(country.code).toBe('IT');
      expect(country.name_en).toBe('Italy');
      expect(country.currency_code).toBe('EUR');
      expect(country.currency_symbol).toBe('€');
      expect(country.primary_language).toBe('it');
    });

    it('should allow optional fields', () => {
      const country: Country = {
        code: 'IT',
        name_en: 'Italy',
        name_native: 'Italia',
        continent: 'Europe',
        currency_code: 'EUR',
        currency_symbol: '€',
        primary_language: 'it',
      };

      expect(country.name_native).toBe('Italia');
      expect(country.continent).toBe('Europe');
    });

    it('should handle various currency symbols', () => {
      const currencies: { code: string; symbol: string }[] = [
        { code: 'EUR', symbol: '€' },
        { code: 'USD', symbol: '$' },
        { code: 'GBP', symbol: '£' },
        { code: 'JPY', symbol: '¥' },
        { code: 'CHF', symbol: 'CHF' },
        { code: 'CNY', symbol: '¥' },
        { code: 'KRW', symbol: '₩' },
        { code: 'INR', symbol: '₹' },
      ];

      currencies.forEach(({ code, symbol }) => {
        const country: Country = {
          code: 'XX',
          name_en: 'Test',
          currency_code: code,
          currency_symbol: symbol,
          primary_language: 'en',
        };
        expect(country.currency_symbol).toBe(symbol);
      });
    });
  });

  // ==========================================================================
  // Language Interface Tests
  // ==========================================================================

  describe('Language Interface', () => {
    it('should have required fields', () => {
      const language: Language = {
        code: 'en',
        name_en: 'English',
        name_native: 'English',
        direction: 'ltr',
      };

      expect(language.code).toBe('en');
      expect(language.name_en).toBe('English');
      expect(language.name_native).toBe('English');
      expect(language.direction).toBe('ltr');
    });

    it('should handle RTL direction', () => {
      const language: Language = {
        code: 'ar',
        name_en: 'Arabic',
        name_native: 'العربية',
        direction: 'rtl',
      };

      expect(language.direction).toBe('rtl');
    });

    it('should only allow ltr or rtl direction', () => {
      const ltr: Language['direction'] = 'ltr';
      const rtl: Language['direction'] = 'rtl';

      expect(['ltr', 'rtl']).toContain(ltr);
      expect(['ltr', 'rtl']).toContain(rtl);
    });
  });

  // ==========================================================================
  // Common Languages Tests
  // ==========================================================================

  describe('Common Languages', () => {
    const commonLanguages: Language[] = [
      { code: 'en', name_en: 'English', name_native: 'English', direction: 'ltr' },
      { code: 'it', name_en: 'Italian', name_native: 'Italiano', direction: 'ltr' },
      { code: 'fr', name_en: 'French', name_native: 'Français', direction: 'ltr' },
      { code: 'de', name_en: 'German', name_native: 'Deutsch', direction: 'ltr' },
      { code: 'es', name_en: 'Spanish', name_native: 'Español', direction: 'ltr' },
      { code: 'pt', name_en: 'Portuguese', name_native: 'Português', direction: 'ltr' },
      { code: 'ja', name_en: 'Japanese', name_native: '日本語', direction: 'ltr' },
      { code: 'zh', name_en: 'Chinese', name_native: '中文', direction: 'ltr' },
      { code: 'ko', name_en: 'Korean', name_native: '한국어', direction: 'ltr' },
      { code: 'ar', name_en: 'Arabic', name_native: 'العربية', direction: 'rtl' },
      { code: 'he', name_en: 'Hebrew', name_native: 'עברית', direction: 'rtl' },
      { code: 'fa', name_en: 'Persian', name_native: 'فارسی', direction: 'rtl' },
      { code: 'ur', name_en: 'Urdu', name_native: 'اردو', direction: 'rtl' },
    ];

    it('should have valid codes for all common languages', () => {
      commonLanguages.forEach((lang) => {
        expect(isValidLanguageCode(lang.code)).toBe(true);
      });
    });

    it('should correctly identify RTL languages', () => {
      const rtlCodes = ['ar', 'he', 'fa', 'ur'];
      const { rtl } = separateLanguagesByDirection(commonLanguages);

      expect(rtl.map((l) => l.code)).toEqual(rtlCodes);
    });

    it('should correctly identify LTR languages', () => {
      const ltrCodes = ['en', 'it', 'fr', 'de', 'es', 'pt', 'ja', 'zh', 'ko'];
      const { ltr } = separateLanguagesByDirection(commonLanguages);

      expect(ltr.map((l) => l.code)).toEqual(ltrCodes);
    });
  });

  // ==========================================================================
  // Edge Cases Tests
  // ==========================================================================

  describe('Edge Cases', () => {
    it('should handle maximum language selection of 1', () => {
      let selection: string[] = [];
      selection = toggleLanguageSelection(selection, 'en', undefined, 1);
      expect(selection).toEqual(['en']);

      // Should not add more
      selection = toggleLanguageSelection(selection, 'it', undefined, 1);
      expect(selection).toEqual(['en']);

      // But should allow toggle off
      selection = toggleLanguageSelection(selection, 'en', undefined, 1);
      expect(selection).toEqual([]);
    });

    it('should handle large max selections', () => {
      let selection: string[] = [];
      for (let i = 0; i < 50; i++) {
        selection = toggleLanguageSelection(selection, `lang${i}`, undefined, 100);
      }
      expect(selection).toHaveLength(50);
    });

    it('should handle special country codes', () => {
      // These are valid ISO codes
      expect(getCountryFlag('GB')).toBe('🇬🇧'); // Great Britain
      expect(getCountryFlag('VA')).toBe('🇻🇦'); // Vatican
      expect(getCountryFlag('MC')).toBe('🇲🇨'); // Monaco
      expect(getCountryFlag('SM')).toBe('🇸🇲'); // San Marino
    });

    it('should handle disputed territories', () => {
      // These may or may not render as flags depending on the system
      const xk = getCountryFlag('XK'); // Kosovo (not ISO but commonly used)
      expect(xk.length).toBeGreaterThan(0);
    });
  });
});
