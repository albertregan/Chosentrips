import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import EnquiryForm from '@/components/EnquiryForm';

export const revalidate = 0; 

export default async function PackageDetailsPage({ params }: { params: { slug: string } }) {
  const { data: pkg } = await supabase.from('packages').select('*').eq('slug', params.slug).single();
  
  if (!pkg) {
    notFound();
  }

  const { data: itineraries } = await supabase.from('itineraries').select('*').eq('package_id', pkg.id).order('day_number', { ascending: true });
  const { data: hotels } = await supabase.from('hotels').select('*').eq('package_id', pkg.id);

  return (
    <main style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* Massive Hero */}
      <section style={{
        position: 'relative',
        height: '80vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `url("${pkg.image_url || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2560&q=80'}") center/cover no-repeat`,
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))',
          zIndex: 1
        }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white', marginTop: '100px' }}>
          <span style={{ color: 'var(--secondary-color)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem', display: 'block', marginBottom: '20px' }}>
            {pkg.type} Experience
          </span>
          <h1 style={{ fontSize: '4.5rem', marginBottom: '20px', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>{pkg.title}</h1>
          <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', opacity: 0.9 }}>
            From ₹{pkg.price?.toLocaleString()}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container" style={{ padding: '100px 40px', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '80px' }}>
        
        {/* Left Col: Details */}
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>The Journey</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '60px', lineHeight: 2 }}>
            {pkg.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '80px' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Inclusions</h3>
              <ul style={{ listStyle: 'none', color: 'var(--text-muted)' }}>
                {pkg.inclusions?.split('\n').map((inc: string, i: number) => (
                  <li key={i} style={{ marginBottom: '10px' }}>{inc}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Exclusions</h3>
              <ul style={{ listStyle: 'none', color: 'var(--text-muted)' }}>
                {pkg.exclusions?.split('\n').map((exc: string, i: number) => (
                  <li key={i} style={{ marginBottom: '10px' }}>{exc}</li>
                ))}
              </ul>
            </div>
          </div>

          <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Itinerary</h2>
          <div style={{ position: 'relative', borderLeft: '1px solid var(--border-color)', marginLeft: '20px', paddingLeft: '40px' }}>
            {itineraries?.map((itinerary: any) => (
              <div key={itinerary.id} style={{ marginBottom: '60px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-46px', top: '5px', width: '11px', height: '11px', borderRadius: '50%', background: 'var(--secondary-color)' }}></div>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--secondary-color)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>Day {itinerary.day_number}</h4>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>{itinerary.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{itinerary.description}</p>
              </div>
            ))}
          </div>

          {hotels && hotels.length > 0 && (
            <div style={{ marginTop: '80px' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Accommodations</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {hotels.map((hotel: any) => (
                  <div key={hotel.id} style={{ padding: '30px', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{hotel.name}</h3>
                      <div style={{ color: 'var(--secondary-color)' }}>
                        {'★'.repeat(hotel.star_rating)}{'☆'.repeat(5 - hotel.star_rating)}
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>{hotel.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Enquiry Form */}
        <div>
          <EnquiryForm packageId={pkg.id} packageName={pkg.title} />
        </div>
        
      </section>
    </main>
  );
}
