import FaqForm from '@/components/admin/FaqForm';

export default function NewFaqPage() {
  return (
    <div className="p-8">
      <div className="mb-8 border-b border-surface-variant pb-6">
        <h1 className="font-headline-lg text-3xl font-bold text-primary">Add FAQ</h1>
        <p className="text-on-surface-variant mt-2 text-sm">Add a new frequently asked question.</p>
      </div>
      <FaqForm />
    </div>
  );
}
