import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function Home() {
  const { data: testimonials } = await supabase.from('testimonials').select('*').eq('is_published', true).order('created_at', { ascending: false });
  const { data: featuredPackages } = await supabase.from('packages').select('*').eq('is_featured', true).limit(3).order('created_at', { ascending: false });
  const { data: weekendPackages } = await supabase.from('packages').select('*').eq('is_weekend_destination', true).limit(3).order('created_at', { ascending: false });

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 hero-gradient z-10"></div>
          <img alt="Santorini Sunset" className="w-full h-full object-cover scale-105" src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2560&q=80" />
        </div>
        <div className="relative z-20 w-full px-margin-desktop max-w-container-max mx-auto text-center md:text-left">
          <h1 className="text-white font-display-xl text-[60px] leading-[72px] font-bold max-w-3xl mb-8 leading-tight">
            Adventure Awaits, <span className="text-secondary-container">Chosen</span> for You
          </h1>
          <p className="text-white text-lg max-w-xl mb-12 opacity-90 leading-relaxed">
            Extraordinary, hand-crafted experiences designed for the discerning traveler.
          </p>
          <Link href="/packages" className="inline-block bg-primary text-on-primary px-10 h-[56px] leading-[56px] rounded-lg font-bold hover:bg-opacity-90 transition-all luxury-shadow">
            Discover Destinations
          </Link>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-24 px-margin-desktop max-w-container-max mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline-lg text-[40px] font-bold text-primary mb-2">Curated Destinations</h2>
            <p className="text-on-surface-variant max-w-xl">Each journey is meticulously planned by our experts to ensure an unparalleled experience of luxury and discovery.</p>
          </div>
          <Link href="/packages" className="text-secondary font-bold flex items-center gap-2 group hidden md:flex">
            See all destinations
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPackages && featuredPackages.length > 0 ? featuredPackages.map((pkg: any) => (
            <div key={pkg.id} className="group luxury-shadow rounded-xl overflow-hidden bg-white transition-soft hover:-translate-y-2">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img alt={pkg.title} className="w-full h-full object-cover transition-soft group-hover:scale-110" src={pkg.image_url || 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80'} />
              </div>
              <div className="p-6">
                <h3 className="font-headline-md text-[24px] font-semibold text-primary mb-1">{pkg.title}</h3>
                <p className="text-on-surface-variant text-body-md mb-4 line-clamp-2">{pkg.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-surface-container">
                  <div>
                    <span className="text-label-sm font-label-sm text-on-surface-variant block uppercase tracking-widest text-xs">Starting at</span>
                    <span className="font-headline-md text-secondary font-bold text-xl">₹{pkg.price?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <Link href={`/packages/${pkg.slug}`} className="border-[1.5px] border-primary text-primary px-4 py-2 rounded-lg font-bold text-body-md hover:bg-primary hover:text-on-primary transition-all">View Package</Link>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-3 text-center py-12 text-on-surface-variant italic">
              No packages available yet.
            </div>
          )}
        </div>
      </section>

      {/* Weekend Packages */}
      <section className="bg-surface-container-low py-24">
        <div className="px-margin-desktop max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-secondary font-bold uppercase tracking-widest text-label-sm mb-4 block">Quick Escapes</span>
              <h2 className="font-headline-lg text-[40px] font-bold text-primary mb-2">Weekend Trips</h2>
              <p className="text-on-surface-variant max-w-xl">Short, rejuvenating getaways carefully designed for the perfect weekend break.</p>
            </div>
            <Link href="/packages" className="text-secondary font-bold flex items-center gap-2 group hidden md:flex">
              Explore more
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {weekendPackages && weekendPackages.length > 0 ? weekendPackages.map((pkg: any) => (
              <div key={pkg.id} className="group luxury-shadow rounded-xl overflow-hidden bg-white transition-soft hover:-translate-y-2">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img alt={pkg.title} className="w-full h-full object-cover transition-soft group-hover:scale-110" src={pkg.image_url || 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80'} />
                  {pkg.departure_city && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                      Ex {pkg.departure_city}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-headline-md text-[24px] font-semibold text-primary mb-1">{pkg.title}</h3>
                  <p className="text-on-surface-variant text-body-md mb-4 line-clamp-2">{pkg.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-surface-container">
                    <div>
                      <span className="text-label-sm font-label-sm text-on-surface-variant block uppercase tracking-widest text-xs">Starting at</span>
                      <span className="font-headline-md text-secondary font-bold text-xl">₹{pkg.price?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <Link href={`/packages/${pkg.slug}`} className="border-[1.5px] border-primary text-primary px-4 py-2 rounded-lg font-bold text-body-md hover:bg-primary hover:text-on-primary transition-all">View Package</Link>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-3 text-center py-12 text-on-surface-variant italic">
                No weekend trips available yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-primary text-on-primary py-24 mb-16">
        <div className="px-margin-desktop max-w-container-max mx-auto text-center">
          <h2 className="font-headline-lg text-[40px] font-bold mb-16">The Chosen Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center mb-6 luxury-shadow">
                <span className="material-symbols-outlined text-primary text-[40px]">workspace_premium</span>
              </div>
              <h3 className="font-headline-md text-[24px] font-semibold mb-3 text-on-primary">Expert Guidance</h3>
              <p className="text-on-primary-container leading-relaxed">Dedicated travel concierges who live and breathe your chosen destinations.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center mb-6 luxury-shadow">
                <span className="material-symbols-outlined text-primary text-[40px]">event_available</span>
              </div>
              <h3 className="font-headline-md text-[24px] font-semibold mb-3 text-on-primary">Seamless Planning</h3>
              <p className="text-on-primary-container leading-relaxed">From first-class flights to private transfers, we handle every micro-detail.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center mb-6 luxury-shadow">
                <span className="material-symbols-outlined text-primary text-[40px]">loyalty</span>
              </div>
              <h3 className="font-headline-md text-[24px] font-semibold mb-3 text-on-primary">Exclusive Deals</h3>
              <p className="text-on-primary-container leading-relaxed">Access to unique experiences and rates unavailable to the general public.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Tailwind) */}
      <section className="py-24 px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold uppercase tracking-widest text-label-sm mb-4 block">Guest Stories</span>
          <h2 className="font-headline-lg text-[40px] font-bold text-primary">Words From Our Travelers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials && testimonials.length > 0 ? testimonials.map((testimonial: any) => (
            <div key={testimonial.id} className="bg-surface-container-low p-8 rounded-2xl luxury-shadow border border-surface-container-highest">
              <span className="material-symbols-outlined text-secondary-container text-4xl mb-4">format_quote</span>
              <p className="text-on-surface-variant text-body-lg italic mb-6 leading-relaxed">
                "{testimonial.review_content}"
              </p>
              <div className="pt-4 border-t border-surface-variant">
                <h4 className="font-bold text-primary">{testimonial.guest_name}</h4>
                <span className="text-on-tertiary-container text-sm">Traveled to {testimonial.destination}</span>
              </div>
            </div>
          )) : null}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="px-margin-desktop max-w-container-max mx-auto mb-24">
        <div className="bg-surface-container rounded-3xl p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
          <div className="z-10 flex-1 text-center md:text-left">
            <span className="text-secondary font-bold uppercase tracking-widest text-label-sm mb-4 block">Newsletter</span>
            <h2 className="font-headline-lg text-[40px] font-bold text-primary mb-6">Receive Curated Travel Inspiration</h2>
            <p className="text-on-surface-variant text-body-lg max-w-md mx-auto md:mx-0">Join 50,000+ luxury travelers who receive our monthly hand-picked destination guides.</p>
          </div>
          <div className="z-10 w-full md:w-auto">
            <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-xl luxury-shadow">
              <input className="flex-1 border-none outline-none focus:ring-0 text-primary font-medium px-4 min-w-[250px]" placeholder="Your email address" type="email" />
              <button className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold whitespace-nowrap hover:bg-opacity-90 transition-all">Subscribe Now</button>
            </div>
          </div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl"></div>
        </div>
      </section>
    </main>
  );
}
