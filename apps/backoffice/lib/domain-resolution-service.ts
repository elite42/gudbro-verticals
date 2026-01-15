// Domain Resolution Service
// Handles custom domain resolution, verification, and management
// Feature: WHITE-LABEL-FULL

import { supabase } from '@/lib/supabase';
import { addVercelDomain, removeVercelDomain, getVercelDomainConfig } from './vercel-api';

// =============================================================================
// TYPES
// =============================================================================

export type EntityType = 'brand' | 'location' | 'partner';

export type DomainStatus = 'pending' | 'verifying' | 'verified' | 'failed' | 'expired';

export type SSLStatus = 'pending' | 'provisioning' | 'active' | 'failed';

export interface DomainResolution {
  entityType: EntityType;
  entityId: string;
  brandId: string | null;
  locationId: string | null;
  organizationId: string | null;
  partnerId: string | null;
}

export interface DomainVerification {
  id: string;
  domain: string;
  entityType: EntityType;
  entityId: string;
  verificationToken: string;
  verificationMethod: 'cname' | 'dns_txt' | 'file';
  status: DomainStatus;
  failureReason: string | null;
  sslStatus: SSLStatus;
  vercelDomainId: string | null;
  createdAt: string;
  verifiedAt: string | null;
}

export interface DomainConfig {
  domain: string;
  entityType: EntityType;
  entityId: string;
  status: DomainStatus;
  sslStatus: SSLStatus;
  verificationToken: string;
  cnameTarget: string;
  txtRecord: string;
  isVerified: boolean;
  canAddMore: boolean;
}

export interface RegisterDomainResult {
  success: boolean;
  domain?: string;
  verificationToken?: string;
  error?: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const CNAME_TARGET = 'cname.vercel-dns.com';
const TXT_PREFIX = '_gudbro-verification';

// Platform domains that should be skipped
const PLATFORM_DOMAINS = [
  'localhost',
  'gudbro.com',
  'gudbro.app',
  'gudbro-backoffice.vercel.app',
  'gudbro-coffeeshop.vercel.app',
  'gudbro-website.vercel.app',
];

// =============================================================================
// DOMAIN RESOLUTION
// =============================================================================

/**
 * Check if hostname is a platform domain (should skip resolution)
 */
export function isPlatformDomain(hostname: string): boolean {
  const cleanHost = hostname.split(':')[0].toLowerCase();
  return PLATFORM_DOMAINS.some(
    (domain) => cleanHost === domain || cleanHost.endsWith(`.${domain}`)
  );
}

/**
 * Resolve a custom domain to its entity (brand, location, or partner)
 * Uses database function for efficient lookup
 */
export async function resolveDomain(hostname: string): Promise<DomainResolution | null> {
  const cleanHost = hostname.split(':')[0].toLowerCase();

  // Skip platform domains
  if (isPlatformDomain(cleanHost)) {
    return null;
  }

  try {
    // Use the database function for resolution
    const { data, error } = await supabase.rpc('resolve_custom_domain', {
      p_domain: cleanHost,
    });

    if (error) {
      console.error('[Domain] Resolution error:', error);
      return null;
    }

    if (!data || data.length === 0) {
      return null;
    }

    const result = data[0];
    return {
      entityType: result.entity_type as EntityType,
      entityId: result.entity_id,
      brandId: result.brand_id,
      locationId: result.location_id,
      organizationId: result.organization_id,
      partnerId: result.partner_id,
    };
  } catch (error) {
    console.error('[Domain] Resolution exception:', error);
    return null;
  }
}

/**
 * Get cached domain resolution (for middleware performance)
 * TODO: Implement Redis/Upstash caching
 */
export async function resolveDomainCached(hostname: string): Promise<DomainResolution | null> {
  // For now, just call the regular resolution
  // In production, this should check Redis first
  return resolveDomain(hostname);
}

// =============================================================================
// DOMAIN REGISTRATION
// =============================================================================

/**
 * Check if a domain is blacklisted
 */
export async function isDomainBlacklisted(domain: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('is_domain_blacklisted', {
    p_domain: domain.toLowerCase(),
  });

  if (error) {
    console.error('[Domain] Blacklist check error:', error);
    return true; // Fail safe
  }

  return data === true;
}

/**
 * Check if organization can add more custom domains
 */
export async function canAddCustomDomain(organizationId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('can_add_custom_domain', {
    p_organization_id: organizationId,
  });

  if (error) {
    console.error('[Domain] Can add check error:', error);
    return false;
  }

  return data === true;
}

/**
 * Register a new custom domain
 */
export async function registerDomain(
  domain: string,
  entityType: EntityType,
  entityId: string,
  organizationId?: string
): Promise<RegisterDomainResult> {
  const cleanDomain = domain.toLowerCase().trim();

  // Validate domain format
  if (!isValidDomain(cleanDomain)) {
    return { success: false, error: 'Invalid domain format' };
  }

  // Check blacklist
  if (await isDomainBlacklisted(cleanDomain)) {
    return { success: false, error: 'This domain is not allowed' };
  }

  // Check if domain already exists
  const { data: existing } = await supabase
    .from('domain_verifications')
    .select('id')
    .eq('domain', cleanDomain)
    .single();

  if (existing) {
    return { success: false, error: 'Domain is already registered' };
  }

  // Check organization limits (for brand/location)
  if (organizationId && entityType !== 'partner') {
    const canAdd = await canAddCustomDomain(organizationId);
    if (!canAdd) {
      return { success: false, error: 'Domain limit reached for your plan. Please upgrade.' };
    }
  }

  // Generate verification token
  const verificationToken = generateVerificationToken();

  // Create domain verification record
  const { data: verification, error: insertError } = await supabase
    .from('domain_verifications')
    .insert({
      domain: cleanDomain,
      entity_type: entityType,
      entity_id: entityId,
      verification_token: verificationToken,
      verification_method: 'cname',
      status: 'pending',
    })
    .select()
    .single();

  if (insertError) {
    console.error('[Domain] Insert error:', insertError);
    return { success: false, error: 'Failed to register domain' };
  }

  // Register with Vercel (async, don't wait for completion)
  registerWithVercel(cleanDomain, verification.id).catch((err) => {
    console.error('[Domain] Vercel registration error:', err);
  });

  return {
    success: true,
    domain: cleanDomain,
    verificationToken,
  };
}

/**
 * Remove a custom domain
 */
export async function removeDomain(domain: string): Promise<boolean> {
  const cleanDomain = domain.toLowerCase().trim();

  // Get verification record
  const { data: verification } = await supabase
    .from('domain_verifications')
    .select('*')
    .eq('domain', cleanDomain)
    .single();

  if (!verification) {
    return false;
  }

  // Remove from Vercel if registered
  if (verification.vercel_domain_id) {
    try {
      await removeVercelDomain(cleanDomain);
    } catch (err) {
      console.error('[Domain] Vercel removal error:', err);
    }
  }

  // Remove from database
  const { error: deleteError } = await supabase
    .from('domain_verifications')
    .delete()
    .eq('domain', cleanDomain);

  if (deleteError) {
    console.error('[Domain] Delete error:', deleteError);
    return false;
  }

  // Clear domain from entity
  if (verification.entity_type === 'brand') {
    await supabase
      .from('brands')
      .update({ custom_domain: null, domain_verified: false })
      .eq('id', verification.entity_id);
  } else if (verification.entity_type === 'location') {
    await supabase
      .from('locations')
      .update({ custom_domain: null, domain_verified: false })
      .eq('id', verification.entity_id);
  } else if (verification.entity_type === 'partner') {
    await supabase
      .from('partners')
      .update({ backoffice_domain: null })
      .eq('id', verification.entity_id);
  }

  return true;
}

// =============================================================================
// DOMAIN VERIFICATION
// =============================================================================

/**
 * Verify domain ownership via DNS
 */
export async function verifyDomainOwnership(domain: string): Promise<boolean> {
  const cleanDomain = domain.toLowerCase().trim();

  // Get verification record
  const { data: verification } = await supabase
    .from('domain_verifications')
    .select('*')
    .eq('domain', cleanDomain)
    .single();

  if (!verification) {
    return false;
  }

  // Update status to verifying
  await supabase
    .from('domain_verifications')
    .update({ status: 'verifying', last_check_at: new Date().toISOString() })
    .eq('id', verification.id);

  try {
    // Check CNAME record
    const cnameValid = await checkCNAME(cleanDomain);

    if (cnameValid) {
      // Mark as verified
      await markDomainVerified(verification.id, verification.entity_type, verification.entity_id);
      return true;
    }

    // Check TXT record as fallback
    const txtValid = await checkTXTRecord(cleanDomain, verification.verification_token);

    if (txtValid) {
      await markDomainVerified(verification.id, verification.entity_type, verification.entity_id);
      return true;
    }

    // Mark as failed
    await supabase
      .from('domain_verifications')
      .update({
        status: 'failed',
        failure_reason: 'DNS records not found. Please add CNAME or TXT record.',
      })
      .eq('id', verification.id);

    return false;
  } catch (error) {
    console.error('[Domain] Verification error:', error);
    await supabase
      .from('domain_verifications')
      .update({
        status: 'failed',
        failure_reason: 'Verification check failed. Please try again.',
      })
      .eq('id', verification.id);
    return false;
  }
}

/**
 * Mark domain as verified and update entity
 */
async function markDomainVerified(
  verificationId: string,
  entityType: EntityType,
  entityId: string
): Promise<void> {
  const now = new Date().toISOString();

  // Update verification record
  await supabase
    .from('domain_verifications')
    .update({
      status: 'verified',
      verified_at: now,
      failure_reason: null,
    })
    .eq('id', verificationId);

  // Get domain
  const { data: verification } = await supabase
    .from('domain_verifications')
    .select('domain')
    .eq('id', verificationId)
    .single();

  if (!verification) return;

  // Update entity with domain
  if (entityType === 'brand') {
    await supabase
      .from('brands')
      .update({
        custom_domain: verification.domain,
        domain_verified: true,
        domain_verified_at: now,
      })
      .eq('id', entityId);
  } else if (entityType === 'location') {
    await supabase
      .from('locations')
      .update({
        custom_domain: verification.domain,
        domain_verified: true,
        domain_verified_at: now,
      })
      .eq('id', entityId);
  } else if (entityType === 'partner') {
    await supabase
      .from('partners')
      .update({ backoffice_domain: verification.domain })
      .eq('id', entityId);
  }
}

// =============================================================================
// DNS CHECKS
// =============================================================================

/**
 * Check if CNAME record points to Vercel
 */
async function checkCNAME(domain: string): Promise<boolean> {
  try {
    // Use DNS over HTTPS (Cloudflare)
    const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=CNAME`, {
      headers: { Accept: 'application/dns-json' },
    });

    const data = await response.json();

    if (data.Answer) {
      return data.Answer.some(
        (record: { data: string }) =>
          record.data.toLowerCase().includes('vercel') ||
          record.data.toLowerCase() === CNAME_TARGET ||
          record.data.toLowerCase() === `${CNAME_TARGET}.`
      );
    }

    return false;
  } catch (error) {
    console.error('[Domain] CNAME check error:', error);
    return false;
  }
}

/**
 * Check TXT record for verification token
 */
async function checkTXTRecord(domain: string, token: string): Promise<boolean> {
  try {
    const txtDomain = `${TXT_PREFIX}.${domain}`;
    const response = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${txtDomain}&type=TXT`,
      {
        headers: { Accept: 'application/dns-json' },
      }
    );

    const data = await response.json();

    if (data.Answer) {
      return data.Answer.some((record: { data: string }) => record.data.includes(token));
    }

    return false;
  } catch (error) {
    console.error('[Domain] TXT check error:', error);
    return false;
  }
}

// =============================================================================
// VERCEL INTEGRATION
// =============================================================================

/**
 * Register domain with Vercel
 */
async function registerWithVercel(domain: string, verificationId: string): Promise<void> {
  try {
    const result = await addVercelDomain(domain);

    if (result.success && result.domainId) {
      await supabase
        .from('domain_verifications')
        .update({
          vercel_domain_id: result.domainId,
          vercel_project_id: result.projectId,
          ssl_status: 'provisioning',
        })
        .eq('id', verificationId);
    }
  } catch (error) {
    console.error('[Domain] Vercel registration failed:', error);
  }
}

/**
 * Check domain status on Vercel
 */
export async function checkVercelStatus(domain: string): Promise<{
  configured: boolean;
  sslReady: boolean;
  error?: string;
}> {
  try {
    const config = await getVercelDomainConfig(domain);
    return {
      configured: config.configured,
      sslReady: config.sslReady,
    };
  } catch (error) {
    return {
      configured: false,
      sslReady: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// =============================================================================
// DOMAIN CONFIG
// =============================================================================

/**
 * Get full domain configuration for UI
 */
export async function getDomainConfig(
  entityType: EntityType,
  entityId: string,
  organizationId?: string
): Promise<DomainConfig | null> {
  // Get verification record
  const { data: verification } = await supabase
    .from('domain_verifications')
    .select('*')
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)
    .single();

  if (!verification) {
    // Check if can add
    const canAdd = organizationId ? await canAddCustomDomain(organizationId) : true;

    return {
      domain: '',
      entityType,
      entityId,
      status: 'pending',
      sslStatus: 'pending',
      verificationToken: '',
      cnameTarget: CNAME_TARGET,
      txtRecord: '',
      isVerified: false,
      canAddMore: canAdd,
    };
  }

  return {
    domain: verification.domain,
    entityType: verification.entity_type,
    entityId: verification.entity_id,
    status: verification.status,
    sslStatus: verification.ssl_status || 'pending',
    verificationToken: verification.verification_token,
    cnameTarget: CNAME_TARGET,
    txtRecord: `${TXT_PREFIX}.${verification.domain} TXT "${verification.verification_token}"`,
    isVerified: verification.status === 'verified',
    canAddMore: true,
  };
}

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Validate domain format
 */
function isValidDomain(domain: string): boolean {
  const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;
  return domainRegex.test(domain);
}

/**
 * Generate verification token
 */
function generateVerificationToken(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let token = 'gudbro_';
  for (let i = 0; i < 24; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}
