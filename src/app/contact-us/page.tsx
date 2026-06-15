import EnquiryForm from '@/components/EnquiryForm';

export const revalidate = 0;

export default function ContactUsPage() {
  return (
    <main style={{ backgroundColor: 'var(--bg-main)' }}>
      {/* Cinematic Hero */}
      <section style={{
        position: 'relative',
        height: '60vh',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'url("https://images.unsplash.com/photo-1542314831-c6a4d1421008?auto=format&fit=crop&w=2560&q=80") center/cover no-repeat',
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
          zIndex: 1
        }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white', marginTop: '100px' }}>
          <h1 style={{ fontSize: '4.5rem', marginBottom: '20px', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>Plan Your Trip</h1>
          <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', opacity: 0.9 }}>
            Let us curate your next masterpiece.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container" style={{ padding: '100px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
        
        {/* Left Col: Info */}
        <div style={{ paddingRight: '40px' }}>
          <span style={{ color: 'var(--secondary-color)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', display: 'block', marginBottom: '20px' }}>Get in Touch</span>
          <h2 style={{ fontSize: '3rem', marginBottom: '40px', lineHeight: 1.2 }}>Begin the extraordinary.</h2>
          
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '60px', lineHeight: 2 }}>
            Whether you have a specific destination in mind or you are seeking inspiration, our team of expert travel curators is at your disposal. Fill out the comprehensive planner, and we will begin designing an itinerary tailored exclusively to you.
          </p>

          <div style={{ marginBottom: '40px' }}>
            <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Email Us</h4>
            <a href="mailto:concierge@chosentrips.com" style={{ fontSize: '1.2rem', color: 'var(--text-dark)', borderBottom: '1px solid var(--border-color)', paddingBottom: '5px' }}>concierge@chosentrips.com</a>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Call Us</h4>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-dark)' }}>+1 (800) 123-CHOSEN</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Available 24/7 for our elite members.</p>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Global Headquarters</h4>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
              150 Luxury Avenue, Suite 400<br />
              New York, NY 10019
            </p>
          </div>
        </div>

        {/* Right Col: Enquiry Form */}
        <div>
          <div style={{ marginTop: '-200px', position: 'relative', zIndex: 10 }}>
            <EnquiryForm />
          </div>
        </div>
        
      </section>
    </main>
  );
}
