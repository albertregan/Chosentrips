import PackageForm from '@/components/admin/PackageForm';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ItineraryManager from '@/components/admin/ItineraryManager';
import HotelManager from '@/components/admin/HotelManager';

export const revalidate = 0;

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: pkg } = await supabase.from('packages').select('*').eq('id', id).single();

  if (!pkg) {
    notFound();
  }

  return (
    <div className="p-8">
      <div className="mb-8 border-b border-surface-variant pb-6">
        <div className="flex items-center gap-4 mb-2">
          <Link href="/admin/packages" className="w-10 h-10 bg-surface-container rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-headline-lg text-3xl font-bold text-primary">Edit Package</h1>
        </div>
        <p className="text-on-surface-variant text-sm ml-14">Update details for "{pkg.title}".</p>
      </div>

      <PackageForm initialData={pkg} />
      
      <div className="mt-12 space-y-12 max-w-4xl mx-auto">
        <ItineraryManager packageId={pkg.id} />
        <HotelManager packageId={pkg.id} />
      </div>
    </div>
  );
}
