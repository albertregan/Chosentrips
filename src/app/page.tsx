import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function Home() {
  const { data: testimonials } = await supabase.from('testimonials').select('*').eq('is_published', true).order('created_at', { ascending: false });

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
          
          {/* Editorial Block 1 - Bali */}
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

          {/* Editorial Block 2 - Swiss Alps */}
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

          {/* Editorial Block 3 - Kashmir */}
          <div style={{ gridColumn: '1 / 8', position: 'relative', height: '600px', background: 'url("https://images.unsplash.com/photo-1566996694954-90b052c413c4?auto=format&fit=crop&w=1200&q=80") center/cover', marginTop: '60px' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: 'white' }}>
              <h3 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '10px' }}>Majestic Kashmir</h3>
              <Link href="/packages/majestic-kashmir" style={{ borderBottom: '1px solid var(--secondary-color)', color: 'var(--secondary-color)', paddingBottom: '5px', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' }}>Explore Experience</Link>
            </div>
          </div>
          <div style={{ gridColumn: '8 / 13', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px', marginTop: '60px' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>Heaven on Earth</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Experience the unparalleled beauty of Kashmir. Stay in a luxury houseboat on Dal Lake and witness the majestic Himalayas.</p>
          </div>

          {/* Editorial Block 4 - Dubai */}
          <div style={{ gridColumn: '1 / 6', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px', marginTop: '60px' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>Desert Opulence</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Embrace the modern marvels and ancient sands. From towering skyscrapers to exclusive desert safaris, Dubai is the pinnacle of luxury.</p>
          </div>
          <div style={{ gridColumn: '6 / 13', position: 'relative', height: '600px', background: 'url("https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80") center/cover', marginTop: '60px' }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: 'white' }}>
              <h3 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '10px' }}>Dubai Escapade</h3>
              <Link href="/packages/dubai-luxury-escapade" style={{ borderBottom: '1px solid var(--secondary-color)', color: 'var(--secondary-color)', paddingBottom: '5px', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px' }}>Explore Experience</Link>
            </div>
          </div>

        </div>
        
        <div className="text-center" style={{ marginTop: '120px' }}>
          <Link href="/packages" className="btn btn-primary" style={{ padding: '20px 60px', fontSize: '1rem' }}>View All Packages</Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ backgroundColor: 'var(--bg-dark)', color: 'white', padding: '120px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span style={{ color: 'var(--secondary-color)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Guest Stories</span>
            <h2 style={{ fontSize: '3rem', marginTop: '20px' }}>Words From Our Travelers</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            {testimonials && testimonials.length > 0 ? testimonials.map((testimonial: any) => (
              <div key={testimonial.id} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '50px 40px', position: 'relative' }}>
                <span style={{ position: 'absolute', top: '20px', left: '30px', fontSize: '4rem', color: 'var(--secondary-color)', opacity: 0.3, fontFamily: 'var(--font-serif)', lineHeight: 1 }}>"</span>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '30px', position: 'relative', zIndex: 2, fontStyle: 'italic', color: '#DDDDDD' }}>
                  {testimonial.review_content}
                </p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '5px', fontFamily: 'var(--font-serif)' }}>{testimonial.guest_name}</h4>
                  <span style={{ color: 'var(--secondary-color)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Traveled to {testimonial.destination}</span>
                </div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#888' }}>
                <p>New guest stories arriving soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
