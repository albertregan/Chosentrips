'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { createRecord, deleteRecord } from '@/app/admin/cms-actions';

export default function ItineraryManager({ packageId }: { packageId: string }) {
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [formData, setFormData] = useState({
    day_number: 1,
    title: '',
    description: ''
  });

  const fetchItineraries = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('itineraries')
      .select('*')
      .eq('package_id', packageId)
      .order('day_number', { ascending: true });
    
    if (data) {
      setItineraries(data);
      // Auto-increment next day
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, day_number: data[data.length - 1].day_number + 1 }));
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItineraries();
  }, [packageId]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    
    const result = await createRecord('itineraries', {
      package_id: packageId,
      day_number: formData.day_number,
      title: formData.title,
      description: formData.description
    });

    if (!result.error) {
      setFormData({ day_number: formData.day_number + 1, title: '', description: '' });
      fetchItineraries();
    } else {
      alert(result.error);
    }
    setAdding(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this day?')) {
      await deleteRecord('itineraries', id);
      fetchItineraries();
    }
  };

  const inputClasses = "w-full border-2 border-surface-variant focus:border-secondary rounded-lg bg-white px-4 py-3 text-primary font-medium focus:outline-none transition-colors";

  if (loading) return <div className="p-8 text-center">Loading itineraries...</div>;

  return (
    <div className="bg-white p-8 rounded-2xl luxury-shadow border border-surface-variant">
      <h3 className="font-headline-md text-2xl font-bold text-primary mb-6">Day-by-Day Itinerary</h3>
      
      {/* Existing Itineraries */}
      <div className="space-y-4 mb-8">
        {itineraries.map((it) => (
          <div key={it.id} className="p-4 border border-surface-variant rounded-lg flex justify-between items-start bg-surface-container-low">
            <div>
              <h4 className="font-bold text-primary text-lg">Day {it.day_number}: {it.title}</h4>
              <p className="text-on-surface-variant mt-2 text-sm">{it.description}</p>
            </div>
            <button onClick={() => handleDelete(it.id)} className="text-error hover:bg-error-container p-2 rounded-lg transition-colors">
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        ))}
        {itineraries.length === 0 && <p className="text-on-surface-variant italic">No itinerary days added yet.</p>}
      </div>

      {/* Add New Form */}
      <form onSubmit={handleAdd} className="bg-surface-container-lowest p-6 rounded-xl border border-surface-variant">
        <h4 className="font-bold text-primary mb-4">Add Itinerary Day</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Day #</label>
            <input required type="number" min="1" className={inputClasses} value={formData.day_number} onChange={e => setFormData({...formData, day_number: parseInt(e.target.value)})} />
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Title</label>
            <input required type="text" className={inputClasses} placeholder="e.g. Arrival in Male" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Description</label>
          <textarea required rows={3} className={inputClasses} placeholder="Details for this day..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
        </div>
        <button disabled={adding} className="bg-secondary text-on-secondary px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 disabled:opacity-50">
          {adding ? 'Adding...' : 'Add Day'}
        </button>
      </form>
    </div>
  );
}
