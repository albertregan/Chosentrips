import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 0;

export default async function FaqsPage() {
  const { data: faqs, error } = await supabase
    .from('faqs')
    .select('*')
    .order('order_index', { ascending: true });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8 border-b border-surface-variant pb-6">
        <div>
          <h1 className="font-headline-lg text-3xl font-bold text-primary">FAQ CMS</h1>
          <p className="text-on-surface-variant mt-2 text-sm">Manage frequently asked questions.</p>
        </div>
        <Link href="/admin/faqs/new" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all luxury-shadow flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add FAQ
        </Link>
      </div>
      
      {error && (
        <div className="bg-error-container text-on-error-container p-4 rounded-lg text-sm mb-6">
          Failed to load FAQs. Did you run the SQL Migration?
        </div>
      )}

      <div className="bg-white rounded-2xl luxury-shadow border border-surface-variant overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant text-sm tracking-widest uppercase border-b border-surface-variant">
              <th className="p-5 font-bold">Order</th>
              <th className="p-5 font-bold">Question & Answer</th>
              <th className="p-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs && faqs.length > 0 ? (
              faqs.map((faq: any) => (
                <tr key={faq.id} className="border-b border-surface-container hover:bg-surface-container-low transition-colors group">
                  <td className="p-5 w-24 text-center font-bold text-primary">
                    {faq.order_index}
                  </td>
                  <td className="p-5">
                    <div className="font-bold text-primary text-lg mb-1">{faq.question}</div>
                    <div className="text-sm text-on-surface-variant line-clamp-1">{faq.answer}</div>
                  </td>
                  <td className="p-5 text-right">
                    <Link href={`/admin/faqs/edit/${faq.id}`} className="inline-flex items-center justify-center p-2 rounded-lg bg-surface-container hover:bg-secondary-container hover:text-primary transition-colors text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-8 text-center text-on-surface-variant italic">
                  No FAQs found. Please run the SQL Migration and click "Add FAQ".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
