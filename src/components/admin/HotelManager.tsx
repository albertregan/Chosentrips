'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { createRecord, deleteRecord } from '@/app/admin/cms-actions';

export default function HotelManager({ packageId }: { packageId: string }) {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [formData, setFormData] = useState({
    star_rating: 4,
    name: '',
    description: ''
  });

  const fetchHotels = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('hotels')
      .select('*')
      .eq('package_id', packageId)
      .order('star_rating', { ascending: false });
    
    if (data) {
      setHotels(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHotels();
  }, [packageId]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    
    const result = await createRecord('hotels', {
      package_id: packageId,
      star_rating: formData.star_rating,
      name: formData.name,
      description: formData.description
    });

    if (!result.error) {
      setFormData({ star_rating: 4, name: '', description: '' });
      fetchHotels();
    } else {
      alert(result.error);
    }
    setAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this hotel option?')) {
      await deleteRecord('hotels', id);
      fetchHotels();
    }
  };

  const inputClasses = "w-full border-2 border-surface-variant focus:border-secondary rounded-lg bg-white px-4 py-3 text-primary font-medium focus:outline-none transition-colors";

  if (loading) return <div className="p-8 text-center">Loading hotels...</div>;

  return (
    <div className="bg-white p-8 rounded-2xl luxury-shadow border border-surface-variant">
      <h3 className="font-headline-md text-2xl font-bold text-primary mb-6">Hotel Options</h3>
      
      {/* Existing Hotels */}
      <div className="space-y-4 mb-8">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="p-4 border border-surface-variant rounded-lg flex justify-between items-start bg-surface-container-low">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-primary text-lg">{hotel.name}</h4>
                <span className="text-secondary text-sm">{'★'.repeat(hotel.star_rating)}</span>
              </div>
              <p className="text-on-surface-variant text-sm">{hotel.description}</p>
            </div>
            <button onClick={() => handleDelete(hotel.id)} className="text-error hover:bg-error-container p-2 rounded-lg transition-colors">
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        ))}
        {hotels.length === 0 && <p className="text-on-surface-variant italic">No hotels added yet.</p>}
      </div>

      {/* Add New Form */}
      <form onSubmit={handleAdd} className="bg-surface-container-lowest p-6 rounded-xl border border-surface-variant">
        <h4 className="font-bold text-primary mb-4">Add Hotel Option</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Stars</label>
            <select required className={inputClasses} value={formData.star_rating} onChange={e => setFormData({...formData, star_rating: parseInt(e.target.value)})}>
              <option value={3}>3 Star</option>
              <option value={4}>4 Star</option>
              <option value={5}>5 Star</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Hotel Name</label>
            <input required type="text" className={inputClasses} placeholder="e.g. The Ritz-Carlton" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Description</label>
          <textarea required rows={2} className={inputClasses} placeholder="Brief description of the hotel..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
        </div>
        <button disabled={adding} className="bg-secondary text-on-secondary px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 disabled:opacity-50">
          {adding ? 'Adding...' : 'Add Hotel'}
        </button>
      </form>
    </div>
  );
}
