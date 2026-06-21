import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 0;

type AdminPackage = {
  id: string;
  title: string;
  slug: string;
  image_url: string | null;
  is_featured: boolean | null;
  price: number | null;
  destinations: {
    name: string;
  } | null;
};

export default async function PackagesPage() {
  const { data: packages } = await supabase
    .from('packages')
    .select('*, destinations(name)')
    .order('created_at', { ascending: false });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8 border-b border-surface-variant pb-6">
        <div>
          <h1 className="font-headline-lg text-3xl font-bold text-primary">Packages CMS</h1>
          <p className="text-on-surface-variant mt-2 text-sm">Manage all your luxury travel itineraries.</p>
        </div>
        <Link href="/admin/packages/new" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all luxury-shadow flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Package
        </Link>
      </div>
      
      <div className="bg-white rounded-2xl luxury-shadow border border-surface-variant overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant text-sm tracking-widest uppercase border-b border-surface-variant">
              <th className="p-5 font-bold">Image</th>
              <th className="p-5 font-bold">Title & Slug</th>
              <th className="p-5 font-bold">Destination</th>
              <th className="p-5 font-bold">Featured</th>
              <th className="p-5 font-bold">Price</th>
              <th className="p-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages && packages.length > 0 ? (
              (packages as AdminPackage[]).map((pkg) => (
                <tr key={pkg.id} className="border-b border-surface-container hover:bg-surface-container-low transition-colors group">
                  <td className="p-5 w-24">
                    <img src={pkg.image_url || 'https://via.placeholder.com/150'} alt={pkg.title} className="w-16 h-16 object-cover rounded-lg" />
                  </td>
                  <td className="p-5">
                    <div className="font-bold text-primary text-lg mb-1">{pkg.title}</div>
                    <div className="text-xs text-on-surface-variant font-mono">{pkg.slug}</div>
                  </td>
                  <td className="p-5">
                    <span className="bg-secondary-container/20 text-secondary-fixed font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest border border-secondary-container/50">
                      {pkg.destinations?.name || 'Unassigned'}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-widest font-bold border ${pkg.is_featured ? 'bg-secondary-container/20 text-secondary-fixed border-secondary-container/50' : 'bg-surface-variant text-on-surface-variant border-outline'}`}>
                      {pkg.is_featured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="p-5 font-bold text-primary">₹{pkg.price?.toLocaleString() || 'N/A'}</td>
                  <td className="p-5 text-right">
                    <Link href={`/admin/packages/edit/${pkg.id}`} className="inline-flex items-center justify-center p-2 rounded-lg bg-surface-container hover:bg-secondary-container hover:text-primary transition-colors text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-on-surface-variant italic">
                  No packages found. Click &quot;Add Package&quot; to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
