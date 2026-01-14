import { NextRequest, NextResponse } from 'next/server';
import {
  listOfficePartners,
  listOfficeOutreach,
  listConventions,
  listVouchers,
  getConventionsMetrics,
  getRedemptionStats,
  createOfficeOutreach,
  createConvention,
  createVoucher,
  createBulkVouchers,
  redeemVoucher,
  updateOfficeOutreachStatus,
  updateConvention,
  toggleConvention,
  deactivateVoucher,
  discoverOffices,
  analyzeConventionPotential,
} from '@/lib/ai';

export const dynamic = 'force-dynamic';

// GET /api/ai/conventions - List offices, outreach, conventions, vouchers, or metrics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const action = searchParams.get('action') || 'list-offices';

    switch (action) {
      case 'list-offices': {
        const city = searchParams.get('city') || undefined;
        const partnerType = searchParams.get('partnerType') || undefined;
        const industry = searchParams.get('industry') || undefined;
        const maxDistanceM = parseInt(searchParams.get('maxDistance') || '0') || undefined;
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = parseInt(searchParams.get('offset') || '0');

        const offices = await listOfficePartners({
          city,
          partnerType: partnerType as any,
          industry: industry as any,
          maxDistanceM,
          limit,
          offset,
        });

        return NextResponse.json({
          success: true,
          offices,
          count: offices.length,
        });
      }

      case 'office-outreach': {
        if (!merchantId) {
          return NextResponse.json(
            { error: 'Missing required field: merchantId' },
            { status: 400 }
          );
        }

        const status = searchParams.get('status') || undefined;
        const limit = parseInt(searchParams.get('limit') || '50');

        const outreach = await listOfficeOutreach(merchantId, {
          status: status as any,
          limit,
        });

        return NextResponse.json({
          success: true,
          outreach,
          count: outreach.length,
        });
      }

      case 'list-conventions': {
        if (!merchantId) {
          return NextResponse.json(
            { error: 'Missing required field: merchantId' },
            { status: 400 }
          );
        }

        const partnerType = searchParams.get('partnerType') || undefined;
        const isActive = searchParams.get('isActive');
        const limit = parseInt(searchParams.get('limit') || '50');

        const conventions = await listConventions(merchantId, {
          partnerType: partnerType as any,
          isActive: isActive !== null ? isActive === 'true' : undefined,
          limit,
        });

        return NextResponse.json({
          success: true,
          conventions,
          count: conventions.length,
        });
      }

      case 'list-vouchers': {
        const conventionId = searchParams.get('conventionId');
        if (!conventionId) {
          return NextResponse.json(
            { error: 'Missing required field: conventionId' },
            { status: 400 }
          );
        }

        const isActive = searchParams.get('isActive');
        const limit = parseInt(searchParams.get('limit') || '50');

        const vouchers = await listVouchers(conventionId, {
          isActive: isActive !== null ? isActive === 'true' : undefined,
          limit,
        });

        return NextResponse.json({
          success: true,
          vouchers,
          count: vouchers.length,
        });
      }

      case 'redemption-stats': {
        if (!merchantId) {
          return NextResponse.json(
            { error: 'Missing required field: merchantId' },
            { status: 400 }
          );
        }

        const startDate = searchParams.get('startDate') || undefined;
        const endDate = searchParams.get('endDate') || undefined;

        const stats = await getRedemptionStats(
          merchantId,
          startDate && endDate ? { start: startDate, end: endDate } : undefined
        );

        return NextResponse.json({
          success: true,
          stats,
        });
      }

      case 'metrics': {
        if (!merchantId) {
          return NextResponse.json(
            { error: 'Missing required field: merchantId' },
            { status: 400 }
          );
        }

        const metrics = await getConventionsMetrics(merchantId);

        return NextResponse.json({
          success: true,
          metrics,
        });
      }

      default:
        return NextResponse.json(
          {
            error:
              'Invalid action. Use: list-offices, office-outreach, list-conventions, list-vouchers, redemption-stats, or metrics',
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Conventions GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/conventions - Discover offices, create outreach/convention/vouchers, redeem
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, action, ...params } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    switch (action) {
      case 'discover-offices': {
        const { city, countryCode, latitude, longitude, radiusMeters } = params;

        if (!city || !countryCode) {
          return NextResponse.json(
            { error: 'Missing required fields: city, countryCode' },
            { status: 400 }
          );
        }

        const discovered = await discoverOffices({
          merchantId,
          city,
          countryCode,
          latitude,
          longitude,
          radiusMeters,
        });

        return NextResponse.json({
          success: true,
          discovered,
          count: discovered.length,
        });
      }

      case 'analyze-potential': {
        const { companyName, industry, employeeCount, hasCanteen, distanceM } = params;

        if (!companyName || !industry || !employeeCount) {
          return NextResponse.json(
            { error: 'Missing required fields: companyName, industry, employeeCount' },
            { status: 400 }
          );
        }

        const analysis = await analyzeConventionPotential(merchantId, {
          companyName,
          industry,
          employeeCount,
          hasCanteen: hasCanteen ?? true,
          distanceM,
        });

        return NextResponse.json({
          success: true,
          analysis,
        });
      }

      case 'create-outreach': {
        const { officeId, proposedBenefitType, proposedBenefitValue, proposedBenefitDescription } =
          params;

        if (!officeId) {
          return NextResponse.json({ error: 'Missing required field: officeId' }, { status: 400 });
        }

        const outreach = await createOfficeOutreach(merchantId, officeId, {
          proposedBenefitType,
          proposedBenefitValue,
          proposedBenefitDescription,
        });

        if (!outreach) {
          return NextResponse.json({ error: 'Failed to create outreach' }, { status: 500 });
        }

        return NextResponse.json({
          success: true,
          outreach,
        });
      }

      case 'create-convention': {
        const {
          partnerType,
          partnerId,
          partnerName,
          conventionName,
          benefitType,
          benefitValue,
          benefitDescription,
          benefitConditions,
          validFrom,
          validUntil,
          validDays,
          validTimeStart,
          validTimeEnd,
          verificationMethod,
          dailyCodePrefix,
          maxUsesTotal,
          maxUsesPerUser,
          maxUsesPeriod,
          minOrderAmount,
          minPartySize,
        } = params;

        if (!partnerType || !partnerId || !partnerName || !conventionName || !benefitType) {
          return NextResponse.json(
            {
              error:
                'Missing required fields: partnerType, partnerId, partnerName, conventionName, benefitType',
            },
            { status: 400 }
          );
        }

        const convention = await createConvention(merchantId, {
          partnerType,
          partnerId,
          partnerName,
          conventionName,
          benefitType,
          benefitValue,
          benefitDescription,
          benefitConditions,
          validFrom,
          validUntil,
          validDays,
          validTimeStart,
          validTimeEnd,
          verificationMethod,
          dailyCodePrefix,
          maxUsesTotal,
          maxUsesPerUser,
          maxUsesPeriod,
          minOrderAmount,
          minPartySize,
        });

        if (!convention) {
          return NextResponse.json({ error: 'Failed to create convention' }, { status: 500 });
        }

        return NextResponse.json({
          success: true,
          convention,
        });
      }

      case 'create-voucher': {
        const { conventionId, userName, userEmail, userPhone, badgeNumber, validUntil, maxUses } =
          params;

        if (!conventionId) {
          return NextResponse.json(
            { error: 'Missing required field: conventionId' },
            { status: 400 }
          );
        }

        const voucher = await createVoucher(conventionId, merchantId, {
          userName,
          userEmail,
          userPhone,
          badgeNumber,
          validUntil,
          maxUses,
        });

        if (!voucher) {
          return NextResponse.json({ error: 'Failed to create voucher' }, { status: 500 });
        }

        return NextResponse.json({
          success: true,
          voucher,
        });
      }

      case 'create-bulk-vouchers': {
        const { conventionId, count, validUntil, maxUses } = params;

        if (!conventionId || !count) {
          return NextResponse.json(
            { error: 'Missing required fields: conventionId, count' },
            { status: 400 }
          );
        }

        if (count > 100) {
          return NextResponse.json({ error: 'Maximum 100 vouchers per batch' }, { status: 400 });
        }

        const vouchers = await createBulkVouchers(conventionId, merchantId, count, {
          validUntil,
          maxUses,
        });

        return NextResponse.json({
          success: true,
          vouchers,
          count: vouchers.length,
        });
      }

      case 'redeem': {
        const {
          voucherCode,
          originalAmount,
          discountAmount,
          finalAmount,
          itemsSummary,
          partySize,
          orderId,
          verifiedByStaff,
        } = params;

        if (
          !voucherCode ||
          originalAmount === undefined ||
          discountAmount === undefined ||
          finalAmount === undefined
        ) {
          return NextResponse.json(
            {
              error:
                'Missing required fields: voucherCode, originalAmount, discountAmount, finalAmount',
            },
            { status: 400 }
          );
        }

        const result = await redeemVoucher(voucherCode, merchantId, {
          originalAmount,
          discountAmount,
          finalAmount,
          itemsSummary,
          partySize,
          orderId,
          verifiedByStaff,
        });

        if (!result.success) {
          return NextResponse.json({ success: false, error: result.error }, { status: 400 });
        }

        return NextResponse.json({
          success: true,
          redemption: result.redemption,
        });
      }

      default:
        return NextResponse.json(
          {
            error:
              'Invalid action. Use: discover-offices, analyze-potential, create-outreach, create-convention, create-voucher, create-bulk-vouchers, or redeem',
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Conventions POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH /api/ai/conventions - Update outreach status, convention, or deactivate voucher
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...params } = body;

    switch (action) {
      case 'update-outreach': {
        const {
          outreachId,
          status,
          notes,
          meetingDate,
          meetingNotes,
          contactMethod,
          contactPerson,
        } = params;

        if (!outreachId || !status) {
          return NextResponse.json(
            { error: 'Missing required fields: outreachId, status' },
            { status: 400 }
          );
        }

        const success = await updateOfficeOutreachStatus(outreachId, status, {
          notes,
          meetingDate,
          meetingNotes,
          contactMethod,
          contactPerson,
        });

        return NextResponse.json({
          success,
          message: success ? 'Outreach status updated' : 'Failed to update outreach',
        });
      }

      case 'update-convention': {
        const { conventionId, ...updates } = params;

        if (!conventionId) {
          return NextResponse.json(
            { error: 'Missing required field: conventionId' },
            { status: 400 }
          );
        }

        const success = await updateConvention(conventionId, updates);

        return NextResponse.json({
          success,
          message: success ? 'Convention updated' : 'Failed to update convention',
        });
      }

      case 'toggle-convention': {
        const { conventionId, isActive, pausedReason } = params;

        if (!conventionId || isActive === undefined) {
          return NextResponse.json(
            { error: 'Missing required fields: conventionId, isActive' },
            { status: 400 }
          );
        }

        const success = await toggleConvention(conventionId, isActive, pausedReason);

        return NextResponse.json({
          success,
          message: success
            ? `Convention ${isActive ? 'activated' : 'paused'}`
            : 'Failed to toggle convention',
        });
      }

      case 'deactivate-voucher': {
        const { voucherId, reason } = params;

        if (!voucherId) {
          return NextResponse.json({ error: 'Missing required field: voucherId' }, { status: 400 });
        }

        const success = await deactivateVoucher(voucherId, reason);

        return NextResponse.json({
          success,
          message: success ? 'Voucher deactivated' : 'Failed to deactivate voucher',
        });
      }

      default:
        return NextResponse.json(
          {
            error:
              'Invalid action. Use: update-outreach, update-convention, toggle-convention, or deactivate-voucher',
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Conventions PATCH error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
