import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 0;

export default async function DestinationsPage() {
  const { data: destinations, error } = await supabase
    .from('destinations')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8 border-b border-surface-variant pb-6">
        <div>
          <h1 className="font-headline-lg text-3xl font-bold text-primary">Destinations CMS</h1>
          <p className="text-on-surface-variant mt-2 text-sm">Manage travel destinations.</p>
        </div>
        <Link href="/admin/destinations/new" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all luxury-shadow flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Destination
        </Link>
      </div>
      
      {error && (
        <div className="bg-error-container text-on-error-container p-4 rounded-lg text-sm mb-6">
          Failed to load destinations. Did you run the SQL Migration?
        </div>
      )}

      <div className="bg-white rounded-2xl luxury-shadow border border-surface-variant overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant text-sm tracking-widest uppercase border-b border-surface-variant">
              <th className="p-5 font-bold">Image</th>
              <th className="p-5 font-bold">Name & Slug</th>
              <th className="p-5 font-bold">Featured</th>
              <th className="p-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations && destinations.length > 0 ? (
              destinations.map((dest: any) => (
                <tr key={dest.id} className="border-b border-surface-container hover:bg-surface-container-low transition-colors group">
                  <td className="p-5 w-24">
                    <img src={dest.image_url || 'https://via.placeholder.com/150'} alt={dest.name} className="w-16 h-16 object-cover rounded-lg" />
                  </td>
                  <td className="p-5">
                    <div className="font-bold text-primary text-lg mb-1">{dest.name}</div>
                    <div className="text-xs text-on-surface-variant font-mono">{dest.slug}</div>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-widest font-bold border ${dest.is_featured ? 'bg-secondary-container/20 text-secondary-fixed border-secondary-container/50' : 'bg-surface-variant text-on-surface-variant border-outline'}`}>
                      {dest.is_featured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <Link href={`/admin/destinations/edit/${dest.id}`} className="inline-flex items-center justify-center p-2 rounded-lg bg-surface-container hover:bg-secondary-container hover:text-primary transition-colors text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-8 text-center text-on-surface-variant italic">
                  No destinations found. Please run the SQL Migration and click "Add Destination".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
