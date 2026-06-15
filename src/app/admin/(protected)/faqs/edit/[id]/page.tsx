import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import FaqForm from '@/components/admin/FaqForm';

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: faq } = await supabase.from('faqs').select('*').eq('id', id).single();

  if (!faq) {
    notFound();
  }

  return (
    <div className="p-8">
      <div className="mb-8 border-b border-surface-variant pb-6">
        <h1 className="font-headline-lg text-3xl font-bold text-primary">Edit FAQ</h1>
        <p className="text-on-surface-variant mt-2 text-sm">Update the FAQ entry.</p>
      </div>
      <FaqForm initialData={faq} />
    </div>
  );
}
