import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 0; 

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: { type?: string }
}) {
  let query = supabase.from('packages').select('*').order('created_at', { ascending: false });
  
  if (searchParams.type === 'domestic' || searchParams.type === 'international') {
    query = query.eq('type', searchParams.type);
  }

  const { data: packages } = await query;

  return (
    <main>
      <div style={{ padding: '200px 0 100px', textAlign: 'center', backgroundColor: 'var(--bg-main)' }}>
        <span style={{ color: 'var(--secondary-color)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>The Collection</span>
        <h1 style={{ fontSize: '4rem', marginTop: '20px' }}>
          {searchParams.type === 'domestic' ? 'Domestic' : searchParams.type === 'international' ? 'International' : 'All Destinations'}
        </h1>
      </div>

      <div className="container" style={{ paddingBottom: '100px' }}>
        <div style={{ display: 'flex', gap: '40px', marginBottom: '80px', justifyContent: 'center', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' }}>
          <Link href="/packages" style={{ borderBottom: !searchParams.type ? '1px solid var(--primary-color)' : 'none', paddingBottom: '5px' }}>All</Link>
          <Link href="/packages?type=domestic" style={{ borderBottom: searchParams.type === 'domestic' ? '1px solid var(--primary-color)' : 'none', paddingBottom: '5px' }}>Domestic</Link>
          <Link href="/packages?type=international" style={{ borderBottom: searchParams.type === 'international' ? '1px solid var(--primary-color)' : 'none', paddingBottom: '5px' }}>International</Link>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(12, 1fr)', 
          gap: '40px',
          rowGap: '80px'
        }}>
          {packages && packages.length > 0 ? packages.map((pkg: any, index: number) => (
            <div key={pkg.id} style={{ 
              gridColumn: index % 2 === 0 ? '1 / 8' : '6 / 13', 
              position: 'relative'
            }}>
              <div style={{ position: 'relative', height: '600px', overflow: 'hidden' }}>
                <Link href={`/packages/${pkg.slug}`}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `url("${pkg.image_url || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80'}") center/cover`, transition: 'transform 0.5s ease' }} className="pkg-image"></div>
                </Link>
              </div>
              <div style={{ 
                position: 'absolute', 
                bottom: '-40px', 
                [index % 2 === 0 ? 'right' : 'left']: '-40px',
                backgroundColor: 'var(--bg-main)', 
                padding: '40px', 
                width: '60%',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
              }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--secondary-color)', textTransform: 'uppercase', letterSpacing: '2px' }}>{pkg.type}</span>
                <h3 style={{ fontSize: '2rem', margin: '10px 0 20px' }}>{pkg.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '30px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {pkg.description || 'Experience the journey of a lifetime with this carefully curated package.'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>From ₹{pkg.price?.toLocaleString()}</span>
                  <Link href={`/packages/${pkg.slug}`} style={{ borderBottom: '1px solid var(--primary-color)', paddingBottom: '3px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Discover</Link>
                </div>
              </div>
            </div>
          )) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              No experiences found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
