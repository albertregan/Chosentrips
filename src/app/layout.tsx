import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chosen Trips | Premium Travel Packages",
  description: "Discover top domestic and international travel destinations with Chosen Trips.",
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
          backgroundColor: 'var(--primary-color)', 
          color: 'var(--text-light)',
          padding: '20px 0'
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/">
              <h1 style={{ margin: 0, color: 'var(--secondary-color)', fontSize: '2rem' }}>
                Chosen Trips
              </h1>
            </Link>
            <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/packages" className="nav-link">Packages</Link>
              <Link href="/contact-us" className="nav-link">Contact Us</Link>
              <Link href="/admin" className="btn btn-secondary">Admin Login</Link>
            </nav>
          </div>
        </header>

        {children}

        <footer style={{ 
          backgroundColor: 'var(--primary-color)', 
          color: 'var(--text-light)', 
          padding: '60px 0 20px',
          marginTop: '60px'
        }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
              <div>
                <h3 style={{ color: 'var(--secondary-color)' }}>Chosen Trips</h3>
                <p style={{ color: 'var(--text-muted)' }}>Curating the best travel experiences across the globe.</p>
              </div>
              <div>
                <h4 style={{ color: 'white' }}>Quick Links</h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li><Link href="/packages">All Packages</Link></li>
                  <li><Link href="/contact-us">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h4 style={{ color: 'white' }}>Legal</h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
                  <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link href="/refund-policy">Refund Policy</Link></li>
                </ul>
              </div>
            </div>
            <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', fontSize: '0.9em' }}>
              &copy; {new Date().getFullYear()} Chosen Trips. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
