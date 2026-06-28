import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  await requireAdmin();
  const { data: testimonials } = await supabaseAdmin.from('testimonials').select('*').order('created_at', { ascending: false });

  async function togglePublish(formData: FormData) {
    'use server'
    await requireAdmin();
    const id = formData.get('id') as string;
    const is_published = formData.get('is_published') === 'true';
    await supabaseAdmin.from('testimonials').update({ is_published: !is_published }).eq('id', id);
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
  }

  async function deleteTestimonial(formData: FormData) {
    'use server'
    await requireAdmin();
    const id = formData.get('id') as string;
    await supabaseAdmin.from('testimonials').delete().eq('id', id);
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
  }

  async function addTestimonial(formData: FormData) {
    'use server'
    await requireAdmin();
    const guest_name = formData.get('guest_name') as string;
    const destination = formData.get('destination') as string;
    const review_content = formData.get('review_content') as string;
    const rating = parseInt(formData.get('rating') as string) || 5;

    await supabaseAdmin.from('testimonials').insert([{ guest_name, destination, review_content, rating, is_published: true }]);
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
  }

  return (
    <div className="p-8">
      <div className="mb-8 border-b border-surface-variant pb-6">
        <h1 className="font-headline-lg text-3xl font-bold text-primary">Testimonials Manager</h1>
        <p className="text-on-surface-variant mt-2 text-sm">Manage guest reviews displayed on the website.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl luxury-shadow border border-surface-variant mb-12">
        <h3 className="font-headline-sm text-xl font-bold text-primary mb-6">Add New Testimonial</h3>
        <form action={addTestimonial} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-label-sm font-label-sm text-on-surface-variant mb-2 uppercase tracking-widest font-bold">Guest Name</label>
              <input required name="guest_name" type="text" className="w-full border-2 border-surface-variant focus:border-secondary rounded-lg bg-surface px-4 py-3 text-primary font-medium focus:outline-none transition-colors" placeholder="e.g. John Doe" />
            </div>
            <div>
              <label className="block text-label-sm font-label-sm text-on-surface-variant mb-2 uppercase tracking-widest font-bold">Destination Traveled To</label>
              <input required name="destination" type="text" className="w-full border-2 border-surface-variant focus:border-secondary rounded-lg bg-surface px-4 py-3 text-primary font-medium focus:outline-none transition-colors" placeholder="e.g. Swiss Alps" />
            </div>
          </div>
          <div>
            <label className="block text-label-sm font-label-sm text-on-surface-variant mb-2 uppercase tracking-widest font-bold">Review Content</label>
            <textarea required name="review_content" rows={4} className="w-full border-2 border-surface-variant focus:border-secondary rounded-lg bg-surface px-4 py-3 text-primary font-medium focus:outline-none transition-colors" placeholder="Their experience..."></textarea>
          </div>
          <div>
            <label className="block text-label-sm font-label-sm text-on-surface-variant mb-2 uppercase tracking-widest font-bold">Rating (1-5)</label>
            <input required name="rating" type="number" min="1" max="5" defaultValue="5" className="w-full md:w-1/4 border-2 border-surface-variant focus:border-secondary rounded-lg bg-surface px-4 py-3 text-primary font-medium focus:outline-none transition-colors" />
          </div>
          <button type="submit" className="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all luxury-shadow">Add Testimonial</button>
        </form>
      </div>

      <div className="bg-white rounded-2xl luxury-shadow border border-surface-variant overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant text-sm tracking-widest uppercase border-b border-surface-variant">
              <th className="p-5 font-bold">Guest</th>
              <th className="p-5 font-bold">Destination</th>
              <th className="p-5 font-bold">Review</th>
              <th className="p-5 font-bold">Status</th>
              <th className="p-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials && testimonials.length > 0 ? (
              testimonials.map((t: any) => (
                <tr key={t.id} className="border-b border-surface-container hover:bg-surface-container-low transition-colors group">
                  <td className="p-5 font-bold text-primary">{t.guest_name}</td>
                  <td className="p-5 text-on-surface-variant">{t.destination}</td>
                  <td className="p-5">
                    <div className="text-secondary mb-1">
                      {'★'.repeat(t.rating || 5)}{'☆'.repeat(5 - (t.rating || 5))}
                    </div>
                    <div className="max-w-[300px] truncate text-on-surface-variant text-sm">{t.review_content}</div>
                  </td>
                  <td className="p-5">
                    <form action={togglePublish}>
                      <input type="hidden" name="id" value={t.id} />
                      <input type="hidden" name="is_published" value={t.is_published} />
                      <button type="submit" className={`px-3 py-1 rounded-full text-xs uppercase tracking-widest font-bold border ${t.is_published ? 'bg-secondary-container/20 text-secondary-fixed border-secondary-container/50' : 'bg-surface-variant text-on-surface-variant border-outline'}`}>
                        {t.is_published ? 'Published' : 'Hidden'}
                      </button>
                    </form>
                  </td>
                  <td className="p-5 text-right">
                    <form action={deleteTestimonial}>
                      <input type="hidden" name="id" value={t.id} />
                      <button type="submit" className="text-error font-bold text-sm hover:underline">Delete</button>
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-on-surface-variant italic">
                  No testimonials found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
