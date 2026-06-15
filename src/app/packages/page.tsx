import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 0; // Dynamic rendering for packages

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
      <div style={{ backgroundColor: 'var(--primary-color)', padding: '60px 0', color: 'white', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>
          {searchParams.type === 'domestic' ? 'Domestic' : searchParams.type === 'international' ? 'International' : 'All'} Packages
        </h1>
        <p style={{ opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>Browse our curated selection of travel packages.</p>
      </div>

      <div className="container py-section">
        <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', justifyContent: 'center' }}>
          <Link href="/packages" className={`btn ${!searchParams.type ? 'btn-primary' : ''}`} style={{ border: '1px solid var(--border-color)' }}>All</Link>
          <Link href="/packages?type=domestic" className={`btn ${searchParams.type === 'domestic' ? 'btn-primary' : ''}`} style={{ border: '1px solid var(--border-color)' }}>Domestic</Link>
          <Link href="/packages?type=international" className={`btn ${searchParams.type === 'international' ? 'btn-primary' : ''}`} style={{ border: '1px solid var(--border-color)' }}>International</Link>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px'
        }}>
          {packages && packages.length > 0 ? packages.map((pkg: any) => (
            <div key={pkg.id} className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ height: '220px', background: `url("${pkg.image_url || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80'}") center/cover` }}></div>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.85em', color: 'var(--secondary-color)', fontWeight: 600, textTransform: 'uppercase' }}>{pkg.type}</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>₹{pkg.price?.toLocaleString()}</span>
                </div>
                <h3 style={{ margin: '10px 0' }}>{pkg.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95em', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {pkg.description || 'Experience the journey of a lifetime with this carefully curated package.'}
                </p>
                <Link href={`/packages/${pkg.slug}`} className="btn btn-primary" style={{ width: '100%' }}>View Details</Link>
              </div>
            </div>
          )) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              No packages found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
