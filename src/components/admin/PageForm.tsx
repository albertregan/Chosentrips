'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function PageForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: initialData.title || '',
    content: initialData.content || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: updateError } = await supabase
      .from('pages')
      .update({ title: formData.title, content: formData.content, updated_at: new Date().toISOString() })
      .eq('id', initialData.id);

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
    } else {
      router.push('/admin/pages');
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

      <div>
        <label className={labelClasses}>Page Title</label>
        <input required type="text" className={inputClasses} value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g. Privacy Policy" />
      </div>

      <div>
        <label className={labelClasses}>Page Content (Markdown / Text)</label>
        <div className="bg-surface-container rounded-t-lg px-4 py-2 border-2 border-b-0 border-surface-variant flex items-center gap-2">
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">format_bold</span>
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">format_italic</span>
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">format_list_bulleted</span>
          <span className="text-xs text-on-surface-variant ml-auto font-mono">Accepts HTML / Markdown formatting</span>
        </div>
        <textarea required rows={15} className={`${inputClasses} rounded-t-none`} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} placeholder="Write the content here..."></textarea>
      </div>

      <div className="flex justify-end gap-4 pt-8 border-t border-surface-variant">
        <button type="button" onClick={() => router.push('/admin/pages')} className="px-8 py-3 border border-surface-variant text-primary font-bold rounded-lg hover:bg-surface-container transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-10 py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-opacity-90 transition-all luxury-shadow disabled:opacity-50">
          {loading ? 'Saving...' : 'Update Content'}
        </button>
      </div>
    </form>
  );
}
