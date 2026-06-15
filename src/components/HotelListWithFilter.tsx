'use client';

import { useState } from 'react';

export default function HotelListWithFilter({ hotels }: { hotels: any[] }) {
  const [starFilter, setStarFilter] = useState<number | 'all'>('all');

  const filteredHotels = starFilter === 'all' 
    ? hotels 
    : hotels.filter(h => h.star_rating === starFilter);

  // Get available star ratings from the hotels to populate the dropdown intelligently
  const availableStars = Array.from(new Set(hotels.map(h => h.star_rating))).sort((a, b) => b - a);

  if (hotels.length === 0) return null;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <h2 className="font-headline-lg text-[40px] font-bold text-primary">Accommodations</h2>
        
        <div className="flex items-center gap-3 bg-surface-container px-4 py-2 rounded-lg border border-surface-variant">
          <span className="material-symbols-outlined text-secondary">filter_list</span>
          <select 
            className="bg-transparent border-none font-bold text-primary focus:outline-none focus:ring-0 cursor-pointer"
            value={starFilter}
            onChange={(e) => setStarFilter(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
          >
            <option value="all">All Hotel Options</option>
            {availableStars.map(star => (
              <option key={star} value={star}>{star}-Star Hotels</option>
            ))}
          </select>
        </div>
      </div>

      {filteredHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel: any) => (
            <div key={hotel.id} className="bg-white p-6 rounded-xl luxury-shadow border border-surface-variant flex flex-col group hover:-translate-y-1 transition-transform">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-headline-md text-xl font-bold text-primary group-hover:text-secondary transition-colors">{hotel.name}</h3>
                <div className="flex text-secondary text-sm drop-shadow-sm">
                  {'★'.repeat(hotel.star_rating)}{'☆'.repeat(5 - hotel.star_rating)}
                </div>
              </div>
              <p className="text-on-surface-variant text-sm flex-grow leading-relaxed">{hotel.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-on-surface-variant border border-surface-variant rounded-xl bg-surface-container-low italic">
          No accommodations available for this star rating.
        </div>
      )}
    </div>
  );
}
