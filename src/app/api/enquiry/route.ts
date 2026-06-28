import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Basic validation — name, email and phone are required for a usable lead.
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json({ error: 'Name, email and phone are required' }, { status: 400 });
    }

    const { error } = await supabase.from('leads').insert([{
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message || null,
      package_id: data.package_id || null,
      status: 'new',
      destination: data.destination || null,
      preferred_date: data.preferred_date || null,
      no_of_nights: data.no_of_nights ?? null,
      no_of_adults: data.no_of_adults ?? null,
      no_of_children: data.no_of_children ?? null,
      children_ages: data.children_ages ?? null,
      budget: data.budget ?? null,
      budget_type: data.budget_type || null,
      referral_name: data.referral_name || null,
      plan_summary: data.plan_summary || null,
      customer_type: data.customer_type || 'Family'
    }]);

    if (error) {
      console.error('Supabase error inserting lead:', error);
      return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error parsing request:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
