'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function DestinationForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    image_url: initialData?.image_url || '',
    is_featured: initialData?.is_featured || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      ...formData,
      slug: formData.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    };

    let result;
    if (initialData?.id) {
      result = await supabase.from('destinations').update(payload).eq('id', initialData.id);
    } else {
      result = await supabase.from('destinations').insert([payload]);
    }

    setLoading(false);

    if (result.error) {
      setError(result.error.message);
    } else {
      router.push('/admin/destinations');
      router.refresh();
    }
  };

  const inputClasses = "w-full border-2 border-surface-variant focus:border-secondary rounded-lg bg-surface px-4 py-3 text-primary font-medium focus:outline-none transition-colors";
  const labelClasses = "block text-label-sm font-label-sm text-on-surface-variant mb-2 uppercase tracking-widest font-bold";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl luxury-shadow border border-surface-variant max-w-4xl space-y-8">
      
      {error && (
        <div className="bg-error-container text-on-error-container p-4 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Destination Name</label>
          <input required type="text" className={inputClasses} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Maldives" />
        </div>
        <div>
          <label className={labelClasses}>Slug / URL Path</label>
          <input required type="text" className={inputClasses} value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} placeholder="e.g. maldives" />
        </div>
      </div>

      <div>
        <label className={labelClasses}>Description</label>
        <textarea rows={4} className={inputClasses} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Brief overview of the destination..."></textarea>
      </div>

      <div>
        <label className={labelClasses}>Image URL</label>
        <input type="url" className={inputClasses} value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} placeholder="https://..." />
        {formData.image_url && (
          <div className="mt-4 rounded-lg overflow-hidden border border-surface-variant max-w-md h-48 relative">
            <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 bg-surface-container-low p-4 rounded-lg border border-surface-variant">
        <input type="checkbox" id="is_featured" className="w-5 h-5 accent-primary" checked={formData.is_featured} onChange={(e) => setFormData({...formData, is_featured: e.target.checked})} />
        <label htmlFor="is_featured" className="font-bold text-primary cursor-pointer">Featured Destination (Show on Homepage)</label>
      </div>

      <div className="flex justify-end gap-4 pt-8 border-t border-surface-variant">
        <button type="button" onClick={() => router.push('/admin/destinations')} className="px-8 py-3 border border-surface-variant text-primary font-bold rounded-lg hover:bg-surface-container transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-10 py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-opacity-90 transition-all luxury-shadow disabled:opacity-50">
          {loading ? 'Saving...' : initialData ? 'Update Destination' : 'Create Destination'}
        </button>
      </div>
    </form>
  );
}
