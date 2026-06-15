import DestinationForm from '@/components/admin/DestinationForm';

export default function NewDestinationPage() {
  return (
    <div className="p-8">
      <div className="mb-8 border-b border-surface-variant pb-6">
        <h1 className="font-headline-lg text-3xl font-bold text-primary">Add Destination</h1>
        <p className="text-on-surface-variant mt-2 text-sm">Create a new travel destination to group your packages.</p>
      </div>
      <DestinationForm />
    </div>
  );
}
