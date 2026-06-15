import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function LeadsPage() {
  const { data: leads } = await supabase
    .from('leads')
    .select('*, packages(title)')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="admin-header">
        <h1>Leads CRM</h1>
      </div>
      
      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Package</th>
              <th>Status</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {leads && leads.length > 0 ? (
              leads.map((lead: any) => (
                <tr key={lead.id}>
                  <td>{new Date(lead.created_at).toLocaleDateString()}</td>
                  <td style={{ fontWeight: 500 }}>{lead.name}</td>
                  <td>
                    <div>{lead.email}</div>
                    <div style={{ fontSize: '0.85em', color: 'var(--text-muted)' }}>{lead.phone}</div>
                  </td>
                  <td>{lead.packages?.title || 'General Enquiry'}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      fontSize: '0.85em',
                      backgroundColor: lead.status === 'new' ? '#E6F0FA' : '#E5E7EB',
                      color: lead.status === 'new' ? 'var(--primary-color)' : 'var(--text-muted)'
                    }}>
                      {lead.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {lead.message}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center" style={{ padding: '24px' }}>
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
