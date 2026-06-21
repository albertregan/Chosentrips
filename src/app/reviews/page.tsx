import { supabase } from '@/lib/supabase';
import ReviewForm from '@/components/ReviewForm';

export const revalidate = 0;

export default async function ReviewsPage() {
  const { data: testimonials } = await supabase.from('testimonials').select('*').eq('is_published', true).order('created_at', { ascending: false });

  return (
    <main className="bg-surface min-h-screen">
      <div className="bg-primary text-on-primary pt-32 pb-20 text-center">
        <h1 className="font-display-xl text-[50px] md:text-[60px] font-bold mb-4">Guest Reviews</h1>
        <p className="text-on-primary-container max-w-2xl mx-auto text-lg">Real stories from our luxury travelers.</p>
      </div>

      <div className="max-w-container-max mx-auto px-margin-desktop py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        <div className="lg:col-span-2 space-y-8">
          <h2 className="font-headline-md text-[32px] font-bold text-primary mb-8">What our guests say</h2>
          
          {testimonials && testimonials.length > 0 ? testimonials.map((testimonial: any) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-2xl luxury-shadow border border-surface-variant flex flex-col relative overflow-hidden">
              <span className="material-symbols-outlined text-secondary-container/30 text-[120px] absolute -top-8 -right-4 z-0">format_quote</span>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-primary text-xl">{testimonial.guest_name}</h4>
                    <span className="text-on-surface-variant text-sm tracking-widest uppercase">Traveled to {testimonial.destination}</span>
                  </div>
                  <div className="text-secondary text-lg tracking-widest">
                    {'★'.repeat(testimonial.rating || 5)}{'☆'.repeat(5 - (testimonial.rating || 5))}
                  </div>
                </div>
                <p className="text-on-surface-variant text-body-lg italic leading-relaxed">
                  "{testimonial.review_content}"
                </p>
              </div>
            </div>
          )) : (
            <div className="text-on-surface-variant italic py-8 text-center bg-surface-container rounded-2xl">
              No reviews available yet.
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-28">
            <ReviewForm />
          </div>
        </div>

      </div>
    </main>
  );
}
