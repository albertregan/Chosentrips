import 'server-only';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !serviceRoleKey) {
  console.warn('Missing Supabase admin environment variables (SUPABASE_SERVICE_ROLE_KEY)');
}

/**
 * Server-only Supabase client using the service-role key. It bypasses RLS, so
 * it must NEVER be imported into client components. All callers must gate access
 * with requireAdmin() first.
 */
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
