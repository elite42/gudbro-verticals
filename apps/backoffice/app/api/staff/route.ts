import { NextRequest, NextResponse } from 'next/server';
import {
  getStaffProfiles,
  upsertStaffProfile,
  getTeamSettings,
  updateTeamSettings,
  getTopPerformers,
  generateWeeklyReport,
  autoAwardWeeklyAchievements,
  getStaffAchievements,
  REVIEW_CATEGORIES,
} from '@/lib/ai/staff-performance-service';

export const dynamic = 'force-dynamic';

// GET /api/staff - Get staff profiles, settings, or performance data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('locationId');
    const type = searchParams.get('type') || 'profiles'; // profiles, settings, performance, achievements, categories
    const staffId = searchParams.get('staffId');
    const onlyPublic = searchParams.get('onlyPublic') === 'true';
    const onlyActive = searchParams.get('onlyActive') !== 'false'; // default true

    if (!locationId && type !== 'categories') {
      return NextResponse.json({ error: 'Missing required field: locationId' }, { status: 400 });
    }

    switch (type) {
      case 'profiles': {
        const profiles = await getStaffProfiles(locationId!, { onlyPublic, onlyActive });
        return NextResponse.json({
          success: true,
          profiles,
          count: profiles.length,
        });
      }

      case 'settings': {
        const settings = await getTeamSettings(locationId!);
        return NextResponse.json({
          success: true,
          settings: settings || {
            locationId: locationId!,
            showTeamOnMenu: false,
            teamDisplayStyle: 'cards',
            allowStaffReviews: true,
            reviewRequiresOrder: false,
            allowAnonymousReviews: true,
            enableWeeklyRecognition: true,
            recognitionRewardType: 'badge',
          },
        });
      }

      case 'performance': {
        const periodType = (searchParams.get('periodType') as 'weekly' | 'monthly') || 'weekly';
        const limit = parseInt(searchParams.get('limit') || '10');

        const topPerformers = await getTopPerformers(locationId!, periodType, limit);
        const report = await generateWeeklyReport(locationId!);

        return NextResponse.json({
          success: true,
          topPerformers,
          report,
        });
      }

      case 'achievements': {
        if (!staffId) {
          return NextResponse.json({ error: 'Missing required field: staffId' }, { status: 400 });
        }

        const achievements = await getStaffAchievements(staffId);
        return NextResponse.json({
          success: true,
          achievements,
        });
      }

      case 'categories': {
        return NextResponse.json({
          success: true,
          categories: REVIEW_CATEGORIES,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid type. Use: profiles, settings, performance, achievements, categories' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Staff GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/staff - Create/update profiles or trigger actions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, locationId, ...params } = body;

    if (!locationId) {
      return NextResponse.json({ error: 'Missing required field: locationId' }, { status: 400 });
    }

    switch (action) {
      case 'upsertProfile': {
        const {
          accountId,
          displayName,
          photoUrl,
          bio,
          jobTitle,
          specialties,
          languages,
          employmentType,
          hireDate,
          isPublic,
          status,
        } = params;

        if (!accountId) {
          return NextResponse.json({ error: 'Missing required field: accountId' }, { status: 400 });
        }

        const profileId = await upsertStaffProfile({
          accountId,
          locationId,
          displayName,
          photoUrl,
          bio,
          jobTitle,
          specialties,
          languages,
          employmentType,
          hireDate,
          isPublic,
          status,
        });

        return NextResponse.json({
          success: true,
          profileId,
          message: 'Staff profile saved',
        });
      }

      case 'updateSettings': {
        const {
          showTeamOnMenu,
          teamDisplayStyle,
          allowStaffReviews,
          reviewRequiresOrder,
          allowAnonymousReviews,
          enableWeeklyRecognition,
          recognitionRewardType,
        } = params;

        await updateTeamSettings(locationId, {
          showTeamOnMenu,
          teamDisplayStyle,
          allowStaffReviews,
          reviewRequiresOrder,
          allowAnonymousReviews,
          enableWeeklyRecognition,
          recognitionRewardType,
        });

        return NextResponse.json({
          success: true,
          message: 'Team settings updated',
        });
      }

      case 'generateReport': {
        const report = await generateWeeklyReport(locationId);

        return NextResponse.json({
          success: true,
          report,
        });
      }

      case 'autoAwardAchievements': {
        const awardedIds = await autoAwardWeeklyAchievements(locationId);

        return NextResponse.json({
          success: true,
          awardedIds,
          count: awardedIds.length,
          message: `Awarded ${awardedIds.length} achievements`,
        });
      }

      default:
        return NextResponse.json(
          {
            error:
              'Invalid action. Use: upsertProfile, updateSettings, generateReport, autoAwardAchievements',
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Staff POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
