import EnquiryForm from '@/components/EnquiryForm';

export const revalidate = 0;

export default async function ContactUsPage({
  searchParams,
}: {
  searchParams: Promise<{ packageId?: string, packageName?: string }>
}) {
  const params = await searchParams;
  return (
    <main className="bg-surface min-h-screen">
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 z-10"></div>
          <img alt="Plan your trip" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1542314831-c6a4d1421008?auto=format&fit=crop&w=2560&q=80" />
        </div>
        
        <div className="relative z-20 container max-w-container-max mx-auto px-margin-desktop text-center text-white mt-20">
          <h1 className="font-display-xl text-[50px] md:text-[60px] font-bold mb-4 drop-shadow-2xl">Plan Your Trip</h1>
          <p className="text-xl italic opacity-90">Let us curate your next masterpiece.</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-container-max mx-auto px-margin-desktop py-24 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Left Col: Info */}
        <div className="pr-0 md:pr-10">
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">Get in Touch</span>
          <h2 className="font-headline-lg text-[40px] font-bold text-primary leading-tight mb-6">Begin the extraordinary.</h2>
          
          <p className="text-on-surface-variant text-lg leading-relaxed mb-12">
            Whether you have a specific destination in mind or you are seeking inspiration, our team of expert travel curators is at your disposal. Fill out the comprehensive planner, and we will begin designing an itinerary tailored exclusively to you.
          </p>

          <div className="mb-10">
            <h4 className="font-bold text-primary uppercase tracking-widest text-sm mb-2">Email Us</h4>
            <a href="mailto:concierge@chosentrips.com" className="text-xl text-on-surface hover:text-secondary transition-colors border-b border-surface-variant pb-1">concierge@chosentrips.com</a>
          </div>

          <div className="mb-10">
            <h4 className="font-bold text-primary uppercase tracking-widest text-sm mb-2">Call Us</h4>
            <p className="text-xl text-on-surface mb-1">+1 (800) 123-CHOSEN</p>
            <p className="text-on-surface-variant text-sm">Available 24/7 for our elite members.</p>
          </div>

          <div>
            <h4 className="font-bold text-primary uppercase tracking-widest text-sm mb-2">Global Headquarters</h4>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              150 Luxury Avenue, Suite 400<br />
              New York, NY 10019
            </p>
          </div>
        </div>

        {/* Right Col: Enquiry Form */}
        <div>
          <div className="md:-mt-48 relative z-30">
            <EnquiryForm packageId={params.packageId} packageName={params.packageName} />
          </div>
        </div>
        
      </section>
    </main>
  );
}
