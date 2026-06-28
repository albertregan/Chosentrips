import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { requireAdmin } from '@/lib/auth';

export const revalidate = 0; // Disable cache for dashboard

export default async function DashboardPage() {
  await requireAdmin();
  // Fetch some stats
  const { count: leadsCount } = await supabaseAdmin.from('leads').select('*', { count: 'exact', head: true });
  const { count: packagesCount } = await supabaseAdmin.from('packages').select('*', { count: 'exact', head: true });

  return (
    <div>
      <div className="admin-header">
        <h1>Dashboard Overview</h1>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        <div className="admin-card">
          <h3 style={{ color: 'var(--text-muted)' }}>Total Leads</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-color)', marginTop: '10px' }}>
            {leadsCount || 0}
          </div>
        </div>
        
        <div className="admin-card">
          <h3 style={{ color: 'var(--text-muted)' }}>Active Packages</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-color)', marginTop: '10px' }}>
            {packagesCount || 0}
          </div>
        </div>
      </div>
    </div>
  );
}
