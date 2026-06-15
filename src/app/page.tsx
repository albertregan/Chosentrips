import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(rgba(10, 25, 48, 0.7), rgba(10, 25, 48, 0.7)), url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2000&q=80") center/cover',
        color: 'white',
        padding: '120px 20px',
        textAlign: 'center',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '4rem', color: 'white', marginBottom: '20px', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
            Your Journey, <span style={{ color: 'var(--secondary-color)' }}>Chosen</span> With Care.
          </h1>
          <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 40px', opacity: 0.9 }}>
            Discover hand-picked domestic and international travel packages designed to give you the experience of a lifetime.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Link href="/packages?type=international" className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
              Explore International
            </Link>
            <Link href="/packages?type=domestic" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
              Explore Domestic
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-section container">
        <div className="text-center mb-4">
          <h2>Featured Destinations</h2>
          <p style={{ color: 'var(--text-muted)' }}>Top picked packages for your next getaway.</p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px',
          marginTop: '40px'
        }}>
          {/* Placeholder Package 1 */}
          <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ height: '200px', background: 'url("https://images.unsplash.com/photo-1542315143-6903525281ac?auto=format&fit=crop&w=800&q=80") center/cover' }}></div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.85em', color: 'var(--secondary-color)', fontWeight: 600, textTransform: 'uppercase' }}>International</span>
                <span style={{ fontWeight: 'bold' }}>₹45,000</span>
              </div>
              <h3 style={{ margin: '10px 0' }}>Magical Bali Gateway</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9em', marginBottom: '20px' }}>5 Days, 4 Nights • Private Villa • Daily Breakfast</p>
              <Link href="/packages/magical-bali-gateway" className="btn btn-primary" style={{ width: '100%' }}>View Details</Link>
            </div>
          </div>

          {/* Placeholder Package 2 */}
          <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ height: '200px', background: 'url("https://images.unsplash.com/photo-1566996694954-90b052c413c4?auto=format&fit=crop&w=800&q=80") center/cover' }}></div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.85em', color: 'var(--secondary-color)', fontWeight: 600, textTransform: 'uppercase' }}>Domestic</span>
                <span style={{ fontWeight: 'bold' }}>₹25,000</span>
              </div>
              <h3 style={{ margin: '10px 0' }}>Majestic Kashmir</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9em', marginBottom: '20px' }}>6 Days, 5 Nights • Houseboat Stay • Sightseeing</p>
              <Link href="/packages/majestic-kashmir" className="btn btn-primary" style={{ width: '100%' }}>View Details</Link>
            </div>
          </div>

          {/* Placeholder Package 3 */}
          <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ height: '200px', background: 'url("https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80") center/cover' }}></div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.85em', color: 'var(--secondary-color)', fontWeight: 600, textTransform: 'uppercase' }}>International</span>
                <span style={{ fontWeight: 'bold' }}>₹85,000</span>
              </div>
              <h3 style={{ margin: '10px 0' }}>Swiss Alps Retreat</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9em', marginBottom: '20px' }}>7 Days, 6 Nights • Train Passes • Mount Titlis</p>
              <Link href="/packages/swiss-alps-retreat" className="btn btn-primary" style={{ width: '100%' }}>View Details</Link>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-4" style={{ paddingTop: '40px' }}>
          <Link href="/packages" className="btn btn-secondary">View All Packages</Link>
        </div>
      </section>
    </main>
  );
}
