'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import PlanMyTripButton from './PlanMyTripButton';

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center ${scrolled ? 'bg-surface shadow-[0_16px_24px_rgba(0,31,63,0.12)]' : 'bg-transparent'}`}>
      <div className="flex justify-between items-center w-full px-margin-desktop max-w-container-max mx-auto h-20">
        <Link href="/" className="flex items-center">
          <img 
            alt="Chosen Trips" 
            className={`h-16 w-auto object-contain transition-all duration-300 ${!scrolled ? 'brightness-0 invert' : ''}`} 
            src="/logo.png" 
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link className={`font-body-md text-body-md font-bold transition-all duration-200 hover:border-b-2 ${scrolled ? 'text-primary hover:border-secondary-container' : 'text-white hover:border-white'}`} href="/packages">Destinations</Link>
          <Link className={`font-body-md text-body-md font-medium transition-colors duration-200 ${scrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/90 hover:text-white'}`} href="/about-us">About Us</Link>
          <Link className={`font-body-md text-body-md font-medium transition-colors duration-200 ${scrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/90 hover:text-white'}`} href="/blog">Blog</Link>
          <Link className={`font-body-md text-body-md font-medium transition-colors duration-200 ${scrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/90 hover:text-white'}`} href="/reviews">Reviews</Link>
          <Link className={`font-body-md text-body-md font-medium transition-colors duration-200 ${scrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/90 hover:text-white'}`} href="/faq">FAQ</Link>
          <Link className={`font-body-md text-body-md font-medium transition-colors duration-200 ${scrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/90 hover:text-white'}`} href="/contact-us">Contact</Link>
        </nav>
        <PlanMyTripButton className="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold text-body-md hover:scale-[1.02] active:scale-[0.98] transition-all luxury-shadow">
          Plan My Trip
        </PlanMyTripButton>
      </div>
    </header>
  );
}
