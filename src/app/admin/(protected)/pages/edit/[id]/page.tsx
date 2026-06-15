import PageForm from '@/components/admin/PageForm';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 0;

export default async function EditPageCMS({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: page } = await supabase.from('pages').select('*').eq('id', id).single();

  if (!page) {
    notFound();
  }

  return (
    <div className="p-8">
      <div className="mb-8 border-b border-surface-variant pb-6">
        <div className="flex items-center gap-4 mb-2">
          <Link href="/admin/pages" className="w-10 h-10 bg-surface-container rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-headline-lg text-3xl font-bold text-primary">Edit Page Content</h1>
        </div>
        <p className="text-on-surface-variant text-sm ml-14">Update details for "{page.title}".</p>
      </div>

      <PageForm initialData={page} />
    </div>
  );
}
