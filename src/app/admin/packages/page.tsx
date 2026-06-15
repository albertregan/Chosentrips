import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function PackagesPage() {
  const { data: packages } = await supabase
    .from('packages')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="admin-header">
        <h1>Packages CMS</h1>
        <button className="btn btn-primary">+ Add Package</button>
      </div>
      
      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Price</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages && packages.length > 0 ? (
              packages.map((pkg: any) => (
                <tr key={pkg.id}>
                  <td style={{ fontWeight: 500 }}>{pkg.title}</td>
                  <td style={{ textTransform: 'capitalize' }}>{pkg.type}</td>
                  <td>₹{pkg.price?.toLocaleString() || 'N/A'}</td>
                  <td>{pkg.is_featured ? 'Yes' : 'No'}</td>
                  <td>
                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85em' }}>Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center" style={{ padding: '24px' }}>
                  No packages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
