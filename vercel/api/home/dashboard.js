import { verifyJWTFromRequest } from '../../../edge-functions.js';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  const user = await verifyJWTFromRequest(req);
  if (!user) {
    // Not authenticated, redirect to login
    return new Response('', {
      status: 302,
      headers: { Location: '/pages/auth/login.html' }
    });
  }
  // Authenticated, serve the dashboard HTML
  const html = await fetch(new URL('../../../public/pages/home/dashboard.html', import.meta.url)).then(r => r.text());
  return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html' } });
}
