import EnquiryForm from '@/components/EnquiryForm';

export default function ContactUsPage() {
  return (
    <main>
      <div style={{ backgroundColor: 'var(--primary-color)', padding: '60px 0', color: 'white', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '10px' }}>Contact Us</h1>
        <p style={{ opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>We are here to help you plan your perfect getaway.</p>
      </div>

      <div className="container py-section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          <div>
            <h2 style={{ marginBottom: '20px' }}>Get in Touch</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1.1rem' }}>
              Have questions about our packages or want a custom itinerary? Fill out the form, and our travel experts will reach out to you within 24 hours.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: 0 }}>
                <div style={{ backgroundColor: 'var(--accent-color)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--primary-color)', fontWeight: 'bold' }}>
                  📞
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>Phone</h4>
                  <p style={{ color: 'var(--text-muted)', margin: 0 }}>+91 98765 43210</p>
                </div>
              </div>

              <div className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: 0 }}>
                <div style={{ backgroundColor: 'var(--accent-color)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--primary-color)', fontWeight: 'bold' }}>
                  ✉️
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>Email</h4>
                  <p style={{ color: 'var(--text-muted)', margin: 0 }}>hello@chosentrips.com</p>
                </div>
              </div>

              <div className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: 0 }}>
                <div style={{ backgroundColor: 'var(--accent-color)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--primary-color)', fontWeight: 'bold' }}>
                  📍
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>Office</h4>
                  <p style={{ color: 'var(--text-muted)', margin: 0 }}>123 Travel Lane, Business Hub, City 400001</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <EnquiryForm />
          </div>
        </div>
      </div>
    </main>
  );
}
