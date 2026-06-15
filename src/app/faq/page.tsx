import { supabase } from '@/lib/supabase';
import FaqAccordion from '@/components/FaqAccordion';

export const revalidate = 3600;

export default async function FaqPage() {
  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .order('order_index', { ascending: true });

  return (
    <main className="pt-20 bg-surface min-h-screen">
      <div className="bg-primary text-on-primary py-24 text-center">
        <h1 className="font-display-xl text-[50px] md:text-[60px] font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-on-primary-container max-w-2xl mx-auto text-lg">Everything you need to know about booking your luxury journey with us.</p>
      </div>

      <div className="max-w-container-max mx-auto px-margin-desktop py-24">
        <FaqAccordion faqs={faqs || []} />

        <div className="mt-24 text-center bg-surface-container-low p-12 rounded-2xl border border-surface-variant max-w-3xl mx-auto">
          <h2 className="font-headline-md text-2xl font-bold text-primary mb-4">Still have questions?</h2>
          <p className="text-on-surface-variant mb-8">Our luxury travel concierges are available 24/7 to assist you in planning the perfect trip.</p>
          <a href="/contact-us" className="inline-block bg-primary text-on-primary px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all luxury-shadow">
            Contact Us
          </a>
        </div>
      </div>
    </main>
  );
}
