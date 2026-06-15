import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export const revalidate = 3600; // Cache for 1 hour

export default async function DynamicPage({
  params,
}: {
  params: { slug: string }
}) {
  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!page) {
    notFound();
  }

  return (
    <main>
      <div style={{ backgroundColor: 'var(--primary-color)', padding: '60px 0', color: 'white', textAlign: 'center' }}>
        <h1 style={{ color: 'white', marginBottom: '0' }}>{page.title}</h1>
      </div>

      <div className="container py-section">
        <div 
          className="admin-card" 
          style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8' }}
        >
          {/* In a real app, you might want to use a Markdown or HTML parser here securely */}
          <div style={{ whiteSpace: 'pre-line' }}>
            {page.content || 'Content coming soon.'}
          </div>
        </div>
      </div>
    </main>
  );
}
