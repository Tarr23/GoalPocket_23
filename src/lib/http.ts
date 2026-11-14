import 'server-only';
import { NextResponse } from 'next/server';
import { getUserId } from './session';

export const json = (data: unknown, status = 200) => NextResponse.json(data, { status });
export const fail = (message: string, status = 400) => NextResponse.json({ error: message }, { status });

/** Returns the signed-in user id, or null (the route should answer 401). */
export async function requireUser(): Promise<string | null> {
  return getUserId();
}

/** Same-origin check for state-changing requests (simple CSRF protection). */
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true; // non-browser clients
  try { return new URL(origin).host === req.headers.get('host'); } catch { return false; }
}
