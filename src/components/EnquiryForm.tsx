'use client';

import { useState } from 'react';

export default function EnquiryForm({ packageId, packageName }: { packageId?: string, packageName?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      package_id: packageId,
    };

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to submit');
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="admin-card" style={{ sticky: 'top', top: '20px' }}>
      <h3 style={{ marginBottom: '20px' }}>
        {packageName ? `Enquire about ${packageName}` : 'Get a Custom Quote'}
      </h3>
      
      {status === 'success' && (
        <div style={{ padding: '15px', backgroundColor: '#E6F0FA', color: 'var(--primary-color)', borderRadius: '8px', marginBottom: '20px' }}>
          Thank you for your enquiry! Our travel experts will get back to you shortly.
        </div>
      )}
      
      {status === 'error' && (
        <div style={{ padding: '15px', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: '8px', marginBottom: '20px' }}>
          Something went wrong. Please try again or contact us directly.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input type="text" name="name" required className="form-input" placeholder="John Doe" />
        </div>
        
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input type="email" name="email" required className="form-input" placeholder="john@example.com" />
        </div>
        
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input type="tel" name="phone" required className="form-input" placeholder="+91 98765 43210" />
        </div>
        
        <div className="form-group">
          <label className="form-label">Message / Special Requests</label>
          <textarea name="message" className="form-textarea" rows={4} placeholder="Let us know your preferred travel dates and any specific requirements..."></textarea>
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting...' : 'Send Enquiry'}
        </button>
      </form>
    </div>
  );
}
