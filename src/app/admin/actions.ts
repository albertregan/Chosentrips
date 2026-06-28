'use server';

import { cookies } from 'next/headers';
import crypto from 'crypto';
import { ADMIN_COOKIE, SESSION_MAX_AGE_MS, createSessionToken } from '@/lib/auth';

export async function loginAdmin(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { success: false, message: 'Admin password not configured on Vercel. Please add ADMIN_PASSWORD to your Environment Variables and redeploy.' };
  }

  // Constant-time comparison to avoid timing attacks on the password.
  const provided = Buffer.from(password);
  const expected = Buffer.from(adminPassword);
  const passwordMatches =
    provided.length === expected.length &&
    crypto.timingSafeEqual(provided, expected);

  if (passwordMatches) {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE, createSessionToken(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_MAX_AGE_MS / 1000,
      path: '/',
    });
    return { success: true };
  } else {
    return { success: false, message: 'Invalid password' };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}
