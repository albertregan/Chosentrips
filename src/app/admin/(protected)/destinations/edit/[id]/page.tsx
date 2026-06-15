import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import DestinationForm from '@/components/admin/DestinationForm';

export default async function EditDestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: destination } = await supabase.from('destinations').select('*').eq('id', id).single();

  if (!destination) {
    notFound();
  }

  return (
    <div className="p-8">
      <div className="mb-8 border-b border-surface-variant pb-6">
        <h1 className="font-headline-lg text-3xl font-bold text-primary">Edit Destination</h1>
        <p className="text-on-surface-variant mt-2 text-sm">Update the details for {destination.name}.</p>
      </div>
      <DestinationForm initialData={destination} />
    </div>
  );
}
