import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const { data: testimonials } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });

  async function togglePublish(formData: FormData) {
    'use server'
    const id = formData.get('id') as string;
    const is_published = formData.get('is_published') === 'true';
    await supabase.from('testimonials').update({ is_published: !is_published }).eq('id', id);
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
  }

  async function deleteTestimonial(formData: FormData) {
    'use server'
    const id = formData.get('id') as string;
    await supabase.from('testimonials').delete().eq('id', id);
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
  }

  async function addTestimonial(formData: FormData) {
    'use server'
    const guest_name = formData.get('guest_name') as string;
    const destination = formData.get('destination') as string;
    const review_content = formData.get('review_content') as string;
    
    await supabase.from('testimonials').insert([{ guest_name, destination, review_content, is_published: true }]);
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
  }

  return (
    <div className="admin-card">
      <div className="admin-header">
        <h1>Testimonials Manager</h1>
      </div>

      <div style={{ marginBottom: '40px', padding: '20px', background: 'var(--bg-offset)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ marginBottom: '20px' }}>Add New Testimonial</h3>
        <form action={addTestimonial} style={{ display: 'grid', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <input required name="guest_name" type="text" placeholder="Guest Name" style={{ padding: '10px', width: '100%' }} />
            <input required name="destination" type="text" placeholder="Destination Traveled To" style={{ padding: '10px', width: '100%' }} />
          </div>
          <textarea required name="review_content" rows={4} placeholder="Review Content" style={{ padding: '10px', width: '100%' }}></textarea>
          <button type="submit" className="btn btn-primary" style={{ justifySelf: 'start', padding: '10px 30px' }}>Add Testimonial</button>
        </form>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Guest</th>
            <th>Destination</th>
            <th>Review</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials?.map((t: any) => (
            <tr key={t.id}>
              <td>{t.guest_name}</td>
              <td>{t.destination}</td>
              <td><div style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.review_content}</div></td>
              <td>
                <form action={togglePublish}>
                  <input type="hidden" name="id" value={t.id} />
                  <input type="hidden" name="is_published" value={t.is_published} />
                  <button type="submit" style={{ cursor: 'pointer', background: 'none', border: 'none', color: t.is_published ? 'green' : 'red', fontWeight: 'bold' }}>
                    {t.is_published ? 'Published' : 'Hidden'}
                  </button>
                </form>
              </td>
              <td>
                <form action={deleteTestimonial}>
                  <input type="hidden" name="id" value={t.id} />
                  <button type="submit" style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'red' }}>Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
