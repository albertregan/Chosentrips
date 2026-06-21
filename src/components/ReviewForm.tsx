"use client";

import { useState } from 'react';

export default function ReviewForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    guest_name: '',
    destination: '',
    review_content: '',
    rating: 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess(false);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Submission failed');
      setSuccess(true);
      setFormData({ guest_name: '', destination: '', review_content: '', rating: 5 });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-surface-container-low p-8 text-center rounded-2xl luxury-shadow border border-surface-variant">
        <h3 className="font-headline-md text-[24px] text-primary font-bold mb-4">Review Submitted</h3>
        <p className="text-on-surface-variant text-lg">Thank you! Your review has been submitted and is pending approval.</p>
        <button onClick={() => setSuccess(false)} className="mt-6 text-primary font-bold hover:underline">Submit another review</button>
      </div>
    );
  }

  const inputClasses = "w-full border-b-2 border-surface-variant focus:border-secondary bg-transparent px-4 py-3 text-primary font-medium focus:outline-none transition-colors";
  const labelClasses = "block text-label-sm font-label-sm text-on-surface-variant mb-1 uppercase tracking-widest";

  return (
    <div className="bg-surface-container-low p-8 md:p-12 border border-surface-variant luxury-shadow rounded-2xl">
      <h3 className="font-headline-md text-[32px] text-primary font-bold mb-6">Write a Review</h3>
      
      {error && <div className="bg-error-container text-on-error-container p-4 mb-6 rounded-lg text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={labelClasses}>Your Name</label>
          <input required type="text" className={inputClasses} value={formData.guest_name} onChange={(e) => setFormData({...formData, guest_name: e.target.value})} placeholder="e.g. John Doe" />
        </div>
        <div>
          <label className={labelClasses}>Destination</label>
          <input required type="text" className={inputClasses} value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} placeholder="e.g. Maldives" />
        </div>
        <div>
          <label className={labelClasses}>Rating (1-5)</label>
          <div className="flex gap-2 items-center">
            <input required type="range" min="1" max="5" className="flex-1 accent-primary" value={formData.rating} onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})} />
            <span className="font-bold text-primary w-8 text-center">{formData.rating}/5</span>
          </div>
        </div>
        <div>
          <label className={labelClasses}>Your Experience</label>
          <textarea required rows={4} className={`${inputClasses} resize-none`} value={formData.review_content} onChange={(e) => setFormData({...formData, review_content: e.target.value})} placeholder="Share your experience..."></textarea>
        </div>
        
        <button type="submit" disabled={loading} className="w-full bg-primary text-on-primary py-4 font-bold rounded-lg hover:bg-opacity-90 transition-all luxury-shadow mt-4">
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}
