'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// Tables the admin CMS is allowed to mutate through these actions.
const ALLOWED_TABLES = [
  'packages',
  'blogs',
  'destinations',
  'faqs',
  'pages',
  'itineraries',
  'hotels',
  'testimonials',
] as const;

type AllowedTable = (typeof ALLOWED_TABLES)[number];

function assertTable(table: string): asserts table is AllowedTable {
  if (!ALLOWED_TABLES.includes(table as AllowedTable)) {
    throw new Error(`Table "${table}" is not writable via the CMS`);
  }
}

export type ActionResult = { id?: string; error?: string };

export async function createRecord(
  table: string,
  values: Record<string, unknown>
): Promise<ActionResult> {
  await requireAdmin();
  assertTable(table);

  const { data, error } = await supabaseAdmin
    .from(table)
    .insert([values])
    .select('id')
    .single();

  if (error) return { error: error.message };
  revalidatePath('/');
  revalidatePath(`/admin/${table}`);
  return { id: data?.id as string | undefined };
}

export async function updateRecord(
  table: string,
  id: string,
  values: Record<string, unknown>
): Promise<ActionResult> {
  await requireAdmin();
  assertTable(table);

  const { error } = await supabaseAdmin.from(table).update(values).eq('id', id);

  if (error) return { error: error.message };
  revalidatePath('/');
  revalidatePath(`/admin/${table}`);
  return { id };
}

export async function deleteRecord(table: string, id: string): Promise<ActionResult> {
  await requireAdmin();
  assertTable(table);

  const { error } = await supabaseAdmin.from(table).delete().eq('id', id);

  if (error) return { error: error.message };
  revalidatePath('/');
  revalidatePath(`/admin/${table}`);
  return { id };
}
