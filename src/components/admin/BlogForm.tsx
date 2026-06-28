'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createRecord, updateRecord } from '@/app/admin/cms-actions';

export default function BlogForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    content: initialData?.content || '',
    image_url: initialData?.image_url || '',
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: initialData ? formData.slug : generateSlug(title)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      ...formData,
      published_at: new Date().toISOString()
    };

    const result = initialData?.id
      ? await updateRecord('blogs', initialData.id, payload)
      : await createRecord('blogs', payload);

    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      router.push('/admin/blogs');
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
          <label className={labelClasses}>Blog Title</label>
          <input required type="text" className={inputClasses} value={formData.title} onChange={handleTitleChange} placeholder="e.g. 5 Reasons to Visit Bali" />
        </div>
        <div>
          <label className={labelClasses}>URL Slug</label>
          <input required type="text" className={inputClasses} value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} placeholder="e.g. 5-reasons-to-visit-bali" />
        </div>
      </div>

      <div>
        <label className={labelClasses}>Cover Image URL</label>
        <input type="url" className={inputClasses} value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} placeholder="https://..." />
        {formData.image_url && (
          <div className="mt-4 rounded-lg overflow-hidden border border-surface-variant max-w-md h-48 relative">
            <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <div>
        <label className={labelClasses}>Content (Markdown / Text)</label>
        <textarea required rows={12} className={inputClasses} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} placeholder="Write your blog post here..."></textarea>
      </div>

      <div className="flex justify-end gap-4 pt-8 border-t border-surface-variant">
        <button type="button" onClick={() => router.push('/admin/blogs')} className="px-8 py-3 border border-surface-variant text-primary font-bold rounded-lg hover:bg-surface-container transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="px-10 py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-opacity-90 transition-all luxury-shadow disabled:opacity-50">
          {loading ? 'Saving...' : initialData ? 'Update Post' : 'Publish Post'}
        </button>
      </div>
    </form>
  );
}
