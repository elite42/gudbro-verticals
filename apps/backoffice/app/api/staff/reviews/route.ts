import { NextRequest, NextResponse } from 'next/server';
import {
  submitStaffReview,
  getStaffReviews,
  getStaffProfiles,
} from '@/lib/ai/staff-performance-service';

export const dynamic = 'force-dynamic';

// GET /api/staff/reviews - Get reviews for a staff member or public staff list
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'reviews'; // reviews, publicStaff
    const staffId = searchParams.get('staffId');
    const locationId = searchParams.get('locationId');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    switch (type) {
      case 'reviews': {
        if (!staffId) {
          return NextResponse.json({ error: 'Missing required field: staffId' }, { status: 400 });
        }

        const reviews = await getStaffReviews(staffId, { limit, offset });

        return NextResponse.json({
          success: true,
          reviews,
          count: reviews.length,
        });
      }

      case 'publicStaff': {
        // Public endpoint for customers to see staff they can review
        if (!locationId) {
          return NextResponse.json(
            { error: 'Missing required field: locationId' },
            { status: 400 }
          );
        }

        const profiles = await getStaffProfiles(locationId, { onlyPublic: true, onlyActive: true });

        // Return minimal info for customer view
        const publicProfiles = profiles.map((p) => ({
          id: p.id,
          displayName: p.displayName,
          photoUrl: p.photoUrl,
          jobTitle: p.jobTitle,
          averageRating: p.averageRating,
          totalReviews: p.totalReviews,
        }));

        return NextResponse.json({
          success: true,
          staff: publicProfiles,
          count: publicProfiles.length,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid type. Use: reviews, publicStaff' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Staff Reviews GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/staff/reviews - Submit a staff review (public endpoint)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      staffId,
      locationId,
      reviewerAccountId,
      isAnonymous,
      rating,
      categories,
      comment,
      source,
      orderId,
      isVerified,
    } = body;

    // Validation
    if (!staffId) {
      return NextResponse.json({ error: 'Missing required field: staffId' }, { status: 400 });
    }
    if (!locationId) {
      return NextResponse.json({ error: 'Missing required field: locationId' }, { status: 400 });
    }
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    const reviewId = await submitStaffReview({
      staffId,
      locationId,
      reviewerAccountId: isAnonymous ? undefined : reviewerAccountId,
      isAnonymous: isAnonymous ?? !reviewerAccountId,
      rating,
      categories: categories || [],
      comment,
      source: source || 'qr_code',
      orderId,
      isVerified: isVerified ?? !!orderId,
    });

    // Calculate points awarded (for feedback to user)
    let pointsAwarded = 0;
    if (reviewerAccountId && !isAnonymous) {
      pointsAwarded = 10;
      if (isVerified || orderId) pointsAwarded += 5;
      if (comment && comment.length > 20) pointsAwarded += 5;
    }

    return NextResponse.json({
      success: true,
      reviewId,
      pointsAwarded,
      message:
        pointsAwarded > 0
          ? `Grazie per il feedback! Hai guadagnato ${pointsAwarded} punti.`
          : 'Grazie per il tuo feedback!',
    });
  } catch (error) {
    console.error('Staff Reviews POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
