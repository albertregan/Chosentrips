import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export const revalidate = 3600; // Cache for 1 hour

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!page) {
    notFound();
  }

  return (
    <main className="pt-20 bg-surface min-h-screen">
      <div className="bg-primary py-20 text-center">
        <h1 className="font-display-xl text-[50px] md:text-[60px] font-bold text-on-primary mb-2">{page.title}</h1>
      </div>

      <div className="max-w-[800px] mx-auto px-margin-desktop py-16">
        <div className="bg-white p-8 md:p-12 rounded-2xl luxury-shadow border border-surface-variant text-on-surface text-lg leading-relaxed">
          <div style={{ whiteSpace: 'pre-line' }}>
            {page.content || 'Content coming soon.'}
          </div>
        </div>
      </div>
    </main>
  );
}
