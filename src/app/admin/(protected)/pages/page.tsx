import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function PagesCMSPage() {
  const { data: pages } = await supabase
    .from('pages')
    .select('*')
    .order('title', { ascending: true });

  return (
    <div>
      <div className="admin-header">
        <h1>Pages CMS</h1>
      </div>
      
      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug / URL Path</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages && pages.length > 0 ? (
              pages.map((page: any) => (
                <tr key={page.id}>
                  <td style={{ fontWeight: 500 }}>{page.title}</td>
                  <td>/{page.slug}</td>
                  <td>{new Date(page.updated_at).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85em' }}>Edit Content</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center" style={{ padding: '24px' }}>
                  No pages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
