'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type PackageInitialData = {
  id?: string;
  title?: string;
  slug?: string;
  destination_id?: string | null;
  type?: string;
  price?: number | string | null;
  image_url?: string | null;
  description?: string | null;
  inclusions?: string | null;
  exclusions?: string | null;
  is_featured?: boolean | null;
  category?: string | null;
  departure_city?: string | null;
  is_weekend_destination?: boolean | null;
};

type DestinationOption = {
  id: string;
  name: string;
};

export default function PackageForm({ initialData }: { initialData?: PackageInitialData }) {
  const router = useRouter();
  const isEditing = !!initialData;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    destination_id: initialData?.destination_id || '',
    type: initialData?.type || 'international',
    price: initialData?.price?.toString() || '',
    image_url: initialData?.image_url || '',
    description: initialData?.description || '',
    inclusions: initialData?.inclusions || '',
    exclusions: initialData?.exclusions || '',
    is_featured: initialData?.is_featured || false,
    category: initialData?.category || 'Beach',
    departure_city: initialData?.departure_city || '',
    is_weekend_destination: initialData?.is_weekend_destination || false,
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const [destinations, setDestinations] = useState<DestinationOption[]>([]);

  useEffect(() => {
    async function fetchDestinations() {
      const { data } = await supabase.from('destinations').select('id, name').order('name');
      if (data) setDestinations(data);
    }
    fetchDestinations();
  }, []);

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
      destination_id: formData.destination_id || null,
      price: parseFloat(formData.price as string) || 0
    };

    let resultError;

    if (isEditing) {
      const { error } = await supabase.from('packages').update(payload).eq('id', initialData.id);
      resultError = error;
    } else {
      const { error, data } = await supabase.from('packages').insert([payload]).select('id').single();
      resultError = error;
      if (!error && data?.id) {
        router.push(`/admin/packages/edit/${data.id}`);
        router.refresh();
        return;
      }
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
          <label className={labelClasses}>Destination</label>
          <select required className={inputClasses} value={formData.destination_id} onChange={(e) => setFormData({...formData, destination_id: e.target.value})}>
            <option value="">Select a destination...</option>
            {destinations.map(dest => (
              <option key={dest.id} value={dest.id}>{dest.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClasses}>Type</label>
          <select required className={inputClasses} value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
            <option value="domestic">Domestic</option>
            <option value="international">International</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelClasses}>Starting Price (₹)</label>
          <input required type="number" min="0" className={inputClasses} value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="e.g. 50000" />
        </div>
        <div>
          <label className={labelClasses}>Category</label>
          <select required className={inputClasses} value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
            <option value="Beach">Beach</option>
            <option value="Mountains">Mountains</option>
            <option value="History">History</option>
            <option value="Nightlife">Nightlife</option>
            <option value="Adventure">Adventure</option>
            <option value="Pilgrimage">Pilgrimage</option>
          </select>
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

      <div className="flex items-center gap-3 bg-surface-container-low p-4 rounded-lg border border-surface-variant">
        <input
          type="checkbox"
          id="is_featured"
          className="w-5 h-5 accent-primary"
          checked={formData.is_featured}
          onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
        />
        <label htmlFor="is_featured" className="font-bold text-primary cursor-pointer">
          Featured Package (Show on Homepage)
        </label>
      </div>

      <div className="flex flex-col md:flex-row gap-8 bg-surface-container-low p-6 rounded-lg border border-surface-variant">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="is_weekend_destination"
            className="w-5 h-5 accent-primary"
            checked={formData.is_weekend_destination}
            onChange={(e) => setFormData({...formData, is_weekend_destination: e.target.checked})}
          />
          <label htmlFor="is_weekend_destination" className="font-bold text-primary cursor-pointer">
            Weekend Destination
          </label>
        </div>
        {formData.is_weekend_destination && (
          <div className="flex-1">
            <label className={labelClasses}>Departure City</label>
            <input type="text" className={inputClasses} value={formData.departure_city} onChange={(e) => setFormData({...formData, departure_city: e.target.value})} placeholder="e.g. Bangalore" />
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
