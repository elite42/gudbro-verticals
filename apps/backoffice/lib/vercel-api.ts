// Vercel API Integration
// Handles domain management via Vercel API
// Feature: WHITE-LABEL-FULL

// =============================================================================
// TYPES
// =============================================================================

export interface VercelDomainResponse {
  success: boolean;
  domainId?: string;
  projectId?: string;
  error?: string;
}

export interface VercelDomainConfig {
  configured: boolean;
  sslReady: boolean;
  verification?: {
    type: string;
    domain: string;
    value: string;
  }[];
  error?: string;
}

interface VercelAPIError {
  error: {
    code: string;
    message: string;
  };
}

// =============================================================================
// CONSTANTS
// =============================================================================

const VERCEL_API_BASE = 'https://api.vercel.com';
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

// =============================================================================
// HELPERS
// =============================================================================

function getAuthHeaders(): HeadersInit {
  if (!VERCEL_TOKEN) {
    throw new Error('VERCEL_TOKEN environment variable is not set');
  }

  return {
    Authorization: `Bearer ${VERCEL_TOKEN}`,
    'Content-Type': 'application/json',
  };
}

function buildUrl(path: string): string {
  const url = new URL(path, VERCEL_API_BASE);
  if (VERCEL_TEAM_ID) {
    url.searchParams.set('teamId', VERCEL_TEAM_ID);
  }
  return url.toString();
}

// =============================================================================
// DOMAIN MANAGEMENT
// =============================================================================

/**
 * Add a custom domain to the Vercel project
 */
export async function addVercelDomain(domain: string): Promise<VercelDomainResponse> {
  if (!VERCEL_PROJECT_ID) {
    console.error('[Vercel] VERCEL_PROJECT_ID not set');
    return { success: false, error: 'Vercel project not configured' };
  }

  try {
    const response = await fetch(buildUrl(`/v10/projects/${VERCEL_PROJECT_ID}/domains`), {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ name: domain }),
    });

    if (!response.ok) {
      const errorData = (await response.json()) as VercelAPIError;
      console.error('[Vercel] Add domain error:', errorData);

      // Handle specific error codes
      if (errorData.error?.code === 'domain_already_in_use') {
        return { success: false, error: 'Domain is already in use by another Vercel project' };
      }
      if (errorData.error?.code === 'forbidden') {
        return { success: false, error: 'Not authorized to add this domain' };
      }

      return {
        success: false,
        error: errorData.error?.message || 'Failed to add domain to Vercel',
      };
    }

    const data = await response.json();

    return {
      success: true,
      domainId: data.name, // Vercel uses domain name as ID
      projectId: VERCEL_PROJECT_ID,
    };
  } catch (error) {
    console.error('[Vercel] Add domain exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Remove a custom domain from the Vercel project
 */
export async function removeVercelDomain(domain: string): Promise<boolean> {
  if (!VERCEL_PROJECT_ID) {
    console.error('[Vercel] VERCEL_PROJECT_ID not set');
    return false;
  }

  try {
    const response = await fetch(buildUrl(`/v9/projects/${VERCEL_PROJECT_ID}/domains/${domain}`), {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = (await response.json()) as VercelAPIError;
      console.error('[Vercel] Remove domain error:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('[Vercel] Remove domain exception:', error);
    return false;
  }
}

/**
 * Get domain configuration and status from Vercel
 */
export async function getVercelDomainConfig(domain: string): Promise<VercelDomainConfig> {
  if (!VERCEL_PROJECT_ID) {
    return { configured: false, sslReady: false, error: 'Vercel project not configured' };
  }

  try {
    const response = await fetch(buildUrl(`/v9/projects/${VERCEL_PROJECT_ID}/domains/${domain}`), {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return { configured: false, sslReady: false, error: 'Domain not found' };
      }

      const errorData = (await response.json()) as VercelAPIError;
      return {
        configured: false,
        sslReady: false,
        error: errorData.error?.message || 'Failed to get domain config',
      };
    }

    const data = await response.json();

    return {
      configured: data.verified === true,
      sslReady: data.verification?.length === 0 || data.verified === true,
      verification: data.verification,
    };
  } catch (error) {
    console.error('[Vercel] Get domain config exception:', error);
    return {
      configured: false,
      sslReady: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Verify domain configuration on Vercel
 * Triggers a verification check
 */
export async function verifyVercelDomain(domain: string): Promise<{
  verified: boolean;
  verification?: { type: string; domain: string; value: string }[];
}> {
  if (!VERCEL_PROJECT_ID) {
    return { verified: false };
  }

  try {
    const response = await fetch(
      buildUrl(`/v9/projects/${VERCEL_PROJECT_ID}/domains/${domain}/verify`),
      {
        method: 'POST',
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      const errorData = (await response.json()) as VercelAPIError;
      console.error('[Vercel] Verify domain error:', errorData);
      return { verified: false };
    }

    const data = await response.json();

    return {
      verified: data.verified === true,
      verification: data.verification,
    };
  } catch (error) {
    console.error('[Vercel] Verify domain exception:', error);
    return { verified: false };
  }
}

/**
 * Check if Vercel API is properly configured
 */
export function isVercelConfigured(): boolean {
  return Boolean(VERCEL_TOKEN && VERCEL_PROJECT_ID);
}

/**
 * Get all domains for the project
 */
export async function listVercelDomains(): Promise<string[]> {
  if (!VERCEL_PROJECT_ID) {
    return [];
  }

  try {
    const response = await fetch(buildUrl(`/v9/projects/${VERCEL_PROJECT_ID}/domains`), {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      console.error('[Vercel] List domains error:', response.status);
      return [];
    }

    const data = await response.json();
    return data.domains?.map((d: { name: string }) => d.name) || [];
  } catch (error) {
    console.error('[Vercel] List domains exception:', error);
    return [];
  }
}
