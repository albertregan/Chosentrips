import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 0;

export default async function PagesCMSPage() {
  const { data: pages } = await supabase
    .from('pages')
    .select('*')
    .order('title', { ascending: true });

  return (
    <div className="p-8">
      <div className="mb-8 border-b border-surface-variant pb-6">
        <h1 className="font-headline-lg text-3xl font-bold text-primary">Pages CMS</h1>
        <p className="text-on-surface-variant mt-2 text-sm">Manage dynamic text content for your legal and informational pages.</p>
      </div>
      
      <div className="bg-white rounded-2xl luxury-shadow border border-surface-variant overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant text-sm tracking-widest uppercase border-b border-surface-variant">
              <th className="p-5 font-bold">Title</th>
              <th className="p-5 font-bold">Slug / URL Path</th>
              <th className="p-5 font-bold">Last Updated</th>
              <th className="p-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages && pages.length > 0 ? (
              pages.map((page: any) => (
                <tr key={page.id} className="border-b border-surface-container hover:bg-surface-container-low transition-colors group">
                  <td className="p-5 font-bold text-primary text-lg">{page.title}</td>
                  <td className="p-5 text-on-surface-variant font-mono text-sm">/{page.slug}</td>
                  <td className="p-5 text-on-surface-variant text-sm">{new Date(page.updated_at).toLocaleDateString()}</td>
                  <td className="p-5 text-right">
                    <Link href={`/admin/pages/edit/${page.id}`} className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-surface-container hover:bg-secondary-container hover:text-primary transition-colors text-on-surface-variant font-bold text-sm">
                      Edit Content
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-8 text-center text-on-surface-variant italic">
                  No pages found. (Did you run the seed script?)
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
