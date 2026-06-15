'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function EnquiryForm({ packageId, packageName }: { packageId?: string, packageName?: string }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    destination: packageName || '',
    preferred_date: '',
    no_of_nights: '',
    no_of_adults: 2,
    no_of_children: 0,
    children_ages: [] as string[],
    budget: '',
    budget_type: 'total',
    message: '',
    name: '',
    email: '',
    phone_number: ''
  });

  const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value) || 0;
    setFormData({
      ...formData,
      no_of_children: count,
      children_ages: Array(count).fill('')
    });
  };

  const handleAgeChange = (index: number, value: string) => {
    const newAges = [...formData.children_ages];
    newAges[index] = value;
    setFormData({ ...formData, children_ages: newAges });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      nextStep();
      return;
    }

    setLoading(true); setError(''); setSuccess(false);

    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone_number,
      message: formData.message,
      package_id: packageId || null,
      destination: formData.destination,
      preferred_date: formData.preferred_date || null,
      no_of_nights: parseInt(formData.no_of_nights as string) || null,
      no_of_adults: formData.no_of_adults,
      no_of_children: formData.no_of_children,
      children_ages: formData.children_ages,
      budget: parseFloat(formData.budget as string) || null,
      budget_type: formData.budget_type
    };

    const { error: submitError } = await supabase.from('leads').insert([submissionData]);

    setLoading(false);
    if (submitError) {
      console.error(submitError);
      setError('There was an error submitting your enquiry. Please try again.');
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div style={{ background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(20px)', padding: '60px 40px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
        <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', marginBottom: '20px' }}>Journey Requested</h3>
        <p style={{ color: 'var(--text-muted)' }}>Thank you, {formData.name}. Our luxury travel curators will review your preferences and contact you shortly.</p>
      </div>
    );
  }

  return (
    <div style={{ 
      position: 'sticky', 
      top: '120px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      padding: '50px 40px',
      border: '1px solid var(--border-color)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
        <span style={{ color: step === 1 ? 'var(--primary-color)' : 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>01. The Trip</span>
        <span style={{ color: step === 2 ? 'var(--primary-color)' : 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>02. Travelers</span>
        <span style={{ color: step === 3 ? 'var(--primary-color)' : 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>03. Details</span>
        <span style={{ color: step === 4 ? 'var(--primary-color)' : 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>04. Contact</span>
      </div>

      <h3 style={{ fontSize: '2rem', marginBottom: '10px', fontFamily: 'var(--font-serif)' }}>
        {packageName ? `Enquire about ${packageName}` : 'Curate Your Journey'}
      </h3>
      
      {error && <div style={{ background: '#FFEBEE', color: '#C62828', padding: '15px', marginBottom: '20px', fontSize: '0.9rem' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        
        {/* STEP 1: The Trip */}
        {step === 1 && (
          <div className="fade-in">
            <div className="form-group">
              <label className="form-label">Destination</label>
              <input required type="text" className="form-input" value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} placeholder="Where would you like to go?" />
            </div>
            <div className="form-group">
              <label className="form-label">Preferred Start Date</label>
              <input type="date" className="form-input" value={formData.preferred_date} onChange={(e) => setFormData({...formData, preferred_date: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Number of Nights</label>
              <input type="number" min="1" className="form-input" value={formData.no_of_nights} onChange={(e) => setFormData({...formData, no_of_nights: e.target.value})} placeholder="e.g. 7" />
            </div>
          </div>
        )}

        {/* STEP 2: Travelers */}
        {step === 2 && (
          <div className="fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Adults</label>
                <input type="number" min="1" className="form-input" value={formData.no_of_adults} onChange={(e) => setFormData({...formData, no_of_adults: parseInt(e.target.value) || 1})} />
              </div>
              <div className="form-group">
                <label className="form-label">Children</label>
                <input type="number" min="0" className="form-input" value={formData.no_of_children} onChange={handleChildrenChange} />
              </div>
            </div>

            {formData.no_of_children > 0 && (
              <div style={{ padding: '20px', background: 'var(--bg-offset)', marginBottom: '20px' }}>
                <label className="form-label" style={{ marginBottom: '15px' }}>Ages of Children at time of travel</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  {formData.children_ages.map((age, index) => (
                    <div key={index}>
                      <select required className="form-input" value={age} onChange={(e) => handleAgeChange(index, e.target.value)}>
                        <option value="">Select Age</option>
                        {Array.from({length: 18}, (_, i) => i).map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'year' : 'years'} old</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Details */}
        {step === 3 && (
          <div className="fade-in">
            <div className="form-group">
              <label className="form-label">Budget Range</label>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <button type="button" onClick={() => setFormData({...formData, budget_type: 'total'})} style={{ flex: 1, padding: '10px', background: formData.budget_type === 'total' ? 'var(--primary-color)' : 'transparent', color: formData.budget_type === 'total' ? 'white' : 'var(--text-dark)', border: '1px solid var(--primary-color)', cursor: 'pointer', transition: 'all 0.3s' }}>Total Budget</button>
                <button type="button" onClick={() => setFormData({...formData, budget_type: 'per_person'})} style={{ flex: 1, padding: '10px', background: formData.budget_type === 'per_person' ? 'var(--primary-color)' : 'transparent', color: formData.budget_type === 'per_person' ? 'white' : 'var(--text-dark)', border: '1px solid var(--primary-color)', cursor: 'pointer', transition: 'all 0.3s' }}>Per Person</button>
              </div>
              <input type="number" className="form-input" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} placeholder="Amount in ₹" />
            </div>

            <div className="form-group">
              <label className="form-label">Specific Requirements / Occasion</label>
              <textarea rows={4} className="form-textarea" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Honeymoon, dietary requirements, specific hotels..."></textarea>
            </div>
          </div>
        )}

        {/* STEP 4: Contact */}
        {step === 4 && (
          <div className="fade-in">
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
          </div>
        )}

        <div style={{ display: 'flex', gap: '15px', marginTop: '40px' }}>
          {step > 1 && (
            <button type="button" onClick={prevStep} className="btn" style={{ flex: 1, border: '1px solid var(--border-color)' }}>
              Back
            </button>
          )}
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ flex: 2 }}>
            {step < 4 ? 'Next Step' : (loading ? 'Submitting...' : 'Submit Request')}
          </button>
        </div>
      </form>
    </div>
  );
}
