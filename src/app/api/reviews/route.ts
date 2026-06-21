import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const { error } = await supabase.from('testimonials').insert([{
      guest_name: data.guest_name,
      destination: data.destination,
      review_content: data.review_content,
      rating: data.rating,
      is_published: false
    }]);

    if (error) {
      console.error('Supabase error inserting review:', error);
      return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error parsing request:', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
