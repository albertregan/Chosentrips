import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function LeadsPage() {
  const { data: leads } = await supabase
    .from('leads')
    .select('*, packages(title)')
    .order('created_at', { ascending: false });

  return (
    <div className="p-8">
      <div className="mb-8 border-b border-surface-variant pb-6">
        <h1 className="font-headline-lg text-3xl font-bold text-primary">Leads CRM</h1>
        <p className="text-on-surface-variant mt-2 text-sm">View and manage customer enquiries and booking requests.</p>
      </div>
      
      <div className="bg-white rounded-2xl luxury-shadow border border-surface-variant overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant text-sm tracking-widest uppercase border-b border-surface-variant">
              <th className="p-5 font-bold">Date</th>
              <th className="p-5 font-bold">Contact Info</th>
              <th className="p-5 font-bold">Package / Destination</th>
              <th className="p-5 font-bold">Budget & Pax</th>
              <th className="p-5 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads && leads.length > 0 ? (
              leads.map((lead: any) => (
                <tr key={lead.id} className="border-b border-surface-container hover:bg-surface-container-low transition-colors group">
                  <td className="p-5 text-on-surface-variant text-sm whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleDateString()}<br/>
                    <span className="text-xs text-outline">{new Date(lead.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </td>
                  <td className="p-5">
                    <div className="font-bold text-primary text-md mb-1">{lead.name}</div>
                    <div className="text-sm text-on-surface-variant">{lead.email}</div>
                    <div className="text-sm font-mono text-outline">{lead.phone}</div>
                  </td>
                  <td className="p-5">
                    <div className="font-bold text-primary text-sm mb-1">{lead.packages?.title || 'Custom Destination'}</div>
                    <div className="text-xs text-on-surface-variant">{lead.destination || 'N/A'}</div>
                  </td>
                  <td className="p-5">
                    <div className="text-sm text-primary font-bold mb-1">
                      {lead.budget ? `₹${lead.budget.toLocaleString()} (${lead.budget_type})` : 'Budget not specified'}
                    </div>
                    <div className="text-xs text-on-surface-variant">
                      {lead.no_of_adults} Adults {lead.no_of_children > 0 && `, ${lead.no_of_children} Children`} {lead.no_of_nights && `| ${lead.no_of_nights} Nights`}
                    </div>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-widest font-bold border ${lead.status === 'new' ? 'bg-secondary-container/20 text-secondary-fixed border-secondary-container/50' : 'bg-surface-variant text-on-surface-variant border-outline'}`}>
                      {lead.status || 'NEW'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-on-surface-variant italic">
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
