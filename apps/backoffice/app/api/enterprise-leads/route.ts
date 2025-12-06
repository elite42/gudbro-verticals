import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface CreateEnterpriseLeadRequest {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  estimatedLocations?: number;
  countries?: string[];
  currentSolution?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body: CreateEnterpriseLeadRequest = await request.json();

    // Validate required fields
    if (!body.companyName) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }

    if (!body.contactName) {
      return NextResponse.json(
        { error: 'Contact name is required' },
        { status: 400 }
      );
    }

    if (!body.contactEmail) {
      return NextResponse.json(
        { error: 'Contact email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.contactEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Insert enterprise lead
    const { data, error } = await supabase
      .from('enterprise_leads')
      .insert({
        company_name: body.companyName,
        contact_name: body.contactName,
        contact_email: body.contactEmail,
        contact_phone: body.contactPhone || null,
        estimated_locations: body.estimatedLocations || null,
        countries: body.countries || null,
        current_solution: body.currentSolution || null,
        message: body.message || null,
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating enterprise lead:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // TODO: Send notification email to sales team

    return NextResponse.json({
      lead: data,
      message: 'Enterprise inquiry submitted successfully. Our team will contact you soon.'
    }, { status: 201 });

  } catch (error) {
    console.error('Error in POST /api/enterprise-leads:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const status = searchParams.get('status');
  const assignedTo = searchParams.get('assigned_to');
  const email = searchParams.get('email');

  let query = supabase
    .from('enterprise_leads')
    .select('*');

  if (id) {
    query = query.eq('id', id);
  }

  if (status) {
    query = query.eq('status', status);
  }

  if (assignedTo) {
    query = query.eq('assigned_to', assignedTo);
  }

  if (email) {
    query = query.eq('contact_email', email);
  }

  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Single item request
  if (id) {
    return NextResponse.json({
      lead: data?.[0] || null
    });
  }

  return NextResponse.json({
    leads: data,
    total: data?.length || 0
  });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    // Map camelCase to snake_case
    const dbUpdates: Record<string, unknown> = {};
    if (updates.companyName !== undefined) dbUpdates.company_name = updates.companyName;
    if (updates.contactName !== undefined) dbUpdates.contact_name = updates.contactName;
    if (updates.contactEmail !== undefined) dbUpdates.contact_email = updates.contactEmail;
    if (updates.contactPhone !== undefined) dbUpdates.contact_phone = updates.contactPhone;
    if (updates.estimatedLocations !== undefined) dbUpdates.estimated_locations = updates.estimatedLocations;
    if (updates.countries !== undefined) dbUpdates.countries = updates.countries;
    if (updates.currentSolution !== undefined) dbUpdates.current_solution = updates.currentSolution;
    if (updates.message !== undefined) dbUpdates.message = updates.message;
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.assignedTo !== undefined) dbUpdates.assigned_to = updates.assignedTo;
    if (updates.notes !== undefined) dbUpdates.notes = updates.notes;
    if (updates.convertedOrganizationId !== undefined) dbUpdates.converted_organization_id = updates.convertedOrganizationId;

    const { data, error } = await supabase
      .from('enterprise_leads')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating enterprise lead:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      lead: data,
      message: 'Lead updated successfully'
    });

  } catch (error) {
    console.error('Error in PATCH /api/enterprise-leads:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
