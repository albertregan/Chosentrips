export const revalidate = 0;

export default function AboutUsPage() {
  return (
    <main className="bg-surface min-h-screen">
      {/* Cinematic Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-10"></div>
          <img alt="Our Philosophy" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2560&q=80" />
        </div>
        
        <div className="relative z-20 container max-w-container-max mx-auto px-margin-desktop text-center text-white mt-20">
          <h1 className="font-display-xl text-[50px] md:text-[60px] font-bold mb-4 drop-shadow-2xl">Our Philosophy</h1>
          <p className="text-xl italic opacity-90">
            The art of the extraordinary.
          </p>
        </div>
      </section>

      {/* Philosophy Content */}
      <section className="max-w-[800px] mx-auto px-margin-desktop py-24 text-center">
        <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">The Chosen Way</span>
        <h2 className="font-headline-lg text-[32px] md:text-[40px] font-bold text-primary leading-tight mb-10">
          Travel is not simply about reaching a destination. It is about how the journey transforms you.
        </h2>
        
        <p className="text-on-surface-variant text-lg leading-relaxed mb-8 text-left">
          At Chosen Trips, we believe that true luxury lies in the unseen details. It is the seamless transition between a private jet and a secluded villa. It is the local guide whose family has lived in the village for generations. It is the peace of mind knowing that every second of your journey has been meticulously crafted to your exact preferences.
        </p>
        <p className="text-on-surface-variant text-lg leading-relaxed mb-16 text-left">
          We do not sell pre-packaged tours. We curate singular, transformative experiences for the world’s most discerning travelers. From the snowy peaks of the Swiss Alps to the spiritual heart of Bali, we hold the keys to the extraordinary.
        </p>

        <div className="border-t border-surface-variant pt-16 text-left">
          <h3 className="font-headline-md text-[28px] font-bold text-primary mb-6">Meet Our Founder</h3>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
            Founded by Albert Regan, a lifelong explorer with an uncompromising eye for elegance, Chosen Trips was born from a desire to elevate the travel experience beyond the ordinary. Albert spent over two decades traversing the globe, cultivating exclusive relationships with boutique hoteliers, private aviators, and elite local concierges.
          </p>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            "My vision was simple," Albert explains. "To remove the friction of travel and leave only the magic. We design each itinerary as if we were planning it for ourselves—with obsession, care, and a relentless pursuit of perfection."
          </p>
        </div>
      </section>

      {/* Cinematic Quote */}
      <section className="bg-surface-container py-24 px-6 text-center">
        <h2 className="font-headline-md text-[32px] max-w-[800px] mx-auto text-primary italic font-medium leading-relaxed">
          "The world is a book, and those who do not travel read only a page."
        </h2>
      </section>
    </main>
  );
}
