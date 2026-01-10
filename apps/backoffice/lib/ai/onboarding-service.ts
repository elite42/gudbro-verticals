// AI-Assisted Onboarding Service
// Phase 13: Conversational onboarding for merchants
// The AI guides merchants through setup by detecting missing data

import { supabase } from '@/lib/supabase';

// Required fields for a complete merchant setup
export interface OnboardingStatus {
  isComplete: boolean;
  completionPercentage: number;
  missingFields: MissingField[];
  nextStep: OnboardingStep | null;
  organization: OrganizationData | null;
  brand: BrandData | null;
  location: LocationData | null;
}

export interface MissingField {
  entity: 'organization' | 'brand' | 'location';
  field: string;
  label: string;
  description: string;
  required: boolean;
  priority: 'critical' | 'important' | 'optional';
  inputType: 'text' | 'select' | 'phone' | 'email' | 'url' | 'color' | 'file' | 'address';
  options?: { value: string; label: string }[];
}

export interface OnboardingStep {
  step: number;
  entity: 'organization' | 'brand' | 'location';
  title: string;
  description: string;
  fields: MissingField[];
}

export interface OrganizationData {
  id: string;
  name: string;
  type: string | null;
  subscription_plan: string | null;
}

export interface BrandData {
  id: string;
  name: string;
  business_type: string | null;
  description: string | null;
  logo_url: string | null;
  primary_color: string;
}

export interface LocationData {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  country_code: string | null;
  phone: string | null;
  email: string | null;
  primary_language: string | null;
  timezone: string | null;
  operating_hours: Record<string, unknown> | null;
}

// Field definitions for onboarding
const ORGANIZATION_FIELDS: Omit<MissingField, 'entity'>[] = [
  {
    field: 'name',
    label: 'Organization Name',
    description: 'Your company or business name',
    required: true,
    priority: 'critical',
    inputType: 'text',
  },
  {
    field: 'type',
    label: 'Account Type',
    description: 'Standard or Enterprise',
    required: false,
    priority: 'optional',
    inputType: 'select',
    options: [
      { value: 'standard', label: 'Standard' },
      { value: 'enterprise', label: 'Enterprise' },
    ],
  },
];

const BRAND_FIELDS: Omit<MissingField, 'entity'>[] = [
  {
    field: 'name',
    label: 'Brand Name',
    description: 'The name customers will see',
    required: true,
    priority: 'critical',
    inputType: 'text',
  },
  {
    field: 'business_type',
    label: 'Business Type',
    description: 'Restaurant, Hotel, Rental, Wellness, etc.',
    required: true,
    priority: 'critical',
    inputType: 'select',
    options: [
      { value: 'fnb', label: 'Restaurant / Cafe' },
      { value: 'hotel', label: 'Hotel' },
      { value: 'rental', label: 'Rental Property' },
      { value: 'wellness', label: 'Wellness / Spa' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    field: 'description',
    label: 'Brand Description',
    description: 'A short description of your business',
    required: false,
    priority: 'important',
    inputType: 'text',
  },
  {
    field: 'logo_url',
    label: 'Logo',
    description: 'Your brand logo (upload image)',
    required: false,
    priority: 'important',
    inputType: 'file',
  },
  {
    field: 'primary_color',
    label: 'Brand Color',
    description: 'Primary color for your brand (hex code like #FF5733)',
    required: false,
    priority: 'optional',
    inputType: 'color',
  },
];

const LOCATION_FIELDS: Omit<MissingField, 'entity'>[] = [
  {
    field: 'name',
    label: 'Location Name',
    description: 'Name for this location (e.g., "Downtown Branch")',
    required: true,
    priority: 'critical',
    inputType: 'text',
  },
  {
    field: 'country_code',
    label: 'Country',
    description: 'Country where this location is',
    required: true,
    priority: 'critical',
    inputType: 'select',
    options: [],
  }, // Options loaded dynamically
  {
    field: 'city',
    label: 'City',
    description: 'City name',
    required: false,
    priority: 'important',
    inputType: 'text',
  },
  {
    field: 'address',
    label: 'Address',
    description: 'Street address',
    required: false,
    priority: 'important',
    inputType: 'address',
  },
  {
    field: 'phone',
    label: 'Phone Number',
    description: 'Contact phone number',
    required: false,
    priority: 'important',
    inputType: 'phone',
  },
  {
    field: 'email',
    label: 'Email',
    description: 'Contact email address',
    required: false,
    priority: 'optional',
    inputType: 'email',
  },
  {
    field: 'primary_language',
    label: 'Primary Language',
    description: 'Main language for customers',
    required: true,
    priority: 'critical',
    inputType: 'select',
    options: [],
  }, // Options loaded dynamically
  {
    field: 'timezone',
    label: 'Timezone',
    description: 'Local timezone (e.g., Asia/Ho_Chi_Minh)',
    required: false,
    priority: 'optional',
    inputType: 'text',
  },
];

/**
 * Check onboarding status for a merchant
 * Returns what's complete and what's missing
 */
export async function checkOnboardingStatus(
  merchantId: string,
  locationId?: string
): Promise<OnboardingStatus> {
  // Try to get location first (which contains brand and org references)
  let location: LocationData | null = null;
  let brand: BrandData | null = null;
  let organization: OrganizationData | null = null;

  if (locationId) {
    // Direct location lookup
    const { data: loc } = await supabase
      .from('locations')
      .select(
        `
        id, name, address, city, country_code, phone, email,
        primary_language, timezone, operating_hours,
        brand:brands (
          id, name, business_type, description, logo_url, primary_color,
          organization:organizations (
            id, name, type, subscription_plan
          )
        )
      `
      )
      .eq('id', locationId)
      .single();

    if (loc) {
      location = {
        id: loc.id,
        name: loc.name,
        address: loc.address,
        city: loc.city,
        country_code: loc.country_code,
        phone: loc.phone,
        email: loc.email,
        primary_language: loc.primary_language,
        timezone: loc.timezone,
        operating_hours: loc.operating_hours,
      };

      if (loc.brand) {
        const brandData = loc.brand as unknown as BrandData & { organization: OrganizationData };
        brand = {
          id: brandData.id,
          name: brandData.name,
          business_type: brandData.business_type,
          description: brandData.description,
          logo_url: brandData.logo_url,
          primary_color: brandData.primary_color,
        };

        if (brandData.organization) {
          organization = brandData.organization;
        }
      }
    }
  } else {
    // Fallback: Use merchantId to find organization via converted_organization_id
    // Then find associated brand and location
    const { data: merchant } = await supabase
      .from('merchants')
      .select(
        `
        id, name,
        converted_organization_id
      `
      )
      .eq('id', merchantId)
      .single();

    if (merchant?.converted_organization_id) {
      // Get organization
      const { data: org } = await supabase
        .from('organizations')
        .select('id, name, type, subscription_plan')
        .eq('id', merchant.converted_organization_id)
        .single();

      if (org) {
        organization = org;

        // Get first brand for this organization
        const { data: brandData } = await supabase
          .from('brands')
          .select('id, name, business_type, description, logo_url, primary_color')
          .eq('organization_id', org.id)
          .limit(1)
          .single();

        if (brandData) {
          brand = brandData;

          // Get first location for this brand
          const { data: loc } = await supabase
            .from('locations')
            .select(
              `id, name, address, city, country_code, phone, email,
               primary_language, timezone, operating_hours`
            )
            .eq('brand_id', brandData.id)
            .limit(1)
            .single();

          if (loc) {
            location = loc;
          }
        }
      }
    } else if (merchant?.name) {
      // Legacy merchant without multi-tenant conversion
      // Create minimal organization data from merchant name
      organization = {
        id: merchantId,
        name: merchant.name,
        type: null,
        subscription_plan: null,
      };
    }
  }

  // Check for missing fields
  const missingFields: MissingField[] = [];

  // Check organization fields
  if (organization) {
    for (const fieldDef of ORGANIZATION_FIELDS) {
      const value = organization[fieldDef.field as keyof OrganizationData];
      if (fieldDef.required && !value) {
        missingFields.push({ ...fieldDef, entity: 'organization' });
      }
    }
  } else {
    // No organization - all org fields are missing
    missingFields.push(
      ...ORGANIZATION_FIELDS.filter((f) => f.required).map((f) => ({
        ...f,
        entity: 'organization' as const,
      }))
    );
  }

  // Check brand fields
  if (brand) {
    for (const fieldDef of BRAND_FIELDS) {
      const value = brand[fieldDef.field as keyof BrandData];
      if (fieldDef.required && !value) {
        missingFields.push({ ...fieldDef, entity: 'brand' });
      } else if (!fieldDef.required && fieldDef.priority === 'important' && !value) {
        missingFields.push({ ...fieldDef, entity: 'brand' });
      }
    }
  } else {
    // No brand - all required brand fields are missing
    missingFields.push(
      ...BRAND_FIELDS.filter((f) => f.required).map((f) => ({ ...f, entity: 'brand' as const }))
    );
  }

  // Check location fields
  if (location) {
    for (const fieldDef of LOCATION_FIELDS) {
      const value = location[fieldDef.field as keyof LocationData];
      if (fieldDef.required && !value) {
        missingFields.push({ ...fieldDef, entity: 'location' });
      } else if (!fieldDef.required && fieldDef.priority === 'important' && !value) {
        missingFields.push({ ...fieldDef, entity: 'location' });
      }
    }
  } else {
    // No location - all required location fields are missing
    missingFields.push(
      ...LOCATION_FIELDS.filter((f) => f.required).map((f) => ({
        ...f,
        entity: 'location' as const,
      }))
    );
  }

  // Calculate completion percentage
  const totalRequired =
    ORGANIZATION_FIELDS.filter((f) => f.required).length +
    BRAND_FIELDS.filter((f) => f.required).length +
    LOCATION_FIELDS.filter((f) => f.required).length;
  const missingRequired = missingFields.filter((f) => f.required).length;
  const completionPercentage = Math.round(
    ((totalRequired - missingRequired) / totalRequired) * 100
  );

  // Determine next step
  let nextStep: OnboardingStep | null = null;
  if (missingFields.length > 0) {
    // Group missing fields by entity and priority
    const criticalOrg = missingFields.filter(
      (f) => f.entity === 'organization' && f.priority === 'critical'
    );
    const criticalBrand = missingFields.filter(
      (f) => f.entity === 'brand' && f.priority === 'critical'
    );
    const criticalLocation = missingFields.filter(
      (f) => f.entity === 'location' && f.priority === 'critical'
    );

    if (criticalOrg.length > 0) {
      nextStep = {
        step: 1,
        entity: 'organization',
        title: 'Complete Organization Setup',
        description: 'Tell me about your organization',
        fields: criticalOrg,
      };
    } else if (criticalBrand.length > 0) {
      nextStep = {
        step: 2,
        entity: 'brand',
        title: 'Complete Brand Setup',
        description: 'Tell me about your brand',
        fields: criticalBrand,
      };
    } else if (criticalLocation.length > 0) {
      nextStep = {
        step: 3,
        entity: 'location',
        title: 'Complete Location Setup',
        description: 'Tell me about your location',
        fields: criticalLocation,
      };
    } else {
      // Only optional/important fields missing
      const important = missingFields.filter((f) => f.priority === 'important');
      if (important.length > 0) {
        nextStep = {
          step: 4,
          entity: important[0].entity,
          title: 'Add More Details',
          description: 'Optional information to improve your profile',
          fields: important,
        };
      }
    }
  }

  return {
    isComplete: missingFields.filter((f) => f.required).length === 0,
    completionPercentage,
    missingFields,
    nextStep,
    organization,
    brand,
    location,
  };
}

/**
 * Generate onboarding prompt for AI
 * This is added to the system prompt when onboarding is incomplete
 */
export function buildOnboardingPrompt(status: OnboardingStatus): string {
  if (status.isComplete) {
    return '';
  }

  let prompt = `

## ONBOARDING MODE ACTIVE

The merchant's profile is ${status.completionPercentage}% complete. You should proactively help them complete their setup.

### Missing Information:
`;

  // Group by priority
  const critical = status.missingFields.filter((f) => f.priority === 'critical');
  const important = status.missingFields.filter((f) => f.priority === 'important');
  const optional = status.missingFields.filter((f) => f.priority === 'optional');

  if (critical.length > 0) {
    prompt += `\n**Required (Critical):**\n`;
    critical.forEach((f) => {
      prompt += `- ${f.label} (${f.entity}): ${f.description}\n`;
    });
  }

  if (important.length > 0) {
    prompt += `\n**Recommended:**\n`;
    important.forEach((f) => {
      prompt += `- ${f.label} (${f.entity}): ${f.description}\n`;
    });
  }

  if (optional.length > 0) {
    prompt += `\n**Optional:**\n`;
    optional.forEach((f) => {
      prompt += `- ${f.label} (${f.entity}): ${f.description}\n`;
    });
  }

  prompt += `
### Onboarding Guidelines:
1. Start by introducing yourself and explaining you can help set up their business
2. Ask for ONE piece of information at a time, in conversational manner
3. When they provide information, use the appropriate function to save it
4. Confirm after each save and move to the next missing field
5. For file uploads (like logo), explain they can upload it through the "Upload Logo" button
6. Be encouraging and explain why each piece of information helps their business
7. After all critical fields are complete, congratulate them and mention optional improvements

### Current Next Step:
${status.nextStep ? `Focus on: ${status.nextStep.title} - ${status.nextStep.description}` : 'All critical fields complete!'}
`;

  return prompt;
}

/**
 * Update organization data via AI
 */
export async function updateOrganization(
  organizationId: string,
  updates: Partial<OrganizationData>
): Promise<{ success: boolean; message: string; data?: OrganizationData }> {
  try {
    const { data, error } = await supabase
      .from('organizations')
      .update(updates)
      .eq('id', organizationId)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      message: 'Organization updated successfully',
      data: data as OrganizationData,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to update organization: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Update brand data via AI
 */
export async function updateBrand(
  brandId: string,
  updates: Partial<BrandData>
): Promise<{ success: boolean; message: string; data?: BrandData }> {
  try {
    const { data, error } = await supabase
      .from('brands')
      .update(updates)
      .eq('id', brandId)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      message: 'Brand updated successfully',
      data: data as BrandData,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to update brand: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Update location data via AI
 */
export async function updateLocation(
  locationId: string,
  updates: Partial<LocationData>
): Promise<{ success: boolean; message: string; data?: LocationData }> {
  try {
    const { data, error } = await supabase
      .from('locations')
      .update(updates)
      .eq('id', locationId)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      message: 'Location updated successfully',
      data: data as LocationData,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to update location: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Create new organization (for brand new merchants)
 */
export async function createOrganization(data: {
  name: string;
  type?: string;
}): Promise<{ success: boolean; message: string; organizationId?: string }> {
  try {
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const { data: org, error } = await supabase
      .from('organizations')
      .insert({
        name: data.name,
        slug,
        type: data.type || 'standard',
        subscription_plan: 'free',
        status: 'active',
      })
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      message: 'Organization created successfully',
      organizationId: org.id,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to create organization: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Create new brand
 */
export async function createBrand(
  organizationId: string,
  data: { name: string; business_type: string; description?: string; primary_color?: string }
): Promise<{ success: boolean; message: string; brandId?: string }> {
  try {
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const { data: brand, error } = await supabase
      .from('brands')
      .insert({
        organization_id: organizationId,
        name: data.name,
        slug,
        business_type: data.business_type,
        description: data.description || null,
        primary_color: data.primary_color || '#000000',
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      message: 'Brand created successfully',
      brandId: brand.id,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to create brand: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Create new location
 */
export async function createLocation(
  brandId: string,
  data: {
    name: string;
    country_code: string;
    city?: string;
    address?: string;
    primary_language?: string;
  }
): Promise<{ success: boolean; message: string; locationId?: string }> {
  try {
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Get country info for currency
    const { data: country } = await supabase
      .from('countries')
      .select('currency_code, primary_language, timezone')
      .eq('code', data.country_code)
      .single();

    const { data: location, error } = await supabase
      .from('locations')
      .insert({
        brand_id: brandId,
        name: data.name,
        slug,
        country_code: data.country_code,
        city: data.city || null,
        address: data.address || null,
        currency_code: country?.currency_code || 'USD',
        primary_language: data.primary_language || country?.primary_language || 'en',
        timezone: country?.timezone || 'UTC',
        enabled_languages: [data.primary_language || country?.primary_language || 'en'],
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      message: 'Location created successfully',
      locationId: location.id,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to create location: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

// OpenAI Tool definitions for onboarding actions
export const ONBOARDING_TOOLS = [
  {
    type: 'function' as const,
    function: {
      name: 'update_organization_info',
      description:
        'Update organization information (name, type). Use when merchant provides organization details.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Organization name',
          },
          type: {
            type: 'string',
            enum: ['standard', 'enterprise'],
            description: 'Account type',
          },
        },
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'update_brand_info',
      description:
        'Update brand information (name, description, business type, colors). Use when merchant provides brand details.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Brand name (customer-facing)',
          },
          business_type: {
            type: 'string',
            enum: ['fnb', 'hotel', 'rental', 'wellness', 'other'],
            description: 'Type of business',
          },
          description: {
            type: 'string',
            description: 'Short description of the brand',
          },
          primary_color: {
            type: 'string',
            description: 'Brand primary color as hex code (e.g., #FF5733)',
          },
        },
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'update_location_info',
      description:
        'Update location information (name, address, city, country, phone, email, language). Use when merchant provides location details.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Location name (e.g., "Downtown Branch")',
          },
          country_code: {
            type: 'string',
            description: 'ISO country code (e.g., "VN" for Vietnam, "US" for USA)',
          },
          city: {
            type: 'string',
            description: 'City name',
          },
          address: {
            type: 'string',
            description: 'Street address',
          },
          phone: {
            type: 'string',
            description: 'Phone number with country code',
          },
          email: {
            type: 'string',
            description: 'Contact email address',
          },
          primary_language: {
            type: 'string',
            description: 'Primary language code (e.g., "en", "vi", "ko")',
          },
          timezone: {
            type: 'string',
            description: 'Timezone (e.g., "Asia/Ho_Chi_Minh")',
          },
        },
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'check_onboarding_progress',
      description: 'Check current onboarding progress and see what information is still missing.',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
];
