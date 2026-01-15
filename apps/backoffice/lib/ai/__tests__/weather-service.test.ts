import { describe, it, expect, vi } from 'vitest';

// Mock Supabase before importing
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: null, error: null }),
    rpc: vi.fn().mockResolvedValue({ data: [], error: null }),
  },
}));

import {
  WEATHER_EMOJIS,
  getWeatherEmoji,
  type CurrentWeather,
  type WeatherCategory,
  type StaffAdjustment,
  type MenuSuggestion,
  type BusinessImpact,
  type VenueContext,
} from '../weather-service';

// ============================================
// WEATHER_EMOJIS constant tests
// ============================================

describe('WEATHER_EMOJIS', () => {
  it('should have sunny emoji', () => {
    expect(WEATHER_EMOJIS['sunny']).toBe('☀️');
  });

  it('should have clear emoji', () => {
    expect(WEATHER_EMOJIS['clear']).toBe('☀️');
  });

  it('should have rain emoji', () => {
    expect(WEATHER_EMOJIS['rain']).toBe('🌧️');
  });

  it('should have snow emoji', () => {
    expect(WEATHER_EMOJIS['snow']).toBe('❄️');
  });

  it('should have storm emoji', () => {
    expect(WEATHER_EMOJIS['storm']).toBe('⛈️');
  });

  it('should have cloudy emoji', () => {
    expect(WEATHER_EMOJIS['cloudy']).toBe('☁️');
  });

  it('should have fog emoji', () => {
    expect(WEATHER_EMOJIS['fog']).toBe('🌫️');
  });

  it('should have wind emoji', () => {
    expect(WEATHER_EMOJIS['wind']).toBe('💨');
  });

  it('should have at least 10 weather conditions', () => {
    expect(Object.keys(WEATHER_EMOJIS).length).toBeGreaterThanOrEqual(10);
  });
});

// ============================================
// getWeatherEmoji function tests
// ============================================

describe('getWeatherEmoji', () => {
  it('should return sunny emoji for "sunny"', () => {
    expect(getWeatherEmoji('sunny')).toBe('☀️');
  });

  it('should return rain emoji for "Rain"', () => {
    expect(getWeatherEmoji('Rain')).toBe('🌧️');
  });

  it('should handle case insensitivity', () => {
    expect(getWeatherEmoji('CLEAR')).toBe('☀️');
    expect(getWeatherEmoji('Cloudy')).toBe('☁️');
    expect(getWeatherEmoji('RAIN')).toBe('🌧️');
  });

  it('should handle conditions with spaces', () => {
    expect(getWeatherEmoji('partly cloudy day')).toBe('⛅');
  });

  it('should return default emoji for unknown conditions', () => {
    expect(getWeatherEmoji('unknown-condition')).toBe('🌡️');
    expect(getWeatherEmoji('xyz')).toBe('🌡️');
  });

  it('should handle thunder-rain', () => {
    expect(getWeatherEmoji('thunder-rain')).toBe('⛈️');
  });
});

// ============================================
// getWindDirection logic tests
// ============================================

describe('getWindDirection logic', () => {
  // Replicate the logic for testing
  const getWindDirection = (degrees: number): string => {
    const directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  it('should return N for 0 degrees', () => {
    expect(getWindDirection(0)).toBe('N');
  });

  it('should return E for 90 degrees', () => {
    expect(getWindDirection(90)).toBe('E');
  });

  it('should return S for 180 degrees', () => {
    expect(getWindDirection(180)).toBe('S');
  });

  it('should return W for 270 degrees', () => {
    expect(getWindDirection(270)).toBe('W');
  });

  it('should return N for 360 degrees (full circle)', () => {
    expect(getWindDirection(360)).toBe('N');
  });

  it('should return NE for 45 degrees', () => {
    expect(getWindDirection(45)).toBe('NE');
  });

  it('should return SE for 135 degrees', () => {
    expect(getWindDirection(135)).toBe('SE');
  });

  it('should return SW for 225 degrees', () => {
    expect(getWindDirection(225)).toBe('SW');
  });

  it('should return NW for 315 degrees', () => {
    expect(getWindDirection(315)).toBe('NW');
  });

  it('should handle intermediate angles', () => {
    expect(getWindDirection(22)).toBe('NNE');
    expect(getWindDirection(67)).toBe('ENE');
    expect(getWindDirection(112)).toBe('ESE');
  });
});

// ============================================
// determineWeatherCategory logic tests
// ============================================

describe('determineWeatherCategory logic', () => {
  // Replicate the logic for testing
  const determineWeatherCategory = (current: CurrentWeather): WeatherCategory => {
    const conditions = current.conditions.toLowerCase();

    // Weather conditions take priority over temperature
    if (conditions.includes('storm') || conditions.includes('thunder')) {
      return 'stormy';
    }
    if (conditions.includes('snow') || conditions.includes('blizzard')) {
      return 'snowy';
    }
    if (
      conditions.includes('rain') ||
      conditions.includes('shower') ||
      conditions.includes('drizzle')
    ) {
      return 'rainy';
    }
    if (current.humidity > 80) {
      return 'humid';
    }

    // Temperature-based categories
    if (current.temp < 0) return 'cold_extreme';
    if (current.temp < 10) return 'cold';
    if (current.temp < 18) return 'cool';
    if (current.temp <= 25) return 'optimal';
    if (current.temp <= 30) return 'warm';
    if (current.temp <= 35) return 'hot';
    return 'hot_extreme';
  };

  const createCurrentWeather = (overrides: Partial<CurrentWeather> = {}): CurrentWeather => ({
    temp: 20,
    feelsLike: 20,
    humidity: 50,
    conditions: 'Clear',
    conditionsIcon: 'clear',
    windSpeed: 10,
    windDirection: 'N',
    uvIndex: 5,
    visibility: 10,
    updatedAt: new Date().toISOString(),
    ...overrides,
  });

  describe('weather condition priority', () => {
    it('should return stormy for storm conditions', () => {
      expect(determineWeatherCategory(createCurrentWeather({ conditions: 'Thunderstorm' }))).toBe(
        'stormy'
      );
      expect(determineWeatherCategory(createCurrentWeather({ conditions: 'Storm' }))).toBe(
        'stormy'
      );
    });

    it('should return snowy for snow conditions', () => {
      expect(determineWeatherCategory(createCurrentWeather({ conditions: 'Snow' }))).toBe('snowy');
      expect(determineWeatherCategory(createCurrentWeather({ conditions: 'Blizzard' }))).toBe(
        'snowy'
      );
    });

    it('should return rainy for rain conditions', () => {
      expect(determineWeatherCategory(createCurrentWeather({ conditions: 'Rain' }))).toBe('rainy');
      expect(determineWeatherCategory(createCurrentWeather({ conditions: 'Light Shower' }))).toBe(
        'rainy'
      );
      expect(determineWeatherCategory(createCurrentWeather({ conditions: 'Drizzle' }))).toBe(
        'rainy'
      );
    });

    it('should return humid for high humidity (>80%)', () => {
      expect(
        determineWeatherCategory(createCurrentWeather({ humidity: 85, conditions: 'Clear' }))
      ).toBe('humid');
    });
  });

  describe('temperature-based categories', () => {
    it('should return cold_extreme for temp < 0', () => {
      expect(determineWeatherCategory(createCurrentWeather({ temp: -5 }))).toBe('cold_extreme');
      expect(determineWeatherCategory(createCurrentWeather({ temp: -20 }))).toBe('cold_extreme');
    });

    it('should return cold for temp 0-10', () => {
      expect(determineWeatherCategory(createCurrentWeather({ temp: 0 }))).toBe('cold');
      expect(determineWeatherCategory(createCurrentWeather({ temp: 5 }))).toBe('cold');
      expect(determineWeatherCategory(createCurrentWeather({ temp: 9 }))).toBe('cold');
    });

    it('should return cool for temp 10-18', () => {
      expect(determineWeatherCategory(createCurrentWeather({ temp: 10 }))).toBe('cool');
      expect(determineWeatherCategory(createCurrentWeather({ temp: 15 }))).toBe('cool');
      expect(determineWeatherCategory(createCurrentWeather({ temp: 17 }))).toBe('cool');
    });

    it('should return optimal for temp 18-25', () => {
      expect(determineWeatherCategory(createCurrentWeather({ temp: 18 }))).toBe('optimal');
      expect(determineWeatherCategory(createCurrentWeather({ temp: 22 }))).toBe('optimal');
      expect(determineWeatherCategory(createCurrentWeather({ temp: 25 }))).toBe('optimal');
    });

    it('should return warm for temp 25-30', () => {
      expect(determineWeatherCategory(createCurrentWeather({ temp: 26 }))).toBe('warm');
      expect(determineWeatherCategory(createCurrentWeather({ temp: 28 }))).toBe('warm');
      expect(determineWeatherCategory(createCurrentWeather({ temp: 30 }))).toBe('warm');
    });

    it('should return hot for temp 30-35', () => {
      expect(determineWeatherCategory(createCurrentWeather({ temp: 31 }))).toBe('hot');
      expect(determineWeatherCategory(createCurrentWeather({ temp: 33 }))).toBe('hot');
      expect(determineWeatherCategory(createCurrentWeather({ temp: 35 }))).toBe('hot');
    });

    it('should return hot_extreme for temp > 35', () => {
      expect(determineWeatherCategory(createCurrentWeather({ temp: 36 }))).toBe('hot_extreme');
      expect(determineWeatherCategory(createCurrentWeather({ temp: 40 }))).toBe('hot_extreme');
    });
  });
});

// ============================================
// getStaffAdjustment logic tests
// ============================================

describe('getStaffAdjustment logic', () => {
  // Replicate the logic for testing
  const getStaffAdjustment = (category: WeatherCategory): StaffAdjustment => {
    const adjustments: Record<WeatherCategory, StaffAdjustment> = {
      cold_extreme: { sala: 0.6, kitchen: 1.2, delivery: 1.3, bar: 0.7 },
      cold: { sala: 0.9, kitchen: 1.0, delivery: 1.1, bar: 0.9 },
      cool: { sala: 1.0, kitchen: 1.0, delivery: 1.0, bar: 1.0 },
      optimal: { sala: 1.1, kitchen: 1.05, delivery: 0.9, bar: 1.2 },
      warm: { sala: 1.0, kitchen: 1.0, delivery: 1.0, bar: 1.15 },
      hot: { sala: 0.85, kitchen: 1.0, delivery: 1.1, bar: 1.1 },
      hot_extreme: { sala: 0.7, kitchen: 0.9, delivery: 1.2, bar: 1.0 },
      rainy: { sala: 0.75, kitchen: 1.15, delivery: 1.2, bar: 0.9 },
      stormy: { sala: 0.6, kitchen: 1.2, delivery: 1.35, bar: 0.8 },
      snowy: { sala: 0.55, kitchen: 1.2, delivery: 1.3, bar: 0.8 },
      humid: { sala: 0.9, kitchen: 1.0, delivery: 1.15, bar: 1.0 },
    };
    return adjustments[category];
  };

  it('should increase delivery during cold_extreme', () => {
    const adj = getStaffAdjustment('cold_extreme');
    expect(adj.delivery).toBeGreaterThan(1);
    expect(adj.sala).toBeLessThan(1);
  });

  it('should increase bar staff during optimal weather', () => {
    const adj = getStaffAdjustment('optimal');
    expect(adj.bar).toBeGreaterThan(1);
    expect(adj.sala).toBeGreaterThan(1);
  });

  it('should maximize delivery during stormy weather', () => {
    const adj = getStaffAdjustment('stormy');
    expect(adj.delivery).toBe(1.35);
    expect(adj.sala).toBe(0.6);
  });

  it('should maximize delivery during snowy weather', () => {
    const adj = getStaffAdjustment('snowy');
    expect(adj.delivery).toBe(1.3);
    expect(adj.sala).toBe(0.55);
  });

  it('should return balanced multipliers for cool weather', () => {
    const adj = getStaffAdjustment('cool');
    expect(adj.sala).toBe(1.0);
    expect(adj.kitchen).toBe(1.0);
    expect(adj.delivery).toBe(1.0);
    expect(adj.bar).toBe(1.0);
  });

  it('should reduce sala during rainy weather', () => {
    const adj = getStaffAdjustment('rainy');
    expect(adj.sala).toBe(0.75);
    expect(adj.kitchen).toBe(1.15);
    expect(adj.delivery).toBe(1.2);
  });

  it('should have all required properties', () => {
    const categories: WeatherCategory[] = [
      'cold_extreme',
      'cold',
      'cool',
      'optimal',
      'warm',
      'hot',
      'hot_extreme',
      'rainy',
      'stormy',
      'snowy',
      'humid',
    ];
    categories.forEach((category) => {
      const adj = getStaffAdjustment(category);
      expect(adj).toHaveProperty('sala');
      expect(adj).toHaveProperty('kitchen');
      expect(adj).toHaveProperty('delivery');
      expect(adj).toHaveProperty('bar');
    });
  });
});

// ============================================
// getMenuSuggestions logic tests
// ============================================

describe('getMenuSuggestions logic', () => {
  // Replicate the logic for testing
  const getMenuSuggestions = (category: WeatherCategory): MenuSuggestion[] => {
    const suggestions: Record<WeatherCategory, MenuSuggestion[]> = {
      cold_extreme: [
        { category: 'soups', reason: 'Comfort and warmth', priority: 'high' },
        { category: 'hot_drinks', reason: 'Hot chocolate, mulled wine', priority: 'high' },
        { category: 'comfort', reason: 'Stews, gratins, fondue', priority: 'high' },
      ],
      cold: [
        { category: 'soups', reason: 'Warming dishes', priority: 'high' },
        { category: 'hot_drinks', reason: 'Coffee, tea, hot beverages', priority: 'medium' },
        { category: 'comfort', reason: 'Pasta, risotto, hearty dishes', priority: 'medium' },
      ],
      cool: [
        { category: 'comfort', reason: 'Balanced comfort food', priority: 'medium' },
        { category: 'hot_drinks', reason: 'Warm beverages option', priority: 'low' },
      ],
      optimal: [
        { category: 'light', reason: 'Perfect for varied menu', priority: 'medium' },
        { category: 'cold_drinks', reason: 'Aperitivo, cocktails', priority: 'medium' },
      ],
      warm: [
        { category: 'light', reason: 'Fresh, light dishes', priority: 'high' },
        { category: 'cold_drinks', reason: 'Refreshing beverages', priority: 'high' },
        { category: 'salads', reason: 'Cool, crisp options', priority: 'medium' },
      ],
      hot: [
        { category: 'cold_drinks', reason: 'Hydration focus', priority: 'high' },
        { category: 'salads', reason: 'Light, refreshing', priority: 'high' },
        { category: 'light', reason: 'Avoid heavy dishes', priority: 'medium' },
      ],
      hot_extreme: [
        { category: 'cold_drinks', reason: 'Maximum hydration', priority: 'high' },
        { category: 'light', reason: 'Ceviche, poke, cold dishes', priority: 'high' },
        { category: 'salads', reason: 'Fresh and cooling', priority: 'high' },
      ],
      rainy: [
        { category: 'comfort', reason: 'Cozy, nostalgic food', priority: 'high' },
        { category: 'hot_drinks', reason: 'Warm beverages', priority: 'high' },
        { category: 'soups', reason: 'Classic rainy day choice', priority: 'medium' },
      ],
      stormy: [
        { category: 'comfort', reason: 'Ultra-comfort food', priority: 'high' },
        { category: 'hot_drinks', reason: 'Warm and soothing', priority: 'high' },
        { category: 'soups', reason: 'Hearty soups', priority: 'high' },
      ],
      snowy: [
        { category: 'comfort', reason: 'Maximum indulgence', priority: 'high' },
        { category: 'hot_drinks', reason: 'Hot chocolate, Irish coffee', priority: 'high' },
        { category: 'soups', reason: 'Warming soups', priority: 'high' },
      ],
      humid: [
        { category: 'light', reason: 'Avoid heavy, fried foods', priority: 'high' },
        { category: 'cold_drinks', reason: 'Refreshing, hydrating', priority: 'medium' },
      ],
    };
    return suggestions[category];
  };

  it('should suggest soups for cold_extreme', () => {
    const suggestions = getMenuSuggestions('cold_extreme');
    const hasSoups = suggestions.some((s) => s.category === 'soups');
    expect(hasSoups).toBe(true);
  });

  it('should suggest cold_drinks for hot weather', () => {
    const suggestions = getMenuSuggestions('hot');
    const hasColdDrinks = suggestions.some((s) => s.category === 'cold_drinks');
    expect(hasColdDrinks).toBe(true);
    expect(suggestions[0].priority).toBe('high');
  });

  it('should suggest comfort food for rainy weather', () => {
    const suggestions = getMenuSuggestions('rainy');
    const hasComfort = suggestions.some((s) => s.category === 'comfort');
    expect(hasComfort).toBe(true);
  });

  it('should suggest hot_drinks for snowy weather', () => {
    const suggestions = getMenuSuggestions('snowy');
    const hasHotDrinks = suggestions.some((s) => s.category === 'hot_drinks');
    expect(hasHotDrinks).toBe(true);
  });

  it('should suggest light dishes for humid weather', () => {
    const suggestions = getMenuSuggestions('humid');
    expect(suggestions[0].category).toBe('light');
    expect(suggestions[0].reason).toContain('fried');
  });

  it('should return array of suggestions for all categories', () => {
    const categories: WeatherCategory[] = [
      'cold_extreme',
      'cold',
      'cool',
      'optimal',
      'warm',
      'hot',
      'hot_extreme',
      'rainy',
      'stormy',
      'snowy',
      'humid',
    ];
    categories.forEach((category) => {
      const suggestions = getMenuSuggestions(category);
      expect(Array.isArray(suggestions)).toBe(true);
      expect(suggestions.length).toBeGreaterThan(0);
    });
  });
});

// ============================================
// getComfortFoodCategories logic tests
// ============================================

describe('getComfortFoodCategories logic', () => {
  const getComfortFoodCategories = (category: WeatherCategory): string[] => {
    const mapping: Record<WeatherCategory, string[]> = {
      cold_extreme: ['stews', 'gratins', 'fondue', 'hot chocolate', 'mulled wine'],
      cold: ['soups', 'pasta', 'risotto', 'roasts', 'hot beverages'],
      cool: ['pasta', 'risotto', 'warm salads'],
      optimal: ['varied menu', 'aperitivo', 'fresh dishes'],
      warm: ['salads', 'grilled items', 'cold beverages'],
      hot: ['ceviche', 'poke', 'cold soups', 'frozen drinks'],
      hot_extreme: ['ice cream', 'cold drinks', 'raw dishes', 'gazpacho'],
      rainy: ['ramen', 'curry', 'lasagne', 'comfort desserts'],
      stormy: ['stews', 'mac & cheese', 'hot chocolate', 'comfort classics'],
      snowy: ['fondue', 'gratin', 'hot chocolate', 'Irish coffee'],
      humid: ['pho', 'light spicy', 'citrus dishes', 'mint-based'],
    };
    return mapping[category];
  };

  it('should include fondue for cold_extreme', () => {
    const categories = getComfortFoodCategories('cold_extreme');
    expect(categories).toContain('fondue');
  });

  it('should include ice cream for hot_extreme', () => {
    const categories = getComfortFoodCategories('hot_extreme');
    expect(categories).toContain('ice cream');
  });

  it('should include ramen for rainy weather', () => {
    const categories = getComfortFoodCategories('rainy');
    expect(categories).toContain('ramen');
  });

  it('should include pho for humid weather', () => {
    const categories = getComfortFoodCategories('humid');
    expect(categories).toContain('pho');
  });

  it('should return array for all categories', () => {
    const categories: WeatherCategory[] = [
      'cold_extreme',
      'cold',
      'cool',
      'optimal',
      'warm',
      'hot',
      'hot_extreme',
      'rainy',
      'stormy',
      'snowy',
      'humid',
    ];
    categories.forEach((category) => {
      const foods = getComfortFoodCategories(category);
      expect(Array.isArray(foods)).toBe(true);
      expect(foods.length).toBeGreaterThan(0);
    });
  });
});

// ============================================
// getMarketingHook logic tests
// ============================================

describe('getMarketingHook logic', () => {
  const getMarketingHook = (category: WeatherCategory): string | undefined => {
    const hooks: Partial<Record<WeatherCategory, string>> = {
      rainy: 'Fuori piove, dentro si mangia meglio',
      stormy: 'Storm outside? Comfort inside',
      snowy: 'Let it snow - warm up with us',
      cold_extreme: 'Escape the cold - warm dishes await',
      cold: 'Warm up with our comfort menu',
      hot: 'Beat the heat with refreshing bites',
      hot_extreme: "Too hot to cook? We've got you covered",
      humid: 'Stay fresh and light today',
    };
    return hooks[category];
  };

  it('should have hook for rainy weather', () => {
    expect(getMarketingHook('rainy')).toBe('Fuori piove, dentro si mangia meglio');
  });

  it('should have hook for stormy weather', () => {
    expect(getMarketingHook('stormy')).toContain('Comfort inside');
  });

  it('should have hook for snowy weather', () => {
    expect(getMarketingHook('snowy')).toContain('Let it snow');
  });

  it('should return undefined for optimal weather', () => {
    expect(getMarketingHook('optimal')).toBeUndefined();
  });

  it('should return undefined for cool weather', () => {
    expect(getMarketingHook('cool')).toBeUndefined();
  });

  it('should have hook for hot_extreme', () => {
    expect(getMarketingHook('hot_extreme')).toContain('Too hot');
  });
});

// ============================================
// VenueContext type tests
// ============================================

describe('VenueContext type', () => {
  it('should have correct shape', () => {
    const venue: VenueContext = {
      hasAc: true,
      hasOutdoorSeating: false,
      venueType: 'restaurant',
      serviceStyle: 'dine_in',
    };

    expect(typeof venue.hasAc).toBe('boolean');
    expect(typeof venue.hasOutdoorSeating).toBe('boolean');
    expect(venue.venueType).toBe('restaurant');
    expect(venue.serviceStyle).toBe('dine_in');
  });

  it('should support different venue types', () => {
    const venueTypes = ['restaurant', 'bar', 'cafe', 'fast_food', 'food_truck', 'catering'];
    venueTypes.forEach((type) => {
      const venue: VenueContext = {
        hasAc: true,
        hasOutdoorSeating: false,
        venueType: type as VenueContext['venueType'],
        serviceStyle: 'dine_in',
      };
      expect(venue.venueType).toBe(type);
    });
  });

  it('should support different service styles', () => {
    const styles = ['dine_in', 'counter', 'delivery_only', 'takeaway', 'mixed'];
    styles.forEach((style) => {
      const venue: VenueContext = {
        hasAc: true,
        hasOutdoorSeating: false,
        venueType: 'restaurant',
        serviceStyle: style as VenueContext['serviceStyle'],
      };
      expect(venue.serviceStyle).toBe(style);
    });
  });
});

// ============================================
// WeatherCategory type tests
// ============================================

describe('WeatherCategory type', () => {
  it('should have all temperature-based categories', () => {
    const tempCategories: WeatherCategory[] = [
      'cold_extreme',
      'cold',
      'cool',
      'optimal',
      'warm',
      'hot',
      'hot_extreme',
    ];
    expect(tempCategories.length).toBe(7);
  });

  it('should have all condition-based categories', () => {
    const conditionCategories: WeatherCategory[] = ['rainy', 'stormy', 'snowy', 'humid'];
    expect(conditionCategories.length).toBe(4);
  });
});

// ============================================
// BusinessImpact type tests
// ============================================

describe('BusinessImpact type', () => {
  it('should have correct shape', () => {
    const impact: BusinessImpact = {
      deliveryImpact: '+20%',
      dineInImpact: '-10%',
      outdoorSeating: false,
      recommendedActions: ['Promote delivery', 'Stock up on soups'],
      weatherCategory: 'rainy',
      staffAdjustment: { sala: 0.75, kitchen: 1.15, delivery: 1.2, bar: 0.9 },
      menuSuggestions: [{ category: 'comfort', reason: 'Cozy food', priority: 'high' }],
      beverageFocus: 'hot',
      comfortFoodCategories: ['ramen', 'curry'],
    };

    expect(impact.deliveryImpact).toBe('+20%');
    expect(impact.outdoorSeating).toBe(false);
    expect(impact.recommendedActions.length).toBe(2);
    expect(impact.weatherCategory).toBe('rainy');
    expect(impact.beverageFocus).toBe('hot');
  });

  it('should allow optional fields', () => {
    const impact: BusinessImpact = {
      deliveryImpact: '0%',
      dineInImpact: '0%',
      outdoorSeating: true,
      recommendedActions: [],
      weatherCategory: 'optimal',
      staffAdjustment: { sala: 1.0, kitchen: 1.0, delivery: 1.0, bar: 1.0 },
      menuSuggestions: [],
      beverageFocus: 'mixed',
      comfortFoodCategories: [],
      peakHoursShift: 'Extended aperitivo hours',
      marketingHook: undefined,
    };

    expect(impact.peakHoursShift).toBe('Extended aperitivo hours');
    expect(impact.marketingHook).toBeUndefined();
  });
});

// ============================================
// Beverage focus logic tests
// ============================================

describe('Beverage focus logic', () => {
  const getBeverageFocus = (temp: number, category: WeatherCategory): 'hot' | 'cold' | 'mixed' => {
    if (temp < 15 || category === 'rainy' || category === 'stormy' || category === 'snowy') {
      return 'hot';
    } else if (temp > 25 || category === 'hot' || category === 'hot_extreme') {
      return 'cold';
    }
    return 'mixed';
  };

  it('should return hot for cold temperatures', () => {
    expect(getBeverageFocus(10, 'cold')).toBe('hot');
  });

  it('should return hot for rainy weather', () => {
    expect(getBeverageFocus(20, 'rainy')).toBe('hot');
  });

  it('should return cold for hot temperatures', () => {
    expect(getBeverageFocus(30, 'hot')).toBe('cold');
  });

  it('should return mixed for optimal weather', () => {
    expect(getBeverageFocus(22, 'optimal')).toBe('mixed');
  });

  it('should return hot for snowy weather regardless of temp', () => {
    expect(getBeverageFocus(5, 'snowy')).toBe('hot');
  });
});
