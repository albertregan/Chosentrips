'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '../actions';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await loginAdmin(password);
      if (result.success) {
        router.push('/admin/dashboard');
        router.refresh(); // Force refresh to re-evaluate layout cookies
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl luxury-shadow border border-surface-variant">
        <div className="text-center mb-8">
          <h1 className="font-headline-md text-2xl font-bold text-primary mb-2">Admin Access</h1>
          <p className="text-on-surface-variant text-sm">Please enter the master password to continue.</p>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container p-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-label-sm font-label-sm text-on-surface-variant mb-2 uppercase tracking-widest">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-surface-container-highest focus:border-secondary bg-transparent px-4 py-3 text-primary font-medium focus:outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-on-primary py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
