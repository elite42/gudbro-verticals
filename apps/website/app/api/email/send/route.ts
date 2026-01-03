import { NextRequest, NextResponse } from 'next/server';
import {
  sendWelcomeEmail,
  sendStaffInviteEmail,
  sendInviteAcceptedEmail,
  sendInviteDeclinedEmail,
  sendContributionApprovedEmail,
  sendContributionRejectedEmail,
  sendOnboardingCompleteEmail,
  isEmailConfigured,
} from '@/lib/email';

// Internal API key for server-to-server calls
const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;

type EmailType =
  | 'welcome'
  | 'staff_invite'
  | 'invite_accepted'
  | 'invite_declined'
  | 'contribution_approved'
  | 'contribution_rejected'
  | 'onboarding_complete';

export async function POST(request: NextRequest) {
  // Verify internal API key if set
  if (INTERNAL_API_KEY) {
    const authHeader = request.headers.get('x-api-key');
    if (authHeader !== INTERNAL_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  if (!isEmailConfigured()) {
    return NextResponse.json(
      { success: false, error: 'Email service not configured' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { type, ...params } = body as { type: EmailType } & Record<string, any>;

    if (!type) {
      return NextResponse.json(
        { error: 'Missing email type' },
        { status: 400 }
      );
    }

    let result;

    switch (type) {
      case 'welcome':
        result = await sendWelcomeEmail({
          email: params.email,
          name: params.name,
          bonusPoints: params.bonusPoints,
        });
        break;

      case 'staff_invite':
        result = await sendStaffInviteEmail({
          email: params.email,
          name: params.name,
          organizationName: params.organizationName,
          roleTitle: params.roleTitle,
          inviterName: params.inviterName,
          inviteToken: params.inviteToken,
          message: params.message,
          expiresAt: params.expiresAt,
        });
        break;

      case 'invite_accepted':
        result = await sendInviteAcceptedEmail({
          inviterEmail: params.inviterEmail,
          inviterName: params.inviterName,
          inviteeName: params.inviteeName,
          inviteeEmail: params.inviteeEmail,
          organizationName: params.organizationName,
          roleTitle: params.roleTitle,
        });
        break;

      case 'invite_declined':
        result = await sendInviteDeclinedEmail({
          inviterEmail: params.inviterEmail,
          inviterName: params.inviterName,
          inviteeEmail: params.inviteeEmail,
          organizationName: params.organizationName,
        });
        break;

      case 'contribution_approved':
        result = await sendContributionApprovedEmail({
          email: params.email,
          name: params.name,
          ingredientName: params.ingredientName,
          pointsEarned: params.pointsEarned,
          totalPoints: params.totalPoints,
        });
        break;

      case 'contribution_rejected':
        result = await sendContributionRejectedEmail({
          email: params.email,
          name: params.name,
          ingredientName: params.ingredientName,
          reason: params.reason,
        });
        break;

      case 'onboarding_complete':
        result = await sendOnboardingCompleteEmail({
          email: params.email,
          ownerName: params.ownerName,
          businessName: params.businessName,
          planName: params.planName,
        });
        break;

      default:
        return NextResponse.json(
          { error: `Unknown email type: ${type}` },
          { status: 400 }
        );
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        messageId: result.messageId,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[EmailAPI] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
