import 'server-only';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export const ADMIN_COOKIE = 'admin_session';
export const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // 1 week

function getSecret(): string {
  // Prefer a dedicated secret; fall back to ADMIN_PASSWORD so existing
  // deployments keep working until ADMIN_SESSION_SECRET is configured.
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET (or ADMIN_PASSWORD) is not configured');
  }
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('hex');
}

/** Create a tamper-proof session token of the form `<expiry>.<hmac>`. */
export function createSessionToken(maxAgeMs: number = SESSION_MAX_AGE_MS): string {
  const payload = String(Date.now() + maxAgeMs);
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token?: string | null): boolean {
  if (!token) return false;
  const idx = token.lastIndexOf('.');
  if (idx < 0) return false;

  const payload = token.slice(0, idx);
  const signature = token.slice(idx + 1);
  const expected = sign(payload);

  if (signature.length !== expected.length) return false;
  try {
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
      return false;
    }
  } catch {
    return false;
  }

  const expiry = Number(payload);
  return Number.isFinite(expiry) && expiry > Date.now();
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyToken(cookieStore.get(ADMIN_COOKIE)?.value);
}

/** Throws if the current request is not an authenticated admin. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAuthenticated())) {
    throw new Error('Unauthorized');
  }
}
