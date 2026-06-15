import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { ModalProvider } from '@/components/ModalProvider';
import PlanMyTripButton from '@/components/PlanMyTripButton';

import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';

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

        <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
