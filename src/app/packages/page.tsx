import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import PlanMyTripButton from '@/components/PlanMyTripButton';
import PackageFilters from '@/components/PackageFilters';

export const revalidate = 0; 

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ dest?: string; category?: string; departure_city?: string }>
}) {
  const params = await searchParams;
  
  // Fetch real destinations from the database
  const { data: destinations } = await supabase.from('destinations').select('*').order('name');
  
  // Fetch packages, optionally filtered by destination
  let query = supabase.from('packages').select('*, destinations!inner(slug)').order('created_at', { ascending: false });
  
  if (params.dest) {
    // Filter by the foreign key relation's slug
    query = query.eq('destinations.slug', params.dest);
  }
  
  if (params.category) {
    query = query.eq('category', params.category);
  }
  
  if (params.departure_city) {
    query = query.eq('departure_city', params.departure_city);
  }

  const { data: packages, error } = await query;
  
  // Find the currently selected destination name for the UI
  const currentDestName = destinations?.find(d => d.slug === params.dest)?.name;

  return (
    <main className="bg-surface min-h-screen">
      <div className="bg-primary text-on-primary pt-32 pb-20 text-center">
        <h1 className="font-display-xl text-[50px] md:text-[60px] font-bold mb-4">Discover Your Next Journey</h1>
        <p className="text-on-primary-container max-w-2xl mx-auto text-lg">Select a destination to explore our curated luxury packages.</p>
      </div>

      <div className="max-w-container-max mx-auto px-margin-desktop py-16">
        
        {/* Destinations Tiles */}
        <div className="mb-16">
          <h2 className="font-headline-md text-[24px] font-bold text-primary mb-6">Explore by Destination</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Link href="/packages" className={`relative rounded-xl overflow-hidden aspect-square luxury-shadow group ${!params.dest ? 'ring-4 ring-secondary-container' : ''}`}>
              <div className="absolute inset-0 bg-primary/60 group-hover:bg-primary/40 transition-all z-10"></div>
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <span className="text-white font-bold text-lg tracking-wider uppercase">All</span>
              </div>
            </Link>
            {destinations && destinations.map((dest: any) => (
              <Link key={dest.id} href={`/packages?dest=${dest.slug}`} className={`relative rounded-xl overflow-hidden aspect-square luxury-shadow group ${params.dest === dest.slug ? 'ring-4 ring-secondary-container' : ''}`}>
                <img src={dest.image_url || 'https://via.placeholder.com/800'} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10"></div>
                <div className="absolute inset-0 z-20 flex items-end justify-center pb-6">
                  <span className="text-white font-bold text-lg text-center px-2">{dest.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="font-headline-md text-[24px] font-bold text-primary mb-4 md:mb-0">
              {currentDestName ? `Packages for ${currentDestName}` : 'All Curated Packages'}
            </h2>
          </div>
          
          <PackageFilters />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages && packages.length > 0 ? packages.map((pkg: any) => (
              <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden luxury-shadow flex flex-col">
                <div className="relative aspect-[4/3]">
                  <img src={pkg.image_url || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80'} className="w-full h-full object-cover" alt={pkg.title} />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                    {pkg.type}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-headline-md text-[22px] font-bold text-primary mb-2 leading-tight">{pkg.title}</h3>
                  <p className="text-on-surface-variant text-sm mb-6 line-clamp-2 flex-grow">{pkg.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-surface-variant mb-6">
                    <div>
                      <span className="text-xs text-on-surface-variant uppercase tracking-widest block">From</span>
                      <span className="font-bold text-xl text-secondary">₹{pkg.price?.toLocaleString()}</span>
                    </div>
                    <Link href={`/packages/${pkg.slug}`} className="text-primary font-bold text-sm hover:text-secondary-container transition-colors">
                      View Details →
                    </Link>
                  </div>

                  {/* Prefilled Plan My Trip button */}
                  <PlanMyTripButton packageId={pkg.id} packageName={pkg.title} className="block w-full text-center bg-primary text-on-primary py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all">
                    Plan This Trip
                  </PlanMyTripButton>
                </div>
              </div>
            )) : (
              <div className="col-span-full py-12 text-center text-on-surface-variant">
                {error?.message ? `Error: ${error.message}` : 'No packages found for this destination. Please try another.'}
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
