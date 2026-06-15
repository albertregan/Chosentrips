export const revalidate = 0;

export default function AboutUsPage() {
  return (
    <main style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* Cinematic Hero */}
      <section style={{
        position: 'relative',
        height: '70vh',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'url("https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2560&q=80") center/cover no-repeat',
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
          zIndex: 1
        }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white', marginTop: '100px' }}>
          <h1 style={{ fontSize: '4.5rem', marginBottom: '20px', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>Our Philosophy</h1>
          <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', opacity: 0.9 }}>
            The art of the extraordinary.
          </p>
        </div>
      </section>

      {/* Philosophy Content */}
      <section className="container" style={{ padding: '120px 40px', maxWidth: '800px', textAlign: 'center' }}>
        <span style={{ color: 'var(--secondary-color)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', display: 'block', marginBottom: '20px' }}>The Chosen Way</span>
        <h2 style={{ fontSize: '3rem', marginBottom: '40px', lineHeight: 1.2 }}>Travel is not simply about reaching a destination. It is about how the journey transforms you.</h2>
        
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '30px', lineHeight: 2, textAlign: 'left' }}>
          At Chosen Trips, we believe that true luxury lies in the unseen details. It is the seamless transition between a private jet and a secluded villa. It is the local guide whose family has lived in the village for generations. It is the peace of mind knowing that every second of your journey has been meticulously crafted to your exact preferences.
        </p>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '60px', lineHeight: 2, textAlign: 'left' }}>
          We do not sell pre-packaged tours. We curate singular, transformative experiences for the world’s most discerning travelers. From the snowy peaks of the Swiss Alps to the spiritual heart of Bali, we hold the keys to the extraordinary.
        </p>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '60px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>Meet Our Founder</h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '30px', lineHeight: 2 }}>
            Founded by Albert Regan, a lifelong explorer with an uncompromising eye for elegance, Chosen Trips was born from a desire to elevate the travel experience beyond the ordinary. Albert spent over two decades traversing the globe, cultivating exclusive relationships with boutique hoteliers, private aviators, and elite local concierges.
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 2 }}>
            "My vision was simple," Albert explains. "To remove the friction of travel and leave only the magic. We design each itinerary as if we were planning it for ourselves—with obsession, care, and a relentless pursuit of perfection."
          </p>
        </div>
      </section>

      {/* Cinematic Quote */}
      <section style={{ padding: '120px 20px', backgroundColor: 'var(--bg-offset)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--text-dark)' }}>
          "The world is a book, and those who do not travel read only a page."
        </h2>
      </section>
    </main>
  );
}
