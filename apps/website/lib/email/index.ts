/**
 * Email Service
 *
 * Handles sending transactional emails via Resend
 * Falls back gracefully if Resend is not configured
 */

import * as templates from './templates';

// Resend API configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.EMAIL_FROM || 'GUDBRO <noreply@gudbro.com>';
const RESEND_API_URL = 'https://api.resend.com/emails';

export interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Check if email service is configured
 */
export function isEmailConfigured(): boolean {
  return !!RESEND_API_KEY;
}

/**
 * Send an email via Resend
 */
export async function sendEmail(params: SendEmailParams): Promise<SendEmailResult> {
  if (!RESEND_API_KEY) {
    console.warn('[EmailService] Resend API key not configured, skipping email');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: Array.isArray(params.to) ? params.to : [params.to],
        subject: params.subject,
        html: params.html,
        reply_to: params.replyTo,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[EmailService] Resend error:', errorData);
      return {
        success: false,
        error: errorData.message || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    console.log('[EmailService] Email sent:', data.id);

    return {
      success: true,
      messageId: data.id,
    };
  } catch (error) {
    console.error('[EmailService] Send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============================================================================
// EMAIL SENDING FUNCTIONS
// ============================================================================

/**
 * Send welcome email after registration
 */
export async function sendWelcomeEmail(params: {
  email: string;
  name: string;
  bonusPoints?: number;
}): Promise<SendEmailResult> {
  const { subject, html } = templates.welcomeEmail({
    name: params.name,
    email: params.email,
    bonusPoints: params.bonusPoints || 50,
  });

  return sendEmail({ to: params.email, subject, html });
}

/**
 * Send staff invitation email
 */
export async function sendStaffInviteEmail(params: {
  email: string;
  name?: string;
  organizationName: string;
  roleTitle: string;
  inviterName: string;
  inviteToken: string;
  message?: string;
  expiresAt: string;
}): Promise<SendEmailResult> {
  const { subject, html } = templates.staffInviteEmail({
    inviteeName: params.name || '',
    inviteeEmail: params.email,
    organizationName: params.organizationName,
    roleTitle: params.roleTitle,
    inviterName: params.inviterName,
    inviteToken: params.inviteToken,
    message: params.message,
    expiresAt: params.expiresAt,
  });

  return sendEmail({ to: params.email, subject, html });
}

/**
 * Send invitation accepted notification to inviter
 */
export async function sendInviteAcceptedEmail(params: {
  inviterEmail: string;
  inviterName: string;
  inviteeName: string;
  inviteeEmail: string;
  organizationName: string;
  roleTitle: string;
}): Promise<SendEmailResult> {
  const { subject, html } = templates.inviteAcceptedEmail({
    inviterName: params.inviterName,
    inviteeName: params.inviteeName,
    inviteeEmail: params.inviteeEmail,
    organizationName: params.organizationName,
    roleTitle: params.roleTitle,
  });

  return sendEmail({ to: params.inviterEmail, subject, html });
}

/**
 * Send invitation declined notification to inviter
 */
export async function sendInviteDeclinedEmail(params: {
  inviterEmail: string;
  inviterName: string;
  inviteeEmail: string;
  organizationName: string;
}): Promise<SendEmailResult> {
  const { subject, html } = templates.inviteDeclinedEmail({
    inviterName: params.inviterName,
    inviteeEmail: params.inviteeEmail,
    organizationName: params.organizationName,
  });

  return sendEmail({ to: params.inviterEmail, subject, html });
}

/**
 * Send contribution approved email
 */
export async function sendContributionApprovedEmail(params: {
  email: string;
  name: string;
  ingredientName: string;
  pointsEarned: number;
  totalPoints: number;
}): Promise<SendEmailResult> {
  const { subject, html } = templates.contributionApprovedEmail({
    contributorName: params.name,
    ingredientName: params.ingredientName,
    pointsEarned: params.pointsEarned,
    totalPoints: params.totalPoints,
  });

  return sendEmail({ to: params.email, subject, html });
}

/**
 * Send contribution rejected email
 */
export async function sendContributionRejectedEmail(params: {
  email: string;
  name: string;
  ingredientName: string;
  reason?: string;
}): Promise<SendEmailResult> {
  const { subject, html } = templates.contributionRejectedEmail({
    contributorName: params.name,
    ingredientName: params.ingredientName,
    reason: params.reason,
  });

  return sendEmail({ to: params.email, subject, html });
}

/**
 * Send onboarding complete email
 */
export async function sendOnboardingCompleteEmail(params: {
  email: string;
  ownerName: string;
  businessName: string;
  planName: string;
}): Promise<SendEmailResult> {
  const { subject, html } = templates.onboardingCompleteEmail({
    ownerName: params.ownerName,
    businessName: params.businessName,
    planName: params.planName,
  });

  return sendEmail({ to: params.email, subject, html });
}
