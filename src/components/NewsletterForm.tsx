'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Subscription failed');
      setStatus('success');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-xl luxury-shadow p-6 text-center">
        <p className="text-primary font-bold">Thank you for subscribing!</p>
        <p className="text-on-surface-variant text-sm mt-1">Curated travel inspiration is on its way to your inbox.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-xl luxury-shadow">
        <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border-none outline-none focus:ring-0 text-primary font-medium px-4 min-w-[250px]"
          placeholder="Your email address"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold whitespace-nowrap hover:bg-opacity-90 transition-all disabled:opacity-50"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
        </button>
      </div>
      {status === 'error' && <p className="text-error text-sm px-2">{message}</p>}
    </form>
  );
}
