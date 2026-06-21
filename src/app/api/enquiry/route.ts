import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const { error } = await supabase.from('leads').insert([{
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      package_id: data.package_id || null,
      status: 'new',
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
