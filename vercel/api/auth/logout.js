export const config = { runtime: 'edge' };

export default async function handler(req) {
  // Clear the JWT cookie by setting it to empty and expired
  const headers = new Headers();
  headers.append('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure');
  headers.append('Content-Type', 'text/html');
  return new Response('<div>Logged out</div>', { status: 200, headers });
}