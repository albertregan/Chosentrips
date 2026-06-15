import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import EnquiryForm from '@/components/EnquiryForm';

export const revalidate = 0;

export default async function PackageDetailsPage({
  params,
}: {
  params: { slug: string }
}) {
  const { data: pkg } = await supabase
    .from('packages')
    .select(`
      *,
      itineraries (*),
      hotels (*)
    `)
    .eq('slug', params.slug)
    .single();

  if (!pkg) {
    notFound();
  }

  // Sort itineraries by day number
  const itineraries = pkg.itineraries?.sort((a: any, b: any) => a.day_number - b.day_number) || [];
  
  // Group hotels by star rating
  const hotels = pkg.hotels || [];
  const stars3 = hotels.filter((h: any) => h.star_rating === 3);
  const stars4 = hotels.filter((h: any) => h.star_rating === 4);
  const stars5 = hotels.filter((h: any) => h.star_rating === 5);

  return (
    <main>
      {/* Package Header */}
      <div style={{
        background: `linear-gradient(rgba(10, 25, 48, 0.7), rgba(10, 25, 48, 0.8)), url("${pkg.image_url || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80'}") center/cover`,
        padding: '100px 20px',
        color: 'white'
      }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <span style={{ backgroundColor: 'var(--secondary-color)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>
              {pkg.type}
            </span>
          </div>
          <h1 style={{ color: 'white', fontSize: '3.5rem', marginBottom: '20px' }}>{pkg.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--secondary-color)' }}>
              From ₹{pkg.price?.toLocaleString()}
            </div>
            {itineraries.length > 0 && (
              <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                {itineraries.length} Days / {itineraries.length - 1} Nights
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container py-section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px', alignItems: 'start' }}>
          
          {/* Main Content Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            <section>
              <h2 style={{ borderBottom: '2px solid var(--secondary-color)', paddingBottom: '10px', display: 'inline-block' }}>Overview</h2>
              <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)', marginTop: '20px' }}>
                {pkg.description || 'No description available for this package.'}
              </div>
            </section>

            {/* Inclusions / Exclusions */}
            <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '24px', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ color: '#047857' }}>Inclusions</h3>
                <div style={{ whiteSpace: 'pre-line' }}>{pkg.inclusions || '• Accommodation\n• Daily Breakfast\n• Transfers'}</div>
              </div>
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '24px', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ color: '#B91C1C' }}>Exclusions</h3>
                <div style={{ whiteSpace: 'pre-line' }}>{pkg.exclusions || '• Flights\n• Personal Expenses\n• Visa Fees'}</div>
              </div>
            </section>

            {/* Day-wise Itinerary */}
            <section>
              <h2 style={{ borderBottom: '2px solid var(--secondary-color)', paddingBottom: '10px', display: 'inline-block' }}>Day-wise Itinerary</h2>
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {itineraries.length > 0 ? itineraries.map((day: any) => (
                  <div key={day.id} style={{ display: 'flex', gap: '20px', backgroundColor: 'var(--bg-offset)', padding: '24px', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ minWidth: '80px' }}>
                      <div style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '10px', borderRadius: 'var(--radius-sm)', textAlign: 'center', fontWeight: 'bold' }}>
                        Day {day.day_number}
                      </div>
                    </div>
                    <div>
                      <h3 style={{ marginTop: 0 }}>{day.title}</h3>
                      <p style={{ color: 'var(--text-muted)' }}>{day.description}</p>
                    </div>
                  </div>
                )) : (
                  <p>Itinerary details coming soon.</p>
                )}
              </div>
            </section>

            {/* Sample Hotels */}
            <section>
              <h2 style={{ borderBottom: '2px solid var(--secondary-color)', paddingBottom: '10px', display: 'inline-block' }}>Sample Hotels</h2>
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {stars5.length > 0 && (
                  <div className="admin-card">
                    <h3>⭐⭐⭐⭐⭐ 5-Star Options</h3>
                    <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                      {stars5.map((h: any) => <li key={h.id}><strong>{h.name}</strong> - {h.description}</li>)}
                    </ul>
                  </div>
                )}
                
                {stars4.length > 0 && (
                  <div className="admin-card">
                    <h3>⭐⭐⭐⭐ 4-Star Options</h3>
                    <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                      {stars4.map((h: any) => <li key={h.id}><strong>{h.name}</strong> - {h.description}</li>)}
                    </ul>
                  </div>
                )}
                
                {stars3.length > 0 && (
                  <div className="admin-card">
                    <h3>⭐⭐⭐ 3-Star Options</h3>
                    <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                      {stars3.map((h: any) => <li key={h.id}><strong>{h.name}</strong> - {h.description}</li>)}
                    </ul>
                  </div>
                )}

                {hotels.length === 0 && <p>Sample hotels will be updated soon.</p>}
              </div>
            </section>
          </div>

          {/* Sticky Sidebar with Enquiry Form */}
          <div style={{ position: 'sticky', top: '20px' }}>
            <EnquiryForm packageId={pkg.id} packageName={pkg.title} />
          </div>

        </div>
      </div>
    </main>
  );
}
