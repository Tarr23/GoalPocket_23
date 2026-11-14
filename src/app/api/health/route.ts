import { sql } from '@/lib/db';
import { json } from '@/lib/http';

export const dynamic = 'force-dynamic';

/** Quick check that the app can reach its database. Shows no user data. */
export async function GET() {
  try {
    const [r] = await sql`select count(*)::int as n from categories`;
    return json({ ok: true, database: 'connected', categories: r.n, ai: process.env.ANTHROPIC_API_KEY ? 'connected' : 'demo mode' });
  } catch (e) {
    console.error('health check failed', e instanceof Error ? e.message : e);
    return json({ ok: false, database: 'not connected' }, 503);
  }
}
