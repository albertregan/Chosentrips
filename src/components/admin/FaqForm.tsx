'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createRecord, updateRecord } from '@/app/admin/cms-actions';

export default function FaqForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    question: initialData?.question || '',
    answer: initialData?.answer || '',
    order_index: initialData?.order_index || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = initialData?.id
      ? await updateRecord('faqs', initialData.id, formData)
      : await createRecord('faqs', formData);

    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      router.push('/admin/faqs');
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

      <div>
        <label className={labelClasses}>Question</label>
        <input required type="text" className={inputClasses} value={formData.question} onChange={(e) => setFormData({...formData, question: e.target.value})} placeholder="e.g. Do I need a visa?" />
      </div>

      <div>
        <label className={labelClasses}>Answer</label>
        <textarea required rows={4} className={inputClasses} value={formData.answer} onChange={(e) => setFormData({...formData, answer: e.target.value})} placeholder="Detailed answer here..."></textarea>
      </div>

      <div className="w-1/3">
        <label className={labelClasses}>Sort Order (0 is first)</label>
        <input required type="number" className={inputClasses} value={formData.order_index} onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value)})} />
      </div>

      <div className="flex justify-end gap-4 pt-8 border-t border-surface-variant">
        <button type="button" onClick={() => router.push('/admin/faqs')} className="px-8 py-3 border border-surface-variant text-primary font-bold rounded-lg hover:bg-surface-container transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-10 py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-opacity-90 transition-all luxury-shadow disabled:opacity-50">
          {loading ? 'Saving...' : initialData ? 'Update FAQ' : 'Add FAQ'}
        </button>
      </div>
    </form>
  );
}
