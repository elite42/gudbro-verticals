import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Review categories
const REVIEW_CATEGORIES = [
  { id: 'friendly', label: 'Cordiale', emoji: '😊' },
  { id: 'fast', label: 'Veloce', emoji: '⚡' },
  { id: 'professional', label: 'Professionale', emoji: '👔' },
  { id: 'helpful', label: 'Disponibile', emoji: '🤝' },
  { id: 'knowledgeable', label: 'Competente', emoji: '🎓' },
  { id: 'attentive', label: 'Attento', emoji: '👀' },
  { id: 'patient', label: 'Paziente', emoji: '🧘' },
  { id: 'creative', label: 'Creativo', emoji: '🎨' },
];

// GET /api/staff/reviews - Get public staff list for customers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'publicStaff';
    const locationId = searchParams.get('locationId');

    if (!locationId) {
      return NextResponse.json({ error: 'Missing required field: locationId' }, { status: 400 });
    }

    if (type === 'publicStaff') {
      // Get public staff profiles for this location
      const { data: profiles, error } = await supabase
        .from('staff_profiles')
        .select('id, display_name, photo_url, job_title, average_rating, total_reviews')
        .eq('location_id', locationId)
        .eq('is_public', true)
        .eq('status', 'active')
        .order('display_name');

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Map to camelCase for frontend
      const publicProfiles = (profiles || []).map((p) => ({
        id: p.id,
        displayName: p.display_name,
        photoUrl: p.photo_url,
        jobTitle: p.job_title,
        averageRating: p.average_rating,
        totalReviews: p.total_reviews,
      }));

      return NextResponse.json({
        success: true,
        staff: publicProfiles,
        count: publicProfiles.length,
      });
    }

    return NextResponse.json({ error: 'Invalid type. Use: publicStaff' }, { status: 400 });
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

    // Verify staff exists and is public
    const { data: staff, error: staffError } = await supabase
      .from('staff_profiles')
      .select('id, display_name')
      .eq('id', staffId)
      .eq('location_id', locationId)
      .eq('is_public', true)
      .single();

    if (staffError || !staff) {
      return NextResponse.json({ error: 'Staff member not found' }, { status: 404 });
    }

    // Insert review
    // Note: points_awarded is calculated by the database trigger (award_review_points)
    // which also updates accounts.consumer_points - no need to do it here
    const reviewData = {
      staff_id: staffId,
      location_id: locationId,
      reviewer_account_id: isAnonymous ? null : reviewerAccountId,
      is_anonymous: isAnonymous ?? !reviewerAccountId,
      rating: rating,
      categories: categories || [],
      comment: comment || null,
      source: source || 'app',
      order_id: orderId || null,
      is_verified: !!orderId,
      // points_awarded is set by BEFORE INSERT trigger
    };

    const { data: review, error: insertError } = await supabase
      .from('staff_reviews')
      .insert(reviewData)
      .select('id, points_awarded')
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw insertError;
    }

    // Points are calculated and awarded by database trigger (award_review_points)
    // The trigger sets points_awarded and updates accounts table directly
    const pointsAwarded = review.points_awarded || 0;

    return NextResponse.json({
      success: true,
      reviewId: review.id,
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
