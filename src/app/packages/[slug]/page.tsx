import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PlanMyTripButton from '@/components/PlanMyTripButton';

export const revalidate = 0; 

export default async function PackageDetailsPage({ params }: { params: { slug: string } }) {
  const { data: pkg } = await supabase.from('packages').select('*').eq('slug', params.slug).single();
  
  if (!pkg) {
    notFound();
  }

  const { data: itineraries } = await supabase.from('itineraries').select('*').eq('package_id', pkg.id).order('day_number', { ascending: true });
  const { data: hotels } = await supabase.from('hotels').select('*').eq('package_id', pkg.id);

  return (
    <main className="bg-surface min-h-screen">
      {/* Massive Hero */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 z-10"></div>
          <img alt={pkg.title} className="w-full h-full object-cover" src={pkg.image_url || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2560&q=80'} />
        </div>
        
        <div className="relative z-20 container max-w-container-max mx-auto px-margin-desktop text-center text-white mt-20">
          <span className="text-secondary-fixed tracking-[3px] uppercase text-sm block mb-4 font-bold">
            {pkg.type} Experience
          </span>
          <h1 className="font-display-xl text-[60px] leading-[72px] font-bold mb-6 drop-shadow-2xl">
            {pkg.title}
          </h1>
          <p className="text-xl italic opacity-90">
            From ₹{pkg.price?.toLocaleString()}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-container-max mx-auto px-margin-desktop py-24">
        
        {/* Header Action Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 pb-8 border-b border-surface-variant gap-6">
          <div>
            <h2 className="font-headline-lg text-[40px] font-bold text-primary">The Journey</h2>
            <p className="text-on-surface-variant max-w-3xl mt-4 text-lg leading-relaxed">{pkg.description}</p>
          </div>
          <PlanMyTripButton packageId={pkg.id} packageName={pkg.title} className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold hover:scale-[1.02] transition-transform luxury-shadow whitespace-nowrap">
            Plan This Trip
          </PlanMyTripButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-surface-container-low p-8 rounded-2xl border border-surface-variant">
            <h3 className="font-headline-md text-[24px] font-bold text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">check_circle</span>
              Inclusions
            </h3>
            <ul className="space-y-3 text-on-surface-variant">
              {pkg.inclusions?.split('\n').map((inc: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-secondary mt-1">•</span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface-container-low p-8 rounded-2xl border border-surface-variant">
            <h3 className="font-headline-md text-[24px] font-bold text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-error">cancel</span>
              Exclusions
            </h3>
            <ul className="space-y-3 text-on-surface-variant">
              {pkg.exclusions?.split('\n').map((exc: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-error mt-1">•</span>
                  <span>{exc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Itinerary */}
        <div className="mb-20">
          <h2 className="font-headline-lg text-[40px] font-bold text-primary mb-12">Itinerary</h2>
          <div className="relative border-l-2 border-surface-variant ml-4 md:ml-6 space-y-12 pb-8">
            {itineraries?.map((itinerary: any) => (
              <div key={itinerary.id} className="relative pl-10 md:pl-16">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-secondary ring-4 ring-surface"></div>
                <h4 className="text-secondary font-bold uppercase tracking-widest text-sm mb-2">Day {itinerary.day_number}</h4>
                <h3 className="font-headline-md text-[24px] font-bold text-primary mb-3">{itinerary.title}</h3>
                <p className="text-on-surface-variant leading-relaxed max-w-4xl">{itinerary.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Accommodations */}
        {hotels && hotels.length > 0 && (
          <div>
            <h2 className="font-headline-lg text-[40px] font-bold text-primary mb-10">Accommodations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel: any) => (
                <div key={hotel.id} className="bg-white p-6 rounded-xl luxury-shadow border border-surface-variant flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-headline-md text-xl font-bold text-primary">{hotel.name}</h3>
                    <div className="flex text-secondary text-sm">
                      {'★'.repeat(hotel.star_rating)}{'☆'.repeat(5 - hotel.star_rating)}
                    </div>
                  </div>
                  <p className="text-on-surface-variant text-sm flex-grow">{hotel.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
      </section>
    </main>
  );
}
