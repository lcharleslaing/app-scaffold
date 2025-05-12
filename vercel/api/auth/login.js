import { SignJWT } from 'jose';

export const config = { runtime: 'edge' };
const JWT_SECRET = (process.env.JWT_SECRET || 'dev_secret').padEnd(32, '0').slice(0, 32);

export default async function handler(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return new Response('Missing credentials', { status: 400 });
    const dbKey = `user:${email}`;
    const res = await fetch(`${process.env.KV_URL}/${dbKey}`);
    if (res.status !== 200) return new Response('User not found', { status: 404 });
    const user = await res.json();

    // Hash incoming password
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    console.log('Login attempt:', email, 'hash:', hashHex);

    if (user.password !== hashHex) return new Response('Incorrect password', { status: 401 });

    // Create JWT
    const jwt = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(JWT_SECRET));

    // Set JWT as cookie (HttpOnly, Secure, Path=/)
    const headers = new Headers();
    headers.append('Set-Cookie', `token=${jwt}; HttpOnly; Path=/; Max-Age=7200; SameSite=Strict; Secure`);
    headers.append('Content-Type', 'text/html');

    // HTMX: trigger redirect on client
    const html = `<div hx-redirect="/pages/home/dashboard.html"></div>`;
    return new Response(html, { status: 200, headers });
  } catch (err) {
    console.log('Login error:', err);
    return new Response('Server error', { status: 500 });
  }
}