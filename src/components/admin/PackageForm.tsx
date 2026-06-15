'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function PackageForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const isEditing = !!initialData;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    type: initialData?.type || 'international',
    price: initialData?.price || '',
    image_url: initialData?.image_url || '',
    description: initialData?.description || '',
    inclusions: initialData?.inclusions || '',
    exclusions: initialData?.exclusions || '',
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: isEditing ? formData.slug : generateSlug(title)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      ...formData,
      price: parseFloat(formData.price as string) || 0
    };

    let resultError;

    if (isEditing) {
      const { error } = await supabase.from('packages').update(payload).eq('id', initialData.id);
      resultError = error;
    } else {
      const { error } = await supabase.from('packages').insert([payload]);
      resultError = error;
    }

    setLoading(false);

    if (resultError) {
      setError(resultError.message);
    } else {
      router.push('/admin/packages');
      router.refresh();
    }
  };

  const inputClasses = "w-full border-2 border-surface-variant focus:border-secondary rounded-lg bg-white px-4 py-3 text-primary font-medium focus:outline-none transition-colors";
  const labelClasses = "block text-label-sm font-label-sm text-on-surface-variant mb-2 uppercase tracking-widest font-bold";

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl luxury-shadow border border-surface-variant max-w-4xl mx-auto space-y-8">
      
      {error && (
        <div className="bg-error-container text-on-error-container p-4 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelClasses}>Package Title</label>
          <input required type="text" className={inputClasses} value={formData.title} onChange={handleTitleChange} placeholder="e.g. Magical Bali Getaway" />
        </div>
        <div>
          <label className={labelClasses}>URL Slug</label>
          <input required type="text" className={inputClasses} value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} placeholder="e.g. magical-bali-getaway" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelClasses}>Type</label>
          <select required className={inputClasses} value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
            <option value="domestic">Domestic</option>
            <option value="international">International</option>
          </select>
        </div>
        <div>
          <label className={labelClasses}>Starting Price (₹)</label>
          <input required type="number" min="0" className={inputClasses} value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="e.g. 50000" />
        </div>
      </div>

      <div>
        <label className={labelClasses}>Main Image URL</label>
        <input required type="url" className={inputClasses} value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} placeholder="https://images.unsplash.com/..." />
        {formData.image_url && (
          <div className="mt-4 p-2 bg-surface-container rounded-lg inline-block">
            <img src={formData.image_url} alt="Preview" className="h-32 object-cover rounded shadow-sm" />
          </div>
        )}
      </div>

      <div>
        <label className={labelClasses}>Description</label>
        <textarea required rows={4} className={inputClasses} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Describe the package experience..."></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelClasses}>Inclusions (One per line)</label>
          <textarea required rows={6} className={inputClasses} value={formData.inclusions} onChange={(e) => setFormData({...formData, inclusions: e.target.value})} placeholder="5-star accommodation&#10;Breakfast included&#10;Airport transfers"></textarea>
        </div>
        <div>
          <label className={labelClasses}>Exclusions (One per line)</label>
          <textarea required rows={6} className={inputClasses} value={formData.exclusions} onChange={(e) => setFormData({...formData, exclusions: e.target.value})} placeholder="International flights&#10;Visa fees&#10;Personal expenses"></textarea>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-8 border-t border-surface-variant">
        <button type="button" onClick={() => router.push('/admin/packages')} className="px-8 py-3 border border-surface-variant text-primary font-bold rounded-lg hover:bg-surface-container transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-10 py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-opacity-90 transition-all luxury-shadow disabled:opacity-50">
          {loading ? 'Saving...' : (isEditing ? 'Update Package' : 'Create Package')}
        </button>
      </div>
    </form>
  );
}
