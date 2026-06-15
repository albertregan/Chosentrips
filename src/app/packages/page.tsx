import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import PlanMyTripButton from '@/components/PlanMyTripButton';

export const revalidate = 0; 

// Mock destinations since we don't have a destinations table
const DESTINATIONS = [
  { name: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80' },
  { name: 'Swiss Alps', image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80' },
  { name: 'Bali', image: 'https://images.unsplash.com/photo-1542315143-6903525281ac?auto=format&fit=crop&w=800&q=80' },
  { name: 'Dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80' },
  { name: 'Kashmir', image: 'https://images.unsplash.com/photo-1566996694954-90b052c413c4?auto=format&fit=crop&w=800&q=80' }
];

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: { dest?: string }
}) {
  let query = supabase.from('packages').select('*').order('created_at', { ascending: false });
  
  if (searchParams.dest) {
    // Basic text search to filter by destination if it's in the title
    query = query.ilike('title', `%${searchParams.dest}%`);
  }

  const { data: packages } = await query;

  return (
    <main className="pt-20 bg-surface min-h-screen">
      <div className="bg-primary text-on-primary py-24 text-center">
        <h1 className="font-display-xl text-[50px] md:text-[60px] font-bold mb-4">Discover Your Next Journey</h1>
        <p className="text-on-primary-container max-w-2xl mx-auto text-lg">Select a destination to explore our curated luxury packages.</p>
      </div>

      <div className="max-w-container-max mx-auto px-margin-desktop py-16">
        
        {/* Destinations Tiles */}
        <div className="mb-16">
          <h2 className="font-headline-md text-[24px] font-bold text-primary mb-6">Explore by Destination</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Link href="/packages" className={`relative rounded-xl overflow-hidden aspect-square luxury-shadow group ${!searchParams.dest ? 'ring-4 ring-secondary-container' : ''}`}>
              <div className="absolute inset-0 bg-primary/60 group-hover:bg-primary/40 transition-all z-10"></div>
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <span className="text-white font-bold text-lg tracking-wider uppercase">All</span>
              </div>
            </Link>
            {DESTINATIONS.map(dest => (
              <Link key={dest.name} href={`/packages?dest=${dest.name}`} className={`relative rounded-xl overflow-hidden aspect-square luxury-shadow group ${searchParams.dest === dest.name ? 'ring-4 ring-secondary-container' : ''}`}>
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10"></div>
                <div className="absolute inset-0 z-20 flex items-end justify-center pb-6">
                  <span className="text-white font-bold text-lg">{dest.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div>
          <h2 className="font-headline-md text-[24px] font-bold text-primary mb-6">
            {searchParams.dest ? `Packages for ${searchParams.dest}` : 'All Curated Packages'}
          </h2>
          
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
                No packages found for this destination. Please try another.
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
