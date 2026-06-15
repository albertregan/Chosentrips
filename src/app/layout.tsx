import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { ModalProvider } from '@/components/ModalProvider';
import PlanMyTripButton from '@/components/PlanMyTripButton';

import TopNav from '@/components/TopNav';

export const metadata: Metadata = {
  title: 'Chosen Trips | Aspirational Luxury Travel',
  description: 'Curating the world\'s most extraordinary travel experiences for the discerning explorer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface text-on-surface font-body-md overflow-x-hidden">
        <ModalProvider>
        <TopNav />

        {children}

        {/* Footer */}
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
        </ModalProvider>
      </body>
    </html>
  );
}
