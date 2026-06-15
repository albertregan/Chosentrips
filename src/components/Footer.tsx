'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-primary text-on-primary py-12 px-margin-desktop flex flex-col md:flex-row justify-between mt-auto">
      <div className="max-w-container-max mx-auto w-full flex flex-col md:flex-row justify-between">
        <div className="mb-8 md:mb-0">
          <div className="flex items-center mb-6">
            <img alt="Chosen Trips" className="h-12 w-auto object-contain brightness-0 invert" src="/logo.png" />
          </div>
          <p className="text-on-primary-container max-w-xs mb-6">Crafting unforgettable luxury experiences for the modern explorer.</p>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full border border-on-primary-container flex items-center justify-center hover:bg-secondary-container hover:text-primary transition-all" href="#">
              <span className="material-symbols-outlined text-[20px]">public</span>
            </a>
            <a className="w-10 h-10 rounded-full border border-on-primary-container flex items-center justify-center hover:bg-secondary-container hover:text-primary transition-all" href="#">
              <span className="material-symbols-outlined text-[20px]">chat</span>
            </a>
            <a className="w-10 h-10 rounded-full border border-on-primary-container flex items-center justify-center hover:bg-secondary-container hover:text-primary transition-all" href="#">
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-4">
            <span className="font-bold text-secondary-fixed">Company</span>
            <Link className="text-on-primary-container hover:text-secondary-container transition-colors" href="/about-us">About Us</Link>
            <Link className="text-on-primary-container hover:text-secondary-container transition-colors" href="/packages">Destinations</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-bold text-secondary-fixed">Support</span>
            <Link className="text-on-primary-container hover:text-secondary-container transition-colors" href="/contact-us">Contact</Link>
            <Link className="text-on-primary-container hover:text-secondary-container transition-colors" href="/admin">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
