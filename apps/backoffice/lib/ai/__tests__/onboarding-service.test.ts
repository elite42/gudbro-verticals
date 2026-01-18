import { describe, it, expect, vi } from 'vitest';

// Mock supabase before importing onboarding-service
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
    rpc: vi.fn(),
  },
}));

import {
  buildOnboardingPrompt,
  type OnboardingStatus,
  type MissingField,
  ONBOARDING_TOOLS,
} from '../onboarding-service';

// ============================================
// Test fixtures
// ============================================

const createMissingField = (overrides: Partial<MissingField> = {}): MissingField => ({
  entity: 'organization',
  field: 'name',
  label: 'Organization Name',
  description: 'Your company or business name',
  required: true,
  priority: 'critical',
  inputType: 'text',
  ...overrides,
});

const createOnboardingStatus = (overrides: Partial<OnboardingStatus> = {}): OnboardingStatus => ({
  isComplete: false,
  completionPercentage: 50,
  missingFields: [],
  nextStep: null,
  organization: null,
  brand: null,
  location: null,
  ...overrides,
});

// ============================================
// buildOnboardingPrompt tests
// ============================================

describe('buildOnboardingPrompt', () => {
  describe('when onboarding is complete', () => {
    it('should return empty string', () => {
      const status = createOnboardingStatus({
        isComplete: true,
        completionPercentage: 100,
      });
      const result = buildOnboardingPrompt(status);
      expect(result).toBe('');
    });

    it('should return empty string even with missing optional fields', () => {
      const status = createOnboardingStatus({
        isComplete: true,
        completionPercentage: 100,
        missingFields: [
          createMissingField({
            required: false,
            priority: 'optional',
          }),
        ],
      });
      const result = buildOnboardingPrompt(status);
      expect(result).toBe('');
    });
  });

  describe('when onboarding is incomplete', () => {
    it('should include onboarding mode header', () => {
      const status = createOnboardingStatus();
      const result = buildOnboardingPrompt(status);
      expect(result).toContain('## ONBOARDING MODE ACTIVE');
    });

    it('should include completion percentage', () => {
      const status = createOnboardingStatus({ completionPercentage: 75 });
      const result = buildOnboardingPrompt(status);
      expect(result).toContain('75% complete');
    });

    it('should include 0% completion percentage', () => {
      const status = createOnboardingStatus({ completionPercentage: 0 });
      const result = buildOnboardingPrompt(status);
      expect(result).toContain('0% complete');
    });
  });

  describe('missing fields by priority', () => {
    it('should list critical fields as Required', () => {
      const status = createOnboardingStatus({
        missingFields: [
          createMissingField({
            priority: 'critical',
            label: 'Organization Name',
            entity: 'organization',
            description: 'Your company name',
          }),
        ],
      });
      const result = buildOnboardingPrompt(status);
      expect(result).toContain('**Required (Critical):**');
      expect(result).toContain('Organization Name (organization)');
      expect(result).toContain('Your company name');
    });

    it('should list important fields as Recommended', () => {
      const status = createOnboardingStatus({
        missingFields: [
          createMissingField({
            priority: 'important',
            label: 'Brand Logo',
            entity: 'brand',
            description: 'Your logo image',
          }),
        ],
      });
      const result = buildOnboardingPrompt(status);
      expect(result).toContain('**Recommended:**');
      expect(result).toContain('Brand Logo (brand)');
    });

    it('should list optional fields as Optional', () => {
      const status = createOnboardingStatus({
        missingFields: [
          createMissingField({
            priority: 'optional',
            required: false,
            label: 'Brand Color',
            entity: 'brand',
            description: 'Primary brand color',
          }),
        ],
      });
      const result = buildOnboardingPrompt(status);
      expect(result).toContain('**Optional:**');
      expect(result).toContain('Brand Color (brand)');
    });

    it('should group multiple fields by priority', () => {
      const status = createOnboardingStatus({
        missingFields: [
          createMissingField({
            priority: 'critical',
            label: 'Org Name',
            entity: 'organization',
          }),
          createMissingField({
            priority: 'critical',
            label: 'Brand Name',
            entity: 'brand',
          }),
          createMissingField({
            priority: 'important',
            label: 'Description',
            entity: 'brand',
          }),
          createMissingField({
            priority: 'optional',
            label: 'Timezone',
            entity: 'location',
          }),
        ],
      });
      const result = buildOnboardingPrompt(status);

      // Check all sections exist
      expect(result).toContain('**Required (Critical):**');
      expect(result).toContain('**Recommended:**');
      expect(result).toContain('**Optional:**');

      // Critical section comes first
      const criticalIndex = result.indexOf('**Required (Critical):**');
      const recommendedIndex = result.indexOf('**Recommended:**');
      const optionalIndex = result.indexOf('**Optional:**');

      expect(criticalIndex).toBeLessThan(recommendedIndex);
      expect(recommendedIndex).toBeLessThan(optionalIndex);
    });
  });

  describe('different entities', () => {
    it('should include organization fields', () => {
      const status = createOnboardingStatus({
        missingFields: [
          createMissingField({
            entity: 'organization',
            label: 'Organization Name',
          }),
        ],
      });
      const result = buildOnboardingPrompt(status);
      expect(result).toContain('(organization)');
    });

    it('should include brand fields', () => {
      const status = createOnboardingStatus({
        missingFields: [
          createMissingField({
            entity: 'brand',
            label: 'Brand Name',
          }),
        ],
      });
      const result = buildOnboardingPrompt(status);
      expect(result).toContain('(brand)');
    });

    it('should include location fields', () => {
      const status = createOnboardingStatus({
        missingFields: [
          createMissingField({
            entity: 'location',
            label: 'Address',
          }),
        ],
      });
      const result = buildOnboardingPrompt(status);
      expect(result).toContain('(location)');
    });
  });

  describe('next step information', () => {
    it('should include next step when defined', () => {
      const status = createOnboardingStatus({
        nextStep: {
          step: 1,
          entity: 'organization',
          title: 'Complete Organization Setup',
          description: 'Tell me about your organization',
          fields: [],
        },
      });
      const result = buildOnboardingPrompt(status);
      expect(result).toContain('Focus on: Complete Organization Setup');
      expect(result).toContain('Tell me about your organization');
    });

    it('should show all critical fields complete when no next step', () => {
      const status = createOnboardingStatus({
        nextStep: null,
      });
      const result = buildOnboardingPrompt(status);
      expect(result).toContain('All critical fields complete!');
    });

    it('should show next step for brand entity', () => {
      const status = createOnboardingStatus({
        nextStep: {
          step: 2,
          entity: 'brand',
          title: 'Complete Brand Setup',
          description: 'Tell me about your brand',
          fields: [],
        },
      });
      const result = buildOnboardingPrompt(status);
      expect(result).toContain('Focus on: Complete Brand Setup');
    });

    it('should show next step for location entity', () => {
      const status = createOnboardingStatus({
        nextStep: {
          step: 3,
          entity: 'location',
          title: 'Complete Location Setup',
          description: 'Tell me about your location',
          fields: [],
        },
      });
      const result = buildOnboardingPrompt(status);
      expect(result).toContain('Focus on: Complete Location Setup');
    });
  });

  describe('onboarding guidelines', () => {
    it('should include guidelines section', () => {
      const status = createOnboardingStatus();
      const result = buildOnboardingPrompt(status);
      expect(result).toContain('### Onboarding Guidelines:');
    });

    it('should include guideline about introducing yourself', () => {
      const status = createOnboardingStatus();
      const result = buildOnboardingPrompt(status);
      expect(result).toContain('introducing yourself');
    });

    it('should include guideline about asking one piece at a time', () => {
      const status = createOnboardingStatus();
      const result = buildOnboardingPrompt(status);
      expect(result).toContain('ONE piece of information at a time');
    });

    it('should include guideline about file uploads', () => {
      const status = createOnboardingStatus();
      const result = buildOnboardingPrompt(status);
      expect(result).toContain('file uploads');
      expect(result).toContain('Upload Logo');
    });
  });

  describe('edge cases', () => {
    it('should handle empty missing fields array', () => {
      const status = createOnboardingStatus({
        isComplete: false,
        missingFields: [],
      });
      const result = buildOnboardingPrompt(status);
      expect(result).toContain('## ONBOARDING MODE ACTIVE');
      expect(result).not.toContain('**Required (Critical):**');
    });

    it('should handle only critical fields', () => {
      const status = createOnboardingStatus({
        missingFields: [createMissingField({ priority: 'critical' })],
      });
      const result = buildOnboardingPrompt(status);
      expect(result).toContain('**Required (Critical):**');
      expect(result).not.toContain('**Recommended:**');
      expect(result).not.toContain('**Optional:**');
    });

    it('should handle only optional fields', () => {
      const status = createOnboardingStatus({
        missingFields: [createMissingField({ priority: 'optional', required: false })],
      });
      const result = buildOnboardingPrompt(status);
      expect(result).not.toContain('**Required (Critical):**');
      expect(result).not.toContain('**Recommended:**');
      expect(result).toContain('**Optional:**');
    });
  });
});

// ============================================
// ONBOARDING_TOOLS tests
// ============================================

describe('ONBOARDING_TOOLS', () => {
  it('should have 4 tools defined', () => {
    expect(ONBOARDING_TOOLS.length).toBe(4);
  });

  it('should have update_organization_info tool', () => {
    const tool = ONBOARDING_TOOLS.find((t) => t.function.name === 'update_organization_info');
    expect(tool).toBeDefined();
    expect(tool?.type).toBe('function');
  });

  it('should have update_brand_info tool', () => {
    const tool = ONBOARDING_TOOLS.find((t) => t.function.name === 'update_brand_info');
    expect(tool).toBeDefined();
    expect(tool?.type).toBe('function');
  });

  it('should have update_location_info tool', () => {
    const tool = ONBOARDING_TOOLS.find((t) => t.function.name === 'update_location_info');
    expect(tool).toBeDefined();
    expect(tool?.type).toBe('function');
  });

  it('should have check_onboarding_progress tool', () => {
    const tool = ONBOARDING_TOOLS.find((t) => t.function.name === 'check_onboarding_progress');
    expect(tool).toBeDefined();
    expect(tool?.type).toBe('function');
  });

  describe('update_organization_info tool', () => {
    const tool = ONBOARDING_TOOLS.find((t) => t.function.name === 'update_organization_info');

    it('should have correct description', () => {
      expect(tool?.function.description).toContain('Update organization information');
    });

    it('should have name property', () => {
      expect(tool?.function.parameters.properties.name).toBeDefined();
    });

    it('should have type property with enum values', () => {
      const typeParam = tool?.function.parameters.properties.type;
      expect(typeParam).toBeDefined();
      expect(typeParam!.enum).toContain('standard');
      expect(typeParam!.enum).toContain('enterprise');
    });
  });

  describe('update_brand_info tool', () => {
    const tool = ONBOARDING_TOOLS.find((t) => t.function.name === 'update_brand_info');

    it('should have correct description', () => {
      expect(tool?.function.description).toContain('Update brand information');
    });

    it('should have business_type property with valid values', () => {
      const businessType = tool?.function.parameters.properties.business_type;
      expect(businessType).toBeDefined();
      expect(businessType!.enum).toContain('fnb');
      expect(businessType!.enum).toContain('hotel');
      expect(businessType!.enum).toContain('rental');
      expect(businessType!.enum).toContain('wellness');
      expect(businessType!.enum).toContain('other');
    });

    it('should have primary_color property for hex codes', () => {
      const color = tool?.function.parameters.properties.primary_color;
      expect(color).toBeDefined();
      expect(color!.description).toContain('hex code');
    });
  });

  describe('update_location_info tool', () => {
    const tool = ONBOARDING_TOOLS.find((t) => t.function.name === 'update_location_info');

    it('should have correct description', () => {
      expect(tool?.function.description).toContain('Update location information');
    });

    it('should have country_code property', () => {
      const countryCode = tool?.function.parameters.properties.country_code;
      expect(countryCode).toBeDefined();
      expect(countryCode!.description).toContain('ISO country code');
    });

    it('should have timezone property', () => {
      const timezone = tool?.function.parameters.properties.timezone;
      expect(timezone).toBeDefined();
      expect(timezone!.description).toContain('Timezone');
    });

    it('should have primary_language property', () => {
      const lang = tool?.function.parameters.properties.primary_language;
      expect(lang).toBeDefined();
      expect(lang!.description).toContain('language code');
    });
  });

  describe('check_onboarding_progress tool', () => {
    const tool = ONBOARDING_TOOLS.find((t) => t.function.name === 'check_onboarding_progress');

    it('should have correct description', () => {
      expect(tool?.function.description).toContain('Check current onboarding progress');
    });

    it('should have empty parameters (no required inputs)', () => {
      expect(tool?.function.parameters.properties).toEqual({});
    });
  });
});
