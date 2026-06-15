import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin_session')?.value === 'authenticated';

  if (!isAdmin) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-surface font-body-md text-on-surface">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-on-primary flex flex-col shadow-2xl z-20">
          <div className="p-6 border-b border-primary-container">
            <h2 className="font-headline-md font-bold text-xl tracking-wide">Chosen Trips</h2>
            <p className="text-xs text-secondary mt-1 uppercase tracking-widest">Admin Dashboard</p>
          </div>
          <nav className="flex-1 py-6 flex flex-col gap-2">
            <Link href="/admin/dashboard" className="px-6 py-3 text-on-primary-container hover:bg-primary-container hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Dashboard</Link>
            <Link href="/admin/leads" className="px-6 py-3 text-on-primary-container hover:bg-primary-container hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Leads CRM</Link>
            <Link href="/admin/packages" className="px-6 py-3 text-secondary hover:bg-primary-container transition-colors text-sm font-bold uppercase tracking-widest border-r-4 border-secondary">Packages CMS</Link>
            <Link href="/admin/pages" className="px-6 py-3 text-on-primary-container hover:bg-primary-container hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Pages CMS</Link>
            <Link href="/admin/testimonials" className="px-6 py-3 text-on-primary-container hover:bg-primary-container hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Testimonials</Link>
          </nav>
          <div className="p-6 border-t border-primary-container">
            <Link href="/" className="flex items-center gap-2 text-on-primary-container hover:text-white transition-colors text-sm font-bold">
              <span className="material-symbols-outlined text-[20px]">web</span>
              View Live Site
            </Link>
          </div>
        </aside>
      
      <main className="flex-1 h-screen overflow-y-auto bg-surface-container-lowest">
        {children}
      </main>
    </div>
  );
}
