import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chosen Trips | Luxury Travel Experiences",
  description: "Curated, ultra-premium domestic and international travel experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: '40px 0',
          color: 'var(--text-light)',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)'
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/">
              <img src="/logo.png" alt="Chosen Trips Logo" style={{ height: '40px', width: 'auto' }} />
            </Link>
            <nav style={{ display: 'flex', gap: '40px', alignItems: 'center', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              <Link href="/packages" className="nav-link">Destinations</Link>
              <Link href="/contact-us" className="nav-link">Enquire</Link>
              <Link href="/admin" style={{ opacity: 0.5 }}>Admin</Link>
            </nav>
          </div>
        </header>

        {children}

        <footer style={{ 
          backgroundColor: 'var(--bg-dark)', 
          color: 'white', 
          padding: '100px 0 40px',
        }}>
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '30px', marginBottom: '80px' }}>
              <img src="/logo.png" alt="Chosen Trips Logo" style={{ height: '60px', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.8 }} />
              <p style={{ color: 'var(--text-muted)', maxWidth: '400px', fontSize: '0.9rem' }}>
                Curating the world's most extraordinary travel experiences for the discerning explorer.
              </p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <div>&copy; {new Date().getFullYear()} CHOSEN TRIPS. ALL RIGHTS RESERVED.</div>
              <div style={{ display: 'flex', gap: '20px' }}>
                <Link href="/terms-and-conditions">Terms</Link>
                <Link href="/privacy-policy">Privacy</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
