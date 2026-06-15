import Link from 'next/link';
import './admin.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>Chosen Trips Admin</h2>
        </div>
        <nav className="admin-nav">
          <Link href="/admin/dashboard" className="admin-nav-link">Dashboard</Link>
          <Link href="/admin/leads" className="admin-nav-link">Leads CRM</Link>
          <Link href="/admin/packages" className="admin-nav-link">Packages CMS</Link>
          <Link href="/admin/pages" className="admin-nav-link">Pages CMS</Link>
          <Link href="/admin/testimonials" className="admin-nav-link">Testimonials CMS</Link>
          <Link href="/" className="admin-nav-link" style={{ marginTop: 'auto', borderTop: '1px solid #333', paddingTop: '20px' }}>Back to Website</Link>
        </nav>
      </aside>
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
