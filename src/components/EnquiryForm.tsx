'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function EnquiryForm({ packageId, packageName }: { packageId?: string, packageName?: string }) {
  const [formData, setFormData] = useState({
    name: '', email: '', phone_number: '', preferred_date: '', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess(false);

    const { error: submitError } = await supabase.from('leads').insert([{ ...formData, package_id: packageId }]);

    setLoading(false);
    if (submitError) {
      setError('There was an error submitting your enquiry. Please try again.');
    } else {
      setSuccess(true);
      setFormData({ name: '', email: '', phone_number: '', preferred_date: '', message: '' });
    }
  };

  return (
    <div style={{ 
      position: 'sticky', 
      top: '120px',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      padding: '40px',
      border: '1px solid var(--border-color)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ fontSize: '1.8rem', marginBottom: '10px', fontFamily: 'var(--font-serif)' }}>
        {packageName ? `Enquire about ${packageName}` : 'Get a Custom Quote'}
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '30px' }}>
        Fill out the form below and one of our travel experts will reach out to curate your perfect journey.
      </p>

      {success && <div style={{ background: '#E8F5E9', color: '#2E7D32', padding: '15px', marginBottom: '20px', fontSize: '0.9rem' }}>Thank you! Your enquiry has been received.</div>}
      {error && <div style={{ background: '#FFEBEE', color: '#C62828', padding: '15px', marginBottom: '20px', fontSize: '0.9rem' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input required type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input required type="email" className="form-input" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input required type="tel" className="form-input" value={formData.phone_number} onChange={(e) => setFormData({...formData, phone_number: e.target.value})} />
        </div>

        <div className="form-group">
          <label className="form-label">Preferred Travel Date (Optional)</label>
          <input type="date" className="form-input" value={formData.preferred_date} onChange={(e) => setFormData({...formData, preferred_date: e.target.value})} />
        </div>

        <div className="form-group">
          <label className="form-label">Additional Requests</label>
          <textarea rows={3} className="form-textarea" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
          {loading ? 'Submitting...' : 'Request Itinerary'}
        </button>
      </form>
    </div>
  );
}
