import PackageForm from '@/components/admin/PackageForm';
import Link from 'next/link';

export default function NewPackagePage() {
  return (
    <div className="p-8">
      <div className="mb-8 border-b border-surface-variant pb-6">
        <div className="flex items-center gap-4 mb-2">
          <Link href="/admin/packages" className="w-10 h-10 bg-surface-container rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-headline-lg text-3xl font-bold text-primary">Create New Package</h1>
        </div>
        <p className="text-on-surface-variant text-sm ml-14">Build a new luxury itinerary from scratch.</p>
      </div>

      <PackageForm />
    </div>
  );
}
