import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const packages = [
      {
        title: 'Coorg Weekend Retreat',
        slug: 'coorg-weekend-retreat',
        type: 'domestic',
        price: 15000,
        image_url: 'https://images.unsplash.com/photo-1593693397690-362cb9666c6b?auto=format&fit=crop&w=1200&q=80',
        description: 'Escape the city to the lush green hills of Coorg for a refreshing weekend.',
        inclusions: '2 Nights stay\\nBreakfast\\nCoffee Plantation Tour',
        exclusions: 'Travel to Coorg\\nPersonal expenses',
        is_featured: false,
        category: 'Mountains',
        departure_city: 'Bangalore',
        is_weekend_destination: true
      },
      {
        title: 'Mahabalipuram Coastal Getaway',
        slug: 'mahabalipuram-coastal-getaway',
        type: 'domestic',
        price: 12000,
        image_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f7415e?auto=format&fit=crop&w=1200&q=80',
        description: 'Explore the ancient temples and relax on the pristine beaches of Mahabalipuram.',
        inclusions: '2 Nights stay\\nBreakfast\\nTemple Tour',
        exclusions: 'Travel to Mahabalipuram\\nPersonal expenses',
        is_featured: false,
        category: 'Beach',
        departure_city: 'Chennai',
        is_weekend_destination: true
      },
      {
        title: 'Agra Taj Mahal Tour',
        slug: 'agra-taj-mahal-tour',
        type: 'domestic',
        price: 18000,
        image_url: 'https://images.unsplash.com/photo-1564507592208-02DF21a7A5C9?auto=format&fit=crop&w=1200&q=80',
        description: 'Witness the iconic Taj Mahal and immerse yourself in Mughal history.',
        inclusions: '2 Nights stay\\nBreakfast\\nGuided Tour',
        exclusions: 'Travel to Agra\\nPersonal expenses',
        is_featured: true,
        category: 'History',
        departure_city: 'Delhi',
        is_weekend_destination: true
      },
      {
        title: 'Lonavala Hill Station Break',
        slug: 'lonavala-hill-station-break',
        type: 'domestic',
        price: 14000,
        image_url: 'https://images.unsplash.com/photo-1625026601438-fb1c53e020fa?auto=format&fit=crop&w=1200&q=80',
        description: 'Enjoy the misty mountains and scenic viewpoints of Lonavala.',
        inclusions: '2 Nights stay\\nBreakfast\\nSightseeing',
        exclusions: 'Travel to Lonavala\\nPersonal expenses',
        is_featured: false,
        category: 'Mountains',
        departure_city: 'Mumbai',
        is_weekend_destination: true
      },
      {
        title: 'Sundarbans Wildlife Adventure',
        slug: 'sundarbans-wildlife-adventure',
        type: 'domestic',
        price: 22000,
        image_url: 'https://images.unsplash.com/photo-1601625463698-c44bb27b4ddc?auto=format&fit=crop&w=1200&q=80',
        description: 'Experience the thrilling wildlife and mangrove forests of Sundarbans.',
        inclusions: '2 Nights stay\\nAll Meals\\nBoat Safari',
        exclusions: 'Travel to Sundarbans\\nPersonal expenses',
        is_featured: true,
        category: 'Adventure',
        departure_city: 'Kolkata',
        is_weekend_destination: true
      }
    ];

    const { error } = await supabase.from('packages').insert(packages);

    if (error) {
      console.error('Seed error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Weekend packages seeded successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
