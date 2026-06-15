import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* Cinematic Hero Section */}
      <section style={{
        position: 'relative',
        height: '100vh',
        minHeight: '800px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2560&q=80") center/cover no-repeat',
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))',
          zIndex: 1
        }}></div>
        
        <div className="container fade-in" style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white' }}>
          <h1 style={{ 
            fontSize: '5rem', 
            color: 'white', 
            marginBottom: '30px', 
            maxWidth: '900px', 
            margin: '0 auto 30px',
            textShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            Your Journey,<br />Chosen With Care.
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            maxWidth: '500px', 
            margin: '0 auto 50px', 
            opacity: 0.9,
            letterSpacing: '1px',
            lineHeight: 2
          }}>
            Extraordinary, hand-crafted experiences designed for the discerning traveler.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Link href="/packages" className="btn btn-gold">
              Discover Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Featured Section */}
      <section className="py-section container">
        <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '700px', margin: '0 auto 80px' }}>
          <span style={{ color: 'var(--secondary-color)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Curated Experiences</span>
          <h2 style={{ fontSize: '3rem', marginTop: '20px' }}>Exceptional Journeys</h2>
        </div>

        <div className="magazine-grid">
          
          {/* Editorial Block 1 */}
          <div style={{ gridColumn: '1 / 8', position: 'relative', height: '600px', background: 'url("https://images.unsplash.com/photo-1542315143-6903525281ac?auto=format&fit=crop&w=1200&q=80") center/cover' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: 'white' }}>
              <h3 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '10px' }}>Magical Bali</h3>
              <Link href="/packages/magical-bali-gateway" style={{ borderBottom: '1px solid var(--secondary-color)', color: 'var(--secondary-color)', paddingBottom: '5px', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' }}>Explore Experience</Link>
            </div>
          </div>

          <div style={{ gridColumn: '8 / 13', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>Serenity in Seminyak</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Discover the perfect blend of spiritual awakening and absolute luxury in our hand-picked Balinese villas. Every detail is curated to ensure a transcendent getaway.</p>
          </div>

          {/* Editorial Block 2 */}
          <div style={{ gridColumn: '1 / 6', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px', marginTop: '60px' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>The Alps Await</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Breathe in the crisp mountain air. Traverse the snow-capped peaks of Switzerland with our exclusive train passes and premium ski lodge accommodations.</p>
          </div>

          <div style={{ gridColumn: '6 / 13', position: 'relative', height: '600px', background: 'url("https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80") center/cover', marginTop: '60px' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: 'white' }}>
              <h3 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '10px' }}>Swiss Retreat</h3>
              <Link href="/packages/swiss-alps-retreat" style={{ borderBottom: '1px solid var(--secondary-color)', color: 'var(--secondary-color)', paddingBottom: '5px', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' }}>Explore Experience</Link>
            </div>
          </div>

        </div>
        
        <div className="text-center" style={{ marginTop: '100px' }}>
          <Link href="/packages" className="btn btn-primary">View All Collections</Link>
        </div>
      </section>
    </main>
  );
}
