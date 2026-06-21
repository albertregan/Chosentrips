"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const CATEGORIES = ['Beach', 'Mountains', 'History', 'Nightlife', 'Adventure', 'Pilgrimage'];
const DEPARTURE_CITIES = ['Bangalore', 'Chennai', 'Delhi', 'Mumbai', 'Kolkata'];

export default function PackageFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams?.get('category') || '';
  const currentCity = searchParams?.get('departure_city') || '';

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString() || '');
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 bg-surface-container-low p-6 rounded-2xl border border-surface-variant luxury-shadow">
      <div className="flex-1">
        <label className="block text-label-sm font-label-sm text-on-surface-variant mb-2 uppercase tracking-widest font-bold">
          Filter by Category
        </label>
        <select
          className="w-full border-2 border-surface-variant focus:border-secondary rounded-lg bg-white px-4 py-3 text-primary font-medium focus:outline-none transition-colors"
          value={currentCategory}
          onChange={(e) => router.push('?' + createQueryString('category', e.target.value))}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      <div className="flex-1">
        <label className="block text-label-sm font-label-sm text-on-surface-variant mb-2 uppercase tracking-widest font-bold">
          Weekend Departure City
        </label>
        <select
          className="w-full border-2 border-surface-variant focus:border-secondary rounded-lg bg-white px-4 py-3 text-primary font-medium focus:outline-none transition-colors"
          value={currentCity}
          onChange={(e) => router.push('?' + createQueryString('departure_city', e.target.value))}
        >
          <option value="">All Cities</option>
          {DEPARTURE_CITIES.map(city => (
            <option key={city} value={city}>Ex {city}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
